import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MANDATORY_PRESTATION_IDS, useComposition } from '@/hooks/useComposition';
import { Send, Mail, Phone, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

function buildAutoSubject(lastName: string, firstName: string) {
  const who = [lastName, firstName].filter(Boolean).join(' ').trim();
  return who ? `Prise de contact — ${who} - TySecure` : 'Prise de contact — TySecure';
}

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { prestations, modules, selectedAftercare, resetKeepingMandatory } = useComposition();

  // Hide mandatory prestations from short "cart"/bullets summaries.
  const visiblePrestations = useMemo(
    () => prestations.filter((p) => !MANDATORY_PRESTATION_IDS.has(p.id)),
    [prestations]
  );

  // ---- state for strict prefills / autofill
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [subjectTouched, setSubjectTouched] = useState(false);
  const [subject, setSubject] = useState('Prise de contact — TySecure');
  const [honeypot, setHoneypot] = useState(''); // website
  // ------------------------------------------------------------

  // Composition summary (single text block)
  const compositionSummary = useMemo(() => {
    const items: string[] = [];
    if (visiblePrestations.length > 0) {
      items.push(`Prestations : ${visiblePrestations.map((p) => p.name).join(', ')}`);
    }
    if (modules.length > 0) {
      items.push(`Modules : ${modules.map((m) => m.name).join(', ')}`);
    }
    if (selectedAftercare) {
      items.push(`Accompagnement : ${selectedAftercare.name}`);
    }
    return items.join('\n');
  }, [visiblePrestations, modules, selectedAftercare]);

  // personalized message prefill
  const initialMessage = useMemo(() => {
    const summary = compositionSummary
      ? `${compositionSummary}`
      : `{Décrire ici les prestations / modules / accompagnements choisis}`;

    return `Bonjour TySecure,

Je souhaiterai m'entretenir avec votre société pour obtenir plus de renseignements sur la composition suivante :
${summary}

Merci et bonne journée.
`;
  }, [compositionSummary]);

  // computed subject (auto until user edits)
  const autoSubject = useMemo(() => buildAutoSubject(lastName, firstName), [lastName, firstName]);

  // Keep subject in sync until user touches it (avoid setState during render)
  useEffect(() => {
    if (!subjectTouched) setSubject(autoSubject);
  }, [autoSubject, subjectTouched]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Honeypot anti-bot (hidden field)
    if (honeypot) return;

    const form = e.currentTarget;
    const fd = new FormData(form);

    const get = (name: string) => String(fd.get(name) ?? '').trim();

    // Prevent CR/LF injection in header-like fields (backend also enforces this).
    const stripCRLF = (v: string) => v.replace(/[\r\n]+/g, ' ').trim();

    const constraintsParts: string[] = [];
    const add = (label: string, value: string) => {
      const v = value.trim();
      if (v) constraintsParts.push(`${label}: ${v}`);
    };

    add('Logement — Type', get('housingType'));
    add('Logement — Surface (m²)', get('surface'));
    add('Logement — Étage / niveaux', get('floor'));
    add('Réseau — Box / FAI', get('ispBox'));
    add('Réseau — Switch', get('switch'));
    add('Réseau — Wi-Fi', get('wifi'));
    add('Matériel déjà en place', get('existingHardware'));
    add('Budget', get('budget'));
    add('Priorité', get('priority'));
    add('Délai souhaité', get('desiredTimeline'));

    const other = get('otherConstraints');
    if (other) constraintsParts.push(other);

    const constraints =
      constraintsParts.length > 0
        ? `Contexte / contraintes:\n- ${constraintsParts.join('\n- ')}`
        : undefined;

    const payload = {
      website: stripCRLF(honeypot).slice(0, 100), // honeypot (normally empty)
      firstName: stripCRLF(firstName).slice(0, 80),
      lastName: stripCRLF(lastName).slice(0, 80),
      email: stripCRLF(get('email')).slice(0, 254),
      phone: stripCRLF(get('phone')).slice(0, 30),
      city: stripCRLF(get('location')).slice(0, 80),
      subject: stripCRLF(subject).slice(0, 150),
      message: get('message').slice(0, 4000),
      ...(constraints ? { constraints: constraints.slice(0, 4000) } : {}),
    };

    setIsSubmitting(true);
    resetKeepingMandatory();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(payload),
      });

      const requestId = res.headers.get('x-request-id') ?? undefined;

      let data: any = null;
      try {
        data = await res.json();
      } catch {
        // ignore
      }

      if (!res.ok || !data?.ok) {
        const msg =
          data?.error === 'Invalid payload'
            ? 'Certains champs sont invalides. Vérifiez le formulaire puis réessayez.'
            : data?.error || 'Impossible d’envoyer le message. Réessayez plus tard.';

        if (requestId) console.warn('Contact API request id:', requestId);
        toast.error(msg);
        return;
      }

      setIsSubmitted(true);
      toast.success('Message envoyé avec succès !');
      form.reset(); // resets uncontrolled fields (email, phone, etc.)
    } catch (err) {
      console.error(err);
      toast.error('Erreur réseau : impossible de contacter le serveur.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">Message envoyé !</h1>
              <p className="text-muted-foreground mb-8">
                Merci pour votre demande. Nous reviendrons vers vous dans les 48h ouvrées.
              </p>
              <Button
                variant="hero"
                onClick={() => {
                  setIsSubmitted(false);
                  setFirstName('');
                  setLastName('');
                  setSubjectTouched(false);
                  setSubject('Prise de contact — TySecure');
                  setHoneypot('');
                }}
              >
                Envoyer un autre message
              </Button>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-16">
        <section className="py-8 md:py-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="badge-amber mb-4 inline-block">Contact</span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
                Prenez contact avec <span className="text-gradient">TySecure</span>
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Prêt à reprendre le contrôle de votre maison ? Décrivez-nous votre projet et nous
                reviendrons vers vous rapidement. N&apos;oubliez pas de passer par les onglets
                Prestations, Modules et Accompagnement pour générer votre composition : elle sera
                automatiquement intégrée dans le formulaire ci-dessous.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot anti-bot (hidden) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                      Website
                    </label>
                    <Input
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      placeholder="Ne pas remplir"
                      className="bg-card border-border"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium mb-2">
                        Prénom *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        placeholder="Jean"
                        autoComplete="given-name"
                        className="bg-card border-border"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium mb-2">
                        Nom *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        placeholder="Dupont"
                        autoComplete="family-name"
                        className="bg-card border-border"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="jean@example.com"
                        autoComplete="email"
                        className="bg-card border-border"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Téléphone mobile *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder="06 12 34 56 78"
                        autoComplete="tel"
                        className="bg-card border-border"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium mb-2">
                      Ville *
                    </label>
                    <Input
                      id="location"
                      name="location"
                      required
                      placeholder="Vannes"
                      autoComplete="address-level2"
                      className="bg-card border-border"
                    />
                  </div>

                  {/* Sujet auto-rempli (editable) */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Sujet *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      value={subject}
                      onChange={(e) => {
                        if (!subjectTouched) setSubjectTouched(true);
                        setSubject(e.target.value);
                      }}
                      className="bg-card border-border"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Votre projet *
                      <p className="text-xs text-muted-foreground">
                        Dans le cas où votre demande serait très spécifique, libre à vous de modifier
                        le contenu du message généré ci-dessous.
                      </p>
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={9}
                      defaultValue={initialMessage}
                      className="bg-card border-border resize-y min-h-[250px]"
                    />
                  </div>

                  {/* Contraintes (facultatif) — version guidée */}
                  <div className="block text-sm font-medium">
                    Contraintes (facultatif)
                    <p className="text-xs text-muted-foreground">
                      Ces informations nous aident à mieux comprendre l’environnement avant l’audit.
                      Laissez les cases vides si vous ne connaissez pas l'information.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-card border border-border">
                    <div className="space-y-6">
                      {/* Logement */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Logement</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="housingType" className="block text-xs font-medium mb-2">
                              Type
                            </label>
                            <select
                              id="housingType"
                              name="housingType"
                              className="w-full h-10 rounded-md border border-border bg-card px-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Choisir…
                              </option>
                              <option value="maison">Maison</option>
                              <option value="appartement">Appartement</option>
                              <option value="autre">Autre</option>
                            </select>
                          </div>

                          <div>
                            <label htmlFor="surface" className="block text-xs font-medium mb-2">
                              Surface (m²)
                            </label>
                            <Input
                              id="surface"
                              name="surface"
                              placeholder="Ex: 120"
                              className="bg-card border-border"
                            />
                          </div>

                          <div>
                            <label htmlFor="floor" className="block text-xs font-medium mb-2">
                              Étage / niveaux
                            </label>
                            <Input
                              id="floor"
                              name="floor"
                              placeholder="Ex: RDC + 1 / 3e étage"
                              className="bg-card border-border"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Réseau */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Réseau</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="ispBox" className="block text-xs font-medium mb-2">
                              Box / FAI
                            </label>
                            <Input
                              id="ispBox"
                              name="ispBox"
                              placeholder="Ex: Freebox Delta, Livebox 6…"
                              className="bg-card border-border"
                            />
                          </div>

                          <div>
                            <label htmlFor="switch" className="block text-xs font-medium mb-2">
                              Switch / équipements réseau
                            </label>
                            <Input
                              id="switch"
                              name="switch"
                              placeholder="Ex: UniFi, TP-Link, Netgear…"
                              className="bg-card border-border"
                            />
                          </div>

                          <div>
                            <label htmlFor="wifi" className="block text-xs font-medium mb-2">
                              Wi-Fi
                            </label>
                            <Input
                              id="wifi"
                              name="wifi"
                              placeholder="Ex: Mesh, Wi-Fi 6/6E, bornes…"
                              className="bg-card border-border"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Matériel déjà en place */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Matériel déjà en place</p>
                        <Textarea
                          id="existingHardware"
                          name="existingHardware"
                          rows={4}
                          placeholder="Ex: Home Assistant, caméras, serrures connectées, capteurs Zigbee, NAS, onduleur…"
                          className="bg-card border-border resize-none"
                        />
                      </div>

                      {/* Budget / priorité */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Budget / priorité</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="priority" className="block text-xs font-medium mb-2">
                              Priorité principale
                            </label>
                            <select
                              id="priority"
                              name="priority"
                              className="w-full h-10 rounded-md border border-border bg-card px-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Choisir…
                              </option>
                              <option value="securite">Sécurité</option>
                              <option value="confort">Confort</option>
                              <option value="energie">Énergie</option>
                              <option value="mixte">Mixte</option>
                              <option value="ne-sais-pas">Je ne sais pas</option>
                            </select>
                          </div>
                          <div>
                            <label htmlFor="budget" className="block text-xs font-medium mb-2">
                              Budget indicatif
                            </label>
                            <div className="relative">
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                €
                              </span>
                              <Input
                                id="budget"
                                name="budget"
                                className="bg-card border-border pl-7"
                                placeholder="Ex: 5 000 / 10 000+ / à définir"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Délai */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Délai souhaité</p>
                        <Input
                          id="desiredTimeline"
                          name="desiredTimeline"
                          placeholder="Ex: dès que possible / sous 1 mois / trimestre prochain…"
                          className="bg-card border-border"
                        />
                      </div>

                      {/* Extra libre */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Autres contraintes (optionnel)</p>
                        <Textarea
                          id="otherConstraints"
                          name="otherConstraints"
                          rows={3}
                          placeholder="Ex: travaux en cours, copropriété, zones sans Wi-Fi, contraintes esthétiques, horaires…"
                          className="bg-card border-border resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Auto-filled composition bullets (visual recap) */}
                  {(visiblePrestations.length > 0 || modules.length > 0 || selectedAftercare) && (
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                      <div className="flex items-center justify-between gap-4 mb-2">
                        <p className="text-sm font-medium">Récapitulatif de votre composition :</p>
                        <div className="hidden sm:flex items-center gap-2">
                          <Link
                            to="/prestations"
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Prestations <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to="/modules"
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Modules <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to="/accompagnement"
                            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                          >
                            Accompagnement <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      <ul className="text-sm text-muted-foreground space-y-1">
                        {visiblePrestations.map((p) => (
                          <li key={p.id}>• {p.name}</li>
                        ))}
                        {modules.map((m) => (
                          <li key={m.id}>• {m.name}</li>
                        ))}
                        {selectedAftercare && <li>• {selectedAftercare.name}</li>}
                      </ul>
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Envoi en cours...'
                    ) : (
                      <>
                        Envoyer ma demande
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    En soumettant ce formulaire, vous acceptez d&apos;être recontacté par TySecure.
                    Vos données ne seront jamais revendues.
                  </p>
                </form>
              </motion.div>

              {/* Contact info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-8"
              >
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display text-xl font-bold mb-6">Informations de contact</h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Email</p>
                        <a
                          href="mailto:contact@tysecure.fr"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          contact@tysecure.fr
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Téléphone</p>
                        <p className="text-muted-foreground">Sur rendez-vous uniquement</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Zone d&apos;intervention</p>
                        <p className="text-muted-foreground">Morbihan, Loire-Atlantique</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
