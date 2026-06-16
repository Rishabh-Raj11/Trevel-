/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserSegment, UserSegmentId } from '../types';
import { Briefcase, Plane, Moon, Calendar, AlertOctagon, ArrowRight, Activity, Smile, TrendingUp } from 'lucide-react';

const SEGMENTS: UserSegment[] = [
  {
    id: 'airport',
    name: 'Airport Transfer Users',
    tagline: 'The Mission-Critical Premium Segment',
    riskDescription: 'A driver cancellation 20-25 minutes before departure is catastrophic. Stranded travelers miss flights, incurring heavy rebooking fees, severe business disruptions, and deep frustration.',
    tolerance: 'Absolute Zero Tolerance. A single drop makes them permanently abandon the app.',
    volumeShare: '40%+ of premium revenue',
    anxietyIndex: 94,
    color: 'border-[#1A1A1A] text-[#1A1A1A] bg-[#1A1A1A]/5',
    iconName: 'plane'
  },
  {
    id: 'corporate',
    name: 'Corporate Commuters',
    tagline: 'High-Value Professional Riders',
    riskDescription: 'These riders have flight-tight client meetings, interviews, or board deliverables. A last-minute cancel means a missed meeting, a dent in professional reputation, and direct loss of product trust.',
    tolerance: 'Extremely Low. Two cancellations in a month means complete deletion of company invoice profile.',
    volumeShare: '25% of weekday ridership',
    anxietyIndex: 82,
    color: 'border-[#1A1A1A] text-[#1A1A1A] bg-[#1A1A1A]/5',
    iconName: 'briefcase'
  },
  {
    id: 'night',
    name: 'Solo Night Riders',
    tagline: 'Safety-Critical Nighttime Commuters',
    riskDescription: 'At late hours (12 AM - 4 AM), sudden driver cancellations leave solo night commuters stranded in dimly lit streets, forcing them to pivot to unknown drivers or wait in unsafe locations. Here, a trust break is a safety break.',
    tolerance: 'Zero Tolerance. Core safety breach of the platform guarantee.',
    volumeShare: '15% of late-hour trips',
    anxietyIndex: 88,
    color: 'border-[#1A1A1A] text-[#1A1A1A] bg-[#1A1A1A]/5',
    iconName: 'moon'
  },
  {
    id: 'prescheduled',
    name: 'Pre-Scheduled Bookers',
    tagline: 'Early-Bird Planner Segment',
    riskDescription: 'Riders who plan 3-4 hours or even days ahead explicitly do so to peace-of-mind coordinate key events. A last-minute cancellation completely collapses the downstream schedules they carefully constructed.',
    tolerance: 'Low Tolerance. Pre-booking exists specifically to buy peace of mind; cancellation ruins the product purpose.',
    volumeShare: '20% of total pre-bookings',
    anxietyIndex: 75,
    color: 'border-[#1A1A1A] text-[#1A1A1A] bg-[#1A1A1A]/5',
    iconName: 'calendar'
  }
];

interface TrustProblemProps {
  onNext: () => void;
}

