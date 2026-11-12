import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        status: true,
        twoFactorEnabled: true,
        lastLoginAt: true,
        createdAt: true,
        role: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        _count: {
          select: { pages: true, posts: true, media: true },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const currentUser = await authenticateRequest(request);
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, password, roleSlug = 'editor', status = 'active' } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });
    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 400 });
    }

    const role = await prisma.role.findUnique({ where: { slug: roleSlug } });
    if (!role) {
      return NextResponse.json({ error: 'Invalid role specified' }, { status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase().trim(),
        passwordHash,
        roleId: role.id,
        status,
        avatar: '/assets/images/logo.png',
      },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: true,
        createdAt: true,
      },
    });

    await createAuditLog({
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'CREATE_USER',
      entityType: 'user',
      entityId: newUser.id,
      details: { name: newUser.name, email: newUser.email, role: role.slug },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const currentUser = await authenticateRequest(request);
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, email, password, roleSlug, status } = body;

    if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

    const existing = await prisma.user.findUnique({ where: { id }, include: { role: true } });
    if (!existing) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const updateData: any = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase().trim();
    if (status) updateData.status = status;
    if (password) {
      updateData.passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }
    if (roleSlug) {
      const role = await prisma.role.findUnique({ where: { slug: roleSlug } });
      if (role) updateData.roleId = role.id;
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: true,
        updatedAt: true,
      },
    });

    await createAuditLog({
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'UPDATE_USER',
      entityType: 'user',
      entityId: id,
      details: { name: updated.name, status: updated.status },
    });

    return NextResponse.json({ success: true, user: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const currentUser = await authenticateRequest(request);
  if (!currentUser) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

    if (id === currentUser.id) {
      return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({ where: { id }, include: { role: true } });
    if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    if (targetUser.role.slug === 'super_admin') {
      const superAdminCount = await prisma.user.count({
        where: { role: { slug: 'super_admin' } },
      });
      if (superAdminCount <= 1) {
        return NextResponse.json({ error: 'Cannot delete the only Super Administrator account' }, { status: 400 });
      }
    }

    await prisma.user.delete({ where: { id } });

    await createAuditLog({
      userId: currentUser.id,
      userName: currentUser.name,
      action: 'DELETE_USER',
      entityType: 'user',
      entityId: id,
      details: { email: targetUser.email },
    });

    return NextResponse.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
