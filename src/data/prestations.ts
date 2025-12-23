import type { Prestation } from '@/hooks/useComposition';
import { MODULES_CATALOG } from './modules'; // adapte le chemin si besoin
import { PACK_INCLUDED_MODULE_IDS, type PackId } from './pack-menus'; // adapte le chemin

/**
 * Helpers prix
 */

const parsePrice = (price: string): number => {
  // Ex: "690€ HT" -> 690
  const digits = price.replace(/[^\d]/g, '');
  const value = Number(digits || '0');
  return Number.isFinite(value) ? value : 0;
};

const formatPriceHT = (value: number): string => {
  // Ex: 3800 -> "3 800€ HT"
  return `${value.toLocaleString('fr-FR')}€ HT`;
};

const computePackBasePrice = (packId: PackId): number => {
  const moduleIds = PACK_INCLUDED_MODULE_IDS[packId] ?? [];
  return moduleIds.reduce((total, moduleId) => {
    const mod = MODULES_CATALOG.find((m) => m.id === moduleId);
    if (!mod) return total;
    return total + parsePrice(mod.price);
  }, 0);
};

// Prix calculés dynamiquement à partir des modules inclus
const PACK_CONFORT_BASE_PRICE = computePackBasePrice('pack-confort');
const PACK_SENTINEL_BASE_PRICE = computePackBasePrice('pack-sentinel');
const PACK_CYBER_BASE_PRICE = computePackBasePrice('pack-cyber');
const PACK_GUARDIAN_BASE_PRICE = computePackBasePrice('pack-guardian');

export type PrestationKind = 'required' | 'pack' | 'premium';

export type PrestationWithImage = Prestation & {
  /** Illustration optionnelle du pack (image marketing, pictogramme, etc.) */
  image?: string;
  /** Type fonctionnel de la prestation (obligatoire, pack combinable, premium…) */
  kind: PrestationKind;
  /** Indique si l’on peut cumuler cette prestation avec d’autres packs */
  combinable?: boolean;
};

/**
 * Source of truth for prestations.
 *
 * By centralizing the catalog here, Composition can always re-sync
 * display/pricing from the latest catalog values (y compris les packs).
 */
