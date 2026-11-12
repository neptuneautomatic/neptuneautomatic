'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAdmin } from './AdminContext';
import { adminFetch } from '@/lib/adminApi';

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAdmin();
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine section title
  const getSectionTitle = () => {
    if (pathname === '/admin' || pathname === '/admin/') return 'Dashboard Overview';
    if (pathname.startsWith('/admin/pages')) return 'Page Management';
    if (pathname.startsWith('/admin/posts')) return 'Blog Posts';
    if (pathname.startsWith('/admin/products')) return 'Product Catalog';
    if (pathname.startsWith('/admin/categories')) return 'Categories & Taxonomies';
    if (pathname.startsWith('/admin/media')) return 'Media Library';
    if (pathname.startsWith('/admin/menus')) return 'Navigation Menus';
    if (pathname.startsWith('/admin/submissions')) return 'Inquiries & Submissions';
    if (pathname.startsWith('/admin/seo')) return 'Search Engine Optimization (SEO)';
    if (pathname.startsWith('/admin/users')) return 'Users & Role Management';
    if (pathname.startsWith('/admin/settings')) return 'Global Website Settings';
    if (pathname.startsWith('/admin/backups')) return 'Database Backups';
    if (pathname.startsWith('/admin/logs')) return 'System Audit Logs';
    return 'Administration';
  };

  useEffect(() => {
    const fetchNotifs = async () => {
      try {
        const res = await adminFetch('/api/notifications/');
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications || []);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchNotifs();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/admin/products?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-left">
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: '#111827' }}>
          {getSectionTitle()}
        </h1>

        {/* Global Quick Search */}
        <form onSubmit={handleSearchSubmit} style={{ position: 'relative', marginLeft: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search products, posts, pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem 0.45rem 2.2rem',
              borderRadius: '20px',
              border: '1px solid #D1D5DB',
              fontSize: '0.82rem',
              width: '260px',
              outline: 'none',
              backgroundColor: '#F9FAFB',
            }}
          />
          <svg
            style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </form>
      </div>

      <div className="admin-topbar-right">
        {/* + New Quick Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNewMenu(!showNewMenu)}
            className="admin-btn admin-btn-primary admin-btn-sm"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            New
          </button>

          {showNewMenu && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                width: '180px',
                zIndex: 60,
                padding: '0.5rem 0'
              }}
              onMouseLeave={() => setShowNewMenu(false)}
            >
              <Link
                href="/admin/pages?action=new"
                onClick={() => setShowNewMenu(false)}
                style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#374151', textDecoration: 'none' }}
              >
                + New Page
              </Link>
              <Link
                href="/admin/posts?action=new"
                onClick={() => setShowNewMenu(false)}
                style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#374151', textDecoration: 'none' }}
              >
                + New Blog Post
              </Link>
              <Link
                href="/admin/products?action=new"
                onClick={() => setShowNewMenu(false)}
                style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#374151', textDecoration: 'none' }}
              >
                + New Product
              </Link>
              <Link
                href="/admin/media"
                onClick={() => setShowNewMenu(false)}
                style={{ display: 'block', padding: '0.5rem 1rem', fontSize: '0.85rem', color: '#374151', textDecoration: 'none' }}
              >
                + Upload Media
              </Link>
            </div>
          )}
        </div>

        {/* Notifications Icon & Popover */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            style={{
              background: 'none',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
              padding: '0.4rem',
              color: '#4B5563',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {notifications.filter(n => !n.isRead).length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 2,
                  right: 2,
                  width: 8,
                  height: 8,
                  backgroundColor: '#D32628',
                  borderRadius: '50%'
                }}
              />
            )}
          </button>

          {showNotifs && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                marginTop: '0.5rem',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                width: '320px',
                zIndex: 60,
                padding: '0.75rem'
              }}
              onMouseLeave={() => setShowNotifs(false)}
            >
              <div style={{ fontWeight: 700, fontSize: '0.85rem', paddingBottom: '0.5rem', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
                <span>Notifications</span>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>{notifications.length} recent</span>
              </div>
              <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '1rem', textAlign: 'center', color: '#9CA3AF', fontSize: '0.82rem' }}>
                    No recent notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} style={{ padding: '0.65rem 0', borderBottom: '1px solid #F3F4F6' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', color: '#111827' }}>{n.title}</div>
                      <div style={{ fontSize: '0.75rem', color: '#4B5563' }}>{n.message}</div>
                      <div style={{ fontSize: '0.7rem', color: '#9CA3AF', marginTop: 2 }}>
                        {new Date(n.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingLeft: '0.5rem', borderLeft: '1px solid #E5E7EB' }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              backgroundColor: '#01358b',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.85rem'
            }}
          >
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div style={{ display: 'none', flexDirection: 'column' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#111827' }}>{user?.name}</span>
            <span style={{ fontSize: '0.72rem', color: '#6B7280' }}>{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
