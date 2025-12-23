import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "password-manager",
  "title": "Gestionnaire de mots de passe",
  "subtitle": "Sûr et simple pour la famille",
  "longDescription": "Mettre en place un gestionnaire de mots de passe (et de bonnes pratiques) pour éviter les mots de passe faibles et les réutilisations. Très efficace pour réduire les risques.",
  "useCase": "Vous n’avez plus besoin de mémoriser 30 mots de passe : tout est stocké de manière sécurisée et partageable avec votre famille.",
  "goodFor": [
    "Vous réutilisez parfois des mots de passe",
    "Vous partagez des comptes en famille",
    "Vous voulez un système simple"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/password-manager.svg",
      "alt": "Illustration : Gestionnaire de mots de passe",
      "caption": "Gestionnaire de mots de passe",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Génération de mots de passe forts",
    "Partage familial sécurisé",
    "Bonnes pratiques (MFA si possible)",
    "Accompagnement pour démarrer"
  ],
  "benefits": [
    "Moins de piratages",
    "Moins de stress",
    "Gain de temps (auto-remplissage)",
    "Meilleure hygiène numérique"
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
