'use client';

import React, { useEffect, useState } from 'react';
import { adminFetch } from '@/lib/adminApi';

interface RedirectItem {
  id: string;
  sourceUrl: string;
  targetUrl: string;
  statusCode: number;
  hits: number;
  createdAt: string;
}

export default function AdminSeoPage() {
  const [activeTab, setActiveTab] = useState<'meta' | 'redirects' | 'sitemap'>('meta');
  const [redirects, setRedirects] = useState<RedirectItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Global SEO Form
  const [metaTitle, setMetaTitle] = useState('Neptune Automatic | Industrial Automation & Washing Solutions');
  const [metaDesc, setMetaDesc] = useState('Leading manufacturer of automatic wheel washers, tyre cleaning systems, and municipal waste management equipment.');
  const [ogImage, setOgImage] = useState('/assets/images/logo/logo.png');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('G-XXXXXXXXXX');
  const [gscVerification, setGscVerification] = useState('');
  const [savingMeta, setSavingMeta] = useState(false);
  const [metaFeedback, setMetaFeedback] = useState('');

  // Add Redirect Form
  const [sourceUrl, setSourceUrl] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [statusCode, setStatusCode] = useState(301);
  const [addingRedirect, setAddingRedirect] = useState(false);

  const fetchSeoData = async () => {
    try {
      setLoading(true);
      const res = await adminFetch('/api/seo/');
      if (res.ok) {
        const data = await res.json();
        setRedirects(data.redirects || []);
        if (data.metadata) {
          if (data.metadata.title) setMetaTitle(data.metadata.title);
          if (data.metadata.description) setMetaDesc(data.metadata.description);
          if (data.metadata.ogImage) setOgImage(data.metadata.ogImage);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeoData();
  }, []);

  const handleSaveMetadata = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMeta(true);
    setMetaFeedback('');

    try {
      const res = await adminFetch('/api/seo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_metadata',
          metadata: {
            title: metaTitle,
            description: metaDesc,
            ogImage,
            googleAnalyticsId,
            gscVerification,
          },
        }),
      });

      if (res.ok) {
        setMetaFeedback('SEO Metadata saved successfully!');
      } else {
        const d = await res.json();
        setMetaFeedback(d.error || 'Failed to save SEO settings');
      }
    } catch {
      setMetaFeedback('Error connecting to server');
    } finally {
      setSavingMeta(false);
      setTimeout(() => setMetaFeedback(''), 3000);
    }
  };

  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sourceUrl.trim() || !targetUrl.trim()) return;
    setAddingRedirect(true);

    try {
      const res = await adminFetch('/api/seo/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add_redirect',
          sourceUrl: sourceUrl.trim(),
          targetUrl: targetUrl.trim(),
          statusCode: Number(statusCode),
        }),
      });

      if (res.ok) {
        setSourceUrl('');
        setTargetUrl('');
        await fetchSeoData();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to create redirect');
      }
    } catch {
      alert('Network error');
    } finally {
      setAddingRedirect(false);
    }
  };

  const handleDeleteRedirect = async (id: string) => {
    if (!confirm('Are you sure you want to delete this redirect?')) return;

    try {
      const res = await adminFetch(`/api/seo/?redirectId=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchSeoData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            SEO & URL Redirects
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Control search engine visibility, canonical indexing, redirects, and automated sitemaps
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('meta')}
          className={`admin-tab ${activeTab === 'meta' ? 'is-active' : ''}`}
        >
          Global Metadata & Analytics
        </button>
        <button
          onClick={() => setActiveTab('redirects')}
          className={`admin-tab ${activeTab === 'redirects' ? 'is-active' : ''}`}
        >
          301 / 302 URL Redirects ({redirects.length})
        </button>
        <button
          onClick={() => setActiveTab('sitemap')}
          className={`admin-tab ${activeTab === 'sitemap' ? 'is-active' : ''}`}
        >
          Sitemap & Robots.txt
        </button>
      </div>

      {/* Tab 1: Global Metadata */}
      {activeTab === 'meta' && (
        <div className="admin-card" style={{ maxWidth: '780px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Default Search Engine Metadata</h3>
          </div>

          {metaFeedback && (
            <div style={{
              padding: '0.75rem',
              borderRadius: 6,
              marginBottom: '1rem',
              fontSize: '0.85rem',
              backgroundColor: metaFeedback.includes('success') ? '#DCFCE7' : '#FEE2E2',
              color: metaFeedback.includes('success') ? '#15803D' : '#B91C1C'
            }}>
              {metaFeedback}
            </div>
          )}

          <form onSubmit={handleSaveMetadata}>
            <div className="admin-form-group">
              <label className="admin-label">Default Site Title</label>
              <input
                type="text"
                required
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="admin-input"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Default Meta Description</label>
              <textarea
                rows={3}
                required
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
                className="admin-textarea"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label">Open Graph (OG) Social Share Image URL</label>
              <input
                type="text"
                value={ogImage}
                onChange={(e) => setOgImage(e.target.value)}
                className="admin-input"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="admin-form-group">
                <label className="admin-label">Google Analytics Measurement ID</label>
                <input
                  type="text"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Google Search Console Verification Token</label>
                <input
                  type="text"
                  value={gscVerification}
                  onChange={(e) => setGscVerification(e.target.value)}
                  placeholder="google-site-verification=..."
                  className="admin-input"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={savingMeta}
              className="admin-btn admin-btn-primary"
            >
              {savingMeta ? 'Saving Settings...' : 'Save SEO Configuration'}
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: 301 / 302 Redirects */}
      {activeTab === 'redirects' && (
        <div>
          {/* Add Redirect Form */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Add URL Redirect</h3>
            </div>

            <form onSubmit={handleAddRedirect} style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label className="admin-label">Source URL Path *</label>
                <input
                  type="text"
                  required
                  placeholder="/old-page-url"
                  value={sourceUrl}
                  onChange={(e) => setSourceUrl(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Target URL Path *</label>
                <input
                  type="text"
                  required
                  placeholder="/new-page-url"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="admin-label">Redirect Type</label>
                <select
                  value={statusCode}
                  onChange={(e) => setStatusCode(Number(e.target.value))}
                  className="admin-select"
                >
                  <option value={301}>301 Permanent</option>
                  <option value={302}>302 Temporary</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={addingRedirect}
                className="admin-btn admin-btn-primary"
              >
                + Add Redirect
              </button>
            </form>
          </div>

          {/* Redirects Table */}
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Source URL</th>
                  <th>Target URL</th>
                  <th>Type</th>
                  <th>Redirect Hits</th>
                  <th>Created</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {redirects.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                      No redirects configured.
                    </td>
                  </tr>
                ) : (
                  redirects.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <code style={{ fontSize: '0.8rem', color: '#B91C1C' }}>{r.sourceUrl}</code>
                      </td>
                      <td>
                        <code style={{ fontSize: '0.8rem', color: '#15803D' }}>{r.targetUrl}</code>
                      </td>
                      <td>
                        <span style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '0.2rem 0.5rem',
                          borderRadius: 4,
                          backgroundColor: r.statusCode === 301 ? '#EFF6FF' : '#FEF3C7',
                          color: r.statusCode === 301 ? '#01358b' : '#B45309',
                        }}>
                          {r.statusCode}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: '#4B5563' }}>
                        {r.hits || 0} hits
                      </td>
                      <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                        {new Date(r.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleDeleteRedirect(r.id)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Sitemap & Robots.txt */}
      {activeTab === 'sitemap' && (
        <div className="admin-card" style={{ maxWidth: '640px' }}>
          <div className="admin-card-header">
            <h3 className="admin-card-title">Search Engine Crawler Endpoints</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>XML Sitemap</div>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0 0 0.75rem 0' }}>
                Automatically generated for all published pages, blog articles, and product models.
              </p>
              <a
                href="/sitemap.xml"
                target="_blank"
                className="admin-btn admin-btn-secondary admin-btn-sm"
              >
                Open /sitemap.xml ↗
              </a>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8 }}>
              <div style={{ fontWeight: 700, color: '#111827', marginBottom: '0.25rem' }}>Robots.txt Directive</div>
              <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '0 0 0.75rem 0' }}>
                Instructs search engines to crawl public pages while protecting private admin paths.
              </p>
              <a
                href="/robots.txt"
                target="_blank"
                className="admin-btn admin-btn-secondary admin-btn-sm"
              >
                Open /robots.txt ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
