import { memo, useMemo, KeyboardEvent } from "react";
import {
  Star,
  Eye,
  Layers,
  TrendingUp,
  GitBranch,
  Package,
  Code,
  icons,
  type LucideIcon,
} from "lucide-react";
import { SolutionSpec } from "@/data/blueprints/solutionSpecs";
import { SolutionBuild } from "@/data/blueprints/solutionBuilds";

interface BlueprintCardProps {
  blueprint: SolutionSpec | SolutionBuild;
  onClick: () => void;
}

/** Color classes for each solution type badge. */
const solutionTypeColors: Record<string, string> = {
  DBP: "bg-purple-100 text-purple-700",
  DXP: "bg-pink-100 text-pink-700",
  DWS: "bg-blue-100 text-blue-700",
  DIA: "bg-green-100 text-green-700",
  SDO: "bg-orange-100 text-orange-700",
};

/** Color classes for each complexity level badge. */
const complexityColors: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  "Very High": "bg-red-100 text-red-700",
};

export const BlueprintCard = memo(function BlueprintCard({
  blueprint,
  onClick,
}: BlueprintCardProps) {
  // Resolve the Lucide icon component from the string name
  const IconComponent: LucideIcon | undefined = useMemo(
    () => icons[blueprint.icon as keyof typeof icons] as LucideIcon | undefined,
    [blueprint.icon]
  );

  // Determine whether this is a SolutionSpec or a SolutionBuild
  const isSpec = "maturityLevel" in blueprint;

  // Compute the visible tech tags and the overflow count
  const { displayTechnologies, remainingCount } = useMemo(() => {
    const display = blueprint.keyTechnologies.slice(0, 3);
    const remaining = Math.max(blueprint.keyTechnologies.length - 3, 0);
    return { displayTechnologies: display, remainingCount: remaining };
  }, [blueprint.keyTechnologies]);

  // Keyboard handler for Enter / Space activation
  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${blueprint.title}, ${blueprint.solutionTypeShort} blueprint with ${blueprint.complexity} complexity`}
      className="bg-white border-2 border-gray-200 rounded-xl p-6 cursor-pointer hover:border-blue-500 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* ── Card Header ── */}
      <div className="flex justify-between items-start mb-4">
        {/* Icon wrapper */}
        <div
          className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center"
          aria-hidden="true"
        >
          {IconComponent && (
            <IconComponent className="text-blue-600" size={36} />
          )}
        </div>

        {/* Badges area */}
        <div className="flex items-center gap-2">
          {/* Solution type badge */}
          <span
            className={`${
              solutionTypeColors[blueprint.solutionTypeShort] ?? ""
            } px-3 py-1 rounded-full text-xs font-bold uppercase`}
            role="status"
            aria-label={`Solution type: ${blueprint.solutionTypeShort}`}
          >
            {blueprint.solutionTypeShort}
          </span>

          {/* Featured star */}
          {blueprint.featured && (
            <Star
              size={14}
              className="text-yellow-500 fill-yellow-500"
              aria-label="Featured blueprint"
            />
          )}
        </div>
      </div>

      {/* ── Card Content ── */}
      <h3 className="font-bold text-gray-900 mb-2">{blueprint.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {blueprint.description}
      </p>

      {/* ── Blueprint Features ── */}
      <div
        className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2 mb-4"
        role="list"
        aria-label="Blueprint features"
      >
        {/* Scope */}
        <div className="flex items-center gap-2 text-sm text-gray-700" role="listitem">
          <Layers size={14} aria-hidden="true" />
          <span>{blueprint.scope}</span>
        </div>

        {/* Maturity (specs) or Build Complexity (builds) */}
        <div className="flex items-center gap-2 text-sm text-gray-700" role="listitem">
          <TrendingUp size={14} aria-hidden="true" />
          <span>
            {isSpec
              ? (blueprint as SolutionSpec).maturityLevel
              : (blueprint as SolutionBuild).buildComplexity}
          </span>
        </div>

        {/* Architecture Diagrams (specs only) */}
        {isSpec && (blueprint as SolutionSpec).includesDiagrams && (
          <div className="flex items-center gap-2 text-sm text-gray-700" role="listitem">
            <GitBranch size={14} aria-hidden="true" />
            <span>Architecture Diagrams</span>
          </div>
        )}

        {/* Component count (specs only) */}
        {isSpec && (blueprint as SolutionSpec).includesComponents && (
          <div className="flex items-center gap-2 text-sm text-gray-700" role="listitem">
            <Package size={14} aria-hidden="true" />
            <span>{blueprint.componentCount} Components</span>
          </div>
        )}

        {/* Code samples (builds only) */}
        {!isSpec && (blueprint as SolutionBuild).includesCodeSamples && (
          <div className="flex items-center gap-2 text-sm text-gray-700" role="listitem">
            <Code size={14} aria-hidden="true" />
            <span>Code Samples Included</span>
          </div>
        )}
      </div>

      {/* ── Tech Stack Row ── */}
      <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Key technologies">
        {displayTechnologies.map((tech) => (
          <span
            key={tech}
            role="listitem"
            className="bg-blue-50 border border-blue-200 text-blue-700 px-2 py-1 rounded text-xs font-medium"
          >
            {tech}
          </span>
        ))}
        {remainingCount > 0 && (
          <span
            className="text-xs text-gray-500"
            aria-label={`${remainingCount} more technologies`}
          >
            +{remainingCount}
          </span>
        )}
      </div>

      {/* ── Card Footer ── */}
      <div className="flex justify-between items-center">
        {/* Complexity badge */}
        <span
          className={`${
            complexityColors[blueprint.complexity] ?? ""
          } px-3 py-1 rounded-full text-xs font-semibold`}
          role="status"
          aria-label={`Complexity level: ${blueprint.complexity}`}
        >
          {blueprint.complexity}
        </span>

        {/* View Blueprint button */}
        <button
          type="button"
          className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`View ${blueprint.title} blueprint details`}
          tabIndex={-1}
        >
          <Eye size={16} aria-hidden="true" />
          View Blueprint
        </button>
      </div>
    </article>
  );
});
