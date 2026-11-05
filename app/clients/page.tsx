import React from 'react';
import { Metadata } from 'next';
import ClienteleView from '@/components/clientele/ClienteleView';

export const metadata: Metadata = {
  title: 'Our Clients & References | Neptune Automatic',
  description:
    'Explore Neptune Automatic’s verified clientele portfolio: trusted by India’s top government, defense, banking, IT, and real estate leaders.',
};

export default function ClientsAliasPage() {
  return <ClienteleView />;
}
