import type { Metadata } from "next";
import Link from "next/link";
import { FaqItem, PageHead } from "@/components/ui";
import TripForm from "@/components/TripForm";
import { extras, packages, routes } from "@/data/routes";
import { ratio, vehicles } from "@/data/vehicles";
import { faq } from "@/data/content";

export const metadata: Metadata = { title: "Tarifs", description: "Prix fixes TTC des trajets avec chauffeur au départ de Monaco : aéroport de Nice, Cannes, Saint-Tropez, mise à disposition." };

const cols = [vehicles[0], vehicles[1], vehicles[2], vehicles[3], vehicles[5]];
const round5 = (n: number) => Math.round(n / 5) * 5;

export default function Page() {
  return (
    <>
      <PageHead crumb="Accueil  /  Tarifs" title="Tarifs">
        Prix fixes TTC, connus avant de réserver. Péages et 60 minutes d'attente à l'aéroport toujours inclus.
      </PageHead>

      <section className="section" style={{ paddingBottom: 48 }}>
        <div className="container stack" style={{ gap: 24 }}>
          <h2 className="display-m">Calculer mon prix</h2>
          <TripForm variant="bar" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="display-m" style={{ marginBottom: 24 }}>Trajets fréquents</h2>
          <div className="price-table-wrap">
            <table className="price-table">
              <thead><tr><th>Trajet</th>{cols.map((v) => <th key={v.slug}>{v.name.replace("Mercedes ", "")}</th>)}</tr></thead>
              <tbody>
                {routes.map((r) => (
                  <tr key={r.from + r.to}>
                    <td>{r.from} → {r.to}</td>
                    {cols.map((v) => <td key={v.slug}>{round5(r.price * ratio(v))}&nbsp;€</td>)}
                  </tr>
                ))}
                <tr><td>Mise à disposition, par heure</td>{cols.map((v) => <td key={v.slug}>{v.hourly}&nbsp;€</td>)}</tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section--surface">
        <div className="container">
          <div className="section-head">
            <h2 className="display-l">Mise à disposition</h2>
            <p className="muted" style={{ margin: 0 }}>Un chauffeur et un véhicule rien que pour vous. Trajets illimités dans la zone de la Riviera.</p>
          </div>
          <div className="grid grid-3">
            {packages.map((p) => (
              <div key={p.title} className="card card--pad stack" style={{ borderColor: p.featured ? "var(--champagne)" : undefined }}>
                {p.featured && <span className="kicker">Le plus demandé</span>}
                <h3 className="display-s">{p.title}</h3>
                <span className="body-s muted">{p.detail}</span>
                <span className="display-l gold">{p.price}&nbsp;€</span>
                <span className="caption muted">Mercedes Classe S, TTC, chauffeur inclus</span>
                <Link href="/reserver/" className={`btn btn--block ${p.featured ? "btn--primary" : "btn--secondary"}`}>Réserver</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div className="stack">
            <h2 className="display-l">Bon à savoir</h2>
            <ul className="dot-list">{extras.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
          <div>{faq["Prix et paiement"].map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} open={i === 1} />)}</div>
        </div>
      </section>
    </>
  );
}
