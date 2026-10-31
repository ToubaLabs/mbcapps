"use client";

import { Suspense } from "react";
import { useBooking } from "@/lib/booking";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { Progress } from "@/components/ui";
import TripSummary from "@/components/TripSummary";
import QrCode from "@/components/QrCode";
import { WhatsAppIcon } from "@/components/WhatsAppButton";

function Step3() {
  const [b] = useBooking();
  const message = bookingMessage(b);
  const link = whatsappLink(message);
  return (
    <>
      <TripSummary b={b} />
      <div className="container booking">
        <div className="booking__main">
          <Progress step={3} />
          <h1 className="display-l">Finalisez avec nous sur WhatsApp</h1>
          <p className="body-l muted" style={{ margin: 0 }}>
            Votre demande est prête. Un conseiller confirme la disponibilité, le chauffeur et le paiement directement dans la conversation.
            Aucune donnée n'est enregistrée sur notre site.
          </p>
          <div className="wa-preview">
            <span className="wa-preview__head">Message pré-rempli</span>
            <pre>{message}</pre>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="hide-mobile">
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp"><WhatsAppIcon size={18} /> Ouvrir WhatsApp</a>
            <a href={site.phoneHref} className="btn btn--secondary">Appeler le {site.phoneDisplay}</a>
          </div>
          <p className="caption muted" style={{ margin: 0 }}>Il vous suffit d'envoyer le message. Vous pouvez le modifier avant l'envoi.</p>
          <ol className="grid grid-3" style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
            {["Envoyez le message", "Un conseiller confirme le prix et le chauffeur", "Paiement au chauffeur ou par lien sécurisé"].map((t, i) => (
              <li key={t} className="rule-top stack" style={{ gap: 6 }}>
                <span className="display-s gold">{i + 1}</span><span className="body-s">{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="card card--pad recap hide-mobile" style={{ justifyItems: "center", textAlign: "center" }}>
          <h2 className="display-s">Vous êtes sur ordinateur ?</h2>
          <QrCode value={link} />
          <p className="body-s muted" style={{ margin: 0 }}>Scannez ce code avec votre téléphone : la conversation s'ouvre avec le message déjà écrit.</p>
          <hr className="divider" style={{ width: "100%" }} />
          <span className="caption muted">Réponse en moins de 15 minutes, 24h/24.</span>
        </aside>
      </div>
      <div className="sticky-bar">
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--block"><WhatsAppIcon size={18} /> Ouvrir WhatsApp</a>
        <a href={site.phoneHref} className="btn btn--secondary btn--block">Appeler</a>
      </div>
    </>
  );
}

export default function Page() {
  return <Suspense><Step3 /></Suspense>;
}
