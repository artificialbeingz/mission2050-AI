// Environment Impact Module Data

export type EmissionType = 'co2' | 'methane' | 'nox' | 'particulate' | 'voc';
export type ImpactCategory = 'air_quality' | 'water' | 'land' | 'biodiversity' | 'waste' | 'carbon';
export type MonitoringStatus = 'normal' | 'elevated' | 'warning' | 'critical';

export interface EnvironmentSite {
  id: string;
  name: string;
  type: 'industrial' | 'mining' | 'energy' | 'datacenter' | 'manufacturing';
  company: string;
  location: string;
  province: string;
  coordinates: { lat: number; lng: number };
  
  // Emissions data
  annualCO2Tonnes: number;
  carbonIntensity: number; // kg CO2 per unit output
  renewableEnergyPercent: number;
  waterUsageML: number; // Megalitres
  wasteRecycledPercent: number;
  
  // Monitoring
  status: MonitoringStatus;
  lastInspection: string;
  complianceScore: number;
  
  // Agents assigned
  assignedAgents: string[];
}

export interface EnvironmentAgent {
  id: string;
  name: string;
  type: 'emissions_monitor' | 'water_quality' | 'biodiversity' | 'waste_tracker' | 'carbon_calculator' | 'compliance_checker' | 'predictive_alert';
  description: string;
  model: string;
  framework: string;
  capabilities: string[];
  sitesMonitored: number;
  alertsGenerated: number;
  accuracyRate: number;
  responseTime: string;
  status: 'active' | 'training' | 'maintenance';
}

export interface EnvironmentCompany {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  totalSites: number;
  totalEmissions: number; // Annual tonnes CO2
  emissionsTrend: number; // YoY change percent
  renewablePercent: number;
  esgScore: number;
  carbonNeutralTarget: string;
  description: string;
  
  sites: EnvironmentSite[];
  agents: EnvironmentAgent[];
  
  // Aggregate metrics
  avgComplianceScore: number;
  waterEfficiency: number;
  wasteReduction: number;
}

// Emission trend data for charts
export const emissionTrendData = [
  { year: '2019', actual: 125000, target: 130000, reduction: 0 },
  { year: '2020', actual: 118000, target: 125000, reduction: 5.6 },
  { year: '2021', actual: 108000, target: 120000, reduction: 8.5 },
  { year: '2022', actual: 95000, target: 115000, reduction: 12.0 },
  { year: '2023', actual: 82000, target: 110000, reduction: 13.7 },
  { year: '2024', actual: 72000, target: 100000, reduction: 12.2 },
  { year: '2025', actual: 65000, target: 90000, reduction: 9.7 },
];

export const monthlyEmissionsData = [
  { month: 'Jan', co2: 6200, methane: 450, nox: 120 },
  { month: 'Feb', co2: 5800, methane: 420, nox: 110 },
  { month: 'Mar', co2: 6400, methane: 480, nox: 130 },
  { month: 'Apr', co2: 5500, methane: 400, nox: 100 },
  { month: 'May', co2: 5200, methane: 380, nox: 95 },
  { month: 'Jun', co2: 4800, methane: 350, nox: 85 },
  { month: 'Jul', co2: 5000, methane: 360, nox: 90 },
  { month: 'Aug', co2: 5300, methane: 390, nox: 98 },
  { month: 'Sep', co2: 5100, methane: 375, nox: 92 },
  { month: 'Oct', co2: 5600, methane: 410, nox: 105 },
  { month: 'Nov', co2: 6000, methane: 440, nox: 115 },
  { month: 'Dec', co2: 6100, methane: 445, nox: 118 },
];

export const impactCategoryData = [
  { category: 'Carbon Footprint', score: 72, target: 85, color: '#3498DB' },
  { category: 'Water Management', score: 85, target: 90, color: '#1ABC9C' },
  { category: 'Waste Reduction', score: 78, target: 80, color: '#E67E22' },
  { category: 'Biodiversity', score: 65, target: 75, color: '#2ECC71' },
  { category: 'Air Quality', score: 82, target: 85, color: '#9B59B6' },
  { category: 'Land Restoration', score: 58, target: 70, color: '#F1C40F' },
];

