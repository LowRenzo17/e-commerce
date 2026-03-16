import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@/store";
import Index from "./pages/Index";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";
import StaticPage from "./pages/StaticPage";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/about"
              element={
                <StaticPage
                  title="About LUXE"
                  lead="We’re building a clean, premium shopping experience with curated essentials and fast checkout."
                  sections={[
                    { title: "Curated essentials", body: "We focus on quality, utility, and timeless design—products that elevate the everyday." },
                    { title: "Customer-first", body: "Clear pricing, quick browsing, and a checkout flow designed to be frictionless." },
                  ]}
                />
              }
            />
            <Route
              path="/contact"
              element={
                <StaticPage
                  title="Contact"
                  lead="Need help with an order, returns, or product questions? We’re here to help."
                  sections={[
                    { title: "Support", body: "Email us at support@luxe.example or use the in-app chat (coming soon)." },
                    { title: "Hours", body: "Mon–Fri, 9am–5pm local time." },
                  ]}
                />
              }
            />
            <Route
              path="/faq"
              element={
                <StaticPage
                  title="FAQ"
                  lead="Quick answers to common questions."
                  sections={[
                    { title: "Shipping", body: "Orders over $100 ship free. Standard shipping is a flat rate at checkout." },
                    { title: "Returns", body: "30-day returns on eligible items in original condition." },
                  ]}
                />
              }
            />
            <Route
              path="/shipping"
              element={
                <StaticPage
                  title="Shipping"
                  lead="Shipping details, timelines, and costs."
                  sections={[
                    { title: "Rates", body: "Free shipping on orders over $100. Otherwise a flat shipping fee applies." },
                    { title: "Timeline", body: "Most orders arrive within 3–7 business days (demo data)." },
                  ]}
                />
              }
            />
            <Route
              path="/returns"
              element={
                <StaticPage
                  title="Returns"
                  lead="Simple returns with clear guidelines."
                  sections={[
                    { title: "30-day policy", body: "Return eligible items within 30 days of delivery." },
                    { title: "Refunds", body: "Refunds are issued to the original payment method after inspection." },
                  ]}
                />
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
