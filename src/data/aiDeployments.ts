// AI Deployments Data - Locally Deployed AI Models

export type AgentType = 
  | 'coding'
  | 'cybersecurity'
  | 'data_analysis'
  | 'customer_service'
  | 'document_processing'
  | 'research'
  | 'multimodal'
  | 'orchestrator';

export type HardwareType = 
  | 'nvidia_h100'
  | 'nvidia_a100'
  | 'nvidia_l40s'
  | 'nvidia_rtx_4090'
  | 'amd_mi300x'
  | 'intel_gaudi2'
  | 'custom_asic';

export type ModelFamily = 
  | 'llama'
  | 'mistral'
  | 'mixtral'
  | 'falcon'
  | 'qwen'
  | 'deepseek'
  | 'phi'
  | 'gemma'
  | 'codellama'
  | 'starcoder'
  | 'custom';

export type Framework = 
  | 'langchain'
  | 'llamaindex'
  | 'autogen'
  | 'crewai'
  | 'haystack'
  | 'semantic_kernel'
  | 'dspy'
  | 'custom';

export type DeploymentStatus = 'active' | 'scaling' | 'pilot' | 'planned';

export interface AIAgent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  modelUsed: string;
  framework: Framework;
  useCases: string[];
  monthlyQueries: number;
  accuracy: number; // percentage
}

export interface HardwareCluster {
  id: string;
  name: string;
  hardwareType: HardwareType;
  gpuCount: number;
  vramTotalTB: number;
  tflopsCapacity: number;
  powerDrawKW: number;
  coolingType: 'air' | 'liquid' | 'immersion';
}

export interface DeployedModel {
  id: string;
  name: string;
  family: ModelFamily;
  parametersBillions: number;
  quantization: string; // e.g., "FP16", "INT8", "GPTQ-4bit"
  contextLength: number;
  specialization?: string;
  finetuned: boolean;
  fineTuneDataset?: string;
}

export interface DeploymentSite {
  id: string;
  name: string;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
  tier: 'primary' | 'secondary' | 'edge';
  pue: number;
  renewablePercent: number;
}

export interface AICompany {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  headquarters: string;
  founded: number;
  employees: number;
  aiTeamSize: number;
  description: string;
  status: DeploymentStatus;
  sovereignAIReady: boolean;
  dataResidency: 'canada_only' | 'north_america' | 'global';
  securityClearance?: 'protected_a' | 'protected_b' | 'secret' | 'top_secret';
  totalInvestmentMillions: number;
  annualAISavingsMillions: number;
  
  // Deployment details
  sites: DeploymentSite[];
  hardware: HardwareCluster[];
  models: DeployedModel[];
  agents: AIAgent[];
  
  // Metrics
  totalGPUs: number;
  monthlyInferences: number;
  avgLatencyMs: number;
  uptime: number; // percentage
}

