import { Link } from "react-router-dom";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
  style?: React.CSSProperties;
}

export const ProductCard = ({ product, className, style }: ProductCardProps) => {
  const { addItem } = useCart();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round((1 - product.price / product.originalPrice!) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link 
      to={`/produto/${product.id}`}
      className={cn("group block", className)}
      style={style}
    >
      <div className="relative aspect-[4/5] bg-secondary overflow-hidden rounded-sm mb-4">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {hasDiscount && (
            <span className="px-2.5 py-1 bg-foreground text-background text-[10px] font-medium tracking-widest uppercase">
              -{discountPercent}%
            </span>
          )}
          {product.featured && !hasDiscount && (
            <span className="px-2.5 py-1 bg-accent text-accent-foreground text-[10px] font-medium tracking-widest uppercase">
              Destaque
            </span>
          )}
          {!product.inStock && (
            <span className="px-2.5 py-1 bg-muted text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
              Esgotado
            </span>
          )}
        </div>

        {/* Quick add */}
        {product.inStock && (
          <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleQuickAdd}
              className="w-full py-3 bg-foreground text-background text-xs tracking-[0.2em] uppercase hover:bg-accent transition-colors"
            >
              Adicionar
            </button>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <h3 className="font-display text-lg leading-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium tracking-wide">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-muted-foreground text-xs line-through">
              {formatPrice(product.originalPrice!)}
            </span>
          )}
        </div>
        {product.colors && product.colors.length > 1 && (
          <div className="flex gap-1.5 pt-1">
            {product.colors.map((color) => (
              <span
                key={color.name}
                className="w-3 h-3 rounded-full border border-border ring-1 ring-background"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};
