"use client";

import Link from "@/i18n/LocalizedLink";
import { site } from "@/data/site";
import { useI18n } from "@/i18n/context";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/images/logo.png" alt={site.name} className="footer__logo-img" />
            <p className="body-s">{site.businessName}</p>
            <p className="body-s muted">{t.footer.tagline}</p>
            <p className="body-s muted">{t.common.availability}.</p>
          </div>
          <div className="footer__col">
            <div className="label">{t.footer.servicesHeading}</div>
            <Link href="/services/transferts-aeroport/">{t.footer.transfers}</Link>
            <Link href="/evenements/">{t.footer.events}</Link>
            <Link href="/services/mise-a-disposition/">{t.footer.rental}</Link>
          </div>
          <div className="footer__col">
            <div className="label">{t.footer.companyHeading}</div>
            <Link href="/flotte/">{t.footer.fleet}</Link>
            <Link href="/tarifs/">{t.footer.pricing}</Link>
            <Link href="/journal/">{t.footer.journal}</Link>
            <Link href="/faq/">{t.footer.faq}</Link>
            <Link href="/a-propos/">{t.footer.about}</Link>
          </div>
          <div className="footer__col">
            <div className="label">{t.footer.contactHeading}</div>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <Link href="/contact/">{site.email}</Link>
            <a href={site.googleBusinessUrl} target="_blank" rel="noopener noreferrer">{site.address}</a>
            <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">GPS : {site.geo.latitude}, {site.geo.longitude}</a>
            {site.socialLinks.map(({ name, url }) => (
              <a key={url} href={url} target="_blank" rel="noopener noreferrer">{name}</a>
            ))}
          </div>
        </div>
        <div className="footer__bottom caption">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="footer__legal">
            <Link href="/mentions-legales/">{t.footer.legalNotice}</Link>
            <Link href="/cgv/">{t.footer.cgv}</Link>
            <Link href="/confidentialite/">{t.footer.privacy}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
