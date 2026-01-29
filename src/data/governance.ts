import { Search, PenTool, Rocket, TrendingUp, LucideIcon } from "lucide-react";

export interface GovernancePhase {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  description: string;
  route: string;
}

export const governancePhases: GovernancePhase[] = [
  {
    id: "discern",
    name: "Discern",
    icon: Search,
    color: "text-blue-accent",
    bgColor: "bg-phase-discern-bg",
    description:
      "Assess current state, identify gaps, and build change journey across Business and Technology alignment.",
    route: "/4d-model",
  },
  {
    id: "design",
    name: "Design",
    icon: PenTool,
    color: "text-purple",
    bgColor: "bg-phase-design-bg",
    description:
      "Architect operating models with blueprints and specifications. Contribute to Solution Blueprints and Architecture Governance.",
    route: "/4d-model",
  },
  {
    id: "deploy",
    name: "Deploy",
    icon: Rocket,
    color: "text-green",
    bgColor: "bg-phase-deploy-bg",
    description:
      "Execute transformation initiatives with structured governance. Contribute to built DBP, Project Execution, and Change Enablement.",
    route: "/4d-model",
  },
  {
    id: "drive",
    name: "Drive",
    icon: TrendingUp,
    color: "text-orange",
    bgColor: "bg-phase-drive-bg",
    description:
      "Optimize and ensure continuous improvement through Lifecycle Management and unified configuration.",
    route: "/4d-model",
  },
];
