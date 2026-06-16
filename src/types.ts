/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TrustSignals {
  driverCancelRate: number;      // 30-day cancel rate, e.g. 98% (higher is better reliability)
  gpsFreshness: number;         // in seconds, e.g. 5s (lower is better, >30s is stale)
  routeCongestion: 'clear' | 'moderate' | 'congested'; // congestion level
  vehicleHealth: 'excellent' | 'normal' | 'alert';  // vehicle status pre-check and EV charge
}

export interface ScoreBreakdown {
  score: number;                // 0 - 100
  label: 'Excellent' | 'Good' | 'At Risk';
  color: string;
  cancelRateScore: number;
  gpsScore: number;
  congestionScore: number;
  healthScore: number;
}

export type UserSegmentId = 'corporate' | 'airport' | 'night' | 'prescheduled';

export interface UserSegment {
  id: UserSegmentId;
  name: string;
  tagline: string;
  riskDescription: string;
  tolerance: string;
  volumeShare: string;
  anxietyIndex: number; // 0 - 100
  color: string;
  iconName: string;
}

export interface JourneyStep {
  phase: string;
  title: string;
  action: string;
  anxietyBefore: number; // 1-10 scale of baseline
  anxietyAfter: number;  // 1-10 scale with Trevel
  painPointsBefore: string;
  gainPointsAfter: string;
}

export interface RecurringRide {
  id: string;
  pickup: string;
  destination: string;
  days: string[]; // e.g. ['Mon', 'Wed', 'Fri']
  time: string;
  trustGuardPreset: 'strict' | 'standard' | 'vip';
  trustThreshold: number; // minimum trustscore before backup is auto-queued
  insuranceActive: boolean;
  active: boolean;
  createdAt: string;
}
