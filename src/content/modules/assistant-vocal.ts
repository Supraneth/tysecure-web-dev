import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "assistant-vocal",
  "title": "Assistant vocal local",
  "subtitle": "Commandes vocales plus privées",
  "longDescription": "Mettez en place des commandes vocales orientées “maison” (scènes, actions), en limitant la dépendance aux clouds. Les possibilités dépendent du matériel choisi.",
  "useCase": "En disant “bonne nuit”, la maison ferme les volets, baisse le chauffage, éteint les lumières et active le mode nuit.",
  "goodFor": [
    "Vous voulez des actions “en parlant”",
    "Vous avez des enfants/seniors",
    "Vous voulez limiter le cloud"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/assistant-vocal.svg",
      "alt": "Illustration : Assistant vocal local",
      "caption": "Assistant vocal local",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Commandes vocales pour scènes du quotidien",
    "Intégration Home Assistant",
    "Priorité à la confidentialité",
    "Fonctionne avec un dashboard/tablette"
  ],
  "benefits": [
    "Confort mains libres",
    "Simplicité pour enfants/seniors",
    "Moins de dépendance à des comptes cloud",
    "Scénarios très rapides"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Matériel vocal compatible selon choix"
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
