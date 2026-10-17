import { Link } from 'react-router-dom';

export default function Shipping() { return <main className="container py-5"><p className="eyebrow">Atendimento</p><h1>Entrega</h1><p>O checkout da Blushify é demonstrativo e não gera remessas reais nesta versão.</p><h2 className="h4 mt-4">Como funcionará no futuro</h2><p>Uma operação real deverá informar regiões atendidas, prazos, custos, rastreamento e transportadoras antes da confirmação do pedido.</p><p><Link to="/contact">Fale com o atendimento</Link> se tiver dúvidas sobre o protótipo.</p></main>; }
