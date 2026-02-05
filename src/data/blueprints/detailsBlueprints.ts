import type { SolutionSpec } from './solutionSpecs';
import type { SolutionBuild } from './solutionBuilds';

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface BlueprintComponent {
  id: string;
  name: string;
  category: string;
  description: string;
  capabilities: string[];
  technologies: string[];
  interfaces: string[];
}

export interface ArchitectureLayer {
  layer: string;
  description: string;
  components: string[];
}

export interface ArchitectureDiagram {
  name: string;
  description: string;
}

export interface ImplementationPhase {
  phase: string;
  focus: string;
  deliverables: string[];
}

export interface RelatedDocument {
  name: string;
  type: string;
  description: string;
}

export interface BlueprintDetail {
  id: string;
  // About Tab
  overview: string;
  architecturePhilosophy: string[];
  keyPrinciples: string[];
  useCases: string[];
  // Architecture Tab
  architectureLayers: ArchitectureLayer[];
  architectureDiagrams: ArchitectureDiagram[];
  // Components Tab
  components: BlueprintComponent[];
  // Implementation Tab
  implementationApproach: string;
  prerequisites: string[];
  implementationPhases: ImplementationPhase[];
  criticalSuccessFactors: string[];
  // Resources Tab
  relatedBlueprints: string[];
  relatedDocuments: RelatedDocument[];
  tools: string[];
}

// ─── DBP Reference Architecture Detail ────────────────────────────────────────

