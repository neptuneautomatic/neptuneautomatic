import React from 'react';
import { Metadata } from 'next';
import CartPageView from '@/components/cart/CartPageView';

export const metadata: Metadata = {
  title: 'Quotation Cart & Technical Proposal Builder | Neptune Automatic',
  description:
    'Review selected perimeter security hardware, boom barriers, crash bollards, and parking management equipment. Submit your official Request for Quotation (RFQ) directly to Neptune engineering teams.',
  keywords: [
    'Quotation Cart',
    'Request For Quotation',
    'RFQ Neptune Automatic',
    'B2B Security Hardware Procurement',
    'Boom Barrier Price Quote',
    'Bollard Pricing India',
  ],
};

export default function CartPage() {
  return <CartPageView />;
}
