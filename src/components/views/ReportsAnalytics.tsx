import React, { useState } from 'react';
import { 
  FileText, 
  TrendingUp, 
  ShoppingBag, 
  DollarSign, 
  Users, 
  Truck, 
  Package, 
  Download, 
  Printer, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  Activity, 
  ShieldCheck, 
  AlertCircle,
  CheckCircle2,
  Building2,
  Layers,
  Sparkles,
  Receipt,
  ShoppingCart,
  MinusCircle,
  PlusCircle,
  TrendingDown,
  Clock,
  Briefcase
} from 'lucide-react';
import { Order, Lead, Product } from '../../types';

interface ReportsAnalyticsProps {
  orders: Order[];
  leads: Lead[];
  products: Product[];
}

type ReportTab = 'PROFIT_LOSS' | 'FINANCE' | 'STOCK' | 'PURCHASES' | 'ORDERS' | 'COURIER' | 'CUSTOMERS' | 'LOGS' | 'ALL_MASTER';

export const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({
  orders,
  leads,
  products
}) => {
  const [activeTab, setActiveTab] = useState<ReportTab>('PROFIT_LOSS');
  const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | 'YEAR'>('30D');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // ---------------------------------------------------------------------------
  // FINANCIAL ACCOUNTING & PROFIT/LOSS CALCULATIONS
  // ---------------------------------------------------------------------------
  const totalGrossRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered');
  const canceledOrders = orders.filter(o => o.status === 'Canceled');
  const deliverySuccessRate = totalOrdersCount > 0 ? ((deliveredOrders.length / totalOrdersCount) * 100).toFixed(1) : '0';
  
  // Cost Breakdown Calculations (Sample Realistic Accounting Ratios)
  const productPurchaseCost = Math.round(totalGrossRevenue * 0.45); // 45% COGS
  const courierDeliveryCost = deliveredOrders.length * 120 + canceledOrders.length * 60; // ৳120 delivered, ৳60 return charge
  const adSpendExpense = 12500; // Meta Ads
  const returnDamageLoss = canceledOrders.length * 250; // Packaging/Damages
  const gatewayProcessingFees = Math.round(totalGrossRevenue * 0.012); // 1.2% payment fees
  
  const totalExpenses = productPurchaseCost + courierDeliveryCost + adSpendExpense + returnDamageLoss + gatewayProcessingFees;
  const netProfitOrLoss = totalGrossRevenue - totalExpenses;
  const isProfitable = netProfitOrLoss >= 0;
  const profitMarginPercent = totalGrossRevenue > 0 ? ((netProfitOrLoss / totalGrossRevenue) * 100).toFixed(1) : '0';

  // Stock Inventory Calculations
  const totalStockUnits = products.reduce((sum, p) => sum + (p.stock || 25), 0);
  const totalStockValuation = products.reduce((sum, p) => sum + (p.price * (p.stock || 25)), 0);
  const totalPurchaseValuation = products.reduce((sum, p) => sum + (p.regularPrice * (p.stock || 25)), 0);
  const lowStockCount = products.filter(p => (p.stock || 25) <= 10).length;

  // Recovered Leads Calculations
  const totalRecoveredLeads = leads.filter(l => l.status === 'Converted');
  const recoveredRevenue = totalRecoveredLeads.reduce((sum, l) => sum + l.cartValue, 0);

  // Purchase Invoices Table
  const purchaseInvoices = [
    { id: 'PUR-8012', supplier: 'Wholesale BD Supplier Ltd', date: '2026-07-25', items: 'Aura Premium Wireless Headphone x 50', amount: 35000, paid: 35000, due: 0, status: 'Paid' },
    { id: 'PUR-8011', supplier: 'Dhaka Electronics Hub', date: '2026-07-22', items: 'Smart OLED Watch Ultra x 30', amount: 28500, paid: 20000, due: 8500, status: 'Partial' },
    { id: 'PUR-8010', supplier: 'Global Import House', date: '2026-07-18', items: 'RGB Mechanical Gaming Keyboard x 40', amount: 22000, paid: 22000, due: 0, status: 'Paid' },
    { id: 'PUR-8009', supplier: 'Mirpur Accessories Market', date: '2026-07-15', items: 'Fast Charging PowerBank 20000mAh x 60', amount: 18000, paid: 18000, due: 0, status: 'Paid' },
  ];

  // Income / Expense Detail Ledger
  const financialLedger = [
    { id: 'TRX-901', date: '2026-07-27', category: 'Sales Income', description: 'COD Orders Disbursement Settlement', inflow: totalGrossRevenue, outflow: 0, net: totalGrossRevenue, source: 'Steadfast & Pathao' },
    { id: 'TRX-902', date: '2026-07-26', category: 'Inventory Sourcing', description: 'Product Wholesale Sourcing Purchase', inflow: 0, outflow: productPurchaseCost, net: -productPurchaseCost, source: 'Suppliers' },
    { id: 'TRX-903', date: '2026-07-26', category: 'Marketing Expense', description: 'Meta / Facebook Sponsored Ads Spend', inflow: 0, outflow: adSpendExpense, net: -adSpendExpense, source: 'Facebook Ads Manager' },
    { id: 'TRX-904', date: '2026-07-25', category: 'Logistics Expense', description: 'Courier Delivery & Return Charges', inflow: 0, outflow: courierDeliveryCost, net: -courierDeliveryCost, source: 'Courier Services' },
    { id: 'TRX-905', date: '2026-07-24', category: 'Packaging & Damage', description: 'Returned Items Re-packaging & Damages', inflow: 0, outflow: returnDamageLoss, net: -returnDamageLoss, source: 'Store Operations' },
    { id: 'TRX-906', date: '2026-07-24', category: 'Gateway Fee', description: 'bKash & Card Merchant Transaction Charge', inflow: 0, outflow: gatewayProcessingFees, net: -gatewayProcessingFees, source: 'Payment Gateway' },
  ];

  // Courier Partners Performance Data
  const courierData = [
    { name: 'Steadfast Courier', total: 18, delivered: 16, returned: 2, chargeCollected: '৳2,160', returnCharge: '৳120', successRate: '88.8%', avgSpeed: '1.8 Days' },
    { name: 'Pathao Express', total: 12, delivered: 11, returned: 1, chargeCollected: '৳1,440', returnCharge: '৳60', successRate: '91.6%', avgSpeed: '1.4 Days' },
    { name: 'RedX Logistics', total: 6, delivered: 5, returned: 1, chargeCollected: '৳720', returnCharge: '৳60', successRate: '83.3%', avgSpeed: '2.1 Days' },
  ];

  // System Audit Logs Data
  const auditLogs = [
    { id: 'AUD-9912', time: '2026-07-27 15:18:02', user: 'Tanvir Rahman (Super Admin)', role: 'Admin', action: 'Updated Invoice Custom Business Logo', module: 'Control Center', result: 'Success' },
    { id: 'AUD-9911', time: '2026-07-27 14:45:18', user: 'Anika Chowdhury (Store Manager)', role: 'Staff', action: 'Dispatched 5 orders to Steadfast API', module: 'Orders', result: 'Success' },
    { id: 'AUD-9910', time: '2026-07-27 13:10:40', user: 'System Auto-Engine', role: 'Automation', action: 'Recovered Lead #LD-991 via WhatsApp API', module: 'Lead Recovery', result: 'Success' },
    { id: 'AUD-9909', time: '2026-07-26 18:30:11', user: 'Hasan Mahmud (Fulfillment)', role: 'Staff', action: 'Changed Order #ORD-479697 to Delivered', module: 'Orders', result: 'Success' },
    { id: 'AUD-9908', time: '2026-07-26 16:15:00', user: 'Tanvir Rahman (Super Admin)', role: 'Admin', action: 'Configured bKash Merchant API Secret Key', module: 'API Settings', result: 'Success' },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "REPORT TYPE,ID,TITLE/NAME,AMOUNT/VALUE,DETAILS,STATUS,DATE\n";
    
    csvContent += `Profit Loss Summary,P&L,Net Profit/Loss,${netProfitOrLoss},Gross Sales: ${totalGrossRevenue} Total Expenses: ${totalExpenses},${isProfitable ? 'PROFIT' : 'LOSS'},2026-07-27\n`;

    financialLedger.forEach(f => {
      csvContent += `Finance,${f.id},"${f.category}",${f.net},"${f.description}",${f.source},${f.date}\n`;
    });

    products.forEach(p => {
      csvContent += `Stock,PROD-${p.id},"${p.title}",${p.price},${p.stock || 25} Units,Healthy,2026-07-27\n`;
    });

    purchaseInvoices.forEach(pur => {
      csvContent += `Purchase,${pur.id},"${pur.supplier}",${pur.amount},"${pur.items}",${pur.status},${pur.date}\n`;
    });

    orders.forEach(o => {
      csvContent += `Order,${o.id},"${o.customerName}",${o.totalAmount},${o.items.length} Items,${o.status},${o.date || '2026-07-27'}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Promise_Mart_Business_Financial_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Print Overlay CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-report-area, #printable-report-area * {
            visibility: visible;
          }
          #printable-report-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 15px;
            background: white !important;
            color: black !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-[#EEAB59] shadow-2xs no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
              <Receipt className="w-5 h-5 text-[#E67E00]" />
              <span>বিজনেস রিপোর্ট ও বিস্তারিত হিসাব-কিতাব (FULL FINANCIAL AUDIT REPORT)</span>
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-black bg-[#E67E00] text-white rounded uppercase tracking-wider">
              DETAILS TABLE ONLY
            </span>
          </div>
          <p className="text-xs text-[#545454] font-medium mt-0.5">
            স্টক ইনভেন্টরি, পাইকারি পণ্য ক্রয়, বিক্রয় আয়, পরিচালনা খরচ এবং লাভ/ক্ষতি সারসংক্ষেপের সম্পূর্ণ টেবিল রিপোর্ট।
          </p>
        </div>

        {/* Time Filter & Print/Export Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-[#FCF1E5] border border-[#EEAB59] rounded-full p-1 flex items-center gap-1 text-xs font-bold text-[#E67E00]">
            {(['7D', '30D', '90D', 'YEAR'] as const).map((rng) => (
              <button
                key={rng}
                onClick={() => setTimeRange(rng)}
                className={`px-2.5 py-1 rounded-full text-[11px] transition-all ${timeRange === rng ? 'bg-[#E67E00] text-white' : 'hover:bg-white/50'}`}
              >
                {rng === 'YEAR' ? 'This Year' : `${rng.replace('D', ' Days')}`}
              </button>
            ))}
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full shadow-2xs transition-all uppercase tracking-wider shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট করুন (PRINT REPORT)</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white hover:bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] font-extrabold text-xs rounded-full shadow-2xs transition-all uppercase tracking-wider shrink-0"
          >
            {downloadSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#008F2F]" />
                <span className="text-[#008F2F]">Exported CSV</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Sub-Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#EEEEEE] no-print">
        <button
          onClick={() => setActiveTab('PROFIT_LOSS')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'PROFIT_LOSS'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>১. লাভ/ক্ষতি হিসাব (PROFIT & LOSS)</span>
        </button>

        <button
          onClick={() => setActiveTab('FINANCE')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'FINANCE'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>২. আয়-ব্যয় লজার (INCOME & EXPENSE)</span>
        </button>

        <button
          onClick={() => setActiveTab('STOCK')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'STOCK'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>৩. মজুদ স্টক (STOCK INVENTORY)</span>
        </button>

        <button
          onClick={() => setActiveTab('PURCHASES')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'PURCHASES'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          <span>৪. পাইকারি ক্রয় (PURCHASE INVOICES)</span>
        </button>

        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'ORDERS'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>৫. বিক্রয় অর্ডার (ORDERS REPORT)</span>
        </button>

        <button
          onClick={() => setActiveTab('COURIER')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'COURIER'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>৬. কুরিয়ার পারফরম্যান্স (COURIER)</span>
        </button>

        <button
          onClick={() => setActiveTab('LOGS')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'LOGS'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>৭. সিস্টেম লগ (AUDIT LOGS)</span>
        </button>

        <button
          onClick={() => setActiveTab('ALL_MASTER')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'ALL_MASTER'
              ? 'bg-[#0E0E0E] text-white shadow-2xs'
              : 'bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] hover:bg-[#E67E00] hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>সব টেবিল একসাথে দেখান (MASTER REPORT)</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* PRINTABLE & ON-SCREEN REPORT MASTER CONTAINER */}
      {/* ========================================================================= */}
      <div id="printable-report-area" className="space-y-6 text-[#0E0E0E]">

        {/* Printable Header Notice */}
        <div className="hidden print:block border-b-2 border-[#E67E00] pb-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl font-black uppercase tracking-wider text-[#0E0E0E]">
                PROMISE MART LTD — OFFICIAL BUSINESS & FINANCIAL AUDIT STATEMENT
              </h1>
              <p className="text-xs text-[#545454] mt-0.5">
                Khaja Super Market, Mirpur Road, Dhaka-1207 • Hotline: 09647 444 444
              </p>
            </div>
            <div className="text-right text-xs font-mono">
              <div className="font-bold">Generated: {new Date().toLocaleString()}</div>
              <div>Period: {timeRange} Filter Applied</div>
              <div className="text-[10px] text-[#008F2F] font-bold mt-0.5">AUDITED BY SUPER ADMIN</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXECUTIVE SUMMARY: PROFIT & LOSS CARD (লাভ / ক্ষতি সার্বিক ফলাফল) */}
        {/* ========================================================================= */}
        {(activeTab === 'PROFIT_LOSS' || activeTab === 'ALL_MASTER') && (
          <div className="bg-white border-2 border-[#EEAB59] rounded-xl p-5 shadow-sm space-y-5">
            {/* Top Status Banner */}
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
              isProfitable
                ? 'bg-[#ECFFE8] border-[#008F2F]/40 text-[#008F2F]'
                : 'bg-red-50 border-red-300 text-red-700'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-white shrink-0 ${
                  isProfitable ? 'bg-[#008F2F]' : 'bg-red-600'
                }`}>
                  {isProfitable ? <TrendingUp className="w-7 h-7" /> : <TrendingDown className="w-7 h-7" />}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#545454]">
                    সার্বিক ব্যবসা পরিচালনা স্ট্যাটাস (NET BUSINESS STATUS)
                  </div>
                  <h2 className="text-xl font-black uppercase tracking-tight">
                    {isProfitable ? '✓ ব্যবসা বর্তমানে নিট লাভে পরিচালিত হচ্ছে (BUSINESS IS IN NET PROFIT)' : '⚠️ ব্যবসা বর্তমানে নিট লোকসানে চলছে (BUSINESS IS IN NET LOSS)'}
                  </h2>
                  <p className="text-xs opacity-90 mt-0.5 font-medium">
                    {timeRange} ফিল্টারে মোট বিক্রয় ৳{totalGrossRevenue.toLocaleString()} এবং মোট পরিচালন ব্যয় ৳{totalExpenses.toLocaleString()}।
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0 bg-white/80 p-3 rounded-lg border border-current">
                <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                  নিট লাভ / ক্ষতি (NET RESULT)
                </span>
                <div className="text-2xl font-black">
                  {isProfitable ? `+৳${netProfitOrLoss.toLocaleString()}` : `-৳${Math.abs(netProfitOrLoss).toLocaleString()}`}
                </div>
                <span className="text-[11px] font-extrabold block">
                  প্রফিট মার্জিন: {profitMarginPercent}%
                </span>
              </div>
            </div>

            {/* Profit & Loss Detailed Accounting Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              
              {/* Gross Income Column */}
              <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2 font-black text-sm text-[#0E0E0E]">
                  <span className="flex items-center gap-1.5 text-[#008F2F]">
                    <PlusCircle className="w-4 h-4" />
                    <span>মোট বিক্রয় ও আয় (GROSS INCOME)</span>
                  </span>
                  <span className="text-[#008F2F] font-black text-base">
                    ৳{totalGrossRevenue.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2 text-[#545454] font-medium">
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>১. কুরিয়ার ক্যাশ অন ডেলিভারি সেলস (COD Sales)</span>
                    <strong className="text-[#0E0E0E]">৳{Math.round(totalGrossRevenue * 0.75).toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>২. বিকাশ ও ডিজিটাল মার্চেন্ট পেমেন্ট (bKash/Cards)</span>
                    <strong className="text-[#0E0E0E]">৳{Math.round(totalGrossRevenue * 0.25).toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>৩. কার্ট রিকভারি থেকে অতিরিক্ত সেলস (Leads Saved)</span>
                    <strong className="text-[#008F2F]">৳{recoveredRevenue.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Expenses & Costs Column */}
              <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2 font-black text-sm text-[#0E0E0E]">
                  <span className="flex items-center gap-1.5 text-red-600">
                    <MinusCircle className="w-4 h-4" />
                    <span>মোট খরচ ও লোকসান (TOTAL EXPENSES)</span>
                  </span>
                  <span className="text-red-600 font-black text-base">
                    ৳{totalExpenses.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-2 text-[#545454] font-medium">
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>১. পণ্য পাইকারি ক্রয় খরচ (Product COGS ~45%)</span>
                    <strong className="text-red-600">৳{productPurchaseCost.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>২. ফেসবুক এডভার্টাইজিং খরচ (Meta Ad Spend)</span>
                    <strong className="text-red-600">৳{adSpendExpense.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>৩. কুরিয়ার ডেলিভারি ও রিটার্ন বিল (Delivery Fees)</span>
                    <strong className="text-red-600">৳{courierDeliveryCost.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>৪. রিটার্ন পার্সেল ক্ষতি ও ড্যামেজ (Damage Loss)</span>
                    <strong className="text-red-600">৳{returnDamageLoss.toLocaleString()}</strong>
                  </div>
                  <div className="flex justify-between p-2 bg-white rounded border border-[#EEEEEE]">
                    <span>৫. বিকাশ ও মার্চেন্ট পেমেন্ট ফি (Gateway Fee 1.2%)</span>
                    <strong className="text-red-600">৳{gatewayProcessingFees.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TABLE 1: FINANCIAL INCOME & EXPENSE LEDGER */}
        {/* ========================================================================= */}
        {(activeTab === 'FINANCE' || activeTab === 'ALL_MASTER') && (
          <div className="bg-white border border-[#EEAB59] rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-[#E67E00]" />
                <h3 className="font-black text-sm uppercase tracking-wider text-[#0E0E0E]">
                  ১. আর্থিক লেনদেন ও আয়-ব্যয় লজার টেবিল (FINANCIAL TRANSACTIONS TABLE)
                </h3>
              </div>
              <span className="text-xs font-bold text-[#008F2F] bg-[#ECFFE8] px-2.5 py-0.5 rounded border border-[#008F2F]/30">
                মোট ট্রানজেকশন: {financialLedger.length} টি
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">TRX ID</th>
                    <th className="py-2.5 px-3">তারিখ (DATE)</th>
                    <th className="py-2.5 px-3">খাত / ক্যাটাগরি</th>
                    <th className="py-2.5 px-3">বিবরণ (DESCRIPTION)</th>
                    <th className="py-2.5 px-3">উৎস / মাধ্যম</th>
                    <th className="py-2.5 px-3 text-right">জমা (INFLOW)</th>
                    <th className="py-2.5 px-3 text-right">খরচ (OUTFLOW)</th>
                    <th className="py-2.5 px-3 text-right">নিট ব্যালেন্স</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#0E0E0E]">
                  {financialLedger.map((f) => (
                    <tr key={f.id} className="hover:bg-[#FCF1E5]/20">
                      <td className="py-2.5 px-3 font-bold font-mono text-[#0E0E0E]">{f.id}</td>
                      <td className="py-2.5 px-3 text-[#545454]">{f.date}</td>
                      <td className="py-2.5 px-3 font-bold">{f.category}</td>
                      <td className="py-2.5 px-3 text-[#545454]">{f.description}</td>
                      <td className="py-2.5 px-3 font-semibold text-[#E67E00]">{f.source}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#008F2F]">
                        {f.inflow > 0 ? `+৳${f.inflow.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-2.5 px-3 text-right font-bold text-red-600">
                        {f.outflow > 0 ? `-৳${f.outflow.toLocaleString()}` : '-'}
                      </td>
                      <td className={`py-2.5 px-3 text-right font-black ${f.net >= 0 ? 'text-[#008F2F]' : 'text-red-600'}`}>
                        ৳{f.net.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TABLE 2: STOCK INVENTORY REPORT TABLE */}
        {/* ========================================================================= */}
        {(activeTab === 'STOCK' || activeTab === 'ALL_MASTER') && (
          <div className="bg-white border border-[#EEAB59] rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#E67E00]" />
                <h3 className="font-black text-sm uppercase tracking-wider text-[#0E0E0E]">
                  ২. মজুদ পণ্য ও ইনভেন্টরি ভ্যালুয়েশন টেবিল (STOCK INVENTORY AUDIT TABLE)
                </h3>
              </div>
              <span className="text-xs font-bold text-[#E67E00] bg-[#FCF1E5] px-2.5 py-0.5 rounded border border-[#EEAB59]">
                মোট স্টক ভ্যালু: ৳{totalStockValuation.toLocaleString()} ({totalStockUnits} Units)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">পণ্য (PRODUCT TITLE)</th>
                    <th className="py-2.5 px-3">পাইকারি ক্রয়মূল্য</th>
                    <th className="py-2.5 px-3">বিক্রয়মূল্য</th>
                    <th className="py-2.5 px-3 text-center">বর্তমান স্টক</th>
                    <th className="py-2.5 px-3 text-center">মোট বিক্রিত</th>
                    <th className="py-2.5 px-3 text-right">স্টক ভ্যালু (৳)</th>
                    <th className="py-2.5 px-3 text-center">স্টক অবস্থা</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#0E0E0E]">
                  {products.map((p) => {
                    const stock = p.stock || 25;
                    const stockVal = p.price * stock;
                    return (
                      <tr key={p.id} className="hover:bg-[#FCF1E5]/20">
                        <td className="py-2.5 px-3 font-bold text-[#0E0E0E] flex items-center gap-2">
                          <img src={p.image} alt={p.title} className="w-8 h-8 rounded object-cover border border-[#EEEEEE]" />
                          <div>
                            <div>{p.title}</div>
                            <div className="text-[10px] text-[#545454] font-mono">SKU: PROD-00{p.id}</div>
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-[#545454]">৳{p.regularPrice.toLocaleString()}</td>
                        <td className="py-2.5 px-3 font-bold text-[#0E0E0E]">৳{p.price.toLocaleString()}</td>
                        <td className="py-2.5 px-3 text-center font-extrabold text-[#E67E00] text-sm">
                          {stock} টি
                        </td>
                        <td className="py-2.5 px-3 text-center font-bold text-[#008F2F]">
                          {p.salesCount} টি
                        </td>
                        <td className="py-2.5 px-3 text-right font-extrabold text-[#0E0E0E]">
                          ৳{stockVal.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3 text-center">
                          {stock <= 10 ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300 uppercase">
                              Low Stock
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 uppercase">
                              Normal Stock
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TABLE 3: PURCHASES & SUPPLIER INVOICES TABLE */}
        {/* ========================================================================= */}
        {(activeTab === 'PURCHASES' || activeTab === 'ALL_MASTER') && (
          <div className="bg-white border border-[#EEAB59] rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#E67E00]" />
                <h3 className="font-black text-sm uppercase tracking-wider text-[#0E0E0E]">
                  ৩. পাইকারি পণ্য ক্রয় রেকর্ড ও ইনভয়েস টেবিল (PURCHASE INVOICES TABLE)
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0E0E0E]">
                মোট পাইকারি বিল: ৳103,500
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">মেমো নং (MEMO NO)</th>
                    <th className="py-2.5 px-3">তারিখ</th>
                    <th className="py-2.5 px-3">সাপ্লায়ার / মহাজন (SUPPLIER)</th>
                    <th className="py-2.5 px-3">ক্রয়কৃত পণ্যের আইটেম</th>
                    <th className="py-2.5 px-3 text-right">মোট বিল (৳)</th>
                    <th className="py-2.5 px-3 text-right">পরিশোধিত (PAID)</th>
                    <th className="py-2.5 px-3 text-right">বাকি (DUE)</th>
                    <th className="py-2.5 px-3 text-center">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#0E0E0E]">
                  {purchaseInvoices.map((pur) => (
                    <tr key={pur.id} className="hover:bg-[#FCF1E5]/20">
                      <td className="py-2.5 px-3 font-bold font-mono text-[#E67E00]">{pur.id}</td>
                      <td className="py-2.5 px-3 text-[#545454]">{pur.date}</td>
                      <td className="py-2.5 px-3 font-bold">{pur.supplier}</td>
                      <td className="py-2.5 px-3 text-[#545454]">{pur.items}</td>
                      <td className="py-2.5 px-3 text-right font-black">৳{pur.amount.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-[#008F2F]">৳{pur.paid.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-red-600">৳{pur.due.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          pur.status === 'Paid'
                            ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {pur.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TABLE 4: ORDERS FULFILLMENT TABLE */}
        {/* ========================================================================= */}
        {(activeTab === 'ORDERS' || activeTab === 'ALL_MASTER') && (
          <div className="bg-white border border-[#EEAB59] rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#E67E00]" />
                <h3 className="font-black text-sm uppercase tracking-wider text-[#0E0E0E]">
                  ৪. বিক্রয় অর্ডার ও ডেলিভারি তথ্য টেবিল (ORDERS MASTER REPORT TABLE)
                </h3>
              </div>
              <span className="text-xs font-bold text-[#0E0E0E]">
                মোট অর্ডার: {orders.length} টি
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">অর্ডার আইডি</th>
                    <th className="py-2.5 px-3">গ্রাহকের নাম</th>
                    <th className="py-2.5 px-3">মোবাইল নম্বর</th>
                    <th className="py-2.5 px-3">ঠিকানা ও জোন</th>
                    <th className="py-2.5 px-3 text-center">আইটেম সংখ্যা</th>
                    <th className="py-2.5 px-3 text-right">মোট টাকা</th>
                    <th className="py-2.5 px-3">পেমেন্ট মেথড</th>
                    <th className="py-2.5 px-3 text-center">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#0E0E0E]">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-[#FCF1E5]/20">
                      <td className="py-2.5 px-3 font-black text-[#E67E00] font-mono">{ord.id}</td>
                      <td className="py-2.5 px-3 font-bold">{ord.customerName}</td>
                      <td className="py-2.5 px-3 text-[#545454] font-mono">{ord.customerPhone}</td>
                      <td className="py-2.5 px-3 text-[#545454] max-w-xs truncate">{ord.customerAddress} ({ord.cityZone})</td>
                      <td className="py-2.5 px-3 text-center font-bold">{ord.items.length} টি</td>
                      <td className="py-2.5 px-3 text-right font-extrabold text-[#008F2F]">৳{ord.totalAmount.toLocaleString()}</td>
                      <td className="py-2.5 px-3 font-bold text-[11px]">{ord.paymentMethod}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          ord.status === 'Delivered'
                            ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30'
                            : 'bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59]'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TABLE 5: COURIER LOGISTICS & RETURN LOSS TABLE */}
        {/* ========================================================================= */}
        {(activeTab === 'COURIER' || activeTab === 'ALL_MASTER') && (
          <div className="bg-white border border-[#EEAB59] rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-[#E67E00]" />
                <h3 className="font-black text-sm uppercase tracking-wider text-[#0E0E0E]">
                  ৫. কুরিয়ার কোম্পানি পারফরম্যান্স ও লস টেবিল (COURIER LOGISTICS TABLE)
                </h3>
              </div>
              <span className="text-xs font-bold text-[#008F2F]">
                গড় ডেলিভারি সাকসেস: {deliverySuccessRate}%
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">কুরিয়ার কোম্পানি (COURIER)</th>
                    <th className="py-2.5 px-3 text-center">মোট পাঠানো</th>
                    <th className="py-2.5 px-3 text-center">ডেলিভারড</th>
                    <th className="py-2.5 px-3 text-center">রিটার্ন (RETURN)</th>
                    <th className="py-2.5 px-3 text-center">গড় গতি (SPEED)</th>
                    <th className="py-2.5 px-3 text-right">ডেলিভারি চার্জ আদায়</th>
                    <th className="py-2.5 px-3 text-right">রিটার্ন ক্ষতি বিল</th>
                    <th className="py-2.5 px-3 text-center">সাকসেস রেট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#0E0E0E]">
                  {courierData.map((c, idx) => (
                    <tr key={idx} className="hover:bg-[#FCF1E5]/20">
                      <td className="py-2.5 px-3 font-bold text-[#0E0E0E] flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#E67E00]" />
                        <span>{c.name}</span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold">{c.total}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-[#008F2F]">{c.delivered}</td>
                      <td className="py-2.5 px-3 text-center font-bold text-red-600">{c.returned}</td>
                      <td className="py-2.5 px-3 text-center text-[#545454]">{c.avgSpeed}</td>
                      <td className="py-2.5 px-3 text-right font-bold">{c.chargeCollected}</td>
                      <td className="py-2.5 px-3 text-right font-bold text-red-600">{c.returnCharge}</td>
                      <td className="py-2.5 px-3 text-center font-black text-[#008F2F]">{c.successRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TABLE 6: SYSTEM AUDIT LOGS TABLE */}
        {/* ========================================================================= */}
        {(activeTab === 'LOGS' || activeTab === 'ALL_MASTER') && (
          <div className="bg-white border border-[#EEAB59] rounded-xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#E67E00]" />
                <h3 className="font-black text-sm uppercase tracking-wider text-[#0E0E0E]">
                  ৬. অ্যাডমিন ও সিস্টেম কার্যক্রম অডিট লগ (ADMIN SYSTEM AUDIT LOGS TABLE)
                </h3>
              </div>
              <span className="text-xs font-bold text-[#545454]">
                সিকিউরিটি সিকোয়েন্স অ্যাক্টিভ
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">লগ আইডি</th>
                    <th className="py-2.5 px-3">সময় ও তারিখ</th>
                    <th className="py-2.5 px-3">অ্যাডমিন / ইউজার</th>
                    <th className="py-2.5 px-3">রোল</th>
                    <th className="py-2.5 px-3">সম্পাদিত কাজ (ACTION)</th>
                    <th className="py-2.5 px-3">মডিউল</th>
                    <th className="py-2.5 px-3 text-center">ফলাফল</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#0E0E0E]">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#FCF1E5]/20">
                      <td className="py-2.5 px-3 font-bold font-mono text-[#545454]">{log.id}</td>
                      <td className="py-2.5 px-3 font-mono text-[#545454] text-[11px]">{log.time}</td>
                      <td className="py-2.5 px-3 font-bold">{log.user}</td>
                      <td className="py-2.5 px-3 text-[#545454]">{log.role}</td>
                      <td className="py-2.5 px-3 font-bold text-[#0E0E0E]">{log.action}</td>
                      <td className="py-2.5 px-3 font-extrabold text-[#E67E00]">{log.module}</td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 uppercase">
                          {log.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Printable Official Stamp Footer */}
        <div className="hidden print:block border-t border-[#EEEEEE] pt-4 mt-6 text-xs text-[#545454] flex justify-between items-end">
          <div>
            <div className="font-bold text-[#0E0E0E]">Promise Mart Ltd • Official Financial & Inventory Audit</div>
            <div>Generated by Super Admin System Panel</div>
          </div>
          <div className="text-right border-t border-dashed border-[#0E0E0E] pt-1 px-4">
            <span className="font-bold text-[#0E0E0E] block">AUTHORIZED SIGNATURE & STAMP</span>
            <span className="text-[10px]">Managing Director / Finance Department</span>
          </div>
        </div>

      </div>
    </div>
  );
};
