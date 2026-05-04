import { Link } from "react-router-dom";
import { Heart, ShoppingBag, X } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

const Wishlist = () => {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product);
  };

  return (
    <Layout>
      <div className="container-custom py-8">
        <BreadcrumbNav items={[{ label: "Lista de Desejos" }]} />

        <div className="mt-6 mb-10">
          <span className="eyebrow">Favoritos</span>
          <h1 className="font-display text-3xl md:text-4xl font-medium mt-2">
            Lista de Desejos
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-8">
              <Heart className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-medium mb-4">Sua lista está vazia</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Salve as bolsas que você ama e volte quando quiser.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link to="/produtos">Explorar Bolsas</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground mb-6">
              {items.length} {items.length === 1 ? "item" : "itens"} na sua lista
            </p>

            <div className="grid gap-4">
              {items.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-6 p-4 bg-card rounded-sm border border-border"
                >
                  <Link to={`/produto/${product.id}`} className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-sm"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <Link
                        to={`/produto/${product.id}`}
                        className="font-display text-lg hover:text-accent transition-colors"
                      >
                        {product.name}
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.category}
                      </p>
                      <p className="font-display text-xl mt-2">
                        {formatPrice(product.price)}
                      </p>
                      {product.inStock ? (
                        <p className="text-sm text-green-600 mt-1">Em estoque</p>
                      ) : (
                        <p className="text-sm text-destructive mt-1">Esgotado</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="primary"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(product.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
