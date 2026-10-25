import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import QrCode from "@/components/QrCode";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Contact", description: `Contactez Monaco Black Car sur WhatsApp ou au ${site.phoneDisplay}, 24h/24.` };

export default function Page() {
  const wa = whatsappLink("Bonjour, j'ai une question.");
  return (
    <>
      <PageHead crumb="Accueil  /  Contact" title="Contact">Disponibles {site.availability}, en français, en anglais et en italien.</PageHead>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container split">
          <div>
            {[["Téléphone", site.phoneDisplay, site.availability, site.phoneHref], ["WhatsApp", site.whatsappDisplay, "Réponse en quelques minutes", wa], ["E-mail", site.email, "Réponse sous 2 heures", `mailto:${site.email}`], ["Adresse", site.address, "Sur rendez-vous", undefined]].map(([l, v, n, href]) => (
              <div key={l} style={{ padding: "20px 0", borderBottom: "1px solid var(--line)" }} className="stack">
                <span className="caption muted">{l}</span>
                {href ? <a href={href} className="display-s">{v}</a> : <span className="display-s">{v}</span>}
                <span className="body-s muted">{n}</span>
              </div>
            ))}
          </div>
          <div className="card card--pad stack" style={{ gap: 20, alignContent: "start" }}>
            <h2 className="display-m">Le plus rapide : WhatsApp</h2>
            <p className="body-l muted" style={{ margin: 0 }}>Écrivez-nous directement : un conseiller vous répond en quelques minutes, 24h/24. Aucune donnée n'est enregistrée sur notre site.</p>
            <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
              <div className="hide-mobile"><QrCode value={wa} /></div>
              <div className="stack" style={{ gap: 12 }}>
                <span className="body-s muted hide-mobile">Sur ordinateur, scannez ce code avec votre téléphone.</span>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp"><WhatsAppIcon size={18} /> Ouvrir WhatsApp</a>
                <a href={site.phoneHref} className="btn btn--secondary">Appeler le {site.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
