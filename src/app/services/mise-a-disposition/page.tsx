import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/data/routes";

export const metadata: Metadata = { title: "Mise à disposition", description: "Chauffeur à l'heure ou à la journée à Monaco et sur la Riviera : rendez-vous, shopping, escapades." };

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">Services  /  Mise à disposition</span>
          <h1 className="display-xl">Un chauffeur rien que pour vous.</h1>
          <p className="body-l">À l'heure, à la demi-journée ou à la journée : rendez-vous d'affaires, shopping, escapade à Èze, Menton ou Saint-Tropez. Trajets illimités pendant la durée réservée.</p>
          <div><Link href="/tarifs/" className="btn btn--primary">Voir tous les tarifs</Link></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>Nos formules</h2>
          <div className="grid grid-3">
            {packages.map((p) => (
              <div key={p.title} className="card card--pad stack" style={{ borderColor: p.featured ? "var(--champagne)" : undefined }}>
                {p.featured && <span className="kicker">Le plus demandé</span>}
                <h3 className="display-s">{p.title}</h3>
                <span className="body-s muted">{p.detail}</span>
                <span className="display-l gold">{p.price}&nbsp;€</span>
                <span className="caption muted">Mercedes Classe S, TTC</span>
                <Link href="/reserver/" className={`btn btn--block ${p.featured ? "btn--primary" : "btn--secondary"}`}>Réserver</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>Idées d'escapades</h2>
          <div className="grid grid-3">
            {[["Èze et Saint-Jean-Cap-Ferrat", "Village perché, jardin exotique et villas de la Riviera. Une demi-journée."], ["Menton et la frontière italienne", "Vieille ville, marché et déjeuner à Vintimille. Une demi-journée."], ["Saint-Tropez", "Port, plages de Pampelonne et retour au coucher du soleil. Une journée."]].map(([t, d]) => (
              <div key={t} className="rule-top stack" style={{ gap: 10 }}><h3 className="display-s">{t}</h3><p className="muted" style={{ margin: 0 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
