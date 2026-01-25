# Site Selection & Mining Module - Enhanced Technical Specification

## Module Overview

**Purpose:** Build Canada's first Infrastructure Intelligence Platform for critical mineral project viability assessment. This module bridges the gap between mineral exploration (finding deposits) and project development (building mines) by providing infrastructure-to-viability analysis.

**Core Problem We Solve:**
- KoBold, Earth AI find deposits → "Where are the minerals?"
- Micromine, Maptek plan operations → "How do we extract them?"
- **OUR PLATFORM** → "Can this deposit become a viable mine? What infrastructure is needed? What will it cost?"

**Target Users:**
1. Mission 2050 investment team (primary)
2. Mining project developers
3. Government (CIB, CMIF, provincial EDOs)
4. Foreign investors evaluating Canadian opportunities
5. Indigenous development corporations

---

## Canada's Critical Minerals Context

### Strategic Importance
Canada has what the world needs for the clean energy transition:

| Mineral | Primary Use | Canada's Position | Key Deposits |
|---------|-------------|-------------------|--------------|
| Lithium | EV batteries, grid storage | Major deposits in QC, ON, AB | Nemaska, Patriot Battery, Frontier Lithium |
| Nickel | Batteries, stainless steel | #5 global producer | Sudbury, Voisey's Bay, Dumont |
| Cobalt | Battery cathodes | Byproduct of nickel mining | Sudbury complex |
| Graphite | Battery anodes | Massive deposits in QC | Nouveau Monde, Northern Graphite |
| Rare Earths | EV motors, wind turbines, electronics | Emerging projects | Vital Metals, Ucore, Appia |
| Uranium | Nuclear, SMRs | #2 global producer | Saskatchewan (Cameco) |
| Copper | Everything electrical | Major deposits in BC, ON | Highland Valley, Copper Mountain |

### The Infrastructure Problem
Most Canadian mineral deposits are in remote locations. The question isn't "is the deposit good?" but "can we build the infrastructure to extract it profitably?"

**Infrastructure Requirements for a Typical Mine:**
- **Power:** 50-500 MW depending on processing (mining is energy-intensive)
- **Roads:** All-weather access for equipment, supplies, workforce
- **Rail:** Bulk transport to port or processing facility
- **Port:** Deep-water access for export (especially to Asia)
- **Water:** Processing requires significant water
- **Workforce:** Fly-in/fly-out or nearby community
- **Processing:** Smelters, refineries, concentrators

---

## Data Architecture

### Primary Entities (Graph Database Recommended - Neo4j)

```cypher
// Core Mining Entities
(:MineralDeposit {
  id, name, type, subtype,
  latitude, longitude, province, region,
  stage, estimatedTonnage, grade, npv,
  owner, operatorContact,
  discoveryDate, lastUpdated
})

(:MiningProject {
  id, name, depositId,
  stage, capex, opex, timeline,
  productionTarget, mineLife,
  owner, partners
})

(:Claim {
  id, claimNumber, holder,
  area, expiryDate, status,
  province, miningDistrict
})

// Infrastructure Entities
(:PowerSubstation {
  id, name, latitude, longitude,
  voltage, capacityMW, availableMW,
  owner, connectionCost
})

(:TransmissionLine {
  id, fromSubstation, toSubstation,
  voltage, capacityMW, length
})

(:RailLine {
  id, name, operator,
  gaugeType, maxTonnage,
  startPoint, endPoint
})

(:RailTerminal {
  id, name, latitude, longitude,
  operator, capacityTonnesPerYear,
  mineralHandling: boolean
})

(:Port {
  id, name, latitude, longitude,
  type, // deep-water, river, lake
  maxVesselSize, annualCapacity,
  mineralExportCapable: boolean,
  iceFreeSeason
})

(:Road {
  id, name, type, // highway, secondary, resource
  surfaceType, // paved, gravel, seasonal
  weightLimit, allWeatherAccess: boolean
})

(:ProcessingFacility {
  id, name, type, // smelter, refinery, concentrator
  latitude, longitude,
  feedstockTypes, capacityTonnesPerYear,
  owner, availableCapacity
})

// Regulatory & Social Entities
(:IndigenousTerritory {
  id, nationName, treatyArea,
  contactOrganization, 
  economicDevCorp,
  existingMiningAgreements
})

(:EnvironmentalAssessment {
  id, projectId, type, // federal, provincial
  status, submissionDate, 
  expectedDecisionDate,
  keyIssues, mitigationRequired
})

(:WaterLicense {
  id, projectId, waterBody,
  allocatedVolume, purpose,
  status, expiryDate
})

// Relationships
(MineralDeposit)-[:LOCATED_IN]->(Province)
(MineralDeposit)-[:WITHIN_TERRITORY]->(IndigenousTerritory)
(MineralDeposit)-[:NEAREST_POWER {distanceKm, estimatedCost}]->(PowerSubstation)
(MineralDeposit)-[:NEAREST_RAIL {distanceKm, estimatedCost}]->(RailTerminal)
(MineralDeposit)-[:NEAREST_PORT {distanceKm, shippingRoute}]->(Port)
(MineralDeposit)-[:NEAREST_ROAD {distanceKm, roadType}]->(Road)
(MineralDeposit)-[:CAN_PROCESS_AT {distanceKm, compatible}]->(ProcessingFacility)
(MiningProject)-[:DEVELOPS]->(MineralDeposit)
(MiningProject)-[:REQUIRES_EA]->(EnvironmentalAssessment)
(MiningProject)-[:HAS_IBA]->(IndigenousBenefitAgreement)
```

