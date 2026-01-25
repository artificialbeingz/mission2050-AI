// Predictive Maintenance Module Data

export type EquipmentType = 
  | 'turbine' 
  | 'compressor' 
  | 'pump' 
  | 'conveyor' 
  | 'transformer' 
  | 'motor' 
  | 'generator' 
  | 'hvac' 
  | 'boiler'
  | 'crusher';

export type HealthStatus = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
export type AlertPriority = 'low' | 'medium' | 'high' | 'critical';
export type MaintenanceType = 'preventive' | 'predictive' | 'corrective' | 'emergency';

export interface Equipment {
  id: string;
  name: string;
  type: EquipmentType;
  model: string;
  manufacturer: string;
  installDate: string;
  siteId: string;
  
  // Status
  healthScore: number; // 0-100
  healthStatus: HealthStatus;
  lastMaintenance: string;
  nextScheduledMaintenance: string;
  operatingHours: number;
  
  // Performance
  efficiency: number; // percentage
  vibrationLevel: number; // mm/s
  temperature: number; // celsius
  pressure?: number; // bar
  
  // Predictions
  predictedFailureDate?: string;
  remainingUsefulLife: number; // days
  failureProbability: number; // percentage
  
  // Alerts
  activeAlerts: number;
}

export interface MaintenanceSite {
  id: string;
  name: string;
  type: 'plant' | 'mine' | 'refinery' | 'datacenter' | 'warehouse' | 'factory';
  company: string;
  location: string;
  province: string;
  coordinates: { lat: number; lng: number };
  
  totalEquipment: number;
  criticalEquipment: number;
  avgHealthScore: number;
  maintenanceBudgetM: number;
  
  equipment: Equipment[];
  assignedAgents: string[];
}

export interface MaintenanceAgent {
  id: string;
  name: string;
  type: 'anomaly_detector' | 'failure_predictor' | 'scheduler' | 'parts_optimizer' | 'crew_dispatcher' | 'cost_analyzer' | 'sensor_fusion';
  description: string;
  model: string;
  framework: string;
  capabilities: string[];
  equipmentMonitored: number;
  predictionAccuracy: number;
  falsePositiveRate: number;
  avgLeadTime: string; // prediction lead time before failure
  costSavingsM: number;
  status: 'active' | 'training' | 'standby';
}

export interface MaintenanceAlert {
  id: string;
  equipmentId: string;
  equipmentName: string;
  siteId: string;
  siteName: string;
  type: 'vibration' | 'temperature' | 'pressure' | 'efficiency' | 'anomaly' | 'wear';
  priority: AlertPriority;
  message: string;
  detectedAt: string;
  predictedFailure?: string;
  recommendedAction: string;
  estimatedCost: number;
  status: 'new' | 'acknowledged' | 'in_progress' | 'resolved';
}

export interface MaintenanceCompany {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  totalEquipment: number;
  avgHealthScore: number;
  maintenanceBudgetM: number;
  aiSavingsM: number;
  unplannedDowntimeReduction: number; // percentage
  description: string;
  
  sites: MaintenanceSite[];
  agents: MaintenanceAgent[];
  alerts: MaintenanceAlert[];
}

// Health trend data
export const healthTrendData = [
  { month: 'Jan', avgHealth: 82, criticalCount: 12, alertsResolved: 45 },
  { month: 'Feb', avgHealth: 84, criticalCount: 10, alertsResolved: 52 },
  { month: 'Mar', avgHealth: 83, criticalCount: 11, alertsResolved: 48 },
  { month: 'Apr', avgHealth: 85, criticalCount: 8, alertsResolved: 55 },
  { month: 'May', avgHealth: 87, criticalCount: 6, alertsResolved: 62 },
  { month: 'Jun', avgHealth: 88, criticalCount: 5, alertsResolved: 58 },
  { month: 'Jul', avgHealth: 86, criticalCount: 7, alertsResolved: 51 },
  { month: 'Aug', avgHealth: 85, criticalCount: 9, alertsResolved: 54 },
  { month: 'Sep', avgHealth: 87, criticalCount: 6, alertsResolved: 60 },
  { month: 'Oct', avgHealth: 89, criticalCount: 4, alertsResolved: 65 },
  { month: 'Nov', avgHealth: 90, criticalCount: 3, alertsResolved: 68 },
  { month: 'Dec', avgHealth: 88, criticalCount: 5, alertsResolved: 62 },
];