// Sample companies with full data
export const environmentCompanies: EnvironmentCompany[] = [
  {
    id: 'env-comp-001',
    name: 'Teck Resources',
    industry: 'Mining',
    headquarters: 'Vancouver, BC',
    totalSites: 8,
    totalEmissions: 4200000,
    emissionsTrend: -12.5,
    renewablePercent: 42,
    esgScore: 74,
    carbonNeutralTarget: '2050',
    description: 'Diversified mining company committed to responsible resource development and environmental stewardship.',
    avgComplianceScore: 92,
    waterEfficiency: 85,
    wasteReduction: 68,
    sites: [
      {
        id: 'site-001',
        name: 'Highland Valley Copper',
        type: 'mining',
        company: 'Teck Resources',
        location: 'Logan Lake, BC',
        province: 'BC',
        coordinates: { lat: 50.4833, lng: -121.0333 },
        annualCO2Tonnes: 850000,
        carbonIntensity: 2.8,
        renewableEnergyPercent: 95,
        waterUsageML: 12500,
        wasteRecycledPercent: 72,
        status: 'normal',
        lastInspection: '2024-03-15',
        complianceScore: 94,
        assignedAgents: ['agent-env-001', 'agent-env-002'],
      },
      {
        id: 'site-002',
        name: 'Elkview Operations',
        type: 'mining',
        company: 'Teck Resources',
        location: 'Sparwood, BC',
        province: 'BC',
        coordinates: { lat: 49.7333, lng: -114.8833 },
        annualCO2Tonnes: 1200000,
        carbonIntensity: 3.2,
        renewableEnergyPercent: 88,
        waterUsageML: 8500,
        wasteRecycledPercent: 65,
        status: 'elevated',
        lastInspection: '2024-02-28',
        complianceScore: 88,
        assignedAgents: ['agent-env-001', 'agent-env-003'],
      },
      {
        id: 'site-003',
        name: 'Trail Operations',
        type: 'manufacturing',
        company: 'Teck Resources',
        location: 'Trail, BC',
        province: 'BC',
        coordinates: { lat: 49.0956, lng: -117.7117 },
        annualCO2Tonnes: 680000,
        carbonIntensity: 1.9,
        renewableEnergyPercent: 98,
        waterUsageML: 6200,
        wasteRecycledPercent: 85,
        status: 'normal',
        lastInspection: '2024-04-02',
        complianceScore: 96,
        assignedAgents: ['agent-env-002', 'agent-env-004'],
      },
    ],
    agents: [
      {
        id: 'agent-env-001',
        name: 'EmissionSentry',
        type: 'emissions_monitor',
        description: 'Real-time emissions monitoring and anomaly detection across all mining operations.',
        model: 'EnviroNet-13B',
        framework: 'TensorFlow',
        capabilities: ['CO2 tracking', 'Methane detection', 'Particulate monitoring', 'Anomaly alerts', 'Trend analysis'],
        sitesMonitored: 8,
        alertsGenerated: 156,
        accuracyRate: 97.2,
        responseTime: '< 30 seconds',
        status: 'active',
      },
      {
        id: 'agent-env-002',
        name: 'AquaGuard',
        type: 'water_quality',
        description: 'Monitors water quality in tailings ponds, streams, and groundwater systems.',
        model: 'WaterQuality-7B',
        framework: 'PyTorch',
        capabilities: ['pH monitoring', 'Metal concentration', 'Sediment analysis', 'Flow tracking', 'Contamination alerts'],
        sitesMonitored: 8,
        alertsGenerated: 42,
        accuracyRate: 98.5,
        responseTime: '< 1 minute',
        status: 'active',
      },
      {
        id: 'agent-env-003',
        name: 'CarbonTrack',
        type: 'carbon_calculator',
        description: 'Calculates and tracks carbon footprint across supply chain and operations.',
        model: 'CarbonCalc-XL',
        framework: 'Custom',
        capabilities: ['Scope 1/2/3 tracking', 'Carbon credits', 'Offset verification', 'Reduction planning', 'Reporting'],
        sitesMonitored: 8,
        alertsGenerated: 28,
        accuracyRate: 99.1,
        responseTime: '< 5 minutes',
        status: 'active',
      },
      {
        id: 'agent-env-004',
        name: 'WasteWise',
        type: 'waste_tracker',
        description: 'Tracks waste generation, recycling rates, and circular economy initiatives.',
        model: 'WasteNet-7B',
        framework: 'PyTorch',
        capabilities: ['Waste classification', 'Recycling optimization', 'Disposal tracking', 'Circular economy', 'Cost analysis'],
        sitesMonitored: 8,
        alertsGenerated: 35,
        accuracyRate: 95.8,
        responseTime: '< 2 minutes',
        status: 'active',
      },
    ],
  },
  {
    id: 'env-comp-002',
    name: 'Suncor Energy',
    industry: 'Oil & Gas',
    headquarters: 'Calgary, AB',
    totalSites: 12,
    totalEmissions: 18500000,
    emissionsTrend: -8.2,
    renewablePercent: 15,
    esgScore: 62,
    carbonNeutralTarget: '2050',
    description: 'Integrated energy company investing in carbon capture and renewable energy transition.',
    avgComplianceScore: 88,
    waterEfficiency: 72,
    wasteReduction: 55,
    sites: [
      {
        id: 'site-004',
        name: 'Oil Sands Base Plant',
        type: 'energy',
        company: 'Suncor Energy',
        location: 'Fort McMurray, AB',
        province: 'AB',
        coordinates: { lat: 57.0, lng: -111.4833 },
        annualCO2Tonnes: 8500000,
        carbonIntensity: 85.2,
        renewableEnergyPercent: 8,
        waterUsageML: 45000,
        wasteRecycledPercent: 42,
        status: 'elevated',
        lastInspection: '2024-03-20',
        complianceScore: 85,
        assignedAgents: ['agent-env-005', 'agent-env-006'],
      },
      {
        id: 'site-005',
        name: 'Fort Hills',
        type: 'mining',
        company: 'Suncor Energy',
        location: 'Fort McMurray, AB',
        province: 'AB',
        coordinates: { lat: 57.3167, lng: -111.6333 },
        annualCO2Tonnes: 4200000,
        carbonIntensity: 72.5,
        renewableEnergyPercent: 12,
        waterUsageML: 28000,
        wasteRecycledPercent: 48,
        status: 'warning',
        lastInspection: '2024-02-15',
        complianceScore: 82,
        assignedAgents: ['agent-env-005', 'agent-env-007'],
      },
      {
        id: 'site-006',
        name: 'Edmonton Refinery',
        type: 'industrial',
        company: 'Suncor Energy',
        location: 'Edmonton, AB',
        province: 'AB',
        coordinates: { lat: 53.5461, lng: -113.4938 },
        annualCO2Tonnes: 2100000,
        carbonIntensity: 45.8,
        renewableEnergyPercent: 22,
        waterUsageML: 15000,
        wasteRecycledPercent: 62,
        status: 'normal',
        lastInspection: '2024-04-05',
        complianceScore: 91,
        assignedAgents: ['agent-env-006', 'agent-env-008'],
      },
    ],
    agents: [
      {
        id: 'agent-env-005',
        name: 'FlareWatch',
        type: 'emissions_monitor',
        description: 'Monitors flaring activities and fugitive emissions at oil sands operations.',
        model: 'FlareNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Flare detection', 'Fugitive emissions', 'Venting tracking', 'Real-time alerts', 'Regulatory reporting'],
        sitesMonitored: 12,
        alertsGenerated: 385,
        accuracyRate: 94.8,
        responseTime: '< 15 seconds',
        status: 'active',
      },
      {
        id: 'agent-env-006',
        name: 'TailingsAI',
        type: 'water_quality',
        description: 'Advanced monitoring of tailings ponds and water treatment facilities.',
        model: 'TailingsNet-XL',
        framework: 'PyTorch',
        capabilities: ['Pond level monitoring', 'Seepage detection', 'Treatment efficiency', 'Reclamation tracking', 'Compliance'],
        sitesMonitored: 12,
        alertsGenerated: 128,
        accuracyRate: 96.2,
        responseTime: '< 45 seconds',
        status: 'active',
      },
      {
        id: 'agent-env-007',
        name: 'BiomeProtect',
        type: 'biodiversity',
        description: 'Monitors biodiversity impacts and tracks wildlife in operational areas.',
        model: 'BioVision-7B',
        framework: 'Custom',
        capabilities: ['Wildlife detection', 'Habitat monitoring', 'Migration tracking', 'Vegetation analysis', 'Impact assessment'],
        sitesMonitored: 8,
        alertsGenerated: 45,
        accuracyRate: 92.5,
        responseTime: '< 2 minutes',
        status: 'active',
      },
      {
        id: 'agent-env-008',
        name: 'CarbonCapture',
        type: 'carbon_calculator',
        description: 'Monitors carbon capture and storage (CCS) facilities and tracks sequestration.',
        model: 'CCSNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Injection monitoring', 'Sequestration tracking', 'Leak detection', 'Efficiency optimization', 'Credit calculation'],
        sitesMonitored: 4,
        alertsGenerated: 18,
        accuracyRate: 99.2,
        responseTime: '< 1 minute',
        status: 'active',
      },
    ],
  },
  {
    id: 'env-comp-003',
    name: 'Amazon Web Services Canada',
    industry: 'Data Centers',
    headquarters: 'Montreal, QC',
    totalSites: 6,
    totalEmissions: 450000,
    emissionsTrend: -25.5,
    renewablePercent: 85,
    esgScore: 88,
    carbonNeutralTarget: '2040',
    description: 'Cloud computing leader committed to 100% renewable energy and net-zero carbon operations.',
    avgComplianceScore: 96,
    waterEfficiency: 92,
    wasteReduction: 88,
    sites: [
      {
        id: 'site-007',
        name: 'Montreal Data Center',
        type: 'datacenter',
        company: 'AWS Canada',
        location: 'Montreal, QC',
        province: 'QC',
        coordinates: { lat: 45.5017, lng: -73.5673 },
        annualCO2Tonnes: 85000,
        carbonIntensity: 0.12,
        renewableEnergyPercent: 99,
        waterUsageML: 850,
        wasteRecycledPercent: 95,
        status: 'normal',
        lastInspection: '2024-04-10',
        complianceScore: 98,
        assignedAgents: ['agent-env-009', 'agent-env-010'],
      },
      {
        id: 'site-008',
        name: 'Calgary Data Center',
        type: 'datacenter',
        company: 'AWS Canada',
        location: 'Calgary, AB',
        province: 'AB',
        coordinates: { lat: 51.0447, lng: -114.0719 },
        annualCO2Tonnes: 120000,
        carbonIntensity: 0.18,
        renewableEnergyPercent: 78,
        waterUsageML: 920,
        wasteRecycledPercent: 92,
        status: 'normal',
        lastInspection: '2024-03-25',
        complianceScore: 95,
        assignedAgents: ['agent-env-009', 'agent-env-011'],
      },
    ],
    agents: [
      {
        id: 'agent-env-009',
        name: 'PUE Optimizer',
        type: 'emissions_monitor',
        description: 'Monitors Power Usage Effectiveness and optimizes data center energy efficiency.',
        model: 'DataCenterAI-7B',
        framework: 'TensorFlow',
        capabilities: ['PUE tracking', 'Cooling optimization', 'Load balancing', 'Renewable integration', 'Carbon accounting'],
        sitesMonitored: 6,
        alertsGenerated: 52,
        accuracyRate: 99.5,
        responseTime: '< 10 seconds',
        status: 'active',
      },
      {
        id: 'agent-env-010',
        name: 'WaterLoop',
        type: 'water_quality',
        description: 'Manages cooling water systems and tracks water efficiency metrics.',
        model: 'CoolingNet-XL',
        framework: 'PyTorch',
        capabilities: ['Cooling efficiency', 'Water recycling', 'Chemical treatment', 'Evaporation tracking', 'WUE optimization'],
        sitesMonitored: 6,
        alertsGenerated: 28,
        accuracyRate: 98.8,
        responseTime: '< 30 seconds',
        status: 'active',
      },
      {
        id: 'agent-env-011',
        name: 'E-WasteTrack',
        type: 'waste_tracker',
        description: 'Tracks electronic waste and ensures responsible recycling of hardware.',
        model: 'EWasteNet-7B',
        framework: 'Custom',
        capabilities: ['Asset tracking', 'Lifecycle management', 'Recycling verification', 'Circular economy', 'Compliance'],
        sitesMonitored: 6,
        alertsGenerated: 15,
        accuracyRate: 97.5,
        responseTime: '< 5 minutes',
        status: 'active',
      },
    ],
  },
];

// Agent type config
export const agentTypeConfig: Record<string, { label: string; color: string; icon: string }> = {
  emissions_monitor: { label: 'Emissions Monitor', color: '#E74C3C', icon: 'Wind' },
  water_quality: { label: 'Water Quality', color: '#3498DB', icon: 'Droplets' },
  biodiversity: { label: 'Biodiversity', color: '#2ECC71', icon: 'Leaf' },
  waste_tracker: { label: 'Waste Tracker', color: '#E67E22', icon: 'Trash2' },
  carbon_calculator: { label: 'Carbon Calculator', color: '#9B59B6', icon: 'Calculator' },
  compliance_checker: { label: 'Compliance Checker', color: '#1ABC9C', icon: 'Shield' },
  predictive_alert: { label: 'Predictive Alert', color: '#F1C40F', icon: 'AlertTriangle' },
};

export const statusConfig: Record<MonitoringStatus, { label: string; color: string }> = {
  normal: { label: 'Normal', color: '#2ECC71' },
  elevated: { label: 'Elevated', color: '#F1C40F' },
  warning: { label: 'Warning', color: '#E67E22' },
  critical: { label: 'Critical', color: '#E74C3C' },
};