### Relational Schema (PostgreSQL with PostGIS)

```sql
-- Enable PostGIS for geospatial queries
CREATE EXTENSION postgis;

-- Mineral Deposits
CREATE TABLE mineral_deposits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  alternate_names TEXT[], -- Array of other names
  
  -- Classification
  mineral_type VARCHAR(50) NOT NULL, -- lithium, nickel, cobalt, etc.
  mineral_subtype VARCHAR(100), -- spodumene, sulfide, laterite, etc.
  commodity_codes TEXT[], -- NRCan commodity codes
  
  -- Location
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  location GEOGRAPHY(POINT, 4326), -- PostGIS point
  province VARCHAR(50) NOT NULL,
  region VARCHAR(100),
  mining_district VARCHAR(100),
  nts_map_sheet VARCHAR(20), -- National Topographic System
  
  -- Project Status
  stage VARCHAR(50) NOT NULL, -- exploration, feasibility, development, construction, production, suspended, closed
  stage_detail TEXT,
  
  -- Resource Estimates (NI 43-101 compliant)
  measured_tonnes DECIMAL(15, 2),
  measured_grade DECIMAL(10, 4),
  indicated_tonnes DECIMAL(15, 2),
  indicated_grade DECIMAL(10, 4),
  inferred_tonnes DECIMAL(15, 2),
  inferred_grade DECIMAL(10, 4),
  grade_unit VARCHAR(20), -- %, g/t, ppm
  
  -- Economics (from feasibility studies)
  npv_millions DECIMAL(12, 2),
  irr_percent DECIMAL(5, 2),
  payback_years DECIMAL(4, 1),
  capex_millions DECIMAL(12, 2),
  opex_per_tonne DECIMAL(10, 2),
  mine_life_years INTEGER,
  
  -- Ownership
  owner_company VARCHAR(255),
  owner_type VARCHAR(50), -- public, private, state, jv
  ticker_symbol VARCHAR(20),
  stock_exchange VARCHAR(50),
  partners TEXT[],
  
  -- Infrastructure Distances (calculated)
  nearest_grid_km DECIMAL(8, 2),
  nearest_grid_substation_id UUID,
  nearest_rail_km DECIMAL(8, 2),
  nearest_rail_terminal_id UUID,
  nearest_port_km DECIMAL(8, 2),
  nearest_port_id UUID,
  nearest_highway_km DECIMAL(8, 2),
  nearest_community_km DECIMAL(8, 2),
  nearest_community_name VARCHAR(100),
  
  -- Indigenous Relations
  indigenous_territory_id UUID,
  consultation_status VARCHAR(50), -- not_started, in_progress, completed
  iba_status VARCHAR(50), -- none, negotiating, signed
  iba_signed_date DATE,
  indigenous_equity_percent DECIMAL(5, 2),
  
  -- Environmental
  ea_status VARCHAR(50), -- not_required, not_started, in_progress, approved, rejected
  ea_type VARCHAR(50), -- federal, provincial, both
  ea_submission_date DATE,
  ea_decision_date DATE,
  protected_areas_nearby TEXT[],
  species_at_risk TEXT[],
  water_license_status VARCHAR(50),
  
  -- Calculated Scores
  viability_score INTEGER, -- 0-100
  infrastructure_gap_score INTEGER, -- 0-100 (higher = bigger gap)
  regulatory_risk_score INTEGER, -- 0-100
  overall_investment_score INTEGER, -- 0-100
  
  -- Metadata
  data_source VARCHAR(100),
  last_technical_report_date DATE,
  sedar_filing_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create spatial index
CREATE INDEX idx_deposits_location ON mineral_deposits USING GIST(location);

-- Power Infrastructure
CREATE TABLE power_substations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  province VARCHAR(50) NOT NULL,
  
  voltage_kv INTEGER,
  capacity_mw DECIMAL(10, 2),
  available_capacity_mw DECIMAL(10, 2),
  
  owner_utility VARCHAR(100),
  connection_queue_months INTEGER, -- estimated wait time
  connection_cost_per_mw DECIMAL(12, 2),
  
  clean_energy_percent DECIMAL(5, 2), -- % renewable/nuclear
  grid_reliability_score INTEGER, -- 0-100
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Rail Infrastructure
CREATE TABLE rail_terminals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  province VARCHAR(50) NOT NULL,
  
  operator VARCHAR(100), -- CN, CP, shortline
  line_name VARCHAR(100),
  
  has_mineral_handling BOOLEAN DEFAULT FALSE,
  capacity_tonnes_per_year DECIMAL(12, 2),
  available_capacity DECIMAL(12, 2),
  
  connected_ports TEXT[], -- port IDs this terminal connects to
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Ports
CREATE TABLE ports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  province VARCHAR(50) NOT NULL,
  
  port_type VARCHAR(50), -- deep_water, river, lake, arctic
  max_vessel_dwt INTEGER, -- deadweight tonnage
  annual_capacity_tonnes DECIMAL(15, 2),
  
  has_mineral_export BOOLEAN DEFAULT FALSE,
  mineral_types_handled TEXT[],
  
  ice_free_months INTEGER, -- 12 = year-round
  
  -- Shipping routes
  days_to_asia INTEGER,
  days_to_europe INTEGER,
  days_to_us_gulf INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indigenous Territories
CREATE TABLE indigenous_territories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nation_name VARCHAR(255) NOT NULL,
  territory_name VARCHAR(255),
  
  -- Boundary (simplified - could be full polygon)
  centroid_lat DECIMAL(10, 7),
  centroid_lng DECIMAL(10, 7),
  boundary GEOGRAPHY(POLYGON, 4326),
  
  province VARCHAR(50),
  treaty_area VARCHAR(100),
  treaty_number VARCHAR(50),
  
  -- Contact
  governing_body VARCHAR(255),
  economic_dev_corp VARCHAR(255),
  contact_email VARCHAR(255),
  website TEXT,
  
  -- Mining History
  existing_mining_agreements INTEGER DEFAULT 0,
  mining_policy_stance VARCHAR(50), -- supportive, neutral, cautious, opposed
  preferred_engagement_model TEXT, -- equity, royalty, employment, etc.
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Processing Facilities
CREATE TABLE processing_facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  facility_type VARCHAR(50), -- smelter, refinery, concentrator, battery_plant
  
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  location GEOGRAPHY(POINT, 4326),
  province VARCHAR(50) NOT NULL,
  
  feedstock_types TEXT[], -- what minerals it processes
  capacity_tonnes_per_year DECIMAL(12, 2),
  available_capacity_percent DECIMAL(5, 2),
  
  owner VARCHAR(255),
  
  accepts_third_party BOOLEAN DEFAULT FALSE,
  tolling_rate_per_tonne DECIMAL(10, 2),
  
  created_at TIMESTAMP DEFAULT NOW()
);

-- Infrastructure Gap Analysis (calculated for each deposit)
CREATE TABLE infrastructure_gap_analysis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deposit_id UUID REFERENCES mineral_deposits(id),
  
  -- Power Gap
  power_gap_exists BOOLEAN,
  power_distance_km DECIMAL(8, 2),
  power_capacity_needed_mw DECIMAL(10, 2),
  power_solution VARCHAR(100), -- grid_extension, on_site_generation, hybrid
  power_cost_millions DECIMAL(12, 2),
  power_timeline_months INTEGER,
  
  -- Road Gap
  road_gap_exists BOOLEAN,
  road_distance_km DECIMAL(8, 2),
  road_type_needed VARCHAR(50), -- all_weather, seasonal, upgrade_existing
  road_cost_millions DECIMAL(12, 2),
  road_timeline_months INTEGER,
  
  -- Rail Gap
  rail_gap_exists BOOLEAN,
  rail_distance_km DECIMAL(8, 2),
  rail_solution VARCHAR(100), -- new_spur, truck_to_terminal
  rail_cost_millions DECIMAL(12, 2),
  rail_timeline_months INTEGER,
  
  -- Port Access
  port_gap_exists BOOLEAN,
  port_solution VARCHAR(100),
  port_cost_millions DECIMAL(12, 2),
  
  -- Processing
  processing_gap_exists BOOLEAN,
  processing_solution VARCHAR(100), -- existing_facility, new_on_site, export_concentrate
  processing_cost_millions DECIMAL(12, 2),
  
  -- Totals
  total_infrastructure_gap_millions DECIMAL(12, 2),
  total_timeline_months INTEGER,
  
  -- Funding Sources
  eligible_for_cib BOOLEAN,
  eligible_for_cmif BOOLEAN,
  eligible_for_provincial_funding BOOLEAN,
  estimated_government_contribution_percent DECIMAL(5, 2),
  
  calculated_at TIMESTAMP DEFAULT NOW()
);

-- Viability Scores (configurable weights)
CREATE TABLE viability_calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deposit_id UUID REFERENCES mineral_deposits(id),
  calculation_name VARCHAR(100), -- e.g., "default", "infrastructure_focus", "speed_to_market"
  
  -- Weights (must sum to 100)
  weight_geology INTEGER DEFAULT 20,
  weight_infrastructure INTEGER DEFAULT 25,
  weight_indigenous INTEGER DEFAULT 20,
  weight_environmental INTEGER DEFAULT 15,
  weight_economics INTEGER DEFAULT 20,
  
  -- Component Scores (0-100)
  score_geology INTEGER,
  score_infrastructure INTEGER,
  score_indigenous INTEGER,
  score_environmental INTEGER,
  score_economics INTEGER,
  
  -- Final Score
  total_score INTEGER,
  
  -- Scoring Details (JSON for flexibility)
  scoring_details JSONB,
  
  calculated_at TIMESTAMP DEFAULT NOW()
);
```

