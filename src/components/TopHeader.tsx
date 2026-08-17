import React, { useState, useRef, useEffect } from 'react';
import { 
  BarChart2, 
  ShoppingBag, 
  Package, 
  Users, 
  Sparkles, 
  Settings, 
  ShieldAlert,
  Clock, 
  Moon, 
  Sun, 
  Bell, 
  Search, 
  X, 
  CheckCircle2, 
  Calendar,
  ExternalLink,
  Plus,
  LogOut
} from 'lucide-react';
import { DateFilter, NavigationTab, NotificationItem, UserProfile } from '../types';

interface TopHeaderProps {
  activeTab: NavigationTab;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  themeMode?: 'light' | 'dark';
  onToggleTheme?: () => void;
  onOpenGlobalSearch: () => void;
  notifications: NotificationItem[];
  onMarkNotificationRead: (id: string) => void;
  onOpenStorefrontPreview: () => void;
  onQuickCreateOrder: () => void;
  currentUser?: UserProfile | null;
  onLogout?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  activeTab,
  dateFilter,
  onDateFilterChange,
  themeMode = 'light',
  onToggleTheme,
  onOpenGlobalSearch,
  notifications,
  onMarkNotificationRead,
  onOpenStorefrontPreview,
  onQuickCreateOrder,
  currentUser,
  onLogout
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showClockModal, setShowClockModal] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;
  // If no unread, default display 27 or actual unread count for realistic demo feel
  const badgeDisplayCount = unreadCount > 0 ? unreadCount : 27;

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
      if (clockRef.current && !clockRef.current.contains(e.target as Node)) {
        setShowClockModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Map Tab to Header Title & Icon
  const getTabHeaderDetails = () => {
    switch (activeTab) {
      case 'dashboard':
        return {
          title: 'DASHBOARD',
          subtitle: 'MISSION CONTROL CENTER',
          badge: '• AUTO-SAVED',
          Icon: BarChart2
        };
      case 'orders':
        return {
          title: 'ORDERS',
          subtitle: 'ORDER & SALES AUTOMATION',
          badge: '• LIVE AUTOMATION',
          Icon: ShoppingBag
        };
      case 'products':
        return {
          title: 'PRODUCT MODULE',
          subtitle: 'CATALOG & INVENTORY CONTROL',
          badge: '• CATALOG ACTIVE',
          Icon: Package
        };
      case 'customers':
        return {
          title: 'CUSTOMERS',
          subtitle: 'CLIENT & LEAD INTELLIGENCE',
          badge: '• CRM SYNCED',
          Icon: Users
        };
      case 'fraudCheck':
        return {
          title: 'COURIER_CHECK',
          subtitle: 'MISSION CONTROL CENTER',
          badge: '• AUTO-SAVED',
          Icon: ShieldAlert
        };
      case 'storefront':
        return {
          title: 'LANDING BUILDER',
          subtitle: 'HIGH-CONVERSION PAGE STUDIO',
          badge: '• STOREFRONT LIVE',
          Icon: Sparkles
        };
      case 'settings':
        return {
          title: 'CONTROL CENTER',
          subtitle: 'SYSTEM CONFIGURATION & KEYS',
          badge: '• SYSTEM READY',
          Icon: Settings
        };
      default:
        return {
          title: 'DASHBOARD',
          subtitle: 'MISSION CONTROL CENTER',
          badge: '• AUTO-SAVED',
          Icon: BarChart2
        };
    }
  };

  const { title, subtitle, badge, Icon } = getTabHeaderDetails();

  const timeframeOptions: { label: string; value: DateFilter }[] = [
    { label: 'TODAY', value: 'Today' },
    { label: 'YESTERDAY', value: 'Yesterday' },
    { label: '7D', value: '7D' },
    { label: '30D', value: '30D' },
    { label: 'ALL', value: 'All' },
    { label: 'CUSTOM', value: 'Custom' }
  ];

  return (
    <header className="w-full sticky top-0 z-30 bg-white border-b border-[#E2D9D2] shadow-2xs">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        
        {/* LEFT SECTION: Icon + Module Title + Badge + Subtitle */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#F7F4F1] rounded-xl text-[#B8623B] shrink-0 border border-[#E2D9D2]/50 shadow-2xs">
            <Icon className="w-5 h-5 text-[#B8623B]" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-black text-[#0E0E0E] text-sm sm:text-base tracking-wide uppercase">
                {title}
              </h1>

              {/* Status Badge */}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 uppercase tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-[#008F2F] animate-pulse" />
                {badge}
              </span>
            </div>

            <p className="text-[10px] sm:text-xs font-extrabold text-[#545454] tracking-wider uppercase mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* MIDDLE SECTION: Timeframe Pill Selector */}
        <div className="bg-slate-100/80 p-1 rounded-full border border-slate-200/60 flex items-center gap-0.5 overflow-x-auto self-start md:self-auto max-w-full">
          {timeframeOptions.map((item) => {
            const isActive = dateFilter === item.value;
            return (
              <button
                key={item.value}
                onClick={() => onDateFilterChange(item.value)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#B8623B] text-white shadow-2xs scale-[1.02]'
                    : 'text-[#545454] hover:text-[#0E0E0E] hover:bg-[#F7F4F1]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* RIGHT SECTION: Clock, Theme, Notification Bell, User Profile */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0">
          
          {/* Clock Button (History / Logs) */}
          <div ref={clockRef} className="relative">
            <button
              onClick={() => setShowClockModal(!showClockModal)}
              className="p-2 sm:p-2.5 bg-white hover:bg-slate-100 border border-slate-200/80 rounded-xl text-slate-700 transition-all shadow-2xs hover:scale-105 active:scale-95"
              title="Time Logs & History"
            >
              <Clock className="w-4 h-4 text-slate-700" />
            </button>

            {showClockModal && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 z-40 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-extrabold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    Activity & System Logs
                  </span>
                  <button onClick={() => setShowClockModal(false)} className="text-slate-400 hover:text-slate-700">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="py-2 space-y-2 text-[11px]">
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="font-bold text-slate-900">Auto-saved System State</div>
                    <div className="text-slate-500 text-[10px]">Just now • All modifications synced</div>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <div className="font-bold text-slate-900">Timeframe Updated</div>
                    <div className="text-slate-500 text-[10px]">Filter set to {dateFilter.toUpperCase()}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theme Switcher Button (Moon/Sun) */}
          <button
            onClick={onToggleTheme}
            className="p-2 sm:p-2.5 bg-white hover:bg-slate-100 border border-slate-200/80 rounded-xl text-slate-700 transition-all shadow-2xs hover:scale-105 active:scale-95"
            title="Toggle Theme"
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-500" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Notifications Bell Button */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 sm:p-2.5 bg-white hover:bg-slate-100 border border-slate-200/80 rounded-xl text-slate-700 transition-all shadow-2xs hover:scale-105 active:scale-95"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black rounded-full px-1.5 py-0.2 min-w-[18px] text-center shadow-2xs ring-2 ring-white">
                {badgeDisplayCount}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-40 overflow-hidden">
                <div className="px-4 py-2.5 flex items-center justify-between border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-slate-900 uppercase tracking-wide">Notifications</span>
                    <span className="px-2 py-0.5 text-[10px] font-black bg-rose-100 text-rose-700 rounded-full">
                      {badgeDisplayCount} New
                    </span>
                  </div>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => onMarkNotificationRead(item.id)}
                        className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                          item.unread ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className={`text-xs font-bold ${item.unread ? 'text-slate-900' : 'text-slate-700'}`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400 shrink-0">
                            {item.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-slate-100 bg-slate-50 text-center">
                  <button
                    onClick={() => {
                      notifications.forEach((n) => onMarkNotificationRead(n.id));
                    }}
                    className="text-xs font-bold text-blue-600 hover:underline"
                  >
                    Mark all as read
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-slate-200/90 mx-0.5" />

          {/* USER PROFILE SECTION */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 hover:bg-slate-100/70 rounded-xl transition-all"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-black text-slate-900 leading-none">
                  {currentUser?.name || 'Shop Owner'}
                </div>
                <div className="text-[10px] font-extrabold text-[#B8623B] uppercase tracking-wider mt-0.5">
                  {currentUser?.role || 'ADMIN'}
                </div>
              </div>

              {/* Orange gradient avatar with initial */}
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#944923] to-[#C87B57] text-white font-black text-xs flex items-center justify-center shadow-xs shrink-0">
                {(currentUser?.name || 'Shop Owner').charAt(0).toUpperCase()}
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-40 text-xs animate-fadeIn">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-extrabold text-slate-900">{currentUser?.name || 'Shop Owner'}</p>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{currentUser?.email || 'admin@shopowner.com'}</p>
                  <p className="text-[10px] font-bold text-[#B8623B] mt-0.5">{currentUser?.storeName || 'Aura Premium Store BD'}</p>
                </div>

                <div className="p-1 space-y-1">
                  <button
                    onClick={() => {
                      onOpenGlobalSearch();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Search className="w-4 h-4 text-slate-500" />
                    Global Search (⌘K)
                  </button>
                  <button
                    onClick={() => {
                      onOpenStorefrontPreview();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 font-bold text-slate-700 hover:bg-[#F7F4F1] hover:text-[#B8623B] rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-[#B8623B]" />
                    View Storefront
                  </button>
                  <button
                    onClick={() => {
                      onQuickCreateOrder();
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 font-bold text-slate-700 hover:bg-slate-100 rounded-xl flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-slate-500" />
                    Create Manual Order
                  </button>

                  {onLogout && (
                    <div className="pt-1 mt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setShowProfileMenu(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 font-extrabold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-rose-600" />
                        Log Out / Lock Panel
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
