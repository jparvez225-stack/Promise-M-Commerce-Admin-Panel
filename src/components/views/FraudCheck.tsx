import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX, 
  Search, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Truck, 
  Activity, 
  HelpCircle, 
  Moon, 
  Sun, 
  Bell, 
  Clock,
  Database,
  Check,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { DateFilter } from '../../types';

interface FraudCheckProps {
  dateFilter?: DateFilter;
  onDateFilterChange?: (filter: DateFilter) => void;
}

interface CourierStats {
  name: string;
  total: number;
  cancelled: number;
  successRate: number;
}

interface ScanResult {
  phone: string;
  totalOrders: number;
  delivered: number;
  returned: number;
  cancelled: number;
  riskScore: number; // percentage 0 - 100
  status: 'SAFE' | 'MODERATE' | 'HIGH_RISK';
  recommendation: string;
  lastOrderInfo: string;
  couriers: CourierStats[];
}

const PRESET_DATABASE: Record<string, ScanResult> = {
  '01762424403': {
    phone: '01762424403',
    totalOrders: 32,
    delivered: 30,
    returned: 1,
    cancelled: 1,
    riskScore: 3,
    status: 'SAFE',
    recommendation: 'This customer is reliable; you can proceed with order confirmation.',
    lastOrderInfo: 'Latest Order: 1 successful delivery in last 2 days (SteadFast Courier)',
    couriers: [
      { name: 'Internal Store Database', total: 4, cancelled: 0, successRate: 100 },
      { name: 'SteadFast Courier', total: 14, cancelled: 1, successRate: 93 },
      { name: 'Pathao Courier', total: 8, cancelled: 0, successRate: 100 },
      { name: 'RedX Logistics', total: 4, cancelled: 0, successRate: 100 },
      { name: 'Paperfly Courier', total: 2, cancelled: 0, successRate: 100 },
    ]
  },
  '01811000000': {
    phone: '01811000000',
    totalOrders: 18,
    delivered: 3,
    returned: 11,
    cancelled: 4,
    riskScore: 83,
    status: 'HIGH_RISK',
    recommendation: 'High Risk Customer! Collect advance delivery charges before processing.',
    lastOrderInfo: 'Latest 3 orders were all returned (High Return Customer)',
    couriers: [
      { name: 'Internal Store Database', total: 2, cancelled: 1, successRate: 50 },
      { name: 'SteadFast Courier', total: 8, cancelled: 5, successRate: 37 },
      { name: 'Pathao Courier', total: 5, cancelled: 4, successRate: 20 },
      { name: 'RedX Logistics', total: 3, cancelled: 2, successRate: 33 },
    ]
  },
  '01912345678': {
    phone: '01912345678',
    totalOrders: 9,
    delivered: 6,
    returned: 2,
    cancelled: 1,
    riskScore: 33,
    status: 'MODERATE',
    recommendation: 'Moderate Risk - Call to verify customer address and order details.',
    lastOrderInfo: 'Latest Order: Received parcel 3 days ago (Pathao)',
    couriers: [
      { name: 'Internal Store Database', total: 1, cancelled: 0, successRate: 100 },
      { name: 'SteadFast Courier', total: 4, cancelled: 1, successRate: 75 },
      { name: 'Pathao Courier', total: 3, cancelled: 1, successRate: 67 },
      { name: 'Paperfly', total: 1, cancelled: 0, successRate: 100 },
    ]
  }
};

const DEFAULT_EMPTY_RESULT: ScanResult = {
  phone: '0',
  totalOrders: 0,
  delivered: 0,
  returned: 0,
  cancelled: 0,
  riskScore: 0,
  status: 'SAFE',
  recommendation: 'This customer is reliable; you can proceed with order confirmation.',
  lastOrderInfo: 'Latest Order: New customer (N/A)',
  couriers: [
    { name: 'Internal Store Database', total: 0, cancelled: 0, successRate: 0 }
  ]
};

