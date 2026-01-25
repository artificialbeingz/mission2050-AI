"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Wrench,
  Cog,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Building2,
  MapPin,
  Bot,
  Activity,
  Target,
  Factory,
  TrendingUp,
  TrendingDown,
  Gauge,
  BarChart3,
  Thermometer,
  Vibrate,
  Radio,
  Zap,
  DollarSign,
  AlertCircle,
  Timer,
} from "lucide-react";
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
} from "recharts";

import {
  maintenanceCompanies,
  MaintenanceCompany,
  MaintenanceAgent,
  MaintenanceSite,
  Equipment,
  MaintenanceAlert,
  healthTrendData,
  equipmentTypeDistribution,
  maintenanceCostData,
  maintenanceAgentConfig,
  healthStatusConfig,
  alertPriorityConfig,
  predictionAccuracyData,
} from "@/data/predictiveMaintenance";

const COLORS = ["#00D4AA", "#F1C40F", "#3498DB", "#E74C3C", "#9B59B6", "#2ECC71"];

export default function MaintenancePage() {
  const [selectedCompany, setSelectedCompany] = useState<MaintenanceCompany | null>(maintenanceCompanies[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "sites" | "agents" | "predictions">("overview");
  const [selectedSite, setSelectedSite] = useState<MaintenanceSite | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<MaintenanceAgent | null>(null);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

  // Global stats
  const globalStats = useMemo(() => {
    const totalEquipment = maintenanceCompanies.reduce((sum, c) => sum + c.totalEquipment, 0);
    const totalSites = maintenanceCompanies.reduce((sum, c) => sum + c.sites.length, 0);
    const avgHealthScore = Math.round(maintenanceCompanies.reduce((sum, c) => sum + c.avgHealthScore, 0) / maintenanceCompanies.length * 10) / 10;
    const totalSavings = maintenanceCompanies.reduce((sum, c) => sum + c.aiSavingsM, 0);
    const totalAgents = maintenanceCompanies.reduce((sum, c) => sum + c.agents.length, 0);
    const totalAlerts = maintenanceCompanies.reduce((sum, c) => sum + c.alerts.length, 0);
    return { totalEquipment, totalSites, avgHealthScore, totalSavings, totalAgents, totalAlerts };
  }, []);

  const getAgentIcon = (type: string) => {
    const icons: Record<string, React.ElementType> = {
      anomaly_detector: AlertTriangle,
      failure_predictor: Target,
      vibration_analyzer: Vibrate,
      thermal_monitor: Thermometer,
      performance_optimizer: Gauge,
      scheduler: Calendar,
      cost_analyzer: DollarSign,
      parts_optimizer: Cog,
      crew_dispatcher: Activity,
      sensor_fusion: Radio,
    };
    return icons[type] || Bot;
  };

  // Get alerts for a specific site
  const getSiteAlerts = (siteId: string): MaintenanceAlert[] => {
    if (!selectedCompany) return [];
    return selectedCompany.alerts.filter(alert => alert.siteId === siteId);
  };

  const renderCompanyList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {maintenanceCompanies.map((company) => {
        const isSelected = selectedCompany?.id === company.id;
        return (
          <div
            key={company.id}
            onClick={() => {
              setSelectedCompany(company);
              setSelectedSite(null);
              setSelectedAgent(null);
              setSelectedEquipment(null);
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
                backgroundColor: company.avgHealthScore >= 90 ? "rgba(46, 204, 113, 0.15)" : company.avgHealthScore >= 80 ? "rgba(241, 196, 15, 0.15)" : "rgba(231, 76, 60, 0.15)",
                color: company.avgHealthScore >= 90 ? "#2ECC71" : company.avgHealthScore >= 80 ? "#F1C40F" : "#E74C3C",
              }}>
                {company.avgHealthScore}%
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
              <span style={{ color: "#3498DB" }}>{company.sites.length} Sites</span>
              <span style={{ color: "#F1C40F" }}>{company.totalEquipment} Equipment</span>
              <span style={{ color: "#2ECC71" }}>${company.aiSavingsM}M Saved</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderOverview = () => {
    if (!selectedCompany) return null;

    // Prepare pie chart data for maintenance cost types
    const latestMonth = maintenanceCostData[maintenanceCostData.length - 1];
    const maintenanceTypePieData = [
      { name: "Preventive", value: latestMonth.preventive, color: "#3498DB" },
      { name: "Predictive", value: latestMonth.predictive, color: "#00D4AA" },
      { name: "Corrective", value: latestMonth.corrective, color: "#F1C40F" },
      { name: "Emergency", value: latestMonth.emergency, color: "#E74C3C" },
    ];

    return (
      <div>
        <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
          {selectedCompany.description}
        </p>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Total Equipment</div>
            <div style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.totalEquipment}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Avg Health Score</div>
            <div style={{ color: "#2ECC71", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.avgHealthScore}%</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Downtime Reduction</div>
            <div style={{ color: "#F1C40F", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.unplannedDowntimeReduction}%</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Maintenance Budget</div>
            <div style={{ color: "#3498DB", fontSize: "20px", fontWeight: "700" }}>${selectedCompany.maintenanceBudgetM}M</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>AI Savings</div>
            <div style={{ color: "#00D4AA", fontSize: "20px", fontWeight: "700" }}>${selectedCompany.aiSavingsM}M</div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px", marginBottom: "24px" }}>
          {/* Health Trend */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Health Score & Alert Resolution Trend</h4>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={healthTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="month" stroke="#6B7A8C" fontSize={11} />
                <YAxis stroke="#6B7A8C" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                <Legend />
                <Area type="monotone" dataKey="avgHealth" name="Avg Health %" fill="#00D4AA30" stroke="#00D4AA" />
                <Bar dataKey="criticalCount" name="Critical Assets" fill="#E74C3C" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="alertsResolved" name="Alerts Resolved" stroke="#3498DB" strokeWidth={2} dot={{ fill: "#3498DB" }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Maintenance Type Distribution */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Maintenance Cost Distribution</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={maintenanceTypePieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, value }) => `${name} $${value}K`}
                  labelLine={false}
                >
                  {maintenanceTypePieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equipment Type Distribution */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Equipment Health by Type</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={equipmentTypeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
              <XAxis dataKey="type" stroke="#6B7A8C" fontSize={11} />
              <YAxis stroke="#6B7A8C" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="avgHealth" name="Avg Health %" radius={[4, 4, 0, 0]}>
                {equipmentTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
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
            Monitored Sites ({selectedCompany.sites.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedCompany.sites.map((site) => {
              const isSelected = selectedSite?.id === site.id;
              const siteAlerts = getSiteAlerts(site.id);
              const criticalAlerts = siteAlerts.filter(a => a.priority === "critical").length;

              return (
                <div
                  key={site.id}
                  onClick={() => {
                    setSelectedSite(site);
                    setSelectedEquipment(null);
                  }}
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
                    {criticalAlerts > 0 && (
                      <span style={{
                        padding: "3px 8px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: "600",
                        backgroundColor: "rgba(231, 76, 60, 0.15)",
                        color: "#E74C3C",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}>
                        <AlertCircle size={12} />
                        {criticalAlerts} Critical
                      </span>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: "16px", fontSize: "11px" }}>
                    <span style={{ color: "#6B7A8C" }}>Equipment: <span style={{ color: "white" }}>{site.equipment.length}</span></span>
                    <span style={{ color: "#6B7A8C" }}>Health: <span style={{ color: "#2ECC71" }}>{site.avgHealthScore}%</span></span>
                    <span style={{ color: "#6B7A8C" }}>Alerts: <span style={{ color: "#F1C40F" }}>{siteAlerts.length}</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Site Detail / Equipment View */}
        <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
          {selectedSite ? (
            selectedEquipment ? (
              // Equipment Detail View
              <div>
                <button
                  onClick={() => setSelectedEquipment(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#6B7A8C",
                    fontSize: "13px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginBottom: "16px",
                  }}
                >
                  ← Back to Site
                </button>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
                  <div style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "12px",
                    backgroundColor: `${healthStatusConfig[selectedEquipment.healthStatus]?.color || '#6B7A8C'}20`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Cog size={24} style={{ color: healthStatusConfig[selectedEquipment.healthStatus]?.color || '#6B7A8C' }} />
                  </div>
                  <div>
                    <h4 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{selectedEquipment.name}</h4>
                    <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedEquipment.type} • {selectedEquipment.manufacturer}</span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Health Score</div>
                    <div style={{ color: selectedEquipment.healthScore >= 80 ? "#2ECC71" : selectedEquipment.healthScore >= 60 ? "#F1C40F" : "#E74C3C", fontSize: "20px", fontWeight: "700" }}>{selectedEquipment.healthScore}%</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Status</div>
                    <div style={{ color: healthStatusConfig[selectedEquipment.healthStatus]?.color, fontSize: "20px", fontWeight: "700" }}>{healthStatusConfig[selectedEquipment.healthStatus]?.label}</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Install Date</div>
                    <div style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>{selectedEquipment.installDate}</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Last Maintenance</div>
                    <div style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>{selectedEquipment.lastMaintenance}</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Operating Hours</div>
                    <div style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>{selectedEquipment.operatingHours.toLocaleString()}h</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Next Scheduled</div>
                    <div style={{ color: "#3498DB", fontSize: "16px", fontWeight: "600" }}>{selectedEquipment.nextScheduledMaintenance}</div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Performance Metrics</h5>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px", marginBottom: "20px" }}>
                  <div style={{
                    backgroundColor: "#0A1628",
                    padding: "12px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Gauge size={16} style={{ color: "#3498DB" }} />
                      <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Efficiency</span>
                    </div>
                    <span style={{ color: selectedEquipment.efficiency >= 90 ? "#2ECC71" : "#F1C40F", fontSize: "14px", fontWeight: "600" }}>
                      {selectedEquipment.efficiency}%
                    </span>
                  </div>
                  <div style={{
                    backgroundColor: "#0A1628",
                    padding: "12px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Vibrate size={16} style={{ color: "#9B59B6" }} />
                      <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Vibration</span>
                    </div>
                    <span style={{ color: selectedEquipment.vibrationLevel <= 2 ? "#2ECC71" : selectedEquipment.vibrationLevel <= 4 ? "#F1C40F" : "#E74C3C", fontSize: "14px", fontWeight: "600" }}>
                      {selectedEquipment.vibrationLevel} mm/s
                    </span>
                  </div>
                  <div style={{
                    backgroundColor: "#0A1628",
                    padding: "12px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Thermometer size={16} style={{ color: "#E74C3C" }} />
                      <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Temperature</span>
                    </div>
                    <span style={{ color: selectedEquipment.temperature <= 80 ? "#2ECC71" : "#F1C40F", fontSize: "14px", fontWeight: "600" }}>
                      {selectedEquipment.temperature}°C
                    </span>
                  </div>
                  {selectedEquipment.pressure && (
                    <div style={{
                      backgroundColor: "#0A1628",
                      padding: "12px",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <Gauge size={16} style={{ color: "#F1C40F" }} />
                        <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Pressure</span>
                      </div>
                      <span style={{ color: "#2ECC71", fontSize: "14px", fontWeight: "600" }}>
                        {selectedEquipment.pressure} bar
                      </span>
                    </div>
                  )}
                </div>

                {/* Failure Prediction */}
                <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Failure Prediction</h5>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: selectedEquipment.failureProbability >= 50 ? "#E74C3C" : selectedEquipment.failureProbability >= 25 ? "#F1C40F" : "#2ECC71", fontSize: "20px", fontWeight: "700" }}>{selectedEquipment.failureProbability}%</div>
                    <div style={{ color: "#6B7A8C", fontSize: "10px" }}>Failure Probability</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: selectedEquipment.remainingUsefulLife <= 30 ? "#E74C3C" : selectedEquipment.remainingUsefulLife <= 90 ? "#F1C40F" : "#2ECC71", fontSize: "20px", fontWeight: "700" }}>{selectedEquipment.remainingUsefulLife}</div>
                    <div style={{ color: "#6B7A8C", fontSize: "10px" }}>Days Remaining (RUL)</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px", textAlign: "center" }}>
                    <div style={{ color: selectedEquipment.activeAlerts > 0 ? "#E74C3C" : "#2ECC71", fontSize: "20px", fontWeight: "700" }}>{selectedEquipment.activeAlerts}</div>
                    <div style={{ color: "#6B7A8C", fontSize: "10px" }}>Active Alerts</div>
                  </div>
                </div>
              </div>
            ) : (
              // Site Detail View
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

                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ color: "#2ECC71", fontSize: "24px", fontWeight: "700" }}>{selectedSite.avgHealthScore}%</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Avg Health</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ color: "white", fontSize: "24px", fontWeight: "700" }}>{selectedSite.equipment.length}</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Equipment</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ color: "#E74C3C", fontSize: "24px", fontWeight: "700" }}>{selectedSite.criticalEquipment}</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Critical</div>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                    <div style={{ color: "#F1C40F", fontSize: "24px", fontWeight: "700" }}>{getSiteAlerts(selectedSite.id).length}</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Active Alerts</div>
                  </div>
                </div>

                {/* Equipment */}
                <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Equipment (Click to view details)</h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "250px", overflowY: "auto" }}>
                  {selectedSite.equipment.map((equipment) => {
                    const statusCfg = healthStatusConfig[equipment.healthStatus];
                    return (
                      <div
                        key={equipment.id}
                        onClick={() => setSelectedEquipment(equipment)}
                        style={{
                          backgroundColor: "#0A1628",
                          padding: "12px",
                          borderRadius: "8px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid transparent",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            backgroundColor: statusCfg?.color || '#6B7A8C',
                          }} />
                          <div>
                            <div style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>{equipment.name}</div>
                            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>{equipment.type} • {equipment.model}</div>
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div style={{ color: equipment.healthScore >= 80 ? "#2ECC71" : equipment.healthScore >= 60 ? "#F1C40F" : "#E74C3C", fontSize: "14px", fontWeight: "600" }}>{equipment.healthScore}%</div>
                          <div style={{ color: "#6B7A8C", fontSize: "10px" }}>Health</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )
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
              const config = maintenanceAgentConfig[agent.type];

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
                        <span style={{ color: "#6B7A8C" }}>Accuracy: <span style={{ color: "#2ECC71" }}>{agent.predictionAccuracy}%</span></span>
                        <span style={{ color: "#6B7A8C" }}>Monitored: <span style={{ color: "#F1C40F" }}>{agent.equipmentMonitored}</span></span>
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
                  const config = maintenanceAgentConfig[selectedAgent.type];
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
                  <div style={{ color: "#2ECC71", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.predictionAccuracy}%</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Prediction Accuracy</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#E74C3C", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.falsePositiveRate}%</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>False Positive Rate</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#00D4AA", fontSize: "24px", fontWeight: "700" }}>${selectedAgent.costSavingsM}M</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Cost Savings</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#3498DB", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.equipmentMonitored}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Equipment Monitored</div>
                </div>
              </div>

              {/* Model Info */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Model</span>
                  <span style={{ color: "#00D4AA", fontSize: "13px", fontWeight: "500" }}>{selectedAgent.model}</span>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Framework</span>
                  <span style={{ color: "#F1C40F", fontSize: "13px", fontWeight: "500" }}>{selectedAgent.framework}</span>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Lead Time</span>
                  <span style={{ color: "#9B59B6", fontSize: "13px", fontWeight: "500" }}>{selectedAgent.avgLeadTime}</span>
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

  const renderPredictions = () => {
    if (!selectedCompany) return null;

    // Get all alerts sorted by priority
    const allAlerts = [...selectedCompany.alerts];
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    allAlerts.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
          {/* Prediction Accuracy Chart */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Prediction Accuracy by Lead Time</h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={predictionAccuracyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="range" stroke="#6B7A8C" fontSize={11} />
                <YAxis stroke="#6B7A8C" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                <Bar dataKey="accuracy" name="Accuracy %" fill="#00D4AA" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Maintenance Cost Trend */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Maintenance Cost Trend</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={maintenanceCostData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="month" stroke="#6B7A8C" fontSize={11} />
                <YAxis stroke="#6B7A8C" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                <Legend />
                <Area type="monotone" dataKey="predictive" name="Predictive" stackId="1" fill="#00D4AA" stroke="#00D4AA" />
                <Area type="monotone" dataKey="preventive" name="Preventive" stackId="1" fill="#3498DB" stroke="#3498DB" />
                <Area type="monotone" dataKey="corrective" name="Corrective" stackId="1" fill="#F1C40F" stroke="#F1C40F" />
                <Area type="monotone" dataKey="emergency" name="Emergency" stackId="1" fill="#E74C3C" stroke="#E74C3C" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>
          Active Alerts ({allAlerts.length})
        </h4>

        {allAlerts.length === 0 ? (
          <div style={{ backgroundColor: "#162032", padding: "40px", borderRadius: "12px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <CheckCircle size={48} style={{ color: "#2ECC71", marginBottom: "12px" }} />
            <p style={{ color: "#2ECC71", fontSize: "16px", fontWeight: "500" }}>All systems operating normally</p>
            <p style={{ color: "#6B7A8C", fontSize: "13px" }}>No active alerts at this time.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {allAlerts.map((alert) => {
              const priorityCfg = alertPriorityConfig[alert.priority];
              return (
                <div
                  key={alert.id}
                  style={{
                    backgroundColor: "#162032",
                    padding: "20px",
                    borderRadius: "12px",
                    border: `1px solid ${priorityCfg?.color || '#2A3A4D'}40`,
                    borderLeft: `4px solid ${priorityCfg?.color || '#2A3A4D'}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                        <span style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "600",
                          backgroundColor: `${priorityCfg?.color || '#6B7A8C'}20`,
                          color: priorityCfg?.color || '#6B7A8C',
                          textTransform: "uppercase",
                        }}>
                          {alert.priority}
                        </span>
                        <span style={{ color: "#6B7A8C", fontSize: "12px" }}>{alert.siteName}</span>
                        <span style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          backgroundColor: alert.status === "new" ? "rgba(241, 196, 15, 0.15)" : alert.status === "acknowledged" ? "rgba(52, 152, 219, 0.15)" : alert.status === "in_progress" ? "rgba(155, 89, 182, 0.15)" : "rgba(46, 204, 113, 0.15)",
                          color: alert.status === "new" ? "#F1C40F" : alert.status === "acknowledged" ? "#3498DB" : alert.status === "in_progress" ? "#9B59B6" : "#2ECC71",
                        }}>
                          {alert.status.replace('_', ' ')}
                        </span>
                      </div>
                      <h5 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{alert.equipmentName}</h5>
                      <p style={{ color: "#8B9CAD", fontSize: "13px", margin: 0 }}>{alert.message}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#E74C3C", fontSize: "18px", fontWeight: "700" }}>${(alert.estimatedCost / 1000).toFixed(0)}K</div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Potential Cost</div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "24px", marginBottom: "12px", fontSize: "13px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Clock size={14} style={{ color: "#3498DB" }} />
                      <span style={{ color: "#6B7A8C" }}>Detected:</span>
                      <span style={{ color: "white", fontWeight: "500" }}>{new Date(alert.detectedAt).toLocaleDateString()}</span>
                    </div>
                    {alert.predictedFailure && (
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <Timer size={14} style={{ color: "#E74C3C" }} />
                        <span style={{ color: "#6B7A8C" }}>Predicted Failure:</span>
                        <span style={{ color: "#E74C3C", fontWeight: "500" }}>{alert.predictedFailure}</span>
                      </div>
                    )}
                  </div>

                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Recommended Action</div>
                    <div style={{ color: "#00D4AA", fontSize: "13px", fontWeight: "500" }}>{alert.recommendedAction}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

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
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "rgba(230, 126, 34, 0.15)", border: "1px solid rgba(230, 126, 34, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wrench size={20} style={{ color: "#E67E22" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "18px", fontWeight: "600", color: "white", margin: 0 }}>Predictive Maintenance</h1>
                  <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>AI-Powered Asset Health & Failure Prediction</p>
                </div>
              </div>
            </div>
            <Link href="/">
              <Image src="/logo.png" alt="Mission 2050" width={100} height={30} style={{ objectFit: "contain" }} />
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: "24px" }}>
        {/* Global Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Building2 size={18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Companies</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{maintenanceCompanies.length}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Factory size={18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Total Sites</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{globalStats.totalSites}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Cog size={18} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Total Equipment</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{globalStats.totalEquipment.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Activity size={18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Avg Health Score</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: "26px", fontWeight: "700" }}>{globalStats.avgHealthScore}%</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <AlertTriangle size={18} style={{ color: "#E74C3C" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Active Alerts</span>
            </div>
            <div style={{ color: "#E74C3C", fontSize: "26px", fontWeight: "700" }}>{globalStats.totalAlerts}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <DollarSign size={18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>AI Savings</span>
            </div>
            <div style={{ color: "#00D4AA", fontSize: "26px", fontWeight: "700" }}>${globalStats.totalSavings}M</div>
          </div>
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px" }}>
          {/* Company Sidebar */}
          <div>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Companies</h3>
            {renderCompanyList()}
          </div>

          {/* Main Content */}
          <div style={{ backgroundColor: "#1A2738", borderRadius: "12px", border: "1px solid #2A3A4D", overflow: "hidden" }}>
            {/* Company Header */}
            {selectedCompany && (
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #2A3A4D", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h2 style={{ color: "white", fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>{selectedCompany.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedCompany.industry}</span>
                    <span style={{ color: "#2A3A4D" }}>•</span>
                    <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedCompany.headquarters}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Health Score</div>
                    <div style={{ color: selectedCompany.avgHealthScore >= 90 ? "#2ECC71" : selectedCompany.avgHealthScore >= 80 ? "#F1C40F" : "#E74C3C", fontSize: "20px", fontWeight: "700" }}>
                      {selectedCompany.avgHealthScore}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #2A3A4D", padding: "0 24px" }}>
              {(["overview", "sites", "agents", "predictions"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "14px 20px",
                    border: "none",
                    borderBottom: activeTab === tab ? "2px solid #00D4AA" : "2px solid transparent",
                    backgroundColor: "transparent",
                    color: activeTab === tab ? "white" : "#6B7A8C",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                    textTransform: "capitalize",
                  }}
                >
                  {tab === "predictions" ? "Alerts & Predictions" : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: "24px", maxHeight: "calc(100vh - 380px)", overflowY: "auto" }}>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "sites" && renderSites()}
              {activeTab === "agents" && renderAgents()}
              {activeTab === "predictions" && renderPredictions()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
