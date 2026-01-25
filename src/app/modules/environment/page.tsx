"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Wind,
  Droplets,
  Leaf,
  Trash2,
  Calculator,
  Shield,
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Building2,
  MapPin,
  Bot,
  Activity,
  Target,
  Factory,
  CheckCircle,
  Clock,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import {
  environmentCompanies,
  EnvironmentCompany,
  EnvironmentAgent,
  EnvironmentSite,
  emissionTrendData,
  monthlyEmissionsData,
  impactCategoryData,
  agentTypeConfig,
  statusConfig,
} from "@/data/environmentImpact";

export default function EnvironmentPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const [selectedCompany, setSelectedCompany] = useState<EnvironmentCompany | null>(environmentCompanies[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "sites" | "agents" | "map">("overview");
  const [selectedSite, setSelectedSite] = useState<EnvironmentSite | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<EnvironmentAgent | null>(null);
  const [showMobileCompanyList, setShowMobileCompanyList] = useState(false);

  // Global stats
  const globalStats = useMemo(() => {
    const totalEmissions = environmentCompanies.reduce((sum, c) => sum + c.totalEmissions, 0);
    const totalSites = environmentCompanies.reduce((sum, c) => sum + c.totalSites, 0);
    const avgESG = Math.round(environmentCompanies.reduce((sum, c) => sum + c.esgScore, 0) / environmentCompanies.length);
    const avgRenewable = Math.round(environmentCompanies.reduce((sum, c) => sum + c.renewablePercent, 0) / environmentCompanies.length);
    const totalAgents = environmentCompanies.reduce((sum, c) => sum + c.agents.length, 0);
    return { totalEmissions, totalSites, avgESG, avgRenewable, totalAgents };
  }, []);

  const getAgentIcon = (type: string) => {
    const icons: Record<string, React.ElementType> = {
      emissions_monitor: Wind,
      water_quality: Droplets,
      biodiversity: Leaf,
      waste_tracker: Trash2,
      carbon_calculator: Calculator,
      compliance_checker: Shield,
      predictive_alert: AlertTriangle,
    };
    return icons[type] || Bot;
  };

  const renderCompanyList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {environmentCompanies.map((company) => {
        const isSelected = selectedCompany?.id === company.id;
        return (
          <div
            key={company.id}
            onClick={() => {
              setSelectedCompany(company);
              setSelectedSite(null);
              setSelectedAgent(null);
            }}
            style={{
              backgroundColor: isSelected ? "rgba(0, 212, 170, 0.1)" : "#1A2738",
              border: `1px solid ${isSelected ? "#00D4AA" : "#2A3A4D"}`,
              borderRadius: "10px",
              padding: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div>
                <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>{company.name}</h3>
                <span style={{ color: "#6B7A8C", fontSize: "11px" }}>{company.industry}</span>
              </div>
              <span style={{
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "700",
                backgroundColor: company.esgScore >= 80 ? "rgba(46, 204, 113, 0.15)" : company.esgScore >= 60 ? "rgba(241, 196, 15, 0.15)" : "rgba(231, 76, 60, 0.15)",
                color: company.esgScore >= 80 ? "#2ECC71" : company.esgScore >= 60 ? "#F1C40F" : "#E74C3C",
              }}>
                ESG: {company.esgScore}
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
              <span style={{ color: "#3498DB" }}>{company.totalSites} Sites</span>
              <span style={{ color: company.emissionsTrend <= 0 ? "#2ECC71" : "#E74C3C" }}>
                {company.emissionsTrend <= 0 ? "↓" : "↑"} {Math.abs(company.emissionsTrend)}% YoY
              </span>
              <span style={{ color: "#F1C40F" }}>{company.renewablePercent}% Renewable</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderOverview = () => {
    if (!selectedCompany) return null;

    const radarData = impactCategoryData.map(item => ({
      category: item.category.split(' ')[0],
      score: item.score,
      target: item.target,
      fullMark: 100,
    }));

    return (
      <div>
        <p style={{ color: "#B8C5D3", fontSize: isMobile ? "12px" : "14px", lineHeight: "1.7", marginBottom: isMobile ? "16px" : "24px" }}>
          {selectedCompany.description}
        </p>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? "10px" : "16px", marginBottom: isMobile ? "16px" : "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Annual Emissions</div>
            <div style={{ color: "white", fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>{(selectedCompany.totalEmissions / 1000000).toFixed(1)}M t</div>
            <div style={{ color: selectedCompany.emissionsTrend <= 0 ? "#2ECC71" : "#E74C3C", fontSize: isMobile ? "10px" : "12px", display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
              {selectedCompany.emissionsTrend <= 0 ? <TrendingDown size={isMobile ? 12 : 14} /> : <TrendingUp size={isMobile ? 12 : 14} />}
              {Math.abs(selectedCompany.emissionsTrend)}% YoY
            </div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Renewable Energy</div>
            <div style={{ color: "#2ECC71", fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>{selectedCompany.renewablePercent}%</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>ESG Score</div>
            <div style={{ color: "#F1C40F", fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>{selectedCompany.esgScore}/100</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Compliance Score</div>
            <div style={{ color: "#3498DB", fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>{selectedCompany.avgComplianceScore}%</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D", display: isMobile ? "none" : "block" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Carbon Neutral</div>
            <div style={{ color: "#9B59B6", fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>{selectedCompany.carbonNeutralTarget}</div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr", gap: isMobile ? "16px" : "20px", marginBottom: isMobile ? "16px" : "24px" }}>
          {/* Emission Trend */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Emission Reduction Trend (tonnes CO₂)</h4>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={emissionTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="year" stroke="#6B7A8C" fontSize={11} />
                <YAxis stroke="#6B7A8C" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                <Legend />
                <Area type="monotone" dataKey="actual" name="Actual" fill="#00D4AA" fillOpacity={0.3} stroke="#00D4AA" strokeWidth={2} />
                <Line type="monotone" dataKey="target" name="Target" stroke="#E74C3C" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Impact Radar */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Environmental Impact Score</h4>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2A3A4D" />
                <PolarAngleAxis dataKey="category" stroke="#6B7A8C" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#2A3A4D" fontSize={10} />
                <Radar name="Score" dataKey="score" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.5} />
                <Radar name="Target" dataKey="target" stroke="#F1C40F" fill="#F1C40F" fillOpacity={0.2} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Emissions */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Monthly Emissions by Type (tonnes)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyEmissionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
              <XAxis dataKey="month" stroke="#6B7A8C" fontSize={11} />
              <YAxis stroke="#6B7A8C" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="co2" name="CO₂" fill="#3498DB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="methane" name="Methane" fill="#E67E22" radius={[4, 4, 0, 0]} />
              <Bar dataKey="nox" name="NOx" fill="#9B59B6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderSites = () => {
    if (!selectedCompany) return null;

    return (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: isMobile ? "16px" : "20px" }}>
        {/* Site List */}
        <div>
          <h4 style={{ color: "white", fontSize: isMobile ? "14px" : "15px", fontWeight: "600", marginBottom: isMobile ? "12px" : "16px" }}>
            Monitored Sites ({selectedCompany.sites.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedCompany.sites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              const statusCfg = statusConfig[site.status];

              return (
                <div
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  style={{
                    backgroundColor: isSelected ? "rgba(0, 212, 170, 0.1)" : "#162032",
                    border: `1px solid ${isSelected ? "#00D4AA" : "#2A3A4D"}`,
                    borderRadius: "10px",
                    padding: "16px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div>
                      <h5 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>{site.name}</h5>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6B7A8C", fontSize: "11px" }}>
                        <MapPin size={12} />
                        {site.location}
                      </div>
                    </div>
                    <span style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "600",
                      backgroundColor: `${statusCfg.color}20`,
                      color: statusCfg.color,
                    }}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", fontSize: "11px" }}>
                    <span style={{ color: "#6B7A8C" }}>CO₂: <span style={{ color: "white" }}>{(site.annualCO2Tonnes / 1000).toFixed(0)}k t</span></span>
                    <span style={{ color: "#6B7A8C" }}>Renewable: <span style={{ color: "#2ECC71" }}>{site.renewableEnergyPercent}%</span></span>
                    <span style={{ color: "#6B7A8C" }}>Compliance: <span style={{ color: "#3498DB" }}>{site.complianceScore}%</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Site Detail */}
        <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
          {selectedSite ? (
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundColor: "rgba(0, 212, 170, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Factory size={24} style={{ color: "#00D4AA" }} />
                </div>
                <div>
                  <h4 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{selectedSite.name}</h4>
                  <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedSite.location}, {selectedSite.province}</span>
                </div>
              </div>

              {/* Site Metrics Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Annual CO₂ Emissions</div>
                  <div style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>{(selectedSite.annualCO2Tonnes / 1000).toFixed(0)}k t</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Carbon Intensity</div>
                  <div style={{ color: "#E67E22", fontSize: "20px", fontWeight: "700" }}>{selectedSite.carbonIntensity} kg/unit</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Renewable Energy</div>
                  <div style={{ color: "#2ECC71", fontSize: "20px", fontWeight: "700" }}>{selectedSite.renewableEnergyPercent}%</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Water Usage</div>
                  <div style={{ color: "#3498DB", fontSize: "20px", fontWeight: "700" }}>{(selectedSite.waterUsageML / 1000).toFixed(1)}k ML</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Waste Recycled</div>
                  <div style={{ color: "#9B59B6", fontSize: "20px", fontWeight: "700" }}>{selectedSite.wasteRecycledPercent}%</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Compliance Score</div>
                  <div style={{ color: "#00D4AA", fontSize: "20px", fontWeight: "700" }}>{selectedSite.complianceScore}%</div>
                </div>
              </div>

              {/* Last Inspection */}
              <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Clock size={16} style={{ color: "#F1C40F" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Last Inspection</span>
                </div>
                <div style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>{selectedSite.lastInspection}</div>
              </div>

              {/* Assigned Agents */}
              <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Assigned AI Agents</h5>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedSite.assignedAgents.map((agentId, i) => {
                  const agent = selectedCompany.agents.find(a => a.id === agentId);
                  if (!agent) return null;
                  const config = agentTypeConfig[agent.type];
                  return (
                    <span key={i} style={{
                      padding: "6px 12px",
                      backgroundColor: `${config?.color || '#6B7A8C'}20`,
                      borderRadius: "6px",
                      color: config?.color || '#6B7A8C',
                      fontSize: "12px",
                      fontWeight: "500",
                    }}>
                      {agent.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "400px", color: "#6B7A8C" }}>
              <Factory size={40} style={{ marginBottom: "12px", opacity: 0.5 }} />
              <p>Select a site to view details</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAgents = () => {
    if (!selectedCompany) return null;

    return (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: isMobile ? "16px" : "20px" }}>
        {/* Agent List */}
        <div>
          <h4 style={{ color: "white", fontSize: isMobile ? "14px" : "15px", fontWeight: "600", marginBottom: isMobile ? "12px" : "16px" }}>
            AI Agents ({selectedCompany.agents.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedCompany.agents.map((agent) => {
              const Icon = getAgentIcon(agent.type);
              const isSelected = selectedAgent?.id === agent.id;
              const config = agentTypeConfig[agent.type];

              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  style={{
                    backgroundColor: isSelected ? `${config?.color || '#00D4AA'}15` : "#162032",
                    border: `1px solid ${isSelected ? (config?.color || '#00D4AA') : "#2A3A4D"}`,
                    borderRadius: "10px",
                    padding: "16px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: `${config?.color || '#6B7A8C'}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={20} style={{ color: config?.color || '#6B7A8C' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                        <h5 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>{agent.name}</h5>
                        <span style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: "500",
                          backgroundColor: agent.status === "active" ? "rgba(46, 204, 113, 0.15)" : "rgba(241, 196, 15, 0.15)",
                          color: agent.status === "active" ? "#2ECC71" : "#F1C40F",
                        }}>
                          {agent.status}
                        </span>
                      </div>
                      <span style={{ color: config?.color || '#6B7A8C', fontSize: "11px", fontWeight: "500" }}>{config?.label}</span>
                      <div style={{ display: "flex", gap: "12px", marginTop: "8px", fontSize: "11px" }}>
                        <span style={{ color: "#6B7A8C" }}>Accuracy: <span style={{ color: "#2ECC71" }}>{agent.accuracyRate}%</span></span>
                        <span style={{ color: "#6B7A8C" }}>Alerts: <span style={{ color: "#F1C40F" }}>{agent.alertsGenerated}</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Detail */}
        <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
          {selectedAgent ? (
            <div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
                {(() => {
                  const Icon = getAgentIcon(selectedAgent.type);
                  const config = agentTypeConfig[selectedAgent.type];
                  return (
                    <>
                      <div style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "12px",
                        backgroundColor: `${config?.color || '#6B7A8C'}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <Icon size={24} style={{ color: config?.color || '#6B7A8C' }} />
                      </div>
                      <div>
                        <h4 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{selectedAgent.name}</h4>
                        <span style={{ color: config?.color || '#6B7A8C', fontSize: "13px", fontWeight: "500" }}>{config?.label}</span>
                      </div>
                    </>
                  );
                })()}
              </div>

              <p style={{ color: "#8B9CAD", fontSize: "13px", lineHeight: "1.6", marginBottom: "20px" }}>{selectedAgent.description}</p>

              {/* Performance Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#2ECC71", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.accuracyRate}%</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Accuracy Rate</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#F1C40F", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.alertsGenerated}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Alerts Generated</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#3498DB", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.sitesMonitored}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Sites Monitored</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#00D4AA", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.responseTime}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Response Time</div>
                </div>
              </div>

              {/* Model Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Model</span>
                  <span style={{ color: "#00D4AA", fontSize: "13px", fontWeight: "500" }}>{selectedAgent.model}</span>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Framework</span>
                  <span style={{ color: "#F1C40F", fontSize: "13px", fontWeight: "500" }}>{selectedAgent.framework}</span>
                </div>
              </div>

              {/* Capabilities */}
              <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "10px" }}>Capabilities</h5>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {selectedAgent.capabilities.map((cap, i) => (
                  <span key={i} style={{ padding: "5px 10px", backgroundColor: "#0A1628", borderRadius: "6px", color: "#B8C5D3", fontSize: "11px" }}>
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "400px", color: "#6B7A8C" }}>
              <Bot size={40} style={{ marginBottom: "12px", opacity: 0.5 }} />
              <p>Select an agent to view details</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderMap = () => {
    if (!selectedCompany) return null;

    return (
      <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
        <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "20px" }}>Site Locations</h4>
        
        {/* Map Placeholder with Site Cards */}
        <div style={{ 
          position: "relative",
          height: "400px",
          backgroundColor: "#0A1628",
          borderRadius: "12px",
          backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 400\"%3E%3Crect fill=\"%230A1628\" width=\"800\" height=\"400\"/%3E%3Cpath d=\"M200 100 Q300 50 400 100 T600 100\" stroke=\"%231A2738\" fill=\"none\" stroke-width=\"2\"/%3E%3Cpath d=\"M100 200 Q200 150 300 200 T500 200 T700 200\" stroke=\"%231A2738\" fill=\"none\" stroke-width=\"2\"/%3E%3Cpath d=\"M150 300 Q250 250 350 300 T550 300\" stroke=\"%231A2738\" fill=\"none\" stroke-width=\"2\"/%3E%3C/svg%3E')",
          backgroundSize: "cover",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "flex-start",
          gap: "12px",
          padding: "20px",
          overflow: "auto",
        }}>
          {selectedCompany.sites.map((site) => {
            const statusCfg = statusConfig[site.status];
            return (
              <div
                key={site.id}
                onClick={() => setSelectedSite(site)}
                style={{
                  backgroundColor: "rgba(26, 39, 56, 0.95)",
                  border: `1px solid ${selectedSite?.id === site.id ? '#00D4AA' : '#2A3A4D'}`,
                  borderRadius: "10px",
                  padding: "14px",
                  width: "220px",
                  cursor: "pointer",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <div style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: statusCfg.color,
                    boxShadow: `0 0 8px ${statusCfg.color}`,
                  }} />
                  <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>{site.name}</span>
                </div>
                <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin size={12} />
                  {site.location}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                  <span style={{ color: "#6B7A8C" }}>CO₂: <span style={{ color: "white" }}>{(site.annualCO2Tonnes / 1000).toFixed(0)}k</span></span>
                  <span style={{ color: statusCfg.color }}>{statusCfg.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", gap: "20px", marginTop: "16px", justifyContent: "center" }}>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: cfg.color }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>{cfg.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0A1628" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "#0A1628", borderBottom: "1px solid #2A3A4D" }}>
        <div style={{ maxWidth: "1800px", margin: "0 auto", padding: isMobile ? "10px 12px" : "12px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#B8C5D3", textDecoration: "none" }}>
                <ArrowLeft size={18} />
                {!isMobile && <span style={{ fontSize: "14px" }}>Back</span>}
              </Link>
              {!isMobile && <div style={{ width: "1px", height: "24px", backgroundColor: "#2A3A4D" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px" }}>
                <div style={{ width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", borderRadius: "12px", backgroundColor: "rgba(46, 204, 113, 0.15)", border: "1px solid rgba(46, 204, 113, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Leaf size={isMobile ? 16 : 20} style={{ color: "#2ECC71" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: isMobile ? "14px" : "18px", fontWeight: "600", color: "white", margin: 0 }}>
                    {isMobile ? "Environment" : "AI Environment Impact"}
                  </h1>
                  {!isMobile && <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>Emissions Monitoring & ESG Tracking</p>}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isMobile && (
                <button
                  onClick={() => setShowMobileCompanyList(!showMobileCompanyList)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: showMobileCompanyList ? "#2ECC71" : "#162032",
                    border: "1px solid #2A3A4D",
                    color: showMobileCompanyList ? "#0A1628" : "#B8C5D3",
                    cursor: "pointer"
                  }}
                >
                  {showMobileCompanyList ? <X size={18} /> : <Menu size={18} />}
                </button>
              )}
              {!isMobile && (
                <Link href="/">
                  <Image src="/logo.png" alt="Mission 2050" width={100} height={30} style={{ objectFit: "contain" }} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Company Selector */}
      {isMobile && showMobileCompanyList && (
        <div style={{
          position: "fixed",
          top: "60px",
          left: 0,
          right: 0,
          backgroundColor: "#1A2738",
          borderBottom: "1px solid #2A3A4D",
          padding: "12px",
          zIndex: 40,
          maxHeight: "60vh",
          overflowY: "auto"
        }}>
          <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Companies</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {environmentCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => {
                  setSelectedCompany(company);
                  setSelectedSite(null);
                  setSelectedAgent(null);
                  setShowMobileCompanyList(false);
                }}
                style={{
                  backgroundColor: selectedCompany?.id === company.id ? "rgba(46, 204, 113, 0.1)" : "#162032",
                  border: `1px solid ${selectedCompany?.id === company.id ? "#2ECC71" : "#2A3A4D"}`,
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>{company.name}</span>
                  <span style={{ color: "#2ECC71", fontSize: "14px", fontWeight: "700" }}>
                    {company.esgScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: isMobile ? "12px" : "24px" }}>
        {/* Global Stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? "8px" : "16px", marginBottom: isMobile ? "16px" : "24px" }}>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Building2 size={isMobile ? 14 : 18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Companies</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{environmentCompanies.length}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Factory size={isMobile ? 14 : 18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Total Sites</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.totalSites}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Wind size={isMobile ? 14 : 18} style={{ color: "#E74C3C" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Total Emissions</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{(globalStats.totalEmissions / 1000000).toFixed(1)}M t</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D", display: isMobile ? "none" : "block" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Target size={isMobile ? 14 : 18} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Avg ESG Score</span>
            </div>
            <div style={{ color: "#F1C40F", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.avgESG}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D", display: isMobile ? "none" : "block" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Bot size={isMobile ? 14 : 18} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>AI Agents</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.totalAgents}</div>
          </div>
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "280px 1fr", gap: isMobile ? "16px" : "24px" }}>
          {/* Company Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div>
              <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Companies</h3>
              {renderCompanyList()}
            </div>
          )}

          {/* Main Content */}
          <div style={{ backgroundColor: "#1A2738", borderRadius: "12px", border: "1px solid #2A3A4D", overflow: "hidden" }}>
            {/* Company Header */}
            {selectedCompany && (
              <div style={{ padding: isMobile ? "12px 16px" : "20px 24px", borderBottom: "1px solid #2A3A4D", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap", gap: isMobile ? "12px" : "0" }}>
                <div>
                  <h2 style={{ color: "white", fontSize: isMobile ? "16px" : "20px", fontWeight: "700", marginBottom: "4px" }}>{selectedCompany.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px", flexWrap: "wrap" }}>
                    <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "13px" }}>{selectedCompany.industry}</span>
                    {!isMobile && <span style={{ color: "#2A3A4D" }}>•</span>}
                    {!isMobile && <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedCompany.headquarters}</span>}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px" }}>ESG Score</div>
                    <div style={{ color: selectedCompany.esgScore >= 80 ? "#2ECC71" : selectedCompany.esgScore >= 60 ? "#F1C40F" : "#E74C3C", fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>
                      {selectedCompany.esgScore}/100
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #2A3A4D", padding: isMobile ? "0 8px" : "0 24px", overflowX: "auto" }}>
              {(["overview", "sites", "agents", "map"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: isMobile ? "10px 12px" : "14px 20px",
                    border: "none",
                    borderBottom: activeTab === tab ? "2px solid #00D4AA" : "2px solid transparent",
                    backgroundColor: "transparent",
                    color: activeTab === tab ? "white" : "#6B7A8C",
                    fontSize: isMobile ? "12px" : "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab === "map" ? (isMobile ? "Map" : "Site Map") : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: isMobile ? "12px" : "24px", maxHeight: isMobile ? "none" : "calc(100vh - 380px)", overflowY: "auto" }}>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "sites" && renderSites()}
              {activeTab === "agents" && renderAgents()}
              {activeTab === "map" && renderMap()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
