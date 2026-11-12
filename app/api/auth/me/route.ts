import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const permissions = user.role.permissions.map((rp: any) => rp.permission?.slug).filter(Boolean);

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: {
        id: user.role.id,
        name: user.role.name,
        slug: user.role.slug,
      },
      permissions,
      createdAt: user.createdAt,
    },
  });
}
