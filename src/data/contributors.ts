import { Building2, Crown, PenTool, Users, RefreshCw, Shield, LucideIcon } from "lucide-react";

export interface Contributor {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  role: string;
  description: string;
  contributions: string[];
}

export const contributors: Contributor[] = [
  {
    id: "to",
    name: "Transformation Office",
    icon: Building2,
    color: "text-orange",
    role: "Enterprise TO Director",
    description:
      "Drive strategic alignment and ensure DBP governance across all initiatives",
    contributions: [
      "Enterprise Alignment",
      "DBP Tracking & Oversight",
      "Compliance Enforcement",
    ],
  },
  {
    id: "strategy",
    name: "Strategy & Executive Leadership",
    icon: Crown,
    color: "text-purple",
    role: "CEO & Executive Leadership",
    description:
      "Drive enterprise transformation strategy and portfolio decisions",
    contributions: [
      "Strategic Visibility",
      "Portfolio Oversight",
      "Investment Decisions",
    ],
  },
  {
    id: "architects",
    name: "Business & Technology Architects",
    icon: PenTool,
    color: "text-blue-accent",
    role: "Enterprise & Solution Architects",
    description:
      "Design and govern platform blueprints and architecture standards",
    contributions: [
      "Architecture Governance",
      "Blueprint Design",
      "Standards Contribution",
    ],
  },
  {
    id: "project-teams",
    name: "Project & Product Teams",
    icon: Users,
    color: "text-green",
    role: "Program Managers, Product Owners",
    description: "Deliver measurable assets and capabilities into DBP",
    contributions: ["Project Execution", "Asset Delivery", "Milestone Tracking"],
  },
  {
    id: "lifecycle-ops",
    name: "Lifecycle Operations Teams",
    icon: RefreshCw,
    color: "text-pink",
    role: "Operations, Insights, ADM",
    description:
      "Contribute continuous improvements and operational feedback",
    contributions: [
      "Operational Feedback",
      "Continuous Improvement",
      "Performance Insights",
    ],
  },
  {
    id: "secdevops",
    name: "Security DevOps Enablement",
    icon: Shield,
    color: "text-indigo-600",
    role: "SecDevOps, Support Teams",
    description:
      "Ensure security, delivery automation, and user enablement",
    contributions: ["Security Policies", "Delivery Automation", "User Enablement"],
  },
];
