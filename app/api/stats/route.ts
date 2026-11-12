import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [
      totalPages,
      publishedPages,
      draftPages,
      totalPosts,
      publishedPosts,
      draftPosts,
      totalProducts,
      totalProductCategories,
      totalClients,
      totalMedia,
      totalUsers,
      totalSubmissions,
      pendingSubmissions,
      contactedSubmissions,
      resolvedSubmissions,
      recentSubmissions,
      recentPosts,
      recentAuditLogs,
    ] = await Promise.all([
      prisma.page.count(),
      prisma.page.count({ where: { status: 'published' } }),
      prisma.page.count({ where: { status: 'draft' } }),
      prisma.post.count(),
      prisma.post.count({ where: { status: 'published' } }),
      prisma.post.count({ where: { status: 'draft' } }),
      prisma.product.count(),
      prisma.productCategory.count(),
      prisma.client.count(),
      prisma.media.count(),
      prisma.user.count(),
      prisma.formSubmission.count(),
      prisma.formSubmission.count({ where: { status: 'pending' } }),
      prisma.formSubmission.count({ where: { status: 'contacted' } }),
      prisma.formSubmission.count({ where: { status: 'resolved' } }),
      prisma.formSubmission.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.post.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          status: true,
          viewsCount: true,
          publishedAt: true,
          updatedAt: true,
        },
      }),
      prisma.auditLog.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return NextResponse.json({
      counts: {
        pages: { total: totalPages, published: publishedPages, draft: draftPages },
        posts: { total: totalPosts, published: publishedPosts, draft: draftPosts },
        products: { total: totalProducts, categories: totalProductCategories },
        clients: totalClients,
        media: totalMedia,
        users: totalUsers,
        submissions: {
          total: totalSubmissions,
          pending: pendingSubmissions,
          contacted: contactedSubmissions,
          resolved: resolvedSubmissions,
        },
      },
      recentSubmissions: (recentSubmissions || []).map((s) => {
        let parsedData: any = {};
        if (s.dataJson) {
          try {
            parsedData = JSON.parse(s.dataJson);
          } catch {}
        }
        return {
          ...s,
          name: s.name || parsedData.name || parsedData.fullName || 'Anonymous',
          email: s.email || parsedData.email || 'No email',
          data: parsedData,
        };
      }),
      recentPosts,
      recentAuditLogs,
      system: {
        environment: process.env.NODE_ENV || 'development',
        database: 'SQLite (ACID Compliant)',
        orm: 'Prisma 6.4.1',
        nodeVersion: process.version,
        uptime: process.uptime(),
        memoryUsageMb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
    });
  } catch (error: any) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
