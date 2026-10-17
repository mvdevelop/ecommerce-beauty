import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { DemoUser } from '../types/api';
import { isDemoUser } from '../lib/runtime';

const SESSION_KEY = 'blushify-demo-session';
const ACCOUNTS_KEY = 'blushify-demo-accounts';
const DEMO_EMAIL = 'demo@blushify.local';

type DemoAccount = DemoUser & { password: string };
interface AuthContextValue {
  user: DemoUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (displayName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextValue | null>(null);

function readAccounts(): DemoAccount[] {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((account): account is DemoAccount => Boolean(isDemoUser(account) && typeof (account as DemoAccount).password === 'string')) : [];
  } catch {
    return [];
  }
}

function saveSession(user: DemoUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

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
    login: async (email, password) => {
      const normalizedEmail = email.trim().toLowerCase();
      const account = normalizedEmail === DEMO_EMAIL
        ? { id: 'demo-user', email: DEMO_EMAIL, displayName: 'Demo customer', role: 'customer' as const, password: 'demo123' }
        : readAccounts().find((item) => item.email === normalizedEmail);
      if (!account || account.password !== password) return false;
      const sessionUser: DemoUser = { id: account.id, email: account.email, displayName: account.displayName, role: account.role };
      setUser(sessionUser);
      saveSession(sessionUser);
      return true;
    },
    signup: async (displayName, email, password) => {
      const normalizedEmail = email.trim().toLowerCase();
      const accounts = readAccounts();
      if (!displayName.trim() || normalizedEmail === DEMO_EMAIL || accounts.some((item) => item.email === normalizedEmail)) return false;
      const account: DemoAccount = { id: `demo-${Date.now()}`, email: normalizedEmail, displayName: displayName.trim(), role: 'customer', password };
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
      const sessionUser: DemoUser = { id: account.id, email: account.email, displayName: account.displayName, role: account.role };
      setUser(sessionUser);
      saveSession(sessionUser);
      return true;
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
