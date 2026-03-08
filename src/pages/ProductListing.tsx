import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducts, setFilters } from "@/store/productsSlice";
import { SortOption } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import EmptyState from "@/components/EmptyState";
import Layout from "@/components/Layout";
import { categories } from "@/data/mockProducts";

const ITEMS_PER_PAGE = 8;

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
];

const ProductListing = () => {
  const dispatch = useAppDispatch();
  const { items, filters, loading } = useAppSelector((s) => s.products);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categoryParam = searchParams.get("category") || "";

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  useEffect(() => {
    if (categoryParam) dispatch(setFilters({ category: categoryParam }));
  }, [categoryParam, dispatch]);

  const filtered = useMemo(() => {
    let result = [...items];
    if (filters.category) result = result.filter((p) => p.category === filters.category);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (filters.minRating > 0) result = result.filter((p) => p.rating >= filters.minRating);
    if (filters.priceRange[1] < 1000) result = result.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    switch (filters.sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [items, filters]);

  const paginated = filtered.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const handleCategoryChange = (cat: string) => {
    dispatch(setFilters({ category: cat }));
    if (cat) setSearchParams({ category: cat });
    else setSearchParams({});
    setPage(1);
  };

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold">
              {filters.category ? categories.find((c) => c.id === filters.category)?.name || "Products" : filters.search ? `Results for "${filters.search}"` : "All Products"}
            </h1>
            <p className="text-sm text-muted-foreground">{filtered.length} products</p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={filters.sort}
              onChange={(e) => dispatch(setFilters({ sort: e.target.value as SortOption }))}
              className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-secondary lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className={`shrink-0 ${filtersOpen ? "fixed inset-0 z-50 bg-background p-6 overflow-y-auto" : "hidden"} lg:relative lg:block lg:w-56`}>
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <h3 className="font-display font-semibold">Filters</h3>
              <button onClick={() => setFiltersOpen(false)}><X className="h-5 w-5" /></button>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold">Category</h4>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${!filters.category ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                >
                  All
                </button>
                {categories.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleCategoryChange(c.id)}
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${filters.category === c.id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                  >
                    {c.icon} {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="mb-6">
              <h4 className="mb-3 text-sm font-semibold">Minimum Rating</h4>
              <div className="flex flex-col gap-1">
                {[0, 4, 4.5].map((r) => (
                  <button
                    key={r}
                    onClick={() => { dispatch(setFilters({ minRating: r })); setPage(1); }}
                    className={`rounded-lg px-3 py-1.5 text-left text-sm transition-colors ${filters.minRating === r ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"}`}
                  >
                    {r === 0 ? "All" : `${r}+ ★`}
                  </button>
                ))}
              </div>
            </div>

            {filters.search && (
              <button
                onClick={() => { dispatch(setFilters({ search: "" })); setPage(1); }}
                className="flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-secondary"
              >
                Clear search <X className="h-3 w-3" />
              </button>
            )}
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : filtered.length === 0 ? (
              <EmptyState
                title="No products found"
                description="Try adjusting your filters or search query."
                actionLabel="Clear Filters"
                actionTo="/products"
              />
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
                  {paginated.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
                {hasMore && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setPage((p) => p + 1)}
                      className="rounded-lg border border-border px-8 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
                    >
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductListing;
