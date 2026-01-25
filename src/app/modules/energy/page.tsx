"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Zap,
  Battery,
  Sun,
  Wind,
  Droplets,
  Flame,
  Atom,
  Building2,
  MapPin,
  Bot,
  Activity,
  Target,
  Factory,
  TrendingUp,
  Gauge,
  BarChart3,
  Clock,
  Leaf,
  ThermometerSun,
  Mountain,
  Scale,
  DollarSign,
  AlertTriangle,
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
  energyCompanies,
  EnergyCompany,
  EnergyAgent,
  PowerPlant,
  gridLoadData,
  energyMixData,
  priceData,
  monthlyGenerationData,
  energyAgentConfig,
  energySourceConfig,
  gridStatusConfig,
} from "@/data/energyManagement";

const COLORS = ["#00D4AA", "#F1C40F", "#3498DB", "#E74C3C", "#9B59B6", "#2ECC71"];

export default function EnergyPage() {
  const [selectedCompany, setSelectedCompany] = useState<EnergyCompany | null>(energyCompanies[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "plants" | "agents" | "market">("overview");
  const [selectedPlant, setSelectedPlant] = useState<PowerPlant | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<EnergyAgent | null>(null);

  // Global stats
  const globalStats = useMemo(() => {
    const totalCapacity = energyCompanies.reduce((sum, c) => sum + c.totalCapacityMW, 0);
    const totalPlants = energyCompanies.reduce((sum, c) => sum + c.plants.length, 0);
    const avgRenewable = Math.round(energyCompanies.reduce((sum, c) => sum + c.renewablePercent, 0) / energyCompanies.length);
    const totalAgents = energyCompanies.reduce((sum, c) => sum + c.agents.length, 0);
    const totalSavings = energyCompanies.reduce((sum, c) => sum + c.agents.reduce((s, a) => s + a.savingsGeneratedCAD, 0), 0);
    return { totalCapacity, totalPlants, avgRenewable, totalAgents, totalSavings };
  }, []);

  const getAgentIcon = (type: string) => {
    const icons: Record<string, React.ElementType> = {
      demand_forecast: TrendingUp,
      grid_optimizer: Zap,
      renewable_predictor: Sun,
      storage_manager: Battery,
      price_forecaster: DollarSign,
      outage_predictor: AlertTriangle,
      load_balancer: Scale,
    };
    return icons[type] || Bot;
  };

  const getEnergySourceIcon = (source: string) => {
    const icons: Record<string, React.ElementType> = {
      hydro: Droplets,
      solar: Sun,
      wind: Wind,
      natural_gas: Flame,
      nuclear: Atom,
      coal: Mountain,
      biomass: Leaf,
      geothermal: ThermometerSun,
    };
    return icons[source] || Zap;
  };

  const renderCompanyList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {energyCompanies.map((company) => {
        const isSelected = selectedCompany?.id === company.id;
        return (
          <div
            key={company.id}
            onClick={() => {
              setSelectedCompany(company);
              setSelectedPlant(null);
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
                <span style={{ color: "#6B7A8C", fontSize: "11px" }}>{company.type}</span>
              </div>
              <span style={{
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "700",
                backgroundColor: company.renewablePercent >= 80 ? "rgba(46, 204, 113, 0.15)" : company.renewablePercent >= 50 ? "rgba(241, 196, 15, 0.15)" : "rgba(231, 76, 60, 0.15)",
                color: company.renewablePercent >= 80 ? "#2ECC71" : company.renewablePercent >= 50 ? "#F1C40F" : "#E74C3C",
              }}>
                {company.renewablePercent}% Green
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
              <span style={{ color: "#3498DB" }}>{company.plants.length} Plants</span>
              <span style={{ color: "#2ECC71" }}>{company.totalCapacityMW.toLocaleString()} MW</span>
              <span style={{ color: "#F1C40F" }}>{company.avgGridReliability}% Reliable</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderOverview = () => {
    if (!selectedCompany) return null;

    return (
      <div>
        <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
          {selectedCompany.description}
        </p>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Total Capacity</div>
            <div style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.totalCapacityMW.toLocaleString()} MW</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Renewable Energy</div>
            <div style={{ color: "#2ECC71", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.renewablePercent}%</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Grid Reliability</div>
            <div style={{ color: "#F1C40F", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.avgGridReliability}%</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Peak Demand</div>
            <div style={{ color: "#3498DB", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.peakDemandMW.toLocaleString()} MW</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "6px" }}>Annual Revenue</div>
            <div style={{ color: "#00D4AA", fontSize: "20px", fontWeight: "700" }}>${selectedCompany.annualRevenueB}B</div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "20px", marginBottom: "24px" }}>
          {/* Grid Load Chart */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>24-Hour Grid Load (MW)</h4>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={gridLoadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="time" stroke="#6B7A8C" fontSize={11} />
                <YAxis stroke="#6B7A8C" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                <Legend />
                <Area type="monotone" dataKey="demand" name="Demand" fill="#3498DB" fillOpacity={0.3} stroke="#3498DB" strokeWidth={2} />
                <Area type="monotone" dataKey="renewable" name="Renewable" fill="#2ECC71" fillOpacity={0.3} stroke="#2ECC71" strokeWidth={2} />
                <Line type="monotone" dataKey="supply" name="Supply" stroke="#F1C40F" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Energy Mix Pie Chart */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Energy Mix by Generation</h4>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={energyMixData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="generation"
                  label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {energyMixData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Price Forecast */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Electricity Price ($/MWh)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
              <XAxis dataKey="hour" stroke="#6B7A8C" fontSize={11} />
              <YAxis stroke="#6B7A8C" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              <Legend />
              <Area type="monotone" dataKey="price" name="Actual Price" fill="#00D4AA" fillOpacity={0.3} stroke="#00D4AA" strokeWidth={2} />
              <Area type="monotone" dataKey="forecast" name="AI Forecast" fill="#F1C40F" fillOpacity={0.2} stroke="#F1C40F" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderPlants = () => {
    if (!selectedCompany) return null;

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "20px" }}>
        {/* Plant List */}
        <div>
          <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>
            Power Plants ({selectedCompany.plants.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedCompany.plants.map((plant) => {
              const isSelected = selectedPlant?.id === plant.id;
              const sourceConfig = energySourceConfig[plant.type];
              const Icon = getEnergySourceIcon(plant.type);
              const statusConfig = gridStatusConfig[plant.status];

              return (
                <div
                  key={plant.id}
                  onClick={() => setSelectedPlant(plant)}
                  style={{
                    backgroundColor: isSelected ? "rgba(0, 212, 170, 0.1)" : "#162032",
                    border: `1px solid ${isSelected ? "#00D4AA" : "#2A3A4D"}`,
                    borderRadius: "10px",
                    padding: "16px",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "8px",
                        backgroundColor: `${sourceConfig?.color || '#6B7A8C'}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <Icon size={18} style={{ color: sourceConfig?.color || '#6B7A8C' }} />
                      </div>
                      <div>
                        <h5 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>{plant.name}</h5>
                        <span style={{ color: sourceConfig?.color || '#6B7A8C', fontSize: "11px" }}>{sourceConfig?.label}</span>
                      </div>
                    </div>
                    <span style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      fontWeight: "600",
                      backgroundColor: `${statusConfig?.color}20`,
                      color: statusConfig?.color,
                    }}>
                      {statusConfig?.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "16px", fontSize: "11px" }}>
                    <span style={{ color: "#6B7A8C" }}>Output: <span style={{ color: "white" }}>{plant.currentOutputMW} MW</span></span>
                    <span style={{ color: "#6B7A8C" }}>Capacity: <span style={{ color: "#3498DB" }}>{plant.capacityMW} MW</span></span>
                    <span style={{ color: "#6B7A8C" }}>Uptime: <span style={{ color: "#2ECC71" }}>{plant.uptime}%</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Plant Detail */}
        <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
          {selectedPlant ? (
            <div>
              {(() => {
                const sourceConfig = energySourceConfig[selectedPlant.type];
                const Icon = getEnergySourceIcon(selectedPlant.type);
                const statusConfig = gridStatusConfig[selectedPlant.status];
                
                return (
                  <>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "20px" }}>
                      <div style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "12px",
                        backgroundColor: `${sourceConfig?.color || '#6B7A8C'}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <Icon size={24} style={{ color: sourceConfig?.color || '#6B7A8C' }} />
                      </div>
                      <div>
                        <h4 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{selectedPlant.name}</h4>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: sourceConfig?.color || '#6B7A8C', fontSize: "13px" }}>{sourceConfig?.label}</span>
                          <span style={{ color: "#2A3A4D" }}>•</span>
                          <span style={{
                            padding: "2px 8px",
                            borderRadius: "4px",
                            fontSize: "11px",
                            backgroundColor: `${statusConfig?.color}20`,
                            color: statusConfig?.color,
                          }}>
                            {statusConfig?.label}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6B7A8C", fontSize: "13px", marginBottom: "20px" }}>
                      <MapPin size={14} />
                      {selectedPlant.location}, {selectedPlant.province}
                    </div>

                    {/* Plant Metrics Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                      <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                        <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Current Output</div>
                        <div style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>{selectedPlant.currentOutputMW} MW</div>
                      </div>
                      <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                        <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Max Capacity</div>
                        <div style={{ color: "#3498DB", fontSize: "20px", fontWeight: "700" }}>{selectedPlant.capacityMW} MW</div>
                      </div>
                      <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                        <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Capacity Factor</div>
                        <div style={{ color: "#F1C40F", fontSize: "20px", fontWeight: "700" }}>{selectedPlant.capacityFactor}%</div>
                      </div>
                      <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                        <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Efficiency</div>
                        <div style={{ color: "#2ECC71", fontSize: "20px", fontWeight: "700" }}>{selectedPlant.efficiency}%</div>
                      </div>
                      <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                        <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Carbon Intensity</div>
                        <div style={{ color: selectedPlant.carbonIntensity <= 10 ? "#2ECC71" : "#F1C40F", fontSize: "20px", fontWeight: "700" }}>{selectedPlant.carbonIntensity} g/kWh</div>
                      </div>
                      <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px" }}>
                        <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Uptime</div>
                        <div style={{ color: "#00D4AA", fontSize: "20px", fontWeight: "700" }}>{selectedPlant.uptime}%</div>
                      </div>
                    </div>

                    {/* Last Maintenance */}
                    <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", marginBottom: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                        <Clock size={16} style={{ color: "#F1C40F" }} />
                        <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Last Maintenance</span>
                      </div>
                      <div style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>{selectedPlant.lastMaintenance}</div>
                    </div>

                    {/* Assigned Agents */}
                    <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Assigned AI Agents</h5>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {selectedPlant.assignedAgents.map((agentId, i) => {
                        const agent = selectedCompany.agents.find(a => a.id === agentId);
                        if (!agent) return null;
                        const config = energyAgentConfig[agent.type];
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
                  </>
                );
              })()}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "400px", color: "#6B7A8C" }}>
              <Zap size={40} style={{ marginBottom: "12px", opacity: 0.5 }} />
              <p>Select a plant to view details</p>
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
              const config = energyAgentConfig[agent.type];

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
                        <span style={{ color: "#6B7A8C" }}>Plants: <span style={{ color: "#F1C40F" }}>{agent.plantsManaged}</span></span>
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
                  const config = energyAgentConfig[selectedAgent.type];
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
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Prediction Accuracy</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#F1C40F", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.plantsManaged}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Plants Managed</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#00D4AA", fontSize: "24px", fontWeight: "700" }}>${selectedAgent.savingsGeneratedCAD}M</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Savings Generated</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#3498DB", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.decisionsPerHour}/hr</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Decisions Made</div>
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

  const renderMarket = () => {
    if (!selectedCompany) return null;

    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        {/* Monthly Generation */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Monthly Generation by Source (GWh)</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlyGenerationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
              <XAxis dataKey="month" stroke="#6B7A8C" fontSize={11} />
              <YAxis stroke="#6B7A8C" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="hydro" name="Hydro" stackId="a" fill="#3498DB" />
              <Bar dataKey="nuclear" name="Nuclear" stackId="a" fill="#9B59B6" />
              <Bar dataKey="gas" name="Natural Gas" stackId="a" fill="#E67E22" />
              <Bar dataKey="wind" name="Wind" stackId="a" fill="#1ABC9C" />
              <Bar dataKey="solar" name="Solar" stackId="a" fill="#F1C40F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Energy Mix Capacity vs Generation */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Capacity vs Generation (MW)</h4>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={energyMixData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
              <XAxis type="number" stroke="#6B7A8C" fontSize={11} />
              <YAxis type="category" dataKey="source" stroke="#6B7A8C" fontSize={10} width={80} />
              <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              <Legend />
              <Bar dataKey="capacity" name="Capacity" fill="#3498DB" />
              <Bar dataKey="generation" name="Generation" fill="#2ECC71" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Storage Overview */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D", gridColumn: "span 2" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Energy Storage Assets</h4>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "16px" }}>
            {selectedCompany.storage.map((storage) => {
              const chargePercent = Math.round((storage.currentChargeMWh / storage.capacityMWh) * 100);
              const statusConfig = gridStatusConfig[storage.status];
              return (
                <div key={storage.id} style={{ backgroundColor: "#0A1628", padding: "16px", borderRadius: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <div>
                      <h5 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "4px" }}>{storage.name}</h5>
                      <span style={{ color: "#6B7A8C", fontSize: "11px" }}>{storage.type.replace('_', ' ')}</span>
                    </div>
                    <span style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "10px",
                      backgroundColor: `${statusConfig?.color}20`,
                      color: statusConfig?.color,
                    }}>
                      {statusConfig?.label}
                    </span>
                  </div>
                  <div style={{ marginBottom: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <span style={{ color: "#6B7A8C", fontSize: "11px" }}>Charge Level</span>
                      <span style={{ color: "white", fontSize: "11px" }}>{chargePercent}%</span>
                    </div>
                    <div style={{ backgroundColor: "#2A3A4D", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
                      <div style={{
                        width: `${chargePercent}%`,
                        height: "100%",
                        backgroundColor: chargePercent > 70 ? "#2ECC71" : chargePercent > 30 ? "#F1C40F" : "#E74C3C",
                        borderRadius: "4px",
                      }} />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "11px" }}>
                    <div>
                      <span style={{ color: "#6B7A8C" }}>Capacity: </span>
                      <span style={{ color: "white" }}>{storage.capacityMWh.toLocaleString()} MWh</span>
                    </div>
                    <div>
                      <span style={{ color: "#6B7A8C" }}>Efficiency: </span>
                      <span style={{ color: "#2ECC71" }}>{storage.efficiency}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
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
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "rgba(52, 152, 219, 0.15)", border: "1px solid rgba(52, 152, 219, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={20} style={{ color: "#3498DB" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "18px", fontWeight: "600", color: "white", margin: 0 }}>Energy & Resource Management</h1>
                  <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>Grid Operations & Renewable Integration</p>
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
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Building2 size={18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Companies</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{energyCompanies.length}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Factory size={18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Power Plants</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{globalStats.totalPlants}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Zap size={18} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Total Capacity</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{(globalStats.totalCapacity / 1000).toFixed(1)}k MW</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Leaf size={18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Avg Renewable</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: "26px", fontWeight: "700" }}>{globalStats.avgRenewable}%</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Target size={18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>AI Savings</span>
            </div>
            <div style={{ color: "#00D4AA", fontSize: "26px", fontWeight: "700" }}>${globalStats.totalSavings}M</div>
          </div>
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: "24px" }}>
          {/* Company Sidebar */}
          <div>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Energy Companies</h3>
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
                    <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedCompany.type}</span>
                    <span style={{ color: "#2A3A4D" }}>•</span>
                    <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedCompany.headquarters}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Renewable %</div>
                    <div style={{ color: selectedCompany.renewablePercent >= 80 ? "#2ECC71" : selectedCompany.renewablePercent >= 50 ? "#F1C40F" : "#E74C3C", fontSize: "20px", fontWeight: "700" }}>
                      {selectedCompany.renewablePercent}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid #2A3A4D", padding: "0 24px" }}>
              {(["overview", "plants", "agents", "market"] as const).map((tab) => (
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
                  {tab === "plants" ? "Power Plants" : tab === "market" ? "Market & Storage" : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: "24px", maxHeight: "calc(100vh - 380px)", overflowY: "auto" }}>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "plants" && renderPlants()}
              {activeTab === "agents" && renderAgents()}
              {activeTab === "market" && renderMarket()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
