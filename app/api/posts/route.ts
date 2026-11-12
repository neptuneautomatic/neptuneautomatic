import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const status = searchParams.get('status') || '';
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status) where.status = status;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { excerpt: { contains: search } },
      { slug: { contains: search } },
    ];
  }
  if (category) {
    where.categories = {
      some: {
        category: {
          slug: category,
        },
      },
    };
  }

  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ publishedAt: 'desc' }, { createdAt: 'desc' }],
        include: {
          categories: {
            include: { category: true },
          },
          tags: {
            include: { tag: true },
          },
          author: {
            select: { id: true, name: true, email: true },
          },
        },
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt = '',
      contentHtml = '',
      content,
      contentJson,
      featuredImage,
      readTime,
      readingTime,
      status = 'published',
      categoryIds = [],
      tags = [],
      authorName,
      seo,
    } = body;

    const finalHtml = contentHtml || content || '';
    const finalReadTime = readTime || (readingTime ? `${readingTime} min read` : undefined) || `${Math.max(2, Math.ceil(finalHtml.replace(/<[^>]*>?/gm, '').split(/\s+/).length / 200))} min read`;

    if (!title) {
      return NextResponse.json({ error: 'Post title is required' }, { status: 400 });
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await prisma.post.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      return NextResponse.json(
        { error: `An article with URL slug "${finalSlug}" already exists.` },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug: finalSlug,
        excerpt,
        contentHtml: finalHtml,
        contentJson: contentJson ? JSON.stringify(contentJson) : null,
        featuredImage,
        readTime: finalReadTime,
        status,
        authorName: authorName || user.name || 'Neptune Technical Editorial',
        authorId: user.id,
        publishedAt: status === 'published' ? new Date() : null,
      },
    });

    // Link categories
    if (Array.isArray(categoryIds) && categoryIds.length > 0) {
      for (const catId of categoryIds) {
        await prisma.postCategory.create({
          data: { postId: post.id, categoryId: catId },
        });
      }
    }

    // Link/create tags
    if (Array.isArray(tags) && tags.length > 0) {
      for (const tagName of tags) {
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name: tagName, slug: tagSlug },
        });

        await prisma.postTag.create({
          data: { postId: post.id, tagId: tag.id },
        });
      }
    }

    // Save Initial Revision
    await prisma.postRevision.create({
      data: {
        postId: post.id,
        title: post.title,
        contentHtml: post.contentHtml,
        contentJson: post.contentJson,
        authorId: user.id,
        revisionNumber: 1,
      },
    });

    // Save SEO metadata
    if (seo) {
      await prisma.seoMetadata.upsert({
        where: {
          entityType_entitySlug: {
            entityType: 'post',
            entitySlug: post.slug,
          },
        },
        update: {
          title: seo.title || post.title,
          description: seo.description || post.excerpt || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/blogs/${post.slug}/`,
          ogTitle: seo.ogTitle || post.title,
          ogDescription: seo.ogDescription || post.excerpt || '',
          ogImage: seo.ogImage || post.featuredImage,
          ogType: 'article',
        },
        create: {
          entityType: 'post',
          entityId: post.id,
          entitySlug: post.slug,
          title: seo.title || post.title,
          description: seo.description || post.excerpt || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/blogs/${post.slug}/`,
          ogTitle: seo.ogTitle || post.title,
          ogDescription: seo.ogDescription || post.excerpt || '',
          ogImage: seo.ogImage || post.featuredImage,
          ogType: 'article',
        },
      });
    }

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'CREATE_POST',
      entityType: 'post',
      entityId: post.id,
      details: { title: post.title, slug: post.slug },
    });

    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    console.error('Create post error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
