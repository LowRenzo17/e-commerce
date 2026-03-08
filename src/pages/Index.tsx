import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts } from "@/store/productsSlice";
import ProductCard from "@/components/ProductCard";
import Layout from "@/components/Layout";
import { categories } from "@/data/mockProducts";
import heroBanner from "@/assets/hero-banner.jpg";
import promoBanner from "@/assets/promo-banner.jpg";

const Index = () => {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (products.length === 0) dispatch(fetchProducts());
  }, [dispatch, products.length]);

  const featured = products.filter((p) => p.tags?.includes("bestseller")).slice(0, 4);
  const newArrivals = products.filter((p) => p.tags?.includes("new")).slice(0, 4);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBanner} alt="Premium collection" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container relative z-10 flex min-h-[560px] items-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-lg"
          >
            <span className="mb-4 inline-block rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent backdrop-blur-sm">
              New Collection 2026
            </span>
            <h1 className="mb-4 font-display text-4xl font-bold leading-tight text-background sm:text-5xl lg:text-6xl">
              Elevate Your Everyday
            </h1>
            <p className="mb-8 text-base text-background/70 sm:text-lg">
              Discover curated premium products designed for the modern lifestyle.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Shop Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/products?category=electronics"
                className="inline-flex items-center gap-2 rounded-lg border border-background/30 px-6 py-3 text-sm font-medium text-background backdrop-blur-sm transition-colors hover:bg-background/10"
              >
                Explore Electronics
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-secondary/30">
        <div className="container grid grid-cols-1 gap-4 py-6 sm:grid-cols-3">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
            { icon: Shield, title: "Secure Payment", desc: "100% protected" },
            { icon: RotateCcw, title: "Easy Returns", desc: "30-day return policy" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-3 text-center sm:text-left">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft">
                <Icon className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">{title}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Shop by Category</h2>
            <p className="mt-1 text-sm text-muted-foreground">Find exactly what you're looking for</p>
          </div>
          <Link to="/products" className="text-sm font-medium text-accent hover:text-accent-hover">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={`/products?category=${cat.id}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-5 text-center transition-all hover:border-accent/40 hover:shadow-card-hover"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-sm font-medium">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="container pb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">Bestsellers</h2>
              <p className="mt-1 text-sm text-muted-foreground">Our most loved products</p>
            </div>
            <Link to="/products" className="text-sm font-medium text-accent hover:text-accent-hover">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {featured.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <section className="container pb-16">
        <div className="relative overflow-hidden rounded-2xl">
          <img src={promoBanner} alt="Promo" className="h-64 w-full object-cover sm:h-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 sm:px-12">
              <h3 className="mb-2 font-display text-2xl font-bold text-background sm:text-3xl">
                Premium Collection
              </h3>
              <p className="mb-4 text-sm text-background/70">Up to 40% off on selected items</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent-hover"
              >
                Shop the Sale <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="container pb-16">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold">New Arrivals</h2>
              <p className="mt-1 text-sm text-muted-foreground">Fresh drops just for you</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Index;
