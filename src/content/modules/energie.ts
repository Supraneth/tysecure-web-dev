import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "energie",
  "title": "Monitoring énergétique",
  "subtitle": "Comprendre et réduire la facture",
  "longDescription": "Suivi de consommation en temps réel : identifiez les gros postes, les veilles inutiles, et mesurez l’impact de vos actions. La base pour faire des économies sans se priver.",
  "useCase": "Vous découvrez qu’un appareil consomme anormalement la nuit. Une alerte vous prévient et vous corrigez le problème avant de le payer sur la durée.",
  "goodFor": [
    "Vous voulez réduire la facture",
    "Vous avez des heures creuses",
    "Vous préparez l’arrivée d’un véhicule électrique"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/energie.svg",
      "alt": "Illustration : Monitoring énergétique",
      "caption": "Monitoring énergétique",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Suivi en temps réel",
    "Historique et comparaisons",
    "Alertes sur consommation anormale",
    "Tableaux de bord simples"
  ],
  "benefits": [
    "Économies mesurables",
    "Meilleure compréhension de votre conso",
    "Détection d’anomalies",
    "Aide à dimensionner de futurs projets (PV, VE)"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Compteur/capteur compatible"
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
