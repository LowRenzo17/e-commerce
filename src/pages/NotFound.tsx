import { Link, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  const location = useLocation();

  return (
    <Layout>
      <div className="container flex min-h-[60vh] items-center justify-center py-12">
        <div className="max-w-md text-center">
          <p className="mb-2 text-xs font-semibold tracking-widest text-muted-foreground">ERROR 404</p>
          <h1 className="mb-3 font-display text-3xl font-bold">Page not found</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            No route matches <span className="font-mono">{location.pathname}</span>.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return home
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
