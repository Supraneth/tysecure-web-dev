import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "serrure-connectee",
  "title": "Serrure connectée",
  "subtitle": "Accès simplifié et historique",
  "longDescription": "Simplifiez l’accès : code, badge ou smartphone (selon modèle) avec historique des entrées/sorties. Pratique pour les enfants, les proches ou une location.",
  "useCase": "Votre enfant rentre de l’école : la porte s’ouvre avec un code, et vous recevez une notification “arrivé à la maison”.",
  "goodFor": [
    "Vous avez des enfants",
    "Vous louez ponctuellement",
    "Vous voulez arrêter de gérer des doubles de clés"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/serrure-connectee.svg",
      "alt": "Illustration : Serrure connectée",
      "caption": "Serrure connectée",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Accès par code/badge/smartphone (selon modèle)",
    "Historique des accès",
    "Scénarios : désactiver l’alarme à l’ouverture",
    "Gestion des invités (codes temporaires)"
  ],
  "benefits": [
    "Confort au quotidien",
    "Moins de clés à gérer",
    "Sécurité (codes temporaires)",
    "Meilleure visibilité sur les accès"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Serrure compatible et porte adaptée"
  ],
  "duration": "0,5 à 1 jour",
  "price": "790€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
