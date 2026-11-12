'use client';

import React, { useEffect, useState } from 'react';

interface BackupItem {
  id: string;
  filename: string;
  size: number;
  type: string;
  status: string;
  createdAt: string;
}

export default function AdminBackupsPage() {
  const [backups, setBackups] = useState<BackupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fetchBackups = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/backups');
      if (res.ok) {
        const data = await res.json();
        setBackups(data.backups || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    setGenerating(true);
    setFeedback('');

    try {
      const res = await fetch('/api/backups', {
        method: 'POST',
      });

      if (res.ok) {
        setFeedback('Full database backup snapshot generated successfully!');
        await fetchBackups();
      } else {
        const d = await res.json();
        setFeedback(d.error || 'Failed to create backup');
      }
    } catch {
      setFeedback('Error connecting to server');
    } finally {
      setGenerating(false);
    }
  };

  const handleDelete = async (id: string, filename: string) => {
    if (!confirm(`Are you sure you want to delete backup "${filename}"?`)) return;

    try {
      const res = await fetch(`/api/backups?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchBackups();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to delete backup');
      }
    } catch {
      alert('Network error');
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Database Backups & Disaster Recovery
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Generate and download complete snapshots of website pages, product catalogs, and user submissions
          </p>
        </div>

        <button
          onClick={handleCreateBackup}
          disabled={generating}
          className="admin-btn admin-btn-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="21 8 21 21 3 21 3 8"></polyline>
            <rect x="1" y="3" width="22" height="5"></rect>
            <line x1="10" y1="12" x2="14" y2="12"></line>
          </svg>
          {generating ? 'Creating Snapshot...' : 'Create Backup Now'}
        </button>
      </div>

      {feedback && (
        <div style={{
          padding: '0.75rem 1.25rem',
          borderRadius: 8,
          marginBottom: '1.25rem',
          fontSize: '0.85rem',
          backgroundColor: feedback.includes('success') ? '#DCFCE7' : '#FEE2E2',
          color: feedback.includes('success') ? '#15803D' : '#B91C1C'
        }}>
          {feedback}
        </div>
      )}

      {/* Info Card */}
      <div className="admin-card" style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <div>
            <div style={{ fontWeight: 700, color: '#166534', fontSize: '0.88rem' }}>
              Full Relational Integrity Protected
            </div>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: '#15803D' }}>
              Each backup creates a verified, standalone JSON snapshot encompassing all 30 database tables: Users, Products, Categories, Blog Posts, Revisions, Media Metadata, Menus, SEO configurations, and Form Inquiries.
            </p>
          </div>
        </div>
      </div>

      {/* Backups Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Backup Archive</th>
              <th>Type</th>
              <th>File Size</th>
              <th>Status</th>
              <th>Generated At</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading backup history...
                </td>
              </tr>
            ) : backups.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No backup archives generated yet. Click "Create Backup Now" above.
                </td>
              </tr>
            ) : (
              backups.map((b) => (
                <tr key={b.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{b.filename}</div>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.8rem', color: '#01358b', fontWeight: 600 }}>
                      {b.type.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#4B5563' }}>
                    {formatBytes(b.size)}
                  </td>
                  <td>
                    <span className={`admin-status-badge badge-${b.status}`}>
                      {b.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <a
                        href={`/api/backups?download=${b.id}`}
                        download={b.filename}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Download JSON
                      </a>
                      <button
                        onClick={() => handleDelete(b.id, b.filename)}
                        className="admin-btn admin-btn-danger admin-btn-sm"
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
    </div>
  );
}
