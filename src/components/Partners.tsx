"use client";

import { useState } from "react";
import { partners } from "@/data/content";
import { useI18n } from "@/i18n/context";

/** Logo d'un partenaire, avec repli sur son nom en texte tant que le fichier n'est pas fourni. */
function PartnerLogo({ name, logo, lightBackground }: { name: string; logo?: string; lightBackground?: boolean }) {
  const [failed, setFailed] = useState(!logo);
  if (failed) return <span className="partner-card__name">{name}</span>;
  return <img src={logo} alt={name} className={`partner-card__img${lightBackground ? " partner-card__img--light" : ""}`} loading="lazy" onError={() => setFailed(true)} />;
}

/** Bande « Nos partenaires » de l'accueil. */
export function PartnersBand() {
  const { t } = useI18n();
  if (!partners.length) return null;
  return (
    <section className="section partners-band">
      <div className="container">
        <div className="section-head" style={{ textAlign: "center", justifyItems: "center", margin: "0 auto 40px" }}>
          <h2 className="kicker" style={{ margin: 0 }}>{t.partners.kicker}</h2>
        </div>
        <div className="partners-band__media">
          {partners.map((p) => (
            <div key={p.name} className="partner-card">
              <PartnerLogo name={p.name} logo={p.logo} lightBackground={p.lightLogoBackground} />
              {p.tagline && <span className="partner-card__tagline">{p.tagline}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
