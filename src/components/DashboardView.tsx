/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Course } from '../types';
import { 
  CheckCircle2, 
  Calendar, 
  AlertTriangle, 
  BookOpen, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardViewProps {
  registeredCourseIds: string[];
  allCourses: Course[];
  remindersSet: string[];
  waiversRequested: { [key: string]: string };
  onSelectCourse: (course: Course) => void;
  onTabChange: (tab: string) => void;
}

export default function DashboardView({
  registeredCourseIds,
  allCourses,
  remindersSet,
  waiversRequested,
  onSelectCourse,
  onTabChange
}: DashboardViewProps) {
  
  const registeredCourses = allCourses.filter(c => registeredCourseIds.includes(c.id));
  const totalCredits = registeredCourses.reduce((sum, c) => sum + c.credits, 0);
  const totalReminders = remindersSet.length;
  const totalWaivers = Object.keys(waiversRequested).length;

  const handleCourseClick = (course: Course) => {
    onSelectCourse(course);
    onTabChange('discovery');
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary p-6 md:p-8 rounded-2xl shadow-md relative overflow-hidden">
        {/* Abstract background graphics */}
        <div className="absolute right-0 top-0 bottom-0 opacity-10 flex items-center justify-center translate-x-12">
          <GraduationCap className="w-80 h-80" />
        </div>
        
        <div className="relative space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/10 rounded-full text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-secondary-fixed-dim" />
            Active Enrollment Period
          </div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-display font-bold">
            Welcome back, Marcus Chang
          </h1>
          <p className="text-xs md:text-sm text-on-primary/80 max-w-xl">
            You are currently planning for Academic Year 2026/2027, Semester 1. Register for courses, track prerequisites, and organize your weekly schedule.
          </p>
        </div>
      </div>

      {/* Quick Status Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Registered Credits */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-lg">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-medium block">Registered Credits</span>
            <span className="text-xl font-bold text-primary">{totalCredits} / 20 Units</span>
          </div>
        </div>

        {/* Card 2: Registered Modules */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-secondary/10 text-secondary rounded-lg">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-medium block">Enrolled Modules</span>
            <span className="text-xl font-bold text-primary">{registeredCourses.length} Courses</span>
          </div>
        </div>

        {/* Card 3: Active Reminders */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-status-success/10 text-status-success rounded-lg">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-medium block">Q&amp;A Reminders</span>
            <span className="text-xl font-bold text-primary">{totalReminders} Set</span>
          </div>
        </div>

        {/* Card 4: Waivers Requested */}
        <div className="bg-surface-container-lowest border border-outline-variant p-5 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-status-warning/10 text-status-warning rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-medium block">Waiver Petitions</span>
            <span className="text-xl font-bold text-primary">{totalWaivers} Pending</span>
          </div>
        </div>

      </div>

      {/* Main Panel Division */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: My Enrolled Courses (8 Columns) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base md:text-lg font-bold font-display text-primary flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              My Enrolled Course Schedule
            </h2>
            <button 
              onClick={() => onTabChange('discovery')}
              className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              Add more courses <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {registeredCourses.length === 0 ? (
            <div className="border border-dashed border-outline-variant rounded-xl p-8 text-center bg-surface-container-low/30 space-y-4">
              <BookOpen className="w-12 h-12 text-outline-variant mx-auto" />
              <div>
                <h3 className="font-semibold text-on-surface text-sm">No registered courses yet</h3>
                <p className="text-xs text-on-surface-variant mt-1">Get started by browsing and registering for courses in the Course Discovery portal.</p>
              </div>
              <button
                onClick={() => onTabChange('discovery')}
                className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary-container transition-all cursor-pointer"
              >
                Go to Course Discovery
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {registeredCourses.map((c) => (
                <div 
                  key={c.id}
                  onClick={() => handleCourseClick(c)}
                  className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 hover:border-primary cursor-pointer transition-all hover:shadow-md space-y-3 relative group"
                >
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded uppercase tracking-wider">
                      {c.code}
                    </span>
                    <span className="text-xs font-bold text-primary">{c.credits} Units</span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                      {c.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/40 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-on-surface-variant uppercase">
                      <Users className="w-3.5 h-3.5 text-primary" />
                      {c.instructor.name}
                    </div>
                    <span className="text-[10px] text-primary font-bold flex items-center gap-0.5 group-hover:underline">
                      Details <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Academic Progress checklist */}
          <div className="bg-surface-container-low/50 border border-outline-variant/60 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-primary" />
              Academic Progress &amp; Graduation Auditing
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                <span className="font-semibold text-on-surface block mb-1">Core Modules</span>
                <div className="flex items-center gap-1.5 text-status-success font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  CS2101 Python
                </div>
                <div className="flex items-center gap-1.5 text-status-success font-medium mt-1">
                  <CheckCircle2 className="w-4 h-4" />
                  MA1101 Calculus
                </div>
              </div>
              
              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                <span className="font-semibold text-on-surface block mb-1">Advanced Modules</span>
                <div className="flex items-center gap-1.5 text-on-surface-variant">
                  {registeredCourseIds.includes('cs4201') ? (
                    <span className="flex items-center gap-1.5 text-primary font-bold">
                      <span className="w-2 h-2 rounded-full bg-primary" /> Enrolled CS4201
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-outline" /> CS4201 Pending
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-on-surface-variant mt-1.5">
                  {registeredCourseIds.includes('cs3210') ? (
                    <span className="flex items-center gap-1.5 text-primary font-bold">
                      <span className="w-2 h-2 rounded-full bg-primary" /> Enrolled CS3210
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-outline" /> CS3210 Pending
                    </span>
                  )}
                </div>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50">
                <span className="font-semibold text-on-surface block mb-1">Prerequisite Status</span>
                {totalWaivers > 0 ? (
                  <div className="text-status-warning font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Waiver Processing
                  </div>
                ) : (
                  <div className="text-status-error font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    Prerequisites Missing
                  </div>
                )}
                <span className="text-[10px] text-on-surface-variant mt-1 block">CS4201 requires CS3210</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right: Academic Announcements & Advisories (4 Columns) */}
        <div className="lg:col-span-4 space-y-6">
          <h2 className="text-base md:text-lg font-bold font-display text-primary">
            Academic Advisories
          </h2>
          
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 space-y-4">
            
            {/* Advisory 1 */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-secondary font-bold uppercase tracking-wider block">Important Dates</span>
              <h4 className="text-xs font-bold text-on-surface">Course Enrollment Round 1 Closing</h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Course enrollment closes in exactly 4 days. Make sure your waiver requests are submitted to prevent system-auto drops.
              </p>
            </div>
            
            <hr className="border-outline-variant/40" />

            {/* Advisory 2 */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider block">Office of Admissions</span>
              <h4 className="text-xs font-bold text-on-surface">Pre-course Materials Released</h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Syllabi, Reading lists and compiler setups have been published for Computer Science modules. Access them in the module pages.
              </p>
            </div>

            <hr className="border-outline-variant/40" />

            {/* Advisory 3 */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-status-success font-bold uppercase tracking-wider block">AI Research Seminar</span>
              <h4 className="text-xs font-bold text-on-surface">Live Pre-Course Orientations</h4>
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                Faculty will host Live Q&amp;As to discuss syllabus weights and research project selections. Set your notifications to join.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
