# Mission 2050 Infrastructure Intelligence Platform - Claude Code Context

## Project Overview

**Company:** ArtificialBeingz (artificialbeingz.com)
**Client:** Mission 2050 (mission2050.com) - Clean energy infrastructure investment fund
**Goal:** Build a demo web portal showcasing AI + Data capabilities across 11 strategic focus areas for Canadian clean energy infrastructure

## What We're Building

A unified **Canadian Infrastructure Intelligence Platform** that serves as the bridge between:
- Foreign capital seeking Canadian investment opportunities
- Canadian resources (minerals, clean power, land)
- Infrastructure gaps that need to be filled
- Regulatory/ESG compliance requirements

**Core Value Proposition:** "Canada has the minerals, the clean power, the land, and the political moment. But there's no system that maps the full opportunity—from lithium in the ground to batteries in cars to solar panels on roofs. We're building it."

---

## Demo Requirements

### Tech Stack (Recommended)
- **Frontend:** Next.js 14+ with App Router, TypeScript, Tailwind CSS, shadcn/ui components
- **Backend:** Next.js API routes or FastAPI (Python)
- **Database:** PostgreSQL with Prisma ORM (or Supabase for faster demo)
- **Maps:** Leaflet.js or Mapbox for geospatial visualization
- **Charts:** Recharts or Chart.js
- **Auth:** NextAuth.js or Clerk for demo authentication
- **AI Integration:** OpenAI/Anthropic API for demo AI features

### Demo Scope
This is a **demonstration portal** to show Mission 2050 leadership what the full platform will achieve. Focus on:
1. Clean, professional UI that looks production-ready
2. Interactive elements that showcase AI capabilities
3. Sample data that tells a compelling story
4. 3-4 fully functional modules (not all 11)

---

## Portal Structure

### Landing Page (Public)
- Hero section with value proposition
- Overview of 11 capability areas (cards/grid)
- Key statistics (Canadian clean energy facts)
- Call-to-action for demo/login

### Dashboard (Authenticated)
After login, users see a main dashboard with:
- Navigation sidebar with all 11 modules
- Overview metrics and KPIs
- Recent activity / alerts
- Quick access to key tools

---

## 11 Modules to Build (Priority Order)

### MODULE 1: Site Selection & Mining (PRIMARY DEMO - Build Fully)

**Purpose:** Infrastructure intelligence for critical mineral project viability assessment

**Features to Demo:**
1. **Interactive Map of Canada**
   - Plot mineral deposits (lithium, nickel, cobalt, graphite, rare earths, uranium)
   - Overlay infrastructure layers (power grid, rail, roads, ports)
   - Indigenous territory boundaries
   - Click on deposit → show details panel

2. **Project Viability Scorer**
   - Input: Select a mineral deposit or project
   - Output: Viability score based on:
     - Distance to nearest grid power (km)
     - Distance to rail (km)
     - Distance to deep-water port (km)
     - Indigenous consultation status
     - Environmental assessment status
     - Estimated infrastructure gap cost ($M)
   - Adjustable weights for scoring criteria

3. **Infrastructure Gap Analysis**
   - For selected project, show:
     - What infrastructure exists
     - What's missing
     - Estimated cost to build
     - Timeline to development

4. **Natural Language Query (AI Feature)**
   - Search box: "Show me lithium projects in Quebec within 100km of grid power, past feasibility stage"
   - AI parses query → filters map → returns results

**Sample Data to Include:**
```javascript
const mineralDeposits = [
  {
    id: "LIT-QC-001",
    name: "Nemaska Lithium - Whabouchi",
    type: "lithium",
    province: "Quebec",
    lat: 52.1234,
    lng: -76.5678,
    stage: "Development",
    estimatedTonnage: "35.2M tonnes",
    grade: "1.53% Li2O",
    owner: "Nemaska Lithium",
    nearestGrid: 45, // km
    nearestRail: 280,
    nearestPort: 650,
    indigenousTerritory: "Cree Nation of Nemaska",
    consultationStatus: "IBA Signed",
    eaStatus: "Approved",
    infrastructureGapCost: 450, // $M
    viabilityScore: 78
  },
  // Add 15-20 more sample deposits across Canada
];
```

