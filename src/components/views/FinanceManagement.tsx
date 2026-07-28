import React, { useState } from 'react';
import { 
  ArrowRightLeft, 
  Receipt, 
  SlidersHorizontal, 
  CheckCircle2, 
  Clock, 
  Search, 
  Calendar, 
  Send, 
  Save, 
  Building2, 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Filter, 
  Check, 
  RefreshCw,
  Plus,
  Truck,
  Scale,
  MapPin,
  Calculator,
  Layers,
  Info,
  Printer,
  Copy,
  Eye,
  Edit3
} from 'lucide-react';
import { FinanceSubTab } from '../../types';

interface FinanceManagementProps {
  activeSubTab: FinanceSubTab;
  onSubTabChange: (subTab: FinanceSubTab) => void;
}

interface TransactionItem {
  id: string;
  sl: number;
  date: string;
  purpose: string;
  reference: string;
  status: 'Approved' | 'Pending' | 'Completed' | 'Rejected';
  debit: number;
  credit: number;
  balance: number;
}

const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-101',
    sl: 1,
    date: '2026-07-26 14:30',
    purpose: 'POS Sale Settlement - Order #ORD-849201',
    reference: 'POS-TX-9901',
    status: 'Approved',
    debit: 0,
    credit: 5050,
    balance: 125450,
  },
  {
    id: 'tx-102',
    sl: 2,
    date: '2026-07-25 11:15',
    purpose: 'Bank Balance Transfer to City Bank Corp',
    reference: 'TR-BANK-4482',
    status: 'Approved',
    debit: 25000,
    credit: 0,
    balance: 120400,
  },
  {
    id: 'tx-103',
    sl: 3,
    date: '2026-07-24 16:45',
    purpose: 'bKash Merchant Auto Payout',
    reference: 'BK-MER-88312',
    status: 'Pending',
    debit: 15000,
    credit: 0,
    balance: 145400,
  },
  {
    id: 'tx-104',
    sl: 4,
    date: '2026-07-23 09:20',
    purpose: 'Online Store Sales - Order #ORD-739102',
    reference: 'PAY-ONLINE-102',
    status: 'Completed',
    debit: 0,
    credit: 3200,
    balance: 160400,
  },
  {
    id: 'tx-105',
    sl: 5,
    date: '2026-07-22 18:00',
    purpose: 'Supplier Stock Payment Deposit',
    reference: 'SUP-PAY-0041',
    status: 'Approved',
    debit: 50000,
    credit: 0,
    balance: 157200,
  }
];