export const aiCompanies: AICompany[] = [
  {
    id: "comp-001",
    name: "Desjardins Group",
    industry: "Financial Services",
    headquarters: "Lévis, QC",
    founded: 1900,
    employees: 53000,
    aiTeamSize: 450,
    description: "Canada's largest federation of credit unions, deploying sovereign AI for fraud detection, risk assessment, and member services across Quebec and Ontario.",
    status: "active",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    securityClearance: "protected_b",
    totalInvestmentMillions: 180,
    annualAISavingsMillions: 45,
    sites: [
      { id: "site-001-1", name: "Lévis Primary DC", city: "Lévis", province: "QC", latitude: 46.8032, longitude: -71.1779, tier: "primary", pue: 1.2, renewablePercent: 99 },
      { id: "site-001-2", name: "Montreal Backup DC", city: "Montreal", province: "QC", latitude: 45.5017, longitude: -73.5673, tier: "secondary", pue: 1.25, renewablePercent: 95 },
    ],
    hardware: [
      { id: "hw-001-1", name: "Fraud Detection Cluster", hardwareType: "nvidia_h100", gpuCount: 128, vramTotalTB: 10.24, tflopsCapacity: 253952, powerDrawKW: 89.6, coolingType: "liquid" },
      { id: "hw-001-2", name: "Member Services Cluster", hardwareType: "nvidia_a100", gpuCount: 64, vramTotalTB: 5.12, tflopsCapacity: 19968, powerDrawKW: 25.6, coolingType: "air" },
    ],
    models: [
      { id: "mod-001-1", name: "Desjardins-Fraud-7B", family: "mistral", parametersBillions: 7, quantization: "FP16", contextLength: 32768, specialization: "Financial fraud detection", finetuned: true, fineTuneDataset: "10M fraud cases" },
      { id: "mod-001-2", name: "Desjardins-Advisor-13B", family: "llama", parametersBillions: 13, quantization: "INT8", contextLength: 8192, specialization: "Financial advisory", finetuned: true, fineTuneDataset: "Advisory transcripts" },
      { id: "mod-001-3", name: "CodeLlama-Assistant", family: "codellama", parametersBillions: 34, quantization: "GPTQ-4bit", contextLength: 16384, finetuned: false },
    ],
    agents: [
      { id: "agent-001-1", name: "FraudGuard", type: "cybersecurity", description: "Real-time transaction fraud detection and prevention", modelUsed: "Desjardins-Fraud-7B", framework: "langchain", useCases: ["Transaction monitoring", "Pattern detection", "Alert generation"], monthlyQueries: 850000000, accuracy: 99.7 },
      { id: "agent-001-2", name: "MemberAssist", type: "customer_service", description: "Bilingual member support and query resolution", modelUsed: "Desjardins-Advisor-13B", framework: "langchain", useCases: ["Account inquiries", "Product recommendations", "Issue resolution"], monthlyQueries: 12000000, accuracy: 94.5 },
      { id: "agent-001-3", name: "DevAssist", type: "coding", description: "Internal development assistant for banking software", modelUsed: "CodeLlama-Assistant", framework: "semantic_kernel", useCases: ["Code generation", "Code review", "Documentation"], monthlyQueries: 500000, accuracy: 89.2 },
    ],
    totalGPUs: 192,
    monthlyInferences: 862500000,
    avgLatencyMs: 45,
    uptime: 99.99,
  },
  {
    id: "comp-002",
    name: "Shopify",
    industry: "E-commerce Technology",
    headquarters: "Ottawa, ON",
    founded: 2006,
    employees: 8300,
    aiTeamSize: 600,
    description: "Global e-commerce platform leveraging locally-deployed AI for merchant tools, Sidekick assistant, and autonomous agents for store management.",
    status: "active",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    totalInvestmentMillions: 320,
    annualAISavingsMillions: 78,
    sites: [
      { id: "site-002-1", name: "Ottawa AI Campus", city: "Ottawa", province: "ON", latitude: 45.4215, longitude: -75.6972, tier: "primary", pue: 1.15, renewablePercent: 85 },
      { id: "site-002-2", name: "Toronto Scale DC", city: "Toronto", province: "ON", latitude: 43.6532, longitude: -79.3832, tier: "primary", pue: 1.18, renewablePercent: 80 },
      { id: "site-002-3", name: "Montreal ML Hub", city: "Montreal", province: "QC", latitude: 45.5017, longitude: -73.5673, tier: "secondary", pue: 1.22, renewablePercent: 98 },
    ],
    hardware: [
      { id: "hw-002-1", name: "Sidekick Inference Cluster", hardwareType: "nvidia_h100", gpuCount: 512, vramTotalTB: 40.96, tflopsCapacity: 1015808, powerDrawKW: 358.4, coolingType: "liquid" },
      { id: "hw-002-2", name: "Merchant Analytics Cluster", hardwareType: "nvidia_a100", gpuCount: 256, vramTotalTB: 20.48, tflopsCapacity: 79872, powerDrawKW: 102.4, coolingType: "liquid" },
      { id: "hw-002-3", name: "Training Cluster", hardwareType: "nvidia_h100", gpuCount: 256, vramTotalTB: 20.48, tflopsCapacity: 507904, powerDrawKW: 179.2, coolingType: "immersion" },
    ],
    models: [
      { id: "mod-002-1", name: "Sidekick-70B", family: "llama", parametersBillions: 70, quantization: "FP16", contextLength: 32768, specialization: "E-commerce assistance", finetuned: true, fineTuneDataset: "Merchant interactions" },
      { id: "mod-002-2", name: "ShopifyCode-34B", family: "codellama", parametersBillions: 34, quantization: "FP16", contextLength: 16384, specialization: "Liquid/Shopify development", finetuned: true, fineTuneDataset: "Shopify themes & apps" },
      { id: "mod-002-3", name: "ProductVision-7B", family: "qwen", parametersBillions: 7, quantization: "INT8", contextLength: 8192, specialization: "Product image analysis", finetuned: true },
      { id: "mod-002-4", name: "MerchantAnalytics-13B", family: "mistral", parametersBillions: 13, quantization: "INT8", contextLength: 32768, specialization: "Business analytics", finetuned: true },
    ],
    agents: [
      { id: "agent-002-1", name: "Sidekick", type: "orchestrator", description: "Multi-agent system for merchant store management and optimization", modelUsed: "Sidekick-70B", framework: "autogen", useCases: ["Store setup", "Marketing automation", "Inventory management", "Customer insights"], monthlyQueries: 45000000, accuracy: 92.8 },
      { id: "agent-002-2", name: "ThemeGenius", type: "coding", description: "Autonomous theme customization and Liquid code generation", modelUsed: "ShopifyCode-34B", framework: "langchain", useCases: ["Theme customization", "Bug fixes", "Feature development"], monthlyQueries: 8000000, accuracy: 88.5 },
      { id: "agent-002-3", name: "ProductTagger", type: "multimodal", description: "Automatic product categorization and SEO optimization", modelUsed: "ProductVision-7B", framework: "llamaindex", useCases: ["Image tagging", "SEO generation", "Category suggestion"], monthlyQueries: 120000000, accuracy: 95.2 },
      { id: "agent-002-4", name: "InsightEngine", type: "data_analysis", description: "Real-time business intelligence and trend analysis", modelUsed: "MerchantAnalytics-13B", framework: "dspy", useCases: ["Sales forecasting", "Trend detection", "Competitor analysis"], monthlyQueries: 25000000, accuracy: 91.3 },
    ],
    totalGPUs: 1024,
    monthlyInferences: 198000000,
    avgLatencyMs: 120,
    uptime: 99.95,
  },
  {
    id: "comp-003",
    name: "Canadian Armed Forces - DND",
    industry: "Defense & Security",
    headquarters: "Ottawa, ON",
    founded: 1968,
    employees: 68000,
    aiTeamSize: 180,
    description: "Department of National Defence sovereign AI initiative for intelligence analysis, logistics optimization, and cybersecurity operations.",
    status: "scaling",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    securityClearance: "top_secret",
    totalInvestmentMillions: 450,
    annualAISavingsMillions: 120,
    sites: [
      { id: "site-003-1", name: "NDHQ Secure Compute", city: "Ottawa", province: "ON", latitude: 45.4215, longitude: -75.6972, tier: "primary", pue: 1.3, renewablePercent: 75 },
      { id: "site-003-2", name: "CFB Trenton AI Ops", city: "Trenton", province: "ON", latitude: 44.1, longitude: -77.5833, tier: "secondary", pue: 1.35, renewablePercent: 70 },
      { id: "site-003-3", name: "CFB Esquimalt Naval AI", city: "Victoria", province: "BC", latitude: 48.4284, longitude: -123.3656, tier: "secondary", pue: 1.28, renewablePercent: 95 },
    ],
    hardware: [
      { id: "hw-003-1", name: "SIGINT Analysis Cluster", hardwareType: "nvidia_h100", gpuCount: 256, vramTotalTB: 20.48, tflopsCapacity: 507904, powerDrawKW: 179.2, coolingType: "liquid" },
      { id: "hw-003-2", name: "Cyber Defense Cluster", hardwareType: "nvidia_a100", gpuCount: 128, vramTotalTB: 10.24, tflopsCapacity: 39936, powerDrawKW: 51.2, coolingType: "air" },
      { id: "hw-003-3", name: "Logistics Optimization", hardwareType: "nvidia_l40s", gpuCount: 64, vramTotalTB: 3.07, tflopsCapacity: 22323, powerDrawKW: 19.2, coolingType: "air" },
    ],
    models: [
      { id: "mod-003-1", name: "MAPLE-Intel-70B", family: "llama", parametersBillions: 70, quantization: "FP16", contextLength: 65536, specialization: "Intelligence analysis", finetuned: true, fineTuneDataset: "Classified OSINT" },
      { id: "mod-003-2", name: "CyberShield-13B", family: "mistral", parametersBillions: 13, quantization: "FP16", contextLength: 32768, specialization: "Threat detection", finetuned: true, fineTuneDataset: "Threat intelligence" },
      { id: "mod-003-3", name: "LogiForce-7B", family: "phi", parametersBillions: 7, quantization: "INT8", contextLength: 8192, specialization: "Military logistics", finetuned: true },
    ],
    agents: [
      { id: "agent-003-1", name: "ARGUS", type: "research", description: "Multi-source intelligence fusion and analysis system", modelUsed: "MAPLE-Intel-70B", framework: "langchain", useCases: ["OSINT analysis", "Pattern recognition", "Threat assessment"], monthlyQueries: 2500000, accuracy: 96.8 },
      { id: "agent-003-2", name: "SENTINEL", type: "cybersecurity", description: "Autonomous cyber threat detection and response", modelUsed: "CyberShield-13B", framework: "autogen", useCases: ["Intrusion detection", "Malware analysis", "Incident response"], monthlyQueries: 180000000, accuracy: 99.2 },
      { id: "agent-003-3", name: "QUARTERMASTER", type: "data_analysis", description: "Supply chain and logistics optimization", modelUsed: "LogiForce-7B", framework: "llamaindex", useCases: ["Inventory optimization", "Route planning", "Demand forecasting"], monthlyQueries: 5000000, accuracy: 93.5 },
    ],
    totalGPUs: 448,
    monthlyInferences: 187500000,
    avgLatencyMs: 85,
    uptime: 99.999,
  },
  {
    id: "comp-004",
    name: "Telus",
    industry: "Telecommunications",
    headquarters: "Vancouver, BC",
    founded: 1990,
    employees: 75000,
    aiTeamSize: 380,
    description: "National telecom leader deploying AI for network optimization, customer experience, and health services across Canada.",
    status: "active",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    securityClearance: "protected_a",
    totalInvestmentMillions: 220,
    annualAISavingsMillions: 65,
    sites: [
      { id: "site-004-1", name: "Vancouver Tech Hub", city: "Vancouver", province: "BC", latitude: 49.2827, longitude: -123.1207, tier: "primary", pue: 1.18, renewablePercent: 98 },
      { id: "site-004-2", name: "Calgary Operations", city: "Calgary", province: "AB", latitude: 51.0447, longitude: -114.0719, tier: "primary", pue: 1.22, renewablePercent: 65 },
      { id: "site-004-3", name: "Rimouski Edge", city: "Rimouski", province: "QC", latitude: 48.449, longitude: -68.523, tier: "edge", pue: 1.15, renewablePercent: 99 },
    ],
    hardware: [
      { id: "hw-004-1", name: "Customer AI Cluster", hardwareType: "nvidia_h100", gpuCount: 192, vramTotalTB: 15.36, tflopsCapacity: 380928, powerDrawKW: 134.4, coolingType: "liquid" },
      { id: "hw-004-2", name: "Network Optimization", hardwareType: "nvidia_a100", gpuCount: 96, vramTotalTB: 7.68, tflopsCapacity: 29952, powerDrawKW: 38.4, coolingType: "air" },
      { id: "hw-004-3", name: "Health AI Platform", hardwareType: "nvidia_l40s", gpuCount: 48, vramTotalTB: 2.3, tflopsCapacity: 16742, powerDrawKW: 14.4, coolingType: "air" },
    ],
    models: [
      { id: "mod-004-1", name: "TelusAssist-13B", family: "mistral", parametersBillions: 13, quantization: "FP16", contextLength: 32768, specialization: "Customer support", finetuned: true, fineTuneDataset: "Support transcripts" },
      { id: "mod-004-2", name: "NetOptimizer-7B", family: "phi", parametersBillions: 7, quantization: "INT8", contextLength: 8192, specialization: "Network analysis", finetuned: true },
      { id: "mod-004-3", name: "HealthLink-70B", family: "llama", parametersBillions: 70, quantization: "GPTQ-4bit", contextLength: 16384, specialization: "Healthcare triage", finetuned: true, fineTuneDataset: "TELUS Health data" },
    ],
    agents: [
      { id: "agent-004-1", name: "TelusBot", type: "customer_service", description: "Omnichannel customer support across voice, chat, and app", modelUsed: "TelusAssist-13B", framework: "langchain", useCases: ["Bill inquiries", "Plan changes", "Technical support"], monthlyQueries: 35000000, accuracy: 93.2 },
      { id: "agent-004-2", name: "NetGenius", type: "data_analysis", description: "Predictive network maintenance and optimization", modelUsed: "NetOptimizer-7B", framework: "custom", useCases: ["Outage prediction", "Capacity planning", "Quality optimization"], monthlyQueries: 500000000, accuracy: 97.1 },
      { id: "agent-004-3", name: "HealthNavigator", type: "document_processing", description: "Health triage and appointment scheduling for TELUS Health", modelUsed: "HealthLink-70B", framework: "llamaindex", useCases: ["Symptom assessment", "Provider matching", "Care coordination"], monthlyQueries: 8000000, accuracy: 91.8 },
    ],
    totalGPUs: 336,
    monthlyInferences: 543000000,
    avgLatencyMs: 65,
    uptime: 99.97,
  },
  {
    id: "comp-005",
    name: "Manulife",
    industry: "Insurance & Financial Services",
    headquarters: "Toronto, ON",
    founded: 1887,
    employees: 38000,
    aiTeamSize: 290,
    description: "Global insurance company deploying sovereign AI for claims processing, underwriting automation, and personalized financial planning.",
    status: "active",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    securityClearance: "protected_b",
    totalInvestmentMillions: 145,
    annualAISavingsMillions: 52,
    sites: [
      { id: "site-005-1", name: "Toronto Financial DC", city: "Toronto", province: "ON", latitude: 43.6532, longitude: -79.3832, tier: "primary", pue: 1.2, renewablePercent: 78 },
      { id: "site-005-2", name: "Waterloo Innovation", city: "Waterloo", province: "ON", latitude: 43.4643, longitude: -80.5204, tier: "secondary", pue: 1.25, renewablePercent: 82 },
    ],
    hardware: [
      { id: "hw-005-1", name: "Claims Processing Cluster", hardwareType: "nvidia_h100", gpuCount: 96, vramTotalTB: 7.68, tflopsCapacity: 190464, powerDrawKW: 67.2, coolingType: "liquid" },
      { id: "hw-005-2", name: "Underwriting AI", hardwareType: "nvidia_a100", gpuCount: 64, vramTotalTB: 5.12, tflopsCapacity: 19968, powerDrawKW: 25.6, coolingType: "air" },
    ],
    models: [
      { id: "mod-005-1", name: "ClaimsIQ-13B", family: "mistral", parametersBillions: 13, quantization: "FP16", contextLength: 32768, specialization: "Claims assessment", finetuned: true, fineTuneDataset: "Historical claims" },
      { id: "mod-005-2", name: "UnderwriteAI-7B", family: "llama", parametersBillions: 7, quantization: "INT8", contextLength: 16384, specialization: "Risk assessment", finetuned: true },
      { id: "mod-005-3", name: "DocExtract-Vision", family: "qwen", parametersBillions: 7, quantization: "INT8", contextLength: 8192, specialization: "Document OCR & extraction", finetuned: true },
    ],
    agents: [
      { id: "agent-005-1", name: "ClaimsAssist", type: "document_processing", description: "Automated claims intake, validation, and routing", modelUsed: "ClaimsIQ-13B", framework: "langchain", useCases: ["Claim validation", "Fraud detection", "Settlement estimation"], monthlyQueries: 15000000, accuracy: 94.7 },
      { id: "agent-005-2", name: "RiskEngine", type: "data_analysis", description: "Automated underwriting and risk scoring", modelUsed: "UnderwriteAI-7B", framework: "dspy", useCases: ["Application scoring", "Premium calculation", "Risk assessment"], monthlyQueries: 8000000, accuracy: 96.2 },
      { id: "agent-005-3", name: "DocProcessor", type: "multimodal", description: "Intelligent document extraction and processing", modelUsed: "DocExtract-Vision", framework: "llamaindex", useCases: ["Form extraction", "Document classification", "Data validation"], monthlyQueries: 25000000, accuracy: 98.1 },
    ],
    totalGPUs: 160,
    monthlyInferences: 48000000,
    avgLatencyMs: 95,
    uptime: 99.95,
  },
  {
    id: "comp-006",
    name: "Element AI (ServiceNow)",
    industry: "Enterprise Software",
    headquarters: "Montreal, QC",
    founded: 2016,
    employees: 500,
    aiTeamSize: 350,
    description: "AI research lab providing enterprise AI solutions, multi-agent frameworks, and sovereign AI consulting for Canadian organizations.",
    status: "active",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    totalInvestmentMillions: 85,
    annualAISavingsMillions: 28,
    sites: [
      { id: "site-006-1", name: "Montreal AI Lab", city: "Montreal", province: "QC", latitude: 45.5017, longitude: -73.5673, tier: "primary", pue: 1.12, renewablePercent: 99 },
      { id: "site-006-2", name: "Toronto Enterprise", city: "Toronto", province: "ON", latitude: 43.6532, longitude: -79.3832, tier: "secondary", pue: 1.18, renewablePercent: 80 },
    ],
    hardware: [
      { id: "hw-006-1", name: "Research Supercluster", hardwareType: "nvidia_h100", gpuCount: 384, vramTotalTB: 30.72, tflopsCapacity: 761856, powerDrawKW: 268.8, coolingType: "immersion" },
      { id: "hw-006-2", name: "Enterprise Inference", hardwareType: "nvidia_a100", gpuCount: 128, vramTotalTB: 10.24, tflopsCapacity: 39936, powerDrawKW: 51.2, coolingType: "liquid" },
    ],
    models: [
      { id: "mod-006-1", name: "ElementCore-70B", family: "llama", parametersBillions: 70, quantization: "FP16", contextLength: 65536, specialization: "Enterprise reasoning", finetuned: true, fineTuneDataset: "Enterprise workflows" },
      { id: "mod-006-2", name: "AgentForge-13B", family: "mixtral", parametersBillions: 46.7, quantization: "FP16", contextLength: 32768, specialization: "Multi-agent orchestration", finetuned: true },
      { id: "mod-006-3", name: "CodeForge-34B", family: "deepseek", parametersBillions: 33, quantization: "FP16", contextLength: 16384, specialization: "Enterprise coding", finetuned: true },
    ],
    agents: [
      { id: "agent-006-1", name: "EnterpriseGPT", type: "orchestrator", description: "Multi-agent system for enterprise workflow automation", modelUsed: "ElementCore-70B", framework: "crewai", useCases: ["Workflow automation", "Decision support", "Process optimization"], monthlyQueries: 12000000, accuracy: 91.5 },
      { id: "agent-006-2", name: "AgentBuilder", type: "coding", description: "No-code/low-code agent development platform", modelUsed: "AgentForge-13B", framework: "autogen", useCases: ["Agent creation", "Workflow design", "Integration building"], monthlyQueries: 3000000, accuracy: 87.8 },
      { id: "agent-006-3", name: "CodePilot", type: "coding", description: "Enterprise-grade code generation and review", modelUsed: "CodeForge-34B", framework: "semantic_kernel", useCases: ["Code generation", "Security review", "Refactoring"], monthlyQueries: 8000000, accuracy: 90.2 },
    ],
    totalGPUs: 512,
    monthlyInferences: 23000000,
    avgLatencyMs: 150,
    uptime: 99.9,
  },
  {
    id: "comp-007",
    name: "Hydro-Québec",
    industry: "Energy & Utilities",
    headquarters: "Montreal, QC",
    founded: 1944,
    employees: 20000,
    aiTeamSize: 120,
    description: "North America's largest hydroelectric utility leveraging AI for grid optimization, predictive maintenance, and demand forecasting.",
    status: "active",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    securityClearance: "protected_a",
    totalInvestmentMillions: 95,
    annualAISavingsMillions: 38,
    sites: [
      { id: "site-007-1", name: "Montreal Control Center", city: "Montreal", province: "QC", latitude: 45.5017, longitude: -73.5673, tier: "primary", pue: 1.1, renewablePercent: 100 },
      { id: "site-007-2", name: "Manicouagan Remote", city: "Baie-Comeau", province: "QC", latitude: 49.2167, longitude: -68.15, tier: "edge", pue: 1.08, renewablePercent: 100 },
    ],
    hardware: [
      { id: "hw-007-1", name: "Grid AI Cluster", hardwareType: "nvidia_a100", gpuCount: 96, vramTotalTB: 7.68, tflopsCapacity: 29952, powerDrawKW: 38.4, coolingType: "liquid" },
      { id: "hw-007-2", name: "Maintenance Prediction", hardwareType: "nvidia_l40s", gpuCount: 32, vramTotalTB: 1.54, tflopsCapacity: 11162, powerDrawKW: 9.6, coolingType: "air" },
    ],
    models: [
      { id: "mod-007-1", name: "GridMaster-13B", family: "mistral", parametersBillions: 13, quantization: "FP16", contextLength: 32768, specialization: "Grid optimization", finetuned: true, fineTuneDataset: "Grid telemetry data" },
      { id: "mod-007-2", name: "DamWatch-7B", family: "phi", parametersBillions: 7, quantization: "INT8", contextLength: 8192, specialization: "Infrastructure monitoring", finetuned: true },
    ],
    agents: [
      { id: "agent-007-1", name: "GridOptimizer", type: "data_analysis", description: "Real-time grid load balancing and optimization", modelUsed: "GridMaster-13B", framework: "custom", useCases: ["Load forecasting", "Outage prevention", "Renewable integration"], monthlyQueries: 750000000, accuracy: 98.5 },
      { id: "agent-007-2", name: "AssetGuard", type: "data_analysis", description: "Predictive maintenance for dams and transmission", modelUsed: "DamWatch-7B", framework: "langchain", useCases: ["Anomaly detection", "Maintenance scheduling", "Risk assessment"], monthlyQueries: 50000000, accuracy: 96.8 },
    ],
    totalGPUs: 128,
    monthlyInferences: 800000000,
    avgLatencyMs: 25,
    uptime: 99.999,
  },
  {
    id: "comp-008",
    name: "Cohere",
    industry: "AI/ML Platform",
    headquarters: "Toronto, ON",
    founded: 2019,
    employees: 450,
    aiTeamSize: 380,
    description: "Enterprise AI company providing Canadian-hosted LLM infrastructure, embedding models, and RAG solutions for sovereign AI deployments.",
    status: "active",
    sovereignAIReady: true,
    dataResidency: "canada_only",
    totalInvestmentMillions: 270,
    annualAISavingsMillions: 0,
    sites: [
      { id: "site-008-1", name: "Toronto AI Campus", city: "Toronto", province: "ON", latitude: 43.6532, longitude: -79.3832, tier: "primary", pue: 1.15, renewablePercent: 82 },
      { id: "site-008-2", name: "Montreal Research", city: "Montreal", province: "QC", latitude: 45.5017, longitude: -73.5673, tier: "primary", pue: 1.12, renewablePercent: 99 },
    ],
    hardware: [
      { id: "hw-008-1", name: "Command Training Cluster", hardwareType: "nvidia_h100", gpuCount: 1024, vramTotalTB: 81.92, tflopsCapacity: 2031616, powerDrawKW: 716.8, coolingType: "immersion" },
      { id: "hw-008-2", name: "Inference Fleet", hardwareType: "nvidia_h100", gpuCount: 512, vramTotalTB: 40.96, tflopsCapacity: 1015808, powerDrawKW: 358.4, coolingType: "liquid" },
      { id: "hw-008-3", name: "Embedding Cluster", hardwareType: "nvidia_l40s", gpuCount: 256, vramTotalTB: 12.29, tflopsCapacity: 89292, powerDrawKW: 76.8, coolingType: "air" },
    ],
    models: [
      { id: "mod-008-1", name: "Command R+", family: "custom", parametersBillions: 104, quantization: "FP16", contextLength: 128000, specialization: "RAG & enterprise", finetuned: false },
      { id: "mod-008-2", name: "Command R", family: "custom", parametersBillions: 35, quantization: "FP16", contextLength: 128000, specialization: "General purpose", finetuned: false },
      { id: "mod-008-3", name: "Embed v3", family: "custom", parametersBillions: 0.3, quantization: "FP16", contextLength: 512, specialization: "Text embeddings", finetuned: false },
      { id: "mod-008-4", name: "Rerank v3", family: "custom", parametersBillions: 0.5, quantization: "FP16", contextLength: 4096, specialization: "Search reranking", finetuned: false },
    ],
    agents: [
      { id: "agent-008-1", name: "CommandAgent", type: "orchestrator", description: "Enterprise RAG and tool-use agent platform", modelUsed: "Command R+", framework: "custom", useCases: ["Document Q&A", "Tool orchestration", "Multi-step reasoning"], monthlyQueries: 850000000, accuracy: 94.2 },
      { id: "agent-008-2", name: "EmbedAPI", type: "data_analysis", description: "Semantic search and embedding generation", modelUsed: "Embed v3", framework: "custom", useCases: ["Semantic search", "Clustering", "Classification"], monthlyQueries: 2500000000, accuracy: 97.8 },
      { id: "agent-008-3", name: "RerankService", type: "research", description: "Search result reranking for improved relevance", modelUsed: "Rerank v3", framework: "custom", useCases: ["Search optimization", "RAG improvement", "Result filtering"], monthlyQueries: 1200000000, accuracy: 96.5 },
    ],
    totalGPUs: 1792,
    monthlyInferences: 4550000000,
    avgLatencyMs: 180,
    uptime: 99.95,
  },
];

