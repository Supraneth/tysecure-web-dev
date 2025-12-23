import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "eau-chaude",
  "title": "Gestion eau chaude sanitaire",
  "subtitle": "Chauffe-eau optimisé",
  "longDescription": "Optimisez votre ballon d’eau chaude : programmation, heures creuses, et scénarios selon vos habitudes. Objectif : réduire la conso sans manquer d’eau chaude.",
  "useCase": "En semaine, le ballon chauffe surtout en heures creuses. Le week-end, un mode “famille” peut garantir plus d’eau chaude.",
  "goodFor": [
    "Vous avez des heures creuses",
    "Vous partez parfois plusieurs jours",
    "Vous voulez réduire la facture"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/eau-chaude.svg",
      "alt": "Illustration : Gestion eau chaude sanitaire",
      "caption": "Gestion eau chaude sanitaire",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Programmation heures creuses",
    "Modes : absence, week-end",
    "Suivi (selon matériel)",
    "Scénarios avec énergie/solaire"
  ],
  "benefits": [
    "Économies simples",
    "Moins d’oubli (vacances)",
    "Confort (eau chaude au bon moment)",
    "Peut se coupler au solaire"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Ballon pilotable (contacteur/commande compatible)"
  ],
  "duration": "0,5 jour",
  "price": "390€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
