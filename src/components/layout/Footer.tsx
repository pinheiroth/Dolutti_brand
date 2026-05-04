import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "Novidades", href: "/produtos?categoria=novidades" },
    { label: "Bolsas de Mão", href: "/produtos?categoria=bolsas-de-mao" },
    { label: "Bolsas Tiracolo", href: "/produtos?categoria=tiracolo" },
    { label: "Mochilas", href: "/produtos?categoria=mochilas" },
    { label: "Carteiras", href: "/produtos?categoria=carteiras" },
    { label: "Promoções", href: "/produtos?promocao=true" },
  ],
  help: [
    { label: "FAQ", href: "/faq" },
    { label: "Envio", href: "/envio" },
    { label: "Trocas e Devoluções", href: "/trocas" },
    { label: "Rastrear Pedido", href: "/rastrear" },
    { label: "Contato", href: "/contato" },
  ],
  company: [
    { label: "Sobre Nós", href: "/sobre" },
    { label: "Sustentabilidade", href: "/sustentabilidade" },
    { label: "Carreiras", href: "/carreiras" },
    { label: "Imprensa", href: "/imprensa" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
              <img src="logo_dolutti_header_rm.png" alt="Dolutti" className="h-7 sm:h-8 md:h-10 w-auto invert" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Bolsas de couro legítimo com design atemporal e acabamento artesanal. Elegância que acompanha você por toda a vida.
            </p>
            <div className="flex gap-4 mt-6">
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">Comprar</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help links */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">Ajuda</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-display text-lg font-medium mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h4 className="font-display text-lg font-medium">Newsletter</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Receba novidades e ofertas exclusivas
              </p>
            </div>
            <div className="flex gap-2 max-w-md w-full md:w-auto">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground text-sm tracking-wide uppercase hover:bg-primary/90 transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2026 Dolutti. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link to="/privacidade" className="hover:text-foreground transition-colors">
              Privacidade
            </Link>
            <Link to="/termos" className="hover:text-foreground transition-colors">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
