export type MineralType = 
  | 'lithium' 
  | 'nickel' 
  | 'cobalt' 
  | 'graphite' 
  | 'rare_earths' 
  | 'uranium' 
  | 'copper';

export type Province = 
  | 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT';

export type ProjectStage = 
  | 'exploration' 
  | 'advanced_exploration'
  | 'prefeasibility' 
  | 'feasibility' 
  | 'permitting'
  | 'construction' 
  | 'production';

export type ConsultationStatus = 
  | 'not_started' 
  | 'early_engagement' 
  | 'formal_consultation' 
  | 'completed';

export type IBAStatus = 
  | 'none' 
  | 'discussions_initiated' 
  | 'negotiating' 
  | 'signed';

export type EAStatus = 
  | 'not_required' 
  | 'not_started' 
  | 'in_progress' 
  | 'approved' 
  | 'approved_with_conditions';

export interface MineralDeposit {
  id: string;
  name: string;
  mineralType: MineralType;
  mineralSubtype?: string;
  latitude: number;
  longitude: number;
  province: Province;
  region?: string;
  stage: ProjectStage;
  stageDetail?: string;
  measuredTonnes?: number;
  indicatedTonnes?: number;
  inferredTonnes?: number;
  grade?: string;
  gradeUnit?: string;
  npvMillions?: number;
  irrPercent?: number;
  capexMillions?: number;
  mineLifeYears?: number;
  owner: string;
  ownerType: 'public' | 'private' | 'jv';
  tickerSymbol?: string;
  stockExchange?: string;
  nearestGridKm: number;
  nearestRailKm: number;
  nearestPortKm: number;
  nearestHighwayKm: number;
  indigenousTerritory?: string;
  consultationStatus: ConsultationStatus;
  ibaStatus: IBAStatus;
  indigenousEquityPercent?: number;
  eaStatus: EAStatus;
  eaType?: 'federal' | 'provincial' | 'both';
  viabilityScore: number;
  infrastructureGapMillions: number;
}

