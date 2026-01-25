"use client";

import ModuleLayout from "@/components/ModuleLayout";
import { Cpu, Server, Zap, Thermometer, MapPin, Calendar, CheckCircle2, Clock, AlertCircle, TrendingUp, Users, Leaf } from "lucide-react";

const dataCenterSites = [
  { id: 1, name: "Beauharnois Hydro Zone", province: "QC", availablePowerMW: 200, powerCost: 0.05, cleanEnergy: 99.8, coolingScore: 92, fiberLatency: 8, score: 89 },
  { id: 2, name: "Peace River Region", province: "BC", availablePowerMW: 150, powerCost: 0.06, cleanEnergy: 98.5, coolingScore: 88, fiberLatency: 12, score: 85 },
  { id: 3, name: "Northern Ontario Hub", province: "ON", availablePowerMW: 120, powerCost: 0.08, cleanEnergy: 75.0, coolingScore: 85, fiberLatency: 15, score: 76 },
  { id: 4, name: "Churchill Falls Expansion", province: "NL", availablePowerMW: 300, powerCost: 0.04, cleanEnergy: 100, coolingScore: 95, fiberLatency: 25, score: 82 },
];

const federalDeadlines = [
  { date: "Feb 15, 2025", event: "ISED Expression of Interest", status: "upcoming" },
  { date: "Mar 30, 2025", event: "Full Proposal Submission", status: "pending" },
  { date: "Jun 15, 2025", event: "Technical Review Complete", status: "pending" },
  { date: "Sep 1, 2025", event: "Final Selection Announced", status: "pending" },
];

export default function SovereignAIPage() {
  return (
    <ModuleLayout title="Sovereign AI Compute" subtitle="Data Center Site Selection for Federal $2B Program" icon={Cpu} iconColor="#5E60CE">
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Federal Investment", value: "$2B", icon: TrendingUp, color: "#5E60CE" },
              { label: "Target Capacity", value: "1 GW", icon: Zap, color: "#F1C40F" },
              { label: "Sites Evaluated", value: "24", icon: MapPin, color: "#00D4AA" },
              { label: "Indigenous Partners", value: "12", icon: Users, color: "#E67E22" },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <stat.icon size={20} style={{ color: stat.color }} />
                <div className="stat-value mt-3">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Site Table */}
          <div className="card overflow-hidden">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Server size={18} className="text-[#5E60CE]" />
                Data Center Site Rankings
              </h3>
              <span className="text-xs text-[var(--text-muted)]">Ranked by composite score</span>
            </div>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Site</th>
                    <th>Province</th>
                    <th>Power (MW)</th>
                    <th>$/kWh</th>
                    <th>Clean %</th>
                    <th>Cooling</th>
                    <th>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCenterSites.map((site, i) => (
                    <tr key={site.id}>
                      <td>
                        <div className="w-8 h-8 rounded-lg bg-[#5E60CE]/20 flex items-center justify-center text-[#5E60CE] font-bold">
                          {i + 1}
                        </div>
                      </td>
                      <td className="font-medium">{site.name}</td>
                      <td>{site.province}</td>
                      <td>{site.availablePowerMW}</td>
                      <td>${site.powerCost}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Leaf size={14} className="text-green-400" />
                          {site.cleanEnergy}%
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Thermometer size={14} className="text-blue-400" />
                          {site.coolingScore}
                        </div>
                      </td>
                      <td>
                        <span className={`score-badge ${site.score >= 85 ? "score-high" : site.score >= 75 ? "score-medium" : "score-low"}`}>
                          {site.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Power Availability */}
          <div className="card p-5">
            <h3 className="section-title">
              <Zap size={18} className="text-yellow-400" />
              Provincial Clean Power Availability
            </h3>
            <div className="space-y-4">
              {[
                { province: "Quebec", capacity: 99.8, available: 2500 },
                { province: "British Columbia", capacity: 98.5, available: 1800 },
                { province: "Manitoba", capacity: 97.0, available: 1200 },
                { province: "Ontario", capacity: 75.0, available: 3500 },
                { province: "Newfoundland", capacity: 100, available: 800 },
              ].map((prov, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-white">{prov.province}</span>
                    <span className="text-sm text-[var(--text-muted)]">{prov.available} MW • {prov.capacity}% clean</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill bg-gradient-to-r from-[#5E60CE] to-[#00D4AA]" style={{ width: `${(prov.available / 4000) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          {/* Timeline */}
          <div className="card p-5">
            <h3 className="section-title">
              <Calendar size={18} className="text-[#5E60CE]" />
              ISED Program Timeline
            </h3>
            <div className="space-y-4">
              {federalDeadlines.map((deadline, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {deadline.status === "upcoming" ? (
                      <AlertCircle size={18} className="text-yellow-400" />
                    ) : deadline.status === "completed" ? (
                      <CheckCircle2 size={18} className="text-green-400" />
                    ) : (
                      <Clock size={18} className="text-[var(--text-muted)]" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{deadline.event}</div>
                    <div className="text-xs text-[var(--text-muted)]">{deadline.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scoring Criteria */}
          <div className="card p-5">
            <h3 className="section-title">Scoring Criteria Weights</h3>
            <div className="space-y-3">
              {[
                { label: "Clean Power Access", weight: 30 },
                { label: "Power Cost", weight: 20 },
                { label: "Cooling Climate", weight: 15 },
                { label: "Fiber Connectivity", weight: 15 },
                { label: "Indigenous Partnership", weight: 10 },
                { label: "Provincial Incentives", weight: 10 },
              ].map((criteria, i) => (
                <div key={i}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-[var(--text-secondary)]">{criteria.label}</span>
                    <span className="text-xs text-[var(--accent)] font-semibold">{criteria.weight}%</span>
                  </div>
                  <div className="progress-bar h-2">
                    <div className="progress-fill bg-[#5E60CE]" style={{ width: `${criteria.weight * 2}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <div className="card p-5">
            <h3 className="section-title">Program Requirements</h3>
            <div className="space-y-2">
              {[
                { label: "Min Clean Energy", value: "90%" },
                { label: "Min Power Capacity", value: "50 MW" },
                { label: "Canadian Content", value: "60%" },
                { label: "Security Clearance", value: "Required" },
              ].map((item, i) => (
                <div key={i} className="list-item">
                  <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                  <span className="font-medium text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
