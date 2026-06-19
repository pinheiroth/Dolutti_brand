import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";

import heroBag from "@/assets/img_hero.png";

export const HeroSection = () => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 600], [1, 0.88]);

  const borderRadius = useTransform(
    scrollY,
    [0, 400],
    [0, 32]
  );

  const opacity = useTransform(
    scrollY,
    [0, 250],
    [1, 0]
  );

  const y = useTransform(
    scrollY,
    [0, 300],
    [0, -120]
  );

  return (
    <section className="relative h-[160vh] bg-[#0b0b0b]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{
            scale,
            borderRadius,
          }}
          className="relative h-full w-full overflow-hidden"
        >
          <img
            src={heroBag}
            alt="Bolsa artesanal em couro"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Conteúdo */}
          <motion.div
            style={{
              opacity,
              y,
            }}
            className="absolute inset-0 z-20 flex items-center"
          >
            <div className="container-custom ">
              <div className="max-w-3xl">

                <span className="block text-white/80 uppercase tracking-[0.35em] text-xs md:text-sm mb-6">
                  Coleção 2026
                </span>

                <h1 className="font-display text-white text-5xl md:text-7xl lg:text-8xl xl:text-[110px] leading-[0.9] font-light">
                  Bolsas em couro
                  <span className="block font-normal">
                    feitas à mão.
                  </span>
                </h1>

                <p className="mt-8 text-white/80 text-lg md:text-xl max-w-xl leading-relaxed">
                  Design atemporal, couro legítimo e produção artesanal.
                  Peças criadas para acompanhar você por muitos anos.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-10">
                  <Button
                    size="lg"
                    className="h-14 px-8 rounded-none bg-white text-black hover:bg-white/90"
                    asChild
                  >
                    <Link to="/produtos">
                      Explorar Coleção
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 rounded-none border-white text-white bg-transparent hover:bg-white hover:text-black"
                    asChild
                  >
                    <Link to="/sobre">
                      Nossa História
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};