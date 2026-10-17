import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import { useLanguage } from '../../i18n/LanguageProvider';

export default function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); const ok = await login(email, password); if (ok) navigate((location.state as { from?: string } | null)?.from ?? '/account'); else setError(t('auth.invalidCredentials')); };
  return (
    <main className="container py-5">
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        <p className="eyebrow">{t('auth.loginEyebrow')}</p>
        <h1>{t('auth.loginTitle')}</h1>
        <p>{t('auth.demoHint')}</p>
        <form className="d-grid gap-3" onSubmit={submit}>
          <label htmlFor="email">{t('common.email')}<input id="email" className="form-control" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label htmlFor="password">{t('common.password')}<input id="password" className="form-control" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          {error && <p role="alert">{error}</p>}
          <button className="btn" type="submit">{t('auth.loginSubmit')}</button>
        </form>
        <p className="mt-3">{t('auth.noAccount')} <Link to="/signup">{t('auth.signupSubmit')}</Link></p>
      </div>
    </main>
  );
}