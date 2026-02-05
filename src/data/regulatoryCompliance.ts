// Regulatory Compliance Module Data

export type RegulatoryFramework =
  | 'pipeda'           // Personal Information Protection and Electronic Documents Act
  | 'osfi'             // Office of the Superintendent of Financial Institutions
  | 'csa'              // Canadian Securities Administrators
  | 'neb'              // National Energy Board / Canada Energy Regulator
  | 'health_canada'    // Health Canada regulations
  | 'transport_canada' // Transport Canada regulations
  | 'environment_canada' // Environment and Climate Change Canada
  | 'provincial'       // Provincial regulations
  | 'ai_act'           // Proposed AI regulations
  | 'aml_atf'          // Anti-Money Laundering / Anti-Terrorist Financing
  | 'gdpr_adequacy'    // GDPR Adequacy (for international operations)
  | 'sox';             // Sarbanes-Oxley (for US-listed companies)

export type ComplianceStatus = 'compliant' | 'at_risk' | 'non_compliant' | 'pending_review' | 'exempt';

export type AgentType =
  | 'document_analyzer'
  | 'policy_monitor'
  | 'audit_assistant'
  | 'risk_assessor'
  | 'report_generator'
  | 'change_detector'
  | 'training_coordinator'
  | 'incident_responder';

export type ProcessStatus = 'active' | 'pending' | 'completed' | 'failed' | 'scheduled';

export type ProcessType =
  | 'approval_workflow'
  | 'notification'
  | 'data_extraction'
  | 'validation'
  | 'reporting'
  | 'escalation'
  | 'remediation'
  | 'archival';

export interface RegulatoryRequirement {
  id: string;
  framework: RegulatoryFramework;
  name: string;
  description: string;
  effectiveDate: string;
  deadlineDate?: string;
  penaltyRange: string;
  affectedSectors: string[];
}

export interface ComplianceAgent {
  id: string;
  name: string;
  type: AgentType;
  description: string;
  model: string;
  framework: string;
  capabilities: string[];
  automationLevel: number; // 0-100%
  accuracyRate: number; // percentage
  monthlyProcessed: number;
  avgResponseTime: string;
  status: 'active' | 'training' | 'maintenance' | 'inactive';
  lastUpdated: string;
  downstreamProcesses: string[]; // IDs of processes this agent triggers
}

export interface DownstreamProcess {
  id: string;
  name: string;
  type: ProcessType;
  description: string;
  triggeredBy: string[]; // Agent IDs or event types
  steps: ProcessStep[];
  sla: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  automationLevel: number;
  successRate: number;
  avgDuration: string;
}

export interface ProcessStep {
  order: number;
  name: string;
  type: 'automated' | 'manual' | 'hybrid';
  assignee?: string;
  duration: string;
}

export interface ComplianceMetric {
  framework: RegulatoryFramework;
  status: ComplianceStatus;
  score: number; // 0-100
  lastAudit: string;
  nextAudit: string;
  openIssues: number;
  resolvedIssues: number;
}

export interface ComplianceCompany {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  employees: number;
  regulatedSince: number;
  primaryRegulator: string;
  complianceTeamSize: number;
  annualComplianceBudget: number; // millions CAD
  description: string;

  // Compliance metrics by framework
  complianceMetrics: ComplianceMetric[];

  // AI Agents deployed
  agents: ComplianceAgent[];

  // Downstream processes
  processes: DownstreamProcess[];

  // Aggregate stats
  overallComplianceScore: number;
  automationRate: number;
  monthlyDocumentsProcessed: number;
  avgResolutionTime: string;
  costSavingsPercent: number;
}

// Regulatory Frameworks Data
export const regulatoryFrameworks: Record<RegulatoryFramework, { name: string; regulator: string; color: string; description: string }> = {
  pipeda: {
    name: 'PIPEDA',
    regulator: 'Office of the Privacy Commissioner',
    color: '#3498DB',
    description: 'Personal Information Protection and Electronic Documents Act - governs how private sector organizations collect, use, and disclose personal information.',
  },
  osfi: {
    name: 'OSFI Guidelines',
    regulator: 'Office of the Superintendent of Financial Institutions',
    color: '#2ECC71',
    description: 'Prudential regulation and supervision of federally regulated financial institutions and pension plans.',
  },
  csa: {
    name: 'CSA Regulations',
    regulator: 'Canadian Securities Administrators',
    color: '#9B59B6',
    description: 'Securities regulation including disclosure requirements, trading rules, and investor protection.',
  },
  neb: {
    name: 'CER Regulations',
    regulator: 'Canada Energy Regulator',
    color: '#E67E22',
    description: 'Regulation of pipelines, energy development, and trade in the Canadian public interest.',
  },
  health_canada: {
    name: 'Health Canada',
    regulator: 'Health Canada',
    color: '#E74C3C',
    description: 'Regulation of health products, food safety, and environmental health.',
  },
  transport_canada: {
    name: 'Transport Canada',
    regulator: 'Transport Canada',
    color: '#1ABC9C',
    description: 'Regulation of transportation safety, security, and environmental responsibility.',
  },
  environment_canada: {
    name: 'ECCC Regulations',
    regulator: 'Environment and Climate Change Canada',
    color: '#27AE60',
    description: 'Environmental protection, pollution prevention, and climate change mitigation regulations.',
  },
  provincial: {
    name: 'Provincial Regulations',
    regulator: 'Various Provincial Authorities',
    color: '#F1C40F',
    description: 'Province-specific regulations covering various sectors and activities.',
  },
  ai_act: {
    name: 'AI Governance',
    regulator: 'Innovation, Science and Economic Development',
    color: '#FF6B35',
    description: 'Emerging AI governance framework and voluntary codes of conduct for AI systems.',
  },
  aml_atf: {
    name: 'AML/ATF',
    regulator: 'FINTRAC',
    color: '#C0392B',
    description: 'Anti-Money Laundering and Anti-Terrorist Financing requirements.',
  },
  gdpr_adequacy: {
    name: 'GDPR Adequacy',
    regulator: 'European Commission (via OPC)',
    color: '#8E44AD',
    description: 'Requirements for adequate data protection when transferring data to/from EU.',
  },
  sox: {
    name: 'SOX Compliance',
    regulator: 'SEC / PCAOB',
    color: '#34495E',
    description: 'Sarbanes-Oxley requirements for companies listed on US exchanges.',
  },
};

