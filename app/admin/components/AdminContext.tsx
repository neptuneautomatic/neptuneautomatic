'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { adminFetch, setAdminToken } from '@/lib/adminApi';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
    slug: string;
    permissions?: string[];
  };
}

interface AdminContextType {
  user: AdminUser | null;
  loading: boolean;
  pendingCount: number;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshStats: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  loading: true,
  pendingCount: 0,
  login: async () => {},
  logout: async () => {},
  refreshStats: async () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  const checkAuth = async () => {
    try {
      const res = await adminFetch('/api/auth/me/');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
        setAdminToken(null);
      }
    } catch {
      setUser(null);
      setAdminToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, pass: string) => {
    const res = await adminFetch('/api/auth/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Authentication failed');
    }

    if (data.token) {
      setAdminToken(data.token);
    }
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await adminFetch('/api/auth/logout/', { method: 'POST' });
    } catch (e) {
      console.error(e);
    } finally {
      setAdminToken(null);
      setUser(null);
    }
  };

  const refreshStats = async () => {
    try {
      const res = await adminFetch('/api/stats/');
      if (res.ok) {
        const data = await res.json();
        setPendingCount(data.counts?.submissions?.pending || data.counts?.submissionsPending || 0);
      }
    } catch (e) {
      console.error('Failed to refresh stats', e);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      refreshStats();
      const interval = setInterval(refreshStats, 30000); // 30s polling
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AdminContext.Provider value={{ user, loading, pendingCount, login, logout, refreshStats }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
