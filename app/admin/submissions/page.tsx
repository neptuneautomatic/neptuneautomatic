'use client';

import React, { useEffect, useState } from 'react';
import { useAdmin } from '../components/AdminContext';
import { adminFetch } from '@/lib/adminApi';

interface SubmissionItem {
  id: string;
  data?: any;
  dataJson?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message?: string | null;
  status: string;
  notes?: string | null;
  internalNotes?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  form?: {
    id: string;
    title: string;
    code: string;
  };
}

export default function AdminSubmissionsPage() {
  const { refreshStats } = useAdmin();
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Selected Submission Modal
  const [selected, setSelected] = useState<SubmissionItem | null>(null);
  const [modalStatus, setModalStatus] = useState('pending');
  const [modalNotes, setModalNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const url = statusFilter === 'all' ? '/api/submissions/' : `/api/submissions/?status=${statusFilter}`;
      const res = await adminFetch(url);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data.submissions || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [statusFilter]);

  const openDetailModal = (sub: SubmissionItem) => {
    setSelected(sub);
    setModalStatus(sub.status);
    setModalNotes(sub.notes || '');
  };

  const handleUpdateStatusAndNotes = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setSavingNotes(true);

    try {
      const res = await adminFetch('/api/submissions/', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selected.id,
          status: modalStatus,
          notes: modalNotes,
        }),
      });

      if (res.ok) {
        await fetchSubmissions();
        await refreshStats();
        setSelected(null);
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to update submission');
      }
    } catch {
      alert('Error connecting to server');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      const res = await adminFetch(`/api/submissions/?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selected?.id === id) setSelected(null);
        await fetchSubmissions();
        await refreshStats();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to delete');
      }
    } catch {
      alert('Network error');
    }
  };

  const filtered = submissions.filter((sub) => {
    const dataStr = typeof sub?.data === 'string' ? sub.data : JSON.stringify(sub || {});
    const nameStr = sub?.name || '';
    const emailStr = sub?.email || '';
    const subjectStr = sub?.subject || '';
    const searchTarget = `${dataStr} ${nameStr} ${emailStr} ${subjectStr}`.toLowerCase();
    return searchTarget.includes(search.toLowerCase());
  });

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Inquiries & RFQ Inbox ({submissions.length} Total)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Centralized lead tracking, customer quotation requests, and follow-up status
          </p>
        </div>

        <a
          href={`/api/submissions/export?status=${statusFilter}`}
          className="admin-btn admin-btn-secondary"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Export to CSV
        </a>
      </div>

      {/* Filter Tabs & Search */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div className="admin-tabs" style={{ margin: 0, border: 'none' }}>
          {['all', 'pending', 'contacted', 'resolved'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`admin-tab ${statusFilter === s ? 'is-active' : ''}`}
              style={{ textTransform: 'capitalize' }}
            >
              {s}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search by name, email, or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: '300px' }}
        />
      </div>

      {/* Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Contact Details</th>
              <th>Form Type</th>
              <th>Preview Message</th>
              <th>Status</th>
              <th>Received Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading submissions...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No submissions found matching filter.
                </td>
              </tr>
            ) : (
              filtered.map((sub: any) => {
                let dataObj: any = {};
                if (sub?.data) {
                  try {
                    dataObj = typeof sub.data === 'string' ? JSON.parse(sub.data) : sub.data;
                  } catch {}
                } else if (sub?.dataJson) {
                  try {
                    dataObj = typeof sub.dataJson === 'string' ? JSON.parse(sub.dataJson) : sub.dataJson;
                  } catch {}
                }
                const name = sub?.name || dataObj?.name || dataObj?.fullName || 'Anonymous';
                const email = sub?.email || dataObj?.email || 'No email';
                const phone = sub?.phone || dataObj?.phone || dataObj?.mobile || '';
                const message = sub?.message || dataObj?.message || dataObj?.projectType || dataObj?.comments || '—';

                return (
                  <tr key={sub.id}>
                    <td>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                        {email} {phone ? `• ${phone}` : ''}
                      </div>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#01358b', fontWeight: 600 }}>
                        {sub.form?.title || 'Contact Form'}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.8rem', color: '#4B5563', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {message}
                      </div>
                    </td>
                    <td>
                      <span className={`admin-status-badge badge-${sub.status}`}>
                        {sub.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      {new Date(sub.createdAt).toLocaleString()}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => openDetailModal(sub)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => handleDelete(sub.id)}
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

      {/* Submission Detail Modal */}
      {selected && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '640px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700, color: '#111827' }}>
                  Inquiry Details
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  Received {new Date(selected.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {/* Form Data Grid */}
              <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 8, padding: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#374151', marginBottom: '0.75rem' }}>
                  Submitted Form Fields:
                </div>
                {(() => {
                  let dataObj: any = {};
                  if (selected?.data) {
                    try {
                      dataObj = typeof selected.data === 'string' ? JSON.parse(selected.data) : selected.data;
                    } catch {}
                  } else if ((selected as any)?.dataJson) {
                    try {
                      dataObj = typeof (selected as any).dataJson === 'string' ? JSON.parse((selected as any).dataJson) : (selected as any).dataJson;
                    } catch {}
                  }
                  if (!dataObj || typeof dataObj !== 'object') {
                    dataObj = {};
                  }
                  const mergedFields: Record<string, any> = {
                    ...dataObj,
                    name: (selected as any)?.name || dataObj?.name,
                    email: (selected as any)?.email || dataObj?.email,
                    phone: (selected as any)?.phone || dataObj?.phone,
                    company: (selected as any)?.company || dataObj?.company,
                    subject: (selected as any)?.subject || dataObj?.subject,
                    message: (selected as any)?.message || dataObj?.message,
                  };
                  return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                      {Object.entries(mergedFields)
                        .filter(([_, v]) => v != null && v !== '')
                        .map(([k, v]) => (
                          <div key={k} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', borderBottom: '1px solid #F3F4F6', paddingBottom: '0.25rem' }}>
                            <span style={{ fontWeight: 600, color: '#4B5563', textTransform: 'capitalize' }}>
                              {k.replace(/([A-Z])/g, ' $1')}:
                            </span>
                            <span style={{ color: '#111827', wordBreak: 'break-word' }}>
                              {typeof v === 'object' ? JSON.stringify(v) : String(v)}
                            </span>
                          </div>
                        ))}
                    </div>
                  );
                })()}
              </div>

              {/* Status & Follow-up Notes Form */}
              <form onSubmit={handleUpdateStatusAndNotes}>
                <div className="admin-form-group">
                  <label className="admin-label">Lead / Inquiry Status</label>
                  <select
                    value={modalStatus}
                    onChange={(e) => setModalStatus(e.target.value)}
                    className="admin-select"
                  >
                    <option value="pending">Pending (New)</option>
                    <option value="contacted">Contacted</option>
                    <option value="resolved">Resolved / Closed</option>
                    <option value="spam">Spam</option>
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Internal Follow-up Notes (Admin Only)</label>
                  <textarea
                    rows={3}
                    value={modalNotes}
                    onChange={(e) => setModalNotes(e.target.value)}
                    className="admin-textarea"
                    placeholder="Log quotation sent date, client phone calls, or remarks..."
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid #E5E7EB' }}>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="admin-btn admin-btn-secondary"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    disabled={savingNotes}
                    className="admin-btn admin-btn-primary"
                  >
                    {savingNotes ? 'Saving...' : 'Update Status & Notes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
