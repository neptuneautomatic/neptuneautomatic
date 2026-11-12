'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  modelNumber?: string | null;
  shortDesc?: string | null;
  description?: string | null;
  image?: string | null;
  status: string;
  isFeatured: boolean;
  specifications?: any;
  features?: any;
  category?: { id: string; name: string; slug: string } | null;
  updatedAt: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('published');
  const [isFeatured, setIsFeatured] = useState(false);
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [specsText, setSpecsText] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products?limit=200');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/product-categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setName('');
    setSlug('');
    setModelNumber('');
    setCategoryId(categories.length > 0 ? categories[0].id : '');
    setImage('/assets/images/products/product-1.jpg');
    setStatus('published');
    setIsFeatured(false);
    setShortDesc('');
    setDescription('');
    setSpecsText('Wash Cycle Time: 30-45 sec\nRecirculation Rate: 95%\nPower: 415V 50Hz\nOperating Pressure: 4-6 Bar');
    setFeaturesText('Heavy-duty hot-dip galvanized steel chassis\nFully automated optical sensor activation\nIntegrated sediment sludge removal conveyor');
    setIsModalOpen(true);
    setFeedbackMsg('');
  };

  const openEditModal = (prod: ProductItem) => {
    setModalMode('edit');
    setCurrentId(prod.id);
    setName(prod.name);
    setSlug(prod.slug);
    setModelNumber(prod.modelNumber || '');
    setCategoryId(prod.category?.id || '');
    setImage(prod.image || '');
    setStatus(prod.status);
    setIsFeatured(prod.isFeatured);
    setShortDesc(prod.shortDesc || '');
    setDescription(prod.description || '');

    // Format specifications
    let formattedSpecs = '';
    if (prod.specifications) {
      if (typeof prod.specifications === 'object') {
        formattedSpecs = Object.entries(prod.specifications)
          .map(([k, v]) => `${k}: ${v}`)
          .join('\n');
      } else {
        formattedSpecs = String(prod.specifications);
      }
    }
    setSpecsText(formattedSpecs);

    // Format features
    let formattedFeatures = '';
    if (Array.isArray(prod.features)) {
      formattedFeatures = prod.features.join('\n');
    } else if (typeof prod.features === 'string') {
      try {
        const parsed = JSON.parse(prod.features);
        formattedFeatures = Array.isArray(parsed) ? parsed.join('\n') : prod.features;
      } catch {
        formattedFeatures = prod.features;
      }
    }
    setFeaturesText(formattedFeatures);

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

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackMsg('');

    try {
      // Parse specifications from key: value
      const specsObj: Record<string, string> = {};
      specsText.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length >= 2) {
          const key = parts[0].trim();
          const val = parts.slice(1).join(':').trim();
          if (key) specsObj[key] = val;
        }
      });

      // Parse features
      const featuresArr = featuresText
        .split('\n')
        .map(f => f.trim())
        .filter(Boolean);

      const payload = {
        name,
        slug,
        modelNumber,
        categoryId: categoryId || null,
        image,
        status,
        isFeatured,
        shortDesc,
        description,
        specifications: specsObj,
        features: featuresArr,
      };

      const url = modalMode === 'create' ? '/api/products' : `/api/products/${currentId}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save product');
      }

      setFeedbackMsg(`Product ${modalMode === 'create' ? 'created' : 'saved'} successfully!`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchProducts();
      }, 700);
    } catch (err: any) {
      setFeedbackMsg(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, prodName: string) => {
    if (!confirm(`Are you sure you want to delete product "${prodName}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete product');
      }
    } catch {
      alert('Network error while deleting product');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase()) ||
      (p.modelNumber && p.modelNumber.toLowerCase().includes(search.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || p.category?.id === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Product Catalog ({products.length} Products)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Manage models, technical specifications, CAD fast facts, and category relationships
          </p>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Product
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Search by model, title, or keyword..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: '320px' }}
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="admin-select"
          style={{ maxWidth: '240px' }}
        >
          <option value="all">All Product Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Product & Model</th>
              <th>Category</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Last Updated</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading product catalog...
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {prod.image && (
                        <img
                          src={prod.image}
                          alt=""
                          style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover', backgroundColor: '#F3F4F6' }}
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {prod.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280', display: 'flex', gap: '0.5rem' }}>
                          {prod.modelNumber && (
                            <span style={{ fontWeight: 600, color: '#01358b' }}>Model: {prod.modelNumber}</span>
                          )}
                          <span>/{prod.slug}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 600 }}>
                      {prod.category?.name || 'Unassigned'}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-status-badge badge-${prod.status}`}>
                      {prod.status}
                    </span>
                  </td>
                  <td>
                    {prod.isFeatured ? (
                      <span style={{ color: '#D97706', fontSize: '0.75rem', fontWeight: 700 }}>★ Featured</span>
                    ) : (
                      <span style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>Standard</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {new Date(prod.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(prod)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="Edit Product"
                      >
                        Edit
                      </button>
                      <Link
                        href={`/products/${prod.slug}`}
                        target="_blank"
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="View on Live Site"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(prod.id, prod.name)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        title="Delete Product"
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

      {/* Create / Edit Product Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
                {modalMode === 'create' ? 'Add New Product to Catalog' : `Edit Product: ${name}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} style={{ padding: '1.5rem' }}>
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

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Automatic Wheel Washing System - Drive Thru"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Model Number</label>
                  <input
                    type="text"
                    value={modelNumber}
                    onChange={(e) => setModelNumber(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. NAPL-WW-800"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
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
                  <label className="admin-label">Category</label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="admin-select"
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Image URL</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="admin-input"
                    placeholder="/assets/images/products/..."
                  />
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

                <div className="admin-form-group">
                  <label className="admin-label">Featured Product</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.65rem', cursor: 'pointer', fontSize: '0.85rem' }}>
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      style={{ width: 16, height: 16 }}
                    />
                    Display on Homepage
                  </label>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Short Summary</label>
                <input
                  type="text"
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="admin-input"
                  placeholder="One sentence overview for catalog cards..."
                />
              </div>

              {/* Specifications Key-Value Block */}
              <div className="admin-form-group">
                <label className="admin-label">Technical Specifications (One per line: Key: Value)</label>
                <textarea
                  rows={4}
                  value={specsText}
                  onChange={(e) => setSpecsText(e.target.value)}
                  className="admin-textarea"
                  placeholder="Wash Cycle: 30-45 sec&#10;Water Recirculation: 95%&#10;Power Supply: 415V 3-Phase&#10;Chassis: Hot-Dip Galvanized"
                />
              </div>

              {/* Key Features Block */}
              <div className="admin-form-group">
                <label className="admin-label">Key Features / Fast Facts (One per line)</label>
                <textarea
                  rows={4}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="admin-textarea"
                  placeholder="Optical sensor activation&#10;Automatic sludge conveyor&#10;Energy efficient high-pressure pumps"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Full Product Description</label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="admin-textarea"
                  placeholder="Detailed technical description, application sectors, engineering standards..."
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
                  {submitting ? 'Saving...' : modalMode === 'create' ? 'Create Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
