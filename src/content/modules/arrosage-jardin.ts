import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "arrosage-jardin",
  "title": "Arrosage intelligent",
  "subtitle": "Mieux arroser, moins gaspiller",
  "longDescription": "Pilotez l’arrosage en tenant compte de la météo et de vos habitudes : arrosage automatique quand il faut, pause en cas de pluie, et contrôle simple.",
  "useCase": "Quand une semaine de pluie est annoncée, l’arrosage se met en pause automatiquement et reprend ensuite, sans que vous ayez à y penser.",
  "goodFor": [
    "Vous avez un jardin",
    "Vous partez souvent",
    "Vous voulez arrêter d’arroser “au feeling”"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/arrosage-jardin.svg",
      "alt": "Illustration : Arrosage intelligent",
      "caption": "Arrosage intelligent",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Programmation par zones (selon installation)",
    "Pause météo (pluie / gel)",
    "Arrosage manuel depuis mobile",
    "Historique et suivi",
    "Alertes (électrovanne, anomalies)"
  ],
  "benefits": [
    "Moins d’eau gaspillée",
    "Un jardin entretenu même en vacances",
    "Confort : pas de réglages permanents",
    "Meilleure cohérence avec la météo"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Système d’arrosage compatible (électrovannes / programmateur intégrable)"
  ],
  "duration": "0,5 à 1 jour",
  "price": "490€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
