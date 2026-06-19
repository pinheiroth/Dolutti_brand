import atelierImg from "@/assets/atelie.jpeg";

export const BrandStorySection = () => {
  return (
    <section className="bg-[#111111] text-white py-24 md:py-36 overflow-hidden">
      <div className="container-custom">

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center">

          {/* Imagem */}
          <div className="relative">
            <div className="overflow-hidden rounded-[24px]">
              <img
                src={atelierImg}
                alt="Produção artesanal"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </div>

          {/* Conteúdo */}
          <div>

            <span className="uppercase tracking-[0.35em] text-xs text-white/50">
              Nossa História
            </span>

            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[1] mt-6">
              Cada bolsa
              <span className="block italic font-normal">
                começa com uma escolha.
              </span>
            </h2>

            <p className="mt-8 text-white/70 text-lg leading-relaxed">
              Acreditamos que os melhores produtos não seguem tendências.
              Eles atravessam gerações.
            </p>

            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Selecionamos cuidadosamente cada couro, valorizando
              texturas naturais, acabamentos autênticos e processos
              artesanais que transformam matéria-prima em peças únicas.
            </p>

            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Cada detalhe é pensado para unir elegância,
              funcionalidade e durabilidade em uma bolsa
              feita para acompanhar sua história.
            </p>

            {/* Números */}
            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-white/10">

              <div>
                <div className="text-3xl md:text-4xl font-light">
                  100%
                </div>
                <div className="text-sm text-white/50 mt-2">
                  Couro legítimo
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-light">
                  Artesanal
                </div>
                <div className="text-sm text-white/50 mt-2">
                  Produção manual
                </div>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-light">
                  Atemporal
                </div>
                <div className="text-sm text-white/50 mt-2">
                  Design duradouro
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};