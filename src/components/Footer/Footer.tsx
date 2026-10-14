import { Link } from 'react-router-dom';

export default function Footer() {
  return <footer className="border-top mt-5 py-4"><div className="container d-flex justify-content-between flex-wrap gap-3"><span>© {new Date().getFullYear()} Blushify</span><nav aria-label="Footer navigation" className="d-flex gap-3"><Link to="/about">About</Link><Link to="/contact">Contact</Link><Link to="/blog">Blog</Link></nav></div></footer>;
}
