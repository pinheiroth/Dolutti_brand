import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const BannerSection = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-sm">
          <img
            src="https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1600&q=80"
            alt="Promoção bolsas Dolutti"
            className="w-full h-[500px] md:h-[600px] object-cover"
          />
          <div className="absolute inset-0 bg-foreground/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom">
              <div className="max-w-lg">
                <span className="text-primary-foreground/80 text-xs tracking-[0.3em] uppercase">
                  Oferta Especial
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground font-medium mt-4 leading-tight">
                  Até 30% Off
                  <br />
                  Coleção Anterior
                </h2>
                <p className="text-primary-foreground/90 mt-4 max-w-sm">
                  Bolsas selecionadas em couro legítimo com descontos exclusivos.
                </p>
                <Button variant="hero" size="lg" className="mt-8" asChild>
                  <Link to="/produtos?promocao=true">Ver Ofertas</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
          <div className="text-center text-sm text-muted-foreground mt-6">
          Frete grátis em compras acima de R$ 499 · Parcele em até 10x sem juros
        </div>
      </div>
    </section>
  );
};
