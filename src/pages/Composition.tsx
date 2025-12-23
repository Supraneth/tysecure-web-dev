import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useComposition, MANDATORY_PRESTATION_IDS } from '@/hooks/useComposition';
import { AFTERCARE_PLANS } from '@/data/aftercare';
import { PRESTATIONS_BY_ID } from '@/data/prestations';
import { MODULES_BY_ID } from '@/data/modules';
import { PACK_INCLUDED_MODULE_IDS, PACK_IDS, type PackId } from '@/data/pack-menus';
import { CheckCircle, ArrowRight, Shield } from 'lucide-react';

/**
 * Extracts a minimum numeric amount from a price string.
 * Examples:
 * - "990€ HT" -> 990
 * - "À partir de 3 900€ HT" -> 3900
 * - "Sur-mesure" -> null
 * - "—" -> null
 */
function extractMinAmount(price?: string | null): number | null {
  if (!price) return null;

  const normalized = price
    .replace(/\u00A0/g, ' ') // non-breaking space
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  // If no digits at all, can't estimate
  if (!/\d/.test(normalized)) return null;

  // Extract first number-like occurrence (supports spaces as thousands sep)
  // e.g. "3 900€", "12 000€", "39€/mois"
  const match = normalized.match(/(\d[\d\s]*)(?=\s*€)/);
  if (!match) return null;

  const asNumber = Number(match[1].replace(/\s/g, ''));
  return Number.isFinite(asNumber) ? asNumber : null;
}

function formatEuros(amount: number): string {
  // French style "3 900 €"
  return new Intl.NumberFormat('fr-FR').format(amount) + ' €';
}

function isFromPrice(price?: string | null): boolean {
  if (!price) return false;
  const p = price.toLowerCase();
  return p.includes('à partir') || p.includes('a partir');
}

function displayFromPrefix(price?: string | null, amount?: number | null): string {
  if (!price) return '';
  // If already says "À partir de", keep it
  if (isFromPrice(price)) return price;
  // If price has a numeric amount, we can show it as "À partir de X"
  if (amount != null) return `À partir de ${formatEuros(amount)} HT`;
  // Otherwise fallback to raw
  return price;
}

