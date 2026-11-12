'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAdmin } from './AdminContext';

export default function AdminAuthScreen() {
  const { login } = useAdmin();
  const [email, setEmail] = useState('admin@neptuneautomatic.com');
  const [password, setPassword] = useState('Password@123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your ID and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillCredentials = (userType: 'admin' | 'editor') => {
    if (userType === 'admin') {
      setEmail('admin@neptuneautomatic.com');
      setPassword('Password@123');
    } else {
      setEmail('editor@neptuneautomatic.com');
      setPassword('Editor@123');
    }
    setError('');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0F172A',
      backgroundImage: 'radial-gradient(at 0% 0%, rgba(1, 53, 139, 0.35) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(211, 38, 40, 0.2) 0px, transparent 50%)',
      padding: '1.5rem',
      fontFamily: "'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{
        maxWidth: '460px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '2.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
        border: '1px solid #E2E8F0',
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 58,
            height: 58,
            backgroundColor: '#01358b',
            color: '#FFFFFF',
            fontWeight: 800,
            fontSize: '1.85rem',
            borderRadius: '14px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem',
            boxShadow: '0 10px 18px -3px rgba(1, 53, 139, 0.45)'
          }}>
            N
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.35rem 0' }}>
            NEPTUNE AUTOMATIC
          </h1>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#EFF6FF',
            color: '#01358b',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.2rem 0.65rem',
            borderRadius: '9999px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.5rem'
          }}>
            Admin Portal Authentication
          </div>
          <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0 }}>
            Enter your Administrator ID &amp; Password to unlock the dashboard
          </p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#FEF2F2',
            border: '1px solid #F87171',
            color: '#B91C1C',
            padding: '0.85rem 1rem',
            borderRadius: '8px',
            fontSize: '0.85rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Administrator ID */}
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.45rem' }}>
              Administrator ID / Email *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@neptuneautomatic.com"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.95rem 0.75rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
              <svg
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>

          {/* Password (Pass) */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
                Password (Pass) *
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#01358b',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: 0
                }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{
                  width: '100%',
                  padding: '0.75rem 0.95rem 0.75rem 2.5rem',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit'
                }}
              />
              <svg
                style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#01358b',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '0.85rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 6px -1px rgba(1, 53, 139, 0.45)',
              transition: 'background 0.2s',
              opacity: loading ? 0.8 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTopColor: '#fff',
                  animation: 'spin 0.8s linear infinite'
                }} />
                <span>Authenticating ID &amp; Pass...</span>
              </>
            ) : (
              <>
                <span>Authenticate &amp; Enter Dashboard &rarr;</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Fill Credentials Helper */}
        <div style={{
          marginTop: '1.75rem',
          padding: '1rem',
          backgroundColor: '#F8FAFC',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          fontSize: '0.78rem',
          color: '#64748B'
        }}>
          <div style={{ fontWeight: 700, color: '#334155', marginBottom: '0.4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Demo Administrator Credentials:</span>
            <span style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 700 }}>✓ SEEDED</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0', borderBottom: '1px solid #EEF2F6' }}>
            <div>
              <strong style={{ color: '#1E293B' }}>Super Admin:</strong> admin@neptuneautomatic.com
            </div>
            <button
              type="button"
              onClick={() => handleFillCredentials('admin')}
              style={{
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#01358b',
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Autofill
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0' }}>
            <div>
              <strong style={{ color: '#1E293B' }}>Editor:</strong> editor@neptuneautomatic.com
            </div>
            <button
              type="button"
              onClick={() => handleFillCredentials('editor')}
              style={{
                background: '#F1F5F9',
                border: '1px solid #CBD5E1',
                color: '#475569',
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '0.2rem 0.5rem',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Autofill
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/" style={{ fontSize: '0.82rem', color: '#01358b', textDecoration: 'none', fontWeight: 600 }}>
            &larr; Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
