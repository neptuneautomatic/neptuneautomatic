import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  const categorySlug = searchParams.get('category') || '';
  const divisionSlug = searchParams.get('division') || '';
  const featured = searchParams.get('featured');
  const status = searchParams.get('status') || '';
  const limit = parseInt(searchParams.get('limit') || '150', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const skip = (page - 1) * limit;

  const where: any = {};
  if (status) where.status = status;
  if (categorySlug) where.categorySlug = categorySlug;
  if (divisionSlug) where.divisionSlug = divisionSlug;
  if (featured !== null && featured !== undefined && featured !== '') {
    where.featured = featured === 'true';
  }
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { slug: { contains: search } },
      { modelCode: { contains: search } },
      { description: { contains: search } },
    ];
  }

  try {
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ orderIndex: 'asc' }, { updatedAt: 'desc' }],
        include: {
          category: {
            select: { id: true, name: true, slug: true, division: true },
          },
        },
      }),
      prisma.product.count({ where }),
    ]);

    // Parse JSON fields safely
    const parsedProducts = products.map((p) => ({
      ...p,
      features: p.featuresJson ? JSON.parse(p.featuresJson) : [],
      specs: p.specsJson ? JSON.parse(p.specsJson) : [],
      fastFacts: p.fastFactsJson ? JSON.parse(p.fastFactsJson) : [],
      images: p.imagesJson ? JSON.parse(p.imagesJson) : [],
    }));

    return NextResponse.json({
      products: parsedProducts,
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
    const body = await request.json();
    const {
      name,
      slug,
      modelCode,
      modelNumber,
      division = 'Access Automation',
      divisionSlug = 'access-automation',
      categorySlug,
      categoryId,
      tagline = '',
      shortDesc = '',
      description = '',
      features = [],
      specs = [],
      specifications,
      fastFacts = [],
      images = [],
      image,
      brochureUrl,
      datasheetUrl,
      status = 'published',
      featured = false,
      isFeatured,
      seo,
    } = body;

    let catSlug = categorySlug;
    let targetCatId = categoryId;
    if (categoryId && !catSlug) {
      const cat = await prisma.productCategory.findUnique({ where: { id: categoryId } });
      if (cat) catSlug = cat.slug;
    } else if (catSlug && !targetCatId) {
      const cat = await prisma.productCategory.findUnique({ where: { slug: catSlug } });
      if (cat) targetCatId = cat.id;
    }

    if (!catSlug) {
      catSlug = 'access-automation';
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Product name is required' },
        { status: 400 }
      );
    }

    const finalModelCode = modelCode || modelNumber || null;
    const finalImages = images && images.length > 0 ? images : (image ? [image] : []);
    const finalFeatured = featured || isFeatured || false;
    let finalSpecs = specs;
    if ((!finalSpecs || finalSpecs.length === 0) && specifications) {
      finalSpecs = Object.entries(specifications).map(([key, value]) => ({ key, value: String(value) }));
    }

    const finalSlug = (slug || name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const existing = await prisma.product.findUnique({ where: { slug: finalSlug } });
    if (existing) {
      return NextResponse.json(
        { error: `Product with slug "${finalSlug}" already exists.` },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: finalSlug,
        modelCode: finalModelCode,
        division,
        divisionSlug,
        categorySlug: catSlug,
        categoryId: targetCatId || null,
        tagline,
        shortDesc,
        description,
        featuresJson: JSON.stringify(features),
        specsJson: JSON.stringify(finalSpecs),
        fastFactsJson: JSON.stringify(fastFacts),
        imagesJson: JSON.stringify(finalImages),
        brochureUrl: brochureUrl || null,
        datasheetUrl: datasheetUrl || null,
        status,
        featured: finalFeatured,
      },
    });

    // Save SEO metadata
    if (seo) {
      await prisma.seoMetadata.upsert({
        where: {
          entityType_entitySlug: {
            entityType: 'product',
            entitySlug: product.slug,
          },
        },
        update: {
          title: seo.title || `${product.name} - Neptune Automatic`,
          description: seo.description || product.shortDesc || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/products/${product.categorySlug}/${product.slug}/`,
          ogTitle: seo.ogTitle || product.name,
          ogDescription: seo.ogDescription || product.shortDesc || '',
          ogImage: images[0] || '/assets/images/logo.png',
        },
        create: {
          entityType: 'product',
          entityId: product.id,
          entitySlug: product.slug,
          title: seo.title || `${product.name} - Neptune Automatic`,
          description: seo.description || product.shortDesc || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/products/${product.categorySlug}/${product.slug}/`,
          ogTitle: seo.ogTitle || product.name,
          ogDescription: seo.ogDescription || product.shortDesc || '',
          ogImage: images[0] || '/assets/images/logo.png',
        },
      });
    }

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'CREATE_PRODUCT',
      entityType: 'product',
      entityId: product.id,
      details: { name: product.name, slug: product.slug },
    });

    return NextResponse.json({ success: true, product });
  } catch (error: any) {
    console.error('Create product error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
