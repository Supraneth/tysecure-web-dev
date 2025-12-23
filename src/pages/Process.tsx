import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

import {
  AlertTriangle,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  FileText,
  HeadphonesIcon,
  Key,
  Server,
  Shield,
  Wifi,
  Zap,
} from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Audit par un expert cyberdéfense",
    subtitle: "Étape 1",
    price: "300€ HT",
    priceNote: "Prix déductible si le coût du projet est ≥ 5 000€",
    description:
      "Analyse complète de votre habitat et de vos besoins. Il ne s'agit pas d'un rendez-vous commercial, c'est un vrai diagnostic technique réalisé par un ingénieur cybersécurité qui écoute votre besoin et vous aide à construire une maison intelligente qui vous ressemble.",
    quote:
      "L'audit évite les mauvaises surprises. Nous préférons investir du temps en amont pour livrer sereinement. L'audit est obligatoire avant toute conception et intégration.",
    duration: "3 heures à domicile + rédaction du dossier technique (3-5 jours)",
    livrables: [
      "Visite sur site avec relevés et photos",
      "Rapport détaillé",
      "Schémas",
    ],
    criteres: [
      "Audit dans les règles de l'art de niveau industriel",
      "Solution adaptée et alignée avec vos attentes",
      "Les prérequis sont clairement identifiés",
      "Les risques sont documentés",
    ],
    image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
    features: [
      { icon: FileText, text: "Rapport technique complet" },
      { icon: AlertTriangle, text: "Identification des contraintes techniques et de vos besoins de sécurité" },
      { icon: Shield, text: "Proposition de solutions concrètes" },
    ],
  },
  {
    number: "2",
    title: "Conception et intégration",
    subtitle: "Étape 2",
    price: "À partir de 1 500€ HT",
    priceNote: "Sur la base d'un socle TySecure Foundation",
    description:
      "Conception et installation de votre système domotique sur-mesure défini lors de la phase d'audit. Nous intégrons toute votre installation domotique détaillée dans le rapport technique et nous réalisons la configuration des équipements, les automatisations, les tableaux de bord utilisateurs. Avec TySecure, vous composez vous même votre menu et nous nous chargeons du reste !",
    quote:
      "Cette phase est notre cœur de métier. Nous appliquons les standards industriels (segmentation, durcissement, monitoring) adaptés à l'habitat pour vous garantir une installation conforme, maintenable dans le temps et de qualité industrielle. Les interventions lourdes telles que des travaux sur des tableaux électriques peuvent nécessiter une collaboration avec un électricien qualifié.",
    duration: "2 à 5 jours selon complexité",
    livrables: [
      "Vos capteurs configurés et installés",
      "Le serveur Home Assistant fonctionnel et durci",
      "Configuration des intégrations réalisée",
      "Création des automatisations et tableaux de bord",
    ],
    criteres: ["Intégration de qualité industrielle", "Configuration dans les règles de l'art des recommandations constructeurs"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    features: [
      { icon: Server, text: "Conception et intégration de votre domotique sécurisée" },
      { icon: Wifi, text: "Architecture réseau robuste" },
      { icon: Zap, text: "Configuration des automatisations et tableaux de bord à votre image" },
    ],
  },
  {
    number: "3",
    title: "Livraison et prise en main",
    subtitle: "Étape 3",
    price: "Optionnel : Faîtes vous accompagner toute l'année à partir de 39€/mois",
    priceNote: "Pour la souscription d'un plan d'accompagnement Care Standard",
    description:
      "Le processus se termine par le transfert complet des clés et connaissances liées à votre installation domotique. Nous vous formons à l'utilisation de votre nouveau matériel. Pour assurer une maintenance fiable et qualitative dans le temps ainsi que bénéficier d'évolution technique au fil de l'eau, un abonnement optionnel est disponible chez TySecure. Grâce à lui, notre équipe permet à votre maison de rester fonctionnelle dans le temps, bénéficier des dernières mises à jour et d'un support humain et réactif.",
    quote:
      "L'abonnement à nos offres Care est facultatif mais permet d'avoir l'esprit tranquille en cas de problème sur votre installation. Nous couvrons aussi vos petites erreurs d'utilisation occasionnelles car on sait que cela peut arriver.",
    duration: "1/2 journée de livraison et formation à l'utilisation",
    livrables: [
      "Accès complets à votre installation",
      "Formation opérationnelle illustrée",
    ],
    criteres: [
      "Toute votre documentation soigneusement livrée", "Accompagnement et dépannage quotidien","Intervention à distance ou sur place",
    ],
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&h=400&fit=crop",
    features: [
      { icon: Key, text: "Accès, identifiants et documentation complète transférés" },
      { icon: BookOpen, text: "Procédure d'utilisation" },
      { icon: HeadphonesIcon, text: "Accompagnent personnalisé" },
    ],
  },
] as const;

