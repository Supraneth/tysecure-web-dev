import type { Aftercare } from '@/hooks/useComposition';

/**
 * Plans d'accompagnement (Aftercare) partagés entre pages.
 */
export const AFTERCARE_PLANS: Aftercare[] = [
  {
    id: 'care-essential',
    name: 'Care Essential',
    price: 'À partir de 39€/mois',
    description: 'Monitoring, mises à jour et support structuré.',
    features: [
      'Monitoring de disponibilité',
      'Mises à jour de sécurité',
      'Support structuré (SLA standard)'
    ],
  },
  {
    id: 'care-plus',
    name: 'Care Plus',
    price: 'À partir de 79€/mois',
    description: 'Maintenance proactive renforcée + accompagnement avancé.',
    features: [
      'Tout Essential',
      'Optimisations & maintenance proactive',
      'SLA renforcé / support prioritaire'
    ],
  },
  {
    id: 'care-premium',
    name: 'Care Premium',
    price: 'Sur-mesure',
    description: 'Engagements spécifiques, environnements complexes, exigences élevées.',
    features: [
      'Tout Plus',
      'Engagements & périmètre sur-mesure',
      'Accompagnement expert dédié'
    ],
  },
];

export function getAftercareById(id: string): Aftercare | undefined {
  return AFTERCARE_PLANS.find((p) => p.id === id);
}
