const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-square rounded-xl bg-secondary" />
    <div className="mt-3 space-y-2">
      <div className="h-3 w-16 rounded bg-secondary" />
      <div className="h-4 w-3/4 rounded bg-secondary" />
      <div className="h-4 w-20 rounded bg-secondary" />
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="container animate-pulse py-12">
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="aspect-square rounded-xl bg-secondary" />
      <div className="space-y-4">
        <div className="h-8 w-3/4 rounded bg-secondary" />
        <div className="h-6 w-24 rounded bg-secondary" />
        <div className="h-20 rounded bg-secondary" />
        <div className="h-12 w-40 rounded bg-secondary" />
      </div>
    </div>
  </div>
);

export default ProductSkeleton;
