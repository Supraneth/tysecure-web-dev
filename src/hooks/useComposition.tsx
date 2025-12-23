import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PACK_INCLUDED_MODULE_IDS, PACK_IDS, type PackId } from '@/data/pack-menus';

export interface Prestation {
  id: string;
  name: string;
  price: string;
  description: string;
}

export interface Module {
  id: string;
  name: string;
  price: string;
  description: string;

  /** Optionnel : estimation affichée dans “Plus d’infos” */
  laborPrice?: string;
  hardwarePrice?: string;
  /** Si true, le matériel est fourni par le client (donc non compté dans l’estimation) */
  hardwareProvidedByUser?: boolean;

  /** Optionnel : configuration choisie par l’utilisateur (ex. “3–4 caméras”) */
  configKey?: string;
  configLabel?: string;
}

export interface Aftercare {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
}

// Prestations always included by default in the offers flow.
// They should not be treated as "items" in the cart badge / short summaries.
export const MANDATORY_PRESTATION_IDS = new Set<string>(['audit', 'pack-foundation']);

// Modules that must remain in the composition even after a reset.
// (Empty by default — fill with IDs when needed, e.g. 'cyber'.)
export const MANDATORY_MODULE_IDS = new Set<string>([]);

interface CompositionState {
  prestations: Prestation[];
  modules: Module[];
  /** Selected pack (prestations menu). Used to auto-include modules in Prestations UX. */
  selectedPackId: PackId | null;
  /** Modules explicitly chosen "à la carte" (persists across pack switches). */
  manualModuleIds: string[];
  selectedAftercare: Aftercare | null;
  
  addPrestation: (prestation: Prestation) => void;
  removePrestation: (id: string) => void;
  addModule: (module: Module, opts?: { source?: 'manual' | 'pack' }) => void;
  removeModule: (id: string, opts?: { source?: 'manual' | 'pack' }) => void;
  setSelectedPackId: (packId: PackId | null) => void;
  // Keep both names to avoid breaking pages/components that still use an older prop name.
  setAftercare: (aftercare: Aftercare | null) => void;
  setSelectedAftercare: (aftercare: Aftercare | null) => void;
  clearAll: () => void;
  resetKeepingMandatory: () => void;
  getTotalItems: () => number;
}

