import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  TrendingUp, 
  Shield, 
  DollarSign,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle
} from "lucide-react";
import { portfolioMetrics } from "@/data/portfolio";

export function PortfolioHeader() {
  const { applications, projects } = portfolioMetrics;
  
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full">
          <Briefcase size={20} className="text-primary" />
          <span className="text-sm font-medium text-primary">Portfolio Management</span>
        </div>
        
        <h1 className="text-4xl font-bold text-primary">
          DTMP Portfolio Management
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Centralized oversight for application and project portfolios with real-time insights, 
          risk management, and strategic alignment tracking.
        </p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Application Portfolio Metrics */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold text-primary">{applications.total}</p>
              </div>
              <div className="bg-blue-100 p-2 rounded-lg">
                <Briefcase size={20} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {applications.active} Active
              </Badge>
              <Badge variant="outline" className="text-xs">
                {applications.planned} Planned
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                <p className="text-2xl font-bold text-primary">{applications.healthScore}%</p>
              </div>
              <div className="bg-green-100 p-2 rounded-lg">
                <TrendingUp size={20} className="text-green-600" />
              </div>
            </div>
            <div className="mt-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${applications.healthScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}
              >
                {applications.healthScore >= 70 ? 'Good' : 'Needs Attention'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Compliance</p>
                <p className="text-2xl font-bold text-primary">{applications.complianceRate}%</p>
              </div>
              <div className="bg-purple-100 p-2 rounded-lg">
                <Shield size={20} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-2">
              <Badge 
                variant="outline" 
                className={`text-xs ${applications.complianceRate >= 80 ? 'text-green-600' : 'text-red-600'}`}
              >
                {applications.complianceRate >= 80 ? 'Compliant' : 'Action Required'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project Budget</p>
                <p className="text-2xl font-bold text-primary">
                  ${(projects.totalBudget / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="bg-orange-100 p-2 rounded-lg">
                <DollarSign size={20} className="text-orange-600" />
              </div>
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                ${(projects.spentBudget / 1000000).toFixed(1)}M Spent
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Project Status Overview */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-primary mb-4">Project Portfolio Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Clock size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-xl font-bold text-primary">{projects.inProgress}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle size={16} className="text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-bold text-primary">{projects.completed}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <AlertTriangle size={16} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Hold</p>
                <p className="text-xl font-bold text-primary">{projects.onHold}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users size={16} className="text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Progress</p>
                <p className="text-xl font-bold text-primary">{projects.averageProgress}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}