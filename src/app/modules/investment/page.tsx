"use client";

import ModuleLayout from "@/components/ModuleLayout";
import { TrendingUp, Globe, Filter, DollarSign, MapPin, Building2, Leaf, Users, ArrowUpRight, Star, Sparkles } from "lucide-react";

const opportunities = [
  { id: 1, title: "Northern Ontario Lithium Processing Facility", sector: "Critical Minerals", type: "Greenfield", investmentRange: "$200M - $500M", expectedIRR: "18-22%", province: "ON", esgScore: 85, indigenousPartnership: true, status: "Seeking Lead Investor" },
  { id: 2, title: "Quebec Battery Cell Manufacturing", sector: "Clean Energy", type: "Expansion", investmentRange: "$500M - $1B", expectedIRR: "15-20%", province: "QC", esgScore: 92, indigenousPartnership: true, status: "In Discussions" },
  { id: 3, title: "BC Solar Farm Portfolio", sector: "Renewable Energy", type: "Acquisition", investmentRange: "$100M - $250M", expectedIRR: "12-16%", province: "BC", esgScore: 95, indigenousPartnership: true, status: "Seeking Lead Investor" },
  { id: 4, title: "Saskatchewan Rare Earth Processing", sector: "Critical Minerals", type: "Greenfield", investmentRange: "$300M - $600M", expectedIRR: "20-25%", province: "SK", esgScore: 78, indigenousPartnership: false, status: "Seeking Lead Investor" },
];

export default function InvestmentPage() {
  return (
    <ModuleLayout title="Investment Attraction" subtitle="Match Foreign Investors with Canadian Opportunities" icon={TrendingUp} iconColor="#F77F00">
      <div className="grid grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="col-span-12 lg:col-span-8 space-y-5">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Opportunities", value: "156", icon: Building2, color: "#F77F00" },
              { label: "Investment Pipeline", value: "$12.4B", icon: DollarSign, color: "#00D4AA" },
              { label: "Active Investors", value: "48", icon: Globe, color: "#5E60CE" },
              { label: "Deals Closed YTD", value: "23", icon: Star, color: "#F1C40F" },
            ].map((stat, i) => (
              <div key={i} className="stat-card">
                <stat.icon size={20} style={{ color: stat.color }} />
                <div className="stat-value mt-3">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Opportunities */}
          <div className="card overflow-hidden">
            <div className="card-header flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2">
                <Building2 size={18} className="text-[#F77F00]" />
                Investment Opportunities
              </h3>
              <button className="btn btn-secondary text-xs py-1.5 px-3">
                <Filter size={12} />
                Filter
              </button>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {opportunities.map((opp) => (
                <div key={opp.id} className="p-5 hover:bg-[var(--surface)] cursor-pointer transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-white mb-1">{opp.title}</h4>
                      <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {opp.province}
                        </span>
                        <span>{opp.sector}</span>
                        <span>{opp.type}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      opp.status === "Seeking Lead Investor" ? "bg-green-500/15 text-green-400" : "bg-yellow-500/15 text-yellow-400"
                    }`}>
                      {opp.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Investment</div>
                      <div className="text-sm text-white font-medium">{opp.investmentRange}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Expected IRR</div>
                      <div className="text-sm text-white font-medium">{opp.expectedIRR}</div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">ESG Score</div>
                      <div className="flex items-center gap-1">
                        <Leaf size={14} className="text-green-400" />
                        <span className="text-sm text-white font-medium">{opp.esgScore}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] mb-1">Indigenous</div>
                      <div className="flex items-center gap-1">
                        <Users size={14} className={opp.indigenousPartnership ? "text-green-400" : "text-gray-500"} />
                        <span className="text-sm text-white font-medium">{opp.indigenousPartnership ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FDI Analytics */}
          <div className="card p-5">
            <h3 className="section-title">
              <Globe size={18} className="text-[#F77F00]" />
              FDI Inflows by Region (2024)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { country: "United States", value: "$45.2B", change: "+12%" },
                { country: "Europe", value: "$28.7B", change: "+8%" },
                { country: "Asia-Pacific", value: "$18.3B", change: "+25%" },
                { country: "Middle East", value: "$8.1B", change: "+45%" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl bg-[var(--surface)]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[var(--text-secondary)]">{stat.country}</span>
                    <span className="text-xs text-green-400 font-medium">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-5">
          {/* AI Matching */}
          <div className="card p-5">
            <h3 className="section-title">
              <Sparkles size={18} className="text-[#F77F00]" />
              AI Investor Matching
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">Enter investor criteria to find matching opportunities</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Investor Country</label>
                <select>
                  <option>Select country...</option>
                  <option>United States</option>
                  <option>Germany</option>
                  <option>Japan</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Sector Interest</label>
                <select>
                  <option>Select sector...</option>
                  <option>Critical Minerals</option>
                  <option>Clean Energy</option>
                  <option>Data Centers</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-[var(--text-muted)] mb-1 block">Investment Range</label>
                <select>
                  <option>Select range...</option>
                  <option>$10M - $50M</option>
                  <option>$50M - $200M</option>
                  <option>$200M+</option>
                </select>
              </div>
              <button className="w-full btn btn-primary">Find Matches</button>
            </div>
          </div>

          {/* Hot Sectors */}
          <div className="card p-5">
            <h3 className="section-title">Hot Sectors</h3>
            <div className="space-y-2">
              {[
                { sector: "EV Battery Manufacturing", deals: 12, value: "$4.2B" },
                { sector: "Critical Mineral Processing", deals: 8, value: "$2.8B" },
                { sector: "Renewable Energy", deals: 15, value: "$3.1B" },
                { sector: "AI Data Centers", deals: 6, value: "$2.3B" },
              ].map((item, i) => (
                <div key={i} className="list-item">
                  <div>
                    <div className="text-sm text-white font-medium">{item.sector}</div>
                    <div className="text-xs text-[var(--text-muted)]">{item.deals} deals</div>
                  </div>
                  <div className="text-[#F77F00] font-bold">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModuleLayout>
  );
}
