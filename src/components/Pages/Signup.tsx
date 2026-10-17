import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ displayName: '', email: '', password: '', confirmation: '' });
  const [error, setError] = useState('');
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    if (form.password.length < 6) { setError('A senha deve ter pelo menos 6 caracteres.'); return; }
    if (form.password !== form.confirmation) { setError('As senhas não coincidem.'); return; }
    const ok = await signup(form.displayName, form.email, form.password);
    if (!ok) { setError('Não foi possível criar a conta. Verifique os dados ou use outro e-mail.'); return; }
    navigate((location.state as { from?: string } | null)?.from ?? '/account');
  };
  return <main className="container py-5"><div className="mx-auto" style={{ maxWidth: 480 }}><p className="eyebrow">Crie sua conta</p><h1>Comece sua jornada de beleza</h1><p>Esta é uma conta demonstrativa local. Não use senhas reais.</p><form className="d-grid gap-3" onSubmit={submit}><label htmlFor="signup-name">Nome<input id="signup-name" className="form-control" required value={form.displayName} onChange={(event) => setForm({ ...form, displayName: event.target.value })} /></label><label htmlFor="signup-email">E-mail<input id="signup-email" className="form-control" type="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label><label htmlFor="signup-password">Senha<input id="signup-password" className="form-control" type="password" minLength={6} required value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label><label htmlFor="signup-confirmation">Confirme sua senha<input id="signup-confirmation" className="form-control" type="password" minLength={6} required value={form.confirmation} onChange={(event) => setForm({ ...form, confirmation: event.target.value })} /></label>{error && <p role="alert">{error}</p>}<button className="btn" type="submit">Criar conta</button></form><p className="mt-3">Já possui uma conta? <Link to="/login">Entrar</Link></p></div></main>;
}
