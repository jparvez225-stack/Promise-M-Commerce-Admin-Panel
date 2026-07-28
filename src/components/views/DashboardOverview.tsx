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
  accentBar: string;
  dot: string;
  sparklineColor: string;
}> = {
  blue: { accentBar: 'bg-blue-500', dot: 'bg-blue-500', sparklineColor: 'text-blue-500' },
  emerald: { accentBar: 'bg-emerald-500', dot: 'bg-emerald-500', sparklineColor: 'text-emerald-500' },
  amber: { accentBar: 'bg-amber-500', dot: 'bg-amber-500', sparklineColor: 'text-amber-500' },
  purple: { accentBar: 'bg-purple-500', dot: 'bg-purple-500', sparklineColor: 'text-purple-500' },
  rose: { accentBar: 'bg-rose-500', dot: 'bg-rose-500', sparklineColor: 'text-rose-500' },
  cyan: { accentBar: 'bg-cyan-500', dot: 'bg-cyan-500', sparklineColor: 'text-cyan-500' },
  indigo: { accentBar: 'bg-indigo-500', dot: 'bg-indigo-500', sparklineColor: 'text-indigo-500' },
  teal: { accentBar: 'bg-teal-500', dot: 'bg-teal-500', sparklineColor: 'text-teal-500' },
  violet: { accentBar: 'bg-violet-500', dot: 'bg-violet-500', sparklineColor: 'text-violet-500' },
  fuchsia: { accentBar: 'bg-fuchsia-500', dot: 'bg-fuchsia-500', sparklineColor: 'text-fuchsia-500' },
  sky: { accentBar: 'bg-sky-500', dot: 'bg-sky-500', sparklineColor: 'text-sky-500' },
  orange: { accentBar: 'bg-orange-500', dot: 'bg-orange-500', sparklineColor: 'text-orange-500' },
  lime: { accentBar: 'bg-lime-500', dot: 'bg-lime-500', sparklineColor: 'text-lime-500' },
  pink: { accentBar: 'bg-pink-500', dot: 'bg-pink-500', sparklineColor: 'text-pink-500' },
  yellow: { accentBar: 'bg-yellow-500', dot: 'bg-yellow-500', sparklineColor: 'text-yellow-500' },
};

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  mainValue,
  sub1,
  sub2,
  sub3,
  onClick
}) => {
  return (
    <div 
      onClick={onClick}
      className={`aspect-square bg-white border-r border-b border-amber-500/50 p-3 sm:p-4 transition-all duration-200 flex flex-col justify-between relative group ${
        onClick ? 'cursor-pointer hover:bg-amber-50/40' : ''
      }`}
    >
      {/* Title */}
      <div>
        <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1 truncate">
          {title}
        </span>

        {/* Main Metric Value */}
        <div className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight my-1 truncate">
          {mainValue}
        </div>
      </div>

      {/* Submetrics Row */}
      <div className="mt-2 pt-2 border-t border-slate-100 grid grid-cols-3 gap-1">
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-none truncate w-full">
            {sub1.val}
          </span>
          <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 truncate w-full mt-1">
            {sub1.label}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-none truncate w-full">
            {sub2.val}
          </span>
          <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 truncate w-full mt-1">
            {sub2.label}
          </span>
        </div>
        <div className="flex flex-col items-start min-w-0">
          <span className="text-[10px] sm:text-[11px] font-black text-slate-900 leading-none truncate w-full">
            {sub3.val}
          </span>
          <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400 truncate w-full mt-1">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 border border-amber-500/80 rounded-2xl overflow-hidden bg-white shadow-xs">
        
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
