import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Minus, Plus, Heart, ShoppingCart, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProductById, fetchProducts } from "@/store/productsSlice";
import { addToCart } from "@/store/cartSlice";
import { toggleWishlist } from "@/store/wishlistSlice";
import { ProductDetailSkeleton } from "@/components/ProductSkeleton";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import EmptyState from "@/components/EmptyState";
import SafeImage from "@/components/SafeImage";
import { mockReviews } from "@/data/mockProducts";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedProduct: product, items: allProducts, loading } = useAppSelector((s) => s.products);
  const wishlisted = useAppSelector((s) => s.wishlist.ids.includes(id || ""));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
    if (allProducts.length === 0) dispatch(fetchProducts());
  }, [id, dispatch, allProducts.length]);

  if (loading) return <Layout><ProductDetailSkeleton /></Layout>;
  if (!product) {
    return (
      <Layout>
        <EmptyState
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          actionLabel="Back to shop"
          actionTo="/products"
        />
      </Layout>
    );
  }

  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Breadcrumb */}
        <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-4 w-4" /> Back to shop
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="overflow-hidden rounded-xl bg-secondary/50">
              <SafeImage src={product.images?.[selectedImage]} alt={product.name} className="aspect-square w-full object-cover" />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`overflow-hidden rounded-lg border-2 transition-colors ${i === selectedImage ? "border-accent" : "border-transparent"}`}
                  >
                    <SafeImage src={img} alt="" className="h-16 w-16 object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <p className="mb-1 text-sm capitalize text-muted-foreground">{product.category}</p>
              <h1 className="font-display text-2xl font-bold sm:text-3xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-border"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="rounded-md bg-accent-soft px-2 py-0.5 text-sm font-semibold text-accent">
                  Save ${(product.originalPrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Quantity + Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-lg border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2.5 text-muted-foreground hover:text-foreground">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-10 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2.5 text-muted-foreground hover:text-foreground">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex-initial"
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={() => { dispatch(toggleWishlist(product.id)); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist"); }}
                className={`flex h-11 w-11 items-center justify-center rounded-lg border transition-colors ${wishlisted ? "border-accent bg-accent-soft text-accent" : "border-border text-muted-foreground hover:bg-secondary"}`}
              >
                <Heart className={`h-4 w-4 ${wishlisted ? "fill-accent" : ""}`} />
              </button>
            </div>

            {/* Details */}
            <div className="space-y-3 border-t border-border pt-6">
              <div className="flex gap-2 text-sm"><span className="text-muted-foreground">Availability:</span> <span className="font-medium text-success">In Stock</span></div>
              <div className="flex gap-2 text-sm"><span className="text-muted-foreground">Category:</span> <span className="font-medium capitalize">{product.category}</span></div>
              <div className="flex gap-2 text-sm"><span className="text-muted-foreground">Free shipping</span> on orders over $100</div>
            </div>
          </motion.div>
        </div>

        {/* Reviews */}
        <section className="mt-16">
          <h2 className="mb-6 font-display text-xl font-bold">Customer Reviews</h2>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border p-5">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{review.userName}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < review.rating ? "fill-accent text-accent" : "text-border"}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 font-display text-xl font-bold">You May Also Like</h2>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
