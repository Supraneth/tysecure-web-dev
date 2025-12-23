/**
 * Mapping between "packs" (prestations) and the modules automatically included.
 *
 * Keep this file dumb and dependency-free (no imports), so it can be used from
 * both UI pages and state logic without cycles.
 */

export type PackId =
  | 'pack-confort'
  | 'pack-sentinel'
  | 'pack-cyber'
  | 'pack-guardian'
  | 'pack-signature';

/**
 * Canonical list of pack prestation IDs.
 * Useful for safely synchronizing state across pages without duplicating strings.
 */
export const PACK_IDS: PackId[] = [
  'pack-confort',
  'pack-sentinel',
  'pack-cyber',
  'pack-guardian',
  'pack-signature',
];

export const PACK_INCLUDED_MODULE_IDS: Record<PackId, string[]> = {
  /**
   * TySecure Confort
   * - Lumières, confort thermique et qualité de l’air
   * - Scénarios de vie (réveil, départ, cinéma…)
   * - Météo locale pour adapter la maison au climat
   */
  'pack-confort': [
    'eclairage',
    'volets',
    'chauffage',
    'capteurs-temp-humidity',
    'qualite-air',
    'meteo-locale',
    'transports-locaux',
    'scenarios-vie',
  ],

  /**
   * TySecure Sentinel
   * - Vidéosurveillance locale + alarme
   * - Simulation de présence
   * - Géolocalisation famille pour scénarios d’arrivée / départ
   * - Stockage sur NAS + onduleur pour la continuité
   * - Dashboard mural pour pilotage / visualisation
   */
  'pack-sentinel': [
    'video',
    'alarme',
    'simulation-presence',
    'geoloc-personnes',
    'backup-nas',
    'onduleur',
    'dashboard-mural',
  ],

  /**
   * TySecure Cyber
   * - Pack Cyber+ (durcissement avancé)
   * - Sauvegarde robuste (NAS)
   * - Sécurisation réseau domestique (pare-feu, VLAN, Wi-Fi invité…)
   * - Gestionnaire de mots de passe
   * - Contrôle parental personnalisé
   * - Sécurité des postes de travail
   */
  'pack-cyber': [
    'cyber',
    'backup-nas',
    'network-security',
    'password-manager',
    'parental-control',
    'endpoint-security',
  ],

  /**
   * TySecure Guardian
   * - Inclut les briques majeures de Sentinel + Cyber
   * - Géolocalisation famille & scénarios avancés
   * - Base idéale pour ajouter IA vidéo (Frigate) et assistant vocal local
   *
   * Remarque : les éléments d’IA avancée restent hors-catalogue module
   * (gérés dans la prestation elle-même).
   */
  'pack-guardian': [
    // Sentinel
    'video',
    'alarme',
    'simulation-presence',
    'geoloc-personnes',
    'backup-nas',
    'onduleur',
    'dashboard-mural',
    // Cyber
    'cyber',
    'network-security',
    'password-manager',
    'parental-control',
    'endpoint-security',
  ],

  /**
   * TySecure Signature
   * - Sur-mesure : inclusion des modules définie au cas par cas en atelier.
   */
  'pack-signature': [],
};

export const REFERENCE_PACK_IDS: PackId[] = [
  'pack-confort',
  'pack-sentinel',
  'pack-cyber',
  'pack-guardian',
];
