'use client';

import React, { useEffect, useState, useRef } from 'react';
import { adminFetch } from '@/lib/adminApi';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  width?: number | null;
  height?: number | null;
  url: string;
  altText?: string | null;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    try {
      const res = await adminFetch('/api/media/');
      if (res.ok) {
        const data = await res.json();
        setMediaList(data.media || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('altText', file.name.replace(/\.[^/.]+$/, ''));

    try {
      const res = await adminFetch('/api/media/', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        await fetchMedia();
        setSelectedItem(data.media);
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to upload media file');
      }
    } catch {
      alert('Error uploading file');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await adminFetch(`/api/media/?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSelectedItem(null);
        fetchMedia();
      } else {
        const data = await res.json();
        alert(data.error || 'Could not delete file');
      }
    } catch {
      alert('Error communicating with server');
    }
  };

  const copyUrlToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const filteredMedia = mediaList.filter((m) =>
    m.originalName.toLowerCase().includes(search.toLowerCase()) ||
    m.filename.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Media Library ({mediaList.length} Files)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Upload, organize, and manage product photos, diagrams, and downloadable brochures
          </p>
        </div>

        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept="image/*,application/pdf"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="admin-btn admin-btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            {uploading ? 'Uploading File...' : 'Upload Media'}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Search media files by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: '340px' }}
        />
      </div>

      {/* Main Grid: Media Items + Selected Item Detail Pane */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedItem ? '1fr 340px' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
        {/* Media Grid */}
        <div className="admin-card" style={{ padding: '1.25rem' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6B7280', padding: '2rem' }}>Loading media files...</p>
          ) : filteredMedia.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#9CA3AF' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 0.75rem auto', color: '#CBD5E1' }}>
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <p style={{ margin: 0, fontWeight: 600 }}>No media files found</p>
              <p style={{ fontSize: '0.8rem', marginTop: 4 }}>Click "Upload Media" to upload images or PDFs</p>
            </div>
          ) : (
            <div className="admin-media-grid">
              {filteredMedia.map((m) => {
                const isSelected = selectedItem?.id === m.id;
                const isImage = m.mimeType.startsWith('image/');
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedItem(m)}
                    className="admin-media-card"
                    style={{
                      borderColor: isSelected ? '#01358b' : undefined,
                      boxShadow: isSelected ? '0 0 0 2px #01358b' : undefined,
                    }}
                  >
                    <div className="admin-media-thumb">
                      {isImage ? (
                        <img src={m.url} alt={m.altText || m.originalName} />
                      ) : (
                        <div style={{ color: '#01358b', fontWeight: 700, fontSize: '0.78rem', textAlign: 'center', padding: '0.5rem' }}>
                          PDF / DOC
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '0.5rem', fontSize: '0.75rem' }}>
                      <div style={{ fontWeight: 600, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {m.originalName}
                      </div>
                      <div style={{ color: '#6B7280', fontSize: '0.7rem' }}>
                        {formatBytes(m.size)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected File Details Pane */}
        {selectedItem && (
          <div className="admin-card" style={{ padding: '1.25rem', position: 'sticky', top: '80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
                Attachment Details
              </h3>
              <button
                onClick={() => setSelectedItem(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <div style={{ width: '100%', height: '160px', backgroundColor: '#F3F4F6', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              {selectedItem.mimeType.startsWith('image/') ? (
                <img src={selectedItem.url} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ color: '#4B5563', fontWeight: 600 }}>File Document</div>
              )}
            </div>

            <div style={{ fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <div>
                <span style={{ color: '#6B7280' }}>File name: </span>
                <span style={{ fontWeight: 600, color: '#111827' }}>{selectedItem.originalName}</span>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>File type: </span>
                <span style={{ color: '#111827' }}>{selectedItem.mimeType}</span>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>File size: </span>
                <span style={{ color: '#111827' }}>{formatBytes(selectedItem.size)}</span>
              </div>
              <div>
                <span style={{ color: '#6B7280' }}>Uploaded on: </span>
                <span style={{ color: '#111827' }}>{new Date(selectedItem.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="admin-label">Public File URL</label>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <input
                  type="text"
                  readOnly
                  value={selectedItem.url}
                  className="admin-input"
                  style={{ fontSize: '0.78rem' }}
                />
                <button
                  type="button"
                  onClick={() => copyUrlToClipboard(selectedItem.url)}
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                >
                  {copySuccess ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <a
                href={selectedItem.url}
                target="_blank"
                rel="noreferrer"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                style={{ flex: 1, textAlign: 'center' }}
              >
                Open File
              </a>
              <button
                type="button"
                onClick={() => handleDelete(selectedItem.id, selectedItem.originalName)}
                className="admin-btn admin-btn-danger admin-btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