---

## Sample Data - Real Canadian Projects

```typescript
// data/mineralDeposits.ts

export interface MineralDeposit {
  id: string;
  name: string;
  alternateNames?: string[];
  mineralType: MineralType;
  mineralSubtype?: string;
  
  // Location
  latitude: number;
  longitude: number;
  province: Province;
  region?: string;
  
  // Project Status
  stage: ProjectStage;
  stageDetail?: string;
  
  // Resources
  measuredTonnes?: number;
  indicatedTonnes?: number;
  inferredTonnes?: number;
  grade?: string;
  gradeUnit?: string;
  
  // Economics
  npvMillions?: number;
  irrPercent?: number;
  capexMillions?: number;
  mineLifeYears?: number;
  
  // Ownership
  owner: string;
  ownerType: 'public' | 'private' | 'state' | 'jv';
  tickerSymbol?: string;
  stockExchange?: string;
  
  // Infrastructure (calculated)
  nearestGridKm: number;
  nearestRailKm: number;
  nearestPortKm: number;
  nearestHighwayKm: number;
  
  // Indigenous
  indigenousTerritory?: string;
  consultationStatus: ConsultationStatus;
  ibaStatus: IBAStatus;
  indigenousEquityPercent?: number;
  
  // Environmental
  eaStatus: EAStatus;
  eaType?: 'federal' | 'provincial' | 'both';
  
  // Scores
  viabilityScore: number;
  infrastructureGapMillions: number;
  
  // Metadata
  lastTechnicalReport?: string;
  sedarUrl?: string;
}

export type MineralType = 
  | 'lithium' 
  | 'nickel' 
  | 'cobalt' 
  | 'graphite' 
  | 'rare_earths' 
  | 'uranium' 
  | 'copper'
  | 'zinc'
  | 'gold'
  | 'platinum_group';

export type Province = 
  | 'AB' | 'BC' | 'MB' | 'NB' | 'NL' | 'NS' | 'NT' | 'NU' | 'ON' | 'PE' | 'QC' | 'SK' | 'YT';

export type ProjectStage = 
  | 'exploration' 
  | 'advanced_exploration'
  | 'prefeasibility' 
  | 'feasibility' 
  | 'permitting'
  | 'construction' 
  | 'production' 
  | 'expansion'
  | 'suspended' 
  | 'closed';

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
  | 'approved_with_conditions'
  | 'rejected';

// REAL CANADIAN PROJECTS (Public Information)
export const mineralDeposits: MineralDeposit[] = [
  // ===== LITHIUM PROJECTS =====
  {
    id: "lit-qc-001",
    name: "Whabouchi",
    alternateNames: ["Nemaska Lithium Project"],
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
    nearestRailKm: 0, // Rail being built
    nearestPortKm: 650,
    nearestHighwayKm: 300,
    indigenousTerritory: "Cree Nation of Nemaska",
    consultationStatus: "completed",
    ibaStatus: "signed",
    indigenousEquityPercent: 0, // Cree have benefits agreement
    eaStatus: "approved",
    eaType: "both",
    viabilityScore: 88,
    infrastructureGapMillions: 150,
    lastTechnicalReport: "2023-03-15",
    sedarUrl: "https://www.sedarplus.ca"
  },
  {
    id: "lit-qc-002",
    name: "Corvette",
    alternateNames: ["CV Lithium Trend"],
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
    nearestHighwayKm: 0, // Trans-Taiga road access
    indigenousTerritory: "Cree Nation of Eastmain",
    consultationStatus: "early_engagement",
    ibaStatus: "discussions_initiated",
    eaStatus: "not_started",
    viabilityScore: 72,
    infrastructureGapMillions: 450,
    lastTechnicalReport: "2024-02-01"
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
    infrastructureGapMillions: 320
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
    nearestPortKm: 1200, // Vancouver via rail
    nearestHighwayKm: 5,
    consultationStatus: "completed",
    ibaStatus: "signed",
    eaStatus: "approved",
    eaType: "provincial",
    viabilityScore: 82,
    infrastructureGapMillions: 50,
    lastTechnicalReport: "2024-01-15"
  },

  // ===== NICKEL PROJECTS =====
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
    infrastructureGapMillions: 180
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
    infrastructureGapMillions: 220
  },

  // ===== GRAPHITE PROJECTS =====
  {
    id: "gra-qc-001",
    name: "Matawinie",
    alternateNames: ["Nouveau Monde Graphite"],
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
    infrastructureGapMillions: 25
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
    infrastructureGapMillions: 15
  },

  // ===== RARE EARTHS PROJECTS =====
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
    nearestPortKm: 150, // Voisey's Bay port potential
    nearestHighwayKm: 500,
    indigenousTerritory: "Nunatsiavut / Naskapi",
    consultationStatus: "early_engagement",
    ibaStatus: "discussions_initiated",
    eaStatus: "not_started",
    viabilityScore: 45,
    infrastructureGapMillions: 1200
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
    infrastructureGapMillions: 650
  },

  // ===== URANIUM PROJECTS =====
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
    infrastructureGapMillions: 380
  },

  // ===== COPPER PROJECTS =====
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
    infrastructureGapMillions: 280
  }
];

// Infrastructure Data
export const powerSubstations = [
  {
    id: "ps-qc-001",
    name: "Nemiscau Substation",
    latitude: 51.6833,
    longitude: -76.1167,
    province: "QC",
    voltageKv: 315,
    capacityMw: 150,
    availableCapacityMw: 80,
    ownerUtility: "Hydro-Québec",
    cleanEnergyPercent: 99.8,
    connectionCostPerMw: 45000
  },
  {
    id: "ps-qc-002",
    name: "La Grande-2-A",
    latitude: 53.7833,
    longitude: -77.0500,
    province: "QC",
    voltageKv: 735,
    capacityMw: 2106,
    availableCapacityMw: 500,
    ownerUtility: "Hydro-Québec",
    cleanEnergyPercent: 99.8
  },
  // Add more substations...
];

export const ports = [
  {
    id: "port-qc-001",
    name: "Port of Sept-Îles",
    latitude: 50.2167,
    longitude: -66.3833,
    province: "QC",
    portType: "deep_water",
    maxVesselDwt: 300000,
    annualCapacityTonnes: 35000000,
    hasMineralExport: true,
    mineralTypesHandled: ["iron_ore", "other_bulk"],
    iceFreeMonths: 12,
    daysToAsia: 35,
    daysToEurope: 12
  },
  {
    id: "port-qc-002",
    name: "Port of Montreal",
    latitude: 45.5017,
    longitude: -73.5673,
    province: "QC",
    portType: "deep_water",
    maxVesselDwt: 80000,
    annualCapacityTonnes: 40000000,
    hasMineralExport: true,
    iceFreeMonths: 12,
    daysToAsia: 45,
    daysToEurope: 10
  },
  {
    id: "port-bc-001",
    name: "Port of Vancouver",
    latitude: 49.2827,
    longitude: -123.1207,
    province: "BC",
    portType: "deep_water",
    maxVesselDwt: 200000,
    annualCapacityTonnes: 145000000,
    hasMineralExport: true,
    mineralTypesHandled: ["coal", "potash", "concentrates"],
    iceFreeMonths: 12,
    daysToAsia: 12,
    daysToEurope: 25
  },
  // Add more ports...
];

export const indigenousTerritories = [
  {
    id: "it-qc-001",
    nationName: "Cree Nation of Nemaska",
    province: "QC",
    treatyArea: "James Bay and Northern Quebec Agreement",
    governingBody: "Cree Nation of Nemaska",
    economicDevCorp: "Cree Development Corporation",
    existingMiningAgreements: 2,
    miningPolicyStance: "supportive",
    preferredEngagementModel: "equity_and_employment"
  },
  {
    id: "it-qc-002",
    nationName: "Cree Nation of Eastmain",
    province: "QC",
    treatyArea: "James Bay and Northern Quebec Agreement",
    governingBody: "Cree Nation of Eastmain",
    economicDevCorp: "Cree Development Corporation",
    existingMiningAgreements: 1,
    miningPolicyStance: "supportive"
  },
  // Add more territories...
];
```