---

### MODULE 2: Sovereign AI Compute (Build Basic Demo)

**Purpose:** Site selection for AI data centers under federal $2B program

**Features to Demo:**
1. **Data Center Site Ranker**
   - Map showing potential sites across Canada
   - Scoring criteria:
     - Clean power availability (MW)
     - Power cost ($/kWh)
     - Cooling climate score
     - Fiber connectivity
     - Indigenous partnership status
     - Provincial incentives
   - Adjustable weights slider

2. **Power Availability Dashboard**
   - Province-by-province clean power capacity
   - Grid connection queue status
   - Projected availability timeline

3. **Federal Program Tracker**
   - Timeline of ISED deadlines
   - Checklist of proposal requirements
   - Status tracker for submissions

**Sample Data:**
```javascript
const dataCenterSites = [
  {
    id: "DC-QC-001",
    name: "Beauharnois Hydro Zone",
    province: "Quebec",
    lat: 45.3167,
    lng: -73.8667,
    availablePowerMW: 200,
    powerCostPerKWh: 0.05,
    cleanEnergyPercent: 99.8,
    coolingScore: 92, // 100 = cold climate
    fiberLatencyMs: 8,
    indigenousPartner: "Kahnawake Mohawk",
    provincialIncentive: "25% tax credit",
    overallScore: 89
  },
  // Add 8-10 more sites
];
```

---

### MODULE 3: Investment Attraction Platform (Build Basic Demo)

**Purpose:** Match foreign investors with Canadian opportunities

**Features to Demo:**
1. **Opportunity Explorer**
   - Filterable list of investment opportunities
   - Categories: Mining, Clean Energy, Data Centers, Manufacturing
   - Investment size ranges
   - Expected returns
   - Risk profiles

2. **Investor Matching (AI Feature)**
   - Input investor profile (country, sector interest, capital range, ESG requirements)
   - AI recommends top 5 matching opportunities
   - Explanation of why each matches

3. **FDI Analytics Dashboard**
   - Canada FDI trends by sector
   - Source country breakdown
   - Provincial comparison
   - Sector performance metrics

**Sample Data:**
```javascript
const investmentOpportunities = [
  {
    id: "INV-001",
    title: "Northern Ontario Lithium Processing Facility",
    sector: "Critical Minerals",
    type: "Greenfield",
    investmentRange: "$200M - $500M",
    expectedIRR: "18-22%",
    timeline: "2026-2030",
    province: "Ontario",
    esgScore: 85,
    indigenousPartnership: true,
    federalSupport: "30% ITC eligible",
    status: "Seeking Lead Investor"
  },
  // Add 10-15 more opportunities
];
```

---

### MODULE 4: ESG Ontology & Reporting (Build Basic Demo)

**Purpose:** Unified ESG reporting across portfolio companies

**Features to Demo:**
1. **ESG Dashboard**
   - Portfolio-wide ESG scores
   - Breakdown by E, S, G pillars
   - Trend over time
   - Benchmark vs industry

2. **Framework Mapper**
   - Show how metrics map to GRI, ISSB, CSRD, TCFD
   - Gap analysis for each framework
   - Auto-generated compliance checklist

3. **Document Analyzer (AI Feature)**
   - Upload ESG report or sustainability document
   - AI extracts key metrics
   - Maps to standard frameworks
   - Identifies gaps and recommendations

