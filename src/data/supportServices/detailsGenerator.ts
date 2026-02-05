import { technicalSupport, expertConsultancy } from "./index";

// Generate detail data for technical support services
export function generateTechnicalSupportDetail(serviceId: string) {
  const service = technicalSupport.find((s) => s.id === serviceId);
  if (!service) return null;

  const slaLevelMap: Record<string, { p1Response: string; p1Resolution: string; p2Response: string; p2Resolution: string }> = {
    Critical: {
      p1Response: "15 minutes",
      p1Resolution: "4 hours",
      p2Response: "30 minutes",
      p2Resolution: "8 hours",
    },
    "High Priority": {
      p1Response: "30 minutes",
      p1Resolution: "8 hours",
      p2Response: "1 hour",
      p2Resolution: "12 hours",
    },
    Standard: {
      p1Response: "2 hours",
      p1Resolution: "24 hours",
      p2Response: "4 hours",
      p2Resolution: "48 hours",
    },
  };

  const slaInfo = slaLevelMap[service.slaLevel] || slaLevelMap.Standard;

  return {
    id: service.id,
    title: service.title,
    type: service.type,
    slaLevel: service.slaLevel,
    responseTime: service.responseTime,
    deliveryModel: service.deliveryModel,

    overview: `${service.description}. Our expert team provides comprehensive support to ensure your systems remain operational and performant. We combine deep technical expertise with proven methodologies to resolve issues quickly and prevent future occurrences.`,
    
    whatsIncluded: [
      `${service.responseTime} guaranteed response time`,
      `${service.teamSize.toLowerCase()} of specialized engineers`,
      `${service.deliveryModel} support delivery`,
      "Comprehensive troubleshooting and resolution",
      "Detailed documentation and knowledge transfer",
      "Proactive recommendations and best practices",
      "Regular status updates and communication",
      "Access to support portal and knowledge base",
    ],
    
    idealFor: [
      `Organizations requiring ${service.slaLevel.toLowerCase()} support`,
      `${service.coverage} environments`,
      "Teams needing expert technical assistance",
      "Production systems requiring high availability",
      "Organizations with complex technical requirements",
    ],
    
    valueProposition: `Our ${service.title} service has helped hundreds of organizations maintain system reliability and performance. With an average customer satisfaction rating of 4.7/5.0 and 95%+ SLA compliance, we deliver consistent, high-quality support that keeps your systems running smoothly.`,
    
    supportedPlatforms: [
      "DBP (Digital Business Platform)",
      "DXP (Digital Experience Platform)",
      "DWS (Digital Workplace Solutions)",
      "DIA (Digital Integration Architecture)",
      "SDO (Service Delivery Operations)",
    ],

    coverageDetails: {
      availability: service.slaLevel === "Critical" ? "24/7/365" : "Business hours with extended coverage",
      holidays: service.slaLevel === "Critical" ? "Full coverage" : "Limited coverage",
      languageSupport: "English (primary), Arabic (limited hours)",
      geographicCoverage: "Global support with regional teams",
    },
    
    slaCommitments: [
      {
        severity: "Critical (P1)",
        definition: "Production system down, complete loss of service",
        responseTime: slaInfo.p1Response,
        resolutionTarget: slaInfo.p1Resolution,
        updateFrequency: "Every 30 minutes",
        escalation: "Immediate escalation to senior engineers",
      },
      {
        severity: "High (P2)",
        definition: "Major functionality impaired, significant degradation",
        responseTime: slaInfo.p2Response,
        resolutionTarget: slaInfo.p2Resolution,
        updateFrequency: "Every 2 hours",
        escalation: "Escalation if not resolved within 4 hours",
      },
      {
        severity: "Medium (P3)",
        definition: "Minor functionality issue, workaround available",
        responseTime: "4 hours",
        resolutionTarget: "24 hours",
        updateFrequency: "Daily",
        escalation: "Standard escalation path",
      },
    ],
    
    escalationProcedure: [
      {
        level: "Level 1 - Support Engineers",
        description: "Initial contact, handles routine issues",
        availability: service.slaLevel === "Critical" ? "24/7" : "Business hours",
      },
      {
        level: "Level 2 - Senior Engineers",
        description: "Complex technical issues, deep expertise",
        availability: service.slaLevel === "Critical" ? "24/7" : "On-call",
      },
      {
        level: "Level 3 - Specialists",
        description: "Platform specialists and architects",
        availability: "On-demand for critical issues",
      },
    ],
    
    performanceMetrics: {
      averageResponseTime: `Within ${service.responseTime.toLowerCase()}`,
      firstCallResolution: "72%",
      customerSatisfaction: "4.7/5.0",
      slaCompliance: "95.5%",
    },

    requestProcess: [
      {
        step: "Submit Request",
        description: "Create support ticket through available channels",
        channels: [
          "Support Portal: support.dtmp.com",
          "Email: support@dtmp.com",
          service.slaLevel === "Critical" ? "Phone: 24/7 hotline" : "Phone: Business hours",
          "Chat: Available in portal",
        ],
      },
      {
        step: "Ticket Assignment",
        description: "Ticket routed to appropriate support team",
        timing: "Immediate",
      },
      {
        step: "Initial Response",
        description: "Engineer acknowledges and begins investigation",
        timing: `Within ${service.responseTime}`,
      },
      {
        step: "Resolution",
        description: "Issue resolved and solution implemented",
        updates: "Regular updates per SLA",
      },
      {
        step: "Verification",
        description: "Solution verified and ticket closed",
        validation: "Customer confirmation required",
      },
    ],
    
    communicationChannels: [
      {
        channel: "Support Portal",
        description: "Primary channel for ticket management",
        availability: "24/7",
        bestFor: "All severity levels",
      },
      {
        channel: "Email",
        description: "support@dtmp.com for ticket creation",
        availability: "24/7 monitoring",
        bestFor: "Detailed descriptions and attachments",
      },
      {
        channel: "Phone",
        description: "Direct voice communication",
        availability: service.slaLevel === "Critical" ? "24/7" : "Business hours",
        bestFor: "Urgent issues",
      },
      {
        channel: "Chat",
        description: "Real-time chat support",
        availability: "Business hours",
        bestFor: "Quick questions",
      },
    ],
    
    ticketLifecycle: {
      statuses: [
        "New - Ticket created",
        "Assigned - Engineer allocated",
        "In Progress - Active work",
        "Waiting - Additional info needed",
        "Resolved - Solution implemented",
        "Closed - Verified and complete",
      ],
      customerActions: [
        "Provide detailed information",
        "Respond to requests promptly",
        "Verify solutions",
        "Provide feedback",
      ],
    },

    supportTeam: {
      size: `${service.teamSize} across global locations`,
      locations: ["Dubai", "London", "Singapore", "New York"],
      followTheSun: service.slaLevel === "Critical" ? "24/7 coverage with seamless handoffs" : "Business hours with on-call support",
      teamStructure: [
        "Support Engineers",
        "Senior Engineers",
        "Technical Specialists",
        "Support Manager",
      ],
    },
    
    expertiseAreas: [
      service.coverage,
      "Cloud infrastructure and platforms",
      "Application troubleshooting",
      "Performance optimization",
      "Security and compliance",
      "Integration and APIs",
    ],
    
    certifications: [
      "AWS Certified Solutions Architect",
      "Azure Solutions Architect",
      "ITIL Foundation",
      "Platform-specific certifications",
    ],
    
    teamProfiles: [
      {
        role: "Support Manager",
        name: "Team Lead",
        experience: "10+ years in technical support",
        expertise: `${service.type}, customer success`,
        availability: "Business hours + on-call",
      },
    ],
    
    continuousImprovement: "Our support team undergoes regular training on new technologies and best practices. We maintain a knowledge base of solutions and conduct monthly reviews to improve our processes.",

    prerequisites: [
      "Active platform subscription",
      "Designated technical contacts",
      "Basic environment documentation",
      "Access credentials for troubleshooting",
      "Network connectivity for remote support",
    ],
    
    onboardingProcess: [
      {
        phase: "Account Setup",
        duration: "1 day",
        activities: [
          "Create support portal accounts",
          "Configure notification preferences",
          "Set up contacts and escalation paths",
        ],
      },
      {
        phase: "Environment Documentation",
        duration: "2-3 days",
        activities: [
          "Document system architecture",
          "Provide access credentials",
          "Configure monitoring integrations",
        ],
      },
      {
        phase: "Orientation",
        duration: "1 hour",
        activities: [
          "Portal walkthrough",
          "SLA explanation",
          "Team introduction",
        ],
      },
    ],
    
    bestPractices: [
      "Submit tickets through portal for tracking",
      "Provide detailed descriptions and logs",
      "Assign appropriate severity levels",
      "Respond promptly to requests",
      "Provide feedback after resolution",
    ],
    
    commonScenarios: [
      {
        scenario: `${service.type} issue in production`,
        action: "Create ticket with details and impact",
        expectedResponse: `Engineer response within ${service.responseTime}`,
      },
    ],
    
    faqForNewCustomers: [
      {
        question: "What is covered under this support service?",
        answer: `This service covers ${service.coverage.toLowerCase()} with ${service.slaLevel.toLowerCase()} SLA. Our team provides ${service.type.toLowerCase()} assistance.`,
      },
      {
        question: "How quickly will I get a response?",
        answer: `You will receive an initial response within ${service.responseTime.toLowerCase()} for all tickets.`,
      },
      {
        question: "What are the support hours?",
        answer: service.slaLevel === "Critical" ? "We provide 24/7/365 support coverage." : "We provide business hours support with on-call coverage for critical issues.",
      },
    ],
  };
}

