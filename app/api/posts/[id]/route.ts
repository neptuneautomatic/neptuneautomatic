import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
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
        revisions: {
          orderBy: { revisionNumber: 'desc' },
          take: 10,
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const seo = await prisma.seoMetadata.findUnique({
      where: {
        entityType_entitySlug: {
          entityType: 'post',
          entitySlug: post.slug,
        },
      },
    });

    return NextResponse.json({ post, seo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      contentHtml,
      content,
      contentJson,
      featuredImage,
      readTime,
      readingTime,
      status,
      categoryIds,
      tags,
      authorName,
      seo,
    } = body;

    const targetContentHtml = contentHtml !== undefined ? contentHtml : (content !== undefined ? content : undefined);
    const targetReadTime = readTime !== undefined ? readTime : (readingTime !== undefined ? `${readingTime} min read` : undefined);

    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        _count: { select: { revisions: true } },
      },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Save previous version to revisions
    const nextRevisionNum = existingPost._count.revisions + 1;
    await prisma.postRevision.create({
      data: {
        postId: existingPost.id,
        title: existingPost.title,
        contentHtml: existingPost.contentHtml,
        contentJson: existingPost.contentJson,
        authorId: user.id,
        revisionNumber: nextRevisionNum,
      },
    });

    // Handle slug uniqueness
    let finalSlug = existingPost.slug;
    if (slug && slug !== existingPost.slug) {
      const slugCheck = await prisma.post.findUnique({ where: { slug } });
      if (slugCheck && slugCheck.id !== existingPost.id) {
        return NextResponse.json({ error: 'Slug is already in use by another article' }, { status: 400 });
      }
      finalSlug = slug;
    }

    const updated = await prisma.post.update({
      where: { id: existingPost.id },
      data: {
        title: title !== undefined ? title : existingPost.title,
        slug: finalSlug,
        excerpt: excerpt !== undefined ? excerpt : existingPost.excerpt,
        contentHtml: targetContentHtml !== undefined ? targetContentHtml : existingPost.contentHtml,
        contentJson: contentJson !== undefined ? (contentJson ? JSON.stringify(contentJson) : null) : existingPost.contentJson,
        featuredImage: featuredImage !== undefined ? featuredImage : existingPost.featuredImage,
        readTime: targetReadTime !== undefined ? targetReadTime : existingPost.readTime,
        status: status !== undefined ? status : existingPost.status,
        authorName: authorName !== undefined ? authorName : existingPost.authorName,
        publishedAt: status === 'published' && existingPost.status !== 'published' ? new Date() : existingPost.publishedAt,
      },
    });

    // Update categories if provided
    if (Array.isArray(categoryIds)) {
      await prisma.postCategory.deleteMany({ where: { postId: updated.id } });
      for (const catId of categoryIds) {
        await prisma.postCategory.create({
          data: { postId: updated.id, categoryId: catId },
        });
      }
    }

    // Update tags if provided
    if (Array.isArray(tags)) {
      await prisma.postTag.deleteMany({ where: { postId: updated.id } });
      for (const tagName of tags) {
        const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const tag = await prisma.tag.upsert({
          where: { slug: tagSlug },
          update: {},
          create: { name: tagName, slug: tagSlug },
        });

        await prisma.postTag.create({
          data: { postId: updated.id, tagId: tag.id },
        });
      }
    }

    // Update SEO
    if (seo) {
      await prisma.seoMetadata.upsert({
        where: {
          entityType_entitySlug: {
            entityType: 'post',
            entitySlug: updated.slug,
          },
        },
        update: {
          title: seo.title || updated.title,
          description: seo.description || updated.excerpt || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/blogs/${updated.slug}/`,
          ogTitle: seo.ogTitle || updated.title,
          ogDescription: seo.ogDescription || updated.excerpt || '',
          ogImage: seo.ogImage || updated.featuredImage,
          ogType: 'article',
        },
        create: {
          entityType: 'post',
          entityId: updated.id,
          entitySlug: updated.slug,
          title: seo.title || updated.title,
          description: seo.description || updated.excerpt || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/blogs/${updated.slug}/`,
          ogTitle: seo.ogTitle || updated.title,
          ogDescription: seo.ogDescription || updated.excerpt || '',
          ogImage: seo.ogImage || updated.featuredImage,
          ogType: 'article',
        },
      });
    }

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'UPDATE_POST',
      entityType: 'post',
      entityId: updated.id,
      details: { title: updated.title, revision: nextRevisionNum },
    });

    return NextResponse.json({ success: true, post: updated });
  } catch (error: any) {
    console.error('Update post error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const post = await prisma.post.findUnique({ where: { id: params.id } });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await prisma.post.delete({ where: { id: params.id } });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'DELETE_POST',
      entityType: 'post',
      entityId: params.id,
      details: { title: post.title, slug: post.slug },
    });

    return NextResponse.json({ success: true, message: 'Post deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
