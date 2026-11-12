import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status') || '';
  const search = searchParams.get('search') || '';
  const formSlug = searchParams.get('form') || '';
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status) where.status = status;
  if (formSlug) where.formSlug = formSlug;
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { company: { contains: search } },
      { phone: { contains: search } },
      { subject: { contains: search } },
      { message: { contains: search } },
    ];
  }

  try {
    const [submissions, total] = await Promise.all([
      prisma.formSubmission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.formSubmission.count({ where }),
    ]);

    const parsed = submissions.map((s) => ({
      ...s,
      data: s.dataJson ? JSON.parse(s.dataJson) : {},
    }));

    return NextResponse.json({
      submissions: parsed,
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

export async function PUT(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status, internalNotes } = body;

    if (!id) return NextResponse.json({ error: 'Submission ID required' }, { status: 400 });

    const updated = await prisma.formSubmission.update({
      where: { id },
      data: {
        status: status !== undefined ? status : undefined,
        internalNotes: internalNotes !== undefined ? internalNotes : undefined,
      },
    });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'UPDATE_SUBMISSION_STATUS',
      entityType: 'submission',
      entityId: id,
      details: { status: updated.status },
    });

    return NextResponse.json({ success: true, submission: updated });
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

    if (!id) return NextResponse.json({ error: 'Submission ID required' }, { status: 400 });

    await prisma.formSubmission.delete({ where: { id } });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'DELETE_SUBMISSION',
      entityType: 'submission',
      entityId: id,
    });

    return NextResponse.json({ success: true, message: 'Submission deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
