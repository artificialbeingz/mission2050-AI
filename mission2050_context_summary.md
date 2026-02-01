# Mission 2050 Platform - Development Context Summary

## 1. Project Overview
*   **Goal:** A unified intelligence platform for Canadian clean energy infrastructure, bridging the gap between investment capital and opportunities (minerals, power, land).
*   **Current State:** A high-fidelity prototype with 4 fully functional modules (Site Selection, Energy, Investment, Regulatory Compliance) and shells for 7 others. It relies on comprehensive mock data to demonstrate functionality.

## 2. Tech Stack
*   **Framework:** **Next.js 16+** (App Router)
*   **Language:** **TypeScript**
*   **Styling:** **Tailwind CSS v4** (using CSS variables for theming)
*   **UI Components:** Custom components using **Lucide React** icons.
*   **Mapping:** **MapLibre GL** (Vector maps with custom dark theme).
*   **Charts:** **Recharts** (Complex visualizations in the Energy module).
*   **Package Manager:** npm

## 3. Key Features & Modules

### A. Site Selection Module (Most Advanced)
*   **Path:** `src/app/modules/site-selection/page.tsx`
*   **Functionality:**
    *   **Interactive Map:** Full-screen Canada map (via `src/components/CanadaMap.tsx`) visualizing thousands of data points.
    *   **Multi-Category Support:** Toggles between Mining, Data Centers, Hospitals, Solar Farms, and Manufacturing sites.
    *   **Viability Scoring:** "Hot Zones" logic highlights high-potential sites (Score > 80).
    *   **Filtering:** Filter by province, viability score, and search query.
    *   **Ontology Graph:** A visual node-graph modal showing relationships between infrastructure entities (Power Grid ↔ Rail ↔ Indigenous Nations).
    *   **Details Panel:** Comprehensive sidebar showing specific metrics (NPV, IRR, Power Access) for selected sites.

### B. Energy Management Module
*   **Path:** `src/app/modules/energy/page.tsx`
*   **Functionality:**
    *   **Hierarchy:** Drill-down view: `Energy Company` → `Power Plants` → `AI Agents`.
    *   **Visualizations:**
        *   24-Hour Grid Load (Composed Chart: Area + Line).
        *   Energy Mix (Pie & Bar Charts).
        *   Price Forecasting (Area Chart).
    *   **AI Agents:** Detailed view of specific agents (e.g., "Grid Optimizer") showing decisions made and savings generated.

### C. Investment Attraction Module
*   **Path:** `src/app/modules/investment/page.tsx`
*   **Functionality:**
    *   **Opportunity Explorer:** List view of investment opportunities with status badges (e.g., "Seeking Lead Investor").
    *   **FDI Analytics:** Key metrics and "Hot Sectors" summary.
    *   **AI Matching:** Mockup interface for investor-to-opportunity matching.

### D. Regulatory Compliance Module (NEW - Fully Functional)
*   **Path:** `src/app/modules/regulatory/page.tsx`
*   **Data:** `src/data/regulatoryCompliance.ts`, `src/data/riskManagement.ts`
*   **Functionality:**
    *   **Company Selection:** Dropdown to select from 4 demo companies (Royal Bank, Suncor, Shopify, Pfizer Canada).
    *   **5-Tab Navigation:**
        1.  **Risks (Default):** Interactive Risk Heat Map with category badges, hover tooltips showing risk names, clickable risks opening detail modals.
        2.  **Agents + Models:** AI Compliance Agents list with detail panel + Predictive Maintenance ML Models section.
        3.  **Processes:** Downstream process workflows triggered by AI agents.
        4.  **Frameworks:** Regulatory framework compliance overview.
        5.  **Summary:** High-level company compliance overview.
    *   **Risk Detail Modal:** Shows risk score, status, severity, likelihood, owner, input sources, ML model used, AI agent for mitigation, and mitigation actions. Includes "View Full Risk Page" and "Deploy AI Agent" buttons.

### E. Risk Workflow Dashboard (NEW - Demo Page)
*   **Path:** `src/app/modules/regulatory/risk/page.tsx`
*   **Purpose:** N8N-style workflow visualization for Risk R-004 (Class action lawsuit demo).
*   **Functionality:**
    *   **Risk Summary Bar:** Real-time risk score, status, severity, likelihood display.
    *   **Workflow Visualization (Left to Right):**
        *   **Input Sources:** 4 data feeds (Court Filings, Customer Complaints, Loan Documentation, Regulatory Correspondence).
        *   **ML Risk Prediction:** LegalRisk-Analyzer model with accuracy metrics and risk prediction bars.
        *   **Downstream Mitigation Processes:** 8 clickable processes with modal interactions.
    *   **3 Action Category Cards:**
        1.  **Confirmed AI Steps:** Completed automated tasks (3 items).
        2.  **Approval Required:** Pending AI actions with "Approve All" button (3 items).
        3.  **Manual Steps Required:** Human actions needed (2 items).
    *   **Interactive Process Modals:** Click any process to open modal with:
        *   AI Action approve/reject buttons.
        *   Email templates with "Send Email" functionality.
        *   Manual task assignment details.
    *   **Demo Behavior:** Clicking "Approve All" reduces risk score from 18 → 10, shows success notification, highlights next manual step.

