import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Signup() {
  const { signup } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ displayName: '', email: '', password: '', confirmation: '' });
  const [error, setError] = useState('');
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (form.password.length < 6) { setError(t('auth.passwordTooShort')); return; }
    if (form.password !== form.confirmation) { setError(t('auth.passwordMismatch')); return; }
    const ok = await signup(form.displayName, form.email, form.password);
    if (!ok) { setError(t('auth.signupFailed')); return; }
    navigate((location.state as { from?: string } | null)?.from ?? '/account');
  };
  return (
    <main className="container py-5">
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        <p className="eyebrow">{t('auth.signupEyebrow')}</p>
        <h1>{t('auth.signupTitle')}</h1>
        <p>{t('auth.signupNotice')}</p>
        <form className="d-grid gap-3" onSubmit={submit}>
          <label htmlFor="signup-name">{t('common.name')}<input id="signup-name" className="form-control" required value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} /></label>
          <label htmlFor="signup-email">{t('common.email')}<input id="signup-email" className="form-control" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label htmlFor="signup-password">{t('common.password')}<input id="signup-password" className="form-control" type="password" minLength={6} required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          <label htmlFor="signup-confirmation">{t('auth.confirmPassword')}<input id="signup-confirmation" className="form-control" type="password" minLength={6} required value={form.confirmation} onChange={(event) => setForm({ ...form, confirmation: event.target.value })} /></label>
          {error && <p role="alert">{error}</p>}
          <button className="btn" type="submit">{t('auth.signupSubmit')}</button>
        </form>
        <p className="mt-3">{t('auth.hasAccount')} <Link to="/login">{t('auth.loginSubmit')}</Link></p>
      </div>
    </main>
  );
}