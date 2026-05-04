import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Minus, Plus, Heart, Share2, Truck, RefreshCw, ShieldCheck, Award } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/ProductGrid";
import { getProductById, products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const product = getProductById(id || "");
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-20 text-center">
          <h1 className="font-display text-3xl mb-4">Produto não encontrado</h1>
          <Button variant="minimal" asChild>
            <Link to="/produtos">Voltar aos produtos</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({ title: "Selecione um tamanho", variant: "destructive" });
      return;
    }
    if (product?.colors && product.colors.length > 0 && !selectedColor) {
      toast({ title: "Selecione uma cor", variant: "destructive" });
      return;
    }
    addItem(product, quantity, selectedSize, selectedColor);
    toast({ title: "Adicionado ao carrinho" });
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container-custom py-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Voltar
        </button>
      </div>

      {/* Product */}
      <div className="container-custom pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-secondary rounded-sm overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors",
                      selectedImage === index ? "border-foreground" : "border-transparent"
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:py-8">
            <div className="sticky top-32">
              <span className="eyebrow">{product.category.replace(/-/g, " ")}</span>
              <h1 className="font-display text-3xl md:text-4xl font-medium mt-3">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-3 mt-4">
                <span className="font-display text-3xl font-medium">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <span className="text-muted-foreground line-through text-sm">
                    {formatPrice(product.originalPrice!)}
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                em até <span className="text-foreground font-medium">10x de {formatPrice(product.price / 10)}</span> sem juros
              </p>

              <p className="text-muted-foreground mt-6 leading-relaxed">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-medium mb-3">
                    Cor: {selectedColor || "Selecione"}
                  </h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                          "w-10 h-10 rounded-full border-2 transition-all",
                          selectedColor === color.name 
                            ? "border-foreground scale-110" 
                            : "border-border hover:border-muted-foreground"
                        )}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium">Tamanho</h3>
                    <button className="text-xs text-muted-foreground underline">
                      Guia de tamanhos
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[48px] h-12 px-4 border transition-colors",
                          selectedSize === size
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mt-8">
                <h3 className="text-sm font-medium mb-3">Quantidade</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-secondary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                <Button
                  variant="primary"
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {product.inStock ? "Adicionar ao Carrinho" : "Esgotado"}
                </Button>
                <Button
                  variant="minimal"
                  size="icon"
                  className="h-14 w-14"
                  onClick={() => toggleItem(product)}
                  aria-label="Favoritar"
                >
                  <Heart className={cn("h-5 w-5", isInWishlist(product.id) && "fill-accent text-accent")} />
                </Button>
                <Button variant="minimal" size="icon" className="h-14 w-14" aria-label="Compartilhar">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* Info cards */}
              <div className="grid grid-cols-2 gap-4 mt-10 pt-8 border-t border-border">
                <div className="flex items-start gap-3">
                  <Truck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium">Frete Grátis</p>
                    <p className="text-xs text-muted-foreground">Acima de R$ 499</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RefreshCw className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium">Troca Fácil</p>
                    <p className="text-xs text-muted-foreground">30 dias</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium">Garantia 1 ano</p>
                    <p className="text-xs text-muted-foreground">Couro legítimo</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="text-sm font-medium">Feito à mão</p>
                    <p className="text-xs text-muted-foreground">Por mestres artesãos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-20 border-t border-border">
            <h2 className="font-display text-2xl md:text-3xl font-medium mb-8">
              Você também pode gostar
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetail;
