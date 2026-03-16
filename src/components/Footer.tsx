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
            <Link to="/about" className="text-sm text-muted-foreground transition-colors hover:text-foreground">About</Link>
            <span className="text-sm text-muted-foreground">Careers (coming soon)</span>
            <span className="text-sm text-muted-foreground">Press (coming soon)</span>
            <span className="text-sm text-muted-foreground">Sustainability (coming soon)</span>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Support</h4>
          <div className="flex flex-col gap-2">
            <Link to="/contact" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
            <Link to="/faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">FAQ</Link>
            <Link to="/shipping" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Shipping</Link>
            <Link to="/returns" className="text-sm text-muted-foreground transition-colors hover:text-foreground">Returns</Link>
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
