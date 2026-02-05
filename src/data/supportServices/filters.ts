export interface FilterGroup {
  label: string;
  options: string[];
}

export interface FilterConfig {
  [key: string]: FilterGroup;
}

// Convert FilterConfig to simple Record<string, string[]> for FilterPanel
export const technicalSupportFilters: Record<string, string[]> = {
  supportType: [
    "Platform Support",
    "Incident Response",
    "Performance Optimization",
    "Security Support",
    "Integration Support",
    "Migration Support"
  ],
  slaLevel: [
    "Critical (24/7)",
    "High Priority (Business Hours+)",
    "Standard (Business Hours)",
    "Best Effort"
  ],
  coverageArea: [
    "DBP Platform",
    "DXP Platform",
    "DWS Platform",
    "DIA Platform",
    "SDO Platform",
    "Infrastructure",
    "Applications"
  ],
  responseTime: [
    "Immediate (<15 min)",
    "Urgent (<1 hour)",
    "Standard (<4 hours)",
    "Normal (<24 hours)"
  ],
  deliveryModel: ["Remote", "On-site", "Hybrid"],
  teamSize: ["Dedicated Team", "Shared Pool", "On-demand"],
  pricing: ["Included in Platform", "Per Incident", "Subscription", "Retainer"]
};

export const expertConsultancyFilters: Record<string, string[]> = {
  expertiseArea: [
    "Architecture",
    "Transformation Strategy",
    "Portfolio Management",
    "Change Management",
    "Technology Selection",
    "Process Improvement",
    "Data Strategy"
  ],
  consultancyType: [
    "Advisory",
    "Hands-on Implementation",
    "Coaching & Mentoring",
    "Assessment & Review",
    "Workshops & Training"
  ],
  experienceLevel: [
    "Senior Consultant",
    "Principal Consultant",
    "Chief Architect",
    "Subject Matter Expert"
  ],
  engagementDuration: [
    "Short-term (<1 month)",
    "Medium-term (1-3 months)",
    "Long-term (3-6 months)",
    "Extended (6+ months)"
  ],
  deliveryModel: ["Remote", "On-site", "Hybrid"],
  industrySpecialization: [
    "Cross-Industry",
    "Financial Services",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Public Sector"
  ],
  pricing: ["Hourly", "Daily Rate", "Project-based", "Retainer"]
};
