import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "cyber",
  "title": "Durcissement cybersécurité (socle)",
  "subtitle": "Réseau et accès plus sûrs",
  "longDescription": "Une maison connectée, c’est aussi un réseau : on sécurise les accès, on applique les bonnes pratiques (mots de passe, mises à jour) et on met en place une base saine.",
  "useCase": "Vous accédez à votre maison à distance : l’accès est sécurisé et vous évitez d’ouvrir “n’importe quel port” sur internet.",
  "goodFor": [
    "Vous avez beaucoup d’objets connectés",
    "Vous voulez un accès distant sécurisé",
    "Vous voulez des règles claires pour la famille"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/cyber.svg",
      "alt": "Illustration : Durcissement cybersécurité (socle)",
      "caption": "Durcissement cybersécurité (socle)",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Accès distant sécurisé (selon contexte)",
    "Bonnes pratiques (mots de passe, MFA si possible)",
    "Réduction de la surface d’attaque",
    "Checklist de sécurité et recommandations"
  ],
  "benefits": [
    "Réduit les risques d’intrusion",
    "Plus de sérénité au quotidien",
    "Base saine pour évoluer",
    "Maintenance plus simple"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Accès admin box/routeur si nécessaire"
  ],
  "duration": "0,5 à 1 jour",
  "price": "990€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
