'use client';

import React, { useEffect, useState } from 'react';

interface AuditItem {
  id: string;
  action: string;
  entity: string;
  entityId?: string | null;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditItem | null>(null);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/audit-logs?limit=100');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((log) => {
    const text = `${log.action} ${log.entity} ${log.user?.name || ''} ${log.user?.email || ''} ${log.ipAddress || ''}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div>
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0 }}>
            System Audit Trail ({logs.length} Logged Events)
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#6B7280', margin: '2px 0 0 0' }}>
            Immutable security log recording administrative actions, logins, edits, and deletions
          </p>
        </div>

        <button onClick={fetchLogs} className="admin-btn admin-btn-secondary admin-btn-sm">
          Refresh Logs
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.25rem' }}>
        <input
          type="text"
          placeholder="Filter by user, action, entity, or IP..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="admin-input"
          style={{ maxWidth: '340px' }}
        />
      </div>

      {/* Logs Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Entity</th>
              <th>IP Address</th>
              <th style={{ textAlign: 'right' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#6B7280' }}>
                  Loading audit stream...
                </td>
              </tr>
            ) : filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#9CA3AF' }}>
                  No audit logs found.
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => {
                const isDelete = log.action.includes('DELETE');
                const isLogin = log.action.includes('LOGIN');
                const isUpdate = log.action.includes('UPDATE');

                return (
                  <tr key={log.id}>
                    <td style={{ fontSize: '0.78rem', color: '#6B7280', whiteSpace: 'nowrap' }}>
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#111827' }}>
                        {log.user?.name || 'System / Anonymous'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#6B7280' }}>
                        {log.user?.email || '—'}
                      </div>
                    </td>
                    <td>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.5rem',
                        borderRadius: 4,
                        backgroundColor: isDelete ? '#FEE2E2' : isLogin ? '#DCFCE7' : isUpdate ? '#FEF3C7' : '#EFF6FF',
                        color: isDelete ? '#B91C1C' : isLogin ? '#15803D' : isUpdate ? '#B45309' : '#01358b',
                      }}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>
                        {log.entity}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      <code>{log.ipAddress || '127.0.0.1'}</code>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {log.details ? (
                        <button
                          onClick={() => setSelectedLog(log)}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          View JSON
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>—</span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* JSON Details Modal */}
      {selectedLog && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-card" style={{ maxWidth: '580px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>
                  Audit Details: {selectedLog.action}
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                  {new Date(selectedLog.createdAt).toLocaleString()} by {selectedLog.user?.email || 'System'}
                </span>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: '#9CA3AF' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              <pre style={{
                backgroundColor: '#0F172A',
                color: '#38BDF8',
                padding: '1rem',
                borderRadius: 8,
                fontSize: '0.78rem',
                overflowX: 'auto',
                maxHeight: '360px',
                fontFamily: 'monospace'
              }}>
                {(() => {
                  try {
                    return JSON.stringify(JSON.parse(selectedLog.details || '{}'), null, 2);
                  } catch {
                    return selectedLog.details;
                  }
                })()}
              </pre>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="admin-btn admin-btn-primary admin-btn-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
