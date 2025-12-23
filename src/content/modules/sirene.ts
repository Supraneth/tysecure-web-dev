import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "sirene",
  "title": "Sirène connectée",
  "subtitle": "Dissuader en quelques secondes",
  "longDescription": "Une sirène intégrée au système : déclenchement automatique selon vos règles (intrusion, fumée, fuite d’eau), temporisation, et scénarios adaptés.",
  "useCase": "En mode absence, si un capteur déclenche l’alarme, la sirène se lance après 20 secondes (le temps d’annuler si fausse alerte) et les voisins sont prévenus.",
  "goodFor": [
    "Vous voulez une dissuasion sonore",
    "Vous avez des voisins proches",
    "Vous souhaitez un système complet"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/sirene.svg",
      "alt": "Illustration : Sirène connectée",
      "caption": "Sirène connectée",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Déclenchement piloté (intrusion, incendie, fuite)",
    "Temporisation et modes",
    "Couplage éclairage (dissuasion)",
    "Notifications en parallèle"
  ],
  "benefits": [
    "Dissuasion forte",
    "Réaction immédiate",
    "Scénarios plus complets",
    "Sérénité quand vous n’êtes pas là"
  ],
  "prerequisites": [
    "Pack Foundation"
  ],
  "duration": "0,5 jour",
  "price": "290€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
