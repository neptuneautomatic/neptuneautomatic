import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const submissions = await prisma.formSubmission.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const headers = ['ID', 'Date', 'Status', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Source Page', 'Message', 'Notes'];

    const rows = submissions.map((s) => [
      s.id,
      new Date(s.createdAt).toISOString(),
      s.status,
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${(s.email || '').replace(/"/g, '""')}"`,
      `"${(s.phone || '').replace(/"/g, '""')}"`,
      `"${(s.company || '').replace(/"/g, '""')}"`,
      `"${(s.subject || '').replace(/"/g, '""')}"`,
      `"${(s.sourcePage || '').replace(/"/g, '""')}"`,
      `"${(s.message || '').replace(/"/g, '""')}"`,
      `"${(s.internalNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new Response(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="neptune-enquiries-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
