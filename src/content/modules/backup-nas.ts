import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "backup-nas",
  "title": "Sauvegarde robuste de vos données (NAS)",
  "subtitle": "Photos, documents, souvenirs",
  "longDescription": "Mettre vos données en sécurité : sauvegarde automatique, organisation, et restauration simple. On évite le “tout sur un seul disque” et on prépare le jour où ça tombe en panne.",
  "useCase": "Votre téléphone se sauvegarde automatiquement sur le NAS. Si vous le perdez, vous récupérez vos photos en quelques minutes.",
  "goodFor": [
    "Vous avez beaucoup de photos",
    "Vous voulez sécuriser des documents administratifs",
    "Vous avez déjà perdu des données"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/backup-nas.svg",
      "alt": "Illustration : Sauvegarde robuste de vos données (NAS)",
      "caption": "Sauvegarde robuste de vos données (NAS)",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Sauvegarde automatique (PC, téléphone) selon besoins",
    "Restauration testée",
    "Organisation simple",
    "Stockage maîtrisé"
  ],
  "benefits": [
    "Réduit le risque de perte définitive",
    "Plus de sérénité",
    "Récupération rapide en cas de panne",
    "Vos données restent chez vous"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Stockage NAS adapté (selon volume)"
  ],
  "duration": "0,5 à 1,5 jour",
  "price": "890€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
