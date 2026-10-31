import type { Metadata } from "next";
import { Media } from "@/components/ui";

export const metadata: Metadata = { title: "À propos", description: "Monaco Black Car, chauffeurs privés à Monaco : ponctualité, discrétion, transparence." };

const DRIVERS = [["Marc", "Français, anglais, italien"], ["Sofia", "Français, anglais, russe"], ["Karim", "Français, anglais, arabe"], ["Luca", "Français, italien, anglais"]];

export default function Page() {
  return (
    <>
      <section className="section">
        <div className="container stack" style={{ gap: 24, maxWidth: 1100 }}>
          <span className="kicker">À propos</span>
          <h1 className="display-xl">Nous connaissons chaque virage de la Principauté.</h1>
          <p className="body-l muted" style={{ margin: 0, maxWidth: 720 }}>Monaco Black Car est un service de chauffeurs privés basé à Monaco. Notre promesse est simple : être à l'heure, être discrets, et annoncer le bon prix dès le départ.</p>
        </div>
        <div className="container" style={{ marginTop: 48 }}><Media src="/images/a-propos.jpg" alt="Photo de l'équipe et des véhicules" ratio="5/2" /></div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>Nos engagements</h2>
          <div className="grid grid-3">
            {[["Ponctualité", "Le chauffeur arrive 10 minutes en avance, et suit votre vol en temps réel."], ["Discrétion", "Des chauffeurs formés à la confidentialité, pour une clientèle d'affaires et de personnalités."], ["Transparence", "Un prix fixe annoncé avant la réservation, sans frais cachés."]].map(([t, d]) => (
              <div key={t} className="rule-top stack" style={{ gap: 12 }}><h3 className="display-m">{t}</h3><p className="muted" style={{ margin: 0 }}>{d}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>Nos chauffeurs</h2>
          <div className="grid grid-4">
            {DRIVERS.map(([n, l]) => (
              <div key={n} className="stack" style={{ gap: 10 }}>
                <Media src={`/images/chauffeurs/${n.toLowerCase()}.jpg`} alt={`Photo de ${n}`} ratio="4/5" />
                <span className="display-s">{n}</span><span className="body-s muted">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