export const maintenanceCostData = [
  { month: 'Jan', preventive: 180, predictive: 120, corrective: 85, emergency: 45 },
  { month: 'Feb', preventive: 175, predictive: 125, corrective: 72, emergency: 38 },
  { month: 'Mar', preventive: 185, predictive: 130, corrective: 68, emergency: 32 },
  { month: 'Apr', preventive: 170, predictive: 140, corrective: 55, emergency: 25 },
  { month: 'May', preventive: 165, predictive: 145, corrective: 48, emergency: 20 },
  { month: 'Jun', preventive: 160, predictive: 150, corrective: 42, emergency: 18 },
  { month: 'Jul', preventive: 175, predictive: 145, corrective: 52, emergency: 22 },
  { month: 'Aug', preventive: 180, predictive: 142, corrective: 58, emergency: 28 },
  { month: 'Sep', preventive: 168, predictive: 148, corrective: 45, emergency: 19 },
  { month: 'Oct', preventive: 158, predictive: 155, corrective: 38, emergency: 15 },
  { month: 'Nov', preventive: 155, predictive: 160, corrective: 32, emergency: 12 },
  { month: 'Dec', preventive: 162, predictive: 158, corrective: 35, emergency: 14 },
];

export const equipmentTypeDistribution = [
  { type: 'Turbines', count: 45, avgHealth: 85, criticalCount: 3, color: '#3498DB' },
  { type: 'Compressors', count: 78, avgHealth: 82, criticalCount: 5, color: '#E67E22' },
  { type: 'Pumps', count: 124, avgHealth: 88, criticalCount: 2, color: '#2ECC71' },
  { type: 'Conveyors', count: 56, avgHealth: 79, criticalCount: 4, color: '#9B59B6' },
  { type: 'Transformers', count: 35, avgHealth: 91, criticalCount: 1, color: '#F1C40F' },
  { type: 'Motors', count: 189, avgHealth: 86, criticalCount: 6, color: '#1ABC9C' },
  { type: 'Generators', count: 28, avgHealth: 84, criticalCount: 2, color: '#E74C3C' },
  { type: 'HVAC', count: 95, avgHealth: 87, criticalCount: 3, color: '#7F8C8D' },
];

export const predictionAccuracyData = [
  { range: '0-7 days', accuracy: 95.2, predictions: 450 },
  { range: '7-14 days', accuracy: 91.8, predictions: 380 },
  { range: '14-30 days', accuracy: 87.5, predictions: 520 },
  { range: '30-60 days', accuracy: 82.1, predictions: 290 },
  { range: '60-90 days', accuracy: 75.8, predictions: 180 },
];

