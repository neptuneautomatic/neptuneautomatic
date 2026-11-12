'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface PostItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  contentHtml?: string | null;
  content?: string | null;
  featuredImage?: string | null;
  status: string;
  authorName?: string | null;
  readTime?: string | null;
  readingTime?: number | null;
  viewsCount?: number;
  viewCount?: number;
  publishedAt?: string | null;
  updatedAt: string;
  categories?: { category: { id: string; name: string } }[];
  tags?: { tag: { id: string; name: string } }[];
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
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
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [status, setStatus] = useState('published');
  const [authorName, setAuthorName] = useState('Neptune Editorial Team');
  const [readingTime, setReadingTime] = useState(5);
  const [categoryId, setCategoryId] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories?type=blog');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories || []);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setTitle('');
    setSlug('');
    setExcerpt('');
    setContent('');
    setFeaturedImage('/assets/images/blog/blog-1.jpg');
    setStatus('published');
    setAuthorName('Neptune Editorial Team');
    setReadingTime(5);
    setCategoryId(categories.length > 0 ? categories[0].id : '');
    setTagsInput('Automation, Washing Systems, Sustainability');
    setSeoTitle('');
    setMetaDesc('');
    setIsModalOpen(true);
    setFeedbackMsg('');
  };

  const openEditModal = (post: PostItem) => {
    setModalMode('edit');
    setCurrentId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setExcerpt(post.excerpt || '');
    setContent(post.contentHtml || post.content || '');
    setFeaturedImage(post.featuredImage || '');
    setStatus(post.status);
    setAuthorName(post.authorName || 'Neptune Editorial Team');
    setReadingTime(post.readingTime || 5);
    setCategoryId(post.categories?.[0]?.category?.id || '');
    setTagsInput(post.tags?.map(t => t.tag.name).join(', ') || '');
    setSeoTitle('');
    setMetaDesc('');
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

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedbackMsg('');

    try {
      const categoryIds = categoryId ? [categoryId] : [];
      const tags = tagsInput
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const payload = {
        title,
        slug,
        excerpt,
        content,
        featuredImage,
        status,
        authorName,
        readingTime: Number(readingTime) || 5,
        categoryIds,
        tags,
        seoTitle,
        metaDesc,
      };

      const url = modalMode === 'create' ? '/api/posts' : `/api/posts/${currentId}`;
      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save blog post');
      }

      setFeedbackMsg(`Article ${modalMode === 'create' ? 'published' : 'saved'} successfully!`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchPosts();
      }, 700);
    } catch (err: any) {
      setFeedbackMsg(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, postTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${postTitle}"?`)) return;

    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPosts();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to delete post');
      }
    } catch {
      alert('Network error while deleting post');
    }
  };

  const filteredPosts = posts.filter((p) => {
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
            Blog & Technical Articles
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Author, categorize, and schedule industry thought leadership articles
          </p>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New Post
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Search articles by title or keyword..."
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

      {/* Posts Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Article</th>
              <th>Category</th>
              <th>Author</th>
              <th>Status</th>
              <th>Views</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading articles...
                </td>
              </tr>
            ) : filteredPosts.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No blog articles found.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt=""
                          style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      )}
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {post.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                          /{post.slug}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#01358b', fontWeight: 600 }}>
                      {post.categories?.[0]?.category?.name || 'General'}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#4B5563' }}>
                    {post.authorName || 'Neptune Editorial'}
                  </td>
                  <td>
                    <span className={`admin-status-badge badge-${post.status}`}>
                      {post.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                    {post.viewsCount || post.viewCount || 0}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(post)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="Edit Article"
                      >
                        Edit
                      </button>
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        title="View Live Article"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
                        title="Delete Article"
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

      {/* Create / Edit Post Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '820px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
                {modalMode === 'create' ? 'Create New Blog Post' : `Edit: ${title}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePost} style={{ padding: '1.5rem' }}>
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
                  <label className="admin-label">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="admin-input"
                    placeholder="e.g. Next-Gen Automatic Wheel Washers for Mining"
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
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
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
                  <label className="admin-label">Est. Read Time (mins)</label>
                  <input
                    type="number"
                    value={readingTime}
                    onChange={(e) => setReadingTime(Number(e.target.value))}
                    className="admin-input"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Author Name</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Featured Image URL</label>
                  <input
                    type="text"
                    value={featuredImage}
                    onChange={(e) => setFeaturedImage(e.target.value)}
                    className="admin-input"
                    placeholder="/assets/images/blog/..."
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="admin-input"
                  placeholder="Automotive, Mining, EPC, High Pressure Wash"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Article Excerpt</label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="admin-textarea"
                  placeholder="Brief summary displayed on archive and cards..."
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Article Body Content (Markdown / HTML)</label>
                <textarea
                  rows={10}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="admin-textarea"
                  placeholder="Write full article body content..."
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
                  {submitting ? 'Saving...' : modalMode === 'create' ? 'Publish Article' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
