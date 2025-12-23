import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

import { Accordion, AccordionContent, AccordionItem } from '@/components/ui/accordion';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';

import { InfoDialog } from '@/components/info/InfoDialog';
import { useComposition, type Prestation, type Aftercare } from '@/hooks/useComposition';
import { PRESTATIONS_CATALOG, PRESTATIONS_BY_ID } from '@/data/prestations';
import { MODULES_CATALOG, MODULES_BY_ID, MODULE_CATEGORIES, type ModuleCatalogItem } from '@/data/modules';
import { PACK_INCLUDED_MODULE_IDS, PACK_IDS, REFERENCE_PACK_IDS, type PackId } from '@/data/pack-menus';
import { AFTERCARE_PLANS } from '@/data/aftercare';
import { toast } from 'sonner';
import {
  ArrowRight,
  Check,
  CheckCircle,
  Plus,
  Lock,
  ClipboardList,
  Sparkles,
  ChevronDown,
  Info,
  HeartHandshake,
} from 'lucide-react';

const prestations: Prestation[] = PRESTATIONS_CATALOG;

function PrestationCard({
  prestation,
  isMandatory = false,
}: {
  prestation: Prestation;
  isMandatory?: boolean;
}) {
  const { prestations: selectedPrestations, addPrestation, removePrestation } = useComposition();
  const isSelected = selectedPrestations.some((p) => p.id === prestation.id);

  const handleToggle = () => {
    if (isMandatory) {
      toast.info('Cette prestation est obligatoire.');
      return;
    }

    if (isSelected) {
      removePrestation(prestation.id);
      toast.info(`${prestation.name} retiré de votre composition`);
    } else {
      addPrestation(prestation);
      toast.success(`${prestation.name} ajouté à votre composition`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-6 rounded-2xl border transition-all duration-300 ${
        isSelected || isMandatory
          ? 'bg-primary/10 border-primary shadow-glow'
          : 'bg-card border-border hover:border-primary/30'
      }`}
    >
      {(isSelected || isMandatory) && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      )}

      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-display text-xl font-bold">{prestation.name}</h3>
        {isMandatory && (
          <span className="mr-auto text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary shrink-0">
            Obligatoire
          </span>
        )}
      </div>

      <p className="price-tag text-2xl mb-4">{prestation.price}</p>
      <p className="text-muted-foreground text-sm mb-6">{prestation.description}</p>

      <div className="grid grid-cols-1 gap-2">
        <InfoDialog
          kind="prestation"
          id={prestation.id}
          defaultTitle={prestation.name}
          headerBadge={prestation.price}
          triggerVariant="outline"
          triggerClassName="w-full"
        />
        <Button
          variant={isSelected || isMandatory ? 'outline' : 'default'}
          className="w-full"
          onClick={handleToggle}
        >
          {isMandatory ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Inclus (obligatoire)
            </>
          ) : isSelected ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Sélectionné
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter à ma composition
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}

function DetailsTab({ label }: { label: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className="
          group inline-flex h-11 w-11 items-center justify-center
          rounded-xl border border-border bg-muted/20
          hover:bg-muted/30 transition
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
        "
        aria-label={label}
      >
        <ChevronDown
          className="
            h-5 w-5 text-muted-foreground
            transition-transform
            group-data-[state=open]:rotate-180
          "
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function PackDetailsTab({ label }: { label: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className="
          group inline-flex h-11 w-11 items-center justify-center
          rounded-xl border border-border bg-muted/20
          hover:bg-muted/30 transition
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
        "
        aria-label={label}
      >
        <ChevronDown
          className="
            h-5 w-5 text-muted-foreground
            transition-transform
            group-data-[state=open]:rotate-180
          "
          aria-hidden="true"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function MandatoryAccordionCard({ prestation }: { prestation: Prestation }) {
  return (
    <AccordionItem value={prestation.id} className="group rounded-2xl overflow-visible">
      <div
        className="
          rounded-2xl border overflow-hidden transition-all duration-300
          bg-primary/10 border-primary shadow-glow
          group-data-[state=open]:border-primary/80
        "
      >
        {/* Header compact */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg md:text-xl font-bold">{prestation.name}</h3>
                <Badge variant="outline">Obligatoire</Badge>
              </div>
              <p className="price-tag text-base mt-1">{prestation.price}</p>
            </div>

            {/* Right: languette + “Inclus” */}
            <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:justify-end">
              <DetailsTab label={`Afficher/masquer les détails de ${prestation.name}`} />

              <Button
                type="button"
                size="sm"
                variant="outline"
                className="w-full sm:w-auto min-w-[120px]"
                disabled
                onClick={(e) => e.stopPropagation()}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Inclus
              </Button>
            </div>
          </div>
        </div>

        {/* Contenu déroulé */}
        <AccordionContent className="px-6 pb-6 pt-0">
          <p className="text-muted-foreground text-sm">{prestation.description}</p>

          <div className="mt-4">
            <InfoDialog
              kind="prestation"
              id={prestation.id}
              defaultTitle={prestation.name}
              headerBadge={prestation.price}
              triggerVariant="outline"
              triggerClassName="w-full"
            />
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}

function PackAccordionCard({
  pack,
  active,
  onToggle,
  includedModules,
  highlight,
}: {
  pack: Prestation;
  active: boolean;
  onToggle: (id: string) => void;
  includedModules: ModuleCatalogItem[];
  highlight?: string;
}) {
  return (
    <AccordionItem value={pack.id} className="group rounded-2xl overflow-visible">
      <div
        className={`
          rounded-2xl border overflow-hidden transition-all duration-300
          ${active ? 'bg-primary/10 border-primary shadow-glow' : 'bg-card border-border hover:border-primary/30'}
          group-data-[state=open]:border-primary/70
        `}
      >
        {/* Header compact */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg md:text-xl font-bold">{pack.name}</h3>
                {highlight && <Badge variant="secondary">{highlight}</Badge>}
                {active && <Badge variant="outline">Sélectionné</Badge>}
              </div>
              <p className="price-tag text-base mt-1">{pack.price}</p>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:justify-end">
              <PackDetailsTab label={`Afficher/masquer les détails de ${pack.name}`} />

              <Button
                type="button"
                size="sm"
                variant={active ? 'outline' : 'default'}
                className="w-full sm:w-auto min-w-[120px]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggle(pack.id);
                }}
              >
                {active ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Ajouté
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Ajouter
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <AccordionContent className="px-6 pb-6 pt-0">
          <p className="text-muted-foreground text-sm whitespace-pre-line">{pack.description}</p>

          {includedModules.length > 0 && (
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Modules inclus automatiquement :
              </p>
              <div className="flex flex-wrap gap-2">
                {includedModules.map((m) => (
                  <span
                    key={m.id}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs"
                  >
                    <m.icon className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                    <span className="text-foreground/90">{m.name}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <InfoDialog
              kind="prestation"
              id={pack.id}
              defaultTitle={pack.name}
              headerBadge={pack.price}
              triggerVariant="outline"
              triggerClassName="w-full"
            />
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}

function ModuleMenuCard({
  module,
  included,
  selected,
  manualSelected,
  onToggle,
}: {
  module: ModuleCatalogItem;
  included: boolean;
  selected: boolean;
  manualSelected: boolean;
  onToggle: () => void;
}) {
  const Icon = module.icon;

  const status = included ? 'Inclus' : manualSelected ? 'Ajouté' : selected ? 'Sélectionné' : 'Optionnel';
  const statusVariant = included ? 'secondary' : manualSelected ? 'default' : 'outline';

  return (
    <motion.div
      layout
      className={`rounded-2xl border p-5 transition-colors ${
        included || manualSelected || selected ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={selected || included}
            onCheckedChange={() => onToggle()}
            disabled={included}
            aria-label={`${included ? 'Inclus' : selected ? 'Retirer' : 'Ajouter'} ${module.name}`}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-display font-bold leading-tight truncate">{module.name}</p>
                  <p className="text-xs text-muted-foreground">{module.price}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Badge variant={statusVariant as any}>{status}</Badge>
              {included && <Lock className="w-4 h-4 text-primary" aria-hidden="true" />}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-3">{module.description}</p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <InfoDialog
              kind="module"
              id={module.id}
              defaultTitle={module.name}
              headerBadge={module.price}
              triggerVariant="outline"
              triggerClassName="w-full"
            />
            <Button
              type="button"
              variant={included || selected ? 'outline' : 'default'}
              className="w-full"
              onClick={onToggle}
              disabled={included}
            >
              {included ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Inclus
                </>
              ) : selected ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Sélectionné
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Ajouter
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AftercareInfoDialog({ plan }: { plan: Aftercare }) {
  const extra = useMemo(() => {
    switch (plan.id) {
      case 'care-essential':
        return {
          title: 'À quoi sert Care Essential ?',
          body: `Idéal si vous voulez une installation fiable dans la durée, sans y penser.
On surveille la disponibilité, on applique les mises à jour de sécurité et vous avez un support structuré.`,
          forWho: ['Installations “standard”', 'Besoin de suivi simple et clair', 'Priorité : stabilité & sécurité'],
        };
      case 'care-plus':
        return {
          title: 'À quoi sert Care Plus ?',
          body: `Pour ceux qui veulent aller plus loin : maintenance proactive, optimisations régulières, et support prioritaire.`,
          forWho: ['Maison très utilisée au quotidien', 'Plus d’automatisations / modules', 'Vous voulez un suivi plus actif'],
        };
      case 'care-premium':
      default:
        return {
          title: 'À quoi sert Care Premium ?',
          body: `Accompagnement sur-mesure : engagements spécifiques, environnements complexes ou exigences élevées (sécurité, disponibilité, périmètre).`,
          forWho: ['Projets sensibles / complexes', 'Exigences élevées', 'Périmètre & engagements personnalisés'],
        };
    }
  }, [plan.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Info className="w-4 h-4 mr-2" />
          Comprendre l’offre
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[min(92vw,720px)] max-h-[85svh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-xl md:text-2xl font-bold">
            {plan.name}
          </DialogTitle>
          <DialogDescription>
            {plan.price} — {plan.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">{extra.title}</p>
            <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">{extra.body}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">Inclus (résumé)</p>
            <ul className="mt-2 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 mt-0.5 text-primary flex-none" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">Pour qui ?</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-sm text-muted-foreground">
              {extra.forWho.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="font-medium">Bon à savoir</p>
            <p className="text-sm text-muted-foreground mt-1">
              Les tarifs sont indicatifs (à partir de). Le périmètre exact dépend de votre installation et des modules choisis.
            </p>
          </div>

          <Link to="/contact" className="block">
            <Button variant="hero" className="w-full">
              Discuter de mon besoin
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AftercareAccordionCard({
  plan,
  active,
  onToggle,
}: {
  plan: Aftercare;
  active: boolean;
  onToggle: (plan: Aftercare) => void;
}) {
  return (
    <AccordionItem value={plan.id} className="group rounded-2xl overflow-visible">
      <div
        className={`
          rounded-2xl border overflow-hidden transition-all duration-300
          ${active ? 'bg-primary/10 border-primary shadow-glow' : 'bg-card border-border hover:border-primary/30'}
          group-data-[state=open]:border-primary/70
        `}
      >
        {/* Header compact */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] items-start gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-lg md:text-xl font-bold">{plan.name}</h3>
                <Badge variant="outline">Optionnel</Badge>
                {active && <Badge variant="outline">Sélectionné</Badge>}
              </div>
              <p className="price-tag text-base mt-1">{plan.price}</p>
            </div>

            <div className="grid grid-cols-2 sm:flex items-center gap-2 sm:justify-end">
              <PackDetailsTab label={`Afficher/masquer les détails de ${plan.name}`} />

              <Button
                type="button"
                size="sm"
                variant={active ? 'outline' : 'default'}
                className="w-full sm:w-auto min-w-[120px]"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggle(plan);
                }}
              >
                {active ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Ajouté
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <AccordionContent className="px-6 pb-6 pt-0">
          <p className="text-muted-foreground text-sm">{plan.description}</p>

          <div className="mt-4 rounded-xl border border-border bg-muted/20 p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">Ce qui est inclus :</p>
            <ul className="space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5" aria-hidden="true" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
            <AftercareInfoDialog plan={plan} />
            <Link to="/contact" className="block">
              <Button variant="outline" className="w-full">
                Poser une question
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Button>
            </Link>
          </div>
        </AccordionContent>
      </div>
    </AccordionItem>
  );
}

function SelectionSummary({
  selectedPacks,
  includedModules,
  addedModules,
  selectedAftercare,
  onReset,
}: {
  selectedPacks: Prestation[];
  includedModules: ModuleCatalogItem[];
  addedModules: ModuleCatalogItem[];
  selectedAftercare: Aftercare | null;
  onReset: () => void;
}) {
  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <ClipboardList className="w-5 h-5 text-primary" aria-hidden="true" />
        <h2 className="font-display text-xl font-bold">Récapitulatif</h2>
      </div>

      <div className="space-y-5 text-sm">
        <div>
          <p className="text-muted-foreground">Pack(s) choisi(s)</p>
          {selectedPacks.length > 0 ? (
            <ul className="mt-1 space-y-1">
              {selectedPacks.map((pack) => (
                <li key={pack.id} className="flex items-center justify-between gap-2">
                  <span className="font-medium">{pack.name}</span>
                  <span className="text-xs text-muted-foreground">{pack.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-1 font-medium">Aucun pack — à la carte</p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Modules inclus</p>
          {includedModules.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {includedModules.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 min-w-0">
                    <CheckCircle className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="truncate">{m.name}</span>
                  </span>
                  <span className="text-muted-foreground shrink-0">{m.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-muted-foreground">—</p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Modules ajoutés manuellement</p>
          {addedModules.length > 0 ? (
            <ul className="mt-2 space-y-1">
              {addedModules.map((m) => (
                <li key={m.id} className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 min-w-0">
                    <Plus className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span className="truncate">{m.name}</span>
                  </span>
                  <span className="text-muted-foreground shrink-0">{m.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-muted-foreground">—</p>
          )}
        </div>

        <div>
          <p className="text-muted-foreground">Accompagnement (Care)</p>
          {selectedAftercare ? (
            <div className="mt-2 rounded-xl border border-border bg-muted/20 p-3">
              <p className="font-medium flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-primary" aria-hidden="true" />
                <span>{selectedAftercare.name}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{selectedAftercare.price}</p>
            </div>
          ) : (
            <p className="mt-2 text-muted-foreground">—</p>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-2">
        <Link to="/composition">
          <Button variant="hero" className="w-full group">
            Voir ma composition
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </Link>
        <Link to="/contact">
          <Button variant="outline" className="w-full">
            Discuter de mon besoin
          </Button>
        </Link>
        <Button variant="ghost" className="w-full text-muted-foreground" onClick={onReset}>
          Réinitialiser les options
        </Button>
      </div>
    </div>
  );
}

export default function Prestations() {
  const {
    prestations: selectedPrestations,
    modules: selectedModules,
    manualModuleIds,
    selectedAftercare,
    setSelectedAftercare,
    addPrestation,
    removePrestation,
    addModule,
    removeModule,
    resetKeepingMandatory,
  } = useComposition();

  const [summaryOpen, setSummaryOpen] = useState(false);

  // --- Mandatory base (idempotent) ---
  useEffect(() => {
    const mandatoryIds = new Set(['audit', 'pack-foundation']);
    const selectedIds = new Set(selectedPrestations.map((p) => p.id));
    prestations.forEach((p) => {
      if (mandatoryIds.has(p.id) && !selectedIds.has(p.id)) {
        addPrestation(p);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mandatoryPrestations = useMemo(
    () => prestations.filter((p) => p.id === 'audit' || p.id === 'pack-foundation'),
    []
  );

  const selectedPackIds = useMemo(
    () =>
      selectedPrestations
        .map((p) => p.id)
        .filter((id): id is PackId => (PACK_IDS as string[]).includes(id)),
    [selectedPrestations]
  );

  const includedModuleIds = useMemo(() => {
    const ids = new Set<string>();
    selectedPackIds.forEach((packId) => {
      (PACK_INCLUDED_MODULE_IDS[packId] ?? []).forEach((mId) => ids.add(mId));
    });
    return Array.from(ids);
  }, [selectedPackIds]);

  // --- Auto-include modules when packs selection changes ---
  const prevPackIdsRef = useRef<PackId[]>([]);
  useEffect(() => {
    const prevPackIds = prevPackIdsRef.current;
    const prevIncluded = new Set<string>();
    prevPackIds.forEach((packId) => {
      (PACK_INCLUDED_MODULE_IDS[packId] ?? []).forEach((mId) => prevIncluded.add(mId));
    });

    const nextIncluded = new Set(includedModuleIds);
    const manualSet = new Set(manualModuleIds);

    prevIncluded.forEach((id) => {
      if (!nextIncluded.has(id) && !manualSet.has(id)) {
        removeModule(id, { source: 'pack' });
      }
    });

    nextIncluded.forEach((id) => {
      if (!prevIncluded.has(id)) {
        const m = MODULES_BY_ID.get(id);
        if (!m) return;
        addModule({ id: m.id, name: m.name, price: m.price, description: m.description }, { source: 'pack' });
      }
    });

    prevPackIdsRef.current = selectedPackIds;
  }, [selectedPackIds, includedModuleIds, manualModuleIds, addModule, removeModule]);

  const referencePacks = useMemo(() => {
    const ids = new Set(REFERENCE_PACK_IDS);
    return prestations.filter((p) => ids.has(p.id as PackId));
  }, []);

  const premiumPack = useMemo(
    () => prestations.find((p) => p.id === 'pack-signature') ?? null,
    []
  );

  const selectedPacks = useMemo(
    () =>
      selectedPackIds
        .map((id) => PRESTATIONS_BY_ID.get(id))
        .filter(Boolean) as Prestation[],
    [selectedPackIds]
  );

  const primarySelectedPack = selectedPacks[0] ?? null;

  const includedSet = useMemo(() => new Set(includedModuleIds), [includedModuleIds]);
  const selectedModuleIdSet = useMemo(
    () => new Set(selectedModules.map((m) => m.id)),
    [selectedModules]
  );
  const manualIdSet = useMemo(() => new Set(manualModuleIds), [manualModuleIds]);

  const includedModules = useMemo(
    () => includedModuleIds.map((id) => MODULES_BY_ID.get(id)).filter(Boolean) as ModuleCatalogItem[],
    [includedModuleIds]
  );

  const addedModules = useMemo(() => {
    const extraIds = manualModuleIds.filter((id) => !includedSet.has(id));
    return extraIds
      .filter((id) => selectedModuleIdSet.has(id))
      .map((id) => MODULES_BY_ID.get(id))
      .filter(Boolean) as ModuleCatalogItem[];
  }, [manualModuleIds, includedSet, selectedModuleIdSet]);

  const handleSelectPack = (next: string) => {
    if (next === 'none') {
      selectedPackIds.forEach((id) => removePrestation(id));
      toast.info('Sélection "à la carte" activée (aucun pack sélectionné).');
      return;
    }

    const packId = next as PackId;
    const alreadySelected = selectedPackIds.includes(packId);
    const pack = PRESTATIONS_BY_ID.get(packId);

    if (alreadySelected) {
      removePrestation(packId);
      toast.info(`${pack?.name ?? 'Pack'} retiré de votre composition`);
      return;
    }

    const rawPack = prestations.find((p) => p.id === packId) as any | undefined;
    const isCombinable = rawPack?.combinable ?? true;

    if (!isCombinable) {
      selectedPackIds.forEach((id) => removePrestation(id));
    } else {
      selectedPackIds.forEach((id) => {
        const existing = prestations.find((p) => p.id === id) as any | undefined;
        if (existing && existing.combinable === false) {
          removePrestation(id);
        }
      });
    }

    if (pack) {
      addPrestation(pack);
      toast.success(`${pack.name} ajouté à votre composition`);
    } else {
      toast.success('Pack ajouté à votre composition');
    }
  };

  const handleToggleModule = (module: ModuleCatalogItem) => {
    if (includedSet.has(module.id)) {
      toast.info('Ce module est inclus via votre pack.');
      return;
    }

    const isSelected = selectedModuleIdSet.has(module.id);
    if (isSelected) {
      removeModule(module.id);
      toast.info(`${module.name} retiré de votre composition`);
    } else {
      addModule({ id: module.id, name: module.name, price: module.price, description: module.description });
      toast.success(`${module.name} ajouté à votre composition`);
    }
  };

  const handleToggleAftercare = (plan: Aftercare) => {
    const isActive = selectedAftercare?.id === plan.id;
    setSelectedAftercare(isActive ? null : plan);
    toast.info(isActive ? `Accompagnement retiré : ${plan.name}` : `Accompagnement ajouté : ${plan.name}`);
  };

  const handleResetOptions = () => {
    resetKeepingMandatory();
    toast.info('Votre composition a été réinitialisée (socle conservé).');
  };

  const packCards = useMemo(() => {
    const withModules = (pack: Prestation) => {
      const packId = pack.id as PackId;
      const ids = PACK_INCLUDED_MODULE_IDS[packId] ?? [];
      const inc = ids.map((id) => MODULES_BY_ID.get(id)).filter(Boolean) as ModuleCatalogItem[];
      return { pack, included: inc };
    };
    const cards = referencePacks.map(withModules);
    if (premiumPack) cards.push(withModules(premiumPack));
    return cards;
  }, [referencePacks, premiumPack]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-24 lg:pb-16">
        {/* Hero */}
        <section className="py-16">
          <div className="section-container text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge-amber mb-4 inline-block">Nos offres</span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Votre <span className="text-gradient">choix modulaire</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                Avec TySecure, vous composez librement une solution adaptée à votre logement et à vos usages.
                Parce que chaque foyer possède des besoins qui lui sont propres,
                nous concevons et intégrons des systèmes sur mesure,
                capables de s’adapter à toutes les configurations et à toutes les évolutions.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* MAIN */}
            <div className="lg:col-span-2 space-y-10">
              {/* Bloc 1: socle */}
              <section className="py-2" aria-labelledby="socle-title">
                <div className="mb-6">
                  <h2 id="socle-title" className="font-display text-2xl md:text-3xl font-bold mb-2">
                    1. Socle <span className="text-gradient">obligatoire</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Toute installation TySecure débute par une phase d’audit approfondie. L’audit correspond à une visite
                    à domicile essentielle, permettant d’analyser votre environnement, vos usages et vos contraintes afin
                    de concevoir une solution parfaitement adaptée à vos besoins, sans compromis sur la sécurité, la
                    fiabilité et l’évolutivité.
                    <br />
                    <br />
                    Le Pack Foundation constitue la base technique incontournable de votre infrastructure connectée. Il
                    garantit la cohérence et la pérennité de l’ensemble des modules déployés par la suite. Il est donc
                    obligatoirement inclus dans toutes nos prestations, afin d’assurer un niveau d’exigence et de qualité
                    constant sur chaque projet.
                  </p>
                </div>

                <Accordion type="multiple" className="space-y-4">
                  {mandatoryPrestations.map((prestation) => (
                    <MandatoryAccordionCard key={prestation.id} prestation={prestation} />
                  ))}
                </Accordion>
              </section>

              {/* Bloc 2: choisir un pack */}
              <section className="py-2" aria-labelledby="packs-title">
                <div className="mb-6">
                  <h2 id="packs-title" className="font-display text-2xl md:text-3xl font-bold mb-2">
                    2. Choisir un <span className="text-gradient">pack</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Les packs sont des ensembles de modules répondant à un besoin précis : (sécurité, économie d&apos;énergie, confort de vie, etc.).
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Option "sans pack" */}
                  <motion.div
                    layout
                    className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                      selectedPackIds.length === 0
                        ? 'bg-primary/10 border-primary shadow-glow'
                        : 'bg-card border-border hover:border-primary/30'
                    }`}
                    onClick={() => handleSelectPack('none')}
                  >
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-lg md:text-xl font-bold">Aucun pack</h3>
                          <Badge variant="outline">À la carte</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Vous choisissez uniquement les modules qui vous intéressent.
                        </p>

                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <Button
                            type="button"
                            variant={selectedPackIds.length === 0 ? 'outline' : 'default'}
                            className="w-full"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectPack('none');
                            }}
                          >
                            {selectedPackIds.length === 0 ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                Sélection "à la carte"
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 mr-2" />
                                Choisir "à la carte"
                              </>
                            )}
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            className="w-full group"
                            onClick={(e) => {
                              e.stopPropagation();
                              document.getElementById('modules-a-la-carte')?.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                              });
                            }}
                          >
                            Aller aux modules à la carte
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Packs en accordéon */}
                  <Accordion type="single" collapsible className="space-y-4">
                    {packCards.map(({ pack, included }) => (
                      <PackAccordionCard
                        key={pack.id}
                        pack={pack}
                        active={selectedPackIds.includes(pack.id as PackId)}
                        onToggle={handleSelectPack}
                        includedModules={included}
                        highlight={pack.id === 'pack-sentinel' ? 'Recommandé' : undefined}
                      />
                    ))}
                  </Accordion>
                </div>
              </section>

              {/* Bloc 3: modules à la carte */}
              <section
                id="modules-a-la-carte"
                className="py-2 scroll-mt-28 md:scroll-mt-32"
                aria-labelledby="modules-title"
              >
                <div className="mb-6">
                  <h2 id="modules-title" className="font-display text-2xl md:text-3xl font-bold mb-2">
                    3. Compléter votre offre avec des modules <span className="text-gradient">à la carte</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Les modules inclus par le pack sont marqués <strong>Inclus</strong> et verrouillés. Vous pouvez ajouter
                    d&apos;autres modules en complément.
                  </p>
                </div>

                <Accordion
                  type="multiple"
                  defaultValue={[MODULE_CATEGORIES[0]?.id ?? 'Sécurité']}
                  className="rounded-2xl border border-border overflow-hidden"
                >
                  {MODULE_CATEGORIES.map((cat) => {
                    const items = MODULES_CATALOG.filter((m) => m.category === cat.id);
                    if (items.length === 0) return null;

                    return (
                      <AccordionItem key={cat.id} value={cat.id} className="border-b border-border last:border-b-0">
                        <AccordionPrimitive.Header className="flex">
                          <AccordionPrimitive.Trigger
                            className="
                              group flex w-full items-center justify-between gap-3
                              px-6 py-4 text-left
                              hover:bg-muted/20 transition
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40
                            "
                          >
                            {/* Left: label + compteur */}
                            <div className="flex items-center justify-between w-full min-w-0">
                              <span className="font-display font-bold truncate">{cat.label}</span>
                              <span className="text-xs text-muted-foreground mr-4 shrink-0">
                                {items.length} module{items.length > 1 ? 's' : ''}
                              </span>
                            </div>

                            {/* Right: chevron */}
                            <ChevronDown
                              className="
                                h-5 w-5 text-muted-foreground shrink-0
                                transition-transform duration-200
                                group-data-[state=open]:rotate-180
                              "
                              aria-hidden="true"
                            />
                          </AccordionPrimitive.Trigger>
                        </AccordionPrimitive.Header>

                        <AccordionContent className="px-6 pb-6">
                          <div className="grid grid-cols-1 gap-4">
                            {items.map((m) => {
                              const included = includedSet.has(m.id);
                              const selected = selectedModuleIdSet.has(m.id);
                              const manualSelected = manualIdSet.has(m.id) && !included;

                              return (
                                <ModuleMenuCard
                                  key={m.id}
                                  module={m}
                                  included={included}
                                  selected={selected}
                                  manualSelected={manualSelected}
                                  onToggle={() => handleToggleModule(m)}
                                />
                              );
                            })}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </section>

              {/* ✅ Bloc 4: se faire accompagner */}
              <section className="py-2" aria-labelledby="aftercare-title">
                <div className="mb-6">
                  <h2 id="aftercare-title" className="font-display text-2xl md:text-3xl font-bold mb-2">
                    4. Se faire accompagner <span className="text-gradient">(optionnel)</span>
                  </h2>
                  <p className="text-muted-foreground max-w-2xl">
                    Pour garder une installation fiable dans le temps : monitoring, mises à jour, support et maintenance proactive.
                    Choisissez un plan Care (vous pourrez le modifier ou le retirer à tout moment).
                  </p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {AFTERCARE_PLANS.map((plan) => (
                    <AftercareAccordionCard
                      key={plan.id}
                      plan={plan}
                      active={selectedAftercare?.id === plan.id}
                      onToggle={handleToggleAftercare}
                    />
                  ))}
                </Accordion>
              </section>

              {/* Bloc recap (non-sticky, visible on all screens) */}
              <section className="py-2 lg:hidden">
                <SelectionSummary
                  selectedPacks={selectedPacks}
                  includedModules={includedModules}
                  addedModules={addedModules}
                  selectedAftercare={selectedAftercare}
                  onReset={handleResetOptions}
                />
              </section>
            </div>

            {/* ASIDE SUMMARY (desktop) */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <SelectionSummary
                  selectedPacks={selectedPacks}
                  includedModules={includedModules}
                  addedModules={addedModules}
                  selectedAftercare={selectedAftercare}
                  onReset={handleResetOptions}
                />
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Mobile sticky recap */}
      <div className="sticky-cta lg:hidden">
        <div className="section-container">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">
                {primarySelectedPack ? primarySelectedPack.name : 'À la carte'}
              </p>
              <p className="text-xs text-muted-foreground">
                Inclus : {includedModules.length} • Ajoutés : {addedModules.length} • Care : {selectedAftercare ? 1 : 0}
              </p>
            </div>
            <Button variant="hero" onClick={() => setSummaryOpen(true)} className="shrink-0">
              Récap
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>

      <Drawer open={summaryOpen} onOpenChange={setSummaryOpen}>
        <DrawerContent className="h-[85svh] max-h-[85svh] overflow-hidden">
          <DrawerHeader className="shrink-0">
            <DrawerTitle>Récapitulatif</DrawerTitle>
            <DrawerDescription>Vérifiez votre pack, les modules inclus, vos ajouts à la carte et l’accompagnement.</DrawerDescription>
          </DrawerHeader>

          <div
            className="
              flex-1 min-h-0
              overflow-y-auto overscroll-contain
              px-4 pb-[calc(theme(spacing.4)+env(safe-area-inset-bottom))]
              [-webkit-overflow-scrolling:touch]
            "
          >
            <SelectionSummary
              selectedPacks={selectedPacks}
              includedModules={includedModules}
              addedModules={addedModules}
              selectedAftercare={selectedAftercare}
              onReset={handleResetOptions}
            />
          </div>

          <DrawerFooter className="shrink-0 pb-[calc(theme(spacing.4)+env(safe-area-inset-bottom))]">
            <DrawerClose asChild>
              <Button variant="outline">Fermer</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Footer />
    </div>
  );
}
