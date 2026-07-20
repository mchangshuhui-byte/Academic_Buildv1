/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Course } from '../types';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShoppingBag, 
  DollarSign, 
  Award, 
  HelpCircle, 
  ArrowRight,
  ClipboardList,
  Sparkles,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RegistrationHubViewProps {
  registeredCourseIds: string[];
  allCourses: Course[];
  onToggleRegistration: (courseId: string) => void;
  waiversRequested: { [key: string]: string };
  onCancelWaiver: (courseId: string) => void;
  onClearAll: () => void;
}

export default function RegistrationHubView({
  registeredCourseIds,
  allCourses,
  onToggleRegistration,
  waiversRequested,
  onCancelWaiver,
  onClearAll
}: RegistrationHubViewProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const enrolledCourses = allCourses.filter(c => registeredCourseIds.includes(c.id));
  const availableCourses = allCourses.filter(c => !registeredCourseIds.includes(c.id));
  
  const totalCredits = enrolledCourses.reduce((sum, c) => sum + c.credits, 0);
  const estimatedTuition = totalCredits * 450; // $450 SGD per unit

  // Checking prerequisites
  const hasPrereqWarning = enrolledCourses.some(c => 
    c.prerequisites.some(p => !p.satisfied) && !waiversRequested[c.id]
  );

  const handleSubmitRegistration = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Upper Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Enrolled Courses / Registration Cart (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-outline-variant/60">
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold text-primary flex items-center gap-2">
                <ShoppingBag className="w-6 h-6" />
                Selected Courses Planner
              </h1>
              <p className="text-xs text-on-surface-variant mt-1">
                Draft and confirm your module selection for the upcoming semester.
              </p>
            </div>
            {registeredCourseIds.length > 0 && (
              <button 
                onClick={onClearAll}
                className="text-xs text-status-error font-bold flex items-center gap-1.5 hover:underline cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Drafts
              </button>
            )}
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="border border-dashed border-outline-variant rounded-2xl p-12 text-center bg-surface-container-low/30 space-y-4">
              <ShoppingBag className="w-16 h-16 text-outline-variant mx-auto" />
              <div>
                <h3 className="font-bold text-on-surface text-base">Your Selected Courses list is empty</h3>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm mx-auto leading-relaxed">
                  You haven't selected any modules yet. Go to the course search page to select modules and add them to your registration drawer.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {enrolledCourses.map((course) => {
                const missingPrereqs = course.prerequisites.filter(p => !p.satisfied);
                const hasWaiver = waiversRequested[course.id];

                return (
                  <div 
                    key={course.id}
                    className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:shadow-sm transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded uppercase tracking-wider">
                          {course.code}
                        </span>
                        <h3 className="font-bold text-sm text-on-surface">
                          {course.title}
                        </h3>
                      </div>
                      
                      <div className="text-xs text-on-surface-variant flex flex-wrap gap-x-4 gap-y-1">
                        <span>Faculty: <strong className="text-on-surface">{course.faculty}</strong></span>
                        <span>Credits: <strong className="text-primary">{course.credits} Units</strong></span>
                      </div>

                      {/* Warnings / Waiver Statuses */}
                      {missingPrereqs.length > 0 && (
                        <div className="flex flex-col gap-1.5 pt-1">
                          {missingPrereqs.map((p, i) => (
                            <div key={i} className="inline-flex items-center gap-1.5 text-[11px]">
                              {hasWaiver ? (
                                <span className="text-status-warning bg-status-warning/5 border border-status-warning/20 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  Waiver requested for prerequisite: {p.code}
                                </span>
                              ) : (
                                <span className="text-status-error bg-error-container/20 border border-error-container/40 px-2 py-0.5 rounded flex items-center gap-1 font-semibold">
                                  <AlertTriangle className="w-3.5 h-3.5" />
                                  Missing required prerequisite: {p.code}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onToggleRegistration(course.id)}
                      className="px-3.5 py-2 text-xs font-bold text-status-error border border-error-container/60 hover:bg-error-container/10 rounded-lg shrink-0 transition-colors cursor-pointer"
                    >
                      Remove Draft
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick-add available courses suggestions */}
          {availableCourses.length > 0 && (
            <div className="space-y-3 pt-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                Recommended Modules to Complete Your Load:
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {availableCourses.map((c) => (
                  <div 
                    key={c.id}
                    className="p-3.5 bg-surface-container-low/50 border border-outline-variant/60 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[9px] font-bold text-primary-container uppercase block">{c.code}</span>
                      <h4 className="text-xs font-bold text-on-surface line-clamp-1">{c.title}</h4>
                      <span className="text-[10px] text-on-surface-variant font-semibold">{c.credits} Units • {c.difficulty}</span>
                    </div>
                    <button
                      onClick={() => onToggleRegistration(c.id)}
                      className="px-2.5 py-1.5 bg-primary text-on-primary text-[10px] font-bold rounded-lg hover:bg-primary-container transition-colors shrink-0 cursor-pointer"
                    >
                      + Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Checkout Summary panel (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-base md:text-lg font-bold font-display text-primary">
            Registration Checklist
          </h2>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-5 shadow-sm">
            
            {/* Units Load Indicator */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface">Planned Credit Load</span>
                <span className="font-bold text-primary">{totalCredits} / 20 Units</span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${
                    totalCredits < 12 
                      ? 'bg-status-warning' 
                      : totalCredits > 18 
                        ? 'bg-status-error' 
                        : 'bg-status-success'
                  }`}
                  style={{ width: `${Math.min((totalCredits / 20) * 100, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-on-surface-variant">
                <span>Min: 12 Units</span>
                <span>Max: 20 Units</span>
              </div>

              {totalCredits > 0 && totalCredits < 12 && (
                <div className="p-2.5 bg-status-warning/10 border border-status-warning/20 rounded-lg text-[11px] text-status-warning font-medium flex items-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Your current load is underloaded. Recommended minimum load is 12 units.</span>
                </div>
              )}
            </div>

            <hr className="border-outline-variant/40" />

            {/* Financial Summary */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Tuition Fee Estimation</h4>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant">Price per credit unit</span>
                <span className="font-bold text-on-surface">$450.00 SGD</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="font-semibold text-on-surface">Estimated Tuition</span>
                <span className="text-base font-black text-primary">${estimatedTuition.toLocaleString()}.00 SGD</span>
              </div>
            </div>

            <hr className="border-outline-variant/40" />

            {/* Requirement Checks */}
            <div className="space-y-2.5 text-xs">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Registration Rules</h4>
              
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-status-success shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-on-surface block">Lecture Schedule Overlaps</span>
                  <span className="text-[10px] text-on-surface-variant">Excellent! No lecture time slot overlap conflicts.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                {hasPrereqWarning ? (
                  <AlertTriangle className="w-4.5 h-4.5 text-status-error shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4.5 h-4.5 text-status-success shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-semibold text-on-surface block">Prerequisites Check</span>
                  {hasPrereqWarning ? (
                    <span className="text-[10px] text-status-error font-medium">Missing prerequisite waivers for enrolled courses.</span>
                  ) : (
                    <span className="text-[10px] text-on-surface-variant">All selected module prerequisites are satisfied or waived.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Actions */}
            <button
              onClick={handleSubmitRegistration}
              disabled={isSubmitting || totalCredits === 0 || hasPrereqWarning}
              className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider text-center cursor-pointer transition-all ${
                totalCredits === 0 || hasPrereqWarning
                  ? 'bg-surface-container-high text-outline cursor-not-allowed border border-outline-variant/40'
                  : 'bg-primary text-on-primary hover:bg-primary-container shadow active:scale-98'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-1.5">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Processing Submission...
                </span>
              ) : (
                'Submit Enrollment Registration'
              )}
            </button>

          </div>

          {/* Active Waiver Petitions summary if requested */}
          {Object.keys(waiversRequested).length > 0 && (
            <div className="p-4 bg-surface-container-low/60 border border-outline-variant/50 rounded-xl space-y-3">
              <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-primary" />
                Active Waiver Requests
              </h4>
              <div className="space-y-2">
                {Object.entries(waiversRequested).map(([courseId, justification]) => {
                  const course = allCourses.find(c => c.id === courseId);
                  if (!course) return null;
                  return (
                    <div key={courseId} className="p-2.5 bg-surface-container-lowest border border-outline-variant rounded-lg space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-primary">{course.code} Waiver</span>
                        <button 
                          onClick={() => onCancelWaiver(courseId)}
                          className="text-[10px] text-status-error hover:underline font-semibold cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <p className="text-[10px] text-on-surface-variant line-clamp-2">"{justification}"</p>
                      <span className="inline-block text-[9px] bg-status-warning/10 text-status-warning px-1.5 py-0.2 rounded-md font-bold mt-1">
                        Pending Advisor Review
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-surface-container-lowest max-w-md w-full rounded-2xl border border-outline-variant p-8 shadow-2xl text-center space-y-5"
            >
              <div className="w-16 h-16 bg-status-success/15 text-status-success rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-on-surface font-display">Registration Submitted!</h3>
                <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
                  Your module selection of <strong className="text-primary">{enrolledCourses.map(c => c.code).join(', ')}</strong> ({totalCredits} credits) has been officially recorded. Academic advisers will confirm enrollment within 48 hours.
                </p>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 text-xs text-left divide-y divide-outline-variant/40">
                <div className="pb-2 flex justify-between">
                  <span className="text-on-surface-variant">Status:</span>
                  <span className="font-bold text-status-success">ADVISOR REVIEW PENDING</span>
                </div>
                <div className="py-2 flex justify-between">
                  <span className="text-on-surface-variant">Receipt ID:</span>
                  <span className="font-mono font-bold text-on-surface">AN-2026-4291A</span>
                </div>
                <div className="pt-2 flex justify-between">
                  <span className="text-on-surface-variant">Credits Confirmed:</span>
                  <span className="font-bold text-primary">{totalCredits} Units</span>
                </div>
              </div>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-2.5 bg-primary text-on-primary rounded-lg font-bold text-xs uppercase cursor-pointer"
              >
                Close Receipt
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
