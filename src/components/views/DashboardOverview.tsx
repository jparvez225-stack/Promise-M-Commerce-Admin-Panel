import React from 'react';

interface DashboardOverviewProps {
  orders?: any[];
  leads?: any[];
  products?: any[];
  revenueTimeline?: any[];
  pipelineData?: any[];
  onSelectOrder?: (order: any) => void;
  onSelectStage?: (stage: any) => void;
  onNavigateToTab?: (tab: string) => void;
  onQuickRecoverLead?: (lead: any) => void;
}

interface MetricCardProps {
  title: string;
  theme?: string;
  mainValue: string | number;
  sub1: { val: string | number; label: string };
  sub2: { val: string | number; label: string };
  sub3: { val: string | number; label: string };
  hasSparkline?: boolean;
  onClick?: () => void;
}

const themeStyles: Record<string, {
  cardBg: string;
  glow1: string;
  glow2: string;
  dot: string;
  subBorder: string;
  sparklineColor: string;
}> = {
  blue: {
    cardBg: 'from-blue-50/90 via-sky-50/40 to-white/95',
    glow1: 'bg-blue-300/30 group-hover:bg-blue-400/40',
    glow2: 'bg-sky-200/25',
    dot: 'bg-blue-500',
    subBorder: 'border-blue-100/80',
    sparklineColor: 'text-blue-500',
  },
  emerald: {
    cardBg: 'from-emerald-50/90 via-teal-50/40 to-white/95',
    glow1: 'bg-emerald-300/30 group-hover:bg-emerald-400/40',
    glow2: 'bg-teal-200/25',
    dot: 'bg-emerald-500',
    subBorder: 'border-emerald-100/80',
    sparklineColor: 'text-emerald-500',
  },
  amber: {
    cardBg: 'from-amber-50/90 via-orange-50/40 to-white/95',
    glow1: 'bg-amber-300/30 group-hover:bg-amber-400/40',
    glow2: 'bg-orange-200/25',
    dot: 'bg-amber-500',
    subBorder: 'border-amber-100/80',
    sparklineColor: 'text-amber-500',
  },
  purple: {
    cardBg: 'from-purple-50/90 via-fuchsia-50/40 to-white/95',
    glow1: 'bg-purple-300/30 group-hover:bg-purple-400/40',
    glow2: 'bg-fuchsia-200/25',
    dot: 'bg-purple-500',
    subBorder: 'border-purple-100/80',
    sparklineColor: 'text-purple-500',
  },
  rose: {
    cardBg: 'from-rose-50/90 via-pink-50/40 to-white/95',
    glow1: 'bg-rose-300/30 group-hover:bg-rose-400/40',
    glow2: 'bg-pink-200/25',
    dot: 'bg-rose-500',
    subBorder: 'border-rose-100/80',
    sparklineColor: 'text-rose-500',
  },
  cyan: {
    cardBg: 'from-cyan-50/90 via-sky-50/40 to-white/95',
    glow1: 'bg-cyan-300/30 group-hover:bg-cyan-400/40',
    glow2: 'bg-sky-200/25',
    dot: 'bg-cyan-500',
    subBorder: 'border-cyan-100/80',
    sparklineColor: 'text-cyan-500',
  },
  indigo: {
    cardBg: 'from-indigo-50/90 via-blue-50/40 to-white/95',
    glow1: 'bg-indigo-300/30 group-hover:bg-indigo-400/40',
    glow2: 'bg-blue-200/25',
    dot: 'bg-indigo-500',
    subBorder: 'border-indigo-100/80',
    sparklineColor: 'text-indigo-500',
  },
  teal: {
    cardBg: 'from-teal-50/90 via-emerald-50/40 to-white/95',
    glow1: 'bg-teal-300/30 group-hover:bg-teal-400/40',
    glow2: 'bg-emerald-200/25',
    dot: 'bg-teal-500',
    subBorder: 'border-teal-100/80',
    sparklineColor: 'text-teal-500',
  },
  violet: {
    cardBg: 'from-violet-50/90 via-purple-50/40 to-white/95',
    glow1: 'bg-violet-300/30 group-hover:bg-violet-400/40',
    glow2: 'bg-purple-200/25',
    dot: 'bg-violet-500',
    subBorder: 'border-violet-100/80',
    sparklineColor: 'text-violet-500',
  },
  fuchsia: {
    cardBg: 'from-fuchsia-50/90 via-rose-50/40 to-white/95',
    glow1: 'bg-fuchsia-300/30 group-hover:bg-fuchsia-400/40',
    glow2: 'bg-rose-200/25',
    dot: 'bg-fuchsia-500',
    subBorder: 'border-fuchsia-100/80',
    sparklineColor: 'text-fuchsia-500',
  },
  sky: {
    cardBg: 'from-sky-50/90 via-blue-50/40 to-white/95',
    glow1: 'bg-sky-300/30 group-hover:bg-sky-400/40',
    glow2: 'bg-indigo-200/25',
    dot: 'bg-sky-500',
    subBorder: 'border-sky-100/80',
    sparklineColor: 'text-sky-500',
  },
  orange: {
    cardBg: 'from-orange-50/90 via-amber-50/40 to-white/95',
    glow1: 'bg-orange-300/30 group-hover:bg-orange-400/40',
    glow2: 'bg-amber-200/25',
    dot: 'bg-orange-500',
    subBorder: 'border-orange-100/80',
    sparklineColor: 'text-orange-500',
  },
  lime: {
    cardBg: 'from-lime-50/90 via-emerald-50/40 to-white/95',
    glow1: 'bg-lime-300/30 group-hover:bg-lime-400/40',
    glow2: 'bg-emerald-200/25',
    dot: 'bg-lime-500',
    subBorder: 'border-lime-100/80',
    sparklineColor: 'text-lime-500',
  },
  pink: {
    cardBg: 'from-pink-50/90 via-rose-50/40 to-white/95',
    glow1: 'bg-pink-300/30 group-hover:bg-pink-400/40',
    glow2: 'bg-rose-200/25',
    dot: 'bg-pink-500',
    subBorder: 'border-pink-100/80',
    sparklineColor: 'text-pink-500',
  },
  yellow: {
    cardBg: 'from-yellow-50/90 via-amber-50/40 to-white/95',
    glow1: 'bg-yellow-300/35 group-hover:bg-yellow-400/45',
    glow2: 'bg-amber-200/30',
    dot: 'bg-yellow-500',
    subBorder: 'border-yellow-100/80',
    sparklineColor: 'text-yellow-500',
  },
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  theme = 'blue',
  mainValue,
  sub1,
  sub2,
  sub3,
  hasSparkline = false,
  onClick
}) => {
  const currentTheme = themeStyles[theme] || themeStyles.blue;

  return (
    <div 
      onClick={onClick}
      className={`bg-gradient-to-br ${currentTheme.cardBg} backdrop-blur-md shadow-2xs hover:shadow-md rounded-xl overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 transition-all duration-200 relative group ${
        onClick ? 'cursor-pointer hover:-translate-y-0.5' : ''
      }`}
    >
      {/* Blurred background glow circles for light gradient effect */}
      <div className={`absolute -top-6 -right-6 w-24 h-24 ${currentTheme.glow1} rounded-full blur-xl pointer-events-none transition-all duration-300`} />
      <div className={`absolute -bottom-6 -left-6 w-20 h-20 ${currentTheme.glow2} rounded-full blur-lg pointer-events-none`} />

      {/* Card Header: Title & Live Dot */}
      <div className="flex items-center justify-between gap-1 mb-1.5 relative z-10">
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-700 truncate">
          {title}
        </span>
        <span className="flex items-center gap-1 text-[9px] font-semibold text-slate-400 uppercase tracking-widest shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${currentTheme.dot} animate-pulse`} />
          LIVE
        </span>
      </div>

      {/* Main Metric Value */}
      <div className="flex items-center justify-between my-2 relative z-10">
        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {mainValue}
        </span>
        {hasSparkline && (
          <div className={`w-12 h-6 ${currentTheme.sparklineColor}`}>
            <svg className="w-full h-full" viewBox="0 0 50 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0,14 Q 10,18 20,10 T 40,6 T 50,12" />
            </svg>
          </div>
        )}
      </div>

      {/* Submetrics Row */}
      <div className={`mt-3 pt-2.5 border-t ${currentTheme.subBorder} grid grid-cols-3 gap-1.5 relative z-10`}>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[11px] font-extrabold text-slate-800 leading-none truncate w-full">
            {sub1.val}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 truncate w-full mt-1">
            {sub1.label}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[11px] font-extrabold text-slate-800 leading-none truncate w-full">
            {sub2.val}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 truncate w-full mt-1">
            {sub2.label}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[11px] font-extrabold text-slate-800 leading-none truncate w-full">
            {sub3.val}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-wider text-slate-400 truncate w-full mt-1">
            {sub3.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  orders = [],
  leads = [],
  products = [],
  onSelectStage,
  onNavigateToTab
}) => {
  // Helper calculations for dynamic data if present
  const pendingOrders = orders.filter(o => o.status === 'Pending');
  const confirmedOrders = orders.filter(o => o.status === 'Confirmed');
  const readyOrders = orders.filter(o => o.status === 'Ready to Ship');
  const shippedOrders = orders.filter(o => o.status === 'Shipped');
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const canceledOrders = orders.filter(o => o.status === 'Canceled');
  const holdOrders = orders.filter(o => o.status === 'Hold');

  // Total orders calculations
  const totalOrderCount = orders.length;
  const totalOrderWorth = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
  const avgOrderVal = totalOrderCount > 0 ? Math.round(totalOrderWorth / totalOrderCount) : 0;

  return (
    <div className="w-full space-y-5 font-sans p-1">
      {/* 5x5 METRIC CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        
        {/* ROW 1 */}
        {/* 1. TOTAL ORDERS */}
        <MetricCard
          title="TOTAL ORDERS"
          theme="blue"
          mainValue={totalOrderCount}
          sub1={{ val: (totalOrderCount / 30).toFixed(1) + '/d', label: 'VELOCITY' }}
          sub2={{ val: `৳${avgOrderVal.toLocaleString()}`, label: 'AVG VALUE' }}
          sub3={{ val: `৳${totalOrderWorth.toLocaleString()}`, label: 'WORTH' }}
          onClick={() => onNavigateToTab && onNavigateToTab('orders')}
        />

        {/* 2. RECOVERED */}
        <MetricCard
          title="RECOVERED"
          theme="emerald"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '৳0', label: 'WORTH' }}
        />

        {/* 3. IN TRANSIT */}
        <MetricCard
          title="IN TRANSIT"
          theme="sky"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '৳0', label: 'WORTH' }}
        />

        {/* 4. CUSTOMERS */}
        <MetricCard
          title="CUSTOMERS"
          theme="indigo"
          mainValue={0}
          sub1={{ val: '0', label: 'ELITE (3+)' }}
          sub2={{ val: '363', label: 'RECURRING' }}
          sub3={{ val: '378', label: 'LIFETIME' }}
          onClick={() => onNavigateToTab && onNavigateToTab('customers')}
        />

        {/* 5. AVG. SALE */}
        <MetricCard
          title="AVG. SALE"
          theme="teal"
          mainValue={`৳${avgOrderVal.toLocaleString()}`}
          sub1={{ val: '৳0', label: 'MEDIAN' }}
          sub2={{ val: '৳0', label: 'HIGHEST' }}
          sub3={{ val: totalOrderCount || 1, label: 'ORDERS' }}
        />

        {/* ROW 2 */}
        {/* 6. TRAFFIC */}
        <MetricCard
          title="TRAFFIC"
          theme="cyan"
          mainValue={0}
          sub1={{ val: '0', label: 'DAILY AVG' }}
          sub2={{ val: '42.5%', label: 'BOUNCE' }}
          sub3={{ val: '100.0%', label: 'CONVERSION' }}
        />

        {/* 7. DISCOUNT */}
        <MetricCard
          title="DISCOUNT"
          theme="pink"
          mainValue={0}
          sub1={{ val: '0', label: 'APPLIED' }}
          sub2={{ val: '৳0', label: 'AVG SAVE' }}
          sub3={{ val: '0.0%', label: 'USAGE RATE' }}
        />

        {/* 8. PENDING */}
        <MetricCard
          title="PENDING"
          theme="amber"
          mainValue={pendingOrders.length}
          sub1={{ val: (pendingOrders.length / 30).toFixed(1), label: 'VELOCITY' }}
          sub2={{ val: `৳${pendingOrders.length > 0 ? Math.round(pendingOrders.reduce((s,o)=>s+o.totalAmount,0)/pendingOrders.length) : 0}`, label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onSelectStage && onSelectStage('Pending')}
        />

        {/* 9. FOLLOW-UP */}
        <MetricCard
          title="FOLLOW-UP"
          theme="purple"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* 10. CONFIRMED */}
        <MetricCard
          title="CONFIRMED"
          theme="lime"
          mainValue={confirmedOrders.length}
          sub1={{ val: (confirmedOrders.length / 30).toFixed(1), label: 'VELOCITY' }}
          sub2={{ val: `৳${confirmedOrders.length > 0 ? Math.round(confirmedOrders.reduce((s,o)=>s+o.totalAmount,0)/confirmedOrders.length) : 0}`, label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onSelectStage && onSelectStage('Confirmed')}
        />

        {/* ROW 3 */}
        {/* 11. CANCELED */}
        <MetricCard
          title="CANCELED"
          theme="rose"
          mainValue={canceledOrders.length}
          sub1={{ val: (canceledOrders.length / 30).toFixed(1), label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onSelectStage && onSelectStage('Canceled')}
        />

        {/* 12. READY TO SHIP */}
        <MetricCard
          title="READY TO SHIP"
          theme="violet"
          mainValue={readyOrders.length}
          sub1={{ val: (readyOrders.length / 30).toFixed(1), label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onSelectStage && onSelectStage('Ready to Ship')}
        />

        {/* 13. SHIPPED */}
        <MetricCard
          title="SHIPPED"
          theme="blue"
          mainValue={shippedOrders.length}
          sub1={{ val: (shippedOrders.length / 30).toFixed(1), label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onSelectStage && onSelectStage('Shipped')}
        />

        {/* 14. HOLD */}
        <MetricCard
          title="HOLD"
          theme="orange"
          mainValue={holdOrders.length}
          sub1={{ val: (holdOrders.length / 30).toFixed(1), label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onSelectStage && onSelectStage('Hold')}
        />

        {/* 15. DELIVERED */}
        <MetricCard
          title="DELIVERED"
          theme="emerald"
          mainValue={deliveredOrders.length}
          sub1={{ val: (deliveredOrders.length / 30).toFixed(1), label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onSelectStage && onSelectStage('Delivered')}
        />

        {/* ROW 4 */}
        {/* 16. COMPLETED */}
        <MetricCard
          title="COMPLETED"
          theme="teal"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* 17. RETURNED */}
        <MetricCard
          title="RETURNED"
          theme="fuchsia"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* 18. ABANDONED CARTS */}
        <MetricCard
          title="ABANDONED CARTS"
          theme="yellow"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onNavigateToTab && onNavigateToTab('customers')}
        />

        {/* 19. CART ABANDON (PENDING) */}
        <MetricCard
          title="CART ABANDON (PENDING)"
          theme="amber"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* 20. CART ABANDON (CONVERTED) */}
        <MetricCard
          title="CART ABANDON (CONVERTED)"
          theme="lime"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* ROW 5 */}
        {/* 21. CART ABANDON (CANCELED) */}
        <MetricCard
          title="CART ABANDON (CANCELED)"
          theme="rose"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* 22. COUPONS */}
        <MetricCard
          title="COUPONS"
          theme="purple"
          mainValue={0}
          sub1={{ val: '0', label: 'APPLIED' }}
          sub2={{ val: '৳0', label: 'AVG SAVE' }}
          sub3={{ val: '0.0%', label: 'USAGE RATE' }}
        />

        {/* 23. EXPENSES */}
        <MetricCard
          title="EXPENSES"
          theme="pink"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG SAVE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* 24. NET PROFIT */}
        <MetricCard
          title="NET PROFIT"
          theme="emerald"
          mainValue={0}
          sub1={{ val: '0.0', label: 'VELOCITY' }}
          sub2={{ val: '৳0', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
        />

        {/* 25. ACTIVE LEADS */}
        <MetricCard
          title="ACTIVE LEADS"
          theme="orange"
          mainValue={2}
          hasSparkline={true}
          sub1={{ val: '0.1', label: 'VELOCITY' }}
          sub2={{ val: '৳8500', label: 'AVG VALUE' }}
          sub3={{ val: '100.0%', label: 'SHARE' }}
          onClick={() => onNavigateToTab && onNavigateToTab('customers')}
        />

      </div>
    </div>
  );
};
