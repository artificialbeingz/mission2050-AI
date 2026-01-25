// ESG Ontology & Reporting Data

export interface ESGMetric {
  category: "environmental" | "social" | "governance";
  name: string;
  value: number;
  unit: string;
  target: number;
  trend: "up" | "down" | "stable";
  status: "on-track" | "at-risk" | "off-track";
}

export interface ESGFramework {
  id: string;
  name: string;
  shortName: string;
  coverage: number; // percentage of requirements met
  lastAudit: string;
  nextAudit: string;
  status: "compliant" | "partial" | "non-compliant";
}

export interface ESGAgent {
  id: string;
  name: string;
  type: "data_collector" | "report_generator" | "compliance_checker" | "risk_analyzer" | "benchmark_analyzer" | "ontology_mapper" | "document_parser";
  description: string;
  status: "active" | "idle" | "training";
  model: string;
  framework: string;
  accuracyRate: number;
  documentsProcessed: number;
  reportsGenerated: number;
  capabilities: string[];
}

export interface ESGSite {
  id: string;
  name: string;
  location: string;
  province: string;
  type: string;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  overallESGScore: number;
  carbonFootprint: number; // tonnes CO2
  waterUsage: number; // ML
  wasteRecycled: number; // percentage
  employeeCount: number;
  diversityPercent: number;
  safetyIncidents: number;
  assignedAgents: string[];
  lastAssessment: string;
}

export interface OntologyNode {
  id: string;
  label: string;
  category: "environmental" | "social" | "governance" | "framework" | "metric";
  level: number;
}

export interface OntologyLink {
  source: string;
  target: string;
  relationship: string;
}

export interface ESGCompany {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  description: string;
  overallESGScore: number;
  environmentalScore: number;
  socialScore: number;
  governanceScore: number;
  esgRating: "AAA" | "AA" | "A" | "BBB" | "BB" | "B" | "CCC";
  totalSites: number;
  totalEmployees: number;
  frameworks: ESGFramework[];
  metrics: ESGMetric[];
  agents: ESGAgent[];
  sites: ESGSite[];
  ontologyNodes: OntologyNode[];
  ontologyLinks: OntologyLink[];
  carbonNeutralTarget: string;
  sustainabilityReport: string;
}

