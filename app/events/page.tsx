import React from 'react';
import { Metadata } from 'next';
import EventsTimelineView from '@/components/events/EventsTimelineView';

export const metadata: Metadata = {
  title: 'Industry Events, Exhibitions & Trade Summits | Neptune Automatic',
  description:
    'Explore Neptune Automatic’s timeline of upcoming and past exhibitions, including the G20 Leaders’ Summit perimeter security, Elecrama, TrafficInfraTech, and IFSEC India.',
  keywords: [
    'Neptune Automatic Events',
    'Upcoming TrafficInfraTech Expo 2026',
    'IFSEC India 2026 Security',
    'Elecrama 2025 Automation',
    'G20 Leaders Summit Security Hardening',
    'Homeland Security Trade Summits',
  ],
};

export default function EventsPage() {
  return <EventsTimelineView />;
}
