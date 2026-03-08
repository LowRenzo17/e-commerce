import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/30">
    <div className="container py-16">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-4 font-display text-lg font-bold">LUXE<span className="text-gradient">.</span></h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Curated premium products for the modern lifestyle. Quality meets design.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Shop</h4>
          <div className="flex flex-col gap-2">
            {["Electronics", "Fashion", "Home", "Accessories"].map((c) => (
              <Link key={c} to={`/products?category=${c.toLowerCase()}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {c}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Company</h4>
          <div className="flex flex-col gap-2">
            {["About", "Careers", "Press", "Sustainability"].map((item) => (
              <span key={item} className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Support</h4>
          <div className="flex flex-col gap-2">
            {["Contact", "FAQ", "Shipping", "Returns"].map((item) => (
              <span key={item} className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 LUXE. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
