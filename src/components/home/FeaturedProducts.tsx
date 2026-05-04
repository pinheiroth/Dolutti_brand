import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/data/products";

export const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-20 md:py-28">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="eyebrow">Destaques</span>
            <h2 className="font-display text-3xl md:text-4xl font-medium mt-3">
              Bolsas Mais Desejadas
            </h2>
          </div>
          <Link 
            to="/produtos" 
            className="group flex items-center gap-2 text-sm tracking-wide uppercase mt-4 md:mt-0 hover:text-accent transition-colors"
          >
            Ver Todos
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} columns={4} />
      </div>
    </section>
  );
};
