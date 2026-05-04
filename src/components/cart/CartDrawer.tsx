import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-foreground/20 z-50 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-hover animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-xl font-medium">Carrinho</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Seu carrinho está vazio</p>
                <Button 
                  variant="minimal" 
                  className="mt-4"
                  onClick={() => setIsOpen(false)}
                  asChild
                >
                  <Link to="/produtos">Explorar produtos</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item) => (
                  <li key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                    <div className="w-24 h-24 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{item.product.name}</h3>
                      <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        {item.selectedSize && <p>Tamanho: {item.selectedSize}</p>}
                        {item.selectedColor && <p>Cor: {item.selectedColor}</p>}
                      </div>
                      <p className="font-medium text-sm mt-2">
                        {formatPrice(item.product.price)}
                      </p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-secondary rounded transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-secondary rounded transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-border space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Frete calculado no checkout
              </p>
              <Button 
                variant="primary" 
                className="w-full" 
                size="lg"
                asChild
              >
                <Link to="/checkout" onClick={() => setIsOpen(false)}>
                  Finalizar Compra
                </Link>
              </Button>
              <Button 
                variant="minimal" 
                className="w-full"
                onClick={() => setIsOpen(false)}
                asChild
              >
                <Link to="/carrinho">Ver Carrinho</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
