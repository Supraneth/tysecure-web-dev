import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "home-cinema",
  "title": "Home cinéma & ambiance TV",
  "subtitle": "Immersion et scénarios cinéma",
  "longDescription": "Créez une expérience cinéma : lumière d’ambiance synchronisée, scénarios “lecture / pause / film”, et automatisations (volets, éclairage, audio) autour de la TV.",
  "useCase": "Vous lancez un film : les volets se ferment, l’éclairage passe en ambiance, et le son se règle automatiquement.",
  "goodFor": [
    "Vous aimez les soirées cinéma",
    "Vous voulez un salon “wow”",
    "Vous souhaitez simplifier les actions"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/home-cinema.svg",
      "alt": "Illustration : Home cinéma & ambiance TV",
      "caption": "Home cinéma & ambiance TV",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Scénarios cinéma (lumières, volets, audio)",
    "Synchronisation d’ambiance (selon matériel)",
    "Commandes simples (télécommande, mobile)",
    "Mode “pause”/“fin de film”"
  ],
  "benefits": [
    "Immersion",
    "Confort d’utilisation",
    "Une seule action pour tout lancer",
    "Ambiance premium à la maison"
  ],
  "prerequisites": [
    "Pack Foundation",
    "TV/éclairage compatibles selon l’effet souhaité"
  ],
  "duration": "0,5 à 1,5 jour",
  "price": "890€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
