import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getParentCategoryBySlug } from '@/data/productsData';
import ParentCategoryDetailView from '@/components/products/ParentCategoryDetailView';

const parent = getParentCategoryBySlug('parking-management-systems')!;

export const metadata: Metadata = {
  title: parent?.title,
  description: parent?.description,
  keywords: [parent?.name || '', 'Neptune Automatic', 'FASTag Parking', 'Parking Guidance', 'Parking Management'],
  openGraph: {
    title: parent?.title,
    description: parent?.description,
    images: parent ? [parent.heroImage] : [],
  },
};

export default function ParkingManagementSystemsPage() {
  const parentCategory = getParentCategoryBySlug('parking-management-systems');
  if (!parentCategory) notFound();
  return <ParentCategoryDetailView parentCategory={parentCategory} />;
}
