// Transformation Office Request Management Data
// These align with the 4 marketplace categories that end users request from

export type RequestType = 
  | "dtmp-templates"      // Generated using DTMP AI DocWriter
  | "solution-specs"      // Generated using DTMP AI DocWriter
  | "solution-build"      // Provides access to requested build
  | "support-services";   // Fulfills support requests

export type RequestStatus = 
  | "new"
  | "assigned"
  | "in-progress"
  | "pending-review"
  | "completed"
  | "on-hold"
  | "cancelled";

export type RequestPriority = "critical" | "high" | "medium" | "low";

export interface ServiceRequest {
  id: string;
  requestNumber: string;
  type: RequestType;
  title: string;
  description: string;
  requester: {
    name: string;
    email: string;
    department: string;
    organization: string;
  };
  status: RequestStatus;
  priority: RequestPriority;
  assignedTo?: string;
  assignedTeam?: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  completedAt?: string;
  estimatedHours: number;
  actualHours?: number;
  tags: string[];
  relatedAssets?: string[];
  notes: string[];
  slaStatus: "on-track" | "at-risk" | "breached";
  customerSatisfaction?: number;
  generatedDocument?: string; // AI-generated document content
  buildAccess?: {
    accessUrl: string;
    username: string;
    password: string;
    additionalCredentials?: string;
    setupInstructions?: string;
    attachments?: string[];
  };
  supportUpdates?: Array<{
    type: "diagnosis" | "action-taken" | "waiting-user" | "resolved" | "escalated";
    message: string;
    timestamp: string;
  }>;
}

