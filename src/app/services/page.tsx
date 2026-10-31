import type { Metadata } from "next";
import Link from "next/link";
import { Media } from "@/components/ui";

export const metadata: Metadata = { title: "Services", description: "Transferts aéroport, événements et mise à disposition avec chauffeur à Monaco." };

const services = [
  { href: "/services/transferts-aeroport/", img: "transferts", title: "Transferts aéroport", text: "Aéroport de Nice, Cannes-Mandelieu ou héliport de Monaco. Vol suivi, 60 minutes d'attente offertes, accueil avec pancarte.", price: "Dès 120 €", cta: "Voir les transferts" },
  { href: "/evenements/", img: "evenements", title: "Événements", text: "Grand Prix, Monaco Yacht Show, galas, mariages : un chauffeur dédié par véhicule et un seul interlocuteur.", price: "Sur devis", cta: "Voir les événements" },
  { href: "/services/mise-a-disposition/", img: "mise-a-disposition", title: "Mise à disposition", text: "Un chauffeur à l'heure ou à la journée pour vos rendez-vous ou une escapade sur la Riviera.", price: "Dès 285 € les 3 h", cta: "Voir la mise à disposition" },
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">Services</span>
          <h1 className="display-xl">Un chauffeur pour chaque occasion.</h1>
          <p className="body-l">Transferts, événements ou mise à disposition : prix fixe annoncé à l'avance, réservation finalisée sur WhatsApp.</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 72 }}>
        <div className="container stack" style={{ gap: 24 }}>
          {services.map((s, i) => (
            <Link key={s.href} href={s.href} className="card service-row">
              <Media src={`/images/services/${s.img}.jpg`} alt={`Photo ${s.title}`} ratio="16/10" />
              <div className="stack" style={{ gap: 14 }}>
                <span className="kicker">0{i + 1}</span>
                <h2 className="display-l">{s.title}</h2>
                <p className="muted" style={{ margin: 0 }}>{s.text}</p>
                <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
                  <span className="price">{s.price}</span>
                  <span className="btn btn--secondary btn--sm">{s.cta}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
