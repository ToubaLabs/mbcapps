import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("fr", "/confidentialite/", {
  title: "Politique de confidentialité", description: "Confidentialité et données personnelles sur le site Monaco Black Car.",
}, { translated: false });

export default function Page() {
  return <LegalPage current="/confidentialite/" title="Politique de confidentialité" sections={[
    ["Aucune donnée collectée sur le site", "Le site ne comporte ni compte client ni formulaire enregistré. Les demandes sont envoyées sur WhatsApp à l'initiative du visiteur."],
    ["Échanges WhatsApp", "Données traitées dans WhatsApp : finalité, durée de conservation, droits du client."],
    ["Mesure d'audience", "Statistiques anonymes, uniquement après consentement."],
    ["Vos droits", "Accès, rectification, suppression : contact par e-mail."],
  ]} />;
}
