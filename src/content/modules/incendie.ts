import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "incendie",
  "title": "Sécurité incendie",
  "subtitle": "Détecter, alerter, guider",
  "longDescription": "Détecteurs fumée/CO reliés au système : alertes sur téléphone, scénarios de sécurité (sirène, éclairage de fuite), et historique.",
  "useCase": "La nuit, si un détecteur se déclenche, la maison allume un chemin lumineux vers la sortie et vous alerte immédiatement.",
  "goodFor": [
    "Vous voulez être alerté même hors de la maison",
    "Vous avez une cheminée/chaudière",
    "Vous voulez des scénarios de sécurité intelligents"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/incendie.svg",
      "alt": "Illustration : Sécurité incendie",
      "caption": "Sécurité incendie",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Détecteurs fumée / CO (selon matériel)",
    "Notifications immédiates",
    "Scénarios de sécurité (sirène, éclairage)",
    "Historique et tests réguliers"
  ],
  "benefits": [
    "Sécurité renforcée",
    "Réaction plus rapide",
    "Meilleure protection de la famille",
    "Tranquillité en déplacement"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Emplacements à définir"
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
