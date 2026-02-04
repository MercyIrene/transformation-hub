import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarketplaceHeader } from "@/components/blueprints/MarketplaceHeader";
import { BlueprintCard } from "@/components/blueprints/BlueprintCard";
import { SearchBar } from "@/components/learningCenter/SearchBar";
import { FilterPanel, MobileFilterButton } from "@/components/learningCenter/FilterPanel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  solutionSpecs,
  solutionBuilds,
  solutionSpecsFilters,
  solutionBuildFilters,
  type SolutionSpec,
  type SolutionBuild,
} from "@/data/blueprints";

type TabValue = "solution-specs" | "solution-build";

export default function BlueprintsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get active tab from URL or default to solution-specs
  // Handle invalid tab parameters by defaulting to 'solution-specs'
  const tabParam = searchParams.get("tab");
  const activeTab: TabValue = tabParam === "solution-build" ? "solution-build" : "solution-specs";
  
  // State management
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Debounce search query with 300ms delay
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set new timer
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    
    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // Get current data and filters based on active tab
  const currentData = activeTab === "solution-specs" ? solutionSpecs : solutionBuilds;
  const currentFilters = activeTab === "solution-specs" ? solutionSpecsFilters : solutionBuildFilters;

  // Tab change handler that resets filters
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
    setSelectedFilters({});
  };

  // Filter change handler
  const handleFilterChange = (group: string, value: string) => {
    setSelectedFilters((prev) => {
      const groupFilters = prev[group] || [];
      const isSelected = groupFilters.includes(value);
      
      return {
        ...prev,
        [group]: isSelected
          ? groupFilters.filter((v) => v !== value)
          : [...groupFilters, value],
      };
    });
  };

  // Clear all filters and search query
  const handleClearFilters = useCallback(() => {
    setSelectedFilters({});
    setSearchQuery("");
  }, []);

  // Memoize filter application logic for better performance
  const applyFilters = useCallback((
    results: (SolutionSpec | SolutionBuild)[],
    filters: Record<string, string[]>
  ) => {
    let filtered = results;
    
    Object.entries(filters).forEach(([group, values]) => {
      if (values.length > 0) {
        filtered = filtered.filter((blueprint: SolutionSpec | SolutionBuild) => {
          // Handle different filter types
          if (group === "solutionType") {
            return values.some((v) => blueprint.solutionType.includes(v.split(" - ")[0]));
          }
          if (group === "blueprintScope") {
            return values.includes((blueprint as SolutionSpec).scope);
          }
          if (group === "maturityLevel") {
            return values.includes((blueprint as SolutionSpec).maturityLevel);
          }
          if (group === "industryFocus") {
            return values.includes((blueprint as SolutionSpec).industryFocus);
          }
          if (group === "technicalComplexity") {
            return values.includes(blueprint.complexity);
          }
          if (group === "deploymentModel") {
            return values.includes((blueprint as SolutionSpec).deploymentModel);
          }
          if (group === "includesDiagrams") {
            const spec = blueprint as SolutionSpec;
            if (values.includes("Yes - Comprehensive") || values.includes("Yes - Basic")) {
              return spec.includesDiagrams;
            }
            if (values.includes("No")) {
              return !spec.includesDiagrams;
            }
          }
          if (group === "includesComponentList") {
            const spec = blueprint as SolutionSpec;
            if (values.includes("Yes")) {
              return spec.includesComponents;
            }
            if (values.includes("No")) {
              return !spec.includesComponents;
            }
          }
          if (group === "buildComplexity") {
            return values.includes((blueprint as SolutionBuild).buildComplexity);
          }
          if (group === "technologyStack") {
            return values.includes((blueprint as SolutionBuild).technologyStack);
          }
          if (group === "deploymentTarget") {
            return values.includes((blueprint as SolutionBuild).deploymentTarget);
          }
          if (group === "includesAutomation") {
            const build = blueprint as SolutionBuild;
            if (values.includes("All")) {
              return build.includesAutomation.length >= 3;
            }
            if (values.includes("None")) {
              return build.includesAutomation.length === 0;
            }
            return values.some((v) => build.includesAutomation.includes(v));
          }
          if (group === "includesCodeSamples") {
            const build = blueprint as SolutionBuild;
            if (values.includes("Yes - Extensive") || values.includes("Yes - Limited")) {
              return build.includesCodeSamples;
            }
            if (values.includes("No")) {
              return !build.includesCodeSamples;
            }
          }
          if (group === "implementationTime") {
            return values.includes((blueprint as SolutionBuild).implementationTime);
          }
          if (group === "skillLevel") {
            return values.includes((blueprint as SolutionBuild).skillLevel);
          }
          return true;
        });
      }
    });
    
    return filtered;
  }, []);

  // Filter and search logic - optimized with debounced search
  const filteredBlueprints = useMemo(() => {
    let results: (SolutionSpec | SolutionBuild)[] = currentData;

    // Apply search filter using debounced query
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      results = results.filter((blueprint) => {
        const matchesTitle = blueprint.title.toLowerCase().includes(query);
        const matchesDescription = blueprint.description.toLowerCase().includes(query);
        const matchesTechnologies = blueprint.keyTechnologies.some((tech) =>
          tech.toLowerCase().includes(query)
        );
        return matchesTitle || matchesDescription || matchesTechnologies;
      });
    }

    // Apply selected filters using memoized function
    results = applyFilters(results, selectedFilters);

    return results;
  }, [currentData, debouncedSearchQuery, selectedFilters, applyFilters]);

  // Handle blueprint card click - memoized
  const handleBlueprintClick = useCallback((blueprintId: string) => {
    navigate(`/marketplaces/blueprints/${activeTab}/${blueprintId}`);
  }, [navigate, activeTab]);

  // Dynamic search placeholder
  const searchPlaceholder =
    activeTab === "solution-specs"
      ? "Search solution blueprints or platforms..."
      : "Search implementation guides or technologies...";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <MarketplaceHeader />

      <main className="flex-1" id="main-content">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Tabs Navigation */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
            <TabsList 
              className="w-full justify-start bg-white border border-gray-200 rounded-lg p-1 h-auto"
              aria-label="Blueprint categories"
            >
              <TabsTrigger
                value="solution-specs"
                className="flex-1 lg:flex-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--orange))] rounded-none px-6 py-3 min-h-[44px]"
                aria-label="Blueprint-led Solution Specs, Design phase, 25 blueprints"
              >
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">Blueprint-led Solution Specs</span>
                  <span className="sm:hidden">Solution Specs</span>
                  <Badge className="badge-design border-0 text-xs" aria-label="Design phase">
                    Design
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-700 border-0 text-xs font-semibold" aria-label="25 blueprints">
                    25
                  </Badge>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="solution-build"
                className="flex-1 lg:flex-none data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[hsl(var(--orange))] rounded-none px-6 py-3 min-h-[44px]"
                aria-label="Solutions Blueprints Build, Deploy phase, 14 blueprints"
              >
                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline">Solutions Blueprints Build</span>
                  <span className="sm:hidden">Solution Build</span>
                  <Badge className="badge-deploy border-0 text-xs" aria-label="Deploy phase">
                    Deploy
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-700 border-0 text-xs font-semibold" aria-label="14 blueprints">
                    14
                  </Badge>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="flex gap-6">
                {/* Filter Panel */}
                <FilterPanel
                  filters={currentFilters}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearFilters}
                  isOpen={isFilterOpen}
                  onClose={() => setIsFilterOpen(false)}
                />

                {/* Main Content */}
                <div className="flex-1">
                  {/* Search Bar */}
                  <div className="mb-6">
                    <SearchBar
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder={searchPlaceholder}
                    />
                  </div>

                  {/* Result Count */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600" role="status" aria-live="polite" aria-atomic="true">
                      {filteredBlueprints.length} {filteredBlueprints.length === 1 ? "blueprint" : "blueprints"} found
                    </p>
                  </div>

                  {/* Blueprints Grid */}
                  {filteredBlueprints.length > 0 ? (
                    <div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
                    <div 
                      className="bg-white border-2 border-gray-200 rounded-xl p-12 text-center"
                      role="status"
                      aria-live="polite"
                    >
                      <div className="max-w-md mx-auto">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                          <SlidersHorizontal className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          No blueprints match your criteria
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Try adjusting your filters or search query to find what you're looking for.
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
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Mobile Filter Button */}
      <MobileFilterButton onClick={() => setIsFilterOpen(true)} />

      <Footer />
    </div>
  );
}
