import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "meteo-locale",
  "title": "Météo locale & prévisions",
  "subtitle": "Des scénarios qui suivent la vraie météo",
  "longDescription": "Intégrez une météo locale fiable (température, pluie, vent, UV) pour que la maison prenne de meilleures décisions : volets, chauffage, arrosage, notifications.",
  "useCase": "Quand la pluie est prévue, l’arrosage se met en pause automatiquement et vous recevez une alerte si du linge est dehors.",
  "goodFor": [
    "Vous avez un jardin",
    "Vous voulez optimiser les volets en été",
    "Vous aimez des routines intelligentes et discrètes"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/meteo-locale.svg",
      "alt": "Illustration : Météo locale & prévisions",
      "caption": "Météo locale & prévisions",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Données météo locales + prévisions",
    "Déclenchements : pluie, vent, UV, gel",
    "Couplage : volets, chauffage, arrosage",
    "Notifications utiles (gel, orage)"
  ],
  "benefits": [
    "Automatismes plus pertinents",
    "Moins de gaspillage (arrosage)",
    "Meilleur confort été/hiver",
    "Décisions anticipées (prévisions)"
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
