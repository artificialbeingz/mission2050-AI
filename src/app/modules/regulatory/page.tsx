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
} from "lucide-react";

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

export default function RegulatoryPage() {
  const [selectedCompany, setSelectedCompany] = useState<ComplianceCompany | null>(complianceCompanies[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "processes" | "frameworks">("overview");
  const [selectedAgent, setSelectedAgent] = useState<ComplianceAgent | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<DownstreamProcess | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<string | null>(null);

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
        <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
          {selectedCompany.description}
        </p>

        {/* Company Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
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
        <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>Compliance by Framework</h4>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
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
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "rgba(231, 76, 60, 0.15)", border: "1px solid rgba(231, 76, 60, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Shield size={20} style={{ color: "#E74C3C" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "18px", fontWeight: "600", color: "white", margin: 0 }}>Regulatory Compliance</h1>
                  <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>AI-powered compliance automation</p>
                </div>
              </div>
            </div>
            <Link href="/" style={{ display: "flex", alignItems: "center" }}>
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
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{globalStats.totalCompanies}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Bot size={18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>AI Agents</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{globalStats.totalAgents}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Workflow size={18} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Processes</span>
            </div>
            <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>{globalStats.totalProcesses}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Shield size={18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Avg Score</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: "26px", fontWeight: "700" }}>{globalStats.avgComplianceScore}</div>
          </div>
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
                    <span style={{ color: "#2A3A4D" }}>•</span>
                    <span style={{ color: "#6B7A8C", fontSize: "13px" }}>Regulated since {selectedCompany.regulatedSince}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Overall Score</span>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
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
            <div style={{ display: "flex", borderBottom: "1px solid #2A3A4D", padding: "0 24px" }}>
              {(["overview", "agents", "processes", "frameworks"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "14px 20px",
                    border: "none",
                    borderBottom: activeTab === tab ? "2px solid #3498DB" : "2px solid transparent",
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
            <div style={{ padding: "24px", maxHeight: "calc(100vh - 380px)", overflowY: "auto" }}>
              {activeTab === "overview" && renderOverview()}
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