type Step = (typeof steps)[number];

function useParallaxEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (hover: hover) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return enabled;
}

function ProcessHeroParallax() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={heroRef} className="relative min-h-[70svh] flex items-center pt-20 overflow-hidden">
      <motion.div style={{ y: heroY }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </motion.div>

      <motion.div style={{ opacity: heroOpacity }} className="section-container relative z-10 text-center">
        <span className="badge-amber mb-4 inline-block">Comment se déroule un partenariat avec TySecure ?</span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Audit → <span className="text-gradient">Construction</span> → Accompagnement
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Trois étapes claires. Pas de zone grise, pas de
          surprise.
        </p>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
           Une méthodologie éprouvée pour des projets maîtrisés.
        </p>
        <Button asChild variant="hero" size="lg">
          <a href="#audit">Comprendre les étapes ⬇️</a>
        </Button>
      </motion.div>
    </section>
  );
}

function ProcessHeroStatic() {
  return (
    <section className="relative min-h-[70svh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid opacity-30" />
      </div>

      <div className="section-container relative z-10 text-center">
        <span className="badge-amber mb-4 inline-block">Comment se déroule un partenariat avec TySecure ?</span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Audit → <span className="text-gradient">Construction</span> → Accompagnement
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          Trois étapes claires avec des livrables concrets et des Expertise ajoutée définis. Pas de zone grise, pas de
          surprise. Une méthodologie éprouvée pour des projets maîtrisés.
        </p>
        <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
          <a href="#audit">Comprendre les étapes ⬇️</a>
        </Button>
      </div>
    </section>  
  );
}

