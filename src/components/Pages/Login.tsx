import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (event: FormEvent) => { event.preventDefault(); setError(''); const ok = await login(email, password); if (ok) navigate((location.state as { from?: string } | null)?.from ?? '/account'); else setError('E-mail ou senha inválidos.'); };
  return <main className="container py-5"><div className="mx-auto" style={{ maxWidth: 480 }}><p className="eyebrow">Área do cliente</p><h1>Bem-vindo de volta</h1><p>Conta demo: demo@blushify.local / demo123</p><form className="d-grid gap-3" onSubmit={submit}><label htmlFor="email">E-mail<input id="email" className="form-control" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label><label htmlFor="password">Senha<input id="password" className="form-control" type="password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>{error && <p role="alert">{error}</p>}<button className="btn" type="submit">Entrar</button></form><p className="mt-3">Ainda não possui uma conta? <Link to="/signup">Criar conta</Link></p></div></main>;
}
