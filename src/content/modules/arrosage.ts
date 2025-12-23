import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "arrosage",
  "title": "Détection des inondations",
  "subtitle": "Fuites d’eau : être alerté tout de suite",
  "longDescription": "Capteurs de fuite d’eau placés aux bons endroits (machine à laver, chauffe-eau, évier). Vous êtes alerté rapidement pour éviter des dégâts coûteux.",
  "useCase": "En week-end, une fuite sous l’évier est détectée : vous recevez une alerte et, si vous avez une vanne automatique, l’eau peut être coupée.",
  "goodFor": [
    "Vous avez un chauffe-eau dans un placard",
    "Vous partez souvent",
    "Vous voulez éviter un sinistre coûteux"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/arrosage.svg",
      "alt": "Illustration : Détection des inondations",
      "caption": "Détection des inondations",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Capteurs de fuite aux points sensibles",
    "Alertes immédiates (téléphone)",
    "Scénarios : sirène, notifications, coupure d’eau",
    "Historique des événements"
  ],
  "benefits": [
    "Évite des dégâts importants",
    "Réaction rapide même en absence",
    "Sérénité pour les pièces d’eau",
    "Complément parfait de la vanne automatique"
  ],
  "prerequisites": [
    "Pack Foundation"
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
