import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "eclairage",
  "title": "Éclairage intelligent",
  "subtitle": "Ambiances, confort et sobriété",
  "longDescription": "Pilotez vos lumières depuis une seule interface : scènes (lecture, dîner, cinéma), extinction automatique et modes (absence, nuit). Le but : un confort visible, sans complexité.",
  "useCase": "Quand vous rentrez le soir, un éclairage doux s’allume automatiquement dans l’entrée et le couloir. Si vous vous levez la nuit, une lumière très faible vous guide sans éblouir.",
  "goodFor": [
    "Vous voulez arrêter de chercher les interrupteurs dans le noir",
    "Vous partez souvent et souhaitez simuler une présence",
    "Vous avez des enfants et voulez des routines simples"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/eclairage.svg",
      "alt": "Illustration : Éclairage intelligent",
      "caption": "Éclairage intelligent",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Scènes prêtes à l’emploi (réveil, soirée, nuit)",
    "Déclenchements : présence, luminosité, heure",
    "Modes : absent / invités / vacances",
    "Commandes simples (mobile, interrupteurs, tablette)",
    "Intégration possible avec alarme et vidéosurveillance"
  ],
  "benefits": [
    "Confort immédiat dans toutes les pièces",
    "Moins de gaspillage grâce à l’extinction intelligente",
    "Meilleure sécurité (dissuasion, simulation de présence)",
    "Une expérience cohérente pour toute la famille"
  ],
  "prerequisites": [
    "Pack Foundation (ou Home Assistant déjà installé)",
    "Liste des pièces et points lumineux à piloter"
  ],
  "duration": "0,5 à 1 jour",
  "price": "490€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
