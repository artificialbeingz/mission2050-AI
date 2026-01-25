"use client";

import Link from "next/link";
import { Module } from "@/data/modules";
import { ArrowRight } from "lucide-react";

interface ModuleCardProps {
  module: Module;
  index: number;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const Icon = module.icon;
  
  return (
    <Link href={`/modules/${module.id}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <div style={{ 
        height: "100%",
        backgroundColor: "#1A2738", 
        border: "1px solid #2A3A4D", 
        borderRadius: "12px", 
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "border-color 0.2s"
      }}>
        {/* Icon */}
        <div style={{ 
          width: "48px", 
          height: "48px", 
          borderRadius: "12px", 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          marginBottom: "16px",
          backgroundColor: `${module.color}15`,
          border: `1px solid ${module.color}30`
        }}>
          <Icon size={24} style={{ color: module.color }} />
        </div>
        
        {/* Title */}
        <h3 style={{ 
          fontSize: "16px", 
          fontWeight: "600", 
          color: "white", 
          marginBottom: "8px",
          lineHeight: "1.3"
        }}>
          {module.name}
        </h3>
        
        {/* Description */}
        <p style={{ 
          fontSize: "14px", 
          color: "#B8C5D3", 
          marginBottom: "16px", 
          lineHeight: "1.5",
          flexGrow: 1
        }}>
          {module.description}
        </p>
        
        {/* Features */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px" }}>
          {module.features.slice(0, 2).map((feature, i) => (
            <span key={i} style={{ 
              fontSize: "11px", 
              padding: "4px 8px", 
              borderRadius: "6px", 
              backgroundColor: "#162032", 
              color: "#6B7A8C" 
            }}>
              {feature}
            </span>
          ))}
          {module.features.length > 2 && (
            <span style={{ 
              fontSize: "11px", 
              padding: "4px 8px", 
              borderRadius: "6px", 
              backgroundColor: "#162032", 
              color: "#6B7A8C" 
            }}>
              +{module.features.length - 2}
            </span>
          )}
        </div>
        
        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: "500", color: "#00D4AA" }}>
          <span>Explore</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}