---

## Viability Scoring Algorithm

```typescript
// lib/viability.ts

export interface ViabilityWeights {
  geology: number;      // 0-100, default 20
  infrastructure: number; // 0-100, default 25
  indigenous: number;   // 0-100, default 20
  environmental: number; // 0-100, default 15
  economics: number;    // 0-100, default 20
}

export interface ViabilityScores {
  geology: number;
  infrastructure: number;
  indigenous: number;
  environmental: number;
  economics: number;
  total: number;
  details: ViabilityDetails;
}

export interface ViabilityDetails {
  // Geology details
  resourceConfidence: string;
  gradeQuality: string;
  
  // Infrastructure details
  powerAccess: { score: number; distance: number; cost: number };
  railAccess: { score: number; distance: number; cost: number };
  portAccess: { score: number; distance: number; route: string };
  roadAccess: { score: number; distance: number; type: string };
  
  // Indigenous details
  consultationProgress: string;
  ibaProgress: string;
  relationshipQuality: string;
  
  // Environmental details
  eaProgress: string;
  riskLevel: string;
  
  // Economics details
  npvStrength: string;
  irrStrength: string;
  fundingAvailability: string;
}

export function calculateViability(
  deposit: MineralDeposit,
  weights: ViabilityWeights = {
    geology: 20,
    infrastructure: 25,
    indigenous: 20,
    environmental: 15,
    economics: 20
  }
): ViabilityScores {
  // Normalize weights to sum to 100
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const normalizedWeights = {
    geology: (weights.geology / totalWeight) * 100,
    infrastructure: (weights.infrastructure / totalWeight) * 100,
    indigenous: (weights.indigenous / totalWeight) * 100,
    environmental: (weights.environmental / totalWeight) * 100,
    economics: (weights.economics / totalWeight) * 100,
  };

  // Calculate component scores
  const geologyScore = calculateGeologyScore(deposit);
  const infrastructureScore = calculateInfrastructureScore(deposit);
  const indigenousScore = calculateIndigenousScore(deposit);
  const environmentalScore = calculateEnvironmentalScore(deposit);
  const economicsScore = calculateEconomicsScore(deposit);

  // Calculate weighted total
  const total = Math.round(
    (geologyScore * normalizedWeights.geology +
      infrastructureScore * normalizedWeights.infrastructure +
      indigenousScore * normalizedWeights.indigenous +
      environmentalScore * normalizedWeights.environmental +
      economicsScore * normalizedWeights.economics) / 100
  );

  return {
    geology: geologyScore,
    infrastructure: infrastructureScore,
    indigenous: indigenousScore,
    environmental: environmentalScore,
    economics: economicsScore,
    total,
    details: generateDetails(deposit)
  };
}

function calculateGeologyScore(deposit: MineralDeposit): number {
  let score = 50; // Base score

  // Resource confidence (+/- 20)
  if (deposit.measuredTonnes && deposit.measuredTonnes > 0) {
    score += 20; // Has measured resources
  } else if (deposit.indicatedTonnes && deposit.indicatedTonnes > 0) {
    score += 10; // Only indicated
  }

  // Stage bonus (+/- 20)
  const stageScores: Record<ProjectStage, number> = {
    production: 20,
    construction: 18,
    permitting: 15,
    feasibility: 12,
    prefeasibility: 8,
    advanced_exploration: 5,
    exploration: 0,
    expansion: 18,
    suspended: -10,
    closed: -20
  };
  score += stageScores[deposit.stage] || 0;

  // Grade quality (commodity-specific thresholds)
  // Simplified - would need commodity-specific logic
  if (deposit.grade) {
    const gradeNum = parseFloat(deposit.grade);
    if (deposit.mineralType === 'lithium' && gradeNum > 1.5) score += 10;
    if (deposit.mineralType === 'graphite' && gradeNum > 4) score += 10;
    // etc.
  }

  return Math.min(100, Math.max(0, score));
}

function calculateInfrastructureScore(deposit: MineralDeposit): number {
  let score = 100; // Start at 100, deduct for gaps

  // Power access (0-100km optimal, >300km problematic)
  if (deposit.nearestGridKm > 300) score -= 30;
  else if (deposit.nearestGridKm > 150) score -= 20;
  else if (deposit.nearestGridKm > 50) score -= 10;

  // Rail access (0-50km optimal, >200km problematic)
  if (deposit.nearestRailKm > 200) score -= 25;
  else if (deposit.nearestRailKm > 100) score -= 15;
  else if (deposit.nearestRailKm > 50) score -= 5;

  // Port access (for export commodities)
  if (deposit.nearestPortKm > 800) score -= 20;
  else if (deposit.nearestPortKm > 500) score -= 10;

  // Road access
  if (deposit.nearestHighwayKm > 200) score -= 15;
  else if (deposit.nearestHighwayKm > 100) score -= 10;

  return Math.min(100, Math.max(0, score));
}

function calculateIndigenousScore(deposit: MineralDeposit): number {
  let score = 50; // Neutral start

  // IBA status
  const ibaScores: Record<IBAStatus, number> = {
    signed: 40,
    negotiating: 20,
    discussions_initiated: 10,
    none: 0
  };
  score += ibaScores[deposit.ibaStatus] || 0;

  // Consultation status
  const consultationScores: Record<ConsultationStatus, number> = {
    completed: 20,
    formal_consultation: 10,
    early_engagement: 5,
    not_started: -10
  };
  score += consultationScores[deposit.consultationStatus] || 0;

  // Indigenous equity participation
  if (deposit.indigenousEquityPercent && deposit.indigenousEquityPercent > 0) {
    score += Math.min(20, deposit.indigenousEquityPercent / 2);
  }

  return Math.min(100, Math.max(0, score));
}

function calculateEnvironmentalScore(deposit: MineralDeposit): number {
  let score = 50;

  const eaScores: Record<EAStatus, number> = {
    approved: 40,
    approved_with_conditions: 30,
    in_progress: 10,
    not_started: 0,
    not_required: 50, // No EA needed is good
    rejected: -50
  };
  score += eaScores[deposit.eaStatus] || 0;

  return Math.min(100, Math.max(0, score));
}

function calculateEconomicsScore(deposit: MineralDeposit): number {
  let score = 50;

  // NPV
  if (deposit.npvMillions) {
    if (deposit.npvMillions > 1000) score += 25;
    else if (deposit.npvMillions > 500) score += 15;
    else if (deposit.npvMillions > 100) score += 5;
  }

  // IRR
  if (deposit.irrPercent) {
    if (deposit.irrPercent > 25) score += 25;
    else if (deposit.irrPercent > 18) score += 15;
    else if (deposit.irrPercent > 12) score += 5;
  }

  return Math.min(100, Math.max(0, score));
}
```