export const esgCompanies: ESGCompany[] = [
  {
    id: "company-1",
    name: "Maple Energy Corp",
    industry: "Energy & Utilities",
    headquarters: "Calgary, AB",
    description: "Leading Canadian energy company committed to sustainable practices and net-zero emissions by 2040. Pioneer in renewable energy integration and ESG transparency.",
    overallESGScore: 82,
    environmentalScore: 78,
    socialScore: 85,
    governanceScore: 84,
    esgRating: "AA",
    totalSites: 12,
    totalEmployees: 4500,
    carbonNeutralTarget: "2040",
    sustainabilityReport: "2025 Q4",
    frameworks: [
      { id: "gri", name: "Global Reporting Initiative", shortName: "GRI", coverage: 92, lastAudit: "2025-09-15", nextAudit: "2026-03-15", status: "compliant" },
      { id: "tcfd", name: "Task Force on Climate-related Financial Disclosures", shortName: "TCFD", coverage: 88, lastAudit: "2025-08-20", nextAudit: "2026-02-20", status: "compliant" },
      { id: "sasb", name: "Sustainability Accounting Standards Board", shortName: "SASB", coverage: 85, lastAudit: "2025-10-01", nextAudit: "2026-04-01", status: "compliant" },
      { id: "cdp", name: "Carbon Disclosure Project", shortName: "CDP", coverage: 90, lastAudit: "2025-07-10", nextAudit: "2026-01-10", status: "compliant" },
    ],
    metrics: [
      { category: "environmental", name: "Carbon Emissions", value: 125000, unit: "tonnes CO2e", target: 100000, trend: "down", status: "at-risk" },
      { category: "environmental", name: "Renewable Energy", value: 65, unit: "%", target: 80, trend: "up", status: "on-track" },
      { category: "environmental", name: "Water Intensity", value: 2.3, unit: "m³/MWh", target: 2.0, trend: "down", status: "on-track" },
      { category: "social", name: "Employee Safety Rate", value: 98.5, unit: "%", target: 99, trend: "up", status: "on-track" },
      { category: "social", name: "Diversity Index", value: 42, unit: "%", target: 50, trend: "up", status: "at-risk" },
      { category: "social", name: "Training Hours", value: 45, unit: "hrs/employee", target: 40, trend: "up", status: "on-track" },
      { category: "governance", name: "Board Independence", value: 78, unit: "%", target: 75, trend: "stable", status: "on-track" },
      { category: "governance", name: "Ethics Violations", value: 2, unit: "incidents", target: 0, trend: "down", status: "at-risk" },
    ],
    agents: [
      {
        id: "agent-1",
        name: "ESG Data Harvester",
        type: "data_collector",
        description: "Automatically collects ESG data from internal systems, public filings, and third-party databases.",
        status: "active",
        model: "Llama 3.1 70B",
        framework: "LangChain",
        accuracyRate: 96,
        documentsProcessed: 15420,
        reportsGenerated: 0,
        capabilities: ["API integration", "Web scraping", "Database queries", "Real-time monitoring"],
      },
      {
        id: "agent-2",
        name: "Sustainability Report Generator",
        type: "report_generator",
        description: "Generates comprehensive sustainability reports aligned with multiple ESG frameworks.",
        status: "active",
        model: "GPT-4 Turbo",
        framework: "AutoGen",
        accuracyRate: 94,
        documentsProcessed: 8500,
        reportsGenerated: 156,
        capabilities: ["Multi-framework alignment", "Narrative generation", "Data visualization", "Executive summaries"],
      },
      {
        id: "agent-3",
        name: "Compliance Monitor",
        type: "compliance_checker",
        description: "Continuously monitors compliance with ESG regulations and framework requirements.",
        status: "active",
        model: "Mistral Large",
        framework: "CrewAI",
        accuracyRate: 98,
        documentsProcessed: 12300,
        reportsGenerated: 89,
        capabilities: ["Regulatory tracking", "Gap analysis", "Alert generation", "Remediation suggestions"],
      },
      {
        id: "agent-4",
        name: "ESG Ontology Mapper",
        type: "ontology_mapper",
        description: "Maps ESG data to standardized ontologies and creates knowledge graphs for reporting.",
        status: "active",
        model: "Claude 3.5 Sonnet",
        framework: "LangGraph",
        accuracyRate: 95,
        documentsProcessed: 6200,
        reportsGenerated: 45,
        capabilities: ["Ontology mapping", "Knowledge graph generation", "Semantic linking", "Cross-framework alignment"],
      },
    ],
    sites: [
      {
        id: "site-1",
        name: "Calgary Operations Center",
        location: "Calgary",
        province: "AB",
        type: "Headquarters",
        environmentalScore: 82,
        socialScore: 88,
        governanceScore: 85,
        overallESGScore: 85,
        carbonFootprint: 8500,
        waterUsage: 120,
        wasteRecycled: 78,
        employeeCount: 1200,
        diversityPercent: 45,
        safetyIncidents: 0,
        assignedAgents: ["agent-1", "agent-2"],
        lastAssessment: "2025-11-15",
      },
      {
        id: "site-2",
        name: "Fort McMurray Facility",
        location: "Fort McMurray",
        province: "AB",
        type: "Production",
        environmentalScore: 72,
        socialScore: 80,
        governanceScore: 82,
        overallESGScore: 78,
        carbonFootprint: 45000,
        waterUsage: 850,
        wasteRecycled: 65,
        employeeCount: 1800,
        diversityPercent: 38,
        safetyIncidents: 2,
        assignedAgents: ["agent-1", "agent-3"],
        lastAssessment: "2025-10-20",
      },
      {
        id: "site-3",
        name: "Edmonton Renewable Hub",
        location: "Edmonton",
        province: "AB",
        type: "Renewable Energy",
        environmentalScore: 92,
        socialScore: 86,
        governanceScore: 84,
        overallESGScore: 87,
        carbonFootprint: 1200,
        waterUsage: 45,
        wasteRecycled: 92,
        employeeCount: 350,
        diversityPercent: 52,
        safetyIncidents: 0,
        assignedAgents: ["agent-1", "agent-4"],
        lastAssessment: "2025-12-01",
      },
    ],
    ontologyNodes: [
      { id: "env", label: "Environmental", category: "environmental", level: 0 },
      { id: "soc", label: "Social", category: "social", level: 0 },
      { id: "gov", label: "Governance", category: "governance", level: 0 },
      { id: "emissions", label: "Emissions", category: "environmental", level: 1 },
      { id: "energy", label: "Energy", category: "environmental", level: 1 },
      { id: "water", label: "Water", category: "environmental", level: 1 },
      { id: "waste", label: "Waste", category: "environmental", level: 1 },
      { id: "workforce", label: "Workforce", category: "social", level: 1 },
      { id: "community", label: "Community", category: "social", level: 1 },
      { id: "safety", label: "Health & Safety", category: "social", level: 1 },
      { id: "board", label: "Board", category: "governance", level: 1 },
      { id: "ethics", label: "Ethics", category: "governance", level: 1 },
      { id: "risk", label: "Risk Management", category: "governance", level: 1 },
    ],
    ontologyLinks: [
      { source: "env", target: "emissions", relationship: "includes" },
      { source: "env", target: "energy", relationship: "includes" },
      { source: "env", target: "water", relationship: "includes" },
      { source: "env", target: "waste", relationship: "includes" },
      { source: "soc", target: "workforce", relationship: "includes" },
      { source: "soc", target: "community", relationship: "includes" },
      { source: "soc", target: "safety", relationship: "includes" },
      { source: "gov", target: "board", relationship: "includes" },
      { source: "gov", target: "ethics", relationship: "includes" },
      { source: "gov", target: "risk", relationship: "includes" },
      { source: "emissions", target: "energy", relationship: "impacts" },
      { source: "safety", target: "workforce", relationship: "affects" },
      { source: "ethics", target: "risk", relationship: "mitigates" },
    ],
  },
  {
    id: "company-2",
    name: "Northern Mining Ltd",
    industry: "Mining & Minerals",
    headquarters: "Toronto, ON",
    description: "Responsible mining company focused on critical minerals extraction with industry-leading environmental practices and community engagement.",
    overallESGScore: 75,
    environmentalScore: 70,
    socialScore: 78,
    governanceScore: 80,
    esgRating: "A",
    totalSites: 8,
    totalEmployees: 3200,
    carbonNeutralTarget: "2045",
    sustainabilityReport: "2025 Q4",
    frameworks: [
      { id: "gri", name: "Global Reporting Initiative", shortName: "GRI", coverage: 85, lastAudit: "2025-08-10", nextAudit: "2026-02-10", status: "compliant" },
      { id: "icmm", name: "International Council on Mining & Metals", shortName: "ICMM", coverage: 90, lastAudit: "2025-09-05", nextAudit: "2026-03-05", status: "compliant" },
      { id: "tsm", name: "Towards Sustainable Mining", shortName: "TSM", coverage: 88, lastAudit: "2025-07-20", nextAudit: "2026-01-20", status: "compliant" },
    ],
    metrics: [
      { category: "environmental", name: "Carbon Emissions", value: 185000, unit: "tonnes CO2e", target: 150000, trend: "down", status: "at-risk" },
      { category: "environmental", name: "Land Reclaimed", value: 72, unit: "%", target: 85, trend: "up", status: "at-risk" },
      { category: "environmental", name: "Tailings Management", value: 95, unit: "% compliance", target: 100, trend: "up", status: "on-track" },
      { category: "social", name: "Indigenous Partnerships", value: 12, unit: "agreements", target: 15, trend: "up", status: "on-track" },
      { category: "social", name: "Local Employment", value: 68, unit: "%", target: 75, trend: "up", status: "on-track" },
      { category: "governance", name: "Supply Chain Audits", value: 85, unit: "% completed", target: 100, trend: "up", status: "at-risk" },
    ],
    agents: [
      {
        id: "agent-5",
        name: "Mining ESG Collector",
        type: "data_collector",
        description: "Specialized data collection for mining industry ESG metrics including tailings, land use, and community impact.",
        status: "active",
        model: "Llama 3.1 70B",
        framework: "LangChain",
        accuracyRate: 94,
        documentsProcessed: 9800,
        reportsGenerated: 0,
        capabilities: ["Sensor integration", "Satellite imagery analysis", "Community surveys", "Regulatory filings"],
      },
      {
        id: "agent-6",
        name: "TSM Report Generator",
        type: "report_generator",
        description: "Generates reports aligned with Towards Sustainable Mining (TSM) protocols and ICMM standards.",
        status: "active",
        model: "GPT-4 Turbo",
        framework: "AutoGen",
        accuracyRate: 92,
        documentsProcessed: 5600,
        reportsGenerated: 98,
        capabilities: ["TSM protocols", "ICMM alignment", "Stakeholder reports", "Performance tracking"],
      },
      {
        id: "agent-7",
        name: "Community Impact Analyzer",
        type: "risk_analyzer",
        description: "Analyzes social impact on local and Indigenous communities, tracks engagement metrics.",
        status: "active",
        model: "Claude 3.5 Sonnet",
        framework: "CrewAI",
        accuracyRate: 91,
        documentsProcessed: 4200,
        reportsGenerated: 67,
        capabilities: ["Sentiment analysis", "Community feedback", "Impact assessment", "Engagement tracking"],
      },
    ],
    sites: [
      {
        id: "site-4",
        name: "Sudbury Nickel Operations",
        location: "Sudbury",
        province: "ON",
        type: "Mining",
        environmentalScore: 68,
        socialScore: 75,
        governanceScore: 78,
        overallESGScore: 74,
        carbonFootprint: 62000,
        waterUsage: 1200,
        wasteRecycled: 58,
        employeeCount: 1400,
        diversityPercent: 35,
        safetyIncidents: 3,
        assignedAgents: ["agent-5", "agent-7"],
        lastAssessment: "2025-10-15",
      },
      {
        id: "site-5",
        name: "Timmins Gold Mine",
        location: "Timmins",
        province: "ON",
        type: "Mining",
        environmentalScore: 72,
        socialScore: 80,
        governanceScore: 82,
        overallESGScore: 78,
        carbonFootprint: 48000,
        waterUsage: 850,
        wasteRecycled: 62,
        employeeCount: 950,
        diversityPercent: 42,
        safetyIncidents: 1,
        assignedAgents: ["agent-5", "agent-6"],
        lastAssessment: "2025-11-01",
      },
    ],
    ontologyNodes: [
      { id: "env", label: "Environmental", category: "environmental", level: 0 },
      { id: "soc", label: "Social", category: "social", level: 0 },
      { id: "gov", label: "Governance", category: "governance", level: 0 },
      { id: "tailings", label: "Tailings", category: "environmental", level: 1 },
      { id: "biodiversity", label: "Biodiversity", category: "environmental", level: 1 },
      { id: "reclamation", label: "Land Reclamation", category: "environmental", level: 1 },
      { id: "indigenous", label: "Indigenous Relations", category: "social", level: 1 },
      { id: "localemploy", label: "Local Employment", category: "social", level: 1 },
      { id: "supplychain", label: "Supply Chain", category: "governance", level: 1 },
    ],
    ontologyLinks: [
      { source: "env", target: "tailings", relationship: "includes" },
      { source: "env", target: "biodiversity", relationship: "includes" },
      { source: "env", target: "reclamation", relationship: "includes" },
      { source: "soc", target: "indigenous", relationship: "includes" },
      { source: "soc", target: "localemploy", relationship: "includes" },
      { source: "gov", target: "supplychain", relationship: "includes" },
      { source: "tailings", target: "biodiversity", relationship: "impacts" },
      { source: "reclamation", target: "biodiversity", relationship: "supports" },
      { source: "indigenous", target: "localemploy", relationship: "connects" },
    ],
  },
  {
    id: "company-3",
    name: "Pacific Tech Industries",
    industry: "Technology",
    headquarters: "Vancouver, BC",
    description: "Technology company committed to sustainable innovation, ethical AI development, and inclusive workplace practices.",
    overallESGScore: 88,
    environmentalScore: 85,
    socialScore: 92,
    governanceScore: 87,
    esgRating: "AAA",
    totalSites: 6,
    totalEmployees: 2800,
    carbonNeutralTarget: "2030",
    sustainabilityReport: "2025 Q4",
    frameworks: [
      { id: "gri", name: "Global Reporting Initiative", shortName: "GRI", coverage: 95, lastAudit: "2025-10-01", nextAudit: "2026-04-01", status: "compliant" },
      { id: "tcfd", name: "Task Force on Climate-related Financial Disclosures", shortName: "TCFD", coverage: 92, lastAudit: "2025-09-15", nextAudit: "2026-03-15", status: "compliant" },
      { id: "ungc", name: "UN Global Compact", shortName: "UNGC", coverage: 98, lastAudit: "2025-08-01", nextAudit: "2026-02-01", status: "compliant" },
      { id: "bcorp", name: "B Corporation", shortName: "B Corp", coverage: 94, lastAudit: "2025-11-01", nextAudit: "2026-05-01", status: "compliant" },
    ],
    metrics: [
      { category: "environmental", name: "Carbon Emissions", value: 8500, unit: "tonnes CO2e", target: 5000, trend: "down", status: "on-track" },
      { category: "environmental", name: "Renewable Energy", value: 95, unit: "%", target: 100, trend: "up", status: "on-track" },
      { category: "environmental", name: "E-Waste Recycled", value: 98, unit: "%", target: 100, trend: "up", status: "on-track" },
      { category: "social", name: "Gender Diversity", value: 48, unit: "%", target: 50, trend: "up", status: "on-track" },
      { category: "social", name: "Employee Engagement", value: 92, unit: "%", target: 90, trend: "up", status: "on-track" },
      { category: "social", name: "Volunteer Hours", value: 12500, unit: "hours", target: 10000, trend: "up", status: "on-track" },
      { category: "governance", name: "Data Privacy Compliance", value: 100, unit: "%", target: 100, trend: "stable", status: "on-track" },
      { category: "governance", name: "Ethical AI Audits", value: 4, unit: "audits/year", target: 4, trend: "stable", status: "on-track" },
    ],
    agents: [
      {
        id: "agent-8",
        name: "Tech ESG Aggregator",
        type: "data_collector",
        description: "Collects ESG data specific to technology industry including e-waste, data privacy, and AI ethics metrics.",
        status: "active",
        model: "Llama 3.2 90B",
        framework: "LangChain",
        accuracyRate: 97,
        documentsProcessed: 18200,
        reportsGenerated: 0,
        capabilities: ["Cloud metrics", "E-waste tracking", "Privacy audits", "AI ethics monitoring"],
      },
      {
        id: "agent-9",
        name: "B Corp Report Writer",
        type: "report_generator",
        description: "Generates B Corporation impact assessments and UN Global Compact communications.",
        status: "active",
        model: "GPT-4 Turbo",
        framework: "AutoGen",
        accuracyRate: 96,
        documentsProcessed: 7800,
        reportsGenerated: 134,
        capabilities: ["B Corp assessment", "UNGC COP", "Impact measurement", "Stakeholder communications"],
      },
      {
        id: "agent-10",
        name: "DEI Analytics Engine",
        type: "benchmark_analyzer",
        description: "Analyzes diversity, equity, and inclusion metrics and benchmarks against industry standards.",
        status: "active",
        model: "Claude 3.5 Sonnet",
        framework: "CrewAI",
        accuracyRate: 94,
        documentsProcessed: 5400,
        reportsGenerated: 78,
        capabilities: ["DEI tracking", "Pay equity analysis", "Representation metrics", "Industry benchmarking"],
      },
      {
        id: "agent-11",
        name: "ESG Knowledge Grapher",
        type: "ontology_mapper",
        description: "Creates and maintains ESG knowledge graphs connecting metrics, frameworks, and stakeholders.",
        status: "active",
        model: "Mistral Large",
        framework: "LangGraph",
        accuracyRate: 95,
        documentsProcessed: 4100,
        reportsGenerated: 52,
        capabilities: ["Knowledge graphs", "Semantic reasoning", "Framework mapping", "Relationship extraction"],
      },
    ],
    sites: [
      {
        id: "site-6",
        name: "Vancouver Innovation Hub",
        location: "Vancouver",
        province: "BC",
        type: "Headquarters",
        environmentalScore: 92,
        socialScore: 95,
        governanceScore: 90,
        overallESGScore: 92,
        carbonFootprint: 2100,
        waterUsage: 25,
        wasteRecycled: 95,
        employeeCount: 1200,
        diversityPercent: 52,
        safetyIncidents: 0,
        assignedAgents: ["agent-8", "agent-11"],
        lastAssessment: "2025-12-01",
      },
      {
        id: "site-7",
        name: "Toronto Tech Center",
        location: "Toronto",
        province: "ON",
        type: "R&D",
        environmentalScore: 88,
        socialScore: 90,
        governanceScore: 86,
        overallESGScore: 88,
        carbonFootprint: 3200,
        waterUsage: 35,
        wasteRecycled: 92,
        employeeCount: 850,
        diversityPercent: 48,
        safetyIncidents: 0,
        assignedAgents: ["agent-8", "agent-10"],
        lastAssessment: "2025-11-15",
      },
    ],
    ontologyNodes: [
      { id: "env", label: "Environmental", category: "environmental", level: 0 },
      { id: "soc", label: "Social", category: "social", level: 0 },
      { id: "gov", label: "Governance", category: "governance", level: 0 },
      { id: "carbon", label: "Carbon Footprint", category: "environmental", level: 1 },
      { id: "ewaste", label: "E-Waste", category: "environmental", level: 1 },
      { id: "datacenters", label: "Data Centers", category: "environmental", level: 1 },
      { id: "dei", label: "DEI", category: "social", level: 1 },
      { id: "wellbeing", label: "Employee Wellbeing", category: "social", level: 1 },
      { id: "privacy", label: "Data Privacy", category: "governance", level: 1 },
      { id: "aiethics", label: "AI Ethics", category: "governance", level: 1 },
    ],
    ontologyLinks: [
      { source: "env", target: "carbon", relationship: "includes" },
      { source: "env", target: "ewaste", relationship: "includes" },
      { source: "env", target: "datacenters", relationship: "includes" },
      { source: "soc", target: "dei", relationship: "includes" },
      { source: "soc", target: "wellbeing", relationship: "includes" },
      { source: "gov", target: "privacy", relationship: "includes" },
      { source: "gov", target: "aiethics", relationship: "includes" },
      { source: "datacenters", target: "carbon", relationship: "drives" },
      { source: "aiethics", target: "privacy", relationship: "requires" },
      { source: "dei", target: "wellbeing", relationship: "enhances" },
    ],
  },
  {
    id: "company-4",
    name: "Atlantic Fisheries Co",
    industry: "Food & Agriculture",
    headquarters: "Halifax, NS",
    description: "Sustainable seafood company with MSC certification, committed to ocean conservation and coastal community development.",
    overallESGScore: 79,
    environmentalScore: 82,
    socialScore: 76,
    governanceScore: 78,
    esgRating: "A",
    totalSites: 5,
    totalEmployees: 1800,
    carbonNeutralTarget: "2035",
    sustainabilityReport: "2025 Q4",
    frameworks: [
      { id: "gri", name: "Global Reporting Initiative", shortName: "GRI", coverage: 82, lastAudit: "2025-09-01", nextAudit: "2026-03-01", status: "compliant" },
      { id: "msc", name: "Marine Stewardship Council", shortName: "MSC", coverage: 95, lastAudit: "2025-10-15", nextAudit: "2026-04-15", status: "compliant" },
      { id: "asc", name: "Aquaculture Stewardship Council", shortName: "ASC", coverage: 88, lastAudit: "2025-08-20", nextAudit: "2026-02-20", status: "compliant" },
    ],
    metrics: [
      { category: "environmental", name: "Sustainable Catch", value: 92, unit: "%", target: 100, trend: "up", status: "on-track" },
      { category: "environmental", name: "Bycatch Reduction", value: 85, unit: "%", target: 95, trend: "up", status: "at-risk" },
      { category: "environmental", name: "Fuel Efficiency", value: 18, unit: "% improvement", target: 25, trend: "up", status: "on-track" },
      { category: "social", name: "Fair Wage Compliance", value: 100, unit: "%", target: 100, trend: "stable", status: "on-track" },
      { category: "social", name: "Community Investment", value: 2.5, unit: "M CAD", target: 3, trend: "up", status: "on-track" },
      { category: "governance", name: "Traceability", value: 98, unit: "%", target: 100, trend: "up", status: "on-track" },
    ],
    agents: [
      {
        id: "agent-12",
        name: "Ocean Data Collector",
        type: "data_collector",
        description: "Collects marine sustainability data including catch data, ocean health metrics, and vessel tracking.",
        status: "active",
        model: "Llama 3.1 70B",
        framework: "LangChain",
        accuracyRate: 93,
        documentsProcessed: 8900,
        reportsGenerated: 0,
        capabilities: ["Vessel tracking", "Catch monitoring", "Ocean sensors", "Satellite imagery"],
      },
      {
        id: "agent-13",
        name: "MSC Compliance Reporter",
        type: "report_generator",
        description: "Generates Marine Stewardship Council compliance reports and chain of custody documentation.",
        status: "active",
        model: "GPT-4 Turbo",
        framework: "AutoGen",
        accuracyRate: 95,
        documentsProcessed: 4500,
        reportsGenerated: 87,
        capabilities: ["MSC reporting", "Chain of custody", "Fishery assessments", "Stakeholder reports"],
      },
      {
        id: "agent-14",
        name: "Supply Chain Tracer",
        type: "document_parser",
        description: "Parses and validates supply chain documents to ensure full seafood traceability.",
        status: "active",
        model: "Claude 3.5 Sonnet",
        framework: "CrewAI",
        accuracyRate: 97,
        documentsProcessed: 12400,
        reportsGenerated: 156,
        capabilities: ["Document OCR", "Blockchain verification", "Origin tracking", "Fraud detection"],
      },
    ],
    sites: [
      {
        id: "site-8",
        name: "Halifax Processing Plant",
        location: "Halifax",
        province: "NS",
        type: "Processing",
        environmentalScore: 80,
        socialScore: 78,
        governanceScore: 82,
        overallESGScore: 80,
        carbonFootprint: 5200,
        waterUsage: 280,
        wasteRecycled: 75,
        employeeCount: 450,
        diversityPercent: 42,
        safetyIncidents: 1,
        assignedAgents: ["agent-12", "agent-14"],
        lastAssessment: "2025-11-10",
      },
      {
        id: "site-9",
        name: "Lunenburg Fleet Operations",
        location: "Lunenburg",
        province: "NS",
        type: "Fleet",
        environmentalScore: 85,
        socialScore: 74,
        governanceScore: 76,
        overallESGScore: 78,
        carbonFootprint: 12000,
        waterUsage: 0,
        wasteRecycled: 68,
        employeeCount: 320,
        diversityPercent: 28,
        safetyIncidents: 2,
        assignedAgents: ["agent-12", "agent-13"],
        lastAssessment: "2025-10-25",
      },
    ],
    ontologyNodes: [
      { id: "env", label: "Environmental", category: "environmental", level: 0 },
      { id: "soc", label: "Social", category: "social", level: 0 },
      { id: "gov", label: "Governance", category: "governance", level: 0 },
      { id: "oceans", label: "Ocean Health", category: "environmental", level: 1 },
      { id: "bycatch", label: "Bycatch", category: "environmental", level: 1 },
      { id: "fuels", label: "Fleet Emissions", category: "environmental", level: 1 },
      { id: "coastal", label: "Coastal Communities", category: "social", level: 1 },
      { id: "workers", label: "Worker Welfare", category: "social", level: 1 },
      { id: "traceability", label: "Traceability", category: "governance", level: 1 },
    ],
    ontologyLinks: [
      { source: "env", target: "oceans", relationship: "includes" },
      { source: "env", target: "bycatch", relationship: "includes" },
      { source: "env", target: "fuels", relationship: "includes" },
      { source: "soc", target: "coastal", relationship: "includes" },
      { source: "soc", target: "workers", relationship: "includes" },
      { source: "gov", target: "traceability", relationship: "includes" },
      { source: "bycatch", target: "oceans", relationship: "impacts" },
      { source: "coastal", target: "workers", relationship: "connects" },
      { source: "traceability", target: "oceans", relationship: "protects" },
    ],
  },
];

