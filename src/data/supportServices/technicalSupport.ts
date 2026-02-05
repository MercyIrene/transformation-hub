export interface TechnicalSupport {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: string;
  slaLevel: string;
  responseTime: string;
  deliveryModel: string;
  coverage: string;
  pricing: string;
  keyBenefits: string[];
  teamSize: string;
}

export const technicalSupport: TechnicalSupport[] = [
  {
    id: "24x7-platform-support",
    title: "24/7 Platform Support",
    description: "Round-the-clock technical support for critical DBP platform issues with guaranteed response times",
    icon: "Headphones",
    type: "Platform Support",
    slaLevel: "Critical",
    responseTime: "15 min response",
    deliveryModel: "Remote",
    coverage: "All DBP Platforms",
    pricing: "Included in Platform",
    keyBenefits: ["24/7 availability", "Dedicated team", "Multi-channel support"],
    teamSize: "Dedicated Team"
  },
  {
    id: "incident-response",
    title: "Critical Incident Response",
    description: "Emergency response team for critical production incidents requiring immediate attention",
    icon: "AlertTriangle",
    type: "Incident Response",
    slaLevel: "Critical",
    responseTime: "Immediate (<15 min)",
    deliveryModel: "Remote",
    coverage: "Production Systems",
    pricing: "Included in Platform",
    keyBenefits: ["War room support", "Root cause analysis", "Prevention planning"],
    teamSize: "Dedicated Team"
  },
  {
    id: "performance-optimization",
    title: "Performance Optimization Support",
    description: "Expert assistance in diagnosing and resolving system performance issues",
    icon: "Zap",
    type: "Performance Optimization",
    slaLevel: "High Priority",
    responseTime: "1 hour response",
    deliveryModel: "Remote",
    coverage: "All Platforms",
    pricing: "Subscription",
    keyBenefits: ["Performance tuning", "Bottleneck identification", "Optimization recommendations"],
    teamSize: "Shared Pool"
  },
  {
    id: "security-incident-support",
    title: "Security Incident Support",
    description: "Specialized support for security incidents, vulnerabilities, and breach response",
    icon: "Shield",
    type: "Security Support",
    slaLevel: "Critical",
    responseTime: "Immediate (<15 min)",
    deliveryModel: "Remote",
    coverage: "Security Infrastructure",
    pricing: "Included in Platform",
    keyBenefits: ["Breach response", "Forensics support", "Remediation guidance"],
    teamSize: "Dedicated Team"
  },
  {
    id: "integration-troubleshooting",
    title: "Integration Troubleshooting",
    description: "Expert assistance with API, middleware, and system integration issues",
    icon: "Link",
    type: "Integration Support",
    slaLevel: "High Priority",
    responseTime: "1 hour response",
    deliveryModel: "Remote",
    coverage: "Integration Layer",
    pricing: "Subscription",
    keyBenefits: ["API debugging", "Integration testing", "Configuration review"],
    teamSize: "Shared Pool"
  },
  {
    id: "database-support",
    title: "Database Performance Support",
    description: "Database optimization, query tuning, and troubleshooting services",
    icon: "Database",
    type: "Performance Optimization",
    slaLevel: "High Priority",
    responseTime: "2 hour response",
    deliveryModel: "Remote",
    coverage: "Database Systems",
    pricing: "Subscription",
    keyBenefits: ["Query optimization", "Index tuning", "Capacity planning"],
    teamSize: "Shared Pool"
  },
  {
    id: "cloud-migration-support",
    title: "Cloud Migration Support",
    description: "Technical assistance during cloud migration projects including planning and execution",
    icon: "Cloud",
    type: "Migration Support",
    slaLevel: "Standard",
    responseTime: "4 hour response",
    deliveryModel: "Hybrid",
    coverage: "Cloud Infrastructure",
    pricing: "Project-based",
    keyBenefits: ["Migration planning", "Execution support", "Post-migration optimization"],
    teamSize: "Dedicated Team"
  },
  {
    id: "application-troubleshooting",
    title: "Application Troubleshooting",
    description: "Diagnosis and resolution of application-level issues and errors",
    icon: "Bug",
    type: "Platform Support",
    slaLevel: "Standard",
    responseTime: "4 hour response",
    deliveryModel: "Remote",
    coverage: "Applications",
    pricing: "Per Incident",
    keyBenefits: ["Error diagnosis", "Log analysis", "Fix implementation"],
    teamSize: "Shared Pool"
  },
  {
    id: "disaster-recovery-support",
    title: "Disaster Recovery Support",
    description: "Support during disaster recovery scenarios including failover and restoration",
    icon: "HardDrive",
    type: "Incident Response",
    slaLevel: "Critical",
    responseTime: "Immediate (<15 min)",
    deliveryModel: "Remote",
    coverage: "All Systems",
    pricing: "Included in Platform",
    keyBenefits: ["DR execution", "Failover support", "Recovery validation"],
    teamSize: "Dedicated Team"
  },
  {
    id: "configuration-assistance",
    title: "Configuration & Setup Assistance",
    description: "Help with platform configuration, setup, and best practice implementation",
    icon: "Settings",
    type: "Platform Support",
    slaLevel: "Standard",
    responseTime: "Standard (<4 hours)",
    deliveryModel: "Remote",
    coverage: "All Platforms",
    pricing: "Subscription",
    keyBenefits: ["Configuration review", "Best practices", "Setup validation"],
    teamSize: "Shared Pool"
  },
  {
    id: "upgrade-assistance",
    title: "Platform Upgrade Assistance",
    description: "Support for platform version upgrades and patch deployments",
    icon: "ArrowUpCircle",
    type: "Platform Support",
    slaLevel: "High Priority",
    responseTime: "2 hour response",
    deliveryModel: "Remote",
    coverage: "All Platforms",
    pricing: "Included in Platform",
    keyBenefits: ["Upgrade planning", "Testing support", "Rollback assistance"],
    teamSize: "Shared Pool"
  },
  {
    id: "monitoring-setup",
    title: "Monitoring & Alerting Setup",
    description: "Configure and optimize monitoring, alerting, and observability tools",
    icon: "Eye",
    type: "Platform Support",
    slaLevel: "Standard",
    responseTime: "Normal (<24 hours)",
    deliveryModel: "Remote",
    coverage: "Observability Stack",
    pricing: "Per Incident",
    keyBenefits: ["Monitoring configuration", "Alert tuning", "Dashboard creation"],
    teamSize: "On-demand"
  },
  {
    id: "capacity-planning-support",
    title: "Capacity Planning Support",
    description: "Assistance with capacity forecasting, sizing, and resource optimization",
    icon: "Gauge",
    type: "Performance Optimization",
    slaLevel: "Standard",
    responseTime: "Normal (<24 hours)",
    deliveryModel: "Remote",
    coverage: "Infrastructure",
    pricing: "Subscription",
    keyBenefits: ["Capacity analysis", "Growth forecasting", "Sizing recommendations"],
    teamSize: "Shared Pool"
  },
  {
    id: "backup-restore-support",
    title: "Backup & Restore Support",
    description: "Assistance with backup configuration, testing, and restoration procedures",
    icon: "Archive",
    type: "Platform Support",
    slaLevel: "High Priority",
    responseTime: "1 hour response",
    deliveryModel: "Remote",
    coverage: "All Systems",
    pricing: "Included in Platform",
    keyBenefits: ["Backup validation", "Restore procedures", "DR testing"],
    teamSize: "Shared Pool"
  },
  {
    id: "api-gateway-support",
    title: "API Gateway Support",
    description: "Specialized support for API gateway configuration, policies, and troubleshooting",
    icon: "Network",
    type: "Integration Support",
    slaLevel: "High Priority",
    responseTime: "2 hour response",
    deliveryModel: "Remote",
    coverage: "API Gateway",
    pricing: "Subscription",
    keyBenefits: ["Policy configuration", "Traffic management", "Security setup"],
    teamSize: "Shared Pool"
  },
  {
    id: "container-orchestration-support",
    title: "Container & Kubernetes Support",
    description: "Expert support for containerized applications and Kubernetes clusters",
    icon: "Boxes",
    type: "Platform Support",
    slaLevel: "High Priority",
    responseTime: "1 hour response",
    deliveryModel: "Remote",
    coverage: "Container Platform",
    pricing: "Subscription",
    keyBenefits: ["Cluster troubleshooting", "Deployment support", "Resource optimization"],
    teamSize: "Shared Pool"
  },
  {
    id: "network-connectivity-support",
    title: "Network & Connectivity Support",
    description: "Diagnosis and resolution of network connectivity and integration issues",
    icon: "Wifi",
    type: "Integration Support",
    slaLevel: "High Priority",
    responseTime: "2 hour response",
    deliveryModel: "Remote",
    coverage: "Network Infrastructure",
    pricing: "Subscription",
    keyBenefits: ["Connectivity troubleshooting", "Firewall configuration", "VPN setup"],
    teamSize: "Shared Pool"
  },
  {
    id: "devops-pipeline-support",
    title: "DevOps Pipeline Support",
    description: "Support for CI/CD pipelines, automation, and deployment issues",
    icon: "GitBranch",
    type: "Platform Support",
    slaLevel: "Standard",
    responseTime: "Standard (<4 hours)",
    deliveryModel: "Remote",
    coverage: "CI/CD Platform",
    pricing: "Subscription",
    keyBenefits: ["Pipeline debugging", "Automation fixes", "Best practices"],
    teamSize: "Shared Pool"
  }
];
