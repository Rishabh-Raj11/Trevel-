/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JourneyStep } from '../types';
import { Sparkles, Smile, Frown, Compass, CheckCircle, RefreshCcw, Bell } from 'lucide-react';

const JOURNEY_STEPS: JourneyStep[] = [
  {
    phase: 'Phase 1: Booking & Dispatch',
    title: 'Acquisition & Intent',
    action: 'User schedules a ride for a flight/meeting',
    anxietyBefore: 6,
    anxietyAfter: 2,
    painPointsBefore: 'Worrying if a driver will match, accept, and then immediately cancel because the trip is too far or too short.',
    gainPointsAfter: 'Instant booking with absolute matching security & custom Trust Guard backup threshold preferences.'
  },
  {
    phase: 'Phase 2: Live Tracking',
    title: 'The Silent Blindspot',
    action: 'Driver assigned, user monitors car progress',
    anxietyBefore: 8,
    anxietyAfter: 3,
    painPointsBefore: 'Zero indicators of driver reliability. Redundant map monitoring. Wondering if the stationary car icon means driver is asleep.',
    gainPointsAfter: 'TrustScore™ visible. High transparency on driver 30-day reliability & active GPS freshness.'
  },
  {
    phase: 'Phase 3: The Risk Event',
    title: 'Operational Friction',
    action: 'Driver gets stuck in gridlock, stale GPS, or silent decay',
    anxietyBefore: 9,
    anxietyAfter: 3,
    painPointsBefore: 'Sudden, unmitigated "Driver Cancelled" notification occurs. Cold system retry starts at zero. Absolute panic sets in.',
    gainPointsAfter: 'TrustScore drops below 70. Behind the scenes, Trevel auto-queues backup. Safe notification: "We are auto-defending your trip."'
  },
  {
    phase: 'Phase 4: Recovery & Arrival',
    title: 'Journey Outcome',
    action: 'Trip completed, arrival at airport or critical meeting',
    anxietyBefore: 10,
    anxietyAfter: 1,
    painPointsBefore: 'Arrived late, highly stressed, or missed meeting entirely. Complete breach of trust. Prompt app uninstall & competitor switch.',
    gainPointsAfter: 'Driver arrives on time. Pre-emptive backup rescued the schedule without user intervention. Extremely high brand affinity.'
  }
];

interface UserJourneyProps {
  onNext: () => void;
}

