'use client';

import React from 'react';
import './admin.css';
import { AdminProvider, useAdmin } from './components/AdminContext';
import AdminSidebar from './components/AdminSidebar';
import AdminHeader from './components/AdminHeader';
import AdminAuthScreen from './components/AdminAuthScreen';

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdmin();

  // Initial authentication check
  if (loading) {
    return (
      <div className="admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#0F172A' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            border: '4px solid #334155',
            borderTopColor: '#01358b',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem auto'
          }} />
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', fontWeight: 500 }}>Initializing Neptune Administration...</p>
          <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }` }} />
        </div>
      </div>
    );
  }

  // Step 1: Authentication screen first (requires ID and Password)
  if (!user) {
    return <AdminAuthScreen />;
  }

  // Step 2: Once ID and Pass are verified, render the full Dashboard workspace
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
