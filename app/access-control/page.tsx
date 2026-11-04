import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getParentCategoryBySlug } from '@/data/productsData';
import ParentCategoryDetailView from '@/components/products/ParentCategoryDetailView';

const parent = getParentCategoryBySlug('access-control')!;

export const metadata: Metadata = {
  title: parent?.title,
  description: parent?.description,
  keywords: [parent?.name || '', 'Neptune Automatic', 'UHF RFID', 'Speed Gates', 'Access Control'],
  openGraph: {
    title: parent?.title,
    description: parent?.description,
    images: parent ? [parent.heroImage] : [],
  },
};

export default function AccessControlPage() {
  const parentCategory = getParentCategoryBySlug('access-control');
  if (!parentCategory) notFound();
  return <ParentCategoryDetailView parentCategory={parentCategory} />;
}