export default function UserJourney({ onNext }: UserJourneyProps) {
  const [isTrevelVision, setIsTrevelVision] = useState<boolean>(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
      id="user-journey-tab"
    >
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1A1A1A]/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-2 font-bold font-mono">
            <span>Section 03 · CX Flow Analysis</span>
            <span className="text-[#1A1A1A]/20">•</span>
            <span>Comparative Journey</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">
            Mapping the <span className="italic">Anxiety Peaks</span>
          </h2>
          <p className="text-[#1A1A1A]/70 text-sm mt-1.5 max-w-2xl font-serif italic leading-relaxed">
            Let's trace how a rider's emotional state fluctuates in the current paradigm versus we serving them with TrustScore self-healing guarantees.
          </p>
        </div>

        {/* Toggle Switcher */}
        <div className="flex bg-[#F7F5F0] border border-[#1A1A1A]/15 p-1 rounded-none shrink-0 self-stretch sm:self-auto justify-center select-none" id="journey-toggle-container">
          <button
            id="toggle-reality-btn"
            onClick={() => setIsTrevelVision(false)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-none transition-all cursor-pointer ${
              !isTrevelVision
                ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A]'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
          >
            <Frown className="w-3.5 h-3.5" />
            Current Reality
          </button>
          <button
            id="toggle-solution-btn"
            onClick={() => setIsTrevelVision(true)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold font-mono uppercase tracking-wider rounded-none transition-all cursor-pointer ${
              isTrevelVision
                ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A]'
                : 'text-[#1A1A1A]/60 hover:text-[#1A1A1A]'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            Trevel Assurance
          </button>
        </div>
      </div>

      {/* Side-by-side Interactive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step Navigation Rail */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0" id="step-rail">
          {JOURNEY_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            return (
              <button
                key={idx}
                id={`journey-step-${idx}`}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-1 lg:flex-initial text-left p-4 rounded-none border transition-all duration-150 cursor-pointer shrink-0 min-w-[200px] lg:min-w-0 ${
                  isCurrent
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-md'
                    : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:bg-[#F7F5F0]'
                }`}
              >
                <span className={`text-[9px] font-mono uppercase tracking-wider block ${isCurrent ? 'text-white/60' : 'text-[#1A1A1A]/40'}`}>
                  {step.phase}
                </span>
                <span className={`text-base font-serif font-bold block mt-1 ${isCurrent ? 'text-white' : 'text-[#1A1A1A]'}`}>
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Emotion Visualization and Explainer Panel */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main comparative presentation panel */}
          <div className="bg-white border border-[#1A1A1A]/15 p-6 sm:p-8 relative overflow-hidden shadow-sm min-h-[380px] flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1A1A1A]/5 pb-5">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#1A1A1A]/40 block font-bold">
                    Chronological Spotlight
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#1A1A1A] mt-1">
                    {activeStep.phase}
                  </h3>
                  <p className="text-xs text-[#1A1A1A]/60 italic font-serif mt-0.5">
                    Action: "{activeStep.action}"
                  </p>
                </div>

                {/* Micro Live Gauge */}
                <div className="px-3 py-2 bg-[#F7F5F0] border border-[#1A1A1A]/10 text-center shrink-0">
                  <span className="text-[9px] font-mono text-[#1A1A1A]/45 block uppercase font-bold">Anxiety Rating</span>
                  <span className={`text-lg font-bold font-mono mt-0.5 block ${isTrevelVision ? 'text-emerald-700' : 'text-red-700'}`}>
                    {isTrevelVision ? `${activeStep.anxietyAfter} / 10` : `${activeStep.anxietyBefore} / 10`}
                  </span>
                </div>
              </div>

              {/* Stress Curve Heatmap */}
              <div className="space-y-1.5 bg-[#F7F5F0] border border-[#1A1A1A]/10 p-4">
                <span className="text-[10px] font-mono text-[#1A1A1A]/55 uppercase tracking-wider block font-bold">Relative anxiety comparison:</span>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[9px] font-mono text-[#1A1A1A]/40 uppercase tracking-widest block font-bold">Baseline (Legacy):</span>
                    <div className="text-sm font-bold text-red-700 font-mono mt-0.5 tracking-wider">
                      {'★'.repeat(activeStep.anxietyBefore)}{'☆'.repeat(10 - activeStep.anxietyBefore)}
                    </div>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-[#1A1A1A]/40 uppercase tracking-widest block font-bold">With Live TrustScore™:</span>
                    <div className="text-sm font-bold text-emerald-700 font-mono mt-0.5 tracking-wider">
                      {'★'.repeat(activeStep.anxietyAfter)}{'☆'.repeat(10 - activeStep.anxietyAfter)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Explainer Texts */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={isTrevelVision ? 'trevel' : 'legacy'}
                  initial={{ opacity: 0, x: isTrevelVision ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isTrevelVision ? -10 : 10 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  {!isTrevelVision ? (
                    <div className="bg-red-50/50 border border-red-200 p-5" id="pain-box">
                      <h4 className="text-[10px] font-bold text-red-800 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
                        <Frown className="w-4 h-4" />
                        Anxiety-Ridden Legacy Experience
                      </h4>
                      <p className="text-sm text-red-950 font-serif italic leading-relaxed">
                        "{activeStep.painPointsBefore}"
                      </p>
                    </div>
                  ) : (
                    <div className="bg-emerald-50/50 border border-emerald-200 p-5" id="gain-box">
                      <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
                        <Smile className="w-4 h-4" />
                        Self-Healing Trust Experience
                      </h4>
                      <p className="text-sm text-emerald-950 font-serif italic leading-relaxed">
                        "{activeStep.gainPointsAfter}"
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Simulated Live System Message Preview */}
            <div className="bg-[#FCFBF9] border border-[#1A1A1A]/10 p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-4 h-4 text-[#1A1A1A] shrink-0" />
                <span className="text-[9px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.15em] font-bold">Live System Event</span>
              </div>
              <p className="text-xs text-[#1A1A1A]/75 leading-relaxed font-mono">
                {isTrevelVision ? (
                  <span>
                    <strong className="text-emerald-800">[SYSTEM REASSURANCE SENT]:</strong> "Hi Raj, we detected minor signal delay. Your trip details remain 100% secured with backup tracking activated. Rest easy."
                  </span>
                ) : (
                  <span>
                    <strong className="text-red-800">[GENERIC ALERT ERROR]:</strong> "Oops, driver cancelled! Finding next closest rides..." (Anxiety spikes. You watch a spinning loading circle, completely in the dark).
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom design review */}
      <div className="bg-[#F7F5F0] border border-[#1A1A1A]/15 p-6 flex flex-col md:flex-row gap-6 items-center">
        <Compass className="w-10 h-10 text-[#1A1A1A]/70 shrink-0" />
        <div>
          <h4 className="font-serif font-bold text-[#1A1A1A] text-base">UX Designer Conclusion: Eradicating Information Asymmetry</h4>
          <p className="text-xs text-[#1A1A1A]/70 mt-1 leading-relaxed font-sans">
            Legacy ride-sharing systems treat users as passengers in an automated, opaque lottery. By introducing 
            the <strong>TrustScore transparency indicator</strong> and <strong>proactive feedback systems</strong>, 
            we replace fear with predictability. The user no longer needs to keep three competitor rides open at the airport.
          </p>
        </div>
      </div>

      {/* Forward Button */}
      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="group flex items-center gap-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold px-6 py-4.5 transition-all duration-300 cursor-pointer shadow-sm"
        >
          Proceed to Q3: Core TrustScore™ Sandbox
          <Compass className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