export const FinanceManagement: React.FC<FinanceManagementProps> = ({
  activeSubTab,
  onSubTabChange
}) => {
  // State for Balance Transfer
  const [accountBalance, setAccountBalance] = useState<number>(125450);
  const [transferAmount, setTransferAmount] = useState<string>('');
  const [transferSuccessMsg, setTransferSuccessMsg] = useState<string>('');
  
  // State for Transactions
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // State for POS Settings
  const [insideDhakaCharge, setInsideDhakaCharge] = useState<number>(60);
  const [subUrbanDhakaCharge, setSubUrbanDhakaCharge] = useState<number>(100);
  const [outsideDhakaCharge, setOutsideDhakaCharge] = useState<number>(150);
  const [baseIncludedWeight, setBaseIncludedWeight] = useState<number>(1.0);
  const [extraKgRateDhaka, setExtraKgRateDhaka] = useState<number>(20);
  const [extraKgRateSubUrban, setExtraKgRateSubUrban] = useState<number>(25);
  const [extraKgRateOutside, setExtraKgRateOutside] = useState<number>(35);
  const [showDropdownInPOS, setShowDropdownInPOS] = useState<boolean>(true);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState<string>('');

  // Simulator State
  const [calcSimArea, setCalcSimArea] = useState<'INSIDE_DHAKA' | 'SUB_URBAN' | 'OUTSIDE_DHAKA'>('SUB_URBAN');
  const [calcSimWeight, setCalcSimWeight] = useState<number>(2.5);

  // Handle Transfer Action
  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid transfer amount.');
      return;
    }
    if (amount > accountBalance) {
      alert('Transfer amount exceeds available account balance!');
      return;
    }

    const newBalance = accountBalance - amount;
    setAccountBalance(newBalance);

    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      sl: transactions.length + 1,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      purpose: `Requested Balance Transfer`,
      reference: `TR-REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      debit: amount,
      credit: 0,
      balance: newBalance,
    };

    setTransactions([newTx, ...transactions]);
    setTransferAmount('');
    setTransferSuccessMsg(`Successfully submitted transfer request of ৳${amount.toLocaleString()}!`);
    setTimeout(() => setTransferSuccessMsg(''), 4000);
  };

  // Handle POS Settings Update
  const handleSavePOSSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSavedMsg('POS settings updated successfully!');
    setTimeout(() => setSettingsSavedMsg(''), 4000);
  };

  // Filter transactions
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch = 
      tx.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. BALANCE TRANSFER VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'BALANCE_TRANSFER' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded border border-[#EEAB59] shadow-2xs">
            <div>
              <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-[#E67E00]" />
                <span>Balance Transfer</span>
              </h1>
              <p className="text-xs text-[#545454] font-medium mt-0.5">
                Transfer store balance securely to connected merchant accounts or bank
              </p>
            </div>
            
            <div className="bg-[#FCF1E5] border border-[#EEAB59] px-4 py-2 rounded flex items-center gap-3 self-start sm:self-auto">
              <span className="text-xs font-bold text-[#E67E00]">Account Balance</span>
              <span className="text-lg font-bold text-[#0E0E0E]">৳ {accountBalance.toLocaleString()}</span>
            </div>
          </div>

          {/* Transfer Form Box */}
          <div className="bg-white rounded border border-[#EEAB59] p-5 max-w-xl mx-auto shadow-2xs">
            <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider mb-3 text-center">
              ACCOUNT BALANCE & TRANSFER REQUEST
            </h3>
            
            <div className="bg-[#FCF1E5]/40 border border-[#EEAB59] rounded p-5 text-center mb-4">
              <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-wider">AVAILABLE BALANCE</span>
              <div className="text-2xl font-bold text-[#0E0E0E] mt-1">
                ৳ {accountBalance.toLocaleString()}
              </div>
            </div>

            {transferSuccessMsg && (
              <div className="mb-4 p-2.5 bg-[#ECFFE8] border border-[#008F2F] text-[#008F2F] text-xs font-bold rounded flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#008F2F] shrink-0" />
                <span>{transferSuccessMsg}</span>
              </div>
            )}

            <form onSubmit={handleTransferSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2 text-[#8F8F8F] font-bold text-xs">৳</span>
                <input 
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Enter Amount"
                  className="w-full pl-7 pr-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] transition-all placeholder:text-[#8F8F8F]"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-5 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-all shrink-0 uppercase tracking-wider shadow-2xs"
              >
                <span>Transfer</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Transfers Log Table */}
          <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs">
            <div className="p-3 border-b border-[#EEEEEE] bg-[#FCF1E5] flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider">
                BALANCE TRANSFER LOGS
              </h3>
              <span className="text-xs font-medium text-[#545454]">
                Total Logs: {transactions.length}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold tracking-wider text-[11px] uppercase">
                    <th className="py-2.5 px-4 w-12 text-center">SL#</th>
                    <th className="py-2.5 px-4">PURPOSE</th>
                    <th className="py-2.5 px-4">REFERENCE</th>
                    <th className="py-2.5 px-4">STATUS</th>
                    <th className="py-2.5 px-4 text-right">DEBIT</th>
                    <th className="py-2.5 px-4 text-right">CREDIT</th>
                    <th className="py-2.5 px-4 text-right">BALANCE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#FCF1E5]/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#8F8F8F] text-center">{tx.sl}</td>
                      <td className="py-3 px-4 font-bold text-[#0E0E0E]">{tx.purpose}</td>
                      <td className="py-3 px-4 font-mono text-[#545454]">{tx.reference}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          tx.status === 'Approved' || tx.status === 'Completed'
                            ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30'
                            : 'bg-[#FFF8EC] text-[#E67E00] border border-[#EEAB59]'
                        }`}>
                          {tx.status === 'Approved' || tx.status === 'Completed' ? (
                            <CheckCircle2 className="w-3 h-3 text-[#008F2F]" />
                          ) : (
                            <Clock className="w-3 h-3 text-[#E67E00]" />
                          )}
                          <span>{tx.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#FF0000]">
                        {tx.debit > 0 ? `৳${tx.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#008F2F]">
                        {tx.credit > 0 ? `৳${tx.credit.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#0E0E0E]">
                        ৳{tx.balance.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TRANSACTIONS VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'TRANSACTIONS' && (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-5 rounded border border-[#EEAB59] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
                <Receipt className="w-5 h-5 text-[#E67E00]" />
                <span>Transactions</span>
              </h1>
              <p className="text-xs text-[#545454] font-medium mt-0.5">
                Overview of store earnings, sales revenues, and balance transfer entries
              </p>
            </div>
          </div>

          {/* 6 Top Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* 1. Account Balance */}
            <div className="bg-white p-4 rounded border border-[#EEAB59]">
              <span className="text-[11px] font-bold text-[#8F8F8F] block uppercase tracking-wide">Account Balance</span>
              <div className="text-xl font-bold text-[#0E0E0E] mt-1">
                ৳ {accountBalance.toLocaleString()}
              </div>
            </div>

            {/* 2. Total Sale */}
            <div className="bg-white p-4 rounded border border-[#EEAB59]">
              <span className="text-[11px] font-bold text-[#8F8F8F] block uppercase tracking-wide">Total Sale</span>
              <div className="text-xl font-bold text-[#0E0E0E] mt-1">
                ৳ 485,200
              </div>
            </div>

            {/* 3. Today Sale */}
            <div className="bg-white p-4 rounded border border-[#EEAB59]">
              <span className="text-[11px] font-bold text-[#8F8F8F] block uppercase tracking-wide">Today Sale</span>
              <div className="text-xl font-bold text-[#0E0E0E] mt-1">
                ৳ 32,800
              </div>
            </div>

            {/* 4. Total Balance Transfer */}
            <div className="bg-white p-4 rounded border border-[#EEAB59]">
              <span className="text-[11px] font-bold text-[#8F8F8F] block uppercase tracking-wide">Total Transfer</span>
              <div className="text-xl font-bold text-[#0E0E0E] mt-1">
                ৳ 150,000
              </div>
            </div>

            {/* 5. Pending Balance Transfer */}
            <div className="bg-white p-4 rounded border border-[#EEAB59] bg-[#FCF1E5]/40">
              <span className="text-[11px] font-bold text-[#E67E00] block uppercase tracking-wide">Pending Transfer</span>
              <div className="text-xl font-bold text-[#E67E00] mt-1">
                ৳ 15,000
              </div>
            </div>

            {/* 6. Approved Balance Transfer */}
            <div className="bg-white p-4 rounded border border-[#008F2F] bg-[#ECFFE8]/50">
              <span className="text-[11px] font-bold text-[#008F2F] block uppercase tracking-wide">Approved Transfer</span>
              <div className="text-xl font-bold text-[#008F2F] mt-1">
                ৳ 135,000
              </div>
            </div>
          </div>

          {/* Filter Bar: Date Range */}
          <div className="bg-white p-4 rounded border border-[#EEAB59] flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-[#8F8F8F] block mb-1">Search by Date</label>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input 
                      type="date" 
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F]"
                    />
                  </div>
                  <span className="text-[#8F8F8F] font-bold text-xs">to</span>
                  <div className="relative">
                    <input 
                      type="date" 
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F]"
                    />
                  </div>
                  <button 
                    type="button"
                    className="px-5 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-semibold text-xs rounded-full transition-all"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8F8F8F]" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by purpose or ref..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
              />
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded border border-[#EEAB59] overflow-hidden">
            <div className="p-4 border-b border-[#EEEEEE] bg-[#FCF1E5] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">
                Transaction Ledger
              </h3>
              <span className="text-xs font-semibold text-[#545454]">
                Showing {filteredTransactions.length} entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold tracking-wider text-[11px] uppercase">
                    <th className="py-3 px-4 w-12 text-center">SL#</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Purpose</th>
                    <th className="py-3 px-4">Reference</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Debit</th>
                    <th className="py-3 px-4 text-right">Credit</th>
                    <th className="py-3 px-4 text-right">Balance</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
                  {filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-[#FCF1E5]/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-[#8F8F8F] text-center">{tx.sl}</td>
                      <td className="py-3 px-4 font-semibold text-[#545454]">{tx.date}</td>
                      <td className="py-3 px-4 font-bold text-[#0E0E0E]">{tx.purpose}</td>
                      <td className="py-3 px-4 font-mono text-[#545454]">{tx.reference}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          tx.status === 'Approved' || tx.status === 'Completed'
                            ? 'bg-[#ECFFE8] text-[#008F2F]'
                            : 'bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59]'
                        }`}>
                          {tx.status === 'Approved' || tx.status === 'Completed' ? (
                            <CheckCircle2 className="w-3 h-3 text-[#008F2F]" />
                          ) : (
                            <Clock className="w-3 h-3 text-[#E67E00]" />
                          )}
                          <span>{tx.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#FF0000]">
                        {tx.debit > 0 ? `৳${tx.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#008F2F]">
                        {tx.credit > 0 ? `৳${tx.credit.toLocaleString()}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-[#0E0E0E]">
                        ৳{tx.balance.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => alert(`Printing receipt for transaction ${tx.reference}`)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="Print Transaction Slip"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(tx.reference);
                              alert('Copied transaction reference!');
                            }}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="Copy Reference"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => alert(`Transaction Purpose: ${tx.purpose}\nReference: ${tx.reference}\nStatus: ${tx.status}`)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="View Transaction Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => alert(`Edit transaction ${tx.reference}`)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="Edit Transaction"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. POS SETTINGS VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'POS_SETTINGS' && (
        <div className="space-y-6 max-w-4xl">
          {/* Header */}
          <div className="bg-white p-5 rounded border border-[#EEAB59] flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-[#E67E00]" />
                <span>POS & Delivery Shipping Settings</span>
              </h1>
              <p className="text-xs text-[#545454] font-medium mt-0.5">
                Configure area-based delivery rates (Inside Dhaka, Sub-Urban Area, Outside Dhaka) and weight-based extra charges for POS & checkout.
              </p>
            </div>
            <span className="px-3 py-1 bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] text-xs font-bold rounded-full self-start md:self-auto">
              Area & Weight Based Active
            </span>
          </div>

          {settingsSavedMsg && (
            <div className="p-3 bg-[#ECFFE8] border border-[#008F2F] text-[#008F2F] text-xs font-bold rounded flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008F2F] shrink-0" />
              <span>{settingsSavedMsg}</span>
            </div>
          )}

          <form onSubmit={handleSavePOSSettings} className="space-y-6">
            {/* Area Based Shipping Rates (3 Areas) */}
            <div className="bg-white rounded border border-[#EEAB59] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2.5">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E]">
                  <MapPin className="w-4 h-4 text-[#E67E00]" />
                  <span>1. Area-Based Delivery Charges (3 Zones)</span>
                </div>
                <span className="text-[10px] text-[#8F8F8F] font-semibold">Standard Base Rates</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Inside Dhaka */}
                <div className="p-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#0E0E0E] block">
                      Inside Dhaka (ঢাকা সিটি)
                    </label>
                    <span className="text-[10px] font-bold text-[#008F2F] bg-[#ECFFE8] px-1.5 py-0.5 rounded">City Zone</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-[#8F8F8F]">৳</span>
                    <input 
                      type="number"
                      value={insideDhakaCharge}
                      onChange={(e) => setInsideDhakaCharge(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#E67E00]"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-[#8F8F8F]">e.g. Mirpur, Gulshan, Dhanmondi, Uttara</p>
                </div>

                {/* Sub-Urban Area */}
                <div className="p-3.5 bg-[#FCF1E5]/30 border border-[#EEAB59]/60 rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#0E0E0E] block">
                      Sub-Urban Area (ঢাকা পার্শ্ববর্তী)
                    </label>
                    <span className="text-[10px] font-bold text-[#E67E00] bg-[#FCF1E5] px-1.5 py-0.5 rounded border border-[#EEAB59]">Suburb Zone</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-[#8F8F8F]">৳</span>
                    <input 
                      type="number"
                      value={subUrbanDhakaCharge}
                      onChange={(e) => setSubUrbanDhakaCharge(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#E67E00]"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-[#8F8F8F]">e.g. Savar, Gazipur, Keraniganj, Narayanganj</p>
                </div>

                {/* Outside Dhaka */}
                <div className="p-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#0E0E0E] block">
                      Outside Dhaka (ঢাকার বাইরে)
                    </label>
                    <span className="text-[10px] font-bold text-[#545454] bg-[#EEEEEE] px-1.5 py-0.5 rounded">All Districts</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-[#8F8F8F]">৳</span>
                    <input 
                      type="number"
                      value={outsideDhakaCharge}
                      onChange={(e) => setOutsideDhakaCharge(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#E67E00]"
                      required
                    />
                  </div>
                  <p className="text-[10px] text-[#8F8F8F]">Chittagong, Sylhet, Rajshahi, Khulna etc.</p>
                </div>
              </div>
            </div>

            {/* Weight-Based Extra Charges Configuration */}
            <div className="bg-white rounded border border-[#EEAB59] p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2.5">
                <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E]">
                  <Truck className="w-4 h-4 text-[#E67E00]" />
                  <span>2. Extra Weight Rate Configuration</span>
                </div>
                <span className="text-[10px] font-bold text-[#E67E00] bg-[#FCF1E5] px-2 py-0.5 rounded">
                  Per KG Surcharge Rule
                </span>
              </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                      Base Included Weight (KG)
                    </label>
                    <input 
                      type="number"
                      step="0.1"
                      value={baseIncludedWeight}
                      onChange={(e) => setBaseIncludedWeight(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]"
                    />
                    <p className="text-[10px] text-[#8F8F8F] mt-1">Included in base area fee</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                      Inside Dhaka Extra (৳ / KG)
                    </label>
                    <input 
                      type="number"
                      value={extraKgRateDhaka}
                      onChange={(e) => setExtraKgRateDhaka(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]"
                    />
                    <p className="text-[10px] text-[#8F8F8F] mt-1">Above base weight</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                      Sub-Urban Extra (৳ / KG)
                    </label>
                    <input 
                      type="number"
                      value={extraKgRateSubUrban}
                      onChange={(e) => setExtraKgRateSubUrban(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]"
                    />
                    <p className="text-[10px] text-[#8F8F8F] mt-1">Above base weight</p>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                      Outside Dhaka Extra (৳ / KG)
                    </label>
                    <input 
                      type="number"
                      value={extraKgRateOutside}
                      onChange={(e) => setExtraKgRateOutside(Number(e.target.value))}
                      className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]"
                    />
                    <p className="text-[10px] text-[#8F8F8F] mt-1">Above base weight</p>
                  </div>
                </div>

                {/* Weight Slabs Breakdown Table */}
                <div className="mt-4 pt-3 border-t border-[#EEEEEE]">
                  <h4 className="text-xs font-bold text-[#0E0E0E] uppercase mb-2">Weight Slabs Quick Rate Matrix</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border border-[#EEEEEE]">
                      <thead>
                        <tr className="bg-[#FCF1E5] text-[#0E0E0E] font-bold">
                          <th className="p-2 border-b border-r border-[#EEEEEE]">Weight Bracket</th>
                          <th className="p-2 border-b border-r border-[#EEEEEE]">Inside Dhaka (৳)</th>
                          <th className="p-2 border-b border-r border-[#EEEEEE]">Sub-Urban Area (৳)</th>
                          <th className="p-2 border-b border-[#EEEEEE]">Outside Dhaka (৳)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EEEEEE] text-[#545454]">
                        <tr>
                          <td className="p-2 font-bold border-r border-[#EEEEEE]">Up to {baseIncludedWeight} KG (Base)</td>
                          <td className="p-2 font-bold text-[#0E0E0E] border-r border-[#EEEEEE]">৳{insideDhakaCharge}</td>
                          <td className="p-2 font-bold text-[#E67E00] border-r border-[#EEEEEE]">৳{subUrbanDhakaCharge}</td>
                          <td className="p-2 font-bold text-[#0E0E0E]">৳{outsideDhakaCharge}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold border-r border-[#EEEEEE]">{baseIncludedWeight + 0.1} KG - 2.0 KG</td>
                          <td className="p-2 border-r border-[#EEEEEE]">৳{insideDhakaCharge + extraKgRateDhaka}</td>
                          <td className="p-2 border-r border-[#EEEEEE]">৳{subUrbanDhakaCharge + extraKgRateSubUrban}</td>
                          <td className="p-2">৳{outsideDhakaCharge + extraKgRateOutside}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold border-r border-[#EEEEEE]">2.1 KG - 3.0 KG</td>
                          <td className="p-2 border-r border-[#EEEEEE]">৳{insideDhakaCharge + (2 * extraKgRateDhaka)}</td>
                          <td className="p-2 border-r border-[#EEEEEE]">৳{subUrbanDhakaCharge + (2 * extraKgRateSubUrban)}</td>
                          <td className="p-2">৳{outsideDhakaCharge + (2 * extraKgRateOutside)}</td>
                        </tr>
                        <tr>
                          <td className="p-2 font-semibold border-r border-[#EEEEEE]">3.1 KG - 5.0 KG</td>
                          <td className="p-2 border-r border-[#EEEEEE]">৳{insideDhakaCharge + (4 * extraKgRateDhaka)}</td>
                          <td className="p-2 border-r border-[#EEEEEE]">৳{subUrbanDhakaCharge + (4 * extraKgRateSubUrban)}</td>
                          <td className="p-2">৳{outsideDhakaCharge + (4 * extraKgRateOutside)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            {/* Interactive Live Shipping Fee Calculator */}
            <div className="bg-[#FCF1E5]/40 border border-[#EEAB59] rounded p-5 space-y-4">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEAB59]/40 pb-2">
                <Calculator className="w-4 h-4 text-[#E67E00]" />
                <span>POS Real-Time Shipping Fee Calculator & Simulator</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                      Select Customer Delivery Area Zone
                    </label>
                    <select
                      value={calcSimArea}
                      onChange={(e) => setCalcSimArea(e.target.value as any)}
                      className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]"
                    >
                      <option value="INSIDE_DHAKA">Inside Dhaka (ঢাকা সিটি) - ৳{insideDhakaCharge}</option>
                      <option value="SUB_URBAN">Sub-Urban Area (ঢাকা পার্শ্ববর্তী এলাকা) - ৳{subUrbanDhakaCharge}</option>
                      <option value="OUTSIDE_DHAKA">Outside Dhaka (ঢাকার বাইরে) - ৳{outsideDhakaCharge}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                      Package Total Weight (KG)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      value={calcSimWeight}
                      onChange={(e) => setCalcSimWeight(Math.max(0.1, Number(e.target.value)))}
                      className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]"
                    />
                  </div>
                </div>

                {/* Calculation Output Box */}
                {(() => {
                  let baseFee = insideDhakaCharge;
                  let extraRate = extraKgRateDhaka;
                  let areaName = 'Inside Dhaka';

                  if (calcSimArea === 'SUB_URBAN') {
                    baseFee = subUrbanDhakaCharge;
                    extraRate = extraKgRateSubUrban;
                    areaName = 'Sub-Urban Area';
                  } else if (calcSimArea === 'OUTSIDE_DHAKA') {
                    baseFee = outsideDhakaCharge;
                    extraRate = extraKgRateOutside;
                    areaName = 'Outside Dhaka';
                  }

                  const extraWeight = Math.max(0, calcSimWeight - baseIncludedWeight);
                  const extraCharge = Math.ceil(extraWeight) * extraRate;
                  const totalShipping = baseFee + extraCharge;

                  return (
                    <div className="bg-white border border-[#EEAB59] rounded p-4 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-xs font-bold border-b border-[#EEEEEE] pb-2 text-[#0E0E0E]">
                          <span>Area: {areaName}</span>
                          <span className="text-[#E67E00]">{calcSimWeight} KG</span>
                        </div>

                        <div className="space-y-1.5 mt-2 text-xs text-[#545454]">
                          <div className="flex justify-between">
                            <span>Base Rate (Up to {baseIncludedWeight} KG):</span>
                            <span className="font-bold text-[#0E0E0E]">৳{baseFee}</span>
                          </div>
                          {extraWeight > 0 && (
                            <div className="flex justify-between">
                              <span>Extra Weight Charge ({extraWeight.toFixed(1)} KG @ ৳{extraRate}/KG):</span>
                              <span className="font-bold text-[#E67E00]">+৳{extraCharge}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-[#EEAB59] flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0E0E0E] uppercase">Total POS Shipping Fee:</span>
                        <span className="text-lg font-black text-[#E67E00]">৳{totalShipping}</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Display Options */}
            <div className="bg-white rounded border border-[#EEAB59] p-5 space-y-4">
              <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider border-b border-[#EEEEEE] pb-2">
                POS Display & Order Options
              </h3>

              <div className="flex items-start justify-between gap-4 p-3 bg-[#FCF1E5]/30 rounded border border-[#EEAB59]/60">
                <div>
                  <span className="text-xs font-bold text-[#0E0E0E] block">
                    Show Order Status Dropdown in POS Page
                  </span>
                  <p className="text-[11px] text-[#545454] font-medium mt-0.5">
                    Enable this to display order status selection option during quick sale creation in POS interface.
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                  <input 
                    type="checkbox" 
                    checked={showDropdownInPOS} 
                    onChange={(e) => setShowDropdownInPOS(e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-[#EEEEEE] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#EEEEEE] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E67E00]"></div>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 shadow-2xs transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save POS Shipping Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