export const FraudCheck: React.FC<FraudCheckProps> = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('01762424403');
  const [activeDateTab, setActiveDateTab] = useState<'TODAY' | 'YESTERDAY' | '7D' | '30D' | 'ALL' | 'CUSTOM'>('TODAY');
  const [scanResult, setScanResult] = useState<ScanResult>(PRESET_DATABASE['01762424403']);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const handleRunScan = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsScanning(true);

    setTimeout(() => {
      const cleanPhone = phoneNumber.trim();
      if (PRESET_DATABASE[cleanPhone]) {
        setScanResult(PRESET_DATABASE[cleanPhone]);
      } else if (cleanPhone.length >= 11) {
        // Dynamic generated scan for arbitrary phone numbers
        const lastDigits = parseInt(cleanPhone.slice(-3)) || 50;
        const total = (lastDigits % 15) + 2;
        const returned = Math.floor(total * 0.1);
        const cancelled = Math.floor(total * 0.05);
        const delivered = total - returned - cancelled;
        const risk = Math.round(((returned + cancelled) / total) * 100);

        setScanResult({
          phone: cleanPhone,
          totalOrders: total,
          delivered: delivered,
          returned: returned,
          cancelled: cancelled,
          riskScore: risk,
          status: risk > 50 ? 'HIGH_RISK' : risk > 20 ? 'MODERATE' : 'SAFE',
          recommendation: risk > 50 
            ? 'High Risk Customer! Collect advance delivery charges before processing order.' 
            : 'This customer is reliable; you can proceed with order confirmation.',
          lastOrderInfo: `Order History Summary: ${delivered} of ${total} orders successfully delivered.`,
          couriers: [
            { name: 'Internal Store Database', total: 1, cancelled: 0, successRate: 100 },
            { name: 'SteadFast Courier', total: Math.ceil(total * 0.5), cancelled: cancelled, successRate: 85 },
            { name: 'Pathao Courier', total: Math.floor(total * 0.3), cancelled: 0, successRate: 100 },
            { name: 'RedX Logistics', total: Math.floor(total * 0.2), cancelled: returned, successRate: 70 },
          ]
        });
      } else {
        setScanResult(DEFAULT_EMPTY_RESULT);
      }
      setIsScanning(false);
    }, 400);
  };

  return (
    <div className="space-y-5">
      
      {/* 2. FRAUD INTELLIGENCE HERO SCAN SECTION */}
      <div className="bg-white p-6 rounded border border-[#EEAB59]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Header Title & Subtitle */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-[#FCF1E5] text-[#E67E00] rounded border border-[#EEAB59]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-[#0E0E0E] tracking-tight">
                Fraud Intelligence
              </h1>
            </div>
            <p className="text-xs font-medium text-[#545454] pt-1">
              Check all courier transaction history simultaneously using the customer's phone number.
            </p>

            {/* Quick Test Chips */}
            <div className="flex items-center gap-2 pt-2 text-[11px] font-bold text-[#545454]">
              <span>Quick Test:</span>
              <button
                onClick={() => { setPhoneNumber('01762424403'); setScanResult(PRESET_DATABASE['01762424403']); }}
                className="px-3 py-1 bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F] rounded-full font-mono text-[10px]"
              >
                01762424403 (Safe)
              </button>
              <button
                onClick={() => { setPhoneNumber('01811000000'); setScanResult(PRESET_DATABASE['01811000000']); }}
                className="px-3 py-1 bg-transparent text-[#FF0000] border border-[#FF0000] rounded-full font-mono text-[10px]"
              >
                01811000000 (High Risk)
              </button>
            </div>
          </div>

          {/* Search Bar Form */}
          <form onSubmit={handleRunScan} className="flex items-center shrink-0 border border-[#EEEEEE] focus-within:border-[#008F2F] focus-within:bg-[#ECFFE8] rounded overflow-hidden transition-all bg-white">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="01762424403"
              className="px-4 py-3 font-mono font-bold text-[#0E0E0E] text-base w-56 md:w-64 focus:outline-none tracking-wider bg-transparent"
            />
            <button
              type="submit"
              disabled={isScanning}
              className="px-6 py-3 bg-[#E67E00] hover:bg-[#CC7000] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
            >
              {isScanning ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>SCANNING...</span>
                </>
              ) : (
                <span>RUN SCAN</span>
              )}
            </button>
          </form>

        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        
        {/* LEFT COLUMN: Metric Cards Stack */}
        <div className="space-y-3">
          
          {/* TOTAL ORDERS */}
          <div className="bg-white p-4 rounded border border-[#EEAB59] space-y-1">
            <span className="text-[10px] font-bold text-[#8F8F8F] uppercase tracking-widest block">
              TOTAL ORDERS
            </span>
            <span className="text-3xl font-bold text-[#0E0E0E] block">
              {scanResult.totalOrders}
            </span>
          </div>

          {/* DELIVERED */}
          <div className="bg-white p-4 rounded border border-[#EEAB59] space-y-1">
            <span className="text-[10px] font-bold text-[#8F8F8F] uppercase tracking-widest block">
              DELIVERED
            </span>
            <span className="text-3xl font-bold text-[#008F2F] block">
              {scanResult.delivered}
            </span>
          </div>

          {/* RETURNED */}
          <div className="bg-white p-4 rounded border border-[#EEAB59] space-y-1">
            <span className="text-[10px] font-bold text-[#8F8F8F] uppercase tracking-widest block">
              RETURNED
            </span>
            <span className="text-3xl font-bold text-[#E67E00] block">
              {scanResult.returned}
            </span>
          </div>

          {/* CANCELLED */}
          <div className="bg-white p-4 rounded border border-[#EEAB59] space-y-1">
            <span className="text-[10px] font-bold text-[#8F8F8F] uppercase tracking-widest block">
              CANCELLED
            </span>
            <span className="text-3xl font-bold text-[#FF0000] block">
              {scanResult.cancelled}
            </span>
          </div>

          {/* RISK SCORE */}
          <div className="bg-white p-4 rounded border border-[#EEAB59] space-y-1">
            <span className="text-[10px] font-bold text-[#8F8F8F] uppercase tracking-widest block">
              RISK SCORE
            </span>
            <span className={`text-3xl font-bold block ${
              scanResult.riskScore > 50 
                ? 'text-[#FF0000]' 
                : scanResult.riskScore > 20 
                ? 'text-[#E67E00]' 
                : 'text-[#008F2F]'
            }`}>
              {scanResult.riskScore}%
            </span>
          </div>

        </div>

        {/* RIGHT COLUMN: Courier Breakdown Table */}
        <div className="lg:col-span-3 bg-white rounded border border-[#EEAB59] overflow-hidden flex flex-col justify-between">
          <div>
            {/* Table Header Title */}
            <div className="p-4 border-b border-[#EEEEEE] bg-[#FCF1E5] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#E67E00]" />
                <span>COURIER BREAKDOWN</span>
              </h3>
              <span className="text-[11px] font-semibold text-[#545454]">
                Phone: <span className="font-mono text-[#0E0E0E] font-bold">{scanResult.phone}</span>
              </span>
            </div>

            {/* Courier Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold tracking-wider text-[10px] uppercase">
                    <th className="py-3 px-4">COURIER NAME</th>
                    <th className="py-3 px-4 text-center">TOTAL</th>
                    <th className="py-3 px-4 text-center">CANCELLED</th>
                    <th className="py-3 px-4 text-right">SUCCESS RATE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
                  {scanResult.couriers.map((c, idx) => (
                    <tr key={idx} className="hover:bg-[#FCF1E5]/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#0E0E0E]">
                        {c.name}
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-[#545454]">
                        {c.total}
                      </td>
                      <td className="py-3.5 px-4 text-center font-semibold text-[#FF0000]">
                        {c.cancelled}
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          c.successRate >= 80 
                            ? 'text-[#008F2F] bg-[#ECFFE8]' 
                            : c.successRate >= 50 
                            ? 'text-[#E67E00] bg-[#FCF1E5]' 
                            : 'text-[#FF0000] bg-transparent border border-[#FF0000]'
                        }`}>
                          {c.successRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* 4. BOTTOM RECOMMENDATION BANNER */}
      <div className={`p-5 rounded border flex items-center gap-4 transition-all ${
        scanResult.status === 'HIGH_RISK'
          ? 'bg-white border-[#FF0000] text-[#FF0000]'
          : scanResult.status === 'MODERATE'
          ? 'bg-[#FCF1E5] border-[#EEAB59] text-[#E67E00]'
          : 'bg-[#ECFFE8] border-[#008F2F] text-[#008F2F]'
      }`}>
        <div className={`p-2.5 rounded text-white shrink-0 ${
          scanResult.status === 'HIGH_RISK'
            ? 'bg-[#FF0000]'
            : scanResult.status === 'MODERATE'
            ? 'bg-[#E67E00]'
            : 'bg-[#008F2F]'
        }`}>
          {scanResult.status === 'HIGH_RISK' ? (
            <ShieldX className="w-6 h-6" />
          ) : scanResult.status === 'MODERATE' ? (
            <AlertTriangle className="w-6 h-6" />
          ) : (
            <CheckCircle2 className="w-6 h-6" />
          )}
        </div>

        <div className="space-y-0.5">
          <h3 className="text-base font-bold tracking-tight">
            {scanResult.recommendation}
          </h3>
          <p className="text-xs font-medium text-[#545454]">
            {scanResult.lastOrderInfo}
          </p>
        </div>
      </div>

    </div>
  );
};
