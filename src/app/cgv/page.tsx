import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Conditions générales de vente" };

export default function Page() {
  return <LegalPage current="/cgv/" title="Conditions générales de vente" sections={[
    ["Objet", "Conditions applicables aux prestations de transport avec chauffeur."],
    ["Réservation", "La réservation est confirmée par un conseiller dans la conversation WhatsApp."],
    ["Prix et paiement", "Prix fixes TTC, péages et 60 minutes d'attente inclus. Paiement au chauffeur ou par lien sécurisé."],
    ["Annulation", "Gratuite jusqu'à 24 heures avant la prise en charge."],
    ["Responsabilité", "Retards, objets oubliés, comportement à bord."],
  ]} />;
}
