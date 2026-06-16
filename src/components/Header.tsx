/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, Award, Calendar } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: { id: string; label: string; number: string }[];
}

export default function Header({ activeTab, setActiveTab, tabs }: HeaderProps) {
  return (
    <header className="w-full bg-[#FCFBF9] text-[#1A1A1A] border-b border-[#1A1A1A]/10" id="app-header">
      {/* Brand & Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] border-b border-[#1A1A1A]/5">
        <div className="flex items-center gap-3">
          <span className="bg-[#1A1A1A] text-white font-bold px-2 py-0.5 tracking-[0.2em] font-mono text-[9px] uppercase">
            PORTFOLIO SUBMISSION
          </span>
          <span className="text-[#1A1A1A]/65 font-mono">
            Candidate: <strong className="text-[#1A1A1A] font-semibold">Raj Rishabh</strong>
          </span>
          <span className="text-[#1A1A1A]/20 font-light">|</span>
          <span className="text-[#1A1A1A]/60 font-mono">Product Design Intern Candidate</span>
        </div>
        <div className="flex items-center gap-6 text-[#1A1A1A]/65 font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#1A1A1A]/70" />
            <span>June 2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#1A1A1A]/80" />
            <span>Trevel Trust Challenge</span>
          </div>
        </div>
      </div>

      {/* Main Branding Block */}
      <div className="bg-[#F7F5F0] py-8 sm:py-10 border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            {/* Styled Logo matching the Editorial aesthetic */}
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-3 select-none">
              <span className="text-4xl font-serif font-black tracking-tighter text-[#1A1A1A]">
                T<span className="italic font-normal text-amber-700">R</span>EVEL.
              </span>
              <span className="text-[#1A1A1A]/40 font-mono text-[10px] tracking-[0.25em] uppercase font-bold">
                Rethinking Urban Mobility
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#1A1A1A]">
              Product Design Internship Challenge
            </h1>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-1.5 max-w-2xl font-serif italic">
              End-to-End Trust-Centered UX Design for Solving the Driver Cancellation Epidemic.
            </p>
          </div>
          
          {/* Visual USP Badge (Styled as clean print-spec label) */}
          <div className="flex items-start gap-3 bg-[#FCFBF9] border border-[#1A1A1A]/15 p-4 rounded-none max-w-sm shadow-sm">
            <div className="p-2 bg-[#1A1A1A]/5 rounded-none text-[#1A1A1A] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-[10px] text-[#1A1A1A] uppercase tracking-[0.2em]">
                The Product Promise
              </div>
              <p className="text-xs text-[#1A1A1A]/70 mt-1 font-serif italic leading-relaxed">
                "Zero Cancellation. Guaranteed." of ride dispatch via real-time self-healing orchestration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-[#FCFBF9] border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 py-4 overflow-x-auto scrollbar-none" aria-label="Tabs" id="main-navigation">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative shrink-0 font-mono text-xs px-5 py-2.5 transition-all duration-150 cursor-pointer uppercase tracking-wider ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-white font-bold border border-[#1A1A1A]'
                      : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/5 border border-transparent'
                  }`}
                >
                  <span className={`${isSelected ? 'text-[#FCFBF9]/65' : 'text-[#1A1A1A]/40'} font-semibold mr-1.5`}>{tab.number}</span>
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

