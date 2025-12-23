import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Wifi,
  FileCheck,
  Clock,
  CheckCircle,
  Activity,
  Sparkles,
  Layers,
  ShieldCheck,
  GraduationCap,
  PiggyBank
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const values = [
  {
    icon: Shield,
    title: 'Confidentialité',
    description: 'Vos données restent chez vous. Pas de cloud imposé, pas de dépendance externe.',
    stat: 'Restez seul propriétaire de vos données et de votre maison%'
  },
  {
    icon: Wifi,
    title: 'Fiabilité',
    description: 'Une maison qui fonctionne, même sans Internet. Testé, documenté, prouvé avec vous.',
    stat: 'Tests de résilience systématiques à chaque livraison'
  },
  {
    icon: FileCheck,
    title: 'Transparence',
    description: 'Documentation complète, procédures. Vous savez ce qui est installé.',
    stat: 'Suivi des versions logicielle, priorité aux solutions libres'
  },
  {
    icon: Clock,
    title: 'Accompagnement',
    description: 'Nous vous suivons dans la durée. Monitoring à distance possible, mises à jour, support quotidien pour vous aider à faire face aux imprévus.',
    stat: 'Abonnement facultatif avec engagements clairs et cadrés'
  }
];

const features = [
  'auditée par un expert en cybersécurité',
  'basée sur une infrastructure numérique 100% locale',
  'qui renforce considérablement la cybersécurité de vos données',
  'documentée et de qualité industrielle',
  'évolutive et fiable, assurée par un accompagnement adaptée à vos besoins'
];

