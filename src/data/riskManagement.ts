// Risk Management Data for Regulatory Module

export type RiskCategory = 
  | 'compliance'
  | 'legal'
  | 'operational'
  | 'strategic'
  | 'reputational'
  | 'cybersecurity'
  | 'financial'
  | 'people_workforce';

export type RiskStatus = 'active' | 'monitoring' | 'mitigated' | 'closed';

export type RiskSeverity = 'insignificant' | 'minor' | 'moderate' | 'major' | 'severe';

export type RiskLikelihood = 'likely' | 'medium' | 'high' | 'extreme';

export interface Risk {
  id: string;
  category: RiskCategory;
  description: string;
  score: number;
  status: RiskStatus;
  severity: RiskSeverity;
  likelihood: RiskLikelihood;
  owner: string;
  lastUpdated: string;
  mitigationActions: string[];
}

export interface KeyRiskIndicator {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendPercent: number;
  threshold: number;
  status: 'good' | 'warning' | 'critical';
}

export interface RiskAlert {
  id: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface ERMInsight {
  id: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  category: RiskCategory;
}

export interface RiskHeatMapCell {
  likelihood: RiskLikelihood;
  severity: RiskSeverity;
  count: number;
}

export interface CompanyRiskProfile {
  companyId: string;
  totalRisks: number;
  activeRisks: number;
  highCriticalRisks: number;
  criticalRisks: number;
  risks: Risk[];
  risksByCategory: Record<RiskCategory, { count: number; high: number; critical: number }>;
  heatMapData: RiskHeatMapCell[];
  kris: KeyRiskIndicator[];
  recentAlerts: RiskAlert[];
  ermInsights: ERMInsight[];
}

// Category configuration
export const riskCategoryConfig: Record<RiskCategory, { label: string; color: string; icon: string }> = {
  compliance: { label: 'Compliance', color: '#2ECC71', icon: 'shield-check' },
  legal: { label: 'Legal', color: '#E74C3C', icon: 'scale' },
  operational: { label: 'Operational', color: '#3498DB', icon: 'settings' },
  strategic: { label: 'Strategic', color: '#9B59B6', icon: 'target' },
  reputational: { label: 'Reputational', color: '#E67E22', icon: 'users' },
  cybersecurity: { label: 'Cybersecurity', color: '#1ABC9C', icon: 'lock' },
  financial: { label: 'Financial', color: '#F1C40F', icon: 'dollar-sign' },
  people_workforce: { label: 'People & Workforce', color: '#95A5A6', icon: 'users' },
};

export const riskStatusConfig: Record<RiskStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: '#E74C3C' },
  monitoring: { label: 'Monitoring', color: '#F1C40F' },
  mitigated: { label: 'Mitigated', color: '#3498DB' },
  closed: { label: 'Closed', color: '#2ECC71' },
};

export const severityConfig: Record<RiskSeverity, { label: string; color: string; index: number }> = {
  insignificant: { label: 'Insignificant', color: '#2ECC71', index: 0 },
  minor: { label: 'Minor', color: '#82E0AA', index: 1 },
  moderate: { label: 'Moderate', color: '#F1C40F', index: 2 },
  major: { label: 'Major', color: '#E67E22', index: 3 },
  severe: { label: 'Severe', color: '#E74C3C', index: 4 },
};

export const likelihoodConfig: Record<RiskLikelihood, { label: string; index: number }> = {
  likely: { label: 'Likely', index: 0 },
  medium: { label: 'Medium', index: 1 },
  high: { label: 'High', index: 2 },
  extreme: { label: 'Extreme', index: 3 },
};

// Heat map cell colors based on risk level
export const getHeatMapCellColor = (likelihood: RiskLikelihood, severity: RiskSeverity): string => {
  const likelihoodIdx = likelihoodConfig[likelihood].index;
  const severityIdx = severityConfig[severity].index;
  const riskLevel = likelihoodIdx + severityIdx;
  
  if (riskLevel <= 1) return '#2ECC71'; // Green
  if (riskLevel <= 3) return '#82E0AA'; // Light Green
  if (riskLevel <= 4) return '#F1C40F'; // Yellow
  if (riskLevel <= 5) return '#E67E22'; // Orange
  return '#E74C3C'; // Red
};

