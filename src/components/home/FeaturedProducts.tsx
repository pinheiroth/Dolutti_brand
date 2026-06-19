import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

export const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="relative z-30 -mt-20 bg-[#F8F5F0] rounded-t-[32px] md:rounded-t-[48px] pt-24 md:pt-28 pb-24 overflow-hidden">

      {/* detalhe topo */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-black/15 rounded-full" />

      {/* fundo decorativo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[400px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full border border-black/[0.04]" />
      </div>

      <div className="container-custom relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="uppercase tracking-[0.35em] text-xs text-muted-foreground">
            Coleção Exclusiva
          </span>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl mt-6 leading-[0.95]">
            As favoritas
            <span className="block italic font-light">
              da coleção
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Design atemporal, couro legítimo e acabamento artesanal.
            Peças criadas para acompanhar você por muitos anos.
          </p>

          <Link
            to="/produtos"
            className="inline-flex items-center gap-3 mt-10 uppercase tracking-[0.25em] text-xs hover:opacity-60 transition"
          >
            Explorar Coleção

            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* Produtos */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 1,
            delay: 0.15,
          }}
          className="mt-6"
        >
          <ProductGrid
            products={featuredProducts}
            columns={4}
          />
        </motion.div>

      </div>
    </section>
  );
};