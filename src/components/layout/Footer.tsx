import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  ArrowRight,
} from "lucide-react";

const footerLinks = [
  {
    title: "Coleção",
    links: [
      { label: "Novidades", href: "/produtos?categoria=novidades" },
      { label: "Bolsas de Mão", href: "/produtos?categoria=bolsas-de-mao" },
      { label: "Tiracolo", href: "/produtos?categoria=tiracolo" },
      { label: "Mochilas", href: "/produtos?categoria=mochilas" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { label: "Contato", href: "/contato" },
      { label: "FAQ", href: "/faq" },
      { label: "Trocas e Devoluções", href: "/trocas" },
      { label: "Rastrear Pedido", href: "/rastrear" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[#0B0B0B] text-white overflow-hidden">

      <div className="container-custom">

        {/* HERO DO FOOTER */}
        <div className="py-24 md:py-32 border-b border-white/10">

          <div className="max-w-5xl">

            <img
              src="/logo_dolutti_header_rm.png"
              alt="Dolutti"
              className="h-12 md:h-16 w-auto mb-10"
            />

            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Couro legítimo.
              <span className="block italic font-light">
                Feito para durar.
              </span>
            </h2>

            <p className="mt-8 text-white/60 max-w-2xl text-lg leading-relaxed">
              Bolsas artesanais produzidas com materiais selecionados,
              acabamento refinado e design atemporal.
              Cada peça é criada para acompanhar sua jornada por muitos anos.
            </p>

          </div>

        </div>

        {/* CONTEÚDO */}
        <div className="grid lg:grid-cols-2 gap-20 py-20">

          {/* NEWSLETTER */}
          <div>

            <span className="uppercase tracking-[0.3em] text-xs text-white/40">
              Newsletter
            </span>

            <h3 className="font-display text-3xl md:text-4xl mt-4">
              Receba novidades exclusivas
            </h3>

            <p className="text-white/60 mt-4 max-w-md leading-relaxed">
              Conheça lançamentos, coleções limitadas e conteúdos
              exclusivos antes de todo mundo.
            </p>

            <div className="mt-10 max-w-lg border-b border-white/20 flex items-center pb-4">

              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-1 bg-transparent outline-none placeholder:text-white/30"
              />

              <button className="flex items-center gap-2 uppercase tracking-[0.25em] text-xs hover:opacity-70 transition">
                Enviar
                <ArrowRight size={14} />
              </button>

            </div>

          </div>

          {/* LINKS */}
          <div className="grid grid-cols-2 gap-12">

            {footerLinks.map((group) => (
              <div key={group.title}>

                <h4 className="uppercase tracking-[0.25em] text-xs text-white/40 mb-6">
                  {group.title}
                </h4>

                <ul className="space-y-4">

                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}

                </ul>

              </div>
            ))}

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-8 text-sm text-white/40">

            <Link
              to="/privacidade"
              className="hover:text-white transition-colors"
            >
              Política de Privacidade
            </Link>

            <Link
              to="/termos"
              className="hover:text-white transition-colors"
            >
              Termos de Uso
            </Link>

          </div>

          <div className="flex items-center gap-5">

            <a
              href="#"
              aria-label="Instagram"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="text-white/50 hover:text-white transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>

          </div>

          <p className="text-xs text-white/30 text-center md:text-right">
            © 2026 Dolutti. Todos os direitos reservados.
          </p>

        </div>

      </div>

    </footer>
  );
};