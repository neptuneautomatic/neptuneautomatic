'use client';

import React, { useEffect, useState } from 'react';
import { useAdmin } from '../components/AdminContext';

interface UserItem {
  id: string;
  name: string;
  email: string;
  status: string;
  lastLoginAt?: string | null;
  createdAt: string;
  role?: {
    id: string;
    name: string;
    slug: string;
  };
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAdmin();
  const [users, setUsers] = useState<UserItem[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [currentId, setCurrentId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState('');
  const [status, setStatus] = useState('active');

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const fetchUsersAndRoles = async () => {
    try {
      setLoading(true);
      const [resUsers, resRoles] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/roles'),
      ]);
      if (resUsers.ok) {
        const d1 = await resUsers.json();
        setUsers(d1.users || []);
      }
      if (resRoles.ok) {
        const d2 = await resRoles.json();
        setRoles(d2.roles || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsersAndRoles();
  }, []);

  const openCreateModal = () => {
    setModalMode('create');
    setCurrentId(null);
    setName('');
    setEmail('');
    setPassword('');
    setRoleId(roles.length > 0 ? roles[0].id : '');
    setStatus('active');
    setIsModalOpen(true);
    setFeedback('');
  };

  const openEditModal = (u: UserItem) => {
    setModalMode('edit');
    setCurrentId(u.id);
    setName(u.name);
    setEmail(u.email);
    setPassword(''); // leave blank unless updating
    setRoleId(u.role?.id || '');
    setStatus(u.status);
    setIsModalOpen(true);
    setFeedback('');
  };

  const handleSaveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback('');

    try {
      const payload: any = {
        name,
        email,
        roleId,
        status,
      };

      if (modalMode === 'create' || password) {
        payload.password = password;
      }
      if (modalMode === 'edit') {
        payload.id = currentId;
      }

      const url = '/api/users';
      const method = modalMode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save user');
      }

      setFeedback(`User saved successfully!`);
      setTimeout(() => {
        setIsModalOpen(false);
        fetchUsersAndRoles();
      }, 700);
    } catch (err: any) {
      setFeedback(err.message || 'Error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, userName: string) => {
    if (id === currentUser?.id) {
      alert('You cannot delete your own active administrator account.');
      return;
    }

    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return;

    try {
      const res = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsersAndRoles();
      } else {
        const d = await res.json();
        alert(d.error || 'Failed to delete user');
      }
    } catch {
      alert('Network error');
    }
  };

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            Users & Roles ({users.length} Users)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Manage staff credentials, role-based access control, and permissions
          </p>
        </div>
        <button onClick={openCreateModal} className="admin-btn admin-btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Sign-In</th>
              <th>Registered</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        backgroundColor: '#01358b',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.78rem',
                        fontWeight: 700
                      }}>
                        {u.name[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827' }}>
                          {u.name} {u.id === currentUser?.id ? '(You)' : ''}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{
                      backgroundColor: '#EFF6FF',
                      color: '#01358b',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: 4
                    }}>
                      {u.role?.name || 'User'}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-status-badge badge-${u.status}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}
                  </td>
                  <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(u)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Edit
                      </button>
                      {u.id !== currentUser?.id && (
                        <button
                          onClick={() => handleDelete(u.id, u.name)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
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
                {modalMode === 'create' ? 'Create Staff User Account' : `Edit User: ${name}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUser} style={{ padding: '1.5rem' }}>
              {feedback && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: 6,
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  backgroundColor: feedback.includes('success') ? '#DCFCE7' : '#FEE2E2',
                  color: feedback.includes('success') ? '#15803D' : '#B91C1C'
                }}>
                  {feedback}
                </div>
              )}

              <div className="admin-form-group">
                <label className="admin-label">Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="admin-input"
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-input"
                  placeholder="user@neptuneautomatic.com"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">
                  {modalMode === 'create' ? 'Password *' : 'New Password (leave empty to keep unchanged)'}
                </label>
                <input
                  type="password"
                  required={modalMode === 'create'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="admin-input"
                  placeholder={modalMode === 'create' ? 'Minimum 8 characters' : '••••••••••••'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Assigned Role</label>
                  <select
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                    className="admin-select"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Account Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="admin-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
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
                  {submitting ? 'Saving...' : modalMode === 'create' ? 'Create User' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
