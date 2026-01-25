"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Leaf,
  Users,
  Shield,
  Building2,
  MapPin,
  Bot,
  Activity,
  Target,
  Factory,
  TrendingUp,
  TrendingDown,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart as PieChartIcon,
  GitBranch,
  Network,
  Award,
  Globe,
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
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

import {
  esgCompanies,
  ESGCompany,
  ESGAgent,
  ESGSite,
  ESGMetric,
  esgScoreTrendData,
  frameworkCoverageData,
  metricDistributionData,
  agentTypeConfig,
  categoryConfig,
  statusConfig,
  ratingConfig,
} from "@/data/esgData";

export default function ESGPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const [selectedCompany, setSelectedCompany] = useState<ESGCompany | null>(esgCompanies[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "sites" | "agents" | "ontology" | "frameworks">("overview");
  const [selectedSite, setSelectedSite] = useState<ESGSite | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<ESGAgent | null>(null);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Global stats
  const globalStats = useMemo(() => {
    const avgESG = Math.round(esgCompanies.reduce((sum, c) => sum + c.overallESGScore, 0) / esgCompanies.length);
    const totalSites = esgCompanies.reduce((sum, c) => sum + c.totalSites, 0);
    const totalEmployees = esgCompanies.reduce((sum, c) => sum + c.totalEmployees, 0);
    const totalAgents = esgCompanies.reduce((sum, c) => sum + c.agents.length, 0);
    const totalFrameworks = new Set(esgCompanies.flatMap(c => c.frameworks.map(f => f.shortName))).size;
    return { avgESG, totalSites, totalEmployees, totalAgents, totalFrameworks };
  }, []);

  const getAgentIcon = (type: string) => {
    const icons: Record<string, React.ElementType> = {
      data_collector: BarChart3,
      report_generator: FileText,
      compliance_checker: Shield,
      risk_analyzer: AlertTriangle,
      benchmark_analyzer: Target,
      ontology_mapper: Network,
      document_parser: FileText,
    };
    return icons[type] || Bot;
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ElementType> = {
      environmental: Leaf,
      social: Users,
      governance: Shield,
    };
    return icons[category] || Activity;
  };

  const renderCompanyList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {esgCompanies.map((company) => {
        const isSelected = selectedCompany?.id === company.id;
        const ratingCfg = ratingConfig[company.esgRating];
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
                backgroundColor: `${ratingCfg?.color || '#6B7A8C'}20`,
                color: ratingCfg?.color || '#6B7A8C',
              }}>
                {company.esgRating}
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <span style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "10px", backgroundColor: "rgba(46, 204, 113, 0.15)", color: "#2ECC71" }}>E: {company.environmentalScore}</span>
              <span style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "10px", backgroundColor: "rgba(52, 152, 219, 0.15)", color: "#3498DB" }}>S: {company.socialScore}</span>
              <span style={{ padding: "2px 6px", borderRadius: "4px", fontSize: "10px", backgroundColor: "rgba(155, 89, 182, 0.15)", color: "#9B59B6" }}>G: {company.governanceScore}</span>
            </div>
            <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
              <span style={{ color: "#6B7A8C" }}>{company.totalSites} Sites</span>
              <span style={{ color: "#6B7A8C" }}>{company.frameworks.length} Frameworks</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderOverview = () => {
    if (!selectedCompany) return null;

    const radarData = [
      { category: "Environmental", score: selectedCompany.environmentalScore, fullMark: 100 },
      { category: "Social", score: selectedCompany.socialScore, fullMark: 100 },
      { category: "Governance", score: selectedCompany.governanceScore, fullMark: 100 },
    ];

    const metricsOnTrack = selectedCompany.metrics.filter(m => m.status === "on-track").length;
    const metricsAtRisk = selectedCompany.metrics.filter(m => m.status === "at-risk").length;
    const metricsOffTrack = selectedCompany.metrics.filter(m => m.status === "off-track").length;

    const statusPieData = [
      { name: "On Track", value: metricsOnTrack, color: "#2ECC71" },
      { name: "At Risk", value: metricsAtRisk, color: "#F1C40F" },
      { name: "Off Track", value: metricsOffTrack, color: "#E74C3C" },
    ].filter(d => d.value > 0);

    return (
      <div>
        <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
          {selectedCompany.description}
        </p>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? "10px" : "16px", marginBottom: isMobile ? "16px" : "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Overall ESG</div>
            <div style={{ color: "#00D4AA", fontSize: isMobile ? "20px" : "24px", fontWeight: "700" }}>{selectedCompany.overallESGScore}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>ESG Rating</div>
            <div style={{ color: ratingConfig[selectedCompany.esgRating]?.color, fontSize: isMobile ? "20px" : "24px", fontWeight: "700" }}>{selectedCompany.esgRating}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Employees</div>
            <div style={{ color: "white", fontSize: isMobile ? "20px" : "24px", fontWeight: "700" }}>{selectedCompany.totalEmployees.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Carbon Neutral</div>
            <div style={{ color: "#2ECC71", fontSize: isMobile ? "20px" : "24px", fontWeight: "700" }}>{selectedCompany.carbonNeutralTarget}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D", gridColumn: isMobile ? "span 2" : "auto" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Frameworks</div>
            <div style={{ color: "#3498DB", fontSize: isMobile ? "20px" : "24px", fontWeight: "700" }}>{selectedCompany.frameworks.length}</div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? "16px" : "20px", marginBottom: isMobile ? "16px" : "24px" }}>
          {/* ESG Radar */}
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "14px" : "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: isMobile ? "13px" : "14px", fontWeight: "600", marginBottom: "16px" }}>ESG Score Breakdown</h4>
            <ResponsiveContainer width="100%" height={isMobile ? 180 : 200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#2A3A4D" />
                <PolarAngleAxis dataKey="category" stroke="#6B7A8C" fontSize={isMobile ? 10 : 11} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#2A3A4D" fontSize={isMobile ? 9 : 10} />
                <Radar name="Score" dataKey="score" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.5} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* ESG Score Trend */}
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "14px" : "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: isMobile ? "13px" : "14px", fontWeight: "600", marginBottom: "16px" }}>Score Trend (6 Months)</h4>
            <ResponsiveContainer width="100%" height={isMobile ? 180 : 200}>
              <LineChart data={esgScoreTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="month" stroke="#6B7A8C" fontSize={isMobile ? 10 : 11} />
                <YAxis domain={[60, 100]} stroke="#6B7A8C" fontSize={isMobile ? 10 : 11} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="environmental" name="E" stroke="#2ECC71" strokeWidth={2} dot={{ fill: "#2ECC71" }} />
                <Line type="monotone" dataKey="social" name="S" stroke="#3498DB" strokeWidth={2} dot={{ fill: "#3498DB" }} />
                <Line type="monotone" dataKey="governance" name="G" stroke="#9B59B6" strokeWidth={2} dot={{ fill: "#9B59B6" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Metrics Status */}
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "14px" : "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: isMobile ? "13px" : "14px", fontWeight: "600", marginBottom: "16px" }}>Metrics Status</h4>
            <ResponsiveContainer width="100%" height={isMobile ? 180 : 200}>
              <PieChart>
                <Pie
                  data={statusPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {statusPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Metrics Table */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Key ESG Metrics</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
            {["environmental", "social", "governance"].map((category) => {
              const categoryMetrics = selectedCompany.metrics.filter(m => m.category === category);
              const catCfg = categoryConfig[category];
              const Icon = getCategoryIcon(category);
              return (
                <div key={category}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Icon size={16} style={{ color: catCfg.color }} />
                    <span style={{ color: catCfg.color, fontSize: "13px", fontWeight: "600", textTransform: "capitalize" }}>{category}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {categoryMetrics.map((metric, i) => {
                      const statCfg = statusConfig[metric.status];
                      return (
                        <div key={i} style={{ backgroundColor: "#0A1628", padding: "10px", borderRadius: "8px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ color: "#B8C5D3", fontSize: "12px" }}>{metric.name}</span>
                            <span style={{ color: statCfg.color, fontSize: "11px", fontWeight: "500" }}>{statCfg.label}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                            <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>{metric.value}</span>
                            <span style={{ color: "#6B7A8C", fontSize: "11px" }}>{metric.unit}</span>
                            <span style={{ color: "#6B7A8C", fontSize: "10px", marginLeft: "auto" }}>Target: {metric.target}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderSites = () => {
    if (!selectedCompany) return null;

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px" }}>
        {/* Site List */}
        <div>
          <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>
            Sites ({selectedCompany.sites.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedCompany.sites.map((site) => {
              const isSelected = selectedSite?.id === site.id;

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
                        {site.location}, {site.province}
                      </div>
                    </div>
                    <span style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "600",
                      backgroundColor: site.overallESGScore >= 85 ? "rgba(46, 204, 113, 0.15)" : site.overallESGScore >= 75 ? "rgba(241, 196, 15, 0.15)" : "rgba(231, 76, 60, 0.15)",
                      color: site.overallESGScore >= 85 ? "#2ECC71" : site.overallESGScore >= 75 ? "#F1C40F" : "#E74C3C",
                    }}>
                      {site.overallESGScore}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "8px", fontSize: "10px" }}>
                    <span style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(46, 204, 113, 0.15)", color: "#2ECC71" }}>E: {site.environmentalScore}</span>
                    <span style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(52, 152, 219, 0.15)", color: "#3498DB" }}>S: {site.socialScore}</span>
                    <span style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(155, 89, 182, 0.15)", color: "#9B59B6" }}>G: {site.governanceScore}</span>
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
                  <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedSite.type} • {selectedSite.location}, {selectedSite.province}</span>
                </div>
              </div>

              {/* ESG Scores */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#00D4AA", fontSize: "24px", fontWeight: "700" }}>{selectedSite.overallESGScore}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Overall ESG</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#2ECC71", fontSize: "24px", fontWeight: "700" }}>{selectedSite.environmentalScore}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Environmental</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#3498DB", fontSize: "24px", fontWeight: "700" }}>{selectedSite.socialScore}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Social</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#9B59B6", fontSize: "24px", fontWeight: "700" }}>{selectedSite.governanceScore}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Governance</div>
                </div>
              </div>

              {/* Site Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Carbon Footprint</div>
                  <div style={{ color: "white", fontSize: "18px", fontWeight: "700" }}>{selectedSite.carbonFootprint.toLocaleString()} t CO₂</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Water Usage</div>
                  <div style={{ color: "#3498DB", fontSize: "18px", fontWeight: "700" }}>{selectedSite.waterUsage} ML</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Waste Recycled</div>
                  <div style={{ color: "#2ECC71", fontSize: "18px", fontWeight: "700" }}>{selectedSite.wasteRecycled}%</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Employees</div>
                  <div style={{ color: "white", fontSize: "18px", fontWeight: "700" }}>{selectedSite.employeeCount}</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Diversity</div>
                  <div style={{ color: "#F1C40F", fontSize: "18px", fontWeight: "700" }}>{selectedSite.diversityPercent}%</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Safety Incidents</div>
                  <div style={{ color: selectedSite.safetyIncidents === 0 ? "#2ECC71" : "#E74C3C", fontSize: "18px", fontWeight: "700" }}>{selectedSite.safetyIncidents}</div>
                </div>
              </div>

              {/* Last Assessment */}
              <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Clock size={16} style={{ color: "#F1C40F" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Last Assessment</span>
                </div>
                <div style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>{selectedSite.lastAssessment}</div>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px" }}>
        {/* Agent List */}
        <div>
          <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>
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
                        <span style={{ color: "#6B7A8C" }}>Docs: <span style={{ color: "#F1C40F" }}>{agent.documentsProcessed.toLocaleString()}</span></span>
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
                  <div style={{ color: "#F1C40F", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.documentsProcessed.toLocaleString()}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Documents Processed</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center", gridColumn: "span 2" }}>
                  <div style={{ color: "#00D4AA", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.reportsGenerated}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Reports Generated</div>
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

  const renderOntology = () => {
    if (!selectedCompany) return null;

    // Create SVG-based ontology visualization
    const nodes = selectedCompany.ontologyNodes;
    const links = selectedCompany.ontologyLinks;

    // Position calculation
    const getNodePosition = (node: typeof nodes[0], index: number): { x: number; y: number } => {
      if (node.level === 0) {
        // Root level nodes (E, S, G) positioned in a row
        const rootNodes = nodes.filter(n => n.level === 0);
        const rootIndex = rootNodes.findIndex(n => n.id === node.id);
        return { x: 150 + rootIndex * 280, y: 80 };
      } else {
        // Level 1 nodes - find parent and position below
        const parentLink = links.find(l => l.target === node.id && l.relationship === "includes");
        if (parentLink) {
          const parentNode = nodes.find(n => n.id === parentLink.source);
          const siblings = links.filter(l => l.source === parentLink.source && l.relationship === "includes").map(l => l.target);
          const siblingIndex = siblings.indexOf(node.id);
          const parentPos = parentNode ? getNodePosition(parentNode, 0) : { x: 400, y: 80 };
          const offset = (siblingIndex - (siblings.length - 1) / 2) * 120;
          return { x: parentPos.x + offset, y: 200 };
        }
        return { x: 150 + index * 80, y: 200 };
      }
    };

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>ESG Ontology Graph</h4>
          <div style={{ display: "flex", gap: "12px" }}>
            {Object.entries(categoryConfig).filter(([k]) => ["environmental", "social", "governance"].includes(k)).map(([key, cfg]) => (
              <div key={key} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: cfg.color }} />
                <span style={{ color: "#6B7A8C", fontSize: "11px" }}>{cfg.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Ontology Graph */}
        <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px", marginBottom: "24px" }}>
          <svg width="100%" height="320" viewBox="0 0 800 300">
            {/* Draw links first */}
            {links.map((link, i) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              if (!sourceNode || !targetNode) return null;
              const sourcePos = getNodePosition(sourceNode, nodes.indexOf(sourceNode));
              const targetPos = getNodePosition(targetNode, nodes.indexOf(targetNode));
              const isIncludesLink = link.relationship === "includes";
              return (
                <g key={i}>
                  <line
                    x1={sourcePos.x}
                    y1={sourcePos.y + 20}
                    x2={targetPos.x}
                    y2={targetPos.y - 20}
                    stroke={isIncludesLink ? "#3A4A5D" : "#F1C40F40"}
                    strokeWidth={isIncludesLink ? 2 : 1}
                    strokeDasharray={isIncludesLink ? "0" : "4"}
                  />
                  {!isIncludesLink && (
                    <text
                      x={(sourcePos.x + targetPos.x) / 2}
                      y={(sourcePos.y + targetPos.y) / 2}
                      fill="#6B7A8C"
                      fontSize="9"
                      textAnchor="middle"
                    >
                      {link.relationship}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Draw nodes */}
            {nodes.map((node, i) => {
              const pos = getNodePosition(node, i);
              const cfg = categoryConfig[node.category];
              const isRoot = node.level === 0;
              return (
                <g key={node.id}>
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r={isRoot ? 35 : 25}
                    fill={`${cfg?.color || '#6B7A8C'}30`}
                    stroke={cfg?.color || '#6B7A8C'}
                    strokeWidth={2}
                  />
                  <text
                    x={pos.x}
                    y={pos.y + (isRoot ? 4 : 3)}
                    fill="white"
                    fontSize={isRoot ? 12 : 10}
                    fontWeight={isRoot ? 600 : 400}
                    textAnchor="middle"
                  >
                    {node.label.length > 12 ? node.label.substring(0, 10) + "..." : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Ontology Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <div style={{ color: "white", fontSize: "24px", fontWeight: "700" }}>{nodes.length}</div>
            <div style={{ color: "#6B7A8C", fontSize: "12px" }}>Ontology Nodes</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <div style={{ color: "#00D4AA", fontSize: "24px", fontWeight: "700" }}>{links.length}</div>
            <div style={{ color: "#6B7A8C", fontSize: "12px" }}>Relationships</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <div style={{ color: "#3498DB", fontSize: "24px", fontWeight: "700" }}>{links.filter(l => l.relationship === "includes").length}</div>
            <div style={{ color: "#6B7A8C", fontSize: "12px" }}>Hierarchical Links</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <div style={{ color: "#F1C40F", fontSize: "24px", fontWeight: "700" }}>{links.filter(l => l.relationship !== "includes").length}</div>
            <div style={{ color: "#6B7A8C", fontSize: "12px" }}>Cross-Domain Links</div>
          </div>
        </div>

        {/* Relationship Details */}
        <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Ontology Relationships</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
            {links.map((link, i) => {
              const sourceNode = nodes.find(n => n.id === link.source);
              const targetNode = nodes.find(n => n.id === link.target);
              return (
                <div key={i} style={{
                  backgroundColor: "#0A1628",
                  padding: "12px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}>
                  <span style={{ color: categoryConfig[sourceNode?.category || "environmental"]?.color, fontSize: "12px", fontWeight: "500" }}>
                    {sourceNode?.label}
                  </span>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", padding: "2px 6px", backgroundColor: "#1A2738", borderRadius: "4px" }}>
                    {link.relationship}
                  </span>
                  <span style={{ color: categoryConfig[targetNode?.category || "environmental"]?.color, fontSize: "12px", fontWeight: "500" }}>
                    {targetNode?.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderFrameworks = () => {
    if (!selectedCompany) return null;

    return (
      <div>
        <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "20px" }}>
          ESG Frameworks ({selectedCompany.frameworks.length})
        </h4>

        {/* Framework Coverage Chart */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D", marginBottom: "24px" }}>
          <h5 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Framework Coverage</h5>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={selectedCompany.frameworks.map(f => ({ name: f.shortName, coverage: f.coverage, target: 100 }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
              <XAxis dataKey="name" stroke="#6B7A8C" fontSize={11} />
              <YAxis domain={[0, 100]} stroke="#6B7A8C" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              <Bar dataKey="coverage" name="Coverage %" fill="#00D4AA" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Framework Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {selectedCompany.frameworks.map((framework) => {
            const statusColor = framework.status === "compliant" ? "#2ECC71" : framework.status === "partial" ? "#F1C40F" : "#E74C3C";
            return (
              <div
                key={framework.id}
                style={{
                  backgroundColor: "#162032",
                  borderRadius: "12px",
                  border: "1px solid #2A3A4D",
                  padding: "20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h5 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{framework.shortName}</h5>
                    <p style={{ color: "#6B7A8C", fontSize: "12px", margin: 0 }}>{framework.name}</p>
                  </div>
                  <span style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    fontWeight: "600",
                    backgroundColor: `${statusColor}20`,
                    color: statusColor,
                    textTransform: "capitalize",
                  }}>
                    {framework.status}
                  </span>
                </div>

                {/* Coverage Bar */}
                <div style={{ marginBottom: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "11px" }}>Coverage</span>
                    <span style={{ color: "#00D4AA", fontSize: "12px", fontWeight: "600" }}>{framework.coverage}%</span>
                  </div>
                  <div style={{ height: "8px", backgroundColor: "#0A1628", borderRadius: "4px", overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${framework.coverage}%`,
                      backgroundColor: "#00D4AA",
                      borderRadius: "4px",
                    }} />
                  </div>
                </div>

                {/* Audit Info */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div style={{ backgroundColor: "#0A1628", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "10px", marginBottom: "2px" }}>Last Audit</div>
                    <div style={{ color: "white", fontSize: "12px", fontWeight: "500" }}>{framework.lastAudit}</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "10px", borderRadius: "8px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "10px", marginBottom: "2px" }}>Next Audit</div>
                    <div style={{ color: "#F1C40F", fontSize: "12px", fontWeight: "500" }}>{framework.nextAudit}</div>
                  </div>
                </div>
              </div>
            );
          })}
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
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "10px" : "16px" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#B8C5D3", textDecoration: "none" }}>
                <ArrowLeft size={isMobile ? 16 : 18} />
                {!isMobile && <span style={{ fontSize: "14px" }}>Back</span>}
              </Link>
              {!isMobile && <div style={{ width: "1px", height: "24px", backgroundColor: "#2A3A4D" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px" }}>
                <div style={{ width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", borderRadius: "12px", backgroundColor: "rgba(46, 204, 113, 0.15)", border: "1px solid rgba(46, 204, 113, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Leaf size={isMobile ? 16 : 20} style={{ color: "#2ECC71" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: isMobile ? "14px" : "18px", fontWeight: "600", color: "white", margin: 0 }}>
                    {isMobile ? "ESG Reporting" : "ESG Ontology & Reporting"}
                  </h1>
                  {!isMobile && <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>Unified ESG Framework Management</p>}
                </div>
              </div>
            </div>
            {!isMobile && (
              <Link href="/">
                <Image src="/logo.png" alt="Mission 2050" width={100} height={30} style={{ objectFit: "contain" }} />
              </Link>
            )}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: isMobile ? "12px" : "24px" }}>
        {/* Global Stats */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(5, 1fr)", 
          gap: isMobile ? "10px" : "16px", 
          marginBottom: isMobile ? "16px" : "24px" 
        }}>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "14px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isMobile ? "8px" : "10px" }}>
              <Building2 size={isMobile ? 16 : 18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "12px" }}>Companies</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "22px" : "26px", fontWeight: "700" }}>{esgCompanies.length}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "14px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isMobile ? "8px" : "10px" }}>
              <Award size={isMobile ? 16 : 18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "12px" }}>Avg ESG</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: isMobile ? "22px" : "26px", fontWeight: "700" }}>{globalStats.avgESG}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "14px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isMobile ? "8px" : "10px" }}>
              <Factory size={isMobile ? 16 : 18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "12px" }}>Sites</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "22px" : "26px", fontWeight: "700" }}>{globalStats.totalSites}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "14px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isMobile ? "8px" : "10px" }}>
              <Globe size={isMobile ? 16 : 18} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "12px" }}>Frameworks</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "22px" : "26px", fontWeight: "700" }}>{globalStats.totalFrameworks}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "14px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D", gridColumn: isMobile ? "span 2" : "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: isMobile ? "8px" : "10px" }}>
              <Bot size={isMobile ? 16 : 18} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "12px" }}>AI Agents</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "22px" : "26px", fontWeight: "700" }}>{globalStats.totalAgents}</div>
          </div>
        </div>

        {/* Mobile Company Selector */}
        {isMobile && (
          <div style={{ marginBottom: "16px" }}>
            <select
              value={selectedCompany?.id || ""}
              onChange={(e) => {
                const company = esgCompanies.find(c => c.id === e.target.value);
                setSelectedCompany(company || null);
                setSelectedSite(null);
                setSelectedAgent(null);
              }}
              style={{
                width: "100%",
                padding: "14px",
                backgroundColor: "#1A2738",
                border: "1px solid #00D4AA",
                borderRadius: "10px",
                color: "white",
                fontSize: "14px",
                outline: "none",
              }}
            >
              {esgCompanies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name} - Rating: {company.esgRating}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : isTablet ? "1fr" : "280px 1fr", gap: isMobile ? "16px" : "24px" }}>
          {/* Company Sidebar - Desktop/Tablet only */}
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
              <div style={{ 
                padding: isMobile ? "14px" : "20px 24px", 
                borderBottom: "1px solid #2A3A4D", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: isMobile ? "flex-start" : "center",
                flexDirection: isMobile ? "column" : "row",
                gap: isMobile ? "12px" : "0",
              }}>
                <div>
                  <h2 style={{ color: "white", fontSize: isMobile ? "16px" : "20px", fontWeight: "700", marginBottom: "4px" }}>{selectedCompany.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                    <span style={{ color: "#6B7A8C", fontSize: isMobile ? "12px" : "13px" }}>{selectedCompany.industry}</span>
                    <span style={{ color: "#2A3A4D" }}>•</span>
                    <span style={{ color: "#6B7A8C", fontSize: isMobile ? "12px" : "13px" }}>{selectedCompany.headquarters}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: isMobile ? "left" : "right" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>ESG Rating</div>
                    <div style={{ color: ratingConfig[selectedCompany.esgRating]?.color, fontSize: isMobile ? "20px" : "24px", fontWeight: "700" }}>
                      {selectedCompany.esgRating}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{ 
              display: "flex", 
              borderBottom: "1px solid #2A3A4D", 
              padding: isMobile ? "0 12px" : "0 24px",
              overflowX: isMobile ? "auto" : "visible",
              WebkitOverflowScrolling: "touch",
            }}>
              {(["overview", "sites", "agents", "ontology", "frameworks"] as const).map((tab) => (
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
                    flexShrink: 0,
                  }}
                >
                  {isMobile ? (tab === "ontology" ? "Ontology" : tab) : (tab === "ontology" ? "Ontology Graph" : tab)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: isMobile ? "16px" : "24px", maxHeight: isMobile ? "none" : "calc(100vh - 380px)", overflowY: isMobile ? "visible" : "auto" }}>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "sites" && renderSites()}
              {activeTab === "agents" && renderAgents()}
              {activeTab === "ontology" && renderOntology()}
              {activeTab === "frameworks" && renderFrameworks()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