const dbpReferenceArchitecture: BlueprintDetail = {
  id: "dbp-reference-architecture",

  // About Tab
  overview:
    "The DBP Reference Architecture provides a comprehensive enterprise blueprint for building a unified Digital Business Platform. This architecture spans all 12 DBP domains and defines the target state for platform capabilities, integration patterns, data flows, and technology stack. It serves as the foundational reference for all domain-specific and solution architectures within the organization.",

  architecturePhilosophy: [
    "API-First: All capabilities exposed through well-defined APIs",
    "Event-Driven: Asynchronous communication for scalability and resilience",
    "Cloud-Native: Designed for cloud deployment with hybrid flexibility",
    "Microservices-Based: Loosely coupled services aligned to business capabilities",
    "Data-Centric: Unified data architecture with domain-driven data ownership",
    "Security by Design: Zero-trust principles embedded throughout",
  ],

  keyPrinciples: [
    "Capability-Based Design: Architecture organized around business capabilities",
    "Platform Thinking: Reusable platform services over custom solutions",
    "Composability: Mix-and-match components for different solutions",
    "Interoperability: Standards-based integration across all layers",
    "Observability: Built-in monitoring, logging, and tracing",
  ],

  useCases: [
    "Enterprise digital transformation planning",
    "Target state architecture definition",
    "Technology strategy and roadmap development",
    "Solution architecture governance",
    "Vendor evaluation and selection",
  ],

  // Architecture Tab
  architectureLayers: [
    {
      layer: "Experience Layer",
      description:
        "Multi-channel user experiences across web, mobile, voice, and IoT",
      components: [
        "Web Applications",
        "Mobile Apps",
        "Chatbots",
        "Voice Interfaces",
        "Partner Portals",
      ],
    },
    {
      layer: "API & Integration Layer",
      description: "Unified API gateway and integration fabric",
      components: [
        "API Gateway",
        "Service Mesh",
        "Event Bus",
        "Integration Platform",
        "API Management",
      ],
    },
    {
      layer: "Business Services Layer",
      description:
        "Domain-aligned microservices implementing business capabilities",
      components: [
        "Customer Services",
        "Product Services",
        "Order Services",
        "Payment Services",
        "Notification Services",
      ],
    },
    {
      layer: "Data & Analytics Layer",
      description:
        "Unified data platform with analytics and AI/ML capabilities",
      components: [
        "Data Lake",
        "Data Warehouse",
        "Streaming Analytics",
        "ML Platform",
        "Data Catalog",
      ],
    },
    {
      layer: "Platform Services Layer",
      description: "Cross-cutting platform capabilities",
      components: [
        "Identity & Access",
        "Workflow Engine",
        "Search",
        "Content Management",
        "Document Management",
      ],
    },
    {
      layer: "Infrastructure Layer",
      description: "Cloud-native infrastructure and operations",
      components: [
        "Container Orchestration",
        "Service Mesh",
        "Observability Stack",
        "CI/CD",
        "Security Controls",
      ],
    },
  ],

  architectureDiagrams: [
    {
      name: "Logical Architecture View",
      description:
        "High-level logical view of the platform showing all major capability areas, their relationships, and the data flows between them.",
    },
    {
      name: "Technology Architecture View",
      description:
        "Technology-specific mapping of platform components to products, frameworks, and services that implement each capability.",
    },
    {
      name: "Integration Architecture View",
      description:
        "Detailed view of integration patterns, API contracts, event channels, and data exchange mechanisms across the platform.",
    },
    {
      name: "Security Architecture View",
      description:
        "Security zones, trust boundaries, identity flows, encryption layers, and compliance controls across the entire platform.",
    },
    {
      name: "Deployment Architecture View",
      description:
        "Infrastructure topology, container orchestration layout, cloud resource mapping, and network architecture for production deployment.",
    },
  ],

  // Components Tab
  components: [
    {
      id: "comp-api-gateway",
      name: "API Gateway",
      category: "Integration",
      description:
        "Centralized API gateway providing unified entry point for all platform APIs with security, rate limiting, and analytics.",
      capabilities: [
        "Request routing and load balancing",
        "Authentication and authorization",
        "Rate limiting and throttling",
        "Request/response transformation",
        "API versioning and lifecycle management",
        "Real-time analytics and monitoring",
      ],
      technologies: ["Kong", "Apigee", "AWS API Gateway", "Azure API Management"],
      interfaces: ["REST APIs", "GraphQL", "gRPC", "WebSocket"],
    },
    {
      id: "comp-event-bus",
      name: "Enterprise Event Bus",
      category: "Integration",
      description:
        "Central event streaming platform enabling asynchronous, event-driven communication between all platform services.",
      capabilities: [
        "Event publishing and subscription",
        "Event stream processing",
        "Event replay and sourcing",
        "Schema registry and validation",
        "Dead letter queue handling",
        "Cross-domain event routing",
      ],
      technologies: [
        "Apache Kafka",
        "AWS EventBridge",
        "Azure Event Hubs",
        "Confluent Platform",
      ],
      interfaces: [
        "Kafka Protocol",
        "AMQP",
        "CloudEvents",
        "REST Producer API",
      ],
    },
    {
      id: "comp-iam",
      name: "Identity & Access Management",
      category: "Security",
      description:
        "Centralized identity platform providing authentication, authorization, and identity governance across all platform services.",
      capabilities: [
        "Single Sign-On (SSO)",
        "Multi-Factor Authentication (MFA)",
        "Role-Based Access Control (RBAC)",
        "Attribute-Based Access Control (ABAC)",
        "Identity lifecycle management",
        "Federated identity",
      ],
      technologies: ["Okta", "Azure AD", "Keycloak", "Auth0"],
      interfaces: ["SAML 2.0", "OAuth 2.0", "OpenID Connect", "SCIM"],
    },
  ],

  // Implementation Tab
  implementationApproach:
    "The DBP Reference Architecture should be implemented incrementally using the 4D Model (Discern, Design, Deploy, Drive). Start with foundational platform services, then progressively build out domain capabilities following a prioritized roadmap.",

  prerequisites: [
    "Executive sponsorship and governance structure established",
    "Cloud infrastructure and networking foundation in place",
    "DevOps toolchain and CI/CD pipelines operational",
    "API management platform selected and configured",
    "Identity and access management platform deployed",
  ],

  implementationPhases: [
    {
      phase: "Phase 1: Foundation",
      focus: "Core platform infrastructure and cross-cutting services",
      deliverables: [
        "Container orchestration platform",
        "API Gateway deployment",
        "Identity & Access Management",
        "CI/CD pipeline framework",
        "Observability stack",
      ],
    },
    {
      phase: "Phase 2: Core Capabilities",
      focus: "Business domain services and integration layer",
      deliverables: [
        "Event streaming platform",
        "Core business microservices",
        "Data platform foundation",
        "Integration patterns library",
        "Service mesh implementation",
      ],
    },
    {
      phase: "Phase 3: Experience & Analytics",
      focus: "User experience and data analytics capabilities",
      deliverables: [
        "Web and mobile experience layer",
        "Analytics and reporting platform",
        "ML/AI platform foundation",
        "Content management system",
        "Search platform",
      ],
    },
    {
      phase: "Phase 4: Optimization & Scale",
      focus: "Performance optimization and advanced capabilities",
      deliverables: [
        "Performance tuning and optimization",
        "Advanced analytics and AI models",
        "Multi-region deployment",
        "Disaster recovery implementation",
        "Advanced security controls",
      ],
    },
  ],

  criticalSuccessFactors: [
    "Strong executive sponsorship and sustained funding commitment",
    "Cross-functional architecture governance board with decision authority",
    "Incremental delivery approach with measurable business outcomes at each phase",
    "Comprehensive developer experience with self-service platform capabilities",
    "Continuous alignment between business strategy and technology roadmap",
    "Investment in team skills development and platform engineering culture",
  ],

  // Resources Tab
  relatedBlueprints: [
    "Customer 360 Platform Blueprint",
    "Enterprise Data Platform Architecture",
    "API Gateway Architecture",
    "Microservices Platform Blueprint",
  ],

  relatedDocuments: [
    {
      name: "DBP Capability Model",
      type: "Reference",
      description:
        "Complete business capability model for the Digital Business Platform covering all 12 domains.",
    },
    {
      name: "Technology Standards",
      type: "Standard",
      description:
        "Approved technology standards and product selections for each architecture layer.",
    },
    {
      name: "Integration Patterns Catalog",
      type: "Catalog",
      description:
        "Comprehensive catalog of integration patterns with guidance on when to apply each pattern.",
    },
  ],

  tools: [
    "Architecture Decision Records (ADR) Template",
    "Technology Radar Tool",
    "Architecture Fitness Function Library",
    "Platform Maturity Assessment",
  ],
};

