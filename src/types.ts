/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SyllabusItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface GradingDistribution {
  assignments: number; // e.g. 30
  project: number; // e.g. 20
  exam: number; // e.g. 50
}

export interface TeachingScheduleItem {
  type: 'Lecture' | 'Lab' | 'Tutorial';
  room: string;
  timeSlot: string; // e.g. "Tues 10:00 - 12:00"
}

export interface Instructor {
  name: string;
  title: string;
  group: string;
  bio: string;
  avatarUrl: string;
  schedule: TeachingScheduleItem[];
}

export interface PreCourseMaterial {
  title: string;
  type: 'pdf' | 'link' | 'terminal';
  url: string;
  action: 'download' | 'open';
}

export interface LiveSession {
  title: string;
  description: string;
  time: string; // e.g. "Aug 14, 19:00 SGT"
}

export interface Course {
  id: string;
  code: string;
  title: string;
  faculty: string;
  description: string;
  about: string;
  credits: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  semester: string;
  availableSeats: number;
  totalSeats: number;
  syllabus: SyllabusItem[];
  grading: GradingDistribution;
  instructor: Instructor;
  materials: PreCourseMaterial[];
  liveSession: LiveSession;
  prerequisites: {
    code: string;
    title: string;
    satisfied: boolean;
  }[];
  requiresWaiver: boolean;
  waiverMessage?: string;
}
