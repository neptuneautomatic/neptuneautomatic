'use client';

import React, { useEffect, useState } from 'react';

export default function AdminCategoriesPage() {
  const [activeTab, setActiveTab] = useState<'product' | 'blog'>('product');
  const [productCats, setProductCats] = useState<any[]>([]);
  const [blogCats, setBlogCats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchAll = async () => {
    try {
      setLoading(true);
      const [resProd, resBlog] = await Promise.all([
        fetch('/api/product-categories'),
        fetch('/api/categories?type=blog'),
      ]);
      if (resProd.ok) {
        const d1 = await resProd.json();
        setProductCats(d1.categories || []);
      }
      if (resBlog.ok) {
        const d2 = await resBlog.json();
        setBlogCats(d2.categories || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setName('');
    setSlug('');
    setDescription('');
    setIsModalOpen(true);
    setFeedbackMsg('');
  };

  const openEditModal = (cat: any) => {
    setModalMode('edit');
    setCurrentId(cat.id);
    setName(cat.name);
    setSlug(cat.slug);
    setDescription(cat.description || '');
    setIsModalOpen(true);
    setFeedbackMsg('');
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (modalMode === 'create' && !slug) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
      );
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackMsg('');

    try {
      const endpoint = activeTab === 'product' ? '/api/product-categories' : '/api/categories';
      const url = modalMode === 'create' ? endpoint : `${endpoint}?id=${currentId}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const payload = {
        name,
        slug,
        description,
        ...(activeTab === 'blog' ? { type: 'blog' } : {}),
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save category');
      }

      setFeedbackMsg(`Category saved successfully!`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchAll();
      }, 700);
    } catch (err: any) {
      setFeedbackMsg(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, catName: string) => {
    if (!confirm(`Are you sure you want to delete category "${catName}"?`)) return;

    try {
      const endpoint = activeTab === 'product' ? `/api/product-categories?id=${id}` : `/api/categories?id=${id}`;
      const res = await fetch(endpoint, { method: 'DELETE' });
      if (res.ok) {
        fetchAll();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete category');
      }
    } catch {
      alert('Network error while deleting category');
    }
  };

  const currentList = activeTab === 'product' ? productCats : blogCats;

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Categories & Taxonomies
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Organize products and articles with structured taxonomy classifications
          </p>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add {activeTab === 'product' ? 'Product' : 'Blog'} Category
        </button>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          onClick={() => setActiveTab('product')}
          className={`admin-tab ${activeTab === 'product' ? 'is-active' : ''}`}
        >
          Product Categories ({productCats.length})
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`admin-tab ${activeTab === 'blog' ? 'is-active' : ''}`}
        >
          Blog Categories ({blogCats.length})
        </button>
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Slug</th>
              <th>Description</th>
              <th>Items Count</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading categories...
                </td>
              </tr>
            ) : currentList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No categories found. Click "Add Category" above to create one.
                </td>
              </tr>
            ) : (
              currentList.map((cat) => {
                const count = activeTab === 'product' ? cat._count?.products || 0 : cat._count?.posts || 0;
                return (
                  <tr key={cat.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{cat.name}</div>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.8rem', backgroundColor: '#F3F4F6', padding: '0.15rem 0.4rem', borderRadius: 4, color: '#01358b' }}>
                        {cat.slug}
                      </code>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#6B7280', maxWidth: '300px' }}>
                      {cat.description || '—'}
                    </td>
                    <td>
                      <span style={{
                        backgroundColor: '#EFF6FF',
                        color: '#01358b',
                        fontWeight: 700,
                        fontSize: '0.78rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 12
                      }}>
                        {count} {activeTab === 'product' ? 'Products' : 'Posts'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => openEditModal(cat)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id, cat.name)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '540px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
                {modalMode === 'create' ? `Add ${activeTab === 'product' ? 'Product' : 'Blog'} Category` : `Edit: ${name}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} style={{ padding: '1.5rem' }}>
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

              <div className="admin-form-group">
                <label className="admin-label">Category Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
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
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="admin-textarea"
                  placeholder="Optional description for category archives..."
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
                  {submitting ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
