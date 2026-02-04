import { Link } from "react-router-dom";
import { ChevronRight, FileText, Layers, Code } from "lucide-react";

export function MarketplaceHeader() {
  return (
    <section className="section-gradient py-12 lg:py-16" aria-labelledby="marketplace-title">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-4">
          <Link to="/" className="hover:text-[hsl(var(--orange))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--orange))] focus:ring-offset-2 rounded px-1">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <Link to="/marketplaces" className="hover:text-[hsl(var(--orange))] transition-colors focus:outline-none focus:ring-2 focus:ring-[hsl(var(--orange))] focus:ring-offset-2 rounded px-1">
            Marketplaces
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <span className="font-medium text-foreground" aria-current="page">Blueprints</span>
        </nav>

        {/* Dual Phase Badges */}
        <div className="flex items-center gap-2 mb-3" role="list" aria-label="Available phases">
          <span className="badge-design inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase" role="listitem">
            Design
          </span>
          <span className="text-gray-400" aria-hidden="true">+</span>
          <span className="badge-deploy inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase" role="listitem">
            Deploy
          </span>
        </div>

        {/* Title & Description */}
        <h1 id="marketplace-title" className="text-3xl lg:text-4xl font-bold text-primary-navy mb-3">
          DTMP Blueprints
        </h1>
        <p className="text-base lg:text-lg text-muted-foreground max-w-3xl mb-4">
          Access comprehensive technical architecture blueprints and implementation guides for building digital platforms. From solution specifications to deployment instructions, find everything you need to design and deploy enterprise-grade solutions.
        </p>

        {/* Marketplace Statistics */}
        <div className="flex gap-6 text-sm text-muted-foreground" role="list" aria-label="Marketplace statistics">
          <span className="flex items-center gap-2" role="listitem">
            <FileText className="w-4 h-4" aria-hidden="true" />
            <span aria-label="39 total blueprints available">39 Total Blueprints</span>
          </span>
          <span className="flex items-center gap-2" role="listitem">
            <Layers className="w-4 h-4" aria-hidden="true" />
            <span>Architecture Diagrams</span>
          </span>
          <span className="flex items-center gap-2" role="listitem">
            <Code className="w-4 h-4" aria-hidden="true" />
            <span>Implementation Guides</span>
          </span>
        </div>
      </div>
    </section>
  );
}
