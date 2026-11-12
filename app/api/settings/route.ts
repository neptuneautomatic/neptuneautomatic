import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  const { searchParams } = new URL(request.url);
  const group = searchParams.get('group');

  const where: any = {};
  if (group) where.group = group;

  // If public guest, only return public settings
  if (!user) {
    where.isPublic = true;
  }

  try {
    const settings = await prisma.websiteSetting.findMany({ where });

    // Map into key-value dictionary as well as array
    const dictionary: Record<string, string> = {};
    for (const s of settings) {
      dictionary[s.key] = s.value;
    }

    return NextResponse.json({
      settings,
      dictionary,
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
    const { settings = {} } = body;

    const updatedKeys: string[] = [];

    for (const [key, value] of Object.entries(settings)) {
      if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        const strVal = String(value);
        await prisma.websiteSetting.upsert({
          where: { key },
          update: { value: strVal },
          create: {
            key,
            value: strVal,
            group: 'general',
            isPublic: true,
          },
        });
        updatedKeys.push(key);
      }
    }

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'UPDATE_SETTINGS',
      entityType: 'settings',
      details: { keys: updatedKeys },
    });

    return NextResponse.json({ success: true, updatedKeys });
  } catch (error: any) {
    console.error('Update settings error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