---

## AI Query Parser

```typescript
// lib/aiQuery.ts

import { MineralDeposit, mineralDeposits } from '@/data/mineralDeposits';

export interface QueryFilters {
  mineralTypes?: string[];
  provinces?: string[];
  stages?: string[];
  maxDistanceToGrid?: number;
  maxDistanceToRail?: number;
  maxDistanceToPort?: number;
  minViabilityScore?: number;
  ibaStatus?: string[];
  eaStatus?: string[];
}

export interface ParsedQuery {
  filters: QueryFilters;
  sortBy?: string;
  limit?: number;
  explanation: string;
}

// This would call OpenAI/Anthropic API in production
export async function parseNaturalLanguageQuery(query: string): Promise<ParsedQuery> {
  // Example implementation using keyword matching
  // In production, use LLM for better parsing
  
  const filters: QueryFilters = {};
  const explanations: string[] = [];

  // Mineral type detection
  const mineralKeywords: Record<string, string> = {
    'lithium': 'lithium',
    'nickel': 'nickel',
    'cobalt': 'cobalt',
    'graphite': 'graphite',
    'rare earth': 'rare_earths',
    'uranium': 'uranium',
    'copper': 'copper'
  };
  
  for (const [keyword, type] of Object.entries(mineralKeywords)) {
    if (query.toLowerCase().includes(keyword)) {
      filters.mineralTypes = filters.mineralTypes || [];
      filters.mineralTypes.push(type);
      explanations.push(`Filtering for ${keyword} projects`);
    }
  }

  // Province detection
  const provinceKeywords: Record<string, string> = {
    'quebec': 'QC', 'qc': 'QC',
    'ontario': 'ON', 'on': 'ON',
    'saskatchewan': 'SK', 'sask': 'SK',
    'british columbia': 'BC', 'bc': 'BC',
    'alberta': 'AB', 'ab': 'AB',
    'manitoba': 'MB', 'mb': 'MB'
  };
  
  for (const [keyword, province] of Object.entries(provinceKeywords)) {
    if (query.toLowerCase().includes(keyword)) {
      filters.provinces = filters.provinces || [];
      if (!filters.provinces.includes(province)) {
        filters.provinces.push(province);
        explanations.push(`Filtering for projects in ${province}`);
      }
    }
  }

  // Distance to infrastructure
  const gridMatch = query.match(/within\s+(\d+)\s*km\s+of\s+(grid|power)/i);
  if (gridMatch) {
    filters.maxDistanceToGrid = parseInt(gridMatch[1]);
    explanations.push(`Within ${gridMatch[1]}km of grid power`);
  }

  const railMatch = query.match(/within\s+(\d+)\s*km\s+of\s+rail/i);
  if (railMatch) {
    filters.maxDistanceToRail = parseInt(railMatch[1]);
    explanations.push(`Within ${railMatch[1]}km of rail`);
  }

  // IBA status
  if (query.toLowerCase().includes('iba') || query.toLowerCase().includes('indigenous agreement')) {
    if (query.toLowerCase().includes('signed')) {
      filters.ibaStatus = ['signed'];
      explanations.push('With signed Indigenous Benefit Agreements');
    } else {
      filters.ibaStatus = ['signed', 'negotiating'];
      explanations.push('With IBA signed or in negotiation');
    }
  }

  // Stage detection
  if (query.toLowerCase().includes('production')) {
    filters.stages = ['production'];
    explanations.push('Currently in production');
  } else if (query.toLowerCase().includes('construction')) {
    filters.stages = ['construction'];
    explanations.push('Under construction');
  } else if (query.toLowerCase().includes('feasibility') || query.toLowerCase().includes('advanced')) {
    filters.stages = ['feasibility', 'prefeasibility', 'permitting'];
    explanations.push('At feasibility stage or beyond');
  }

  // Viability score
  const viabilityMatch = query.match(/viability\s*(score)?\s*(above|over|greater than|>)\s*(\d+)/i);
  if (viabilityMatch) {
    filters.minViabilityScore = parseInt(viabilityMatch[3]);
    explanations.push(`Viability score above ${viabilityMatch[3]}`);
  }

  return {
    filters,
    explanation: explanations.length > 0 
      ? explanations.join('; ') 
      : 'Showing all projects (no specific filters detected)'
  };
}

export function applyFilters(
  deposits: MineralDeposit[], 
  filters: QueryFilters
): MineralDeposit[] {
  return deposits.filter(deposit => {
    // Mineral type filter
    if (filters.mineralTypes?.length && 
        !filters.mineralTypes.includes(deposit.mineralType)) {
      return false;
    }

    // Province filter
    if (filters.provinces?.length && 
        !filters.provinces.includes(deposit.province)) {
      return false;
    }

    // Stage filter
    if (filters.stages?.length && 
        !filters.stages.includes(deposit.stage)) {
      return false;
    }

    // Infrastructure distance filters
    if (filters.maxDistanceToGrid && 
        deposit.nearestGridKm > filters.maxDistanceToGrid) {
      return false;
    }
    if (filters.maxDistanceToRail && 
        deposit.nearestRailKm > filters.maxDistanceToRail) {
      return false;
    }
    if (filters.maxDistanceToPort && 
        deposit.nearestPortKm > filters.maxDistanceToPort) {
      return false;
    }

    // Viability score filter
    if (filters.minViabilityScore && 
        deposit.viabilityScore < filters.minViabilityScore) {
      return false;
    }

    // IBA status filter
    if (filters.ibaStatus?.length && 
        !filters.ibaStatus.includes(deposit.ibaStatus)) {
      return false;
    }

    // EA status filter
    if (filters.eaStatus?.length && 
        !filters.eaStatus.includes(deposit.eaStatus)) {
      return false;
    }

    return true;
  });
}
```

