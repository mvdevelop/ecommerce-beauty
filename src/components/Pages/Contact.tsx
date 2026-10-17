import { useState, type FormEvent } from 'react';

export default function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); event.currentTarget.reset(); };
  return <main className="container py-5"><p className="eyebrow">Atendimento</p><h1>Fale com a Blushify</h1><p>Envie uma mensagem sobre a experiência demonstrativa. O formulário não envia dados para um serviço externo.</p><form onSubmit={submit} className="col-lg-6"><label htmlFor="name" className="form-label">Nome</label><input id="name" className="form-control mb-3" required /><label htmlFor="email" className="form-label">E-mail</label><input id="email" type="email" className="form-control mb-3" required /><label htmlFor="message" className="form-label">Mensagem</label><textarea id="message" className="form-control mb-3" required rows={5} /><button className="btn btn-primary" type="submit">Enviar mensagem</button>{sent && <p className="mt-3" role="status" aria-live="polite">Mensagem registrada para demonstração. Obrigado pelo contato!</p>}</form></main>;
}
