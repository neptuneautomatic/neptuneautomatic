'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '../components/AdminContext';
import AdminAuthScreen from '../components/AdminAuthScreen';

export default function AdminLoginPage() {
  const { user } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/admin/');
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return <AdminAuthScreen />;
}
