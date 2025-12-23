import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "video",
  "title": "Vidéosurveillance",
  "subtitle": "Surveillance locale, notifications utiles",
  "longDescription": "Caméras et enregistrements centralisés chez vous, avec notifications intelligentes (sans dépendre du cloud). L’objectif : voir, comprendre et agir rapidement.",
  "useCase": "Quand quelqu’un approche de l’entrée pendant votre absence, vous recevez une notification avec un aperçu. En un clic, vous vérifiez la scène et déclenchez une action (sirène, éclairage).",
  "goodFor": [
    "Vous souhaitez surveiller un point sensible (entrée, garage)",
    "Vous partez souvent",
    "Vous voulez garder vos enregistrements chez vous"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/video.svg",
      "alt": "Illustration : Vidéosurveillance",
      "caption": "Vidéosurveillance",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Enregistrement local (selon matériel)",
    "Notifications paramétrées (éviter le spam)",
    "Accès sécurisé à distance",
    "Vues simples (entrée, jardin, garage)",
    "Couplage avec alarme / éclairage"
  ],
  "benefits": [
    "Dissuasion et tranquillité",
    "Preuves en cas d’incident",
    "Moins de dépendance au cloud",
    "Réactivité en déplacement"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Emplacements caméras à définir (entrée, jardin, etc.)"
  ],
  "duration": "0,5 à 1,5 jour",
  "price": "400€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
