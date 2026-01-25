import {
  MapPin,
  Cpu,
  TrendingUp,
  Leaf,
  FileCheck,
  Wrench,
  GraduationCap,
  Code,
  CloudSun,
  Zap,
  BarChart3,
  LucideIcon,
} from "lucide-react";

export interface Module {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  color: string;
  gradient: string;
  features: string[];
  status: "active" | "coming-soon" | "demo";
}

export const modules: Module[] = [
  {
    id: "site-selection",
    name: "Site Selection & Mining",
    shortName: "Site Selection",
    description: "Infrastructure intelligence for critical mineral project viability assessment across Canada",
    icon: MapPin,
    color: "#00D4AA",
    gradient: "from-emerald-500 to-teal-600",
    features: ["Interactive mineral deposit map", "Viability scoring", "Infrastructure gap analysis", "AI-powered search"],
    status: "active",
  },
  {
    id: "sovereign-ai",
    name: "Sovereign AI Compute",
    shortName: "Sovereign AI",
    description: "Site selection for AI data centers under federal $2B program",
    icon: Cpu,
    color: "#5E60CE",
    gradient: "from-violet-500 to-purple-600",
    features: ["Data center site ranker", "Power availability", "Federal program tracker"],
    status: "demo",
  },
  {
    id: "investment",
    name: "Investment Attraction",
    shortName: "Investment",
    description: "Match foreign investors with Canadian clean energy opportunities",
    icon: TrendingUp,
    color: "#F77F00",
    gradient: "from-orange-500 to-amber-600",
    features: ["Opportunity explorer", "Investor matching AI", "FDI analytics"],
    status: "demo",
  },
  {
    id: "esg",
    name: "ESG Ontology & Reporting",
    shortName: "ESG",
    description: "Unified ESG reporting across portfolio companies",
    icon: Leaf,
    color: "#2ECC71",
    gradient: "from-green-500 to-emerald-600",
    features: ["ESG dashboard", "Framework mapper", "Document analyzer"],
    status: "demo",
  },
  {
    id: "regulatory",
    name: "Regulatory Compliance",
    shortName: "Regulatory",
    description: "Track and manage regulatory requirements across jurisdictions",
    icon: FileCheck,
    color: "#E74C3C",
    gradient: "from-red-500 to-rose-600",
    features: ["Compliance tracker", "Deadline calendar", "Policy alerts"],
    status: "demo",
  },
  {
    id: "maintenance",
    name: "Predictive Maintenance",
    shortName: "Maintenance",
    description: "AI-powered equipment health monitoring and maintenance optimization",
    icon: Wrench,
    color: "#9B59B6",
    gradient: "from-purple-500 to-fuchsia-600",
    features: ["Equipment health", "Anomaly detection", "Cost savings"],
    status: "demo",
  },
  {
    id: "workforce",
    name: "Education & Workforce",
    shortName: "Workforce",
    description: "Skills gap analysis and workforce development tracking",
    icon: GraduationCap,
    color: "#3498DB",
    gradient: "from-blue-500 to-cyan-600",
    features: ["Skills gap analysis", "Training programs", "Regional metrics"],
    status: "demo",
  },
  {
    id: "opensource",
    name: "Locally Deployed AI",
    shortName: "Local AI",
    description: "Deploy and manage locally deployed AI models for infrastructure",
    icon: Code,
    color: "#1ABC9C",
    gradient: "from-teal-500 to-cyan-600",
    features: ["Model catalog", "Deployment config", "Cost calculator"],
    status: "demo",
  },
  {
    id: "environment",
    name: "AI Environmental Impact",
    shortName: "AI Impact",
    description: "Track and optimize environmental impact of AI workloads",
    icon: CloudSun,
    color: "#27AE60",
    gradient: "from-green-600 to-lime-500",
    features: ["Carbon footprint", "Water usage", "Efficiency metrics"],
    status: "demo",
  },
  {
    id: "energy",
    name: "Energy & Resource Management",
    shortName: "Energy",
    description: "Grid optimization and renewable energy integration",
    icon: Zap,
    color: "#F1C40F",
    gradient: "from-yellow-500 to-orange-500",
    features: ["Grid optimization", "Demand forecast", "Storage planning"],
    status: "demo",
  },
  {
    id: "trading",
    name: "AI Trading Intelligence",
    shortName: "Trading",
    description: "Carbon credit and critical mineral trading insights",
    icon: BarChart3,
    color: "#E91E63",
    gradient: "from-pink-500 to-rose-600",
    features: ["Price tracking", "Portfolio analytics", "Strategy testing"],
    status: "demo",
  },
];

export const getModuleById = (id: string): Module | undefined => {
  return modules.find((m) => m.id === id);
};
