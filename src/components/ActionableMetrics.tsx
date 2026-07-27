import React from 'react';
import { AlertCircle, ShoppingBag, XCircle, ArrowRight, Zap, RefreshCw, Send } from 'lucide-react';
import { Lead } from '../types';

interface ActionableMetricsProps {
  abandonedLeadsCount: number;
  abandonedTotalValue: number;
  canceledOrdersCount: number;
  canceledTotalValue: number;
  onNavigateToLeads: () => void;
  onNavigateToOrders: (status: 'Canceled') => void;
  onQuickRecoverLead: (lead: Lead) => void;
  recentAbandonedLeads: Lead[];
}

export const ActionableMetrics: React.FC<ActionableMetricsProps> = ({
  abandonedLeadsCount,
  abandonedTotalValue,
  canceledOrdersCount,
  canceledTotalValue,
  onNavigateToLeads,
  onNavigateToOrders,
  onQuickRecoverLead,
  recentAbandonedLeads
}) => {
  return (
    <div id="actionable-metrics-section" className="space-y-4">
      {/* Title & Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse shrink-0" />
          <h2 className="text-sm font-black text-neutral-900 tracking-tight">
            Actionable Risk & Recovery
          </h2>
        </div>
        <span className="text-[10px] text-neutral-400 font-extrabold uppercase tracking-wider">
          Priority Action
        </span>
      </div>

      <div className="space-y-4">
        {/* Abandoned Carts Card */}
        <div className="bg-white border border-[#EEAB59] rounded p-4 space-y-3 relative overflow-hidden group">

          {/* Card Top Row */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#FCF1E5] text-[#E67E00] flex items-center justify-center font-bold shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs font-semibold text-[#141414]">
                    Abandoned Checkout Carts
                  </h3>
                  <span className="px-2.5 py-0.5 text-[9px] font-bold bg-[#ECFFE8] text-[#008F2F] rounded-full uppercase tracking-wider">
                    High Intent
                  </span>
                </div>
                <p className="text-[11px] text-[#454545] mt-0.5 leading-tight">
                  Customers who dropped off before completing payment
                </p>
              </div>
            </div>
          </div>

          {/* Metric Box */}
          <div className="flex items-center justify-between bg-white p-3 rounded border border-[#EEEEEE]">
            <div>
              <div className="text-xl font-bold text-[#0E0E0E]">
                {abandonedLeadsCount} Carts
              </div>
              <div className="text-xs font-bold text-[#008F2F]">
                ৳{abandonedTotalValue.toLocaleString('en-US')} recoverable
              </div>
            </div>
            
            <button
              id="view-all-leads-btn"
              onClick={onNavigateToLeads}
              className="px-4 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-semibold text-xs rounded-full transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Recover All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Top Priority Lead Preview */}
          {recentAbandonedLeads.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-[#EEEEEE]">
              <div className="text-[10px] font-bold text-[#8F8F8F] uppercase tracking-wider">
                Top Priority Lead:
              </div>
              {recentAbandonedLeads.slice(0, 1).map((lead) => (
                <div key={lead.id} className="flex items-center justify-between gap-2 bg-white p-2.5 rounded border border-[#EEEEEE] text-xs">
                  <div className="truncate min-w-0">
                    <div className="font-semibold text-[#0E0E0E] truncate">
                      {lead.name} <span className="text-[#8F8F8F] text-[11px] font-normal">({lead.phone})</span>
                    </div>
                    <div className="text-[10px] text-[#454545] truncate mt-0.5">
                      Step: <strong className="text-[#E67E00]">{lead.abandonedStep}</strong> • ৳{lead.cartValue}
                    </div>
                  </div>

                  <button
                    id={`quick-recover-${lead.id}`}
                    onClick={() => onQuickRecoverLead(lead)}
                    className="flex items-center gap-1 px-3 py-1.5 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] font-semibold text-[11px] rounded-full transition-colors shrink-0"
                  >
                    <Send className="w-3 h-3 text-[#E67E00]" />
                    <span>Send Offer</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Canceled Orders Card */}
        <div className="bg-white border border-[#EEAB59] rounded p-4 space-y-3 relative overflow-hidden group">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-slate-100 text-[#FF0000] flex items-center justify-center font-bold shrink-0">
                <XCircle className="w-4 h-4 text-[#FF0000]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-xs font-semibold text-[#141414]">
                    Canceled Order Loss
                  </h3>
                  <span className="px-2.5 py-0.5 text-[9px] font-bold border border-[#FF0000] text-[#FF0000] bg-transparent rounded-full uppercase">
                    Rate: 1.2%
                  </span>
                </div>
                <p className="text-[11px] text-[#454545] mt-0.5 leading-tight">
                  Pre-dispatch cancellations or delivery refusal
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-white p-3 rounded border border-[#EEEEEE]">
            <div>
              <div className="text-xl font-bold text-[#0E0E0E]">
                {canceledOrdersCount} Orders
              </div>
              <div className="text-xs font-bold text-[#FF0000]">
                ৳{canceledTotalValue.toLocaleString('en-US')} lost
              </div>
            </div>

            <button
              id="view-canceled-orders-btn"
              onClick={() => onNavigateToOrders('Canceled')}
              className="px-4 py-1.5 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] font-semibold text-xs rounded-full transition-colors flex items-center gap-1 shrink-0"
            >
              <span>View Log</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="pt-2 border-t border-[#EEEEEE] flex items-center gap-1.5 text-[11px] text-[#545454]">
            <AlertCircle className="w-3.5 h-3.5 text-[#E67E00] shrink-0" />
            <span className="truncate">Primary Reason: Customer changed mind on call</span>
          </div>
        </div>
      </div>
    </div>
  );
};