// Helper functions
export const getAgentTypeLabel = (type: AgentType): string => {
  const labels: Record<AgentType, string> = {
    coding: 'Coding Assistant',
    cybersecurity: 'Cybersecurity',
    data_analysis: 'Data Analysis',
    customer_service: 'Customer Service',
    document_processing: 'Document Processing',
    research: 'Research & Analysis',
    multimodal: 'Multimodal',
    orchestrator: 'Multi-Agent Orchestrator',
  };
  return labels[type];
};

export const getAgentTypeColor = (type: AgentType): string => {
  const colors: Record<AgentType, string> = {
    coding: '#9B59B6',
    cybersecurity: '#E74C3C',
    data_analysis: '#3498DB',
    customer_service: '#2ECC71',
    document_processing: '#F1C40F',
    research: '#E67E22',
    multimodal: '#1ABC9C',
    orchestrator: '#FF6B35',
  };
  return colors[type];
};

export const getHardwareLabel = (type: HardwareType): string => {
  const labels: Record<HardwareType, string> = {
    nvidia_h100: 'NVIDIA H100',
    nvidia_a100: 'NVIDIA A100',
    nvidia_l40s: 'NVIDIA L40S',
    nvidia_rtx_4090: 'NVIDIA RTX 4090',
    amd_mi300x: 'AMD MI300X',
    intel_gaudi2: 'Intel Gaudi2',
    custom_asic: 'Custom ASIC',
  };
  return labels[type];
};

