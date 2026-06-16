/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, HeartHandshake, ChevronRight, UserCheck, RefreshCw } from 'lucide-react';

interface OverviewProps {
  onNext: () => void;
}

export default function Overview({ onNext }: OverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-12"
      id="overview-tab"
    >
      {/* Hero Intro */}
      <div className="bg-white border border-[#1A1A1A]/10 p-8 md:p-12 text-center relative overflow-hidden shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#1A1A1A] text-[#1A1A1A] font-mono text-[10px] uppercase tracking-widest mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Section 01: Product Thinking Showcase</span>
        </div>

        <h2 className="text-3.5xl md:text-5.5xl font-serif font-bold tracking-tight text-[#1A1A1A] max-w-4xl mx-auto leading-[1.15]">
          Restoring <span className="italic">Absolute Trust</span> in Urban Mobility
        </h2>
        
        <p className="text-[#1A1A1A]/75 text-base md:text-lg mt-5 max-w-3xl mx-auto leading-relaxed font-serif italic">
          While other ride-hailing apps treat driver cancellation as a routine routing recalculation, 
          <span className="text-[#1A1A1A] font-bold not-italic"> Trevel</span> approaches it as a critical trust failure. We design a product layer that is operationally self-healing.
        </p>

        <div className="max-w-2xl mx-auto p-6 bg-[#F7F5F0] border border-[#1A1A1A]/15 mt-8 text-left text-xs text-[#1A1A1A]/80 font-mono leading-relaxed">
          <span className="font-bold text-[#1A1A1A] uppercase tracking-widest mr-2 block mb-1">Candidate Note on Fidelity:</span>
          "The challenge guidelines request a prototype or wireframe emphasizing core product thinking rather than cosmetic vanity. While I've applied a clean, eye-safe, and highly structured layout, this submission focuses on 
          <strong> high-fidelity interaction design</strong> and <strong>logic</strong>: you can actively dial the variables to force system responses."
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={onNext}
            id="overview-start-btn"
            className="group flex items-center gap-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold px-8 py-4 transition-all duration-300 shadow-sm cursor-pointer"
          >
            Explore Q1: Trust Problem
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Trust Philosophy Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#1A1A1A]/10 p-8 shadow-sm">
          <div className="w-10 h-10 bg-[#1A1A1A]/5 text-[#1A1A1A] flex items-center justify-center mb-4">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Driver Cancellation Epidemic</h3>
          <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
            Cancellation strikes at the worst possible moment—when schedules are planned and rigid. 
            By transferring the problem entirely to the user with zero proactive mitigation, 
            incumbents break customer trust in critical life moments.
          </p>
        </div>

        <div className="bg-white border border-[#1A1A1A]/10 p-8 shadow-sm">
          <div className="w-10 h-10 bg-[#1A1A1A]/5 text-[#1A1A1A] flex items-center justify-center mb-4">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">The TrustScore™ Solution</h3>
          <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
            Instead of a static star rating, TrustScore™ is a 0–100 live confidence signal recalculated 
            every 60 seconds of a booking. It aggregates 30-day driver cancel history, real-time GPS freshness, 
            route congestion, and pre-shift checklists.
          </p>
        </div>

        <div className="bg-white border border-[#1A1A1A]/10 p-8 shadow-sm">
          <div className="w-10 h-10 bg-[#1A1A1A]/5 text-[#1A1A1A] flex items-center justify-center mb-4">
            <RefreshCw className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-3">Self-Healing Dispatch</h3>
          <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-sans">
            Once a live booking's TrustScore™ dips below 70, the Trevel backend autonomously and silently 
            queues a high-reliability backup driver. The passenger receives immediate reassurance, 
            leaving anxious app-switching a thing of the past.
          </p>
        </div>
      </div>

      {/* Business Case KPI Banner */}
      <div className="bg-[#F7F5F0] border border-[#1A1A1A]/15 p-8 md:p-10 shadow-sm">
        <h4 className="font-mono text-[10px] text-[#1A1A1A]/60 tracking-[0.25em] uppercase mb-8 text-center font-bold">
          Projected Impact Metrics &amp; Brand Outcomes
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:combine-divide-x md:divide-x divide-[#1A1A1A]/10">
          <div className="pt-4 md:pt-0">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] block">+18pt</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mt-2 block">Expected NPS Lift</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A] block">30%</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mt-2 block">Repeat Premium Bookings</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]/80 block">↓ 40%</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mt-2 block">Drop in Support Tickets</span>
          </div>
          <div className="pt-4 md:pt-0">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#1A1A1A]/80 block">3 wks</span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#1A1A1A]/50 mt-2 block">MVP Development Timeline</span>
          </div>
        </div>
      </div>

      {/* Core Insight Quote */}
      <blockquote className="font-serif text-lg md:text-xl italic text-[#1A1A1A]/85 border-l-2 border-[#1A1A1A] pl-6 md:pl-8 py-2 my-10 max-w-4xl leading-relaxed">
        "Driver cancellation is not just an ops problem—it's a trust design problem. Every other app treats it as a routing failure and moves on. Trevel's USP is zero cancellation. That's not just a feature claim—it's the brand promise."
      </blockquote>
    </motion.div>
  );
}

