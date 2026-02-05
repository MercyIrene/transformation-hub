import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Edit,
  Share2,
  Download,
  Calendar,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  TrendingUp,
  Building2,
  FolderKanban,
  ExternalLink
} from "lucide-react";
import { applications, projects, Application, Project } from "@/data/portfolio";

const PortfolioDetailPage = () => {
  const { type, id } = useParams<{ type: 'applications' | 'projects'; id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const item = type === 'applications' 
    ? applications.find(app => app.id === id)
    : projects.find(proj => proj.id === id);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">Item Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The {type?.slice(0, -1)} you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/marketplaces/portfolio-management')}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const isApplication = type === 'applications';
  const application = isApplication ? item as Application : null;
  const project = !isApplication ? item as Project : null;

  const getStatusColor = (status: string) => {
    if (isApplication) {
      switch (status) {
        case 'Active': return 'bg-green-100 text-green-800';
        case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
        case 'Deprecated': return 'bg-red-100 text-red-800';
        case 'Planned': return 'bg-blue-100 text-blue-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    } else {
      switch (status) {
        case 'Completed': return 'bg-green-100 text-green-800';
        case 'In Progress': return 'bg-blue-100 text-blue-800';
        case 'On Hold': return 'bg-yellow-100 text-yellow-800';
        case 'Planning': return 'bg-purple-100 text-purple-800';
        case 'Cancelled': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link 
              to="/marketplaces/portfolio-management" 
              className="hover:text-primary transition-colors"
            >
              Portfolio Management
            </Link>
            <span>/</span>
            <Link 
              to={`/marketplaces/portfolio-management?tab=${type}`}
              className="hover:text-primary transition-colors"
            >
              {type === 'applications' ? 'Applications' : 'Projects'}
            </Link>
            <span>/</span>
            <span className="text-foreground">{item.name}</span>
          </div>

          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/marketplaces/portfolio-management')}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
              
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    {isApplication ? (
                      <Building2 size={20} className="text-primary" />
                    ) : (
                      <FolderKanban size={20} className="text-primary" />
                    )}
                  </div>
                  <h1 className="text-3xl font-bold text-primary">{item.name}</h1>
                  <Badge className={getStatusColor(item.status)}>
                    {item.status}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Export
              </Button>
              <Button size="sm">
                <Edit size={16} className="mr-2" />
                Edit
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {isApplication && application ? (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                        <p className="text-2xl font-bold text-primary">{application.healthScore}%</p>
                      </div>
                      <TrendingUp size={20} className="text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Users</p>
                        <p className="text-2xl font-bold text-primary">{application.users.toLocaleString()}</p>
                      </div>
                      <Users size={20} className="text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Annual Cost</p>
                        <p className="text-2xl font-bold text-primary">${(application.costs.annual / 1000).toFixed(0)}K</p>
                      </div>
                      <DollarSign size={20} className="text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                        <p className="text-2xl font-bold text-primary">
                          {application.compliance.security === 'Compliant' && 
                           application.compliance.regulatory === 'Compliant' ? '✓' : '⚠'}
                        </p>
                      </div>
                      <Shield size={20} className="text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : project ? (
              <>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Progress</p>
                        <p className="text-2xl font-bold text-primary">{project.progress}%</p>
                      </div>
                      <Clock size={20} className="text-blue-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                        <p className="text-2xl font-bold text-primary">{project.team.size}</p>
                      </div>
                      <Users size={20} className="text-green-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Budget Used</p>
                        <p className="text-2xl font-bold text-primary">
                          {Math.round((project.budget.spent / project.budget.allocated) * 100)}%
                        </p>
                      </div>
                      <DollarSign size={20} className="text-orange-600" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Risks</p>
                        <p className="text-2xl font-bold text-primary">{project.risks.count}</p>
                      </div>
                      <AlertTriangle size={20} className="text-red-600" />
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : null}
          </div>

          {/* Detailed Information */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              {!isApplication && <TabsTrigger value="timeline">Timeline</TabsTrigger>}
              <TabsTrigger value="related">Related Items</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Category</p>
                        <p className="text-sm">{item.category}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                      {isApplication && application ? (
                        <>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Owner</p>
                            <p className="text-sm">{application.owner}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Business Unit</p>
                            <p className="text-sm">{application.businessUnit}</p>
                          </div>
                        </>
                      ) : project ? (
                        <>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Project Lead</p>
                            <p className="text-sm">{project.team.lead}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Priority</p>
                            <Badge>{project.priority}</Badge>
                          </div>
                        </>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>

                {isApplication && application ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Technology Stack</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {application.techStack.map((tech) => (
                          <Badge key={tech} variant="outline">{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : project ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Project Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Start Date</p>
                        <p className="text-sm">{new Date(project.startDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">End Date</p>
                        <p className="text-sm">{new Date(project.endDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-2">Progress</p>
                        <Progress value={project.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{project.progress}% complete</p>
                      </div>
                    </CardContent>
                  </Card>
                ) : null}
              </div>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Additional detailed information would go here */}
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Detailed information and specifications would be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {!isApplication && (
              <TabsContent value="timeline" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {project?.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center gap-4 py-3 border-b last:border-b-0">
                        <div className="flex-shrink-0">
                          {milestone.status === 'Completed' ? (
                            <CheckCircle size={20} className="text-green-600" />
                          ) : milestone.status === 'In Progress' ? (
                            <Clock size={20} className="text-blue-600" />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{milestone.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(milestone.date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge 
                          className={
                            milestone.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            milestone.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }
                        >
                          {milestone.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="related" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Related Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Related applications, projects, and dependencies would be displayed here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PortfolioDetailPage;