// ─── API Gateway Implementation Detail ────────────────────────────────────────

const apiGatewayImplementation: BlueprintDetail = {
  id: "api-gateway-implementation",

  // About Tab
  overview:
    "The API Gateway Implementation Guide provides a complete, step-by-step deployment plan for standing up an enterprise-grade API gateway using Kong on Kubernetes. This build guide covers infrastructure provisioning, gateway configuration, security policies, rate limiting, observability integration, and CI/CD automation. It is designed for platform engineering teams who need a production-ready API gateway that can scale to handle thousands of APIs and millions of requests per day.",

  architecturePhilosophy: [
    "Infrastructure as Code: All gateway configuration managed declaratively via Git",
    "Policy-Driven: Security, rate-limiting, and transformation rules applied as reusable policies",
    "Observable by Default: Every request traced, logged, and metered from day one",
    "Developer Self-Service: API teams can onboard new routes and plugins without ops tickets",
    "Zero-Downtime Deployments: Blue-green and canary releases for gateway configuration changes",
    "Defense in Depth: Layered security with mTLS, OAuth2, IP whitelisting, and WAF integration",
  ],

  keyPrinciples: [
    "Declarative Configuration: Gateway state defined in version-controlled YAML manifests",
    "Separation of Concerns: Data-plane and control-plane deployed independently for resilience",
    "Plugin Architecture: Extend functionality through composable, reusable plugins",
    "Multi-Tenancy: Workspace isolation for different teams and environments",
    "GitOps Workflow: All changes flow through pull requests with automated validation",
  ],

  useCases: [
    "Centralized API traffic management for microservices",
    "External partner API onboarding with self-service developer portal",
    "Legacy system modernization via API facade pattern",
    "Rate-limited public API monetization",
    "Cross-cutting security enforcement for all backend services",
  ],

  // Architecture Tab
  architectureLayers: [
    {
      layer: "Ingress & Load Balancing",
      description:
        "External traffic entry point with TLS termination, DNS-based routing, and load distribution",
      components: [
        "Cloud Load Balancer",
        "TLS Certificate Manager",
        "DNS Controller",
        "IP Whitelisting",
        "WAF Integration",
      ],
    },
    {
      layer: "API Gateway Data Plane",
      description:
        "High-performance request processing layer handling routing, transformation, and policy enforcement",
      components: [
        "Kong Data Plane Nodes",
        "Rate Limiting Plugin",
        "OAuth2 Plugin",
        "Request Transformer",
        "Response Transformer",
      ],
    },
    {
      layer: "API Gateway Control Plane",
      description:
        "Management and configuration layer for gateway policies, routes, and plugins",
      components: [
        "Kong Control Plane",
        "Admin API",
        "Kong Manager UI",
        "decK CLI (Declarative Config)",
        "Plugin Configuration Store",
      ],
    },
    {
      layer: "Developer Portal",
      description:
        "Self-service portal for API discovery, documentation, key management, and analytics",
      components: [
        "API Catalog",
        "Interactive Documentation",
        "API Key Management",
        "Usage Analytics Dashboard",
        "Developer Onboarding Wizard",
      ],
    },
    {
      layer: "Observability & Monitoring",
      description:
        "Real-time metrics, distributed tracing, and centralized logging for all gateway traffic",
      components: [
        "Prometheus Metrics Exporter",
        "Grafana Dashboards",
        "Jaeger Tracing Integration",
        "Centralized Log Aggregation",
        "Alert Manager Rules",
      ],
    },
    {
      layer: "CI/CD & GitOps",
      description:
        "Automated pipeline for testing, validating, and deploying gateway configuration changes",
      components: [
        "Git Repository (Config Source)",
        "CI Pipeline (Validation & Lint)",
        "ArgoCD / Flux (GitOps Sync)",
        "Canary Deployment Controller",
        "Rollback Automation",
      ],
    },
  ],

  architectureDiagrams: [
    {
      name: "Gateway Deployment Topology",
      description:
        "Physical deployment view showing data-plane pods, control-plane instances, database, and load balancer arrangement across Kubernetes namespaces.",
    },
    {
      name: "Request Flow Diagram",
      description:
        "End-to-end request lifecycle from client ingress through TLS termination, authentication, rate limiting, routing, and upstream service invocation.",
    },
    {
      name: "Security Architecture",
      description:
        "Security zones illustrating mTLS between gateway and upstream, OAuth2 token validation flow, and WAF integration points.",
    },
    {
      name: "CI/CD Pipeline Diagram",
      description:
        "GitOps workflow from developer pull request through validation, staging deployment, smoke tests, and production promotion.",
    },
  ],

  // Components Tab
  components: [
    {
      id: "comp-kong-dp",
      name: "Kong Data Plane",
      category: "Gateway Runtime",
      description:
        "High-performance proxy nodes that process all API traffic, enforce policies, and route requests to upstream services. Deployed as a horizontally scalable Kubernetes deployment.",
      capabilities: [
        "Sub-millisecond request routing",
        "Plugin chain execution per request",
        "Connection pooling to upstream services",
        "Health checking and circuit breaking",
        "WebSocket and gRPC proxying",
        "Request buffering and streaming",
      ],
      technologies: ["Kong Gateway (OSS/Enterprise)", "OpenResty", "NGINX", "LuaJIT"],
      interfaces: ["HTTP/HTTPS", "gRPC", "WebSocket", "TCP/TLS passthrough"],
    },
    {
      id: "comp-kong-cp",
      name: "Kong Control Plane",
      category: "Gateway Management",
      description:
        "Centralized management layer that stores and distributes gateway configuration to all data-plane nodes. Provides Admin API, Manager UI, and declarative config support.",
      capabilities: [
        "Route and service configuration management",
        "Plugin lifecycle management",
        "Consumer and credential management",
        "Workspace-based multi-tenancy",
        "Configuration change auditing",
        "Cluster-wide config propagation",
      ],
      technologies: ["Kong Control Plane", "PostgreSQL", "decK CLI", "Kong Manager"],
      interfaces: ["Admin REST API", "decK declarative YAML", "Kong Manager UI"],
    },
    {
      id: "comp-auth-plugin",
      name: "Authentication & Authorization Stack",
      category: "Security",
      description:
        "Composable security plugins that enforce identity verification and access control on every API request before it reaches upstream services.",
      capabilities: [
        "OAuth 2.0 token introspection",
        "JWT validation and claims extraction",
        "API key authentication",
        "mTLS client certificate validation",
        "RBAC policy enforcement",
        "IP restriction and geo-blocking",
      ],
      technologies: ["OAuth 2.0", "OpenID Connect", "JWT", "mTLS", "OPA (Open Policy Agent)"],
      interfaces: ["Token introspection endpoint", "JWKS endpoint", "OPA policy API"],
    },
    {
      id: "comp-rate-limiter",
      name: "Rate Limiting Engine",
      category: "Traffic Management",
      description:
        "Distributed rate limiting that protects upstream services from overload while ensuring fair usage across API consumers, with support for sliding-window and fixed-window algorithms.",
      capabilities: [
        "Per-consumer rate limiting",
        "Per-route and per-service limits",
        "Sliding window and fixed window algorithms",
        "Distributed counter synchronization via Redis",
        "Custom response headers (X-RateLimit-*)",
        "Graceful degradation under load",
      ],
      technologies: ["Kong Rate Limiting Advanced", "Redis Cluster", "Lua scripting"],
      interfaces: ["Rate limit response headers", "Redis cluster protocol", "Admin API config"],
    },
    {
      id: "comp-observability",
      name: "Observability Integration",
      category: "Monitoring",
      description:
        "Pre-configured observability stack that provides real-time metrics, distributed traces, and structured logs for every request flowing through the gateway.",
      capabilities: [
        "Request latency histograms (p50, p95, p99)",
        "Upstream health and error rate dashboards",
        "Distributed trace context propagation",
        "Structured JSON access logs",
        "Custom alerting rules for SLO breaches",
        "Consumer-level usage analytics",
      ],
      technologies: ["Prometheus", "Grafana", "Jaeger", "Fluentd", "Alertmanager"],
      interfaces: [
        "Prometheus /metrics endpoint",
        "OpenTelemetry trace export",
        "Fluentd log forwarding",
        "Grafana dashboard JSON",
      ],
    },
  ],

  // Implementation Tab
  implementationApproach:
    "This build follows a phased deployment model starting with a minimal viable gateway on a development Kubernetes cluster, then hardening security and observability before promoting to staging and production. All configuration is managed declaratively via Git, and deployments are automated through a GitOps pipeline with ArgoCD.",

  prerequisites: [
    "Kubernetes cluster (v1.24+) with Helm 3 installed",
    "PostgreSQL database for Kong control plane state",
    "Redis cluster for distributed rate limiting counters",
    "Container registry access for Kong images",
    "DNS and TLS certificate management (cert-manager recommended)",
    "Git repository for declarative gateway configuration",
    "CI/CD platform (GitHub Actions, GitLab CI, or Jenkins)",
  ],

  implementationPhases: [
    {
      phase: "Phase 1: Infrastructure & Base Install",
      focus: "Provision infrastructure and deploy Kong in hybrid mode",
      deliverables: [
        "Kubernetes namespace and RBAC configuration",
        "PostgreSQL and Redis provisioned via Helm or managed service",
        "Kong control plane deployed with Admin API secured",
        "Kong data plane deployed with horizontal pod autoscaler",
        "TLS certificates provisioned via cert-manager",
        "Basic health check and readiness probes verified",
      ],
    },
    {
      phase: "Phase 2: Security & Policy Configuration",
      focus: "Implement authentication, authorization, and traffic policies",
      deliverables: [
        "OAuth 2.0 / JWT authentication plugins configured",
        "Rate limiting policies applied per consumer tier",
        "IP whitelisting for internal services",
        "mTLS enabled between gateway and upstream services",
        "CORS policies configured for web clients",
        "Request size limits and payload validation",
      ],
    },
    {
      phase: "Phase 3: Observability & Developer Portal",
      focus: "Integrate monitoring, tracing, and self-service API portal",
      deliverables: [
        "Prometheus metrics exporter enabled on all data-plane nodes",
        "Grafana dashboards deployed (latency, error rate, throughput)",
        "Jaeger distributed tracing integration",
        "Centralized logging with Fluentd to ELK/Loki",
        "Developer portal deployed with API catalog and documentation",
        "Alerting rules for SLO violations (p99 latency, 5xx rate)",
      ],
    },
    {
      phase: "Phase 4: GitOps, Automation & Production Hardening",
      focus: "Automate deployments and harden for production traffic",
      deliverables: [
        "decK declarative config stored in Git with PR-based workflow",
        "ArgoCD sync for automated gateway config deployment",
        "CI pipeline with config linting, diff preview, and smoke tests",
        "Canary deployment strategy for config changes",
        "Disaster recovery runbook and automated failover tests",
        "Load testing results and capacity planning documentation",
      ],
    },
  ],

  criticalSuccessFactors: [
    "Hybrid mode deployment separating control plane from data plane for resilience",
    "Declarative configuration in Git as the single source of truth",
    "Comprehensive observability from day one to catch issues before production",
    "Developer self-service portal to reduce onboarding friction",
    "Automated testing of gateway configuration changes in CI before deployment",
    "Documented runbooks for common operational scenarios and incident response",
  ],

  // Resources Tab
  relatedBlueprints: [
    "Enterprise API Gateway Architecture",
    "Microservices Platform Blueprint",
    "Service Mesh Architecture",
    "Zero Trust Security Architecture",
  ],

  relatedDocuments: [
    {
      name: "Kong Deployment Playbook",
      type: "Playbook",
      description:
        "Step-by-step operational playbook for deploying, upgrading, and troubleshooting Kong on Kubernetes.",
    },
    {
      name: "API Security Standards",
      type: "Standard",
      description:
        "Organization-wide API security standards covering authentication, authorization, encryption, and input validation.",
    },
    {
      name: "API Design Guidelines",
      type: "Guideline",
      description:
        "REST and GraphQL API design guidelines including naming conventions, versioning strategy, and error handling patterns.",
    },
  ],

  tools: [
    "Kong decK CLI for declarative configuration management",
    "Insomnia / Postman for API testing and exploration",
    "k6 / Locust for gateway load testing and performance benchmarking",
    "OPA Playground for authoring and testing authorization policies",
  ],
};