---

## UI Components to Build

### 1. Main Map Component
```
Features:
- Full-screen interactive map of Canada
- Cluster markers when zoomed out
- Custom markers by mineral type (color-coded)
- Marker size by project stage/viability
- Click marker → side panel with details
- Infrastructure layer toggles (power, rail, roads, ports)
- Indigenous territory boundaries (toggle)
- Environmental protected areas (toggle)
```

### 2. Deposit Detail Panel
```
Sections:
- Header: Name, type, stage badge, viability score
- Location: Map thumbnail, coordinates, province
- Resources: Tonnage, grade, mine life
- Economics: NPV, IRR, CAPEX
- Infrastructure: Distance table with gap analysis
- Indigenous: Territory, consultation status, IBA status
- Environmental: EA status, key issues
- Ownership: Company, ticker, partners
- Actions: Add to watchlist, compare, export
```

### 3. Viability Scorer
```
Features:
- 5 sliders for weight adjustment
- Real-time score recalculation
- Score breakdown chart (radar/bar)
- Detailed scoring explanation
- Save custom weight profiles
- Compare multiple deposits
```

### 4. Infrastructure Gap Analyzer
```
Features:
- Visual gap diagram (deposit → infrastructure)
- Cost breakdown table
- Timeline Gantt chart
- Funding eligibility indicators
- Solution recommendations
```

