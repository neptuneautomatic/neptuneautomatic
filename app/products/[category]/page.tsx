import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCT_CATEGORIES, getCategoryBySlug } from '@/data/productsData';
import CategoryDetailView from '@/components/products/CategoryDetailView';

interface PageProps {
  params: {
    category: string;
  };
}

export function generateStaticParams() {
  return PRODUCT_CATEGORIES.map((cat) => ({
    category: cat.categorySlug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
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
  const category = getCategoryBySlug(params.category);
  if (!category) {
    notFound();
  }

  return <CategoryDetailView category={category} />;
}
