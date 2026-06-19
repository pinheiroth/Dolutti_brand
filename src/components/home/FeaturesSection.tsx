import { Shield, Sparkles, Scissors, Truck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Couro Legítimo",
    description:
      "Selecionado cuidadosamente para garantir durabilidade e personalidade únicas.",
  },
  {
    icon: Scissors,
    title: "Produção Artesanal",
    description:
      "Cada peça recebe atenção aos detalhes e acabamento manual refinado.",
  },
  {
    icon: Sparkles,
    title: "Design Atemporal",
    description:
      "Criadas para atravessar tendências e acompanhar você por muitos anos.",
  },
  {
    icon: Truck,
    title: "Entrega Segura",
    description:
      "Envio para todo o Brasil com embalagem premium e rastreamento.",
  },
];

export const FeaturesSection = () => {
  return (
    <section className="bg-white py-28">
      <div className="container-custom">

        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="uppercase tracking-[0.35em] text-xs text-muted-foreground">
            Nossos Diferenciais
          </span>

          <h2 className="font-display text-4xl md:text-6xl mt-6 leading-tight">
            Feitas para durar.
          </h2>

          <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
            Unimos matéria-prima premium, técnicas artesanais e design
            atemporal para criar bolsas que permanecem relevantes ano após ano.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto rounded-full border border-black/10 flex items-center justify-center mb-6">
                <feature.icon
                  className="w-7 h-7"
                  strokeWidth={1.5}
                />
              </div>

              <h3 className="font-display text-xl mb-4">
                {feature.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};