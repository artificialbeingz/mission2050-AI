"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Building2,
  Bot,
  Shield,
  AlertTriangle,
  Clock,
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  Eye,
  ChevronRight,
  ChevronDown,
  Zap,
  BarChart3,
  Workflow,
  Bell,
  RefreshCw,
  LucideIcon,
  Menu,
  X,
  ShieldCheck,
  Scale,
  Settings,
  Target,
  Lock,
  CheckCircle,
  TrendingDown,
  Minus,
  AlertCircle,
} from "lucide-react";
import { useIsMobile, useIsTablet } from "@/hooks/useMediaQuery";

import {
  complianceCompanies,
  regulatoryFrameworks,
  ComplianceCompany,
  ComplianceAgent,
  DownstreamProcess,
  getAgentTypeLabel,
  getAgentTypeColor,
  getProcessTypeLabel,
  getProcessTypeColor,
  getStatusLabel,
  getStatusColor,
  AgentType,
} from "@/data/regulatoryCompliance";

import {
  getRiskProfile,
  riskCategoryConfig,
  riskStatusConfig,
  getScoreColor,
  getScoreLabel,
  getHeatMapCellColor,
  severityConfig,
  likelihoodConfig,
  RiskCategory,
  CompanyRiskProfile,
  Risk,
  RiskSeverity,
  RiskLikelihood,
} from "@/data/riskManagement";

