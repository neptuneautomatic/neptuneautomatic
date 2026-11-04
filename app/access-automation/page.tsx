import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getParentCategoryBySlug } from '@/data/productsData';
import ParentCategoryDetailView from '@/components/products/ParentCategoryDetailView';

const parent = getParentCategoryBySlug('access-automation')!;

export const metadata: Metadata = {
  title: parent?.title,
  description: parent?.description,
  keywords: [parent?.name || '', 'Neptune Automatic', 'Boom Barriers', 'Bollards', 'Access Automation'],
  openGraph: {
    title: parent?.title,
    description: parent?.description,
    images: parent ? [parent.heroImage] : [],
  },
};

export default function AccessAutomationPage() {
  const parentCategory = getParentCategoryBySlug('access-automation');
  if (!parentCategory) notFound();
  return <ParentCategoryDetailView parentCategory={parentCategory} />;
}
