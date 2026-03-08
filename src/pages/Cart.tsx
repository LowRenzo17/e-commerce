import { Link } from "react-router-dom";
import { Minus, Plus, X, ArrowRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { updateQuantity, removeFromCart } from "@/store/cartSlice";
import EmptyState from "@/components/EmptyState";
import Layout from "@/components/Layout";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((s) => s.cart);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <Layout>
        <EmptyState title="Your cart is empty" description="Looks like you haven't added anything yet. Explore our collection to find something you'll love." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-8 font-display text-2xl font-bold">Shopping Cart</h1>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Items */}
          <div className="space-y-4 lg:col-span-2">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 rounded-xl border border-border p-4"
                >
                  <Link to={`/product/${item.product.id}`} className="shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link to={`/product/${item.product.id}`} className="text-sm font-medium hover:text-accent">
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-xs capitalize text-muted-foreground">{item.product.category}</p>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.product.id))}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity - 1 }))}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity + 1 }))}
                          className="px-2 py-1 text-muted-foreground hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-display text-sm font-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <Link to="/products" className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover">
              ← Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div className="rounded-xl border border-border p-6">
            <h3 className="mb-4 font-display text-lg font-semibold">Order Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="border-t border-border pt-3 flex justify-between font-display font-semibold text-base">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            {shipping > 0 && (
              <p className="mt-3 text-xs text-muted-foreground">Add ${(100 - subtotal).toFixed(2)} more for free shipping</p>
            )}
            <Link
              to="/checkout"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
