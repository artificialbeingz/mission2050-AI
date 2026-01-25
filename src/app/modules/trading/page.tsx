"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Bot,
  Cpu,
  Activity,
  BarChart3,
  LineChart as LineChartIcon,
  Layers,
  ArrowLeftRight,
  Newspaper,
  DollarSign,
  Zap,
  Clock,
  Target,
  ChevronRight,
  ChevronDown,
  Server,
  Gauge,
  Building2,
  PieChart as PieChartIcon,
  CheckCircle,
  AlertTriangle,
  Pause,
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
} from "recharts";

import {
  tradingFirms,
  marketAssets,
  TradingFirm,
  TradingAgent,
  GPUCluster,
  strategyConfig,
  assetClassConfig,
  performanceData,
  tradingVolumeData,
  gpuUtilizationData,
  generatePriceHistory,
  AgentStrategy,
  TradingCategory,
} from "@/data/aiTrading";

export default function TradingPage() {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();
  
  const [selectedFirm, setSelectedFirm] = useState<TradingFirm | null>(tradingFirms[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "agents" | "gpu" | "markets">("overview");
  const [selectedAgent, setSelectedAgent] = useState<TradingAgent | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<TradingCategory | "all">("all");
  const [selectedAsset, setSelectedAsset] = useState<string>("SHOP.TO");
  const [showMobileFirmList, setShowMobileFirmList] = useState(false);

  // Generate price history for selected asset
  const priceHistory = useMemo(() => {
    const asset = marketAssets.find(a => a.symbol === selectedAsset);
    if (!asset) return [];
    return generatePriceHistory(asset.price, 30, 0.03);
  }, [selectedAsset]);

  // Global stats
  const globalStats = useMemo(() => {
    return {
      totalFirms: tradingFirms.length,
      totalAgents: tradingFirms.reduce((sum, f) => sum + f.agents.length, 0),
      totalGPUs: tradingFirms.reduce((sum, f) => sum + f.totalGPUs, 0),
      totalAUM: tradingFirms.reduce((sum, f) => sum + f.aum, 0),
      avgYTD: Math.round(tradingFirms.reduce((sum, f) => sum + f.ytdReturn, 0) / tradingFirms.length * 10) / 10,
      dailyVolume: tradingFirms.reduce((sum, f) => sum + f.totalDailyVolume, 0),
    };
  }, []);

  // Filtered assets
  const filteredAssets = useMemo(() => {
    if (categoryFilter === "all") return marketAssets;
    return marketAssets.filter(a => a.category === categoryFilter);
  }, [categoryFilter]);

  // GPU summary for selected firm
  const gpuSummary = useMemo(() => {
    if (!selectedFirm) return { total: 0, available: 0, allocated: 0, maintenance: 0 };
    return selectedFirm.gpuClusters.reduce(
      (acc, cluster) => ({
        total: acc.total + cluster.totalGPUs,
        available: acc.available + cluster.availableGPUs,
        allocated: acc.allocated + cluster.allocatedGPUs,
        maintenance: acc.maintenance + cluster.maintenanceGPUs,
      }),
      { total: 0, available: 0, allocated: 0, maintenance: 0 }
    );
  }, [selectedFirm]);

  const getStrategyIcon = (strategy: AgentStrategy) => {
    const icons: Record<AgentStrategy, React.ElementType> = {
      technical: LineChartIcon,
      fundamental: BarChart3,
      news_sentiment: Newspaper,
      hybrid: Layers,
      arbitrage: ArrowLeftRight,
      market_making: Activity,
    };
    return icons[strategy] || Bot;
  };

  const renderFirmList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {tradingFirms.map((firm) => {
        const isSelected = selectedFirm?.id === firm.id;
        return (
          <div
            key={firm.id}
            onClick={() => {
              setSelectedFirm(firm);
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
                <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "2px" }}>{firm.name}</h3>
                <span style={{ color: "#6B7A8C", fontSize: "11px" }}>{firm.headquarters}</span>
              </div>
              <span style={{
                color: firm.ytdReturn >= 0 ? "#2ECC71" : "#E74C3C",
                fontSize: "14px",
                fontWeight: "700",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}>
                {firm.ytdReturn >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {firm.ytdReturn >= 0 ? "+" : ""}{firm.ytdReturn}%
              </span>
            </div>
            <div style={{ display: "flex", gap: "12px", fontSize: "11px" }}>
              <span style={{ color: "#3498DB" }}>{firm.agents.length} Agents</span>
              <span style={{ color: "#9B59B6" }}>{firm.totalGPUs} GPUs</span>
              <span style={{ color: "#F1C40F" }}>${firm.aum}M AUM</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderOverview = () => {
    if (!selectedFirm) return null;

    const agentStrategyData = Object.entries(
      selectedFirm.agents.reduce((acc, agent) => {
        acc[agent.strategy] = (acc[agent.strategy] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    ).map(([strategy, count]) => ({
      name: strategyConfig[strategy as AgentStrategy]?.label || strategy,
      value: count,
      color: strategyConfig[strategy as AgentStrategy]?.color || "#6B7A8C",
    }));

    return (
      <div>
        <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>
          {selectedFirm.description}
        </p>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(5, 1fr)", gap: isMobile ? "10px" : "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>AUM</div>
            <div style={{ color: "white", fontSize: isMobile ? "16px" : "22px", fontWeight: "700" }}>${selectedFirm.aum}M</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Daily Volume</div>
            <div style={{ color: "white", fontSize: isMobile ? "16px" : "22px", fontWeight: "700" }}>${selectedFirm.totalDailyVolume}M</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>Daily Trades</div>
            <div style={{ color: "white", fontSize: isMobile ? "16px" : "22px", fontWeight: "700" }}>{selectedFirm.avgDailyTrades.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>YTD Return</div>
            <div style={{ color: selectedFirm.ytdReturn >= 0 ? "#2ECC71" : "#E74C3C", fontSize: isMobile ? "16px" : "22px", fontWeight: "700" }}>
              {selectedFirm.ytdReturn >= 0 ? "+" : ""}{selectedFirm.ytdReturn}%
            </div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "16px", borderRadius: "10px", border: "1px solid #2A3A4D", gridColumn: isMobile ? "span 2" : "auto" }}>
            <div style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "11px", marginBottom: "6px" }}>AI Allocation</div>
            <div style={{ color: "#00D4AA", fontSize: isMobile ? "16px" : "22px", fontWeight: "700" }}>{selectedFirm.aiAllocation}%</div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr", gap: isMobile ? "16px" : "20px", marginBottom: "24px" }}>
          {/* Performance Chart */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Monthly Performance vs Benchmark</h4>
            <ResponsiveContainer width="100%" height={220}>
              <ComposedChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="month" stroke="#6B7A8C" fontSize={11} />
                <YAxis stroke="#6B7A8C" fontSize={11} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }}
                  labelStyle={{ color: "white" }}
                />
                <Legend />
                <Bar dataKey="return" name="AI Strategy" fill="#00D4AA" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="benchmark" name="Benchmark" stroke="#E74C3C" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Strategy Distribution */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Agent Strategies</h4>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={agentStrategyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {agentStrategyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {agentStrategyData.map((entry, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: entry.color }} />
                  <span style={{ color: "#B8C5D3", fontSize: "11px" }}>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trading Volume Chart */}
        <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>Intraday Trading Volume ($ Millions)</h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={tradingVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
              <XAxis dataKey="hour" stroke="#6B7A8C" fontSize={11} />
              <YAxis stroke="#6B7A8C" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              <Legend />
              <Area type="monotone" dataKey="stocks" name="Stocks" stackId="1" stroke="#3498DB" fill="#3498DB" fillOpacity={0.6} />
              <Area type="monotone" dataKey="commodities" name="Commodities" stackId="1" stroke="#E67E22" fill="#E67E22" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const renderAgents = () => {
    if (!selectedFirm) return null;

    return (
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: isMobile ? "16px" : "20px" }}>
        {/* Agent List */}
        <div>
          <h4 style={{ color: "white", fontSize: isMobile ? "14px" : "15px", fontWeight: "600", marginBottom: "16px" }}>
            Trading Agents ({selectedFirm.agents.length})
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {selectedFirm.agents.map((agent) => {
              const StrategyIcon = getStrategyIcon(agent.strategy);
              const isSelected = selectedAgent?.id === agent.id;
              const config = strategyConfig[agent.strategy];

              return (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  style={{
                    backgroundColor: isSelected ? `${config.color}15` : "#162032",
                    border: `1px solid ${isSelected ? config.color : "#2A3A4D"}`,
                    borderRadius: "10px",
                    padding: "16px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: `${config.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <StrategyIcon size={20} style={{ color: config.color }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                        <h5 style={{ color: "white", fontSize: "14px", fontWeight: "600", margin: 0 }}>{agent.name}</h5>
                        <span style={{
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "10px",
                          fontWeight: "500",
                          backgroundColor: agent.status === "active" ? "rgba(46, 204, 113, 0.15)" : "rgba(241, 196, 15, 0.15)",
                          color: agent.status === "active" ? "#2ECC71" : "#F1C40F",
                          textTransform: "capitalize",
                        }}>
                          {agent.status}
                        </span>
                      </div>
                      <span style={{ color: config.color, fontSize: "11px", fontWeight: "500" }}>{config.label}</span>
                      <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                        <span style={{ color: "#6B7A8C", fontSize: "11px" }}>
                          <span style={{ color: "#2ECC71" }}>{agent.winRate}%</span> win
                        </span>
                        <span style={{ color: "#6B7A8C", fontSize: "11px" }}>
                          <span style={{ color: "#00D4AA" }}>{agent.sharpeRatio}</span> Sharpe
                        </span>
                        <span style={{ color: "#6B7A8C", fontSize: "11px" }}>
                          <span style={{ color: "#3498DB" }}>+{agent.avgReturn}%</span>/mo
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
                <div style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  backgroundColor: `${strategyConfig[selectedAgent.strategy].color}20`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {(() => {
                    const Icon = getStrategyIcon(selectedAgent.strategy);
                    return <Icon size={24} style={{ color: strategyConfig[selectedAgent.strategy].color }} />;
                  })()}
                </div>
                <div>
                  <h4 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{selectedAgent.name}</h4>
                  <span style={{ color: strategyConfig[selectedAgent.strategy].color, fontSize: "13px", fontWeight: "500" }}>
                    {strategyConfig[selectedAgent.strategy].label}
                  </span>
                </div>
              </div>

              <p style={{ color: "#8B9CAD", fontSize: "13px", lineHeight: "1.6", marginBottom: "20px" }}>{selectedAgent.description}</p>

              {/* Performance Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#00D4AA", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.sharpeRatio}</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Sharpe Ratio</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#2ECC71", fontSize: "24px", fontWeight: "700" }}>{selectedAgent.winRate}%</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Win Rate</div>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "14px", borderRadius: "10px", textAlign: "center" }}>
                  <div style={{ color: "#3498DB", fontSize: "24px", fontWeight: "700" }}>+{selectedAgent.avgReturn}%</div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Avg Monthly</div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginBottom: "20px" }}>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Max Drawdown</span>
                  <span style={{ color: "#E74C3C", fontSize: "15px", fontWeight: "600" }}>-{selectedAgent.maxDrawdown}%</span>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Trades/Day</span>
                  <span style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>{selectedAgent.tradesPerDay.toLocaleString()}</span>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Avg Holding</span>
                  <span style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>{selectedAgent.avgHoldingPeriod}</span>
                </div>
                <div style={{ backgroundColor: "#0A1628", padding: "12px", borderRadius: "8px" }}>
                  <span style={{ color: "#6B7A8C", fontSize: "11px", display: "block", marginBottom: "4px" }}>Latency</span>
                  <span style={{ color: "#F1C40F", fontSize: "15px", fontWeight: "600" }}>{selectedAgent.latencyMs}ms</span>
                </div>
              </div>

              {/* Model & Framework */}
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

              {/* Asset Classes */}
              <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "10px" }}>Asset Classes</h5>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "20px" }}>
                {selectedAgent.assetClasses.map((ac, i) => (
                  <span key={i} style={{
                    padding: "5px 12px",
                    backgroundColor: `${assetClassConfig[ac].color}20`,
                    borderRadius: "6px",
                    color: assetClassConfig[ac].color,
                    fontSize: "12px",
                    fontWeight: "500",
                  }}>
                    {assetClassConfig[ac].label}
                  </span>
                ))}
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

  const renderGPU = () => {
    if (!selectedFirm) return null;

    const gpuAllocationData = [
      { name: "Allocated", value: gpuSummary.allocated, color: "#3498DB" },
      { name: "Available", value: gpuSummary.available, color: "#2ECC71" },
      { name: "Maintenance", value: gpuSummary.maintenance, color: "#E74C3C" },
    ];

    return (
      <div>
        {/* GPU Summary */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: isMobile ? "10px" : "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "18px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Cpu size={isMobile ? 14 : 18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Total GPUs</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "20px" : "28px", fontWeight: "700" }}>{gpuSummary.total}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "18px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: isMobile ? "6px" : "10px" }}>
              <CheckCircle size={isMobile ? 14 : 18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Available</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: isMobile ? "20px" : "28px", fontWeight: "700" }}>{gpuSummary.available}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "18px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Activity size={isMobile ? 14 : 18} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Allocated</span>
            </div>
            <div style={{ color: "#3498DB", fontSize: isMobile ? "20px" : "28px", fontWeight: "700" }}>{gpuSummary.allocated}</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: isMobile ? "12px" : "18px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Pause size={isMobile ? 14 : 18} style={{ color: "#E74C3C" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Maintenance</span>
            </div>
            <div style={{ color: "#E74C3C", fontSize: isMobile ? "20px" : "28px", fontWeight: "700" }}>{gpuSummary.maintenance}</div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "16px" : "20px", marginBottom: "24px" }}>
          {/* Allocation Pie */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>GPU Allocation</h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={gpuAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {gpuAllocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Utilization Over Time */}
          <div style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "16px" }}>GPU Utilization by Task</h4>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={gpuUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                <XAxis dataKey="time" stroke="#6B7A8C" fontSize={11} />
                <YAxis stroke="#6B7A8C" fontSize={11} tickFormatter={(v) => `${v}%`} />
                <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                <Legend />
                <Area type="monotone" dataKey="inference" name="Inference" stackId="1" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.7} />
                <Area type="monotone" dataKey="training" name="Training" stackId="1" stroke="#9B59B6" fill="#9B59B6" fillOpacity={0.7} />
                <Area type="monotone" dataKey="idle" name="Idle" stackId="1" stroke="#6B7A8C" fill="#6B7A8C" fillOpacity={0.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* GPU Clusters */}
        <h4 style={{ color: "white", fontSize: "15px", fontWeight: "600", marginBottom: "16px" }}>GPU Clusters</h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {selectedFirm.gpuClusters.map((cluster) => (
            <div key={cluster.id} style={{ backgroundColor: "#162032", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    backgroundColor: "rgba(0, 212, 170, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <Server size={24} style={{ color: "#00D4AA" }} />
                  </div>
                  <div>
                    <h5 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px" }}>{cluster.name}</h5>
                    <span style={{ color: "#6B7A8C", fontSize: "12px" }}>{cluster.location} • {cluster.provider}</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: cluster.status === "available" ? "rgba(46, 204, 113, 0.15)" : cluster.status === "in_use" ? "rgba(52, 152, 219, 0.15)" : "rgba(231, 76, 60, 0.15)",
                    color: cluster.status === "available" ? "#2ECC71" : cluster.status === "in_use" ? "#3498DB" : "#E74C3C",
                    textTransform: "capitalize",
                  }}>
                    {cluster.status.replace("_", " ")}
                  </span>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
                <div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>GPU Type</div>
                  <div style={{ color: "#F1C40F", fontSize: "15px", fontWeight: "600" }}>{cluster.gpuType}</div>
                </div>
                <div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Total</div>
                  <div style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>{cluster.totalGPUs}</div>
                </div>
                <div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Available</div>
                  <div style={{ color: "#2ECC71", fontSize: "15px", fontWeight: "600" }}>{cluster.availableGPUs}</div>
                </div>
                <div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>VRAM/GPU</div>
                  <div style={{ color: "white", fontSize: "15px", fontWeight: "600" }}>{cluster.vramPerGPU}GB</div>
                </div>
                <div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Latency</div>
                  <div style={{ color: "#00D4AA", fontSize: "15px", fontWeight: "600" }}>{cluster.latencyToExchange}</div>
                </div>
                <div>
                  <div style={{ color: "#6B7A8C", fontSize: "11px", marginBottom: "4px" }}>Utilization</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ flex: 1, height: "8px", backgroundColor: "#0A1628", borderRadius: "4px", overflow: "hidden" }}>
                      <div style={{ width: `${cluster.utilizationPercent}%`, height: "100%", backgroundColor: cluster.utilizationPercent > 80 ? "#E74C3C" : cluster.utilizationPercent > 60 ? "#F1C40F" : "#2ECC71", borderRadius: "4px" }} />
                    </div>
                    <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>{cluster.utilizationPercent}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMarkets = () => {
    const selectedAssetData = marketAssets.find(a => a.symbol === selectedAsset);

    return (
      <div>
        {/* Category Filter */}
        <div style={{ display: "flex", gap: isMobile ? "8px" : "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          {(["all", "stocks", "commodities"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                padding: isMobile ? "8px 14px" : "10px 20px",
                backgroundColor: categoryFilter === cat ? "#00D4AA" : "#162032",
                border: "1px solid #2A3A4D",
                borderRadius: "8px",
                color: categoryFilter === cat ? "#0A1628" : "#B8C5D3",
                fontSize: isMobile ? "12px" : "13px",
                fontWeight: "600",
                cursor: "pointer",
                textTransform: "capitalize",
              }}
            >
              {cat === "all" ? "All Markets" : cat}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr", gap: isMobile ? "16px" : "20px" }}>
          {/* Asset List */}
          <div>
            <h4 style={{ color: "white", fontSize: isMobile ? "14px" : "15px", fontWeight: "600", marginBottom: "16px" }}>
              Market Watch ({filteredAssets.length})
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "500px", overflowY: "auto" }}>
              {filteredAssets.map((asset) => {
                const isSelected = selectedAsset === asset.symbol;
                return (
                  <div
                    key={asset.symbol}
                    onClick={() => setSelectedAsset(asset.symbol)}
                    style={{
                      backgroundColor: isSelected ? "rgba(0, 212, 170, 0.1)" : "#162032",
                      border: `1px solid ${isSelected ? "#00D4AA" : "#2A3A4D"}`,
                      borderRadius: "8px",
                      padding: "12px 14px",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <div style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>{asset.symbol}</div>
                      <div style={{ color: "#6B7A8C", fontSize: "11px" }}>{asset.name}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>
                        ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                      <div style={{
                        color: asset.change >= 0 ? "#2ECC71" : "#E74C3C",
                        fontSize: "11px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        gap: "2px",
                      }}>
                        {asset.change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                        {asset.change >= 0 ? "+" : ""}{asset.change.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart */}
          <div style={{ backgroundColor: "#162032", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "20px" }}>
            {selectedAssetData && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div>
                    <h4 style={{ color: "white", fontSize: "18px", fontWeight: "600", marginBottom: "4px" }}>{selectedAssetData.name}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{selectedAssetData.symbol}</span>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontSize: "10px",
                        fontWeight: "600",
                        backgroundColor: assetClassConfig[selectedAssetData.assetClass]?.color + "20",
                        color: assetClassConfig[selectedAssetData.assetClass]?.color,
                      }}>
                        {assetClassConfig[selectedAssetData.assetClass]?.label}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ color: "white", fontSize: "24px", fontWeight: "700" }}>
                      ${selectedAssetData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                    <div style={{
                      color: selectedAssetData.change >= 0 ? "#2ECC71" : "#E74C3C",
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      gap: "4px",
                    }}>
                      {selectedAssetData.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {selectedAssetData.change >= 0 ? "+" : ""}{selectedAssetData.change.toFixed(2)} ({((selectedAssetData.change / selectedAssetData.price) * 100).toFixed(2)}%)
                    </div>
                  </div>
                </div>

                {/* Price Chart */}
                <ResponsiveContainer width="100%" height={250}>
                  <ComposedChart data={priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2A3A4D" />
                    <XAxis dataKey="timestamp" stroke="#6B7A8C" fontSize={10} tickFormatter={(v) => v.substring(5)} />
                    <YAxis stroke="#6B7A8C" fontSize={11} domain={['auto', 'auto']} />
                    <Tooltip contentStyle={{ backgroundColor: "#1A2738", border: "1px solid #2A3A4D", borderRadius: "8px" }} />
                    <Legend />
                    <Area type="monotone" dataKey="price" name="Price" stroke="#00D4AA" fill="#00D4AA" fillOpacity={0.2} strokeWidth={2} />
                    <Line type="monotone" dataKey="prediction" name="AI Prediction" stroke="#F1C40F" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>

                {/* Signal Indicators */}
                <div style={{ marginTop: "20px" }}>
                  <h5 style={{ color: "white", fontSize: "13px", fontWeight: "600", marginBottom: "12px" }}>AI Signals (Last 7 Days)</h5>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {priceHistory.slice(-7).map((data, i) => (
                      <div key={i} style={{
                        flex: 1,
                        padding: "10px",
                        backgroundColor: "#0A1628",
                        borderRadius: "6px",
                        textAlign: "center",
                      }}>
                        <div style={{ color: "#6B7A8C", fontSize: "10px", marginBottom: "4px" }}>{data.timestamp.substring(5)}</div>
                        <div style={{
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontSize: "11px",
                          fontWeight: "600",
                          backgroundColor: data.signal === "buy" ? "rgba(46, 204, 113, 0.2)" : data.signal === "sell" ? "rgba(231, 76, 60, 0.2)" : "rgba(107, 122, 140, 0.2)",
                          color: data.signal === "buy" ? "#2ECC71" : data.signal === "sell" ? "#E74C3C" : "#6B7A8C",
                          textTransform: "uppercase",
                        }}>
                          {data.signal}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
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
                <div style={{ 
                  width: isMobile ? "32px" : "40px", 
                  height: isMobile ? "32px" : "40px", 
                  borderRadius: "12px", 
                  backgroundColor: "rgba(0, 212, 170, 0.15)", 
                  border: "1px solid rgba(0, 212, 170, 0.3)", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}>
                  <TrendingUp size={isMobile ? 16 : 20} style={{ color: "#00D4AA" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: isMobile ? "14px" : "18px", fontWeight: "600", color: "white", margin: 0 }}>
                    {isMobile ? "AI Trading" : "AI Trading Platform"}
                  </h1>
                  {!isMobile && <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>Stocks & Commodities</p>}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {isMobile && (
                <button
                  onClick={() => setShowMobileFirmList(!showMobileFirmList)}
                  style={{
                    padding: "8px",
                    borderRadius: "8px",
                    backgroundColor: showMobileFirmList ? "#00D4AA" : "#162032",
                    border: "1px solid #2A3A4D",
                    color: showMobileFirmList ? "#0A1628" : "#B8C5D3",
                    cursor: "pointer"
                  }}
                >
                  {showMobileFirmList ? <X size={18} /> : <Menu size={18} />}
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

      {/* Mobile Firm Selector Dropdown */}
      {isMobile && showMobileFirmList && (
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
          <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Trading Firms</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {tradingFirms.map((firm) => (
              <div
                key={firm.id}
                onClick={() => {
                  setSelectedFirm(firm);
                  setSelectedAgent(null);
                  setShowMobileFirmList(false);
                }}
                style={{
                  backgroundColor: selectedFirm?.id === firm.id ? "rgba(0, 212, 170, 0.1)" : "#162032",
                  border: `1px solid ${selectedFirm?.id === firm.id ? "#00D4AA" : "#2A3A4D"}`,
                  borderRadius: "8px",
                  padding: "12px",
                  cursor: "pointer",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "white", fontSize: "13px", fontWeight: "600" }}>{firm.name}</span>
                  <span style={{
                    color: firm.ytdReturn >= 0 ? "#2ECC71" : "#E74C3C",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}>
                    {firm.ytdReturn >= 0 ? "+" : ""}{firm.ytdReturn}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: isMobile ? "12px" : "24px" }}>
        {/* Global Stats */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : isTablet ? "repeat(3, 1fr)" : "repeat(6, 1fr)", 
          gap: isMobile ? "8px" : "16px", 
          marginBottom: isMobile ? "16px" : "24px" 
        }}>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <Building2 size={isMobile ? 14 : 18} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Trading Firms</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.totalFirms}</div>
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
              <Cpu size={isMobile ? 14 : 18} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Total GPUs</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>{globalStats.totalGPUs}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: isMobile ? "12px" : "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", marginBottom: isMobile ? "6px" : "10px" }}>
              <DollarSign size={isMobile ? 14 : 18} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: isMobile ? "10px" : "12px" }}>Total AUM</span>
            </div>
            <div style={{ color: "white", fontSize: isMobile ? "18px" : "26px", fontWeight: "700" }}>${(globalStats.totalAUM / 1000).toFixed(1)}B</div>
          </div>
          {!isMobile && (
            <>
              <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <TrendingUp size={18} style={{ color: "#2ECC71" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Avg YTD Return</span>
                </div>
                <div style={{ color: "#2ECC71", fontSize: "26px", fontWeight: "700" }}>+{globalStats.avgYTD}%</div>
              </div>
              <div style={{ backgroundColor: "#1A2738", padding: "18px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <Activity size={18} style={{ color: "#E67E22" }} />
                  <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Daily Volume</span>
                </div>
                <div style={{ color: "white", fontSize: "26px", fontWeight: "700" }}>${(globalStats.dailyVolume / 1000).toFixed(2)}B</div>
              </div>
            </>
          )}
        </div>

        {/* Main Layout */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "280px 1fr", gap: isMobile ? "12px" : "24px" }}>
          {/* Firm Sidebar - Hidden on mobile, shown as dropdown */}
          {!isMobile && (
            <div>
              <h3 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Trading Firms</h3>
              {renderFirmList()}
            </div>
          )}

          {/* Main Content */}
          <div style={{ backgroundColor: "#1A2738", borderRadius: "12px", border: "1px solid #2A3A4D", overflow: "hidden" }}>
            {/* Mobile Firm Selector */}
            {isMobile && (
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #2A3A4D" }}>
                <select
                  value={selectedFirm?.id || ""}
                  onChange={(e) => {
                    const firm = tradingFirms.find(f => f.id === e.target.value);
                    if (firm) setSelectedFirm(firm);
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
                  {tradingFirms.map((firm) => (
                    <option key={firm.id} value={firm.id}>{firm.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Firm Header */}
            {selectedFirm && (
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
                  <h2 style={{ color: "white", fontSize: isMobile ? "16px" : "20px", fontWeight: "700", marginBottom: "4px" }}>{selectedFirm.name}</h2>
                  <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "6px" : "12px", flexWrap: "wrap" }}>
                    <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "13px", textTransform: "capitalize" }}>{selectedFirm.type.replace("_", " ")}</span>
                    <span style={{ color: "#2A3A4D" }}>•</span>
                    <span style={{ color: "#6B7A8C", fontSize: isMobile ? "11px" : "13px" }}>{selectedFirm.headquarters}</span>
                    {!isMobile && (
                      <>
                        <span style={{ color: "#2A3A4D" }}>•</span>
                        <div style={{ display: "flex", gap: "6px" }}>
                          {selectedFirm.tradingCategories.map((cat) => (
                            <span key={cat} style={{
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "10px",
                              fontWeight: "600",
                              backgroundColor: cat === "stocks" ? "rgba(52, 152, 219, 0.15)" : "rgba(230, 126, 34, 0.15)",
                              color: cat === "stocks" ? "#3498DB" : "#E67E22",
                              textTransform: "capitalize",
                            }}>
                              {cat}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ textAlign: isMobile ? "left" : "right" }}>
                    <div style={{ color: "#6B7A8C", fontSize: "11px" }}>YTD Return</div>
                    <div style={{ color: selectedFirm.ytdReturn >= 0 ? "#2ECC71" : "#E74C3C", fontSize: isMobile ? "16px" : "20px", fontWeight: "700" }}>
                      {selectedFirm.ytdReturn >= 0 ? "+" : ""}{selectedFirm.ytdReturn}%
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
              {(["overview", "agents", "gpu", "markets"] as const).map((tab) => (
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
                  {tab === "gpu" ? (isMobile ? "GPU" : "GPU Resources") : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div style={{ padding: isMobile ? "16px" : "24px", maxHeight: isMobile ? "none" : "calc(100vh - 380px)", overflowY: "auto" }}>
              {activeTab === "overview" && renderOverview()}
              {activeTab === "agents" && renderAgents()}
              {activeTab === "gpu" && renderGPU()}
              {activeTab === "markets" && renderMarkets()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
