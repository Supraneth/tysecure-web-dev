import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  id: "pack-confort",
  title: "Pack Confort",
  subtitle: "Lumières, climat et scénarios du quotidien",
  longDescription:
    "Le Pack Confort regroupe les modules qui rendent la maison plus agréable au quotidien : ambiances lumineuses, volets, confort thermique, qualité de l’air et scénarios de vie. L’objectif : moins d’actions manuelles, plus de constance, et une maison qui s’adapte à vos habitudes.",
  useCase:
    "Le matin, la maison se réveille avec vous : volets qui s’ouvrent progressivement, chauffage adapté, lumière douce dans le couloir, et notification si la qualité de l’air est mauvaise — sans que vous ayez à y penser.",
  goodFor: [
    "Vous voulez un confort stable (température, humidité)",
    "Vous aimez des ambiances (réveil, soirée, cinéma)",
    "Vous voulez réduire les gestes répétitifs (volets, lumières)",
  ],
  highlights: [
    "Éclairage intelligent et ambiances (réveil, soirée, invités)",
    "Pilotage des volets selon lever/coucher du soleil",
    "Mesures de température/humidité et ajustements automatiques",
    "Qualité de l’air (CO₂ / humidité) avec alertes et actions",
    "Scénarios simples : départ, nuit, week‑end, cinéma",
  ],
  benefits: [
    "Plus de confort avec moins d’actions manuelles",
    "Une maison qui suit vos habitudes (sans rigidité)",
    "Moins d’oubli (volets/lumières), moins de gaspillage",
    "Meilleure qualité d’air et alertes utiles",
  ],
  prerequisites: ["Pack TySecure Foundation"],
  duration: "1 à 2 jours (selon le nombre de pièces et d’équipements)",
  price: "À partir de (calculé selon les modules inclus)",
  cta: {
    label: "Discuter de mon confort",
    href: "/contact",
  },
  notes:
    "Le prix dépend des modules et des équipements (volets, ampoules, capteurs) déjà présents. Les automatisations restent personnalisables après l’installation.",
};

export default detail;