// Maintenance companies with full data
export const maintenanceCompanies: MaintenanceCompany[] = [
  {
    id: 'maint-001',
    name: 'Canadian Natural Resources',
    industry: 'Oil & Gas',
    headquarters: 'Calgary, AB',
    totalEquipment: 8500,
    avgHealthScore: 86,
    maintenanceBudgetM: 450,
    aiSavingsM: 85,
    unplannedDowntimeReduction: 42,
    description: 'One of Canada\'s largest oil and gas producers using AI-driven predictive maintenance across all operations.',
    sites: [
      {
        id: 'site-m001',
        name: 'Horizon Oil Sands',
        type: 'mine',
        company: 'Canadian Natural Resources',
        location: 'Fort McMurray, AB',
        province: 'AB',
        coordinates: { lat: 57.3333, lng: -111.7833 },
        totalEquipment: 2800,
        criticalEquipment: 180,
        avgHealthScore: 84,
        maintenanceBudgetM: 125,
        equipment: [
          {
            id: 'eq-001',
            name: 'Primary Crusher #1',
            type: 'crusher',
            model: 'Metso HP900',
            manufacturer: 'Metso Outotec',
            installDate: '2018-05-15',
            siteId: 'site-m001',
            healthScore: 78,
            healthStatus: 'fair',
            lastMaintenance: '2024-03-01',
            nextScheduledMaintenance: '2024-06-01',
            operatingHours: 42500,
            efficiency: 88,
            vibrationLevel: 4.2,
            temperature: 68,
            predictedFailureDate: '2024-08-15',
            remainingUsefulLife: 85,
            failureProbability: 35,
            activeAlerts: 2,
          },
          {
            id: 'eq-002',
            name: 'Haul Truck Engine #24',
            type: 'motor',
            model: 'Cat 3516C',
            manufacturer: 'Caterpillar',
            installDate: '2020-02-10',
            siteId: 'site-m001',
            healthScore: 92,
            healthStatus: 'excellent',
            lastMaintenance: '2024-04-10',
            nextScheduledMaintenance: '2024-07-10',
            operatingHours: 18500,
            efficiency: 94,
            vibrationLevel: 1.8,
            temperature: 92,
            remainingUsefulLife: 280,
            failureProbability: 5,
            activeAlerts: 0,
          },
          {
            id: 'eq-003',
            name: 'Slurry Pump #12',
            type: 'pump',
            model: 'Warman 450',
            manufacturer: 'Weir Minerals',
            installDate: '2019-08-20',
            siteId: 'site-m001',
            healthScore: 65,
            healthStatus: 'poor',
            lastMaintenance: '2024-02-15',
            nextScheduledMaintenance: '2024-05-15',
            operatingHours: 28500,
            efficiency: 76,
            vibrationLevel: 6.8,
            temperature: 85,
            pressure: 12.5,
            predictedFailureDate: '2024-05-28',
            remainingUsefulLife: 25,
            failureProbability: 72,
            activeAlerts: 4,
          },
        ],
        assignedAgents: ['agent-maint-001', 'agent-maint-002', 'agent-maint-003'],
      },
      {
        id: 'site-m002',
        name: 'Primrose Thermal',
        type: 'plant',
        company: 'Canadian Natural Resources',
        location: 'Cold Lake, AB',
        province: 'AB',
        coordinates: { lat: 54.4642, lng: -110.1833 },
        totalEquipment: 1850,
        criticalEquipment: 95,
        avgHealthScore: 88,
        maintenanceBudgetM: 75,
        equipment: [
          {
            id: 'eq-004',
            name: 'Steam Generator #3',
            type: 'boiler',
            model: 'OTSG-100',
            manufacturer: 'Cleaver-Brooks',
            installDate: '2017-11-08',
            siteId: 'site-m002',
            healthScore: 85,
            healthStatus: 'good',
            lastMaintenance: '2024-03-20',
            nextScheduledMaintenance: '2024-06-20',
            operatingHours: 52000,
            efficiency: 92,
            vibrationLevel: 2.1,
            temperature: 315,
            pressure: 85,
            remainingUsefulLife: 180,
            failureProbability: 12,
            activeAlerts: 1,
          },
        ],
        assignedAgents: ['agent-maint-001', 'agent-maint-004'],
      },
    ],
    agents: [
      {
        id: 'agent-maint-001',
        name: 'EquipHealth AI',
        type: 'failure_predictor',
        description: 'Deep learning model predicting equipment failures using multi-sensor data fusion.',
        model: 'FailureNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Vibration analysis', 'Thermal imaging', 'Oil analysis', 'Acoustic monitoring', 'RUL estimation'],
        equipmentMonitored: 8500,
        predictionAccuracy: 94.2,
        falsePositiveRate: 3.8,
        avgLeadTime: '14 days',
        costSavingsM: 45,
        status: 'active',
      },
      {
        id: 'agent-maint-002',
        name: 'AnomalyWatch',
        type: 'anomaly_detector',
        description: 'Real-time anomaly detection using unsupervised learning across all sensors.',
        model: 'AnomalyNet-7B',
        framework: 'PyTorch',
        capabilities: ['Pattern recognition', 'Outlier detection', 'Trend analysis', 'Baseline learning', 'Alert correlation'],
        equipmentMonitored: 8500,
        predictionAccuracy: 91.5,
        falsePositiveRate: 5.2,
        avgLeadTime: '48 hours',
        costSavingsM: 28,
        status: 'active',
      },
      {
        id: 'agent-maint-003',
        name: 'MaintScheduler',
        type: 'scheduler',
        description: 'Optimizes maintenance schedules considering production, crew availability, and parts.',
        model: 'ScheduleOpt-XL',
        framework: 'Custom',
        capabilities: ['Schedule optimization', 'Resource allocation', 'Downtime minimization', 'Priority ranking', 'Conflict resolution'],
        equipmentMonitored: 8500,
        predictionAccuracy: 96.8,
        falsePositiveRate: 1.2,
        avgLeadTime: 'N/A',
        costSavingsM: 22,
        status: 'active',
      },
      {
        id: 'agent-maint-004',
        name: 'PartsGenius',
        type: 'parts_optimizer',
        description: 'Predicts spare parts demand and optimizes inventory across all sites.',
        model: 'PartsNet-7B',
        framework: 'PyTorch',
        capabilities: ['Demand forecasting', 'Inventory optimization', 'Supplier management', 'Lead time prediction', 'Cost optimization'],
        equipmentMonitored: 8500,
        predictionAccuracy: 92.5,
        falsePositiveRate: 4.5,
        avgLeadTime: 'N/A',
        costSavingsM: 18,
        status: 'active',
      },
    ],
    alerts: [
      {
        id: 'alert-001',
        equipmentId: 'eq-003',
        equipmentName: 'Slurry Pump #12',
        siteId: 'site-m001',
        siteName: 'Horizon Oil Sands',
        type: 'vibration',
        priority: 'critical',
        message: 'Bearing failure imminent. Vibration levels 3x normal baseline.',
        detectedAt: '2024-05-15T08:30:00Z',
        predictedFailure: '2024-05-28',
        recommendedAction: 'Replace bearings within 10 days. Schedule 8-hour maintenance window.',
        estimatedCost: 125000,
        status: 'acknowledged',
      },
      {
        id: 'alert-002',
        equipmentId: 'eq-001',
        equipmentName: 'Primary Crusher #1',
        siteId: 'site-m001',
        siteName: 'Horizon Oil Sands',
        type: 'wear',
        priority: 'high',
        message: 'Liner wear detected. 15% remaining useful life.',
        detectedAt: '2024-05-14T14:22:00Z',
        recommendedAction: 'Schedule liner replacement during next planned shutdown.',
        estimatedCost: 280000,
        status: 'in_progress',
      },
      {
        id: 'alert-003',
        equipmentId: 'eq-004',
        equipmentName: 'Steam Generator #3',
        siteId: 'site-m002',
        siteName: 'Primrose Thermal',
        type: 'efficiency',
        priority: 'medium',
        message: 'Efficiency degradation detected. 4% below optimal performance.',
        detectedAt: '2024-05-13T10:15:00Z',
        recommendedAction: 'Inspect and clean heat exchanger tubes.',
        estimatedCost: 45000,
        status: 'new',
      },
    ],
  },
  {
    id: 'maint-002',
    name: 'Barrick Gold Corporation',
    industry: 'Mining',
    headquarters: 'Toronto, ON',
    totalEquipment: 5200,
    avgHealthScore: 88,
    maintenanceBudgetM: 280,
    aiSavingsM: 52,
    unplannedDowntimeReduction: 38,
    description: 'Global mining leader implementing AI maintenance across Canadian gold operations.',
    sites: [
      {
        id: 'site-m003',
        name: 'Hemlo Operations',
        type: 'mine',
        company: 'Barrick Gold',
        location: 'Marathon, ON',
        province: 'ON',
        coordinates: { lat: 48.75, lng: -85.8333 },
        totalEquipment: 1450,
        criticalEquipment: 85,
        avgHealthScore: 89,
        maintenanceBudgetM: 65,
        equipment: [
          {
            id: 'eq-005',
            name: 'Mill Motor #1',
            type: 'motor',
            model: 'ABB AXR 560',
            manufacturer: 'ABB',
            installDate: '2016-04-12',
            siteId: 'site-m003',
            healthScore: 91,
            healthStatus: 'excellent',
            lastMaintenance: '2024-04-01',
            nextScheduledMaintenance: '2024-07-01',
            operatingHours: 62000,
            efficiency: 95,
            vibrationLevel: 1.5,
            temperature: 72,
            remainingUsefulLife: 320,
            failureProbability: 3,
            activeAlerts: 0,
          },
          {
            id: 'eq-006',
            name: 'Hoist Drum #2',
            type: 'motor',
            model: 'Siemens SIMINE',
            manufacturer: 'Siemens',
            installDate: '2019-09-18',
            siteId: 'site-m003',
            healthScore: 82,
            healthStatus: 'good',
            lastMaintenance: '2024-03-15',
            nextScheduledMaintenance: '2024-06-15',
            operatingHours: 35000,
            efficiency: 89,
            vibrationLevel: 2.8,
            temperature: 58,
            remainingUsefulLife: 145,
            failureProbability: 18,
            activeAlerts: 1,
          },
        ],
        assignedAgents: ['agent-maint-005', 'agent-maint-006'],
      },
    ],
    agents: [
      {
        id: 'agent-maint-005',
        name: 'MineHealth AI',
        type: 'failure_predictor',
        description: 'Specialized for underground mining equipment health monitoring.',
        model: 'MineNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Underground conditions', 'Dust/humidity compensation', 'Corrosion prediction', 'Load cycle analysis', 'Emergency prediction'],
        equipmentMonitored: 5200,
        predictionAccuracy: 93.8,
        falsePositiveRate: 4.1,
        avgLeadTime: '12 days',
        costSavingsM: 32,
        status: 'active',
      },
      {
        id: 'agent-maint-006',
        name: 'CrewDispatch AI',
        type: 'crew_dispatcher',
        description: 'Optimizes maintenance crew scheduling and skill matching.',
        model: 'CrewOpt-7B',
        framework: 'Custom',
        capabilities: ['Skill matching', 'Shift optimization', 'Travel minimization', 'Certification tracking', 'Overtime management'],
        equipmentMonitored: 5200,
        predictionAccuracy: 97.2,
        falsePositiveRate: 0.8,
        avgLeadTime: 'N/A',
        costSavingsM: 12,
        status: 'active',
      },
    ],
    alerts: [
      {
        id: 'alert-004',
        equipmentId: 'eq-006',
        equipmentName: 'Hoist Drum #2',
        siteId: 'site-m003',
        siteName: 'Hemlo Operations',
        type: 'vibration',
        priority: 'medium',
        message: 'Vibration trending upward. Monitor closely.',
        detectedAt: '2024-05-16T06:45:00Z',
        recommendedAction: 'Increase monitoring frequency. Plan inspection during next maintenance window.',
        estimatedCost: 35000,
        status: 'acknowledged',
      },
    ],
  },
  {
    id: 'maint-003',
    name: 'Enbridge Inc.',
    industry: 'Pipelines & Midstream',
    headquarters: 'Calgary, AB',
    totalEquipment: 12500,
    avgHealthScore: 92,
    maintenanceBudgetM: 620,
    aiSavingsM: 115,
    unplannedDowntimeReduction: 55,
    description: 'North America\'s leading pipeline company with extensive AI-driven integrity management.',
    sites: [
      {
        id: 'site-m004',
        name: 'Edmonton Terminal',
        type: 'plant',
        company: 'Enbridge',
        location: 'Edmonton, AB',
        province: 'AB',
        coordinates: { lat: 53.5461, lng: -113.4938 },
        totalEquipment: 2200,
        criticalEquipment: 145,
        avgHealthScore: 93,
        maintenanceBudgetM: 85,
        equipment: [
          {
            id: 'eq-007',
            name: 'Main Line Pump #5',
            type: 'pump',
            model: 'Flowserve HSB',
            manufacturer: 'Flowserve',
            installDate: '2015-06-22',
            siteId: 'site-m004',
            healthScore: 94,
            healthStatus: 'excellent',
            lastMaintenance: '2024-04-05',
            nextScheduledMaintenance: '2024-07-05',
            operatingHours: 72000,
            efficiency: 96,
            vibrationLevel: 1.2,
            temperature: 45,
            pressure: 85,
            remainingUsefulLife: 450,
            failureProbability: 2,
            activeAlerts: 0,
          },
          {
            id: 'eq-008',
            name: 'Compressor Station #12',
            type: 'compressor',
            model: 'Solar Titan 250',
            manufacturer: 'Solar Turbines',
            installDate: '2018-03-15',
            siteId: 'site-m004',
            healthScore: 88,
            healthStatus: 'good',
            lastMaintenance: '2024-03-25',
            nextScheduledMaintenance: '2024-06-25',
            operatingHours: 45000,
            efficiency: 91,
            vibrationLevel: 2.2,
            temperature: 185,
            pressure: 65,
            remainingUsefulLife: 220,
            failureProbability: 8,
            activeAlerts: 0,
          },
        ],
        assignedAgents: ['agent-maint-007', 'agent-maint-008'],
      },
    ],
    agents: [
      {
        id: 'agent-maint-007',
        name: 'PipelineGuard AI',
        type: 'anomaly_detector',
        description: 'Monitors pipeline integrity and detects anomalies across the network.',
        model: 'PipeNet-13B',
        framework: 'TensorFlow',
        capabilities: ['Leak detection', 'Corrosion monitoring', 'Pressure anomalies', 'Flow analysis', 'Third-party damage'],
        equipmentMonitored: 12500,
        predictionAccuracy: 98.2,
        falsePositiveRate: 1.5,
        avgLeadTime: '72 hours',
        costSavingsM: 75,
        status: 'active',
      },
      {
        id: 'agent-maint-008',
        name: 'IntegrityManager AI',
        type: 'cost_analyzer',
        description: 'Optimizes integrity management spending and prioritizes interventions.',
        model: 'CostOpt-XL',
        framework: 'Custom',
        capabilities: ['Risk-based prioritization', 'Cost-benefit analysis', 'Dig program optimization', 'ILI scheduling', 'Regulatory compliance'],
        equipmentMonitored: 12500,
        predictionAccuracy: 95.5,
        falsePositiveRate: 2.2,
        avgLeadTime: 'N/A',
        costSavingsM: 40,
        status: 'active',
      },
    ],
    alerts: [],
  },
];

