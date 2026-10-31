import LegalPage from "@/components/LegalPage";
import { site } from "@/data/site";

export const metadata = { title: "Mentions légales" };

export default function Page() {
  return <LegalPage current="/mentions-legales/" title="Mentions légales" sections={[
    ["Éditeur du site", "Raison sociale, forme juridique, capital, adresse du siège, numéro d'immatriculation au RCI de Monaco, directeur de la publication."],
    ["Hébergeur", "Nom, adresse et téléphone de l'hébergeur du site."],
    ["Contact", `${site.name}, ${site.address}. Téléphone et WhatsApp : ${site.phoneDisplay}. E-mail : ${site.email}.`],
    ["Propriété intellectuelle", "Textes, photos, logo et éléments graphiques du site."],
  ]} />;
}
