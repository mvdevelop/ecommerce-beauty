import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); const ok = await login(email); if (ok) navigate((location.state as { from?: string } | null)?.from ?? '/account'); else setError('Unable to sign in with those details.'); };
  return <main className="container py-5"><div className="mx-auto" style={{ maxWidth: 480 }}><p className="eyebrow">Demo account</p><h1>Welcome back</h1><p>Use demo@blushify.local for this local prototype.</p><form className="d-grid gap-3" onSubmit={submit}><label htmlFor="email">Email<input id="email" className="form-control" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>{error && <p role="alert">{error}</p>}<button className="btn" type="submit">Sign in</button></form><p className="mt-3"><Link to="/">Return home</Link></p></div></main>;
}
