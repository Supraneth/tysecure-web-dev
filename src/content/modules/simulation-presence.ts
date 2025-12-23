import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "simulation-presence",
  "title": "Simulation de présence",
  "subtitle": "Dissuasion en votre absence",
  "longDescription": "Des scénarios réalistes qui simulent une présence : lumières, volets et parfois musique, avec une part d’aléatoire pour faire “vrai”.",
  "useCase": "Quand vous partez une semaine, la maison allume et éteint des lumières à des horaires variables et gère les volets, comme si quelqu’un était là.",
  "goodFor": [
    "Vous partez souvent",
    "Vous avez une maison visible de l’extérieur",
    "Vous voulez un mode vacances simple"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/simulation-presence.svg",
      "alt": "Illustration : Simulation de présence",
      "caption": "Simulation de présence",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Scénarios réalistes (aléatoire contrôlé)",
    "Gestion lumières/volets",
    "Mode vacances simple",
    "Peut se coupler à la vidéosurveillance"
  ],
  "benefits": [
    "Dissuasion visible",
    "Tranquillité en vacances",
    "Moins d’actions manuelles",
    "Complète l’alarme"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Idéal avec éclairage et volets"
  ],
  "duration": "0,5 jour",
  "price": "350€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
