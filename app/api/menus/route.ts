import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get('location');
  const slug = searchParams.get('slug');

  const where: any = {};
  if (location) where.location = location;
  if (slug) where.slug = slug;

  try {
    const menus = await prisma.menu.findMany({
      where,
      include: {
        items: {
          orderBy: { orderIndex: 'asc' },
          include: {
            page: { select: { id: true, title: true, slug: true } },
            product: { select: { id: true, name: true, slug: true } },
            category: { select: { id: true, name: true, slug: true } },
          },
        },
      },
    });

    return NextResponse.json({ menus });
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
    const { action, menuId, name, slug, location, label, url, target = '_self', orderIndex = 0 } = body;

    // Action: Add Menu Item
    if (action === 'add_item') {
      if (!menuId || !label || !url) {
        return NextResponse.json({ error: 'menuId, label, and url are required' }, { status: 400 });
      }

      const item = await prisma.menuItem.create({
        data: {
          menuId,
          label,
          url,
          target,
          orderIndex,
        },
      });

      return NextResponse.json({ success: true, item });
    }

    // Action: Create New Menu
    if (!name || !slug) {
      return NextResponse.json({ error: 'Menu name and slug are required' }, { status: 400 });
    }

    const menu = await prisma.menu.create({
      data: {
        name,
        slug,
        location: location || slug,
      },
    });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'CREATE_MENU',
      entityType: 'menu',
      entityId: menu.id,
      details: { name: menu.name, slug: menu.slug },
    });

    return NextResponse.json({ success: true, menu });
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
    const { items, itemId, label, url, target } = body;

    // Batch update items order
    if (Array.isArray(items)) {
      for (let i = 0; i < items.length; i++) {
        const itm = items[i];
        await prisma.menuItem.update({
          where: { id: itm.id },
          data: {
            orderIndex: i,
            parentId: itm.parentId || null,
            label: itm.label || undefined,
            url: itm.url || undefined,
          },
        });
      }
      return NextResponse.json({ success: true, message: 'Menu items order updated' });
    }

    // Single item update
    if (itemId) {
      const updated = await prisma.menuItem.update({
        where: { id: itemId },
        data: {
          label: label !== undefined ? label : undefined,
          url: url !== undefined ? url : undefined,
          target: target !== undefined ? target : undefined,
        },
      });
      return NextResponse.json({ success: true, item: updated });
    }

    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
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
    const itemId = searchParams.get('itemId');
    const menuId = searchParams.get('menuId');

    if (itemId) {
      await prisma.menuItem.delete({ where: { id: itemId } });
      return NextResponse.json({ success: true, message: 'Menu item deleted' });
    }

    if (menuId) {
      await prisma.menu.delete({ where: { id: menuId } });
      return NextResponse.json({ success: true, message: 'Menu deleted' });
    }

    return NextResponse.json({ error: 'itemId or menuId required' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
