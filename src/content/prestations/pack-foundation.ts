import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "pack-foundation",
  "title": "Pack TySecure Foundation (obligatoire)",
  "subtitle": "Socle Home Assistant + réseau + sécurité",
  "longDescription": "Le pack de base pour démarrer sur des fondations solides : serveur Home Assistant dimensionné, réseau propre, accès sécurisé, et premières automatisations. C’est le tronc commun qui garantit une installation fiable et évolutive.",
  "highlights": [
    "Serveur Home Assistant (local) + configuration initiale",
    "Intégrations principales (Zigbee/Wi‑Fi) et structuration (zones, entités, nomenclature)",
    "Jusqu’à 20 appareils + 5 automatisations prêtes à l’emploi",
  ],
  "benefits": [
    "Une base stable et cohérente pour ajouter des modules ensuite",
    "Moins de maintenance, plus de fiabilité au quotidien",
    "Contrôle local"
  ],
  "sections": [
    {
      "title": "Tableau de bord",
      "body": "Un bon dashboard change tout : vous pilotez la maison en un coup d’œil (présence, sécurité, énergie) et chaque membre du foyer retrouve ses actions favorites en 2 clics.",
      "bullets": [
        "Vues mobile et tablette adaptées à votre quotidien",
        "Raccourcis : départ, nuit, cinéma, invités…",
        "Éléments critiques visibles immédiatement (alarme, fuite, coupure…)"
      ],
      "media": [
        {
          "type": "video",
          "src": "https://etc.athom.com/home/advanced-flow-1872x1152.mp4",
          "caption": "Exemple d’interface / flow avancé",
          "credit": {
            "text": "Ressource vidéo",
            "sourceUrl": "https://etc.athom.com/home/advanced-flow-1872x1152.mp4"
          }
        }
      ]
    }
  ],
  "options": [
    {
      "title": "Extension capacité",
      "description": "Augmentation du nombre d’appareils / automatisations selon vos besoins."
    },
    {
      "title": "Tableau de bord sur-mesure",
      "description": "Dashboards Lovelace adaptés aux usages (mobile, tablette murale, PC)."
    }
  ],
  "duration": "1 à 3 jours (selon matériel et configuration)",
  "price": "À partir de 1500€ HT",
  "cta": {
    "label": "Planifier ce pack",
    "href": "/contact"
  },
  "notes": "Le matériel peut varier selon la gamme choisie et les contraintes de votre installation."
};

export default detail;