export const mineralDeposits: MineralDeposit[] = [
  {
    id: "lit-qc-001",
    name: "Whabouchi",
    mineralType: "lithium",
    mineralSubtype: "spodumene",
    latitude: 52.2833,
    longitude: -76.0333,
    province: "QC",
    region: "Eeyou Istchee James Bay",
    stage: "construction",
    stageDetail: "Mine construction ongoing, Phase 1 expected 2025",
    measuredTonnes: 17200000,
    indicatedTonnes: 18000000,
    grade: "1.53",
    gradeUnit: "% Li2O",
    npvMillions: 2600,
    irrPercent: 34.9,
    capexMillions: 1050,
    mineLifeYears: 33,
    owner: "Livent Corporation / Quebec Government",
    ownerType: "jv",
    nearestGridKm: 45,
    nearestRailKm: 0,
    nearestPortKm: 650,
    nearestHighwayKm: 300,
    indigenousTerritory: "Cree Nation of Nemaska",
    consultationStatus: "completed",
    ibaStatus: "signed",
    eaStatus: "approved",
    eaType: "both",
    viabilityScore: 88,
    infrastructureGapMillions: 150,
  },
  {
    id: "lit-qc-002",
    name: "Corvette",
    mineralType: "lithium",
    mineralSubtype: "spodumene",
    latitude: 52.7500,
    longitude: -77.5833,
    province: "QC",
    region: "Eeyou Istchee James Bay",
    stage: "advanced_exploration",
    stageDetail: "Resource expansion drilling ongoing",
    indicatedTonnes: 80500000,
    inferredTonnes: 62500000,
    grade: "1.25",
    gradeUnit: "% Li2O",
    owner: "Patriot Battery Metals",
    ownerType: "public",
    tickerSymbol: "PMET",
    stockExchange: "TSX",
    nearestGridKm: 85,
    nearestRailKm: 350,
    nearestPortKm: 720,
    nearestHighwayKm: 0,
    indigenousTerritory: "Cree Nation of Eastmain",
    consultationStatus: "early_engagement",
    ibaStatus: "discussions_initiated",
    eaStatus: "not_started",
    viabilityScore: 72,
    infrastructureGapMillions: 450,
  },
  {
    id: "lit-on-001",
    name: "PAK Lithium Project",
    mineralType: "lithium",
    mineralSubtype: "spodumene",
    latitude: 50.1500,
    longitude: -92.7500,
    province: "ON",
    region: "Red Lake District",
    stage: "feasibility",
    measuredTonnes: 8100000,
    indicatedTonnes: 2400000,
    grade: "2.0",
    gradeUnit: "% Li2O",
    npvMillions: 1200,
    irrPercent: 28.6,
    capexMillions: 485,
    mineLifeYears: 14,
    owner: "Frontier Lithium",
    ownerType: "public",
    tickerSymbol: "FL",
    stockExchange: "TSX-V",
    nearestGridKm: 120,
    nearestRailKm: 180,
    nearestPortKm: 450,
    nearestHighwayKm: 95,
    indigenousTerritory: "Cat Lake First Nation",
    consultationStatus: "formal_consultation",
    ibaStatus: "negotiating",
    eaStatus: "in_progress",
    eaType: "provincial",
    viabilityScore: 75,
    infrastructureGapMillions: 320,
  },
  {
    id: "lit-ab-001",
    name: "Clearwater Lithium",
    mineralType: "lithium",
    mineralSubtype: "brine",
    latitude: 54.7500,
    longitude: -118.5000,
    province: "AB",
    region: "Clearwater",
    stage: "advanced_exploration",
    stageDetail: "Pilot plant operating",
    owner: "E3 Lithium",
    ownerType: "public",
    tickerSymbol: "ETL",
    stockExchange: "TSX-V",
    nearestGridKm: 15,
    nearestRailKm: 25,
    nearestPortKm: 1200,
    nearestHighwayKm: 5,
    consultationStatus: "completed",
    ibaStatus: "signed",
    eaStatus: "approved",
    eaType: "provincial",
    viabilityScore: 82,
    infrastructureGapMillions: 50,
  },
  {
    id: "nic-qc-001",
    name: "Dumont Nickel",
    mineralType: "nickel",
    mineralSubtype: "sulfide",
    latitude: 48.5333,
    longitude: -78.4167,
    province: "QC",
    region: "Abitibi",
    stage: "permitting",
    measuredTonnes: 1180000000,
    indicatedTonnes: 430000000,
    grade: "0.27",
    gradeUnit: "% Ni",
    npvMillions: 920,
    irrPercent: 15.4,
    capexMillions: 1450,
    mineLifeYears: 30,
    owner: "Magneto Investments",
    ownerType: "private",
    nearestGridKm: 25,
    nearestRailKm: 15,
    nearestPortKm: 550,
    nearestHighwayKm: 5,
    indigenousTerritory: "Abitibiwinni First Nation",
    consultationStatus: "completed",
    ibaStatus: "signed",
    eaStatus: "approved_with_conditions",
    eaType: "both",
    viabilityScore: 70,
    infrastructureGapMillions: 180,
  },
  {
    id: "nic-on-001",
    name: "Crawford Nickel-Cobalt",
    mineralType: "nickel",
    mineralSubtype: "sulfide",
    latitude: 48.6000,
    longitude: -81.0667,
    province: "ON",
    region: "Timmins",
    stage: "feasibility",
    measuredTonnes: 587000000,
    indicatedTonnes: 656000000,
    grade: "0.25",
    gradeUnit: "% Ni",
    npvMillions: 2050,
    irrPercent: 18.3,
    capexMillions: 2770,
    mineLifeYears: 25,
    owner: "Canada Nickel Company",
    ownerType: "public",
    tickerSymbol: "CNC",
    stockExchange: "TSX-V",
    nearestGridKm: 40,
    nearestRailKm: 35,
    nearestPortKm: 480,
    nearestHighwayKm: 8,
    indigenousTerritory: "Taykwa Tagamou Nation",
    consultationStatus: "formal_consultation",
    ibaStatus: "negotiating",
    eaStatus: "in_progress",
    eaType: "both",
    viabilityScore: 76,
    infrastructureGapMillions: 220,
  },
  {
    id: "gra-qc-001",
    name: "Matawinie",
    mineralType: "graphite",
    mineralSubtype: "flake",
    latitude: 46.5000,
    longitude: -73.8333,
    province: "QC",
    region: "Lanaudière",
    stage: "construction",
    measuredTonnes: 59800000,
    indicatedTonnes: 54300000,
    grade: "4.35",
    gradeUnit: "% Cg",
    npvMillions: 1100,
    irrPercent: 25.9,
    capexMillions: 644,
    mineLifeYears: 26,
    owner: "Nouveau Monde Graphite",
    ownerType: "public",
    tickerSymbol: "NOU",
    stockExchange: "TSX / NYSE",
    nearestGridKm: 8,
    nearestRailKm: 45,
    nearestPortKm: 380,
    nearestHighwayKm: 2,
    indigenousTerritory: "Atikamekw Nehirowisiw",
    consultationStatus: "completed",
    ibaStatus: "signed",
    eaStatus: "approved",
    eaType: "provincial",
    viabilityScore: 91,
    infrastructureGapMillions: 25,
  },
  {
    id: "gra-on-001",
    name: "Bissett Creek",
    mineralType: "graphite",
    mineralSubtype: "flake",
    latitude: 46.0833,
    longitude: -77.8333,
    province: "ON",
    region: "Ottawa Valley",
    stage: "permitting",
    indicatedTonnes: 28200000,
    grade: "2.20",
    gradeUnit: "% Cg",
    npvMillions: 250,
    irrPercent: 21.5,
    capexMillions: 137,
    mineLifeYears: 23,
    owner: "Northern Graphite",
    ownerType: "public",
    tickerSymbol: "NGC",
    stockExchange: "TSX-V",
    nearestGridKm: 5,
    nearestRailKm: 12,
    nearestPortKm: 420,
    nearestHighwayKm: 0.5,
    consultationStatus: "completed",
    ibaStatus: "none",
    eaStatus: "approved",
    eaType: "provincial",
    viabilityScore: 84,
    infrastructureGapMillions: 15,
  },
  {
    id: "ree-qc-001",
    name: "Strange Lake",
    mineralType: "rare_earths",
    mineralSubtype: "heavy rare earths",
    latitude: 56.3333,
    longitude: -64.1667,
    province: "QC",
    region: "Ungava",
    stage: "prefeasibility",
    indicatedTonnes: 278000000,
    grade: "0.93",
    gradeUnit: "% TREO",
    owner: "Quest Rare Minerals / Torngat Metals",
    ownerType: "jv",
    nearestGridKm: 400,
    nearestRailKm: 600,
    nearestPortKm: 150,
    nearestHighwayKm: 500,
    indigenousTerritory: "Nunatsiavut / Naskapi",
    consultationStatus: "early_engagement",
    ibaStatus: "discussions_initiated",
    eaStatus: "not_started",
    viabilityScore: 45,
    infrastructureGapMillions: 1200,
  },
  {
    id: "ree-sk-001",
    name: "Alces Lake",
    mineralType: "rare_earths",
    mineralSubtype: "monazite",
    latitude: 59.2167,
    longitude: -108.8333,
    province: "SK",
    region: "Athabasca Basin",
    stage: "advanced_exploration",
    stageDetail: "High-grade discovery, drilling ongoing",
    grade: "3-5",
    gradeUnit: "% TREO (high grade zones)",
    owner: "Appia Rare Earths & Uranium",
    ownerType: "public",
    tickerSymbol: "API",
    stockExchange: "CSE",
    nearestGridKm: 180,
    nearestRailKm: 350,
    nearestPortKm: 1500,
    nearestHighwayKm: 200,
    indigenousTerritory: "Fond du Lac Denesuline",
    consultationStatus: "early_engagement",
    ibaStatus: "none",
    eaStatus: "not_started",
    viabilityScore: 52,
    infrastructureGapMillions: 650,
  },
  {
    id: "ura-sk-001",
    name: "Arrow",
    mineralType: "uranium",
    mineralSubtype: "unconformity",
    latitude: 58.0833,
    longitude: -105.4167,
    province: "SK",
    region: "Athabasca Basin",
    stage: "feasibility",
    indicatedTonnes: 256800,
    inferredTonnes: 8900,
    grade: "2.37",
    gradeUnit: "% U3O8",
    npvMillions: 1300,
    capexMillions: 850,
    mineLifeYears: 15,
    owner: "NexGen Energy",
    ownerType: "public",
    tickerSymbol: "NXE",
    stockExchange: "TSX / NYSE",
    nearestGridKm: 150,
    nearestRailKm: 400,
    nearestPortKm: 1800,
    nearestHighwayKm: 180,
    indigenousTerritory: "Clearwater River Dene Nation",
    consultationStatus: "formal_consultation",
    ibaStatus: "negotiating",
    eaStatus: "in_progress",
    eaType: "federal",
    viabilityScore: 78,
    infrastructureGapMillions: 380,
  },
  {
    id: "cop-bc-001",
    name: "Copper World",
    mineralType: "copper",
    mineralSubtype: "porphyry",
    latitude: 56.2500,
    longitude: -124.6667,
    province: "BC",
    region: "Omineca",
    stage: "prefeasibility",
    indicatedTonnes: 1200000000,
    grade: "0.35",
    gradeUnit: "% Cu",
    owner: "Foran Mining",
    ownerType: "public",
    tickerSymbol: "FOM",
    stockExchange: "TSX",
    nearestGridKm: 60,
    nearestRailKm: 120,
    nearestPortKm: 350,
    nearestHighwayKm: 25,
    indigenousTerritory: "Tsay Keh Dene",
    consultationStatus: "formal_consultation",
    ibaStatus: "negotiating",
    eaStatus: "in_progress",
    eaType: "both",
    viabilityScore: 68,
    infrastructureGapMillions: 280,
  },
];

export const getMineralColor = (type: MineralType): string => {
  const colors: Record<MineralType, string> = {
    lithium: '#00D4AA',
    nickel: '#3498DB',
    graphite: '#95A5A6',
    cobalt: '#9B59B6',
    rare_earths: '#F1C40F',
    uranium: '#2ECC71',
    copper: '#E67E22',
  };
  return colors[type];
};

export const getStageLabel = (stage: ProjectStage): string => {
  const labels: Record<ProjectStage, string> = {
    exploration: 'Exploration',
    advanced_exploration: 'Advanced Exploration',
    prefeasibility: 'Pre-Feasibility',
    feasibility: 'Feasibility',
    permitting: 'Permitting',
    construction: 'Construction',
    production: 'Production',
  };
  return labels[stage];
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
