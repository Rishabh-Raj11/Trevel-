/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrustSignals, ScoreBreakdown } from '../types';
import { 
  ShieldCheck, AlertTriangle, Play, RefreshCw, Car, Check, 
  MapPin, Sliders, FileText, Smartphone, Gauge, AlertCircle, Compass
} from 'lucide-react';

interface TrustScoreSandboxProps {
  onNext: () => void;
}

export default function TrustScoreSandbox({ onNext }: TrustScoreSandboxProps) {
  // Init state
  const [signals, setSignals] = useState<TrustSignals>({
    driverCancelRate: 98,
    gpsFreshness: 4,
    routeCongestion: 'clear',
    vehicleHealth: 'excellent'
  });

  const [activePreset, setActivePreset] = useState<string>('ideal');
  const [logFeed, setLogFeed] = useState<string[]>([]);
  const [simRunning, setSimRunning] = useState<boolean>(true);
  const [timeTicker, setTimeTicker] = useState<number>(0);

  // Math calculation of TrustScore as per Q03 weight guidelines.
  const calculateTrustScore = (sig: TrustSignals): ScoreBreakdown => {
    // 1. Driver cancel rate score (40% weight) - Drivers below 95% reliability flagged
    let cancelRateScore = 0;
    if (sig.driverCancelRate >= 98) {
      cancelRateScore = 100;
    } else if (sig.driverCancelRate >= 95) {
      cancelRateScore = 90;
    } else if (sig.driverCancelRate >= 90) {
      cancelRateScore = 60;
    } else {
      cancelRateScore = 20;
    }

    // 2. GPS Signal FRESHNESS (25% weight)
    let gpsScore = 0;
    if (sig.gpsFreshness <= 10) {
      gpsScore = 100;
    } else if (sig.gpsFreshness <= 20) {
      gpsScore = 80;
    } else if (sig.gpsFreshness <= 30) {
      gpsScore = 60; // 30s limit
    } else if (sig.gpsFreshness <= 45) {
      gpsScore = 30; // stale alert
    } else {
      gpsScore = 0;
    }

    // 3. Route Congestion (20% weight)
    let congestionScore = 0;
    if (sig.routeCongestion === 'clear') {
      congestionScore = 100;
    } else if (sig.routeCongestion === 'moderate') {
      congestionScore = 75;
    } else {
      congestionScore = 40;
    }

    // 4. Vehicle health status (15% weight)
    let healthScore = 0;
    if (sig.vehicleHealth === 'excellent') {
      healthScore = 100;
    } else if (sig.vehicleHealth === 'normal') {
      healthScore = 80;
    } else {
      healthScore = 30; // Pre-shift checklist warning/low battery
    }

    // Weighted average
    const finalScore = Math.round(
      (cancelRateScore * 0.4) + 
      (gpsScore * 0.25) + 
      (congestionScore * 0.2) + 
      (healthScore * 0.15)
    );

    let label: 'Excellent' | 'Good' | 'At Risk' = 'Excellent';
    let color = 'text-emerald-800 border-emerald-500';
    if (finalScore >= 90) {
      label = 'Excellent';
      color = 'text-emerald-800 border-emerald-500 bg-emerald-50';
    } else if (finalScore >= 70) {
      label = 'Good';
      color = 'text-amber-800 border-amber-500 bg-amber-50';
    } else {
      label = 'At Risk';
      color = 'text-red-800 border-red-500 bg-red-50';
    }

    return {
      score: finalScore,
      label,
      color,
      cancelRateScore,
      gpsScore,
      congestionScore,
      healthScore
    };
  };

  const breakdown = calculateTrustScore(signals);

  // Ticker of automatic simulation
  useEffect(() => {
    if (!simRunning) return;
    const interval = setInterval(() => {
      setTimeTicker((prev) => prev + 1);
      // Inject some ambient randomness if in ideal state
      if (activePreset === 'ideal') {
        const randomGps = Math.floor(Math.random() * 4) + 2; // fluctuate between 2-5s
        setSignals((prev) => ({ ...prev, gpsFreshness: randomGps }));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [simRunning, activePreset]);

  // Log updater when signals change
  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    let newLog = `[${timestamp}] Telemetry update: Score recalculated at ${breakdown.score}. Status is ${breakdown.label}.`;
    
    if (breakdown.score < 70) {
      newLog = `⚠️ [${timestamp}] ALERT: TrustScore fell below critical 70! Self-Healing protocol triggered. SILENT REASSURING & BACKUP DISPATCH AUTO-QUEUED.`;
    } else if (breakdown.score < 90) {
      newLog = `🔍 [${timestamp}] MONITOR: Score is Good (${breakdown.score}). Active mitigation monitoring underway. No traveler action required.`;
    }

    setLogFeed((prev) => [newLog, ...prev.slice(0, 5)]);
  }, [breakdown.score, breakdown.label]);

  // Preset handlers
  const applyPreset = (preset: string) => {
    setActivePreset(preset);
    switch (preset) {
      case 'ideal':
        setSignals({
          driverCancelRate: 99,
          gpsFreshness: 3,
          routeCongestion: 'clear',
          vehicleHealth: 'excellent'
        });
        break;
      case 'traffic':
        setSignals({
          driverCancelRate: 98,
          gpsFreshness: 8,
          routeCongestion: 'congested',
          vehicleHealth: 'normal'
        });
        break;
      case 'decay':
        setSignals({
          driverCancelRate: 91, // below 95 flagged
          gpsFreshness: 32, // stale gps
          routeCongestion: 'congested',
          vehicleHealth: 'normal'
        });
        break;
      case 'hardware-warning':
        setSignals({
          driverCancelRate: 96,
          gpsFreshness: 25,
          routeCongestion: 'moderate',
          vehicleHealth: 'alert' // checklist alert
        });
        break;
      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
      id="sandbox-tab"
    >
      {/* Tab Banner */}
      <div className="border-b border-[#1A1A1A]/10 pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-1.5 font-bold">
            <span>Section 04 · Live Blueprint Prototype</span>
            <span className="text-[#1A1A1A]/20">•</span>
            <span>TrustScore™ Engine Simulation</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">TrustScore™ Core Sandbox Simulator</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[9px] bg-red-50 border border-red-200 text-red-900 font-mono px-2 py-1 tracking-wider uppercase font-bold">
            Self-Healing Active
          </span>
          <span className="text-[9px] bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono px-2 py-1 tracking-wider uppercase font-bold">
            Recalcs Real-time
          </span>
        </div>
      </div>

      {/* Main Grid: Telemetry, Map and Cockpit */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Interactor Controls (5 cols) */}
        <div className="xl:col-span-5 bg-white border border-[#1A1A1A]/15 p-6 flex flex-col justify-between space-y-6 shadow-sm">
          <div className="space-y-5">
            <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
              <Sliders className="w-4 h-4 text-[#1A1A1A]/80" />
              <h3 className="text-[11px] font-mono font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">Simulation Controls</h3>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest font-bold block">
                Quick-Trigger Failure Presets:
              </span>
              <div className="grid grid-cols-2 gap-2" id="preset-controls">
                <button
                  id="preset-ideal"
                  onClick={() => applyPreset('ideal')}
                  className={`px-3 py-2 text-xs font-mono font-bold rounded-none border text-left flex items-center justify-between cursor-pointer transition-all ${
                    activePreset === 'ideal' 
                      ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm' 
                      : 'bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:bg-[#F7F5F0] hover:text-[#1A1A1A]'
                  }`}
                >
                  Ideal Perfect Ride
                  <Check className={`w-3.5 h-3.5 shrink-0 ${activePreset === 'ideal' ? 'block' : 'hidden'}`} />
                </button>
                <button
                  id="preset-traffic"
                  onClick={() => applyPreset('traffic')}
                  className={`px-3 py-2 text-xs font-mono font-bold rounded-none border text-left flex items-center justify-between cursor-pointer transition-all ${
                    activePreset === 'traffic' 
                      ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm' 
                      : 'bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:bg-[#F7F5F0] hover:text-[#1A1A1A]'
                  }`}
                >
                  Heavy Congestion
                  <Check className={`w-3.5 h-3.5 shrink-0 ${activePreset === 'traffic' ? 'block' : 'hidden'}`} />
                </button>
                <button
                  id="preset-decay"
                  onClick={() => applyPreset('decay')}
                  className={`px-3 py-2 text-xs font-mono font-bold rounded-none border text-left flex items-center justify-between cursor-pointer transition-all ${
                    activePreset === 'decay' 
                      ? 'bg-[#8B0000] border-[#8B0000] text-white shadow-sm' 
                      : 'bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:bg-[#F7F5F0] hover:text-[#1A1A1A]'
                  }`}
                >
                  Decay (At Risk!)
                  <Check className={`w-3.5 h-3.5 shrink-0 ${activePreset === 'decay' ? 'block' : 'hidden'}`} />
                </button>
                <button
                  id="preset-hardware"
                  onClick={() => applyPreset('hardware-warning')}
                  className={`px-3 py-2 text-xs font-mono font-bold rounded-none border text-left flex items-center justify-between cursor-pointer transition-all ${
                    activePreset === 'hardware-warning' 
                      ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm' 
                      : 'bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:bg-[#F7F5F0] hover:text-[#1A1A1A]'
                  }`}
                >
                  EV/Battery Alert
                  <Check className={`w-3.5 h-3.5 shrink-0 ${activePreset === 'hardware-warning' ? 'block' : 'hidden'}`} />
                </button>
              </div>
            </div>

            {/* Signal Adjusters */}
            <div className="space-y-5 pt-2">
              <span className="text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-widest block border-t border-[#1A1A1A]/10 pt-4 font-bold">
                Fine-Tune Individual Signals:
              </span>

              {/* Slider 1: 30-day cancel */}
              <div className="space-y-1.5" id="slider-cancel-container">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#1A1A1A]/70 font-semibold font-mono">Driver Cancel Rate (30d):</span>
                  <span className={`font-bold ${signals.driverCancelRate >= 95 ? 'text-emerald-800' : 'text-red-800'}`}>
                    {signals.driverCancelRate}% {signals.driverCancelRate < 95 ? '(Flagged)' : ''}
                  </span>
                </div>
                <input
                  id="slider-cancel-rate"
                  type="range"
                  min="70"
                  max="100"
                  value={signals.driverCancelRate}
                  onChange={(e) => {
                    setActivePreset('custom');
                    setSignals({ ...signals, driverCancelRate: parseInt(e.target.value) });
                  }}
                  className="w-full accent-[#1A1A1A] h-1 bg-[#E5E2DC] cursor-pointer"
                />
                <div className="text-[10px] text-[#1A1A1A]/40 flex justify-between font-mono">
                  <span>Below 95% triggers safety alert</span>
                  <span>Weight: 40%</span>
                </div>
              </div>

              {/* Slider 2: GPS Freshness */}
              <div className="space-y-1.5" id="slider-gps-container">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#1A1A1A]/70 font-semibold font-mono">GPS Ping Freshness:</span>
                  <span className={`font-bold ${signals.gpsFreshness <= 30 ? 'text-emerald-800' : 'text-red-800'}`}>
                    {signals.gpsFreshness} seconds old
                  </span>
                </div>
                <input
                  id="slider-gps-freshness"
                  type="range"
                  min="1"
                  max="60"
                  value={signals.gpsFreshness}
                  onChange={(e) => {
                    setActivePreset('custom');
                    setSignals({ ...signals, gpsFreshness: parseInt(e.target.value) });
                  }}
                  className="w-full accent-[#1A1A1A] h-1 bg-[#E5E2DC] cursor-pointer"
                />
                <div className="text-[10px] text-[#1A1A1A]/40 flex justify-between font-mono">
                  <span>Stale if &gt; 30s limit</span>
                  <span>Weight: 25%</span>
                </div>
              </div>

              {/* Select 1: Route Congestion */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="select-congestion" className="text-xs text-[#1A1A1A]/70 font-mono font-semibold">Route Congestion:</label>
                  <select
                    id="select-congestion"
                    value={signals.routeCongestion}
                    onChange={(e) => {
                      setActivePreset('custom');
                      setSignals({ ...signals, routeCongestion: e.target.value as any });
                    }}
                    className="w-full text-xs font-mono bg-white border border-[#1A1A1A]/15 rounded-none p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="clear">Clear Roads</option>
                    <option value="moderate">Moderate Jam</option>
                    <option value="congested">Heavy Gridlock</option>
                  </select>
                  <span className="text-[10px] text-[#1A1A1A]/40 block font-mono">Weight: 20%</span>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="select-health" className="text-xs text-[#1A1A1A]/70 font-mono font-semibold">Vehicle &amp; Pre-Check:</label>
                  <select
                    id="select-health"
                    value={signals.vehicleHealth}
                    onChange={(e) => {
                      setActivePreset('custom');
                      setSignals({ ...signals, vehicleHealth: e.target.value as any });
                    }}
                    className="w-full text-xs font-mono bg-white border border-[#1A1A1A]/15 rounded-none p-2 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="excellent">Checklist OK</option>
                    <option value="normal">Normal Health</option>
                    <option value="alert">Alert Warnings / Low EV</option>
                  </select>
                  <span className="text-[10px] text-[#1A1A1A]/40 block font-mono">Weight: 15%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Simulation State Controls */}
          <div className="bg-[#F7F5F0] border border-[#1A1A1A]/10 p-3.5 rounded-none flex items-center justify-between text-xs mt-6">
            <span className="text-[#1A1A1A]/60 font-mono">Simulated Clock Cycle:</span>
            <div className="flex items-center gap-3">
              <button
                id="toggle-sim-btn"
                onClick={() => setSimRunning(!simRunning)}
                className={`px-3 py-1.5 text-[11px] font-mono font-bold cursor-pointer transition-all ${
                  simRunning ? 'bg-[#1A1A1A] text-white' : 'bg-white border border-[#1A1A1A]/20 text-[#1A1A1A]/60'
                }`}
              >
                {simRunning ? '● LIVE SYNC' : '⏸ PAUSED'}
              </button>
              <button
                aria-label="Reset simulation"
                onClick={() => applyPreset('ideal')}
                className="p-1 px-2 border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/50 bg-white text-[#1A1A1A]/60 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Middle Column: Live Map & Dispatch (4 cols) */}
        <div className="xl:col-span-4 bg-white border border-[#1A1A1A]/15 p-5 flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden min-h-[460px]">
          <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2">
            <h3 className="text-[11px] font-mono font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#1A1A1A]/70" />
              Active Dispatch Map
            </h3>
            <span className="text-[10px] font-mono text-[#1A1A1A]/40">Recalculating in 60s</span>
          </div>

          {/* Live Stylized Vector Map */}
          <div className="flex-1 bg-[#F9F7F3] border border-[#1A1A1A]/10 rounded-none relative overflow-hidden flex items-center justify-center min-h-[280px]" id="journey-simulation-map">
            {/* Styled roads overlay layout using SVG for pure cross-browser speed */}
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <path d="M 0 60 L 400 60" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
              <path d="M 120 0 L 120 400" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
              <path d="M 0 150 C 150 150, 150 300, 400 300" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeDasharray="5,5" />
              <path d="M 280 0 L 280 400" stroke="#1A1A1A" strokeWidth="6" strokeLinecap="round" />
            </svg>

            {/* Passenger Marker */}
            <div className="absolute top-[60px] left-[120px] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
              <div className="p-1 px-2 bg-[#1A1A1A] text-white text-[9px] font-mono font-extrabold shadow-md select-none border border-black/10">
                CLIENT PICKUP
              </div>
              <MapPin className="w-5 h-5 text-[#1A1A1A] stroke-[3]" />
            </div>

            {/* Primary Driver Sanjay: struggling along the road */}
            <motion.div 
              id="active-driver-vehicle"
              className="absolute z-10 flex flex-col items-center"
              animate={{
                top: signals.routeCongestion === 'congested' ? '180px' : '110px',
                left: '280px'
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <Car className="w-6 h-6 text-[#1A1A1A] drop-shadow-md" />
              <span className="text-[9px] font-mono bg-white text-[#1A1A1A] px-1.5 py-0.5 border border-[#1A1A1A]/20 mt-1 select-none font-bold">
                Sanjay (Active)
              </span>
            </motion.div>

            {/* SILENT BACKUP DISPATCH: Animated in if TrustScore < 70 */}
            <AnimatePresence>
              {breakdown.score < 70 && (
                <motion.div
                  id="backup-driver-vehicle"
                  initial={{ opacity: 0, scale: 0.5, top: '350px', left: '120px' }}
                  animate={{ opacity: 1, scale: 1, top: '220px', left: '120px' }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.8 }}
                  className="absolute z-10 flex flex-col items-center"
                >
                  <div className="p-1 bg-[#1A1A1A] text-white text-[8px] font-mono font-extrabold shadow-md select-none border border-black/10 mb-1 leading-snug">
                    BACKUP ACTIVATED
                  </div>
                  <Car className="w-6 h-6 text-[#1A1A1A] drop-shadow-md" />
                  <span className="text-[9px] font-mono bg-[#1A1A1A] text-white px-1.5 py-0.5 border border-[#1A1A1A] mt-1 select-none font-bold">
                    Vikram (99% Guard)
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Aura protect */}
            {breakdown.score < 70 && (
              <div className="absolute top-[60px] left-[120px] -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-[#1A1A1A]/25 bg-[#1A1A1A]/5 rounded-full animate-ping pointer-events-none" />
            )}
          </div>

          {/* Under-the-Hood Explanation of Map state */}
          <div className="bg-[#F7F5F0] p-3 text-[10px] font-mono text-[#1A1A1A]/60 leading-relaxed border border-[#1A1A1A]/10" id="dispatch-details-log">
            {breakdown.score >= 70 ? (
              <span>Sanjay is routed on primary path. System validates GPS updates and telemetry status indicators. Backup services standby.</span>
            ) : (
              <span className="text-[#1A1A1A] font-bold">
                ⚡ CRITICAL ANOMALY: Sanjay's signal has decayed. Self-healing system has engaged Vikram (0.8 miles away, high reliability) silently to secure reservation. No friction for traveler.
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Telemetry Gauge & Logs (3 cols) */}
        <div className="xl:col-span-3 bg-white border border-[#1A1A1A]/15 p-5 flex flex-col justify-between space-y-6 shadow-sm relative overflow-hidden">
          
          {/* Big Live Dial */}
          <div className="space-y-4" id="telemetry-gauge">
            <div className="text-center">
              <span className="text-[10px] font-mono text-[#1A1A1A]/40 uppercase tracking-widest block font-bold">
                Live Confidence Rating
              </span>
              <h4 className="text-[11px] font-mono font-bold text-[#1A1A1A] uppercase tracking-wider mt-0.5">TrustScore™</h4>
            </div>

            <div className="relative flex items-center justify-center py-4">
              {/* Radial Score Meter */}
              <div className="w-36 h-36 rounded-full border border-[#1A1A1A]/20 flex flex-col items-center justify-center relative">
                {/* Visual outline circle depending on quality */}
                <div className={`absolute inset-0 rounded-full border border-dashed opacity-40 ${
                  breakdown.score >= 90 ? 'border-emerald-500' : breakdown.score >= 70 ? 'border-amber-400' : 'border-red-500'
                }`} />

                <span className="text-5xl font-serif font-black tracking-tighter text-[#1A1A1A]">
                  {breakdown.score}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-[#1A1A1A]/50 mt-1">
                  {breakdown.label}
                </span>
              </div>
            </div>

            {/* Score Band Reference Table */}
            <div className="border border-[#1A1A1A]/15 bg-[#FCFBF9] p-3 space-y-2 text-xs font-mono">
              <div className="flex justify-between items-center text-[10px] uppercase text-[#1A1A1A]/40 pb-1 border-b border-[#1A1A1A]/10 font-bold">
                <span>Score Band</span>
                <span>System Action</span>
              </div>
              <div className={`flex justify-between items-center px-1 py-0.5 ${breakdown.score >= 90 ? 'bg-[#1A1A1A] text-white font-bold' : 'text-[#1A1A1A]/60'}`}>
                <span>90-100 (Excellent)</span>
                <span>Standby</span>
              </div>
              <div className={`flex justify-between items-center px-1 py-0.5 ${breakdown.score >= 70 && breakdown.score < 90 ? 'bg-[#1A1A1A] text-white font-bold' : 'text-[#1A1A1A]/60'}`}>
                <span>70-89 (Good)</span>
                <span>Monitor</span>
              </div>
              <div className={`flex justify-between items-center px-1 py-0.5 ${breakdown.score < 70 ? 'bg-red-900 text-white font-bold' : 'text-[#1A1A1A]/60'}`}>
                <span>&lt;70 (At Risk)</span>
                <span className="text-right">Auto-Queue</span>
              </div>
            </div>
          </div>

          {/* Core Reassurance Screen App Mock */}
          <div className="bg-[#FCFBF9] border border-[#1A1A1A]/10 p-3.5 shadow-inner">
            <span className="text-[9px] font-mono text-[#1A1A1A]/40 uppercase tracking-widest flex items-center gap-1.5 mb-2 border-b border-[#1A1A1A]/10 pb-2 font-bold font-mono">
              <Smartphone className="w-3.5 h-3.5" />
              Traveler Phone View
            </span>

            <AnimatePresence mode="wait">
              {breakdown.score >= 90 ? (
                <motion.div
                  key="exc"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1 text-center py-2"
                >
                  <div className="inline-flex p-1 bg-[#1A1A1A]/5 text-[#1A1A1A] rounded-none mb-1">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-serif font-bold text-[#1A1A1A]">Ride Confidence Confirmed</div>
                  <p className="text-[10px] text-[#1A1A1A]/60 leading-normal font-serif italic">
                    "Your driver is highly reliable and is heading directly your way."
                  </p>
                </motion.div>
              ) : breakdown.score >= 70 ? (
                <motion.div
                  key="good"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-1 text-center py-2"
                >
                  <div className="inline-flex p-1 bg-[#1A1A1A]/5 text-[#1A1A1A] rounded-none mb-1">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-serif font-bold text-[#1A1A1A]">Normal Traffic Routing</div>
                  <p className="text-[10px] text-[#1A1A1A]/60 leading-normal font-serif italic">
                    "Driver making steady progress around road signals. ETA unchanged."
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="risk"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2 text-center py-1.5"
                >
                  <div className="inline-flex p-1 bg-red-50 text-red-900 rounded-none">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-serif font-bold text-red-900 uppercase tracking-wide">
                    Shield Guarantee Engaged
                  </div>
                  <p className="text-[9px] text-[#1A1A1A]/70 leading-normal font-mono px-1">
                    We've silently secured Vikram to guarantee your departure time. Rest easy.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Telemetry Log Terminal */}
          <div className="bg-[#FCFBF9] border border-[#1A1A1A]/10 p-3 font-mono text-[9px] text-[#1A1A1A]/75 h-28 overflow-y-auto space-y-1.5 select-all" id="telemetry-log-panel">
            <span className="text-[#1A1A1A] font-bold border-b border-[#1A1A1A]/10 block pb-1 uppercase tracking-wider text-[8px] font-mono">LIVE SYSTEM LOGS:</span>
            {logFeed.map((log, i) => (
              <div key={i} className="leading-normal truncate">{log}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Why This Feature, Why Now Columns */}
      <div className="bg-[#F7F5F0] border border-[#1A1A1A]/15 p-6 md:p-8">
        <h4 className="text-[10px] font-mono font-bold text-[#1A1A1A]/60 uppercase tracking-[0.2em] mb-6 text-center">
          Pragmatic Product Architecture Review
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="bg-white border border-[#1A1A1A]/10 p-5">
            <span className="font-serif font-bold text-base text-[#1A1A1A] block mb-2">1. Low Engineering Lift</span>
            <span className="text-[#1A1A1A]/75 font-sans">
              No custom hardware tracker required. Our signal inputs rely entirely on existing device telemetry (phones, driver GPS). It compiles and delivers value in weeks via server-side analytics.
            </span>
          </div>
          <div className="bg-white border border-[#1A1A1A]/10 p-5">
            <span className="font-serif font-bold text-base text-[#1A1A1A] block mb-2">2. Dynamic Brand USP</span>
            <span className="text-[#1A1A1A]/75 font-sans">
              Uber or Ola only communicate standard static star ratings. TrustScore™ creates a dynamic, brand-owned trust reassurance moment directly visible on the traveler screen.
            </span>
          </div>
          <div className="bg-white border border-[#1A1A1A]/10 p-5">
            <span className="font-serif font-bold text-base text-[#1A1A1A] block mb-2">3. Proactive Auto-Healing</span>
            <span className="text-[#1A1A1A]/75 font-sans">
              Instantly converts standard reactive anxiety (cancelling yourself in panic) into a proactive back-end buffer. Dispatching backup vehicles automatically saves the reservation before the problem manifests.
            </span>
          </div>
        </div>
      </div>

      {/* Tab Footer Controls */}
      <div className="flex justify-between items-center pt-5 border-t border-[#1A1A1A]/10">
        <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#1A1A1A]/40 font-mono uppercase tracking-wider font-bold">
          <FileText className="w-4 h-4" />
          <span>Interactive Prototype Sandbox v1.0.4</span>
        </div>
        <button
          onClick={onNext}
          className="group flex items-center gap-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold px-6 py-4.5 transition-all duration-300 cursor-pointer shadow-sm"
        >
          Proceed to Q4: Guardian-Guaranteed Recurring Rides
          <Car className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}
