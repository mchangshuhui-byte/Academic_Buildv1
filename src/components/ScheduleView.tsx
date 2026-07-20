/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Course } from '../types';
import { Calendar, List, Clock, MapPin, GraduationCap, AlertCircle } from 'lucide-react';

interface ScheduleViewProps {
  registeredCourseIds: string[];
  allCourses: Course[];
  onSelectCourse: (course: Course) => void;
  onTabChange: (tab: string) => void;
}

interface CalendarEvent {
  courseCode: string;
  courseTitle: string;
  type: string;
  room: string;
  day: 'Mon' | 'Tues' | 'Wed' | 'Thu' | 'Fri';
  startHour: number;
  endHour: number;
  colorClass: string;
  bgClass: string;
  borderClass: string;
  courseObj: Course;
}

export default function ScheduleView({
  registeredCourseIds,
  allCourses,
  onSelectCourse,
  onTabChange
}: ScheduleViewProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  const registeredCourses = allCourses.filter(c => registeredCourseIds.includes(c.id));

  // Let's map the courses to schedule colors
  const getColorScheme = (code: string) => {
    switch (code) {
      case 'CS4201':
        return {
          colorClass: 'text-primary',
          bgClass: 'bg-primary/10 hover:bg-primary/15',
          borderClass: 'border-primary'
        };
      case 'CS2101':
        return {
          colorClass: 'text-secondary-container',
          bgClass: 'bg-secondary-container/10 hover:bg-secondary-container/15',
          borderClass: 'border-secondary-container'
        };
      case 'MA1101':
        return {
          colorClass: 'text-emerald-700',
          bgClass: 'bg-emerald-50 hover:bg-emerald-100',
          borderClass: 'border-emerald-500'
        };
      case 'CS3210':
        return {
          colorClass: 'text-indigo-700',
          bgClass: 'bg-indigo-50 hover:bg-indigo-100',
          borderClass: 'border-indigo-500'
        };
      default:
        return {
          colorClass: 'text-gray-700',
          bgClass: 'bg-gray-50 hover:bg-gray-100',
          borderClass: 'border-gray-500'
        };
    }
  };

  // Helper to parse timeslots like "Tues 10:00 - 12:00" or "Fri 14:00 - 16:00"
  const getEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = [];
    
    registeredCourses.forEach((course) => {
      const colors = getColorScheme(course.code);
      course.instructor.schedule.forEach((sched) => {
        // Parse timeSlot like "Tues 10:00 - 12:00"
        const parts = sched.timeSlot.split(' ');
        const dayStr = parts[0]; // e.g. "Tues", "Mon", "Fri", "Wed", "Thu"
        const times = parts[1] ? parts[1].split(':') : ['10', '00'];
        const startH = parseInt(times[0]);
        
        let endH = startH + 2; // standard 2 hours
        if (sched.timeSlot.includes('-')) {
          const endPart = sched.timeSlot.split('-')[1].trim();
          endH = parseInt(endPart.split(':')[0]);
        }

        let mappedDay: 'Mon' | 'Tues' | 'Wed' | 'Thu' | 'Fri' = 'Mon';
        if (dayStr.startsWith('Mon')) mappedDay = 'Mon';
        else if (dayStr.startsWith('Tue')) mappedDay = 'Tues';
        else if (dayStr.startsWith('Wed')) mappedDay = 'Wed';
        else if (dayStr.startsWith('Thu')) mappedDay = 'Thu';
        else if (dayStr.startsWith('Fri')) mappedDay = 'Fri';

        events.push({
          courseCode: course.code,
          courseTitle: course.title,
          type: sched.type,
          room: sched.room,
          day: mappedDay,
          startHour: startH,
          endHour: endH,
          ...colors,
          courseObj: course
        });
      });
    });

    return events;
  };

  const events = getEvents();
  const days: ('Mon' | 'Tues' | 'Wed' | 'Thu' | 'Fri')[] = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri'];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  const handleEventClick = (course: Course) => {
    onSelectCourse(course);
    onTabChange('discovery');
  };

  return (
    <div className="space-y-6">
      {/* View Toggle Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-outline-variant/60">
        <div>
          <h1 className="text-xl md:text-2xl font-display font-bold text-primary flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            My Weekly Academic Timetable
          </h1>
          <p className="text-xs text-on-surface-variant mt-1">
            Visual calendar representation of lectures, tutorials, and laboratory sessions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-surface-container-low p-1 rounded-lg border border-outline-variant flex">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'calendar'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Calendar Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-1.5 cursor-pointer transition-all ${
                viewMode === 'list'
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              Session List
            </button>
          </div>
        </div>
      </div>

      {registeredCourses.length === 0 ? (
        <div className="border border-dashed border-outline-variant rounded-xl p-12 text-center bg-surface-container-low/30 space-y-4">
          <Calendar className="w-16 h-16 text-outline-variant mx-auto" />
          <div>
            <h3 className="font-semibold text-on-surface text-sm">Timetable is empty</h3>
            <p className="text-xs text-on-surface-variant mt-1">Enroll in modules from the course discovery portal to populate your weekly timetable schedule.</p>
          </div>
          <button
            onClick={() => onTabChange('discovery')}
            className="px-5 py-2.5 bg-primary text-on-primary text-xs font-bold rounded-lg hover:bg-primary-container transition-all cursor-pointer"
          >
            Browse Course Catalog
          </button>
        </div>
      ) : viewMode === 'list' ? (
        /* LIST VIEW */
        <div className="space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant uppercase tracking-wider font-bold border-b border-outline-variant">
                  <th className="p-4">Day</th>
                  <th className="p-4">Time Slot</th>
                  <th className="p-4">Module</th>
                  <th className="p-4">Activity</th>
                  <th className="p-4">Location</th>
                  <th className="p-4 text-right">Credits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40">
                {events
                  .sort((a, b) => {
                    const daysOrder = { Mon: 1, Tues: 2, Wed: 3, Thu: 4, Fri: 5 };
                    if (daysOrder[a.day] !== daysOrder[b.day]) {
                      return daysOrder[a.day] - daysOrder[b.day];
                    }
                    return a.startHour - b.startHour;
                  })
                  .map((evt, i) => (
                    <tr 
                      key={i}
                      onClick={() => handleEventClick(evt.courseObj)}
                      className="hover:bg-surface-container-low/40 cursor-pointer transition-colors"
                    >
                      <td className="p-4 font-bold text-primary">{evt.day}</td>
                      <td className="p-4 font-semibold text-on-surface flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-on-surface-variant" />
                        {evt.startHour}:00 - {evt.endHour}:00
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 bg-primary-fixed text-on-primary-fixed text-[10px] font-bold rounded">
                            {evt.courseCode}
                          </span>
                          <span className="font-semibold text-on-surface">{evt.courseTitle}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full text-[10px] font-semibold">
                          {evt.type}
                        </span>
                      </td>
                      <td className="p-4 text-on-surface-variant font-medium flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-outline" />
                        {evt.room}
                      </td>
                      <td className="p-4 text-right font-bold text-primary">{evt.courseObj.credits} U</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* WEEKLY CALENDAR GRID */
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-md">
          
          {/* Calendar Header Row */}
          <div className="grid grid-cols-6 border-b border-outline-variant bg-surface-container-low text-center font-bold text-xs">
            <div className="p-3 border-r border-outline-variant/60 flex items-center justify-center text-on-surface-variant">
              <Clock className="w-4 h-4 mr-1 text-on-surface-variant" />
              Time
            </div>
            {days.map((day) => (
              <div key={day} className="p-3 border-r border-outline-variant/60 last:border-r-0 text-primary">
                {day}
              </div>
            ))}
          </div>

          {/* Grid Rows */}
          <div className="divide-y divide-outline-variant/40">
            {hours.map((hour) => (
              <div key={hour} className="grid grid-cols-6 min-h-[4.5rem]">
                
                {/* Time column */}
                <div className="p-3 border-r border-outline-variant/60 text-[10px] font-bold text-on-surface-variant flex items-start justify-center bg-surface-container-low/30">
                  {hour.toString().padStart(2, '0')}:00
                </div>

                {/* Day columns */}
                {days.map((day) => {
                  // Find event for this day and hour
                  const activeEvents = events.filter(
                    (evt) => evt.day === day && hour >= evt.startHour && hour < evt.endHour
                  );

                  return (
                    <div 
                      key={day} 
                      className="border-r border-outline-variant/60 last:border-r-0 relative p-1 group hover:bg-surface-container-low/20 transition-all"
                    >
                      {activeEvents.map((evt, idx) => {
                        // Render block only at startHour of event
                        const isStart = hour === evt.startHour;
                        if (!isStart) return null;

                        const span = evt.endHour - evt.startHour;

                        return (
                          <div
                            key={idx}
                            onClick={() => handleEventClick(evt.courseObj)}
                            className={`absolute inset-x-1.5 top-1 rounded-lg border-l-4 p-2 z-10 cursor-pointer shadow-sm flex flex-col justify-between select-none transition-all duration-200 ${evt.bgClass} ${evt.borderClass}`}
                            style={{ 
                              height: `calc(${span * 4.5}rem - 0.5rem)`,
                            }}
                          >
                            <div className="space-y-0.5">
                              <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black tracking-wide uppercase ${evt.colorClass}`}>
                                  {evt.courseCode}
                                </span>
                                <span className="text-[9px] bg-white/60 dark:bg-black/20 px-1 py-0.2 rounded-md font-semibold text-on-surface-variant scale-90">
                                  {evt.type}
                                </span>
                              </div>
                              <h4 className="text-[11px] font-bold text-on-surface leading-tight line-clamp-2">
                                {evt.courseTitle}
                              </h4>
                            </div>

                            <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-medium mt-1">
                              <span className="flex items-center gap-0.5">
                                <Clock className="w-3 h-3 text-outline" />
                                {evt.startHour}:00 - {evt.endHour}:00
                              </span>
                              <span className="flex items-center gap-0.5 font-bold">
                                <MapPin className="w-3 h-3 text-outline" />
                                {evt.room}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}

              </div>
            ))}
          </div>

          <div className="bg-surface-container-low/50 p-4 border-t border-outline-variant text-center text-xs flex justify-center items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="text-on-surface-variant">Click any schedule block to open details, syllabus, and download materials.</span>
          </div>

        </div>
      )}
    </div>
  );
}
