"use client";

import Link from "next/link";
import { ArrowLeft, Leaf, LucideIcon } from "lucide-react";

interface ModuleLayoutProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColor: string;
  children: React.ReactNode;
}

export default function ModuleLayout({
  title,
  subtitle,
  icon: Icon,
  iconColor,
  children,
}: ModuleLayoutProps) {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-[1800px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-white transition-colors"
              >
                <ArrowLeft size={18} />
                <span className="text-sm">Back</span>
              </Link>
              
              <div className="w-px h-6 bg-[var(--border)]" />
              
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: `${iconColor}15`,
                    border: `1px solid ${iconColor}30`,
                  }}
                >
                  <Icon style={{ color: iconColor }} size={20} />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-white">{title}</h1>
                  <p className="text-xs text-[var(--text-muted)]">{subtitle}</p>
                </div>
              </div>
            </div>
            
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center">
                <Leaf className="text-white" size={16} />
              </div>
              <span className="text-white font-semibold text-sm hidden sm:inline">Mission 2050</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-[1800px] mx-auto px-6 py-6">
        {children}
      </div>
    </main>
  );
}
