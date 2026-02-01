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
} from "@/data/riskManagement";

export default function RegulatoryPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const [selectedCompany, setSelectedCompany] = useState<ComplianceCompany | null>(complianceCompanies[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "risks" | "agents" | "processes" | "frameworks">("overview");
  const [selectedAgent, setSelectedAgent] = useState<ComplianceAgent | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<DownstreamProcess | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<string | null>(null);
  const [showMobileCompanyList, setShowMobileCompanyList] = useState(false);

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

        {/* Company Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "10px" : "16px", marginBottom: isMobile ? "16px" : "24px" }}>
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
    return (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "16px" : "20px" }}>
        {/* Agent List */}
        <div>
          <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>
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
      legal: Scale,
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
    const getHeatMapCount = (likelihood: string, severity: string): number => {
      const cell = riskProfile.heatMapData.find(
        c => c.likelihood === likelihood && c.severity === severity
      );
      return cell?.count || 0;
    };

    return (
      <div>
        {/* Top Row: Summary Cards + Heat Map */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", gap: "20px", marginBottom: "20px" }}>
          {/* Left Column: Summary Cards + Risk Categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Total Risks Card */}
            <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
              <div style={{ color: "#6B7A8C", fontSize: "12px", marginBottom: "8px" }}>Total Risks</div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "rgba(52, 152, 219, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={20} style={{ color: "#3498DB" }} />
                </div>
                <div>
                  <span style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{riskProfile.activeRisks}</span>
                  <span style={{ color: "#6B7A8C", fontSize: "14px", marginLeft: "6px" }}>Active</span>
                </div>
              </div>
            </div>

            {/* High & Critical Risks Card */}
            <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
              <div style={{ color: "#6B7A8C", fontSize: "12px", marginBottom: "8px" }}>High & Critical Risks</div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: "rgba(231, 76, 60, 0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <AlertTriangle size={20} style={{ color: "#E74C3C" }} />
                </div>
                <div>
                  <span style={{ color: "#E74C3C", fontSize: "28px", fontWeight: "700" }}>{riskProfile.highCriticalRisks}</span>
                </div>
              </div>
              <div style={{ marginTop: "8px", color: "#E74C3C", fontSize: "12px" }}>
                • {riskProfile.criticalRisks} Critical Risks
              </div>
            </div>

            {/* Top Risk Categories */}
            <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "12px", border: "1px solid #2A3A4D", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>Top Risk Categories</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {(Object.entries(riskProfile.risksByCategory) as [RiskCategory, { count: number; high: number; critical: number }][])
                  .filter(([_, data]) => data.count > 0)
                  .sort((a, b) => b[1].count - a[1].count)
                  .map(([category, data]) => {
                    const config = riskCategoryConfig[category];
                    const Icon = getRiskCategoryIcon(category);
                    return (
                      <div key={category} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #2A3A4D" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <Icon size={16} style={{ color: config.color }} />
                          <span style={{ color: "#B8C5D3", fontSize: "13px" }}>{config.label}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{data.count}</span>
                          {data.critical > 0 && (
                            <span style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(231, 76, 60, 0.15)", color: "#E74C3C", fontSize: "10px", fontWeight: "600" }}>
                              {data.critical}
                            </span>
                          )}
                          {data.high > 0 && (
                            <span style={{ padding: "2px 6px", borderRadius: "4px", backgroundColor: "rgba(230, 126, 34, 0.15)", color: "#E67E22", fontSize: "10px", fontWeight: "600" }}>
                              {data.high}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Right Column: Heat Map */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "20px" }}>Risk Heat Map</h4>
            <div style={{ display: "grid", gridTemplateColumns: "80px repeat(5, 1fr)", gap: "4px" }}>
              {/* Header row */}
              <div></div>
              {severities.map((severity) => (
                <div key={severity} style={{ textAlign: "center", color: "#6B7A8C", fontSize: "10px", padding: "8px 4px" }}>
                  {severityConfig[severity].label}
                </div>
              ))}

              {/* Data rows */}
              {likelihoods.slice().reverse().map((likelihood) => (
                <>
                  <div key={`label-${likelihood}`} style={{ display: "flex", alignItems: "center", color: "#6B7A8C", fontSize: "11px", paddingRight: "8px" }}>
                    {likelihoodConfig[likelihood].label}
                  </div>
                  {severities.map((severity) => {
                    const count = getHeatMapCount(likelihood, severity);
                    const cellColor = getHeatMapCellColor(likelihood, severity);
                    return (
                      <div
                        key={`${likelihood}-${severity}`}
                        style={{
                          backgroundColor: count > 0 ? cellColor : "#1A2738",
                          borderRadius: "6px",
                          padding: "16px 8px",
                          textAlign: "center",
                          minHeight: "50px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: count > 0 ? "none" : "1px solid #2A3A4D",
                        }}
                      >
                        {count > 0 && (
                          <span style={{ color: "white", fontSize: "16px", fontWeight: "700" }}>{count}</span>
                        )}
                      </div>
                    );
                  })}
                </>
              ))}
            </div>
          </div>
        </div>

        {/* Second Row: KRIs + Alerts */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          {/* Key Risk Indicators */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>Key Risk Indicators (KRIs)</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {riskProfile.kris.map((kri) => {
                const TrendIcon = kri.trend === 'up' ? TrendingUp : kri.trend === 'down' ? TrendingDown : Minus;
                const trendColor = kri.trend === 'up' ? '#E74C3C' : kri.trend === 'down' ? '#2ECC71' : '#6B7A8C';
                return (
                  <div key={kri.id} style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
                      <div style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "6px",
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
                      <span style={{ color: "white", fontSize: "18px", fontWeight: "700" }}>{kri.value}{kri.unit}</span>
                      {kri.trendPercent > 0 && (
                        <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
                          <TrendIcon size={12} style={{ color: trendColor }} />
                          <span style={{ color: trendColor, fontSize: "11px" }}>{kri.trendPercent}%</span>
                        </div>
                      )}
                    </div>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>{kri.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Alerts */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>Recent Risk Trends & Alerts</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {riskProfile.recentAlerts.map((alert) => (
                <div key={alert.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <CheckCircle size={16} style={{ color: "#2ECC71", marginTop: "2px", flexShrink: 0 }} />
                  <p style={{ color: "#B8C5D3", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>
                    {alert.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Row: Risk Table + Insights */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.5fr 1fr", gap: "20px" }}>
          {/* Top Risks Table */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", margin: 0 }}>Top Risk Categories</h4>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#6B7A8C", fontSize: "11px" }}>Total Risks</span>
                <span style={{ color: "#6B7A8C", fontSize: "11px" }}>Overdue Actions</span>
              </div>
            </div>

            {/* Table Header */}
            <div style={{ display: "grid", gridTemplateColumns: "70px 100px 1fr 80px 90px", gap: "8px", padding: "10px 0", borderBottom: "1px solid #2A3A4D", marginBottom: "8px" }}>
              <span style={{ color: "#6B7A8C", fontSize: "11px", fontWeight: "600" }}>Risk ID</span>
              <span style={{ color: "#6B7A8C", fontSize: "11px", fontWeight: "600" }}>Category</span>
              <span style={{ color: "#6B7A8C", fontSize: "11px", fontWeight: "600" }}>Description</span>
              <span style={{ color: "#6B7A8C", fontSize: "11px", fontWeight: "600" }}>Score</span>
              <span style={{ color: "#6B7A8C", fontSize: "11px", fontWeight: "600" }}>Status</span>
            </div>

            {/* Table Rows */}
            {riskProfile.risks.slice(0, 4).map((risk, index) => {
              const categoryConfig = riskCategoryConfig[risk.category];
              const statusConfig = riskStatusConfig[risk.status];
              const scoreColor = getScoreColor(risk.score);
              const scoreLabel = getScoreLabel(risk.score);
              return (
                <div key={index} style={{ display: "grid", gridTemplateColumns: "70px 100px 1fr 80px 90px", gap: "8px", padding: "12px 0", borderBottom: "1px solid #2A3A4D", alignItems: "center" }}>
                  <span style={{ color: "#B8C5D3", fontSize: "12px", fontWeight: "500" }}>{risk.id}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: categoryConfig.color }} />
                    <span style={{ color: "#B8C5D3", fontSize: "12px" }}>{categoryConfig.label}</span>
                  </div>
                  <span style={{ color: "#8B9CAD", fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{risk.description}</span>
                  <span style={{ padding: "4px 10px", borderRadius: "4px", backgroundColor: `${scoreColor}20`, color: scoreColor, fontSize: "11px", fontWeight: "600", textAlign: "center" }}>
                    {risk.score} {scoreLabel}
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ color: statusConfig.color, fontSize: "12px" }}>{statusConfig.label}</span>
                    <ChevronRight size={14} style={{ color: "#6B7A8C" }} />
                  </div>
                </div>
              );
            })}

            <button style={{
              marginTop: "16px",
              padding: "10px 20px",
              backgroundColor: "#0A1628",
              border: "1px solid #2A3A4D",
              borderRadius: "8px",
              color: "#B8C5D3",
              fontSize: "12px",
              cursor: "pointer",
              width: "100%",
            }}>
              VIEW FULL REGISTER
            </button>
          </div>

          {/* ERM Insights */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
              <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>ERM Insights & Recommendations</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {riskProfile.ermInsights.map((insight) => (
                  <div key={insight.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                    <CheckCircle size={16} style={{ color: "#2ECC71", marginTop: "2px", flexShrink: 0 }} />
                    <p style={{ color: "#B8C5D3", fontSize: "13px", lineHeight: "1.5", margin: 0 }}>
                      {insight.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Summary Card */}
            <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", margin: 0 }}>Top Risk Categories</h4>
                <span style={{ color: "#00D4AA", fontSize: "11px", cursor: "pointer" }}>VIEW ALL RISKS</span>
              </div>
              {(Object.entries(riskProfile.risksByCategory) as [RiskCategory, { count: number; high: number; critical: number }][])
                .filter(([_, data]) => data.count > 0)
                .sort((a, b) => b[1].count - a[1].count)
                .slice(0, 3)
                .map(([category, data]) => {
                  const config = riskCategoryConfig[category];
                  return (
                    <div key={category} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #2A3A4D" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: config.color }} />
                        <span style={{ color: "#B8C5D3", fontSize: "13px" }}>{config.label}</span>
                      </div>
                      <div style={{ display: "flex", gap: "24px" }}>
                        <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{data.count}</span>
                        <span style={{ color: "#E74C3C", fontSize: "14px", fontWeight: "600" }}>{data.high + data.critical}</span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
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
                <div style={{ width: isMobile ? "32px" : "40px", height: isMobile ? "32px" : "40px", borderRadius: "12px", backgroundColor: "rgba(231, 76, 60, 0.15)", border: "1px solid rgba(231, 76, 60, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={isMobile ? 16 : 20} style={{ color: "#E74C3C" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: isMobile ? "14px" : "18px", fontWeight: "600", color: "white", margin: 0 }}>
                    {isMobile ? "Compliance" : "Regulatory Compliance"}
                  </h1>
                  {!isMobile && <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>AI-powered compliance automation</p>}
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
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(6, 1fr)", gap: isMobile ? "8px" : "16px", marginBottom: isMobile ? "16px" : "24px" }}>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Building2 size={isMobile ? 14 : 18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Companies</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.totalCompanies}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Bot size={isMobile ? 14 : 18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>AI Agents</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.totalAgents}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Workflow size={isMobile ? 14 : 18} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Processes</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.totalProcesses}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Shield size={isMobile ? 14 : 18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Avg Score</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.avgComplianceScore}</div>
          </div>
          {!isMobile && (
            <>
              <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <Zap size={18} style={{ color: "#F1C40F" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Automation</span>
                </div>
                <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{globalStats.avgAutomation}%</div>
              </div>
              <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <FileText size={18} style={{ color: "#E67E22" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Monthly Docs</span>
                </div>
                <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{(globalStats.totalDocuments / 1000).toFixed(0)}K</div>
              </div>
            </>
          )}
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", gap: isMobile ? "12px" : "24px" }}>
          {/* Company Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div>
              <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Companies</h3>
              {renderCompanyList()}
            </div>
          )}

          {/* Main Content */}
          <div style={{ backgroundColor: "#1A2738", borderRadius: "12px", border: "1px solid #2A3A4D", overflow: "hidden" }}>
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
            )}

            {/* Tabs */}
            <div style={{
              display: "flex",
              borderBottom: "1px solid #2A3A4D",
              padding: isMobile ? "0 8px" : "0 24px",
              overflowX: isMobile ? "auto" : "visible",
            }}>
              {(["overview", "risks", "agents", "processes", "frameworks"] as const).map((tab) => (
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
                    textTransform: "capitalize",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: isMobile ? "16px" : "24px", maxHeight: isMobile ? "none" : "calc(100vh - 380px)", overflowY: "auto" }}>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "risks" && renderRiskOverview()}
              {activeTab === "agents" && renderAgents()}
              {activeTab === "processes" && renderProcesses()}
              {activeTab === "frameworks" && renderFrameworks()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