// ─── Blueprint Details Registry ───────────────────────────────────────────────

const blueprintDetails: Record<string, BlueprintDetail> = {
  "dbp-reference-architecture": dbpReferenceArchitecture,
  "api-gateway-implementation": apiGatewayImplementation,
};

// ─── Generic Detail Generator ─────────────────────────────────────────────────

/**
 * Generates a generic BlueprintDetail from a SolutionSpec card.
 * Provides placeholder content so every spec blueprint has at least a basic detail page.
 */
export function generateGenericDetailFromSpec(spec: SolutionSpec): BlueprintDetail {
  return {
    id: spec.id,

    overview: `${spec.title} is a ${spec.scope.toLowerCase()} that ${spec.description.charAt(0).toLowerCase() + spec.description.slice(1)}. This blueprint provides comprehensive architectural guidance for organizations operating at the ${spec.maturityLevel} maturity level, with a focus on ${spec.industryFocus.toLowerCase()} environments. It includes ${spec.componentCount} architectural components spanning key technology areas including ${spec.keyTechnologies.join(", ")}.`,

    architecturePhilosophy: [
      "Standards-Based: Leveraging industry standards and best practices throughout",
      "Modular Design: Components can be adopted independently or as a complete solution",
      "Scalability First: Architecture designed for horizontal and vertical scaling",
      `Cloud Strategy: Optimized for ${spec.deploymentModel.toLowerCase()} deployment models`,
      "Resilience by Design: Fault tolerance and high availability built into every layer",
    ],

    keyPrinciples: [
      "Separation of Concerns: Clear boundaries between architectural layers and domains",
      "Loose Coupling: Minimize dependencies between components for independent evolution",
      "High Cohesion: Related capabilities grouped together for maintainability",
      "Design for Change: Architecture accommodates evolving business requirements",
      "Security at Every Layer: Defense-in-depth approach across the entire stack",
    ],

    useCases: [
      `${spec.scope} design and planning`,
      `Technology evaluation for ${spec.solutionType.split(" - ")[1] || spec.solutionType} capabilities`,
      "Architecture review and governance compliance",
      `${spec.industryFocus} digital transformation initiatives`,
      "Vendor selection and integration strategy",
    ],

    architectureLayers: [
      {
        layer: "Presentation Layer",
        description: "User-facing interfaces and experience delivery channels",
        components: ["Web Interface", "Mobile Interface", "API Consumers", "Admin Console"],
      },
      {
        layer: "Service Layer",
        description: "Core business logic and service orchestration",
        components: spec.keyTechnologies.slice(0, 4).map((t) => `${t} Service`),
      },
      {
        layer: "Data Layer",
        description: "Data persistence, caching, and data management",
        components: ["Primary Datastore", "Cache Layer", "Search Index", "Event Store"],
      },
      {
        layer: "Infrastructure Layer",
        description: `${spec.deploymentModel} infrastructure and platform services`,
        components: ["Compute", "Networking", "Storage", "Monitoring", "Security"],
      },
    ],

    architectureDiagrams: [
      {
        name: "Logical Architecture Diagram",
        description: `High-level view of the ${spec.title} showing all major capability areas and their relationships.`,
      },
      {
        name: "Component Interaction Diagram",
        description: `Detailed view of how the ${spec.componentCount} components interact, including data flows and integration points.`,
      },
      {
        name: "Deployment Architecture Diagram",
        description: `${spec.deploymentModel} deployment topology showing infrastructure layout, scaling boundaries, and network zones.`,
      },
    ],

    components: spec.keyTechnologies.slice(0, 3).map((tech, index) => ({
      id: `comp-${spec.id}-${index}`,
      name: tech,
      category: index === 0 ? "Core" : index === 1 ? "Integration" : "Supporting",
      description: `${tech} component providing key capabilities within the ${spec.title} architecture.`,
      capabilities: [
        `Primary ${tech} functionality`,
        "Integration with adjacent platform services",
        "Monitoring and health reporting",
      ],
      technologies: [tech],
      interfaces: ["REST API", "Event-driven messaging"],
    })),

    implementationApproach: `The ${spec.title} should be implemented using an iterative approach aligned to organizational maturity. Given its ${spec.complexity.toLowerCase()} complexity, teams should plan for incremental delivery starting with core capabilities and progressively enabling advanced features. A phased rollout is recommended to manage risk and demonstrate value early.`,

    prerequisites: [
      "Architecture governance approval and stakeholder alignment",
      `${spec.deploymentModel} infrastructure environment provisioned`,
      "Development and operations teams trained on core technologies",
      "Integration with existing identity and access management",
      "CI/CD pipeline and DevOps toolchain operational",
    ],

    implementationPhases: [
      {
        phase: "Phase 1: Foundation",
        focus: "Core infrastructure and baseline services",
        deliverables: [
          "Infrastructure provisioning and configuration",
          "Core platform services deployment",
          "Basic monitoring and alerting",
        ],
      },
      {
        phase: "Phase 2: Core Build",
        focus: "Primary business capabilities and integrations",
        deliverables: [
          "Key component implementations",
          "Integration with existing systems",
          "Security hardening",
        ],
      },
      {
        phase: "Phase 3: Enhancement",
        focus: "Advanced features and optimization",
        deliverables: [
          "Advanced capability enablement",
          "Performance optimization",
          "Documentation and knowledge transfer",
        ],
      },
    ],

    criticalSuccessFactors: [
      "Executive sponsorship with clear business outcome targets",
      "Skilled team with experience in key technologies",
      "Incremental delivery with regular stakeholder feedback",
      "Robust testing strategy including integration and performance testing",
      "Comprehensive documentation and operational runbooks",
    ],

    relatedBlueprints: [
      "DBP Reference Architecture",
      `Related ${spec.solutionTypeShort} blueprints`,
    ],

    relatedDocuments: [
      {
        name: `${spec.title} Design Guide`,
        type: "Guide",
        description: `Detailed design documentation for implementing the ${spec.title}.`,
      },
      {
        name: "Technology Standards",
        type: "Standard",
        description: "Approved technology standards and product selections for each architecture layer.",
      },
    ],

    tools: [
      "Architecture Decision Records (ADR) Template",
      "Component Inventory Spreadsheet",
      "Deployment Checklist",
    ],
  };
}

