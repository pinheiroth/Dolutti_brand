import { Link } from "react-router-dom";

const categories = [
  {
    name: "Bolsas de Mão",
    slug: "bolsas-de-mao",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
  },
  {
    name: "Tiracolo",
    slug: "tiracolo",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
  },
  {
    name: "Mochilas",
    slug: "mochilas",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  },
];

export const CategoriesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-secondary/30">
      <div className="container-custom">
        <div className="text-center mb-14">
          <span className="eyebrow">Explore</span>
          <h2 className="font-display text-3xl md:text-4xl font-medium mt-3">
            Por Categoria
          </h2>
          <div className="section-divider mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/produtos?categoria=${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-sm animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="w-full">
                  <h3 className="font-display text-2xl md:text-3xl text-primary-foreground font-medium">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 mt-2 group-hover:text-primary-foreground transition-colors">
                    Explorar
                    <span className="w-6 h-px bg-current transition-all group-hover:w-10" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