### 5. AI Query Interface
```
Features:
- Large text input with suggestions
- Voice input option
- Recent queries history
- Example queries carousel
- Filter chips showing active filters
- Results count and map update
```

### 6. Comparison Tool
```
Features:
- Side-by-side deposit comparison (up to 4)
- Spider/radar chart overlay
- Infrastructure comparison table
- Export comparison report
```

---

## API Endpoints

```typescript
// GET /api/deposits
// List all deposits with pagination and filtering
Query params: mineralType, province, stage, minViability, page, limit

// GET /api/deposits/:id
// Get single deposit with full details

// POST /api/deposits/search
// AI-powered natural language search
Body: { query: string }

// GET /api/deposits/:id/infrastructure
// Get infrastructure analysis for deposit

// POST /api/deposits/:id/viability
// Calculate viability with custom weights
Body: { weights: ViabilityWeights }

// GET /api/deposits/:id/similar
// Find similar deposits

// POST /api/deposits/compare
// Compare multiple deposits
Body: { depositIds: string[] }

// GET /api/infrastructure/power
// List power substations

// GET /api/infrastructure/rail
// List rail terminals

// GET /api/infrastructure/ports
// List ports

// GET /api/territories
// List Indigenous territories

// GET /api/territories/:id/deposits
// Get deposits in territory
```

