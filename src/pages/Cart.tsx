import { Link } from "react-router-dom";
import { Minus, Plus, X, ArrowLeft, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BreadcrumbNav } from "@/components/ui/breadcrumb-nav";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";

const Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-custom py-8">
          <BreadcrumbNav items={[{ label: "Carrinho" }]} />
          <div className="py-20 md:py-28 text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-8">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-medium mb-4">
              Seu carrinho está vazio
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Descubra nossas bolsas em couro legítimo e comece a montar uma seleção que dura para sempre.
            </p>
            <Button variant="primary" size="lg" asChild>
              <Link to="/produtos">Explorar Bolsas</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const shippingThreshold = 499;
  const remaining = Math.max(0, shippingThreshold - totalPrice);
  const progress = Math.min(100, (totalPrice / shippingThreshold) * 100);

  return (
    <Layout>
      <div className="container-custom py-8">
        <BreadcrumbNav items={[{ label: "Carrinho" }]} />

        <div className="flex items-end justify-between mt-6 mb-10">
          <div>
            <span className="eyebrow">Sacola</span>
            <h1 className="font-display text-3xl md:text-4xl font-medium mt-2">
              Seu carrinho · {items.length} {items.length === 1 ? "item" : "itens"}
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors hidden sm:inline"
          >
            Limpar carrinho
          </button>
        </div>

        {/* Frete progress */}
        {remaining > 0 ? (
          <div className="bg-secondary/60 border border-border p-4 mb-10 rounded-sm">
            <p className="text-sm text-foreground">
              Faltam <span className="font-medium text-accent">{formatPrice(remaining)}</span> para frete grátis.
            </p>
            <div className="mt-3 h-1 bg-background rounded-full overflow-hidden">
              <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : (
          <div className="bg-accent/10 border border-accent/30 text-accent p-4 mb-10 rounded-sm flex items-center gap-3">
            <Truck className="h-4 w-4" />
            <p className="text-sm font-medium">Você ganhou frete grátis!</p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Items */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-border">
              {items.map((item) => (
                <div 
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  className="py-6 flex gap-6"
                >
                  <Link 
                    to={`/produto/${item.product.id}`}
                    className="w-28 h-36 bg-secondary rounded-sm overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4">
                      <div>
                        <Link 
                          to={`/produto/${item.product.id}`}
                          className="font-medium hover:text-accent transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                          {item.selectedSize && <p>Tamanho: {item.selectedSize}</p>}
                          {item.selectedColor && <p>Cor: {item.selectedColor}</p>}
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-2 hover:bg-secondary transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link 
              to="/produtos"
              className="inline-flex items-center gap-2 text-sm mt-8 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continuar comprando
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-sm p-6 sticky top-32 shadow-soft">
              <h2 className="font-display text-xl font-medium mb-6">Resumo do Pedido</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Frete</span>
                  <span className="text-accent">
                    {totalPrice >= shippingThreshold ? "Grátis" : "Calculado no checkout"}
                  </span>
                </div>
              </div>

              <div className="border-t border-border mt-6 pt-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium">Total</span>
                  <span className="font-display text-2xl">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4">
                  ou em até <span className="text-foreground font-medium">10x de {formatPrice(totalPrice / 10)}</span> sem juros
                </p>

                <Button variant="primary" size="lg" className="w-full" asChild>
                  <Link to="/checkout">Finalizar Compra</Link>
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Cupom de desconto"
                    className="flex-1 px-3 py-2 bg-background border border-border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  <Button variant="minimal" size="sm">
                    Aplicar
                  </Button>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Compra 100% segura e criptografada
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-accent" />
                  Envio em até 48h úteis
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
