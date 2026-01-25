// Energy & Resource Management Module Data

export type EnergySource = 'solar' | 'wind' | 'hydro' | 'nuclear' | 'natural_gas' | 'coal' | 'biomass' | 'geothermal';
export type GridStatus = 'stable' | 'stressed' | 'critical' | 'maintenance';
export type StorageType = 'battery' | 'pumped_hydro' | 'compressed_air' | 'hydrogen';

export interface PowerPlant {
  id: string;
  name: string;
  type: EnergySource;
  company: string;
  location: string;
  province: string;
  coordinates: { lat: number; lng: number };
  
  // Capacity
  capacityMW: number;
  currentOutputMW: number;
  capacityFactor: number; // percentage
  
  // Efficiency
  efficiency: number; // percentage
  carbonIntensity: number; // g CO2/kWh
  
  // Status
  status: GridStatus;
  lastMaintenance: string;
  uptime: number; // percentage
  
  // Agents
  assignedAgents: string[];
}

export interface EnergyStorage {
  id: string;
  name: string;
  type: StorageType;
  location: string;
  province: string;
  coordinates: { lat: number; lng: number };
  
  capacityMWh: number;
  currentChargeMWh: number;
  chargeRate: number; // MW
  dischargeRate: number; // MW
  efficiency: number; // round-trip percentage
  cyclesRemaining: number;
  status: GridStatus;
}

export interface EnergyAgent {
  id: string;
  name: string;
  type: 'demand_forecast' | 'grid_optimizer' | 'renewable_predictor' | 'storage_manager' | 'price_forecaster' | 'outage_predictor' | 'load_balancer';
  description: string;
  model: string;
  framework: string;
  capabilities: string[];
  plantsManaged: number;
  decisionsPerHour: number;
  accuracyRate: number;
  savingsGeneratedCAD: number; // millions
  status: 'active' | 'training' | 'standby';
}

export interface EnergyCompany {
  id: string;
  name: string;
  type: 'utility' | 'generator' | 'transmission' | 'distributor' | 'renewable';
  headquarters: string;
  totalCapacityMW: number;
  renewablePercent: number;
  customersServed: number;
  annualRevenueB: number;
  description: string;
  
  plants: PowerPlant[];
  storage: EnergyStorage[];
  agents: EnergyAgent[];
  
  // Grid metrics
  avgGridReliability: number;
  peakDemandMW: number;
  reserveMargin: number;
}

// Real-time grid data for charts
export const gridLoadData = [
  { time: '00:00', demand: 12500, supply: 13200, renewable: 4800, storage: -200 },
  { time: '02:00', demand: 11200, supply: 12000, renewable: 4200, storage: -400 },
  { time: '04:00', demand: 10800, supply: 11500, renewable: 3800, storage: -300 },
  { time: '06:00', demand: 13500, supply: 14000, renewable: 5200, storage: 0 },
  { time: '08:00', demand: 18200, supply: 18500, renewable: 7500, storage: 200 },
  { time: '10:00', demand: 21500, supply: 22000, renewable: 9800, storage: 500 },
  { time: '12:00', demand: 23000, supply: 23500, renewable: 11200, storage: 800 },
  { time: '14:00', demand: 24500, supply: 25000, renewable: 10500, storage: 600 },
  { time: '16:00', demand: 25800, supply: 26200, renewable: 8200, storage: 400 },
  { time: '18:00', demand: 26500, supply: 27000, renewable: 5500, storage: -200 },
  { time: '20:00', demand: 22000, supply: 22500, renewable: 3200, storage: -800 },
  { time: '22:00', demand: 16500, supply: 17000, renewable: 4000, storage: -500 },
];

