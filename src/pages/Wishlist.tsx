import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { fetchProducts } from "@/store/productsSlice";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import Layout from "@/components/Layout";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const { ids } = useAppSelector((s) => s.wishlist);
  const { items } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, [dispatch, items.length]);

  const wishlistProducts = items.filter((p) => ids.includes(p.id));

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-8 font-display text-2xl font-bold">Wishlist ({ids.length})</h1>
        {wishlistProducts.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Save items you love to your wishlist and they'll show up here."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {wishlistProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
