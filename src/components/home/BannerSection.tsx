import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const BannerSection = () => {
  return (
    <section className="bg-[#111111] py-32 md:py-40 overflow-hidden">
      <div className="container-custom">

        <div className="relative overflow-hidden rounded-[32px]">

          <img
            src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1800&q=80"
            alt="Coleção Dolutti"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 px-8 md:px-16 py-24 md:py-40">

            <div className="max-w-3xl">

              <span className="uppercase tracking-[0.35em] text-xs text-white/70">
                Coleção Exclusiva
              </span>

              <h2 className="font-display text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] mt-6">
                Uma bolsa
                <span className="block italic font-normal">
                  conta histórias.
                </span>
              </h2>

              <p className="text-white/80 text-lg md:text-xl max-w-xl mt-8 leading-relaxed">
                Criadas para acompanhar momentos importantes,
                feitas com couro legítimo e acabamento artesanal.
              </p>

              <Button
                size="lg"
                className="mt-10 h-14 px-8 rounded-none bg-white text-black hover:bg-white/90"
                asChild
              >
                <Link to="/produtos">
                  Explorar Coleção
                </Link>
              </Button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};