// Chart data
export const esgScoreTrendData = [
  { month: "Jul", environmental: 72, social: 78, governance: 80 },
  { month: "Aug", environmental: 74, social: 79, governance: 81 },
  { month: "Sep", environmental: 75, social: 80, governance: 82 },
  { month: "Oct", environmental: 77, social: 82, governance: 83 },
  { month: "Nov", environmental: 78, social: 84, governance: 84 },
  { month: "Dec", environmental: 80, social: 85, governance: 85 },
];

export const frameworkCoverageData = [
  { framework: "GRI", coverage: 92, target: 95 },
  { framework: "TCFD", coverage: 88, target: 90 },
  { framework: "SASB", coverage: 85, target: 90 },
  { framework: "CDP", coverage: 90, target: 95 },
  { framework: "UNGC", coverage: 95, target: 98 },
];

export const metricDistributionData = [
  { category: "Environmental", onTrack: 65, atRisk: 25, offTrack: 10 },
  { category: "Social", onTrack: 72, atRisk: 20, offTrack: 8 },
  { category: "Governance", onTrack: 78, atRisk: 18, offTrack: 4 },
];

export const agentTypeConfig: Record<string, { label: string; color: string }> = {
  data_collector: { label: "Data Collector", color: "#3498DB" },
  report_generator: { label: "Report Generator", color: "#2ECC71" },
  compliance_checker: { label: "Compliance Checker", color: "#E74C3C" },
  risk_analyzer: { label: "Risk Analyzer", color: "#F1C40F" },
  benchmark_analyzer: { label: "Benchmark Analyzer", color: "#9B59B6" },
  ontology_mapper: { label: "Ontology Mapper", color: "#00D4AA" },
  document_parser: { label: "Document Parser", color: "#E67E22" },
};

export const categoryConfig: Record<string, { label: string; color: string }> = {
  environmental: { label: "Environmental", color: "#2ECC71" },
  social: { label: "Social", color: "#3498DB" },
  governance: { label: "Governance", color: "#9B59B6" },
  framework: { label: "Framework", color: "#F1C40F" },
  metric: { label: "Metric", color: "#E67E22" },
};

export const statusConfig: Record<string, { label: string; color: string }> = {
  "on-track": { label: "On Track", color: "#2ECC71" },
  "at-risk": { label: "At Risk", color: "#F1C40F" },
  "off-track": { label: "Off Track", color: "#E74C3C" },
};

export const ratingConfig: Record<string, { color: string }> = {
  AAA: { color: "#00D4AA" },
  AA: { color: "#2ECC71" },
  A: { color: "#27AE60" },
  BBB: { color: "#F1C40F" },
  BB: { color: "#E67E22" },
  B: { color: "#E74C3C" },
  CCC: { color: "#C0392B" },
};
