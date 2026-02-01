"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  FileText,
  Database,
  MessageSquare,
  Scale,
  BarChart3,
  Bot,
  Mail,
  Users,
  ClipboardCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  ArrowRight,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Eye,
  X,
  Send,
  ThumbsUp,
  ThumbsDown,
  Edit,
  Copy,
} from "lucide-react";

interface DownstreamProcess {
  id: string;
  name: string;
  type: "manual" | "automated" | "ai_assisted";
  status: "completed" | "in_progress" | "pending";
  assignee?: string;
  agent?: string;
  description: string;
  icon: any;
  color: string;
  emailTemplate?: {
    to: string;
    subject: string;
    body: string;
  };
  approvalRequired?: boolean;
  aiAction?: string;
}

export default function RiskWorkflowPage() {
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [selectedProcess, setSelectedProcess] = useState<DownstreamProcess | null>(null);
  const [emailSent, setEmailSent] = useState<Record<string, boolean>>({});
  const [approved, setApproved] = useState<Record<string, boolean | null>>({});
  const [allApproved, setAllApproved] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [riskScore, setRiskScore] = useState(18);

  // Demo data for R-004
  const riskData = {
    id: "R-004",
    category: "Legal",
    description: "Class action lawsuit on mortgage lending practices",
    score: riskScore,
    status: allApproved ? "Mitigating" : "Active",
    severity: allApproved ? "Major" : "Severe",
    likelihood: allApproved ? "High" : "Extreme",
    owner: "General Counsel",
  };

  const handleApproveAll = () => {
    setAllApproved(true);
    setRiskScore(10);
    setShowNotification(true);
    // Auto-hide notification after 5 seconds
    setTimeout(() => setShowNotification(false), 5000);
  };

  const inputSources = [
    { id: "src-1", name: "Court Filings", icon: Scale, color: "#E74C3C", records: "234 documents", lastSync: "2 hrs ago" },
    { id: "src-2", name: "Customer Complaints", icon: MessageSquare, color: "#3498DB", records: "1,847 records", lastSync: "30 min ago" },
    { id: "src-3", name: "Loan Documentation", icon: FileText, color: "#2ECC71", records: "45,230 files", lastSync: "1 hr ago" },
    { id: "src-4", name: "Regulatory Correspondence", icon: Database, color: "#F1C40F", records: "89 threads", lastSync: "4 hrs ago" },
  ];

  const mlModel = {
    name: "LegalRisk-Analyzer",
    type: "Document Analysis & NLP",
    accuracy: 91.3,
    predictions: [
      { label: "Lawsuit Outcome Risk", value: 78, color: "#E74C3C" },
      { label: "Settlement Probability", value: 65, color: "#F1C40F" },
      { label: "Regulatory Action Risk", value: 42, color: "#E67E22" },
      { label: "Reputational Impact", value: 71, color: "#9B59B6" },
    ],
    lastRun: "2024-04-17 09:30 AM",
    processingTime: "4.2 seconds",
  };

  const downstreamProcesses: DownstreamProcess[] = [
    { 
      id: "proc-1", 
      name: "Legal Defense Preparation", 
      type: "manual", 
      status: "in_progress",
      assignee: "Legal Team",
      description: "Prepare comprehensive legal defense strategy",
      icon: Scale,
      color: "#E74C3C",
    },
    { 
      id: "proc-2", 
      name: "Document Collection & Review", 
      type: "ai_assisted", 
      status: "completed",
      agent: "DocReview AI",
      description: "AI-powered document scanning and relevance scoring",
      icon: FileText,
      color: "#3498DB",
      approvalRequired: true,
      aiAction: "Scan and classify 45,230 loan documents for relevance to the lawsuit. Flag high-priority documents for legal review.",
    },
    { 
      id: "proc-3", 
      name: "Stakeholder Notification", 
      type: "automated", 
      status: "completed",
      agent: "NotifyBot",
      description: "Automated emails to board members and key stakeholders",
      icon: Mail,
      color: "#2ECC71",
      emailTemplate: {
        to: "board@royalbank.com, executives@royalbank.com",
        subject: "URGENT: Legal Risk Alert - Class Action Lawsuit Update (R-004)",
        body: `Dear Board Members and Executive Team,

This is an automated notification regarding Risk R-004: Class action lawsuit on mortgage lending practices.

RISK SUMMARY:
• Risk Score: 18 (High)
• Status: Active
• Severity: Severe
• Likelihood: Extreme

KEY UPDATES:
• New court filings received on April 17, 2024
• Settlement probability assessed at 65%
• Recommended reserve: $45M - $75M

REQUIRED ACTIONS:
1. Emergency board meeting scheduled for April 22, 2024
2. Legal team preparing comprehensive defense strategy
3. Customer communication plan under development

Please review the attached briefing document and confirm your availability for the emergency meeting.

Best regards,
Risk Management AI System
Royal Bank of Canada`
      },
    },
    { 
      id: "proc-4", 
      name: "Settlement Analysis", 
      type: "ai_assisted", 
      status: "in_progress",
      agent: "SettlementCalc AI",
      description: "AI-driven settlement range calculation and scenario modeling",
      icon: BarChart3,
      color: "#F1C40F",
      approvalRequired: true,
      aiAction: "Run Monte Carlo simulation with 10,000 iterations to calculate optimal settlement range. Analyze comparable cases and generate recommendation report.",
    },
    { 
      id: "proc-5", 
      name: "Customer Communication", 
      type: "automated", 
      status: "pending",
      agent: "CommsBot",
      description: "Automated response templates and communication tracking",
      icon: MessageSquare,
      color: "#9B59B6",
      approvalRequired: true,
      emailTemplate: {
        to: "affected-customers@distribution-list.royalbank.com",
        subject: "Important Information About Your Mortgage Account",
        body: `Dear Valued Customer,

We are writing to inform you about a legal matter that may affect your mortgage account with Royal Bank of Canada.

WHAT THIS MEANS FOR YOU:
We are committed to treating all our customers fairly and transparently. While this legal matter is being resolved, please be assured that:

• Your mortgage terms remain unchanged
• Your account is fully protected
• Our customer service team is available to answer any questions

NEXT STEPS:
If you have any concerns or questions, please contact our dedicated support line at 1-800-XXX-XXXX or email mortgage-support@royalbank.com.

We value your trust and will keep you informed of any developments that may affect your account.

Sincerely,
Customer Relations Team
Royal Bank of Canada`
      },
    },
    { 
      id: "proc-6", 
      name: "Board Briefing Preparation", 
      type: "manual", 
      status: "pending",
      assignee: "Executive Assistant",
      description: "Prepare executive summary and board presentation",
      icon: Users,
      color: "#E67E22",
    },
    { 
      id: "proc-7", 
      name: "Compliance Audit Trigger", 
      type: "automated", 
      status: "completed",
      agent: "AuditTrigger",
      description: "Automatically initiated internal compliance review",
      icon: ClipboardCheck,
      color: "#1ABC9C",
      approvalRequired: true,
      aiAction: "Initiate comprehensive internal audit of mortgage lending practices. Generate audit checklist and assign review tasks to compliance team.",
    },
    { 
      id: "proc-8", 
      name: "Vendor/Supplier Alert", 
      type: "automated", 
      status: "pending",
      agent: "VendorComms AI",
      description: "Notify relevant third-party vendors and suppliers",
      icon: Mail,
      color: "#E74C3C",
      approvalRequired: true,
      emailTemplate: {
        to: "legal-partners@lawfirm.com, insurance@provider.com",
        subject: "Notice: Potential Legal Exposure - Royal Bank Mortgage Litigation",
        body: `Dear Partner,

This notice is to inform you of a developing legal matter that may require your attention and support.

CASE REFERENCE: R-004
MATTER: Class action lawsuit - Mortgage lending practices
CURRENT STATUS: Active litigation

YOUR POTENTIAL INVOLVEMENT:
As a key partner in our legal/insurance network, we are providing advance notice to ensure preparedness for potential support requirements.

REQUESTED ACTIONS:
1. Review current service agreements for applicable coverage
2. Confirm availability for potential engagement
3. Provide preliminary capacity assessment by April 25, 2024

Please treat this communication as confidential. A formal engagement request will follow if your services are required.

Best regards,
Legal Operations
Royal Bank of Canada`
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "#2ECC71";
      case "in_progress": return "#F1C40F";
      case "pending": return "#6B7A8C";
      default: return "#6B7A8C";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed": return "Completed";
      case "in_progress": return "In Progress";
      case "pending": return "Pending";
      default: return status;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "manual": return "Manual";
      case "automated": return "AI Automated";
      case "ai_assisted": return "AI Assisted";
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "manual": return "#6B7A8C";
      case "automated": return "#2ECC71";
      case "ai_assisted": return "#9B59B6";
      default: return "#6B7A8C";
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0A1628" }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: "#0D1B2A", 
        borderBottom: "1px solid #1E3A5F",
        padding: "16px 24px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link 
              href="/modules/regulatory"
              style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px", 
                color: "#6B7A8C", 
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "8px",
                backgroundColor: "#162032",
                border: "1px solid #2A3A4D",
              }}
            >
              <ArrowLeft size={18} />
              <span style={{ fontSize: "13px" }}>Back to Risks</span>
            </Link>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ 
                  padding: "4px 10px", 
                  backgroundColor: "rgba(231, 76, 60, 0.15)", 
                  borderRadius: "6px",
                  color: "#E74C3C",
                  fontSize: "12px",
                  fontWeight: "600",
                }}>
                  {riskData.id}
                </span>
                <h1 style={{ color: "white", fontSize: "18px", fontWeight: "600", margin: 0 }}>
                  Risk Workflow Dashboard
                </h1>
                <span style={{ 
                  padding: "4px 10px", 
                  backgroundColor: "rgba(241, 196, 15, 0.15)", 
                  borderRadius: "6px",
                  color: "#F1C40F",
                  fontSize: "11px",
                  fontWeight: "500",
                }}>
                  Demo Page - R-004 Only
                </span>
              </div>
              <p style={{ color: "#6B7A8C", fontSize: "13px", margin: "4px 0 0 0" }}>
                {riskData.description}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <button
              onClick={() => setWorkflowRunning(!workflowRunning)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "8px",
                backgroundColor: workflowRunning ? "rgba(231, 76, 60, 0.15)" : "rgba(46, 204, 113, 0.15)",
                border: `1px solid ${workflowRunning ? "#E74C3C" : "#2ECC71"}`,
                color: workflowRunning ? "#E74C3C" : "#2ECC71",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "600",
              }}
            >
              {workflowRunning ? <Pause size={16} /> : <Play size={16} />}
              {workflowRunning ? "Pause Workflow" : "Run Workflow"}
            </button>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 16px",
                borderRadius: "8px",
                backgroundColor: "#162032",
                border: "1px solid #2A3A4D",
                color: "#6B7A8C",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              <Settings size={16} />
              Configure
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ padding: "24px" }}>
        {/* Risk Summary Bar */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(5, 1fr)", 
          gap: "16px", 
          marginBottom: "24px" 
        }}>
          {/* Risk Score - Special handling */}
          <div style={{ 
            backgroundColor: "#162032", 
            borderRadius: "10px", 
            padding: "14px 16px",
            border: allApproved ? "1px solid #2ECC71" : "1px solid #2A3A4D",
            transition: "all 0.3s ease",
          }}>
            <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Risk Score</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ 
                color: allApproved ? "#F1C40F" : "#E74C3C", 
                fontSize: "20px", 
                fontWeight: "700",
                transition: "all 0.3s ease",
              }}>
                {riskData.score}
              </span>
              {allApproved && (
                <span style={{ 
                  color: "#2ECC71", 
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                }}>
                  <span style={{ fontSize: "14px" }}>↓</span> from 18
                </span>
              )}
            </div>
          </div>
          {[
            { label: "Status", value: riskData.status, color: allApproved ? "#2ECC71" : "#F1C40F" },
            { label: "Severity", value: riskData.severity, color: allApproved ? "#F1C40F" : "#E74C3C" },
            { label: "Likelihood", value: riskData.likelihood, color: allApproved ? "#F1C40F" : "#E67E22" },
            { label: "Owner", value: riskData.owner, color: "#3498DB" },
          ].map((item, idx) => (
            <div key={idx} style={{ 
              backgroundColor: "#162032", 
              borderRadius: "10px", 
              padding: "14px 16px",
              border: "1px solid #2A3A4D",
            }}>
              <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>{item.label}</span>
              <span style={{ color: item.color, fontSize: "16px", fontWeight: "600" }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Workflow Visualization */}
        <div style={{ display: "flex", gap: "20px", alignItems: "stretch" }}>
          
          {/* Input Sources */}
          <div style={{ 
            flex: "0 0 220px",
            backgroundColor: "#162032", 
            borderRadius: "12px", 
            border: "1px solid #2A3A4D",
            padding: "16px",
          }}>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Database size={16} style={{ color: "#3498DB" }} />
              Input Sources
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {inputSources.map((source) => {
                const Icon = source.icon;
                return (
                  <div 
                    key={source.id}
                    style={{ 
                      backgroundColor: "#0A1628", 
                      borderRadius: "8px", 
                      padding: "12px",
                      border: "1px solid #2A3A4D",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = source.color}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "#2A3A4D"}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <div style={{ 
                        width: "28px", 
                        height: "28px", 
                        borderRadius: "6px", 
                        backgroundColor: `${source.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}>
                        <Icon size={14} style={{ color: source.color }} />
                      </div>
                      <span style={{ color: "white", fontSize: "12px", fontWeight: "500" }}>{source.name}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ color: "#6B7A8C", fontSize: "10px" }}>{source.records}</span>
                      <span style={{ color: "#2ECC71", fontSize: "10px" }}>● {source.lastSync}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: "flex", alignItems: "center", color: "#3498DB" }}>
            <div style={{ 
              width: "40px", 
              height: "2px", 
              backgroundColor: "#3498DB",
              position: "relative",
            }}>
              <ArrowRight size={20} style={{ position: "absolute", right: "-10px", top: "-9px" }} />
            </div>
          </div>

          {/* ML Model */}
          <div style={{ 
            flex: "0 0 280px",
            backgroundColor: "#162032", 
            borderRadius: "12px", 
            border: "1px solid #F1C40F",
            padding: "16px",
          }}>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <BarChart3 size={16} style={{ color: "#F1C40F" }} />
              ML Risk Prediction
            </h3>
            <div style={{ 
              backgroundColor: "#0A1628", 
              borderRadius: "8px", 
              padding: "14px",
              marginBottom: "12px",
              border: "1px solid #2A3A4D",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <div>
                  <h4 style={{ color: "#F1C40F", fontSize: "14px", fontWeight: "600", margin: 0 }}>{mlModel.name}</h4>
                  <span style={{ color: "#6B7A8C", fontSize: "11px" }}>{mlModel.type}</span>
                </div>
                <span style={{ 
                  padding: "3px 8px", 
                  backgroundColor: "rgba(46, 204, 113, 0.15)", 
                  borderRadius: "4px",
                  color: "#2ECC71",
                  fontSize: "11px",
                  fontWeight: "600",
                }}>
                  {mlModel.accuracy}% Accuracy
                </span>
              </div>
              <div style={{ display: "flex", gap: "8px", fontSize: "10px", color: "#6B7A8C" }}>
                <span>Last: {mlModel.lastRun}</span>
                <span>•</span>
                <span>{mlModel.processingTime}</span>
              </div>
            </div>

            <h5 style={{ color: "#B8C5D3", fontSize: "11px", fontWeight: "600", marginBottom: "10px" }}>Risk Predictions</h5>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {mlModel.predictions.map((pred, idx) => (
                <div key={idx}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ color: "#B8C5D3", fontSize: "11px" }}>{pred.label}</span>
                    <span style={{ color: pred.color, fontSize: "11px", fontWeight: "600" }}>{pred.value}%</span>
                  </div>
                  <div style={{ 
                    height: "4px", 
                    backgroundColor: "#0A1628", 
                    borderRadius: "2px",
                    overflow: "hidden",
                  }}>
                    <div style={{ 
                      width: `${pred.value}%`, 
                      height: "100%", 
                      backgroundColor: pred.color,
                      borderRadius: "2px",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ display: "flex", alignItems: "center", color: "#9B59B6" }}>
            <div style={{ 
              width: "40px", 
              height: "2px", 
              backgroundColor: "#9B59B6",
              position: "relative",
            }}>
              <ArrowRight size={20} style={{ position: "absolute", right: "-10px", top: "-9px" }} />
            </div>
          </div>

          {/* Downstream Processes */}
          <div style={{ 
            flex: 1,
            backgroundColor: "#162032", 
            borderRadius: "12px", 
            border: "1px solid #2A3A4D",
            padding: "16px",
          }}>
            <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={16} style={{ color: "#9B59B6" }} />
              Downstream Mitigation Processes
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
              {downstreamProcesses.map((proc) => {
                const Icon = proc.icon;
                return (
                  <div 
                    key={proc.id}
                    style={{ 
                      backgroundColor: "#0A1628", 
                      borderRadius: "8px", 
                      padding: "12px",
                      border: `1px solid ${activeNode === proc.id ? proc.color : "#2A3A4D"}`,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onClick={() => setSelectedProcess(proc)}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                      <div style={{ 
                        width: "32px", 
                        height: "32px", 
                        borderRadius: "8px", 
                        backgroundColor: `${proc.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        <Icon size={16} style={{ color: proc.color }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
                          <h5 style={{ color: "white", fontSize: "12px", fontWeight: "600", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {proc.name}
                          </h5>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                          <span style={{ 
                            padding: "2px 6px", 
                            backgroundColor: `${getTypeColor(proc.type)}15`,
                            borderRadius: "3px",
                            color: getTypeColor(proc.type),
                            fontSize: "9px",
                            fontWeight: "600",
                          }}>
                            {proc.type === "automated" && <Bot size={8} style={{ marginRight: "3px", display: "inline" }} />}
                            {getTypeLabel(proc.type)}
                          </span>
                          <span style={{ 
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            color: getStatusColor(proc.status),
                            fontSize: "9px",
                            fontWeight: "500",
                          }}>
                            {proc.status === "completed" && <CheckCircle size={10} />}
                            {proc.status === "in_progress" && <RefreshCw size={10} />}
                            {proc.status === "pending" && <Clock size={10} />}
                            {getStatusLabel(proc.status)}
                          </span>
                        </div>
                        <p style={{ color: "#6B7A8C", fontSize: "10px", margin: 0, lineHeight: "1.4" }}>
                          {proc.description}
                        </p>
                        {proc.type !== "manual" && (
                          <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Bot size={10} style={{ color: "#9B59B6" }} />
                            <span style={{ color: "#9B59B6", fontSize: "10px" }}>{proc.agent}</span>
                          </div>
                        )}
                        {proc.type === "manual" && (
                          <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "4px" }}>
                            <Users size={10} style={{ color: "#6B7A8C" }} />
                            <span style={{ color: "#B8C5D3", fontSize: "10px" }}>{proc.assignee}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Categories */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(3, 1fr)", 
          gap: "20px", 
          marginTop: "24px" 
        }}>
          {/* 1. Confirmed AI Automated Steps */}
          <div style={{ 
            backgroundColor: "#162032", 
            borderRadius: "12px", 
            padding: "20px",
            border: "1px solid #2ECC71",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "10px", 
                  backgroundColor: "rgba(46, 204, 113, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <CheckCircle size={20} style={{ color: "#2ECC71" }} />
                </div>
                <div>
                  <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>Confirmed AI Steps</h4>
                  <span style={{ color: "#2ECC71", fontSize: "12px" }}>Automated & Complete</span>
                </div>
              </div>
              <span style={{ 
                padding: "6px 12px", 
                backgroundColor: "rgba(46, 204, 113, 0.15)", 
                borderRadius: "20px",
                color: "#2ECC71",
                fontSize: "14px",
                fontWeight: "700",
              }}>
                3
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { id: "proc-2", name: "Document Collection & Review", agent: "DocReview AI" },
                { id: "proc-3", name: "Stakeholder Notification", agent: "NotifyBot" },
                { id: "proc-7", name: "Compliance Audit Trigger", agent: "AuditTrigger" },
              ].map((item, idx) => {
                const proc = downstreamProcesses.find(p => p.id === item.id);
                return (
                  <div 
                    key={idx} 
                    onClick={() => proc && setSelectedProcess(proc)}
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      padding: "10px 12px",
                      backgroundColor: "#0A1628",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#2ECC71"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                  >
                    <CheckCircle size={14} style={{ color: "#2ECC71" }} />
                    <div style={{ flex: 1 }}>
                      <span style={{ color: "#B8C5D3", fontSize: "12px", display: "block" }}>{item.name}</span>
                      <span style={{ color: "#6B7A8C", fontSize: "10px" }}>{item.agent}</span>
                    </div>
                    <Eye size={14} style={{ color: "#6B7A8C" }} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Approval Required */}
          <div style={{ 
            backgroundColor: "#162032", 
            borderRadius: "12px", 
            padding: "20px",
            border: `1px solid ${allApproved ? "#2ECC71" : "#F1C40F"}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "10px", 
                  backgroundColor: allApproved ? "rgba(46, 204, 113, 0.15)" : "rgba(241, 196, 15, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {allApproved ? (
                    <CheckCircle size={20} style={{ color: "#2ECC71" }} />
                  ) : (
                    <AlertTriangle size={20} style={{ color: "#F1C40F" }} />
                  )}
                </div>
                <div>
                  <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>Approval Required</h4>
                  <span style={{ color: allApproved ? "#2ECC71" : "#F1C40F", fontSize: "12px" }}>
                    {allApproved ? "All Approved" : "Awaiting Your Decision"}
                  </span>
                </div>
              </div>
              <span style={{ 
                padding: "6px 12px", 
                backgroundColor: allApproved ? "rgba(46, 204, 113, 0.15)" : "rgba(241, 196, 15, 0.15)", 
                borderRadius: "20px",
                color: allApproved ? "#2ECC71" : "#F1C40F",
                fontSize: "14px",
                fontWeight: "700",
              }}>
                3
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "14px" }}>
              {[
                { id: "proc-4", name: "Settlement Analysis", agent: "SettlementCalc AI", action: "Run Monte Carlo simulation" },
                { id: "proc-5", name: "Customer Communication", agent: "CommsBot", action: "Send customer notifications" },
                { id: "proc-8", name: "Vendor/Supplier Alert", agent: "VendorComms AI", action: "Notify legal partners" },
              ].map((item, idx) => {
                const proc = downstreamProcesses.find(p => p.id === item.id);
                return (
                  <div 
                    key={idx} 
                    onClick={() => proc && setSelectedProcess(proc)}
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      padding: "10px 12px",
                      backgroundColor: "#0A1628",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: "1px solid transparent",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "#F1C40F"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}
                  >
                    {allApproved ? (
                      <CheckCircle size={14} style={{ color: "#2ECC71" }} />
                    ) : (
                      <Clock size={14} style={{ color: "#F1C40F" }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <span style={{ color: "#B8C5D3", fontSize: "12px", display: "block" }}>{item.name}</span>
                      <span style={{ color: "#6B7A8C", fontSize: "10px" }}>{item.action}</span>
                    </div>
                    <Eye size={14} style={{ color: "#6B7A8C" }} />
                  </div>
                );
              })}
            </div>
            {!allApproved ? (
              <button
                onClick={handleApproveAll}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "12px",
                  borderRadius: "8px",
                  backgroundColor: "#F1C40F",
                  border: "none",
                  color: "#0A1628",
                  cursor: "pointer",
                  fontSize: "13px",
                  fontWeight: "700",
                }}
              >
                <ThumbsUp size={16} />
                Approve All AI Actions
              </button>
            ) : (
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                gap: "8px",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor: "rgba(46, 204, 113, 0.15)",
                border: "1px solid #2ECC71",
              }}>
                <CheckCircle size={16} style={{ color: "#2ECC71" }} />
                <span style={{ color: "#2ECC71", fontSize: "13px", fontWeight: "600" }}>All Actions Approved</span>
              </div>
            )}
          </div>

          {/* 3. Manual Steps Required */}
          <div style={{ 
            backgroundColor: "#162032", 
            borderRadius: "12px", 
            padding: "20px",
            border: "1px solid #6B7A8C",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "10px", 
                  backgroundColor: "rgba(107, 122, 140, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Users size={20} style={{ color: "#6B7A8C" }} />
                </div>
                <div>
                  <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>Manual Steps Required</h4>
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Human Action Needed</span>
                </div>
              </div>
              <span style={{ 
                padding: "6px 12px", 
                backgroundColor: "rgba(107, 122, 140, 0.15)", 
                borderRadius: "20px",
                color: "#B8C5D3",
                fontSize: "14px",
                fontWeight: "700",
              }}>
                2
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {[
                { id: "proc-1", name: "Legal Defense Preparation", assignee: "Legal Team", priority: "high", status: allApproved ? "Next Step" : "Waiting" },
                { id: "proc-6", name: "Board Briefing Preparation", assignee: "Executive Assistant", priority: "medium", status: allApproved ? "Upcoming" : "Waiting" },
              ].map((item, idx) => {
                const proc = downstreamProcesses.find(p => p.id === item.id);
                return (
                  <div 
                    key={idx} 
                    onClick={() => proc && setSelectedProcess(proc)}
                    style={{ 
                      display: "flex", 
                      alignItems: "center", 
                      gap: "10px",
                      padding: "10px 12px",
                      backgroundColor: allApproved && idx === 0 ? "rgba(52, 152, 219, 0.1)" : "#0A1628",
                      borderRadius: "8px",
                      border: allApproved && idx === 0 ? "1px solid #3498DB" : "1px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!(allApproved && idx === 0)) e.currentTarget.style.borderColor = "#6B7A8C";
                    }}
                    onMouseLeave={(e) => {
                      if (!(allApproved && idx === 0)) e.currentTarget.style.borderColor = "transparent";
                    }}
                  >
                    {allApproved && idx === 0 ? (
                      <ArrowRight size={14} style={{ color: "#3498DB" }} />
                    ) : (
                      <Clock size={14} style={{ color: "#6B7A8C" }} />
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ color: "#B8C5D3", fontSize: "12px" }}>{item.name}</span>
                        {allApproved && idx === 0 && (
                          <span style={{ 
                            padding: "2px 6px", 
                            backgroundColor: "#3498DB", 
                            borderRadius: "3px",
                            color: "white",
                            fontSize: "9px",
                            fontWeight: "600",
                          }}>
                            NEXT
                          </span>
                        )}
                      </div>
                      <span style={{ color: "#6B7A8C", fontSize: "10px" }}>Assigned: {item.assignee}</span>
                    </div>
                    <span style={{ 
                      padding: "3px 8px", 
                      backgroundColor: item.priority === "high" ? "rgba(231, 76, 60, 0.15)" : "rgba(241, 196, 15, 0.15)",
                      borderRadius: "4px",
                      color: item.priority === "high" ? "#E74C3C" : "#F1C40F",
                      fontSize: "9px",
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}>
                      {item.priority}
                    </span>
                    <Eye size={14} style={{ color: "#6B7A8C" }} />
                  </div>
                );
              })}
            </div>
            {allApproved && (
              <div style={{ 
                marginTop: "14px",
                padding: "12px",
                backgroundColor: "rgba(52, 152, 219, 0.1)",
                borderRadius: "8px",
                border: "1px solid rgba(52, 152, 219, 0.3)",
              }}>
                <span style={{ color: "#3498DB", fontSize: "11px", display: "block", marginBottom: "4px", fontWeight: "600" }}>
                  Next Action Required:
                </span>
                <span style={{ color: "#B8C5D3", fontSize: "12px" }}>
                  Legal Team should begin defense preparation with updated settlement analysis data.
                </span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Process Detail Modal */}
      {selectedProcess && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
          onClick={() => setSelectedProcess(null)}
        >
          <div
            style={{
              backgroundColor: "#1A2738",
              borderRadius: "16px",
              border: `1px solid ${selectedProcess.color}`,
              padding: "24px",
              maxWidth: "700px",
              width: "90%",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ 
                  width: "48px", 
                  height: "48px", 
                  borderRadius: "12px", 
                  backgroundColor: `${selectedProcess.color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <selectedProcess.icon size={24} style={{ color: selectedProcess.color }} />
                </div>
                <div>
                  <h3 style={{ color: "white", fontSize: "18px", fontWeight: "700", margin: 0 }}>{selectedProcess.name}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <span style={{ 
                      padding: "3px 8px", 
                      backgroundColor: `${getTypeColor(selectedProcess.type)}15`,
                      borderRadius: "4px",
                      color: getTypeColor(selectedProcess.type),
                      fontSize: "11px",
                      fontWeight: "600",
                    }}>
                      {selectedProcess.type === "automated" || selectedProcess.type === "ai_assisted" ? <Bot size={10} style={{ marginRight: "4px", display: "inline" }} /> : null}
                      {getTypeLabel(selectedProcess.type)}
                    </span>
                    <span style={{ 
                      padding: "3px 8px", 
                      backgroundColor: `${getStatusColor(selectedProcess.status)}15`,
                      borderRadius: "4px",
                      color: getStatusColor(selectedProcess.status),
                      fontSize: "11px",
                      fontWeight: "600",
                    }}>
                      {getStatusLabel(selectedProcess.status)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedProcess(null)}
                style={{
                  width: "36px",
                  height: "36px",
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

            {/* Description */}
            <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.6", marginBottom: "20px" }}>
              {selectedProcess.description}
            </p>

            {/* Agent/Assignee Info */}
            <div style={{ 
              backgroundColor: "#0A1628", 
              borderRadius: "10px", 
              padding: "14px", 
              marginBottom: "20px",
              border: "1px solid #2A3A4D",
            }}>
              {selectedProcess.type !== "manual" ? (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Bot size={20} style={{ color: "#9B59B6" }} />
                  <div>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block" }}>AI Agent</span>
                    <span style={{ color: "#9B59B6", fontSize: "14px", fontWeight: "600" }}>{selectedProcess.agent}</span>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Users size={20} style={{ color: "#6B7A8C" }} />
                  <div>
                    <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block" }}>Assigned To</span>
                    <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{selectedProcess.assignee}</span>
                  </div>
                </div>
              )}
            </div>

            {/* AI Action Approval Section */}
            {selectedProcess.aiAction && selectedProcess.approvalRequired && (
              <div style={{ marginBottom: "20px" }}>
                <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                  <Bot size={16} style={{ color: "#9B59B6" }} />
                  AI Action Requiring Approval
                </h4>
                <div style={{ 
                  backgroundColor: "rgba(155, 89, 182, 0.1)", 
                  borderRadius: "10px", 
                  padding: "16px",
                  border: "1px solid rgba(155, 89, 182, 0.3)",
                  marginBottom: "12px",
                }}>
                  <p style={{ color: "#D7BDE2", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                    {selectedProcess.aiAction}
                  </p>
                </div>
                
                {approved[selectedProcess.id] === undefined || approved[selectedProcess.id] === null ? (
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      onClick={() => setApproved({ ...approved, [selectedProcess.id]: true })}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(46, 204, 113, 0.15)",
                        border: "1px solid #2ECC71",
                        color: "#2ECC71",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      <ThumbsUp size={16} />
                      Approve AI Action
                    </button>
                    <button
                      onClick={() => setApproved({ ...approved, [selectedProcess.id]: false })}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px",
                        borderRadius: "8px",
                        backgroundColor: "rgba(231, 76, 60, 0.15)",
                        border: "1px solid #E74C3C",
                        color: "#E74C3C",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "600",
                      }}
                    >
                      <ThumbsDown size={16} />
                      Reject
                    </button>
                  </div>
                ) : (
                  <div style={{ 
                    padding: "12px", 
                    borderRadius: "8px", 
                    backgroundColor: approved[selectedProcess.id] ? "rgba(46, 204, 113, 0.15)" : "rgba(231, 76, 60, 0.15)",
                    border: `1px solid ${approved[selectedProcess.id] ? "#2ECC71" : "#E74C3C"}`,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    {approved[selectedProcess.id] ? (
                      <>
                        <CheckCircle size={20} style={{ color: "#2ECC71" }} />
                        <span style={{ color: "#2ECC71", fontSize: "14px", fontWeight: "600" }}>AI Action Approved - Executing...</span>
                      </>
                    ) : (
                      <>
                        <X size={20} style={{ color: "#E74C3C" }} />
                        <span style={{ color: "#E74C3C", fontSize: "14px", fontWeight: "600" }}>AI Action Rejected</span>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Email Template Section */}
            {selectedProcess.emailTemplate && (
              <div style={{ marginBottom: "20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px", margin: 0 }}>
                    <Mail size={16} style={{ color: "#3498DB" }} />
                    Email Template
                  </h4>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      backgroundColor: "#0A1628",
                      border: "1px solid #2A3A4D",
                      color: "#6B7A8C",
                      cursor: "pointer",
                      fontSize: "11px",
                    }}
                  >
                    <Edit size={12} />
                    Edit Template
                  </button>
                </div>
                
                <div style={{ 
                  backgroundColor: "#0A1628", 
                  borderRadius: "10px", 
                  border: "1px solid #2A3A4D",
                  overflow: "hidden",
                }}>
                  {/* Email Header */}
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid #2A3A4D" }}>
                    <div style={{ marginBottom: "8px" }}>
                      <span style={{ color: "#6B7A8C", fontSize: "11px", marginRight: "8px" }}>To:</span>
                      <span style={{ color: "#3498DB", fontSize: "12px" }}>{selectedProcess.emailTemplate.to}</span>
                    </div>
                    <div>
                      <span style={{ color: "#6B7A8C", fontSize: "11px", marginRight: "8px" }}>Subject:</span>
                      <span style={{ color: "white", fontSize: "12px", fontWeight: "500" }}>{selectedProcess.emailTemplate.subject}</span>
                    </div>
                  </div>
                  
                  {/* Email Body */}
                  <div style={{ padding: "16px", maxHeight: "200px", overflowY: "auto" }}>
                    <pre style={{ 
                      color: "#B8C5D3", 
                      fontSize: "12px", 
                      lineHeight: "1.6", 
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      fontFamily: "inherit",
                    }}>
                      {selectedProcess.emailTemplate.body}
                    </pre>
                  </div>
                </div>

                {/* Send Button */}
                <div style={{ marginTop: "12px", display: "flex", gap: "10px" }}>
                  {!emailSent[selectedProcess.id] ? (
                    <>
                      <button
                        onClick={() => setEmailSent({ ...emailSent, [selectedProcess.id]: true })}
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
                        }}
                      >
                        <Send size={16} />
                        Send Email
                      </button>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "12px 16px",
                          borderRadius: "8px",
                          backgroundColor: "#0A1628",
                          border: "1px solid #2A3A4D",
                          color: "#6B7A8C",
                          cursor: "pointer",
                          fontSize: "13px",
                        }}
                      >
                        <Copy size={16} />
                        Copy
                      </button>
                    </>
                  ) : (
                    <div style={{ 
                      flex: 1,
                      padding: "12px", 
                      borderRadius: "8px", 
                      backgroundColor: "rgba(46, 204, 113, 0.15)",
                      border: "1px solid #2ECC71",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                    }}>
                      <CheckCircle size={20} style={{ color: "#2ECC71" }} />
                      <span style={{ color: "#2ECC71", fontSize: "14px", fontWeight: "600" }}>Email Sent Successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Manual Process Actions */}
            {selectedProcess.type === "manual" && !selectedProcess.emailTemplate && !selectedProcess.aiAction && (
              <div style={{ 
                backgroundColor: "#0A1628", 
                borderRadius: "10px", 
                padding: "16px",
                border: "1px solid #2A3A4D",
              }}>
                <p style={{ color: "#6B7A8C", fontSize: "13px", margin: 0, textAlign: "center" }}>
                  This is a manual process assigned to <strong style={{ color: "white" }}>{selectedProcess.assignee}</strong>.
                  <br />
                  Track progress through your project management system.
                </p>
              </div>
            )}

            {/* Close Button */}
            <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
              <button
                onClick={() => setSelectedProcess(null)}
                style={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "#0A1628",
                  border: "1px solid #2A3A4D",
                  color: "#6B7A8C",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Toast */}
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "24px",
            right: "24px",
            backgroundColor: "#162032",
            borderRadius: "12px",
            border: "1px solid #2ECC71",
            padding: "20px 24px",
            maxWidth: "400px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
            zIndex: 300,
            animation: "slideIn 0.3s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{ 
              width: "44px", 
              height: "44px", 
              borderRadius: "10px", 
              backgroundColor: "rgba(46, 204, 113, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <CheckCircle size={24} style={{ color: "#2ECC71" }} />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ color: "#2ECC71", fontSize: "15px", fontWeight: "700", margin: "0 0 6px 0" }}>
                AI Actions Approved Successfully!
              </h4>
              <p style={{ color: "#B8C5D3", fontSize: "13px", lineHeight: "1.5", margin: "0 0 12px 0" }}>
                Risk score reduced from <strong style={{ color: "#E74C3C" }}>18</strong> to <strong style={{ color: "#F1C40F" }}>10</strong>. 
                AI agents are now executing mitigation tasks.
              </p>
              <div style={{ 
                backgroundColor: "#0A1628", 
                borderRadius: "8px", 
                padding: "12px",
                border: "1px solid #2A3A4D",
              }}>
                <span style={{ color: "#3498DB", fontSize: "11px", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                  NEXT MANUAL STEP:
                </span>
                <span style={{ color: "white", fontSize: "12px", fontWeight: "500" }}>
                  Legal Defense Preparation
                </span>
                <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginTop: "4px" }}>
                  Assigned to: Legal Team • Priority: High
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                backgroundColor: "transparent",
                border: "none",
                color: "#6B7A8C",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
