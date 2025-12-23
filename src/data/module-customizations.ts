import { MODULES_BY_ID, type ModuleCategory } from '@/data/modules';

export type EquipmentItem = {
  label: string;
  qty?: string;
  brands?: string[];
};

export type ModuleVariant = {
  key: string;
  label: string;
  /** Estimation “à partir de”, en euros HT */
  labor: number;
  hardware: number;
  equipment?: EquipmentItem[];
  notes?: string;
};

export type ModuleCustomization = {
  default: {
    labor: number;
    hardware: number;
    equipment: EquipmentItem[];
  };
  variants?: ModuleVariant[];
  notes?: string;
};

/**
 * Extrait un montant minimum depuis une string de prix.
 * Ex: "990€ HT" -> 990, "À partir de 3 900€ HT" -> 3900
 */
export function extractMinAmount(price?: string | null): number | null {
  if (!price) return null;
  const normalized = price
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
  if (!/\d/.test(normalized)) return null;
  const match = normalized.match(/(\d[\d\s]*)(?=\s*€)/);
  if (!match) return null;
  const asNumber = Number(match[1].replace(/\s/g, ''));
  return Number.isFinite(asNumber) ? asNumber : null;
}

export function formatEuros(amount: number): string {
  return new Intl.NumberFormat('fr-FR').format(amount) + ' €';
}

function categoryDefaults(category?: ModuleCategory): { ratioLabor: number; equipment: EquipmentItem[] } {
  // Default ratios are intentionally conservative: we want to show a transparent split,
  // not to pretend to know the exact bill of materials.
  switch (category) {
    case 'Sécurité physique':
      return {
        ratioLabor: 0.55,
        equipment: [
          { label: 'Capteurs / caméras', qty: 'selon besoin', brands: ['Reolink', 'Ubiquiti', 'TP-Link VIGI'] },
          { label: 'Stockage local (NVR/NAS ou carte SD)', qty: '1', brands: ['Synology', 'Ubiquiti'] },
          { label: 'Alimentation & réseau (PoE / Wi‑Fi)', qty: 'selon installation', brands: ['Ubiquiti', 'TP-Link'] },
        ],
      };
    case 'Cybersécurité':
      return {
        ratioLabor: 0.7,
        equipment: [
          { label: 'Sauvegarde locale (NAS / disques)', qty: '1', brands: ['Synology', 'QNAP', 'Western Digital'] },
          { label: 'Routeur/pare-feu (si nécessaire)', qty: '1', brands: ['Ubiquiti', 'TP-Link Omada'] },
          { label: 'Comptes & gestionnaires de mots de passe', qty: '—', brands: ['Bitwarden', '1Password'] },
        ],
      };
    case 'Énergie':
      return {
        ratioLabor: 0.65,
        equipment: [
          { label: 'Mesure (prises/compteurs)', qty: 'selon besoin', brands: ['Shelly', 'Ecojoko'] },
          { label: 'Actionneurs (relais / vannes)', qty: 'selon installation', brands: ['Shelly', 'Aqara'] },
          { label: 'Capteurs (température, humidité…)', qty: 'selon besoin', brands: ['Aqara', 'Sonoff'] },
        ],
      };
    case 'Multimédia':
      return {
        ratioLabor: 0.6,
        equipment: [
          { label: 'Lecteur / passerelle (TV, box, streaming)', qty: '1', brands: ['Apple', 'Google', 'Nvidia'] },
          { label: 'Audio (enceintes / ampli)', qty: 'selon besoin', brands: ['Sonos', 'Denon', 'Yamaha'] },
          { label: 'Serveur (si bibliothèque)', qty: 'option', brands: ['Synology'] },
        ],
      };
    case 'Confort':
    default:
      return {
        ratioLabor: 0.6,
        equipment: [
          { label: 'Passerelle domotique', qty: '1', brands: ['Home Assistant', 'Aqara'] },
          { label: 'Capteurs (présence, ouverture…)', qty: 'selon besoin', brands: ['Aqara', 'Sonoff'] },
          { label: 'Actionneurs (relais / interrupteurs)', qty: 'selon installation', brands: ['Shelly', 'Legrand'] },
        ],
      };
  }
}

