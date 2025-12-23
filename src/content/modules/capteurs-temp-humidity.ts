import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "capteurs-temp-humidity",
  "title": "Capteurs de température et d'humidité",
  "subtitle": "Mesurer pour mieux régler",
  "longDescription": "Des petits capteurs discrets pour connaître la température et l’humidité pièce par pièce. Idéal pour corriger les zones froides, prévenir l’air trop sec, ou déclencher une ventilation au bon moment.",
  "useCase": "Si la chambre d’un enfant devient trop sèche la nuit, vous recevez une alerte et la ventilation peut se déclencher automatiquement.",
  "goodFor": [
    "Vous avez des pièces difficiles (humides, froides)",
    "Vous voulez suivre une chambre de bébé",
    "Vous souhaitez mieux régler votre chauffage"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/capteurs-temp-humidity.svg",
      "alt": "Illustration : Capteurs de température et d'humidité",
      "caption": "Capteurs de température et d'humidité",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Mesures fiables et historisées",
    "Alertes seuils (trop chaud / trop humide)",
    "Automatisations : chauffage, VMC, déshumidificateur",
    "Lecture simple sur mobile/tablette"
  ],
  "benefits": [
    "Meilleur confort et sommeil",
    "Prévention moisissures et inconfort",
    "Aide à optimiser chauffage/ventilation",
    "Décisions basées sur des faits, pas des impressions"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Définir les pièces à équiper"
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