// Sample Companies with Full Compliance Data
export const complianceCompanies: ComplianceCompany[] = [
  {
    id: 'comp-reg-001',
    name: 'Real Estate Council of Ontario',
    industry: 'Financial Services',
    headquarters: 'Toronto, ON',
    employees: 92000,
    regulatedSince: 1869,
    primaryRegulator: 'OSFI',
    complianceTeamSize: 1200,
    annualComplianceBudget: 450,
    description: 'Canada\'s largest bank by market capitalization, operating in personal and commercial banking, wealth management, insurance, and capital markets.',
    complianceMetrics: [
      { framework: 'osfi', status: 'compliant', score: 96, lastAudit: '2024-03-15', nextAudit: '2024-09-15', openIssues: 3, resolvedIssues: 45 },
      { framework: 'pipeda', status: 'compliant', score: 94, lastAudit: '2024-02-20', nextAudit: '2024-08-20', openIssues: 5, resolvedIssues: 32 },
      { framework: 'aml_atf', status: 'compliant', score: 98, lastAudit: '2024-04-01', nextAudit: '2024-10-01', openIssues: 1, resolvedIssues: 28 },
      { framework: 'csa', status: 'compliant', score: 95, lastAudit: '2024-01-10', nextAudit: '2024-07-10', openIssues: 4, resolvedIssues: 38 },
      { framework: 'sox', status: 'compliant', score: 97, lastAudit: '2024-03-30', nextAudit: '2024-09-30', openIssues: 2, resolvedIssues: 22 },
      { framework: 'ai_act', status: 'pending_review', score: 78, lastAudit: '2024-04-15', nextAudit: '2024-10-15', openIssues: 12, resolvedIssues: 8 },
    ],
    agents: [
      {
        id: 'agent-001-1',
        name: 'RegDoc Analyzer',
        type: 'document_analyzer',
        description: 'Analyzes regulatory documents, extracts requirements, and maps them to internal policies',
        model: 'RBC-RegAnalyzer-13B',
        framework: 'LangChain',
        capabilities: ['Document parsing', 'Requirement extraction', 'Policy mapping', 'Gap analysis', 'Multi-language support'],
        automationLevel: 85,
        accuracyRate: 97.2,
        monthlyProcessed: 12500,
        avgResponseTime: '2.3 seconds',
        status: 'active',
        lastUpdated: '2024-04-20',
        downstreamProcesses: ['proc-001-1', 'proc-001-2'],
      },
      {
        id: 'agent-001-2',
        name: 'PolicyWatch',
        type: 'policy_monitor',
        description: 'Monitors regulatory announcements and assesses impact on bank operations',
        model: 'Mistral-7B-PolicyTuned',
        framework: 'Haystack',
        capabilities: ['Real-time monitoring', 'Impact assessment', 'Stakeholder notification', 'Timeline tracking'],
        automationLevel: 92,
        accuracyRate: 94.8,
        monthlyProcessed: 3200,
        avgResponseTime: '45 seconds',
        status: 'active',
        lastUpdated: '2024-04-18',
        downstreamProcesses: ['proc-001-3', 'proc-001-4'],
      },
      {
        id: 'agent-001-3',
        name: 'AuditAssist',
        type: 'audit_assistant',
        description: 'Prepares audit documentation, answers auditor queries, and tracks findings',
        model: 'RBC-Audit-70B',
        framework: 'LlamaIndex',
        capabilities: ['Evidence gathering', 'Query response', 'Finding tracking', 'Report generation', 'Remediation planning'],
        automationLevel: 75,
        accuracyRate: 96.5,
        monthlyProcessed: 850,
        avgResponseTime: '8.5 seconds',
        status: 'active',
        lastUpdated: '2024-04-22',
        downstreamProcesses: ['proc-001-5', 'proc-001-6'],
      },
      {
        id: 'agent-001-4',
        name: 'RiskRadar',
        type: 'risk_assessor',
        description: 'Continuous compliance risk assessment and early warning system',
        model: 'GPT-4-RiskTuned',
        framework: 'AutoGen',
        capabilities: ['Risk scoring', 'Trend analysis', 'Predictive alerts', 'Control effectiveness', 'Scenario modeling'],
        automationLevel: 88,
        accuracyRate: 91.3,
        monthlyProcessed: 45000,
        avgResponseTime: '1.2 seconds',
        status: 'active',
        lastUpdated: '2024-04-21',
        downstreamProcesses: ['proc-001-7'],
      },
      {
        id: 'agent-001-5',
        name: 'ComplianceReporter',
        type: 'report_generator',
        description: 'Generates regulatory reports, board packages, and regulator submissions',
        model: 'Claude-3-Reports',
        framework: 'Custom',
        capabilities: ['Report drafting', 'Data aggregation', 'Visualization', 'Multi-format export', 'Version control'],
        automationLevel: 82,
        accuracyRate: 98.1,
        monthlyProcessed: 450,
        avgResponseTime: '35 seconds',
        status: 'active',
        lastUpdated: '2024-04-19',
        downstreamProcesses: ['proc-001-8'],
      },
    ],
    processes: [
      {
        id: 'proc-001-1',
        name: 'Regulatory Change Assessment',
        type: 'approval_workflow',
        description: 'End-to-end workflow for assessing and implementing regulatory changes',
        triggeredBy: ['agent-001-1', 'agent-001-2'],
        steps: [
          { order: 1, name: 'Change Detection', type: 'automated', duration: '< 1 hour' },
          { order: 2, name: 'Impact Analysis', type: 'automated', duration: '2-4 hours' },
          { order: 3, name: 'Stakeholder Review', type: 'manual', assignee: 'Compliance Team Lead', duration: '1-2 days' },
          { order: 4, name: 'Implementation Plan', type: 'hybrid', assignee: 'Project Manager', duration: '3-5 days' },
          { order: 5, name: 'Executive Approval', type: 'manual', assignee: 'Chief Compliance Officer', duration: '1-2 days' },
          { order: 6, name: 'Implementation', type: 'hybrid', duration: 'Varies' },
        ],
        sla: '30 days from detection to implementation plan approval',
        priority: 'high',
        automationLevel: 65,
        successRate: 94.2,
        avgDuration: '18 days',
      },
      {
        id: 'proc-001-2',
        name: 'Policy Gap Remediation',
        type: 'remediation',
        description: 'Addresses gaps identified between regulatory requirements and current policies',
        triggeredBy: ['agent-001-1'],
        steps: [
          { order: 1, name: 'Gap Documentation', type: 'automated', duration: '1-2 hours' },
          { order: 2, name: 'Risk Prioritization', type: 'automated', duration: '30 minutes' },
          { order: 3, name: 'Remediation Draft', type: 'hybrid', assignee: 'Policy Analyst', duration: '2-5 days' },
          { order: 4, name: 'Legal Review', type: 'manual', assignee: 'Legal Counsel', duration: '3-5 days' },
          { order: 5, name: 'Approval & Publishing', type: 'hybrid', duration: '1-2 days' },
        ],
        sla: '15 business days for high-priority gaps',
        priority: 'high',
        automationLevel: 55,
        successRate: 91.8,
        avgDuration: '12 days',
      },
      {
        id: 'proc-001-3',
        name: 'Regulatory Alert Notification',
        type: 'notification',
        description: 'Automated notification system for regulatory changes affecting business units',
        triggeredBy: ['agent-001-2'],
        steps: [
          { order: 1, name: 'Alert Classification', type: 'automated', duration: '< 5 minutes' },
          { order: 2, name: 'Stakeholder Mapping', type: 'automated', duration: '< 1 minute' },
          { order: 3, name: 'Notification Distribution', type: 'automated', duration: '< 1 minute' },
          { order: 4, name: 'Acknowledgment Tracking', type: 'automated', duration: 'Ongoing' },
        ],
        sla: '< 1 hour from detection to notification',
        priority: 'critical',
        automationLevel: 98,
        successRate: 99.7,
        avgDuration: '12 minutes',
      },
      {
        id: 'proc-001-4',
        name: 'Impact Escalation',
        type: 'escalation',
        description: 'Escalates high-impact regulatory changes to senior leadership',
        triggeredBy: ['agent-001-2', 'agent-001-4'],
        steps: [
          { order: 1, name: 'Impact Scoring', type: 'automated', duration: '< 10 minutes' },
          { order: 2, name: 'Executive Brief Preparation', type: 'automated', duration: '30 minutes' },
          { order: 3, name: 'Leadership Notification', type: 'automated', duration: '< 5 minutes' },
          { order: 4, name: 'Response Coordination', type: 'manual', assignee: 'CCO', duration: '1-2 days' },
        ],
        sla: '< 2 hours for critical impact items',
        priority: 'critical',
        automationLevel: 85,
        successRate: 98.5,
        avgDuration: '45 minutes',
      },
      {
        id: 'proc-001-5',
        name: 'Audit Evidence Collection',
        type: 'data_extraction',
        description: 'Automated collection and organization of audit evidence',
        triggeredBy: ['agent-001-3'],
        steps: [
          { order: 1, name: 'Request Parsing', type: 'automated', duration: '< 5 minutes' },
          { order: 2, name: 'Evidence Search', type: 'automated', duration: '15-30 minutes' },
          { order: 3, name: 'Quality Review', type: 'hybrid', assignee: 'Compliance Analyst', duration: '1-2 hours' },
          { order: 4, name: 'Package Assembly', type: 'automated', duration: '10 minutes' },
        ],
        sla: '24 hours for standard requests, 4 hours for urgent',
        priority: 'high',
        automationLevel: 80,
        successRate: 96.3,
        avgDuration: '3.5 hours',
      },
      {
        id: 'proc-001-6',
        name: 'Finding Remediation Tracking',
        type: 'remediation',
        description: 'Tracks audit findings from identification through closure',
        triggeredBy: ['agent-001-3'],
        steps: [
          { order: 1, name: 'Finding Registration', type: 'automated', duration: '< 5 minutes' },
          { order: 2, name: 'Owner Assignment', type: 'hybrid', assignee: 'Compliance Manager', duration: '1 day' },
          { order: 3, name: 'Action Plan Development', type: 'manual', duration: '3-5 days' },
          { order: 4, name: 'Progress Monitoring', type: 'automated', duration: 'Ongoing' },
          { order: 5, name: 'Closure Validation', type: 'hybrid', duration: '1-2 days' },
        ],
        sla: 'Per regulatory timeline (30-90 days typical)',
        priority: 'high',
        automationLevel: 60,
        successRate: 93.7,
        avgDuration: '42 days',
      },
      {
        id: 'proc-001-7',
        name: 'Risk Alert Response',
        type: 'escalation',
        description: 'Responds to compliance risk alerts with appropriate actions',
        triggeredBy: ['agent-001-4'],
        steps: [
          { order: 1, name: 'Alert Triage', type: 'automated', duration: '< 2 minutes' },
          { order: 2, name: 'Investigation Initiation', type: 'hybrid', assignee: 'Risk Analyst', duration: '1-4 hours' },
          { order: 3, name: 'Root Cause Analysis', type: 'manual', duration: '1-3 days' },
          { order: 4, name: 'Mitigation Implementation', type: 'hybrid', duration: 'Varies' },
        ],
        sla: '4 hours for critical risks, 24 hours for high',
        priority: 'critical',
        automationLevel: 70,
        successRate: 95.2,
        avgDuration: '2.5 days',
      },
      {
        id: 'proc-001-8',
        name: 'Regulatory Report Submission',
        type: 'reporting',
        description: 'End-to-end process for generating and submitting regulatory reports',
        triggeredBy: ['agent-001-5'],
        steps: [
          { order: 1, name: 'Data Aggregation', type: 'automated', duration: '1-2 hours' },
          { order: 2, name: 'Report Generation', type: 'automated', duration: '30-60 minutes' },
          { order: 3, name: 'Quality Assurance', type: 'hybrid', assignee: 'Sr. Compliance Analyst', duration: '2-4 hours' },
          { order: 4, name: 'Management Sign-off', type: 'manual', assignee: 'Director', duration: '1 day' },
          { order: 5, name: 'Submission & Archival', type: 'automated', duration: '< 30 minutes' },
        ],
        sla: 'Per regulatory deadline (T-3 days internal)',
        priority: 'high',
        automationLevel: 75,
        successRate: 99.1,
        avgDuration: '2 days',
      },
    ],
    overallComplianceScore: 95,
    automationRate: 78,
    monthlyDocumentsProcessed: 62000,
    avgResolutionTime: '8.5 days',
    costSavingsPercent: 42,
  },
  {
    id: 'comp-reg-002',
    name: 'Suncor Energy',
    industry: 'Energy',
    headquarters: 'Calgary, AB',
    employees: 13000,
    regulatedSince: 1967,
    primaryRegulator: 'CER / AER',
    complianceTeamSize: 280,
    annualComplianceBudget: 85,
    description: 'Canada\'s largest integrated energy company, developing petroleum resources while advancing the energy transition.',
    complianceMetrics: [
      { framework: 'neb', status: 'compliant', score: 94, lastAudit: '2024-02-28', nextAudit: '2024-08-28', openIssues: 6, resolvedIssues: 52 },
      { framework: 'environment_canada', status: 'at_risk', score: 82, lastAudit: '2024-03-15', nextAudit: '2024-06-15', openIssues: 15, resolvedIssues: 28 },
      { framework: 'provincial', status: 'compliant', score: 91, lastAudit: '2024-01-20', nextAudit: '2024-07-20', openIssues: 8, resolvedIssues: 45 },
      { framework: 'csa', status: 'compliant', score: 96, lastAudit: '2024-04-01', nextAudit: '2024-10-01', openIssues: 2, resolvedIssues: 18 },
      { framework: 'sox', status: 'compliant', score: 95, lastAudit: '2024-03-20', nextAudit: '2024-09-20', openIssues: 3, resolvedIssues: 15 },
    ],
    agents: [
      {
        id: 'agent-002-1',
        name: 'EnviroCompliance AI',
        type: 'document_analyzer',
        description: 'Analyzes environmental permits, reports, and regulatory submissions',
        model: 'Suncor-Enviro-13B',
        framework: 'LangChain',
        capabilities: ['Permit analysis', 'Emission tracking', 'Variance detection', 'Remediation tracking'],
        automationLevel: 80,
        accuracyRate: 95.8,
        monthlyProcessed: 4500,
        avgResponseTime: '3.1 seconds',
        status: 'active',
        lastUpdated: '2024-04-18',
        downstreamProcesses: ['proc-002-1', 'proc-002-2'],
      },
      {
        id: 'agent-002-2',
        name: 'SafetyWatch',
        type: 'risk_assessor',
        description: 'Monitors safety compliance and incident trends across operations',
        model: 'Llama-3-Safety',
        framework: 'AutoGen',
        capabilities: ['Incident analysis', 'Trend prediction', 'Root cause identification', 'Corrective action tracking'],
        automationLevel: 85,
        accuracyRate: 93.2,
        monthlyProcessed: 8200,
        avgResponseTime: '1.8 seconds',
        status: 'active',
        lastUpdated: '2024-04-20',
        downstreamProcesses: ['proc-002-3'],
      },
      {
        id: 'agent-002-3',
        name: 'RegulatoryTracker',
        type: 'policy_monitor',
        description: 'Tracks regulatory changes from CER, AER, and provincial regulators',
        model: 'Mistral-7B-EnergyReg',
        framework: 'Haystack',
        capabilities: ['Multi-jurisdiction monitoring', 'Impact assessment', 'Deadline tracking', 'Stakeholder alerts'],
        automationLevel: 90,
        accuracyRate: 96.1,
        monthlyProcessed: 1800,
        avgResponseTime: '28 seconds',
        status: 'active',
        lastUpdated: '2024-04-19',
        downstreamProcesses: ['proc-002-4'],
      },
    ],
    processes: [
      {
        id: 'proc-002-1',
        name: 'Environmental Permit Renewal',
        type: 'approval_workflow',
        description: 'Manages the end-to-end permit renewal process',
        triggeredBy: ['agent-002-1', 'scheduled'],
        steps: [
          { order: 1, name: 'Permit Expiry Alert', type: 'automated', duration: '90 days advance' },
          { order: 2, name: 'Data Compilation', type: 'automated', duration: '1-2 weeks' },
          { order: 3, name: 'Application Draft', type: 'hybrid', assignee: 'Environmental Engineer', duration: '2-3 weeks' },
          { order: 4, name: 'Internal Review', type: 'manual', assignee: 'Env. Manager', duration: '1 week' },
          { order: 5, name: 'Submission', type: 'automated', duration: '1 day' },
        ],
        sla: 'Submit 60 days before expiry',
        priority: 'high',
        automationLevel: 55,
        successRate: 98.5,
        avgDuration: '45 days',
      },
      {
        id: 'proc-002-2',
        name: 'Emission Variance Response',
        type: 'remediation',
        description: 'Responds to detected emission variances',
        triggeredBy: ['agent-002-1'],
        steps: [
          { order: 1, name: 'Variance Detection', type: 'automated', duration: 'Real-time' },
          { order: 2, name: 'Root Cause Analysis', type: 'hybrid', assignee: 'Operations', duration: '4-24 hours' },
          { order: 3, name: 'Corrective Action', type: 'manual', duration: '1-7 days' },
          { order: 4, name: 'Regulator Notification', type: 'hybrid', duration: 'As required' },
        ],
        sla: '24 hours initial response for significant variances',
        priority: 'critical',
        automationLevel: 60,
        successRate: 92.3,
        avgDuration: '3.5 days',
      },
      {
        id: 'proc-002-3',
        name: 'Safety Incident Escalation',
        type: 'escalation',
        description: 'Escalates safety incidents based on severity',
        triggeredBy: ['agent-002-2'],
        steps: [
          { order: 1, name: 'Incident Classification', type: 'automated', duration: '< 5 minutes' },
          { order: 2, name: 'Immediate Response', type: 'manual', assignee: 'Site Manager', duration: 'Immediate' },
          { order: 3, name: 'Executive Notification', type: 'automated', duration: '< 15 minutes' },
          { order: 4, name: 'Investigation Launch', type: 'hybrid', duration: '24 hours' },
        ],
        sla: '15 minutes for serious incidents',
        priority: 'critical',
        automationLevel: 75,
        successRate: 99.8,
        avgDuration: '25 minutes initial',
      },
      {
        id: 'proc-002-4',
        name: 'Regulatory Change Implementation',
        type: 'approval_workflow',
        description: 'Implements new regulatory requirements across operations',
        triggeredBy: ['agent-002-3'],
        steps: [
          { order: 1, name: 'Change Analysis', type: 'automated', duration: '2-4 hours' },
          { order: 2, name: 'Impact Assessment', type: 'hybrid', assignee: 'Compliance Lead', duration: '3-5 days' },
          { order: 3, name: 'Implementation Plan', type: 'manual', duration: '1-2 weeks' },
          { order: 4, name: 'Execution', type: 'hybrid', duration: 'Varies' },
          { order: 5, name: 'Validation', type: 'hybrid', duration: '1 week' },
        ],
        sla: 'Per regulatory timeline',
        priority: 'high',
        automationLevel: 50,
        successRate: 96.2,
        avgDuration: '35 days',
      },
    ],
    overallComplianceScore: 88,
    automationRate: 68,
    monthlyDocumentsProcessed: 14500,
    avgResolutionTime: '12 days',
    costSavingsPercent: 35,
  },
  {
    id: 'comp-reg-003',
    name: 'Shopify',
    industry: 'Technology',
    headquarters: 'Ottawa, ON',
    employees: 8300,
    regulatedSince: 2006,
    primaryRegulator: 'OPC / Various',
    complianceTeamSize: 85,
    annualComplianceBudget: 28,
    description: 'Global e-commerce platform enabling merchants worldwide, with strong focus on data privacy and AI governance.',
    complianceMetrics: [
      { framework: 'pipeda', status: 'compliant', score: 97, lastAudit: '2024-03-10', nextAudit: '2024-09-10', openIssues: 2, resolvedIssues: 28 },
      { framework: 'gdpr_adequacy', status: 'compliant', score: 96, lastAudit: '2024-02-15', nextAudit: '2024-08-15', openIssues: 3, resolvedIssues: 35 },
      { framework: 'csa', status: 'compliant', score: 94, lastAudit: '2024-01-25', nextAudit: '2024-07-25', openIssues: 4, resolvedIssues: 22 },
      { framework: 'ai_act', status: 'compliant', score: 92, lastAudit: '2024-04-01', nextAudit: '2024-10-01', openIssues: 5, resolvedIssues: 18 },
      { framework: 'sox', status: 'compliant', score: 98, lastAudit: '2024-03-28', nextAudit: '2024-09-28', openIssues: 1, resolvedIssues: 12 },
    ],
    agents: [
      {
        id: 'agent-003-1',
        name: 'PrivacyGuard',
        type: 'document_analyzer',
        description: 'Analyzes data processing activities for privacy compliance',
        model: 'Shopify-Privacy-7B',
        framework: 'LangChain',
        capabilities: ['DPIA automation', 'Consent tracking', 'Data mapping', 'Breach assessment'],
        automationLevel: 88,
        accuracyRate: 97.5,
        monthlyProcessed: 8500,
        avgResponseTime: '1.5 seconds',
        status: 'active',
        lastUpdated: '2024-04-22',
        downstreamProcesses: ['proc-003-1', 'proc-003-2'],
      },
      {
        id: 'agent-003-2',
        name: 'AIGovernance',
        type: 'risk_assessor',
        description: 'Assesses AI systems for fairness, transparency, and compliance',
        model: 'Claude-3-AIGov',
        framework: 'Custom',
        capabilities: ['Bias detection', 'Explainability analysis', 'Risk scoring', 'Documentation generation'],
        automationLevel: 82,
        accuracyRate: 94.2,
        monthlyProcessed: 1200,
        avgResponseTime: '12 seconds',
        status: 'active',
        lastUpdated: '2024-04-20',
        downstreamProcesses: ['proc-003-3'],
      },
      {
        id: 'agent-003-3',
        name: 'MerchantCompliance',
        type: 'change_detector',
        description: 'Monitors merchant activities for compliance with platform policies',
        model: 'Shopify-Merchant-13B',
        framework: 'AutoGen',
        capabilities: ['Policy violation detection', 'Risk scoring', 'Automated warnings', 'Escalation triggers'],
        automationLevel: 95,
        accuracyRate: 96.8,
        monthlyProcessed: 250000,
        avgResponseTime: '0.5 seconds',
        status: 'active',
        lastUpdated: '2024-04-21',
        downstreamProcesses: ['proc-003-4'],
      },
      {
        id: 'agent-003-4',
        name: 'TrainingCoordinator',
        type: 'training_coordinator',
        description: 'Manages compliance training assignments and tracking',
        model: 'Mistral-7B-Training',
        framework: 'LlamaIndex',
        capabilities: ['Training assignment', 'Progress tracking', 'Knowledge assessment', 'Certification management'],
        automationLevel: 90,
        accuracyRate: 98.2,
        monthlyProcessed: 3500,
        avgResponseTime: '2 seconds',
        status: 'active',
        lastUpdated: '2024-04-19',
        downstreamProcesses: ['proc-003-5'],
      },
    ],
    processes: [
      {
        id: 'proc-003-1',
        name: 'Data Subject Request Processing',
        type: 'approval_workflow',
        description: 'Handles GDPR/PIPEDA data subject access and deletion requests',
        triggeredBy: ['agent-003-1', 'manual'],
        steps: [
          { order: 1, name: 'Request Validation', type: 'automated', duration: '< 1 hour' },
          { order: 2, name: 'Identity Verification', type: 'hybrid', duration: '1-2 days' },
          { order: 3, name: 'Data Compilation', type: 'automated', duration: '2-4 hours' },
          { order: 4, name: 'Review & Approval', type: 'manual', assignee: 'Privacy Analyst', duration: '1-2 days' },
          { order: 5, name: 'Response Delivery', type: 'automated', duration: '< 1 hour' },
        ],
        sla: '30 days (GDPR) / 30 days (PIPEDA)',
        priority: 'high',
        automationLevel: 75,
        successRate: 99.2,
        avgDuration: '5 days',
      },
      {
        id: 'proc-003-2',
        name: 'Privacy Incident Response',
        type: 'escalation',
        description: 'Responds to potential data breaches and privacy incidents',
        triggeredBy: ['agent-003-1', 'agent-003-3'],
        steps: [
          { order: 1, name: 'Incident Detection', type: 'automated', duration: 'Real-time' },
          { order: 2, name: 'Severity Assessment', type: 'automated', duration: '< 15 minutes' },
          { order: 3, name: 'Containment', type: 'manual', assignee: 'Security Team', duration: '1-4 hours' },
          { order: 4, name: 'Investigation', type: 'hybrid', duration: '1-5 days' },
          { order: 5, name: 'Notification Decision', type: 'manual', assignee: 'DPO', duration: '24 hours' },
        ],
        sla: '72 hours for regulator notification (if required)',
        priority: 'critical',
        automationLevel: 60,
        successRate: 98.5,
        avgDuration: '3 days',
      },
      {
        id: 'proc-003-3',
        name: 'AI System Assessment',
        type: 'validation',
        description: 'Validates new AI systems against governance framework',
        triggeredBy: ['agent-003-2', 'manual'],
        steps: [
          { order: 1, name: 'Intake & Scoping', type: 'automated', duration: '1-2 hours' },
          { order: 2, name: 'Technical Assessment', type: 'automated', duration: '4-8 hours' },
          { order: 3, name: 'Ethics Review', type: 'manual', assignee: 'AI Ethics Board', duration: '1-2 weeks' },
          { order: 4, name: 'Documentation', type: 'automated', duration: '2 hours' },
          { order: 5, name: 'Approval', type: 'manual', assignee: 'CTO', duration: '2-3 days' },
        ],
        sla: '30 days for full assessment',
        priority: 'high',
        automationLevel: 65,
        successRate: 94.8,
        avgDuration: '18 days',
      },
      {
        id: 'proc-003-4',
        name: 'Merchant Policy Enforcement',
        type: 'remediation',
        description: 'Enforces platform policies with merchant accounts',
        triggeredBy: ['agent-003-3'],
        steps: [
          { order: 1, name: 'Violation Detection', type: 'automated', duration: 'Real-time' },
          { order: 2, name: 'Warning Issuance', type: 'automated', duration: '< 5 minutes' },
          { order: 3, name: 'Merchant Response', type: 'manual', duration: '48-72 hours' },
          { order: 4, name: 'Resolution Verification', type: 'automated', duration: '< 1 hour' },
          { order: 5, name: 'Escalation (if needed)', type: 'hybrid', assignee: 'Trust & Safety', duration: '1-2 days' },
        ],
        sla: '72 hours to resolution or escalation',
        priority: 'medium',
        automationLevel: 85,
        successRate: 97.2,
        avgDuration: '2 days',
      },
      {
        id: 'proc-003-5',
        name: 'Compliance Training Lifecycle',
        type: 'notification',
        description: 'Manages mandatory compliance training for employees',
        triggeredBy: ['agent-003-4', 'scheduled'],
        steps: [
          { order: 1, name: 'Training Assignment', type: 'automated', duration: '< 1 hour' },
          { order: 2, name: 'Notification', type: 'automated', duration: '< 5 minutes' },
          { order: 3, name: 'Progress Monitoring', type: 'automated', duration: 'Ongoing' },
          { order: 4, name: 'Reminder Escalation', type: 'automated', duration: 'Per schedule' },
          { order: 5, name: 'Certification Recording', type: 'automated', duration: 'Real-time' },
        ],
        sla: 'Training completion within 30 days of assignment',
        priority: 'medium',
        automationLevel: 95,
        successRate: 98.8,
        avgDuration: '14 days avg completion',
      },
    ],
    overallComplianceScore: 96,
    automationRate: 85,
    monthlyDocumentsProcessed: 263200,
    avgResolutionTime: '4.2 days',
    costSavingsPercent: 55,
  },
  {
    id: 'comp-reg-004',
    name: 'Pfizer Canada',
    industry: 'Pharmaceuticals',
    headquarters: 'Montreal, QC',
    employees: 1500,
    regulatedSince: 1960,
    primaryRegulator: 'Health Canada',
    complianceTeamSize: 120,
    annualComplianceBudget: 42,
    description: 'Global pharmaceutical company with significant Canadian operations in research, manufacturing, and distribution.',
    complianceMetrics: [
      { framework: 'health_canada', status: 'compliant', score: 98, lastAudit: '2024-02-20', nextAudit: '2024-08-20', openIssues: 2, resolvedIssues: 35 },
      { framework: 'pipeda', status: 'compliant', score: 95, lastAudit: '2024-03-05', nextAudit: '2024-09-05', openIssues: 4, resolvedIssues: 28 },
      { framework: 'provincial', status: 'compliant', score: 94, lastAudit: '2024-01-15', nextAudit: '2024-07-15', openIssues: 5, resolvedIssues: 32 },
      { framework: 'environment_canada', status: 'compliant', score: 92, lastAudit: '2024-04-10', nextAudit: '2024-10-10', openIssues: 6, resolvedIssues: 18 },
    ],
    agents: [
      {
        id: 'agent-004-1',
        name: 'PharmaDoc AI',
        type: 'document_analyzer',
        description: 'Analyzes drug submissions, clinical trial documents, and regulatory correspondence',
        model: 'Pfizer-Pharma-70B',
        framework: 'LlamaIndex',
        capabilities: ['Submission analysis', 'CTD review', 'Label compliance', 'GMP documentation'],
        automationLevel: 75,
        accuracyRate: 98.5,
        monthlyProcessed: 2800,
        avgResponseTime: '8 seconds',
        status: 'active',
        lastUpdated: '2024-04-21',
        downstreamProcesses: ['proc-004-1', 'proc-004-2'],
      },
      {
        id: 'agent-004-2',
        name: 'AdverseEvent Monitor',
        type: 'change_detector',
        description: 'Monitors and triages adverse event reports',
        model: 'Claude-3-AE',
        framework: 'LangChain',
        capabilities: ['Report classification', 'Causality assessment', 'Signal detection', 'Expedited reporting'],
        automationLevel: 82,
        accuracyRate: 96.8,
        monthlyProcessed: 5500,
        avgResponseTime: '3 seconds',
        status: 'active',
        lastUpdated: '2024-04-22',
        downstreamProcesses: ['proc-004-3'],
      },
      {
        id: 'agent-004-3',
        name: 'GMPAudit Assistant',
        type: 'audit_assistant',
        description: 'Supports GMP audits and inspection readiness',
        model: 'Pfizer-GMP-13B',
        framework: 'Custom',
        capabilities: ['Inspection prep', 'CAPA tracking', 'Document retrieval', 'Trend analysis'],
        automationLevel: 70,
        accuracyRate: 97.2,
        monthlyProcessed: 650,
        avgResponseTime: '5 seconds',
        status: 'active',
        lastUpdated: '2024-04-18',
        downstreamProcesses: ['proc-004-4'],
      },
    ],
    processes: [
      {
        id: 'proc-004-1',
        name: 'Drug Submission Preparation',
        type: 'approval_workflow',
        description: 'Prepares and validates regulatory submissions to Health Canada',
        triggeredBy: ['agent-004-1', 'manual'],
        steps: [
          { order: 1, name: 'Document Compilation', type: 'automated', duration: '1-2 weeks' },
          { order: 2, name: 'Quality Review', type: 'hybrid', assignee: 'Regulatory Affairs', duration: '2-4 weeks' },
          { order: 3, name: 'Medical Review', type: 'manual', assignee: 'Medical Director', duration: '1-2 weeks' },
          { order: 4, name: 'Final Assembly', type: 'automated', duration: '2-3 days' },
          { order: 5, name: 'Submission', type: 'hybrid', duration: '1 day' },
        ],
        sla: 'Per product development timeline',
        priority: 'high',
        automationLevel: 55,
        successRate: 97.5,
        avgDuration: '6 weeks',
      },
      {
        id: 'proc-004-2',
        name: 'Label Change Management',
        type: 'approval_workflow',
        description: 'Manages product labeling changes across jurisdictions',
        triggeredBy: ['agent-004-1', 'agent-004-2'],
        steps: [
          { order: 1, name: 'Change Identification', type: 'automated', duration: '1-2 days' },
          { order: 2, name: 'Impact Assessment', type: 'hybrid', duration: '3-5 days' },
          { order: 3, name: 'Label Draft', type: 'automated', duration: '1 day' },
          { order: 4, name: 'Medical/Legal Review', type: 'manual', duration: '5-7 days' },
          { order: 5, name: 'Regulatory Submission', type: 'hybrid', duration: '2-3 days' },
        ],
        sla: '30 days for safety-related changes',
        priority: 'high',
        automationLevel: 60,
        successRate: 98.2,
        avgDuration: '18 days',
      },
      {
        id: 'proc-004-3',
        name: 'Adverse Event Reporting',
        type: 'reporting',
        description: 'Processes and submits adverse event reports to Health Canada',
        triggeredBy: ['agent-004-2'],
        steps: [
          { order: 1, name: 'Case Intake', type: 'automated', duration: '< 1 hour' },
          { order: 2, name: 'Medical Assessment', type: 'hybrid', assignee: 'Drug Safety Physician', duration: '1-3 days' },
          { order: 3, name: 'Report Generation', type: 'automated', duration: '2 hours' },
          { order: 4, name: 'QC Review', type: 'manual', duration: '4-8 hours' },
          { order: 5, name: 'Submission', type: 'automated', duration: '< 1 hour' },
        ],
        sla: '15 days standard, 7 days expedited',
        priority: 'critical',
        automationLevel: 70,
        successRate: 99.5,
        avgDuration: '4 days',
      },
      {
        id: 'proc-004-4',
        name: 'GMP Inspection Readiness',
        type: 'validation',
        description: 'Ensures continuous readiness for regulatory inspections',
        triggeredBy: ['agent-004-3', 'scheduled'],
        steps: [
          { order: 1, name: 'Self-Assessment', type: 'automated', duration: '1 week' },
          { order: 2, name: 'Gap Analysis', type: 'hybrid', duration: '3-5 days' },
          { order: 3, name: 'Remediation', type: 'manual', duration: 'Varies' },
          { order: 4, name: 'Mock Inspection', type: 'manual', duration: '2-3 days' },
          { order: 5, name: 'Readiness Certification', type: 'hybrid', duration: '1 day' },
        ],
        sla: 'Quarterly assessment cycle',
        priority: 'high',
        automationLevel: 50,
        successRate: 96.8,
        avgDuration: '25 days',
      },
    ],
    overallComplianceScore: 95,
    automationRate: 70,
    monthlyDocumentsProcessed: 8950,
    avgResolutionTime: '6.5 days',
    costSavingsPercent: 38,
  },
];

