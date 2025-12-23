import { Link } from 'react-router-dom';
import { Shield, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-deep border-t border-border">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl text-foreground">
                TySecure
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Intégrateur domotique expert en cybersécurité.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@tysecure.fr" className="hover:text-primary transition-colors">
                  contact@tysecure.fr
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>Sur rendez-vous</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Bretagne, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} TySecure. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <a
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Mentions légales
            </a>
            <a
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Made in BZH
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
