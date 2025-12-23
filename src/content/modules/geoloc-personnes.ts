import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "geoloc-personnes",
  "title": "Localisation des appareils",
  "subtitle": "Arrivée/départ : la maison s’adapte",
  "longDescription": "La maison réagit à l’arrivée et au départ : activer/désactiver l’alarme, ajuster chauffage, lumières, notifications. Tout est paramétré pour rester simple et fiable.",
  "useCase": "Quand vous quittez la maison, le mode absence s’active automatiquement. Quand vous revenez, le chauffage se remet en confort et l’entrée s’allume.",
  "goodFor": [
    "Vous oubliez d’activer l’alarme",
    "Vous voulez un retour confortable",
    "Vous avez une routine de départ/retour"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/geoloc-personnes.svg",
      "alt": "Illustration : Localisation des appareils",
      "caption": "Localisation des appareils",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Déclenchements arrivée/départ",
    "Modes : absence, retour, nuit",
    "Couplage : alarme, chauffage, éclairage",
    "Notifications utiles"
  ],
  "benefits": [
    "Moins d’oublis",
    "Confort au bon moment",
    "Sécurité renforcée",
    "Automatisation discrète"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Téléphones configurés"
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
