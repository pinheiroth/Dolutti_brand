import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Grid3X3, Grid2X2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/button";
import { products, categories } from "@/data/products";
import { cn } from "@/lib/utils";

const sortOptions = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
  { value: "name", label: "Nome A-Z" },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  
  const activeCategory = searchParams.get("categoria") || "";
  const activeSort = searchParams.get("ordenar") || "relevance";

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filter by category
    if (activeCategory) {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Sort
    switch (activeSort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [activeCategory, activeSort]);

  const handleCategoryChange = (slug: string) => {
    if (slug === activeCategory) {
      searchParams.delete("categoria");
    } else {
      searchParams.set("categoria", slug);
    }
    setSearchParams(searchParams);
  };

  const handleSortChange = (value: string) => {
    searchParams.set("ordenar", value);
    setSearchParams(searchParams);
  };

  return (
    <Layout>
      {/* Header */}
      <div className="bg-secondary/40 py-14 md:py-20 border-b border-border">
        <div className="container-custom text-center">
          <span className="eyebrow">Coleção</span>
          <h1 className="font-display text-4xl md:text-5xl font-medium mt-3">
            {activeCategory 
              ? categories.find(c => c.slug === activeCategory)?.name || "Bolsas"
              : "Todas as Bolsas"
            }
          </h1>
          <div className="section-divider mt-6" />
          <p className="text-muted-foreground text-sm mt-6">
            {filteredProducts.length} {filteredProducts.length === 1 ? "peça encontrada" : "peças encontradas"}
          </p>
        </div>
      </div>

      <div className="container-custom py-8 md:py-12">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <Button
              variant="minimal"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filtros
            </Button>

            {/* Categories */}
            <div className="hidden md:flex items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-sm transition-colors",
                    activeCategory === cat.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort */}
            <select
              value={activeSort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-transparent text-sm border border-border rounded-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* Grid toggle */}
            <div className="hidden md:flex items-center gap-1 border border-border rounded-sm">
              <button
                onClick={() => setGridCols(3)}
                className={cn(
                  "p-2 transition-colors",
                  gridCols === 3 ? "bg-secondary" : "hover:bg-secondary/50"
                )}
              >
                <Grid2X2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                className={cn(
                  "p-2 transition-colors",
                  gridCols === 4 ? "bg-secondary" : "hover:bg-secondary/50"
                )}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile filters */}
        {showFilters && (
          <div className="md:hidden mb-8 pb-6 border-b border-border animate-slide-up">
            <h3 className="font-medium mb-4">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={cn(
                    "px-4 py-2 text-sm rounded-sm transition-colors",
                    activeCategory === cat.slug
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Products grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} columns={gridCols} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Nenhum produto encontrado</p>
            <Button 
              variant="minimal" 
              className="mt-4"
              onClick={() => setSearchParams({})}
            >
              Limpar filtros
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Products;
