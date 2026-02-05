export interface Application {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'Active' | 'Maintenance' | 'Deprecated' | 'Planned';
  healthScore: number;
  techStack: string[];
  owner: string;
  businessUnit: string;
  lastUpdated: string;
  users: number;
  criticalityLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  compliance: {
    security: 'Compliant' | 'Non-Compliant' | 'Under Review';
    regulatory: 'Compliant' | 'Non-Compliant' | 'Under Review';
  };
  costs: {
    annual: number;
    maintenance: number;
  };
  modernizationPriority: 'High' | 'Medium' | 'Low';
  retirementDate?: string;
}

export const applications: Application[] = [
  {
    id: 'app-001',
    name: 'Customer Portal',
    description: 'Self-service portal for customer account management and support',
    category: 'Customer Experience',
    status: 'Active',
    healthScore: 85,
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    owner: 'Sarah Johnson',
    businessUnit: 'Customer Success',
    lastUpdated: '2024-01-15',
    users: 15000,
    criticalityLevel: 'Critical',
    compliance: {
      security: 'Compliant',
      regulatory: 'Compliant'
    },
    costs: {
      annual: 250000,
      maintenance: 75000
    },
    modernizationPriority: 'Low'
  },
  {
    id: 'app-002',
    name: 'Legacy ERP System',
    description: 'Enterprise resource planning system for finance and operations',
    category: 'Enterprise Systems',
    status: 'Maintenance',
    healthScore: 45,
    techStack: ['Java', 'Oracle', 'WebLogic'],
    owner: 'Michael Chen',
    businessUnit: 'Finance',
    lastUpdated: '2023-11-20',
    users: 500,
    criticalityLevel: 'Critical',
    compliance: {
      security: 'Under Review',
      regulatory: 'Compliant'
    },
    costs: {
      annual: 500000,
      maintenance: 200000
    },
    modernizationPriority: 'High',
    retirementDate: '2025-12-31'
  },
  {
    id: 'app-003',
    name: 'Mobile Analytics Dashboard',
    description: 'Real-time analytics and reporting for mobile applications',
    category: 'Analytics',
    status: 'Active',
    healthScore: 92,
    techStack: ['Vue.js', 'Python', 'MongoDB', 'Docker'],
    owner: 'Emily Rodriguez',
    businessUnit: 'Product',
    lastUpdated: '2024-02-01',
    users: 200,
    criticalityLevel: 'High',
    compliance: {
      security: 'Compliant',
      regulatory: 'Compliant'
    },
    costs: {
      annual: 120000,
      maintenance: 30000
    },
    modernizationPriority: 'Low'
  },
  {
    id: 'app-004',
    name: 'HR Management System',
    description: 'Human resources management and employee self-service platform',
    category: 'Human Resources',
    status: 'Active',
    healthScore: 78,
    techStack: ['Angular', '.NET Core', 'SQL Server', 'Azure'],
    owner: 'David Kim',
    businessUnit: 'Human Resources',
    lastUpdated: '2024-01-28',
    users: 1200,
    criticalityLevel: 'High',
    compliance: {
      security: 'Compliant',
      regulatory: 'Under Review'
    },
    costs: {
      annual: 180000,
      maintenance: 45000
    },
    modernizationPriority: 'Medium'
  },
  {
    id: 'app-005',
    name: 'Supply Chain Optimizer',
    description: 'AI-powered supply chain optimization and forecasting tool',
    category: 'Operations',
    status: 'Planned',
    healthScore: 0,
    techStack: ['React', 'Python', 'TensorFlow', 'Kubernetes'],
    owner: 'Lisa Wang',
    businessUnit: 'Operations',
    lastUpdated: '2024-02-05',
    users: 0,
    criticalityLevel: 'Medium',
    compliance: {
      security: 'Under Review',
      regulatory: 'Under Review'
    },
    costs: {
      annual: 300000,
      maintenance: 60000
    },
    modernizationPriority: 'Low'
  },
  {
    id: 'app-006',
    name: 'Legacy Reporting Tool',
    description: 'Outdated reporting system scheduled for retirement',
    category: 'Reporting',
    status: 'Deprecated',
    healthScore: 25,
    techStack: ['PHP', 'MySQL', 'Apache'],
    owner: 'Robert Taylor',
    businessUnit: 'Finance',
    lastUpdated: '2023-08-15',
    users: 50,
    criticalityLevel: 'Low',
    compliance: {
      security: 'Non-Compliant',
      regulatory: 'Non-Compliant'
    },
    costs: {
      annual: 50000,
      maintenance: 25000
    },
    modernizationPriority: 'High',
    retirementDate: '2024-06-30'
  }
];

export const applicationCategories = [
  'All Categories',
  'Customer Experience',
  'Enterprise Systems',
  'Analytics',
  'Human Resources',
  'Operations',
  'Reporting'
];

export const applicationStatuses = [
  'All Statuses',
  'Active',
  'Maintenance',
  'Deprecated',
  'Planned'
];