**Sample Data:**
```javascript
const portfolioESG = {
  overallScore: 76,
  environmental: {
    score: 82,
    metrics: {
      scope1Emissions: { value: 12500, unit: "tCO2e", trend: -8 },
      scope2Emissions: { value: 45000, unit: "tCO2e", trend: -12 },
      renewableEnergy: { value: 78, unit: "%", trend: +5 },
      waterIntensity: { value: 2.3, unit: "m³/unit", trend: -3 }
    }
  },
  social: {
    score: 71,
    metrics: {
      employeeCount: 2450,
      diversityIndex: 0.68,
      safetyIncidents: 3,
      communityInvestment: 1.2 // $M
    }
  },
  governance: {
    score: 75,
    metrics: {
      boardIndependence: 67,
      ethicsViolations: 0,
      dataBreaches: 0
    }
  }
};
```

---

### MODULE 5: Regulatory Compliance (Simplified Demo)

**Features:**
- Regulatory tracker dashboard
- Key deadlines calendar
- Compliance checklist generator
- Policy change alerts

---

### MODULE 6: Predictive Maintenance (Simplified Demo)

**Features:**
- Equipment health dashboard
- Anomaly alerts
- Maintenance schedule optimizer
- Cost savings calculator

---

### MODULE 7: Education & Workforce (Simplified Demo)

**Features:**
- Skills gap analysis dashboard
- Training program recommendations
- Workforce metrics by region
- Partnership opportunities

---

### MODULE 8: Open Source AI Deployment (Simplified Demo)

**Features:**
- Model catalog (Llama, Mistral, etc.)
- Deployment configurator
- Cost calculator (local vs cloud)
- Compliance checker

---

### MODULE 9: AI Environmental Impact (Simplified Demo)

**Features:**
- Carbon footprint calculator for AI workloads
- Water usage tracker
- Efficiency benchmarks (PUE, CUE, WUE)
- Offset recommendations

---

### MODULE 10: Energy & Resource Management (Simplified Demo)

**Features:**
- Grid optimization dashboard
- Demand forecasting visualizer
- Renewable integration tracker
- Storage optimization

---

### MODULE 11: AI Trading (Simplified Demo)

**Features:**
- Carbon credit price tracker
- Critical mineral price dashboard
- Portfolio performance
- Strategy backtester interface

---

## UI/UX Guidelines

### Design System
- **Primary Color:** #1B4F72 (Deep blue - trust, stability)
- **Accent Color:** #2874A6 (Lighter blue - action items)
- **Success:** #27AE60 (Green)
- **Warning:** #F39C12 (Orange)
- **Error:** #E74C3C (Red)
- **Background:** #F8FAFC (Light gray)
- **Cards:** White with subtle shadow

### Component Library
Use shadcn/ui for consistent, professional components:
- Cards for data display
- Data tables with sorting/filtering
- Charts (line, bar, pie, area)
- Maps with custom markers
- Sliders for weight adjustment
- Command palette for search
- Toasts for notifications

### Navigation Structure
```
├── Dashboard (Overview)
├── Site Selection
│   ├── Mining & Critical Minerals
│   ├── Data Centers
│   └── Clean Energy Projects
├── Investment
│   ├── Opportunity Explorer
│   ├── Investor Matching
│   └── FDI Analytics
├── ESG & Compliance
│   ├── ESG Dashboard
│   ├── Framework Mapper
│   └── Regulatory Tracker
├── Operations
│   ├── Predictive Maintenance
│   ├── Energy Management
│   └── AI Impact Tracking
├── AI Services
│   ├── Open Source Models
│   ├── Trading Intelligence
│   └── Document Analysis
├── Workforce
│   └── Education & Training
└── Settings
    ├── Organization
    ├── Users
    └── API Keys
```

---

## Sample Code Snippets

### Map Component with Deposits
```tsx
// components/MineralMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { mineralDeposits } from '@/data/deposits';

export function MineralMap() {
  return (
    <MapContainer 
      center={[56.1304, -106.3468]} 
      zoom={4} 
      className="h-[600px] w-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap'
      />
      {mineralDeposits.map((deposit) => (
        <Marker 
          key={deposit.id} 
          position={[deposit.lat, deposit.lng]}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold">{deposit.name}</h3>
              <p className="text-sm text-gray-600">{deposit.type}</p>
              <p className="text-sm">Stage: {deposit.stage}</p>
              <p className="text-sm">Viability: {deposit.viabilityScore}/100</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
```

