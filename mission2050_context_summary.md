# Mission 2050 Platform - Development Context Summary

## 1. Project Overview
*   **Goal:** A unified intelligence platform for Canadian clean energy infrastructure, bridging the gap between investment capital and opportunities (minerals, power, land).
*   **Current State:** A high-fidelity prototype with 3 functional modules (Site Selection, Energy, Investment) and shells for 8 others. It relies on comprehensive mock data to demonstrate functionality.

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

## 4. Project Structure

```text
/src
  /app
    /modules           # 11 Strategic Modules
      /site-selection  # Primary map-based module
      /energy          # Dashboard-heavy module
      /investment      # List/Card-based module
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
    ...
  /hooks
    useMediaQuery.ts   # Responsive design hook
```

## 5. Data Management
*   **Strategy:** The app currently uses **static mock data** located in `src/data`.
*   **Type Safety:** Strong TypeScript interfaces (e.g., `MineralDeposit`, `EnergyCompany`) define the shape of all data entities, making it ready for a backend integration (Supabase/Postgres was planned).

## 6. UI/Design System
*   **Theme:** "Mission Control" Dark Mode.
*   **Colors:**
    *   Background: Deep Blue/Slate (`#0A1628`)
    *   Primary Accent: Teal (`#00D4AA`)
    *   Secondary Accents: Orange (`#FF6B35` for Hot Zones), Blue (`#3498DB`), Purple (`#9B59B6`).
*   **Responsive:** Fully mobile-optimized with custom mobile navigation and slide-up modals for complex data views.

## 7. Migration Checklist
If you are moving to a new platform/IDE, ensure you:
1.  **Install Dependencies:** Run `npm install` to get Next.js, MapLibre, and Recharts.
2.  **Environment:** No `.env` keys are currently strictly required for the *mock* version, but you will need map tiles (currently using CartoDB free tiles in `CanadaMap.tsx`).
3.  **Future Work:**
    *   Connect `src/data` interfaces to a real database (Postgres).
    *   Implement the backend logic for the "AI Query" search bar (currently frontend filtering).
    *   Flesh out the remaining 8 placeholder modules.
