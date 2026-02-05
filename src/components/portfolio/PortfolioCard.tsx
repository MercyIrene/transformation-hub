import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Calendar, 
  Users, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Pause
} from "lucide-react";
import { Application, Project } from "@/data/portfolio";

interface ApplicationCardProps {
  application: Application;
  onClick: () => void;
}

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ApplicationCard({ application, onClick }: ApplicationCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'Deprecated': return 'bg-red-100 text-red-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCriticalityColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-primary line-clamp-2">
            {application.name}
          </CardTitle>
          <Badge className={getStatusColor(application.status)}>
            {application.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {application.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Health Score</span>
          <span className={`text-sm font-bold ${getHealthScoreColor(application.healthScore)}`}>
            {application.healthScore}%
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={14} />
          <span>{application.users.toLocaleString()} users</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign size={14} />
          <span>${(application.costs.annual / 1000).toFixed(0)}K annual</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Criticality</span>
          <Badge className={getCriticalityColor(application.criticalityLevel)}>
            {application.criticalityLevel}
          </Badge>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {application.techStack.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {application.techStack.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{application.techStack.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle size={16} className="text-green-600" />;
      case 'In Progress': return <Clock size={16} className="text-blue-600" />;
      case 'On Hold': return <Pause size={16} className="text-yellow-600" />;
      case 'Planning': return <Calendar size={16} className="text-purple-600" />;
      default: return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-purple-100 text-purple-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const budgetUtilization = (project.budget.spent / project.budget.allocated) * 100;

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 h-full"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-primary line-clamp-2">
            {project.name}
          </CardTitle>
          <div className="flex items-center gap-1">
            {getStatusIcon(project.status)}
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Priority</span>
          <Badge className={getPriorityColor(project.priority)}>
            {project.priority}
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users size={14} />
          <span>{project.team.size} team members</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span>Budget</span>
            <span className="font-medium">
              ${(project.budget.spent / 1000000).toFixed(1)}M / ${(project.budget.allocated / 1000000).toFixed(1)}M
            </span>
          </div>
          <Progress value={budgetUtilization} className="h-1" />
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span>Risks</span>
          <div className="flex items-center gap-1">
            <AlertTriangle size={14} className={getRiskColor(project.risks.level)} />
            <span className={getRiskColor(project.risks.level)}>
              {project.risks.count} {project.risks.level.toLowerCase()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar size={14} />
          <span>Due {new Date(project.endDate).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}