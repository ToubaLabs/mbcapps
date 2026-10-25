"use client";

import { PageHead } from "@/components/ui";
import QrCode from "@/components/QrCode";
import { WhatsAppIcon } from "@/components/WhatsAppButton";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { useI18n } from "@/i18n/context";

export default function Page() {
  const { t } = useI18n();
  const wa = whatsappLink("Bonjour, j'ai une question.");
  return (
    <>
      <PageHead crumb={`${t.nav.home}  /  ${t.nav.contact}`} title={t.contact.pageTitle}>{t.common.availability}, {t.common.languagesSpoken}.</PageHead>
      <section className="section" style={{ paddingTop: 64 }}>
        <div className="container split">
          <div>
            {[
              [t.footer.companyHeading, site.businessName, undefined, undefined],
              [t.contact.phoneLabel, site.phoneDisplay, t.common.availability, site.phoneHref],
              [t.contact.whatsappLabel, site.whatsappDisplay, t.contact.whatsappNote, wa],
              [t.contact.emailLabel, site.email, t.contact.emailNote, undefined],
              [t.contact.addressLabel, site.address, t.contact.appointmentNote, site.mapsUrl],
            ].map(([l, v, n, href]) => (
              <div key={l} style={{ padding: "20px 0", borderBottom: "1px solid var(--line)" }} className="stack">
                <span className="caption muted">{l}</span>
                {href ? <a href={href} className="display-s">{v}</a> : <span className="display-s">{v}</span>}
                <span className="body-s muted">{n}</span>
              </div>
            ))}
            <div className="stack" style={{ padding: "20px 0", gap: 12 }}>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="body-s">
                GPS : {site.geo.latitude}, {site.geo.longitude}
              </a>
              {site.socialLinks.map(({ name, url }) => (
                <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="body-s">{name}</a>
              ))}
            </div>
          </div>
          <div className="card card--pad stack" style={{ gap: 20, alignContent: "start" }}>
            <h2 className="display-m">{t.contact.fastestHeading}</h2>
            <p className="body-l muted" style={{ margin: 0 }}>{t.contact.fastestText}</p>
            <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
              <div className="hide-mobile"><QrCode value={wa} /></div>
              <div className="stack" style={{ gap: 12 }}>
                <span className="body-s muted hide-mobile">{t.contact.onComputerCaption}</span>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp"><WhatsAppIcon size={18} /> {t.contact.openWhatsapp}</a>
                <a href={site.phoneHref} className="btn btn--secondary">{t.contact.call} {site.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--surface">
        <div className="container" style={{ maxWidth: 720 }}>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
