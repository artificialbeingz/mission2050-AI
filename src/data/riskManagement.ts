// Risk Management Data for Regulatory Module

export type RiskCategory =
  | 'strategic'
  | 'operational'
  | 'cybersecurity'
  | 'financial'
  | 'compliance'
  | 'reputational'
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
  // AI & ML fields
  inputSources?: string[];
  mlModel?: {
    name: string;
    type: string;
    accuracy: number;
  };
  aiAgent?: {
    name: string;
    type: string;
    capabilities: string[];
    automationLevel: number;
  };
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
  description?: string;
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
  categories?: Partial<Record<RiskCategory, number>>;
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

// Category configuration with tooltip descriptions
export const riskCategoryConfig: Record<RiskCategory, { label: string; abbr: string; color: string; icon: string; description: string }> = {
  strategic: { label: 'Strategic', abbr: 'S', color: '#9B59B6', icon: 'target', description: '"Big Picture" threats that can fundamentally alter a regulator\'s trajectory or public legitimacy.' },
  operational: { label: 'Operational', abbr: 'O', color: '#3498DB', icon: 'settings', description: 'Risks arising from failure of internal processes, systems, human factors or external events that impact day-to-day operations.' },
  cybersecurity: { label: 'Cybersecurity', abbr: 'CY', color: '#1ABC9C', icon: 'lock', description: 'System breaches, IT system failures, and business continuity disruptions.' },
  financial: { label: 'Financial', abbr: 'F', color: '#F1C40F', icon: 'dollar-sign', description: 'Threats to financial stability.' },
  compliance: { label: 'Compliance', abbr: 'C', color: '#2ECC71', icon: 'shield-check', description: 'Organizational compliance with internal policies and laws; sectorial compliance with regulator mandate.' },
  reputational: { label: 'Reputational', abbr: 'R', color: '#E67E22', icon: 'users', description: 'Potential damage to public confidence in ability to protect the public interest.' },
  people_workforce: { label: 'People & Workforce', abbr: 'PW', color: '#95A5A6', icon: 'users', description: 'Threats to employees, contractors or internal culture that compromises ability to deliver on mandate.' },
};

export const riskStatusConfig: Record<RiskStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: '#E74C3C' },
  monitoring: { label: 'Monitoring', color: '#F1C40F' },
  mitigated: { label: 'Mitigated', color: '#3498DB' },
  closed: { label: 'Closed', color: '#2ECC71' },
};

