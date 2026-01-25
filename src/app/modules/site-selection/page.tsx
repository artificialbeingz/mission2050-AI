"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Search,
  Filter,
  ArrowLeft,
  Zap,
  Train,
  Ship,
  Car,
  Users,
  TrendingUp,
  ChevronDown,
  Sparkles,
  X,
  Info,
  ExternalLink,
  Building2,
  Mountain,
  Server,
  Heart,
  Sun,
  Factory,
  Network,
  Wifi,
  Thermometer,
  BedDouble,
  Activity,
  Leaf,
  Battery,
  Droplets,
  Flame,
  Star,
} from "lucide-react";

import dynamic from "next/dynamic";

const CanadaMap = dynamic(() => import("@/components/CanadaMap"), {
  ssr: false,
  loading: () => (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      backgroundColor: "#0A1628",
      color: "#6B7A8C",
      fontSize: "14px",
      borderRadius: "0 0 12px 12px",
    }}>
      Loading map...
    </div>
  ),
});

// Import all site data
import { mineralDeposits, MineralDeposit, getMineralColor, getStageLabel as getMiningStageLabel, MineralType, Province as MiningProvince, ProjectStage as MiningStage } from "@/data/mineralDeposits";
import { dataCenterSites, DataCenterSite, getTierLabel, getTierColor } from "@/data/dataCenterSites";
import { hospitalSites, HospitalSite, getHospitalTypeLabel, getHospitalTypeColor } from "@/data/hospitalSites";
import { solarFarmSites, SolarFarmSite, getSolarTechLabel, getSolarTechColor } from "@/data/solarFarmSites";
import { manufacturingSites, ManufacturingSite, getSectorLabel, getSectorColor } from "@/data/manufacturingSites";
import { SiteCategory, categoryConfig, getProvinceLabel, getStageLabel, getStageColor, Province } from "@/data/siteTypes";

type ActiveCategory = SiteCategory;

// Combined site type for unified handling
type AnySite = MineralDeposit | DataCenterSite | HospitalSite | SolarFarmSite | ManufacturingSite;

