"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  GraduationCap,
  BookOpen,
  Users,
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Award,
  CheckCircle,
  TrendingUp,
  Globe,
  Monitor,
  UserCheck,
  Briefcase,
  X,
  ChevronRight,
  Star,
  Filter,
  Search,
  Calendar,
  Target,
  Zap,
  Heart,
} from "lucide-react";

import {
  programs,
  Program,
  EducationCategory,
  categoryConfig,
  getSkillLevelLabel,
  getSkillLevelColor,
  getProgramTypeLabel,
  getDeliveryModeLabel,
  SkillLevel,
  ProgramType,
  DeliveryMode,
} from "@/data/aiEducation";

export default function WorkforcePage() {
  const [activeCategory, setActiveCategory] = useState<EducationCategory>("school_students");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [skillFilter, setSkillFilter] = useState<SkillLevel | "all">("all");
  const [deliveryFilter, setDeliveryFilter] = useState<DeliveryMode | "all">("all");
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  const getCategoryIcon = (category: EducationCategory) => {
    const icons: Record<EducationCategory, any> = {
      school_students: GraduationCap,
      university_students: BookOpen,
      general_employees: Users,
      industry_specific: Building2,
    };
    return icons[category];
  };

  // Filter programs
  const filteredPrograms = useMemo(() => {
    return programs.filter((p) => {
      if (p.category !== activeCategory) return false;
      if (searchQuery && !p.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
          !p.institution.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (skillFilter !== "all" && p.skillLevel !== skillFilter) return false;
      if (deliveryFilter !== "all" && p.deliveryMode !== deliveryFilter) return false;
      if (showFreeOnly && p.cost > 0) return false;
      return true;
    });
  }, [activeCategory, searchQuery, skillFilter, deliveryFilter, showFreeOnly]);

  // Category stats
  const categoryStats = useMemo(() => {
    const catPrograms = programs.filter((p) => p.category === activeCategory);
    return {
      totalPrograms: catPrograms.length,
      totalEnrolled: catPrograms.reduce((sum, p) => sum + p.currentEnrollment, 0),
      avgCompletion: Math.round(catPrograms.reduce((sum, p) => sum + p.completionRate, 0) / catPrograms.length),
      freePrograms: catPrograms.filter((p) => p.cost === 0).length,
      govFunded: catPrograms.filter((p) => p.governmentFunded).length,
    };
  }, [activeCategory]);

  // Global stats
  const globalStats = useMemo(() => {
    return {
      totalPrograms: programs.length,
      totalEnrolled: programs.reduce((sum, p) => sum + p.currentEnrollment, 0),
      totalCapacity: programs.reduce((sum, p) => sum + p.enrollmentCapacity, 0),
      freePrograms: programs.filter((p) => p.cost === 0).length,
      govFunded: programs.filter((p) => p.governmentFunded).length,
    };
  }, []);

  const renderProgramCard = (program: Program) => {
    const isSelected = selectedProgram?.id === program.id;
    
    return (
      <div
        key={program.id}
        onClick={() => setSelectedProgram(program)}
        style={{
          backgroundColor: isSelected ? `${categoryConfig[activeCategory].color}15` : "#1A2738",
          border: `1px solid ${isSelected ? categoryConfig[activeCategory].color : "#2A3A4D"}`,
          borderRadius: "12px",
          padding: "20px",
          cursor: "pointer",
          transition: "all 0.2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
          <div>
            <h3 style={{ color: "white", fontSize: "16px", fontWeight: "600", marginBottom: "4px", lineHeight: "1.3" }}>
              {program.name}
            </h3>
            <span style={{ color: "#6B7A8C", fontSize: "13px" }}>{program.institution.name}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
            <span
              style={{
                padding: "4px 10px",
                borderRadius: "8px",
                fontSize: "11px",
                fontWeight: "600",
                backgroundColor: `${getSkillLevelColor(program.skillLevel)}20`,
                color: getSkillLevelColor(program.skillLevel),
              }}
            >
              {getSkillLevelLabel(program.skillLevel)}
            </span>
            {program.governmentFunded && (
              <span
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "10px",
                  fontWeight: "500",
                  backgroundColor: "rgba(46, 204, 113, 0.15)",
                  color: "#2ECC71",
                }}
              >
                Gov Funded
              </span>
            )}
          </div>
        </div>

        <p style={{ color: "#8B9CAD", fontSize: "13px", lineHeight: "1.5", marginBottom: "16px" }}>
          {program.description.substring(0, 100)}...
        </p>

        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Clock size={14} style={{ color: "#6B7A8C" }} />
            <span style={{ color: "#B8C5D3", fontSize: "12px" }}>{program.duration}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Monitor size={14} style={{ color: "#6B7A8C" }} />
            <span style={{ color: "#B8C5D3", fontSize: "12px" }}>{getDeliveryModeLabel(program.deliveryMode)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Globe size={14} style={{ color: "#6B7A8C" }} />
            <span style={{ color: "#B8C5D3", fontSize: "12px", textTransform: "uppercase" }}>{program.language}</span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <DollarSign size={14} style={{ color: program.cost === 0 ? "#2ECC71" : "#F1C40F" }} />
            <span style={{ color: program.cost === 0 ? "#2ECC71" : "white", fontSize: "14px", fontWeight: "600" }}>
              {program.cost === 0 ? "FREE" : `$${program.cost.toLocaleString()}`}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ textAlign: "right" }}>
              <span style={{ color: "#6B7A8C", fontSize: "11px" }}>Enrolled</span>
              <div style={{ color: "white", fontSize: "13px", fontWeight: "500" }}>
                {program.currentEnrollment.toLocaleString()}/{program.enrollmentCapacity.toLocaleString()}
              </div>
            </div>
            <div style={{ width: "60px", height: "6px", backgroundColor: "#0A1628", borderRadius: "3px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${(program.currentEnrollment / program.enrollmentCapacity) * 100}%`,
                  height: "100%",
                  backgroundColor: categoryConfig[activeCategory].color,
                  borderRadius: "3px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProgramDetail = () => {
    if (!selectedProgram) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#6B7A8C" }}>
          <BookOpen size={48} style={{ marginBottom: "16px", opacity: 0.5 }} />
          <p>Select a program to view details</p>
        </div>
      );
    }

    const p = selectedProgram;

    return (
      <div>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "600",
                  backgroundColor: `${categoryConfig[activeCategory].color}20`,
                  color: categoryConfig[activeCategory].color,
                }}
              >
                {getProgramTypeLabel(p.type)}
              </span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: "8px",
                  fontSize: "12px",
                  fontWeight: "600",
                  backgroundColor: `${getSkillLevelColor(p.skillLevel)}20`,
                  color: getSkillLevelColor(p.skillLevel),
                }}
              >
                {getSkillLevelLabel(p.skillLevel)}
              </span>
            </div>
            <h2 style={{ color: "white", fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>{p.name}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: categoryConfig[activeCategory].color, fontSize: "14px", fontWeight: "500" }}>
                {p.institution.name}
              </span>
              <span style={{ color: "#2A3A4D" }}>•</span>
              <span style={{ color: "#6B7A8C", fontSize: "14px", display: "flex", alignItems: "center", gap: "4px" }}>
                <MapPin size={14} /> {p.institution.city}, {p.institution.province}
              </span>
            </div>
          </div>
          <button onClick={() => setSelectedProgram(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7A8C" }}>
            <X size={24} />
          </button>
        </div>

        {/* Description */}
        <p style={{ color: "#B8C5D3", fontSize: "14px", lineHeight: "1.7", marginBottom: "24px" }}>{p.description}</p>

        {/* Key Info Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <Clock size={20} style={{ color: "#3498DB", marginBottom: "8px" }} />
            <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{p.duration}</div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Duration</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <Monitor size={20} style={{ color: "#9B59B6", marginBottom: "8px" }} />
            <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{getDeliveryModeLabel(p.deliveryMode)}</div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Delivery</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <DollarSign size={20} style={{ color: p.cost === 0 ? "#2ECC71" : "#F1C40F", marginBottom: "8px" }} />
            <div style={{ color: p.cost === 0 ? "#2ECC71" : "white", fontSize: "14px", fontWeight: "600" }}>
              {p.cost === 0 ? "FREE" : `$${p.cost.toLocaleString()}`}
            </div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Cost (CAD)</div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D", textAlign: "center" }}>
            <Globe size={20} style={{ color: "#E67E22", marginBottom: "8px" }} />
            <div style={{ color: "white", fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>
              {p.language === 'bilingual' ? 'EN/FR' : p.language.toUpperCase()}
            </div>
            <div style={{ color: "#6B7A8C", fontSize: "11px" }}>Language</div>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Enrollment</span>
              <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>
                {Math.round((p.currentEnrollment / p.enrollmentCapacity) * 100)}%
              </span>
            </div>
            <div style={{ width: "100%", height: "8px", backgroundColor: "#0A1628", borderRadius: "4px", overflow: "hidden" }}>
              <div
                style={{
                  width: `${(p.currentEnrollment / p.enrollmentCapacity) * 100}%`,
                  height: "100%",
                  backgroundColor: categoryConfig[activeCategory].color,
                  borderRadius: "4px",
                }}
              />
            </div>
            <div style={{ marginTop: "8px", color: "#8B9CAD", fontSize: "12px" }}>
              {p.currentEnrollment.toLocaleString()} / {p.enrollmentCapacity.toLocaleString()} students
            </div>
          </div>
          <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <CheckCircle size={18} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Completion Rate</span>
            </div>
            <div style={{ color: "#2ECC71", fontSize: "28px", fontWeight: "700" }}>{p.completionRate}%</div>
          </div>
          {p.employmentRate && (
            <div style={{ backgroundColor: "#162032", padding: "16px", borderRadius: "10px", border: "1px solid #2A3A4D" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <Briefcase size={18} style={{ color: "#3498DB" }} />
                <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Employment Rate</span>
              </div>
              <div style={{ color: "#3498DB", fontSize: "28px", fontWeight: "700" }}>{p.employmentRate}%</div>
            </div>
          )}
        </div>

        {/* Skills & Tools */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
          <div>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Target size={16} style={{ color: categoryConfig[activeCategory].color }} />
              Skills You'll Learn
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {p.skills.map((skill, i) => (
                <span key={i} style={{ padding: "6px 12px", backgroundColor: "#0A1628", borderRadius: "6px", color: "#B8C5D3", fontSize: "12px" }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Zap size={16} style={{ color: "#F1C40F" }} />
              Tools & Technologies
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {p.tools.map((tool, i) => (
                <span key={i} style={{ padding: "6px 12px", backgroundColor: "rgba(241, 196, 15, 0.1)", borderRadius: "6px", color: "#F1C40F", fontSize: "12px" }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Outcomes */}
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <TrendingUp size={16} style={{ color: "#2ECC71" }} />
            Career Outcomes
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {p.outcomes.map((outcome, i) => (
              <span key={i} style={{ padding: "8px 14px", backgroundColor: "rgba(46, 204, 113, 0.1)", borderRadius: "8px", color: "#2ECC71", fontSize: "13px", fontWeight: "500" }}>
                {outcome}
              </span>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        {p.prerequisites && p.prerequisites.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Prerequisites</h4>
            <ul style={{ margin: 0, paddingLeft: "20px" }}>
              {p.prerequisites.map((prereq, i) => (
                <li key={i} style={{ color: "#8B9CAD", fontSize: "13px", marginBottom: "6px" }}>{prereq}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Certification */}
        {p.certification && (
          <div style={{ backgroundColor: "rgba(155, 89, 182, 0.1)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(155, 89, 182, 0.3)", marginBottom: "24px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Award size={24} style={{ color: "#9B59B6" }} />
              <div>
                <div style={{ color: "#9B59B6", fontSize: "12px", fontWeight: "500", marginBottom: "2px" }}>Certification</div>
                <div style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{p.certification}</div>
              </div>
            </div>
          </div>
        )}

        {/* Partner Companies */}
        {p.partnerCompanies && p.partnerCompanies.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px" }}>Partner Companies</h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {p.partnerCompanies.map((company, i) => (
                <span key={i} style={{ padding: "8px 14px", backgroundColor: "#162032", borderRadius: "8px", border: "1px solid #2A3A4D", color: "#B8C5D3", fontSize: "13px" }}>
                  {company}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Start Dates */}
        <div style={{ marginBottom: "24px" }}>
          <h4 style={{ color: "white", fontSize: "14px", fontWeight: "600", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Calendar size={16} style={{ color: "#3498DB" }} />
            Upcoming Start Dates
          </h4>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {p.startDates.map((date, i) => (
              <span key={i} style={{ padding: "8px 14px", backgroundColor: "rgba(52, 152, 219, 0.1)", borderRadius: "8px", color: "#3498DB", fontSize: "13px" }}>
                {date}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          style={{
            width: "100%",
            padding: "14px 24px",
            backgroundColor: categoryConfig[activeCategory].color,
            border: "none",
            borderRadius: "10px",
            color: "white",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          Apply Now
          <ChevronRight size={18} />
        </button>
      </div>
    );
  };

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
                <div style={{ width: "40px", height: "40px", borderRadius: "12px", backgroundColor: "rgba(46, 204, 113, 0.15)", border: "1px solid rgba(46, 204, 113, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <GraduationCap size={20} style={{ color: "#2ECC71" }} />
                </div>
                <div>
                  <h1 style={{ fontSize: "18px", fontWeight: "600", color: "white", margin: 0 }}>AI Education & Workforce</h1>
                  <p style={{ fontSize: "12px", color: "#6B7A8C", margin: 0 }}>Building Canada's AI-ready workforce</p>
                </div>
              </div>
            </div>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Image src="/logo.png" alt="Mission 2050" width={100} height={30} style={{ objectFit: "contain" }} />
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: "1800px", margin: "0 auto", padding: "24px" }}>
        {/* Global Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <BookOpen size={20} style={{ color: "#00D4AA" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Total Programs</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{globalStats.totalPrograms}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Users size={20} style={{ color: "#3498DB" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Currently Enrolled</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{globalStats.totalEnrolled.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Target size={20} style={{ color: "#9B59B6" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Total Capacity</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{globalStats.totalCapacity.toLocaleString()}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Heart size={20} style={{ color: "#2ECC71" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Free Programs</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{globalStats.freePrograms}</div>
          </div>
          <div style={{ backgroundColor: "#1A2738", padding: "20px", borderRadius: "12px", border: "1px solid #2A3A4D" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <Star size={20} style={{ color: "#F1C40F" }} />
              <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Gov Funded</span>
            </div>
            <div style={{ color: "white", fontSize: "28px", fontWeight: "700" }}>{globalStats.govFunded}</div>
          </div>
        </div>

        {/* Category Tabs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          {(Object.keys(categoryConfig) as EducationCategory[]).map((cat) => {
            const config = categoryConfig[cat];
            const Icon = getCategoryIcon(cat);
            const isActive = activeCategory === cat;
            const catCount = programs.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSelectedProgram(null);
                }}
                style={{
                  padding: "20px",
                  backgroundColor: isActive ? `${config.color}15` : "#1A2738",
                  border: `2px solid ${isActive ? config.color : "#2A3A4D"}`,
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: `${config.color}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={20} style={{ color: config.color }} />
                  </div>
                  <div>
                    <div style={{ color: isActive ? "white" : "#B8C5D3", fontSize: "15px", fontWeight: "600" }}>{config.label}</div>
                    <div style={{ color: config.color, fontSize: "12px" }}>{catCount} programs</div>
                  </div>
                </div>
                <p style={{ color: "#6B7A8C", fontSize: "12px", margin: 0, lineHeight: "1.4" }}>{config.description}</p>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div style={{ backgroundColor: "#1A2738", padding: "16px 20px", borderRadius: "12px", border: "1px solid #2A3A4D", marginBottom: "24px" }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <Search size={18} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#6B7A8C" }} />
              <input
                type="text"
                placeholder="Search programs or institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 14px 10px 40px",
                  backgroundColor: "#0A1628",
                  border: "1px solid #2A3A4D",
                  borderRadius: "8px",
                  color: "white",
                  fontSize: "14px",
                  outline: "none",
                }}
              />
            </div>
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value as SkillLevel | "all")}
              style={{
                padding: "10px 14px",
                backgroundColor: "#0A1628",
                border: "1px solid #2A3A4D",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                minWidth: "150px",
              }}
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
            <select
              value={deliveryFilter}
              onChange={(e) => setDeliveryFilter(e.target.value as DeliveryMode | "all")}
              style={{
                padding: "10px 14px",
                backgroundColor: "#0A1628",
                border: "1px solid #2A3A4D",
                borderRadius: "8px",
                color: "white",
                fontSize: "14px",
                outline: "none",
                minWidth: "150px",
              }}
            >
              <option value="all">All Delivery</option>
              <option value="in_person">In-Person</option>
              <option value="online">Online</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={showFreeOnly}
                onChange={(e) => setShowFreeOnly(e.target.checked)}
                style={{ width: "16px", height: "16px", accentColor: "#2ECC71" }}
              />
              <span style={{ color: "#B8C5D3", fontSize: "14px" }}>Free Only</span>
            </label>
          </div>
        </div>

        {/* Category Stats Bar */}
        <div style={{ display: "flex", gap: "24px", padding: "16px 20px", backgroundColor: `${categoryConfig[activeCategory].color}10`, borderRadius: "10px", border: `1px solid ${categoryConfig[activeCategory].color}30`, marginBottom: "24px" }}>
          <div>
            <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Programs</span>
            <div style={{ color: "white", fontSize: "18px", fontWeight: "600" }}>{categoryStats.totalPrograms}</div>
          </div>
          <div style={{ width: "1px", backgroundColor: "#2A3A4D" }} />
          <div>
            <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Enrolled</span>
            <div style={{ color: "white", fontSize: "18px", fontWeight: "600" }}>{categoryStats.totalEnrolled.toLocaleString()}</div>
          </div>
          <div style={{ width: "1px", backgroundColor: "#2A3A4D" }} />
          <div>
            <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Avg Completion</span>
            <div style={{ color: "#2ECC71", fontSize: "18px", fontWeight: "600" }}>{categoryStats.avgCompletion}%</div>
          </div>
          <div style={{ width: "1px", backgroundColor: "#2A3A4D" }} />
          <div>
            <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Free Programs</span>
            <div style={{ color: categoryConfig[activeCategory].color, fontSize: "18px", fontWeight: "600" }}>{categoryStats.freePrograms}</div>
          </div>
          <div style={{ width: "1px", backgroundColor: "#2A3A4D" }} />
          <div>
            <span style={{ color: "#6B7A8C", fontSize: "12px" }}>Gov Funded</span>
            <div style={{ color: "#F1C40F", fontSize: "18px", fontWeight: "600" }}>{categoryStats.govFunded}</div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "24px" }}>
          {/* Program List */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ color: "white", fontSize: "16px", fontWeight: "600", margin: 0 }}>
                {categoryConfig[activeCategory].label} ({filteredPrograms.length})
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxHeight: "calc(100vh - 480px)", overflowY: "auto", paddingRight: "8px" }}>
              {filteredPrograms.map(renderProgramCard)}
              {filteredPrograms.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px", color: "#6B7A8C" }}>
                  <Search size={32} style={{ marginBottom: "12px", opacity: 0.5 }} />
                  <p>No programs found matching your criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* Program Detail */}
          <div style={{ backgroundColor: "#1A2738", borderRadius: "12px", border: "1px solid #2A3A4D", padding: "24px", height: "fit-content", maxHeight: "calc(100vh - 480px)", overflowY: "auto" }}>
            {renderProgramDetail()}
          </div>
        </div>
      </div>
    </main>
  );
}
