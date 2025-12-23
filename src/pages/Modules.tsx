import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { InfoDialog } from '@/components/info/InfoDialog';
import { useComposition } from '@/hooks/useComposition';
import { 
  ArrowRight, 
  Plus,
  Check,
  Lock,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

import { MODULES_CATALOG, MODULE_CATEGORIES, type ModuleCatalogItem } from '@/data/modules';
import { PACK_INCLUDED_MODULE_IDS, PACK_IDS, type PackId } from '@/data/pack-menus';

function ModuleCard({ module }: { module: ModuleCatalogItem }) {
  const { prestations, modules: selectedModules, addModule, removeModule } = useComposition();
  const packIds = prestations
    .map((p) => p.id)
    .filter((id): id is PackId => (PACK_IDS as string[]).includes(id));
  const includedByPack = new Set<string>();
  packIds.forEach((id) => {
    (PACK_INCLUDED_MODULE_IDS[id] ?? []).forEach((mId) => includedByPack.add(mId));
  });
  const isSelected = selectedModules.some((m) => m.id === module.id);
  const isIncluded = includedByPack.has(module.id);
  const Icon = module.icon;

  const handleToggle = () => {
    if (isIncluded) {
      toast.info('Ce module est inclus via votre pack. Modifiez le pack depuis la page Prestations.');
      return;
    }
    if (isSelected) {
      removeModule(module.id);
      toast.info(`${module.name} retiré de votre composition`);
    } else {
      addModule({ id: module.id, name: module.name, price: module.price, description: module.description });
      toast.success(`${module.name} ajouté à votre composition`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative p-6 rounded-2xl border transition-all duration-300 ${
        isSelected || isIncluded
          ? 'bg-primary/10 border-primary shadow-glow' 
          : 'bg-card border-border hover:border-primary/30'
      }`}
    >
      {(isSelected || isIncluded) && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      )}

      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      
      <h3 className="font-display text-lg font-bold mb-2">{module.name}</h3>
      <p className="price-tag text-xl mb-3">{module.price}</p>
      <p className="text-muted-foreground text-sm mb-6">{module.description}</p>

      {isIncluded && (
        <p className="text-xs text-primary font-medium mb-4 flex items-center gap-2">
          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
          Inclus via votre pack
        </p>
      )}
      
      <div className="grid grid-cols-1 gap-2">
      <InfoDialog
        kind="module"
        id={module.id}
        defaultTitle={module.name}
        headerBadge={module.price}
        triggerVariant="outline"
        triggerClassName="w-full"
      />
      <Button 
        variant={isSelected || isIncluded ? "outline" : "default"}
        className="w-full"
        onClick={handleToggle}
        disabled={isIncluded}
      >
        {isIncluded ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Inclus
          </>
        ) : isSelected ? (
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
    </motion.div>
  );
}

export default function Modules() {
  const { getTotalItems } = useComposition();
  const totalItems = getTotalItems();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('');

  const [openCats, setOpenCats] = useState<string[]>([]);
  const [openSubs, setOpenSubs] = useState<Record<string, string[]>>({});
  const hasInitialized = useRef(false);

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const normalizedQuery = query.trim().toLowerCase();

  const grouped = useMemo(() => {
    const matches = (m: ModuleCatalogItem) => {
      if (!normalizedQuery) return true;
      const haystack = `${m.name} ${m.description} ${m.category} ${m.subcategory ?? ''}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    };

    return MODULE_CATEGORIES.map((cat) => {
      const items = MODULES_CATALOG.filter((m) => m.category === cat.id).filter(matches);
      const bySub = new Map<string, ModuleCatalogItem[]>();

      items.forEach((m) => {
        const key = m.subcategory ?? 'Autres';
        bySub.set(key, [...(bySub.get(key) ?? []), m]);
      });

      return {
        cat,
        catKey: slugify(cat.id),
        bySub,
      };
    }).filter((x) => x.bySub.size > 0);
  }, [normalizedQuery]);

  const navModel = useMemo(() => {
    const categories = grouped.map(({ cat, catKey, bySub }) => {
      const subcategories = Array.from(bySub.entries()).map(([label, items]) => ({
        label,
        key: slugify(label),
        count: items.length,
      }));

      const total = Array.from(bySub.values()).flat().length;
      return { id: cat.id, label: cat.label, key: catKey, count: total, subcategories };
    });

    return {
      categories,
      total: categories.reduce((acc, c) => acc + c.count, 0),
    };
  }, [grouped]);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const ensureCatOpen = (catKey: string) => {
    setOpenCats((prev) => (prev.includes(catKey) ? prev : [...prev, catKey]));
  };

  const ensureSubOpen = (catKey: string, subKey: string) => {
    setOpenSubs((prev) => {
      const current = prev[catKey] ?? [];
      if (current.includes(subKey)) return prev;
      return { ...prev, [catKey]: [...current, subKey] };
    });
  };

  const openAll = () => {
    const allCatKeys = navModel.categories.map((c) => c.key);
    const nextSubs: Record<string, string[]> = {};
    navModel.categories.forEach((c) => {
      nextSubs[c.key] = c.subcategories.map((s) => s.key);
    });
    setOpenCats(allCatKeys);
    setOpenSubs(nextSubs);
  };

  const closeAll = () => {
    setOpenCats([]);
    setOpenSubs({});
  };

  // Initialize defaults once (first non-empty category open)
  useEffect(() => {
    if (hasInitialized.current) return;
    if (navModel.categories.length === 0) return;

    hasInitialized.current = true;
    const first = navModel.categories[0];
    setActiveCategory(first.key);
    setOpenCats([first.key]);
  }, [navModel.categories]);

  // When searching, automatically expand matching categories/subcategories.
  useEffect(() => {
    if (!normalizedQuery) return;
    openAll();
  }, [normalizedQuery]);

  // Keep active subcategory valid when category changes.
  useEffect(() => {
    const cat = navModel.categories.find((c) => c.key === activeCategory);
    if (!cat) {
      setActiveSubcategory('');
      return;
    }
    if (!activeSubcategory) return;
    const stillExists = cat.subcategories.some((s) => s.key === activeSubcategory);
    if (!stillExists) setActiveSubcategory('');
  }, [activeCategory, activeSubcategory, navModel.categories]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="top" className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16">
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="badge-amber mb-4 inline-block">Extensions</span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Modules <span className="text-gradient">complémentaires</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Enrichissez votre installation avec des fonctionnalités spécialisées. 
                Chaque module est conçu pour s'intégrer parfaitement à votre système.
              </p>

              <div className="mt-8" />
              <div className="mt-8 flex justify-center">
                <Link to="/accompagnement#offres">
                  <Button variant="secondary" className="group">
                    Compléter avec une offre d'accompagnement
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Navigation + recherche */}
        <section className="py-6">
          <div className="section-container">
            <div className="md:sticky md:top-24 md:z-20">
              <div className="rounded-2xl border border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/90 p-4 md:p-5">
                <div className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-end gap-3">
                  <div className="flex-1">
                    <label className="text-sm font-medium" htmlFor="modules-search">
                      Rechercher
                    </label>
                    <div className="relative mt-2">
                      <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                      <Input
                        id="modules-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Ex : détecteur, alarme, chauffage, NAS…"
                        className="pl-9"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {navModel.total} module{navModel.total > 1 ? 's' : ''}{normalizedQuery ? ` correspondant${navModel.total > 1 ? 's' : ''}` : ''}.
                    </p>
                  </div>

                  <div className="w-full md:w-[260px]">
                    <label className="text-sm font-medium">Catégorie</label>
                    <Select
                      value={activeCategory}
                      onValueChange={(v) => {
                        setActiveCategory(v);
                        setActiveSubcategory('');
                        ensureCatOpen(v);
                        // scroll after UI updates
                        setTimeout(() => scrollToId(`cat-${v}`), 50);
                      }}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Choisir une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {navModel.categories.map((c) => (
                          <SelectItem key={c.key} value={c.key}>
                            {c.label} ({c.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-[280px]">
                    <label className="text-sm font-medium">Sous-catégorie</label>
                    <Select
                      value={activeSubcategory}
                      onValueChange={(v) => {
                        setActiveSubcategory(v);
                        if (!activeCategory) return;
                        ensureCatOpen(activeCategory);
                        ensureSubOpen(activeCategory, v);
                        setTimeout(() => scrollToId(`sub-${activeCategory}-${v}`), 80);
                      }}
                      disabled={!activeCategory}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={activeCategory ? 'Choisir une sous-catégorie' : 'Choisir une catégorie d’abord'} />
                      </SelectTrigger>
                      <SelectContent>
                        {(navModel.categories.find((c) => c.key === activeCategory)?.subcategories ?? []).map((s) => (
                          <SelectItem key={s.key} value={s.key}>
                            {s.label} ({s.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" size="sm" className="rounded-full" onClick={openAll}>
                      Tout ouvrir
                    </Button>
                    <Button variant="secondary" size="sm" className="rounded-full" onClick={closeAll}>
                      Tout fermer
                    </Button>
                    {normalizedQuery && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                        onClick={() => setQuery('')}
                      >
                        Effacer la recherche
                      </Button>
                    )}
                  </div>

                  <a href="#top" className="text-sm text-muted-foreground link-underline">
                    Retour en haut
                  </a>
                </div>

                {/* Accès rapide (catégories / sous-catégories) */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Accès rapide</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {navModel.categories.map((c) => (
                      <Button
                        key={c.key}
                        variant={activeCategory === c.key ? 'default' : 'secondary'}
                        size="sm"
                        className="rounded-full shrink-0"
                        onClick={() => {
                          setActiveCategory(c.key);
                          setActiveSubcategory('');
                          ensureCatOpen(c.key);
                          setTimeout(() => scrollToId(`cat-${c.key}`), 50);
                        }}
                      >
                        {c.label}
                      </Button>
                    ))}
                  </div>

                  {activeCategory && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {(navModel.categories.find((c) => c.key === activeCategory)?.subcategories ?? []).map((s) => (
                        <Button
                          key={s.key}
                          variant={activeSubcategory === s.key ? 'outline' : 'secondary'}
                          size="sm"
                          className="rounded-full shrink-0"
                          onClick={() => {
                            setActiveSubcategory(s.key);
                            ensureCatOpen(activeCategory);
                            ensureSubOpen(activeCategory, s.key);
                            setTimeout(() => scrollToId(`sub-${activeCategory}-${s.key}`), 80);
                          }}
                        >
                          {s.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
	        </div>
        </section>

        {/* Modules catalog */}
        <section className="py-8">
          <div className="section-container">
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <Accordion type="multiple" value={openCats} onValueChange={setOpenCats} className="px-4 md:px-6">
                {grouped.map(({ cat, catKey, bySub }) => {
                  const total = Array.from(bySub.values()).flat().length;
                  const subEntries = Array.from(bySub.entries());
                  const subValues = openSubs[catKey] ?? [];

                  return (
                    <AccordionItem
                      key={cat.id}
                      value={catKey}
                      id={`cat-${catKey}`}
                      className="scroll-mt-28"
                    >
                      <AccordionTrigger className="py-5">
                        <div className="flex items-center justify-between w-full pr-2">
                          <div className="text-left">
                            <div className="font-display text-lg md:text-xl font-bold">{cat.label}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {total} module{total > 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="pb-6">
                        <Accordion
                          type="multiple"
                          value={subValues}
                          onValueChange={(vals) => setOpenSubs((prev) => ({ ...prev, [catKey]: vals }))}
                          className="rounded-xl border border-border bg-background/40"
                        >
                          {subEntries.map(([subLabel, items]) => {
                            const subKey = slugify(subLabel);
                            return (
                              <AccordionItem
                                key={subKey}
                                value={subKey}
                                id={`sub-${catKey}-${subKey}`}
                                className="border-b border-border last:border-b-0 scroll-mt-28"
                              >
                                <AccordionTrigger className="px-4 md:px-5">
                                  <div className="flex items-center justify-between w-full pr-2">
                                    <div className="text-left">
                                      <div className="font-display text-base md:text-lg font-bold">{subLabel}</div>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                      {items.length}
                                    </span>
                                  </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-4 md:px-5">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {items.map((module) => (
                                      <ModuleCard key={module.id} module={module} />
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA to Composition */}
        <section className="py-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 md:p-12 rounded-2xl bg-card border border-border"
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                Voir ma <span className="text-gradient">composition</span>
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                {totalItems > 0 
                  ? `Vous avez ${totalItems} élément${totalItems > 1 ? 's' : ''} dans votre composition. Finalisez votre sélection et choisissez votre plan de maintenance.`
                  : 'Ajoutez des prestations et modules pour construire votre solution sur-mesure.'}
              </p>
              <Link to="/composition">
                <Button variant="hero" size="lg" className="group">
                  {totalItems > 0 ? 'Voir ma composition' : 'Accéder à la composition'}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}