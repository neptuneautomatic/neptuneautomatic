'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
  refreshStats: () => Promise<void>;
  logout: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({
  user: null,
  loading: true,
  pendingCount: 0,
  refreshStats: async () => {},
  logout: async () => {},
});

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === '/admin/login';

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
        if (!isLoginPage) {
          router.push('/admin/login');
        }
      }
    } catch {
      setUser(null);
      if (!isLoginPage) {
        router.push('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshStats = async () => {
    try {
      const res = await fetch('/api/stats');
      if (res.ok) {
        const data = await res.json();
        setPendingCount(data.counts?.submissionsPending || 0);
      }
    } catch (e) {
      console.error('Failed to refresh stats', e);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    if (user) {
      refreshStats();
      const interval = setInterval(refreshStats, 30000); // 30s polling for new submissions
      return () => clearInterval(interval);
    }
  }, [user]);

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
      router.push('/admin/login');
    }
  };

  return (
    <AdminContext.Provider value={{ user, loading, pendingCount, refreshStats, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export const useAdmin = () => useContext(AdminContext);