export default function TrustProblem({ onNext }: TrustProblemProps) {
  const [selectedSegment, setSelectedSegment] = useState<UserSegmentId>('airport');

  const activeSegment = SEGMENTS.find(s => s.id === selectedSegment)!;

  const renderIcon = (name: string, isSelected: boolean) => {
    const iconClass = `w-5 h-5 ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`;
    switch (name) {
      case 'plane': return <Plane className={iconClass} />;
      case 'briefcase': return <Briefcase className={iconClass} />;
      case 'moon': return <Moon className={iconClass} />;
      default: return <Calendar className={iconClass} />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
      id="trust-problem-tab"
    >
      {/* Title & Framing */}
      <div className="border-b border-[#1A1A1A]/10 pb-6">
        <div className="flex items-center gap-2 text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-2 font-bold">
          <span>Section 02 · Problem Validation</span>
          <span className="text-[#1A1A1A]/20">•</span>
          <span>Empathy Analysis</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1A1A1A]">
          Driver Cancellation is the <span className="italic">#1 Trust Destroyer</span>
        </h2>
        <p className="text-[#1A1A1A]/70 text-sm sm:text-base mt-2 max-w-4xl font-serif italic leading-relaxed">
          Cancellation strikes at the worst possible moment—when the passenger has rigid, non-negotiable plans. 
          Unlike traffic delays, a cancellation forces a complete, stressful restart. It triggers instant app-switching and lifelong negative Brand advocacy.
        </p>
      </div>

      {/* Empathy Segment Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: segments checklist */}
        <div className="lg:col-span-5 space-y-4">
          <div className="text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.25em] font-bold px-1">
            Who Gets Hurt Most? (Select below)
          </div>

          <div className="space-y-3" id="segment-list">
            {SEGMENTS.map((s) => {
              const isSelected = selectedSegment === s.id;
              return (
                <button
                  key={s.id}
                  id={`segment-btn-${s.id}`}
                  onClick={() => setSelectedSegment(s.id)}
                  className={`w-full text-left p-4 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A] shadow-md'
                      : 'bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 hover:bg-[#F7F5F0] hover:border-[#1A1A1A]/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 border ${isSelected ? 'border-white/20 bg-white/5' : 'border-[#1A1A1A]/15 bg-[#1a1c22]/5 animate-none'} rounded-none`}>
                        {renderIcon(s.iconName, isSelected)}
                      </div>
                      <div>
                        <div className={`font-serif text-sm font-bold ${isSelected ? 'text-white' : 'text-[#1A1A1A]'}`}>{s.name}</div>
                        <div className={`text-xs mt-0.5 ${isSelected ? 'text-white/60' : 'text-[#1A1A1A]/50'} font-mono`}>{s.volumeShare}</div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column: segment detailed profile card */}
        <div className="lg:col-span-7 bg-white border border-[#1A1A1A]/15 p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div className="space-y-6" id="segment-detail-card">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#1A1A1A]/5 pb-5">
              <div>
                <span className="text-[9px] font-mono text-[#1A1A1A]/40 uppercase tracking-[0.2em] font-bold">
                  Segment Profile Analysis
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mt-1">{activeSegment.name}</h3>
                <p className="text-xs text-[#1A1A1A]/50 font-mono mt-0.5 uppercase tracking-wider">{activeSegment.tagline}</p>
              </div>
              <div className="px-3 py-1.5 bg-[#F7F5F0] border border-[#1A1A1A]/10 text-right shrink-0">
                <span className="text-[9px] font-mono text-[#1A1A1A]/40 uppercase block font-bold">Anxiety Index</span>
                <span className="text-xl font-bold text-[#1A1A1A] font-mono">{activeSegment.anxietyIndex}%</span>
              </div>
            </div>

            {/* Anxiety Index Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#1A1A1A]/45 uppercase tracking-wider text-[10px]">Anxiety Index Gauge:</span>
                <span className="text-[#1A1A1A] font-bold uppercase tracking-wider text-[10px]">Extremely High Risk</span>
              </div>
              <div className="w-full bg-[#E5E2DC] h-1.5 rounded-none overflow-hidden">
                <motion.div
                  key={activeSegment.id}
                  initial={{ width: 0 }}
                  animate={{ width: `${activeSegment.anxietyIndex}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="bg-[#1A1A1A] h-full"
                />
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="bg-[#F7F5F0] border border-[#1A1A1A]/10 p-5">
                <h4 className="text-[10px] font-mono text-[#1A1A1A]/80 uppercase tracking-[0.15em] mb-2 font-bold flex items-center gap-1.5">
                  <AlertOctagon className="w-3.5 h-3.5 text-[#1A1A1A]" />
                  The Critical Cancellation Impact
                </h4>
                <p className="text-sm text-[#1A1A1A]/75 leading-relaxed font-serif italic">
                  "{activeSegment.riskDescription}"
                </p>
              </div>

              <div>
                <h4 className="text-[9px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-1.5 font-bold">
                  User Churn Threshold Behavior
                </h4>
                <p className="text-xs text-[#1A1A1A]/70 bg-white px-3 py-2.5 border border-[#1A1A1A]/10 leading-relaxed font-sans">
                  {activeSegment.tolerance}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#1A1A1A]/5 flex items-center justify-between text-[11px] text-[#1A1A1A]/55 font-mono">
            <span>Customer Empathy Mapping</span>
            <span className="text-[#1A1A1A] font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              Active Focus Segment <Activity className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Metric Sizing Section */}
      <div className="bg-[#F7F5F0] border border-[#1A1A1A]/15 p-6 md:p-8">
        <h3 className="text-xl font-serif font-bold text-[#1A1A1A] mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#1A1A1A]/70" />
          The Value Proposition Of Predictability
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-[#1A1A1A]/10 p-5 text-center">
            <span className="text-3xl font-serif font-bold text-[#1A1A1A] block">+18pt</span>
            <h4 className="text-[9px] font-mono font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-2 mb-1">Expected NPS Lift</h4>
            <p className="text-xs text-[#1A1A1A]/65 leading-relaxed">
              Standardized customer delight benchmark instantly jumps when rides are guaranteed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#1A1A1A]/10 p-5 text-center">
            <span className="text-3xl font-serif font-bold text-[#1A1A1A] block">30%</span>
            <h4 className="text-[9px] font-mono font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-2 mb-1">Higher Repeat Bookings</h4>
            <p className="text-xs text-[#1A1A1A]/65 leading-relaxed">
              Secures recurring ride subscriptions from commuters relying entirely on transport uptime.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#1A1A1A]/10 p-5 text-center">
            <span className="text-3xl font-serif font-bold text-[#1A1A1A] block">68%</span>
            <h4 className="text-[9px] font-mono font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-2 mb-1">Airport Cancel Fear</h4>
            <p className="text-xs text-[#1A1A1A]/65 leading-relaxed">
              The exact proportion of airport riders who currently feel severe anxiety before pick-up.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#1A1A1A]/10 p-5 text-center">
            <span className="text-3xl font-serif font-bold text-[#1A1A1A]/70 block">~34%</span>
            <h4 className="text-[9px] font-mono font-bold text-[#1A1A1A]/50 uppercase tracking-widest mt-2 mb-1">Historical Risk</h4>
            <p className="text-xs text-[#1A1A1A]/65 leading-relaxed">
              Percentage of standard trips that historically faced at least one cancel-recalculating shock.
            </p>
          </div>
        </div>

        {/* Empathy Stat comparison */}
        <div className="mt-8 bg-white border border-[#1A1A1A]/15 p-5 sm:p-6" id="promise-box">
          <div className="flex gap-4 items-start">
            <div className="p-2.5 bg-[#1A1A1A]/5 text-[#1A1A1A] rounded-none shrink-0 mt-0.5">
              <Smile className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-[0.2em] mb-1">
                Headline Promise: "Zero Cancellation. Guaranteed."
              </h4>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-serif italic">
                By delivering this exact headline, Trevel matches customer emotional needs directly. 
                Our backend self-healing logic creates a completely predictable product experience—which translates into 
                extreme customer loyalty, turning an operational cost into our #1 product differentiator.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Button to proceed */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="group flex items-center gap-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold px-6 py-4.5 transition-all duration-300 cursor-pointer shadow-sm"
        >
          Explore Q2: User Journey Maps
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
