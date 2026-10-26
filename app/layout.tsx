import type { Metadata } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';
import { ModalProvider } from '@/context/ModalContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import QuoteModal from '@/components/modals/QuoteModal';
import SearchModal from '@/components/modals/SearchModal';
import VideoModal from '@/components/modals/VideoModal';

const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Neptune Automatic — India's Premier Access Automation & Smart Parking Solutions",
  description:
    "Neptune Automatic Pvt. Ltd. (NAPL) is India's leading turnkey manufacturer of automatic boom barriers, crash-rated bollards, intelligent parking management systems (PMS), and perimeter security automation since 2005.",
  keywords: [
    'Boom Barriers',
    'Automatic Bollards',
    'Parking Management System',
    'PMS India',
    'Crash Rated Bollards',
    'FASTag Parking',
    'Neptune Automatic',
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" className={lexend.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#D32628" />
      </head>
      <body>
        <ModalProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <QuoteModal />
          <SearchModal />
          <VideoModal />
        </ModalProvider>
      </body>
    </html>
  );
}