export const getFrameworkLabel = (framework: Framework): string => {
  const labels: Record<Framework, string> = {
    langchain: 'LangChain',
    llamaindex: 'LlamaIndex',
    autogen: 'AutoGen',
    crewai: 'CrewAI',
    haystack: 'Haystack',
    semantic_kernel: 'Semantic Kernel',
    dspy: 'DSPy',
    custom: 'Custom Framework',
  };
  return labels[framework];
};

export const getModelFamilyLabel = (family: ModelFamily): string => {
  const labels: Record<ModelFamily, string> = {
    llama: 'Meta Llama',
    mistral: 'Mistral AI',
    mixtral: 'Mixtral MoE',
    falcon: 'TII Falcon',
    qwen: 'Alibaba Qwen',
    deepseek: 'DeepSeek',
    phi: 'Microsoft Phi',
    gemma: 'Google Gemma',
    codellama: 'Code Llama',
    starcoder: 'StarCoder',
    custom: 'Custom Model',
  };
  return labels[family];
};

export const getStatusColor = (status: DeploymentStatus): string => {
  const colors: Record<DeploymentStatus, string> = {
    active: '#2ECC71',
    scaling: '#3498DB',
    pilot: '#F1C40F',
    planned: '#95A5A6',
  };
  return colors[status];
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};
