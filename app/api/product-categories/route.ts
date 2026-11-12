import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  try {
    const categories = await prisma.productCategory.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        _count: {
          select: { products: true },
        },
      },
    });

    const parsed = categories.map((c) => ({
      ...c,
      highlights: c.highlightsJson ? JSON.parse(c.highlightsJson) : [],
      overviewSpecs: c.overviewSpecsJson ? JSON.parse(c.overviewSpecsJson) : [],
      productCount: c._count.products,
    }));

    return NextResponse.json({ categories: parsed });
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
    const {
      name,
      slug,
      division = 'Access Automation',
      divisionSlug = 'access-automation',
      title = '',
      h1 = '',
      tagline = '',
      description = '',
      heroImage = '',
      highlights = [],
      overviewSpecs = [],
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const finalSlug = (slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await prisma.productCategory.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      return NextResponse.json({ error: 'Category slug already exists' }, { status: 400 });
    }

    const category = await prisma.productCategory.create({
      data: {
        name,
        slug: finalSlug,
        division,
        divisionSlug,
        title: title || `${name} - Neptune Automatic`,
        h1: h1 || name,
        tagline,
        description,
        heroImage,
        highlightsJson: JSON.stringify(highlights),
        overviewSpecsJson: JSON.stringify(overviewSpecs),
      },
    });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'CREATE_PRODUCT_CATEGORY',
      entityType: 'product_category',
      entityId: category.id,
      details: { name: category.name, slug: category.slug },
    });

    return NextResponse.json({ success: true, category });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
