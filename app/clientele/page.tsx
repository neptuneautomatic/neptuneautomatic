import React from 'react';
import { Metadata } from 'next';
import ClienteleView from '@/components/clientele/ClienteleView';

export const metadata: Metadata = {
  title: 'Clientele & Landmark Deployments | Neptune Automatic',
  description:
    'Trusted by over 100+ premier establishments across India including Airports Authority of India (AAI), DRDO, Reserve Bank of India (RBI), DLF CyberCity, Reliance Industries, TCS, and luxury hotel chains.',
  keywords: [
    'Neptune Automatic Clientele',
    'Perimeter Security Clients India',
    'Boom Barrier Clients',
    'Automatic Bollard Installations',
    'AAI Airport Security',
    'RBI Vault Security',
    'DLF Cybercity Parking',
    'G20 Bharat Mandapam Security',
  ],
  openGraph: {
    title: 'Clientele & Landmark Deployments | Neptune Automatic',
    description:
      'Over 1,500+ mission-critical access automation and parking management installations across India’s leading corporate and public institutions.',
    images: ['/assets/images/neptune-logo.png'],
  },
};

export default function ClientelePage() {
  return <ClienteleView />;
}
