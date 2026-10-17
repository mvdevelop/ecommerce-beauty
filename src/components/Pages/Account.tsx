import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

export default function Account() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return <main className="container py-5"><p className="eyebrow">Área do cliente</p><h1>Olá, {user.displayName}</h1><p>{user.email}</p><p className="text-muted">Acompanhe seus pedidos e produtos favoritos em um só lugar.</p><div className="row g-3 mt-3"><div className="col-md-4"><Link className="d-block border p-4 h-100 text-decoration-none" to="/account/orders"><h2 className="h5">Meus pedidos</h2><p>Consulte o histórico dos seus pedidos demonstrativos.</p></Link></div><div className="col-md-4"><Link className="d-block border p-4 h-100 text-decoration-none" to="/account/favorites"><h2 className="h5">Meus favoritos</h2><p>Veja e gerencie os produtos que você salvou.</p></Link></div><div className="col-md-4"><Link className="d-block border p-4 h-100 text-decoration-none" to="/shop"><h2 className="h5">Continuar comprando</h2><p>Descubra novos produtos para sua rotina.</p></Link></div></div><button className="btn btn-outline-secondary mt-4" type="button" onClick={logout}>Sair da conta</button></main>;
}