// Configuration objects
export const healthStatusConfig: Record<HealthStatus, { label: string; color: string }> = {
  excellent: { label: 'Excellent', color: '#2ECC71' },
  good: { label: 'Good', color: '#3498DB' },
  fair: { label: 'Fair', color: '#F1C40F' },
  poor: { label: 'Poor', color: '#E67E22' },
  critical: { label: 'Critical', color: '#E74C3C' },
};

export const alertPriorityConfig: Record<AlertPriority, { label: string; color: string }> = {
  low: { label: 'Low', color: '#3498DB' },
  medium: { label: 'Medium', color: '#F1C40F' },
  high: { label: 'High', color: '#E67E22' },
  critical: { label: 'Critical', color: '#E74C3C' },
};

export const maintenanceAgentConfig: Record<string, { label: string; color: string; icon: string }> = {
  anomaly_detector: { label: 'Anomaly Detector', color: '#E74C3C', icon: 'AlertTriangle' },
  failure_predictor: { label: 'Failure Predictor', color: '#9B59B6', icon: 'TrendingDown' },
  scheduler: { label: 'Scheduler', color: '#3498DB', icon: 'Calendar' },
  parts_optimizer: { label: 'Parts Optimizer', color: '#2ECC71', icon: 'Package' },
  crew_dispatcher: { label: 'Crew Dispatcher', color: '#E67E22', icon: 'Users' },
  cost_analyzer: { label: 'Cost Analyzer', color: '#F1C40F', icon: 'DollarSign' },
  sensor_fusion: { label: 'Sensor Fusion', color: '#1ABC9C', icon: 'Radio' },
};

