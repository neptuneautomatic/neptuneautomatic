'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAdmin } from './components/AdminContext';

export default function AdminDashboardPage() {
  const { user } = useAdmin();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftContent, setDraftContent] = useState('');
  const [draftSaving, setDraftSaving] = useState(false);
  const [draftMsg, setDraftMsg] = useState('');

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to load stats', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleQuickDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim()) return;
    setDraftSaving(true);
    setDraftMsg('');

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: draftTitle,
          content: draftContent,
          excerpt: draftContent.slice(0, 120),
          status: 'draft',
        }),
      });

      if (res.ok) {
        setDraftMsg('Draft saved successfully!');
        setDraftTitle('');
        setDraftContent('');
        fetchStats();
      } else {
        const data = await res.json();
        setDraftMsg(data.error || 'Failed to save draft');
      }
    } catch {
      setDraftMsg('Error connecting to server');
    } finally {
      setDraftSaving(false);
    }
  };

  const handleStatusChange = async (submissionId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: submissionId, status: newStatus }),
      });
      if (res.ok) {
        fetchStats();
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem' }}>
        <p style={{ color: '#6B7280' }}>Loading dashboard data...</p>
      </div>
    );
  }

  const counts = stats?.counts || {};

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        padding: '1.5rem 1.75rem',
        marginBottom: '1.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111827', margin: '0 0 0.35rem 0' }}>
            Welcome back, {user?.name || 'Administrator'}! 👋
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#6B7280', margin: 0 }}>
            Here is what is happening across Neptune Automatic website & digital assets today.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link href="/admin/products" className="admin-btn admin-btn-secondary admin-btn-sm">
            Manage Products
          </Link>
          <Link href="/admin/submissions" className="admin-btn admin-btn-primary admin-btn-sm">
            View Inquiries ({counts.submissionsPending || 0})
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="admin-kpi-grid">
        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Products in Catalog</div>
            <div className="admin-kpi-num">{counts.products || 0}</div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
              Across {counts.productCategories || 0} categories
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284C7' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Blog Articles</div>
            <div className="admin-kpi-num">{counts.posts || 0}</div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              {counts.postsDraft || 0} drafts in progress
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </div>
        </div>

        <div className="admin-kpi-card">
          <div>
            <div className="admin-kpi-label">Active Website Pages</div>
            <div className="admin-kpi-num">{counts.pages || 0}</div>
            <div style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 600 }}>
              All dynamic & editable
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803D' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
        </div>

        <div className="admin-kpi-card" style={{ borderLeft: '4px solid #D32628' }}>
          <div>
            <div className="admin-kpi-label">Pending Inquiries & RFQ</div>
            <div className="admin-kpi-num" style={{ color: '#D32628' }}>
              {counts.submissionsPending || 0}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
              Total submissions: {counts.submissions || 0}
            </div>
          </div>
          <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#DC2626' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
        </div>
      </div>

      {/* Main Grid: Recent Submissions + Quick Draft / System Info */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.75rem', alignItems: 'start' }}>
        {/* Left Column: Recent Submissions */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Recent Customer Inquiries & RFQ
            </h3>
            <Link href="/admin/submissions" style={{ fontSize: '0.82rem', color: '#01358b', fontWeight: 600, textDecoration: 'none' }}>
              View All Submissions →
            </Link>
          </div>

          {(!stats?.recentSubmissions || stats.recentSubmissions.length === 0) ? (
            <p style={{ color: '#9CA3AF', fontSize: '0.85rem', textAlign: 'center', padding: '2rem 0' }}>
              No inquiries received yet.
            </p>
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Submitter</th>
                    <th>Form / Subject</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentSubmissions.map((sub: any) => {
                    const dataObj = typeof sub.data === 'string' ? JSON.parse(sub.data || '{}') : sub.data;
                    const name = dataObj.name || dataObj.fullName || 'Anonymous';
                    const email = dataObj.email || sub.form?.title || 'No email';
                    return (
                      <tr key={sub.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: '#111827' }}>{name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{email}</div>
                        </td>
                        <td>
                          <span style={{ fontSize: '0.82rem', fontWeight: 500 }}>
                            {sub.form?.title || 'Contact Form'}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`admin-status-badge badge-${sub.status}`}>
                            {sub.status}
                          </span>
                        </td>
                        <td>
                          {sub.status === 'pending' ? (
                            <button
                              onClick={() => handleStatusChange(sub.id, 'contacted')}
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                              title="Mark as contacted"
                            >
                              Mark Contacted
                            </button>
                          ) : (
                            <Link
                              href="/admin/submissions"
                              className="admin-btn admin-btn-secondary admin-btn-sm"
                            >
                              View
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: WordPress Quick Draft + System Info */}
        <div>
          {/* Quick Draft Box */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
                Quick Draft
              </h3>
            </div>

            {draftMsg && (
              <div style={{
                fontSize: '0.82rem',
                padding: '0.5rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                backgroundColor: draftMsg.includes('success') ? '#DCFCE7' : '#FEE2E2',
                color: draftMsg.includes('success') ? '#15803D' : '#B91C1C'
              }}>
                {draftMsg}
              </div>
            )}

            <form onSubmit={handleQuickDraft}>
              <div className="admin-form-group">
                <label className="admin-label">Article Title</label>
                <input
                  type="text"
                  placeholder="Enter draft title..."
                  className="admin-input"
                  value={draftTitle}
                  onChange={(e) => setDraftTitle(e.target.value)}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Content Excerpt</label>
                <textarea
                  rows={4}
                  placeholder="What is on your mind?..."
                  className="admin-textarea"
                  value={draftContent}
                  onChange={(e) => setDraftContent(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={draftSaving}
                className="admin-btn admin-btn-primary admin-btn-sm"
                style={{ width: '100%' }}
              >
                {draftSaving ? 'Saving Draft...' : 'Save Draft'}
              </button>
            </form>
          </div>

          {/* System & Database Health */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 14 14"></polyline>
                </svg>
                System Status
              </h3>
            </div>

            <div style={{ fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#6B7280' }}>Database Engine</span>
                <span style={{ fontWeight: 600, color: '#111827' }}>SQLite + Prisma ORM</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#6B7280' }}>Active Models</span>
                <span style={{ fontWeight: 600, color: '#059669' }}>30 Relational Tables</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#6B7280' }}>Web Server</span>
                <span style={{ fontWeight: 600, color: '#111827' }}>Next.js App Router (Full Dynamic)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.4rem' }}>
                <span style={{ color: '#6B7280' }}>Authentication</span>
                <span style={{ fontWeight: 600, color: '#059669' }}>Secure JWT + HTTP-Only Cookie</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B7280' }}>Media Storage</span>
                <span style={{ fontWeight: 600, color: '#111827' }}>Local Disk (/public/assets/uploads)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
