import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { Package, ArrowRight, Filter, ChevronRight } from 'lucide-react';
import { OrderStatus } from '../types';

interface PipelineStageData {
  stage: OrderStatus;
  count: number;
  revenue: number;
  color: string;
}

interface OrderPipelineChartProps {
  pipelineData: PipelineStageData[];
  onSelectStage: (stage: OrderStatus) => void;
  selectedStage?: OrderStatus | null;
}

export const OrderPipelineChart: React.FC<OrderPipelineChartProps> = ({
  pipelineData,
  onSelectStage,
  selectedStage
}) => {
  const [viewMode, setViewMode] = useState<'count' | 'revenue'>('count');

  const totalOrdersInPipeline = pipelineData.reduce((acc, item) => acc + item.count, 0);
  const totalPipelineRevenue = pipelineData.reduce((acc, item) => acc + item.revenue, 0);

  // Custom colors: Aura Pro Orange accent for active/pending/processing, Dark for completed/shipped, Red for canceled
  const getStageColor = (stage: OrderStatus) => {
    if (selectedStage && selectedStage === stage) return '#B8623B'; // Aura Pro Orange
    switch (stage) {
      case 'Pending':
        return '#B8623B'; // Aura Pro Primary
      case 'Processing':
        return '#E2D9D2'; // Accent
      case 'Shipped':
        return '#545454'; 
      case 'Delivered':
        return '#0E0E0E'; 
      case 'Canceled':
        return '#FF0000'; // Alert Red
      default:
        return '#141414';
    }
  };

  return (
    <div id="order-pipeline-visualization" className="bg-white border border-[#E2D9D2] rounded p-6">
      {/* Chart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#F7F4F1] text-[#B8623B] flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-[#0E0E0E] tracking-tight">
              Order Pipeline & Funnel
            </h2>
          </div>
          <p className="text-xs text-[#545454] mt-1">
            Real-time visual distribution of orders from initial placement to delivery
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex p-1 bg-[#F7F4F1] rounded-full text-xs font-semibold">
            <button
              id="view-mode-count"
              onClick={() => setViewMode('count')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                viewMode === 'count'
                  ? 'bg-[#B8623B] text-white font-bold'
                  : 'text-[#545454] hover:text-[#0E0E0E]'
              }`}
            >
              Order Count ({totalOrdersInPipeline})
            </button>
            <button
              id="view-mode-revenue"
              onClick={() => setViewMode('revenue')}
              className={`px-3 py-1.5 rounded-full transition-all ${
                viewMode === 'revenue'
                  ? 'bg-[#B8623B] text-white font-bold'
                  : 'text-[#545454] hover:text-[#0E0E0E]'
              }`}
            >
              Revenue (৳{(totalPipelineRevenue / 1000).toFixed(0)}k)
            </button>
          </div>
        </div>
      </div>

      {/* Funnel Stage Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {pipelineData.map((item) => {
          const isSelected = selectedStage === item.stage;
          const percentage = ((item.count / totalOrdersInPipeline) * 100).toFixed(1);

          return (
            <button
              key={item.stage}
              id={`pipeline-stage-card-${item.stage.toLowerCase()}`}
              onClick={() => onSelectStage(item.stage)}
              className={`flex flex-col text-left p-3.5 rounded border transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'border-[#B8623B] bg-[#F7F4F1]'
                  : 'border-[#EEEEEE] bg-white hover:border-[#E2D9D2]'
              }`}
            >
              <div
                className="absolute top-0 left-0 bottom-0 w-1.5"
                style={{ backgroundColor: getStageColor(item.stage) }}
              />
              <div className="flex items-center justify-between w-full pl-2">
                <span className="text-xs font-bold text-[#141414] uppercase tracking-wider">
                  {item.stage}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ECFFE8] text-[#008F2F]">
                  {percentage}%
                </span>
              </div>
              <div className="pl-2 mt-2">
                <div className="text-xl font-bold text-[#0E0E0E]">
                  {viewMode === 'count' ? item.count : `৳${(item.revenue / 1000).toFixed(0)}k`}
                </div>
                <div className="text-[11px] text-[#545454] mt-0.5">
                  {viewMode === 'count' ? `৳${item.revenue.toLocaleString('en-US')} total` : `${item.count} orders`}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Bar Visualizer */}
      <div className="h-64 w-full pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pipelineData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
            <XAxis
              dataKey="stage"
              axisLine={{ stroke: '#EEEEEE' }}
              tickLine={false}
              tick={{ fill: '#545454', fontSize: 12, fontWeight: 600 }}
            />
            <YAxis
              axisLine={{ stroke: '#EEEEEE' }}
              tickLine={false}
              tick={{ fill: '#545454', fontSize: 11 }}
              tickFormatter={(value) =>
                viewMode === 'count' ? `${value}` : `৳${(value / 1000).toFixed(0)}k`
              }
            />
            <Tooltip
              cursor={{ fill: 'rgba(230, 126, 0, 0.05)' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as PipelineStageData;
                  return (
                    <div className="bg-[#0E0E0E] text-white p-3 rounded text-xs space-y-1 border border-[#545454]">
                      <div className="font-bold text-[#E2D9D2] uppercase tracking-wide flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#B8623B]" />
                        {data.stage} Status
                      </div>
                      <div className="text-white font-medium">
                        Orders: <span className="font-bold text-[#F7F4F1]">{data.count}</span>
                      </div>
                      <div className="text-white font-medium">
                        Revenue: <span className="font-bold text-[#F7F4F1]">৳{data.revenue.toLocaleString()}</span>
                      </div>
                      <div className="text-[#8F8F8F] text-[10px] pt-1 border-t border-[#545454]">
                        Click bar to filter order records
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              dataKey={viewMode === 'count' ? 'count' : 'revenue'}
              radius={[4, 4, 0, 0]}
              onClick={(data: any) => {
                if (data && data.stage) {
                  onSelectStage(data.stage as OrderStatus);
                }
              }}
              className="cursor-pointer"
            >
              {pipelineData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getStageColor(entry.stage)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Flow Indicators */}
      <div className="mt-4 pt-4 border-t border-[#EEEEEE] flex flex-wrap items-center justify-between text-xs text-[#545454]">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#8F8F8F]" />
          <span>Fulfillment Velocity: <strong className="text-[#0E0E0E] font-semibold">91.4% success rate</strong></span>
        </div>
        <div className="flex items-center gap-1 text-[#B8623B] font-semibold hover:underline cursor-pointer" onClick={() => onSelectStage('Pending')}>
          <span>View Pending Orders ({pipelineData.find(p => p.stage === 'Pending')?.count})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};