export const PRESTATIONS_CATALOG: PrestationWithImage[] = [
  // Obligatoires (non combinables)
  {
    id: 'audit',
    name: 'Audit',
    price: '300€ HT',
    description:
      "Étape obligatoire avant la construction ou la rénovation. Analyse complète de votre habitat, de l'infrastructure réseau et électrique, des usages (sécurité, confort, énergie, multimédia, cybersécurité). Visite sur site, rapport détaillé et schéma d'architecture cible avec préconisation de modules et de packs TySecure.",
    image: '/images/prestations/audit.svg',
    kind: 'required',
    combinable: false,
  },
  {
    id: 'pack-foundation',
    name: 'Pack TySecure Foundation',
    price: '1500€ HT',
    description:
      "Pack de base obligatoire : serveur Home Assistant auto-hébergé, réseau domestique structuré (1 VLAN IoT), premières règles de sécurité réseau, intégration des modules essentiels (éclairage, chauffage, volets, scénarios de vie) jusqu’à 20 appareils et mise en place de sauvegardes de base de la configuration domotique. Idéal pour poser des fondations solides et évolutives.",
    image: '/images/prestations/pack-foundation.svg',
    kind: 'required',
    combinable: false,
  },

  // Packs (combinables entre eux : Confort + Sentinel + Cyber, etc.)
  {
    id: 'pack-confort',
    name: 'Pack Confort',
    // Prix calculé à partir des modules inclus
    price: `À partir de ${formatPriceHT(PACK_CONFORT_BASE_PRICE)}`,
    description: `
Pack orienté confort, lumières et qualité de vie au quotidien :

- Éclairage intelligent et volets roulants pour créer des ambiances et automatiser le lever/coucher du soleil.
- Gestion thermique et capteurs de température/humidité pour un confort intérieur constant et maîtrisé.
- Qualité de l’air & ventilation pilotées selon les mesures (CO₂, COV, humidité).
- Météo locale intégrée pour adapter automatiquement chauffage, volets et scénarios en fonction des conditions réelles.
- Transports locaux & trajets pour ajuster réveils, notifications et départs selon le trafic et les horaires.
- Scénarios de vie (réveil, soirée, cinéma, départ…) regroupant lumières, volets et confort thermique.
    `.trim(),
    image: '/images/prestations/pack-confort.svg',
    kind: 'pack',
    combinable: true,
  },

  {
    id: 'pack-sentinel',
    name: 'Pack Sentinel',
    // Prix calculé à partir des modules inclus
    price: `À partir de ${formatPriceHT(PACK_SENTINEL_BASE_PRICE)}`,
    description: `
Pack préconçu orienté sécurité physique et surveillance, 100 % local (sans cloud imposé, sans abonnement récurrent) :

- Vidéosurveillance avancée (caméras IP locales, IA de détection, enregistrement continu ou événementiel).
- Alarme & intrusion (capteurs d’ouverture, mouvements, sirène, scénarios jour/nuit/absence).
- Simulation de présence (lumières, volets, multimédia) pour sécuriser les périodes d’absence.
- Suivi de la position des appareils (anti-vol) des membres de la famille, centralisé sur une carte, permettant d’activer des scénarios d’arrivée/départ et de générer des alertes personnalisées.
- Stockage des enregistrements sur NAS sécurisé avec rétention adaptée.
- Onduleur dimensionné pour le serveur domotique, le NVR/NAS et le réseau afin d’assurer une continuité de service en cas de coupure.
- Intégration d'un tableau de bord mural pour visualiser caméras, états d’alarme et principaux indicateurs de la maison.
    `.trim(),
    image: '/images/prestations/pack-sentinel.svg',
    kind: 'pack',
    combinable: true,
  },

  {
    id: 'pack-cyber',
    name: 'Pack Cybersécurité',
    // Prix calculé à partir des modules inclus
    price: `À partir de ${formatPriceHT(PACK_CYBER_BASE_PRICE)}`,
    description: `
Pack dédié à la cybersécurité domestique et à la protection de vos données :

- Sécurisation du réseau domestique : pare-feu, segmentation (VLAN IoT / invités), Wi-Fi invité, filtrage DNS renforcé.
- Sauvegardes robustes sur NAS (données sensibles + configuration domotique) avec sauvegardes externalisées et tests de restauration.
- Mise en place d’un gestionnaire de mots de passe (type Bitwarden ou équivalent) pour toute la famille, avec bonnes pratiques et partage sécurisé.
- Contrôle parental personnalisé : profils par âge, horaires par appareil, filtrage de contenus et rapports d’usage.
- Sécurité des postes de travail : antivirus/EDR, durcissement des systèmes, gestion des mises à jour et vérification de l’état global de sécurité.
- Pack Cyber+ en option : durcissement avancé, VPN site-à-site, supervision régulière et revues de sécurité.
    `.trim(),
    image: '/images/prestations/pack-cyber.svg',
    kind: 'pack',
    combinable: true,
  },

  {
    id: 'pack-guardian',
    name: 'Pack Guardian',
    // Prix calculé à partir des modules inclus
    price: `À partir de ${formatPriceHT(PACK_GUARDIAN_BASE_PRICE)}`,
    description: `
Combinaison avancée sécurité physique + cybersécurité + IA locale :

- Inclut les briques majeures du pack Sentinel (vidéosurveillance locale, alarme, simulation de présence, NAS, onduleur et tableau de bord mural).
- Inclut les composants principaux du pack Cyber (réseau segmenté, NAS de sauvegarde, gestionnaire de mots de passe, contrôle parental, sécurité postes).
- Suivi de la position des appareils (anti-vol) des membres de la famille, centralisé sur une carte, permettant d’activer des scénarios d’arrivée/départ et de générer des alertes personnalisées.
- Implémentation d’une IA vidéo locale (type Frigate IA) pour la détection intelligente (personnes, véhicules, zones sensibles).
- Assistant vocal local personnalisé : commandes naturelles pour piloter maison, scénarios sécurité/confort, sans dépendre d’un fournisseur cloud.
- Intégration renforcée possible avec les modules énergie et confort (fermeture automatique, réduction consommation, scénarios d’urgence,etc.).
    `.trim(),
    image: '/images/prestations/pack-guardian.svg',
    kind: 'pack',
    combinable: true,
  },

  // Premium (en général unique / sur-mesure)
  {
    id: 'pack-signature',
    name: 'Signature',
    price: "Sur-mesure haut de gamme - nous contacter directement pour plus d'informations",
    description:
      "Offre haut de gamme sur-mesure pour projets exigeants : architecture domotique et cybersécurité entièrement personnalisées, sélection fine des modules (sécurité physique, cybersécurité, énergie, multimédia, confort) et accompagnement rapproché. Idéal pour les résidences principales hautement sensibles, résidences secondaires critiques ou profils ayant des besoins très spécifiques.",
    image: '/images/prestations/pack-signature.svg',
    kind: 'premium',
    combinable: false,
  },
];

export const PRESTATIONS_BY_ID = new Map(
  PRESTATIONS_CATALOG.map((p) => [p.id, p] as const),
);
