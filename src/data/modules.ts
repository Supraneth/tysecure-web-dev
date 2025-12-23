import type { Module } from '@/hooks/useComposition';
import type { LucideIcon } from 'lucide-react';
import {
  Lightbulb,
  Thermometer,
  Video,
  Lock,
  Droplets,
  Zap,
  Music,
  ShieldCheck,
  Server,
  HardDrive,
  Film,
  User,
  Shield,
  Monitor,
  Wind,
  Key,
  Cloud,
  MapPin,
} from 'lucide-react';

export type ModuleCategory =
  | 'Sécurité physique'
  | 'Cybersécurité'
  | 'Confort'
  | 'Énergie'
  | 'Multimédia';

export type ModuleCatalogItem = Module & {
  icon: LucideIcon;
  category: ModuleCategory;
  /** Optional: used by /modules to group the catalog into simple sub-sections */
  subcategory?: string;
};

/**
 * Source of truth for modules.
 *
 * Rationale:
 * - Modules were previously duplicated between pages.
 * - The composition is persisted; centralizing the catalog allows re-sync later.
 */
export const MODULES_CATALOG: ModuleCatalogItem[] = [
  //
  // CONFORT
  //
  {
    id: 'eclairage',
    name: 'Éclairage intelligent',
    price: '490€ HT',
    description:
      "Ambiances, automatismes et extinction intelligente pour gagner en confort et en sobriété.",
    icon: Lightbulb,
    category: 'Confort',
    subcategory: 'Ambiance & éclairage',
  },
  {
    id: 'chauffage',
    name: 'Gestion thermique intelligente',
    price: '690€ HT',
    description:
      "Thermostats connectés et pilotage fin du chauffage/PAC pour un confort stable et des économies.",
    icon: Thermometer,
    category: 'Confort',
    subcategory: 'Climat & confort',
  },
  {
    id: 'capteurs-temp-humidity',
    name: "Capteurs de température et d'humidité",
    price: '290€ HT',
    description:
      "Suivi pièce par pièce pour mieux régler chauffage, VMC et prévenir l'inconfort (air trop sec/humide).",
    icon: Thermometer,
    category: 'Confort',
    subcategory: 'Climat & confort',
  },
  {
    id: 'qualite-air',
    name: "Qualité de l’air & ventilation",
    price: '450€ HT',
    description:
      "Capteurs CO₂/COV, alertes santé et automatisation de la ventilation (ouverture fenêtre/VMC).",
    icon: Wind,
    category: 'Confort',
    subcategory: "Qualité de l'air",
  },
  {
    id: 'volets',
    name: 'Volets roulants & occultation',
    price: '490€ HT',
    description:
      'Pilotage centralisé, scénarios jour/nuit et automatisation selon météo, soleil et présence.',
    icon: Lightbulb,
    category: 'Confort',
    subcategory: 'Ouvertures',
  },
  {
    id: 'meteo-locale',
    name: 'Météo locale & prévisions',
    price: '290€ HT',
    description:
      'Météo locale (pluie, vent, UV) pour adapter automatiquement volets, chauffage, arrosage et routines.',
    icon: Cloud,
    category: 'Confort',
    subcategory: 'Services & données',
  },
  {
    id: 'transports-locaux',
    name: 'Transports locaux & trajets',
    price: '290€ HT',
    description:
      "Horaires, trafic, perturbations : des notifications utiles et des scénarios qui s'adaptent à vos trajets.",
    icon: Monitor,
    category: 'Confort',
    subcategory: 'Services & données',
  },
  {
    id: 'scenarios-vie',
    name: 'Scénarios de vie & automatisations',
    price: '390€ HT',
    description:
      'Routines (réveil, départ, nuit, cinéma) basées sur présence, météo, calendrier et habitudes.',
    icon: Monitor,
    category: 'Confort',
    subcategory: 'Scénarios & routines',
  },
  // Nouveau
  {
    id: 'presence-mmwave',
    name: 'Détection de présence (mmWave)',
    price: '390€ HT',
    description:
      "Une détection ultra fine (présence immobile) pour éviter l'extinction intempestive et améliorer les automatismes.",
    icon: Monitor,
    category: 'Confort',
    subcategory: 'Scénarios & routines',
  },
  // Nouveau
  {
    id: 'arrosage-jardin',
    name: 'Arrosage intelligent',
    price: '490€ HT',
    description:
      "Arrosez quand il faut : météo, humidité et plages horaires. Évite les oublis et le gaspillage.",
    icon: Droplets,
    category: 'Confort',
    subcategory: 'Jardin & extérieur',
  },

  //
  // SÉCURITÉ PHYSIQUE
  //
  {
    id: 'video',
    name: 'Vidéosurveillance',
    price: '400€ HT',
    description:
      "Caméras locales, alertes intelligentes et contrôle centralisé — sans dépendre du cloud.",
    icon: Video,
    category: 'Sécurité physique',
    subcategory: 'Vidéosurveillance',
  },
  {
    id: 'alarme',
    name: 'Alarme & intrusion',
    price: '790€ HT',
    description:
      "Capteurs + scénarios d'alerte : vous êtes prévenu tout de suite et la maison réagit automatiquement.",
    icon: Lock,
    category: 'Sécurité physique',
    subcategory: 'Alarme & intrusion',
  },
  // Nouveau
  {
    id: 'detecteur-mouvement',
    name: 'Détecteur de mouvement',
    price: '190€ HT',
    description:
      "Déclenche l'éclairage, l'alarme ou des notifications. Simple, efficace, et utile partout.",
    icon: ShieldCheck,
    category: 'Sécurité physique',
    subcategory: 'Alarme & intrusion',
  },
  // Nouveau
  {
    id: 'capteurs-ouverture',
    name: 'Capteurs ouverture (portes/fenêtres)',
    price: '240€ HT',
    description:
      "Savoir si une porte/fenêtre est ouverte, recevoir une alerte, et automatiser chauffage/alarme.",
    icon: Lock,
    category: 'Sécurité physique',
    subcategory: 'Alarme & intrusion',
  },
  // Nouveau
  {
    id: 'capteur-vibration',
    name: 'Capteur vibration (choc / tentative)',
    price: '240€ HT',
    description:
      "Détection des chocs sur une porte, une fenêtre ou un portail pour réagir avant qu'il ne soit trop tard.",
    icon: ShieldCheck,
    category: 'Sécurité physique',
    subcategory: 'Alarme & intrusion',
  },
  // Nouveau
  {
    id: 'sirene',
    name: 'Sirène connectée',
    price: '290€ HT',
    description:
      "Dissuasion immédiate : déclenchement automatique selon vos règles (intrusion, fumée, fuite d'eau…).",
    icon: Lock,
    category: 'Sécurité physique',
    subcategory: 'Alarme & intrusion',
  },
  // Nouveau
  {
    id: 'bouton-panique',
    name: "Bouton d'alerte (panique)",
    price: '240€ HT',
    description:
      "Un bouton simple pour déclencher une alerte (famille, voisins, sirène) en 1 geste.",
    icon: ShieldCheck,
    category: 'Sécurité physique',
    subcategory: 'Famille & sérénité',
  },
  {
    id: 'incendie',
    name: 'Sécurité incendie',
    price: '490€ HT',
    description:
      "Détecteurs fumée/CO avec alertes centralisées et scénarios (sirène, notifications, éclairage de fuite).",
    icon: ShieldCheck,
    category: 'Sécurité physique',
    subcategory: 'Risques domestiques',
  },
  {
    id: 'arrosage',
    name: "Détection des inondations",
    price: '390€ HT',
    description:
      "Capteurs de fuite d'eau + alertes : évitez les dégâts (machine à laver, chauffe-eau, évier…).",
    icon: Droplets,
    category: 'Sécurité physique',
    subcategory: 'Risques domestiques',
  },
  // Nouveau
  {
    id: 'vanne-eau',
    name: "Vanne d'arrêt d'eau automatique",
    price: '690€ HT',
    description:
      "Coupe l'arrivée d'eau en cas de fuite détectée, même si vous êtes absent.",
    icon: Droplets,
    category: 'Sécurité physique',
    subcategory: 'Risques domestiques',
  },
  {
    id: 'controle-acces',
    name: "Contrôle d’accès & interphone",
    price: '690€ HT',
    description:
      "Savoir qui sonne, ouvrir à distance (selon matériel) et garder un historique — en local.",
    icon: Lock,
    category: 'Sécurité physique',
    subcategory: 'Accès & entrée',
  },
  // Nouveau
  {
    id: 'sonnette-video',
    name: 'Sonnette vidéo',
    price: '590€ HT',
    description:
      "Voir et répondre quand quelqu'un sonne, avec enregistrement local et notifications pertinentes.",
    icon: Video,
    category: 'Sécurité physique',
    subcategory: 'Accès & entrée',
  },
  // Nouveau
  {
    id: 'serrure-connectee',
    name: 'Serrure connectée',
    price: '790€ HT',
    description:
      "Accès simplifié (code, badge, smartphone selon modèle) et historique des entrées/sorties.",
    icon: Key,
    category: 'Sécurité physique',
    subcategory: 'Accès & entrée',
  },
  {
    id: 'portail-garage',
    name: 'Portail & garage connectés',
    price: '490€ HT',
    description:
      "Pilotage et retours d'état : ouverture/fermeture, scénarios d'arrivée/départ, et sécurité.",
    icon: Video,
    category: 'Sécurité physique',
    subcategory: 'Accès & entrée',
  },
  {
    id: 'simulation-presence',
    name: 'Simulation de présence',
    price: '350€ HT',
    description:
      "Scénarios réalistes quand vous partez : lumières, volets et musique pour dissuader.",
    icon: Lightbulb,
    category: 'Sécurité physique',
    subcategory: 'Prévention',
  },
  {
    id: 'geoloc-personnes',
    name: 'Localisation des appareils',
    price: '390€ HT',
    description:
      "Arrivée/départ : la maison s'adapte automatiquement (alarme, chauffage, lumières, notifications).",
    icon: MapPin,
    category: 'Sécurité physique',
    subcategory: 'Famille & sérénité',
  },

  //
  // ÉNERGIE
  //
  {
    id: 'energie',
    name: 'Monitoring énergétique',
    price: '590€ HT',
    description:
      "Suivi en temps réel : repérez les postes qui consomment et prenez de bonnes décisions.",
    icon: Zap,
    category: 'Énergie',
    subcategory: 'Mesure & suivi',
  },
  {
    id: 'prises-connectees',
    name: 'Prises connectées & mesure',
    price: '290€ HT',
    description:
      "Pilotage et mesure des prises stratégiques (chauffe-eau, TV, bureau) pour éviter le gaspillage.",
    icon: Zap,
    category: 'Énergie',
    subcategory: 'Mesure & pilotage',
  },
  {
    id: 'eau-chaude',
    name: 'Gestion eau chaude sanitaire',
    price: '390€ HT',
    description:
      "Chauffe-eau : programmation, optimisation heures creuses, et scénarios selon vos habitudes.",
    icon: Droplets,
    category: 'Énergie',
    subcategory: 'Pilotage',
  },
  {
    id: 'optim-tarif',
    name: 'Optimisation des cycles de chauffage',
    price: '690€ HT',
    description:
      "Automatisez selon le tarif, la météo et l'occupation pour payer moins sans perdre en confort.",
    icon: ShieldCheck,
    category: 'Énergie',
    subcategory: 'Optimisation',
  },
  {
    id: 'ev-charging',
    name: 'Recharge véhicule électrique',
    price: '790€ HT',
    description:
      "Optimisez la recharge (HP/HC), limitez la puissance et évitez de faire disjoncter la maison.",
    icon: Zap,
    category: 'Énergie',
    subcategory: 'Mobilité électrique',
  },
  // Nouveau
  {
    id: 'suivi-photovoltaique',
    name: 'Suivi photovoltaïque',
    price: '590€ HT',
    description:
      "Visualisez production/consommation et déclenchez des automatisations quand le soleil produit.",
    icon: Zap,
    category: 'Énergie',
    subcategory: 'Production solaire',
  },

  //
  // MULTIMÉDIA
  //
  {
    id: 'multiroom',
    name: 'Audio multiroom',
    price: '690€ HT',
    description:
      "Son synchronisé multi-pièces et contrôle simple depuis la maison ou le téléphone.",
    icon: Music,
    category: 'Multimédia',
    subcategory: 'Audio',
  },
  {
    id: 'home-cinema',
    name: 'Home cinéma & ambiance TV',
    price: '890€ HT',
    description:
      "Immersion : lumières d'ambiance synchronisées, scénarios cinéma et automatisations d'usage.",
    icon: Film,
    category: 'Multimédia',
    subcategory: 'TV & home cinéma',
  },
  {
    id: 'media-library',
    name: 'Bibliothèque multimédia (Plex / Immich)',
    price: '590€ HT',
    description:
      "Vos films/photos sur votre propre serveur (sans fournir de contenu) et diffusion dans la maison.",
    icon: Server,
    category: 'Multimédia',
    subcategory: 'Bibliothèque & serveur',
  },
  {
    id: 'dashboard-mural',
    name: 'Tableau de bord mural',
    price: '390€ HT',
    description:
      "Tablette murale au centre de la maison : pilotage, vues rapides et contrôle familial.",
    icon: Monitor,
    category: 'Multimédia',
    subcategory: 'Interfaces',
  },
  // Nouveau
  {
    id: 'assistant-vocal',
    name: 'Assistant vocal local',
    price: '690€ HT',
    description:
      "Commandes vocales sans cloud agressif : lancez scènes et actions (selon matériel) de manière privée.",
    icon: Monitor,
    category: 'Multimédia',
    subcategory: 'Interfaces',
  },

  //
  // CYBERSÉCURITÉ / DATA
  //
  {
    id: 'cyber',
    name: 'Durcissement cybersécurité (socle)',
    price: '990€ HT',
    description:
      "Accès sécurisés, bonnes pratiques et configuration réseau de base pour protéger votre maison connectée.",
    icon: Shield,
    category: 'Cybersécurité',
    subcategory: 'Socle & durcissement',
  },
  {
    id: 'backup-nas',
    name: 'Sauvegarde robuste de vos données (NAS)',
    price: '890€ HT',
    description:
      "Vos documents/photos à l'abri : sauvegardes automatisées, restauration simple, et stockage maîtrisé.",
    icon: HardDrive,
    category: 'Cybersécurité',
    subcategory: 'Sauvegarde',
  },
  {
    id: 'onduleur',
    name: 'Onduleur & protection du matériel électrique',
    price: '490€ HT',
    description:
      "Continuité : protège et maintient le système en cas de coupure ou microcoupures.",
    icon: Zap,
    category: 'Cybersécurité',
    subcategory: 'Continuité',
  },
  {
    id: 'network-security',
    name: 'Sécurisation du réseau domestique',
    price: '790€ HT',
    description:
      "Séparez les équipements (IoT, invités…), sécurisez le Wi‑Fi et limitez les risques d'intrusion.",
    icon: ShieldCheck,
    category: 'Cybersécurité',
    subcategory: 'Réseau',
  },
  {
    id: 'password-manager',
    name: 'Gestionnaire de mots de passe',
    price: '390€ HT',
    description:
      "Mots de passe solides, partages familiaux simples, et réduction des risques de piratage.",
    icon: Key,
    category: 'Cybersécurité',
    subcategory: 'Identité',
  },
  {
    id: 'parental-control',
    name: 'Contrôle parental personnalisé',
    price: '490€ HT',
    description:
      "Horaires, filtres, et règles adaptées à vos enfants — sans surveiller inutilement.",
    icon: User,
    category: 'Cybersécurité',
    subcategory: 'Famille',
  },
  {
    id: 'endpoint-security',
    name: 'Sécurité des postes de travail',
    price: '690€ HT',
    description:
      "Protection des ordinateurs (bonnes pratiques, durcissement) et accompagnement pour éviter les pièges.",
    icon: Shield,
    category: 'Cybersécurité',
    subcategory: 'Appareils',
  },
];

export const MODULES_BY_ID = new Map(MODULES_CATALOG.map((m) => [m.id, m] as const));

export const MODULE_CATEGORIES: { id: ModuleCategory; label: string }[] = [
  { id: 'Sécurité physique', label: 'Sécurité physique' },
  { id: 'Cybersécurité', label: 'Cybersécurité & data' },
  { id: 'Confort', label: 'Confort & quotidien' },
  { id: 'Énergie', label: 'Énergie & optimisation' },
  { id: 'Multimédia', label: 'Multimédia & divertissement' },
];
