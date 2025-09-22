'use client';

import React from 'react';
import { useRequireAuth } from '@/contexts/AuthContext';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isInitializing } = useRequireAuth();
  if (isInitializing) return null;
  if (!isAuthenticated) return null;
  return <>{children}</>;
}


