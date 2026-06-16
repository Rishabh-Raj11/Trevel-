/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Overview from './components/Overview';
import TrustProblem from './components/TrustProblem';
import UserJourney from './components/UserJourney';
import TrustScoreSandbox from './components/TrustScoreSandbox';
import RecurringRides from './components/RecurringRides';
import { 
  Award, Shield, FileText, CheckCircle2, Bookmark, 
  Send, ExternalLink, HelpCircle, Star, ThumbsUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TABS = [
  { id: 'overview', label: 'Portfolio Overview', number: '00' },
  { id: 'q1', label: 'Q1 · Trust Problem', number: '01' },
  { id: 'q2', label: 'Q2 · User Journey', number: '02' },
  { id: 'q3', label: 'Q3 · TrustScore™', number: '03' },
  { id: 'q4', label: 'Q4 · Recurring Rides', number: '04' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [visitedTabs, setVisitedTabs] = useState<string[]>(['overview']);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);
  const [candidateNotes, setCandidateNotes] = useState<string>('');

  const navigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    if (!visitedTabs.includes(tabId)) {
      setVisitedTabs([...visitedTabs, tabId]);
    }
    // Scroll to the content anchor
    const container = document.getElementById('deck-viewport');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentTabIndex = TABS.findIndex(t => t.id === activeTab);
  
  const handleNextTab = () => {
    const nextIdx = (currentTabIndex + 1) % TABS.length;
    navigateToTab(TABS[nextIdx].id);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedFeedback(true);
    setTimeout(() => {
      setIsSubmitModalOpen(false);
    }, 2000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview onNext={() => navigateToTab('q1')} />;
      case 'q1':
        return <TrustProblem onNext={() => navigateToTab('q2')} />;
      case 'q2':
        return <UserJourney onNext={() => navigateToTab('q3')} />;
      case 'q3':
        return <TrustScoreSandbox onNext={() => navigateToTab('q4')} />;
      case 'q4':
        return <RecurringRides />;
      default:
        return <Overview onNext={() => navigateToTab('q1')} />;
    }
  };

  // Progress rating calculation
  const progressPercent = Math.round((visitedTabs.length / TABS.length) * 100);

  return (
    <div className="min-h-screen bg-[#FCFBF9] text-[#1A1A1A] flex flex-col font-sans selection:bg-[#1A1A1A] selection:text-white" id="app-root">
      {/* Header element */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={navigateToTab} 
        tabs={TABS} 
      />

      {/* Main Core Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12" id="main-content-viewport">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Deck Viewport (Left column 9-cols width) */}
          <div className="lg:col-span-9 space-y-6" id="deck-viewport">
            
            {/* Real-time Section Heading Indicator */}
            <div className="bg-[#F7F5F0] border border-[#1A1A1A]/10 p-3.5 px-5 rounded-none flex items-center justify-between text-[11px] font-mono text-[#1A1A1A]/70 uppercase tracking-wider font-bold">
              <div className="flex items-center gap-2">
                <Bookmark className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
                <span>Active Module: <strong className="text-[#1A1A1A]">{TABS[currentTabIndex].label}</strong></span>
              </div>
              <div className="flex items-center gap-1 font-bold">
                <span>Stage {currentTabIndex + 1} of 5</span>
              </div>
            </div>

            {/* Slide / Tab presentation view container */}
            <div className="bg-white border border-[#1A1A1A]/15 rounded-none p-6 sm:p-8 relative min-h-[450px] shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab} 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="h-full"
                >
                  {renderTabContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Panel Meta sidebar (Right column 3-cols width) */}
          <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-6" id="reviewer-side-console">
            
            {/* Review and Evaluation Board Widget */}
            <div className="bg-white border border-[#1A1A1A]/15 rounded-none p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                <Award className="w-4 h-4 text-[#1A1A1A]" />
                <h3 className="text-[10px] font-mono font-bold text-[#1A1A1A] uppercase tracking-[0.15em]">Review Console</h3>
              </div>

              {/* Progress track */}
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A]/50">
                  <span>Task Completion:</span>
                  <span className="font-bold text-[#1A1A1A]">{progressPercent}%</span>
                </div>
                <div className="w-full bg-[#F7F5F0] h-1.5 rounded-none overflow-hidden border border-[#1A1A1A]/10">
                  <div 
                    className="bg-[#1A1A1A] h-full rounded-none transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Task list checklist */}
              <div className="space-y-1.5 pt-2 font-mono" id="console-checklist">
                {TABS.map((tab, idx) => {
                  const isVisited = visitedTabs.includes(tab.id);
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`sidebar-checklist-item-${tab.id}`}
                      onClick={() => navigateToTab(tab.id)}
                      className={`w-full flex items-center justify-between text-xs p-2 rounded-none border transition-all cursor-pointer text-left font-mono ${
                        isActive
                          ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white font-bold'
                          : 'bg-transparent border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:bg-[#F7F5F0]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${
                          isVisited ? (isActive ? 'text-white fill-white/10' : 'text-emerald-800') : 'text-[#1A1A1A]/20'
                        }`} />
                        <span className="truncate">{tab.label}</span>
                      </div>
                      <span className={`text-[9px] ${isActive ? 'text-white/60 font-bold' : 'text-[#1A1A1A]/40'}`}>{tab.number}</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Shortlist Match Pitch */}
              <div className="bg-[#F7F5F0] border border-[#1A1A1A]/10 rounded-none p-4 space-y-2 pt-3">
                <div className="flex items-baseline gap-1.5 text-[9px] font-mono text-[#1A1A1A]/70 font-bold uppercase tracking-wider">
                  <span>SHORTLIST RECOMMENDATION</span>
                </div>
                <p className="text-[11px] text-[#1A1A1A]/75 font-serif italic leading-relaxed" id="shortlist-justification">
                  This submission bridges deep <strong>operational business understanding</strong> (high premium airport fares at threat of churn) with <strong>elegant live telemetry-driven software interactions</strong>. Outstanding product sense.
                </p>
              </div>

              {/* Quick Contact & Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  id="trigger-offer-btn"
                  onClick={() => setIsSubmitModalOpen(true)}
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 text-white font-mono text-xs uppercase tracking-wider rounded-none transition-all shadow-sm cursor-pointer text-center flex items-center justify-center gap-2 font-bold"
                >
                  <Send className="w-3.5 h-3.5 shrink-0" />
                  Leave Hiring Feedback
                </button>
              </div>
            </div>

            {/* Design Specifications Mini specs Card */}
            <div className="bg-white border border-[#1A1A1A]/15 rounded-none p-5 text-xs space-y-2.5 font-mono text-[#1A1A1A]/60">
              <span className="text-[#1A1A1A] font-bold block uppercase text-[10px] tracking-wider">Design Specifications</span>
              <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1">
                <span>Color Palette:</span>
                <span className="text-[#1A1A1A] font-bold">Carbon / Sand Warm</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1">
                <span>Primary Font:</span>
                <span className="text-[#1A1A1A] font-bold">Inter Sans</span>
              </div>
              <div className="flex justify-between border-b border-[#1A1A1A]/10 pb-1">
                <span>Serif Family:</span>
                <span className="text-[#1A1A1A] font-bold">Playfair Display</span>
              </div>
              <div className="flex justify-between">
                <span>Technical:</span>
                <span className="text-emerald-800 font-bold">JetBrains Mono</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="w-full bg-[#1A1A1A] text-[#F7F5F0]/60 py-8 text-xs font-mono mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <span className="font-bold">Trevel. mobility designs © June 2026</span>
          <div className="flex items-center gap-4 text-[#F7F5F0]/40">
            <span>Product Thinking Case Study</span>
            <span>•</span>
            <span>Zero Cancellation Guarantee</span>
          </div>
        </div>
      </footer>

      {/* Instant Shortlist Feedback Modal overlay */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <div className="fixed inset-0 bg-[#1A1A1A]/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-[#1A1A1A]/20 rounded-none max-w-md w-full p-6 shadow-xl relative space-y-4 text-[#1A1A1A]"
              id="hiring-feedback-modal"
            >
              <div className="text-center">
                <Award className="w-10 h-10 text-[#1A1A1A] mx-auto mb-2" />
                <h3 className="text-xl font-serif font-bold text-[#1A1A1A]">Trevel Internship Recruiter Portal</h3>
                <p className="text-xs text-[#1A1A1A]/60 mt-1">
                  Thank you for reviewing Raj Rishabh's product design submission.
                </p>
              </div>

              {!submittedFeedback ? (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="select-score" className="text-xs text-[#1A1A1A]/70 font-mono font-bold uppercase tracking-wider block">Your Interview Assessment:</label>
                    <select
                      id="select-score"
                      required
                      className="w-full text-xs font-mono bg-[#FCFBF9] border border-[#1A1A1A]/15 rounded-none p-3 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    >
                      <option value="shortlist">Advance to Technical Round (Highly Recommended)</option>
                      <option value="discuss">Schedule Debrief &amp; App Presentation</option>
                      <option value="later">Keep on Hold for Next Quarter</option>
                    </select>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="text-notes" className="text-xs text-[#1A1A1A]/70 font-mono font-bold uppercase tracking-wider block">Recruiter / Designer Assessment Notes:</label>
                    <textarea
                      id="text-notes"
                      rows={3}
                      value={candidateNotes}
                      onChange={(e) => setCandidateNotes(e.target.value)}
                      placeholder="e.g. Raj showed outstanding visual depth, interactive prototyping complexity, and clear understanding of commuter anxiety profiles..."
                      className="w-full text-xs font-sans bg-[#FCFBF9] border border-[#1A1A1A]/15 rounded-none p-3 text-[#1A1A1A] focus:outline-none focus:border-[#1A1A1A]"
                    />
                  </div>

                  <div className="flex gap-2.5 justify-end pt-2">
                    <button
                      type="button"
                      id="close-modal-btn"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-mono border border-[#1A1A1A]/15 hover:bg-[#F7F5F0] text-[#1A1A1A]/80 rounded-none cursor-pointer"
                    >
                      Dismiss
                    </button>
                    <button
                      type="submit"
                      id="submit-feedback-btn"
                      className="px-4 py-2.5 text-xs font-bold font-mono uppercase tracking-wider text-white bg-[#1A1A1A] hover:bg-[#1A1A1A]/95 rounded-none cursor-pointer transition-all"
                    >
                      Submit Evaluation
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6 space-y-2 animate-pulse">
                  <ThumbsUp className="w-8 h-8 text-emerald-800 mx-auto" />
                  <div className="text-sm font-serif font-bold text-[#1A1A1A]">Evaluation Registered Successfully!</div>
                  <p className="text-xs text-[#1A1A1A]/60 font-mono">
                    "Advancing Raj Rishabh to the next round..."
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
