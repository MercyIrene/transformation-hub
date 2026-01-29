import { Link } from "react-router-dom";
import { Grid3x3, ArrowRight } from "lucide-react";
import { Marketplace, phaseColors } from "@/data/marketplaces";

interface MarketplaceCardProps {
  marketplace: Marketplace;
  variant?: "simple" | "enhanced";
}

export function MarketplaceCard({
  marketplace,
  variant = "simple",
}: MarketplaceCardProps) {
  const { icon: Icon, name, description, features, serviceCount, route, phase } =
    marketplace;
  const colors = phaseColors[phase];

  if (variant === "simple") {
    return (
      <Link to={route} className="block">
        <div className="card-marketplace group">
          <div className="icon-gradient w-16 h-16 rounded-lg flex items-center justify-center mb-4">
            <Icon size={32} className="text-purple" />
          </div>

          <h3 className="text-lg font-bold text-foreground mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">
            {description}
          </p>

          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${colors.badge}`}
          >
            {phase}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link to={route} className="block">
      <div className="card-marketplace group">
        <div className="flex justify-between items-start mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase ${colors.badge}`}
          >
            {phase}
          </span>
          <div className="icon-gradient w-16 h-16 rounded-lg flex items-center justify-center">
            <Icon size={32} className="text-purple" />
          </div>
        </div>

        <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 min-h-[60px]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {features.slice(0, 3).map((feature) => (
            <span
              key={feature}
              className="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
            >
              {feature}
            </span>
          ))}
          {features.length > 3 && (
            <span className="bg-phase-discern-bg text-phase-discern px-2 py-1 rounded text-xs font-medium">
              +{features.length - 3} more
            </span>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground flex items-center gap-1">
            <Grid3x3 size={16} />
            {serviceCount} services
          </span>
          <span className="text-accent group-hover:text-orange-hover font-semibold flex items-center gap-1 transition-colors">
            Explore
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}