// Generate mock risk profiles for each company
export const companyRiskProfiles: Record<string, CompanyRiskProfile> = {
  'comp-reg-001': { // Royal Bank of Canada
    companyId: 'comp-reg-001',
    totalRisks: 27,
    activeRisks: 27,
    highCriticalRisks: 6,
    criticalRisks: 2,
    risks: [
      {
        id: 'R-003',
        category: 'cybersecurity',
        description: 'Unauthorized access to licensee database',
        score: 16,
        status: 'active',
        severity: 'severe',
        likelihood: 'medium',
        owner: 'CISO',
        lastUpdated: '2024-04-20',
        mitigationActions: ['Implement MFA', 'Conduct security audit'],
      },
      {
        id: 'R-013',
        category: 'compliance',
        description: 'Legislation leaves increased appeals risk',
        score: 15,
        status: 'active',
        severity: 'major',
        likelihood: 'high',
        owner: 'Chief Compliance Officer',
        lastUpdated: '2024-04-18',
        mitigationActions: ['Legal review', 'Update policies'],
      },
      {
        id: 'R-007',
        category: 'operational',
        description: 'Investigation backlog increasing',
        score: 13,
        status: 'monitoring',
        severity: 'major',
        likelihood: 'medium',
        owner: 'Operations Director',
        lastUpdated: '2024-04-15',
        mitigationActions: ['Hire additional staff', 'Automate processes'],
      },
      {
        id: 'R-007',
        category: 'legal',
        description: 'Perceived bias in licensing decisions',
        score: 12,
        status: 'monitoring',
        severity: 'moderate',
        likelihood: 'high',
        owner: 'Legal Counsel',
        lastUpdated: '2024-04-12',
        mitigationActions: ['Review decision criteria', 'Training program'],
      },
      {
        id: 'R-015',
        category: 'strategic',
        description: 'Market expansion delays due to regulatory uncertainty',
        score: 11,
        status: 'active',
        severity: 'moderate',
        likelihood: 'medium',
        owner: 'Strategy Director',
        lastUpdated: '2024-04-10',
        mitigationActions: ['Engage regulators', 'Scenario planning'],
      },
      {
        id: 'R-022',
        category: 'reputational',
        description: 'Negative media coverage on data handling',
        score: 10,
        status: 'monitoring',
        severity: 'moderate',
        likelihood: 'medium',
        owner: 'Communications',
        lastUpdated: '2024-04-08',
        mitigationActions: ['PR campaign', 'Transparency report'],
      },
    ],
    risksByCategory: {
      compliance: { count: 6, high: 3, critical: 0 },
      legal: { count: 5, high: 1, critical: 0 },
      operational: { count: 6, high: 0, critical: 0 },
      strategic: { count: 3, high: 0, critical: 0 },
      reputational: { count: 4, high: 2, critical: 0 },
      cybersecurity: { count: 2, high: 1, critical: 1 },
      financial: { count: 1, high: 0, critical: 0 },
      people_workforce: { count: 0, high: 0, critical: 0 },
    },
    heatMapData: [
      { likelihood: 'extreme', severity: 'major', count: 1 },
      { likelihood: 'extreme', severity: 'severe', count: 6 },
      { likelihood: 'high', severity: 'minor', count: 1 },
      { likelihood: 'high', severity: 'major', count: 5 },
      { likelihood: 'medium', severity: 'moderate', count: 2 },
      { likelihood: 'medium', severity: 'major', count: 5 },
      { likelihood: 'likely', severity: 'severe', count: 6 },
    ],
    kris: [
      { id: 'kri-1', name: 'Open Investigations', value: 22, unit: '%', trend: 'up', trendPercent: 5, threshold: 20, status: 'warning' },
      { id: 'kri-2', name: 'Judicial Reviews', value: 3, unit: '', trend: 'stable', trendPercent: 0, threshold: 5, status: 'good' },
      { id: 'kri-3', name: 'Compliance Score', value: 38, unit: '', trend: 'up', trendPercent: 12, threshold: 50, status: 'warning' },
      { id: 'kri-4', name: 'Licensee Complaints', value: 38, unit: '', trend: 'stable', trendPercent: 0, threshold: 40, status: 'good' },
      { id: 'kri-5', name: 'System Downtime Incidents', value: 2, unit: '', trend: 'down', trendPercent: 15, threshold: 5, status: 'good' },
    ],
    recentAlerts: [
      { id: 'alert-1', message: 'Increased judicial reviews signaled compliance issues', timestamp: '2024-04-20', severity: 'warning' },
      { id: 'alert-2', message: 'Backlog of investigations up 25% in 30 days', timestamp: '2024-04-18', severity: 'warning' },
      { id: 'alert-3', message: 'Cyber attempt to breach licensee portal', timestamp: '2024-04-15', severity: 'critical' },
    ],
    ermInsights: [
      { id: 'erm-1', recommendation: 'Review continuing education protocols', priority: 'high', category: 'compliance' },
      { id: 'erm-2', recommendation: 'Enhance cybersecurity posture', priority: 'high', category: 'cybersecurity' },
      { id: 'erm-3', recommendation: 'Address case handling efficiency', priority: 'medium', category: 'operational' },
    ],
  },
  'comp-reg-002': { // TD Bank
    companyId: 'comp-reg-002',
    totalRisks: 31,
    activeRisks: 24,
    highCriticalRisks: 8,
    criticalRisks: 3,
    risks: [
      {
        id: 'R-101',
        category: 'compliance',
        description: 'AML monitoring gaps identified',
        score: 18,
        status: 'active',
        severity: 'severe',
        likelihood: 'high',
        owner: 'AML Director',
        lastUpdated: '2024-04-22',
        mitigationActions: ['Enhance transaction monitoring', 'Staff training'],
      },
      {
        id: 'R-102',
        category: 'cybersecurity',
        description: 'Third-party vendor security vulnerabilities',
        score: 16,
        status: 'active',
        severity: 'major',
        likelihood: 'high',
        owner: 'Vendor Management',
        lastUpdated: '2024-04-20',
        mitigationActions: ['Vendor audit', 'Contract updates'],
      },
      {
        id: 'R-103',
        category: 'operational',
        description: 'Core banking system upgrade delays',
        score: 14,
        status: 'monitoring',
        severity: 'major',
        likelihood: 'medium',
        owner: 'CTO',
        lastUpdated: '2024-04-18',
        mitigationActions: ['Project acceleration', 'Resource allocation'],
      },
    ],
    risksByCategory: {
      compliance: { count: 8, high: 4, critical: 1 },
      legal: { count: 4, high: 1, critical: 0 },
      operational: { count: 7, high: 2, critical: 1 },
      strategic: { count: 4, high: 0, critical: 0 },
      reputational: { count: 3, high: 1, critical: 0 },
      cybersecurity: { count: 3, high: 2, critical: 1 },
      financial: { count: 2, high: 0, critical: 0 },
      people_workforce: { count: 0, high: 0, critical: 0 },
    },
    heatMapData: [
      { likelihood: 'extreme', severity: 'severe', count: 3 },
      { likelihood: 'extreme', severity: 'major', count: 5 },
      { likelihood: 'high', severity: 'major', count: 4 },
      { likelihood: 'high', severity: 'moderate', count: 6 },
      { likelihood: 'medium', severity: 'moderate', count: 8 },
      { likelihood: 'likely', severity: 'minor', count: 5 },
    ],
    kris: [
      { id: 'kri-1', name: 'AML Alerts', value: 156, unit: '', trend: 'up', trendPercent: 18, threshold: 100, status: 'critical' },
      { id: 'kri-2', name: 'Vendor Risk Score', value: 72, unit: '%', trend: 'down', trendPercent: 5, threshold: 80, status: 'warning' },
      { id: 'kri-3', name: 'System Availability', value: 99.2, unit: '%', trend: 'stable', trendPercent: 0, threshold: 99.5, status: 'warning' },
      { id: 'kri-4', name: 'Customer Complaints', value: 42, unit: '', trend: 'up', trendPercent: 8, threshold: 50, status: 'warning' },
    ],
    recentAlerts: [
      { id: 'alert-1', message: 'AML false positive rate exceeding threshold', timestamp: '2024-04-22', severity: 'critical' },
      { id: 'alert-2', message: 'Vendor security assessment overdue for 3 critical vendors', timestamp: '2024-04-20', severity: 'warning' },
      { id: 'alert-3', message: 'Core banking upgrade milestone missed', timestamp: '2024-04-18', severity: 'info' },
    ],
    ermInsights: [
      { id: 'erm-1', recommendation: 'Accelerate AML system upgrade', priority: 'high', category: 'compliance' },
      { id: 'erm-2', recommendation: 'Expedite critical vendor assessments', priority: 'high', category: 'cybersecurity' },
      { id: 'erm-3', recommendation: 'Review project management practices', priority: 'medium', category: 'operational' },
    ],
  },
  'comp-reg-003': { // Manulife
    companyId: 'comp-reg-003',
    totalRisks: 22,
    activeRisks: 18,
    highCriticalRisks: 4,
    criticalRisks: 1,
    risks: [
      {
        id: 'R-201',
        category: 'compliance',
        description: 'IFRS 17 implementation timeline risk',
        score: 14,
        status: 'active',
        severity: 'major',
        likelihood: 'medium',
        owner: 'CFO',
        lastUpdated: '2024-04-21',
        mitigationActions: ['Dedicated project team', 'External consulting'],
      },
      {
        id: 'R-202',
        category: 'strategic',
        description: 'Digital transformation adoption lag',
        score: 12,
        status: 'monitoring',
        severity: 'moderate',
        likelihood: 'high',
        owner: 'CDO',
        lastUpdated: '2024-04-19',
        mitigationActions: ['Change management program', 'Training initiatives'],
      },
    ],
    risksByCategory: {
      compliance: { count: 5, high: 2, critical: 0 },
      legal: { count: 3, high: 0, critical: 0 },
      operational: { count: 4, high: 1, critical: 0 },
      strategic: { count: 4, high: 1, critical: 1 },
      reputational: { count: 2, high: 0, critical: 0 },
      cybersecurity: { count: 2, high: 0, critical: 0 },
      financial: { count: 2, high: 0, critical: 0 },
      people_workforce: { count: 0, high: 0, critical: 0 },
    },
    heatMapData: [
      { likelihood: 'extreme', severity: 'major', count: 1 },
      { likelihood: 'high', severity: 'moderate', count: 3 },
      { likelihood: 'high', severity: 'major', count: 2 },
      { likelihood: 'medium', severity: 'moderate', count: 6 },
      { likelihood: 'medium', severity: 'minor', count: 4 },
      { likelihood: 'likely', severity: 'insignificant', count: 6 },
    ],
    kris: [
      { id: 'kri-1', name: 'Policy Lapses', value: 2.3, unit: '%', trend: 'down', trendPercent: 3, threshold: 3, status: 'good' },
      { id: 'kri-2', name: 'Claims Processing Time', value: 4.2, unit: 'days', trend: 'stable', trendPercent: 0, threshold: 5, status: 'good' },
      { id: 'kri-3', name: 'Customer Satisfaction', value: 87, unit: '%', trend: 'up', trendPercent: 2, threshold: 85, status: 'good' },
      { id: 'kri-4', name: 'Agent Compliance', value: 94, unit: '%', trend: 'up', trendPercent: 1, threshold: 95, status: 'warning' },
    ],
    recentAlerts: [
      { id: 'alert-1', message: 'IFRS 17 milestone approaching - 2 weeks remaining', timestamp: '2024-04-21', severity: 'warning' },
      { id: 'alert-2', message: 'Agent training completion rate below target', timestamp: '2024-04-19', severity: 'info' },
    ],
    ermInsights: [
      { id: 'erm-1', recommendation: 'Prioritize IFRS 17 compliance workstream', priority: 'high', category: 'compliance' },
      { id: 'erm-2', recommendation: 'Accelerate digital adoption training', priority: 'medium', category: 'strategic' },
      { id: 'erm-3', recommendation: 'Enhance agent compliance monitoring', priority: 'medium', category: 'compliance' },
    ],
  },
};

// Helper function to get risk profile for a company
export const getRiskProfile = (companyId: string): CompanyRiskProfile | null => {
  return companyRiskProfiles[companyId] || null;
};

// Helper to get score color
export const getScoreColor = (score: number): string => {
  if (score >= 15) return '#E74C3C'; // Critical - Red
  if (score >= 12) return '#E67E22'; // High - Orange
  if (score >= 8) return '#F1C40F'; // Medium - Yellow
  return '#2ECC71'; // Low - Green
};

// Helper to get score label
export const getScoreLabel = (score: number): string => {
  if (score >= 15) return 'Critical';
  if (score >= 12) return 'High';
  if (score >= 8) return 'Medium';
  return 'Low';
};
