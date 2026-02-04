export interface FilterConfig {
  [key: string]: string[];
}

export const solutionSpecsFilters: FilterConfig = {
  solutionType: [
    "DBP - Digital Business Platform",
    "DXP - Digital Experience Platform",
    "DWS - Digital Workspace Solutions",
    "DIA - Data, Intelligence & Analytics",
    "SDO - Secure DevOps Operations"
  ],
  blueprintScope: [
    "Enterprise Reference Architecture",
    "Domain Architecture",
    "Solution Architecture",
    "Component Architecture"
  ],
  maturityLevel: [
    "Foundation",
    "Intermediate",
    "Advanced",
    "Leading Edge"
  ],
  industryFocus: [
    "Cross-Industry",
    "Financial Services",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Public Sector"
  ],
  technicalComplexity: [
    "Low",
    "Medium",
    "High",
    "Very High"
  ],
  deploymentModel: [
    "Cloud-Native",
    "Hybrid",
    "On-Premise",
    "Multi-Cloud"
  ],
  includesDiagrams: [
    "Yes - Comprehensive",
    "Yes - Basic",
    "No"
  ],
  includesComponentList: [
    "Yes",
    "No"
  ]
};

export const solutionBuildFilters: FilterConfig = {
  solutionType: [
    "DBP Platform",
    "DXP Platform",
    "DWS Platform",
    "DIA Platform",
    "SDO Platform"
  ],
  buildComplexity: [
    "Simple",
    "Moderate",
    "Complex",
    "Very Complex"
  ],
  technologyStack: [
    "Microservices",
    "Serverless",
    "Containers",
    "Hybrid",
    "Monolithic"
  ],
  deploymentTarget: [
    "AWS",
    "Azure",
    "GCP",
    "Multi-Cloud",
    "On-Premise",
    "Kubernetes"
  ],
  includesAutomation: [
    "CI/CD Pipelines",
    "IaC Templates",
    "Deployment Scripts",
    "All",
    "None"
  ],
  includesCodeSamples: [
    "Yes - Extensive",
    "Yes - Limited",
    "No"
  ],
  implementationTime: [
    "< 1 month",
    "1-3 months",
    "3-6 months",
    "6+ months"
  ],
  skillLevel: [
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert"
  ]
};