export default function Composition() {
  const { prestations, modules, selectedAftercare, resetKeepingMandatory, setSelectedAftercare } = useComposition();

  // Re-sync prestation display/pricing from the latest catalog values.
  // This avoids stale prices when the user edits prices on the Prestations page.
  const syncedPrestations = prestations.map((p) => PRESTATIONS_BY_ID.get(p.id) ?? p);

  // Re-sync module display fields from the latest catalog values,
  // while preserving user customizations (price split, config, etc.).
  const syncedModules = modules.map((m) => {
    const catalog = MODULES_BY_ID.get(m.id);
    if (!catalog) return m;
    return {
      ...catalog,
      ...m,
      // Ensure the catalog remains the source of truth for display labels
      name: catalog.name,
      description: catalog.description,
    };
  });

  // Determine which packs are present in the current composition
  const packIdsInComposition = prestations
    .map((p) => p.id)
    .filter((id): id is PackId => (PACK_IDS as string[]).includes(id));

  // Compute the set of module IDs that are included by any selected pack.
  // These modules are already priced inside the pack base price and must not
  // be billed a second time in the global total.
  const includedModuleIdSet = new Set<string>();
  packIdsInComposition.forEach((packId) => {
    (PACK_INCLUDED_MODULE_IDS[packId] ?? []).forEach((mId) => includedModuleIdSet.add(mId));
  });

  // Only modules that are NOT part of any selected pack should be billed
  // individually. This preserves "extras" while avoiding double counting.
  const billedModules = syncedModules.filter((m) => !includedModuleIdSet.has(m.id));

  const mandatoryPrestations = syncedPrestations.filter((p) => MANDATORY_PRESTATION_IDS.has(p.id));
  const optionalPrestations = syncedPrestations.filter((p) => !MANDATORY_PRESTATION_IDS.has(p.id));

  const hasOptionalContent =
    optionalPrestations.length > 0 ||
    syncedModules.length > 0 ||
    Boolean(selectedAftercare);

  const handleResetComposition = () => {
    resetKeepingMandatory();
  };

  // --- Build price breakdown (min amounts) ---
  const mandatoryPrestationsMin = mandatoryPrestations
    .map((p) => extractMinAmount((p as any).price))
    .filter((n): n is number => n != null)
    .reduce((sum, n) => sum + n, 0);

  const optionalPrestationsMin = optionalPrestations
    .map((p) => extractMinAmount((p as any).price))
    .filter((n): n is number => n != null)
    .reduce((sum, n) => sum + n, 0);

  const modulesMin = billedModules
    .map((m) => extractMinAmount((m as any).price))
    .filter((n): n is number => n != null)
    .reduce((sum, n) => sum + n, 0);

  const aftercareMin = extractMinAmount((selectedAftercare as any)?.price);

  const prestationsMinTotal = mandatoryPrestationsMin + optionalPrestationsMin;
  const globalMinTotal =
    prestationsMinTotal +
    modulesMin +
    (aftercareMin != null ? aftercareMin : 0);

  // Non-estimable items (for transparency)
  const nonEstimablePrestations = syncedPrestations.filter((p) => extractMinAmount((p as any).price) == null);
  const nonEstimableModules = syncedModules.filter((m) => extractMinAmount((m as any).price) == null);
  const aftercareEstimable = selectedAftercare ? extractMinAmount((selectedAftercare as any).price) != null : true;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <section className="section-container">
          {/* Header */}
          <div className="mb-12 text-center">
            <span className="badge-amber mb-4 inline-block">Votre projet</span>
            <h1 className="font-display text-4xl font-bold mb-4">
              Votre <span className="text-gradient">composition</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Le socle obligatoire est inclus par défaut. L’estimation ci-dessous est un <strong>“à partir de”</strong>, basé
              sur les prix indiqués dans les pages Prestations / Modules.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2 space-y-8">
              {/* Mandatory base */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-xl font-bold">Socle obligatoire</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Ces éléments sont nécessaires avant toute construction.
                </p>

                <ul className="space-y-3">
                  {mandatoryPrestations.map((p) => {
                    const rawPrice = (p as any).price as string | undefined;
                    const minAmount = extractMinAmount(rawPrice);

                    const isCompact = p.id === 'audit' || p.id === 'pack-foundation';

                    return (
                      <li
                        key={p.id}
                        className="flex items-start gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20"
                      >
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 shrink-0" />

                        <div className="w-full">
                          {/* ✅ Meilleur responsive : stack en mobile, row en sm+ */}
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                            <p className="font-medium">{p.name}</p>

                            {rawPrice && (
                              <span className="text-sm text-primary font-medium shrink-0">
                                {displayFromPrefix(rawPrice, minAmount)}
                              </span>
                            )}
                          </div>

                          {/* ✅ On enlève la description pour Audit + Pack Foundation */}
                          {!isCompact && (
                            <p className="text-sm text-muted-foreground mt-1">{p.description}</p>
                          )}

                          <span className="mt-1 inline-block text-xs text-primary font-medium">
                            Inclus – obligatoire
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Optional selections */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-display text-xl font-bold mb-4">Options sélectionnées</h2>

                {!hasOptionalContent && (
                  <p className="text-sm text-muted-foreground">
                    Aucune option sélectionnée pour le moment. Vous pouvez ajouter un pack optionnel et/ou des modules.
                  </p>
                )}

                {optionalPrestations.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Packs</h3>
                    <ul className="space-y-2">
                      {optionalPrestations.map((p) => {
                        const rawPrice = (p as any).price as string | undefined;
                        const minAmount = extractMinAmount(rawPrice);
                        return (
                          <li key={p.id} className="flex items-start justify-between gap-4 text-sm">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <span>{p.name}</span>
                            </div>
                            {rawPrice && (
                              <span className="text-muted-foreground shrink-0">
                                {displayFromPrefix(rawPrice, minAmount)}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {syncedModules.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Modules</h3>
                    <ul className="space-y-2">
                      {syncedModules.map((m) => {
                        const rawPrice = (m as any).price as string | undefined;
                        const minAmount = extractMinAmount(rawPrice);
                        const configLabel = (m as any).configLabel as string | undefined;
                        const laborPrice = (m as any).laborPrice as string | undefined;
                        const hardwarePrice = (m as any).hardwarePrice as string | undefined;
                        const hwByUser = Boolean((m as any).hardwareProvidedByUser);
                        const metaBits: string[] = [];
                        if (configLabel) metaBits.push(`Config : ${configLabel}`);
                        if (laborPrice) metaBits.push(`Main d’œuvre : ${laborPrice}`);
                        if (hwByUser) metaBits.push('Matériel : fourni par vous');
                        else if (hardwarePrice) metaBits.push(`Matériel : ${hardwarePrice}`);
                        const meta = metaBits.join(' • ');
                        return (
                          <li key={m.id} className="flex items-start justify-between gap-4 text-sm">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                              <div className="min-w-0">
                                <span className="block">{m.name}</span>
                                {meta ? <span className="block text-xs text-muted-foreground mt-0.5">{meta}</span> : null}
                              </div>
                            </div>
                            {rawPrice && (
                              <span className="text-muted-foreground shrink-0">
                                {displayFromPrefix(rawPrice, minAmount)}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}

                {selectedAftercare && (
                  <div>
                    <h3 className="font-medium mb-2">Aftercare (sélectionné)</h3>
                    <div className="flex items-start justify-between gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span>{selectedAftercare.name}</span>
                      </div>
                      {(selectedAftercare as any).price && (
                        <span className="text-muted-foreground shrink-0">
                          {(selectedAftercare as any).price}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Aftercare selector (band) */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-display text-xl font-bold mb-2">Aftercare</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Optionnel. Pour garder une installation fiable dans le temps (monitoring, mises à jour, support).
                </p>

                {/* Bandeau de sélection */}
                <div className="rounded-2xl border border-border bg-muted/30 p-2">
                  <div className="flex flex-col gap-2 overflow-y-auto max-h-64">
                    {AFTERCARE_PLANS.map((plan) => {
                      const isActive = (selectedAftercare as any)?.id === plan.id;

                      return (
                        <button
                          key={plan.id}
                          type="button"
                          onClick={() => {
                            if (isActive) {
                              setSelectedAftercare(null);
                              return;
                            }
                            setSelectedAftercare(plan);
                          }}
                          className={[
                            'text-left rounded-xl px-4 py-3 border transition-colors',
                            isActive
                              ? 'border-primary/50 bg-primary/10'
                              : 'border-border bg-card hover:border-primary/30',
                          ].join(' ')}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-medium">{plan.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">{plan.price}</p>
                            </div>
                            {isActive && <CheckCircle className="w-5 h-5 text-primary shrink-0" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>


                {/* Détails sélectionnés */}
              </div>
            </div>

            {/* RIGHT COLUMN – SUMMARY */}
            <div className="p-6 rounded-2xl bg-card border border-border h-fit">
              <h2 className="font-display text-xl font-bold mb-4">Estimation</h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span>Prestations (socle + packs)</span>
                  <span className="text-primary font-medium">
                    À partir de {formatEuros(prestationsMinTotal)} HT
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Modules complémentaires</span>
                  <span className="text-primary font-medium">
                    À partir de {formatEuros(modulesMin)} HT
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    modules en plus de ceux compris dans les packs choisis.
                  </span>
                </div>

                {selectedAftercare && (
                  <div className="flex justify-between">
                    <span>Aftercare</span>
                    <span className="text-primary font-medium">
                      {aftercareMin != null ? `À partir de ${formatEuros(aftercareMin)} HT` : 'Sur-mesure'}
                    </span>
                  </div>
                )}

                <div className="pt-3 border-t border-border flex justify-between">
                  <span className="font-medium">Total estimé</span>
                  <span className="text-primary font-bold">
                    À partir de {formatEuros(globalMinTotal)} HT
                  </span>
                </div>
              </div>

              {(nonEstimablePrestations.length > 0 || nonEstimableModules.length > 0 || !aftercareEstimable) && (
                <div className="text-xs text-muted-foreground mb-6">
                  <p className="mb-2">
                    Certains éléments n’ont pas de prix chiffré (“—”, “Sur-mesure”, etc.) et ne sont pas inclus dans
                    l’estimation.
                  </p>
                  {nonEstimablePrestations.length > 0 && (
                    <p>• Prestations non chiffrées : {nonEstimablePrestations.map((p) => p.name).join(', ')}</p>
                  )}
                  {nonEstimableModules.length > 0 && (
                    <p>• Modules non chiffrés : {nonEstimableModules.map((m) => m.name).join(', ')}</p>
                  )}
                  {!aftercareEstimable && selectedAftercare && (
                    <p>• Aftercare non chiffré : {selectedAftercare.name}</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <Link to="/prestations">
                  <Button variant="outline" className="w-full">
                    Modifier ma composition
                  </Button>
                </Link>

                <Link to="/contact">
                  <Button variant="hero" className="w-full group">
                    Prenez contact avec nous
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground"
                  onClick={handleResetComposition}
                >
                  Réinitialiser la composition
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
