import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  Filter,
  Calendar,
  Clock,
  ArrowUpDown,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  RefreshCw,
  XCircle,
  X,
  Percent,
  AlertTriangle,
  FileText,
  Printer,
  Copy,
  Eye,
  Edit3,
  SlidersHorizontal,
  ChevronDown,
  User,
  MapPin,
  TrendingUp,
  Tag
} from 'lucide-react';
import { CRMCustomer, INITIAL_CRM_CUSTOMERS, CRMNote, CRMActivity } from '../../data/crmMockData';

interface CustomersLeadsProps {
  leads?: any[];
  onOpenRecoveryModal?: (lead: any) => void;
}

export const CustomersLeads: React.FC<CustomersLeadsProps> = () => {
  // Main dataset state
  const [customers, setCustomers] = useState<CRMCustomer[]>(INITIAL_CRM_CUSTOMERS);
  
  // Slide-over Drawer State for Customer Details
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(INITIAL_CRM_CUSTOMERS[0].id);
  const [isSlideOverOpen, setIsSlideOverOpen] = useState<boolean>(false);

  // Filter States for Horizontal Filter Bar
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [assignedFilter, setAssignedFilter] = useState<string>('All');
  const [quickFilter, setQuickFilter] = useState<string>('All');

  // Sorting State
  const [sortField, setSortField] = useState<keyof CRMCustomer>('lastContact');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Bulk Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Quick Action Modal States
  const [activeModal, setActiveModal] = useState<
    | 'call'
    | 'whatsapp'
    | 'email'
    | 'schedule'
    | 'discount'
    | 'receivePayment'
    | null
  >(null);

  // Form Fields for Modals & Notes
  const [newNoteText, setNewNoteText] = useState('');
  const [callNotes, setCallNotes] = useState('');
  const [whatsappMsg, setWhatsappMsg] = useState('Hello! We have an exclusive offer for you at Promise Mart Ltd.');
  const [emailSubject, setEmailSubject] = useState('Special Offer on Your Cart Item');
  const [emailBody, setEmailBody] = useState('Hi! Complete your purchase at Promise Mart Ltd today and enjoy free express delivery.');
  const [scheduleDate, setScheduleDate] = useState('2026-07-27');
  const [scheduleTime, setScheduleTime] = useState('15:30');
  const [discountPercent, setDiscountPercent] = useState('10');
  const [paymentAmount, setPaymentAmount] = useState('5050');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Currently Selected Customer
  const selectedCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId) || customers[0];
  }, [customers, selectedCustomerId]);

  // Derived Filtered Customer List
  const filteredCustomers = useMemo(() => {
    return customers.filter(c => {
      // Search Query
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery ||
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.product.toLowerCase().includes(query) ||
        c.address.toLowerCase().includes(query);

      // Status Filter
      const matchesStatus = statusFilter === 'All' || c.status === statusFilter;

      // Assigned Representative
      const matchesAssigned = assignedFilter === 'All' || c.assignedSales === assignedFilter;

      // Quick Smart Filter
      let matchesQuick = true;
      if (quickFilter === 'Follow-up Today') {
        matchesQuick = c.nextFollowUpStatus === 'Today';
      } else if (quickFilter === 'Overdue Follow-ups') {
        matchesQuick = c.nextFollowUpStatus === 'Overdue';
      } else if (quickFilter === 'Pending Payments') {
        matchesQuick = c.paymentInfo.dueAmount > 0;
      } else if (quickFilter === 'Repeat Opportunities') {
        matchesQuick = c.tags.includes('Repeat Buyer') || c.repeatProbability >= 75;
      } else if (quickFilter === 'Cancelled Orders') {
        matchesQuick = c.orderInfo.cancelledOrders > 0 || c.status === 'Cancelled';
      }

      return matchesSearch && matchesStatus && matchesAssigned && matchesQuick;
    }).sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
        valB = (valB || '').toString().toLowerCase();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [customers, searchQuery, statusFilter, assignedFilter, quickFilter, sortField, sortDirection]);

  // Paginated Data
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  // KPI Calculations
  const kpiTotalLeads = customers.length;
  const kpiNewLeads = customers.filter(c => c.status === 'New').length;
  const kpiFollowUpToday = customers.filter(c => c.nextFollowUpStatus === 'Today').length;
  const kpiPendingOrders = customers.reduce((acc, c) => acc + c.orderInfo.pendingOrders, 0);
  const kpiCompletedOrders = customers.reduce((acc, c) => acc + c.orderInfo.completedOrders, 0);
  const kpiTotalRevenue = customers.reduce((acc, c) => acc + c.orderInfo.totalPurchase, 0);

  // Table Sorting Handler
  const handleSort = (field: keyof CRMCustomer) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Bulk Selection Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedCustomers.map(c => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Open Slide-over Drawer
  const handleViewCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setIsSlideOverOpen(true);
  };

  // CRM Operation Handlers
  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const note: CRMNote = {
      id: `N-${Date.now()}`,
      text: newNoteText.trim(),
      author: 'Admin User',
      timestamp: 'Just now'
    };
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'Note Added',
      desc: newNoteText.trim(),
      timestamp: 'Just now',
      type: 'note'
    };

    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          notes: [note, ...c.notes],
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));

    setNewNoteText('');
    showToast('Note added to timeline!');
  };

  const handleStatusChange = (newStatus: CRMCustomer['status']) => {
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        const activity: CRMActivity = {
          id: `A-${Date.now()}`,
          title: 'Status Updated',
          desc: `Status changed to ${newStatus}`,
          timestamp: 'Just now',
          type: 'status'
        };
        return {
          ...c,
          status: newStatus,
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    showToast(`Status updated to "${newStatus}"!`);
  };

  const handleLogCall = () => {
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'Phone Call Completed',
      desc: callNotes || 'Outbound sales call logged',
      timestamp: 'Just now',
      type: 'call'
    };
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          lastContact: 'Just now',
          status: c.status === 'New' ? 'Contacted' : c.status,
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    setActiveModal(null);
    setCallNotes('');
    showToast('Call logged successfully!');
  };

  const handleSendWhatsApp = () => {
    window.open(`https://wa.me/88${selectedCustomer.phone}?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'WhatsApp Message Sent',
      desc: whatsappMsg,
      timestamp: 'Just now',
      type: 'whatsapp'
    };
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          lastContact: 'Just now',
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    setActiveModal(null);
    showToast('WhatsApp message sent!');
  };

  const handleSendEmail = () => {
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'Email Offer Sent',
      desc: `${emailSubject}: ${emailBody.substring(0, 40)}...`,
      timestamp: 'Just now',
      type: 'email'
    };
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    setActiveModal(null);
    showToast('Email sent to ' + selectedCustomer.email);
  };

  const handleSaveSchedule = () => {
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'Follow-up Scheduled',
      desc: `Scheduled for ${scheduleDate} at ${scheduleTime}`,
      timestamp: 'Just now',
      type: 'call'
    };
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          nextFollowUp: `${scheduleDate} (${scheduleTime})`,
          nextFollowUpStatus: scheduleDate === '2026-07-27' ? 'Today' : 'Upcoming',
          status: 'Follow-up',
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    setActiveModal(null);
    showToast('Follow-up scheduled!');
  };

  const handleApplyDiscount = () => {
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'Discount Applied',
      desc: `${discountPercent}% OFF special voucher code issued`,
      timestamp: 'Just now',
      type: 'payment'
    };
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          status: 'Discount',
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    setActiveModal(null);
    showToast(`${discountPercent}% discount code issued!`);
  };

  const handleReceivePayment = () => {
    const amt = parseFloat(paymentAmount) || 0;
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'Payment Received',
      desc: `Received ৳${amt.toLocaleString()} via bKash/Bank`,
      timestamp: 'Just now',
      type: 'payment'
    };
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        const newPaid = c.paymentInfo.paidAmount + amt;
        const newDue = Math.max(0, c.paymentInfo.dueAmount - amt);
        return {
          ...c,
          paymentInfo: {
            ...c.paymentInfo,
            paidAmount: newPaid,
            dueAmount: newDue,
            paymentStatus: newDue === 0 ? 'Paid' : 'Partial Due'
          },
          paymentHistory: [
            { id: `PAY-${Date.now()}`, date: 'Today', amount: amt, method: 'bKash / Cash', status: 'Paid' },
            ...c.paymentHistory
          ],
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    setActiveModal(null);
    showToast(`Payment of ৳${amt.toLocaleString()} recorded!`);
  };

  const handleSellAgain = () => {
    const newOrderNum = `#ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const activity: CRMActivity = {
      id: `A-${Date.now()}`,
      title: 'Repeat Order Created',
      desc: `Created repeat order ${newOrderNum} for ${selectedCustomer.product}`,
      timestamp: 'Just now',
      type: 'order'
    };
    setCustomers(prev => prev.map(c => {
      if (c.id === selectedCustomer.id) {
        return {
          ...c,
          status: 'Repeat Customer',
          lastPurchase: 'Today',
          daysSinceLastPurchase: 0,
          orderInfo: {
            ...c.orderInfo,
            totalOrders: c.orderInfo.totalOrders + 1,
            pendingOrders: c.orderInfo.pendingOrders + 1,
            totalPurchase: c.orderInfo.totalPurchase + c.orderValue
          },
          orderHistory: [
            { id: newOrderNum, date: 'Today', amount: c.orderValue, status: 'Pending', items: c.product },
            ...c.orderHistory
          ],
          activityTimeline: [activity, ...c.activityTimeline]
        };
      }
      return c;
    }));
    showToast(`Repeat order ${newOrderNum} generated!`);
  };

  return (
    <div className="space-y-6 text-black antialiased bg-white min-h-screen">
      
      {/* Toast Floating Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold border border-neutral-800 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-orange-500" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Page Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EEEEEE] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold tracking-tight text-[#0E0E0E]">
              Customers & Leads CRM
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-[#E67E00] text-white rounded-full uppercase tracking-wider">
              Promise Mart Ltd
            </span>
          </div>
          <p className="text-xs font-medium text-[#545454] mt-0.5">
            Simplified single-column CRM workflow with quick filters and off-canvas customer inspection.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('All');
              setAssignedFilter('All');
              setQuickFilter('All');
            }}
            className="px-4 py-1.5 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset All
          </button>
        </div>
      </div>

      {/* SECTION 1: TOP KPI CARDS (Horizontal Grid) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs hover:border-[#E67E00] transition-all">
          <span className="text-[11px] font-bold uppercase text-[#8F8F8F] tracking-wider block">Total Leads</span>
          <div className="text-2xl font-bold text-[#0E0E0E] mt-1">{kpiTotalLeads}</div>
          <span className="text-[10px] font-medium text-[#8F8F8F] mt-1 block">Registered Database</span>
        </div>

        <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs hover:border-[#E67E00] transition-all">
          <span className="text-[11px] font-bold uppercase text-[#8F8F8F] tracking-wider block">New Leads</span>
          <div className="text-2xl font-bold text-[#E67E00] mt-1">{kpiNewLeads}</div>
          <span className="text-[10px] font-medium text-[#8F8F8F] mt-1 block">Awaiting First Contact</span>
        </div>

        <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs hover:border-[#E67E00] transition-all">
          <span className="text-[11px] font-bold uppercase text-[#8F8F8F] tracking-wider block">Follow-up Today</span>
          <div className="text-2xl font-bold text-[#0E0E0E] mt-1">{kpiFollowUpToday}</div>
          <span className="text-[10px] font-bold text-[#E67E00] mt-1 block">High Priority</span>
        </div>

        <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs hover:border-[#E67E00] transition-all">
          <span className="text-[11px] font-bold uppercase text-[#8F8F8F] tracking-wider block">Pending Orders</span>
          <div className="text-2xl font-bold text-[#0E0E0E] mt-1">{kpiPendingOrders}</div>
          <span className="text-[10px] font-medium text-[#8F8F8F] mt-1 block">In Pipeline</span>
        </div>

        <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs hover:border-[#E67E00] transition-all">
          <span className="text-[11px] font-bold uppercase text-[#8F8F8F] tracking-wider block">Completed</span>
          <div className="text-2xl font-bold text-[#008F2F] mt-1">{kpiCompletedOrders}</div>
          <span className="text-[10px] font-medium text-[#8F8F8F] mt-1 block">Delivered Orders</span>
        </div>

        <div className="bg-white border border-[#EEAB59] bg-[#FCF1E5]/30 rounded p-4 shadow-2xs hover:border-[#E67E00] transition-all">
          <span className="text-[11px] font-bold uppercase text-[#E67E00] tracking-wider block">Total Revenue</span>
          <div className="text-2xl font-bold text-[#E67E00] mt-1">৳{kpiTotalRevenue.toLocaleString()}</div>
          <span className="text-[10px] font-bold text-[#E67E00] mt-1 block">Lifetime Customer Value</span>
        </div>
      </div>

      {/* SECTION 2: SINGLE HORIZONTAL FILTER BAR */}
      <div className="bg-white border border-[#EEAB59] rounded p-3 space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Global Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8F8F8F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by customer name, phone, email, product..."
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8] transition-all placeholder:text-[#8F8F8F]"
            />
          </div>

          {/* Outlined Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Status Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#545454] hidden sm:inline">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8] transition-all cursor-pointer"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Pending">Pending</option>
                <option value="Ordered">Ordered</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Lost">Lost</option>
                <option value="Discount">Discount</option>
                <option value="Repeat Customer">Repeat Customer</option>
              </select>
            </div>

            {/* Assigned Executive Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#545454] hidden sm:inline">Assigned:</span>
              <select
                value={assignedFilter}
                onChange={(e) => setAssignedFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8] transition-all cursor-pointer"
              >
                <option value="All">All Executives</option>
                <option value="Rahat Chowdhury">Rahat Chowdhury</option>
                <option value="Tanvir Ahmed">Tanvir Ahmed</option>
                <option value="Nusrat Jahan">Nusrat Jahan</option>
                <option value="Sabrina Khan">Sabrina Khan</option>
              </select>
            </div>

            {/* Quick Smart Filter Dropdown */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-[#545454] hidden sm:inline">Filter:</span>
              <select
                value={quickFilter}
                onChange={(e) => setQuickFilter(e.target.value)}
                className="px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8] transition-all cursor-pointer"
              >
                <option value="All">All Smart Filters</option>
                <option value="Follow-up Today">Follow-up Today</option>
                <option value="Overdue Follow-ups">Overdue Follow-ups</option>
                <option value="Pending Payments">Pending Payments</option>
                <option value="Repeat Opportunities">Repeat Sales Opps</option>
                <option value="Cancelled Orders">Cancelled Orders</option>
              </select>
            </div>

          </div>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 border-t border-[#EEEEEE] scrollbar-none">
          {[
            { id: 'All', label: 'All Customers' },
            { id: 'New', label: 'New Leads' },
            { id: 'Follow-up', label: 'Follow-up' },
            { id: 'Ordered', label: 'Ordered' },
            { id: 'Delivered', label: 'Delivered' },
            { id: 'Repeat Customer', label: 'Repeat Buyers' },
            { id: 'Cancelled', label: 'Cancelled' }
          ].map(pill => {
            const isActive = statusFilter === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setStatusFilter(pill.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  isActive 
                    ? 'bg-[#E67E00] text-white' 
                    : 'bg-white border border-[#EEEEEE] hover:border-[#EEAB59] text-[#545454]'
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bulk Action Notification Header */}
      {selectedIds.length > 0 && (
        <div className="bg-black text-white px-4 py-3 rounded-2xl flex items-center justify-between text-xs font-bold animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px] font-black">
              {selectedIds.length}
            </span>
            <span>Customers Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setActiveModal('discount');
              }}
              className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all"
            >
              Apply Discount Coupon
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="text-neutral-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 3: FULL WIDTH DATA TABLE */}
      <div className="bg-white border border-[#EEAB59] rounded overflow-hidden flex flex-col justify-between min-h-[520px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#E67E00] text-white font-bold text-[11px] uppercase tracking-wider sticky top-0 z-10">
                <th className="py-3.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={paginatedCustomers.length > 0 && selectedIds.length === paginatedCustomers.length}
                    onChange={handleSelectAll}
                    className="rounded border-white/40 text-[#E67E00] focus:ring-0"
                  />
                </th>
                <th 
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white/80 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Customer Info
                    <ArrowUpDown className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Target Product</th>
                <th 
                  onClick={() => handleSort('orderValue')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white/80 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Order Value
                    <ArrowUpDown className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('leadScore')}
                  className="py-3.5 px-4 cursor-pointer hover:text-white/80 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Lead Score
                    <ArrowUpDown className="w-3.5 h-3.5 text-white/70" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Assigned Exec</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
              {paginatedCustomers.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-[#8F8F8F] font-medium">
                    No customers found matching the search criteria.
                  </td>
                </tr>
              ) : (
                paginatedCustomers.map((cust) => {
                  const isChecked = selectedIds.includes(cust.id);

                  // Status Badge Styles (Aura Pro Design Tokens)
                  let statusBadge = 'bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] font-bold';
                  if (cust.status === 'New') statusBadge = 'bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] font-bold';
                  else if (cust.status === 'Contacted') statusBadge = 'bg-[#FCF1E5] text-[#0E0E0E] font-bold';
                  else if (cust.status === 'Follow-up') statusBadge = 'bg-[#0E0E0E] text-white font-bold';
                  else if (cust.status === 'Ordered' || cust.status === 'Pending') statusBadge = 'bg-[#E67E00] text-white font-bold';
                  else if (cust.status === 'Delivered' || cust.status === 'Repeat Customer') statusBadge = 'bg-[#ECFFE8] text-[#008F2F] font-bold';
                  else if (cust.status === 'Cancelled' || cust.status === 'Lost') statusBadge = 'bg-transparent text-[#FF0000] border border-[#FF0000] font-bold';

                  return (
                    <tr
                      key={cust.id}
                      className="hover:bg-[#FCF1E5]/40 transition-colors group"
                    >
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleSelect(cust.id)}
                          className="rounded border-[#EEEEEE] text-[#E67E00] focus:ring-0"
                        />
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#0E0E0E] text-xs flex items-center gap-2">
                          <span>{cust.name}</span>
                          {cust.tags.includes('VIP') && (
                            <span className="px-1.5 py-0.2 bg-[#0E0E0E] text-white text-[9px] font-bold rounded-full uppercase">VIP</span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#545454] font-medium flex items-center gap-2 mt-0.5">
                          <span>{cust.phone}</span>
                          <span>•</span>
                          <span className="text-[#E67E00] font-bold">{cust.leadSource}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-[#545454] max-w-[200px] truncate" title={cust.product}>
                        {cust.product}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#0E0E0E] text-xs">
                        ৳{cust.orderValue.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#0E0E0E]">{cust.leadScore}</span>
                          <div className="w-12 bg-[#EEEEEE] h-2 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${cust.leadScore >= 80 ? 'bg-[#008F2F]' : cust.leadScore >= 50 ? 'bg-[#E67E00]' : 'bg-[#8F8F8F]'}`}
                              style={{ width: `${cust.leadScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-0.5 text-[10px] uppercase rounded-full tracking-wider ${statusBadge}`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#545454] text-[11px]">
                        {cust.assignedSales}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => alert(`Printing lead profile for ${cust.name}`)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="Print Lead Summary"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${cust.name} - ${cust.phone}`);
                              alert('Copied customer contact info!');
                            }}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="Copy Contact Info"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleViewCustomer(cust.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="View Customer Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleViewCustomer(cust.id)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                            title="Edit Customer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="p-3.5 bg-[#FCF1E5]/30 border-t border-[#EEEEEE] flex items-center justify-between text-xs">
          <span className="text-[#545454] font-medium">
            Showing {paginatedCustomers.length} of {filteredCustomers.length} total entries
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-4 py-1.5 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] rounded-full text-xs font-semibold disabled:opacity-40 transition-all"
            >
              Previous
            </button>
            <span className="text-xs font-bold text-[#0E0E0E] px-2">
              Page {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-4 py-1.5 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] rounded-full text-xs font-semibold disabled:opacity-40 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTION DESIGN: SLEEK OFF-CANVAS SLIDE-OVER DRAWER FOR DETAILS        */}
      {/* ========================================================================= */}
      {isSlideOverOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 overflow-hidden backdrop-blur-xs bg-black/40 flex justify-end animate-fadeIn">
          
          {/* Backdrop Click to Close */}
          <div 
            className="absolute inset-0"
            onClick={() => setIsSlideOverOpen(false)}
          />

          {/* Slide-over Content Drawer */}
          <div className="relative w-full max-w-xl bg-white h-full shadow-2xl border-l border-black/20 flex flex-col justify-between overflow-y-auto scrollbar-thin z-10 animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-black/10 sticky top-0 bg-white/95 backdrop-blur-md z-20 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase text-orange-600 tracking-wider block">
                  Customer Profile & CRM Timeline
                </span>
                <h2 className="text-lg font-black text-black flex items-center gap-2 mt-0.5">
                  {selectedCustomer.name}
                  <span className="px-2 py-0.5 bg-black text-white text-[10px] font-black rounded uppercase">
                    {selectedCustomer.status}
                  </span>
                </h2>
              </div>
              <button
                onClick={() => setIsSlideOverOpen(false)}
                className="p-2 bg-neutral-100 hover:bg-neutral-200 text-black rounded-xl transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body Content */}
            <div className="p-5 space-y-6 flex-1">
              
              {/* Basic Contact Info Box */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-black/10 space-y-2 text-xs font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-bold">Phone Number:</span>
                  <span className="font-extrabold text-black">{selectedCustomer.phone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-bold">Email Address:</span>
                  <span className="font-bold text-black">{selectedCustomer.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-bold">Delivery Address:</span>
                  <span className="font-bold text-black">{selectedCustomer.address}</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-black/5">
                  <span className="text-neutral-500 font-bold">Lead Source:</span>
                  <span className="font-black text-orange-600">{selectedCustomer.leadSource}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 font-bold">Assigned Representative:</span>
                  <span className="font-extrabold text-black">{selectedCustomer.assignedSales}</span>
                </div>
              </div>

              {/* QUICK ACTIONS GRID (Clean Orange & Black Buttons) */}
              <div>
                <label className="text-[11px] font-black text-black uppercase tracking-wider block mb-2.5">
                  Quick Operations & Actions
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  
                  {/* Call Button */}
                  <button
                    onClick={() => setActiveModal('call')}
                    className="p-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <Phone className="w-4 h-4 text-orange-500" />
                    <span>Call Customer</span>
                  </button>

                  {/* WhatsApp Button */}
                  <button
                    onClick={() => setActiveModal('whatsapp')}
                    className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-2xs"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>

                  {/* Email Button */}
                  <button
                    onClick={() => setActiveModal('email')}
                    className="p-2.5 bg-white border border-black hover:bg-neutral-100 text-black rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-orange-500" />
                    <span>Send Email</span>
                  </button>

                  {/* Schedule Follow-up */}
                  <button
                    onClick={() => setActiveModal('schedule')}
                    className="p-2.5 bg-white border border-black hover:bg-neutral-100 text-black rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-black" />
                    <span>Schedule</span>
                  </button>

                  {/* Apply Discount */}
                  <button
                    onClick={() => setActiveModal('discount')}
                    className="p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                  >
                    <Percent className="w-4 h-4" />
                    <span>Discount</span>
                  </button>

                  {/* Create Order / Sell Again */}
                  <button
                    onClick={handleSellAgain}
                    className="p-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4 text-orange-500" />
                    <span>Create Order</span>
                  </button>

                  {/* Receive Payment */}
                  <button
                    onClick={() => setActiveModal('receivePayment')}
                    className="p-2.5 bg-white border border-black hover:bg-neutral-100 text-black rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                  >
                    <CreditCard className="w-4 h-4 text-orange-500" />
                    <span>Payment</span>
                  </button>

                  {/* Mark Delivered */}
                  <button
                    onClick={() => handleStatusChange('Delivered')}
                    className="p-2.5 bg-black hover:bg-neutral-800 text-white rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Delivered</span>
                  </button>

                </div>
              </div>

              {/* Order & Payment Summary Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-neutral-50 rounded-2xl border border-black/10 text-xs">
                  <span className="text-neutral-500 font-bold block">Total Purchases</span>
                  <span className="text-lg font-black text-black mt-0.5 block">
                    ৳{selectedCustomer.orderInfo.totalPurchase.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-semibold">
                    {selectedCustomer.orderInfo.totalOrders} Orders Placed
                  </span>
                </div>

                <div className="p-3.5 bg-neutral-50 rounded-2xl border border-black/10 text-xs">
                  <span className="text-neutral-500 font-bold block">Payment Due</span>
                  <span className="text-lg font-black text-orange-500 mt-0.5 block">
                    ৳{selectedCustomer.paymentInfo.dueAmount.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-semibold">
                    {selectedCustomer.paymentInfo.paymentStatus}
                  </span>
                </div>
              </div>

              {/* AI Smart Suggestions Card */}
              <div className="p-4 bg-orange-50/60 border border-orange-200 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-black text-orange-600">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Conversion Recommendations</span>
                </div>
                <div className="text-neutral-800 font-medium space-y-1 text-[11px]">
                  <div>• <strong>Best Contact Window:</strong> {selectedCustomer.aiSuggestions.bestTimeToContact}</div>
                  <div>• <strong>Purchase Likelihood:</strong> {selectedCustomer.aiSuggestions.chanceToPurchase}%</div>
                  <div>• <strong>Cross-Sell Pitch:</strong> {selectedCustomer.aiSuggestions.crossSellSuggestion}</div>
                </div>
              </div>

              {/* Notes & Comments Input Section */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-black uppercase tracking-wider block">
                  Add Sales Note
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Type a note about this customer..."
                    className="flex-1 px-3 py-2 bg-white border border-black/20 rounded-xl text-xs font-medium text-black focus:outline-none focus:border-orange-500"
                  />
                  <button
                    onClick={handleAddNote}
                    className="px-3 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all"
                  >
                    Save
                  </button>
                </div>

                {/* Notes List */}
                <div className="space-y-2 mt-3">
                  {selectedCustomer.notes.map(note => (
                    <div key={note.id} className="p-3 bg-neutral-50 border border-black/10 rounded-xl text-xs">
                      <p className="font-medium text-black">{note.text}</p>
                      <div className="text-[10px] text-neutral-400 font-bold mt-1 flex justify-between">
                        <span>{note.author}</span>
                        <span>{note.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="space-y-2">
                <label className="text-[11px] font-black text-black uppercase tracking-wider block">
                  Activity Timeline
                </label>
                <div className="space-y-2 border-l-2 border-black/10 pl-3">
                  {selectedCustomer.activityTimeline.map(act => (
                    <div key={act.id} className="text-xs space-y-0.5 relative">
                      <div className="w-2 h-2 rounded-full bg-orange-500 absolute -left-[17px] top-1" />
                      <div className="font-extrabold text-black">{act.title}</div>
                      <div className="text-neutral-500">{act.desc}</div>
                      <div className="text-[10px] text-neutral-400 font-bold">{act.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-black/10 bg-neutral-50 flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-500">Customer ID: {selectedCustomer.id}</span>
              <button
                onClick={() => setIsSlideOverOpen(false)}
                className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-all"
              >
                Close Panel
              </button>
            </div>

          </div>
        </div>
      )}

      {/* QUICK ACTION MODALS */}

      {/* 1. Log Call Modal */}
      {activeModal === 'call' && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h3 className="font-black text-base text-black flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                Log Call with {selectedCustomer.name}
              </h3>
              <button onClick={() => setActiveModal(null)}><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">Call Discussion Notes</label>
              <textarea
                rows={3}
                value={callNotes}
                onChange={(e) => setCallNotes(e.target.value)}
                placeholder="Details of conversation with customer..."
                className="w-full p-3 bg-neutral-50 border border-black/20 rounded-xl text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setActiveModal(null)} className="px-3 py-2 bg-neutral-100 text-black font-bold text-xs rounded-xl">Cancel</button>
              <button onClick={handleLogCall} className="px-4 py-2 bg-orange-500 text-white font-black text-xs rounded-xl">Complete & Log Call</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. WhatsApp Modal */}
      {activeModal === 'whatsapp' && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h3 className="font-black text-base text-black flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-orange-500" />
                Send WhatsApp Message
              </h3>
              <button onClick={() => setActiveModal(null)}><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">Message Text</label>
              <textarea
                rows={3}
                value={whatsappMsg}
                onChange={(e) => setWhatsappMsg(e.target.value)}
                className="w-full p-3 bg-neutral-50 border border-black/20 rounded-xl text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setActiveModal(null)} className="px-3 py-2 bg-neutral-100 text-black font-bold text-xs rounded-xl">Cancel</button>
              <button onClick={handleSendWhatsApp} className="px-4 py-2 bg-orange-500 text-white font-black text-xs rounded-xl">Open WhatsApp App</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Schedule Follow-up Modal */}
      {activeModal === 'schedule' && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h3 className="font-black text-base text-black flex items-center gap-2">
                <Calendar className="w-4 h-4 text-orange-500" />
                Schedule Follow-up
              </h3>
              <button onClick={() => setActiveModal(null)}><X className="w-4 h-4" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-neutral-600 block mb-1">Follow-up Date</label>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-black/20 rounded-xl text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-neutral-600 block mb-1">Time</label>
                <input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full p-2.5 bg-neutral-50 border border-black/20 rounded-xl text-xs font-bold"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setActiveModal(null)} className="px-3 py-2 bg-neutral-100 text-black font-bold text-xs rounded-xl">Cancel</button>
              <button onClick={handleSaveSchedule} className="px-4 py-2 bg-black text-white font-black text-xs rounded-xl">Set Follow-up Reminder</button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Receive Payment Modal */}
      {activeModal === 'receivePayment' && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black/20 rounded-2xl p-5 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-black/10 pb-3">
              <h3 className="font-black text-base text-black flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-orange-500" />
                Receive Customer Payment
              </h3>
              <button onClick={() => setActiveModal(null)}><X className="w-4 h-4" /></button>
            </div>
            <div>
              <label className="text-xs font-bold text-neutral-600 block mb-1">Payment Amount (৳)</label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full p-2.5 bg-neutral-50 border border-black/20 rounded-xl text-base font-black text-black"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setActiveModal(null)} className="px-3 py-2 bg-neutral-100 text-black font-bold text-xs rounded-xl">Cancel</button>
              <button onClick={handleReceivePayment} className="px-4 py-2 bg-orange-500 text-white font-black text-xs rounded-xl">Confirm Payment</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
