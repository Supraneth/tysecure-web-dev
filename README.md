# TySecure.fr — Fiche Opérationnelle Production

## Architecture de référence

```
/home/tysecure/apps/tysecure-site/
├─ backend/
│  ├─ src/
│  ├─ dist/
│  └─ .env
├─ dist/

/var/www/tysecure-website/
├─ frontend/dist/
├─ backend/dist/

/var/log/tysecure-website/
├─ front.log
└─ backend.log
```

---

## Maintenance courante

### Vérification services
```bash
pm2 status
sudo systemctl status nginx
df -h
```

### Logs
```bash
tail -n 50 /var/log/tysecure-website/backend.log
tail -n 50 /var/log/tysecure-website/front.log
```

### Certificats SSL
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

### Mises à jour système (mensuel)
```bash
sudo apt update
sudo apt upgrade
sudo reboot
```

---

## Déploiement Frontend

### En local
```bash
git add .
git commit -m "feat(front): modification"
git push origin main
```

### Sur le VPS
```bash
cd /home/tysecure/apps/tysecure-site
git pull
ne pas oublier de positionner la clé Postmark dans backend/.env :)
npm install
npm run build
```

### Déploiement vers Nginx
```bash
sudo rsync -a --delete dist/ /var/www/tysecure-website/frontend/dist/
sudo chown -R www-data:www-data /var/www/tysecure-website/frontend
sudo chmod -R 755 /var/www/tysecure-website/frontend
```

---

## Déploiement Backend

```bash
cd /home/tysecure/apps/tysecure-site/backend
git pull
npm install
npm run build
sudo rsync -a --delete dist/ /var/www/tysecure-website/backend/dist/
pm2 restart ecosystem.config.cjs --update-env
```

### Vérification
```bash
curl http://127.0.0.1:3000/healthz
pm2 logs --lines 30
```

---

## Déploiement complet

```bash
cd /home/tysecure/apps/tysecure-site
git pull

npm install
npm run build
sudo rsync -a --delete dist/ /var/www/tysecure-website/frontend/dist/

cd backend
npm install
npm run build
sudo rsync -a --delete dist/ /var/www/tysecure-website/backend/dist/
pm2 restart ecosystem.config.cjs --update-env
```

---

## Règles d’or

- Ne jamais builder dans /var/www
- Secrets uniquement dans backend/.env
- PM2 en user non-root
- HTTPS obligatoire (www canonique)

---

## Rollback

```bash
sudo rsync -a /var/www/tysecure-website/_backup_YYYY-MM-DD/frontend-dist/ /var/www/tysecure-website/frontend/dist/
sudo rsync -a /var/www/tysecure-website/_backup_YYYY-MM-DD/backend-dist/ /var/www/tysecure-website/backend/dist/
pm2 restart ecosystem.config.cjs --update-env
```

## Configuration nginx (/etc/nginx/sites-available/tysecure.fr)

```conf
# HTTP -> HTTPS (www)
server {
    listen 80;
    server_name tysecure.fr www.tysecure.fr;

    # logs "front" (requêtes web)
    access_log /var/log/tysecure-website/front.log;
    error_log  /var/log/tysecure-website/front.log;

    return 301 https://www.tysecure.fr$request_uri;
}

# HTTPS non-www -> HTTPS www
server {
    server_name tysecure.fr;

    # logs "front" (requêtes web)
    access_log /var/log/tysecure-website/front.log;
    error_log  /var/log/tysecure-website/front.log;

    return 301 https://www.tysecure.fr$request_uri;

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/tysecure.fr/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tysecure.fr/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

# HTTPS www (site réel)
server {
    server_name www.tysecure.fr;

    # logs "front" (requêtes web)
    access_log /var/log/tysecure-website/front.log;
    error_log  /var/log/tysecure-website/front.log;

    # sécurité basique + taille max
    client_max_body_size 32k;

    # Front statique (Vite build)
    root /var/www/tysecure-website/frontend/dist;

    # Empêche index.html d’être mis en cache
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    index index.html;

    location /assets/ {
        try_files $uri =404;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    # API vers le backend (PM2 écoute en local)
    location /api/ {
        proxy_pass http://127.0.0.1:3000;

        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_connect_timeout 5s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }

    # SPA fallback
    location / {
        try_files $uri /index.html;
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/tysecure.fr/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/tysecure.fr/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
```