export const mockRequests: ServiceRequest[] = [
  {
    id: "req-001",
    requestNumber: "REQ-2024-001",
    type: "solution-specs",
    title: "E-commerce Platform Architecture Specification",
    description: "Need a complete solution specification for a new e-commerce platform with payment integration, inventory management, and customer portal. Generated using DTMP AI DocWriter.",
    requester: {
      name: "Sarah Johnson",
      email: "sarah.johnson@acmecorp.com",
      department: "Digital Commerce",
      organization: "Acme Corporation"
    },
    status: "in-progress",
    priority: "high",
    assignedTo: "Michael Chen",
    assignedTeam: "Solution Architecture",
    createdAt: "2024-02-08T09:30:00Z",
    updatedAt: "2024-02-10T14:20:00Z",
    dueDate: "2024-02-15T17:00:00Z",
    estimatedHours: 40,
    actualHours: 24,
    tags: ["e-commerce", "microservices", "cloud-native"],
    relatedAssets: ["spec-ecommerce-v2"],
    notes: [
      "Initial requirements gathered - 2024-02-08",
      "AI DocWriter processing requirements - 2024-02-09",
      "Draft specification in review - 2024-02-10"
    ],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  },
  {
    id: "req-002",
    requestNumber: "REQ-2024-002",
    type: "support-services",
    title: "Production Deployment Issue - CRM System",
    description: "Critical issue with CRM deployment. Database migration failing in production environment. Need immediate technical support assistance.",
    requester: {
      name: "David Martinez",
      email: "d.martinez@techstart.io",
      department: "IT Operations",
      organization: "TechStart Inc"
    },
    status: "assigned",
    priority: "critical",
    assignedTo: "Lisa Wang",
    assignedTeam: "Technical Support",
    createdAt: "2024-02-10T11:45:00Z",
    updatedAt: "2024-02-10T12:00:00Z",
    dueDate: "2024-02-10T18:00:00Z",
    estimatedHours: 8,
    actualHours: 2,
    tags: ["production", "database", "urgent"],
    relatedAssets: ["crm-deployment-guide"],
    notes: [
      "Ticket escalated to senior support - 2024-02-10",
      "Initial diagnosis: schema version mismatch - 2024-02-10"
    ],
    slaStatus: "at-risk",
    customerSatisfaction: undefined
  },
  {
    id: "req-003",
    requestNumber: "REQ-2024-003",
    type: "dtmp-templates",
    title: "API Integration Documentation Template",
    description: "Request for API integration documentation template for HR system and payroll platform integration. Generated using DTMP AI DocWriter.",
    requester: {
      name: "Emily Rodriguez",
      email: "emily.r@globalhr.com",
      department: "HR Technology",
      organization: "Global HR Solutions"
    },
    status: "new",
    priority: "medium",
    assignedTo: undefined,
    assignedTeam: undefined,
    createdAt: "2024-02-10T08:15:00Z",
    updatedAt: "2024-02-10T08:15:00Z",
    dueDate: "2024-02-20T17:00:00Z",
    estimatedHours: 16,
    tags: ["api", "integration", "hr-systems", "template"],
    relatedAssets: [],
    notes: [],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  },
  {
    id: "req-004",
    requestNumber: "REQ-2024-004",
    type: "solution-build",
    title: "Microservices Platform Build Access",
    description: "Request access to pre-configured Kubernetes microservices platform build with Kong Gateway, monitoring, and CI/CD pipeline.",
    requester: {
      name: "Robert Kim",
      email: "robert.kim@fintech.co",
      department: "Infrastructure",
      organization: "FinTech Solutions"
    },
    status: "pending-review",
    priority: "high",
    assignedTo: "James Anderson",
    assignedTeam: "Solution Delivery",
    createdAt: "2024-02-05T10:00:00Z",
    updatedAt: "2024-02-09T16:30:00Z",
    dueDate: "2024-02-12T17:00:00Z",
    completedAt: "2024-02-09T16:30:00Z",
    estimatedHours: 12,
    actualHours: 10,
    tags: ["kubernetes", "microservices", "build-access"],
    relatedAssets: ["build-microservices-platform"],
    notes: [
      "Build environment prepared - 2024-02-06",
      "Access credentials generated - 2024-02-08",
      "Awaiting security approval - 2024-02-09"
    ],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  },
  {
    id: "req-005",
    requestNumber: "REQ-2024-005",
    type: "solution-specs",
    title: "Data Lake Architecture Specification",
    description: "Comprehensive architecture specification for modern data lake platform. Generated using DTMP AI DocWriter with best practices and compliance requirements.",
    requester: {
      name: "Jennifer Lee",
      email: "j.lee@manufacturing.com",
      department: "Data Engineering",
      organization: "Advanced Manufacturing Co"
    },
    status: "completed",
    priority: "medium",
    assignedTo: "Patricia Brown",
    assignedTeam: "Data Architecture",
    createdAt: "2024-01-28T09:00:00Z",
    updatedAt: "2024-02-07T15:00:00Z",
    dueDate: "2024-02-08T17:00:00Z",
    completedAt: "2024-02-07T15:00:00Z",
    estimatedHours: 32,
    actualHours: 30,
    tags: ["data-lake", "architecture", "specification"],
    relatedAssets: ["spec-data-lake-v1"],
    notes: [
      "Requirements analysis completed - 2024-01-29",
      "AI DocWriter generated initial spec - 2024-02-01",
      "Technical review and refinement - 2024-02-05",
      "Final specification delivered - 2024-02-07"
    ],
    slaStatus: "on-track",
    customerSatisfaction: 5
  },
  {
    id: "req-006",
    requestNumber: "REQ-2024-006",
    type: "dtmp-templates",
    title: "Security Assessment Template",
    description: "Request for customized security assessment template for cloud infrastructure. Generated using DTMP AI DocWriter with industry standards.",
    requester: {
      name: "Thomas Wright",
      email: "t.wright@retailcorp.com",
      department: "Security",
      organization: "Retail Corp"
    },
    status: "in-progress",
    priority: "low",
    assignedTo: "Maria Garcia",
    assignedTeam: "Security Templates",
    createdAt: "2024-02-03T14:20:00Z",
    updatedAt: "2024-02-09T10:15:00Z",
    dueDate: "2024-02-25T17:00:00Z",
    estimatedHours: 24,
    actualHours: 8,
    tags: ["security", "assessment", "template"],
    relatedAssets: ["template-security-assessment"],
    notes: [
      "Template requirements defined - 2024-02-04",
      "AI DocWriter generating template - 2024-02-07",
      "First draft under review - 2024-02-09"
    ],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  },
  {
    id: "req-007",
    requestNumber: "REQ-2024-007",
    type: "solution-build",
    title: "API Gateway Implementation Build",
    description: "Request access to Kong API Gateway solution build with authentication, rate limiting, and monitoring pre-configured.",
    requester: {
      name: "Amanda Foster",
      email: "a.foster@healthcare.org",
      department: "API Platform",
      organization: "Healthcare Systems Inc"
    },
    status: "new",
    priority: "high",
    assignedTo: undefined,
    assignedTeam: undefined,
    createdAt: "2024-02-10T13:30:00Z",
    updatedAt: "2024-02-10T13:30:00Z",
    dueDate: "2024-02-28T17:00:00Z",
    estimatedHours: 48,
    tags: ["api-gateway", "kong", "build-access"],
    relatedAssets: [],
    notes: [],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  },
  {
    id: "req-008",
    requestNumber: "REQ-2024-008",
    type: "support-services",
    title: "Mobile App Performance Optimization",
    description: "Expert consultation needed for mobile application performance issues. Users experiencing slow load times and crashes.",
    requester: {
      name: "Kevin Patel",
      email: "k.patel@bankingsec.com",
      department: "Mobile Development",
      organization: "Banking Security Corp"
    },
    status: "on-hold",
    priority: "high",
    assignedTo: "Daniel Thompson",
    assignedTeam: "Expert Consultancy",
    createdAt: "2024-02-06T11:00:00Z",
    updatedAt: "2024-02-08T09:45:00Z",
    dueDate: "2024-02-18T17:00:00Z",
    estimatedHours: 20,
    actualHours: 6,
    tags: ["mobile", "performance", "support"],
    relatedAssets: ["mobile-optimization-guide"],
    notes: [
      "Initial performance analysis completed - 2024-02-06",
      "On hold pending app logs from client - 2024-02-08"
    ],
    slaStatus: "at-risk",
    customerSatisfaction: undefined
  },
  {
    id: "req-009",
    requestNumber: "REQ-2024-009",
    type: "dtmp-templates",
    title: "DevOps Runbook Template",
    description: "Request for standardized DevOps runbook template covering deployment, monitoring, and incident response procedures.",
    requester: {
      name: "Michelle Santos",
      email: "m.santos@cloudops.io",
      department: "DevOps",
      organization: "CloudOps Solutions"
    },
    status: "completed",
    priority: "medium",
    assignedTo: "Sarah Mitchell",
    assignedTeam: "DevOps Templates",
    createdAt: "2024-01-25T10:00:00Z",
    updatedAt: "2024-02-05T14:00:00Z",
    dueDate: "2024-02-06T17:00:00Z",
    completedAt: "2024-02-05T14:00:00Z",
    estimatedHours: 20,
    actualHours: 18,
    tags: ["devops", "runbook", "template"],
    relatedAssets: ["template-devops-runbook"],
    notes: [
      "Template structure defined - 2024-01-26",
      "AI DocWriter generated template - 2024-01-30",
      "Client feedback incorporated - 2024-02-03",
      "Final template delivered - 2024-02-05"
    ],
    slaStatus: "on-track",
    customerSatisfaction: 4
  },
  {
    id: "req-010",
    requestNumber: "REQ-2024-010",
    type: "solution-build",
    title: "Observability Stack Build Access",
    description: "Request access to complete observability solution build with Prometheus, Grafana, and distributed tracing configured.",
    requester: {
      name: "Carlos Mendez",
      email: "c.mendez@monitoring.tech",
      department: "SRE",
      organization: "Monitoring Technologies"
    },
    status: "in-progress",
    priority: "medium",
    assignedTo: "Robert Johnson",
    assignedTeam: "Solution Delivery",
    createdAt: "2024-02-07T09:00:00Z",
    updatedAt: "2024-02-10T11:00:00Z",
    dueDate: "2024-02-17T17:00:00Z",
    estimatedHours: 16,
    actualHours: 10,
    tags: ["observability", "monitoring", "build-access"],
    relatedAssets: ["build-observability-stack"],
    notes: [
      "Build environment provisioned - 2024-02-08",
      "Configuration in progress - 2024-02-10"
    ],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  },
  {
    id: "req-011",
    requestNumber: "REQ-2024-011",
    type: "support-services",
    title: "Cloud Cost Optimization Consultation",
    description: "Need expert guidance on reducing cloud infrastructure costs. Current spend exceeding budget by 40%.",
    requester: {
      name: "Diana Chen",
      email: "d.chen@startup.ventures",
      department: "Finance",
      organization: "Startup Ventures"
    },
    status: "assigned",
    priority: "high",
    assignedTo: "James Anderson",
    assignedTeam: "Cloud Optimization",
    createdAt: "2024-02-09T14:30:00Z",
    updatedAt: "2024-02-10T09:00:00Z",
    dueDate: "2024-02-16T17:00:00Z",
    estimatedHours: 24,
    actualHours: 4,
    tags: ["cloud", "cost-optimization", "consultation"],
    relatedAssets: ["cloud-cost-analysis-tool"],
    notes: [
      "Initial cost analysis started - 2024-02-10"
    ],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  },
  {
    id: "req-012",
    requestNumber: "REQ-2024-012",
    type: "solution-specs",
    title: "Event-Driven Architecture Specification",
    description: "Detailed specification for event-driven microservices architecture using Kafka. Generated using DTMP AI DocWriter.",
    requester: {
      name: "Alex Turner",
      email: "a.turner@streaming.io",
      department: "Platform Engineering",
      organization: "Streaming Solutions"
    },
    status: "new",
    priority: "medium",
    assignedTo: undefined,
    assignedTeam: undefined,
    createdAt: "2024-02-10T15:00:00Z",
    updatedAt: "2024-02-10T15:00:00Z",
    dueDate: "2024-02-24T17:00:00Z",
    estimatedHours: 28,
    tags: ["event-driven", "kafka", "specification"],
    relatedAssets: [],
    notes: [],
    slaStatus: "on-track",
    customerSatisfaction: undefined
  }
];