export const energyMixData = [
  { source: 'Hydro', capacity: 42500, generation: 38200, color: '#3498DB' },
  { source: 'Nuclear', capacity: 13500, generation: 12800, color: '#9B59B6' },
  { source: 'Natural Gas', capacity: 18200, generation: 8500, color: '#E67E22' },
  { source: 'Wind', capacity: 15800, generation: 6200, color: '#1ABC9C' },
  { source: 'Solar', capacity: 8500, generation: 5800, color: '#F1C40F' },
  { source: 'Coal', capacity: 4200, generation: 1200, color: '#7F8C8D' },
  { source: 'Biomass', capacity: 2800, generation: 2100, color: '#2ECC71' },
];

export const priceData = [
  { hour: '00:00', price: 28.5, forecast: 29.2 },
  { hour: '02:00', price: 22.1, forecast: 23.5 },
  { hour: '04:00', price: 18.5, forecast: 19.8 },
  { hour: '06:00', price: 32.4, forecast: 31.2 },
  { hour: '08:00', price: 48.2, forecast: 45.8 },
  { hour: '10:00', price: 52.8, forecast: 54.2 },
  { hour: '12:00', price: 58.5, forecast: 56.8 },
  { hour: '14:00', price: 65.2, forecast: 62.5 },
  { hour: '16:00', price: 72.8, forecast: 68.5 },
  { hour: '18:00', price: 85.5, forecast: 82.2 },
  { hour: '20:00', price: 62.2, forecast: 65.8 },
  { hour: '22:00', price: 38.5, forecast: 42.2 },
];

export const monthlyGenerationData = [
  { month: 'Jan', hydro: 8500, nuclear: 2800, gas: 2200, wind: 1800, solar: 800 },
  { month: 'Feb', hydro: 7800, nuclear: 2750, gas: 2400, wind: 1900, solar: 1000 },
  { month: 'Mar', hydro: 8200, nuclear: 2820, gas: 1800, wind: 2100, solar: 1500 },
  { month: 'Apr', hydro: 9500, nuclear: 2650, gas: 1200, wind: 2400, solar: 2200 },
  { month: 'May', hydro: 10200, nuclear: 2200, gas: 800, wind: 2200, solar: 2800 },
  { month: 'Jun', hydro: 9800, nuclear: 2100, gas: 1500, wind: 1800, solar: 3200 },
  { month: 'Jul', hydro: 8500, nuclear: 2000, gas: 2800, wind: 1500, solar: 3500 },
  { month: 'Aug', hydro: 7800, nuclear: 2200, gas: 3200, wind: 1600, solar: 3200 },
  { month: 'Sep', hydro: 8200, nuclear: 2500, gas: 2000, wind: 2000, solar: 2500 },
  { month: 'Oct', hydro: 8800, nuclear: 2700, gas: 1500, wind: 2200, solar: 1800 },
  { month: 'Nov', hydro: 8500, nuclear: 2800, gas: 1800, wind: 2000, solar: 1000 },
  { month: 'Dec', hydro: 8200, nuclear: 2850, gas: 2500, wind: 1700, solar: 600 },
];

