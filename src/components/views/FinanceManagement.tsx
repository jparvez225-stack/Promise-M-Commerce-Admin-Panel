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
  Plus
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
  const [outsideDhakaCharge, setOutsideDhakaCharge] = useState<number>(120);
  const [showDropdownInPOS, setShowDropdownInPOS] = useState<boolean>(true);
  const [settingsSavedMsg, setSettingsSavedMsg] = useState<string>('');

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
                        <button className="text-[11px] font-bold text-[#E67E00] hover:underline">
                          View
                        </button>
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
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white p-5 rounded border border-[#EEAB59]">
            <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#E67E00]" />
              <span>POS Settings</span>
            </h1>
            <p className="text-xs text-[#545454] font-medium mt-0.5">
              Configure shipping charges and checkout behavior for the Point of Sale interface
            </p>
          </div>

          {settingsSavedMsg && (
            <div className="p-3 bg-[#ECFFE8] border border-[#008F2F] text-[#008F2F] text-xs font-bold rounded flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#008F2F] shrink-0" />
              <span>{settingsSavedMsg}</span>
            </div>
          )}

          <form onSubmit={handleSavePOSSettings} className="space-y-6 max-w-2xl">
            {/* Section 1: Shipping Charges */}
            <div className="bg-white rounded border border-[#EEAB59] p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider border-b border-[#EEEEEE] pb-3">
                Shipping Charges
              </h3>

              <div>
                <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                  Shipping Charge Inside City Zone (৳)
                </label>
                <input 
                  type="number"
                  value={insideDhakaCharge}
                  onChange={(e) => setInsideDhakaCharge(Number(e.target.value))}
                  placeholder="Enter shipping charge for inside city zone"
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                  Shipping Charge Outside City Zone (৳)
                </label>
                <input 
                  type="number"
                  value={outsideDhakaCharge}
                  onChange={(e) => setOutsideDhakaCharge(Number(e.target.value))}
                  placeholder="Enter shipping charge for outside city zone"
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                  required
                />
              </div>
            </div>

            {/* Section 2: POS Display Options */}
            <div className="bg-white rounded border border-[#EEAB59] p-6 space-y-4">
              <h3 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider border-b border-[#EEEEEE] pb-3">
                POS Display Options
              </h3>

              <div className="flex items-start justify-between gap-4 p-3 bg-[#FCF1E5]/40 rounded border border-[#EEAB59]">
                <div>
                  <span className="text-xs font-bold text-[#0E0E0E] block">
                    Show Order Status Dropdown in POS Page
                  </span>
                  <p className="text-[11px] text-[#545454] font-medium mt-0.5">
                    Enable this to display order status selection option in the POS interface
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

            {/* CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#E67E00] hover:bg-[#CC7000] text-white font-semibold text-xs uppercase tracking-wider rounded-full flex items-center justify-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Update Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
