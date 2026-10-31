import type { Metadata } from "next";
import { Media } from "@/components/ui";
import EventForm from "@/components/EventForm";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Événements", description: "Chauffeurs pour le Grand Prix de Monaco, le Monaco Yacht Show, les galas et les mariages. Devis sous 2 heures." };

const TYPES = [
  ["grand-prix", "Grand Prix de Monaco", "Accès aux zones autorisées, attente pendant la course, retours de nuit."],
  ["yacht-show", "Monaco Yacht Show", "Navettes entre le port Hercule, les hôtels et l'aéroport."],
  ["galas", "Galas et soirées", "Arrivée soignée, chauffeur disponible jusqu'à la fin de la soirée."],
  ["mariages", "Mariages", "Voiture des mariés et transport des invités, coordonnés avec votre planning."],
];
const STEPS = [
  ["Décrivez votre événement", "Type, date, lieu et invités : 2 minutes suffisent."],
  ["Envoyez votre demande sur WhatsApp", "Le message est pré-rempli. Rien n'est enregistré sur le site."],
  ["Recevez votre devis", "Un conseiller vous répond sous 2 heures avec un devis détaillé."],
  ["Validez dans la conversation", "Acompte et planning confirmés avec votre conseiller."],
  ["Le jour J, profitez", "Chauffeurs dédiés et un interlocuteur joignable toute la soirée."],
];

export default function Page() {
  return (
    <>
      <section className="hero">
        <div className="container hero__inner" style={{ paddingTop: 96 }}>
          <span className="kicker">Événements</span>
          <h1 className="display-xl">Vos invités arrivent à l'heure.<br />Vous, vous profitez de la soirée.</h1>
          <p className="body-l">Grand Prix, Monaco Yacht Show, galas ou mariages : un chauffeur dédié par véhicule, coordonné par un seul interlocuteur, du premier transfert au dernier retour.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#devis" className="btn btn--primary">Demander un devis</a>
            <a href={site.phoneHref} className="btn btn--secondary">Appeler un conseiller</a>
          </div>
          <span className="caption muted">Réponse sous 2 heures, sans engagement.</span>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="container grid grid-4">
          {TYPES.map(([img, t, d]) => (
            <a key={t} href="#devis" className="article-card">
              <Media src={`/images/evenements/${img}.jpg`} alt={`Photo ${t}`} ratio="4/3" />
              <span className="display-s">{t}</span>
              <span className="body-s muted">{d}</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <h2 className="display-l" style={{ marginBottom: 40 }}>Comment ça se passe</h2>
          <ol className="grid steps-5" style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {STEPS.map(([t, d], i) => (
              <li key={t} className="stack" style={{ gap: 8 }}>
                <span className="step-num">{i + 1}</span>
                <h3 className="display-s">{t}</h3>
                <p className="body-s muted" style={{ margin: 0 }}>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="devis">
        <div className="container"><EventForm /></div>
      </section>
    </>
  );
}
