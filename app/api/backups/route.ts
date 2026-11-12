import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

const BACKUP_DIR = path.join(process.cwd(), 'backups');

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const downloadId = searchParams.get('download');

  try {
    if (downloadId) {
      const backup = await prisma.backup.findUnique({ where: { id: downloadId } });
      if (!backup || !(await fs.stat(backup.filePath).catch(() => null))) {
        return NextResponse.json({ error: 'Backup file not found on disk' }, { status: 404 });
      }

      const fileData = await fs.readFile(backup.filePath, 'utf-8');
      return new Response(fileData, {
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${backup.filename}"`,
        },
      });
    }

    const backups = await prisma.backup.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json({ backups });
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
    await fs.mkdir(BACKUP_DIR, { recursive: true });

    // Fetch snapshot of all essential database tables
    const [pages, posts, products, productCategories, categories, tags, menus, menuItems, settings, clients, seoMetadata, forms, submissions] =
      await Promise.all([
        prisma.page.findMany(),
        prisma.post.findMany(),
        prisma.product.findMany(),
        prisma.productCategory.findMany(),
        prisma.category.findMany(),
        prisma.tag.findMany(),
        prisma.menu.findMany(),
        prisma.menuItem.findMany(),
        prisma.websiteSetting.findMany(),
        prisma.client.findMany(),
        prisma.seoMetadata.findMany(),
        prisma.form.findMany(),
        prisma.formSubmission.findMany(),
      ]);

    const backupPayload = {
      meta: {
        site: 'Neptune Automatic Pvt. Ltd.',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        creator: user.name,
      },
      data: {
        pages,
        posts,
        products,
        productCategories,
        categories,
        tags,
        menus,
        menuItems,
        settings,
        clients,
        seoMetadata,
        forms,
        submissions,
      },
    };

    const filename = `backup-neptune-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
    const filePath = path.join(BACKUP_DIR, filename);
    const content = JSON.stringify(backupPayload, null, 2);

    await fs.writeFile(filePath, content, 'utf-8');
    const stats = await fs.stat(filePath);

    const backupRecord = await prisma.backup.create({
      data: {
        filename,
        filePath,
        fileSize: stats.size,
        type: 'database',
        status: 'completed',
        createdBy: user.name,
      },
    });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'CREATE_BACKUP',
      entityType: 'backup',
      entityId: backupRecord.id,
      details: { filename, size: stats.size },
    });

    return NextResponse.json({
      success: true,
      message: 'Full database backup snapshot generated successfully',
      backup: backupRecord,
    });
  } catch (error: any) {
    console.error('Backup error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
