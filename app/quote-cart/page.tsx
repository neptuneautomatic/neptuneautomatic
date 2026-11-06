import React from 'react';
import { Metadata } from 'next';
import CartPageView from '@/components/cart/CartPageView';

export const metadata: Metadata = {
  title: 'Official Request for Quotation (RFQ) Cart | Neptune Automatic',
  description:
    'Generate instant B2B tender estimates, formal quotations, and engineering proposals for Neptune access automation, bollards, and parking systems.',
};

export default function QuoteCartPage() {
  return <CartPageView />;
}
