import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "qualite-air",
  "title": "Qualité de l’air & ventilation",
  "subtitle": "CO₂, COV, confort respiratoire",
  "longDescription": "Surveillez la qualité de l’air (CO₂, COV selon capteurs) et automatisez la ventilation : vous êtes alerté quand il faut aérer, et la maison peut agir pour vous.",
  "useCase": "Après un dîner entre amis, le CO₂ monte. Une notification vous conseille d’aérer et la VMC peut passer en vitesse renforcée pendant 20 minutes.",
  "goodFor": [
    "Vous télétravaillez souvent à la maison",
    "Vous avez des enfants / allergies",
    "Vous cuisinez beaucoup et voulez évacuer efficacement"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/qualite-air.svg",
      "alt": "Illustration : Qualité de l’air & ventilation",
      "caption": "Qualité de l’air & ventilation",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Capteurs CO₂/COV (selon matériel)",
    "Alertes simples (àérer / ventiler)",
    "Automatisations : VMC, fenêtres motorisées, purificateur",
    "Historique pour comprendre vos habitudes"
  ],
  "benefits": [
    "Air plus sain au quotidien",
    "Moins de maux de tête / fatigue liés au CO₂",
    "Réduction des moisissures (humidité)",
    "Confort amélioré sans y penser"
  ],
  "prerequisites": [
    "Pack Foundation",
    "VMC/purificateur intégrable si pilotage souhaité"
  ],
  "duration": "0,5 à 1 jour",
  "price": "450€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
