import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';

export default function Account() {
  const { user, logout } = useAuth();
  if (!user) return null;
  return <main className="container py-5"><p className="eyebrow">Your space</p><h1>Hi, {user.displayName}</h1><p>{user.email}</p><div className="row g-3 mt-3"><div className="col-md-4"><Link className="d-block border p-4 h-100" to="/account/orders"><h2 className="h5">Orders</h2><p>Review your demo order history.</p></Link></div><div className="col-md-4"><Link className="d-block border p-4 h-100" to="/wishlist"><h2 className="h5">Favorites</h2><p>See the products you saved.</p></Link></div><div className="col-md-4"><div className="border p-4 h-100"><h2 className="h5">Profile</h2><p>Manage your account details.</p><button className="btn btn-sm" type="button" onClick={logout}>Sign out</button></div></div></div></main>;
}
