import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const forms = await prisma.form.findMany({
      include: {
        fields: {
          orderBy: { orderIndex: 'asc' },
        },
        _count: {
          select: { submissions: true },
        },
      },
    });

    const parsed = forms.map((f) => ({
      ...f,
      emailNotifications: f.emailNotificationsJson ? JSON.parse(f.emailNotificationsJson) : [],
      fields: f.fields.map((field) => ({
        ...field,
        options: field.optionsJson ? JSON.parse(field.optionsJson) : [],
      })),
      submissionsCount: f._count.submissions,
    }));

    return NextResponse.json({ forms: parsed });
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
    const { title, slug, description, submitButtonText, successMessage, emailNotifications = [], fields = [] } = body;

    if (!title) {
      return NextResponse.json({ error: 'Form title is required' }, { status: 400 });
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const form = await prisma.form.create({
      data: {
        title,
        slug: finalSlug,
        description,
        submitButtonText: submitButtonText || 'Submit',
        successMessage: successMessage || 'Thank you for your message.',
        emailNotificationsJson: JSON.stringify(emailNotifications),
      },
    });

    for (let i = 0; i < fields.length; i++) {
      const f = fields[i];
      await prisma.formField.create({
        data: {
          formId: form.id,
          label: f.label,
          name: f.name || f.label.toLowerCase().replace(/[^a-z0-9]+/g, '_'),
          fieldType: f.fieldType || 'text',
          placeholder: f.placeholder || '',
          isRequired: !!f.isRequired,
          optionsJson: f.options ? JSON.stringify(f.options) : null,
          orderIndex: i,
        },
      });
    }

    return NextResponse.json({ success: true, form });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
