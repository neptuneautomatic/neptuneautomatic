import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const slug = searchParams.get('slug');
  const section = searchParams.get('section'); // redirects, metadata, audit

  try {
    if (section === 'redirects') {
      const redirects = await prisma.redirect.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return NextResponse.json({ redirects });
    }

    if (type && slug) {
      const seo = await prisma.seoMetadata.findUnique({
        where: {
          entityType_entitySlug: {
            entityType: type,
            entitySlug: slug,
          },
        },
      });
      return NextResponse.json({ seo });
    }

    // List all configured SEO items
    const [metadata, redirects, missingTitles, missingDescriptions] = await Promise.all([
      prisma.seoMetadata.findMany({
        orderBy: { updatedAt: 'desc' },
        take: 100,
      }),
      prisma.redirect.findMany({
        orderBy: { createdAt: 'desc' },
      }),
      prisma.page.count({ where: { title: '' } }),
      prisma.post.count({ where: { excerpt: '' } }),
    ]);

    return NextResponse.json({
      metadata,
      redirects,
      audit: {
        missingTitles,
        missingDescriptions,
        totalPagesWithSeo: metadata.length,
        totalActiveRedirects: redirects.filter((r) => r.isActive).length,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, seo, redirect } = body;

    // Action: Update SEO entry
    if (action === 'save_seo' && seo) {
      const { entityType, entitySlug, title, description, focusKeyword, canonicalUrl, robotsIndex, robotsFollow, ogTitle, ogDescription, ogImage } = seo;

      if (!entityType || !entitySlug) {
        return NextResponse.json({ error: 'entityType and entitySlug required' }, { status: 400 });
      }

      const updated = await prisma.seoMetadata.upsert({
        where: {
          entityType_entitySlug: {
            entityType,
            entitySlug,
          },
        },
        update: {
          title,
          description,
          focusKeyword,
          canonicalUrl,
          robotsIndex: robotsIndex !== undefined ? robotsIndex : true,
          robotsFollow: robotsFollow !== undefined ? robotsFollow : true,
          ogTitle,
          ogDescription,
          ogImage,
        },
        create: {
          entityType,
          entitySlug,
          title,
          description,
          focusKeyword,
          canonicalUrl,
          robotsIndex: robotsIndex !== undefined ? robotsIndex : true,
          robotsFollow: robotsFollow !== undefined ? robotsFollow : true,
          ogTitle,
          ogDescription,
          ogImage,
        },
      });

      return NextResponse.json({ success: true, seo: updated });
    }

    // Action: Add / Update Redirect
    if (action === 'save_redirect' && redirect) {
      const { id, sourceUrl, targetUrl, statusCode = 301, isActive = true } = redirect;

      if (!sourceUrl || !targetUrl) {
        return NextResponse.json({ error: 'sourceUrl and targetUrl required' }, { status: 400 });
      }

      let res;
      if (id) {
        res = await prisma.redirect.update({
          where: { id },
          data: { sourceUrl, targetUrl, statusCode, isActive },
        });
      } else {
        res = await prisma.redirect.upsert({
          where: { sourceUrl },
          update: { targetUrl, statusCode, isActive },
          create: { sourceUrl, targetUrl, statusCode, isActive },
        });
      }

      await createAuditLog({
        userId: user.id,
        userName: user.name,
        action: 'UPDATE_REDIRECT',
        entityType: 'seo',
        details: { sourceUrl, targetUrl, statusCode },
      });

      return NextResponse.json({ success: true, redirect: res });
    }

    // Action: Delete Redirect
    if (action === 'delete_redirect' && redirect?.id) {
      await prisma.redirect.delete({ where: { id: redirect.id } });
      return NextResponse.json({ success: true, message: 'Redirect deleted' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
