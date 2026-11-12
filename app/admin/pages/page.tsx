'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { adminFetch } from '@/lib/adminApi';

interface PageItem {
  id: string;
  title: string;
  slug: string;
  template: string;
  status: string;
  content: string | null;
  seoTitle?: string | null;
  metaDesc?: string | null;
  updatedAt: string;
}

export default function AdminPagesPage() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [template, setTemplate] = useState('default');
  const [status, setStatus] = useState('published');
  const [content, setContent] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchPages = async () => {
    try {
      const res = await adminFetch('/api/pages/');
      if (res.ok) {
        const data = await res.json();
        setPages(data.pages || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setTitle('');
    setSlug('');
    setTemplate('default');
    setStatus('published');
    setContent('');
    setSeoTitle('');
    setMetaDesc('');
    setIsModalOpen(true);
    setFeedbackMsg('');
  };

  const openEditModal = (page: PageItem) => {
    setModalMode('edit');
    setCurrentId(page.id);
    setTitle(page.title);
    setSlug(page.slug);
    setTemplate(page.template || 'default');
    setStatus(page.status);
    setContent(page.content || '');
    setSeoTitle(page.seoTitle || '');
    setMetaDesc(page.metaDesc || '');
    setIsModalOpen(true);
    setFeedbackMsg('');
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (modalMode === 'create' && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      );
    }
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackMsg('');

    try {
      const payload = {
        title,
        slug,
        template,
        status,
        content,
        seoTitle,
        metaDesc,
      };

      const url = modalMode === 'create' ? '/api/pages/' : `/api/pages/${currentId}/`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const res = await adminFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save page');
      }

      setFeedbackMsg(`Page ${modalMode === 'create' ? 'created' : 'updated'} successfully!`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchPages();
      }, 700);
    } catch (err: any) {
      setFeedbackMsg(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, pageTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${pageTitle}"? This action cannot be undone.`)) return;

    try {
      const res = await adminFetch(`/api/pages/${id}/`, { method: 'DELETE' });
      if (res.ok) {
        fetchPages();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete page');
      }
    } catch {
      alert('Network error while deleting page');
    }
  };

  const handleDuplicate = async (page: PageItem) => {
    try {
      const res = await adminFetch('/api/pages/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `${page.title} (Copy)`,
          slug: `${page.slug}-copy-${Date.now().toString().slice(-4)}`,
          template: page.template,
          status: 'draft',
          content: page.content,
          seoTitle: page.seoTitle,
          metaDesc: page.metaDesc,
        }),
      });
      if (res.ok) {
        fetchPages();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredPages = pages.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Website Pages
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Manage all core landing pages, templates, and search engine metadata
          </p>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Page
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Search by page title or slug..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: '320px' }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="admin-select"
          style={{ maxWidth: '180px' }}
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Pages Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Slug / URL</th>
              <th>Template</th>
              <th>Status</th>
              <th>Last Modified</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading pages...
                </td>
              </tr>
            ) : filteredPages.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No pages found matching your filters.
                </td>
              </tr>
            ) : (
              filteredPages.map((page) => (
                <tr key={page.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{page.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      {page.seoTitle ? `SEO: ${page.seoTitle}` : 'No custom SEO title'}
                    </div>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.8rem', backgroundColor: '#F3F4F6', padding: '0.15rem 0.4rem', borderRadius: 4, color: '#01358b' }}>
                      /{page.slug}
                    </code>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', textTransform: 'capitalize', color: '#4B5563', fontWeight: 500 }}>
                      {page.template}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-status-badge badge-${page.status}`}>
                      {page.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {new Date(page.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(page)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="Edit Page"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDuplicate(page)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="Duplicate Page"
                      >
                        Copy
                      </button>
                      <Link
                        href={`/${page.slug === 'home' ? '' : page.slug}`}
                        target="_blank"
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="View Live Page"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(page.id, page.title)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        title="Delete Page"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create / Edit Page Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
                {modalMode === 'create' ? 'Create New Website Page' : `Edit Page: ${title}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePage} style={{ padding: '1.5rem' }}>
              {feedbackMsg && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: 6,
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  backgroundColor: feedbackMsg.includes('success') ? '#DCFCE7' : '#FEE2E2',
                  color: feedbackMsg.includes('success') ? '#15803D' : '#B91C1C'
                }}>
                  {feedbackMsg}
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Automatic Washing Systems"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. automatic-washing-systems"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Layout Template</label>
                  <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="admin-select"
                  >
                    <option value="default">Default Page</option>
                    <option value="home">Home Page</option>
                    <option value="about">About Us</option>
                    <option value="products">Product Catalog</option>
                    <option value="services">Services & EPC</option>
                    <option value="contact">Contact & RFQ</option>
                    <option value="blog">Blog Archive</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Publishing Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="admin-select"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* SEO Meta Box */}
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#374151', marginBottom: '0.75rem' }}>
                  Search Engine Optimization (SEO)
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">SEO Meta Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="admin-input"
                    placeholder="Custom meta title for Google search results..."
                  />
                </div>
                <div className="admin-form-group" style={{ marginBottom: 0 }}>
                  <label className="admin-label">Meta Description</label>
                  <textarea
                    rows={2}
                    value={metaDesc}
                    onChange={(e) => setMetaDesc(e.target.value)}
                    className="admin-textarea"
                    placeholder="150-160 character snippet describing this page..."
                  />
                </div>
              </div>

              {/* Main Content / Custom HTML */}
              <div className="admin-form-group">
                <label className="admin-label">Page Content / Custom HTML</label>
                <textarea
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="admin-textarea"
                  placeholder="Enter markdown, HTML blocks, or descriptive body content..."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="admin-btn admin-btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="admin-btn admin-btn-primary"
                >
                  {submitting ? 'Saving...' : modalMode === 'create' ? 'Create Page' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