export const useComposition = create<CompositionState>()(
  persist(
    (set, get) => ({
      prestations: [],
      modules: [],
      selectedPackId: null,
      manualModuleIds: [],
      selectedAftercare: null,

      addPrestation: (prestation) =>
        set((state) => {
          if (state.prestations.find((p) => p.id === prestation.id)) {
            return state;
          }
          return { prestations: [...state.prestations, prestation] };
        }),

      removePrestation: (id) =>
        set((state) => {
          // Avoid pointless updates (and rerender loops) when the id isn't present.
          if (!state.prestations.some((p) => p.id === id)) return state;

          const nextPrestations = state.prestations.filter((p) => p.id !== id);
          const isPack = (PACK_IDS as string[]).includes(id);

          return {
            prestations: nextPrestations,
            // If someone removes the selected pack prestation (e.g. from /composition),
            // keep the source of truth consistent.
            selectedPackId: isPack && state.selectedPackId === (id as PackId) ? null : state.selectedPackId,
          };
        }),

      setSelectedPackId: (packId) =>
        set((state) => (state.selectedPackId === packId ? state : { selectedPackId: packId })),

      addModule: (module, opts) =>
        set((state) => {
          const source = opts?.source ?? 'manual';
          const hasModule = state.modules.some((m) => m.id === module.id);

          // IMPORTANT:
          // When a module is auto-added by a pack, we must NOT touch `manualModuleIds`.
          // Otherwise, we create a new array reference on every add, which can trigger
          // effect loops in the Prestations page (pack -> addModule -> rerender -> effect -> addModule...).
          if (source === 'pack') {
            if (hasModule) return state;
            return { modules: [...state.modules, module] };
          }

          // Manual selection: persist "intent" so it survives pack switches.
          const hasManual = state.manualModuleIds.includes(module.id);
          const nextManual = hasManual ? state.manualModuleIds : [...state.manualModuleIds, module.id];

          // Manual selection:
          // - If module already exists, update it (allows “Mettre à jour ma configuration” from the popup).
          // - Otherwise, add it.
          if (hasModule) {
            const nextModules = state.modules.map((m) => (m.id === module.id ? { ...m, ...module } : m));

            // Avoid needless updates if nothing actually changed.
            const didChange = nextModules.some((m, i) => m !== state.modules[i]);
            if (!didChange && nextManual === state.manualModuleIds) return state;

            const partial: Partial<CompositionState> = {};
            if (didChange) partial.modules = nextModules;
            if (nextManual !== state.manualModuleIds) partial.manualModuleIds = nextManual;
            return partial as any;
          }

          return { modules: [...state.modules, module], manualModuleIds: nextManual };
        }),

      removeModule: (id, opts) =>
        set((state) => {
          const source = opts?.source ?? 'manual';

          const packIdsInState = state.prestations
            .map((p) => p.id)
            .filter((pid): pid is PackId => (PACK_IDS as string[]).includes(pid));
          const isIncludedByPack = packIdsInState.some((packId) =>
            (PACK_INCLUDED_MODULE_IDS[packId] ?? []).includes(id)
          );

          const hasModule = state.modules.some((m) => m.id === id);
          const hasManual = state.manualModuleIds.includes(id);

          // Pack-driven removal should never mutate manual intents.
          if (source === 'pack') {
            if (!hasModule) return state;
            return { modules: state.modules.filter((m) => m.id !== id) };
          }

          // Manual removal: remove intent; remove the module from selection unless pack includes it.
          const nextManual = hasManual ? state.manualModuleIds.filter((x) => x !== id) : state.manualModuleIds;

          if (isIncludedByPack) {
            // Can't remove the selection itself (pack includes it), only the manual intent.
            if (nextManual === state.manualModuleIds) return state;
            return { manualModuleIds: nextManual };
          }

          // If nothing changes, bail out.
          if (!hasModule && nextManual === state.manualModuleIds) return state;

          const partial: Partial<CompositionState> = {};
          if (hasModule) partial.modules = state.modules.filter((m) => m.id !== id);
          if (nextManual !== state.manualModuleIds) partial.manualModuleIds = nextManual;

          // If for some reason nothing ended up in partial, avoid an update.
          return Object.keys(partial).length ? (partial as any) : state;
        }),

      setAftercare: (aftercare) =>
        set({ selectedAftercare: aftercare }),

      setSelectedAftercare: (aftercare) =>
        set({ selectedAftercare: aftercare }),

      clearAll: () =>
        set({ prestations: [], modules: [], selectedAftercare: null, selectedPackId: null, manualModuleIds: [] }),

      resetKeepingMandatory: () =>
        set((state) => ({
          prestations: state.prestations.filter((p) => MANDATORY_PRESTATION_IDS.has(p.id)),
          modules: state.modules.filter((m) => MANDATORY_MODULE_IDS.has(m.id)),
          selectedAftercare: null,
          selectedPackId: null,
          manualModuleIds: []
        })),

      getTotalItems: () => {
        const state = get();
        const visiblePrestationsCount = state.prestations.filter(
          (p) => !MANDATORY_PRESTATION_IDS.has(p.id)
        ).length;
        const visibleModulesCount = state.modules.filter((m) => !MANDATORY_MODULE_IDS.has(m.id)).length;
        return visiblePrestationsCount + visibleModulesCount + (state.selectedAftercare ? 1 : 0);
      },
    }),
    {
      name: 'tysecure-composition',
      version: 3,
      migrate: (persistedState: any, version: number) => {
        // Defensive sanitation + backward compatibility.
        const safePrestations = Array.isArray(persistedState?.prestations) ? persistedState.prestations : [];
        const safeModules = Array.isArray(persistedState?.modules) ? persistedState.modules : [];

        const packPriority: PackId[] = ['pack-guardian', 'pack-cyber', 'pack-sentinel', 'pack-signature'];

        // Version 1 (and older) did not have selectedPackId/manualModuleIds.
        if (version < 2) {
          const selectedPackId =
            packPriority.find((id) => safePrestations.some((p: any) => p?.id === id)) ?? null;

          return {
            ...persistedState,
            prestations: safePrestations,
            modules: safeModules,
            selectedPackId,
            manualModuleIds: safeModules.map((m: any) => m?.id).filter(Boolean),
          };
        }

        // Version 2 -> 3: sanitize potentially inconsistent values.
        const rawSelectedPackId = persistedState?.selectedPackId ?? null;
        const selectedPackId: PackId | null = (PACK_IDS as string[]).includes(rawSelectedPackId)
          ? (rawSelectedPackId as PackId)
          : null;

        const manualModuleIds = Array.isArray(persistedState?.manualModuleIds)
          ? persistedState.manualModuleIds.filter((x: any) => typeof x === 'string')
          : [];

        // If pack id is missing but a pack prestation exists, infer it once.
        const inferredPackId =
          selectedPackId ??
          (packPriority.find((id) => safePrestations.some((p: any) => p?.id === id)) ?? null);

        return {
          ...persistedState,
          prestations: safePrestations,
          modules: safeModules,
          selectedPackId: inferredPackId,
          manualModuleIds,
        };
      },
    }
  )
);