// Generate detail data for expert consultancy services
export function generateExpertConsultancyDetail(serviceId: string) {
  const service = expertConsultancy.find((s) => s.id === serviceId);
  if (!service) return null;

  return {
    id: service.id,
    title: service.title,
    type: service.type,
    experienceLevel: service.experienceLevel,
    deliveryModel: service.deliveryModel,

    overview: `${service.description}. Our ${service.experienceLevel.toLowerCase()}s bring decades of combined experience across industries to help you navigate complex challenges and make informed decisions that drive business value.`,
    
    serviceScope: [
      `${service.type} services`,
      "Strategic planning and roadmap development",
      "Best practices and industry benchmarking",
      "Hands-on guidance and mentorship",
      "Documentation and knowledge transfer",
      "Executive presentations and communication",
      "Long-term advisory relationships",
    ],
    
    whatYouGet: [
      `Direct access to ${service.experienceLevel.toLowerCase()}`,
      `${service.duration} engagement`,
      `${service.deliveryModel} delivery model`,
      "Regular advisory sessions",
      "Strategic documentation and deliverables",
      "On-demand consultation",
      "Industry insights and best practices",
      "Executive-level communication",
    ],
    
    idealFor: [
      `Organizations needing ${service.type.toLowerCase()} expertise`,
      `${service.industrySpecialization} companies`,
      "Teams facing complex decisions",
      "Leadership requiring external perspective",
      "Organizations undergoing transformation",
    ],
    
    businessValue: [
      "Accelerate decision-making with expert guidance",
      "Avoid costly mistakes through proven approaches",
      "Access enterprise-scale patterns and frameworks",
      "Build internal capability through mentorship",
      "Ensure investments align with strategy",
      "Reduce risk through peer review",
    ],

    leadArchitect: {
      name: service.expertProfile.name,
      title: service.expertProfile.title,
      credentials: [
        "Advanced degree in relevant field",
        "Industry certifications",
        "Published thought leader",
        "Conference speaker",
      ],
      experience: `20+ years in ${service.type.toLowerCase()} across ${service.industrySpecialization.toLowerCase()} sectors`,
      specializations: service.keyBenefits,
      notableProjects: [
        "Led transformation for Fortune 500 company",
        "Designed architecture for global enterprise",
        "Established practices for major organization",
        "Advised on multiple successful initiatives",
      ],
      publications: [
        "Author of industry publications",
        "Regular conference speaker",
        "Contributor to industry standards",
      ],
    },
    
    supportingTeam: [
      {
        role: "Supporting Consultant",
        name: "Assigned based on needs",
        expertise: "Domain-specific expertise",
        involvement: "Supports detailed work",
      },
    ],
    
    expertiseByDomain: [
      {
        domain: service.type,
        depth: "Expert",
        coverage: service.keyBenefits.join(", "),
      },
    ],

    engagementModels: [
      {
        model: "Strategic Advisory",
        duration: service.duration,
        commitment: "Flexible based on needs",
        structure: [
          "Regular advisory sessions",
          "On-demand consultation",
          "Strategic planning sessions",
          "Executive briefings",
        ],
        deliverables: [
          "Strategic recommendations",
          "Advisory reports",
          "Decision frameworks",
          "Best practices documentation",
        ],
        pricing: service.pricing,
      },
      {
        model: "Project-Based",
        duration: "1-3 months",
        commitment: "Project-dependent",
        structure: [
          "Kickoff workshop",
          "Regular working sessions",
          "Document reviews",
          "Final presentation",
        ],
        deliverables: [
          "Project-specific deliverables",
          "Recommendations report",
          "Implementation roadmap",
        ],
        pricing: "Fixed fee or daily rate",
      },
    ],
    
    typicalEngagementFlow: [
      {
        phase: "Discovery",
        duration: "1-2 weeks",
        activities: [
          "Understand current state",
          "Define objectives",
          "Establish engagement rhythm",
          "Identify stakeholders",
        ],
      },
      {
        phase: "Assessment",
        duration: "2-4 weeks",
        activities: [
          "Review documentation",
          "Conduct interviews",
          "Assess against best practices",
          "Identify opportunities",
        ],
      },
      {
        phase: "Strategy",
        duration: "2-4 weeks",
        activities: [
          "Develop recommendations",
          "Create frameworks",
          "Define standards",
          "Build roadmap",
        ],
      },
      {
        phase: "Ongoing Advisory",
        duration: "Ongoing",
        activities: [
          "Regular sessions",
          "Review decisions",
          "Guide implementation",
          "Monitor progress",
        ],
      },
    ],
    
    communicationModel: {
      regularMeetings: "Scheduled sessions via video conference",
      adHocSupport: "Email and chat for quick questions",
      documentation: "Shared workspace for deliverables",
      executiveBriefings: "Regular presentations to leadership",
      decisionLog: "Maintained decision records",
    },

    availabilityCommitment: {
      scheduledSessions: "Committed times based on engagement",
      responseTime: "Email responses within 4 business hours",
      emergencySupport: "Available for critical decisions",
      timeZones: "Flexible scheduling",
    },
    
    deliverablesQuality: [
      "Peer-reviewed before delivery",
      "Industry-standard frameworks",
      "Executive-ready presentations",
      "Revision cycles included",
      "Client ownership of deliverables",
    ],
    
    confidentialityAndIP: {
      nda: "Standard NDA covers all work",
      ipOwnership: "Client owns all deliverables",
      dataHandling: "Strict confidentiality protocols",
      conflictOfInterest: "Dedicated engagement",
    },

    prerequisitesForEngagement: [
      "Clear objectives defined",
      "Executive sponsorship secured",
      "Key stakeholders identified",
      "Existing documentation available",
      "Budget approval obtained",
    ],
    
    engagementSetup: [
      {
        step: "Initial Consultation",
        duration: "1 hour (complimentary)",
        description: "Discuss needs and explore fit",
        outcome: "Mutual understanding of objectives",
      },
      {
        step: "Proposal Development",
        duration: "3-5 days",
        description: "Develop detailed proposal",
        outcome: "Written proposal for review",
      },
      {
        step: "Contract Execution",
        duration: "1 week",
        description: "Review and sign agreement",
        outcome: "Executed contract",
      },
      {
        step: "Kickoff",
        duration: "1-2 weeks",
        description: "Formal kickoff and discovery",
        outcome: "Engagement plan established",
      },
    ],
    
    whatToPrepareBefore: [
      "Document current challenges",
      "Gather existing documentation",
      "Identify strategic objectives",
      "List ongoing initiatives",
      "Clarify decision-making authority",
    ],
    
    successFactors: [
      "Executive sponsorship",
      "Transparent communication",
      "Dedicated stakeholders",
      "Willingness to challenge assumptions",
      "Action on recommendations",
      "Regular feedback",
    ],
    
    pricingGuidance: {
      hourlyRate: "$400-600/hour",
      dailyRate: "$3,200-4,800/day",
      monthlyRetainer: "$15,000-40,000/month",
      projectBased: "Custom pricing",
      discounts: "Volume discounts available",
    },
  };
}
