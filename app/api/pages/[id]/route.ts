import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const page = await prisma.page.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
      include: {
        author: {
          select: { id: true, name: true, email: true },
        },
        sections: {
          orderBy: { orderIndex: 'asc' },
        },
        revisions: {
          orderBy: { revisionNumber: 'desc' },
          take: 10,
        },
      },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    const seo = await prisma.seoMetadata.findUnique({
      where: {
        entityType_entitySlug: {
          entityType: 'page',
          entitySlug: page.slug,
        },
      },
    });

    return NextResponse.json({ page, seo });
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
      template,
      contentHtml,
      contentJson,
      customCss,
      customJs,
      featuredImage,
      status,
      visibility,
      seo,
    } = body;

    const existingPage = await prisma.page.findUnique({
      where: { id: params.id },
      include: {
        _count: { select: { revisions: true } },
      },
    });

    if (!existingPage) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    // New revision count
    const nextRevisionNum = existingPage._count.revisions + 1;

    // Save previous state as revision
    await prisma.pageRevision.create({
      data: {
        pageId: existingPage.id,
        title: existingPage.title,
        contentHtml: existingPage.contentHtml,
        contentJson: existingPage.contentJson,
        authorId: user.id,
        revisionNumber: nextRevisionNum,
      },
    });

    // Check slug uniqueness if changed
    let finalSlug = existingPage.slug;
    if (slug && slug !== existingPage.slug) {
      const slugCheck = await prisma.page.findUnique({ where: { slug } });
      if (slugCheck && slugCheck.id !== existingPage.id) {
        return NextResponse.json({ error: 'Slug is already in use by another page' }, { status: 400 });
      }
      finalSlug = slug;
    }

    const updated = await prisma.page.update({
      where: { id: existingPage.id },
      data: {
        title: title !== undefined ? title : existingPage.title,
        slug: finalSlug,
        template: template !== undefined ? template : existingPage.template,
        contentHtml: contentHtml !== undefined ? contentHtml : existingPage.contentHtml,
        contentJson: contentJson !== undefined ? (contentJson ? JSON.stringify(contentJson) : null) : existingPage.contentJson,
        customCss: customCss !== undefined ? customCss : existingPage.customCss,
        customJs: customJs !== undefined ? customJs : existingPage.customJs,
        featuredImage: featuredImage !== undefined ? featuredImage : existingPage.featuredImage,
        status: status !== undefined ? status : existingPage.status,
        visibility: visibility !== undefined ? visibility : existingPage.visibility,
        publishedAt: status === 'published' && existingPage.status !== 'published' ? new Date() : existingPage.publishedAt,
      },
    });

    // Update SEO
    if (seo) {
      await prisma.seoMetadata.upsert({
        where: {
          entityType_entitySlug: {
            entityType: 'page',
            entitySlug: updated.slug,
          },
        },
        update: {
          title: seo.title || updated.title,
          description: seo.description || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/${updated.slug}/`,
          ogTitle: seo.ogTitle || updated.title,
          ogDescription: seo.ogDescription || seo.description || '',
          ogImage: seo.ogImage || updated.featuredImage,
        },
        create: {
          entityType: 'page',
          entityId: updated.id,
          entitySlug: updated.slug,
          title: seo.title || updated.title,
          description: seo.description || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/${updated.slug}/`,
          ogTitle: seo.ogTitle || updated.title,
          ogDescription: seo.ogDescription || seo.description || '',
          ogImage: seo.ogImage || updated.featuredImage,
        },
      });
    }

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'UPDATE_PAGE',
      entityType: 'page',
      entityId: updated.id,
      details: { title: updated.title, revision: nextRevisionNum },
    });

    return NextResponse.json({ success: true, page: updated });
  } catch (error: any) {
    console.error('Update page error:', error);
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
    const page = await prisma.page.findUnique({ where: { id: params.id } });
    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    await prisma.page.delete({ where: { id: params.id } });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'DELETE_PAGE',
      entityType: 'page',
      entityId: params.id,
      details: { title: page.title, slug: page.slug },
    });

    return NextResponse.json({ success: true, message: 'Page deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
