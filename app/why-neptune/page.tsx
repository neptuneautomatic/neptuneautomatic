import React from 'react';
import { Metadata } from 'next';
import WhyNeptuneView from '@/components/about/WhyNeptuneView';

export const metadata: Metadata = {
  title: 'Why Neptune Automatic | 30+ Years Engineering Heritage',
  description:
    'Discover why India’s premier infrastructure developers, EPC consultants, and government institutions trust Neptune Automatic for access automation, crash bollards, and parking solutions.',
  keywords: [
    'Why Neptune Automatic',
    'Neptune Group Legacy',
    'FAAC India Partnership',
    'Make in India Boom Barriers',
    'ASTM M50 Crash Rated Bollards India',
    'Automatic Access Systems Manufacturer',
  ],
};

export default function WhyNeptunePage() {
  return <WhyNeptuneView />;
}
