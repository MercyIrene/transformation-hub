import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BlueprintCard, MarketplaceHeader } from "@/components/blueprints";
import { LoginModal } from "@/components/learningCenter";
import { SearchBar } from "@/components/learningCenter/SearchBar";
import {
  FilterPanel,
  MobileFilterButton,
} from "@/components/learningCenter/FilterPanel";
import { solutionSpecs, type SolutionSpec } from "@/data/blueprints/solutionSpecs";
import { solutionBuilds, type SolutionBuild } from "@/data/blueprints/solutionBuilds";
import {
  solutionSpecsFilters,
  solutionBuildFilters,
} from "@/data/blueprints/filters";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type TabValue = "solution-specs" | "solution-build";

interface TabConfig {
  value: TabValue;
  label: string;
  shortLabel: string;
  phaseBadge: string;
  phaseBadgeClass: string;
  count: number;
}

interface LoginContext {
  marketplace: string;
  tab: string;
  cardId: string;
  serviceName: string;
  action: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEBOUNCE_DELAY = 300;

const TABS: TabConfig[] = [
  {
    value: "solution-specs",
    label: "Blueprint-led Solution Specs",
    shortLabel: "Solution Specs",
    phaseBadge: "Design",
    phaseBadgeClass: "badge-design",
    count: 25,
  },
  {
    value: "solution-build",
    label: "Solutions Blueprints Build",
    shortLabel: "Solution Build",
    phaseBadge: "Deploy",
    phaseBadgeClass: "badge-deploy",
    count: 14,
  },
];

const SEARCH_PLACEHOLDERS: Record<TabValue, string> = {
  "solution-specs": "Search solution blueprints or platforms...",
  "solution-build": "Search implementation guides or technologies...",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BlueprintsPage() {
  const navigate = useNavigate();

  // --- State ---------------------------------------------------------------
  const [activeTab, setActiveTab] = useState<TabValue>("solution-specs");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loginModal, setLoginModal] = useState<{
    open: boolean;
    context: LoginContext;
  }>({
    open: false,
    context: {
      marketplace: "blueprints",
      tab: "solution-specs",
      cardId: "",
      serviceName: "",
      action: "View Blueprint",
    },
  });

  // --- Debounced search ----------------------------------------------------
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, DEBOUNCE_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery]);

  // --- Derived data based on active tab ------------------------------------
  const currentData: (SolutionSpec | SolutionBuild)[] =
    activeTab === "solution-specs" ? solutionSpecs : solutionBuilds;

  const currentFilters =
    activeTab === "solution-specs" ? solutionSpecsFilters : solutionBuildFilters;

  // --- Active filter count -------------------------------------------------
  const activeFilterCount = useMemo(
    () => Object.values(selectedFilters).reduce((sum, arr) => sum + arr.length, 0),
    [selectedFilters]
  );

  // --- Tab switch handler (resets filters + search) ------------------------
  const handleTabChange = useCallback((tab: TabValue) => {
    setActiveTab(tab);
    setSelectedFilters({});
    setSearchQuery("");
    setDebouncedSearch("");
  }, []);

  // --- Filter handlers -----------------------------------------------------
  const handleFilterChange = useCallback((group: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[group] || [];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: next };
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setSelectedFilters({});
    setSearchQuery("");
    setDebouncedSearch("");
  }, []);

  // --- Filter logic (memoised) ---------------------------------------------
  const applyFilters = useCallback(
    (
      results: (SolutionSpec | SolutionBuild)[],
      filters: Record<string, string[]>
    ) => {
      let filtered = results;

      Object.entries(filters).forEach(([group, values]) => {
        if (values.length === 0) return;

        filtered = filtered.filter((bp) => {
          switch (group) {
            case "solutionType":
              return values.some((v) => bp.solutionType.includes(v.split(" - ")[0]));
            case "blueprintScope":
              return values.includes((bp as SolutionSpec).scope);
            case "maturityLevel":
              return values.includes((bp as SolutionSpec).maturityLevel);
            case "industryFocus":
              return values.includes((bp as SolutionSpec).industryFocus);
            case "technicalComplexity":
              return values.includes(bp.complexity);
            case "deploymentModel":
              return values.includes((bp as SolutionSpec).deploymentModel);
            case "includesDiagrams": {
              const spec = bp as SolutionSpec;
              if (values.includes("Yes - Comprehensive") || values.includes("Yes - Basic"))
                return spec.includesDiagrams;
              if (values.includes("No")) return !spec.includesDiagrams;
              return true;
            }
            case "includesComponentList": {
              const spec = bp as SolutionSpec;
              if (values.includes("Yes")) return spec.includesComponents;
              if (values.includes("No")) return !spec.includesComponents;
              return true;
            }
            case "buildComplexity":
              return values.includes((bp as SolutionBuild).buildComplexity);
            case "technologyStack":
              return values.includes((bp as SolutionBuild).technologyStack);
            case "deploymentTarget":
              return values.includes((bp as SolutionBuild).deploymentTarget);
            case "includesAutomation": {
              const build = bp as SolutionBuild;
              if (values.includes("All")) return build.includesAutomation.length >= 3;
              if (values.includes("None")) return build.includesAutomation.length === 0;
              return values.some((v) => build.includesAutomation.includes(v));
            }
            case "includesCodeSamples": {
              const build = bp as SolutionBuild;
              if (values.includes("Yes - Extensive") || values.includes("Yes - Limited"))
                return build.includesCodeSamples;
              if (values.includes("No")) return !build.includesCodeSamples;
              return true;
            }
            case "implementationTime":
              return values.includes((bp as SolutionBuild).implementationTime);
            case "skillLevel":
              return values.includes((bp as SolutionBuild).skillLevel);
            default:
              return true;
          }
        });
      });

      return filtered;
    },
    []
  );

  const filteredBlueprints = useMemo(() => {
    let results: (SolutionSpec | SolutionBuild)[] = currentData;

    // Text search (debounced)
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      results = results.filter(
        (bp) =>
          bp.title.toLowerCase().includes(q) ||
          bp.description.toLowerCase().includes(q) ||
          bp.keyTechnologies.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Checkbox filters
    results = applyFilters(results, selectedFilters);

    return results;
  }, [currentData, debouncedSearch, selectedFilters, applyFilters]);

  // --- Card click -> navigate to detail page -------------------------------
  const handleBlueprintClick = useCallback(
    (blueprintId: string) => {
      navigate(`/marketplaces/blueprints/${activeTab}/${blueprintId}`);
    },
    [navigate, activeTab]
  );

  // --- "View Blueprint" CTA -> login modal then redirect -------------------
  const handleViewBlueprint = useCallback(
    (blueprint: SolutionSpec | SolutionBuild) => {
      setLoginModal({
        open: true,
        context: {
          marketplace: "blueprints",
          tab: activeTab,
          cardId: blueprint.id,
          serviceName: blueprint.title,
          action: "View Blueprint",
        },
      });
    },
    [activeTab]
  );

  const closeLoginModal = useCallback(() => {
    setLoginModal((prev) => ({ ...prev, open: false }));
  }, []);

  // --- Render --------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <MarketplaceHeader />

      <main className="flex-1" id="main-content">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* ── Tabs ── */}
          <div
            className="flex border-b border-gray-200 mb-6"
            role="tablist"
            aria-label="Blueprint categories"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  role="tab"
                  id={`tab-${tab.value}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.value}`}
                  onClick={() => handleTabChange(tab.value)}
                  className={`px-6 py-4 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                    isActive
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {/* Full label on desktop, short on mobile */}
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.shortLabel}</span>
                    <span
                      className={`${tab.phaseBadgeClass} inline-block px-2 py-0.5 rounded-full text-xs font-semibold border-0`}
                    >
                      {tab.phaseBadge}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                      {tab.count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── Tab Panel ── */}
          <div
            role="tabpanel"
            id={`panel-${activeTab}`}
            aria-labelledby={`tab-${activeTab}`}
          >
            {/* Search */}
            <div className="mb-6">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={SEARCH_PLACEHOLDERS[activeTab]}
              />
            </div>

            <div className="flex gap-6">
              {/* ── Filter Panel (sidebar / drawer) ── */}
              <FilterPanel
                filters={currentFilters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
                isOpen={mobileFilterOpen}
                onClose={() => setMobileFilterOpen(false)}
              />

              {/* ── Main Content ── */}
              <div className="flex-1">
                {/* Result count */}
                <div className="mb-4">
                  <p
                    className="text-sm text-gray-600"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {filteredBlueprints.length}{" "}
                    {filteredBlueprints.length === 1 ? "blueprint" : "blueprints"} found
                    {activeFilterCount > 0 && (
                      <span className="ml-1 text-gray-400">
                        ({activeFilterCount} {activeFilterCount === 1 ? "filter" : "filters"} active)
                      </span>
                    )}
                  </p>
                </div>

                {/* Cards grid */}
                {filteredBlueprints.length > 0 ? (
                  <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    role="list"
                    aria-label="Blueprint cards"
                  >
                    {filteredBlueprints.map((blueprint) => (
                      <BlueprintCard
                        key={blueprint.id}
                        blueprint={blueprint}
                        onClick={() => handleBlueprintClick(blueprint.id)}
                      />
                    ))}
                  </div>
                ) : (
                  /* ── Empty State ── */
                  <div
                    className="bg-white border-2 border-gray-200 rounded-xl p-12 text-center"
                    role="status"
                    aria-live="polite"
                  >
                    <div className="max-w-md mx-auto">
                      <div
                        className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                        aria-hidden="true"
                      >
                        <SlidersHorizontal className="text-gray-400" size={32} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        No blueprints match your criteria
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Try adjusting your filters or search query to find what
                        you're looking for.
                      </p>
                      <button
                        onClick={handleClearFilters}
                        className="bg-[hsl(var(--orange))] text-white hover:bg-[hsl(var(--orange-hover))] px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 hover:shadow-lg min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--orange))] focus:ring-offset-2"
                        aria-label="Clear all filters and search"
                      >
                        Clear all filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile floating filter button */}
      <MobileFilterButton onClick={() => setMobileFilterOpen(true)} />

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModal.open}
        onClose={closeLoginModal}
        context={loginModal.context}
      />

      <Footer />
    </div>
  );
}
