import type { Metadata } from "next";
import Link from "next/link";
import { FaqItem } from "@/components/ui";
import { site } from "@/data/site";
import { faq } from "@/data/content";

export const metadata: Metadata = { title: "Transferts aéroport", description: "Transfert avec chauffeur depuis l'aéroport de Nice, Cannes-Mandelieu ou l'héliport jusqu'à Monaco. Vol suivi, attente offerte." };

const trips = [["Aéroport Nice → Monaco", 120], ["Aéroport Nice → Menton", 150], ["Aéroport Cannes-Mandelieu → Monaco", 190], ["Héliport de Monaco → Hôtel à Monaco", 60]] as const;

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">Services  /  Transferts aéroport</span>
          <h1 className="display-xl">Transferts aéroport, sans attendre.</h1>
          <p className="body-l">De l'aéroport de Nice, de Cannes-Mandelieu ou de l'héliport jusqu'à votre hôtel à Monaco. Votre chauffeur suit votre vol et vous attend à la sortie.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link href="/reserver/?to=A%C3%A9roport+Nice+C%C3%B4te+d%27Azur%2C+T1" className="btn btn--primary">Voir les prix</Link>
            <a href={site.phoneHref} className="btn btn--secondary">Appeler le {site.phoneDisplay}</a>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>Toujours inclus</h2>
          <div className="grid grid-3">
            {[["Vol suivi en temps réel", "En cas de retard, le chauffeur adapte son heure d'arrivée, sans supplément."], ["60 minutes d'attente", "Le temps de récupérer vos bagages en toute tranquillité."], ["Accueil avec pancarte", "Votre chauffeur vous attend en salle d'arrivée, à votre nom."]].map(([t, d]) => (
              <div key={t} className="rule-top stack" style={{ gap: 10 }}><h3 className="display-s">{t}</h3><p className="muted" style={{ margin: 0 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 24 }}>Trajets les plus demandés</h2>
          {trips.map(([t, p]) => <div key={t} className="row-line body-l"><span>{t}</span><span className="price">dès {p}&nbsp;€</span></div>)}
        </div>
      </section>
      <section className="section">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 24 }}>Questions fréquentes</h2>
          {faq["Aéroport et vols"].map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} open={i === 0} />)}
        </div>
      </section>
    </>
  );
}