---

## Demo Scenarios

### Scenario 1: Investment Screening
"Show me all lithium projects in Quebec with signed IBAs that are past feasibility stage"
→ Map filters to 3 deposits
→ User clicks on Whabouchi
→ Views detailed viability analysis
→ Sees infrastructure is strong (rail being built)
→ Exports investment memo

### Scenario 2: Infrastructure Gap Analysis
User selects Strange Lake rare earths project
→ Sees low viability score (45)
→ Infrastructure panel shows: 400km to power, 600km to rail
→ Gap cost: $1.2B
→ Recommendations: On-site generation, truck to Voisey's Bay port
→ Government funding: CIB eligible for enabling infrastructure

### Scenario 3: Regional Comparison
User draws polygon around James Bay region
→ Shows 5 deposits
→ Comparison view: All have good hydro access
→ Filter by "shovel-ready" (feasibility+)
→ Ranked by viability: Whabouchi (88), Corvette (72), etc.

---

## Notes for Claude Code

1. **Map is the hero** - Make it beautiful, fast, responsive
2. **Real data matters** - Use actual Canadian project names and realistic numbers
3. **Infrastructure visualization** - Show the gap visually (lines on map, diagrams)
4. **Scoring transparency** - Always explain how scores are calculated
5. **Indigenous respect** - Handle territory data sensitively, emphasize partnership
6. **Mobile-friendly** - Executives view on tablets during meetings
7. **Export capability** - PDF/Excel export for offline presentations
8. **Loading states** - Show skeletons, progress indicators
9. **Error handling** - Graceful degradation if data/AI fails

---

## Data Sources (for future enhancement)

- NRCan Mineral Deposits Database
- SEDAR+ filings (NI 43-101 technical reports)
- Provincial mining recorders (claims data)
- Statistics Canada (infrastructure)
- Hydro-Québec/BC Hydro/etc. (power data)
- CN/CP Rail (rail network data)
- Indigenous Services Canada (territory boundaries)
- Impact Assessment Agency (EA status)
