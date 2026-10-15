import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import type { ReactNode } from 'react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <main className="container py-5">Loading account…</main>;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return children;
}
