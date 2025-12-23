import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "controle-acces",
  "title": "Contrôle d’accès & interphone",
  "subtitle": "Savoir qui est là, gérer l’entrée",
  "longDescription": "Contrôlez l’entrée (selon matériel) : interphone, notifications, ouverture à distance, et historique. L’objectif : simplifier et sécuriser l’accès.",
  "useCase": "Le livreur sonne : vous recevez la notification et pouvez lui parler. Si vous l’autorisez, vous pouvez ouvrir à distance (selon installation).",
  "goodFor": [
    "Vous recevez souvent des colis",
    "Vous voulez sécuriser l’entrée",
    "Vous avez un portail ou un interphone"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/controle-acces.svg",
      "alt": "Illustration : Contrôle d’accès & interphone",
      "caption": "Contrôle d’accès & interphone",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Notifications quand ça sonne",
    "Historique des événements",
    "Ouverture à distance (si compatible)",
    "Scénarios : allumer l’entrée, désactiver l’alarme"
  ],
  "benefits": [
    "Plus de sécurité à l’entrée",
    "Confort au quotidien",
    "Moins d’interruptions (filtrage)",
    "Gestion simple pour la famille"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Matériel compatible (visiophone/interphone)"
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
