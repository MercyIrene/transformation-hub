import { Zap, DollarSign, CheckCircle, Eye, LucideIcon } from "lucide-react";

export interface ValueProp {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const valueProps: ValueProp[] = [
  {
    id: "accelerate",
    name: "Accelerate Transformation",
    icon: Zap,
    color: "text-orange",
    description:
      "80% of requirements ready with pre-built templates, blueprints, and governance frameworks",
  },
  {
    id: "control",
    name: "Control Investment",
    icon: DollarSign,
    color: "text-green",
    description:
      "Reduce non-value applications and uncontrolled delivery through enterprise-wide portfolio oversight",
  },
  {
    id: "quality",
    name: "Ensure Quality Outcomes",
    icon: CheckCircle,
    color: "text-blue-accent",
    description:
      "Consolidated patterns and structured contributions ensure consistency and compliance",
  },
  {
    id: "visibility",
    name: "Enterprise-Wide Visibility",
    icon: Eye,
    color: "text-purple",
    description:
      "Track every initiative, project, and team across DBP evolution in real-time",
  },
];

export interface Stat {
  value: string;
  label: string;
  note: string;
}

export const stats: Stat[] = [
  {
    value: "80%",
    label: "Requirements Ready",
    note: "Through self-serve templates",
  },
  {
    value: "4D",
    label: "Governance Model",
    note: "Discern → Design → Deploy → Drive",
  },
  {
    value: "4",
    label: "Execution Streams",
    note: "DXP, DWS, DIA, SDO",
  },
  {
    value: "1",
    label: "Digital Business Platform",
    note: "Unified target state",
  },
];
