import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "media-library",
  "title": "Bibliothèque multimédia (Plex / Immich)",
  "subtitle": "Vos contenus, chez vous",
  "longDescription": "Centralisez films, photos et vidéos sur un serveur à la maison, et diffusez-les facilement sur vos appareils. Vous gardez la main sur vos données.",
  "useCase": "Vous prenez des photos : elles sont sauvegardées automatiquement et accessibles sur TV ou tablette, même sans dépendre d’un service cloud.",
  "goodFor": [
    "Vous avez beaucoup de photos/vidéos",
    "Vous voulez éviter des abonnements",
    "Vous souhaitez une bibliothèque familiale"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/media-library.svg",
      "alt": "Illustration : Bibliothèque multimédia (Plex / Immich)",
      "caption": "Bibliothèque multimédia (Plex / Immich)",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Serveur multimédia (selon choix)",
    "Accès depuis TV, téléphone, tablette",
    "Sauvegarde possible sur NAS",
    "Gestion simple"
  ],
  "benefits": [
    "Vos données restent chez vous",
    "Accès rapide dans la maison",
    "Organisation et partage facilités",
    "Peut s’intégrer à un plan de sauvegarde"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Stockage adapté (selon volume)"
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
