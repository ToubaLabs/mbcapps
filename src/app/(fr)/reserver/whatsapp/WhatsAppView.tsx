"use client";

import { Suspense } from "react";
import { useBooking } from "@/lib/booking";
import { bookingMessage, whatsappLink } from "@/lib/whatsapp";
import { site } from "@/data/site";
import { Progress } from "@/components/ui";
import TripSummary from "@/components/TripSummary";
import QrCode from "@/components/QrCode";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { useI18n } from "@/i18n/context";

function Step3() {
  const [b] = useBooking();
  const { t } = useI18n();
  const message = bookingMessage(b);
  const link = whatsappLink(message);
  return (
    <>
      <TripSummary b={b} />
      <div className="container booking booking--finalize">
        <div className="booking__main">
          <Progress step={3} />
          <h1 className="display-l">{t.step3.title}</h1>
          <p className="body-l muted" style={{ margin: 0 }}>{t.step3.subtitle}</p>
          <div className="wa-preview">
            <span className="wa-preview__head">{t.step3.messagePreview}</span>
            <pre>{message}</pre>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }} className="hide-mobile">
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp"><WhatsAppIcon size={18} /> {t.step3.openWhatsapp}</a>
            <a href={site.phoneHref} className="btn btn--secondary">{t.step3.call} {site.phoneDisplay}</a>
          </div>
          <p className="caption muted" style={{ margin: 0 }}>{t.step3.sendHint}</p>
          <ol className="grid grid-3" style={{ listStyle: "none", padding: 0, margin: "16px 0 0" }}>
            {t.step3.steps.map((s, i) => (
              <li key={s} className="rule-top stack" style={{ gap: 6 }}>
                <span className="display-s gold">{i + 1}</span><span className="body-s">{s}</span>
              </li>
            ))}
          </ol>
        </div>
        <aside className="card card--pad recap hide-mobile" style={{ justifyItems: "center", textAlign: "center" }}>
          <h2 className="display-s">{t.step3.onComputer}</h2>
          <QrCode value={link} />
          <p className="body-s muted" style={{ margin: 0 }}>{t.step3.qrCaption}</p>
          <hr className="divider" style={{ width: "100%" }} />
          <span className="caption muted">{t.step3.responseTime}</span>
        </aside>
      </div>
      <div className="sticky-bar">
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp btn--block"><WhatsAppIcon size={18} /> {t.step3.openWhatsapp}</a>
        <a href={site.phoneHref} className="btn btn--secondary btn--block">{t.step3.call} {site.phoneDisplay}</a>
      </div>
    </>
  );
}

export default function Page() {
  return <Suspense><Step3 /></Suspense>;
}
