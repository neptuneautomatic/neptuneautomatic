import React from 'react';
import { Metadata } from 'next';
import LeadershipView from '@/components/about/LeadershipView';

export const metadata: Metadata = {
  title: 'Executive Leadership Team | Neptune Automatic',
  description:
    'Meet the leadership team behind Neptune Automatic: Founder & MD Mr. Deepak Kapoor, Director Mr. Rahul Kumar, and our engineering management guiding India’s access automation sector.',
  keywords: [
    'Deepak Kapoor Neptune',
    'Rahul Kumar Neptune Automatic',
    'Neptune Automatic Leadership',
    'FAAC India Founder',
    'Access Automation Directors India',
  ],
};

export default function LeadershipPage() {
  return <LeadershipView />;
}
