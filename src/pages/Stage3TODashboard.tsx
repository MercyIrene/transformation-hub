import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Download,
  MoreHorizontal,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Users,
  TrendingUp,
  Calendar,
  FileText,
  MessageSquare,
  UserPlus,
  Play,
  Pause,
  X as XIcon,
  Eye,
  BarChart3,
  Settings,
  Home,
  Inbox,
  ClipboardList,
  UserCheck,
  Activity,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ChevronDown,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { mockRequests, requestMetrics, teamMembers, RequestStatus, RequestPriority, ServiceRequest } from "@/data/transformationOffice";

export default function Stage3TODashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all");
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [leftSidebarCollapsed, setLeftSidebarCollapsed] = useState(false);
  const [rightSidebarCollapsed, setRightSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState("all-requests");
  
  // Request data state (local copy for updates)
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);

  // Helper function to open request detail
  const handleRequestClick = (request: ServiceRequest) => {
    navigate(`/stage3/request/${request.id}`);
  };

  // Helper function to get navigation item class
  const getNavItemClass = (view: string) => {
    return activeView === view
      ? "bg-orange-50 text-orange-700 font-medium"
      : "text-gray-700 hover:bg-gray-50";
  };

  // Helper function to handle navigation clicks
  const handleNavClick = (view: string, statusFilterValue?: string) => {
    setActiveView(view);
    if (statusFilterValue) {
      setStatusFilter(statusFilterValue);
    } else if (view !== "all-requests") {
      // Reset filters when switching to non-request views
      setStatusFilter("all");
      setPriorityFilter("all");
      setTypeFilter("all");
      setAssigneeFilter("all");
      setSearchTerm("");
    }
  };

  // Filter requests
  const filteredRequests = useMemo(() => {
    return requests.filter(req => {
      const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           req.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           req.requester.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           req.requester.organization.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || req.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || req.priority === priorityFilter;
      const matchesType = typeFilter === "all" || req.type === typeFilter;
      const matchesAssignee = assigneeFilter === "all" || req.assignedTo === assigneeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesType && matchesAssignee;
    });
  }, [requests, searchTerm, statusFilter, priorityFilter, typeFilter, assigneeFilter]);

  const getStatusBadge = (status: RequestStatus) => {
    const config = {
      "new": { color: "bg-blue-100 text-blue-700", icon: Inbox },
      "assigned": { color: "bg-purple-100 text-purple-700", icon: UserCheck },
      "in-progress": { color: "bg-yellow-100 text-yellow-700", icon: Play },
      "pending-review": { color: "bg-orange-100 text-orange-700", icon: Eye },
      "completed": { color: "bg-green-100 text-green-700", icon: CheckCircle },
      "on-hold": { color: "bg-gray-100 text-gray-700", icon: Pause },
      "cancelled": { color: "bg-red-100 text-red-700", icon: XCircle }
    };
    return config[status] || config["new"];
  };

  const getPriorityBadge = (priority: RequestPriority) => {
    const config = {
      "critical": "bg-red-100 text-red-700 border-red-200",
      "high": "bg-orange-100 text-orange-700 border-orange-200",
      "medium": "bg-blue-100 text-blue-700 border-blue-200",
      "low": "bg-gray-100 text-gray-700 border-gray-200"
    };
    return config[priority];
  };

  const getSLABadge = (slaStatus: string) => {
    const config = {
      "on-track": "bg-green-100 text-green-700",
      "at-risk": "bg-yellow-100 text-yellow-700",
      "breached": "bg-red-100 text-red-700"
    };
    return config[slaStatus as keyof typeof config] || config["on-track"];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getTypeLabel = (type: string) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden h-screen">
      {/* Left Sidebar - Navigation */}
      <div className={`${leftSidebarCollapsed ? 'w-16' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 flex-shrink-0 h-full`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigate('/marketplaces')}
              className={`flex items-center gap-3 ${leftSidebarCollapsed ? 'justify-center' : ''} hover:opacity-80 transition-opacity`}
              title="Back to Marketplaces"
            >
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                <LayoutGrid className="w-4 h-4 text-white" />
              </div>
              {!leftSidebarCollapsed && (
                <div className="text-left">
                  <h2 className="font-semibold text-sm">TO Operations</h2>
                  <p className="text-xs text-gray-500">Stage 3 - CRM</p>
                </div>
              )}
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLeftSidebarCollapsed(!leftSidebarCollapsed)}
              className="p-1 h-6 w-6"
            >
              {leftSidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            <button 
              onClick={() => handleNavClick("dashboard")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${getNavItemClass("dashboard")}`}
              title="Dashboard"
            >
              <Home className="w-4 h-4 flex-shrink-0" />
              {!leftSidebarCollapsed && "Dashboard"}
            </button>
            
            {!leftSidebarCollapsed && (
              <div className="pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">
                  Requests
                </p>
              </div>
            )}
            
            <button 
              onClick={() => handleNavClick("all-requests")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                activeView === "all-requests" && statusFilter === "all" 
                  ? "bg-orange-50 text-orange-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              title="All Requests"
            >
              <ClipboardList className="w-4 h-4 flex-shrink-0" />
              {!leftSidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">All Requests</span>
                  <Badge variant="secondary" className="text-xs">{mockRequests.length}</Badge>
                </>
              )}
            </button>
            
            <button 
              onClick={() => handleNavClick("all-requests", "new")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                activeView === "all-requests" && statusFilter === "new" 
                  ? "bg-orange-50 text-orange-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              title="New Requests"
            >
              <Inbox className="w-4 h-4 flex-shrink-0" />
              {!leftSidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">New</span>
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">{requestMetrics.newRequests}</Badge>
                </>
              )}
            </button>
            
            <button 
              onClick={() => handleNavClick("all-requests", "in-progress")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                activeView === "all-requests" && statusFilter === "in-progress" 
                  ? "bg-orange-50 text-orange-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              title="In Progress"
            >
              <Activity className="w-4 h-4 flex-shrink-0" />
              {!leftSidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">In Progress</span>
                  <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">{requestMetrics.inProgress}</Badge>
                </>
              )}
            </button>
            
            <button 
              onClick={() => handleNavClick("all-requests", "pending-review")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${
                activeView === "all-requests" && statusFilter === "pending-review" 
                  ? "bg-orange-50 text-orange-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              title="Pending Review"
            >
              <Eye className="w-4 h-4 flex-shrink-0" />
              {!leftSidebarCollapsed && (
                <>
                  <span className="flex-1 text-left">Pending Review</span>
                  <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-700">{requestMetrics.pendingReview}</Badge>
                </>
              )}
            </button>
            
            {!leftSidebarCollapsed && (
              <div className="pt-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-3">
                  Management
                </p>
              </div>
            )}
            
            <button 
              onClick={() => handleNavClick("team")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${getNavItemClass("team")}`}
              title="Team & Capacity"
            >
              <Users className="w-4 h-4 flex-shrink-0" />
              {!leftSidebarCollapsed && "Team & Capacity"}
            </button>
            
            <button 
              onClick={() => handleNavClick("analytics")}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg ${getNavItemClass("analytics")}`}
              title="Analytics"
            >
              <BarChart3 className="w-4 h-4 flex-shrink-0" />
              {!leftSidebarCollapsed && "Analytics"}
            </button>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 flex-shrink-0">
          {!leftSidebarCollapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 text-xs font-medium">SM</span>
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm font-medium truncate">Sarah Miller</p>
                    <p className="text-xs text-gray-500">TO Team Member</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={() => navigate('/stage2')}
                  className="flex items-center gap-2"
                >
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-700 text-xs font-medium">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">End User</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-medium">SM</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sarah Miller</p>
                      <p className="text-xs text-gray-500">TO Team Member</p>
                    </div>
                  </div>
                  <Check className="w-4 h-4 text-blue-600" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-700 text-xs font-medium">SM</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-full">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Request Management</h2>
              <p className="text-sm text-gray-500">Transformation Office Operations Dashboard</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* KPI Metrics */}
            <div className="p-4 lg:p-6 bg-white border-b border-gray-200">
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ClipboardList className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-blue-900 text-sm">Total Requests</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{requestMetrics.totalRequests}</p>
                  <p className="text-sm text-blue-700">All time</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-yellow-600" />
                    <h3 className="font-semibold text-yellow-900 text-sm">Active</h3>
                  </div>
                  <p className="text-2xl font-bold text-yellow-900">{requestMetrics.inProgress}</p>
                  <p className="text-sm text-yellow-700">In progress</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold text-green-900 text-sm">SLA Compliance</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{requestMetrics.slaCompliance}%</p>
                  <p className="text-sm text-green-700">On track</p>
                </div>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-purple-900 text-sm">Avg Resolution</h3>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">{requestMetrics.avgResolutionTime}</p>
                  <p className="text-sm text-purple-700">Days</p>
                </div>
                
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-orange-600" />
                    <h3 className="font-semibold text-orange-900 text-sm">Satisfaction</h3>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">{requestMetrics.customerSatisfaction}</p>
                  <p className="text-sm text-orange-700">Out of 5</p>
                </div>
              </div>
            </div>

            {/* Filters & Search */}
            <div className="p-4 lg:p-6 bg-white border-b border-gray-200 sticky top-0 z-10">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search requests, requesters, or organizations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-36">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="pending-review">Pending Review</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={assigneeFilter} onValueChange={setAssigneeFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Assignees</SelectItem>
                      {teamMembers.map(member => (
                        <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    More
                  </Button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredRequests.length} of {mockRequests.length} requests
                </p>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedRequests.length > 0 && (
              <div className="px-6 py-3 bg-blue-50 border-b border-gray-200 sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-blue-900">
                    {selectedRequests.length} request{selectedRequests.length > 1 ? 's' : ''} selected
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Assign
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Add Note
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Requests Table */}
            <div className="flex-1 overflow-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <Checkbox />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requester
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assigned To
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SLA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.slice(0, itemsPerPage).map((request) => {
                    const StatusIcon = getStatusBadge(request.status).icon;
                    return (
                      <tr 
                        key={request.id} 
                        className="hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleRequestClick(request)}
                      >
                        <td className="px-6 py-4">
                          <Checkbox />
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{request.title}</p>
                            <p className="text-sm text-gray-500">{request.requestNumber}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(request.type)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{request.requester.name}</p>
                            <p className="text-xs text-gray-500">{request.requester.organization}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusBadge(request.status).color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {request.status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={getPriorityBadge(request.priority)}>
                            {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {request.assignedTo ? (
                              <>
                                <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                                  <span className="text-orange-700 text-xs font-medium">
                                    {request.assignedTo.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <span className="text-sm text-gray-900">{request.assignedTo}</span>
                              </>
                            ) : (
                              <span className="text-sm text-gray-400">Unassigned</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            {formatDate(request.dueDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getSLABadge(request.slaStatus)}>
                            {request.slaStatus.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <UserPlus className="w-4 h-4 mr-2" />
                                Assign
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Add Note
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FileText className="w-4 h-4 mr-2" />
                                Export
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
