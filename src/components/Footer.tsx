import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="display-s">{site.name}</div>
            <p className="body-s muted">{site.tagline}, {site.availability}.</p>
          </div>
          <div className="footer__col">
            <div className="label">Services</div>
            <Link href="/services/transferts-aeroport/">Transferts aéroport</Link>
            <Link href="/evenements/">Événements</Link>
            <Link href="/services/mise-a-disposition/">Mise à disposition</Link>
          </div>
          <div className="footer__col">
            <div className="label">Monaco Black Car</div>
            <Link href="/flotte/">Notre flotte</Link>
            <Link href="/tarifs/">Tarifs</Link>
            <Link href="/journal/">Journal</Link>
            <Link href="/faq/">Questions fréquentes</Link>
            <Link href="/a-propos/">À propos</Link>
          </div>
          <div className="footer__col">
            <div className="label">Contact</div>
            <a href={site.phoneHref}>{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <span>{site.address}</span>
          </div>
        </div>
        <div className="footer__bottom caption">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span className="footer__legal">
            <Link href="/mentions-legales/">Mentions légales</Link>
            <Link href="/cgv/">CGV</Link>
            <Link href="/confidentialite/">Confidentialité</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
