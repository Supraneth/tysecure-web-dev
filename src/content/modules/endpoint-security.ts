import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "endpoint-security",
  "title": "Sécurité des postes de travail",
  "subtitle": "Protéger les ordinateurs de la maison",
  "longDescription": "Durcissement des PC/Mac : mises à jour, comptes, bonnes pratiques, et outils de protection adaptés. Le but : réduire les risques (phishing, malwares) pour toute la famille.",
  "useCase": "Un email frauduleux arrive : vous identifiez rapidement l’arnaque, et les protections réduisent les risques de clic “catastrophe”.",
  "goodFor": [
    "Vous télétravaillez",
    "Vous voulez protéger les appareils familiaux",
    "Vous craignez les arnaques en ligne"
  ],
  "media": [
    {
      "type": "image",
      "src": "/modules/endpoint-security.svg",
      "alt": "Illustration : Sécurité des postes de travail",
      "caption": "Sécurité des postes de travail",
      "credit": {
        "text": "Illustration TySecure",
        "license": "Voir LICENSE (projet TySecure)"
      }
    }
  ],
  "highlights": [
    "Bonnes pratiques (comptes, mises à jour)",
    "Configuration de base plus sûre",
    "Conseils anti-phishing",
    "Recommandations adaptées"
  ],
  "benefits": [
    "Réduit les risques de malwares",
    "Moins d’incidents",
    "Famille mieux sensibilisée",
    "Meilleure hygiène numérique"
  ],
  "prerequisites": [
    "Pack Foundation",
    "Accès aux postes concernés"
  ],
  "duration": "0,5 à 1 jour",
  "price": "690€ HT",
  "cta": {
    "label": "Ajouter ce module",
    "href": "/composition"
  },
  "notes": "Tarifs indicatifs hors matériel (sauf mention contraire). Les compatibilités exactes dépendent des équipements existants."
};

export default detail;