export const requestMetrics = {
  totalRequests: 127,
  newRequests: 12,
  inProgress: 34,
  pendingReview: 8,
  completed: 68,
  onHold: 5,
  avgResolutionTime: 4.2, // days
  slaCompliance: 94, // percentage
  customerSatisfaction: 4.6, // out of 5
  teamUtilization: 78 // percentage
};

export const teamMembers = [
  { id: "tm-001", name: "Michael Chen", team: "Solution Architecture", capacity: 40, currentLoad: 32 },
  { id: "tm-002", name: "Lisa Wang", team: "Technical Support", capacity: 40, currentLoad: 38 },
  { id: "tm-003", name: "James Anderson", team: "Expert Consultancy", capacity: 35, currentLoad: 28 },
  { id: "tm-004", name: "Patricia Brown", team: "Digital Intelligence", capacity: 40, currentLoad: 30 },
  { id: "tm-005", name: "Maria Garcia", team: "Learning & Development", capacity: 40, currentLoad: 24 },
  { id: "tm-006", name: "Daniel Thompson", team: "Security Architecture", capacity: 40, currentLoad: 36 },
  { id: "tm-007", name: "Sarah Mitchell", team: "Solution Architecture", capacity: 40, currentLoad: 25 },
  { id: "tm-008", name: "Robert Johnson", team: "Technical Support", capacity: 40, currentLoad: 35 }
];
