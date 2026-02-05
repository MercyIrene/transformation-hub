export interface Project {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  progress: number;
  startDate: string;
  endDate: string;
  budget: {
    allocated: number;
    spent: number;
  };
  team: {
    lead: string;
    size: number;
  };
  businessUnit: string;
  stakeholders: string[];
  risks: {
    level: 'High' | 'Medium' | 'Low';
    count: number;
  };
  dependencies: string[];
  milestones: {
    name: string;
    date: string;
    status: 'Completed' | 'In Progress' | 'Pending';
  }[];
  relatedApplications: string[];
}

export const projects: Project[] = [
  {
    id: 'proj-001',
    name: 'Digital Customer Experience Platform',
    description: 'Modernize customer touchpoints with unified digital experience platform',
    category: 'Digital Transformation',
    status: 'In Progress',
    priority: 'Critical',
    progress: 65,
    startDate: '2023-09-01',
    endDate: '2024-06-30',
    budget: {
      allocated: 2500000,
      spent: 1625000
    },
    team: {
      lead: 'Sarah Johnson',
      size: 12
    },
    businessUnit: 'Customer Success',
    stakeholders: ['John Smith (CTO)', 'Maria Garcia (VP Customer Success)', 'Alex Thompson (Head of UX)'],
    risks: {
      level: 'Medium',
      count: 3
    },
    dependencies: ['Customer Portal Migration', 'API Gateway Implementation'],
    milestones: [
      { name: 'Requirements Gathering', date: '2023-10-15', status: 'Completed' },
      { name: 'Design Phase', date: '2023-12-01', status: 'Completed' },
      { name: 'Development Phase 1', date: '2024-02-15', status: 'Completed' },
      { name: 'Development Phase 2', date: '2024-04-30', status: 'In Progress' },
      { name: 'Testing & QA', date: '2024-05-31', status: 'Pending' },
      { name: 'Go-Live', date: '2024-06-30', status: 'Pending' }
    ],
    relatedApplications: ['app-001']
  },
  {
    id: 'proj-002',
    name: 'ERP System Modernization',
    description: 'Replace legacy ERP with cloud-native solution',
    category: 'System Modernization',
    status: 'Planning',
    priority: 'Critical',
    progress: 15,
    startDate: '2024-03-01',
    endDate: '2025-12-31',
    budget: {
      allocated: 5000000,
      spent: 250000
    },
    team: {
      lead: 'Michael Chen',
      size: 18
    },
    businessUnit: 'Finance',
    stakeholders: ['Jennifer Lee (CFO)', 'Robert Taylor (Finance Director)', 'David Kim (IT Director)'],
    risks: {
      level: 'High',
      count: 7
    },
    dependencies: ['Data Migration Strategy', 'Change Management Program'],
    milestones: [
      { name: 'Vendor Selection', date: '2024-04-15', status: 'In Progress' },
      { name: 'System Design', date: '2024-06-30', status: 'Pending' },
      { name: 'Phase 1 Implementation', date: '2024-12-31', status: 'Pending' },
      { name: 'Phase 2 Implementation', date: '2025-06-30', status: 'Pending' },
      { name: 'Full Deployment', date: '2025-12-31', status: 'Pending' }
    ],
    relatedApplications: ['app-002']
  },
  {
    id: 'proj-003',
    name: 'AI-Powered Analytics Initiative',
    description: 'Implement machine learning capabilities across business analytics',
    category: 'AI/ML',
    status: 'In Progress',
    priority: 'High',
    progress: 40,
    startDate: '2023-11-01',
    endDate: '2024-08-31',
    budget: {
      allocated: 1800000,
      spent: 720000
    },
    team: {
      lead: 'Emily Rodriguez',
      size: 8
    },
    businessUnit: 'Product',
    stakeholders: ['Lisa Wang (VP Product)', 'Dr. James Wilson (Chief Data Officer)'],
    risks: {
      level: 'Medium',
      count: 2
    },
    dependencies: ['Data Lake Implementation', 'ML Platform Setup'],
    milestones: [
      { name: 'Data Infrastructure', date: '2024-01-31', status: 'Completed' },
      { name: 'ML Model Development', date: '2024-04-30', status: 'In Progress' },
      { name: 'Integration Testing', date: '2024-06-30', status: 'Pending' },
      { name: 'Production Deployment', date: '2024-08-31', status: 'Pending' }
    ],
    relatedApplications: ['app-003']
  },
  {
    id: 'proj-004',
    name: 'Cloud Migration Program',
    description: 'Migrate on-premises applications to cloud infrastructure',
    category: 'Infrastructure',
    status: 'In Progress',
    priority: 'High',
    progress: 75,
    startDate: '2023-06-01',
    endDate: '2024-03-31',
    budget: {
      allocated: 3200000,
      spent: 2400000
    },
    team: {
      lead: 'David Kim',
      size: 15
    },
    businessUnit: 'IT',
    stakeholders: ['John Smith (CTO)', 'Michael Chen (Infrastructure Lead)'],
    risks: {
      level: 'Low',
      count: 1
    },
    dependencies: ['Security Compliance Review', 'Network Configuration'],
    milestones: [
      { name: 'Assessment & Planning', date: '2023-08-31', status: 'Completed' },
      { name: 'Pilot Migration', date: '2023-11-30', status: 'Completed' },
      { name: 'Phase 1 Migration', date: '2024-01-31', status: 'Completed' },
      { name: 'Phase 2 Migration', date: '2024-03-31', status: 'In Progress' }
    ],
    relatedApplications: ['app-004']
  },
  {
    id: 'proj-005',
    name: 'Legacy System Retirement',
    description: 'Decommission outdated systems and migrate data',
    category: 'System Retirement',
    status: 'On Hold',
    priority: 'Medium',
    progress: 25,
    startDate: '2024-01-15',
    endDate: '2024-06-30',
    budget: {
      allocated: 800000,
      spent: 150000
    },
    team: {
      lead: 'Robert Taylor',
      size: 6
    },
    businessUnit: 'Finance',
    stakeholders: ['Jennifer Lee (CFO)', 'Michael Chen (IT Lead)'],
    risks: {
      level: 'High',
      count: 4
    },
    dependencies: ['Data Migration Approval', 'User Training Completion'],
    milestones: [
      { name: 'Data Assessment', date: '2024-02-29', status: 'Completed' },
      { name: 'Migration Planning', date: '2024-04-15', status: 'Pending' },
      { name: 'System Decommission', date: '2024-06-30', status: 'Pending' }
    ],
    relatedApplications: ['app-006']
  },
  {
    id: 'proj-006',
    name: 'Supply Chain Digital Twin',
    description: 'Create digital twin model for supply chain optimization',
    category: 'Digital Innovation',
    status: 'Completed',
    priority: 'Medium',
    progress: 100,
    startDate: '2023-01-01',
    endDate: '2023-10-31',
    budget: {
      allocated: 1500000,
      spent: 1450000
    },
    team: {
      lead: 'Lisa Wang',
      size: 10
    },
    businessUnit: 'Operations',
    stakeholders: ['Mark Johnson (COO)', 'Dr. James Wilson (Chief Data Officer)'],
    risks: {
      level: 'Low',
      count: 0
    },
    dependencies: [],
    milestones: [
      { name: 'Proof of Concept', date: '2023-03-31', status: 'Completed' },
      { name: 'Development', date: '2023-07-31', status: 'Completed' },
      { name: 'Testing & Validation', date: '2023-09-30', status: 'Completed' },
      { name: 'Production Launch', date: '2023-10-31', status: 'Completed' }
    ],
    relatedApplications: ['app-005']
  }
];

export const projectCategories = [
  'All Categories',
  'Digital Transformation',
  'System Modernization',
  'AI/ML',
  'Infrastructure',
  'System Retirement',
  'Digital Innovation'
];

export const projectStatuses = [
  'All Statuses',
  'Planning',
  'In Progress',
  'On Hold',
  'Completed',
  'Cancelled'
];