## 4. Project Structure

```text
/src
  /app
    /modules           # 11 Strategic Modules
      /site-selection  # Primary map-based module
      /energy          # Dashboard-heavy module
      /investment      # List/Card-based module
      /regulatory      # Risk & compliance management
        page.tsx       # Main regulatory module
        /risk
          page.tsx     # Risk workflow dashboard (demo)
      /esg             # (Shell)
      /workforce       # (Shell)
      ... (others)
    page.tsx           # Landing page with hero & module grid
    layout.tsx         # Root layout
  /components
    CanadaMap.tsx      # Core mapping component (MapLibre)
    ModuleCard.tsx     # Navigation cards for landing page
    ModuleLayout.tsx   # Standard wrapper for module pages
  /data                # Extensive Mock Data (Types & Arrays)
    mineralDeposits.ts
    energyManagement.ts
    dataCenterSites.ts
    regulatoryCompliance.ts  # Companies, agents, processes, frameworks
    riskManagement.ts        # Risk profiles, heat maps, ML models, AI agents
    ...
  /hooks
    useMediaQuery.ts   # Responsive design hook
```

## 5. Data Management
*   **Strategy:** The app currently uses **static mock data** located in `src/data`.
*   **Type Safety:** Strong TypeScript interfaces define the shape of all data entities:
    *   `MineralDeposit`, `EnergyCompany` - Infrastructure entities
    *   `ComplianceCompany`, `ComplianceAgent`, `DownstreamProcess` - Regulatory entities
    *   `CompanyRiskProfile`, `Risk`, `RiskHeatMapCell` - Risk management entities
*   **Risk Data Features:**
    *   Per-risk input sources, ML models, and AI agents
    *   Heat map cell distributions by category
    *   Severity and likelihood configurations with color coding

## 6. UI/Design System
*   **Theme:** "Mission Control" Dark Mode.
*   **Colors:**
    *   Background: Deep Blue/Slate (`#0A1628`)
    *   Primary Accent: Teal (`#00D4AA`)
    *   Secondary Accents: 
        *   Orange (`#FF6B35` for Hot Zones)
        *   Blue (`#3498DB` for info/links)
        *   Purple (`#9B59B6` for AI/agents)
        *   Yellow (`#F1C40F` for warnings/ML models)
        *   Green (`#2ECC71` for success/completed)
        *   Red (`#E74C3C` for critical/high risk)
*   **Responsive:** Fully mobile-optimized with custom mobile navigation and slide-up modals for complex data views.

## 7. AI/ML Features (Regulatory Module)

### Predictive Maintenance Models
| Model Name | Type | Accuracy |
|------------|------|----------|
| RiskPredict-XL | Predictive Risk Scoring | 96.8% |
| AnomalyDetect-Pro | Anomaly Detection | 94.5% |
| TrendForecast-AI | Time Series Forecasting | 92.3% |
| FailurePredict-ML | Failure Prediction | 95.1% |
| SentimentNLP-v3 | NLP Sentiment Analysis | 91.7% |
| ClusterRisk-AI | Risk Clustering | 89.4% |

### AI Agents for Risk Mitigation
*   **ComplianceGuard AI** - Compliance Monitoring (78% automated)
*   **CyberShield Agent** - Threat Response (85% automated)
*   **LegalAssist AI** - Legal Research (65% automated)
*   **ReputationGuard AI** - Crisis Management (74% automated)
*   **DocReview AI** - Document scanning and classification
*   **NotifyBot** - Stakeholder notifications
*   **SettlementCalc AI** - Settlement modeling
*   **CommsBot** - Customer communications

## 8. Migration Checklist
If you are moving to a new platform/IDE, ensure you:
1.  **Install Dependencies:** Run `npm install` to get Next.js, MapLibre, and Recharts.
2.  **Environment:** No `.env` keys are currently strictly required for the *mock* version, but you will need map tiles (currently using CartoDB free tiles in `CanadaMap.tsx`).
3.  **Future Work:**
    *   Connect `src/data` interfaces to a real database (Postgres).
    *   Implement the backend logic for the "AI Query" search bar (currently frontend filtering).
    *   Flesh out the remaining 7 placeholder modules.
    *   Add real AI/ML model integration for risk prediction.
    *   Implement actual email sending functionality.
    *   Add user authentication and role-based access control.

## 9. Recent Updates (February 2026)
*   **Regulatory Module Overhaul:** Complete redesign with 5-tab navigation, risk-first approach.
*   **Risk Heat Map:** Interactive heat map with category badges, tooltips, and clickable risk details.
*   **Risk Detail Modal:** Comprehensive modal showing input sources, ML models, AI agents, and mitigation actions.
*   **Risk Workflow Dashboard:** New demo page (`/modules/regulatory/risk`) with N8N-style workflow visualization.
*   **Approval Workflows:** Interactive approve/reject functionality for AI actions with email templates.
*   **Live Demo Feature:** "Approve All" button demonstrates risk score reduction (18 → 10) with real-time UI updates and notifications.
