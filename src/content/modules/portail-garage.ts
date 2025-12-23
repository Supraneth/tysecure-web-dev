import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "portail-garage",
  "title": "Portail & garage connectés",
  "subtitle": "Contrôle et retours d’état",
  "longDescription": "Pilotez portail et porte de garage (selon motorisation) : ouverture/fermeture, retours d’état, scénarios d’arrivée/départ et alertes.",
  "useCase": "Quand vous approchez de la maison, le portail s’ouvre automatiquement. Si vous l’oubliez, une notification vous rappelle de le fermer.",
  "goodFor": [
    "Vous avez un garage",
    "Vous oubliez parfois de fermer",
    "Vous voulez un accès plus fluide"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/portail-garage.svg",
      "alt": "Illustration : Portail & garage connectés",
      "caption": "Portail & garage connectés",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Commande à distance",
    "Retour d’état (ouvert/fermé)",
    "Scénarios arrivée/départ",
    "Alertes si laissé ouvert"
  ],
  "benefits": [
    "Confort en voiture",
    "Sécurité renforcée",
    "Moins d’oublis",
    "Automatismes simples"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Motorisation compatible"
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