export const equipmentTypeConfig: Record<EquipmentType, { label: string; color: string; icon: string }> = {
  turbine: { label: 'Turbine', color: '#3498DB', icon: 'Fan' },
  compressor: { label: 'Compressor', color: '#E67E22', icon: 'Gauge' },
  pump: { label: 'Pump', color: '#2ECC71', icon: 'ArrowUpDown' },
  conveyor: { label: 'Conveyor', color: '#9B59B6', icon: 'ArrowRight' },
  transformer: { label: 'Transformer', color: '#F1C40F', icon: 'Zap' },
  motor: { label: 'Motor', color: '#1ABC9C', icon: 'Cog' },
  generator: { label: 'Generator', color: '#E74C3C', icon: 'Battery' },
  hvac: { label: 'HVAC', color: '#7F8C8D', icon: 'Wind' },
  boiler: { label: 'Boiler', color: '#C0392B', icon: 'Flame' },
  crusher: { label: 'Crusher', color: '#8E44AD', icon: 'Hammer' },
};

// Type and export aliases for backward compatibility
export type Asset = Equipment;
export type FailurePrediction = MaintenanceAlert;
export const failureTrendData = healthTrendData;
export const assetHealthData = equipmentTypeDistribution;
export const maintenanceTypeData = maintenanceCostData;
export const agentTypeConfig = maintenanceAgentConfig;
export const assetStatusConfig = healthStatusConfig;
export const priorityConfig = alertPriorityConfig;