### Viability Scorer Component
```tsx
// components/ViabilityScorer.tsx
import { Slider } from '@/components/ui/slider';
import { Card } from '@/components/ui/card';

const criteria = [
  { id: 'power', label: 'Grid Power Access', weight: 25 },
  { id: 'rail', label: 'Rail Access', weight: 20 },
  { id: 'port', label: 'Port Access', weight: 15 },
  { id: 'indigenous', label: 'Indigenous Partnership', weight: 20 },
  { id: 'environmental', label: 'Environmental Approval', weight: 20 },
];

export function ViabilityScorer({ deposit, onWeightsChange }) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Viability Criteria Weights</h3>
      {criteria.map((c) => (
        <div key={c.id} className="mb-4">
          <div className="flex justify-between mb-2">
            <span>{c.label}</span>
            <span>{c.weight}%</span>
          </div>
          <Slider
            defaultValue={[c.weight]}
            max={100}
            step={5}
            onValueChange={(v) => onWeightsChange(c.id, v[0])}
          />
        </div>
      ))}
    </Card>
  );
}
```

### AI Query Interface
```tsx
// components/AIQuery.tsx
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';

export function AIQuery({ onResults }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // Call AI endpoint to parse natural language query
    const response = await fetch('/api/ai/query', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    const results = await response.json();
    onResults(results);
    setLoading(false);
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="e.g., Show lithium projects in Quebec near grid power..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
        Search
      </Button>
    </div>
  );
}
```

---

## API Endpoints to Create

```typescript
// Site Selection
GET  /api/deposits                    // List all mineral deposits
GET  /api/deposits/:id                // Get deposit details
POST /api/deposits/filter             // Filter deposits by criteria
GET  /api/infrastructure/:depositId   // Get infrastructure near deposit
POST /api/viability/calculate         // Calculate viability score

// Data Centers
GET  /api/datacenters/sites           // List potential DC sites
POST /api/datacenters/score           // Score a site

// Investment
GET  /api/opportunities               // List investment opportunities
POST /api/opportunities/match         // AI matching for investors
GET  /api/fdi/analytics               // FDI statistics

// ESG
GET  /api/esg/portfolio               // Portfolio ESG summary
POST /api/esg/analyze                 // Analyze uploaded document
GET  /api/esg/frameworks              // Get framework mappings

// AI Features
POST /api/ai/query                    // Natural language query parsing
POST /api/ai/document-analysis        // Document analysis
POST /api/ai/recommendations          // Get AI recommendations
```

---

## Database Schema (Simplified)

```prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(VIEWER)
  orgId     String?
  org       Organization? @relation(fields: [orgId], references: [id])
  createdAt DateTime @default(now())
}

model Organization {
  id        String   @id @default(cuid())
  name      String
  type      OrgType
  users     User[]
  createdAt DateTime @default(now())
}

model MineralDeposit {
  id                  String   @id @default(cuid())
  name                String
  type                MineralType
  province            String
  latitude            Float
  longitude           Float
  stage               ProjectStage
  estimatedTonnage    String?
  grade               String?
  owner               String?
  nearestGridKm       Float
  nearestRailKm       Float
  nearestPortKm       Float
  indigenousTerritory String?
  consultationStatus  String?
  eaStatus            String?
  infrastructureGap   Float?
  viabilityScore      Int?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

model DataCenterSite {
  id                  String   @id @default(cuid())
  name                String
  province            String
  latitude            Float
  longitude           Float
  availablePowerMW    Float
  powerCostPerKWh     Float
  cleanEnergyPercent  Float
  coolingScore        Int
  fiberLatencyMs      Float
  indigenousPartner   String?
  provincialIncentive String?
  overallScore        Int?
  createdAt           DateTime @default(now())
}

model InvestmentOpportunity {
  id                  String   @id @default(cuid())
  title               String
  sector              Sector
  type                InvestmentType
  investmentMin       Float
  investmentMax       Float
  expectedIRR         String?
  timeline            String?
  province            String
  esgScore            Int?
  indigenousPartnership Boolean @default(false)
  federalSupport      String?
  status              OpportunityStatus
  description         String?
  createdAt           DateTime @default(now())
}

enum Role {
  ADMIN
  MANAGER
  ANALYST
  VIEWER
}

enum OrgType {
  INVESTOR
  GOVERNMENT
  DEVELOPER
  INTERNAL
}

enum MineralType {
  LITHIUM
  NICKEL
  COBALT
  GRAPHITE
  RARE_EARTHS
  URANIUM
  COPPER
  OTHER
}

enum ProjectStage {
  EXPLORATION
  FEASIBILITY
  DEVELOPMENT
  CONSTRUCTION
  PRODUCTION
}

enum Sector {
  CRITICAL_MINERALS
  CLEAN_ENERGY
  DATA_CENTERS
  MANUFACTURING
  OTHER
}

enum InvestmentType {
  GREENFIELD
  BROWNFIELD
  EXPANSION
  ACQUISITION
  JV
}

enum OpportunityStatus {
  SEEKING_INVESTOR
  IN_DISCUSSION
  COMMITTED
  CLOSED
}
```

---

## Deployment

### For Demo
- Deploy on Vercel (free tier works for demo)
- Use Vercel Postgres or Supabase for database
- Environment variables for API keys

### Environment Variables
```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
OPENAI_API_KEY=          # For AI features
MAPBOX_TOKEN=            # If using Mapbox
```

---

## Demo Script / User Journey

When presenting to Mission 2050:

1. **Landing Page** → Show the vision and 11 capabilities
2. **Login** → Demonstrate authentication
3. **Dashboard** → Portfolio overview with key metrics
4. **Site Selection (Mining)**
   - Show the map with deposits
   - Click on a lithium deposit in Quebec
   - View infrastructure analysis
   - Adjust viability weights
   - Use AI query: "Find rare earth projects with signed IBAs"
5. **Data Center Site Selection**
   - Show ranked sites for sovereign AI compute
   - Demonstrate the Feb 15 deadline tracker
6. **Investment Matching**
   - Input a sample investor profile
   - Show AI-matched opportunities
7. **ESG Dashboard**
   - Show portfolio ESG scores
   - Demonstrate framework mapping
8. **Wrap-up** → Show roadmap for full platform

---

## Timeline Estimate

For a polished demo:
- **Week 1:** Project setup, auth, navigation, database, sample data
- **Week 2:** Site Selection module (map, scoring, AI query)
- **Week 3:** Investment + ESG modules (basic functionality)
- **Week 4:** Polish, testing, deployment, demo script

---

## Notes for Claude Code

1. **Focus on visual impact** - This is a demo to sell the vision, not a production system yet
2. **Use realistic Canadian data** - Real deposit names, real locations, realistic numbers
3. **Make the AI features feel magical** - Even if mocked, they should show the potential
4. **Ensure mobile responsiveness** - Executives often view on tablets
5. **Include loading states and animations** - Feels more polished
6. **Use Canadian English** - "colour" not "color", "centre" not "center"

---

## Resources

- [Natural Resources Canada - Mineral deposits](https://www.nrcan.gc.ca)
- [SEDAR+ - Mining filings](https://www.sedarplus.ca)
- [Statistics Canada - Energy data](https://www.statcan.gc.ca)
- [Invest in Canada - FDI data](https://www.investcanada.ca)
- [ISED - Sovereign AI Compute](https://ised-isde.canada.ca)

---

## Contact

**ArtificialBeingz**
- Website: artificialbeingz.com
- Project Lead: Abhimanyu

**Mission 2050**
- Website: mission2050.com
