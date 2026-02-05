import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PortfolioHeader, FilterPanel, ApplicationCard, ProjectCard } from "@/components/portfolio";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutGrid, 
  List, 
  Download,
  Plus,
  Building2,
  FolderKanban
} from "lucide-react";
import { applications, projects, Application, Project } from "@/data/portfolio";

const PortfolioManagementPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("applications");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [applicationFilters, setApplicationFilters] = useState<any>({});
  const [projectFilters, setProjectFilters] = useState<any>({});

  // Filter applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = !applicationFilters.searchTerm || 
        app.name.toLowerCase().includes(applicationFilters.searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(applicationFilters.searchTerm.toLowerCase());
      
      const matchesCategory = !applicationFilters.category || 
        app.category === applicationFilters.category;
      
      const matchesStatus = !applicationFilters.status || 
        app.status === applicationFilters.status;
      
      const matchesHealthScore = !applicationFilters.healthScoreRange || 
        (app.healthScore >= applicationFilters.healthScoreRange[0] && 
         app.healthScore <= applicationFilters.healthScoreRange[1]);

      return matchesSearch && matchesCategory && matchesStatus && matchesHealthScore;
    });
  }, [applications, applicationFilters]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = !projectFilters.searchTerm || 
        project.name.toLowerCase().includes(projectFilters.searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(projectFilters.searchTerm.toLowerCase());
      
      const matchesCategory = !projectFilters.category || 
        project.category === projectFilters.category;
      
      const matchesStatus = !projectFilters.status || 
        project.status === projectFilters.status;
      
      const matchesPriority = !projectFilters.priority || 
        project.priority === projectFilters.priority;
      
      const matchesProgress = !projectFilters.progressRange || 
        (project.progress >= projectFilters.progressRange[0] && 
         project.progress <= projectFilters.progressRange[1]);

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesProgress;
    });
  }, [projects, projectFilters]);

  const handleApplicationClick = (application: Application) => {
    navigate(`/marketplaces/portfolio-management/applications/${application.id}`);
  };

  const handleProjectClick = (project: Project) => {
    navigate(`/marketplaces/portfolio-management/projects/${project.id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PortfolioHeader />
          
          <div className="mt-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex items-center justify-between">
                <TabsList className="grid w-fit grid-cols-2">
                  <TabsTrigger value="applications" className="flex items-center gap-2">
                    <Building2 size={16} />
                    Applications
                    <Badge variant="secondary" className="ml-1">
                      {filteredApplications.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="projects" className="flex items-center gap-2">
                    <FolderKanban size={16} />
                    Projects
                    <Badge variant="secondary" className="ml-1">
                      {filteredProjects.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                  >
                    {viewMode === 'grid' ? <List size={16} /> : <LayoutGrid size={16} />}
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                  
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add {activeTab === 'applications' ? 'Application' : 'Project'}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Filters Sidebar */}
                <div className="lg:col-span-1">
                  <FilterPanel
                    type={activeTab as 'applications' | 'projects'}
                    onFiltersChange={activeTab === 'applications' ? setApplicationFilters : setProjectFilters}
                  />
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                  <TabsContent value="applications" className="mt-0">
                    {filteredApplications.length === 0 ? (
                      <div className="text-center py-12">
                        <Building2 size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                          No applications found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your filters or add a new application.
                        </p>
                      </div>
                    ) : (
                      <div className={
                        viewMode === 'grid' 
                          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                          : "space-y-4"
                      }>
                        {filteredApplications.map((application) => (
                          <ApplicationCard
                            key={application.id}
                            application={application}
                            onClick={() => handleApplicationClick(application)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="projects" className="mt-0">
                    {filteredProjects.length === 0 ? (
                      <div className="text-center py-12">
                        <FolderKanban size={48} className="mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                          No projects found
                        </h3>
                        <p className="text-muted-foreground">
                          Try adjusting your filters or add a new project.
                        </p>
                      </div>
                    ) : (
                      <div className={
                        viewMode === 'grid' 
                          ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                          : "space-y-4"
                      }>
                        {filteredProjects.map((project) => (
                          <ProjectCard
                            key={project.id}
                            project={project}
                            onClick={() => handleProjectClick(project)}
                          />
                        ))}
                      </div>
                    )}
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioManagementPage;