import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 1.5c6.1 0 11 4.6 11 10.4S18.1 22.3 12 22.3c-1.8 0-3.5-.4-5-1.1L1 23l1.9-5.5A10 10 0 0 1 1 11.9C1 6.1 5.9 1.5 12 1.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M8 7.5c0-.5.4-.9.9-.9h.8l1 2.3-.9.9c.6 1.2 1.6 2.2 2.8 2.8l.9-.9 2.3 1v.8c0 .5-.4.9-.9.9-3.8 0-6.9-3.1-6.9-6.9Z" fill="currentColor" />
    </svg>
  );
}

/** Bouton flottant présent sur toutes les pages : texte sur ordinateur, icône seule sur mobile. */
export default function WhatsAppFab() {
  return (
    <a
      href={whatsappLink("Bonjour, je souhaite réserver un chauffeur.")}
      className="wa-fab"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Réserver sur WhatsApp"
    >
      <WhatsAppIcon />
      <span className="hide-mobile">Réserver sur WhatsApp</span>
    </a>
  );
}
