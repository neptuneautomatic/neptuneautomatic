import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth';
import { createAuditLog } from '@/lib/audit';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id: params.id }, { slug: params.id }],
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const seo = await prisma.seoMetadata.findUnique({
      where: {
        entityType_entitySlug: {
          entityType: 'product',
          entitySlug: product.slug,
        },
      },
    });

    const parsed = {
      ...product,
      features: product.featuresJson ? JSON.parse(product.featuresJson) : [],
      specs: product.specsJson ? JSON.parse(product.specsJson) : [],
      fastFacts: product.fastFactsJson ? JSON.parse(product.fastFactsJson) : [],
      images: product.imagesJson ? JSON.parse(product.imagesJson) : [],
    };

    return NextResponse.json({ product: parsed, seo });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
      division,
      divisionSlug,
      tagline,
      shortDesc,
      description,
      features,
      specs,
      fastFacts,
      images,
      brochureUrl,
      datasheetUrl,
      status,
      featured,
      seo,
    } = body;

    const existing = await prisma.product.findUnique({ where: { id: params.id } });
    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    let finalSlug = existing.slug;
    if (slug && slug !== existing.slug) {
      const slugCheck = await prisma.product.findUnique({ where: { slug } });
      if (slugCheck && slugCheck.id !== existing.id) {
        return NextResponse.json({ error: 'Slug is already in use by another product' }, { status: 400 });
      }
      finalSlug = slug;
    }

    // Lookup Category ID if categorySlug or categoryId changed
    let targetCategoryId = body.categoryId !== undefined ? body.categoryId : existing.categoryId;
    let targetCategorySlug = body.categorySlug !== undefined ? body.categorySlug : existing.categorySlug;

    if (body.categoryId && body.categoryId !== existing.categoryId && !body.categorySlug) {
      const cat = await prisma.productCategory.findUnique({ where: { id: body.categoryId } });
      if (cat) targetCategorySlug = cat.slug;
    } else if (body.categorySlug && body.categorySlug !== existing.categorySlug && !body.categoryId) {
      const cat = await prisma.productCategory.findUnique({ where: { slug: body.categorySlug } });
      targetCategoryId = cat?.id || null;
    }

    const finalModelCode = modelCode !== undefined ? modelCode : (body.modelNumber !== undefined ? body.modelNumber : existing.modelCode);
    const finalFeatured = featured !== undefined ? featured : (body.isFeatured !== undefined ? body.isFeatured : existing.featured);
    const finalImages = images !== undefined ? images : (body.image !== undefined ? [body.image] : undefined);
    let finalSpecs = specs;
    if (finalSpecs === undefined && body.specifications) {
      finalSpecs = Object.entries(body.specifications).map(([key, value]) => ({ key, value: String(value) }));
    }

    const updated = await prisma.product.update({
      where: { id: existing.id },
      data: {
        name: name !== undefined ? name : existing.name,
        slug: finalSlug,
        modelCode: finalModelCode,
        division: division !== undefined ? division : existing.division,
        divisionSlug: divisionSlug !== undefined ? divisionSlug : existing.divisionSlug,
        categorySlug: targetCategorySlug,
        categoryId: targetCategoryId,
        tagline: tagline !== undefined ? tagline : existing.tagline,
        shortDesc: shortDesc !== undefined ? shortDesc : existing.shortDesc,
        description: description !== undefined ? description : existing.description,
        featuresJson: features !== undefined ? JSON.stringify(features) : existing.featuresJson,
        specsJson: finalSpecs !== undefined ? JSON.stringify(finalSpecs) : existing.specsJson,
        fastFactsJson: fastFacts !== undefined ? JSON.stringify(fastFacts) : existing.fastFactsJson,
        imagesJson: finalImages !== undefined ? JSON.stringify(finalImages) : existing.imagesJson,
        brochureUrl: brochureUrl !== undefined ? brochureUrl : existing.brochureUrl,
        datasheetUrl: datasheetUrl !== undefined ? datasheetUrl : existing.datasheetUrl,
        status: status !== undefined ? status : existing.status,
        featured: finalFeatured,
      },
    });

    if (seo) {
      const parsedImages = updated.imagesJson ? JSON.parse(updated.imagesJson) : [];
      await prisma.seoMetadata.upsert({
        where: {
          entityType_entitySlug: {
            entityType: 'product',
            entitySlug: updated.slug,
          },
        },
        update: {
          title: seo.title || `${updated.name} - Neptune Automatic`,
          description: seo.description || updated.shortDesc || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/products/${updated.categorySlug}/${updated.slug}/`,
          ogTitle: seo.ogTitle || updated.name,
          ogDescription: seo.ogDescription || updated.shortDesc || '',
          ogImage: parsedImages[0] || '/assets/images/logo.png',
        },
        create: {
          entityType: 'product',
          entityId: updated.id,
          entitySlug: updated.slug,
          title: seo.title || `${updated.name} - Neptune Automatic`,
          description: seo.description || updated.shortDesc || '',
          focusKeyword: seo.focusKeyword || '',
          canonicalUrl: seo.canonicalUrl || `https://www.neptuneautomatic.com/products/${updated.categorySlug}/${updated.slug}/`,
          ogTitle: seo.ogTitle || updated.name,
          ogDescription: seo.ogDescription || updated.shortDesc || '',
          ogImage: parsedImages[0] || '/assets/images/logo.png',
        },
      });
    }

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'UPDATE_PRODUCT',
      entityType: 'product',
      entityId: updated.id,
      details: { name: updated.name, slug: updated.slug },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error('Update product error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await authenticateRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const product = await prisma.product.findUnique({ where: { id: params.id } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    await prisma.product.delete({ where: { id: params.id } });

    await createAuditLog({
      userId: user.id,
      userName: user.name,
      action: 'DELETE_PRODUCT',
      entityType: 'product',
      entityId: params.id,
      details: { name: product.name, slug: product.slug },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
