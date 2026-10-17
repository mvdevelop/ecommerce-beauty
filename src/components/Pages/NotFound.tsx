import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container py-5 text-center" aria-labelledby="not-found-title">
      <h1 id="not-found-title">Página não encontrada</h1>
      <p className="mb-4">A página que você acessou não existe ou foi movida.</p>
      <Link className="btn btn-primary" to="/">Voltar para a página inicial</Link>
    </main>
  );
}
