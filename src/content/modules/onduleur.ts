import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "onduleur",
  "title": "Onduleur & protection du matériel électrique",
  "subtitle": "Continuité et protection",
  "longDescription": "Un onduleur protège votre serveur/domotique et peut maintenir le service pendant une coupure. Cela évite les corruptions et améliore la fiabilité.",
  "useCase": "En cas de microcoupure, votre système reste stable. Les caméras et l’alarme continuent de fonctionner le temps nécessaire.",
  "goodFor": [
    "Vous avez des coupures fréquentes",
    "Vous hébergez des services à la maison",
    "Vous voulez protéger votre installation"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/onduleur.svg",
      "alt": "Illustration : Onduleur & protection du matériel électrique",
      "caption": "Onduleur & protection du matériel électrique",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Protection contre coupures/microcoupures",
    "Continuité (selon autonomie)",
    "Arrêt propre si batterie faible",
    "Meilleure fiabilité du système"
  ],
  "benefits": [
    "Moins de pannes liées au courant",
    "Protection du matériel",
    "Sérénité pour la sécurité",
    "Installation plus stable"
  ],
  "prerequisites": [
    "Pack Foundation"
  ],
  "duration": "0,5 jour",
  "price": "490€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