// Energy companies with full data
export const energyCompanies: EnergyCompany[] = [
  {
    id: 'energy-001',
    name: 'Hydro-Québec',
    type: 'utility',
    headquarters: 'Montreal, QC',
    totalCapacityMW: 37310,
    renewablePercent: 99.8,
    customersServed: 4500000,
    annualRevenueB: 15.2,
    description: 'One of the largest hydroelectric power producers in the world, supplying clean energy to Quebec and neighboring regions.',
    avgGridReliability: 99.97,
    peakDemandMW: 39500,
    reserveMargin: 18.5,
    plants: [
      {
        id: 'plant-001',
        name: 'Robert-Bourassa Generating Station',
        type: 'hydro',
        company: 'Hydro-Québec',
        location: 'James Bay, QC',
        province: 'QC',
        coordinates: { lat: 53.7833, lng: -77.45 },
        capacityMW: 5616,
        currentOutputMW: 4850,
        capacityFactor: 86.4,
        efficiency: 92,
        carbonIntensity: 2,
        status: 'stable',
        lastMaintenance: '2024-01-15',
        uptime: 99.8,
        assignedAgents: ['agent-energy-001', 'agent-energy-002'],
      },
      {
        id: 'plant-002',
        name: 'La Grande-4',
        type: 'hydro',
        company: 'Hydro-Québec',
        location: 'James Bay, QC',
        province: 'QC',
        coordinates: { lat: 53.9167, lng: -73.4667 },
        capacityMW: 2779,
        currentOutputMW: 2450,
        capacityFactor: 88.2,
        efficiency: 91,
        carbonIntensity: 2,
        status: 'stable',
        lastMaintenance: '2024-02-20',
        uptime: 99.6,
        assignedAgents: ['agent-energy-001', 'agent-energy-003'],
      },
      {
        id: 'plant-003',
        name: 'Manic-5',
        type: 'hydro',
        company: 'Hydro-Québec',
        location: 'Manicouagan, QC',
        province: 'QC',
        coordinates: { lat: 50.65, lng: -68.7333 },
        capacityMW: 2660,
        currentOutputMW: 2200,
        capacityFactor: 82.7,
        efficiency: 90,
        carbonIntensity: 3,
        status: 'stable',
        lastMaintenance: '2024-03-10',
        uptime: 99.4,
        assignedAgents: ['agent-energy-002', 'agent-energy-004'],
      },
    ],
    storage: [
      {
        id: 'storage-001',
        name: 'La Grande Reservoir System',
        type: 'pumped_hydro',
        location: 'James Bay, QC',
        province: 'QC',
        coordinates: { lat: 53.8, lng: -77.0 },
        capacityMWh: 175000,
        currentChargeMWh: 142000,
        chargeRate: 2000,
        dischargeRate: 5000,
        efficiency: 82,
        cyclesRemaining: 999999,
        status: 'stable',
      },
    ],
    agents: [
      {
        id: 'agent-energy-001',
        name: 'HydroPredict',
        type: 'renewable_predictor',
        description: 'Predicts water inflows and optimizes reservoir management for maximum generation.',
        model: 'HydroNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Water inflow prediction', 'Snowmelt modeling', 'Reservoir optimization', 'Seasonal planning', 'Flood management'],
        plantsManaged: 63,
        decisionsPerHour: 120,
        accuracyRate: 97.5,
        savingsGeneratedCAD: 85,
        status: 'active',
      },
      {
        id: 'agent-energy-002',
        name: 'GridMaster QC',
        type: 'grid_optimizer',
        description: 'Optimizes power flow across Quebec\'s transmission network.',
        model: 'GridFlow-XL',
        framework: 'PyTorch',
        capabilities: ['Load balancing', 'Transmission optimization', 'Congestion management', 'Loss reduction', 'Stability analysis'],
        plantsManaged: 63,
        decisionsPerHour: 500,
        accuracyRate: 99.2,
        savingsGeneratedCAD: 120,
        status: 'active',
      },
      {
        id: 'agent-energy-003',
        name: 'DemandAI QC',
        type: 'demand_forecast',
        description: 'Forecasts electricity demand across Quebec with weather integration.',
        model: 'DemandNet-7B',
        framework: 'PyTorch',
        capabilities: ['Short-term forecast', 'Peak prediction', 'Weather integration', 'Event detection', 'Load profiling'],
        plantsManaged: 63,
        decisionsPerHour: 60,
        accuracyRate: 96.8,
        savingsGeneratedCAD: 45,
        status: 'active',
      },
      {
        id: 'agent-energy-004',
        name: 'ExportOptimizer',
        type: 'price_forecaster',
        description: 'Optimizes electricity exports to neighboring markets for maximum revenue.',
        model: 'PriceNet-7B',
        framework: 'Custom',
        capabilities: ['Price forecasting', 'Export scheduling', 'Market analysis', 'Contract optimization', 'Revenue maximization'],
        plantsManaged: 10,
        decisionsPerHour: 30,
        accuracyRate: 94.5,
        savingsGeneratedCAD: 200,
        status: 'active',
      },
    ],
  },
  {
    id: 'energy-002',
    name: 'Ontario Power Generation',
    type: 'generator',
    headquarters: 'Toronto, ON',
    totalCapacityMW: 16500,
    renewablePercent: 66,
    customersServed: 0,
    annualRevenueB: 6.8,
    description: 'Ontario\'s largest electricity generator with diverse portfolio including nuclear, hydro, and gas.',
    avgGridReliability: 99.5,
    peakDemandMW: 0,
    reserveMargin: 0,
    plants: [
      {
        id: 'plant-004',
        name: 'Bruce Nuclear Generating Station',
        type: 'nuclear',
        company: 'OPG/Bruce Power',
        location: 'Tiverton, ON',
        province: 'ON',
        coordinates: { lat: 44.3167, lng: -81.5833 },
        capacityMW: 6384,
        currentOutputMW: 5950,
        capacityFactor: 93.2,
        efficiency: 33,
        carbonIntensity: 5,
        status: 'stable',
        lastMaintenance: '2024-02-01',
        uptime: 98.5,
        assignedAgents: ['agent-energy-005', 'agent-energy-006'],
      },
      {
        id: 'plant-005',
        name: 'Darlington Nuclear',
        type: 'nuclear',
        company: 'OPG',
        location: 'Clarington, ON',
        province: 'ON',
        coordinates: { lat: 43.8731, lng: -78.7167 },
        capacityMW: 3512,
        currentOutputMW: 3280,
        capacityFactor: 93.4,
        efficiency: 34,
        carbonIntensity: 5,
        status: 'stable',
        lastMaintenance: '2024-03-15',
        uptime: 99.1,
        assignedAgents: ['agent-energy-005', 'agent-energy-007'],
      },
      {
        id: 'plant-006',
        name: 'Niagara Falls Hydro Complex',
        type: 'hydro',
        company: 'OPG',
        location: 'Niagara Falls, ON',
        province: 'ON',
        coordinates: { lat: 43.0896, lng: -79.0849 },
        capacityMW: 2100,
        currentOutputMW: 1650,
        capacityFactor: 78.6,
        efficiency: 90,
        carbonIntensity: 4,
        status: 'stable',
        lastMaintenance: '2024-01-25',
        uptime: 99.2,
        assignedAgents: ['agent-energy-006', 'agent-energy-008'],
      },
    ],
    storage: [
      {
        id: 'storage-002',
        name: 'Nanticoke Battery Storage',
        type: 'battery',
        location: 'Nanticoke, ON',
        province: 'ON',
        coordinates: { lat: 42.8, lng: -80.05 },
        capacityMWh: 250,
        currentChargeMWh: 180,
        chargeRate: 50,
        dischargeRate: 50,
        efficiency: 92,
        cyclesRemaining: 8500,
        status: 'stable',
      },
    ],
    agents: [
      {
        id: 'agent-energy-005',
        name: 'NuclearOps AI',
        type: 'grid_optimizer',
        description: 'Optimizes nuclear plant operations for maximum safety and output.',
        model: 'NuclearNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Reactor optimization', 'Fuel management', 'Safety monitoring', 'Outage planning', 'Efficiency analysis'],
        plantsManaged: 18,
        decisionsPerHour: 200,
        accuracyRate: 99.8,
        savingsGeneratedCAD: 65,
        status: 'active',
      },
      {
        id: 'agent-energy-006',
        name: 'OntarioGrid AI',
        type: 'load_balancer',
        description: 'Balances load across Ontario\'s diverse generation portfolio.',
        model: 'LoadBalance-XL',
        framework: 'PyTorch',
        capabilities: ['Load balancing', 'Reserve management', 'Frequency control', 'Contingency planning', 'Market dispatch'],
        plantsManaged: 58,
        decisionsPerHour: 800,
        accuracyRate: 98.5,
        savingsGeneratedCAD: 95,
        status: 'active',
      },
      {
        id: 'agent-energy-007',
        name: 'OutagePredict ON',
        type: 'outage_predictor',
        description: 'Predicts and prevents equipment failures across the fleet.',
        model: 'OutageNet-7B',
        framework: 'Custom',
        capabilities: ['Failure prediction', 'Maintenance scheduling', 'Spare parts', 'Crew dispatch', 'Impact assessment'],
        plantsManaged: 58,
        decisionsPerHour: 50,
        accuracyRate: 92.5,
        savingsGeneratedCAD: 35,
        status: 'active',
      },
      {
        id: 'agent-energy-008',
        name: 'StorageManager ON',
        type: 'storage_manager',
        description: 'Optimizes battery storage for peak shaving and grid stability.',
        model: 'BatteryNet-7B',
        framework: 'PyTorch',
        capabilities: ['Charge/discharge optimization', 'Arbitrage', 'Peak shaving', 'Frequency regulation', 'Lifecycle management'],
        plantsManaged: 8,
        decisionsPerHour: 120,
        accuracyRate: 96.2,
        savingsGeneratedCAD: 25,
        status: 'active',
      },
    ],
  },
  {
    id: 'energy-003',
    name: 'TransAlta Renewables',
    type: 'renewable',
    headquarters: 'Calgary, AB',
    totalCapacityMW: 4500,
    renewablePercent: 85,
    customersServed: 0,
    annualRevenueB: 1.2,
    description: 'Leading renewable energy company with wind, solar, and hydro assets across Canada.',
    avgGridReliability: 98.8,
    peakDemandMW: 0,
    reserveMargin: 0,
    plants: [
      {
        id: 'plant-007',
        name: 'Summerview Wind Farm',
        type: 'wind',
        company: 'TransAlta',
        location: 'Pincher Creek, AB',
        province: 'AB',
        coordinates: { lat: 49.4833, lng: -114.0 },
        capacityMW: 136,
        currentOutputMW: 95,
        capacityFactor: 42,
        efficiency: 98,
        carbonIntensity: 11,
        status: 'stable',
        lastMaintenance: '2024-03-05',
        uptime: 97.5,
        assignedAgents: ['agent-energy-009', 'agent-energy-010'],
      },
      {
        id: 'plant-008',
        name: 'Windrise Wind Farm',
        type: 'wind',
        company: 'TransAlta',
        location: 'Willow Creek, AB',
        province: 'AB',
        coordinates: { lat: 50.2, lng: -113.5 },
        capacityMW: 207,
        currentOutputMW: 85,
        capacityFactor: 38,
        efficiency: 97,
        carbonIntensity: 12,
        status: 'stable',
        lastMaintenance: '2024-02-18',
        uptime: 96.8,
        assignedAgents: ['agent-energy-009', 'agent-energy-011'],
      },
      {
        id: 'plant-009',
        name: 'Kent Hills Wind Farm',
        type: 'wind',
        company: 'TransAlta',
        location: 'Elgin, NB',
        province: 'NB',
        coordinates: { lat: 45.8333, lng: -65.0833 },
        capacityMW: 167,
        currentOutputMW: 72,
        capacityFactor: 35,
        efficiency: 96,
        carbonIntensity: 12,
        status: 'maintenance',
        lastMaintenance: '2024-04-15',
        uptime: 94.2,
        assignedAgents: ['agent-energy-010', 'agent-energy-011'],
      },
    ],
    storage: [
      {
        id: 'storage-003',
        name: 'WindCharger Battery',
        type: 'battery',
        location: 'Pincher Creek, AB',
        province: 'AB',
        coordinates: { lat: 49.5, lng: -114.0 },
        capacityMWh: 80,
        currentChargeMWh: 45,
        chargeRate: 20,
        dischargeRate: 20,
        efficiency: 90,
        cyclesRemaining: 7200,
        status: 'stable',
      },
    ],
    agents: [
      {
        id: 'agent-energy-009',
        name: 'WindCast AI',
        type: 'renewable_predictor',
        description: 'Forecasts wind generation using advanced meteorological models.',
        model: 'WindNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Wind speed prediction', 'Power curve optimization', 'Ramp forecasting', 'Wake modeling', 'Turbine dispatch'],
        plantsManaged: 18,
        decisionsPerHour: 180,
        accuracyRate: 94.2,
        savingsGeneratedCAD: 28,
        status: 'active',
      },
      {
        id: 'agent-energy-010',
        name: 'TurbineHealth AI',
        type: 'outage_predictor',
        description: 'Monitors turbine health and predicts maintenance needs.',
        model: 'TurbineNet-7B',
        framework: 'PyTorch',
        capabilities: ['Vibration analysis', 'Gearbox monitoring', 'Blade inspection', 'Predictive maintenance', 'Performance optimization'],
        plantsManaged: 18,
        decisionsPerHour: 60,
        accuracyRate: 91.8,
        savingsGeneratedCAD: 18,
        status: 'active',
      },
      {
        id: 'agent-energy-011',
        name: 'RenewableTrader',
        type: 'price_forecaster',
        description: 'Optimizes renewable energy sales into wholesale markets.',
        model: 'MarketNet-7B',
        framework: 'Custom',
        capabilities: ['Price forecasting', 'Bidding optimization', 'PPA management', 'REC trading', 'Revenue optimization'],
        plantsManaged: 18,
        decisionsPerHour: 24,
        accuracyRate: 93.5,
        savingsGeneratedCAD: 15,
        status: 'active',
      },
    ],
  },
];

