/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DiscussionEmbed } from 'disqus-react';
import { MessageSquare, Users, Info } from 'lucide-react';

interface DisqusForumProps {
  currentTab: string;
  courseId?: string;
  courseTitle?: string;
}

export default function DisqusForum({ currentTab, courseId, courseTitle }: DisqusForumProps) {
  // Generate unique identifier and title based on current view/tab
  let identifier = `academic-nexus-${currentTab}`;
  let title = `Academic Nexus - ${currentTab.charAt(0).toUpperCase() + currentTab.slice(1)}`;
  let sectionSubtitle = 'General tab discussion board for Academic Nexus peer communication.';

  if (currentTab === 'discovery' && courseId && courseTitle) {
    identifier = `academic-nexus-course-${courseId}`;
    title = `Course: ${courseTitle} (${courseId.toUpperCase()})`;
    sectionSubtitle = `Dedicated peer discussion board for ${courseTitle}. Ask questions about syllabus, lab requirements, and grading.`;
  } else if (currentTab === 'dashboard') {
    sectionSubtitle = 'Discuss overall enrollment timelines, academic advisor announcements, and general course load requirements.';
  } else if (currentTab === 'schedule') {
    sectionSubtitle = 'Coordinate with classmates, find study groups for identical timetable sessions, or arrange lectures meetups.';
  } else if (currentTab === 'hub') {
    sectionSubtitle = 'Consult peers on registration approvals, waiver petition feedback, and tuition payment processes.';
  }

  // Ensure stable absolute URL for Disqus indexing
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}${window.location.pathname}?tab=${currentTab}${courseId ? `&course=${courseId}` : ''}`
    : 'https://academic-nexus.nus.edu';

  const disqusConfig = {
    url: currentUrl,
    identifier: identifier,
    title: title,
    language: 'en',
  };

  return (
    <section className="mt-12 p-6 md:p-8 bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-outline-variant/60 mb-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 shrink-0" />
            Peer Discussions
          </div>
          <h2 className="text-lg md:text-xl font-bold font-display text-primary flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary shrink-0" />
            {title}
          </h2>
          <p className="text-xs text-on-surface-variant max-w-2xl leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>
        
        <div className="bg-surface-container-low p-3 rounded-xl border border-outline-variant flex items-start gap-2.5 max-w-xs shrink-0 self-start md:self-center">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span className="text-[10px] text-on-surface-variant leading-normal">
            Moderated under the NUS Student Code of Conduct. Keep discussions professional, respectful, and academically supportive.
          </span>
        </div>
      </div>

      {/* Disqus Embed container */}
      <div className="disqus-wrapper bg-white rounded-xl p-4 md:p-6 border border-outline-variant/50 min-h-[300px]">
        <DiscussionEmbed
          shortname="uiux-replica"
          config={disqusConfig}
        />
      </div>
    </section>
  );
}
