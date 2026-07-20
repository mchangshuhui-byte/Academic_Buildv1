/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { COURSES } from './data/courses';
import { Course } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import CourseDetail from './components/CourseDetail';
import DashboardView from './components/DashboardView';
import ScheduleView from './components/ScheduleView';
import RegistrationHubView from './components/RegistrationHubView';
import DisqusForum from './components/DisqusForum';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MessageSquare, ShieldAlert } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface Notification {
  id: string;
  text: string;
  type: 'info' | 'success' | 'warning';
  read: boolean;
}

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('discovery');
  const [selectedCourse, setSelectedCourse] = useState<Course>(COURSES[0]); // default to CS4201
  const [registeredCourseIds, setRegisteredCourseIds] = useState<string[]>(['cs2101', 'ma1101']); // pre-register foundational classes
  const [remindersSet, setRemindersSet] = useState<string[]>([]);
  const [waiversRequested, setWaiversRequested] = useState<{ [key: string]: string }>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([
    { 
      id: 'n1', 
      text: 'Welcome to Academic Year 2026/2027. Course enrollment Round 1 is active.', 
      type: 'info', 
      read: false 
    },
    { 
      id: 'n2', 
      text: 'Pre-course syllabus and material for CS4201 have been published.', 
      type: 'success', 
      read: false 
    },
    { 
      id: 'n3', 
      text: 'Reminder: Missing CS3210 required for Advanced Machine Learning (CS4201).', 
      type: 'warning', 
      read: false 
    }
  ]);

  // Toast trigger helper
  const triggerToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Add a real notification
  const addNotification = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const id = Date.now().toString();
    setNotifications((prev) => [
      { id, text, type, read: false },
      ...prev
    ]);
  };

  // Mark notifications as read
  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    triggerToast('All notifications marked as read', 'info');
  };

  // Toggle registration for course
  const handleToggleRegistration = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    const isCurrentlyRegistered = registeredCourseIds.includes(courseId);
    
    if (isCurrentlyRegistered) {
      setRegisteredCourseIds(prev => prev.filter(id => id !== courseId));
      triggerToast(`Registration cancelled for ${course.code}.`, 'info');
      addNotification(`You unregistered from ${course.code}: ${course.title}.`, 'warning');
    } else {
      setRegisteredCourseIds(prev => [...prev, courseId]);
      triggerToast(`Successfully registered for ${course.code}!`, 'success');
      addNotification(`Successfully enrolled in ${course.code}: ${course.title}.`, 'success');
    }
  };

  // Toggle reminder for Live Q&A session
  const handleToggleReminder = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    const isSet = remindersSet.includes(courseId);

    if (isSet) {
      setRemindersSet(prev => prev.filter(id => id !== courseId));
      triggerToast(`Reminder removed for ${course.code} Live Q&A.`, 'info');
    } else {
      setRemindersSet(prev => [...prev, courseId]);
      triggerToast(`Reminder set! You will be notified on Aug 14 for ${course.code}.`, 'success');
      addNotification(`Live Q&A reminder configured for ${course.code}.`, 'info');
    }
  };

  // Submit waiver petition for missing prerequisites
  const handleSubmitWaiver = (courseId: string, message: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    setWaiversRequested(prev => ({
      ...prev,
      [courseId]: message
    }));
    triggerToast(`Waiver petition submitted for ${course.code}.`, 'success');
    addNotification(`Departmental waiver petition submitted for ${course.code}. Approval pending.`, 'info');
  };

  // Cancel waiver
  const handleCancelWaiver = (courseId: string) => {
    const course = COURSES.find(c => c.id === courseId);
    if (!course) return;

    setWaiversRequested(prev => {
      const copy = { ...prev };
      delete copy[courseId];
      return copy;
    });
    triggerToast(`Waiver request cancelled for ${course.code}.`, 'info');
  };

  // Clear all drafts in registration hub
  const handleClearAllDrafts = () => {
    setRegisteredCourseIds([]);
    triggerToast('All drafted modules removed.', 'info');
    addNotification('All module drafts cleared from planner.', 'warning');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Top Banner Navigation */}
      <Header 
        currentTab={currentTab} 
        onTabChange={setCurrentTab} 
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
          >
            {currentTab === 'discovery' && (
              <CourseDetail 
                course={selectedCourse}
                isRegistered={registeredCourseIds.includes(selectedCourse.id)}
                onToggleRegistration={handleToggleRegistration}
                isReminderSet={remindersSet.includes(selectedCourse.id)}
                onToggleReminder={handleToggleReminder}
                coursesList={COURSES}
                onSelectCourse={setSelectedCourse}
                onSubmitWaiver={handleSubmitWaiver}
                hasWaiverRequested={!!waiversRequested[selectedCourse.id]}
              />
            )}

            {currentTab === 'dashboard' && (
              <DashboardView 
                registeredCourseIds={registeredCourseIds}
                allCourses={COURSES}
                remindersSet={remindersSet}
                waiversRequested={waiversRequested}
                onSelectCourse={setSelectedCourse}
                onTabChange={setCurrentTab}
              />
            )}

            {currentTab === 'schedule' && (
              <ScheduleView 
                registeredCourseIds={registeredCourseIds}
                allCourses={COURSES}
                onSelectCourse={setSelectedCourse}
                onTabChange={setCurrentTab}
              />
            )}

            {currentTab === 'hub' && (
              <RegistrationHubView 
                registeredCourseIds={registeredCourseIds}
                allCourses={COURSES}
                onToggleRegistration={handleToggleRegistration}
                waiversRequested={waiversRequested}
                onCancelWaiver={handleCancelWaiver}
                onClearAll={handleClearAllDrafts}
              />
            )}

            {/* Disqus Forum at the bottom of each tab */}
            <DisqusForum 
              currentTab={currentTab}
              courseId={currentTab === 'discovery' ? selectedCourse.id : undefined}
              courseTitle={currentTab === 'discovery' ? selectedCourse.title : undefined}
            />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Real-time Toast Notifications */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.25, type: 'spring', stiffness: 350, damping: 25 }}
              className={`px-6 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2.5 border backdrop-blur pointer-events-auto ${
                toast.type === 'success' 
                  ? 'bg-primary text-on-primary border-primary/20' 
                  : toast.type === 'warning' 
                    ? 'bg-status-error text-on-primary border-status-error/20' 
                    : 'bg-inverse-surface text-inverse-on-surface border-outline/10'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />}
              {toast.type === 'warning' && <ShieldAlert className="w-4 h-4 text-white shrink-0" />}
              {toast.type === 'info' && <MessageSquare className="w-4 h-4 text-secondary-fixed-dim shrink-0" />}
              <span>{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
