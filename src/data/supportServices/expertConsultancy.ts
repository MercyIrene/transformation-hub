export interface ExpertProfile {
  name: string;
  title: string;
  initials: string;
}

export interface ExpertConsultancy {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  expertProfile: ExpertProfile;
  duration: string;
  deliveryModel: string;
  pricing: string;
  experienceLevel: string;
  keyBenefits: string[];
  industrySpecialization: string;
}

export const expertConsultancy: ExpertConsultancy[] = [
  {
    id: "architecture-advisory",
    title: "Enterprise Architecture Advisory",
    description: "Strategic architecture guidance from seasoned enterprise architects",
    icon: "Building",
    type: "Advisory",
    expertProfile: {
      name: "Dr. Sarah Mitchell",
      title: "Chief Architect",
      initials: "SM"
    },
    duration: "Flexible engagement",
    deliveryModel: "Hybrid",
    pricing: "Daily Rate",
    experienceLevel: "Chief Architect",
    keyBenefits: ["Architecture reviews", "Strategic guidance", "Decision support"],
    industrySpecialization: "Cross-Industry"
  },
  {
    id: "transformation-coaching",
    title: "Transformation Leadership Coaching",
    description: "One-on-one coaching for transformation leaders and executives",
    icon: "Target",
    type: "Coaching & Mentoring",
    expertProfile: {
      name: "James Chen",
      title: "Principal Consultant",
      initials: "JC"
    },
    duration: "3-6 months",
    deliveryModel: "Hybrid",
    pricing: "Retainer",
    experienceLevel: "Principal Consultant",
    keyBenefits: ["Leadership development", "Change management", "Executive presence"],
    industrySpecialization: "Cross-Industry"
  },
  {
    id: "portfolio-optimization-consulting",
    title: "Portfolio Optimization Consulting",
    description: "Expert guidance on application and project portfolio rationalization",
    icon: "Briefcase",
    type: "Advisory",
    expertProfile: {
      name: "Maria Rodriguez",
      title: "Senior Consultant",
      initials: "MR"
    },
    duration: "1-3 months",
    deliveryModel: "Remote",
    pricing: "Project-based",
    experienceLevel: "Senior Consultant",
    keyBenefits: ["Portfolio analysis", "Rationalization", "Cost optimization"],
    industrySpecialization: "Financial Services"
  },
  {
    id: "data-strategy-consulting",
    title: "Data Strategy Consulting",
    description: "Develop enterprise data strategy and architecture with data experts",
    icon: "Database",
    type: "Advisory",
    expertProfile: {
      name: "David Park",
      title: "Subject Matter Expert",
      initials: "DP"
    },
    duration: "1-3 months",
    deliveryModel: "Hybrid",
    pricing: "Project-based",
    experienceLevel: "Subject Matter Expert",
    keyBenefits: ["Data strategy", "Architecture design", "Governance framework"],
    industrySpecialization: "Cross-Industry"
  },
  {
    id: "change-management-consulting",
    title: "Change Management Consulting",
    description: "Expert change management support for transformation initiatives",
    icon: "Users",
    type: "Hands-on Implementation",
    expertProfile: {
      name: "Lisa Thompson",
      title: "Principal Consultant",
      initials: "LT"
    },
    duration: "3-6 months",
    deliveryModel: "On-site",
    pricing: "Retainer",
    experienceLevel: "Principal Consultant",
    keyBenefits: ["Change strategy", "Stakeholder engagement", "Adoption programs"],
    industrySpecialization: "Healthcare"
  },
  {
    id: "cloud-architecture-advisory",
    title: "Cloud Architecture Advisory",
    description: "Cloud strategy and architecture guidance from cloud specialists",
    icon: "Cloud",
    type: "Advisory",
    expertProfile: {
      name: "Robert Kim",
      title: "Chief Architect",
      initials: "RK"
    },
    duration: "Short-term (<1 month)",
    deliveryModel: "Remote",
    pricing: "Daily Rate",
    experienceLevel: "Chief Architect",
    keyBenefits: ["Cloud strategy", "Architecture patterns", "Migration planning"],
    industrySpecialization: "Cross-Industry"
  },
  {
    id: "security-architecture-review",
    title: "Security Architecture Review",
    description: "Comprehensive security architecture assessment and recommendations",
    icon: "Shield",
    type: "Assessment & Review",
    expertProfile: {
      name: "Amanda Foster",
      title: "Subject Matter Expert",
      initials: "AF"
    },
    duration: "Short-term (<1 month)",
    deliveryModel: "Remote",
    pricing: "Project-based",
    experienceLevel: "Subject Matter Expert",
    keyBenefits: ["Security assessment", "Threat modeling", "Compliance review"],
    industrySpecialization: "Financial Services"
  },
  {
    id: "agile-transformation-coaching",
    title: "Agile Transformation Coaching",
    description: "Coaching teams and leaders through agile adoption and scaling",
    icon: "Zap",
    type: "Coaching & Mentoring",
    expertProfile: {
      name: "Michael Brown",
      title: "Principal Consultant",
      initials: "MB"
    },
    duration: "3-6 months",
    deliveryModel: "Hybrid",
    pricing: "Retainer",
    experienceLevel: "Principal Consultant",
    keyBenefits: ["Agile coaching", "Team training", "Process improvement"],
    industrySpecialization: "Cross-Industry"
  },
  {
    id: "api-strategy-consulting",
    title: "API Strategy & Design Consulting",
    description: "API strategy development and design excellence with API experts",
    icon: "Network",
    type: "Advisory",
    expertProfile: {
      name: "Jennifer Lee",
      title: "Senior Consultant",
      initials: "JL"
    },
    duration: "1-3 months",
    deliveryModel: "Remote",
    pricing: "Hourly",
    experienceLevel: "Senior Consultant",
    keyBenefits: ["API strategy", "Design patterns", "Governance framework"],
    industrySpecialization: "Cross-Industry"
  },
  {
    id: "devops-transformation-consulting",
    title: "DevOps Transformation Consulting",
    description: "End-to-end DevOps transformation guidance and implementation support",
    icon: "GitBranch",
    type: "Hands-on Implementation",
    expertProfile: {
      name: "Thomas Anderson",
      title: "Subject Matter Expert",
      initials: "TA"
    },
    duration: "3-6 months",
    deliveryModel: "Hybrid",
    pricing: "Retainer",
    experienceLevel: "Subject Matter Expert",
    keyBenefits: ["DevOps strategy", "Pipeline implementation", "Culture change"],
    industrySpecialization: "Retail"
  },
  {
    id: "integration-architecture-workshop",
    title: "Integration Architecture Workshop",
    description: "Interactive workshops on integration patterns and platform design",
    icon: "Link",
    type: "Workshops & Training",
    expertProfile: {
      name: "Patricia Garcia",
      title: "Senior Consultant",
      initials: "PG"
    },
    duration: "Short-term (<1 month)",
    deliveryModel: "On-site",
    pricing: "Project-based",
    experienceLevel: "Senior Consultant",
    keyBenefits: ["Integration patterns", "Architecture design", "Team training"],
    industrySpecialization: "Manufacturing"
  },
  {
    id: "technology-selection-advisory",
    title: "Technology Selection Advisory",
    description: "Objective guidance on technology platform and vendor selection",
    icon: "CheckSquare",
    type: "Advisory",
    expertProfile: {
      name: "William Davis",
      title: "Chief Architect",
      initials: "WD"
    },
    duration: "1-3 months",
    deliveryModel: "Remote",
    pricing: "Project-based",
    experienceLevel: "Chief Architect",
    keyBenefits: ["Vendor evaluation", "RFP support", "Decision framework"],
    industrySpecialization: "Public Sector"
  },
  {
    id: "microservices-architecture-consulting",
    title: "Microservices Architecture Consulting",
    description: "Expert guidance on microservices design, decomposition, and implementation",
    icon: "Boxes",
    type: "Hands-on Implementation",
    expertProfile: {
      name: "Emily White",
      title: "Principal Consultant",
      initials: "EW"
    },
    duration: "1-3 months",
    deliveryModel: "Hybrid",
    pricing: "Daily Rate",
    experienceLevel: "Principal Consultant",
    keyBenefits: ["Service decomposition", "Design patterns", "Implementation guidance"],
    industrySpecialization: "Cross-Industry"
  },
  {
    id: "platform-modernization-consulting",
    title: "Platform Modernization Consulting",
    description: "Strategic consulting on legacy platform modernization and transformation",
    icon: "RefreshCw",
    type: "Advisory",
    expertProfile: {
      name: "Christopher Moore",
      title: "Chief Architect",
      initials: "CM"
    },
    duration: "3-6 months",
    deliveryModel: "Hybrid",
    pricing: "Retainer",
    experienceLevel: "Chief Architect",
    keyBenefits: ["Modernization strategy", "Architecture design", "Roadmap development"],
    industrySpecialization: "Financial Services"
  },
  {
    id: "process-automation-consulting",
    title: "Process Automation Consulting",
    description: "Identify and implement process automation opportunities across the enterprise",
    icon: "Workflow",
    type: "Hands-on Implementation",
    expertProfile: {
      name: "Sophia Martinez",
      title: "Senior Consultant",
      initials: "SM"
    },
    duration: "1-3 months",
    deliveryModel: "On-site",
    pricing: "Project-based",
    experienceLevel: "Senior Consultant",
    keyBenefits: ["Process analysis", "Automation design", "Implementation support"],
    industrySpecialization: "Manufacturing"
  },
  {
    id: "executive-transformation-briefings",
    title: "Executive Transformation Briefings",
    description: "Customized briefings for executives on emerging trends and best practices",
    icon: "Presentation",
    type: "Workshops & Training",
    expertProfile: {
      name: "Daniel Johnson",
      title: "Principal Consultant",
      initials: "DJ"
    },
    duration: "Short-term (<1 month)",
    deliveryModel: "On-site",
    pricing: "Project-based",
    experienceLevel: "Principal Consultant",
    keyBenefits: ["Trend analysis", "Best practices", "Strategic insights"],
    industrySpecialization: "Cross-Industry"
  }
];
