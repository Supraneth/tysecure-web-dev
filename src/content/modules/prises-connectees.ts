import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "prises-connectees",
  "title": "Prises connectées & mesure",
  "subtitle": "Couper, mesurer, automatiser",
  "longDescription": "Prises intelligentes pour mesurer la consommation d’un appareil et le piloter (coupure, planning). Très utile pour les veilles et les appareils énergivores.",
  "useCase": "La nuit, certaines prises passent en mode “éco” (TV, box secondaire) et se réactivent au matin. Vous économisez sans y penser.",
  "goodFor": [
    "Vous voulez éliminer les veilles",
    "Vous avez un bureau à la maison",
    "Vous voulez piloter certains appareils"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/prises-connectees.svg",
      "alt": "Illustration : Prises connectées & mesure",
      "caption": "Prises connectées & mesure",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Mesure de consommation par prise",
    "Coupure/activation à distance",
    "Programmations simples",
    "Scénarios : absence, nuit"
  ],
  "benefits": [
    "Moins de veilles inutiles",
    "Économies faciles",
    "Comprendre ce qui consomme",
    "Automatisation simple"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Identifier les prises stratégiques"
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
