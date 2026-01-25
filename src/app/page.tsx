"use client";

import { modules } from "@/data/modules";
import ModuleCard from "@/components/ModuleCard";
import Image from "next/image";
import { 
  Globe2, 
  Zap, 
  Shield, 
  ArrowRight,
  MapPin,
  TrendingUp,
  Battery
} from "lucide-react";

export default function Home() {
  const stats = [
    { label: "Critical Mineral Deposits", value: "2,400+", icon: MapPin },
    { label: "Clean Energy Capacity", value: "85 GW", icon: Zap },
    { label: "Investment Opportunities", value: "$50B+", icon: TrendingUp },
    { label: "EV Battery Plants", value: "12", icon: Battery },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0A1628" }}>
      {/* Navigation */}
      <nav style={{ borderBottom: "1px solid #2A3A4D" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Image 
                src="/logo.png" 
                alt="Mission 2050 Logo" 
                width={140} 
                height={40} 
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button style={{ 
                padding: "8px 16px", 
                fontSize: "14px", 
                color: "#B8C5D3", 
                background: "none", 
                border: "none", 
                cursor: "pointer" 
              }}>
                Documentation
              </button>
              <button style={{ 
                padding: "10px 20px", 
                borderRadius: "8px", 
                backgroundColor: "#00D4AA", 
                color: "white", 
                fontSize: "14px", 
                fontWeight: "500", 
                border: "none", 
                cursor: "pointer" 
              }}>
                Request Demo
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Stats on Right */}
      <section style={{ padding: "60px 24px", backgroundColor: "#0A1628" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr 380px", 
            gap: "48px", 
            alignItems: "center" 
          }}>
            {/* Left: Hero Content */}
            <div>
              {/* Badge */}
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px", 
                padding: "8px 16px", 
                borderRadius: "999px", 
                backgroundColor: "rgba(0, 212, 170, 0.1)", 
                border: "1px solid rgba(0, 212, 170, 0.2)", 
                color: "#00D4AA", 
                fontSize: "14px", 
                fontWeight: "500", 
                marginBottom: "24px" 
              }}>
                <Globe2 size={16} />
                <span>Powering Canada&apos;s Clean Energy Transition</span>
              </div>
              
              {/* Heading */}
              <h1 style={{ 
                fontSize: "clamp(36px, 5vw, 56px)", 
                fontWeight: "700", 
                color: "white", 
                marginBottom: "20px", 
                lineHeight: "1.1" 
              }}>
                Infrastructure
                <span style={{ display: "block", color: "#00D4AA", marginTop: "4px" }}>
                  Intelligence Platform
                </span>
              </h1>
              
              {/* Description - Italic */}
              <p style={{ 
                fontSize: "17px", 
                color: "#B8C5D3", 
                marginBottom: "32px", 
                lineHeight: "1.7",
                fontStyle: "italic",
                maxWidth: "540px"
              }}>
                Canada has the minerals, the clean power, the land, and the political moment. 
                We&apos;re building the system that maps the full opportunity—from lithium in the ground 
                to batteries in cars to solar panels on roofs.
              </p>

              {/* CTA Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "16px" }}>
                <button style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  padding: "14px 28px", 
                  borderRadius: "8px", 
                  backgroundColor: "#00D4AA", 
                  color: "white", 
                  fontWeight: "600", 
                  fontSize: "15px", 
                  border: "none", 
                  cursor: "pointer" 
                }}>
                  Explore Platform
                  <ArrowRight size={18} />
                </button>
                <button style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px", 
                  padding: "14px 28px", 
                  borderRadius: "8px", 
                  backgroundColor: "#162032", 
                  border: "1px solid #2A3A4D", 
                  color: "white", 
                  fontWeight: "500", 
                  fontSize: "15px", 
                  cursor: "pointer" 
                }}>
                  <Shield size={18} />
                  Investment Portal
                </button>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "1fr 1fr", 
              gap: "12px" 
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ 
                  backgroundColor: "#1A2738", 
                  border: "1px solid #2A3A4D", 
                  borderRadius: "12px", 
                  padding: "20px", 
                  textAlign: "center" 
                }}>
                  <stat.icon style={{ color: "#00D4AA", marginBottom: "10px" }} size={24} />
                  <div style={{ fontSize: "24px", fontWeight: "700", color: "white", marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "11px", color: "#6B7A8C", lineHeight: "1.3" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section style={{ padding: "60px 24px", backgroundColor: "#0F1D2F" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "white", marginBottom: "12px" }}>
              11 Strategic Intelligence Modules
            </h2>
            <p style={{ color: "#B8C5D3", maxWidth: "600px", margin: "0 auto", lineHeight: "1.6", fontSize: "15px" }}>
              A comprehensive suite of AI-powered tools covering every aspect of Canada&apos;s clean energy infrastructure ecosystem
            </p>
          </div>

          {/* Module Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", 
            gap: "16px" 
          }}>
            {modules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: "60px 24px", backgroundColor: "#0A1628" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ 
            backgroundColor: "#1A2738", 
            border: "1px solid #2A3A4D", 
            borderRadius: "16px", 
            padding: "40px", 
            textAlign: "center" 
          }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", color: "white", marginBottom: "12px" }}>
              Ready to Transform Infrastructure Intelligence?
            </h2>
            <p style={{ color: "#B8C5D3", marginBottom: "28px", maxWidth: "500px", margin: "0 auto 28px auto", lineHeight: "1.6", fontSize: "15px" }}>
              Join the leading organizations leveraging AI to unlock Canada&apos;s clean energy potential
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "12px" }}>
              <button style={{ 
                padding: "12px 28px", 
                borderRadius: "8px", 
                backgroundColor: "#00D4AA", 
                color: "white", 
                fontWeight: "600", 
                border: "none", 
                cursor: "pointer" 
              }}>
                Schedule a Demo
              </button>
              <button style={{ 
                padding: "12px 28px", 
                borderRadius: "8px", 
                backgroundColor: "#162032", 
                border: "1px solid #2A3A4D", 
                color: "white", 
                fontWeight: "500", 
                cursor: "pointer" 
              }}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "24px", borderTop: "1px solid #2A3A4D" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            alignItems: "center", 
            justifyContent: "space-between", 
            gap: "20px" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Image 
                src="/logo.png" 
                alt="Mission 2050 Logo" 
                width={100} 
                height={30} 
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "24px", fontSize: "14px", color: "#6B7A8C" }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Docs</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>API</a>
            </div>
            <div style={{ fontSize: "14px", color: "#6B7A8C" }}>
              © 2025 Mission 2050
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
