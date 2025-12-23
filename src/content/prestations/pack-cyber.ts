import type { InfoDetail } from "../schema";

const detail: InfoDetail = {
  "id": "pack-cyber",
  "title": "Pack TySecure Cyber",
  "subtitle": "Durcissement réseau + confidentialité + continuité",
  "longDescription": "Renforce la cybersécurité de votre installation domotique et de votre réseau : segmentation, durcissement des accès, supervision basique, sauvegardes et restauration testée.",
  "highlights": [
    "Segmentation réseau (VLAN / réseau invité / IoT isolé selon matériel)",
    "Accès distant sécurisé (VPN/WireGuard ou équivalent) et réduction de surface d’attaque",
    "Sauvegardes automatisées + procédure de restauration",
    "Checklist sécurité et recommandations (mots de passe, MFA, mises à jour)"
  ],
  "benefits": [
    "Réduit les risques d’intrusion et de fuite de données",
    "Améliore la stabilité et la disponibilité",
    "Facilite la maintenance sur la durée"
  ],
  "prerequisites": [
    "Accès administrateur à la box/routeur ou routeur compatible",
    "Inventaire rapide des équipements connectés"
  ],
  "duration": "0,5 à 1,5 jour",
  "price": "Selon matériel réseau et niveau de segmentation",
  "cta": {
    "label": "Renforcer ma sécurité",
    "href": "/contact"
  }
};

export default detail;
