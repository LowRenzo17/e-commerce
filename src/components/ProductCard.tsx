import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SafeImage from "@/components/SafeImage";

interface Props {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: Props) => {
  const dispatch = useAppDispatch();
  const wishlisted = useAppSelector((s) => s.wishlist.ids.includes(product.id));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product }));
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product.id));
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-xl bg-secondary/50">
          {/* Badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
            {discount > 0 && (
              <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                -{discount}%
              </span>
            )}
            {product.tags?.includes("new") && (
              <span className="rounded-md bg-foreground px-2 py-0.5 text-xs font-semibold text-background">
                New
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${wishlisted ? "fill-accent text-accent" : "text-muted-foreground"}`} />
          </button>

          {/* Image */}
          <div className="aspect-square overflow-hidden">
            <SafeImage
              src={product.images?.[0]}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>

          {/* Quick add */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="flex w-full items-center justify-center gap-2 bg-primary/90 px-4 py-3 text-sm font-medium text-primary-foreground backdrop-blur-sm transition-colors hover:bg-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-3 space-y-1">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-accent text-accent" />
            <span className="text-xs text-muted-foreground">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <h3 className="text-sm font-medium leading-tight line-clamp-1">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-semibold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
