import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "sonnette-video",
  "title": "Sonnette vidéo",
  "subtitle": "Voir et répondre simplement",
  "longDescription": "Une sonnette vidéo intégrée : vous voyez qui sonne, vous êtes notifié, et vous pouvez conserver les enregistrements en local.",
  "useCase": "Quand vous êtes au travail, vous recevez une notification avec la vidéo : vous pouvez répondre, ou demander au livreur de déposer le colis.",
  "goodFor": [
    "Vous recevez souvent des colis",
    "Vous voulez surveiller l’entrée",
    "Vous êtes souvent absent la journée"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/sonnette-video.svg",
      "alt": "Illustration : Sonnette vidéo",
      "caption": "Sonnette vidéo",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Notifications pertinentes",
    "Enregistrement local (selon matériel)",
    "Intégration au contrôle d’accès",
    "Scénarios : lumière d’entrée, alarme"
  ],
  "benefits": [
    "Confort (colis, visiteurs)",
    "Sécurité renforcée",
    "Moins de dépendance au cloud",
    "Historique des visites"
  ],
  "prerequisites": [
    "Pack Foundation"
  ],
  "duration": "0,5 à 1 jour",
  "price": "590€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
