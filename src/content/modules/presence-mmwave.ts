import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "presence-mmwave",
  "title": "Détection de présence (mmWave)",
  "subtitle": "Présence fine, même immobile",
  "longDescription": "Contrairement aux détecteurs de mouvement classiques, la présence mmWave détecte même une personne immobile. Résultat : des automatismes plus naturels (lumière qui ne s’éteint pas quand vous lisez, par exemple).",
  "useCase": "Vous regardez un film : l’éclairage d’ambiance reste allumé, même si vous ne bougez pas. Dès que la pièce est vide, tout s’éteint.",
  "goodFor": [
    "Vous avez eu des détecteurs “trop sensibles” ou “pas assez”",
    "Vous voulez des scénarios de lumière vraiment fluides",
    "Vous avez des pièces de passage"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/presence-mmwave.svg",
      "alt": "Illustration : Détection de présence (mmWave)",
      "caption": "Détection de présence (mmWave)",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Détection de présence continue (même immobile)",
    "Idéal pour salon, bureau, couloir",
    "Réduction des faux “absent”",
    "Scénarios plus fins (zones, sensibilité)"
  ],
  "benefits": [
    "Confort très naturel",
    "Moins d’agacement (extinction intempestive)",
    "Automatisations plus “intelligentes”",
    "Meilleure efficacité énergétique"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Choisir les pièces prioritaires"
  ],
  "duration": "0,5 jour",
  "price": "390€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
