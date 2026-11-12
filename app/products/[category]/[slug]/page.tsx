import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCT_CATEGORIES, getProductBySlugs, getCategoryBySlug, ProductItem, ProductCategory } from '@/data/productsData';
import ProductDetailView from '@/components/products/ProductDetailView';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export function generateStaticParams() {
  const params: { category: string; slug: string }[] = [];
  PRODUCT_CATEGORIES.forEach((cat) => {
    cat.products.forEach((prod) => {
      params.push({
        category: cat.categorySlug,
        slug: prod.slug,
      });
    });
  });
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = getProductBySlugs(params.category, params.slug);
  if (!result) {
    return {
      title: 'Product Not Found | Neptune Automatic',
    };
  }

  const { product, category } = result;

  return {
    title: `${product.name} (${product.modelCode}) — Technical Specifications | Neptune Automatic`,
    description: product.shortDesc || product.description,
    keywords: [
      product.name,
      product.modelCode,
      category.categoryName,
      category.division,
      'Neptune Automatic',
      'Technical Specifications',
      'Engineering Datasheet',
    ],
    openGraph: {
      title: `${product.name} | Neptune Automatic`,
      description: product.shortDesc,
      images: product.images.length > 0 ? [product.images[0]] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  let result = getProductBySlugs(params.category, params.slug);

  try {
    const dbProduct = await prisma.product.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    });

    if (dbProduct && dbProduct.status === 'published') {
      let productImages: string[] = [];
      if (dbProduct.imagesJson) {
        try { productImages = JSON.parse(dbProduct.imagesJson); } catch {}
      }
      const heroImage = productImages[0] || '/assets/images/products/hero.jpg';

      let cat = result?.category || getCategoryBySlug(params.category);
      if (!cat) {
        cat = {
          categoryName: dbProduct.category?.name || 'Access Automation',
          categorySlug: params.category,
          division: 'Access Automation',
          divisionSlug: 'access-automation',
          title: `${dbProduct.name} | Neptune Automatic`,
          h1: dbProduct.name,
          tagline: 'Technical Engineering Specifications',
          description: dbProduct.shortDesc || '',
          heroImage: heroImage,
          highlights: [],
          overviewSpecs: [],
          products: [],
        };
      }

      // Parse specs into ProductSpec[]
      let specsList: { key: string; value: string }[] = [];
      if (dbProduct.specsJson) {
        try {
          const parsed = JSON.parse(dbProduct.specsJson);
          if (Array.isArray(parsed)) {
            specsList = parsed.map((item: any) => ({
              key: String(item.key || item.label || ''),
              value: String(item.value || ''),
            }));
          } else if (typeof parsed === 'object') {
            specsList = Object.entries(parsed).map(([key, value]) => ({
              key,
              value: String(value),
            }));
          }
        } catch {}
      }

      // Parse fast facts into FastFact[]
      let fastFactsList: { label: string; value: string }[] = [];
      if (dbProduct.fastFactsJson) {
        try {
          const facts = JSON.parse(dbProduct.fastFactsJson);
          if (Array.isArray(facts)) {
            fastFactsList = facts.map((f: any) => ({
              label: String(f.label || f.key || 'Specification'),
              value: String(f.value || f),
            }));
          }
        } catch {}
      }

      // Parse features into string[]
      let featuresArr: string[] = [];
      if (dbProduct.featuresJson) {
        try { featuresArr = JSON.parse(dbProduct.featuresJson); } catch {}
      }

      const activeProduct: ProductItem = result?.product ? {
        ...result.product,
        name: dbProduct.name,
        modelCode: dbProduct.modelCode || result.product.modelCode,
        shortDesc: dbProduct.shortDesc || result.product.shortDesc,
        description: dbProduct.description || result.product.description,
        images: productImages.length > 0 ? productImages : result.product.images,
        specs: specsList.length > 0 ? specsList : result.product.specs,
        fastFacts: fastFactsList.length > 0 ? fastFactsList : result.product.fastFacts,
        features: featuresArr.length > 0 ? featuresArr : result.product.features,
      } : {
        slug: dbProduct.slug,
        name: dbProduct.name,
        modelCode: dbProduct.modelCode || 'NAPL-SERIES',
        categorySlug: params.category,
        categoryName: dbProduct.category?.name || 'Access Automation',
        division: 'Access Automation',
        divisionSlug: 'access-automation',
        tagline: 'Technical Engineering Specifications',
        shortDesc: dbProduct.shortDesc || '',
        description: dbProduct.description || '',
        features: featuresArr,
        specs: specsList,
        images: productImages.length > 0 ? productImages : ['/assets/images/products/product-1.jpg'],
        fastFacts: fastFactsList,
      };

      return <ProductDetailView category={cat} product={activeProduct} />;
    }
  } catch (err) {
    console.error('Error fetching product from db', err);
  }

  if (!result) {
    notFound();
  }

  return <ProductDetailView category={result.category} product={result.product} />;
}
