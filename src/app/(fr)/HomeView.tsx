"use client";

import Link from "@/i18n/LocalizedLink";
import TripForm from "@/components/TripForm";
import { ArticleCard, FaqItem, Media } from "@/components/ui";
import { VehicleTile } from "@/components/Vehicle";
import { PressBand } from "@/components/Press";
import { PartnersBand } from "@/components/Partners";
import { useHeroSlider, HeroSliderVideo, HeroSliderBar } from "@/components/HeroSlider";
import { articles, homeVideos } from "@/data/content";
import { popularRoutes } from "@/data/routes";
import { site } from "@/data/site";
import { getVehicle } from "@/data/vehicles";
import { bookingQuery } from "@/lib/query";
import { useI18n } from "@/i18n/context";

export default function Home() {
  const { t } = useI18n();
  const homeFaq = [...t.pricing.faq.slice(0, 2), t.faqPage.cancellation, t.services.transfers.faq[0]];
  const slider = useHeroSlider(homeVideos.map((video, i) => ({ ...video, caption: t.home.videoCaptions[i] })));
  const featuredVehicles = ["mercedes-classe-s-berline", "mercedes-classe-v", "mercedes-eqs"].map((slug) => {
    const vehicle = getVehicle(slug);
    if (!vehicle) throw new Error(`Unknown featured vehicle: ${slug}`);
    return vehicle;
  });
  return (
    <>
      {/* HERO — fond vidéo défilant (hero + clips) */}
      <section className="hero">
        <HeroSliderVideo {...slider} />
        <div className="container hero__inner">
          <span className="kicker">{t.home.heroKicker}</span>
          <h1 className="display-xl">{t.home.heroTitleLine1}<br />{t.home.heroTitleLine2}</h1>
          <p className="body-l">{t.home.heroSubtitle}</p>
          <HeroSliderBar {...slider} />
          <TripForm variant="bar" />
        </div>
      </section>

      {/* TRAJETS POPULAIRES */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t.home.popularRoutesKicker}</span>
            <h2 className="display-l">{t.home.popularRoutesTitle}</h2>
          </div>
          <div className="grid grid-4">
            {popularRoutes.map((r, i) => (
              <Link key={r.from + r.to} href={`/reserver/?${bookingQuery({ from: r.from, to: r.to })}`} className="route-card">
                <span className="route-line"><span /></span>
                <span className="display-s">{t.home.popularRoutes[i].from} → {t.home.popularRoutes[i].to}</span>
                {r.distance && r.duration && <span className="body-s muted">{r.distance}, {t.home.popularRoutes[i].duration}</span>}
                <span className="label gold">{t.vehiclePage.startingFrom} {r.prices["mercedes-eqs"]}&nbsp;€</span>
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
              <span className="kicker">{t.home.vehiclesKicker}</span>
              <h2 className="display-l">{t.home.vehiclesTitle}</h2>
            </div>
            <Link href="/flotte/" className="btn btn--secondary">{t.home.seeFleet}</Link>
          </div>
          <div className="carousel">
            {featuredVehicles.map((v) => <VehicleTile key={v.slug} v={v} />)}
          </div>
          <figure style={{ margin: "24px 0 0" }}>
            <div className="card service-row">
              <Media src="/images/vehicules/rolls-royce-cullinan.jpg" alt="Rolls-Royce Cullinan" ratio="16/10" />
              <div className="stack" style={{ gap: 14 }}>
                <h3 className="display-s">{t.home.prestigeVehicle}</h3>
                <span className="price">{t.step2.priceOnRequest}</span>
                <span className="caption muted">Rolls-Royce Cullinan</span>
                <Link href="/contact/" className="btn btn--primary btn--sm" style={{ justifySelf: "start" }}>{t.step2.requestQuote}</Link>
              </div>
            </div>
            <figcaption className="caption muted" style={{ marginTop: 8 }}>
              © <a href="https://commons.wikimedia.org/wiki/File:Rolls-Royce_Cullinan_001.jpg" target="_blank" rel="noopener noreferrer">Jengtingchen</a>
              {" · "}<a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
              {" · "}{t.home.prestigeImageChanges}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t.home.stepsKicker}</span>
            <h2 className="display-l">{t.home.stepsTitle}</h2>
          </div>
          <div className="grid grid-3">
            {t.home.steps.map((s, i) => (
              <div key={s.title} className="rule-top stack" style={{ gap: 12 }}>
                <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display-s">{s.title}</h3>
                <p className="muted" style={{ margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS */}
      <section className="section section--sea">
        <div className="container">
          <div className="section-head">
            <span className="kicker">{t.home.commitmentsKicker}</span>
            <h2 className="display-l">{t.home.commitmentsTitle}</h2>
          </div>
          <div className="grid grid-4">
            {t.home.commitments.map((c) => (
              <div key={c.title} className="stack" style={{ gap: 10 }}>
                <span style={{ width: 24, height: 2, background: "var(--champagne)" }} />
                <h3 className="display-s">{c.title}</h3>
                <p className="body-s muted" style={{ margin: 0 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES — désactivé temporairement à la demande du client.
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="kicker">Avis clients</span>
            <h2 className="display-l">Ils ont voyagé avec nous</h2>
          </div>
          <div className="carousel">{testimonials.map((t) => <Testimonial key={t.name} {...t} />)}</div>
        </div>
      </section>
      */}

      {/* FAQ */}
      <section className="section section--alt">
        <div className="container split">
          <div className="stack" style={{ gap: 12, alignContent: "start" }}>
            <span className="kicker">{t.home.faqKicker}</span>
            <h2 className="display-l">{t.home.faqTitle}</h2>
            <p className="muted">{t.home.faqSubtitlePrefix} {site.phoneDisplay} — {t.common.availability}.</p>
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
            <span className="kicker">{t.home.journalKicker}</span>
            <h2 className="display-l">{t.home.journalTitle}</h2>
          </div>
          <div className="grid grid-3">{articles.slice(0, 3).map((a) => <ArticleCard key={a.slug} {...a} />)}</div>
        </div>
      </section>

      {/* PARTENAIRES — dernière section avant le footer */}
      <PartnersBand />
    </>
  );
}
