"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useBooking } from "@/lib/booking";
import { formatDate } from "@/lib/whatsapp";
import { vehicles, ratio } from "@/data/vehicles";
import { routes } from "@/data/routes";
import { Counter, Progress } from "@/components/ui";
import { VehicleOption } from "@/components/Vehicle";
import TripSummary from "@/components/TripSummary";

/**
 * Calcul du prix (provisoire, dans le navigateur) :
 * si le trajet correspond à un trajet de la grille, on applique son prix × coefficient du véhicule ;
 * sinon on affiche le prix de référence du véhicule. À remplacer par la vraie grille du client.
 */
function priceFor(from: string, to: string, slug: string) {
  const v = vehicles.find((x) => x.slug === slug)!;
  const norm = (s: string) => s.toLowerCase();
  const r = routes.find((r) => norm(from + to).includes(norm(r.from).split(" ")[0]) && norm(from + to).includes(norm(r.to).split(" ")[0]));
  return r ? Math.round((r.price * ratio(v)) / 5) * 5 : v.basePrice;
}

function Step2() {
  const [b, go] = useBooking();
  const [pax, setPax] = useState(b.passengers);
  const [bags, setBags] = useState(b.bags);
  const initial = vehicles.find((v) => v.name === b.vehicle)?.slug ?? "mercedes-classe-s";
  const [sel, setSel] = useState(initial);
  const selected = vehicles.find((v) => v.slug === sel)!;
  const price = priceFor(b.from, b.to, sel);
  const fits = (v: (typeof vehicles)[number]) => v.passengers >= pax && v.bags >= bags;

  if (!b.from || !b.to) {
    return (
      <div className="container booking" style={{ display: "block" }}>
        <div className="empty">
          <h1 className="display-s">Indiquez d'abord votre trajet</h1>
          <p className="muted">Pour afficher les véhicules et leurs prix, nous avons besoin du départ et de la destination.</p>
          <Link href="/reserver/" className="btn btn--primary">Indiquer mon trajet</Link>
        </div>
      </div>
    );
  }

  const next = () => go({ passengers: pax, bags, vehicle: selected.name, price }, "/reserver/whatsapp/");

  return (
    <>
      <TripSummary b={b} />
      <div className="container booking">
        <div className="booking__main">
          <Progress step={2} />
          <h1 className="display-l">Choisissez votre véhicule</h1>
          <p className="muted" style={{ margin: 0 }}>Prix fixes TTC. Péages et 60 minutes d'attente à l'aéroport inclus.</p>
          <div className="grid grid-2">
            <Counter label="Passagers" value={pax} min={1} max={7} onChange={setPax} />
            <Counter label="Bagages" value={bags} max={7} onChange={setBags} />
          </div>
          <div className="stack">
            {vehicles.map((v) => (
              <VehicleOption key={v.slug} v={v} price={priceFor(b.from, b.to, v.slug)} selected={v.slug === sel}
                disabled={!fits(v)} onSelect={() => setSel(v.slug)} />
            ))}
          </div>
        </div>

        <aside className="card card--pad recap">
          <h2 className="display-s">Votre trajet</h2>
          <dl>
            <div><dt>Départ</dt><dd>{b.from}</dd></div>
            <div><dt>Arrivée</dt><dd>{b.to}</dd></div>
            <div><dt>Date</dt><dd>{formatDate(b.date)} à {b.time}</dd></div>
            <div><dt>Véhicule</dt><dd>{selected.name}</dd></div>
          </dl>
          <hr className="divider" />
          <div className="row-line" style={{ border: 0, padding: 0, alignItems: "center" }}>
            <span className="label">Total TTC</span><span className="price">{price}&nbsp;€</span>
          </div>
          <button className="btn btn--primary btn--block" onClick={next} disabled={!fits(selected)}>Continuer sur WhatsApp</button>
          <p className="caption muted" style={{ textAlign: "center", margin: 0 }}>Annulation gratuite jusqu'à 24 h avant.</p>
        </aside>
      </div>

      <div className="sticky-bar">
        <div className="sticky-bar__row">
          <span><span className="label">{selected.name}</span><br /><span className="caption muted">Prix fixe TTC</span></span>
          <span className="price">{price}&nbsp;€</span>
        </div>
        <button className="btn btn--primary btn--block" onClick={next} disabled={!fits(selected)}>Continuer sur WhatsApp</button>
      </div>
    </>
  );
}

export default function Page() {
  return <Suspense><Step2 /></Suspense>;
}
