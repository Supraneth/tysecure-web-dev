import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Check, ExternalLink, Loader2 } from "lucide-react";
import { loadInfoDetail } from "@/content/loaders";
import type { InfoDetail } from "@/content/schema";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useComposition, MANDATORY_PRESTATION_IDS } from "@/hooks/useComposition";
import { MODULES_BY_ID } from "@/data/modules";
import { PRESTATIONS_BY_ID } from "@/data/prestations";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { getModuleCustomization, formatEuros } from "@/data/module-customizations";

type Kind = "prestation" | "module";

type Props = {
  kind: Kind;
  id: string;
  /** Label shown on trigger button */
  triggerLabel?: string;
  /** Optional: show next to title while loading */
  defaultTitle?: string;
  /** Optional: show a compact badge (price, etc.) in the header */
  headerBadge?: string;
  /** Button variants */
  triggerVariant?: React.ComponentProps<typeof Button>["variant"];
  triggerClassName?: string;
};

export function InfoDialog({
  kind,
  id,
  triggerLabel = "Plus d'infos",
  defaultTitle,
  headerBadge,
  triggerVariant = "outline",
  triggerClassName,
}: Props) {
  const composition = useComposition();
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = React.useState<InfoDetail | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const requestRef = React.useRef(0);

  React.useEffect(() => {
    // Important: React 18 StrictMode (dev) mounts/unmounts effects twice.
    // Avoid "cancelled" flags that can prevent finally() from clearing loading.
    if (!open) return;
    if (detail) return;

    const reqId = ++requestRef.current;
    setLoading(true);
    setError(null);

    loadInfoDetail(kind, id)
      .then((d) => {
        if (requestRef.current !== reqId) return;
        setDetail(d);
      })
      .catch((e: unknown) => {
        if (requestRef.current !== reqId) return;
        const message = e instanceof Error ? e.message : "Impossible de charger les détails.";
        setError(message);
      })
      .finally(() => {
        if (requestRef.current !== reqId) return;
        setLoading(false);
      });
  }, [open, detail, kind, id]);

  React.useEffect(() => {
    // Reset state when closing so reopening always shows fresh content.
    if (open) return;
    setDetail(null);
    setError(null);
    setLoading(false);
  }, [open]);

  const title = detail?.title ?? defaultTitle ?? "Détails";
  const subtitle = detail?.subtitle;

  // --- Customization state (modules only) ---
  const customization = React.useMemo(() => (kind === "module" ? getModuleCustomization(id) : null), [kind, id]);
  const [variantKey, setVariantKey] = React.useState<string | null>(null);
  const [hardwareProvidedByUser, setHardwareProvidedByUser] = React.useState(false);

  React.useEffect(() => {
    if (!open) {
      setVariantKey(null);
      setHardwareProvidedByUser(false);
      return;
    }
    if (kind !== "module") return;
    if (!customization?.variants?.length) return;
    // Default to the first variant
    setVariantKey((prev) => prev ?? customization.variants![0].key);
  }, [open, kind, customization?.variants]);

  const isCompositionCta =
    !!detail?.cta?.href &&
    (detail.cta.href === "/composition" ||
      detail.cta.href.startsWith("/composition?") ||
      detail.cta.href.startsWith("/composition#"));

  const isAlreadyInComposition = React.useMemo(() => {
    if (!isCompositionCta) return false;
    if (kind === "module") return composition.modules.some((m) => m.id === id);
    return composition.prestations.some((p) => p.id === id);
  }, [composition.modules, composition.prestations, id, isCompositionCta, kind]);

  const isUpdateMode = isCompositionCta && kind === "module" && isAlreadyInComposition;

  const selectedVariant = React.useMemo(() => {
    if (kind !== "module") return null;
    if (!customization?.variants?.length) return null;
    return customization.variants.find((v) => v.key === variantKey) ?? customization.variants[0];
  }, [customization, kind, variantKey]);

  const pricing = React.useMemo(() => {
    if (kind !== "module" || !customization) return null;
    const labor = selectedVariant?.labor ?? customization.default.labor;
    const hardware = selectedVariant?.hardware ?? customization.default.hardware;
    const effectiveHardware = hardwareProvidedByUser ? 0 : hardware;
    const total = labor + effectiveHardware;
    const equipment = selectedVariant?.equipment ?? customization.default.equipment;
    return { labor, hardware, effectiveHardware, total, equipment };
  }, [customization, kind, hardwareProvidedByUser, selectedVariant]);

  const handleAddToComposition = React.useCallback(() => {
    if (!isCompositionCta) return;
    if (kind === "module") {
      const m = MODULES_BY_ID.get(id);
      if (!m) {
        toast.error("Impossible d’ajouter ce module (introuvable).");
        return;
      }

      const laborStr = pricing ? `${formatEuros(pricing.labor)} HT` : undefined;
      const hardwareStr = pricing ? `${formatEuros(pricing.hardware)} HT` : undefined;
      const totalStr = pricing ? `${formatEuros(pricing.total)} HT` : m.price;

      composition.addModule(
        {
          id: m.id,
          name: m.name,
          description: m.description,
          // Use the (possibly customized) total as the module price so the estimate stays consistent.
          price: totalStr,
          laborPrice: laborStr,
          hardwarePrice: hardwareStr,
          hardwareProvidedByUser,
          configKey: selectedVariant?.key ?? undefined,
          configLabel: selectedVariant?.label ?? undefined,
        },
        { source: "manual" }
      );

      toast.success(isUpdateMode ? `Configuration de “${m.name}” mise à jour` : `${m.name} ajouté à votre composition`);
      setOpen(false);
      return;
    }

    const p = PRESTATIONS_BY_ID.get(id);
    if (!p) {
      toast.error("Impossible d’ajouter cette prestation (introuvable).");
      return;
    }
    if (MANDATORY_PRESTATION_IDS.has(p.id)) {
      toast.info("Cette prestation est obligatoire.");
      setOpen(false);
      return;
    }
    composition.addPrestation({ id: p.id, name: p.name, price: p.price, description: p.description });
    toast.success(`${p.name} ajouté à votre composition`);
    setOpen(false);
  }, [composition, hardwareProvidedByUser, id, isCompositionCta, isUpdateMode, kind, pricing, selectedVariant]);

  const renderBudget = () => {
    if (kind !== "module" || !pricing) return null;

    const switchId = `hw-${id}`;

    const laborLabel = pricing.labor > 0 ? `À partir de ${formatEuros(pricing.labor)} HT` : "—";
    const hardwareLabel = hardwareProvidedByUser
      ? "0 € (vous le fournissez)"
      : pricing.hardware > 0
        ? `À partir de ${formatEuros(pricing.hardware)} HT`
        : "—";
    const totalLabel = pricing.total > 0 ? `À partir de ${formatEuros(pricing.total)} HT` : "—";

    return (
      <section className="rounded-2xl border border-border bg-card p-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h4 className="font-display text-lg font-bold">Budget estimatif</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Séparation main d’œuvre / matériel pour éviter les surprises. Ajusté après audit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Switch checked={hardwareProvidedByUser} onCheckedChange={setHardwareProvidedByUser} id={switchId} />
            <label htmlFor={switchId} className="text-sm">
              Je possède déjà le matériel
            </label>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">Main d’œuvre</p>
            <p className="font-semibold mt-1">{laborLabel}</p>
            <p className="text-xs text-muted-foreground mt-1">Installation + configuration + tests</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">Matériel</p>
            <p className="font-semibold mt-1">{hardwareLabel}</p>
            <p className="text-xs text-muted-foreground mt-1">Selon marques, quantités et contraintes</p>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3">
            <p className="text-xs text-muted-foreground">Total estimé</p>
            <p className="font-semibold mt-1">{totalLabel}</p>
            <p className="text-xs text-muted-foreground mt-1">HT, hors options spécifiques</p>
          </div>
        </div>
      </section>
    );
  };

  const renderConfigurator = () => {
    if (kind !== "module" || !customization?.variants?.length) return null;

    return (
      <section>
        <h4 className="font-display text-lg font-bold mb-3">Configurer votre installation</h4>
        <div role="radiogroup" aria-label="Configuration" className="grid gap-3">
          {customization.variants.map((v) => {
            const isSelected = (selectedVariant?.key ?? customization.variants![0].key) === v.key;
            const previewTotal = v.labor + (hardwareProvidedByUser ? 0 : v.hardware);
            const previewLabel = previewTotal > 0 ? `À partir de ${formatEuros(previewTotal)} HT` : "—";
            return (
              <button
                key={v.key}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setVariantKey(v.key)}
                className={cn(
                  "text-left rounded-2xl border p-4 transition-colors",
                  isSelected
                    ? "border-primary/50 bg-primary/10"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{v.label}</p>
                    {v.notes ? <p className="text-xs text-muted-foreground mt-1">{v.notes}</p> : null}
                  </div>
                  <p className="text-sm font-medium text-muted-foreground shrink-0">{previewLabel}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    );
  };

  const renderHardware = () => {
    if (kind !== "module" || !pricing?.equipment?.length) return null;

    return (
      <section>
        <h4 className="font-display text-lg font-bold mb-3">Matériel typique (exemples)</h4>
        <div className="grid gap-3">
          {pricing.equipment.map((e) => (
            <div key={e.label} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{e.label}</p>
                  {e.qty ? <p className="text-xs text-muted-foreground mt-1">Quantité : {e.qty}</p> : null}
                </div>
              </div>
              {e.brands?.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.brands.map((b) => (
                    <Badge key={b} variant="secondary">
                      {b}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
          ))}

          {customization?.notes ? <p className="text-xs text-muted-foreground">{customization.notes}</p> : null}
        </div>
      </section>
    );
  };

  // Note: the dialog can optionally expose an “Ajouter” action.

  const renderMedia = (media: NonNullable<InfoDetail["media"]>[number], idx: number) => {
    const credit = media.credit;

    return (
      <figure key={`${media.src}-${idx}`} className="rounded-2xl overflow-hidden border border-border bg-muted">
        {media.type === "image" ? (
          <AspectRatio ratio={16 / 9}>
            <img
              src={media.src}
              alt={media.alt ?? ""}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 9}>
            <video
              className="h-full w-full object-cover"
              controls
              preload="metadata"
              playsInline
              poster={media.poster}
            >
              <source src={media.src} />
              Votre navigateur ne prend pas en charge la lecture de cette vidéo.
            </video>
          </AspectRatio>
        )}

        {(media.caption || credit?.text || credit?.author || credit?.license || credit?.sourceUrl) && (
          <figcaption className="px-4 py-3 bg-background/80 backdrop-blur">
            {media.caption && <p className="text-sm font-medium">{media.caption}</p>}
            {(credit?.text || credit?.author || credit?.license || credit?.sourceUrl) && (
              <p className="text-xs text-muted-foreground mt-1">
                {credit?.text ? credit.text : null}
                {credit?.author ? (credit?.text ? ` — ${credit.author}` : credit.author) : null}
                {credit?.license ? (credit?.text || credit?.author ? ` • ${credit.license}` : credit.license) : null}
                {credit?.sourceUrl ? (
                  <>
                    {credit?.text || credit?.author || credit?.license ? " • " : null}
                    <a
                      href={credit.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="underline underline-offset-2"
                    >
                      Source
                    </a>
                  </>
                ) : null}
              </p>
            )}
          </figcaption>
        )}
      </figure>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type="button" variant={triggerVariant} className={triggerClassName} onClick={() => setOpen(true)}>
        {triggerLabel}
      </Button>

      <DialogContent className="max-w-[min(92vw,720px)] max-h-[85svh] p-0 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border">
          <DialogHeader>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DialogTitle className="font-display text-xl md:text-2xl font-bold leading-tight">
                  {title}
                </DialogTitle>
                {(subtitle || headerBadge) && (
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {subtitle && (
                      <DialogDescription className="text-sm text-muted-foreground">
                        {subtitle}
                      </DialogDescription>
                    )}
                    {headerBadge && <Badge variant="secondary">{headerBadge}</Badge>}
                  </div>
                )}
              </div>

              {loading && (
                <span className="inline-flex items-center text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span className="sr-only">Chargement</span>
                </span>
              )}
            </div>
          </DialogHeader>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
          {error ? (
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="font-medium">Désolé, un problème est survenu.</p>
              <p className="text-sm text-muted-foreground mt-1">{error}</p>
            </div>
          ) : !detail ? (
            <div className="space-y-3">
              <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />
              <div className="h-4 w-full rounded bg-muted animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-muted animate-pulse" />
              <div className="h-4 w-3/4 rounded bg-muted animate-pulse" />
            </div>
          ) : (
            <div className="space-y-6">
              {detail.media?.length ? (
                <div className="grid gap-4">
                  {detail.media.slice(0, 3).map(renderMedia)}
                </div>
              ) : null}

              <p className="text-base leading-relaxed">{detail.longDescription}</p>

              {renderConfigurator()}
              {renderBudget()}
              {renderHardware()}

              {detail.useCase ? (
                <section className="rounded-2xl border border-border bg-card p-4">
                  <h4 className="font-display text-lg font-bold mb-2">Cas d’usage concret</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{detail.useCase}</p>
                </section>
              ) : null}

              {detail.goodFor?.length ? (
                <section>
                  <h4 className="font-display text-lg font-bold mb-3">Pour qui / quand c’est utile</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-muted-foreground">
                    {detail.goodFor.map((g) => (
                      <li key={g}>{g}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {detail.highlights?.length > 0 && (
                <section>
                  <h4 className="font-display text-lg font-bold mb-3">Points clés</h4>
                  <ul className="space-y-2">
                    {detail.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <Check className="w-4 h-4 mt-1 text-primary flex-none" aria-hidden="true" />
                        <span className="text-sm md:text-base">{h}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {detail.benefits?.length > 0 && (
                <section>
                  <h4 className="font-display text-lg font-bold mb-3">Bénéfices</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-muted-foreground">
                    {detail.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </section>
              )}

              {detail.prerequisites?.length ? (
                <section>
                  <h4 className="font-display text-lg font-bold mb-3">Prérequis</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-muted-foreground">
                    {detail.prerequisites.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {detail.options?.length ? (
                <section>
                  <h4 className="font-display text-lg font-bold mb-3">Options</h4>
                  <div className="grid gap-3">
                    {detail.options.map((o) => (
                      <div key={o.title} className="rounded-xl border border-border bg-card p-4">
                        <p className="font-medium">{o.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{o.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {detail.sections?.length ? (
                <section className="space-y-4">
                  {detail.sections.map((s) => (
                    <div key={s.title} className="rounded-2xl border border-border bg-card p-4">
                      <h4 className="font-display text-lg font-bold">{s.title}</h4>
                      {s.body ? <p className="text-sm md:text-base text-muted-foreground mt-2">{s.body}</p> : null}
                      {s.bullets?.length ? (
                        <ul className="mt-3 space-y-2">
                          {s.bullets.map((b) => (
                            <li key={b} className="flex gap-2">
                              <Check className="w-4 h-4 mt-1 text-primary flex-none" aria-hidden="true" />
                              <span className="text-sm md:text-base">{b}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      {s.media?.length ? <div className="mt-4 grid gap-4">{s.media.map(renderMedia)}</div> : null}
                    </div>
                  ))}
                </section>
              ) : null}

              {(detail.duration || detail.price) && (
                <section className="rounded-xl border border-border bg-card p-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {detail.duration && (
                      <div>
                        <p className="text-muted-foreground">Durée</p>
                        <p className="font-medium">{detail.duration}</p>
                      </div>
                    )}
                    {detail.price && (
                      <div>
                        <p className="text-muted-foreground">Tarif indicatif</p>
                        <p className="font-medium">{detail.price}</p>
                      </div>
                    )}
                  </div>
                  {detail.notes && <p className="text-xs text-muted-foreground mt-3">{detail.notes}</p>}
                </section>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border">
          <DialogFooter className="w-full flex-col sm:flex-row sm:justify-end gap-2">
            {detail?.cta?.href ? (
              isCompositionCta ? (
                <Button
                  type="button"
                  onClick={handleAddToComposition}
                  disabled={kind === "prestation" && isAlreadyInComposition}
                >
                  {kind === "module" && isAlreadyInComposition
                    ? "Mettre à jour ma configuration"
                    : isAlreadyInComposition
                      ? "Déjà dans ma composition"
                      : detail.cta.label}
                </Button>
              ) : detail.cta.href.startsWith("/") ? (
                <Button asChild>
                  <Link to={detail.cta.href}>
                    {detail.cta.label}
                    <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <a href={detail.cta.href} target="_blank" rel="noreferrer noopener">
                    {detail.cta.label}
                    <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                  </a>
                </Button>
              )
            ) : (
              <Button asChild>
                <Link to="/contact">
                  Discuter de mon besoin
                  <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            )}
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
