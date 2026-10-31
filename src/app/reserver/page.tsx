"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TripForm from "@/components/TripForm";
import { Progress } from "@/components/ui";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { whatsappLink } from "@/lib/whatsapp";

function Step1() {
  const p = useSearchParams();
  return (
    <div className="container booking">
      <div className="booking__main">
        <Progress step={1} />
        <h1 className="display-l">Où allez-vous ?</h1>
        <p className="muted" style={{ margin: 0 }}>Le prix fixe s'affiche à l'étape suivante. Aucune donnée n'est enregistrée sur le site.</p>
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
        <h2 className="display-s">Bon à savoir</h2>
        <ul className="dot-list body-s">
          <li>Prix fixe, péages et attente inclus</li>
          <li>Vol suivi : aucun supplément en cas de retard</li>
          <li>Annulation gratuite jusqu'à 24 h avant</li>
          <li>Chauffeurs bilingues, 24h/24</li>
        </ul>
        <hr className="divider" />
        <span className="label">Vous préférez écrire ?</span>
        <a className="btn btn--whatsapp btn--block" href={whatsappLink("Bonjour, je souhaite réserver un chauffeur.")} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={18} /> Écrire sur WhatsApp
        </a>
      </aside>
    </div>
  );
}

export default function Page() {
  return <Suspense><Step1 /></Suspense>;
}
