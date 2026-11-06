import React from 'react';
import { Metadata } from 'next';
import ContactView from '@/components/contact/ContactView';

export const metadata: Metadata = {
  title: 'Contact Neptune Automatic | Headquarters & Regional Branch Offices',
  description:
    'Contact Neptune Automatic for turnkey access automation, crash bollard specifications, and FASTag parking inquiries. Offices in New Delhi, Greater Noida, Mumbai, Bengaluru, Chennai, Ahmedabad, Hyderabad, and Kolkata.',
  keywords: [
    'Contact Neptune Automatic',
    'Neptune Automatic Delhi Address',
    'Boom Barrier Supplier Mumbai',
    'Crash Bollards Bengaluru',
    'Neptune Automatic Toll Free Number',
  ],
};

export default function ContactPage() {
  return <ContactView />;
}