// Helper functions
export const getAgentTypeLabel = (type: AgentType): string => {
  const labels: Record<AgentType, string> = {
    document_analyzer: 'Document Analyzer',
    policy_monitor: 'Policy Monitor',
    audit_assistant: 'Audit Assistant',
    risk_assessor: 'Risk Assessor',
    report_generator: 'Report Generator',
    change_detector: 'Change Detector',
    training_coordinator: 'Training Coordinator',
    incident_responder: 'Incident Responder',
  };
  return labels[type];
};

export const getAgentTypeColor = (type: AgentType): string => {
  const colors: Record<AgentType, string> = {
    document_analyzer: '#3498DB',
    policy_monitor: '#9B59B6',
    audit_assistant: '#2ECC71',
    risk_assessor: '#E74C3C',
    report_generator: '#F1C40F',
    change_detector: '#E67E22',
    training_coordinator: '#1ABC9C',
    incident_responder: '#C0392B',
  };
  return colors[type];
};

export const getProcessTypeLabel = (type: ProcessType): string => {
  const labels: Record<ProcessType, string> = {
    approval_workflow: 'Approval Workflow',
    notification: 'Notification',
    data_extraction: 'Data Extraction',
    validation: 'Validation',
    reporting: 'Reporting',
    escalation: 'Escalation',
    remediation: 'Remediation',
    archival: 'Archival',
  };
  return labels[type];
};

export const getProcessTypeColor = (type: ProcessType): string => {
  const colors: Record<ProcessType, string> = {
    approval_workflow: '#3498DB',
    notification: '#9B59B6',
    data_extraction: '#1ABC9C',
    validation: '#2ECC71',
    reporting: '#F1C40F',
    escalation: '#E74C3C',
    remediation: '#E67E22',
    archival: '#7F8C8D',
  };
  return colors[type];
};

export const getStatusLabel = (status: ComplianceStatus): string => {
  const labels: Record<ComplianceStatus, string> = {
    compliant: 'Compliant',
    at_risk: 'At Risk',
    non_compliant: 'Non-Compliant',
    pending_review: 'Pending Review',
    exempt: 'Exempt',
  };
  return labels[status];
};

export const getStatusColor = (status: ComplianceStatus): string => {
  const colors: Record<ComplianceStatus, string> = {
    compliant: '#2ECC71',
    at_risk: '#F1C40F',
    non_compliant: '#E74C3C',
    pending_review: '#3498DB',
    exempt: '#7F8C8D',
  };
  return colors[status];
};
