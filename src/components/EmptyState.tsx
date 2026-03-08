import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  actionTo?: string;
}

const EmptyState = ({ title, description, actionLabel = "Continue Shopping", actionTo = "/products" }: Props) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
      <ShoppingBag className="h-7 w-7 text-muted-foreground" />
    </div>
    <h2 className="mb-2 font-display text-xl font-semibold">{title}</h2>
    <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
    <Link
      to={actionTo}
      className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {actionLabel}
    </Link>
  </div>
);

export default EmptyState;
