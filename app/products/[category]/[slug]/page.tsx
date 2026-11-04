import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCT_CATEGORIES, getProductBySlugs } from '@/data/productsData';
import ProductDetailView from '@/components/products/ProductDetailView';

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

export function generateMetadata({ params }: PageProps): Metadata {
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

export default function ProductDetailPage({ params }: PageProps) {
  const result = getProductBySlugs(params.category, params.slug);
  if (!result) {
    notFound();
  }

  return <ProductDetailView category={result.category} product={result.product} />;
}