export default function SiteSelectionPage() {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>("mining");
  const [selectedSite, setSelectedSite] = useState<AnySite | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [showOntology, setShowOntology] = useState(false);
  const [showHotZones, setShowHotZones] = useState(true);
  const [provinceFilter, setProvinceFilter] = useState<Province[]>([]);
  const [minViability, setMinViability] = useState(0);

  const HOT_THRESHOLD = 80;

  // Get sites for active category
  const currentSites = useMemo(() => {
    let sites: AnySite[] = [];
    switch (activeCategory) {
      case "mining":
        sites = mineralDeposits;
        break;
      case "datacenter":
        sites = dataCenterSites;
        break;
      case "hospital":
        sites = hospitalSites;
        break;
      case "solar":
        sites = solarFarmSites;
        break;
      case "manufacturing":
        sites = manufacturingSites;
        break;
    }
    return sites;
  }, [activeCategory]);

  // Get hot opportunities (must be after currentSites)
  const hotOpportunities = useMemo(() => {
    return currentSites
      .filter((site) => site.viabilityScore >= HOT_THRESHOLD)
      .sort((a, b) => b.viabilityScore - a.viabilityScore);
  }, [currentSites]);

  // Filter sites
  const filteredSites = useMemo(() => {
    return currentSites.filter((site) => {
      if (searchQuery && !site.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (provinceFilter.length > 0 && !provinceFilter.includes(site.province)) {
        return false;
      }
      if (site.viabilityScore < minViability) {
        return false;
      }
      return true;
    });
  }, [currentSites, searchQuery, provinceFilter, minViability]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#2ECC71";
    if (score >= 60) return "#F1C40F";
    return "#E74C3C";
  };

  const getCategoryIcon = (cat: SiteCategory) => {
    const icons = {
      mining: Mountain,
      datacenter: Server,
      hospital: Heart,
      solar: Sun,
      manufacturing: Factory,
    };
    return icons[cat];
  };

  // Reset selection when category changes
  const handleCategoryChange = (cat: ActiveCategory) => {
    setActiveCategory(cat);
    setSelectedSite(null);
    setSearchQuery("");
    setProvinceFilter([]);
    setMinViability(0);
  };

  // Handle marker click on the map
  const handleMarkerClick = useCallback((id: string) => {
    const site = currentSites.find((s) => s.id === id);
    if (site) {
      setSelectedSite(site);
    }
  }, [currentSites]);

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0A1628" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#0A1628", borderBottom: "1px solid #2A3A4D" }}>
        <div style={{ maxWidth: "1800px", margin: "0 auto", padding: "12px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#B8C5D3", textDecoration: "none" }}>
                <ArrowLeft size={18} />
                <span style={{ fontSize: "14px" }}>Back</span>
              </Link>
              <div style={{ width: "1px", height: "24px", backgroundColor: "#2A3A4D" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: `${categoryConfig[activeCategory].color}15`, border: `1px solid ${categoryConfig[activeCategory].color}30` }}>
                  {(() => { const Icon = getCategoryIcon(activeCategory); return <Icon size={20} style={{ color: categoryConfig[activeCategory].color }} />; })()}
                </div>
                <div>
                  <h1 style={{ fontSize: "18px", fontWeight: "600", color: "white", margin: 0 }}>Site Selection Intelligence</h1>
                  <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>{categoryConfig[activeCategory].description}</p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button 
                onClick={() => setShowHotZones(!showHotZones)}
                style={{ 
                  display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px",
                  backgroundColor: showHotZones ? "#FF6B35" : "#162032", border: showHotZones ? "1px solid #FF6B35" : "1px solid #2A3A4D",
                  color: showHotZones ? "white" : "#B8C5D3", fontSize: "13px", cursor: "pointer", fontWeight: showHotZones ? "600" : "400"
                }}
              >
                <Flame size={16} />
                Hot Zones
                {hotOpportunities.length > 0 && (
                  <span style={{ 
                    backgroundColor: showHotZones ? "rgba(255,255,255,0.2)" : "#FF6B35", 
                    color: "white", 
                    padding: "2px 8px", 
                    borderRadius: "10px", 
                    fontSize: "11px",
                    fontWeight: "600"
                  }}>
                    {hotOpportunities.length}
                  </span>
                )}
              </button>
              <button 
                onClick={() => setShowOntology(!showOntology)}
                style={{ 
                  display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "8px",
                  backgroundColor: showOntology ? "#00D4AA" : "#162032", border: "1px solid #2A3A4D",
                  color: showOntology ? "white" : "#B8C5D3", fontSize: "13px", cursor: "pointer"
                }}
              >
                <Network size={16} />
                Ontology
              </button>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Image src="/logo.png" alt="Mission 2050" width={100} height={30} style={{ objectFit: "contain" }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ maxWidth: "1800px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", gap: "4px", borderBottom: "1px solid #2A3A4D", paddingBottom: "0" }}>
            {(Object.keys(categoryConfig) as SiteCategory[]).map((cat) => {
              const Icon = getCategoryIcon(cat);
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  style={{
                    display: "flex", alignItems: "center", gap: "8px", padding: "12px 20px",
                    backgroundColor: isActive ? "#1A2738" : "transparent",
                    border: "none", borderBottom: isActive ? `2px solid ${categoryConfig[cat].color}` : "2px solid transparent",
                    color: isActive ? "white" : "#6B7A8C", fontSize: "13px", fontWeight: "500",
                    cursor: "pointer", transition: "all 0.2s", marginBottom: "-1px"
                  }}
                >
                  <Icon size={16} style={{ color: isActive ? categoryConfig[cat].color : "#6B7A8C" }} />
                  {categoryConfig[cat].label}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Ontology Graph Modal */}
      {showOntology && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div style={{ backgroundColor: "#1A2738", borderRadius: "16px", width: "100%", maxWidth: "1000px", maxHeight: "90vh", overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #2A3A4D", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ color: "white", fontSize: "18px", fontWeight: "600", margin: 0 }}>Infrastructure Ontology Graph</h2>
                <p style={{ color: "#6B7A8C", fontSize: "13px", margin: "4px 0 0 0" }}>Relationships between site types, infrastructure, and stakeholders</p>
              </div>
              <button onClick={() => setShowOntology(false)} style={{ padding: "8px", borderRadius: "8px", backgroundColor: "#162032", border: "none", cursor: "pointer" }}>
                <X size={20} style={{ color: "#6B7A8C" }} />
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <svg viewBox="0 0 900 500" style={{ width: "100%", height: "450px" }}>
                {/* Background grid */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2A3A4D" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Edges */}
                <g stroke="#3A4A5D" strokeWidth="2" fill="none">
                  {/* Mining connections */}
                  <path d="M 150 120 Q 300 80 450 150" />
                  <path d="M 150 120 Q 200 200 300 250" />
                  <path d="M 150 120 Q 100 200 150 350" />
                  
                  {/* Data Center connections */}
                  <path d="M 300 120 Q 400 80 450 150" />
                  <path d="M 300 120 Q 400 120 500 200" />
                  <path d="M 300 120 Q 350 200 450 250" />
                  
                  {/* Hospital connections */}
                  <path d="M 450 120 Q 500 180 550 250" />
                  <path d="M 450 120 Q 550 150 650 200" />
                  <path d="M 450 120 Q 400 200 350 350" />
                  
                  {/* Solar connections */}
                  <path d="M 600 120 Q 500 150 450 150" />
                  <path d="M 600 120 Q 650 200 700 250" />
                  
                  {/* Manufacturing connections */}
                  <path d="M 750 120 Q 600 150 450 150" />
                  <path d="M 750 120 Q 650 180 550 250" />
                  <path d="M 750 120 Q 700 200 650 350" />
                  <path d="M 750 120 Q 800 200 800 300" />
                  
                  {/* Infrastructure to stakeholder connections */}
                  <path d="M 450 150 Q 400 250 350 350" />
                  <path d="M 550 250 Q 500 300 450 380" />
                  <path d="M 700 250 Q 650 300 550 380" />
                </g>

                {/* Site Type Nodes */}
                <g>
                  <circle cx="150" cy="120" r="35" fill="#00D4AA" opacity="0.2" />
                  <circle cx="150" cy="120" r="28" fill="#00D4AA" />
                  <text x="150" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Mining</text>
                  
                  <circle cx="300" cy="120" r="35" fill="#3498DB" opacity="0.2" />
                  <circle cx="300" cy="120" r="28" fill="#3498DB" />
                  <text x="300" y="118" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Data</text>
                  <text x="300" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Center</text>
                  
                  <circle cx="450" cy="120" r="35" fill="#E74C3C" opacity="0.2" />
                  <circle cx="450" cy="120" r="28" fill="#E74C3C" />
                  <text x="450" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Hospital</text>
                  
                  <circle cx="600" cy="120" r="35" fill="#F1C40F" opacity="0.2" />
                  <circle cx="600" cy="120" r="28" fill="#F1C40F" />
                  <text x="600" y="125" textAnchor="middle" fill="white" fontSize="11" fontWeight="600">Solar</text>
                  
                  <circle cx="750" cy="120" r="35" fill="#9B59B6" opacity="0.2" />
                  <circle cx="750" cy="120" r="28" fill="#9B59B6" />
                  <text x="750" y="118" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">Manufac-</text>
                  <text x="750" y="130" textAnchor="middle" fill="white" fontSize="10" fontWeight="600">turing</text>
                </g>

                {/* Infrastructure Nodes */}
                <g>
                  <rect x="420" y="135" width="60" height="30" rx="6" fill="#162032" stroke="#00D4AA" strokeWidth="2" />
                  <text x="450" y="155" textAnchor="middle" fill="#00D4AA" fontSize="10" fontWeight="500">Power Grid</text>
                  
                  <rect x="270" y="235" width="60" height="30" rx="6" fill="#162032" stroke="#3498DB" strokeWidth="2" />
                  <text x="300" y="255" textAnchor="middle" fill="#3498DB" fontSize="10" fontWeight="500">Rail</text>
                  
                  <rect x="420" y="235" width="60" height="30" rx="6" fill="#162032" stroke="#E67E22" strokeWidth="2" />
                  <text x="450" y="255" textAnchor="middle" fill="#E67E22" fontSize="10" fontWeight="500">Highway</text>
                  
                  <rect x="520" y="235" width="60" height="30" rx="6" fill="#162032" stroke="#9B59B6" strokeWidth="2" />
                  <text x="550" y="255" textAnchor="middle" fill="#9B59B6" fontSize="10" fontWeight="500">Fiber</text>
                  
                  <rect x="620" y="185" width="60" height="30" rx="6" fill="#162032" stroke="#2ECC71" strokeWidth="2" />
                  <text x="650" y="205" textAnchor="middle" fill="#2ECC71" fontSize="10" fontWeight="500">Water</text>
                  
                  <rect x="670" y="235" width="60" height="30" rx="6" fill="#162032" stroke="#1ABC9C" strokeWidth="2" />
                  <text x="700" y="255" textAnchor="middle" fill="#1ABC9C" fontSize="10" fontWeight="500">Port</text>
                  
                  <rect x="770" y="285" width="60" height="30" rx="6" fill="#162032" stroke="#F39C12" strokeWidth="2" />
                  <text x="800" y="305" textAnchor="middle" fill="#F39C12" fontSize="10" fontWeight="500">Pipeline</text>
                </g>

                {/* Stakeholder Nodes */}
                <g>
                  <rect x="120" y="335" width="70" height="35" rx="8" fill="#2C3E50" stroke="#E74C3C" strokeWidth="2" />
                  <text x="155" y="350" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Indigenous</text>
                  <text x="155" y="362" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Nations</text>
                  
                  <rect x="315" y="335" width="70" height="35" rx="8" fill="#2C3E50" stroke="#3498DB" strokeWidth="2" />
                  <text x="350" y="350" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Provincial</text>
                  <text x="350" y="362" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Gov&apos;t</text>
                  
                  <rect x="415" y="365" width="70" height="35" rx="8" fill="#2C3E50" stroke="#00D4AA" strokeWidth="2" />
                  <text x="450" y="380" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Federal</text>
                  <text x="450" y="392" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Gov&apos;t</text>
                  
                  <rect x="515" y="365" width="70" height="35" rx="8" fill="#2C3E50" stroke="#F1C40F" strokeWidth="2" />
                  <text x="550" y="385" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Investors</text>
                  
                  <rect x="615" y="335" width="70" height="35" rx="8" fill="#2C3E50" stroke="#9B59B6" strokeWidth="2" />
                  <text x="650" y="355" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Workforce</text>
                </g>

                {/* Legend */}
                <g transform="translate(30, 420)">
                  <rect x="0" y="0" width="200" height="70" rx="8" fill="#162032" />
                  <text x="15" y="20" fill="#6B7A8C" fontSize="10" fontWeight="600">LEGEND</text>
                  <circle cx="25" cy="38" r="8" fill="#00D4AA" />
                  <text x="40" y="42" fill="white" fontSize="10">Site Types</text>
                  <rect x="100" y="32" width="30" height="12" rx="3" fill="#162032" stroke="#3498DB" />
                  <text x="140" y="42" fill="white" fontSize="10">Infrastructure</text>
                  <rect x="17" y="52" width="30" height="12" rx="3" fill="#2C3E50" stroke="#E74C3C" />
                  <text x="55" y="62" fill="white" fontSize="10">Stakeholders</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: "20px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr 320px", gap: "20px" }}>
          {/* Left Sidebar - Filters */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* AI Search */}
            <div style={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "12px", padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                <Sparkles size={16} style={{ color: "#00D4AA" }} />
                <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>AI-Powered Search</h3>
              </div>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7A8C" }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${categoryConfig[activeCategory].label.toLowerCase()}...`}
                  style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", backgroundColor: "#162032", border: "1px solid #2A3A4D", color: "white", fontSize: "13px" }}
                />
              </div>
            </div>

            {/* Filters */}
            <div style={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "12px", padding: "16px" }}>
              <button onClick={() => setShowFilters(!showFilters)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "none", border: "none", cursor: "pointer", marginBottom: showFilters ? "16px" : 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Filter size={16} style={{ color: "#6B7A8C" }} />
                  <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>Filters</h3>
                </div>
                <ChevronDown size={16} style={{ color: "#6B7A8C", transform: showFilters ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
              </button>

              {showFilters && (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Province Filter */}
                  <div>
                    <label style={{ fontSize: "11px", color: "#6B7A8C", fontWeight: "500", display: "block", marginBottom: "8px" }}>Province</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {(["ON", "QC", "BC", "AB", "SK", "MB", "NS"] as Province[]).map((prov) => (
                        <button
                          key={prov}
                          onClick={() => setProvinceFilter(prev => prev.includes(prov) ? prev.filter(p => p !== prov) : [...prev, prov])}
                          style={{
                            padding: "6px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "500",
                            backgroundColor: provinceFilter.includes(prov) ? "#00D4AA" : "#162032",
                            color: provinceFilter.includes(prov) ? "white" : "#B8C5D3",
                            border: "none", cursor: "pointer"
                          }}
                        >
                          {prov}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Viability Score */}
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <label style={{ fontSize: "11px", color: "#6B7A8C", fontWeight: "500" }}>Min Viability Score</label>
                      <span style={{ fontSize: "11px", color: "#00D4AA", fontWeight: "600" }}>{minViability}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={minViability}
                      onChange={(e) => setMinViability(parseInt(e.target.value))}
                      style={{ width: "100%" }}
                    />
                  </div>

                  {/* Clear Filters */}
                  <button
                    onClick={() => { setProvinceFilter([]); setMinViability(0); setSearchQuery(""); }}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", backgroundColor: "#162032", border: "1px solid #2A3A4D", color: "#B8C5D3", fontSize: "12px", cursor: "pointer" }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* Category Stats */}
            <div style={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "12px", padding: "16px" }}>
              <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Category Overview</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#162032", borderRadius: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7A8C" }}>Total Sites</span>
                  <span style={{ fontSize: "12px", color: "white", fontWeight: "600" }}>{currentSites.length}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#162032", borderRadius: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7A8C" }}>Filtered</span>
                  <span style={{ fontSize: "12px", color: "#00D4AA", fontWeight: "600" }}>{filteredSites.length}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#162032", borderRadius: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7A8C" }}>Avg Viability</span>
                  <span style={{ fontSize: "12px", color: "white", fontWeight: "600" }}>
                    {filteredSites.length > 0 ? Math.round(filteredSites.reduce((sum, s) => sum + s.viabilityScore, 0) / filteredSites.length) : 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Map and Table */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Map */}
            <div style={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #2A3A4D", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>{categoryConfig[activeCategory].label} Sites</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "12px", color: "#6B7A8C" }}>{filteredSites.length} sites</span>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#00D4AA", animation: "pulse 2s infinite" }} />
                </div>
              </div>
              <div style={{ position: "relative", height: "400px", backgroundColor: "#0A1628" }}>
                <CanadaMap
                  markers={filteredSites.map((site) => ({
                    id: site.id,
                    name: site.name,
                    latitude: site.latitude,
                    longitude: site.longitude,
                    color: categoryConfig[activeCategory].color,
                    viabilityScore: site.viabilityScore,
                  }))}
                  selectedId={selectedSite?.id || null}
                  onMarkerClick={handleMarkerClick}
                  categoryColor={categoryConfig[activeCategory].color}
                  showHotZones={showHotZones}
                />
              </div>
            </div>

            {/* Hot Opportunities Section */}
            {showHotZones && hotOpportunities.length > 0 && (
              <div style={{ 
                backgroundColor: "linear-gradient(135deg, #2D1810 0%, #1A0F0A 100%)", 
                background: "linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(26,39,56,1) 100%)",
                border: "1px solid #FF6B35", 
                borderRadius: "12px", 
                overflow: "hidden" 
              }}>
                <div style={{ 
                  padding: "16px 20px", 
                  borderBottom: "1px solid rgba(255,107,53,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ 
                      width: "40px", height: "40px", borderRadius: "10px", 
                      backgroundColor: "rgba(255,107,53,0.2)", 
                      display: "flex", alignItems: "center", justifyContent: "center" 
                    }}>
                      <Flame size={22} style={{ color: "#FF6B35" }} />
                    </div>
                    <div>
                      <h3 style={{ color: "#FF6B35", fontSize: "16px", fontWeight: "700", margin: 0 }}>
                        🔥 Hot Opportunities
                      </h3>
                      <p style={{ color: "#8B9CAD", fontSize: "12px", margin: "2px 0 0 0" }}>
                        High-viability sites (score ≥ {HOT_THRESHOLD}) recommended for immediate development
                      </p>
                    </div>
                  </div>
                  <div style={{ 
                    backgroundColor: "#FF6B35", 
                    color: "white", 
                    padding: "6px 14px", 
                    borderRadius: "20px",
                    fontSize: "14px",
                    fontWeight: "700"
                  }}>
                    {hotOpportunities.length} Sites
                  </div>
                </div>
                <div style={{ padding: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
                  {hotOpportunities.slice(0, 6).map((site, index) => (
                    <div
                      key={site.id}
                      onClick={() => setSelectedSite(site)}
                      style={{
                        backgroundColor: selectedSite?.id === site.id ? "rgba(255,107,53,0.2)" : "rgba(0,0,0,0.2)",
                        border: selectedSite?.id === site.id ? "2px solid #FF6B35" : "1px solid rgba(255,107,53,0.2)",
                        borderRadius: "10px",
                        padding: "14px",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ 
                            backgroundColor: "#FFD700", 
                            color: "#1A0F0A", 
                            width: "22px", 
                            height: "22px", 
                            borderRadius: "50%", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            fontSize: "11px",
                            fontWeight: "700"
                          }}>
                            {index + 1}
                          </span>
                          <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>
                            {site.name.length > 25 ? site.name.substring(0, 25) + "..." : site.name}
                          </span>
                        </div>
                        <Star size={16} style={{ color: "#FFD700", fill: "#FFD700" }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ 
                            padding: "3px 8px", 
                            borderRadius: "4px", 
                            fontSize: "11px", 
                            backgroundColor: "rgba(255,255,255,0.1)", 
                            color: "#B8C5D3" 
                          }}>
                            {getProvinceLabel(site.province)}
                          </span>
                          <span style={{ 
                            padding: "3px 8px", 
                            borderRadius: "4px", 
                            fontSize: "11px", 
                            backgroundColor: `${getStageColor((site as any).stage)}20`, 
                            color: getStageColor((site as any).stage)
                          }}>
                            {getStageLabel((site as any).stage)}
                          </span>
                        </div>
                        <div style={{ 
                          backgroundColor: "rgba(46,204,113,0.2)", 
                          color: "#2ECC71", 
                          padding: "4px 10px", 
                          borderRadius: "6px",
                          fontWeight: "700",
                          fontSize: "15px"
                        }}>
                          {site.viabilityScore}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {hotOpportunities.length > 6 && (
                  <div style={{ padding: "0 16px 16px", textAlign: "center" }}>
                    <button
                      onClick={() => setMinViability(HOT_THRESHOLD)}
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid #FF6B35",
                        color: "#FF6B35",
                        padding: "10px 24px",
                        borderRadius: "8px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      View All {hotOpportunities.length} Hot Opportunities →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Data Table */}
            <div style={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "12px", overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #2A3A4D", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>Site Database</h3>
                <span style={{ color: "#6B7A8C", fontSize: "12px" }}>{filteredSites.length} sites</span>
              </div>
              <div style={{ overflowX: "auto", maxHeight: "300px", overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ backgroundColor: "#162032" }}>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#6B7A8C", textTransform: "uppercase" }}>Project</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#6B7A8C", textTransform: "uppercase" }}>Province</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#6B7A8C", textTransform: "uppercase" }}>Stage</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#6B7A8C", textTransform: "uppercase" }}>Viability</th>
                      <th style={{ padding: "10px 16px", textAlign: "left", fontSize: "11px", fontWeight: "600", color: "#6B7A8C", textTransform: "uppercase" }}>CAPEX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSites.map((site) => {
                      const isSelected = selectedSite?.id === site.id;
                      const stage = 'stage' in site ? site.stage : 'opportunity';
                      const capex = 'estimatedCapex' in site ? site.estimatedCapex : ('infrastructureGapMillions' in site ? (site as MineralDeposit).infrastructureGapMillions : 0);
                      const isHot = site.viabilityScore >= HOT_THRESHOLD;
                      
                      return (
                        <tr
                          key={site.id}
                          onClick={() => setSelectedSite(site)}
                          style={{ 
                            cursor: "pointer", 
                            backgroundColor: isSelected ? "rgba(0, 212, 170, 0.1)" : isHot ? "rgba(255,107,53,0.05)" : "transparent",
                            borderBottom: "1px solid #2A3A4D"
                          }}
                        >
                          <td style={{ padding: "12px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <div style={{ 
                                width: "8px", 
                                height: "8px", 
                                borderRadius: "50%", 
                                backgroundColor: isHot ? "#FF6B35" : categoryConfig[activeCategory].color,
                                boxShadow: isHot ? "0 0 8px #FF6B35" : "none"
                              }} />
                              <span style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>{site.name}</span>
                              {isHot && (
                                <span style={{ 
                                  display: "inline-flex", 
                                  alignItems: "center", 
                                  gap: "3px",
                                  padding: "2px 6px", 
                                  borderRadius: "4px", 
                                  fontSize: "10px", 
                                  fontWeight: "600",
                                  backgroundColor: "rgba(255,107,53,0.2)", 
                                  color: "#FF6B35" 
                                }}>
                                  <Flame size={10} /> HOT
                                </span>
                              )}
                            </div>
                          </td>
                          <td style={{ padding: "12px 16px", color: "#B8C5D3", fontSize: "13px" }}>{site.province}</td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ 
                              padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "500",
                              backgroundColor: `${getStageColor(stage as any)}20`, color: getStageColor(stage as any)
                            }}>
                              {getStageLabel(stage as any)}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px" }}>
                            <span style={{ 
                              padding: "4px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: "600",
                              backgroundColor: `${getScoreColor(site.viabilityScore)}20`, color: getScoreColor(site.viabilityScore)
                            }}>
                              {site.viabilityScore}
                            </span>
                          </td>
                          <td style={{ padding: "12px 16px", color: "#B8C5D3", fontSize: "13px" }}>${capex}M</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Details */}
          <div>
            {selectedSite ? (
              <div style={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "12px", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: "16px", borderBottom: "1px solid #2A3A4D" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: categoryConfig[activeCategory].color }} />
                        <span style={{ 
                          padding: "3px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "500",
                          backgroundColor: `${getStageColor((selectedSite as any).stage || 'opportunity')}20`, 
                          color: getStageColor((selectedSite as any).stage || 'opportunity')
                        }}>
                          {getStageLabel((selectedSite as any).stage || 'opportunity')}
                        </span>
                      </div>
                      <h2 style={{ color: "white", fontSize: "18px", fontWeight: "600", margin: 0 }}>{selectedSite.name}</h2>
                      <p style={{ color: "#6B7A8C", fontSize: "12px", margin: "4px 0 0 0" }}>
                        {(selectedSite as any).region ? `${(selectedSite as any).region}, ` : ""}{getProvinceLabel(selectedSite.province)}
                      </p>
                    </div>
                    <button onClick={() => setSelectedSite(null)} style={{ padding: "6px", borderRadius: "6px", backgroundColor: "#162032", border: "none", cursor: "pointer" }}>
                      <X size={16} style={{ color: "#6B7A8C" }} />
                    </button>
                  </div>

                  {/* Viability Score */}
                  <div style={{ marginTop: "16px", padding: "16px", backgroundColor: "#162032", borderRadius: "10px", display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ position: "relative", width: "64px", height: "64px" }}>
                      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                        <circle
                          cx="50" cy="50" r="40" fill="none"
                          stroke={getScoreColor(selectedSite.viabilityScore)}
                          strokeWidth="8"
                          strokeDasharray={`${(selectedSite.viabilityScore / 100) * 251} 251`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "18px", fontWeight: "700", color: "white" }}>{selectedSite.viabilityScore}</span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6B7A8C" }}>Viability Score</div>
                      <div style={{ fontSize: "15px", fontWeight: "600", color: "white" }}>
                        {selectedSite.viabilityScore >= 80 ? "High" : selectedSite.viabilityScore >= 60 ? "Medium" : "Low"} Viability
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category-specific details */}
                <div style={{ padding: "16px", maxHeight: "400px", overflowY: "auto" }}>
                  {/* Description */}
                  {'description' in selectedSite && (
                    <div style={{ marginBottom: "16px" }}>
                      <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", marginBottom: "8px" }}>Description</h4>
                      <p style={{ fontSize: "13px", color: "#B8C5D3", lineHeight: "1.5", margin: 0 }}>{(selectedSite as any).description}</p>
                    </div>
                  )}

                  {/* Data Center specific */}
                  {activeCategory === "datacenter" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                        <Server size={14} style={{ color: "#00D4AA" }} />
                        Specifications
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Power Capacity</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{(selectedSite as DataCenterSite).powerCapacityMW} MW</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Tier</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{getTierLabel((selectedSite as DataCenterSite).tier)}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Renewable %</div>
                          <div style={{ fontSize: "14px", color: "#2ECC71", fontWeight: "600" }}>{(selectedSite as DataCenterSite).renewableEnergyPercent}%</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Avg PUE</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{(selectedSite as DataCenterSite).averagePUE}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hospital specific */}
                  {activeCategory === "hospital" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                        <Heart size={14} style={{ color: "#E74C3C" }} />
                        Facility Details
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Proposed Beds</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{(selectedSite as HospitalSite).proposedBeds}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Type</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{getHospitalTypeLabel((selectedSite as HospitalSite).hospitalType)}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Target Population</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{((selectedSite as HospitalSite).targetPopulation / 1000).toFixed(0)}K</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Current ER Wait</div>
                          <div style={{ fontSize: "14px", color: "#E74C3C", fontWeight: "600" }}>{(selectedSite as HospitalSite).avgWaitTimeHours}h</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Solar specific */}
                  {activeCategory === "solar" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                        <Sun size={14} style={{ color: "#F1C40F" }} />
                        Solar Specifications
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Capacity</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{(selectedSite as SolarFarmSite).capacityMW} MW</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Technology</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{getSolarTechLabel((selectedSite as SolarFarmSite).technology)}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Annual Output</div>
                          <div style={{ fontSize: "14px", color: "#2ECC71", fontWeight: "600" }}>{(selectedSite as SolarFarmSite).estimatedAnnualGWh} GWh</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>CO₂ Offset</div>
                          <div style={{ fontSize: "14px", color: "#2ECC71", fontWeight: "600" }}>{((selectedSite as SolarFarmSite).carbonOffsetTonnes / 1000).toFixed(0)}K t</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Manufacturing specific */}
                  {activeCategory === "manufacturing" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                        <Factory size={14} style={{ color: "#9B59B6" }} />
                        Facility Details
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Sector</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{getSectorLabel((selectedSite as ManufacturingSite).sector)}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Jobs Created</div>
                          <div style={{ fontSize: "14px", color: "#2ECC71", fontWeight: "600" }}>{(selectedSite as ManufacturingSite).jobsCreated.toLocaleString()}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Output</div>
                          <div style={{ fontSize: "12px", color: "white", fontWeight: "600" }}>{(selectedSite as ManufacturingSite).annualOutputCapacity}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Power Need</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{(selectedSite as ManufacturingSite).powerRequirementMW} MW</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mining specific */}
                  {activeCategory === "mining" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", margin: 0, display: "flex", alignItems: "center", gap: "6px" }}>
                        <Mountain size={14} style={{ color: "#00D4AA" }} />
                        Resource Details
                      </h4>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Mineral Type</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600", textTransform: "capitalize" }}>{(selectedSite as MineralDeposit).mineralType.replace("_", " ")}</div>
                        </div>
                        <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                          <div style={{ fontSize: "10px", color: "#6B7A8C" }}>Stage</div>
                          <div style={{ fontSize: "14px", color: "white", fontWeight: "600" }}>{getMiningStageLabel((selectedSite as MineralDeposit).stage)}</div>
                        </div>
                        {(selectedSite as MineralDeposit).npvMillions && (
                          <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                            <div style={{ fontSize: "10px", color: "#6B7A8C" }}>NPV</div>
                            <div style={{ fontSize: "14px", color: "#2ECC71", fontWeight: "600" }}>${(selectedSite as MineralDeposit).npvMillions}M</div>
                          </div>
                        )}
                        {(selectedSite as MineralDeposit).irrPercent && (
                          <div style={{ padding: "10px", backgroundColor: "#162032", borderRadius: "8px" }}>
                            <div style={{ fontSize: "10px", color: "#6B7A8C" }}>IRR</div>
                            <div style={{ fontSize: "14px", color: "#2ECC71", fontWeight: "600" }}>{(selectedSite as MineralDeposit).irrPercent}%</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Infrastructure Access */}
                  <div style={{ marginTop: "16px" }}>
                    <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Zap size={14} style={{ color: "#F1C40F" }} />
                      Infrastructure Access
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#162032", borderRadius: "6px" }}>
                        <span style={{ fontSize: "12px", color: "#6B7A8C" }}>Power Grid</span>
                        <span style={{ fontSize: "12px", color: "white", fontWeight: "500" }}>{selectedSite.nearestGridKm} km</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 12px", backgroundColor: "#162032", borderRadius: "6px" }}>
                        <span style={{ fontSize: "12px", color: "#6B7A8C" }}>Highway</span>
                        <span style={{ fontSize: "12px", color: "white", fontWeight: "500" }}>{selectedSite.nearestHighwayKm} km</span>
                      </div>
                    </div>
                  </div>

                  {/* Owner */}
                  {(selectedSite as any).owner && (
                    <div style={{ marginTop: "16px" }}>
                      <h4 style={{ fontSize: "12px", color: "#6B7A8C", fontWeight: "500", marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                        <Building2 size={14} style={{ color: "#3498DB" }} />
                        Owner / Developer
                      </h4>
                      <div style={{ padding: "10px 12px", backgroundColor: "#162032", borderRadius: "6px" }}>
                        <span style={{ fontSize: "13px", color: "white" }}>{(selectedSite as any).owner}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "12px", padding: "32px", textAlign: "center" }}>
                <Info size={40} style={{ color: "#3A4A5D", marginBottom: "16px" }} />
                <h3 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>Select a Site</h3>
                <p style={{ color: "#6B7A8C", fontSize: "13px", margin: 0, lineHeight: "1.5" }}>
                  Click on a site marker on the map or select from the table to view detailed information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