const problematiques = [
  {
    icon: Activity,
    title: 'Réseau instable ou PC ralentis',
    description:
      "Vous constatez des problèmes ou des latences sur votre réseau Internet ou des ralentissements sur vos ordinateurs."
  },
  {
    icon: Sparkles,
    title: 'Découvrir la domotique, sans se tromper',
    description:
      "Vous souhaitez découvrir la domotique et tous ses avantages et progresser quotidiennement, avec des prix justes d’intégration et d’accompagnement."
  },
  {
    icon: Layers,
    title: 'Trop d’applications, pas assez de simplicité',
    description:
      "Vous êtes inondé d’applications et vous souhaitez plus de centralisation pour une meilleure prise en main."
  },
  {
    icon: ShieldCheck,
    title: 'Sécuriser maison + données personnelles',
    description:
      "Vous souhaitez sécuriser correctement votre habitation et vos données numériques (photos, vidéos, documents administratifs), et partir de chez vous rassuré."
  },
  {
    icon: GraduationCap,
    title: 'Apprendre l’informatique et la cybersécurité',
    description:
      "Vous voulez découvrir l’informatique et la cybersécurité avec votre environnement comme terrain pratique."
  },
  {
    icon: PiggyBank,
    title: 'Réduire significativement vos factures',
    description:
      "Vous souhaitez faire d’importantes économies d’électricité, d’eau ou de gaz."
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="noise-overlay" />

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />

      <div className="section-container relative z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="badge-amber">
              <Shield className="w-4 h-4 mr-2" />
              Intégration domotique haut de gamme, cybersécurisée, à prix juste</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeInUp}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Maison{' '}
            <span className="text-gradient">intelligente</span>,{' '}
            <br className="hidden sm:block" />
            autonome,{' '}
            <span className="text-gradient">cybersécurisée</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed"
          >
            avec un accompagnement complet et une documentation complète.
            Découvrez une domotique qui vous appartient vraiment.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 mb-12 sm:justify-center lg:justify-start"
          >
            <Button asChild variant="hero" size="lg" className="w-full sm:w-auto group">
              <a href="#problematique">Pourquoi faire appel à TySecure ?</a>
            </Button>

            <Button asChild variant="hero-outline" size="lg" className="w-full sm:w-auto group">
              <a href="#valeurs">Comprendre TySecure</a>
            </Button>

          </motion.div>

          {/* Features */}
          <motion.ul
            variants={fadeInUp}
            className="
              mt-10 mx-auto max-w-md space-y-6 px-4 text-left
              lg:mx-0 lg:max-w-none lg:px-0
            "
          >
            {features.map((feature) => (
              <li key={feature} className="grid grid-cols-[20px_1fr] gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                <span className="text-base leading-7 text-muted-foreground">
                  {feature}
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}

export function ProblematiqueSection() {
  return (
    <section id="problematique" className="py-24 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/40 to-background" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            La <span className="text-gradient">problématique</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            TySecure intervient quand vous voulez une maison (et un environnement numérique) qui fonctionne vraiment,
            sans empilement d’applications, sans cloud imposé, et sans mauvaise surprise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problematiques.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="card-glow bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16"
        >
          <Link to="/prestations">
            <Button variant="hero" size="lg" className="w-full sm:w-auto group">
              Composer votre offre
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <p className="mt-5 text-muted-foreground max-w-2xl mx-auto opacity-70">
            Choisissez vos modules, visualisez le coût, et avancez étape par étape.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function ValuesSection() {
  return (
    <section id="valeurs" className="py-24 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Nos <span className="text-gradient">valeurs</span>
          </h2>

          <div className="max-w-3xl mx-auto text-left text-muted-foreground text-base sm:text-lg leading-relaxed space-y-6">
            <p>
              TySecure est né de plus de dix ans d’expérience au cœur de l’industrie de pointe française, et d’une remise
              en question profonde : pourquoi réserver les meilleures pratiques de fiabilité, de sécurité et
              d’automatisation à l’industrie, alors que nos foyers — là où vivent nos proches — restent en retard sur ces
              enjeux essentiels ?
            </p>

            <p>
              Au fil des années, nous avons acquis une expertise complète en informatique et automatisme industriels, dans des
              environnements où l’exigence n’est pas une option : disponibilité, résilience, cybersécurité, maîtrise des
              données. Aujourd’hui, nous avons fait le choix de mettre cette expérience au service du plus grand nombre, dans
              l’environnement que nous connaissons tous intimement : la maison.
            </p>

            <p>
              Notre quotidien est déjà envahi d’outils numériques intelligents. Certaines villes disposent de transports
              entièrement automatisés, nos cuisines se modernisent avec des robots toujours plus performants… et pourtant,
              chez nous, nous continuons parfois à râler depuis le canapé pour éteindre une lumière avec un interrupteur
              mécanique. Ces détails peuvent sembler anecdotiques, mais mis bout à bout, ils représentent un potentiel
              immense d’amélioration du confort, de la sécurité et des économies d’énergie
            </p>

            <p>
              Les fabricants l’ont bien compris : ampoules connectées, stores motorisés, caméras, détecteurs, serrures
              intelligentes… la domotique s’est démocratisée. Mais cette profusion de solutions s’est faite au prix d’une
              complexité croissante : multiplication des applications, des comptes, des interfaces, des abonnements cloud,
              et une perte totale de visibilité sur ce qu’il advient réellement des données de votre foyer.
            </p>

            <p>
              Car au-delà du confort, un enjeu fondamental se pose : la propriété et la protection de vos données
              personnelles. De nombreuses solutions connectées transfèrent des informations sensibles — images, habitudes
              de vie, présence, absences — vers des serveurs situés hors de France, parfois hors d’Europe, là où notre
              législation ne peut plus garantir vos droits. Plus les équipements se multiplient, plus la surface d’attaque
              augmente, et plus le risque de fuite, d’exploitation ou de chantage devient réel.
            </p>

            <p>
              TySecure a été créé pour répondre à ces dérives. Notre mission est claire : redonner aux professionnels exigeants et aux particuliers la maîtrise de leur infrastructure numérique domestique. La sécurité des données
              n’est pas un luxe, ni une option : c’est un droit fondamental.
            </p>

            <p>
              Nous vous aidons à comprendre les risques réels, à concevoir et déployer des solutions fiables et pérennes, et à vous former pour reprendre le contrôle. Parce qu’une maison intelligente ne doit pas être
              une maison surveillée par des tiers. Elle doit être au service de votre confort, de votre sécurité, et de
              votre liberté numérique.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-glow bg-card rounded-2xl p-6 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{value.description}</p>
              <div className="text-xs text-primary font-medium">{value.stat}</div>
            </motion.div>
          ))}
        </div>

        {/* CTA to Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Vous êtes intéressés ?
          </p>
          <Link to="/process">
            <Button variant="hero" size="lg" className="w-full sm:w-auto group">
              Découvrez les étapes du processus
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
            <p className="mt-5 text-muted-foreground max-w-2xl mx-auto opacity-70">
            Trois étapes claires pour vous guider en seulement 5 minutes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export function ProcessPreview() {
}

export function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Vous connaissez déjà TySecure ?​ 😉
          </h3>
          <p className="text-muted-foreground text-lg mb-8">
            Retrouvez nos prestations et les modules complémentaires juste ici !
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/prestations">
              <Button variant="cta" size="xl">
                Voir les prestations
              </Button>
            </Link>
            <Link to="/modules">
              <Button variant="hero-outline" size="xl" className="w-full sm:w-auto group">
                Voir les modules complémentaires
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}