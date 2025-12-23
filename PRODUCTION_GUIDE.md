# Mise en production sécurisée (Front + Backend)

Ce dépôt contient maintenant :
- **Frontend** : React (Vite) (inchangé côté UX, mais formulaire branché sur `/api/contact`)
- **Backend** : Node.js (Fastify) exposant **POST `/api/contact`** + **GET `/healthz`**
- **Infra** : exemples **PM2** et **Nginx** (TLS, proxy, limites)

## 1) Pré-requis VPS (bonnes pratiques)

**Objectifs NIS2 : disponibilité, intégrité, traçabilité, minimisation de surface d’attaque.**

1. **Créer un user non-root** et désactiver le login root SSH.
2. **Firewall** (ex: UFW) : n’exposer que `22/tcp`, `80/tcp`, `443/tcp`.
3. **Secrets** uniquement via fichiers `.env` (droits stricts) ou variables d’environnement.
4. **Node écoute en localhost uniquement** (Nginx en frontal).

Exemple UFW :
```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 2) Installation côté serveur

### Dépendances système
- Node.js **18 LTS**
- Nginx
- PM2

### Déployer le code
Copiez le dépôt sur le VPS, par exemple :
`/var/www/tysecure-site`

## 3) Configuration des secrets (backend)

1) Copier l’exemple :
```bash
cd /var/www/tysecure-site
cp backend/.env.example backend/.env
chmod 600 backend/.env
```

2) Éditer `backend/.env` :
- `POSTMARK_SERVER_TOKEN`
- `CONTACT_TO_EMAIL` (votre adresse)
- `CONTACT_FROM_EMAIL` (adresse fixe **vérifiée** chez Postmark/Sendgrid/Mailgun)
- optionnel : `ALLOWED_ORIGIN=https://votredomaine.tld`

> Sécurité : `From` est fixe (anti-spoofing + DMARC), `Reply-To` est basé sur l’email utilisateur **validé**.

## 4) Build & lancement

### Installer et build le frontend (Vite)
```bash
cd /var/www/tysecure-site
npm ci
npm run build
```

### Installer et build le backend
```bash
cd /var/www/tysecure-site/backend
npm ci
npm run build
```

### Lancer via PM2
```bash
cd /var/www/tysecure-site
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Logs :
```bash
pm2 logs tysecure-site
```

## 5) Nginx (reverse proxy sécurisé)

- Exemple prêt à l’emploi : `infra/nginx-site.conf.example`
- Activez le site et reload :
```bash
sudo ln -s /etc/nginx/sites-available/tysecure.conf /etc/nginx/sites-enabled/tysecure.conf
sudo nginx -t
sudo systemctl reload nginx
```

> Pensez à configurer TLS (Let's Encrypt / certbot) avant de forcer HTTPS.

## 6) Dév local

Terminal 1 (backend) :
```bash
cd backend
npm install
npm run dev
```

Terminal 2 (frontend) :
```bash
npm install
npm run dev
```

Le proxy Vite redirige `/api/*` vers `http://127.0.0.1:3000`.

---

# Notes sécurité (concis)

## Backend (OWASP / NIS2)
- **Validation allowlist Zod + `.strict()`** : rejet des champs inattendus (OWASP A03 Injection / surface d’attaque).
- **Limite de taille** (32KB) + limites par champ : disponibilité (NIS2) & réduction d’abus.
- **Rejet CR/LF** sur `email/subject/nom/prénom/...` : anti **email header injection**.
- **Rate limiting IP** : anti spam / abus (OWASP API abuse).
- **Honeypot** : réduction bots sans dépendance externe.
- **Aucune exécution système / aucun upload** : réduction RCE / command injection (OWASP A05 / A03).
- **Email via API (Postmark)** : évite `sendmail`, shells et injections de commandes.
- **Logs structurés + request id** : traçabilité (NIS2), sans fuite de PII (redaction des champs sensibles).

## Frontend
- Envoi uniquement des champs nécessaires.
- Vidage de la composition **uniquement après succès** (UX + intégrité du parcours).
