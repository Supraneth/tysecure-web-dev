import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "capteur-vibration",
  "title": "Capteur vibration (choc / tentative)",
  "subtitle": "Détecter avant l’ouverture",
  "longDescription": "Détecte les vibrations anormales sur une porte, une fenêtre ou un portail : utile pour être alerté dès une tentative (choc, forçage), même avant l’ouverture.",
  "useCase": "Si quelqu’un secoue une porte de garage la nuit, une notification vous alerte immédiatement et peut déclencher l’éclairage extérieur.",
  "goodFor": [
    "Vous avez une porte de garage exposée",
    "Vous voulez être alerté dès la tentative",
    "Vous souhaitez renforcer un point faible"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/capteur-vibration.svg",
      "alt": "Illustration : Capteur vibration (choc / tentative)",
      "caption": "Capteur vibration (choc / tentative)",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Détection de chocs et vibrations",
    "Idéal portes sensibles (garage, baie)",
    "Scénarios : sirène, lumière, notification",
    "Réglages pour éviter les fausses alertes"
  ],
  "benefits": [
    "Réaction plus rapide",
    "Dissuasion",
    "Complément idéal des capteurs d’ouverture",
    "Sérénité la nuit"
  ],
  "prerequisites": [
    "Pack Foundation"
  ],
  "duration": "0,5 jour",
  "price": "240€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