export default function RegulatoryPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [selectedCompany, setSelectedCompany] = useState<ComplianceCompany | null>(complianceCompanies[0]);
  const [activeTab, setActiveTab] = useState<"risks" | "agents" | "processes" | "frameworks" | "summary">("risks");
  const [selectedAgent, setSelectedAgent] = useState<ComplianceAgent | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<DownstreamProcess | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<string | null>(null);
  const [showMobileCompanyList, setShowMobileCompanyList] = useState(false);
  const [hoveredCell, setHoveredCell] = useState<{ likelihood: RiskLikelihood; severity: RiskSeverity; category: RiskCategory } | null>(null);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<RiskCategory | null>(null);
  const [viewMode, setViewMode] = useState<"view1" | "view2">("view1");
  const [hoveredKriId, setHoveredKriId] = useState<string | null>(null);

  // Global stats
  const globalStats = useMemo(() => {
    return {
      totalCompanies: complianceCompanies.length,
      totalAgents: complianceCompanies.reduce((sum, c) => sum + c.agents.length, 0),
      totalProcesses: complianceCompanies.reduce((sum, c) => sum + c.processes.length, 0),
      avgComplianceScore: Math.round(complianceCompanies.reduce((sum, c) => sum + c.overallComplianceScore, 0) / complianceCompanies.length),
      avgAutomation: Math.round(complianceCompanies.reduce((sum, c) => sum + c.automationRate, 0) / complianceCompanies.length),
      totalDocuments: complianceCompanies.reduce((sum, c) => sum + c.monthlyDocumentsProcessed, 0),
    };
  }, []);

  const getAgentIcon = (type: AgentType): LucideIcon => {
    const icons: Record<AgentType, LucideIcon> = {
      document_analyzer: FileText,
      policy_monitor: Eye,
      audit_assistant: Shield,
      risk_assessor: AlertTriangle,
      report_generator: BarChart3,
      change_detector: RefreshCw,
      training_coordinator: Users,
      incident_responder: Bell,
    };
    return icons[type] || Bot;
  };

  // View 2 dark theme colors - PURE BLACK
  const v2Colors = {
    bgDark: "#000000",
    bgCard: "#080808",
    bgCardGradient: "linear-gradient(135deg, #0A0A0A 0%, #000000 100%)",
    border: "#333333",
    borderAccent: "#444444",
    text: "#C0D0E0",
    textMuted: "#8A9AA0",
  };

  // Helper for View 2 CEER-style card styling
  const getCardStyle = (baseStyle: React.CSSProperties): React.CSSProperties => {
    if (viewMode === "view2") {
      return {
        ...baseStyle,
        borderRadius: "0",
        clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
        border: `1px solid ${v2Colors.border}`,
        background: v2Colors.bgCardGradient,
        backgroundColor: v2Colors.bgCard,
      };
    }
    return baseStyle;
  };

  // Helper for View 2 futuristic text styling
  const getTextStyle = (baseStyle: React.CSSProperties): React.CSSProperties => {
    if (viewMode === "view2") {
      return {
        ...baseStyle,
        fontFamily: "'Orbitron', sans-serif",
        letterSpacing: "1px",
        textTransform: "uppercase" as const,
      };
    }
    return baseStyle;
  };

  // Helper for View 2 number styling (bold, futuristic)
  const getNumberStyle = (baseStyle: React.CSSProperties): React.CSSProperties => {
    if (viewMode === "view2") {
      return {
        ...baseStyle,
        fontFamily: "'Orbitron', sans-serif",
        letterSpacing: "2px",
      };
    }
    return baseStyle;
  };

  // Helper for page background in View 2
  const getPageBgColor = () => viewMode === "view2" ? v2Colors.bgDark : "#0A1628";

  // Helper for container backgrounds in View 2
  const getContainerBg = () => viewMode === "view2" ? v2Colors.bgCard : "#1A2738";

  const renderCompanyList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {complianceCompanies.map((company) => {
        const isSelected = selectedCompany?.id === company.id;
        return (
          <div
            key={company.id}
            onClick={() => {
              setSelectedCompany(company);
              setSelectedAgent(null);
              setSelectedProcess(null);
            }}
            style={{
              backgroundColor: isSelected ? "rgba(52, 152, 219, 0.1)" : "#1A2738",
              border: `1px solid ${isSelected ? "#3498DB" : "#2A3A4D"}`,
              borderRadius: "10px",
              padding: "16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
              <div>
                <h3 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "2px" }}>{company.name}</h3>
                <span style={{ color: "#6B7A8C", fontSize: "12px" }}>{company.industry}</span>
              </div>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: company.overallComplianceScore >= 90 ? "rgba(46, 204, 113, 0.15)" : company.overallComplianceScore >= 80 ? "rgba(241, 196, 15, 0.15)" : "rgba(231, 76, 60, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: company.overallComplianceScore >= 90 ? "#2ECC71" : company.overallComplianceScore >= 80 ? "#F1C40F" : "#E74C3C", fontSize: "14px", fontWeight: "700" }}>
                  {company.overallComplianceScore}
                </span>
              </div>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <div>
                <span style={{ color: "#3498DB", fontSize: "14px", fontWeight: "600" }}>{company.agents.length}</span>
                <span style={{ color: "#6B7A8C", fontSize: "11px", marginLeft: "4px" }}>Agents</span>
              </div>
              <div>
                <span style={{ color: "#9B59B6", fontSize: "14px", fontWeight: "600" }}>{company.processes.length}</span>
                <span style={{ color: "#6B7A8C", fontSize: "11px", marginLeft: "4px" }}>Processes</span>
              </div>
              <div>
                <span style={{ color: "#2ECC71", fontSize: "14px", fontWeight: "600" }}>{company.automationRate}%</span>
                <span style={{ color: "#6B7A8C", fontSize: "11px", marginLeft: "4px" }}>Auto</span>
              </div>
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
        <p style={{ color: "#B8C5D3", fontSize: isMobile ? "13px" : "14px", lineHeight: "1.7", marginBottom: isMobile ? "16px" : "24px" }}>
          {selectedCompany.description}
        </p>

        {/* Company Stats Grid - Replaced with KRIs */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "8px" : "16px", marginBottom: isMobile ? "16px" : "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <Users size={18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Compliance Team</span>
            </div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>{selectedCompany.complianceTeamSize}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <DollarSign size={18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Annual Budget</span>
            </div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>${selectedCompany.annualComplianceBudget}M</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <FileText size={18} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Monthly Docs</span>
            </div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>{(selectedCompany.monthlyDocumentsProcessed / 1000).toFixed(1)}K</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
              <TrendingUp size={18} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Cost Savings</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: "22px", fontWeight: "700" }}>{selectedCompany.costSavingsPercent}%</div>
          </div>
        </div>

        {/* Compliance Metrics by Framework */}
        <h4 style={{ color: "white", fontSize: isMobile ? "14px" : "15px", fontWeight: "600", marginBottom: "16px" }}>Compliance by Framework</h4>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)", gap: "12px" }}>
          {selectedCompany.complianceMetrics.map((metric) => {
            const framework = regulatoryFrameworks[metric.framework];
            return (
              <div key={metric.framework} style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div>
                    <div style={{ color: framework.color, fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>{framework.name}</div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>{framework.regulator}</div>
                  </div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "6px",
                      fontSize: "11px",
                      fontWeight: "600",
                      backgroundColor: `${getStatusColor(metric.status)}20`,
                      color: getStatusColor(metric.status),
                    }}
                  >
                    {getStatusLabel(metric.status)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Score</span>
                  <span style={{ color: metric.score >= 90 ? "#2ECC71" : metric.score >= 80 ? "#F1C40F" : "#E74C3C", fontSize: "18px", fontWeight: "700" }}>{metric.score}</span>
                </div>
                <div style={{ width: "100%", height: "6px", backgroundColor: "#0A1628", borderRadius: "3px", overflow: "hidden", marginBottom: "12px" }}>
                  <div style={{ width: `${metric.score}%`, height: "100%", backgroundColor: framework.color, borderRadius: "3px" }} />
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: "#E74C3C", fontSize: "13px", fontWeight: "600" }}>{metric.openIssues}</span>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", marginLeft: "4px" }}>Open</span>
                  </div>
                  <div>
                    <span style={{ color: "#2ECC71", fontSize: "13px", fontWeight: "600" }}>{metric.resolvedIssues}</span>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", marginLeft: "4px" }}>Resolved</span>
                  </div>
                  <div>
                    <span style={{ color: "#6B7A8C", fontSize: "11px" }}>Next: {metric.nextAudit}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAgents = () => {
    if (!selectedCompany) return null;

    // Key ML models for predictive maintenance and risk management
    const predictiveMaintenanceModels = [
      { name: "RiskPredict-XL", type: "Predictive Risk Scoring", accuracy: 96.8, description: "Predicts risk likelihood and impact using historical patterns" },
      { name: "AnomalyDetect-Pro", type: "Anomaly Detection", accuracy: 94.5, description: "Identifies unusual patterns in compliance and operational data" },
      { name: "TrendForecast-AI", type: "Time Series Forecasting", accuracy: 92.3, description: "Forecasts risk trends and compliance gaps over time" },
      { name: "FailurePredict-ML", type: "Failure Prediction", accuracy: 95.1, description: "Predicts system and process failures before they occur" },
      { name: "SentimentNLP-v3", type: "NLP Sentiment Analysis", accuracy: 91.7, description: "Analyzes regulatory documents and communications" },
      { name: "ClusterRisk-AI", type: "Risk Clustering", accuracy: 89.4, description: "Groups similar risks for efficient mitigation strategies" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Agents Section */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "16px" : "20px" }}>
          {/* Agent List */}
          <div>
            <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <Bot size={18} style={{ color: "#9B59B6" }} />
              AI Compliance Agents ({selectedCompany.agents.length})
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {selectedCompany.agents.map((agent) => {
                const AgentIcon = getAgentIcon(agent.type);
                const isSelected = selectedAgent?.id === agent.id;
                return (
                  <div
                    key={agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    style={{
                      backgroundColor: isSelected ? `${getAgentTypeColor(agent.type)}15` : "#162032",
                      border: `1px solid ${isSelected ? getAgentTypeColor(agent.type) : "#2A3A4D"}`,
                      borderRadius: "10px",
                      padding: "16px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          backgroundColor: `${getAgentTypeColor(agent.type)}20`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <AgentIcon size={20} style={{ color: getAgentTypeColor(agent.type) }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                          <h5 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>{agent.name}</h5>
                          <span
                            style={{
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: "500",
                              backgroundColor: agent.status === "active" ? "rgba(46, 204, 113, 0.15)" : "rgba(241, 196, 15, 0.15)",
                              color: agent.status === "active" ? "#2ECC71" : "#F1C40F",
                              textTransform: "capitalize",
                            }}
                          >
                            {agent.status}
                          </span>
                        </div>
                        <span style={{ color: getAgentTypeColor(agent.type), fontSize: "11px", fontWeight: "500" }}>{getAgentTypeLabel(agent.type)}</span>
                        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                          <span style={{ color: "#6B7A8C", fontSize: "11px" }}>
                            <span style={{ color: "#2ECC71" }}>{agent.accuracyRate}%</span> accuracy
                          </span>
                          <span style={{ color: "#6B7A8C", fontSize: "11px" }}>
                            <span style={{ color: "#3498DB" }}>{agent.automationLevel}%</span> automated
                          </span>
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
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "12px",
                      backgroundColor: `${getAgentTypeColor(selectedAgent.type)}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {(() => {
                      const AgentIcon = getAgentIcon(selectedAgent.type);
                      return <AgentIcon size={24} style={{ color: getAgentTypeColor(selectedAgent.type) }} />;
                    })()}
                  </div>
                  <div>
                    <h4 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{selectedAgent.name}</h4>
                    <span style={{ color: getAgentTypeColor(selectedAgent.type), fontSize: "13px", fontWeight: "500" }}>{getAgentTypeLabel(selectedAgent.type)}</span>
                  </div>
                </div>

                <p style={{ color: "#8B9CAD", fontSize: "13px", lineHeight: "1.6", marginBottom: "20px" }}>{selectedAgent.description}</p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Model</span>
                    <span style={{ color: "#00D4AA", fontSize: "13px", fontWeight: "500" }}>{selectedAgent.model}</span>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Framework</span>
                    <span style={{ color: "#F1C40F", fontSize: "13px", fontWeight: "500" }}>{selectedAgent.framework}</span>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Monthly Processed</span>
                    <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>{selectedAgent.monthlyProcessed.toLocaleString()}</span>
                  </div>
                  <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Avg Response</span>
                    <span style={{ color: "white", fontSize: "16px", fontWeight: "600" }}>{selectedAgent.avgResponseTime}</span>
                  </div>
                </div>

                <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "10px" }}>Capabilities</h5>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                  {selectedAgent.capabilities.map((cap, i) => (
                    <span key={i} style={{ padding: "5px 10px", backgroundColor: "#0A1628", borderRadius: "6px", color: "#B8C5D3", fontSize: "12px" }}>
                      {cap}
                    </span>
                  ))}
                </div>

                <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "10px" }}>Triggers Downstream Processes</h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {selectedAgent.downstreamProcesses.map((procId) => {
                    const proc = selectedCompany?.processes.find((p) => p.id === procId);
                    if (!proc) return null;
                    return (
                      <div
                        key={procId}
                        onClick={() => {
                          setSelectedProcess(proc);
                          setActiveTab("processes");
                        }}
                        style={{
                          padding: "10px 14px",
                          backgroundColor: "#0A1628",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                          border: "1px solid #2A3A4D",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Workflow size={16} style={{ color: getProcessTypeColor(proc.type) }} />
                          <span style={{ color: "#B8C5D3", fontSize: "13px" }}>{proc.name}</span>
                        </div>
                        <ChevronRight size={16} style={{ color: "#6B7A8C" }} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "300px", color: "#6B7A8C" }}>
                <Bot size={40} style={{ marginBottom: "12px", opacity: 0.5 }} />
                <p style={{ fontSize: "14px" }}>Select an agent to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* ML Models Section */}
        <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
          <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <BarChart3 size={18} style={{ color: "#F1C40F" }} />
            Predictive Maintenance Models ({predictiveMaintenanceModels.length})
          </h4>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: "12px" }}>
            {predictiveMaintenanceModels.map((model, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: "#0A1628",
                  border: "1px solid #2A3A4D",
                  borderRadius: "10px",
                  padding: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "8px" }}>
                  <h5 style={{ color: "#F1C40F", fontSize: "13px", fontWeight: "600", margin: 0 }}>{model.name}</h5>
                  <span style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: "600",
                    backgroundColor: "rgba(46, 204, 113, 0.15)",
                    color: "#2ECC71"
                  }}>
                    {model.accuracy}%
                  </span>
                </div>
                <span style={{ color: "#3498DB", fontSize: "11px", fontWeight: "500", display: "block", marginBottom: "6px" }}>{model.type}</span>
                <span style={{ color: "#6B7A8C", fontSize: "11px", lineHeight: "1.4" }}>{model.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderProcesses = () => {
    if (!selectedCompany) return null;
    return (
      <div>
        <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>
          Downstream Processes ({selectedCompany.processes.length})
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {selectedCompany.processes.map((proc) => {
            const isExpanded = expandedProcess === proc.id || selectedProcess?.id === proc.id;
            return (
              <div
                key={proc.id}
                style={{
                  backgroundColor: selectedProcess?.id === proc.id ? `${getProcessTypeColor(proc.type)}10` : "#162032",
                  border: `1px solid ${selectedProcess?.id === proc.id ? getProcessTypeColor(proc.type) : "#2A3A4D"}`,
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                {/* Process Header */}
                <div
                  onClick={() => {
                    setExpandedProcess(isExpanded ? null : proc.id);
                    setSelectedProcess(proc);
                  }}
                  style={{
                    padding: "16px 20px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        backgroundColor: `${getProcessTypeColor(proc.type)}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Workflow size={20} style={{ color: getProcessTypeColor(proc.type) }} />
                    </div>
                    <div>
                      <h5 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "4px" }}>{proc.name}</h5>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span style={{ color: getProcessTypeColor(proc.type), fontSize: "12px", fontWeight: "500" }}>{getProcessTypeLabel(proc.type)}</span>
                        <span style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: "600",
                          backgroundColor: proc.priority === "critical" ? "rgba(231, 76, 60, 0.15)" : proc.priority === "high" ? "rgba(241, 196, 15, 0.15)" : "rgba(52, 152, 219, 0.15)",
                          color: proc.priority === "critical" ? "#E74C3C" : proc.priority === "high" ? "#F1C40F" : "#3498DB",
                          textTransform: "uppercase",
                        }}>
                          {proc.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#2ECC71", fontSize: "16px", fontWeight: "600" }}>{proc.successRate}%</div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Success</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#3498DB", fontSize: "16px", fontWeight: "600" }}>{proc.automationLevel}%</div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Automated</div>
                    </div>
                    <ChevronDown
                      size={20}
                      style={{
                        color: "#6B7A8C",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s ease",
                      }}
                    />
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div style={{ padding: "0 20px 20px 20px", borderTop: "1px solid #2A3A4D" }}>
                    <p style={{ color: "#8B9CAD", fontSize: "13px", lineHeight: "1.6", margin: "16px 0" }}>{proc.description}</p>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                      <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                        <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>SLA</span>
                        <span style={{ color: "white", fontSize: "13px" }}>{proc.sla}</span>
                      </div>
                      <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                        <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Avg Duration</span>
                        <span style={{ color: "white", fontSize: "13px" }}>{proc.avgDuration}</span>
                      </div>
                      <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                        <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Triggered By</span>
                        <span style={{ color: "#00D4AA", fontSize: "13px" }}>
                          {proc.triggeredBy.map((t) => {
                            const agent = selectedCompany?.agents.find((a) => a.id === t);
                            return agent?.name || t;
                          }).join(", ")}
                        </span>
                      </div>
                    </div>

                    {/* Process Steps */}
                    <h6 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>Process Steps</h6>
                    <div style={{ position: "relative", paddingLeft: "24px" }}>
                      {/* Vertical Line */}
                      <div style={{ position: "absolute", left: "7px", top: "10px", bottom: "10px", width: "2px", backgroundColor: "#2A3A4D" }} />

                      {proc.steps.map((step, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: i === proc.steps.length - 1 ? 0 : "16px", position: "relative" }}>
                          {/* Step Indicator */}
                          <div
                            style={{
                              width: "16px",
                              height: "16px",
                              borderRadius: "50%",
                              backgroundColor: step.type === "automated" ? "#2ECC71" : step.type === "manual" ? "#E74C3C" : "#F1C40F",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "absolute",
                              left: "-24px",
                              top: "2px",
                            }}
                          >
                            <span style={{ color: "white", fontSize: "10px", fontWeight: "700" }}>{step.order}</span>
                          </div>

                          <div style={{ flex: 1, backgroundColor: "#0A1628", padding: "12px 14px", borderRadius: "8px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                              <span style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>{step.name}</span>
                              <span
                                style={{
                                  padding: "2px 8px",
                                  borderRadius: "4px",
                                  fontSize: "10px",
                                  fontWeight: "500",
                                  backgroundColor: step.type === "automated" ? "rgba(46, 204, 113, 0.15)" : step.type === "manual" ? "rgba(231, 76, 60, 0.15)" : "rgba(241, 196, 15, 0.15)",
                                  color: step.type === "automated" ? "#2ECC71" : step.type === "manual" ? "#E74C3C" : "#F1C40F",
                                  textTransform: "capitalize",
                                }}
                              >
                                {step.type}
                              </span>
                            </div>
                            <div style={{ display: "flex", gap: "16px" }}>
                              <span style={{ color: "#6B7A8C", fontSize: "11px" }}>
                                <Clock size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                                {step.duration}
                              </span>
                              {step.assignee && (
                                <span style={{ color: "#6B7A8C", fontSize: "11px" }}>
                                  <Users size={12} style={{ marginRight: "4px", verticalAlign: "middle" }} />
                                  {step.assignee}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFrameworks = () => (
    <div>
      <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>Regulatory Frameworks</h4>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {Object.entries(regulatoryFrameworks).map(([key, framework]) => (
          <div key={key} style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: framework.color,
                }}
              />
              <h5 style={{ color: framework.color, fontSize: "15px", fontWeight: "600", margin: 0 }}>{framework.name}</h5>
            </div>
            <p style={{ color: "#6B7A8C", fontSize: "12px", marginBottom: "10px" }}>{framework.regulator}</p>
            <p style={{ color: "#8B9CAD", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>{framework.description}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const getRiskCategoryIcon = (category: RiskCategory): LucideIcon => {
    const icons: Record<RiskCategory, LucideIcon> = {
      compliance: ShieldCheck,
      operational: Settings,
      strategic: Target,
      reputational: Users,
      cybersecurity: Lock,
      financial: DollarSign,
      people_workforce: Users,
    };
    return icons[category] || Shield;
  };

  const renderRiskOverview = () => {
    if (!selectedCompany) return null;

    const riskProfile = getRiskProfile(selectedCompany.id);
    if (!riskProfile) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "300px", color: "#6B7A8C" }}>
          <AlertTriangle size={40} style={{ marginBottom: "12px", opacity: 0.5 }} />
          <p>No risk data available for this company</p>
        </div>
      );
    }

    const severities: Array<keyof typeof severityConfig> = ['insignificant', 'minor', 'moderate', 'major', 'severe'];
    const likelihoods: Array<keyof typeof likelihoodConfig> = ['likely', 'medium', 'high', 'extreme'];

    // Build heat map grid
    const getHeatMapCell = (likelihood: string, severity: string) => {
      return riskProfile.heatMapData.find(
        c => c.likelihood === likelihood && c.severity === severity
      );
    };

    const riskByCategoryBgStyle: React.CSSProperties = {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: viewMode === "view2" ? "0px" : "10px",
      clipPath: viewMode === "view2" ? "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" : "none",
      WebkitClipPath: viewMode === "view2" ? "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" : "none",
      backgroundColor: viewMode === "view2" ? v2Colors.bgCard : "#162032",
      border: viewMode === "view2" ? `1px solid ${v2Colors.border}` : "1px solid #2A3A4D",
      background: viewMode === "view2" ? v2Colors.bgCardGradient : undefined,
      zIndex: 0,
    };

    return (
      <div>
        {/* Top Row: Summary Cards + Heat Map */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", gap: "12px", marginBottom: "12px" }}>
          {/* Left Column: Risk by Category (enlarged) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", position: "relative", zIndex: 10 }}>
            {/* Risk by Category - Enlarged */}
            <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={riskByCategoryBgStyle} />
              <div style={{ position: "relative", padding: "16px", flex: 1, display: "flex", flexDirection: "column", zIndex: 1 }}>
                <div style={getTextStyle({ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" })}>Risk by Category</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {(Object.entries(riskProfile.risksByCategory) as [RiskCategory, { count: number; high: number; critical: number }][])
                    .sort((a, b) => b[1].count - a[1].count)
                    .map(([category, data]) => {
                      const config = riskCategoryConfig[category];
                      const isHovered = hoveredCategory === category;
                      return (
                        <div
                          key={category}
                          onMouseEnter={() => setHoveredCategory(category)}
                          onMouseLeave={() => setHoveredCategory(null)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "8px 10px",
                            cursor: "pointer",
                            borderRadius: "8px",
                            backgroundColor: isHovered ? (viewMode === "view2" ? `${config.color}25` : `${config.color}15`) : "transparent",
                            border: isHovered ? (viewMode === "view2" ? `1px solid ${config.color}` : `1px solid ${config.color}40`) : "1px solid transparent",
                            transition: "all 0.2s ease",
                            transform: isHovered ? "scale(1.02)" : "scale(1)",
                            position: "relative",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "28px",
                              height: "28px",
                              borderRadius: "6px",
                              backgroundColor: `${config.color}20`,
                              color: config.color,
                              fontSize: "11px",
                              fontWeight: "700",
                            }}>
                              {config.abbr}
                            </span>
                            <span style={{ color: isHovered ? "white" : (data.count > 0 ? "#B8C5D3" : "#6B7A8C"), fontSize: "13px", fontWeight: isHovered ? "500" : "400" }}>{config.label}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ color: data.count > 0 ? "white" : "#6B7A8C", fontSize: "16px", fontWeight: "600", minWidth: "24px", textAlign: "right" }}>{data.count}</span>
                            {(data.critical > 0 || data.high > 0) ? (
                              <span style={{ padding: "3px 6px", borderRadius: "4px", backgroundColor: "rgba(231, 76, 60, 0.15)", color: "#E74C3C", fontSize: "11px", fontWeight: "600", minWidth: "24px", textAlign: "center" }}>
                                {data.critical + data.high}
                              </span>
                            ) : (
                              <span style={{ minWidth: "24px" }}></span>
                            )}
                          </div>
                          {/* Tooltip - positioned relative to this row */}
                          {isHovered && (
                            <div style={{
                              position: "absolute",
                              left: "100%",
                              top: "50%",
                              transform: "translateY(-50%)",
                              marginLeft: "12px",
                              backgroundColor: viewMode === "view2" ? v2Colors.bgCard : "#1A2738",
                              border: `1px solid ${viewMode === "view2" ? v2Colors.border : `${config.color}40`}`,
                              borderRadius: viewMode === "view2" ? "0" : "10px",
                              padding: "14px 16px",
                              width: "280px",
                              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
                              zIndex: 9999,
                              clipPath: viewMode === "view2" ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" : "none",
                              WebkitClipPath: viewMode === "view2" ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" : "none",
                            }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                <span style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "32px",
                                  height: "32px",
                                  borderRadius: viewMode === "view2" ? "0" : "8px",
                                  clipPath: viewMode === "view2" ? "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" : "none",
                                  backgroundColor: `${config.color}20`,
                                  color: config.color,
                                  fontSize: "13px",
                                  fontWeight: "700",
                                }}>
                                  {config.abbr}
                                </span>
                                <span style={getTextStyle({
                                  color: viewMode === "view2" ? v2Colors.text : "white",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  textTransform: viewMode === "view2" ? "uppercase" : "none",
                                  letterSpacing: viewMode === "view2" ? "1px" : "0"
                                })}>
                                  {config.label}
                                </span>
                              </div>
                              <p style={getTextStyle({
                                color: viewMode === "view2" ? v2Colors.textMuted : "#B8C5D3",
                                fontSize: "13px",
                                lineHeight: "1.5",
                                margin: 0,
                                textTransform: viewMode === "view2" ? "uppercase" : "none"
                              })}>
                                {config.description}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Heat Map */}
          <div style={getCardStyle({ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", display: "flex", flexDirection: "column" })}>
            <h4 style={getTextStyle({ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" })}>Risk Heat Map</h4>
            <div style={{ display: "grid", gridTemplateColumns: "70px repeat(5, 1fr)", gap: "6px", flex: 1 }}>
              {/* Header row */}
              <div></div>
              {severities.map((severity) => (
                <div key={severity} style={{ textAlign: "center", color: "#6B7A8C", fontSize: "10px", padding: "6px 4px", fontWeight: "500" }}>
                  {severityConfig[severity].label}
                </div>
              ))}

              {/* Data rows */}
              {likelihoods.slice().reverse().map((likelihood) => (
                <>
                  <div key={`label-${likelihood}`} style={{ display: "flex", alignItems: "center", color: "#6B7A8C", fontSize: "11px", paddingRight: "8px", fontWeight: "500" }}>
                    {likelihoodConfig[likelihood].label}
                  </div>
                  {severities.map((severity) => {
                    const cellData = getHeatMapCell(likelihood, severity);
                    // Determine if this is a High or Critical risk cell
                    // Critical = extreme + severe
                    // High = (extreme + major) OR (high + major)
                    const isCritical = likelihood === 'extreme' && severity === 'severe';
                    const isHigh = (likelihood === 'extreme' && severity === 'major') ||
                      (likelihood === 'high' && severity === 'major');

                    // Color: Red for critical/high, otherwise use severity color
                    let cellColor = severityConfig[severity].color;
                    if (isCritical) {
                      cellColor = '#DC2626'; // Bright red for critical
                    } else if (isHigh) {
                      cellColor = '#EF4444'; // Red for high
                    }

                    // Get alternating clipPath for View 2
                    const rowIdx = likelihoods.indexOf(likelihood);
                    const colIdx = severities.indexOf(severity);
                    const isAlternate = (rowIdx + colIdx) % 2 === 0;
                    const clipPath1 = "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)"; // top-left/bottom-right
                    const clipPath2 = "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"; // top-right/bottom-left

                    return (
                      <div
                        key={`${likelihood}-${severity}`}
                        style={{
                          position: "relative",
                          padding: "8px 6px",
                          minHeight: "44px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          gap: "4px",
                        }}
                      >
                        {/* Background Layer - Clipped */}
                        <div style={{
                          position: "absolute",
                          inset: 0,
                          backgroundColor: cellData ? cellColor : (viewMode === "view2" ? "#0A0A0A" : "#1A2738"),
                          borderRadius: viewMode === "view2" ? "0" : "6px",
                          clipPath: viewMode === "view2" ? (isAlternate ? clipPath1 : clipPath2) : "none",
                          border: cellData ? "none" : (viewMode === "view2" ? "1px solid #1A1A1A" : "1px solid #2A3A4D"),
                          zIndex: 0,
                        }} />

                        {/* Content Layer - Unclipped */}
                        <div style={{ position: "relative", zIndex: 1, display: "flex", flexWrap: "wrap", gap: "4px", justifyContent: "center" }}>
                          {cellData && cellData.categories && (
                            Object.entries(cellData.categories).map(([cat, catCount]) => {
                              const catConfig = riskCategoryConfig[cat as RiskCategory];
                              const isHovered = hoveredCell?.likelihood === likelihood &&
                                hoveredCell?.severity === severity &&
                                hoveredCell?.category === cat;

                              // Get risks matching this cell
                              const matchingRisks = riskProfile.risks.filter(
                                r => r.category === cat && r.likelihood === likelihood && r.severity === severity
                              );

                              return (
                                <div
                                  key={cat}
                                  style={{ position: "relative" }}
                                  onMouseEnter={() => setHoveredCell({ likelihood, severity, category: cat as RiskCategory })}
                                  onMouseLeave={(e) => {
                                    // Check if we're moving to the tooltip
                                    const relatedTarget = e.relatedTarget as HTMLElement;
                                    if (relatedTarget?.closest?.('[data-tooltip="true"]')) {
                                      return;
                                    }
                                    setHoveredCell(null);
                                  }}
                                >
                                  <span
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      padding: "2px 4px",
                                      color: "white",
                                      fontSize: "12px",
                                      fontWeight: "700",
                                      whiteSpace: "nowrap",
                                      cursor: "pointer",
                                      textDecoration: isHovered ? "underline" : "none",
                                    }}
                                  >
                                    {catConfig.abbr}({catCount})
                                  </span>

                                  {/* Tooltip */}
                                  {isHovered && (
                                    <div
                                      data-tooltip="true"
                                      onMouseEnter={() => setHoveredCell({ likelihood, severity, category: cat as RiskCategory })}
                                      onMouseLeave={() => setHoveredCell(null)}
                                      style={{
                                        position: "absolute",
                                        top: "calc(100% + 8px)",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        zIndex: 9999,
                                        backgroundColor: viewMode === "view2" ? v2Colors.bgCard : "#1A2738",
                                        border: `1px solid ${viewMode === "view2" ? v2Colors.border : "#3498DB"}`,
                                        borderRadius: viewMode === "view2" ? "0" : "8px",
                                        padding: "12px",
                                        minWidth: "260px",
                                        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                                        clipPath: viewMode === "view2" ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" : "none",
                                        WebkitClipPath: viewMode === "view2" ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" : "none",
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {/* Arrow pointer removed for cleaner View 2 look and consistency */}

                                      <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginBottom: "10px",
                                        paddingBottom: "8px",
                                        borderBottom: `1px solid ${viewMode === "view2" ? "#2A3A4D" : "#3498DB"}`,
                                      }}>
                                        <span style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          width: "24px",
                                          height: "24px",
                                          borderRadius: viewMode === "view2" ? "0" : "4px",
                                          clipPath: viewMode === "view2" ? "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" : "none",
                                          backgroundColor: `${catConfig.color}20`,
                                          color: catConfig.color,
                                          fontSize: "10px",
                                          fontWeight: "700",
                                        }}>
                                          {catConfig.abbr}
                                        </span>
                                        <span style={getTextStyle({
                                          color: viewMode === "view2" ? v2Colors.text : "white",
                                          fontSize: "13px",
                                          fontWeight: "600",
                                          textTransform: viewMode === "view2" ? "uppercase" : "none"
                                        })}>
                                          {catConfig.label} Risks ({catCount})
                                        </span>
                                      </div>

                                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                        {matchingRisks.length > 0 ? (
                                          matchingRisks.map((risk) => (
                                            <div
                                              key={risk.id}
                                              onClick={() => {
                                                setSelectedRisk(risk);
                                                setHoveredCell(null);
                                              }}
                                              style={{
                                                padding: "10px 12px",
                                                backgroundColor: "#0A1628",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                border: "1px solid #2A3A4D",
                                                transition: "all 0.2s ease",
                                              }}
                                              onMouseOver={(e) => {
                                                e.currentTarget.style.borderColor = catConfig.color;
                                                e.currentTarget.style.backgroundColor = "#162032";
                                              }}
                                              onMouseOut={(e) => {
                                                e.currentTarget.style.borderColor = "#2A3A4D";
                                                e.currentTarget.style.backgroundColor = "#0A1628";
                                              }}
                                            >
                                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                                                <span style={{ color: "#3498DB", fontSize: "11px", fontWeight: "600" }}>{risk.id}</span>
                                                <span style={{
                                                  padding: "2px 6px",
                                                  borderRadius: "4px",
                                                  backgroundColor: `${getScoreColor(risk.score)}20`,
                                                  color: getScoreColor(risk.score),
                                                  fontSize: "10px",
                                                  fontWeight: "600"
                                                }}>
                                                  {risk.score}
                                                </span>
                                              </div>
                                              <p style={{ color: "#B8C5D3", fontSize: "11px", margin: 0, lineHeight: "1.4" }}>
                                                {risk.description}
                                              </p>
                                            </div>
                                          ))
                                        ) : (
                                          <p style={{ color: "#6B7A8C", fontSize: "11px", margin: 0, fontStyle: "italic" }}>
                                            {catCount} risk(s) in this category
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    );
                  })}
                </>
              ))}
            </div>


          </div>
        </div>

        {/* Question Bar - ChatGPT Style */}
        <div style={{
          marginBottom: "12px",
          padding: "16px",
          backgroundColor: viewMode === "view2" ? "#0A0A0A" : "#1A2738",
          borderRadius: viewMode === "view2" ? "0" : "10px",
          border: `1px solid ${viewMode === "view2" ? "#2A3A4D" : "#2A3A4D"}`,
          clipPath: viewMode === "view2" ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" : "none",
        }}>
          <div style={{ position: "relative", marginBottom: "12px" }}>
            <input
              type="text"
              placeholder="Ask about regulatory risks, errors, or mitigation..."
              style={{
                width: "100%",
                padding: "12px 48px 12px 14px",
                borderRadius: viewMode === "view2" ? "0" : "6px",
                backgroundColor: viewMode === "view2" ? "#162032" : "#0A1628",
                border: "1px solid #2A3A4D",
                color: "white",
                fontSize: "13px",
                outline: "none",
                fontFamily: viewMode === "view2" ? "Orbitron, sans-serif" : "Inter, sans-serif",
                letterSpacing: viewMode === "view2" ? "1px" : "0",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => e.target.style.borderColor = "#3498DB"}
              onBlur={(e) => e.target.style.borderColor = "#2A3A4D"}
            />
            <button style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#3498DB",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
              transition: "background 0.2s",
            }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = "rgba(52, 152, 219, 0.1)"}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ color: "#6B7A8C", fontSize: "11px", fontWeight: "600" }}>Try asking:</span>
            {["Show High Risks", "Explain Compliance Score", "Mitigation Strategies"].map((faq) => (
              <span
                key={faq}
                style={{
                  padding: "4px 10px",
                  backgroundColor: viewMode === "view2" ? "rgba(52, 152, 219, 0.1)" : "#2A3A4D",
                  borderRadius: viewMode === "view2" ? "0" : "4px",
                  color: viewMode === "view2" ? "#3498DB" : "#B8C5D3",
                  fontSize: "11px",
                  cursor: "pointer",
                  border: viewMode === "view2" ? "1px solid rgba(52, 152, 219, 0.3)" : "none",
                  clipPath: viewMode === "view2" ? "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" : "none",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = viewMode === "view2" ? "rgba(52, 152, 219, 0.2)" : "#3e4c60";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = viewMode === "view2" ? "rgba(52, 152, 219, 0.1)" : "#2A3A4D";
                  e.currentTarget.style.color = viewMode === "view2" ? "#3498DB" : "#B8C5D3";
                }}
              >
                {faq}
              </span>
            ))}
          </div>
        </div>

        {/* Second Row: Alerts Only (KRIs moved primarily to top) */}
        <div style={{ marginBottom: "12px" }}>
          {/* Recent Alerts - Full Width */}
          <div style={getCardStyle({ backgroundColor: "#162032", padding: "14px", borderRadius: "10px", border: "1px solid #2A3A4D" })}>
            <h4 style={getTextStyle({ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "10px" })}>Recent Risk Trends & Alerts</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {riskProfile.recentAlerts.map((alert) => (
                <div key={alert.id} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <CheckCircle size={14} style={{ color: "#2ECC71", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ color: "#B8C5D3", fontSize: "12px", lineHeight: "1.4", margin: 0 }}>
                    {alert.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row: Risk Table + Insights */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.6fr 1fr", gap: "12px" }}>
          {/* Top Risks Table */}
          <div style={getCardStyle({ backgroundColor: "#162032", padding: "14px", borderRadius: "10px", border: "1px solid #2A3A4D" })}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
              <h4 style={getTextStyle({ color: "white", fontSize: "13px", fontWeight: "600", margin: 0 })}>Risk Register</h4>
              <span style={{ color: "#00D4AA", fontSize: "10px", cursor: "pointer" }}>VIEW ALL</span>
            </div>

            {/* Table Header */}
            <div style={{ display: "grid", gridTemplateColumns: "60px 90px 1fr 70px 80px", gap: "6px", padding: "8px 0", borderBottom: "1px solid #2A3A4D", marginBottom: "4px" }}>
              <span style={{ color: "#6B7A8C", fontSize: "10px", fontWeight: "600" }}>Risk ID</span>
              <span style={{ color: "#6B7A8C", fontSize: "10px", fontWeight: "600" }}>Category</span>
              <span style={{ color: "#6B7A8C", fontSize: "10px", fontWeight: "600" }}>Description</span>
              <span style={{ color: "#6B7A8C", fontSize: "10px", fontWeight: "600" }}>Score</span>
              <span style={{ color: "#6B7A8C", fontSize: "10px", fontWeight: "600" }}>Status</span>
            </div>

            {/* Table Rows */}
            {riskProfile.risks.slice(0, 5).map((risk, index) => {
              const categoryConfig = riskCategoryConfig[risk.category];
              const statusConfig = riskStatusConfig[risk.status];
              const scoreColor = getScoreColor(risk.score);
              return (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "60px 90px 1fr 70px 80px", gap: "6px", padding: "8px 0", borderBottom: "1px solid #2A3A4D", alignItems: "center" }}>
                  <span style={{ color: "#B8C5D3", fontSize: "11px", fontWeight: "500" }}>{risk.id}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: "20px",
                      height: "20px",
                      padding: "0 4px",
                      borderRadius: "4px",
                      backgroundColor: `${categoryConfig.color}20`,
                      color: categoryConfig.color,
                      fontSize: "9px",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}>
                      {categoryConfig.abbr}
                    </span>
                    <span style={{ color: "#B8C5D3", fontSize: "10px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{categoryConfig.label}</span>
                  </div>
                  <span style={{ color: "#8B9CAD", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{risk.description}</span>
                  <span style={{ padding: "3px 6px", borderRadius: "4px", backgroundColor: `${scoreColor}20`, color: scoreColor, fontSize: "10px", fontWeight: "600", textAlign: "center" }}>
                    {risk.score}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                    <span style={{ color: statusConfig.color, fontSize: "10px" }}>{statusConfig.label}</span>
                    <ChevronRight size={12} style={{ color: "#6B7A8C" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* ERM Insights - Single Card */}
          <div style={getCardStyle({ backgroundColor: "#162032", padding: "14px", borderRadius: "10px", border: "1px solid #2A3A4D" })}>
            <h4 style={getTextStyle({ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "10px" })}>ERM Insights & Recommendations</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {riskProfile.ermInsights.map((insight) => (
                <div key={insight.id} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
                  <CheckCircle size={14} style={{ color: "#2ECC71", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ color: "#B8C5D3", fontSize: "12px", lineHeight: "1.4", margin: 0 }}>
                    {insight.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main style={{ minHeight: "100vh", backgroundColor: getPageBgColor(), fontFamily: viewMode === "view2" ? "'Orbitron', sans-serif" : "inherit" }}>
      {/* Header */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: getPageBgColor(), borderBottom: `1px solid ${viewMode === "view2" ? v2Colors.border : "#2A3A4D"}` }}>
        <div style={{ maxWidth: "1800px", margin: "0 auto", padding: isMobile ? "10px 12px" : "12px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "16px" }}>
              <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#B8C5D3", textDecoration: "none" }}>
                <ArrowLeft size={18} />
                {!isMobile && <span style={{ fontSize: "14px" }}>Back</span>}
              </Link>
              {!isMobile && <div style={{ width: "1px", height: "24px", backgroundColor: "#2A3A4D" }} />}
              <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "8px" : "12px" }}>
                <div style={{ width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", borderRadius: "12px", backgroundColor: "rgba(231, 76, 60, 0.15)", border: "1px solid rgba(231, 76, 60, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={isMobile ? 16 : 20} style={{ color: "#E74C3C" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: isMobile ? "14px" : "18px", fontWeight: "600", color: "white", margin: 0, fontFamily: viewMode === "view2" ? "'Orbitron', 'Rajdhani', sans-serif" : "inherit", letterSpacing: viewMode === "view2" ? "2px" : "0", textTransform: viewMode === "view2" ? "uppercase" : "none" }}>
                    {isMobile ? "ERM" : "Enterprise Risk Management"}
                  </h1>
                  {!isMobile && <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0, fontFamily: viewMode === "view2" ? "'Orbitron', 'Rajdhani', sans-serif" : "inherit", letterSpacing: viewMode === "view2" ? "1px" : "0" }}>AI-powered risk intelligence</p>}
                </div>
              </div>
              {/* View Toggle Buttons */}
              {!isMobile && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "24px" }}>
                  <button
                    onClick={() => setViewMode("view1")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      backgroundColor: viewMode === "view1" ? "#3498DB" : "transparent",
                      border: viewMode === "view1" ? "1px solid #3498DB" : "1px solid #2A3A4D",
                      color: viewMode === "view1" ? "white" : "#6B7A8C",
                      fontSize: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                  >
                    View 1
                  </button>
                  <button
                    onClick={() => setViewMode("view2")}
                    style={{
                      padding: "6px 14px",
                      borderRadius: viewMode === "view2" ? "0" : "6px",
                      clipPath: viewMode === "view2" ? "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)" : "none",
                      backgroundColor: viewMode === "view2" ? "#E74C3C" : "transparent",
                      border: viewMode === "view2" ? "1px solid #E74C3C" : "1px solid #2A3A4D",
                      color: viewMode === "view2" ? "white" : "#6B7A8C",
                      fontSize: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      fontFamily: viewMode === "view2" ? "'Orbitron', 'Rajdhani', sans-serif" : "inherit",
                      letterSpacing: viewMode === "view2" ? "1px" : "0",
                      textTransform: viewMode === "view2" ? "uppercase" : "none",
                    }}
                  >
                    View 2
                  </button>
                </div>
              )}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isMobile && (
                <button
                  onClick={() => setShowMobileCompanyList(!showMobileCompanyList)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: showMobileCompanyList ? "#E74C3C" : "#162032",
                    border: "1px solid #2A3A4D",
                    color: showMobileCompanyList ? "#0A1628" : "#B8C5D3",
                    cursor: "pointer"
                  }}
                >
                  {showMobileCompanyList ? <X size={18} /> : <Menu size={18} />}
                </button>
              )}
              {!isMobile && (
                <Link href="/" style={{ display: "flex", alignItems: "center" }}>
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
            {complianceCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => {
                  setSelectedCompany(company);
                  setSelectedAgent(null);
                  setSelectedProcess(null);
                  setShowMobileCompanyList(false);
                }}
                style={{
                  backgroundColor: selectedCompany?.id === company.id ? "rgba(52, 152, 219, 0.1)" : "#162032",
                  border: `1px solid ${selectedCompany?.id === company.id ? "#3498DB" : "#2A3A4D"}`,
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>{company.name}</span>
                  <span style={{
                    color: company.overallComplianceScore >= 90 ? "#2ECC71" : company.overallComplianceScore >= 80 ? "#F1C40F" : "#E74C3C",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}>
                    {company.overallComplianceScore}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: isMobile ? "12px" : "24px" }}>
        {/* Global Stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? "8px" : "16px", marginBottom: isMobile ? "16px" : "24px" }}>
          {getRiskProfile(selectedCompany?.id || '')?.kris.map((kri) => {
            const TrendIcon = kri.trend === 'up' ? TrendingUp : kri.trend === 'down' ? TrendingDown : Minus;
            const trendColor = kri.trend === 'up' ? '#E74C3C' : kri.trend === 'down' ? '#2ECC71' : '#6B7A8C';

            return (
              <div
                key={kri.id}
                style={{ position: "relative", cursor: "pointer" }}
                onMouseEnter={() => setHoveredKriId(kri.id)}
                onMouseLeave={() => setHoveredKriId(null)}
              >
                {/* Visual Card Content - Clipped in View 2 */}
                <div style={getCardStyle({ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D", height: "100%" })}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <div style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: viewMode === "view2" ? "0" : "6px",
                      clipPath: viewMode === "view2" ? "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" : "none",
                      backgroundColor: kri.status === 'critical' ? "rgba(231, 76, 60, 0.15)" : kri.status === 'warning' ? "rgba(241, 196, 15, 0.15)" : "rgba(46, 204, 113, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      {kri.status === 'critical' ? (
                        <AlertCircle size={14} style={{ color: "#E74C3C" }} />
                      ) : kri.status === 'warning' ? (
                        <AlertTriangle size={14} style={{ color: "#F1C40F" }} />
                      ) : (
                        <CheckCircle size={14} style={{ color: "#2ECC71" }} />
                      )}
                    </div>
                    <span style={getTextStyle({ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" })}>{kri.name}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={getNumberStyle({ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" })}>{kri.value}{kri.unit}</div>
                    {kri.trendPercent > 0 && (
                      <div style={{ display: "flex", alignItems: "center", gap: "2px", backgroundColor: `${trendColor}15`, padding: "2px 6px", borderRadius: viewMode === "view2" ? "0" : "4px", clipPath: viewMode === "view2" ? "polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)" : "none" }}>
                        <TrendIcon size={12} style={{ color: trendColor }} />
                        <span style={getTextStyle({ color: trendColor, fontSize: "11px", fontWeight: "600" })}>{kri.trendPercent}%</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Tooltip - Outside clipped container */}
                {hoveredKriId === kri.id && kri.description && (
                  <div style={{
                    position: "absolute",
                    top: "calc(100% + 8px)",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: viewMode === "view2" ? v2Colors.bgCard : "#1A2738",
                    border: `1px solid ${viewMode === "view2" ? v2Colors.border : "#2A3A4D"}`,
                    padding: "12px",
                    borderRadius: viewMode === "view2" ? "0px" : "8px",
                    zIndex: 9999,
                    width: "240px",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.5)",
                    pointerEvents: "none",
                    clipPath: viewMode === "view2" ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" : "none",
                    WebkitClipPath: viewMode === "view2" ? "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" : "none",
                  }}>
                    <div style={getTextStyle({ color: viewMode === "view2" ? v2Colors.text : "#E0E6ED", fontSize: "12px", lineHeight: "1.5", textAlign: "left" })}>
                      {kri.description}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Layout - Full width for demo, no sidebar */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: isMobile ? "12px" : "24px" }}>
          {/* Company Sidebar - Hidden for demo */}
          {/* {!isMobile && (
            <div>
              <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Companies</h3>
              {renderCompanyList()}
            </div>
          )} */}

          {/* Main Content */}
          <div style={getCardStyle({ backgroundColor: "#1A2738", borderRadius: "12px", border: "1px solid #2A3A4D", overflow: "hidden" })}>
            {/* Mobile Company Selector */}
            {isMobile && (
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #2A3A4D" }}>
                <select
                  value={selectedCompany?.id || ""}
                  onChange={(e) => {
                    const company = complianceCompanies.find(c => c.id === e.target.value);
                    if (company) {
                      setSelectedCompany(company);
                      setSelectedAgent(null);
                      setSelectedProcess(null);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    backgroundColor: "#0D1821",
                    border: "1px solid #2A3A4D",
                    borderRadius: "8px",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  {complianceCompanies.map((company) => (
                    <option key={company.id} value={company.id}>{company.name}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Company Header */}
            {selectedCompany && (
              <div style={{
                padding: isMobile ? "12px 16px" : "20px 24px",
                borderBottom: "1px solid #2A3A4D",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                gap: isMobile ? "12px" : "0",
              }}>
                <div>
                  <h2 style={{ color: "white", fontSize: isMobile ? "16px" : "20px", fontWeight: "700", marginBottom: "4px" }}>{selectedCompany.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "12px", flexWrap: "wrap" }}>
                    <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "13px" }}>{selectedCompany.industry}</span>
                    <span style={{ color: "#2A3A4D" }}>•</span>
                    <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "13px" }}>{selectedCompany.headquarters}</span>
                    {!isMobile && (
                      <>
                        <span style={{ color: "#2A3A4D" }}>•</span>
                        <span style={{ color: "#6B7A8C", fontSize: "13px" }}>Regulated since {selectedCompany.regulatedSince}</span>
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {/* Total Active Risks */}
                  {(() => {
                    const riskProfile = getRiskProfile(selectedCompany.id);
                    return riskProfile ? (
                      <>
                        <div style={getCardStyle({ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", backgroundColor: "#162032", borderRadius: "8px", border: "1px solid #2A3A4D" })}>
                          <div>
                            <div style={getTextStyle({ color: "#6B7A8C", fontSize: "10px", marginBottom: "2px" })}>Total Active Risks</div>
                            <span style={getNumberStyle({ color: "white", fontSize: "20px", fontWeight: "700" })}>{riskProfile.activeRisks}</span>
                          </div>
                          <div style={{ width: "28px", height: "28px", borderRadius: viewMode === "view2" ? "0" : "6px", clipPath: viewMode === "view2" ? "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" : "none", backgroundColor: "rgba(52, 152, 219, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <Shield size={14} style={{ color: "#3498DB" }} />
                          </div>
                        </div>
                        {/* High & Critical */}
                        <div style={getCardStyle({ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", backgroundColor: "#162032", borderRadius: "8px", border: "1px solid #2A3A4D" })}>
                          <div>
                            <div style={getTextStyle({ color: "#6B7A8C", fontSize: "10px", marginBottom: "2px" })}>High & Critical</div>
                            <span style={getNumberStyle({ color: "#E74C3C", fontSize: "20px", fontWeight: "700" })}>{riskProfile.highCriticalRisks}</span>
                            <span style={getTextStyle({ color: "#E74C3C", fontSize: "10px", marginLeft: "4px" })}>({riskProfile.criticalRisks} critical)</span>
                          </div>
                          <div style={{ width: "28px", height: "28px", borderRadius: viewMode === "view2" ? "0" : "6px", clipPath: viewMode === "view2" ? "polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)" : "none", backgroundColor: "rgba(231, 76, 60, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <AlertTriangle size={14} style={{ color: "#E74C3C" }} />
                          </div>
                        </div>
                      </>
                    ) : null;
                  })()}
                  {/* Overall Score */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Overall Score</span>
                    <div
                      style={{
                        width: isMobile ? "42px" : "56px",
                        height: isMobile ? "42px" : "56px",
                        borderRadius: "50%",
                        backgroundColor: selectedCompany.overallComplianceScore >= 90 ? "rgba(46, 204, 113, 0.15)" : "rgba(241, 196, 15, 0.15)",
                        border: `2px solid ${selectedCompany.overallComplianceScore >= 90 ? "#2ECC71" : "#F1C40F"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span style={{ color: selectedCompany.overallComplianceScore >= 90 ? "#2ECC71" : "#F1C40F", fontSize: "20px", fontWeight: "700" }}>
                        {selectedCompany.overallComplianceScore}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid #2A3A4D",
              padding: isMobile ? "0 8px" : "0 24px",
              overflowX: isMobile ? "auto" : "visible",
            }}>
              {/* Demo mode: Only show Risks tab */}
              {(["risks"] as const).map((tab) => {
                const tabLabels: Record<string, string> = {
                  risks: "Risk Overview",
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: isMobile ? "10px 12px" : "14px 20px",
                      border: "none",
                      borderBottom: activeTab === tab ? "2px solid #3498DB" : "2px solid transparent",
                      backgroundColor: "transparent",
                      color: activeTab === tab ? "white" : "#6B7A8C",
                      fontSize: isMobile ? "12px" : "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tabLabels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div style={{ padding: isMobile ? "16px" : "24px", maxHeight: isMobile ? "none" : "calc(100vh - 380px)", overflowY: "auto" }}>
              {activeTab === "risks" && renderRiskOverview()}
              {activeTab === "agents" && renderAgents()}
              {activeTab === "processes" && renderProcesses()}
              {activeTab === "frameworks" && renderFrameworks()}
              {activeTab === "summary" && renderOverview()}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Detail Modal */}
      {selectedRisk && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
          onClick={() => setSelectedRisk(null)}
        >
          <div
            style={{
              backgroundColor: "#1A2738",
              borderRadius: "16px",
              border: "1px solid #2A3A4D",
              padding: "24px",
              maxWidth: "650px",
              width: "90%",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: `${riskCategoryConfig[selectedRisk.category].color}20`,
                  color: riskCategoryConfig[selectedRisk.category].color,
                  fontSize: "14px",
                  fontWeight: "700",
                }}>
                  {riskCategoryConfig[selectedRisk.category].abbr}
                </span>
                <div>
                  <h3 style={{ color: "white", fontSize: "18px", fontWeight: "700", margin: 0 }}>{selectedRisk.id}</h3>
                  <span style={{ color: riskCategoryConfig[selectedRisk.category].color, fontSize: "13px" }}>
                    {riskCategoryConfig[selectedRisk.category].label}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                {/* Copilot Button */}
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "8px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(155, 89, 182, 0.15)",
                    border: "1px solid #9B59B6",
                    color: "#9B59B6",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  <Bot size={16} />
                  AI Copilot
                </button>
                <button
                  onClick={() => setSelectedRisk(null)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "#0A1628",
                    border: "1px solid #2A3A4D",
                    color: "#6B7A8C",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Risk Description */}
            <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.6", marginBottom: "16px" }}>
              {selectedRisk.description}
            </p>

            {/* Risk Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginBottom: "16px" }}>
              <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "4px" }}>Risk Score</span>
                <span style={{ color: getScoreColor(selectedRisk.score), fontSize: "20px", fontWeight: "700" }}>
                  {selectedRisk.score}
                </span>
              </div>
              <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "4px" }}>Status</span>
                <span style={{ color: riskStatusConfig[selectedRisk.status].color, fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>
                  {riskStatusConfig[selectedRisk.status].label}
                </span>
              </div>
              <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "4px" }}>Severity</span>
                <span style={{ color: severityConfig[selectedRisk.severity].color, fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>
                  {severityConfig[selectedRisk.severity].label}
                </span>
              </div>
              <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "4px" }}>Likelihood</span>
                <span style={{ color: "white", fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>
                  {likelihoodConfig[selectedRisk.likelihood].label}
                </span>
              </div>
            </div>

            {/* Owner & Last Updated */}
            <div style={{ display: "flex", gap: "20px", marginBottom: "16px", padding: "12px", backgroundColor: "#0A1628", borderRadius: "8px" }}>
              <div style={{ flex: 1 }}>
                <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "2px" }}>Risk Owner</span>
                <span style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>{selectedRisk.owner}</span>
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "2px" }}>Last Updated</span>
                <span style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>{selectedRisk.lastUpdated}</span>
              </div>
            </div>

            {/* Input Sources */}
            {selectedRisk.inputSources && (
              <div style={{ marginBottom: "16px" }}>
                <h4 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <FileText size={14} style={{ color: "#3498DB" }} />
                  Input Sources
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {selectedRisk.inputSources.map((source, i) => (
                    <span key={i} style={{ padding: "4px 10px", backgroundColor: "#0A1628", borderRadius: "6px", color: "#B8C5D3", fontSize: "11px", border: "1px solid #2A3A4D" }}>
                      {source}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ML Model */}
            {selectedRisk.mlModel && (
              <div style={{ marginBottom: "16px", backgroundColor: "#0A1628", borderRadius: "10px", padding: "14px", border: "1px solid #2A3A4D" }}>
                <h4 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <BarChart3 size={14} style={{ color: "#F1C40F" }} />
                  ML Model Used
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                  <div>
                    <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "2px" }}>Model Name</span>
                    <span style={{ color: "#F1C40F", fontSize: "13px", fontWeight: "600" }}>{selectedRisk.mlModel.name}</span>
                  </div>
                  <div>
                    <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "2px" }}>Type</span>
                    <span style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>{selectedRisk.mlModel.type}</span>
                  </div>
                  <div>
                    <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "2px" }}>Accuracy</span>
                    <span style={{ color: "#2ECC71", fontSize: "13px", fontWeight: "600" }}>{selectedRisk.mlModel.accuracy}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* AI Agent */}
            {selectedRisk.aiAgent && (
              <div style={{ marginBottom: "16px", backgroundColor: "rgba(155, 89, 182, 0.1)", borderRadius: "10px", padding: "14px", border: "1px solid rgba(155, 89, 182, 0.3)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                  <h4 style={{ color: "white", fontSize: "13px", fontWeight: "600", margin: 0, display: "flex", alignItems: "center", gap: "8px" }}>
                    <Bot size={14} style={{ color: "#9B59B6" }} />
                    AI Agent for Mitigation
                  </h4>
                  <span style={{ padding: "3px 8px", backgroundColor: "rgba(46, 204, 113, 0.15)", borderRadius: "4px", color: "#2ECC71", fontSize: "10px", fontWeight: "600" }}>
                    {selectedRisk.aiAgent.automationLevel}% Automated
                  </span>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <span style={{ color: "#9B59B6", fontSize: "15px", fontWeight: "600" }}>{selectedRisk.aiAgent.name}</span>
                  <span style={{ color: "#6B7A8C", fontSize: "12px", marginLeft: "8px" }}>({selectedRisk.aiAgent.type})</span>
                </div>
                <div>
                  <span style={{ color: "#6B7A8C", fontSize: "10px", display: "block", marginBottom: "6px" }}>Capabilities</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {selectedRisk.aiAgent.capabilities.map((cap, i) => (
                      <span key={i} style={{ padding: "4px 10px", backgroundColor: "rgba(155, 89, 182, 0.2)", borderRadius: "6px", color: "#D7BDE2", fontSize: "11px" }}>
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mitigation Actions */}
            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
                <Shield size={14} style={{ color: "#2ECC71" }} />
                Mitigation Actions
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {selectedRisk.mitigationActions.map((action, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", backgroundColor: "#0A1628", borderRadius: "6px" }}>
                    <CheckCircle size={14} style={{ color: "#2ECC71", flexShrink: 0 }} />
                    <span style={{ color: "#B8C5D3", fontSize: "12px" }}>{action}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "10px", paddingTop: "12px", borderTop: "1px solid #2A3A4D" }}>
              <Link
                href="/modules/regulatory/risk"
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#3498DB",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                <Eye size={16} />
                View Full Risk Page
              </Link>
              <button
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(155, 89, 182, 0.15)",
                  border: "1px solid #9B59B6",
                  color: "#9B59B6",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "600",
                }}
              >
                <Bot size={16} />
                Deploy AI Agent
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
