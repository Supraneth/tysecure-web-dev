import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "network-security",
  "title": "Sécurisation du réseau domestique",
  "subtitle": "IoT séparé, Wi‑Fi maîtrisé",
  "longDescription": "Séparer les équipements (objets connectés, invités, PC), renforcer le Wi‑Fi, et limiter les risques. C’est souvent le meilleur “upgrade” pour une maison connectée.",
  "useCase": "Un invité se connecte au Wi‑Fi : il n’accède pas à vos caméras ni à vos appareils domotiques. Tout est isolé proprement.",
  "goodFor": [
    "Vous avez beaucoup d’objets connectés",
    "Vous recevez souvent des invités",
    "Vous voulez sécuriser Wi‑Fi et caméras"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/network-security.svg",
      "alt": "Illustration : Sécurisation du réseau domestique",
      "caption": "Sécurisation du réseau domestique",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Segmentation (selon matériel)",
    "Wi‑Fi invité",
    "Règles de sécurité",
    "Réduction des risques liés aux objets connectés"
  ],
  "benefits": [
    "Réseau plus robuste",
    "Moins de risques d’intrusion",
    "Meilleure stabilité",
    "Plus simple à maintenir"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Accès admin à la box/routeur"
  ],
  "duration": "0,5 à 1,5 jour",
  "price": "790€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
