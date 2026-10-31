import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVehicle, ratio, vehicles } from "@/data/vehicles";
import { routes } from "@/data/routes";
import { testimonials } from "@/data/content";
import { Gallery, VehicleTile } from "@/components/Vehicle";
import { Testimonial } from "@/components/ui";
import { bookingQuery } from "@/lib/query";

export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const v = getVehicle((await params).slug);
  return v ? { title: `${v.name} avec chauffeur`, description: `${v.label} avec chauffeur à Monaco : ${v.passengers} passagers, ${v.bags} bagages. ${v.idealFor}` } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const v = getVehicle((await params).slug);
  if (!v) notFound();
  const tariffs = [routes[0], routes[2], routes[3]].map((r) => ({ label: `${r.from} → ${r.to}`, price: Math.round((r.price * ratio(v)) / 5) * 5 }));
  const similar = vehicles.filter((x) => x.slug !== v.slug).slice(0, 3);

  return (
    <>
      <div className="container" style={{ paddingTop: 32 }}>
        <span className="caption muted">Accueil  /  <Link href="/flotte/">Flotte</Link>  /  {v.name}</span>
      </div>
      <div className="container booking" style={{ paddingTop: 24, gap: 48 }}>
        <div className="booking__main" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 6 }}>
            <span className="kicker">{v.label}</span>
            <h1 className="display-l">{v.name}</h1>
          </div>
          <Gallery v={v} />

          <section className="stack">
            <h2 className="display-m">Caractéristiques</h2>
            <div className="grid grid-3" style={{ gap: 12 }}>
              {[["Passagers", v.passengers], ["Bagages", `${v.bags} valises`], ["Motorisation", v.engine], ["Intérieur", v.interior], ["À bord", v.onboard], ["Confort", "Vitres teintées, eau"]].map(([k, val]) => (
                <div key={k} className="card" style={{ padding: "16px 20px" }}>
                  <div className="caption muted">{k}</div><div className="label">{val}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="stack">
            <h2 className="display-m">Idéal pour</h2>
            <p className="muted" style={{ margin: 0 }}>{v.idealFor}</p>
          </section>

          <section>
            <h2 className="display-m">Tarifs de ce véhicule</h2>
            {tariffs.map((t) => (
              <div key={t.label} className="row-line"><span>{t.label}</span><span className="label gold">{t.price}&nbsp;€</span></div>
            ))}
            <div className="row-line"><span>Mise à disposition, par heure</span><span className="label gold">{v.hourly}&nbsp;€</span></div>
          </section>

          <section className="stack">
            <h2 className="display-m">Avis sur ce véhicule</h2>
            <div className="grid grid-2"><Testimonial {...testimonials[0]} /><Testimonial {...testimonials[2]} /></div>
          </section>
        </div>

        <aside className="card card--pad recap">
          <h2 className="display-s">Réserver ce véhicule</h2>
          <p className="body-s muted" style={{ margin: 0 }}>Indiquez votre trajet à l'étape suivante : le prix fixe s'affiche aussitôt.</p>
          <div className="row-line" style={{ border: 0, padding: 0, alignItems: "center" }}>
            <span className="label">À partir de</span><span className="price">{v.basePrice}&nbsp;€</span>
          </div>
          <Link href={`/reserver/?${bookingQuery({ vehicle: v.name })}`} className="btn btn--primary btn--block">Choisir mon trajet</Link>
          <p className="caption muted" style={{ textAlign: "center", margin: 0 }}>Péages et 60 min d'attente inclus. Annulation gratuite jusqu'à 24 h avant.</p>
        </aside>
      </div>

      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 32 }}>Véhicules similaires</h2>
          <div className="carousel">{similar.map((s) => <VehicleTile key={s.slug} v={s} />)}</div>
        </div>
      </section>

      <div className="sticky-bar">
        <div className="sticky-bar__row">
          <span><span className="caption muted">À partir de</span><br /><span className="price">{v.basePrice}&nbsp;€</span></span>
          <Link href={`/reserver/?${bookingQuery({ vehicle: v.name })}`} className="btn btn--primary">Réserver</Link>
        </div>
      </div>
    </>
  );
}
