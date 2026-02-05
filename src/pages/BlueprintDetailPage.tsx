import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronRight,
  Star,
  ArrowLeft,
  Lock,
  BookOpen,
  Layers,
  Box,
  Clock,
  FolderOpen,
  FileText,
  Wrench,
  Lightbulb,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import {
  solutionSpecs,
  solutionBuilds,
  type SolutionSpec,
  type SolutionBuild,
  getBlueprintDetail,
  generateGenericDetailFromSpec,
  generateGenericDetailFromBuild,
  type BlueprintDetail,
} from "@/data/blueprints";
import {
  DiagramViewer,
  ComponentsTable,
  ImplementationTimeline,
} from "@/components/blueprints";
import { LoginModal } from "@/components/learningCenter";

// ─── Constants ───────────────────────────────────────────────────────────────

type ContentTab = "about" | "architecture" | "components" | "implementation" | "resources";

const CONTENT_TABS: { key: ContentTab; label: string; icon: React.ReactNode }[] = [
  { key: "about", label: "About", icon: <BookOpen className="w-4 h-4" /> },
  { key: "architecture", label: "Architecture", icon: <Layers className="w-4 h-4" /> },
  { key: "components", label: "Components", icon: <Box className="w-4 h-4" /> },
  { key: "implementation", label: "Implementation", icon: <Clock className="w-4 h-4" /> },
  { key: "resources", label: "Resources", icon: <FolderOpen className="w-4 h-4" /> },
];

const solutionTypeColors: Record<string, string> = {
  DBP: "bg-purple-100 text-purple-700",
  DXP: "bg-pink-100 text-pink-700",
  DWS: "bg-blue-100 text-blue-700",
  DIA: "bg-green-100 text-green-700",
  SDO: "bg-orange-100 text-orange-700",
};

const complexityColors: Record<string, string> = {
  Low: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  High: "bg-orange-100 text-orange-700",
  "Very High": "bg-red-100 text-red-700",
};

// ─── Component ───────────────────────────────────────────────────────────────

