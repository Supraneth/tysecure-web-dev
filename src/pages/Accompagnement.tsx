import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, ArrowRight, Shield, HeartHandshake } from 'lucide-react';
import { useComposition } from '@/hooks/useComposition';
import { AFTERCARE_PLANS } from '@/data/aftercare';

export default function Accompagnement() {
  const { selectedAftercare, setSelectedAftercare } = useComposition();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16">
          <div className="section-container text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="badge-amber mb-4 inline-block">Aftercare</span>
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                Nos offres d’<span className="text-gradient">accompagnement</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                Optionnel. Pour garder une installation fiable dans le temps : monitoring, mises à jour, support et
                maintenance proactive.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <Shield className="w-4 h-4 text-primary" />
                  <span className="text-sm">Sécurité & disponibilité</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
                  <HeartHandshake className="w-4 h-4 text-primary" />
                  <span className="text-sm">Support structuré</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Offers */}
        <section className="py-8" id="offres">
          <div className="section-container">
            <div className="grid md:grid-cols-3 gap-6">
              {AFTERCARE_PLANS.map((plan, idx) => {
                const isActive = selectedAftercare?.id === plan.id;

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className={cn(
                      'relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm',
                      isActive ? 'border-primary/50 shadow-elevated' : 'border-border'
                    )}
                  >
                    {isActive && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 text-primary text-sm font-medium">
                        <CheckCircle className="w-5 h-5" />
                        Sélectionné
                      </div>
                    )}

                    <h2 className="font-display text-2xl font-bold mb-2">{plan.name}</h2>
                    <p className="text-primary font-medium mb-3">{plan.price}</p>
                    <p className="text-muted-foreground text-sm mb-5">{plan.description}</p>

                    <ul className="space-y-2 mb-6">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className="w-full"
                      variant={isActive ? 'secondary' : 'hero'}
                      onClick={() => setSelectedAftercare(isActive ? null : plan)}
                    >
                      {isActive ? 'Retirer cet accompagnement' : 'Ajouter cet accompagnement'}
                    </Button>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-10 rounded-2xl border border-border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <p className="font-medium">{selectedAftercare ? `Sélection actuelle : ${selectedAftercare.name}` : 'Aucun accompagnement sélectionné'}</p>
                <p className="text-sm text-muted-foreground">Tu peux continuer vers ta composition pour voir le récapitulatif.</p>
              </div>
              <Link to="/composition" className="w-full md:w-auto">
                <Button variant="hero" className="w-full md:w-auto group">
                  Voir ma composition
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
