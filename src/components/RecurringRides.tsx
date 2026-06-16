/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RecurringRide } from '../types';
import { 
  Plus, Calendar, MapPin, Clock, ShieldCheck, Trash, 
  ToggleLeft, ToggleRight, Sparkles, AlertCircle, Info, Heart
} from 'lucide-react';

const INITIAL_RIDES: RecurringRide[] = [
  {
    id: 'rec_1',
    pickup: 'Home (Greensboro Apartments, Block B)',
    destination: 'Chhatrapati Shivaji Terminal (International Airport Terminal 2)',
    days: ['Mon', 'Fri'],
    time: '04:30',
    trustGuardPreset: 'vip',
    trustThreshold: 85, // strict protective buffer
    insuranceActive: true,
    active: true,
    createdAt: new Date().toLocaleDateString()
  },
  {
    id: 'rec_2',
    pickup: 'Resident Plaza, Powai',
    destination: 'Corporate Hub (Enterprise Towers, Sector 4)',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    time: '08:15',
    trustGuardPreset: 'strict',
    trustThreshold: 75,
    insuranceActive: false,
    active: true,
    createdAt: new Date().toLocaleDateString()
  }
];

export default function RecurringRides() {
  const [rides, setRides] = useState<RecurringRide[]>([]);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  
  // Form States
  const [pickup, setPickup] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [time, setTime] = useState<string>('08:00');
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Wed', 'Fri']);
  const [preset, setPreset] = useState<'vip' | 'strict' | 'standard'>('strict');
  const [insurance, setInsurance] = useState<boolean>(true);
  const [formError, setFormError] = useState<string>('');

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem('trevel_recurring_rides');
    if (saved) {
      try {
        setRides(JSON.parse(saved));
      } catch (e) {
        setRides(INITIAL_RIDES);
      }
    } else {
      setRides(INITIAL_RIDES);
      localStorage.setItem('trevel_recurring_rides', JSON.stringify(INITIAL_RIDES));
    }
  }, []);

  // Sync back to local storage
  const saveToStorage = (updatedRides: RecurringRide[]) => {
    setRides(updatedRides);
    localStorage.setItem('trevel_recurring_rides', JSON.stringify(updatedRides));
  };

  // Toggle activation state
  const toggleRideActive = (id: string) => {
    const updated = rides.map(r => r.id === id ? { ...r, active: !r.active } : r);
    saveToStorage(updated);
  };

  // Delete booking
  const deleteRide = (id: string) => {
    const updated = rides.filter(r => r.id !== id);
    saveToStorage(updated);
  };

  // Day toggle
  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Submit recurring ride
  const handleAddNewRide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.trim() || !destination.trim()) {
      setFormError('Please provide both Pickup and Destination locations.');
      return;
    }
    if (selectedDays.length === 0) {
      setFormError('Please select at least one active weekday.');
      return;
    }

    let threshold = 70;
    if (preset === 'vip') threshold = 85;
    else if (preset === 'strict') threshold = 75;

    const newRide: RecurringRide = {
      id: `rec_${Date.now()}`,
      pickup,
      destination,
      days: selectedDays,
      time,
      trustGuardPreset: preset,
      trustThreshold: threshold,
      insuranceActive: insurance,
      active: true,
      createdAt: new Date().toLocaleDateString()
    };

    const updated = [newRide, ...rides];
    saveToStorage(updated);
    
    // Clear Form
    setPickup('');
    setDestination('');
    setSelectedDays(['Mon', 'Wed', 'Fri']);
    setFormError('');
    setShowAddForm(false);
  };

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-10"
      id="recurring-tab"
    >
      {/* Upper description */}
      <div className="border-b border-[#1A1A1A]/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.2em] mb-2 font-bold">
            <span>Section 05 · Automation System</span>
            <span className="text-[#1A1A1A]/20">•</span>
            <span>Guardian-Guaranteed Schedules</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#1A1A1A]">
            VIP Recurring <span className="italic">Mobility Guard</span>
          </h2>
          <p className="text-[#1A1A1A]/75 text-sm mt-1.5 max-w-2xl font-serif italic leading-relaxed">
            Designed for airport commuters and professionals who cannot afford a single miss. 
            Schedule automatic, repeating rides protected by our customized high-threshold Trust Guards.
          </p>
        </div>

        <button
          id="btn-trigger-add-form"
          onClick={() => setShowAddForm(!showAddForm)}
          className={`shrink-0 flex items-center gap-2 font-mono text-xs uppercase tracking-wider px-4 py-3 rounded-none transition-all cursor-pointer font-bold border ${
            showAddForm
              ? 'bg-white text-[#1A1A1A]/60 border-[#1A1A1A]/10 hover:text-[#1A1A1A]'
              : 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-[#1A1A1A]/95 shadow-sm'
          }`}
        >
          {showAddForm ? 'Cancel Creation' : 'Create Recurring Ride'}
          {!showAddForm && <Plus className="w-4 h-4" />}
        </button>
      </div>

      {/* Add Form with transition */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddNewRide} className="bg-white border border-[#1A1A1A]/15 rounded-none p-6 space-y-6 shadow-sm" id="add-schedule-form">
              <h3 className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-[0.15em] border-b border-[#1A1A1A]/5 pb-3 flex items-center gap-1.5 font-bold">
                <Sparkles className="w-4 h-4 text-[#1A1A1A]/50" />
                Schedule New Guardian-Guaranteed Route
              </h3>

              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-900 text-xs rounded-none flex items-center gap-2 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0 animate-pulse" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pickup and drop */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="input-pickup" className="text-xs text-[#1A1A1A]/70 font-mono font-semibold block">Pickup Location:</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        id="input-pickup"
                        type="text"
                        placeholder="e.g. Greensboro Tower A, Powai"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                        className="w-full text-xs font-mono bg-[#FCFBF9] border border-[#1A1A1A]/15 rounded-none p-2.5 pl-10 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="input-drop" className="text-xs text-[#1A1A1A]/70 font-mono font-semibold block">Destination Area:</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        id="input-drop"
                        type="text"
                        placeholder="e.g. Airport Departure Gate 3"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full text-xs font-mono bg-[#FCFBF9] border border-[#1A1A1A]/15 rounded-none p-2.5 pl-10 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Days and Time */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label htmlFor="input-time" className="text-xs text-[#1A1A1A]/70 font-mono font-semibold block">Dispatch Time:</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-2.5 w-4 h-4 text-[#1A1A1A]/40" />
                      <input
                        id="input-time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full text-xs font-mono bg-[#FCFBF9] border border-[#1A1A1A]/15 rounded-none p-2.5 pl-10 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                      />
                    </div>
                  </div>

                  {/* Days Multi-selector */}
                  <div className="space-y-1.5">
                    <span className="text-xs text-[#1A1A1A]/70 font-mono font-semibold block">Trigger Days:</span>
                    <div className="flex flex-wrap gap-1.5" id="days-selector-group">
                      {daysOfWeek.map((day) => {
                        const isSelected = selectedDays.includes(day);
                        return (
                          <button
                            type="button"
                            key={day}
                            id={`tag-day-${day}`}
                            onClick={() => toggleDay(day)}
                            className={`px-3 py-1.5 text-[11px] font-mono rounded-none border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold'
                                : 'bg-white border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F7F5F0]'
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced trust guard settings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#1A1A1A]/5 pt-6">
                <div className="space-y-2">
                  <label htmlFor="select-preset" className="text-xs font-mono font-bold text-[#1A1A1A] uppercase tracking-wider block">Trust Guard Sensitivity:</label>
                  <select
                    id="select-preset"
                    value={preset}
                    onChange={(e: any) => setPreset(e.target.value)}
                    className="w-full text-xs font-mono bg-white border border-[#1A1A1A]/15 rounded-none p-2.5 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                  >
                    <option value="vip">VIP Match (Strict Guarantee • Recalcs at &lt;85 TrustScore)</option>
                    <option value="strict">High Defense Guard (Trigger backup dispatch at &lt;75 TrustScore)</option>
                    <option value="standard">Standard Defense Guard (Trigger backup dispatch at &lt;70 TrustScore)</option>
                  </select>
                  <p className="text-[10px] text-[#1A1A1A]/40 leading-normal font-mono">
                    VIP mode maps you only to drivers maintaining 99%+ score track-records. Backup auto-queues early.
                  </p>
                </div>

                {/* Insurance toggle */}
                <div className="flex items-center justify-between bg-[#FCFBF9] border border-[#1A1A1A]/10 p-4 rounded-none">
                  <div className="space-y-0.5 max-w-xs pr-4">
                    <span className="text-xs font-serif font-bold text-[#1A1A1A] block">Cancellation Refund Guarantee</span>
                    <span className="text-[10px] text-[#1A1A1A]/60 block leading-normal font-sans">
                      Receive an instant ₹1,000 credit plus complete ride refund if any backup fails to pick you up on time.
                    </span>
                  </div>
                  <button
                    type="button"
                    id="toggle-insurance-btn"
                    onClick={() => setInsurance(!insurance)}
                    className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-all cursor-pointer shrink-0"
                  >
                    {insurance ? (
                      <ToggleRight className="w-8 h-8 text-emerald-800" />
                    ) : (
                      <ToggleLeft className="w-8 h-8 text-[#1A1A1A]/20" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  id="submit-new-schedule-btn"
                  className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white font-mono text-xs uppercase tracking-[0.2em] font-bold px-6 py-4.5 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  Confirm &amp; Guard Schedule
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of existing recurrent schedules */}
      <div className="space-y-4">
        <h3 className="text-[10px] font-mono text-[#1A1A1A]/50 uppercase tracking-[0.2em] font-bold px-1">
          Active Guardian-Guaranteed Schedules ({rides.length})
        </h3>

        {rides.length === 0 ? (
          <div className="text-center py-12 bg-[#FCFBF9] border border-[#1A1A1A]/10">
            <Calendar className="w-8 h-8 text-[#1A1A1A]/30 mx-auto mb-3" />
            <p className="text-sm font-serif font-bold text-[#1A1A1A]">No active schedules configured.</p>
            <p className="text-xs text-[#1A1A1A]/50 mt-1">Create one to enable automatic dispatch security.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="schedules-grid">
            {rides.map((ride) => {
              const scoreColor = ride.trustThreshold >= 85 ? 'text-[#1A1A1A] font-bold' : 'text-emerald-800 font-bold';
              return (
                <motion.div
                  key={ride.id}
                  id={`schedule-card-${ride.id}`}
                  className={`bg-white border rounded-none p-5 flex flex-col justify-between transition-all duration-200 shadow-sm ${
                    ride.active 
                      ? 'border-[#1A1A1A]/15' 
                      : 'border-[#1A1A1A]/10 opacity-50'
                  }`}
                >
                  <div className="space-y-4 text-left">
                    {/* Upper row */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="text-[9px] font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 font-bold uppercase tracking-wider px-2 py-0.5 inline-block rounded-none mb-1 text-center">
                          {ride.trustGuardPreset.toUpperCase()} PROTECT ACTIVE
                        </span>
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#1A1A1A]/40" />
                          <span className="text-base font-serif font-bold text-[#1A1A1A] leading-none">{ride.time} Am</span>
                          <span className="text-[#1A1A1A]/20">|</span>
                          <span className="text-xs font-mono text-[#1A1A1A]/60 leading-none">
                            {ride.days.join(', ')}
                          </span>
                        </div>
                      </div>

                      {/* Switch and delete */}
                      <div className="flex items-center gap-2">
                        <button
                          aria-label="Toggle active status"
                          id={`toggle-active-${ride.id}`}
                          onClick={() => toggleRideActive(ride.id)}
                          className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-all cursor-pointer"
                        >
                          {ride.active ? (
                            <ToggleRight className="w-7 h-7 text-[#1A1A1A]" />
                          ) : (
                            <ToggleLeft className="w-7 h-7 text-[#1A1A1A]/20" />
                          )}
                        </button>
                        <button
                          aria-label="Delete schedule"
                          id={`delete-btn-${ride.id}`}
                          onClick={() => deleteRide(ride.id)}
                          className="p-1 px-1.5 bg-[#F9F7F3] border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/50 text-[#1A1A1A]/50 hover:text-[#1A1A1A] rounded-none transition-all cursor-pointer"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Address matching */}
                    <div className="space-y-2.5 bg-[#F7F5F0] p-3 border border-[#1A1A1A]/10 relative">
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-[#1A1A1A] rounded-full mt-2 shrink-0" />
                        <div>
                          <span className="text-[8px] font-mono text-[#1A1A1A]/40 block uppercase tracking-wider font-bold">Pickup Area</span>
                          <span className="text-xs text-[#1A1A1A]/85 mt-0.5 leading-snug">{ride.pickup}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 bg-emerald-800 rounded-full mt-2 shrink-0" />
                        <div>
                          <span className="text-[8px] font-mono text-[#1A1A1A]/40 block uppercase tracking-wider font-bold">Destination Area</span>
                          <span className="text-xs text-[#1A1A1A]/85 mt-0.5 leading-snug">{ride.destination}</span>
                        </div>
                      </div>
                    </div>

                    {/* Threshold Details bar */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#1A1A1A]/50 border-t border-[#1A1A1A]/10 pt-3">
                      <div className="flex items-center gap-1 font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
                        <span>Self-Healing Threshold:</span>
                        <strong className={scoreColor}>&lt;{ride.trustThreshold}</strong>
                      </div>
                      {ride.insuranceActive && (
                        <span className="text-emerald-900 bg-emerald-50 px-1.5 py-0.5 border border-emerald-100 text-[9px] tracking-wider uppercase font-bold font-mono">
                          ₹1,000 Insured
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Notice about Q4 design concept */}
      <div className="bg-[#F7F5F0] border border-[#1A1A1A]/15 p-6 flex gap-4">
        <Info className="w-5 h-5 text-[#1A1A1A]/60 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs leading-relaxed">
          <h4 className="font-serif font-bold text-base text-[#1A1A1A]">How This Safeguards Unit Economics for Trevel</h4>
          <p className="text-[#1A1A1A]/70 text-xs">
            Airport transfers represent high-tariff premium revenue. Currently, if a driver cancels, we pay a massive retention penalty or lose a lifetime customer. By dedicating high-reliability drivers specifically to recurring pre-bookings, and establishing a silent automatic secondary backup vehicle queue, we offer an unshakeable service. This guarantees high repeat rider loyalty while maintaining optimal driver workloads.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