export const severityConfig: Record<RiskSeverity, { label: string; color: string; index: number }> = {
  insignificant: { label: 'Insignificant', color: '#1D8348', index: 0 },
  minor: { label: 'Minor', color: '#28A745', index: 1 },
  moderate: { label: 'Moderate', color: '#D4AC0D', index: 2 },
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
  'comp-reg-001': { // Real Estate Council of Ontario
    companyId: 'comp-reg-001',
    totalRisks: 27,
    activeRisks: 27,
    highCriticalRisks: 11, // 7 high + 4 critical = 11
    criticalRisks: 4,
    risks: [
      // Extreme + Major: C(1)
      {
        id: 'R-001', category: 'compliance', description: 'Critical AML compliance gap in international transfers', score: 18, status: 'active', severity: 'major', likelihood: 'extreme', owner: 'Chief Compliance Officer', lastUpdated: '2024-04-20', mitigationActions: ['Implement enhanced monitoring', 'Staff training program'],
        inputSources: ['Transaction monitoring system', 'SWIFT messages', 'Regulatory filings', 'Internal audit reports'],
        mlModel: { name: 'AML-Detector-v3', type: 'Anomaly Detection', accuracy: 94.2 },
        aiAgent: { name: 'ComplianceGuard AI', type: 'Compliance Monitoring', capabilities: ['Real-time transaction screening', 'Pattern detection', 'Alert prioritization', 'Report generation'], automationLevel: 78 }
      },
      // Extreme + Severe: CY(2), L(2)
      {
        id: 'R-002', category: 'cybersecurity', description: 'Ransomware vulnerability in core banking systems', score: 20, status: 'active', severity: 'severe', likelihood: 'extreme', owner: 'CISO', lastUpdated: '2024-04-19', mitigationActions: ['Deploy endpoint protection', 'Network segmentation'],
        inputSources: ['SIEM logs', 'Endpoint telemetry', 'Threat intelligence feeds', 'Vulnerability scans'],
        mlModel: { name: 'ThreatPredict-XL', type: 'Threat Detection', accuracy: 97.8 },
        aiAgent: { name: 'CyberShield Agent', type: 'Threat Response', capabilities: ['Automated threat containment', 'Incident triage', 'Forensic analysis', 'Patch recommendation'], automationLevel: 85 }
      },
      {
        id: 'R-003', category: 'cybersecurity', description: 'Unauthorized access attempts to customer database', score: 19, status: 'active', severity: 'severe', likelihood: 'extreme', owner: 'CISO', lastUpdated: '2024-04-18', mitigationActions: ['Implement MFA', 'Conduct security audit'],
        inputSources: ['Access logs', 'Authentication systems', 'Database audit trails', 'Network traffic analysis'],
        mlModel: { name: 'AccessGuard-AI', type: 'Behavioral Analytics', accuracy: 96.5 },
        aiAgent: { name: 'IdentityProtect AI', type: 'Access Management', capabilities: ['Anomaly detection', 'Session monitoring', 'Risk-based authentication', 'Automated lockout'], automationLevel: 82 }
      },
      {
        id: 'R-004', category: 'compliance', description: 'Class action lawsuit on mortgage lending practices', score: 18, status: 'active', severity: 'severe', likelihood: 'extreme', owner: 'General Counsel', lastUpdated: '2024-04-17', mitigationActions: ['Legal defense preparation', 'Settlement analysis'],
        inputSources: ['Court filings', 'Customer complaints', 'Loan documentation', 'Regulatory correspondence'],
        mlModel: { name: 'LegalRisk-Analyzer', type: 'Document Analysis', accuracy: 91.3 },
        aiAgent: { name: 'LegalAssist AI', type: 'Legal Research', capabilities: ['Case law research', 'Document summarization', 'Risk assessment', 'Settlement modeling'], automationLevel: 65 }
      },
      {
        id: 'R-005', category: 'compliance', description: 'Regulatory investigation into trading practices', score: 17, status: 'active', severity: 'severe', likelihood: 'extreme', owner: 'Legal Director', lastUpdated: '2024-04-16', mitigationActions: ['Document retention', 'Internal investigation'],
        inputSources: ['Trading records', 'Communication logs', 'Regulatory notices', 'Compliance reports'],
        mlModel: { name: 'TradeComply-ML', type: 'Pattern Recognition', accuracy: 93.7 },
        aiAgent: { name: 'RegInvestigate AI', type: 'Investigation Support', capabilities: ['Evidence gathering', 'Timeline reconstruction', 'Communication analysis', 'Report drafting'], automationLevel: 58 }
      },
      // High + Minor: F(1)
      {
        id: 'R-006', category: 'financial', description: 'Interest rate margin compression affecting profitability', score: 10, status: 'monitoring', severity: 'minor', likelihood: 'high', owner: 'CFO', lastUpdated: '2024-04-15', mitigationActions: ['Diversify revenue streams', 'Cost optimization'],
        inputSources: ['Market data feeds', 'Treasury reports', 'Competitor analysis', 'Economic indicators'],
        mlModel: { name: 'MarginPredict-v2', type: 'Financial Forecasting', accuracy: 88.4 },
        aiAgent: { name: 'TreasuryOptimize AI', type: 'Financial Planning', capabilities: ['Scenario modeling', 'Rate forecasting', 'Portfolio optimization', 'Risk/return analysis'], automationLevel: 72 }
      },
      // High + Major: C(2), R(2), O(2)
      {
        id: 'R-007', category: 'compliance', description: 'OSFI capital adequacy requirements not met', score: 16, status: 'active', severity: 'major', likelihood: 'high', owner: 'Chief Risk Officer', lastUpdated: '2024-04-14', mitigationActions: ['Capital raise planning', 'Asset optimization'],
        inputSources: ['Balance sheet data', 'Risk-weighted assets', 'Regulatory filings', 'Stress test results'],
        mlModel: { name: 'CapitalRisk-ML', type: 'Risk Modeling', accuracy: 95.1 },
        aiAgent: { name: 'CapitalAdvisor AI', type: 'Capital Planning', capabilities: ['Capital optimization', 'Regulatory reporting', 'Stress testing', 'What-if analysis'], automationLevel: 76 }
      },
      {
        id: 'R-008', category: 'compliance', description: 'Privacy compliance gaps in data retention policies', score: 15, status: 'active', severity: 'major', likelihood: 'high', owner: 'Privacy Officer', lastUpdated: '2024-04-13', mitigationActions: ['Policy update', 'Data audit'],
        inputSources: ['Data inventory', 'Retention schedules', 'Privacy assessments', 'Customer consent records'],
        mlModel: { name: 'PrivacyGuard-AI', type: 'Data Classification', accuracy: 92.8 },
        aiAgent: { name: 'DataPrivacy AI', type: 'Privacy Management', capabilities: ['Data discovery', 'Consent management', 'Retention automation', 'DSAR handling'], automationLevel: 81 }
      },
      {
        id: 'R-009', category: 'reputational', description: 'Negative media coverage on service outages', score: 14, status: 'active', severity: 'major', likelihood: 'high', owner: 'Communications Director', lastUpdated: '2024-04-12', mitigationActions: ['PR response plan', 'Customer communication'],
        inputSources: ['Social media feeds', 'News aggregators', 'Customer feedback', 'Service status logs'],
        mlModel: { name: 'SentimentTrack-v3', type: 'Sentiment Analysis', accuracy: 89.6 },
        aiAgent: { name: 'ReputationGuard AI', type: 'Crisis Management', capabilities: ['Real-time monitoring', 'Response drafting', 'Stakeholder alerts', 'Impact assessment'], automationLevel: 74 }
      },
      {
        id: 'R-010', category: 'reputational', description: 'ESG rating downgrade risk from climate exposure', score: 13, status: 'monitoring', severity: 'major', likelihood: 'high', owner: 'Sustainability Officer', lastUpdated: '2024-04-11', mitigationActions: ['ESG improvement plan', 'Stakeholder engagement'],
        inputSources: ['ESG ratings', 'Carbon footprint data', 'Portfolio analysis', 'Regulatory guidelines'],
        mlModel: { name: 'ESG-Predictor', type: 'ESG Scoring', accuracy: 87.2 },
        aiAgent: { name: 'Sustainability AI', type: 'ESG Advisory', capabilities: ['Portfolio screening', 'Carbon modeling', 'Reporting automation', 'Target tracking'], automationLevel: 68 }
      },
      {
        id: 'R-011', category: 'operational', description: 'Core banking system upgrade delays', score: 14, status: 'active', severity: 'major', likelihood: 'high', owner: 'CTO', lastUpdated: '2024-04-10', mitigationActions: ['Project acceleration', 'Resource allocation'],
        inputSources: ['Project management tools', 'Sprint reports', 'Resource utilization', 'Dependency tracking'],
        mlModel: { name: 'ProjectRisk-ML', type: 'Schedule Prediction', accuracy: 86.9 },
        aiAgent: { name: 'ProjectAssist AI', type: 'Project Management', capabilities: ['Risk identification', 'Resource optimization', 'Timeline forecasting', 'Blocker resolution'], automationLevel: 62 }
      },
      {
        id: 'R-012', category: 'operational', description: 'Branch network staffing shortages', score: 13, status: 'monitoring', severity: 'major', likelihood: 'high', owner: 'HR Director', lastUpdated: '2024-04-09', mitigationActions: ['Recruitment drive', 'Retention program'],
        inputSources: ['HR systems', 'Turnover data', 'Market salary data', 'Employee surveys'],
        mlModel: { name: 'AttritionPredict', type: 'HR Analytics', accuracy: 84.5 },
        aiAgent: { name: 'WorkforceAI', type: 'HR Planning', capabilities: ['Demand forecasting', 'Candidate matching', 'Retention prediction', 'Skill gap analysis'], automationLevel: 71 }
      },
      // Medium + Moderate: C(1), L(1), S(2)
      {
        id: 'R-013', category: 'compliance', description: 'Anti-money laundering training gaps', score: 11, status: 'monitoring', severity: 'moderate', likelihood: 'medium', owner: 'Compliance Manager', lastUpdated: '2024-04-08', mitigationActions: ['Training program update', 'Certification tracking'],
        inputSources: ['LMS records', 'Assessment scores', 'Regulatory updates', 'Incident reports'],
        mlModel: { name: 'TrainingGap-AI', type: 'Learning Analytics', accuracy: 88.1 },
        aiAgent: { name: 'LearnAssist AI', type: 'Training Management', capabilities: ['Gap identification', 'Content recommendation', 'Progress tracking', 'Compliance certification'], automationLevel: 79 }
      },
      {
        id: 'R-014', category: 'compliance', description: 'Intellectual property disputes with fintech partners', score: 10, status: 'monitoring', severity: 'moderate', likelihood: 'medium', owner: 'Legal Counsel', lastUpdated: '2024-04-07', mitigationActions: ['Contract review', 'IP audit'],
        inputSources: ['Partnership agreements', 'Patent filings', 'Technology assessments', 'Legal correspondence'],
        mlModel: { name: 'IPRisk-Analyzer', type: 'Contract Analysis', accuracy: 90.2 },
        aiAgent: { name: 'ContractAI', type: 'Legal Analysis', capabilities: ['Clause extraction', 'Risk flagging', 'Comparison analysis', 'Renewal tracking'], automationLevel: 67 }
      },
      {
        id: 'R-015', category: 'strategic', description: 'Digital banking market share erosion', score: 11, status: 'active', severity: 'moderate', likelihood: 'medium', owner: 'Strategy Director', lastUpdated: '2024-04-06', mitigationActions: ['Digital transformation', 'Customer experience'],
        inputSources: ['Market research', 'Competitor analysis', 'Customer surveys', 'Digital metrics'],
        mlModel: { name: 'MarketShare-ML', type: 'Competitive Intelligence', accuracy: 85.7 },
        aiAgent: { name: 'StrategyInsight AI', type: 'Strategic Planning', capabilities: ['Trend analysis', 'Scenario planning', 'Competitor tracking', 'Opportunity identification'], automationLevel: 59 }
      },
      {
        id: 'R-016', category: 'strategic', description: 'Competitive pressure from neo-banks', score: 10, status: 'monitoring', severity: 'moderate', likelihood: 'medium', owner: 'Business Development', lastUpdated: '2024-04-05', mitigationActions: ['Product innovation', 'Pricing strategy'],
        inputSources: ['Fintech news', 'App store rankings', 'Feature comparisons', 'Pricing data'],
        mlModel: { name: 'CompetitorTrack', type: 'Market Analysis', accuracy: 83.4 },
        aiAgent: { name: 'InnovationAI', type: 'Product Strategy', capabilities: ['Feature benchmarking', 'Pricing optimization', 'Launch planning', 'User research synthesis'], automationLevel: 55 }
      },
      // Medium + Major: R(2), O(2)
      {
        id: 'R-017', category: 'reputational', description: 'Social media sentiment decline on customer service', score: 12, status: 'monitoring', severity: 'major', likelihood: 'medium', owner: 'Customer Experience', lastUpdated: '2024-04-04', mitigationActions: ['Service improvement', 'Social monitoring'],
        inputSources: ['Twitter/X feeds', 'Facebook comments', 'Review sites', 'Support tickets'],
        mlModel: { name: 'SocialSentiment-v2', type: 'NLP Analysis', accuracy: 91.2 },
        aiAgent: { name: 'SocialCare AI', type: 'Customer Engagement', capabilities: ['Sentiment tracking', 'Response suggestions', 'Escalation routing', 'Trend reporting'], automationLevel: 77 }
      },
      {
        id: 'R-018', category: 'reputational', description: 'Brand perception issues in wealth management', score: 11, status: 'monitoring', severity: 'major', likelihood: 'medium', owner: 'Marketing Director', lastUpdated: '2024-04-03', mitigationActions: ['Brand refresh', 'Client testimonials'],
        inputSources: ['Brand surveys', 'NPS scores', 'Focus groups', 'Media mentions'],
        mlModel: { name: 'BrandHealth-AI', type: 'Brand Analytics', accuracy: 86.8 },
        aiAgent: { name: 'BrandInsight AI', type: 'Marketing Intelligence', capabilities: ['Perception tracking', 'Campaign analysis', 'Message testing', 'Audience segmentation'], automationLevel: 64 }
      },
      {
        id: 'R-019', category: 'operational', description: 'Third-party vendor performance issues', score: 12, status: 'active', severity: 'major', likelihood: 'medium', owner: 'Procurement', lastUpdated: '2024-04-02', mitigationActions: ['Vendor review', 'SLA enforcement'],
        inputSources: ['Vendor scorecards', 'SLA reports', 'Incident logs', 'Contract terms'],
        mlModel: { name: 'VendorRisk-ML', type: 'Performance Prediction', accuracy: 87.9 },
        aiAgent: { name: 'VendorManager AI', type: 'Vendor Management', capabilities: ['Performance monitoring', 'Risk scoring', 'Contract analysis', 'Renewal recommendations'], automationLevel: 73 }
      },
      {
        id: 'R-020', category: 'operational', description: 'Business continuity plan gaps', score: 11, status: 'monitoring', severity: 'major', likelihood: 'medium', owner: 'Risk Manager', lastUpdated: '2024-04-01', mitigationActions: ['BCP update', 'Testing schedule'],
        inputSources: ['BCP documents', 'Test results', 'Incident history', 'Dependency maps'],
        mlModel: { name: 'BCPAnalyzer', type: 'Gap Analysis', accuracy: 89.3 },
        aiAgent: { name: 'ResilienceAI', type: 'Business Continuity', capabilities: ['Gap identification', 'Scenario simulation', 'Recovery planning', 'Test automation'], automationLevel: 66 }
      },
      // Likely + Minor: C(2), L(2), S(1)
      {
        id: 'R-021', category: 'compliance', description: 'Minor regulatory reporting delays', score: 8, status: 'monitoring', severity: 'minor', likelihood: 'likely', owner: 'Regulatory Affairs', lastUpdated: '2024-03-30', mitigationActions: ['Process automation', 'Staff training'],
        inputSources: ['Reporting calendars', 'Data sources', 'Submission logs', 'Regulatory updates'],
        mlModel: { name: 'ReportTrack-AI', type: 'Process Mining', accuracy: 92.4 },
        aiAgent: { name: 'RegReport AI', type: 'Regulatory Reporting', capabilities: ['Data validation', 'Report generation', 'Deadline tracking', 'Submission automation'], automationLevel: 85 }
      },
      {
        id: 'R-022', category: 'compliance', description: 'Documentation gaps in loan origination', score: 7, status: 'monitoring', severity: 'minor', likelihood: 'likely', owner: 'Operations Manager', lastUpdated: '2024-03-29', mitigationActions: ['Checklist update', 'Quality review'],
        inputSources: ['Loan files', 'Checklist completions', 'QC reports', 'Exception logs'],
        mlModel: { name: 'DocComplete-ML', type: 'Document Analysis', accuracy: 94.6 },
        aiAgent: { name: 'LoanDoc AI', type: 'Document Management', capabilities: ['Completeness checking', 'Data extraction', 'Error flagging', 'Auto-population'], automationLevel: 88 }
      },
      {
        id: 'R-023', category: 'compliance', description: 'Contract renewal disputes with suppliers', score: 8, status: 'monitoring', severity: 'minor', likelihood: 'likely', owner: 'Procurement Legal', lastUpdated: '2024-03-28', mitigationActions: ['Contract review', 'Negotiation training'],
        inputSources: ['Contract database', 'Renewal schedules', 'Negotiation history', 'Market rates'],
        mlModel: { name: 'ContractRisk-v2', type: 'Contract Analytics', accuracy: 88.7 },
        aiAgent: { name: 'NegotiateAI', type: 'Contract Negotiation', capabilities: ['Term analysis', 'Benchmark comparison', 'Risk assessment', 'Playbook suggestions'], automationLevel: 61 }
      },
      {
        id: 'R-024', category: 'compliance', description: 'Employee grievance procedures review needed', score: 7, status: 'monitoring', severity: 'minor', likelihood: 'likely', owner: 'HR Legal', lastUpdated: '2024-03-27', mitigationActions: ['Policy update', 'Manager training'],
        inputSources: ['Grievance records', 'Policy documents', 'Case outcomes', 'Benchmark data'],
        mlModel: { name: 'HRRisk-Analyzer', type: 'Case Prediction', accuracy: 82.3 },
        aiAgent: { name: 'HRAdvisor AI', type: 'HR Compliance', capabilities: ['Policy analysis', 'Case routing', 'Resolution suggestions', 'Training recommendations'], automationLevel: 58 }
      },
      {
        id: 'R-025', category: 'strategic', description: 'Branch optimization timing concerns', score: 8, status: 'monitoring', severity: 'minor', likelihood: 'likely', owner: 'Retail Banking', lastUpdated: '2024-03-26', mitigationActions: ['Market analysis', 'Pilot program'],
        inputSources: ['Branch performance', 'Foot traffic data', 'Digital adoption', 'Demographics'],
        mlModel: { name: 'BranchOptimize-ML', type: 'Location Analytics', accuracy: 85.1 },
        aiAgent: { name: 'NetworkPlan AI', type: 'Network Strategy', capabilities: ['Performance analysis', 'Closure modeling', 'Impact simulation', 'Migration planning'], automationLevel: 63 }
      },
      // Likely + Moderate: O(2)
      {
        id: 'R-026', category: 'operational', description: 'IT infrastructure maintenance backlog', score: 9, status: 'monitoring', severity: 'moderate', likelihood: 'likely', owner: 'IT Operations', lastUpdated: '2024-03-25', mitigationActions: ['Maintenance schedule', 'Budget allocation'],
        inputSources: ['Asset inventory', 'Maintenance logs', 'Failure records', 'Vendor support status'],
        mlModel: { name: 'InfraPriority-AI', type: 'Predictive Maintenance', accuracy: 90.8 },
        aiAgent: { name: 'InfraOps AI', type: 'IT Operations', capabilities: ['Priority scoring', 'Schedule optimization', 'Impact assessment', 'Resource allocation'], automationLevel: 75 }
      },
      {
        id: 'R-027', category: 'operational', description: 'Call center response time degradation', score: 9, status: 'monitoring', severity: 'moderate', likelihood: 'likely', owner: 'Customer Service', lastUpdated: '2024-03-24', mitigationActions: ['Staffing review', 'Process optimization'],
        inputSources: ['Call metrics', 'Queue data', 'Agent performance', 'Customer feedback'],
        mlModel: { name: 'ServicePredict-v3', type: 'Workforce Analytics', accuracy: 88.5 },
        aiAgent: { name: 'ContactCenter AI', type: 'Service Optimization', capabilities: ['Demand forecasting', 'Routing optimization', 'Agent assist', 'Quality monitoring'], automationLevel: 82 }
      },
    ],
    // Total: C=6, L=5, O=6, S=3, R=4, CY=2, F=1, PW=0 => 27
    // High = extreme/major OR high/major, Critical = extreme/severe
    // C: extreme/major(1)+high/major(2)=3 high, L: extreme/severe(2)=2 critical
    // O: high/major(2)=2 high, R: high/major(2)=2 high, CY: extreme/severe(2)=2 critical
    // Total: 7 high + 4 critical = 11
    risksByCategory: {
      compliance: { count: 6, high: 3, critical: 0 },
      operational: { count: 6, high: 2, critical: 0 },
      strategic: { count: 3, high: 0, critical: 0 },
      reputational: { count: 4, high: 2, critical: 0 },
      cybersecurity: { count: 2, high: 0, critical: 2 },
      financial: { count: 1, high: 0, critical: 0 },
      people_workforce: { count: 0, high: 0, critical: 0 },
    },
    // Heat map must sum to 27 and match category totals
    // C=6: extreme/major(1), high/major(2), medium/moderate(1), likely/minor(2)
    // L=5: extreme/severe(2), medium/moderate(1), likely/minor(2)
    // O=6: extreme/severe(2), high/major(2), medium/major(2)
    // S=3: medium/moderate(2), likely/minor(1)
    // R=4: high/major(2), medium/major(2)
    // CY=2: extreme/severe(2)
    // F=1: high/minor(1)
    heatMapData: [
      { likelihood: 'extreme', severity: 'major', count: 1, categories: { compliance: 1 } },
      { likelihood: 'extreme', severity: 'severe', count: 4, categories: { cybersecurity: 2, operational: 2 } },
      { likelihood: 'high', severity: 'minor', count: 1, categories: { financial: 1 } },
      { likelihood: 'high', severity: 'major', count: 6, categories: { compliance: 2, reputational: 2, operational: 2 } },
      { likelihood: 'medium', severity: 'moderate', count: 4, categories: { compliance: 1, operational: 1, strategic: 2 } },
      { likelihood: 'medium', severity: 'major', count: 4, categories: { reputational: 2, operational: 2 } },
      { likelihood: 'likely', severity: 'minor', count: 5, categories: { compliance: 2, operational: 2, strategic: 1 } },
      { likelihood: 'likely', severity: 'moderate', count: 2, categories: { operational: 2 } },
    ],
    kris: [
      { id: 'kri-1', name: 'Capacity and Talent Shortages', value: 15, unit: '%', trend: 'up', trendPercent: 8, threshold: 20, status: 'warning', description: 'Inability to attract or retain key talent to deliver regulatory tasks.' },
      { id: 'kri-2', name: 'Knowledge Loss', value: 4, unit: '', trend: 'stable', trendPercent: 0, threshold: 5, status: 'warning', description: 'Loss of "corporate memory" when key staff retire or resign, which can lead to inconsistent enforcement of the Trust in Real Estate Services Act (TRESA).' },
      { id: 'kri-3', name: 'Culture and Ethics Risk', value: 12, unit: '', trend: 'down', trendPercent: 5, threshold: 10, status: 'good', description: 'Danger of internal misconduct, lack of transparency, or a "silo" mentality that may undermine or damage public trust.' },
      { id: 'kri-4', name: 'Health, Safety, and Well-being', value: 8, unit: '', trend: 'up', trendPercent: 12, threshold: 10, status: 'warning', description: 'Risk related to workplace stress, harassment, or physical safety that can lead to high absenteeism and decreased productivity.' },
      { id: 'kri-5', name: 'Skills', value: 88, unit: '%', trend: 'stable', trendPercent: 2, threshold: 85, status: 'good', description: 'Workforce competency and skills to deliver mandate.' },
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
  'comp-reg-002': { // Suncor Energy
    companyId: 'comp-reg-002',
    totalRisks: 31,
    activeRisks: 31,
    highCriticalRisks: 14, // 10 high + 4 critical = 14
    criticalRisks: 4,
    risks: [
      {
        id: 'R-101',
        category: 'compliance',
        description: 'Environmental permit renewal delays',
        score: 18,
        status: 'active',
        severity: 'severe',
        likelihood: 'high',
        owner: 'Compliance Director',
        lastUpdated: '2024-04-22',
        mitigationActions: ['Expedite applications', 'Engage regulators'],
      },
      {
        id: 'R-102',
        category: 'cybersecurity',
        description: 'SCADA system vulnerability detected',
        score: 17,
        status: 'active',
        severity: 'severe',
        likelihood: 'extreme',
        owner: 'CISO',
        lastUpdated: '2024-04-20',
        mitigationActions: ['Patch systems', 'Network segmentation'],
      },
      {
        id: 'R-103',
        category: 'operational',
        description: 'Pipeline maintenance backlog',
        score: 14,
        status: 'monitoring',
        severity: 'major',
        likelihood: 'high',
        owner: 'Operations VP',
        lastUpdated: '2024-04-18',
        mitigationActions: ['Increase maintenance crews', 'Prioritize critical segments'],
      },
      {
        id: 'R-104',
        category: 'compliance',
        description: 'Indigenous land rights litigation',
        score: 15,
        status: 'active',
        severity: 'major',
        likelihood: 'extreme',
        owner: 'Legal Counsel',
        lastUpdated: '2024-04-16',
        mitigationActions: ['Engage stakeholders', 'Mediation process'],
      },
      {
        id: 'R-105',
        category: 'reputational',
        description: 'ESG rating downgrade risk',
        score: 12,
        status: 'monitoring',
        severity: 'moderate',
        likelihood: 'high',
        owner: 'Communications',
        lastUpdated: '2024-04-14',
        mitigationActions: ['ESG improvement plan', 'Stakeholder engagement'],
      },
    ],
    // Total: C=8, L=4, O=7, S=4, R=3, CY=3, F=2, PW=0 => 31
    // Critical = extreme/severe: CY(2)+C(1)+O(1) = 4
    // High = extreme/major + high/major: C(2+2)+L(2)+O(3)+CY(1) = 10
    risksByCategory: {
      compliance: { count: 8, high: 4, critical: 1 },
      operational: { count: 7, high: 3, critical: 1 },
      strategic: { count: 4, high: 0, critical: 0 },
      reputational: { count: 3, high: 0, critical: 0 },
      cybersecurity: { count: 3, high: 1, critical: 2 },
      financial: { count: 2, high: 0, critical: 0 },
      people_workforce: { count: 0, high: 0, critical: 0 },
    },
    // Heat map sums to 31
    // C=8: extreme/severe(1), extreme/major(2), high/major(2), medium/moderate(3)
    // L=4: extreme/major(2), high/moderate(2)
    // O=7: extreme/severe(1), high/major(3), medium/moderate(2), likely/minor(1)
    // S=4: medium/moderate(2), likely/minor(2)
    // R=3: high/moderate(1), medium/moderate(2)
    // CY=3: extreme/severe(2), high/major(1)
    // F=2: likely/minor(2)
    heatMapData: [
      { likelihood: 'extreme', severity: 'severe', count: 4, categories: { cybersecurity: 2, compliance: 1, operational: 1 } },
      { likelihood: 'extreme', severity: 'major', count: 4, categories: { compliance: 2, operational: 2 } },
      { likelihood: 'high', severity: 'major', count: 6, categories: { compliance: 2, operational: 3, cybersecurity: 1 } },
      { likelihood: 'high', severity: 'moderate', count: 3, categories: { operational: 2, reputational: 1 } },
      { likelihood: 'medium', severity: 'moderate', count: 9, categories: { compliance: 3, operational: 2, strategic: 2, reputational: 2 } },
      { likelihood: 'likely', severity: 'minor', count: 5, categories: { strategic: 2, operational: 1, financial: 2 } },
    ],
    kris: [
      { id: 'kri-1', name: 'Environmental Incidents', value: 12, unit: '', trend: 'up', trendPercent: 18, threshold: 10, status: 'critical' },
      { id: 'kri-2', name: 'Permit Compliance', value: 72, unit: '%', trend: 'down', trendPercent: 5, threshold: 80, status: 'warning' },
      { id: 'kri-3', name: 'System Uptime', value: 99.2, unit: '%', trend: 'stable', trendPercent: 0, threshold: 99.5, status: 'warning' },
      { id: 'kri-4', name: 'Safety Incidents', value: 8, unit: '', trend: 'up', trendPercent: 8, threshold: 10, status: 'warning' },
    ],
    recentAlerts: [
      { id: 'alert-1', message: 'Environmental incident rate above threshold', timestamp: '2024-04-22', severity: 'critical' },
      { id: 'alert-2', message: 'SCADA vulnerability requires immediate patching', timestamp: '2024-04-20', severity: 'critical' },
      { id: 'alert-3', message: 'Pipeline inspection overdue in 3 segments', timestamp: '2024-04-18', severity: 'warning' },
    ],
    ermInsights: [
      { id: 'erm-1', recommendation: 'Accelerate environmental compliance program', priority: 'high', category: 'compliance' },
      { id: 'erm-2', recommendation: 'Immediate SCADA security hardening', priority: 'high', category: 'cybersecurity' },
      { id: 'erm-3', recommendation: 'Review pipeline maintenance schedule', priority: 'medium', category: 'operational' },
    ],
  },
  'comp-reg-003': { // Shopify
    companyId: 'comp-reg-003',
    totalRisks: 22,
    activeRisks: 22,
    highCriticalRisks: 4, // 3 high + 1 critical = 4
    criticalRisks: 1,
    risks: [
      {
        id: 'R-201',
        category: 'compliance',
        description: 'GDPR cross-border data transfer compliance',
        score: 14,
        status: 'active',
        severity: 'major',
        likelihood: 'high',
        owner: 'DPO',
        lastUpdated: '2024-04-21',
        mitigationActions: ['Data localization', 'SCCs update'],
      },
      {
        id: 'R-202',
        category: 'strategic',
        description: 'Market share loss to competitors',
        score: 16,
        status: 'active',
        severity: 'severe',
        likelihood: 'medium',
        owner: 'CEO',
        lastUpdated: '2024-04-19',
        mitigationActions: ['Product innovation', 'Pricing strategy'],
      },
      {
        id: 'R-203',
        category: 'operational',
        description: 'Platform scalability during peak events',
        score: 13,
        status: 'monitoring',
        severity: 'major',
        likelihood: 'medium',
        owner: 'CTO',
        lastUpdated: '2024-04-17',
        mitigationActions: ['Infrastructure upgrade', 'Load testing'],
      },
      {
        id: 'R-204',
        category: 'cybersecurity',
        description: 'API security vulnerabilities',
        score: 12,
        status: 'active',
        severity: 'moderate',
        likelihood: 'high',
        owner: 'Security Lead',
        lastUpdated: '2024-04-15',
        mitigationActions: ['API gateway hardening', 'Penetration testing'],
      },
      {
        id: 'R-205',
        category: 'compliance',
        description: 'Merchant disputes and chargebacks',
        score: 10,
        status: 'monitoring',
        severity: 'moderate',
        likelihood: 'medium',
        owner: 'Legal',
        lastUpdated: '2024-04-13',
        mitigationActions: ['Fraud detection', 'Dispute resolution'],
      },
    ],
    // Total: C=5, L=3, O=4, S=4, R=2, CY=2, F=2, PW=0 => 22
    // Critical = extreme/severe: S(1) = 1
    // High = high/major: C(2)+O(1) = 3
    risksByCategory: {
      compliance: { count: 5, high: 2, critical: 0 },
      operational: { count: 4, high: 1, critical: 0 },
      strategic: { count: 4, high: 0, critical: 1 },
      reputational: { count: 2, high: 0, critical: 0 },
      cybersecurity: { count: 2, high: 0, critical: 0 },
      financial: { count: 2, high: 0, critical: 0 },
      people_workforce: { count: 0, high: 0, critical: 0 },
    },
    // Heat map sums to 22
    // C=5: high/major(2), medium/moderate(2), likely/minor(1)
    // L=3: medium/moderate(2), likely/minor(1)
    // O=4: high/major(1), medium/moderate(2), likely/minor(1)
    // S=4: extreme/severe(1), high/moderate(1), medium/minor(2)
    // R=2: medium/moderate(1), likely/minor(1)
    // CY=2: high/moderate(1), medium/moderate(1)
    // F=2: likely/insignificant(2)
    heatMapData: [
      { likelihood: 'extreme', severity: 'severe', count: 1, categories: { strategic: 1 } },
      { likelihood: 'high', severity: 'major', count: 3, categories: { compliance: 2, operational: 1 } },
      { likelihood: 'high', severity: 'moderate', count: 2, categories: { strategic: 1, cybersecurity: 1 } },
      { likelihood: 'medium', severity: 'moderate', count: 8, categories: { compliance: 2, operational: 4, reputational: 1, cybersecurity: 1 } },
      { likelihood: 'medium', severity: 'minor', count: 2, categories: { strategic: 2 } },
      { likelihood: 'likely', severity: 'minor', count: 4, categories: { compliance: 1, operational: 2, reputational: 1 } },
      { likelihood: 'likely', severity: 'insignificant', count: 2, categories: { financial: 2 } },
    ],
    kris: [
      { id: 'kri-1', name: 'Platform Uptime', value: 99.95, unit: '%', trend: 'stable', trendPercent: 0, threshold: 99.9, status: 'good' },
      { id: 'kri-2', name: 'API Response Time', value: 142, unit: 'ms', trend: 'up', trendPercent: 8, threshold: 150, status: 'warning' },
      { id: 'kri-3', name: 'Merchant Satisfaction', value: 87, unit: '%', trend: 'up', trendPercent: 2, threshold: 85, status: 'good' },
      { id: 'kri-4', name: 'Security Incidents', value: 3, unit: '', trend: 'down', trendPercent: 25, threshold: 5, status: 'good' },
    ],
    recentAlerts: [
      { id: 'alert-1', message: 'GDPR audit scheduled for next month', timestamp: '2024-04-21', severity: 'warning' },
      { id: 'alert-2', message: 'API latency increasing during peak hours', timestamp: '2024-04-19', severity: 'info' },
    ],
    ermInsights: [
      { id: 'erm-1', recommendation: 'Prioritize GDPR compliance workstream', priority: 'high', category: 'compliance' },
      { id: 'erm-2', recommendation: 'Accelerate platform scalability initiatives', priority: 'medium', category: 'operational' },
      { id: 'erm-3', recommendation: 'Enhance API security monitoring', priority: 'medium', category: 'cybersecurity' },
    ],
  },
  'comp-reg-004': { // Pfizer Canada
    companyId: 'comp-reg-004',
    totalRisks: 19,
    activeRisks: 19,
    highCriticalRisks: 2, // 2 high + 0 critical = 2
    criticalRisks: 0,
    risks: [
      {
        id: 'R-301',
        category: 'compliance',
        description: 'Health Canada GMP inspection findings',
        score: 14,
        status: 'active',
        severity: 'major',
        likelihood: 'high',
        owner: 'Quality Director',
        lastUpdated: '2024-04-21',
        mitigationActions: ['CAPA implementation', 'Process validation'],
      },
      {
        id: 'R-302',
        category: 'operational',
        description: 'Supply chain disruption for API materials',
        score: 13,
        status: 'monitoring',
        severity: 'major',
        likelihood: 'medium',
        owner: 'Supply Chain VP',
        lastUpdated: '2024-04-19',
        mitigationActions: ['Dual sourcing', 'Safety stock increase'],
      },
      {
        id: 'R-303',
        category: 'compliance',
        description: 'Patent expiry on key products',
        score: 11,
        status: 'active',
        severity: 'moderate',
        likelihood: 'high',
        owner: 'Legal Counsel',
        lastUpdated: '2024-04-17',
        mitigationActions: ['New formulation patents', 'Lifecycle management'],
      },
      {
        id: 'R-304',
        category: 'cybersecurity',
        description: 'Clinical trial data protection',
        score: 12,
        status: 'active',
        severity: 'major',
        likelihood: 'medium',
        owner: 'CISO',
        lastUpdated: '2024-04-15',
        mitigationActions: ['Encryption upgrade', 'Access controls'],
      },
      {
        id: 'R-305',
        category: 'reputational',
        description: 'Drug pricing controversy',
        score: 10,
        status: 'monitoring',
        severity: 'moderate',
        likelihood: 'medium',
        owner: 'Communications',
        lastUpdated: '2024-04-13',
        mitigationActions: ['Pricing transparency', 'Patient assistance programs'],
      },
    ],
    // Total: C=5, L=3, O=4, S=2, R=2, CY=2, F=1, PW=0 => 19
    // Critical = extreme/severe: 0
    // High = high/major: C(2) = 2
    risksByCategory: {
      compliance: { count: 5, high: 2, critical: 0 },
      operational: { count: 4, high: 0, critical: 0 },
      strategic: { count: 2, high: 0, critical: 0 },
      reputational: { count: 2, high: 0, critical: 0 },
      cybersecurity: { count: 2, high: 0, critical: 0 },
      financial: { count: 1, high: 0, critical: 0 },
      people_workforce: { count: 0, high: 0, critical: 0 },
    },
    // Heat map sums to 19
    // C=5: high/major(2), medium/moderate(2), likely/minor(1)
    // L=3: high/moderate(1), medium/moderate(2)
    // O=4: medium/major(2), medium/moderate(1), likely/minor(1)
    // S=2: medium/moderate(1), likely/minor(1)
    // R=2: medium/moderate(2)
    // CY=2: medium/major(1), high/moderate(1)
    // F=1: likely/insignificant(1)
    heatMapData: [
      { likelihood: 'high', severity: 'major', count: 2, categories: { compliance: 2 } },
      { likelihood: 'high', severity: 'moderate', count: 2, categories: { operational: 1, cybersecurity: 1 } },
      { likelihood: 'medium', severity: 'major', count: 3, categories: { operational: 2, cybersecurity: 1 } },
      { likelihood: 'medium', severity: 'moderate', count: 8, categories: { compliance: 2, operational: 3, strategic: 1, reputational: 2 } },
      { likelihood: 'likely', severity: 'minor', count: 3, categories: { compliance: 1, operational: 1, strategic: 1 } },
      { likelihood: 'likely', severity: 'insignificant', count: 1, categories: { financial: 1 } },
    ],
    kris: [
      { id: 'kri-1', name: 'GMP Compliance Score', value: 94, unit: '%', trend: 'stable', trendPercent: 0, threshold: 95, status: 'warning' },
      { id: 'kri-2', name: 'Batch Release Time', value: 18, unit: 'days', trend: 'down', trendPercent: 10, threshold: 21, status: 'good' },
      { id: 'kri-3', name: 'Adverse Event Reports', value: 12, unit: '', trend: 'up', trendPercent: 15, threshold: 15, status: 'warning' },
      { id: 'kri-4', name: 'Supply Chain Score', value: 88, unit: '%', trend: 'stable', trendPercent: 0, threshold: 85, status: 'good' },
    ],
    recentAlerts: [
      { id: 'alert-1', message: 'Health Canada inspection scheduled for next quarter', timestamp: '2024-04-21', severity: 'warning' },
      { id: 'alert-2', message: 'API supplier audit findings require follow-up', timestamp: '2024-04-19', severity: 'info' },
    ],
    ermInsights: [
      { id: 'erm-1', recommendation: 'Complete CAPA for GMP findings before inspection', priority: 'high', category: 'compliance' },
      { id: 'erm-2', recommendation: 'Diversify API supplier base', priority: 'medium', category: 'operational' },
      { id: 'erm-3', recommendation: 'Strengthen clinical data security', priority: 'medium', category: 'cybersecurity' },
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
