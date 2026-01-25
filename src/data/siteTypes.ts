// Shared types for multi-category site selection

export type SiteCategory = 
  | 'mining' 
  | 'datacenter' 
  | 'hospital' 
  | 'solar' 
  | 'manufacturing';

export type Province = 
  | 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT';

export type ProjectStage = 
  | 'opportunity'      // Identified opportunity, no project yet
  | 'planning'         // Early planning phase
  | 'assessment'       // Site assessment / feasibility
  | 'permitting'       // Regulatory approvals
  | 'construction'     // Under construction
  | 'operational'      // Active operation
  // Mining-specific stages
  | 'exploration'
  | 'advanced_exploration'
  | 'prefeasibility'
  | 'feasibility'
  | 'production';

export interface BaseSite {
  id: string;
  name: string;
  category: SiteCategory;
  latitude: number;
  longitude: number;
  province: Province;
  region?: string;
  stage: ProjectStage;
  viabilityScore: number;
  estimatedCapex: number; // In millions CAD
  description: string;
  owner?: string;
  nearestHighwayKm: number;
  nearestGridKm: number;
}

export interface OntologyNode {
  id: string;
  label: string;
  type: 'site' | 'infrastructure' | 'stakeholder' | 'resource';
  color: string;
  x: number;
  y: number;
}

export interface OntologyEdge {
  source: string;
  target: string;
  label: string;
  strength: 'strong' | 'medium' | 'weak';
}

export const categoryConfig: Record<SiteCategory, {
  label: string;
  icon: string;
  color: string;
  description: string;
}> = {
  mining: {
    label: 'Mining & Minerals',
    icon: 'Mountain',
    color: '#00D4AA',
    description: 'Critical mineral deposits for clean energy supply chains',
  },
  datacenter: {
    label: 'Data Centers',
    icon: 'Server',
    color: '#3498DB',
    description: 'High-performance computing and cloud infrastructure sites',
  },
  hospital: {
    label: 'Healthcare',
    icon: 'Heart',
    color: '#E74C3C',
    description: 'Hospital and medical facility expansion opportunities',
  },
  solar: {
    label: 'Solar Farms',
    icon: 'Sun',
    color: '#F1C40F',
    description: 'Utility-scale solar energy generation sites',
  },
  manufacturing: {
    label: 'Manufacturing',
    icon: 'Factory',
    color: '#9B59B6',
    description: 'Clean tech manufacturing and industrial facilities',
  },
};

export const getProvinceLabel = (province: Province): string => {
  const labels: Record<Province, string> = {
    AB: 'Alberta',
    BC: 'British Columbia',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NL: 'Newfoundland & Labrador',
    NS: 'Nova Scotia',
    NT: 'Northwest Territories',
    NU: 'Nunavut',
    ON: 'Ontario',
    PE: 'Prince Edward Island',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    YT: 'Yukon',
  };
  return labels[province];
};

export const getStageLabel = (stage: ProjectStage | string): string => {
  const labels: Record<string, string> = {
    opportunity: 'Opportunity',
    planning: 'Planning',
    assessment: 'Assessment',
    permitting: 'Permitting',
    construction: 'Construction',
    operational: 'Operational',
    // Mining-specific stages
    exploration: 'Exploration',
    advanced_exploration: 'Advanced Exploration',
    prefeasibility: 'Pre-Feasibility',
    feasibility: 'Feasibility',
    production: 'Production',
  };
  return labels[stage] || stage;
};

export const getStageColor = (stage: ProjectStage | string): string => {
  const colors: Record<string, string> = {
    opportunity: '#F1C40F',
    planning: '#E67E22',
    assessment: '#9B59B6',
    permitting: '#3498DB',
    construction: '#00D4AA',
    operational: '#2ECC71',
    // Mining-specific stages
    exploration: '#95A5A6',
    advanced_exploration: '#7F8C8D',
    prefeasibility: '#9B59B6',
    feasibility: '#8E44AD',
    production: '#2ECC71',
  };
  return colors[stage] || '#6B7A8C';
};