export default function BlueprintDetailPage() {
  const { tab, blueprintId } = useParams<{ tab: string; blueprintId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<ContentTab>("about");
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Determine the source tab
  const isSolutionSpec = tab === "solution-specs";

  // Find blueprint from the correct data array
  const blueprint: SolutionSpec | SolutionBuild | undefined = isSolutionSpec
    ? solutionSpecs.find((b) => b.id === blueprintId)
    : solutionBuilds.find((b) => b.id === blueprintId);

  // Resolve detailed data
  const detail: BlueprintDetail | undefined = blueprintId
    ? getBlueprintDetail(blueprintId) ??
      (blueprint
        ? isSolutionSpec
          ? generateGenericDetailFromSpec(blueprint as SolutionSpec)
          : generateGenericDetailFromBuild(blueprint as SolutionBuild)
        : undefined)
    : undefined;

  // ─── 404 ────────────────────────────────────────────────────────────────────

  if (!blueprint || !detail) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center" id="main-content">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">Blueprint Not Found</h1>
            <p className="text-gray-600 mb-8">
              The blueprint you are looking for does not exist or may have been moved.
            </p>
            <Link
              to="/marketplaces/blueprints"
              className="inline-flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors"
            >
              <ArrowLeft size={18} />
              Back to Blueprints
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ─── Derived values ─────────────────────────────────────────────────────────

  const spec = blueprint as SolutionSpec;
  const build = blueprint as SolutionBuild;
  const tabDisplayName = isSolutionSpec ? "Solution Specs" : "Solution Builds";

  const handleBackClick = () => {
    navigate(`/marketplaces/blueprints?tab=${tab}`);
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    navigate("/transact-app");
  };

  // ─── Tab Content Renderers ──────────────────────────────────────────────────

  const renderAboutTab = () => (
    <div className="space-y-8">
      {/* Overview */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
        <p className="text-gray-700 leading-relaxed">{detail.overview}</p>
      </section>

      {/* Architecture Philosophy */}
      {detail.architecturePhilosophy.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-blue-600" />
            Architecture Philosophy
          </h2>
          <ul className="space-y-3">
            {detail.architecturePhilosophy.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Key Principles */}
      {detail.keyPrinciples.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-600" />
            Key Principles
          </h2>
          <ul className="space-y-3">
            {detail.keyPrinciples.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Use Cases */}
      {detail.useCases.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detail.useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700"
              >
                {useCase}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderArchitectureTab = () => (
    <div className="space-y-10">
      {/* Diagram Viewer */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Architecture Diagrams</h2>
        <DiagramViewer diagrams={detail.architectureDiagrams} />
      </section>

      {/* Architecture Layers */}
      {detail.architectureLayers.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Architecture Layers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detail.architectureLayers.map((layer, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Layers className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-base font-bold text-gray-900">{layer.layer}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-4">{layer.description}</p>
                <div className="flex flex-wrap gap-2">
                  {layer.components.map((component, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-md text-xs font-medium"
                    >
                      {component}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderComponentsTab = () => (
    <div>
      <ComponentsTable components={detail.components} />
    </div>
  );

  const renderImplementationTab = () => (
    <div>
      <ImplementationTimeline
        phases={detail.implementationPhases}
        approach={detail.implementationApproach}
        prerequisites={detail.prerequisites}
        criticalSuccessFactors={detail.criticalSuccessFactors}
      />
    </div>
  );

  const renderResourcesTab = () => (
    <div className="space-y-8">
      {/* Related Blueprints */}
      {detail.relatedBlueprints.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Related Blueprints
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detail.relatedBlueprints.map((name, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900">{name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Documents */}
      {detail.relatedDocuments.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Related Documents
          </h2>
          <div className="space-y-3">
            {detail.relatedDocuments.map((doc, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-green-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{doc.name}</h3>
                      <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
                        {doc.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tools */}
      {detail.tools.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-orange-600" />
            Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {detail.tools.map((tool, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex items-center gap-3 hover:border-orange-300 hover:shadow-sm transition-all"
              >
                <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{tool}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "about":
        return renderAboutTab();
      case "architecture":
        return renderArchitectureTab();
      case "components":
        return renderComponentsTab();
      case "implementation":
        return renderImplementationTab();
      case "resources":
        return renderResourcesTab();
      default:
        return renderAboutTab();
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1" id="main-content">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-gray-600 mb-6 flex-wrap"
          >
            <button
              onClick={() => navigate("/")}
              className="hover:text-blue-600 transition-colors"
            >
              Home
            </button>
            <ChevronRight size={16} aria-hidden="true" />
            <button
              onClick={() => navigate("/marketplaces")}
              className="hover:text-blue-600 transition-colors"
            >
              Marketplaces
            </button>
            <ChevronRight size={16} aria-hidden="true" />
            <button
              onClick={() => navigate("/marketplaces/blueprints")}
              className="hover:text-blue-600 transition-colors"
            >
              Blueprints
            </button>
            <ChevronRight size={16} aria-hidden="true" />
            <span className="text-gray-900 font-medium" aria-current="page">
              {blueprint.title}
            </span>
          </nav>

          {/* Back Button */}
          <button
            onClick={handleBackClick}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft size={16} />
            Back to Blueprints
          </button>

          {/* Blueprint Header */}
          <div className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
            {/* Top Row: Badge + Featured Star */}
            <div className="flex items-center gap-3 mb-4">
              <Badge
                className={`${
                  solutionTypeColors[blueprint.solutionTypeShort] || "bg-gray-100 text-gray-700"
                } border-0 text-sm font-semibold`}
              >
                {blueprint.solutionType}
              </Badge>
              {blueprint.featured && (
                <Star
                  className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  aria-label="Featured blueprint"
                />
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              {blueprint.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-3xl">
              {blueprint.description}
            </p>

            {/* Key Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
              {/* Scope */}
              <div>
                <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">Scope</dt>
                <dd className="text-sm text-gray-900 font-medium">{blueprint.scope}</dd>
              </div>

              {/* Maturity or Build Complexity */}
              {isSolutionSpec ? (
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Maturity
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">{spec.maturityLevel}</dd>
                </div>
              ) : (
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Build Complexity
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">{build.buildComplexity}</dd>
                </div>
              )}

              {/* Complexity */}
              <div>
                <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">Complexity</dt>
                <dd>
                  <Badge
                    className={`${
                      complexityColors[blueprint.complexity] || "bg-gray-100 text-gray-700"
                    } border-0 text-xs font-semibold`}
                  >
                    {blueprint.complexity}
                  </Badge>
                </dd>
              </div>

              {/* Industry Focus / Deployment Target */}
              {isSolutionSpec ? (
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Industry Focus
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">{spec.industryFocus}</dd>
                </div>
              ) : (
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Deployment Target
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">{build.deploymentTarget}</dd>
                </div>
              )}

              {/* Deployment Model / Implementation Time */}
              {isSolutionSpec ? (
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Deployment Model
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">{spec.deploymentModel}</dd>
                </div>
              ) : (
                <div>
                  <dt className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Implementation Time
                  </dt>
                  <dd className="text-sm text-gray-900 font-medium">
                    {build.implementationTime}
                  </dd>
                </div>
              )}
            </div>

            {/* Key Technologies */}
            <div>
              <dt className="text-xs font-semibold text-gray-500 uppercase mb-2">
                Key Technologies
              </dt>
              <dd className="flex flex-wrap gap-2">
                {blueprint.keyTechnologies.map((tech, index) => (
                  <span
                    key={index}
                    className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-lg text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </dd>
            </div>
          </div>

          {/* ─── 5 Content Tabs ──────────────────────────────────────────────── */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
            {/* Tab Bar */}
            <div
              className="flex border-b border-gray-200 overflow-x-auto"
              role="tablist"
              aria-label="Blueprint detail tabs"
            >
              {CONTENT_TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={activeTab === t.key}
                  aria-controls={`tabpanel-${t.key}`}
                  id={`tab-${t.key}`}
                  onClick={() => setActiveTab(t.key)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset ${
                    activeTab === t.key
                      ? "border-b-2 border-blue-600 text-blue-600"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div
              role="tabpanel"
              id={`tabpanel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
              className="p-8"
            >
              {renderActiveTabContent()}
            </div>
          </div>

          {/* ─── CTA Section ─────────────────────────────────────────────────── */}
          <section className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  Ready to get started?
                </h2>
                <p className="text-gray-600">
                  Access the full blueprint including all documentation, diagrams, and implementation guides.
                </p>
              </div>
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              >
                <Lock size={18} />
                Access Full Blueprint
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        context={{
          marketplace: "blueprints",
          tab: tab || "solution-specs",
          cardId: blueprint.id,
          serviceName: blueprint.title,
          action: "access",
        }}
      />
    </div>
  );
}
