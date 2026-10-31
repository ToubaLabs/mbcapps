import Link from "next/link";
import TripForm from "@/components/TripForm";
import { ArticleCard, FaqItem, Testimonial } from "@/components/ui";
import { VehicleTile } from "@/components/Vehicle";
import { PressBand } from "@/components/Press";
import { articles, faq, testimonials } from "@/data/content";
import { popularRoutes } from "@/data/routes";
import { site } from "@/data/site";
import { vehicles } from "@/data/vehicles";
import { bookingQuery } from "@/lib/query";

export default function Home() {
  const homeFaq = [...faq["Prix et paiement"].slice(0, 2), faq["Annulation"][0], faq["Aéroport et vols"][0]];
  return (
    <>
      {/* HERO — vidéo de fond : /public/images/hero.mp4 */}
      <section className="hero">
        <video className="hero__media" src="/images/hero.mp4" autoPlay muted loop playsInline preload="auto" aria-hidden />
        <div className="container hero__inner">
          <span className="kicker">Chauffeur privé à Monaco</span>
          <h1 className="display-xl">Votre chauffeur à Monaco,<br />de jour comme de nuit.</h1>
          <p className="body-l">Prix fixe affiché avant de réserver. Chauffeur confirmé en quelques minutes.</p>
          <div style={{ marginTop: 24 }}><TripForm variant="bar" /></div>
        </div>
      </section>

      {/* TRAJETS POPULAIRES */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Trajets populaires</span>
            <h2 className="display-l">Vos trajets les plus demandés, à prix fixe</h2>
          </div>
          <div className="grid grid-4">
            {popularRoutes.map((r) => (
              <Link key={r.from + r.to} href={`/reserver/?${bookingQuery({ from: r.from, to: r.to })}`} className="route-card">
                <span className="route-line"><span /></span>
                <span className="display-s">{r.from} → {r.to}</span>
                <span className="body-s muted">{r.distance}, {r.duration}</span>
                <span className="label gold">dès {r.price}&nbsp;€</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NOS VÉHICULES */}
      <section className="section section--surface">
        <div className="container">
          <div className="section-head section-head--row">
            <div className="stack" style={{ gap: 10 }}>
              <span className="kicker">Les plus demandés</span>
              <h2 className="display-l">Nos véhicules</h2>
            </div>
            <Link href="/flotte/" className="btn btn--secondary">Voir toute la flotte</Link>
          </div>
          <div className="carousel">
            {[vehicles[0], vehicles[3], vehicles[2]].map((v) => <VehicleTile key={v.slug} v={v} />)}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Simple</span>
            <h2 className="display-l">Réserver en trois étapes</h2>
          </div>
          <div className="grid grid-3">
            {[
              ["01", "Indiquez votre trajet", "Départ, destination et moment. Le prix fixe s'affiche aussitôt."],
              ["02", "Choisissez le véhicule", "Berline, van ou SUV, selon vos passagers et vos bagages."],
              ["03", "Votre chauffeur vous attend", "Confirmation sur WhatsApp, puis nom et photo du chauffeur la veille."],
            ].map(([n, t, d]) => (
              <div key={n} className="rule-top stack" style={{ gap: 12 }}>
                <span className="step-num">{n}</span>
                <h3 className="display-s">{t}</h3>
                <p className="muted" style={{ margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="section section--sea">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Nos engagements</span>
            <h2 className="display-l">Ce qui est toujours inclus</h2>
          </div>
          <div className="grid grid-4">
            {[
              ["Vol suivi", "Le chauffeur adapte son heure si votre avion a du retard."],
              ["Prix fixe", "Péages et 60 minutes d'attente compris, sans surprise."],
              ["Chauffeurs bilingues", "Français et anglais, discrets et ponctuels."],
              ["Annulation gratuite", "Jusqu'à 24 heures avant la prise en charge."],
            ].map(([t, d]) => (
              <div key={t} className="stack" style={{ gap: 10 }}>
                <span style={{ width: 24, height: 2, background: "var(--champagne)" }} />
                <h3 className="display-s">{t}</h3>
                <p className="body-s muted" style={{ margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Avis clients</span>
            <h2 className="display-l">Ils ont voyagé avec nous</h2>
          </div>
          <div className="carousel">{testimonials.map((t) => <Testimonial key={t.name} {...t} />)}</div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container split">
          <div className="stack" style={{ gap: 12, alignContent: "start" }}>
            <span className="kicker">FAQ</span>
            <h2 className="display-l">Vos questions</h2>
            <p className="muted">Une autre question ? Appelez-nous au {site.phoneDisplay}, 24h/24.</p>
          </div>
          <div>{homeFaq.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} open={i === 0} />)}</div>
        </div>
      </section>

      {/* PRESSE */}
      <PressBand />

      {/* JOURNAL */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Journal</span>
            <h2 className="display-l">Bien circuler à Monaco</h2>
          </div>
          <div className="grid grid-3">{articles.slice(0, 3).map((a) => <ArticleCard key={a.slug} {...a} />)}</div>
        </div>
      </section>
    </>
  );
}
