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

const themeStyles: Record<string, { stroke: string; dot: string }> = {
  blue: { stroke: '#2563eb', dot: 'bg-blue-500' },
  emerald: { stroke: '#059669', dot: 'bg-emerald-500' },
  amber: { stroke: '#d97706', dot: 'bg-amber-500' },
  purple: { stroke: '#9333ea', dot: 'bg-purple-500' },
  rose: { stroke: '#e11d48', dot: 'bg-rose-500' },
  cyan: { stroke: '#0891b2', dot: 'bg-cyan-500' },
  indigo: { stroke: '#4f46e5', dot: 'bg-indigo-500' },
  teal: { stroke: '#0d9488', dot: 'bg-teal-500' },
  violet: { stroke: '#7c3aed', dot: 'bg-violet-500' },
  fuchsia: { stroke: '#c026d3', dot: 'bg-fuchsia-500' },
  sky: { stroke: '#0284c7', dot: 'bg-sky-500' },
  orange: { stroke: '#ea580c', dot: 'bg-orange-500' },
  lime: { stroke: '#65a30d', dot: 'bg-lime-500' },
  pink: { stroke: '#db2777', dot: 'bg-pink-500' },
  yellow: { stroke: '#ca8a04', dot: 'bg-yellow-500' },
};

const getSparklineData = (title: string) => {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const rawPoints: number[] = [];
  const numPoints = 8;
  for (let i = 0; i < numPoints; i++) {
    const val = 12 + Math.sin(hash + i * 1.1) * 8 + Math.cos(hash * 0.3 + i * 1.6) * 4;
    rawPoints.push(Math.max(4, Math.min(28, val)));
  }

  const coords = rawPoints.map((val, idx) => {
    const x = (idx / (numPoints - 1)) * 100;
    const y = 30 - val;
    return { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
  });

  const pathD = coords.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = coords[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1},${cy1} ${cx2},${cy2} ${pt.x},${pt.y}`;
  }, '');

  const lastPt = coords[coords.length - 1];
  const areaD = `${pathD} L 100,32 L 0,32 Z`;

  return { pathD, areaD, lastPt };
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  theme = 'amber',
  mainValue,
  sub1,
  sub2,
  sub3,
  onClick
}) => {
  const style = themeStyles[theme] || themeStyles.amber;
  const { pathD, areaD, lastPt } = getSparklineData(title);
  const gradId = `spark-grad-${title.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <div 
      onClick={onClick}
      className={`h-full bg-white border-r border-b border-amber-500/50 p-1.5 sm:p-2 lg:p-2.5 transition-all duration-200 flex flex-col justify-between relative group overflow-hidden ${
        onClick ? 'cursor-pointer hover:bg-amber-50/40' : ''
      }`}
    >
      {/* Top Header: Title + Top-Right LIVE Tag */}
      <div className="flex items-center justify-between gap-1">
        <span className="text-[9px] sm:text-[10px] xl:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block truncate max-w-[70%]">
          {title}
        </span>
        <span className="inline-flex items-center gap-1 px-1 py-0.5 rounded-full text-[7px] sm:text-[8px] font-black bg-red-50 text-red-600 border border-red-200/80 shrink-0 shadow-2xs">
          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span>
          LIVE
        </span>
      </div>

      {/* Middle Row: Main Metric Value (Left) + Line Graph (Right) */}
      <div className="flex items-center justify-between gap-1 flex-1 my-0.5 min-h-0">
        <div className="text-base sm:text-lg lg:text-xl xl:text-2xl font-black text-slate-900 tracking-tight truncate">
          {mainValue}
        </div>
        <div className="w-1/2 h-full max-h-[36px] flex items-center justify-end ml-auto pointer-events-none shrink-0">
          <svg viewBox="0 0 100 32" className="w-full h-full overflow-visible" preserveAspectRatio="none">
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={style.stroke} stopOpacity="0.3" />
                <stop offset="100%" stopColor={style.stroke} stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d={areaD}
              fill={`url(#${gradId})`}
            />
            <path
              d={pathD}
              fill="none"
              stroke={style.stroke}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle
              cx={lastPt.x}
              cy={lastPt.y}
              r="2.5"
              fill={style.stroke}
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Submetrics Row */}
      <div className="pt-1 border-t border-slate-100 grid grid-cols-3 gap-0.5 shrink-0">
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[9px] sm:text-[10px] font-black text-slate-900 leading-none truncate w-full">
            {sub1.val}
          </span>
          <span className="text-[7px] sm:text-[8px] font-extrabold uppercase tracking-wider text-slate-400 truncate w-full mt-0.5">
            {sub1.label}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[9px] sm:text-[10px] font-black text-slate-900 leading-none truncate w-full">
            {sub2.val}
          </span>
          <span className="text-[7px] sm:text-[8px] font-extrabold uppercase tracking-wider text-slate-400 truncate w-full mt-0.5">
            {sub2.label}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[9px] sm:text-[10px] font-black text-slate-900 leading-none truncate w-full">
            {sub3.val}
          </span>
          <span className="text-[7px] sm:text-[8px] font-extrabold uppercase tracking-wider text-slate-400 truncate w-full mt-0.5">
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
    <div className="w-full h-full font-sans flex flex-col overflow-hidden">
      {/* EXACT 5x5 METRIC CARDS GRID FITTING 1 SCREEN */}
      <div className="grid grid-cols-5 grid-rows-5 h-full w-full border border-amber-500/80 rounded-xl overflow-hidden bg-white shadow-xs">
        
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