function ProcessStepStatic({ step, index }: { step: Step; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <section
      id={step.number === "1" ? "audit" : step.number === "2" ? "build" : step.number === "3" ? "care" : undefined}
      className="py-16 md:py-24 relative overflow-hidden scroll-mt-24"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className={isEven ? "lg:order-1" : "lg:order-2"}>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img src={step.image} alt={step.title} className="w-full h-64 md:h-96 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {step.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-sm"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-foreground text-xs">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[auto_1fr] items-start gap-4">
              <div
                className="
                  step-indicator relative z-50
                  -mt-2 -ml-2 sm:-mt-3 sm:-ml-3
                  flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12
                  items-center justify-center
                  text-base sm:text-lg md:text-xl
                "
              >
                {step.number}
              </div>
          </div>
        </div>
          {/* Content */}
          <div className={isEven ? "lg:order-2" : "lg:order-1"}>
            <span className="text-primary text-sm font-medium">{step.subtitle}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">{step.title}</h2>

            <div className="flex flex-wrap items-baseline gap-3 mb-6">
              <span className="price-tag text-2xl md:text-3xl">{step.price}</span>
              {step.priceNote && <span className="text-primary/80 text-sm">— {step.priceNote}</span>}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>

            <blockquote className="border-l-2 border-primary/50 pl-4 py-2 mb-6 bg-primary/5 rounded-r-lg">
              <p className="text-sm text-muted-foreground italic">"{step.quote}"</p>
            </blockquote>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock className="w-4 h-4 text-primary" />
              <span>
                <strong>Durée :</strong> {step.duration}
              </span>
            </div>

            <div className="mb-6">
              <h4 className="font-display font-semibold mb-3">Livrables clés</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {step.livrables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-display font-semibold mb-3 text-sm">Expertise ajoutée</h4>
              <ul className="space-y-2">
                {step.criteres.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {step.number === "1" && (
              <div className="mt-8">
                <Button asChild variant="hero" size="lg" className="group w-full sm:w-auto">
                  <a href="#build">
                    Continuer avec l&apos;étape 2
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            )}

            {step.number === "2" && (
              <div className="mt-8">
                <Button asChild variant="hero" size="lg" className="group w-full sm:w-auto">
                  <a href="#care">
                    Continuer vers l&apos;étape 3
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            )}

            {step.number === "3" && (
              <div className="mt-8">
                <Link to="/prestations" className="inline-block w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="group relative overflow-hidden w-full sm:w-auto">
                    <span className="pointer-events-none absolute inset-0 opacity-60 animate-pulse bg-primary/20" />
                    <span className="group relative overflow-hidden bg-amber-500 text-black hover:bg-amber-400 flex items-center justify-center w-full">
                      Prêt à démarrer ?
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <p className="mt-2 text-xs text-muted-foreground">Choisissez une prestation (packs recommandés ou modules) avant l’audit.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStepParallax({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      id={step.number === "1" ? "audit" : step.number === "2" ? "build" : step.number === "3" ? "care" : undefined}
      className="py-16 md:py-24 relative overflow-hidden scroll-mt-24"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div style={{ y }} className={isEven ? "lg:order-1" : "lg:order-2"}>
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img src={step.image} alt={step.title} className="w-full h-64 md:h-96 object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                {step.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur-sm text-sm"
                  >
                    <feature.icon className="w-4 h-4 text-primary" />
                    <span className="text-foreground text-xs">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 step-indicator text-2xl md:text-3xl">
              {step.number}
            </div>
          </motion.div>

          <motion.div style={{ opacity }} className={isEven ? "lg:order-2" : "lg:order-1"}>
            <span className="text-primary text-sm font-medium">{step.subtitle}</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 mb-4">{step.title}</h2>

            <div className="flex flex-wrap items-baseline gap-3 mb-6">
              <span className="price-tag text-2xl md:text-3xl">{step.price}</span>
              {step.priceNote && <span className="text-primary/80 text-sm">— {step.priceNote}</span>}
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">{step.description}</p>

            <blockquote className="border-l-2 border-primary/50 pl-4 py-2 mb-6 bg-primary/5 rounded-r-lg">
              <p className="text-sm text-muted-foreground italic">"{step.quote}"</p>
            </blockquote>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Clock className="w-4 h-4 text-primary" />
              <span>
                <strong>Durée :</strong> {step.duration}
              </span>
            </div>

            <div className="mb-6">
              <h4 className="font-display font-semibold mb-3">Livrables clés</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {step.livrables.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-card border border-border">
              <h4 className="font-display font-semibold mb-3 text-sm">Expertise ajoutée par TySecure</h4>
              <ul className="space-y-2">
                {step.criteres.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {step.number === "1" && (
              <div className="mt-8">
                <Button asChild variant="hero" size="lg" className="group w-full sm:w-auto">
                  <a href="#build">
                    Continuer avec l&apos;étape 2
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            )}

            {step.number === "2" && (
              <div className="mt-8">
                <Button asChild variant="hero" size="lg" className="group w-full sm:w-auto">
                  <a href="#care">
                    Continuer vers l&apos;étape 3
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            )}

            {step.number === "3" && (
              <div className="mt-8">
                <Link to="/prestations" className="inline-block w-full sm:w-auto">
                  <Button variant="hero" size="lg" className="group relative overflow-hidden w-full sm:w-auto">
                    <span className="pointer-events-none absolute inset-0 opacity-60 animate-pulse bg-primary/20" />
                    <span className="group relative overflow-hidden bg-amber-500 text-black hover:bg-amber-400 flex items-center justify-center w-full">
                      Prêt à démarrer ?
                      <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Button>
                </Link>
                <p className="mt-2 text-xs text-muted-foreground">Choisissez une prestation (packs recommandés ou modules) avant l’audit.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ResilienceSection() {
  // Content intentionally omitted in the current version.
  return null;
}

function ProcessCTA() {
  // Content intentionally omitted in the current version.
  return null;
}

export default function Process() {
  const parallaxEnabled = useParallaxEnabled();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {parallaxEnabled ? <ProcessHeroParallax /> : <ProcessHeroStatic />}

        {steps.map((step, index) =>
          parallaxEnabled ? (
            <ProcessStepParallax key={step.title} step={step} index={index} />
          ) : (
            <ProcessStepStatic key={step.title} step={step} index={index} />
          ),
        )}

        <ResilienceSection />
        <ProcessCTA />
      </main>

      <Footer />
    </div>
  );
}
