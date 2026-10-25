"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TripForm from "@/components/TripForm";
import { Progress } from "@/components/ui";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { whatsappLink } from "@/lib/whatsapp";
import { useI18n } from "@/i18n/context";

function Step1() {
  const p = useSearchParams();
  const { t } = useI18n();
  return (
    <div className="container booking">
      <div className="booking__main">
        <Progress step={1} />
        <h1 className="display-l">{t.step1.title}</h1>
        <p className="muted" style={{ margin: 0 }}>{t.step1.subtitle}</p>
        <TripForm
          initial={{
            from: p.get("from") ?? "",
            to: p.get("to") ?? "",
            date: p.get("date") ?? "",
            time: p.get("time") ?? "",
            passengers: Number(p.get("pax") ?? 2),
            bags: Number(p.get("bags") ?? 2),
            vehicle: p.get("vehicle") ?? undefined,
          }}
        />
      </div>
      <aside className="card card--pad recap">
        <h2 className="display-s">{t.step1.goodToKnow}</h2>
        <ul className="dot-list body-s">
          {t.step1.bullets.map((b) => <li key={b}>{b}</li>)}
        </ul>
        <hr className="divider" />
        <span className="label">{t.step1.preferWriting}</span>
        <a className="btn btn--whatsapp btn--block" href={whatsappLink("Bonjour, je souhaite réserver un chauffeur.")} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={18} /> {t.step1.writeOnWhatsapp}
        </a>
      </aside>
    </div>
  );
}

export default function Page() {
  return <Suspense><Step1 /></Suspense>;
}
