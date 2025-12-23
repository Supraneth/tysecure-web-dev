import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "ev-charging",
  "title": "Recharge véhicule électrique",
  "subtitle": "Recharger intelligemment",
  "longDescription": "Gestion de la recharge : heures creuses, limitation de puissance, et scénarios selon la consommation de la maison. Le but : recharger sans faire disjoncter et au meilleur coût.",
  "useCase": "La voiture se recharge surtout la nuit en heures creuses. Si la maison consomme beaucoup (four, chauffage), la puissance de charge peut être limitée temporairement.",
  "goodFor": [
    "Vous avez un véhicule électrique",
    "Vous voulez optimiser heures creuses",
    "Vous craignez les disjonctions"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/ev-charging.svg",
      "alt": "Illustration : Recharge véhicule électrique",
      "caption": "Recharge véhicule électrique",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Planification heures creuses",
    "Limitation de puissance",
    "Scénarios selon consommation",
    "Tableau de bord de recharge"
  ],
  "benefits": [
    "Coût de recharge optimisé",
    "Moins de risques de surcharge",
    "Confort : automatisé",
    "Meilleure visibilité"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Borne/chargeur compatible (selon équipement)"
  ],
  "duration": "0,5 à 1 jour",
  "price": "790€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
