'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import './admin.css';
import { AdminProvider, useAdmin } from './components/AdminContext';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAdmin();

  if (pathname === '/admin/login') {
    return <div className="admin-body">{children}</div>;
  }

  if (loading) {
    return (
      <div className="admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '4px solid #E5E7EB',
            borderTopColor: '#01358b',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem auto'
          }} />
          <p style={{ color: '#6B7280', fontSize: '0.9rem', fontWeight: 500 }}>Loading Neptune Administration...</p>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-body">
      <div className="admin-layout-container">
        <AdminSidebar />
        <div className="admin-main-wrapper">
          <AdminHeader />
          <main className="admin-content">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
