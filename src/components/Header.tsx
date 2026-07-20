/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Bell, HelpCircle, MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  notifications: { id: string; text: string; type: 'info' | 'success' | 'warning'; read: boolean }[];
  onMarkAllRead: () => void;
}

export default function Header({
  currentTab,
  onTabChange,
  notifications,
  onMarkAllRead
}: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'discovery', label: 'Course Discovery' },
    { id: 'schedule', label: 'My Schedule' },
    { id: 'hub', label: 'Registration Hub' }
  ];

  return (
    <nav className="bg-surface sticky top-0 z-50 border-b border-outline-variant shadow-sm backdrop-blur-md bg-opacity-95">
      <div className="flex justify-between items-center w-full px-6 md:px-12 max-w-7xl mx-auto h-16">
        {/* Brand & Tabs */}
        <div className="flex items-center gap-6">
          <span 
            className="text-xl md:text-2xl font-display font-bold text-primary tracking-tight cursor-pointer"
            onClick={() => onTabChange('dashboard')}
          >
            Academic Nexus
          </span>
          
          <div className="hidden md:flex gap-4 ml-8 h-full items-center">
            {tabs.map((tab) => {
              const isActive = currentTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`relative py-2 px-1 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                    isActive 
                      ? 'text-primary font-bold' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                  id={`nav-tab-${tab.id}`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Utilities & Student Avatar */}
        <div className="flex items-center gap-4 relative">
          {/* Notifications Trigger */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors relative cursor-pointer"
              id="notifications-bell"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full animate-pulse" />
              )}
            </button>

            {/* Notification Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <>
                  {/* Backdrop */}
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setShowNotifications(false)} 
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-xl z-40 p-4 max-h-96 overflow-y-auto"
                  >
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-outline-variant">
                      <span className="font-semibold text-sm text-primary">Notifications</span>
                      {unreadCount > 0 && (
                        <button 
                          onClick={onMarkAllRead}
                          className="text-xs text-secondary hover:underline font-medium cursor-pointer"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {notifications.length === 0 ? (
                        <div className="text-center py-6 text-on-surface-variant text-xs">
                          No notifications at this time
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            className={`p-2.5 rounded-lg border text-xs flex gap-2 items-start transition-colors ${
                              notif.read ? 'bg-surface-container-low/50 border-outline-variant/40' : 'bg-primary-container/10 border-primary-container/30'
                            }`}
                          >
                            {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />}
                            {notif.type === 'warning' && <ShieldAlert className="w-4 h-4 text-status-warning shrink-0 mt-0.5" />}
                            {notif.type === 'info' && <MessageSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />}
                            
                            <div className="flex-1">
                              <p className="text-on-surface leading-tight">{notif.text}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button className="p-2 text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors cursor-pointer hidden sm:block">
            <HelpCircle className="w-5 h-5" />
          </button>

          {/* Student Profile Avatar */}
          <div className="flex items-center gap-2 border-l border-outline-variant pl-4">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant hover:border-primary transition-all duration-300">
              <img 
                className="w-full h-full object-cover" 
                alt="Student Profile" 
                referrerPolicy="no-referrer"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMfusAoscs8Ca03ztxypXfCrezsR9pMdH7dNwHOqlyJkttlK_8zGHGrT2F-pzCFq5f3F5Ipy3l5PDZzrICh6hSkC13kL5XGoA0ySGaKjVskx6UZ8fcNm9hIpyc75hHenC6ZTMWETr4eElqd6qFUujIvhi4QihO4AUT8KvjaDLcQxLeeQBxj9aR-jGj3U9wg0AnMen3fC0hf5KGLar4ZrkC45dgVrKnrdzh3_Fcpkx_MJ-XA8dJtWSm-MBQmXDq7ac5xPvAZOY8"
              />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-on-surface leading-none">M. Chang</span>
              <span className="text-[10px] text-on-surface-variant">Computer Science</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation row */}
      <div className="md:hidden flex justify-around border-t border-outline-variant/60 py-2 bg-surface">
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`text-xs px-2 py-1 transition-colors ${
                isActive 
                  ? 'text-primary font-bold border-b border-primary' 
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
