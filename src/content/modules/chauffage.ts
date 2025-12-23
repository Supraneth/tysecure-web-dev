import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "chauffage",
  "title": "Gestion thermique intelligente",
  "subtitle": "Chaud au bon moment, sans surconsommer",
  "longDescription": "Optimisez votre confort sans y penser : thermostats connectés, régulation pièce par pièce, et scénarios selon vos habitudes (présence, horaires, météo).",
  "useCase": "Quand vous partez au travail, le chauffage se met en mode éco. Il remonte progressivement avant votre retour, sans surchauffer la maison.",
  "goodFor": [
    "Vous chauffez parfois une maison vide",
    "Vous voulez une température stable dans les chambres",
    "Vous souhaitez optimiser heures pleines/heures creuses"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/chauffage.svg",
      "alt": "Illustration : Gestion thermique intelligente",
      "caption": "Gestion thermique intelligente",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Pilotage par pièce (selon installation)",
    "Modes : éco, confort, absence, vacances",
    "Ajustement selon présence et météo",
    "Historique et suivi pour comprendre votre conso",
    "Scénarios simples : départ / retour / nuit"
  ],
  "benefits": [
    "Confort plus stable (moins de variations)",
    "Économies visibles sur les périodes de chauffe",
    "Moins d’oublis (vacances, fenêtres ouvertes)",
    "Maison plus agréable au quotidien"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Accès aux équipements de chauffage (thermostat/chaudière/PAC)"
  ],
  "duration": "0,5 à 1,5 jour",
  "price": "690€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
