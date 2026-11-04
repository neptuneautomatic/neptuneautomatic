import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  PRODUCT_CATEGORIES,
  PARENT_CATEGORIES,
  getCategoryBySlug,
  getParentCategoryBySlug,
} from '@/data/productsData';
import CategoryDetailView from '@/components/products/CategoryDetailView';
import ParentCategoryDetailView from '@/components/products/ParentCategoryDetailView';

interface PageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  const categoryParams = PRODUCT_CATEGORIES.map((cat) => ({
    category: cat.categorySlug,
  }));

  const parentCategoryParams = PARENT_CATEGORIES.flatMap((p) => [
    { category: p.slug },
    ...(p.aliases || []).map((alias) => ({ category: alias })),
  ]);

  return [...categoryParams, ...parentCategoryParams];
}

export function generateMetadata({ params }: PageProps): Metadata {
  const parentCategory = getParentCategoryBySlug(params.category);
  if (parentCategory) {
    return {
      title: parentCategory.title,
      description: parentCategory.description,
      keywords: [
        parentCategory.name,
        'Neptune Automatic',
        'Access Automation India',
        'Industrial Security Hardware',
        'Enterprise Turnkey Systems',
      ],
      openGraph: {
        title: parentCategory.title,
        description: parentCategory.description,
        images: [parentCategory.heroImage],
      },
    };
  }

  const category = getCategoryBySlug(params.category);
  if (!category) {
    return {
      title: 'Product Category Not Found | Neptune Automatic',
    };
  }

  return {
    title: `${category.categoryName} — Turnkey Access Automation & Perimeter Security | Neptune Automatic`,
    description: category.description || category.tagline,
    keywords: [
      category.categoryName,
      category.division,
      'Neptune Automatic',
      'Industrial Access Control',
      'Security Automation India',
    ],
    openGraph: {
      title: `${category.categoryName} | Neptune Automatic`,
      description: category.description,
      images: [category.heroImage],
    },
  };
}

export default function CategoryPage({ params }: PageProps) {
  const parentCategory = getParentCategoryBySlug(params.category);
  if (parentCategory) {
    return <ParentCategoryDetailView parentCategory={parentCategory} />;
  }

  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  return <CategoryDetailView category={category} />;
}

