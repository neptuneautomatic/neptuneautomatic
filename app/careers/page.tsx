import React from 'react';
import { Metadata } from 'next';
import CareersView from '@/components/careers/CareersView';

export const metadata: Metadata = {
  title: 'Careers at Neptune Automatic | Job Openings & Opportunities',
  description:
    'Explore engineering, sales, pre-sales, and technical operations roles at Neptune Automatic. Join India’s market leader in access automation, crash bollards, and smart parking systems.',
  keywords: [
    'Neptune Automatic Careers',
    'Automation Engineering Jobs India',
    'Security Systems Sales Manager Jobs',
    'Boom Barrier Jobs Delhi Mumbai Bengaluru',
    'Hardware Engineering Openings',
  ],
};

export default function CareersPage() {
  return <CareersView />;
}
