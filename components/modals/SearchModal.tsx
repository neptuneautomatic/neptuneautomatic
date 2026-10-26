'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useModal } from '@/context/ModalContext';
import { CATALOG_ITEMS, CatalogItem } from '@/data/catalog';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, openQuote } = useModal();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setQuery('');
      setCategory('all');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        // Toggle search
        if (isSearchOpen) closeSearch();
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const filteredItems = CATALOG_ITEMS.filter((item) => {
    const matchesCategory = category === 'all' || item.category.toLowerCase().includes(category.toLowerCase());
    if (!matchesCategory) return false;
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q)
    );
  });

  const handleItemSelect = (item: CatalogItem) => {
    closeSearch();
    const el = document.querySelector(item.targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    if (item.tabKey) {
      window.dispatchEvent(new CustomEvent('switch-product-tab', { detail: { tab: item.tabKey } }));
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="search-modal-backdrop active"
      id="searchModal"
      aria-hidden="false"
      role="dialog"
      aria-modal="true"
      aria-labelledby="searchModalTitle"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeSearch();
      }}
    >
      <div className="search-modal-dialog">
        <div className="search-modal-header">
          <div className="search-input-box">
            <svg className="search-modal-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              type="text"
              id="siteSearchInput"
              className="search-input"
              placeholder="Search barriers, bollards, RFID, parking, access control..."
              autoComplete="off"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className="search-clear-btn visible"
                aria-label="Clear search input"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <button type="button" className="search-close-btn" id="searchCloseBtn" aria-label="Close search" onClick={closeSearch}>
            <kbd>ESC</kbd>
          </button>
        </div>

        {/* Quick Category Filter Chips */}
        <div className="search-category-chips">
          {['all', 'Access Automation', 'Access Control', 'Accessories', 'Parking'].map((cat) => (
            <button
              key={cat}
              type="button"
              className={`search-chip ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat === 'all' ? `All (${CATALOG_ITEMS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Live Search Results List */}
        <div className="search-modal-body">
          {filteredItems.length === 0 ? (
            <div className="search-empty-state" id="searchEmptyState">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <p>No matching products or solutions found for &quot;{query}&quot;</p>
              <span className="search-empty-hint">Try searching for barrier, bollard, RFID, reader, parking, shutter, or sensor</span>
            </div>
          ) : (
            <div className="search-results-list" id="searchResultsList">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.title}
                  className={`search-result-item ${selectedIndex === idx ? 'highlighted' : ''}`}
                  onClick={() => handleItemSelect(item)}
                >
                  <div className="search-result-main">
                    <span className="search-result-tag">{item.category}</span>
                    <h4 className="search-result-title">{item.title}</h4>
                    <p className="search-result-desc">{item.desc}</p>
                  </div>
                  <div className="search-result-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Footer */}
        <div className="search-modal-footer">
          <div className="search-footer-hint">
            <span><kbd>↑</kbd><kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div className="search-footer-brand">
            NEPTUNE AUTOMATIC CATALOG
          </div>
        </div>
      </div>
    </div>
  );
}
