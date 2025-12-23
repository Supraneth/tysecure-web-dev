# Changelog — Bibliothèque Modules & Popups “Plus d’infos”

Date : 21 décembre 2025

## Objectif
- **Zéro erreur** “Missing info detail content …” : chaque module possède désormais son contenu détaillé.
- Contenus “grand public” : cas d’usage concrets, bénéfices, prérequis.
- **Organisation plus claire** : catégories + sous-catégories sur la page **Modules**.
- Ajout d’illustrations **libres** (créées pour le projet) et chargées en **lazy-load**.
- Ajout de la section **“Tableau de bord”** dans le socle **TySecure Foundation** avec intégration vidéo.

---

## 1) Popups “Plus d’infos” : 100% opérationnelles
### Détails modules
- Tous les modules du catalogue pointent maintenant vers un fichier de détail :
  - `src/content/modules/<slug>.ts`
- Les visuels associés sont stockés dans :
  - `public/modules/<slug>.svg`

### Modules corrigés (contenu manquant ajouté)
Les modules suivants n’avaient pas de fichier de détail et déclenchaient l’erreur “Missing info detail content …” :
- `capteurs-temp-humidity`
- `volets`
- `qualite-air`
- `meteo-locale`
- `transports-locaux`
- `scenarios-vie`
- `incendie`
- `controle-acces`
- `portail-garage`
- `simulation-presence`
- `geoloc-personnes`
- `prises-connectees`
- `eau-chaude`
- `optim-tarif`
- `ev-charging`
- `home-cinema`
- `media-library`
- `dashboard-mural`
- `backup-nas`
- `onduleur`
- `parental-control`
- `endpoint-security`
- `password-manager`
- `network-security`

> Les modules qui avaient déjà un détail (`eclairage`, `chauffage`, `energie`, `video`, `multiroom`, `alarme`, `arrosage`, `cyber`) ont également été enrichis et harmonisés.

---

## 2) Nouveaux modules ajoutés (UI + prix + détail complet)
Ajouts pour compléter le catalogue (capteurs unitaires + usages concrets) :
- `presence-mmwave` — Détection de présence (mmWave)
- `arrosage-jardin` — Arrosage intelligent
- `detecteur-mouvement` — Détecteur de mouvement
- `capteurs-ouverture` — Capteurs ouverture (portes/fenêtres)
- `capteur-vibration` — Capteur vibration (choc / tentative)
- `sirene` — Sirène connectée
- `bouton-panique` — Bouton d’alerte (panique)
- `vanne-eau` — Vanne d’arrêt d’eau automatique
- `sonnette-video` — Sonnette vidéo
- `serrure-connectee` — Serrure connectée
- `suivi-photovoltaique` — Suivi photovoltaïque
- `assistant-vocal` — Assistant vocal local

Tous ces modules possèdent :
- un prix unitaire dans `src/data/modules.ts`
- un fichier de détail dans `src/content/modules/<slug>.ts`
- une illustration locale dans `public/modules/<slug>.svg`

---

## 3) Page “Modules” : accordéon + navigation catégorie / sous-catégorie
- Amélioration ergonomique (sans changer la structure globale du site) :
  - affichage en **accordéon** (catégories puis sous-catégories)
  - **navigation** par catégorie et sous-catégorie (menus + accès rapide)
  - **recherche** en texte libre (filtre sur nom/description)
  - actions "Tout ouvrir / Tout fermer" + effacement rapide de la recherche
  - barre de navigation **sticky sur desktop** pour rester accessible pendant le scroll

Fichier concerné :
- `src/pages/Modules.tsx`
- données structurées : `src/data/modules.ts` (`subcategory`)

---

## 4) TySecure Foundation : section “Tableau de bord” + vidéo
Ajout dans le détail de prestation :
- `src/content/prestations/pack-foundation.ts`

Contenu :
- section “**Tableau de bord**” avec la vidéo :
  - `https://etc.athom.com/home/advanced-flow-1872x1152.mp4`

Comportement UX :
- lecture **avec contrôles**, `preload="metadata"`, pas d’autoplay agressif
- responsive, scroll interne propre dans la popup

---

## 5) Sécurité & cohérence
- Validation des URLs “media/cta” via le schéma Zod : `src/content/schema.ts`
- Aucun HTML injecté : rendu en texte + listes contrôlées
- Images locales (SVG) : pas de dépendance externe, poids minimal

---

## Correctifs (21 décembre 2025)
### Ajout depuis la popup “Plus d’infos”
- Le bouton “Ajouter” dans la popup (CTA pointant vers `/composition`) **ne navigue plus** vers la page Composition.
- Il **ajoute dynamiquement** le module/la prestation dans la composition, affiche une notification, puis ferme la popup.

Fichier concerné :
- `src/components/info/InfoDialog.tsx`

### Détail prestation manquant : Pack Confort
- Ajout du fichier : `src/content/prestations/pack-confort.ts` (corrige l’erreur “Missing info detail content for prestation 'pack-confort'”).

---

## Personnalisation des modules (23 décembre 2025)
### Prix séparés : main d’œuvre vs matériel (dans “Plus d’infos”)
- Ajout d’une section **“Budget estimatif”** dans les popups modules :
  - Main d’œuvre (installation + configuration)
  - Matériel (estimation)
  - Total estimé
- Option ergonomique : **“Je possède déjà le matériel”** (le total s’ajuste automatiquement).

Fichiers concernés :
- `src/components/info/InfoDialog.tsx`
- `src/data/module-customizations.ts`

### Configurateur : Éclairage & Vidéosurveillance
- Ajout d’un configurateur simple dans la popup :
  - **Éclairage** : variantes par nombre de pièces (1–3 / 4–8 / 9+)
  - **Vidéosurveillance** : variantes par nombre de caméras (1–2 / 3–4 / 5–8)
- La popup affiche aussi **le matériel typique** (exemples) et **des marques** (exemples) pour guider le choix.
- Le bouton **Ajouter** devient **Mettre à jour ma configuration** si le module est déjà dans la composition.

Fichiers concernés :
- `src/components/info/InfoDialog.tsx`
- `src/data/module-customizations.ts`
- `src/hooks/useComposition.tsx`
- `src/pages/Composition.tsx`

## Ajout (23 décembre 2025) — Accueil : section “Problématique”
- Ajout d’une section **“Problématique”** sur la page d’accueil (ancre `#problematique`).
- Ajout d’un bouton dans la HERO : **“Pourquoi faire appel à TySecure ?”** qui scrolle vers cette section.

Fichiers concernés :
- `src/components/sections/HomeSection.tsx` (nouveau composant `ProblematiqueSection`)
- `src/pages/Index.tsx` (insertion de la section dans la page)

