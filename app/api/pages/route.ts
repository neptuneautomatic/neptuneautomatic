import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const template = searchParams.get('template') || '';

  const where: any = {};
  if (status) where.status = status;
  if (template) where.template = template;
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { slug: { contains: search } },
    ];
  }

  try {
    const pages = await prisma.page.findMany({
      where,
      orderBy: [{ orderIndex: 'asc' }, { updatedAt: 'desc' }],
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { revisions: true, sections: true },
        },
      },
    });

    return NextResponse.json({ pages });
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
      template = 'default',
      contentHtml = '',
      contentJson,
      customCss,
      customJs,
      featuredImage,
      status = 'published',
      visibility = 'public',
      seo,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Page title is required' }, { status: 400 });
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    // Check duplicate slug
    const existing = await prisma.page.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      return NextResponse.json(
        { error: `A page with URL slug "${finalSlug}" already exists.` },
        { status: 400 }
      );
    }

    const page = await prisma.page.create({
      data: {
        title,
        slug: finalSlug,
        template,
        contentHtml,
        contentJson: contentJson ? JSON.stringify(contentJson) : null,
        customCss,
        customJs,
        featuredImage,
        status,
        visibility,
        authorId: user.id,
      },
    });

    // Save initial revision
    await prisma.pageRevision.create({
      data: {
        pageId: page.id,
        title: page.title,
        contentHtml: page.contentHtml,
        contentJson: page.contentJson,
        authorId: user.id,
        revisionNumber: 1,
      },
    });

    // Save SEO metadata
    if (seo) {
      await prisma.seoMetadata.upsert({
        where: {
          entityType_entitySlug: {
            entityType: 'page',
            entitySlug: page.slug,
          },
        },
        update: {
          title: seo.title || page.title,
          description: seo.description || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/${page.slug}/`,
          ogTitle: seo.ogTitle || page.title,
          ogDescription: seo.ogDescription || seo.description || '',
          ogImage: seo.ogImage || page.featuredImage,
        },
        create: {
          entityType: 'page',
          entityId: page.id,
          entitySlug: page.slug,
          title: seo.title || page.title,
          description: seo.description || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/${page.slug}/`,
          ogTitle: seo.ogTitle || page.title,
          ogDescription: seo.ogDescription || seo.description || '',
          ogImage: seo.ogImage || page.featuredImage,
        },
      });
    }

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'CREATE_PAGE',
      entityType: 'page',
      entityId: page.id,
      details: { title: page.title, slug: page.slug },
    });

    return NextResponse.json({ success: true, page });
  } catch (error: any) {
    console.error('Create page error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
