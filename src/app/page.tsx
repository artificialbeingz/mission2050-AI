"use client";

import { useState } from "react";
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
  Battery,
  Menu,
  X
} from "lucide-react";
import { useDeviceType } from "@/hooks/useMediaQuery";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isMobile, isMobileOrTablet } = useDeviceType();

  const stats = [
    { label: "Critical Mineral Deposits", value: "2,400+", icon: MapPin },
    { label: "Clean Energy Capacity", value: "85 GW", icon: Zap },
    { label: "Investment Opportunities", value: "$50B+", icon: TrendingUp },
    { label: "EV Battery Plants", value: "12", icon: Battery },
  ];

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#0A1628" }}>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="mobile-menu-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(10, 22, 40, 0.98)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            padding: "80px 24px 24px",
          }}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            <X size={28} />
          </button>
          <nav style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <a href="#" style={{ 
              color: "white", 
              fontSize: "18px", 
              padding: "12px 0",
              textDecoration: "none",
              borderBottom: "1px solid #2A3A4D"
            }}>
              Documentation
            </a>
            <a href="#" style={{ 
              color: "white", 
              fontSize: "18px", 
              padding: "12px 0",
              textDecoration: "none",
              borderBottom: "1px solid #2A3A4D"
            }}>
              API
            </a>
            <a href="#" style={{ 
              color: "white", 
              fontSize: "18px", 
              padding: "12px 0",
              textDecoration: "none",
              borderBottom: "1px solid #2A3A4D"
            }}>
              Contact
            </a>
            <button style={{ 
              marginTop: "16px",
              padding: "14px 28px", 
              borderRadius: "8px", 
              backgroundColor: "#00D4AA", 
              color: "white", 
              fontSize: "16px", 
              fontWeight: "600", 
              border: "none", 
              cursor: "pointer" 
            }}>
              Request Demo
            </button>
          </nav>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ borderBottom: "1px solid #2A3A4D" }}>
        <div style={{ 
          maxWidth: "1200px", 
          margin: "0 auto", 
          padding: isMobile ? "12px 16px" : "16px 24px" 
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Image 
                src="/logo.png" 
                alt="Mission 2050 Logo" 
                width={isMobile ? 110 : 140} 
                height={isMobile ? 32 : 40} 
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Desktop Navigation */}
            {!isMobile && (
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
            )}

            {/* Mobile Hamburger */}
            {isMobile && (
              <button
                onClick={() => setMobileMenuOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section with Stats on Right (stacks on mobile) */}
      <section style={{ 
        padding: isMobile ? "40px 16px" : isMobileOrTablet ? "48px 20px" : "60px 24px", 
        backgroundColor: "#0A1628" 
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ 
            display: isMobileOrTablet ? "flex" : "grid",
            flexDirection: isMobileOrTablet ? "column" : undefined,
            gridTemplateColumns: isMobileOrTablet ? undefined : "1fr 380px", 
            gap: isMobile ? "32px" : "48px", 
            alignItems: "center" 
          }}>
            {/* Left: Hero Content */}
            <div>
              {/* Badge */}
              <div style={{ 
                display: "inline-flex", 
                alignItems: "center", 
                gap: "8px", 
                padding: isMobile ? "6px 12px" : "8px 16px", 
                borderRadius: "999px", 
                backgroundColor: "rgba(0, 212, 170, 0.1)", 
                border: "1px solid rgba(0, 212, 170, 0.2)", 
                color: "#00D4AA", 
                fontSize: isMobile ? "12px" : "14px", 
                fontWeight: "500", 
                marginBottom: isMobile ? "20px" : "24px" 
              }}>
                <Globe2 size={isMobile ? 14 : 16} />
                <span>Powering Canada&apos;s Clean Energy Transition</span>
              </div>
              
              {/* Heading */}
              <h1 style={{ 
                fontSize: isMobile ? "32px" : isMobileOrTablet ? "40px" : "clamp(36px, 5vw, 56px)", 
                fontWeight: "700", 
                color: "white", 
                marginBottom: isMobile ? "16px" : "20px", 
                lineHeight: "1.1" 
              }}>
                Infrastructure
                <span style={{ display: "block", color: "#00D4AA", marginTop: "4px" }}>
                  Intelligence Platform
                </span>
              </h1>
              
              {/* Description - Italic */}
              <p style={{ 
                fontSize: isMobile ? "15px" : "17px", 
                color: "#B8C5D3", 
                marginBottom: isMobile ? "24px" : "32px", 
                lineHeight: "1.7",
                fontStyle: "italic",
                maxWidth: "540px"
              }}>
                Canada has the minerals, the clean power, the land, and the political moment. 
                We&apos;re building the system that maps the full opportunity—from lithium in the ground 
                to batteries in cars to solar panels on roofs.
              </p>

              {/* CTA Buttons */}
              <div style={{ 
                display: "flex", 
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center", 
                gap: isMobile ? "12px" : "16px" 
              }}>
                <button style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  gap: "8px", 
                  padding: isMobile ? "14px 24px" : "14px 28px", 
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
                  justifyContent: "center",
                  gap: "8px", 
                  padding: isMobile ? "14px 24px" : "14px 28px", 
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
              gap: isMobile ? "10px" : "12px",
              width: isMobileOrTablet ? "100%" : undefined,
              maxWidth: isMobileOrTablet ? "400px" : undefined,
              margin: isMobileOrTablet ? "0 auto" : undefined,
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ 
                  backgroundColor: "#1A2738", 
                  border: "1px solid #2A3A4D", 
                  borderRadius: isMobile ? "10px" : "12px", 
                  padding: isMobile ? "16px" : "20px", 
                  textAlign: "center" 
                }}>
                  <stat.icon style={{ color: "#00D4AA", marginBottom: isMobile ? "8px" : "10px" }} size={isMobile ? 20 : 24} />
                  <div style={{ fontSize: isMobile ? "20px" : "24px", fontWeight: "700", color: "white", marginBottom: "4px" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: isMobile ? "10px" : "11px", color: "#6B7A8C", lineHeight: "1.3" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section style={{ 
        padding: isMobile ? "40px 16px" : isMobileOrTablet ? "48px 20px" : "60px 24px", 
        backgroundColor: "#0F1D2F" 
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Section Header */}
          <div style={{ textAlign: "center", marginBottom: isMobile ? "28px" : "40px" }}>
            <h2 style={{ 
              fontSize: isMobile ? "22px" : isMobileOrTablet ? "24px" : "28px", 
              fontWeight: "700", 
              color: "white", 
              marginBottom: "12px" 
            }}>
              11 Strategic Intelligence Modules
            </h2>
            <p style={{ 
              color: "#B8C5D3", 
              maxWidth: "600px", 
              margin: "0 auto", 
              lineHeight: "1.6", 
              fontSize: isMobile ? "14px" : "15px",
              padding: isMobile ? "0 8px" : 0,
            }}>
              A comprehensive suite of AI-powered tools covering every aspect of Canada&apos;s clean energy infrastructure ecosystem
            </p>
          </div>

          {/* Module Grid */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile 
              ? "1fr" 
              : isMobileOrTablet 
                ? "repeat(2, 1fr)" 
                : "repeat(auto-fill, minmax(260px, 1fr))", 
            gap: isMobile ? "12px" : "16px" 
          }}>
            {modules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: isMobile ? "40px 16px" : isMobileOrTablet ? "48px 20px" : "60px 24px", 
        backgroundColor: "#0A1628" 
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ 
            backgroundColor: "#1A2738", 
            border: "1px solid #2A3A4D", 
            borderRadius: isMobile ? "12px" : "16px", 
            padding: isMobile ? "28px 20px" : "40px", 
            textAlign: "center" 
          }}>
            <h2 style={{ 
              fontSize: isMobile ? "20px" : "24px", 
              fontWeight: "700", 
              color: "white", 
              marginBottom: "12px" 
            }}>
              Ready to Transform Infrastructure Intelligence?
            </h2>
            <p style={{ 
              color: "#B8C5D3", 
              marginBottom: "28px", 
              maxWidth: "500px", 
              margin: "0 auto 28px auto", 
              lineHeight: "1.6", 
              fontSize: isMobile ? "14px" : "15px" 
            }}>
              Join the leading organizations leveraging AI to unlock Canada&apos;s clean energy potential
            </p>
            <div style={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center", 
              justifyContent: "center", 
              gap: "12px" 
            }}>
              <button style={{ 
                padding: "12px 28px", 
                borderRadius: "8px", 
                backgroundColor: "#00D4AA", 
                color: "white", 
                fontWeight: "600", 
                border: "none", 
                cursor: "pointer",
                width: isMobile ? "100%" : "auto",
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
                cursor: "pointer",
                width: isMobile ? "100%" : "auto",
              }}>
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: isMobile ? "20px 16px" : "24px", borderTop: "1px solid #2A3A4D" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ 
            display: "flex", 
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "center" : "center", 
            justifyContent: "space-between", 
            gap: isMobile ? "16px" : "20px",
            textAlign: isMobile ? "center" : "left",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <Image 
                src="/logo.png" 
                alt="Mission 2050 Logo" 
                width={isMobile ? 80 : 100} 
                height={isMobile ? 24 : 30} 
                style={{ objectFit: "contain" }}
              />
            </div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: isMobile ? "16px" : "24px", 
              fontSize: isMobile ? "13px" : "14px", 
              color: "#6B7A8C",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Docs</a>
              <a href="#" style={{ color: "inherit", textDecoration: "none" }}>API</a>
            </div>
            <div style={{ fontSize: isMobile ? "12px" : "14px", color: "#6B7A8C" }}>
              © 2025 Mission 2050
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
