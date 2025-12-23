import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "alarme",
  "title": "Alarme & intrusion",
  "subtitle": "Capteurs, scénarios et alertes",
  "longDescription": "Une alarme moderne, pensée pour le quotidien : capteurs, règles claires, modes (nuit/absence), et alertes immédiates. L’idée : être efficace sans être pénible.",
  "useCase": "Quand vous activez le mode nuit, seules certaines zones sont surveillées. Si une porte s’ouvre, la maison vous alerte, allume les lumières et peut déclencher une sirène.",
  "goodFor": [
    "Vous avez une maison ou un rez-de-chaussée exposé",
    "Vous partez en vacances",
    "Vous voulez des alertes fiables"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/alarme.svg",
      "alt": "Illustration : Alarme & intrusion",
      "caption": "Alarme & intrusion",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Modes : nuit, absence, vacances",
    "Capteurs ouverture/mouvement (selon choix)",
    "Sirène et notifications",
    "Scénarios de dissuasion (éclairage)",
    "Gestion simple pour la famille"
  ],
  "benefits": [
    "Sécurité renforcée",
    "Réaction rapide",
    "Moins d’oublis grâce aux automatismes",
    "Système personnalisable (sans usine à gaz)"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Définir les zones et les habitudes (mode nuit, animaux, etc.)"
  ],
  "duration": "1 jour",
  "price": "790€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