function overrideByModuleId(moduleId: string): Partial<ModuleCustomization> | null {
  if (moduleId === 'eclairage') {
    return {
      variants: [
        {
          key: 'rooms-1-3',
          label: '1–3 pièces',
          labor: 250,
          hardware: 240,
          equipment: [
            { label: 'Interrupteurs / micromodules', qty: '2–6', brands: ['Shelly', 'Aqara', 'Legrand'] },
            { label: 'Ampoules (si besoin)', qty: '0–6', brands: ['Philips Hue', 'IKEA', 'Aqara'] },
            { label: 'Capteur présence/mouvement (option)', qty: '0–2', brands: ['Aqara', 'Sonoff'] },
          ],
        },
        {
          key: 'rooms-4-8',
          label: '4–8 pièces',
          labor: 450,
          hardware: 540,
          equipment: [
            { label: 'Interrupteurs / micromodules', qty: '6–16', brands: ['Shelly', 'Aqara', 'Legrand'] },
            { label: 'Ampoules (si besoin)', qty: '0–16', brands: ['Philips Hue', 'IKEA', 'Aqara'] },
            { label: 'Capteurs (présence/ouverture)', qty: '2–6', brands: ['Aqara', 'Sonoff'] },
          ],
        },
        {
          key: 'rooms-9plus',
          label: '9+ pièces / scénarios avancés',
          labor: 650,
          hardware: 840,
          equipment: [
            { label: 'Interrupteurs / micromodules', qty: '16+', brands: ['Shelly', 'Aqara', 'Legrand'] },
            { label: 'Capteurs (présence, luminosité…)', qty: '6+', brands: ['Aqara', 'Sonoff'] },
            { label: 'Tablettes / interfaces (option)', qty: '0–2', brands: ['Apple', 'Samsung'] },
          ],
        },
      ],
      notes:
        "Selon votre électricité et le type d’interrupteurs, on privilégie des solutions fiables et faciles à maintenir. L’estimation est ajustée après audit.",
    };
  }

  if (moduleId === 'video') {
    return {
      variants: [
        {
          key: 'cams-1-2',
          label: '1–2 caméras',
          labor: 200,
          hardware: 200,
          equipment: [
            { label: 'Caméras', qty: '1–2', brands: ['Reolink', 'Ubiquiti', 'TP-Link VIGI'] },
            { label: 'Stockage local (microSD ou NVR)', qty: '1', brands: ['Reolink', 'Synology'] },
            { label: 'Support & fixation', qty: '1–2', brands: ['—'] },
          ],
          notes: 'Wi‑Fi possible selon la zone. PoE conseillé si vous voulez le plus fiable.',
        },
        {
          key: 'cams-3-4',
          label: '3–4 caméras',
          labor: 320,
          hardware: 520,
          equipment: [
            { label: 'Caméras', qty: '3–4', brands: ['Reolink', 'Ubiquiti', 'TP-Link VIGI'] },
            { label: 'Stockage local (NVR/NAS)', qty: '1', brands: ['Reolink', 'Synology', 'Ubiquiti'] },
            { label: 'Réseau (switch PoE / câblage)', qty: '1', brands: ['Ubiquiti', 'TP-Link'] },
          ],
          notes: 'PoE recommandé : une seule connexion réseau/alimentation par caméra.',
        },
        {
          key: 'cams-5-8',
          label: '5–8 caméras',
          labor: 450,
          hardware: 950,
          equipment: [
            { label: 'Caméras', qty: '5–8', brands: ['Reolink', 'Ubiquiti', 'TP-Link VIGI'] },
            { label: 'Stockage local (NVR/NAS + disques)', qty: '1', brands: ['Synology', 'Reolink'] },
            { label: 'Réseau (switch PoE / baie)', qty: '1', brands: ['Ubiquiti', 'TP-Link'] },
          ],
          notes: 'Souvent l’occasion de fiabiliser le réseau (switch PoE, câblage propre).',
        },
      ],
      notes:
        "Les marques listées sont des exemples. On privilégie une installation locale et robuste (sans dépendre du cloud). L’estimation dépend surtout du nombre de caméras et du câblage.",
    };
  }

  return null;
}

export function getModuleCustomization(moduleId: string): ModuleCustomization {
  const m = MODULES_BY_ID.get(moduleId);
  const base = extractMinAmount((m as any)?.price) ?? 0;
  const defaults = categoryDefaults((m as any)?.category);

  // Split base price into labor/hardware with a stable, readable rule.
  const labor = Math.max(0, Math.round(base * defaults.ratioLabor));
  const hardware = Math.max(0, base - labor);

  const overridden = overrideByModuleId(moduleId);
  if (overridden) {
    // If variants exist, keep default as the first variant for consistent display
    const first = overridden.variants?.[0];
    if (first) {
      return {
        default: {
          labor: first.labor,
          hardware: first.hardware,
          equipment: first.equipment ?? defaults.equipment,
        },
        variants: overridden.variants,
        notes: overridden.notes,
      };
    }
    return {
      default: {
        labor,
        hardware,
        equipment: defaults.equipment,
      },
      ...overridden,
    };
  }

  return {
    default: {
      labor,
      hardware,
      equipment: defaults.equipment,
    },
    notes: "Estimation indicative. Le choix du matériel (marque, quantité) est validé après audit et selon votre budget.",
  };
}