/**
 * Generates a generic BlueprintDetail from a SolutionBuild card.
 * Provides placeholder content so every build blueprint has at least a basic detail page.
 */
export function generateGenericDetailFromBuild(build: SolutionBuild): BlueprintDetail {
  const automationList = build.includesAutomation.join(", ");

  return {
    id: build.id,

    overview: `${build.title} is a ${build.scope.toLowerCase()} guide that ${build.description.charAt(0).toLowerCase() + build.description.slice(1)}. This build guide is designed for ${build.skillLevel.toLowerCase()}-level practitioners and targets ${build.deploymentTarget} environments. The estimated implementation timeline is ${build.implementationTime}, covering ${build.componentCount} components with ${build.includesCodeSamples ? "extensive code samples" : "configuration guidance"} and automation including ${automationList}.`,

    architecturePhilosophy: [
      "Automation First: Every manual step has a corresponding automated alternative",
      `Infrastructure as Code: All ${build.deploymentTarget} resources defined declaratively`,
      "Repeatable Deployments: Idempotent scripts that produce consistent environments",
      "Observable by Default: Monitoring and logging configured during initial deployment",
      "Security Hardened: Production security controls applied from the first deployment",
      "Documentation Driven: Every configuration decision documented with rationale",
    ],

    keyPrinciples: [
      "Immutable Infrastructure: Replace rather than modify running instances",
      "GitOps Workflow: Configuration changes flow through version-controlled repositories",
      "Least Privilege: Minimal permissions granted at each layer",
      `Environment Parity: Development, staging, and production on ${build.deploymentTarget} are structurally identical`,
      "Fail Fast: Automated validation catches issues before they reach production",
    ],

    useCases: [
      `${build.scope} for ${build.solutionType} capabilities`,
      `Greenfield deployment on ${build.deploymentTarget}`,
      "Migration from legacy systems to modern architecture",
      "Development and staging environment provisioning",
      "Disaster recovery and environment rebuild scenarios",
    ],

    architectureLayers: [
      {
        layer: "Deployment & Orchestration",
        description: `Container and workload orchestration on ${build.deploymentTarget}`,
        components: ["Container Runtime", "Orchestration Platform", "Service Discovery", "Config Management"],
      },
      {
        layer: "Application Services",
        description: `Core application components deployed as ${build.technologyStack.toLowerCase()} workloads`,
        components: build.keyTechnologies.slice(0, 5),
      },
      {
        layer: "Data & Storage",
        description: "Persistent storage, caching, and state management",
        components: ["Primary Database", "Cache Layer", "Object Storage", "Backup System"],
      },
      {
        layer: "Networking & Security",
        description: "Network policies, TLS, and access control",
        components: ["Ingress Controller", "Network Policies", "TLS Management", "Secrets Management"],
      },
      {
        layer: "Observability",
        description: "Monitoring, logging, tracing, and alerting",
        components: ["Metrics Collector", "Log Aggregator", "Distributed Tracing", "Alert Manager"],
      },
    ],

    architectureDiagrams: [
      {
        name: "Deployment Topology",
        description: `Physical deployment layout on ${build.deploymentTarget} showing all components, their scaling configuration, and network connectivity.`,
      },
      {
        name: "CI/CD Pipeline Flow",
        description: "End-to-end automation pipeline from code commit through build, test, and deployment stages.",
      },
      {
        name: "Network Architecture",
        description: "Network zones, ingress/egress rules, and service-to-service communication paths.",
      },
    ],

    components: build.keyTechnologies.slice(0, 4).map((tech, index) => ({
      id: `comp-${build.id}-${index}`,
      name: tech,
      category: index === 0 ? "Core Runtime" : index === 1 ? "Orchestration" : index === 2 ? "Security" : "Monitoring",
      description: `${tech} deployment and configuration within the ${build.title} implementation.`,
      capabilities: [
        `Production-grade ${tech} deployment`,
        "Automated configuration and scaling",
        "Health monitoring and alerting",
        "Backup and recovery procedures",
      ],
      technologies: [tech],
      interfaces: ["CLI", "REST API", "Configuration files"],
    })),

    implementationApproach: `This implementation follows a ${build.buildComplexity.toLowerCase()} build pattern targeting ${build.deploymentTarget}. The guide provides ${build.includesCodeSamples ? "complete code samples and " : ""}automation scripts (${automationList}) to accelerate deployment. Teams with ${build.skillLevel.toLowerCase()} experience should expect to complete the implementation in ${build.implementationTime}.`,

    prerequisites: [
      `${build.deploymentTarget} environment with appropriate access permissions`,
      `Familiarity with ${build.keyTechnologies.slice(0, 3).join(", ")}`,
      "Git repository for configuration and infrastructure code",
      "CI/CD platform configured and operational",
      `${build.skillLevel}-level proficiency in ${build.technologyStack.toLowerCase()} technologies`,
    ],

    implementationPhases: [
      {
        phase: "Phase 1: Environment Setup",
        focus: `Provision ${build.deploymentTarget} infrastructure and base configuration`,
        deliverables: [
          "Infrastructure provisioned via IaC",
          "Network and security baseline configured",
          "Access controls and secrets management in place",
          "CI/CD pipeline connected to repository",
        ],
      },
      {
        phase: "Phase 2: Core Deployment",
        focus: "Deploy primary components and verify functionality",
        deliverables: [
          `${build.keyTechnologies[0]} deployed and configured`,
          "Core services operational with health checks passing",
          "Integration tests passing in staging environment",
          "Basic monitoring and alerting active",
        ],
      },
      {
        phase: "Phase 3: Hardening & Go-Live",
        focus: "Security hardening, performance tuning, and production cutover",
        deliverables: [
          "Security audit and hardening completed",
          "Performance and load testing passed",
          "Runbooks and operational documentation finalized",
          "Production deployment and smoke tests verified",
        ],
      },
    ],

    criticalSuccessFactors: [
      "Automated testing at every stage of the deployment pipeline",
      `${build.deploymentTarget} expertise available on the implementation team`,
      "Infrastructure as Code for repeatable and auditable deployments",
      "Comprehensive monitoring from initial deployment forward",
      "Documented rollback procedures tested before production go-live",
    ],

    relatedBlueprints: [
      "DBP Reference Architecture",
      `Related ${build.solutionTypeShort} implementation guides`,
    ],

    relatedDocuments: [
      {
        name: `${build.title} Runbook`,
        type: "Runbook",
        description: `Operational runbook for day-to-day management, troubleshooting, and incident response for the ${build.title}.`,
      },
      {
        name: "Deployment Checklist",
        type: "Checklist",
        description: "Pre-deployment and post-deployment verification checklist for production releases.",
      },
    ],

    tools: [
      `${build.keyTechnologies[0]} CLI and management tools`,
      "Infrastructure as Code templates (Terraform / Helm)",
      "Load testing toolkit (k6 / Locust)",
      "Security scanning tools (Trivy, Checkov)",
    ],
  };
}

// ─── Public Accessor ──────────────────────────────────────────────────────────

/**
 * Retrieves the detailed BlueprintDetail for a given blueprint ID.
 * Returns the hand-crafted detail if one exists, otherwise returns undefined.
 * Use generateGenericDetailFromSpec or generateGenericDetailFromBuild to
 * create placeholder details for blueprints that do not have hand-crafted entries.
 */
export function getBlueprintDetail(id: string): BlueprintDetail | undefined {
  return blueprintDetails[id];
}
