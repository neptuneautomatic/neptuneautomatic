'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VideoModalData {
  videoId: string;
  title: string;
}

interface ModalContextType {
  isQuoteOpen: boolean;
  quoteProduct: string;
  openQuote: (productName?: string) => void;
  closeQuote: () => void;

  isVideoOpen: boolean;
  videoData: VideoModalData | null;
  openVideo: (videoId: string, title?: string) => void;
  closeVideo: () => void;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState('');

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoData, setVideoData] = useState<VideoModalData | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openQuote = (productName = '') => {
    setQuoteProduct(productName);
    setIsQuoteOpen(true);
  };

  const closeQuote = () => {
    setIsQuoteOpen(false);
    setQuoteProduct('');
  };

  const openVideo = (videoId: string, title = '') => {
    setVideoData({ videoId, title });
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
    setVideoData(null);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isQuoteOpen,
        quoteProduct,
        openQuote,
        closeQuote,
        isVideoOpen,
        videoData,
        openVideo,
        closeVideo,
        isSearchOpen,
        openSearch,
        closeSearch,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
