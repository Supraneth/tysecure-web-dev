import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "vanne-eau",
  "title": "Vanne d'arrêt d'eau automatique",
  "subtitle": "Couper l’eau en cas de fuite",
  "longDescription": "Une vanne motorisée peut couper l’arrivée d’eau automatiquement si une fuite est détectée, même si vous êtes absent. C’est le meilleur moyen d’éviter un sinistre.",
  "useCase": "Si un capteur détecte une fuite sous la machine à laver, l’eau est coupée automatiquement et vous recevez une notification.",
  "goodFor": [
    "Vous voulez sécuriser la maison quand vous partez",
    "Vous avez déjà eu une fuite",
    "Vous avez une résidence secondaire"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/vanne-eau.svg",
      "alt": "Illustration : Vanne d'arrêt d'eau automatique",
      "caption": "Vanne d'arrêt d'eau automatique",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Coupure automatique ou manuelle",
    "Couplage avec capteurs de fuite",
    "Scénarios : absence, nuit",
    "Retour d’état (ouvert/fermé)"
  ],
  "benefits": [
    "Réduit fortement le risque de dégâts",
    "Action automatique quand vous n’êtes pas là",
    "Sérénité en vacances",
    "Peut éviter des franchises d’assurance"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Accès à l’arrivée d’eau principale"
  ],
  "duration": "0,5 à 1 jour",
  "price": "690€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
