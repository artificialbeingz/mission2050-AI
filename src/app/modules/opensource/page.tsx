"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Cpu,
  Bot,
  MapPin,
  Users,
  DollarSign,
  Activity,
  Shield,
  Zap,
  Server,
  Brain,
  Code,
  ShieldCheck,
  FileText,
  Search,
  TrendingUp,
  Eye,
  Layers,
  ChevronRight,
  X,
  CheckCircle,
  Clock,
  Globe,
  Lock,
} from "lucide-react";

import {
  aiCompanies,
  AICompany,
  AIAgent,
  HardwareCluster,
  DeployedModel,
  DeploymentSite,
  getAgentTypeLabel,
  getAgentTypeColor,
  getHardwareLabel,
  getFrameworkLabel,
  getModelFamilyLabel,
  getStatusColor,
  formatNumber,
  AgentType,
} from "@/data/aiDeployments";

export default function OpenSourcePage() {
  const [selectedCompany, setSelectedCompany] = useState<AICompany | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string>("all");
  const [agentTypeFilter, setAgentTypeFilter] = useState<AgentType | "all">("all");
  const [activeTab, setActiveTab] = useState<"overview" | "hardware" | "models" | "agents" | "sites">("overview");

  // Get unique industries
  const industries = useMemo(() => {
    const set = new Set(aiCompanies.map((c) => c.industry));
    return Array.from(set).sort();
  }, []);

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return aiCompanies.filter((company) => {
      if (searchQuery && !company.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (industryFilter !== "all" && company.industry !== industryFilter) {
        return false;
      }
      if (agentTypeFilter !== "all") {
        const hasAgentType = company.agents.some((a) => a.type === agentTypeFilter);
        if (!hasAgentType) return false;
      }
      return true;
    });
  }, [searchQuery, industryFilter, agentTypeFilter]);

  // Aggregate stats
  const totalStats = useMemo(() => {
    return {
      companies: aiCompanies.length,
      totalGPUs: aiCompanies.reduce((sum, c) => sum + c.totalGPUs, 0),
      totalAgents: aiCompanies.reduce((sum, c) => sum + c.agents.length, 0),
      monthlyInferences: aiCompanies.reduce((sum, c) => sum + c.monthlyInferences, 0),
      totalInvestment: aiCompanies.reduce((sum, c) => sum + c.totalInvestmentMillions, 0),
      annualSavings: aiCompanies.reduce((sum, c) => sum + c.annualAISavingsMillions, 0),
    };
  }, []);

  const getAgentIcon = (type: AgentType) => {
    const icons: Record<AgentType, any> = {
      coding: Code,
      cybersecurity: ShieldCheck,
      data_analysis: TrendingUp,
      customer_service: Users,
      document_processing: FileText,
      research: Search,
      multimodal: Eye,
      orchestrator: Layers,
    };
    return icons[type] || Bot;
  };

  const renderCompanyCard = (company: AICompany) => {
    const isSelected = selectedCompany?.id === company.id;
    
    return (
      <div
        key={company.id}
        onClick={() => setSelectedCompany(company)}
        style={{
          backgroundColor: isSelected ? "rgba(0, 212, 170, 0.1)" : "#1A2738",
          border: `1px solid ${isSelected ? "#00D4AA" : "#2A3A4D"}`,
          borderRadius: "12px",
          padding: "20px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <h3 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{company.name}</h3>
            <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{company.industry}</span>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "12px",
                fontSize: "11px",
                fontWeight: "600",
                backgroundColor: `${getStatusColor(company.status)}20`,
                color: getStatusColor(company.status),
                textTransform: "uppercase",
              }}
            >
              {company.status}
            </span>
            {company.sovereignAIReady && (
              <span
                style={{
                  padding: "4px 10px",
                  borderRadius: "12px",
                  fontSize: "11px",
                  fontWeight: "600",
                  backgroundColor: "rgba(0, 212, 170, 0.2)",
                  color: "#00D4AA",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <Shield size={10} /> Sovereign
              </span>
            )}
          </div>
        </div>

        <p style={{ color: "#8B9CAD", fontSize: "13px", lineHeight: "1.5", marginBottom: "16px" }}>
          {company.description.substring(0, 120)}...
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#00D4AA", fontSize: "18px", fontWeight: "700" }}>{company.totalGPUs}</div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>GPUs</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#3498DB", fontSize: "18px", fontWeight: "700" }}>{company.models.length}</div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Models</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#9B59B6", fontSize: "18px", fontWeight: "700" }}>{company.agents.length}</div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Agents</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#F1C40F", fontSize: "18px", fontWeight: "700" }}>{company.sites.length}</div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Sites</div>
          </div>
        </div>
      </div>
    );
  };

  const renderCompanyDetail = () => {
    if (!selectedCompany) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#6B7A8C" }}>
          <Building2 size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
          <p>Select a company to view details</p>
        </div>
      );
    }

    return (
      <div>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <h2 style={{ color: "white", fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>{selectedCompany.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ color: "#6B7A8C", fontSize: "14px" }}>{selectedCompany.industry}</span>
              <span style={{ color: "#2A3A4D" }}>•</span>
              <span style={{ color: "#6B7A8C", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={14} /> {selectedCompany.headquarters}
              </span>
            </div>
          </div>
          <button onClick={() => setSelectedCompany(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7A8C" }}>
            <X size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "24px", borderBottom: "1px solid #2A3A4D", paddingBottom: "0" }}>
          {(["overview", "hardware", "models", "agents", "sites"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 18px",
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
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div>
            <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
              {selectedCompany.description}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
              <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <Users size={18} style={{ color: "#3498DB" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "13px" }}>Team</span>
                </div>
                <div style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>{selectedCompany.aiTeamSize.toLocaleString()}</div>
                <div style={{ color: "#6B7A8C", fontSize: "12px" }}>AI Engineers</div>
              </div>
              <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <DollarSign size={18} style={{ color: "#2ECC71" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "13px" }}>Investment</span>
                </div>
                <div style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>${selectedCompany.totalInvestmentMillions}M</div>
                <div style={{ color: "#6B7A8C", fontSize: "12px" }}>Total AI Investment</div>
              </div>
              <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <TrendingUp size={18} style={{ color: "#F1C40F" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "13px" }}>Savings</span>
                </div>
                <div style={{ color: "white", fontSize: "20px", fontWeight: "700" }}>${selectedCompany.annualAISavingsMillions}M</div>
                <div style={{ color: "#6B7A8C", fontSize: "12px" }}>Annual AI Savings</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Data Residency</h4>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  {selectedCompany.dataResidency === "canada_only" ? (
                    <Lock size={16} style={{ color: "#00D4AA" }} />
                  ) : (
                    <Globe size={16} style={{ color: "#3498DB" }} />
                  )}
                  <span style={{ color: "#B8C5D3", fontSize: "13px", textTransform: "capitalize" }}>
                    {selectedCompany.dataResidency.replace("_", " ")}
                  </span>
                </div>
              </div>
              <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Performance</h4>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ color: "#2ECC71", fontSize: "16px", fontWeight: "600" }}>{selectedCompany.uptime}%</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Uptime</div>
                  </div>
                  <div>
                    <div style={{ color: "#3498DB", fontSize: "16px", fontWeight: "600" }}>{selectedCompany.avgLatencyMs}ms</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Avg Latency</div>
                  </div>
                  <div>
                    <div style={{ color: "#9B59B6", fontSize: "16px", fontWeight: "600" }}>{formatNumber(selectedCompany.monthlyInferences)}</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Monthly Infer.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hardware" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {selectedCompany.hardware.map((hw) => (
              <div key={hw.id} style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                  <div>
                    <h4 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{hw.name}</h4>
                    <span style={{ color: "#00D4AA", fontSize: "13px", fontWeight: "500" }}>{getHardwareLabel(hw.hardwareType)}</span>
                  </div>
                  <span style={{ padding: "4px 12px", backgroundColor: "rgba(0, 212, 170, 0.15)", color: "#00D4AA", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>
                    {hw.gpuCount} GPUs
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>VRAM Total</div>
                    <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{hw.vramTotalTB} TB</div>
                  </div>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Compute</div>
                    <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{formatNumber(hw.tflopsCapacity)} TFLOPS</div>
                  </div>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Power</div>
                    <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{hw.powerDrawKW} kW</div>
                  </div>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Cooling</div>
                    <div style={{ color: "white", fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>{hw.coolingType}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "models" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {selectedCompany.models.map((model) => (
              <div key={model.id} style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <h4 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{model.name}</h4>
                    <span style={{ color: "#3498DB", fontSize: "13px" }}>{getModelFamilyLabel(model.family)}</span>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <span style={{ padding: "4px 10px", backgroundColor: "rgba(52, 152, 219, 0.15)", color: "#3498DB", borderRadius: "6px", fontSize: "12px" }}>
                      {model.parametersBillions}B params
                    </span>
                    {model.finetuned && (
                      <span style={{ padding: "4px 10px", backgroundColor: "rgba(155, 89, 182, 0.15)", color: "#9B59B6", borderRadius: "6px", fontSize: "12px" }}>
                        Fine-tuned
                      </span>
                    )}
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: model.specialization ? "12px" : "0" }}>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Quantization</div>
                    <div style={{ color: "white", fontSize: "13px" }}>{model.quantization}</div>
                  </div>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Context Length</div>
                    <div style={{ color: "white", fontSize: "13px" }}>{model.contextLength.toLocaleString()} tokens</div>
                  </div>
                  {model.fineTuneDataset && (
                    <div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Training Data</div>
                      <div style={{ color: "white", fontSize: "13px" }}>{model.fineTuneDataset}</div>
                    </div>
                  )}
                </div>
                {model.specialization && (
                  <div style={{ marginTop: "12px", padding: "10px", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "6px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Specialization: </span>
                    <span style={{ color: "#B8C5D3", fontSize: "12px" }}>{model.specialization}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "agents" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {selectedCompany.agents.map((agent) => {
              const AgentIcon = getAgentIcon(agent.type);
              return (
                <div key={agent.id} style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: `${getAgentTypeColor(agent.type)}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <AgentIcon size={20} style={{ color: getAgentTypeColor(agent.type) }} />
                      </div>
                      <div>
                        <h4 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "2px" }}>{agent.name}</h4>
                        <span style={{ color: getAgentTypeColor(agent.type), fontSize: "12px", fontWeight: "500" }}>{getAgentTypeLabel(agent.type)}</span>
                      </div>
                    </div>
                    <span style={{ padding: "4px 10px", backgroundColor: "rgba(241, 196, 15, 0.15)", color: "#F1C40F", borderRadius: "6px", fontSize: "12px" }}>
                      {getFrameworkLabel(agent.framework)}
                    </span>
                  </div>
                  <p style={{ color: "#8B9CAD", fontSize: "13px", marginBottom: "16px" }}>{agent.description}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
                    {agent.useCases.map((uc, i) => (
                      <span key={i} style={{ padding: "4px 10px", backgroundColor: "#0A1628", borderRadius: "4px", color: "#B8C5D3", fontSize: "11px" }}>
                        {uc}
                      </span>
                    ))}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", padding: "12px", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "8px" }}>
                    <div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Model</div>
                      <div style={{ color: "#00D4AA", fontSize: "12px", fontWeight: "500" }}>{agent.modelUsed}</div>
                    </div>
                    <div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Monthly Queries</div>
                      <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{formatNumber(agent.monthlyQueries)}</div>
                    </div>
                    <div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Accuracy</div>
                      <div style={{ color: "#2ECC71", fontSize: "14px", fontWeight: "600" }}>{agent.accuracy}%</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === "sites" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {selectedCompany.sites.map((site) => (
              <div key={site.id} style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <h4 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{site.name}</h4>
                    <span style={{ color: "#6B7A8C", fontSize: "13px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={14} /> {site.city}, {site.province}
                    </span>
                  </div>
                  <span style={{
                    padding: "4px 12px",
                    backgroundColor: site.tier === "primary" ? "rgba(0, 212, 170, 0.15)" : site.tier === "secondary" ? "rgba(52, 152, 219, 0.15)" : "rgba(241, 196, 15, 0.15)",
                    color: site.tier === "primary" ? "#00D4AA" : site.tier === "secondary" ? "#3498DB" : "#F1C40F",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "500",
                    textTransform: "capitalize",
                  }}>
                    {site.tier}
                  </span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>PUE</div>
                    <div style={{ color: site.pue <= 1.2 ? "#2ECC71" : site.pue <= 1.3 ? "#F1C40F" : "#E74C3C", fontSize: "14px", fontWeight: "600" }}>{site.pue}</div>
                  </div>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Renewable</div>
                    <div style={{ color: "#2ECC71", fontSize: "14px", fontWeight: "600" }}>{site.renewablePercent}%</div>
                  </div>
                  <div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Coordinates</div>
                    <div style={{ color: "white", fontSize: "12px" }}>{site.latitude.toFixed(2)}, {site.longitude.toFixed(2)}</div>
                  </div>
                </div>
              </div>
            ))}
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
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "rgba(155, 89, 182, 0.15)", border: "1px solid rgba(155, 89, 182, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Brain size={20} style={{ color: "#9B59B6" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "18px", fontWeight: "600", color: "white", margin: 0 }}>Locally Deployed AI</h1>
                  <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>Locally deployed models across Canadian organizations</p>
                </div>
              </div>
            </div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Image src="/logo.png" alt="Mission 2050" width={100} height={30} style={{ objectFit: "contain" }} />
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: "24px" }}>
        {/* Stats Overview */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Building2 size={20} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Organizations</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{totalStats.companies}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Cpu size={20} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Total GPUs</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{totalStats.totalGPUs.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Bot size={20} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>AI Agents</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{totalStats.totalAgents}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Activity size={20} style={{ color: "#E67E22" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Monthly Inferences</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{formatNumber(totalStats.monthlyInferences)}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <DollarSign size={20} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Total Investment</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>${totalStats.totalInvestment}M</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <TrendingUp size={20} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Annual Savings</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>${totalStats.annualSavings}M</div>
          </div>
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: "#1A2738", padding: "16px 20px", borderRadius: "12px", border: "1px solid #2A3A4D", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Search companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  backgroundColor: "#0A1628",
                  border: "1px solid #2A3A4D",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              style={{
                padding: "10px 14px",
                backgroundColor: "#0A1628",
                border: "1px solid #2A3A4D",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                minWidth: "180px",
              }}
            >
              <option value="all">All Industries</option>
              {industries.map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
            <select
              value={agentTypeFilter}
              onChange={(e) => setAgentTypeFilter(e.target.value as AgentType | "all")}
              style={{
                padding: "10px 14px",
                backgroundColor: "#0A1628",
                border: "1px solid #2A3A4D",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                minWidth: "180px",
              }}
            >
              <option value="all">All Agent Types</option>
              <option value="coding">Coding Assistants</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="data_analysis">Data Analysis</option>
              <option value="customer_service">Customer Service</option>
              <option value="document_processing">Document Processing</option>
              <option value="research">Research & Analysis</option>
              <option value="multimodal">Multimodal</option>
              <option value="orchestrator">Multi-Agent Orchestrator</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "24px" }}>
          {/* Company List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h2 style={{ color: "white", fontSize: "16px", fontWeight: "600", margin: 0 }}>Organizations ({filteredCompanies.length})</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "calc(100vh - 350px)", overflowY: "auto", paddingRight: "8px" }}>
              {filteredCompanies.map(renderCompanyCard)}
            </div>
          </div>

          {/* Company Detail */}
          <div style={{ backgroundColor: "#1A2738", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "24px", height: "fit-content", maxHeight: "calc(100vh - 350px)", overflowY: "auto" }}>
            {renderCompanyDetail()}
          </div>
        </div>
      </div>
    </main>
  );
}
