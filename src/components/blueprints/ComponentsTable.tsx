import { useState, useMemo } from "react";
import { Search, Box, ChevronDown, ChevronUp } from "lucide-react";

interface BlueprintComponent {
  id: string;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  interfaces: string[];
}

interface ComponentsTableProps {
  components: BlueprintComponent[];
}

const CATEGORIES = ["All Categories", "Integration", "Security", "Data", "Experience"];

export function ComponentsTable({ components }: ComponentsTableProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredComponents = useMemo(() => {
    return components.filter((comp) => {
      const matchesCategory =
        category === "All Categories" || comp.category === category;
      const matchesSearch =
        search === "" ||
        comp.name.toLowerCase().includes(search.toLowerCase()) ||
        comp.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [components, search, category]);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 border-b border-gray-200">
        <h3 className="text-xl font-bold text-gray-900">
          Architecture Components
        </h3>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Category Filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            aria-label="Filter by category"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Search Input */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="text"
              placeholder="Search components..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-64 border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Search components"
            />
          </div>
        </div>
      </div>

      {/* Desktop Table (hidden below md) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase text-xs">
                Component
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase text-xs">
                Category
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase text-xs">
                Key Capabilities
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase text-xs">
                Technologies
              </th>
              <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase text-xs">
                Interfaces
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredComponents.map((comp) => (
              <tr
                key={comp.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                {/* Component */}
                <td className="px-4 py-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    >
                      <Box className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{comp.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                        {comp.description}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-4">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                    {comp.category}
                  </span>
                </td>

                {/* Key Capabilities */}
                <td className="px-4 py-4">
                  <ul className="space-y-1">
                    {comp.capabilities.slice(0, 3).map((cap, i) => (
                      <li key={i} className="text-xs text-gray-700">
                        {cap}
                      </li>
                    ))}
                    {comp.capabilities.length > 3 && (
                      <li className="text-xs text-blue-600 font-medium">
                        +{comp.capabilities.length - 3} more
                      </li>
                    )}
                  </ul>
                </td>

                {/* Technologies */}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {comp.technologies.slice(0, 2).map((tech, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {comp.technologies.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        +{comp.technologies.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Interfaces */}
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-1">
                    {comp.interfaces.map((iface, i) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium"
                      >
                        {iface}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredComponents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Box className="mx-auto mb-3 text-gray-400" size={40} aria-hidden="true" />
            <p className="text-sm font-medium">No components found</p>
            <p className="text-xs mt-1">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Mobile Card View (visible below md) */}
      <div className="md:hidden divide-y divide-gray-100">
        {filteredComponents.map((comp) => {
          const isExpanded = expandedCard === comp.id;
          return (
            <div key={comp.id} className="p-4">
              <button
                onClick={() =>
                  setExpandedCard(isExpanded ? null : comp.id)
                }
                className="w-full flex items-start justify-between gap-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                aria-expanded={isExpanded}
                aria-controls={`card-details-${comp.id}`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    <Box className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {comp.name}
                    </p>
                    <span className="inline-block mt-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
                      {comp.category}
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" aria-hidden="true" />
                )}
              </button>

              {isExpanded && (
                <div
                  id={`card-details-${comp.id}`}
                  className="mt-3 ml-11 space-y-3"
                >
                  <p className="text-xs text-gray-500">{comp.description}</p>

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Key Capabilities
                    </p>
                    <ul className="space-y-0.5">
                      {comp.capabilities.map((cap, i) => (
                        <li key={i} className="text-xs text-gray-700">
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Technologies
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {comp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-700 mb-1">
                      Interfaces
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {comp.interfaces.map((iface, i) => (
                        <span
                          key={i}
                          className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium"
                        >
                          {iface}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredComponents.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Box className="mx-auto mb-3 text-gray-400" size={40} aria-hidden="true" />
            <p className="text-sm font-medium">No components found</p>
            <p className="text-xs mt-1">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
