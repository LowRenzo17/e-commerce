import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store";
import { clearCart } from "@/store/cartSlice";
import Layout from "@/components/Layout";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Checkout = () => {
  const { items } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", address: "", city: "", state: "", zipCode: "", country: "", phone: "", email: "",
  });

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.fullName || !form.address || !form.city || !form.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    // Simulate order
    await new Promise((r) => setTimeout(r, 1500));
    dispatch(clearCart());
    toast.success("Order placed successfully!");
    navigate("/");
    setLoading(false);
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent";

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="mb-8 font-display text-2xl font-bold">Checkout</h1>
        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
          {/* Shipping */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 lg:col-span-2">
            <div className="rounded-xl border border-border p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">Shipping Address</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Full Name *</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} className={inputClass} required />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} required />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Address *</label>
                  <input name="address" value={form.address} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">City *</label>
                  <input name="city" value={form.city} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">State</label>
                  <input name="state" value={form.state} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">ZIP Code</label>
                  <input name="zipCode" value={form.zipCode} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border p-6">
              <h3 className="mb-4 font-display text-lg font-semibold">Payment Method</h3>
              <div className="flex flex-col gap-2">
                {["Credit Card", "PayPal", "Apple Pay"].map((m, i) => (
                  <label key={m} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${i === 0 ? "border-accent bg-accent-soft" : "border-border hover:bg-secondary"}`}>
                    <input type="radio" name="payment" defaultChecked={i === 0} className="accent-accent" />
                    <span className="text-sm font-medium">{m}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Summary */}
          <div className="rounded-xl border border-border p-6 h-fit">
            <h3 className="mb-4 font-display text-lg font-semibold">Order Summary</h3>
            <div className="mb-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <img src={item.product.images[0]} alt="" className="h-12 w-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between border-t border-border pt-2 font-display font-semibold text-base">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-lg bg-primary py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? "Processing..." : `Place Order • $${total.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Checkout;
