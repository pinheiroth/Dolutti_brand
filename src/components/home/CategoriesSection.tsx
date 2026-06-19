import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const categories = [
  {
    name: "Bolsas de Mão",
    slug: "bolsas-de-mao",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
    ],
  },
  {
    name: "Tiracolo",
    slug: "tiracolo",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=1200&q=80",
    ],
  },
  {
    name: "Mochilas",
    slug: "mochilas",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80",
    ],
  },
];

function CategoryCard({
  category,
}: {
  category: (typeof categories)[0];
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % category.images.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [category.images.length]);

  return (
    <Link
      to={`/produtos?categoria=${category.slug}`}
      className="group block"
    >
      <div className="relative overflow-hidden rounded-[24px] aspect-[3/4]">

        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={category.images[current]}
            alt={category.name}
            initial={{
              opacity: 0,
              scale: 1.06,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 1.02,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h3 className="font-display text-white text-2xl md:text-3xl">
            {category.name}
          </h3>

          <div className="mt-3 flex items-center gap-2 text-white/80 uppercase tracking-[0.2em] text-xs">
            Explorar
            <span className="w-8 h-px bg-white transition-all duration-300 group-hover:w-14" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export const CategoriesSection = () => {
  return (
    <section className="bg-[#F8F5F0] py-24 md:py-32">
      <div className="container-custom">

        <div className="text-center mb-16">
          <span className="uppercase tracking-[0.35em] text-xs text-muted-foreground">
            Categorias
          </span>

          <h2 className="font-display text-4xl md:text-6xl mt-5">
            Explore a coleção
          </h2>

          <p className="max-w-2xl mx-auto mt-5 text-muted-foreground">
            Modelos desenvolvidos para unir elegância,
            funcionalidade e acabamento artesanal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
            />
          ))}
        </div>

      </div>
    </section>
  );
};