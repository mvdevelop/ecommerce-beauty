import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { DemoUser } from '../types/api';
import { isDemoUser } from '../lib/runtime';

const SESSION_KEY = 'blushify-demo-session';
interface AuthContextValue { user: DemoUser | null; loading: boolean; login: (email: string) => Promise<boolean>; logout: () => void; }
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (isDemoUser(parsed)) setUser(parsed);
        else localStorage.removeItem(SESSION_KEY);
      }
    } catch { localStorage.removeItem(SESSION_KEY); }
    setLoading(false);
  }, []);
  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    login: async (email) => {
      if (email.trim().toLowerCase() !== 'demo@blushify.local') return false;
      const demoUser: DemoUser = { id: 'demo-user', email: 'demo@blushify.local', displayName: 'Demo customer', role: 'customer' };
      setUser(demoUser); localStorage.setItem(SESSION_KEY, JSON.stringify(demoUser)); return true;
    },
    logout: () => { setUser(null); localStorage.removeItem(SESSION_KEY); },
  }), [loading, user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
