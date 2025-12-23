import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "suivi-photovoltaique",
  "title": "Suivi photovoltaïque",
  "subtitle": "Produire, consommer au bon moment",
  "longDescription": "Visualisez la production solaire, la consommation de la maison et (si possible) l’injection. Déclenchez ensuite des automatismes pour consommer quand vous produisez.",
  "useCase": "Quand le soleil produit fort, le système peut lancer certains usages (chauffe-eau, recharge, prises) pour augmenter l’autoconsommation.",
  "goodFor": [
    "Vous avez des panneaux solaires",
    "Vous voulez suivre l’autoconsommation",
    "Vous voulez déclencher des usages quand ça produit"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/suivi-photovoltaique.svg",
      "alt": "Illustration : Suivi photovoltaïque",
      "caption": "Suivi photovoltaïque",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Tableaux de bord production/consommation",
    "Alertes et suivi",
    "Automatisations d’autoconsommation",
    "Compatibilité selon onduleur/compteur"
  ],
  "benefits": [
    "Meilleure autoconsommation",
    "Décisions basées sur des chiffres",
    "Optimisation de certains usages",
    "Suivi simple sur mobile"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Onduleur/compteur intégrable (selon marque)"
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