// Agent type config
export const energyAgentConfig: Record<string, { label: string; color: string; icon: string }> = {
  demand_forecast: { label: 'Demand Forecast', color: '#3498DB', icon: 'TrendingUp' },
  grid_optimizer: { label: 'Grid Optimizer', color: '#2ECC71', icon: 'Zap' },
  renewable_predictor: { label: 'Renewable Predictor', color: '#F1C40F', icon: 'Sun' },
  storage_manager: { label: 'Storage Manager', color: '#9B59B6', icon: 'Battery' },
  price_forecaster: { label: 'Price Forecaster', color: '#E67E22', icon: 'DollarSign' },
  outage_predictor: { label: 'Outage Predictor', color: '#E74C3C', icon: 'AlertTriangle' },
  load_balancer: { label: 'Load Balancer', color: '#1ABC9C', icon: 'Scale' },
};

export const energySourceConfig: Record<EnergySource, { label: string; color: string; icon: string }> = {
  solar: { label: 'Solar', color: '#F1C40F', icon: 'Sun' },
  wind: { label: 'Wind', color: '#1ABC9C', icon: 'Wind' },
  hydro: { label: 'Hydro', color: '#3498DB', icon: 'Droplets' },
  nuclear: { label: 'Nuclear', color: '#9B59B6', icon: 'Atom' },
  natural_gas: { label: 'Natural Gas', color: '#E67E22', icon: 'Flame' },
  coal: { label: 'Coal', color: '#7F8C8D', icon: 'Mountain' },
  biomass: { label: 'Biomass', color: '#2ECC71', icon: 'Leaf' },
  geothermal: { label: 'Geothermal', color: '#E74C3C', icon: 'ThermometerSun' },
};

export const gridStatusConfig: Record<GridStatus, { label: string; color: string }> = {
  stable: { label: 'Stable', color: '#2ECC71' },
  stressed: { label: 'Stressed', color: '#F1C40F' },
  critical: { label: 'Critical', color: '#E74C3C' },
  maintenance: { label: 'Maintenance', color: '#9B59B6' },
};
