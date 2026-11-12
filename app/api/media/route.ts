import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'assets', 'uploads');

// Allowed extensions
const ALLOWED_EXTENSIONS = [
  'jpg', 'jpeg', 'png', 'webp', 'svg', 'gif',
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
  'mp4', 'mov', 'webm'
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const type = searchParams.get('type') || '';
  const folder = searchParams.get('folder') || '';
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * limit;

  const where: any = {};
  if (folder) where.folder = folder;
  if (type === 'image') where.mimeType = { startsWith: 'image/' };
  if (type === 'document') where.mimeType = { in: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'] };
  if (type === 'video') where.mimeType = { startsWith: 'video/' };
  if (search) {
    where.OR = [
      { filename: { contains: search } },
      { originalName: { contains: search } },
      { title: { contains: search } },
      { altText: { contains: search } },
    ];
  }

  try {
    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          uploadedBy: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { usages: true },
          },
        },
      }),
      prisma.media.count({ where }),
    ]);

    return NextResponse.json({
      media,
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
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const altText = (formData.get('altText') as string) || '';
    const title = (formData.get('title') as string) || '';
    const folder = (formData.get('folder') as string) || 'general';

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No files uploaded' }, { status: 400 });
    }

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    const uploadedMediaRecords = [];

    for (const file of files) {
      const originalName = file.name;
      const rawExt = path.extname(originalName).toLowerCase().replace('.', '');

      if (!ALLOWED_EXTENSIONS.includes(rawExt)) {
        return NextResponse.json(
          { error: `File type ".${rawExt}" is not permitted for security.` },
          { status: 400 }
        );
      }

      const baseName = path.basename(originalName, path.extname(originalName))
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const timestamp = Date.now();
      const uniqueFilename = `${baseName}-${timestamp}.${rawExt}`;
      const filePath = path.join(UPLOAD_DIR, uniqueFilename);
      const publicUrl = `/assets/uploads/${uniqueFilename}`;

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      await fs.writeFile(filePath, buffer);

      const mediaRecord = await prisma.media.create({
        data: {
          filename: uniqueFilename,
          originalName,
          mimeType: file.type || `application/${rawExt}`,
          extension: rawExt,
          size: file.size,
          path: filePath,
          url: publicUrl,
          altText: altText || baseName.replace(/-/g, ' '),
          title: title || originalName,
          folder,
          uploadedById: user.id,
        },
      });

      uploadedMediaRecords.push(mediaRecord);

      await createAuditLog({
        userId: user.id,
        userName: user.name,
        action: 'UPLOAD_MEDIA',
        entityType: 'media',
        entityId: mediaRecord.id,
        details: { filename: uniqueFilename, size: file.size },
      });
    }

    return NextResponse.json({
      success: true,
      media: uploadedMediaRecords,
    });
  } catch (error: any) {
    console.error('Media upload error:', error);
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
    const { id, altText, title, caption, description, folder } = body;

    if (!id) return NextResponse.json({ error: 'Media ID required' }, { status: 400 });

    const updated = await prisma.media.update({
      where: { id },
      data: {
        altText: altText !== undefined ? altText : undefined,
        title: title !== undefined ? title : undefined,
        caption: caption !== undefined ? caption : undefined,
        description: description !== undefined ? description : undefined,
        folder: folder !== undefined ? folder : undefined,
      },
    });

    return NextResponse.json({ success: true, media: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const force = searchParams.get('force') === 'true';

    if (!id) return NextResponse.json({ error: 'Media ID required' }, { status: 400 });

    const media = await prisma.media.findUnique({
      where: { id },
      include: {
        _count: { select: { usages: true } },
      },
    });

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    if (media._count.usages > 0 && !force) {
      return NextResponse.json(
        {
          error: `This media file is currently in use on ${media._count.usages} published page(s) or product(s). To delete anyway, confirm force delete.`,
          inUse: true,
          usageCount: media._count.usages,
        },
        { status: 409 }
      );
    }

    // Try deleting physical file
    try {
      if (media.path && (await fs.stat(media.path).catch(() => null))) {
        await fs.unlink(media.path);
      }
    } catch (fsErr) {
      console.warn('Could not remove file from disk:', fsErr);
    }

    await prisma.media.delete({ where: { id } });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'DELETE_MEDIA',
      entityType: 'media',
      entityId: id,
      details: { filename: media.filename },
    });

    return NextResponse.json({ success: true, message: 'Media deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
