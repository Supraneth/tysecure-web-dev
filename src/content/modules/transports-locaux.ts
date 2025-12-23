import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "transports-locaux",
  "title": "Transports locaux & trajets",
  "subtitle": "Notifications utiles, sans surcharge",
  "longDescription": "Intégration des informations de transport (trafic, horaires, perturbations) pour des notifications pratiques et des scénarios qui s’ajustent à vos trajets.",
  "useCase": "Si votre train est supprimé, vous recevez une notification et votre réveil peut s’adapter (plus tôt / plus tard) selon votre itinéraire.",
  "goodFor": [
    "Vous avez des trajets réguliers",
    "Vous voulez éviter de rater un train",
    "Vous télétravaillez certains jours"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/transports-locaux.svg",
      "alt": "Illustration : Transports locaux & trajets",
      "caption": "Transports locaux & trajets",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Notifications : perturbations, retards",
    "Scénarios : départ, réveil, retours",
    "Paramétrage pour éviter le spam",
    "Utilisable aussi pour météo/agenda"
  ],
  "benefits": [
    "Moins de stress au quotidien",
    "Meilleure ponctualité",
    "Scénarios plus pertinents (départ/retour)",
    "Automatisation discrète et utile"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Définir vos trajets et préférences"
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
