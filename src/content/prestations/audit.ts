import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "audit",
  "title": "Audit (obligatoire)",
  "subtitle": "Point de départ avant toute construction / extension",
  "longDescription": "Un audit technique et fonctionnel pour cadrer votre projet (besoins, contraintes, réseau, sécurité, évolutivité). Il permet d’éviter les impasses et d’aligner les choix matériels/logiciels avec votre usage réel.",
  "highlights": [
    "Visite sur site ou visio guidée + collecte d’informations (plan, box, équipements existants)",
    "Analyse réseau & cybersécurité (segmentation, accès distant, sauvegardes, bonnes pratiques)",
    "Estimation des économies d'énergies avec des scénarios adaptés à votre environnement",
    "Schéma d’architecture cible Home Assistant + recommandations matériel",
    "Livrable : rapport clair + priorisation (indispensable / optionnel / plus tard)"
  ],
  "benefits": [
    "Réduit les risques (surcoûts, incompatibilités, rework)",
    "Accélère l’installation (décisions prises, matériel validé)",
    "Base saine pour une domotique sécurisée et maintenable"
  ],
  "prerequisites": [
    "Accès à la box/routeur (modèle, config si possible)",
    "Plan du logement si disponible (même approximatif)",
    "Liste des équipements souhaités / existants"
  ],
  "duration": "1 à 2 semaines (selon disponibilité et complexité)",
  "price": "300€ HT",
  "cta": {
    "label": "Demander un audit",
    "href": "/contact"
  },
  "notes": "Tarifs indicatifs, ajustés selon surface, complexité et déplacement."
};

export default detail;
