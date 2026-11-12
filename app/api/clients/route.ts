import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || '';
  const search = searchParams.get('search') || '';

  const where: any = {};
  if (category && category !== 'all') where.category = category;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { sectorLabel: { contains: search } },
      { highlight: { contains: search } },
    ];
  }

  try {
    const clients = await prisma.client.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
    });

    return NextResponse.json({ clients });
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
    const { name, logoSrc, category, sectorLabel, featured = false, highlight } = body;

    if (!name || !logoSrc || !category) {
      return NextResponse.json({ error: 'Name, logoSrc, and category required' }, { status: 400 });
    }

    const clientId = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const client = await prisma.client.create({
      data: {
        clientId,
        name,
        logoSrc,
        category,
        sectorLabel: sectorLabel || 'Commercial / Enterprise',
        featured,
        highlight,
      },
    });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'CREATE_CLIENT',
      entityType: 'client',
      entityId: client.id,
      details: { name: client.name },
    });

    return NextResponse.json({ success: true, client });
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
    if (!id) return NextResponse.json({ error: 'Client ID required' }, { status: 400 });

    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ success: true, message: 'Client deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
