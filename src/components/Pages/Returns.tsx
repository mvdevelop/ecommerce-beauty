import { Link } from 'react-router-dom';

export default function Returns() { return <main className="container py-5"><p className="eyebrow">Atendimento</p><h1>Trocas e devoluções</h1><p>Como esta é uma demonstração, nenhum pedido real é enviado ou elegível para devolução.</p><h2 className="h4 mt-4">Operação futura</h2><p>Uma política comercial real deverá explicar prazos, condições do produto, logística reversa, reembolso e canais de atendimento.</p><p><Link to="/contact">Fale com o atendimento</Link> para enviar uma dúvida sobre a experiência.</p></main>; }
