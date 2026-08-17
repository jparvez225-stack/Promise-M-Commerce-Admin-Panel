import React from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

interface KPICardProps {
  id: string;
  title: string;
  value: string | number;
  subValue?: string;
  change: string;
  isPositive: boolean;
  timeframe?: string;
  icon: React.ReactNode;
  badgeText?: string;
  onClick?: () => void;
}

export const KPICard: React.FC<KPICardProps> = ({
  id,
  title,
  value,
  subValue,
  change,
  isPositive,
  timeframe = 'vs last 30d',
  icon,
  badgeText,
  onClick
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`group relative bg-white border border-[#E2D9D2] rounded p-4 sm:p-5 transition-all duration-200 cursor-pointer overflow-hidden ${
        badgeText ? 'border-[#B8623B]' : ''
      }`}
    >
      <div className="flex items-start justify-between mb-3 gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-10 h-10 rounded bg-[#F7F4F1] text-[#B8623B] flex items-center justify-center transition-colors duration-200 shrink-0">
            {icon}
          </div>
          <div className="truncate">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#141414] truncate">
              {title}
            </h3>
            {badgeText && (
              <span className="inline-block mt-0.5 px-2.5 py-0.5 text-[9px] font-bold tracking-wide uppercase bg-[#ECFFE8] text-[#008F2F] rounded-full truncate">
                {badgeText}
              </span>
            )}
          </div>
        </div>

        <button 
          aria-label="View metric details"
          className="text-[#8F8F8F] hover:text-[#B8623B] transition-colors p-1 rounded hover:bg-[#F7F4F1] shrink-0"
        >
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-baseline justify-between gap-1 flex-wrap">
          <span className="text-xl sm:text-2xl font-bold text-[#0E0E0E] tracking-tight truncate">
            {value}
          </span>
          {subValue && (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#545454] shrink-0">
              {subValue}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-[#EEEEEE] text-[11px]">
          <span
            className={`inline-flex items-center gap-0.5 font-bold px-2 py-0.5 rounded-full text-[10px] ${
              isPositive
                ? 'bg-[#ECFFE8] text-[#008F2F]'
                : 'border border-[#FF0000] text-[#FF0000] bg-transparent'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {change}
          </span>
          <span className="text-[10px] text-[#8F8F8F] font-medium truncate">
            {timeframe}
          </span>
        </div>
      </div>
    </div>
  );
};
