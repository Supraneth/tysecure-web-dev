import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "capteurs-ouverture",
  "title": "Capteurs ouverture (portes/fenêtres)",
  "subtitle": "Savoir, alerter, automatiser",
  "longDescription": "Des capteurs simples qui indiquent si une porte ou une fenêtre est ouverte. Ils servent autant à la sécurité qu’au confort : alerte en cas d’ouverture, ou baisse du chauffage si une fenêtre est restée ouverte.",
  "useCase": "Si une fenêtre reste ouverte 10 minutes en hiver, vous recevez une notification et le chauffage se met en pause dans la pièce.",
  "goodFor": [
    "Vous aérez souvent et oubliez parfois",
    "Vous voulez sécuriser une baie vitrée",
    "Vous souhaitez des notifications simples"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/capteurs-ouverture.svg",
      "alt": "Illustration : Capteurs ouverture (portes/fenêtres)",
      "caption": "Capteurs ouverture (portes/fenêtres)",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "État ouvert/fermé en temps réel",
    "Alertes (nuit, absence)",
    "Automatisations : chauffage, alarme, éclairage",
    "Historique d’événements"
  ],
  "benefits": [
    "Moins d’oublis",
    "Sécurité renforcée",
    "Économies de chauffage",
    "Routines plus intelligentes"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Liste des portes/fenêtres prioritaires"
  ],
  "duration": "0,5 jour",
  "price": "240€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
