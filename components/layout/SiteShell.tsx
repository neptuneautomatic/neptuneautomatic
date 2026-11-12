'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import QuoteModal from '@/components/modals/QuoteModal';
import SearchModal from '@/components/modals/SearchModal';
import VideoModal from '@/components/modals/VideoModal';
import FloatingActions from './FloatingActions';

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
      <CartDrawer />
      <QuoteModal />
      <SearchModal />
      <VideoModal />
      <FloatingActions />
    </>
  );
}
