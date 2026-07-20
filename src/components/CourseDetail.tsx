/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Course } from '../types';
import { 
  CheckCircle2, 
  Info, 
  ClipboardList, 
  User, 
  FolderOpen, 
  FileText, 
  ExternalLink, 
  Download, 
  Terminal, 
  MessageSquare, 
  Calendar, 
  AlertTriangle,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';

interface CourseDetailProps {
  course: Course;
  isRegistered: boolean;
  onToggleRegistration: (courseId: string) => void;
  isReminderSet: boolean;
  onToggleReminder: (courseId: string) => void;
  coursesList: Course[];
  onSelectCourse: (course: Course) => void;
  onSubmitWaiver: (courseId: string, message: string) => void;
  hasWaiverRequested: boolean;
}

export default function CourseDetail({
  course,
  isRegistered,
  onToggleRegistration,
  isReminderSet,
  onToggleReminder,
  coursesList,
  onSelectCourse,
  onSubmitWaiver,
  hasWaiverRequested
}: CourseDetailProps) {
  const [selectedSyllabusId, setSelectedSyllabusId] = useState<string>(course.syllabus[2]?.id || '');
  const [waiverInput, setWaiverInput] = useState('');
  const [showWaiverModal, setShowWaiverModal] = useState(false);

  // Quick info fields
  const credits = course.credits;
  const difficulty = course.difficulty;
  const semester = course.semester;

  const handleWaiverSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!waiverInput.trim()) return;
    onSubmitWaiver(course.id, waiverInput);
    setWaiverInput('');
    setShowWaiverModal(false);
  };

  return (
    <div className="space-y-8">
      {/* Course Selector bar */}
      <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant flex flex-wrap gap-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Browse Available Courses:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {coursesList.map((c) => {
            const isSelected = c.id === course.id;
            return (
              <button
                key={c.id}
                onClick={() => {
                  onSelectCourse(c);
                  // Default highlight topic 3 for cs4201, first topic for others
                  setSelectedSyllabusId(c.id === 'cs4201' ? c.syllabus[2]?.id : c.syllabus[0]?.id);
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-primary text-on-primary border-primary shadow-sm'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary border-outline-variant'
                }`}
              >
                {c.code}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-outline-variant/60">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 bg-primary-fixed text-on-primary-fixed text-xs font-semibold rounded uppercase tracking-wider">
              {course.code}
            </span>
            <span className="text-on-surface-variant text-xs font-medium uppercase tracking-wider">
              {course.faculty}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-on-surface leading-tight">
            {course.title}
          </h1>
          <p className="mt-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
            {course.description}
          </p>
        </div>
        
        {/* Registration Column */}
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-status-success">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-semibold">
              Available Seats: {course.availableSeats}/{course.totalSeats}
            </span>
          </div>
          
          <button
            onClick={() => onToggleRegistration(course.id)}
            className={`px-8 py-3 font-semibold rounded-lg transition-all shadow-sm active:scale-95 cursor-pointer text-sm tracking-wide ${
              isRegistered
                ? 'bg-status-error text-on-primary hover:bg-red-700'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
            id="registerBtn"
          >
            {isRegistered ? 'Cancel Registration' : 'Register for Course'}
          </button>
          
          <span className="text-xs text-on-surface-variant">
            Registration closes in 4 days
          </span>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area (8 Columns) */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* About Course Section */}
          <section className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold font-display text-primary mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              About the Course
            </h2>
            <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
              <p>{course.about}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-outline-variant/40">
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-medium text-on-surface-variant">Credits</span>
                  <span className="text-lg font-bold text-primary">{credits} Units</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-medium text-on-surface-variant">Difficulty</span>
                  <span className="text-lg font-bold text-primary">{difficulty}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs uppercase font-medium text-on-surface-variant">Semester</span>
                  <span className="text-lg font-bold text-primary">{semester}</span>
                </div>
              </div>
            </div>
          </section>

          {/* Syllabus & Assessment */}
          <section className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold font-display text-primary mb-4 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-primary" />
              Syllabus &amp; Assessment
            </h2>
            
            <div className="space-y-3">
              {course.syllabus.map((item) => {
                const isSelected = selectedSyllabusId === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedSyllabusId(item.id)}
                    className={`flex gap-4 p-4 border-l-4 rounded-r-lg transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-surface-container-low border-primary'
                        : 'border-primary-fixed hover:bg-surface-container-low/40'
                    }`}
                  >
                    <div className={`text-lg font-bold ${isSelected ? 'text-primary' : 'text-outline'}`}>
                      {item.number}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-on-surface">{item.title}</h3>
                      <p className="text-xs text-on-surface-variant mt-1">{item.description}</p>
                    </div>
                  </div>
                );
              })}

              {/* Assessment Weights (Grading Distribution) */}
              <div className="mt-6 p-4 bg-surface-container-low/60 rounded-lg border border-outline-variant/60">
                <h4 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                  Grading Distribution
                </h4>
                
                {/* Visual Segmented Bar */}
                <div className="flex h-3 w-full rounded-full overflow-hidden bg-outline-variant/40 mb-3">
                  <div 
                    className="bg-primary hover:opacity-90 transition-opacity" 
                    style={{ width: `${course.grading.assignments}%` }}
                    title={`Assignments: ${course.grading.assignments}%`}
                  />
                  <div 
                    className="bg-secondary hover:opacity-90 transition-opacity" 
                    style={{ width: `${course.grading.project}%` }}
                    title={`Mid-term Project: ${course.grading.project}%`}
                  />
                  <div 
                    className="bg-tertiary hover:opacity-90 transition-opacity" 
                    style={{ width: `${course.grading.exam}%` }}
                    title={`Final Exam: ${course.grading.exam}%`}
                  />
                </div>
                
                {/* Legend Row */}
                <div className="flex flex-wrap justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1.5 text-on-surface font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                    Assignments ({course.grading.assignments}%)
                  </span>
                  <span className="flex items-center gap-1.5 text-on-surface font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                    Mid-term Project ({course.grading.project}%)
                  </span>
                  <span className="flex items-center gap-1.5 text-on-surface font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                    Final Exam ({course.grading.exam}%)
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Instructor Profile */}
          <section className="p-6 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-lg font-bold font-display text-primary mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Instructor Profile
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-outline-variant bg-surface-container">
                <img 
                  className="w-full h-full object-cover" 
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  src={course.instructor.avatarUrl}
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-base font-bold text-on-surface">{course.instructor.name}</h3>
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mt-0.5">
                    {course.instructor.title}, {course.instructor.group}
                  </p>
                </div>
                
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {course.instructor.bio}
                </p>
                
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Teaching Schedule (Weekly)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.instructor.schedule.map((slot, index) => (
                      <div 
                        key={index} 
                        className="p-2.5 bg-surface-container-low rounded-lg border border-outline-variant/60 flex justify-between items-center"
                      >
                        <span className="text-xs font-semibold text-on-surface">{slot.type} ({slot.room})</span>
                        <span className="text-xs font-bold text-primary">{slot.timeSlot}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Sidebar Column (4 Columns) */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Pre-course Materials */}
          <div className="p-5 bg-surface-container-highest border border-outline-variant rounded-xl shadow-sm">
            <h3 className="font-bold font-display text-primary mb-4 flex items-center gap-2 text-base">
              <FolderOpen className="w-5 h-5 text-primary" />
              Pre-course Materials
            </h3>
            
            <ul className="space-y-2">
              {course.materials.map((mat, i) => (
                <li 
                  key={i}
                  className="p-3 bg-surface-container-lowest rounded-lg border border-outline-variant flex items-center justify-between group hover:border-primary transition-all duration-200 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    {mat.type === 'pdf' && <FileText className="w-4 h-4 text-on-surface-variant" />}
                    {mat.type === 'link' && <BookOpen className="w-4 h-4 text-on-surface-variant" />}
                    {mat.type === 'terminal' && <Terminal className="w-4 h-4 text-on-surface-variant" />}
                    <span className="text-xs font-semibold text-on-surface">{mat.title}</span>
                  </div>
                  
                  {mat.action === 'download' ? (
                    <Download className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                  ) : (
                    <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Live Q&A Panel Preview */}
          <div className="p-5 bg-primary-container text-on-primary-container rounded-xl shadow-sm relative overflow-hidden">
            {/* Background design icon */}
            <div className="absolute -right-6 -bottom-6 opacity-15">
              <MessageSquare className="w-32 h-32 stroke-1" />
            </div>
            
            <h3 className="font-bold font-display mb-1 flex items-center gap-2 text-base">
              <MessageSquare className="w-5 h-5" />
              {course.liveSession.title}
            </h3>
            
            <p className="text-xs opacity-90 leading-relaxed mb-4">
              {course.liveSession.description}
            </p>
            
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1.5 bg-white/10 rounded-lg">
                <Calendar className="w-4 h-4 text-secondary-fixed shrink-0" />
                <span className="text-xs font-bold">{course.liveSession.time}</span>
              </div>
            </div>
            
            <button
              onClick={() => onToggleReminder(course.id)}
              className={`w-full py-2.5 font-bold rounded-lg uppercase tracking-widest text-xs transition-colors cursor-pointer ${
                isReminderSet 
                  ? 'bg-status-success text-on-primary border border-status-success' 
                  : 'bg-white text-primary-container hover:bg-neutral-100'
              }`}
            >
              {isReminderSet ? '✓ Reminder Set' : 'Set Reminder'}
            </button>
          </div>

          {/* Prerequisites Card */}
          <div className="p-5 border border-outline-variant rounded-xl shadow-sm bg-surface-container-lowest">
            <h3 className="text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-3">
              Prerequisites
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {course.prerequisites.length === 0 ? (
                <span className="text-xs text-on-surface-variant italic">None</span>
              ) : (
                course.prerequisites.map((prereq, index) => (
                  <span 
                    key={index} 
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium inline-flex items-center gap-1 ${
                      prereq.satisfied
                        ? 'bg-surface-variant text-on-surface-variant'
                        : 'bg-error-container text-on-error-container'
                    }`}
                  >
                    {!prereq.satisfied && <AlertTriangle className="w-3.5 h-3.5 text-status-error shrink-0" />}
                    {prereq.code} {prereq.title}
                  </span>
                ))
              )}
            </div>

            {course.requiresWaiver && (
              <div className="mt-3 pt-3 border-t border-outline-variant/40 space-y-2">
                <p className="text-xs text-status-error italic font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {course.waiverMessage || 'Requires departmental approval.'}
                </p>
                
                {hasWaiverRequested ? (
                  <div className="bg-status-success/10 border border-status-success/30 p-2 rounded-lg text-xs text-status-success">
                    ✓ Waiver petition submitted for review
                  </div>
                ) : (
                  <button
                    onClick={() => setShowWaiverModal(true)}
                    className="w-full text-center text-xs text-primary font-bold hover:underline inline-flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Petition for waiver <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Waiver Request Modal */}
      {showWaiverModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-lowest max-w-md w-full rounded-xl border border-outline-variant p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 bg-error-container text-on-error-container rounded-lg shrink-0">
                <AlertTriangle className="w-5 h-5 text-status-error" />
              </div>
              <div>
                <h3 className="text-base font-bold text-on-surface">Submit Prerequisite Waiver</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  You are requesting a waiver for the missing prerequisite of {course.code}. Please explain your prior academic work or alternative experience.
                </p>
              </div>
            </div>

            <form onSubmit={handleWaiverSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface block mb-1">Justification Message</label>
                <textarea
                  value={waiverInput}
                  onChange={(e) => setWaiverInput(e.target.value)}
                  placeholder="e.g. Completed a similar course at an exchange university, or have 2 years of industry research experience..."
                  rows={4}
                  required
                  className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-low focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setShowWaiverModal(false)}
                  className="px-4 py-2 text-on-surface-variant hover:bg-surface-container rounded-lg font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-on-primary hover:bg-primary-container rounded-lg font-bold cursor-pointer"
                >
                  Submit Petition
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
