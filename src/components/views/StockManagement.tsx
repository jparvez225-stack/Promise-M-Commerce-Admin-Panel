import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  RotateCcw, 
  Columns, 
  Copy, 
  FileSpreadsheet, 
  FileText, 
  Printer, 
  Download, 
  Check, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Minus, 
  ChevronDown, 
  SlidersHorizontal, 
  Barcode as BarcodeIcon, 
  QrCode, 
  Layers, 
  RefreshCw, 
  Building2, 
  Calendar, 
  History,
  X,
  ArrowUpDown,
  CheckSquare,
  Square,
  ArrowLeft,
  Trash2,
  Tag,
  Edit3,
  ExternalLink,
  Store
} from 'lucide-react';
import { StockItem, StockAuditLog, StockSubTab } from '../../types';
import { OUTLETS, INITIAL_STOCK_ITEMS, INITIAL_STOCK_AUDIT_LOGS } from '../../data/mockStockData';

interface StockManagementProps {
  activeSubTab?: StockSubTab;
  onSubTabChange?: (tab: StockSubTab) => void;
}

interface BarcodeSelectedProduct {
  id: string;
  item: StockItem;
  quantity: number;
  customBarcode?: string;
  customPrice?: number;
  checked?: boolean;
}

export const StockManagement: React.FC<StockManagementProps> = ({
  activeSubTab = 'ALL_STOCK',
  onSubTabChange
}) => {
  // Current Active Sub-View (ALL_STOCK | ALL_BARCODE | STOCK_ADJUSTMENT)
  const [currentTab, setCurrentTab] = useState<StockSubTab>(activeSubTab);

  // Sync tab with props
  React.useEffect(() => {
    if (activeSubTab) {
      setCurrentTab(activeSubTab);
    }
  }, [activeSubTab]);

  const handleTabSwitch = (tab: StockSubTab) => {
    setCurrentTab(tab);
    if (onSubTabChange) {
      onSubTabChange(tab);
    }
  };

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Core Data State
  const [stockItems, setStockItems] = useState<StockItem[]>(INITIAL_STOCK_ITEMS);
  const [auditLogs, setAuditLogs] = useState<StockAuditLog[]>(INITIAL_STOCK_AUDIT_LOGS);
  const [selectedOutlet, setSelectedOutlet] = useState<string>('Kallyanpur Outlet Stock');

  // =========================================================================
  // VIEW 1: ALL STOCK (MATCHING IMAGE 1 WITH CTA "Stock Adjustment")
  // =========================================================================
  
  // Top Filter State
  const [filterInStock, setFilterInStock] = useState<boolean>(true); // Qty > 0
  const [filterOutOfStock, setFilterOutOfStock] = useState<boolean>(true); // Qty = 0
  const [filterNegativeStock, setFilterNegativeStock] = useState<boolean>(true); // Qty < 0
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  // Table Controls State
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isColumnModalOpen, setIsColumnModalOpen] = useState<boolean>(false);

  // Column Visibility Config
  const [visibleColumns, setVisibleColumns] = useState({
    index: true,
    title: true,
    brand: true,
    category: true,
    sku: true,
    barcode: true,
    purchaseRate: true,
    qty: true,
    subtotal: true
  });

  // Filtered Stock Items
  const filteredStockItems = useMemo(() => {
    return stockItems.filter((item) => {
      // 1. Outlet filter
      if (selectedOutlet !== 'All Outlets' && item.outlet !== selectedOutlet) {
        return false;
      }

      // 2. Stock Qty condition
      const isPositive = item.qty > 0;
      const isZero = item.qty === 0;
      const isNegative = item.qty < 0;

      const matchesStockType = 
        (filterInStock && isPositive) ||
        (filterOutOfStock && isZero) ||
        (filterNegativeStock && isNegative);

      if (!matchesStockType) return false;

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = 
          item.title.toLowerCase().includes(q) ||
          item.brand.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.sku.toLowerCase().includes(q) ||
          item.barcode.toLowerCase().includes(q);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [stockItems, selectedOutlet, filterInStock, filterOutOfStock, filterNegativeStock, searchQuery]);

  // Calculate live Total Stock Value
  const totalStockValue = useMemo(() => {
    return stockItems.reduce((sum, item) => {
      if (item.purchaseRate && item.qty > 0) {
        return sum + (item.purchaseRate * item.qty);
      }
      return sum;
    }, 5245092.59);
  }, [stockItems]);

  const totalEntries = 4471;
  const displayTotal = filteredStockItems.length > 0 ? totalEntries : 0;
  const totalPages = Math.ceil(displayTotal / rowsPerPage) || 1;

  const paginatedStockItems = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredStockItems.slice(start, start + rowsPerPage);
  }, [filteredStockItems, currentPage, rowsPerPage]);

  // Reset Filters Handler
  const handleResetFilters = () => {
    setFilterInStock(true);
    setFilterOutOfStock(true);
    setFilterNegativeStock(true);
    setFromDate('');
    setToDate('');
    setSearchQuery('');
    setCurrentPage(1);
    showToast('Stock filters reset to default');
  };

  // Copy Table Data Handler
  const handleCopyTable = () => {
    const header = ['#', 'Title', 'Brand', 'Categories', 'Sku', 'Barcode', 'Purchase Rate(BDT)', 'Qty', 'Subtotal(BDT)'].join('\t');
    const rows = filteredStockItems.map((item, idx) => {
      const subtotal = item.purchaseRate !== null ? `TK ${(item.purchaseRate * item.qty).toFixed(2)}` : 'N/A';
      const rate = item.purchaseRate !== null ? `TK ${item.purchaseRate.toFixed(2)}` : 'N/A';
      return [idx + 1, item.title, item.brand, item.category, item.sku, item.barcode, rate, item.qty, subtotal].join('\t');
    });
    navigator.clipboard.writeText([header, ...rows].join('\n'));
    showToast('Stock data copied to clipboard!');
  };

  // Export CSV Handler
  const handleExportCSV = () => {
    const header = ['#', 'Title', 'Brand', 'Categories', 'Sku', 'Barcode', 'Purchase Rate(BDT)', 'Qty', 'Subtotal(BDT)'];
    const rows = filteredStockItems.map((item, idx) => {
      const subtotal = item.purchaseRate !== null ? (item.purchaseRate * item.qty).toFixed(2) : 'N/A';
      const rate = item.purchaseRate !== null ? item.purchaseRate.toFixed(2) : 'N/A';
      return [idx + 1, `"${item.title}"`, `"${item.brand}"`, `"${item.category}"`, item.sku, item.barcode, rate, item.qty, subtotal];
    });
    const csvContent = 'data:text/csv;charset=utf-8,' + [header.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Stock_Report_${selectedOutlet.replace(/\s+/g, '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV export downloaded successfully!');
  };

  // Print Handler
  const handlePrint = () => {
    window.print();
  };

  // =========================================================================
  // VIEW 2: ALL BARCODE (REPLICATING SCREENSHOT 1 & 2 PRECISELY)
  // =========================================================================
  
  // Selected products for Barcode Printing table
  const [barcodeSelectedProducts, setBarcodeSelectedProducts] = useState<BarcodeSelectedProduct[]>([]);

  // Product search in Barcode view
  const [barcodeDropdownSearch, setBarcodeDropdownSearch] = useState<string>('');
  const [isBarcodeDropdownOpen, setIsBarcodeDropdownOpen] = useState<boolean>(false);
  const [isBarcodeModalOpen, setIsBarcodeModalOpen] = useState<boolean>(false);
  const [barcodeLayout, setBarcodeLayout] = useState<'sheet-24' | 'sheet-40' | 'single' | 'roll'>('sheet-24');
  const [showPriceOnBarcode, setShowPriceOnBarcode] = useState<boolean>(true);
  const [showOutletOnBarcode, setShowOutletOnBarcode] = useState<boolean>(true);

  // Filtered dropdown options for barcode product selection
  const barcodeProductOptions = useMemo(() => {
    if (!barcodeDropdownSearch.trim()) return stockItems;
    const q = barcodeDropdownSearch.toLowerCase().trim();
    return stockItems.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.barcode.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  }, [stockItems, barcodeDropdownSearch]);

  // Add Product to Barcode Table
  const handleAddProductToBarcode = (product: StockItem) => {
    const existing = barcodeSelectedProducts.find(p => p.id === product.id);
    if (existing) {
      setBarcodeSelectedProducts(prev => 
        prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p)
      );
    } else {
      setBarcodeSelectedProducts(prev => [
        ...prev,
        {
          id: product.id,
          item: product,
          quantity: 1,
          customBarcode: product.barcode,
          customPrice: product.mrp,
          checked: true
        }
      ]);
    }
    setIsBarcodeDropdownOpen(false);
    setBarcodeDropdownSearch('');
    showToast(`Added "${product.title}" to barcode list`);
  };

  // Toggle Checkmark on Barcode Product
  const handleToggleCheckBarcodeProduct = (id: string) => {
    setBarcodeSelectedProducts(prev => 
      prev.map(p => p.id === id ? { ...p, checked: p.checked === false ? true : false } : p)
    );
  };

  // Remove Product from Barcode Table
  const handleRemoveBarcodeProduct = (id: string) => {
    setBarcodeSelectedProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from barcode list');
  };

  // Update Quantity in Barcode Table
  const handleUpdateBarcodeQuantity = (id: string, qty: number) => {
    setBarcodeSelectedProducts(prev => 
      prev.map(p => p.id === id ? { ...p, quantity: Math.max(1, qty) } : p)
    );
  };

  // Update Custom Barcode Code (Adjust Barcode feature)
  const handleUpdateCustomBarcode = (id: string, newBarcode: string) => {
    setBarcodeSelectedProducts(prev => 
      prev.map(p => p.id === id ? { ...p, customBarcode: newBarcode } : p)
    );
  };

  // Generate Barcode Click
  const handleGenerateBarcode = () => {
    if (barcodeSelectedProducts.length === 0) {
      showToast('Please select at least one product to generate barcode');
      return;
    }
    setIsBarcodeModalOpen(true);
  };

  // =========================================================================
  // VIEW 3: STOCK ADJUSTMENT (IMAGE 2 REPLICA)
  // =========================================================================

  const [adjustmentSearch, setAdjustmentSearch] = useState<string>('Mango');
  const [adjustmentReason, setAdjustmentReason] = useState<string>('Physical Audit Count Rebalance');
  const [adjustmentRows, setAdjustmentRows] = useState<{ [id: string]: { qty: number; checked: boolean } }>(() => {
    const initial: { [id: string]: { qty: number; checked: boolean } } = {};
    INITIAL_STOCK_ITEMS.forEach(item => {
      initial[item.id] = {
        qty: 0,
        checked: item.title.toLowerCase().includes('mango')
      };
    });
    return initial;
  });

  // Filtered items for Adjustment View
  const adjustmentFilteredItems = useMemo(() => {
    if (!adjustmentSearch.trim()) return stockItems;
    const q = adjustmentSearch.toLowerCase().trim();
    return stockItems.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.barcode.includes(q)
    );
  }, [stockItems, adjustmentSearch]);

  const handleToggleCheck = (id: string) => {
    setAdjustmentRows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        checked: !prev[id]?.checked
      }
    }));
  };

  const handleUpdateAdjQty = (id: string, val: number) => {
    setAdjustmentRows(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        qty: val,
        checked: true
      }
    }));
  };

  const handleSaveAdjustments = () => {
    const updatedStock = [...stockItems];
    const newLogs: StockAuditLog[] = [];
    let modifiedCount = 0;

    (Object.entries(adjustmentRows) as [string, { qty: number; checked: boolean }][]).forEach(([id, data]) => {
      if (data.checked) {
        const itemIdx = updatedStock.findIndex(i => i.id === id);
        if (itemIdx !== -1) {
          const prev = updatedStock[itemIdx];
          const newQty = data.qty;
          const diff = newQty - prev.qty;

          if (diff !== 0 || data.qty !== 0) {
            updatedStock[itemIdx] = {
              ...prev,
              qty: newQty,
              lastUpdated: '2026-08-17 - 08:08 AM'
            };

            newLogs.unshift({
              id: `aud-${Date.now()}-${id}`,
              date: '17 August, 2026 | 08:08 AM',
              productTitle: prev.title,
              sku: prev.sku,
              outlet: selectedOutlet,
              previousQty: prev.qty,
              newQty: newQty,
              difference: diff,
              reason: adjustmentReason,
              adjustedBy: 'Suyen (Admin)'
            });
            modifiedCount++;
          }
        }
      }
    });

    setStockItems(updatedStock);
    if (newLogs.length > 0) {
      setAuditLogs(prev => [...newLogs, ...prev]);
    }
    showToast(`Successfully saved adjustments for ${modifiedCount} items!`);
    handleTabSwitch('ALL_STOCK');
  };

  return (
    <div className="space-y-4 pb-12 font-sans select-none">
      
      {/* ========================================================= */}
      {/* TOP HEADER - TITLE & STOCK ADJUSTMENT BUTTON              */}
      {/* ========================================================= */}
      <div className="bg-[#F7F4F1] border border-[#E2D9D2] rounded-xl px-4 py-3 shadow-2xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#B8623B] text-white flex items-center justify-center shadow-xs shrink-0">
            <Package className="w-4.5 h-4.5" />
          </div>
          <h1 className="text-base sm:text-lg font-black text-[#0E0E0E] uppercase tracking-wider">
            STOCK MANAGEMENT
          </h1>
        </div>

        <button
          onClick={() => handleTabSwitch('STOCK_ADJUSTMENT')}
          className="px-4 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Stock Adjustment</span>
        </button>
      </div>

      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#008F2F] text-white px-4 py-2.5 rounded-lg shadow-xl font-bold text-xs flex items-center gap-2 border border-white/20 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* 1. VIEW: ALL STOCK (MATCHING THEME DESIGN SYSTEM)         */}
      {/* ========================================================= */}
      {currentTab === 'ALL_STOCK' && (
        <div className="space-y-4">
          
          {/* Top Filter Container */}
          <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              
              {/* Left Checkboxes: In Stock, Out of Stock, Negative Stock */}
              <div className="lg:col-span-4 space-y-2 bg-[#F7F4F1]/30 p-3 rounded border border-[#E2D9D2]/50">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#0E0E0E] hover:text-[#B8623B] transition-colors">
                  <input
                    type="checkbox"
                    checked={filterInStock}
                    onChange={(e) => setFilterInStock(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E2D9D2] accent-[#B8623B] cursor-pointer"
                  />
                  <span>In Stock (Qty &gt; 0)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#0E0E0E] hover:text-[#B8623B] transition-colors">
                  <input
                    type="checkbox"
                    checked={filterOutOfStock}
                    onChange={(e) => setFilterOutOfStock(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E2D9D2] accent-[#B8623B] cursor-pointer"
                  />
                  <span>Out of Stock (Qty = 0)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-[#0E0E0E] hover:text-[#B8623B] transition-colors">
                  <input
                    type="checkbox"
                    checked={filterNegativeStock}
                    onChange={(e) => setFilterNegativeStock(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E2D9D2] accent-[#B8623B] cursor-pointer"
                  />
                  <span>Negative Stock (Qty &lt; 0)</span>
                </label>
              </div>

              {/* Center Date Pickers */}
              <div className="lg:col-span-5 space-y-2 bg-[#F7F4F1]/30 p-3 rounded border border-[#E2D9D2]/50">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-wider">From Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-wider">To Date</span>
                  <div className="relative">
                    <input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="lg:col-span-3 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setCurrentPage(1);
                    showToast('Stock view filtered successfully');
                  }}
                  className="w-full py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>

                <button
                  onClick={handleResetFilters}
                  className="w-full py-2 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] text-xs font-semibold uppercase rounded-full transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={() => setIsColumnModalOpen(!isColumnModalOpen)}
                  className="w-full py-2 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] text-xs font-semibold uppercase rounded-full transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Columns className="w-3.5 h-3.5" />
                  <span>Show/Hide Columns</span>
                </button>
              </div>

            </div>
          </div>

          {/* Column Visibility Selector Modal/Popover */}
          {isColumnModalOpen && (
            <div className="p-4 bg-white border border-[#E2D9D2] rounded-lg shadow-lg space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-2">
                <span className="text-xs font-extrabold text-[#0E0E0E] uppercase tracking-wider">
                  Select Visible Columns
                </span>
                <button onClick={() => setIsColumnModalOpen(false)} className="text-[#8F8F8F] hover:text-[#0E0E0E] cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-bold text-[#545454]">
                {Object.keys(visibleColumns).map((colKey) => (
                  <label key={colKey} className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-[#F7F4F1]/50">
                    <input
                      type="checkbox"
                      checked={visibleColumns[colKey as keyof typeof visibleColumns]}
                      onChange={(e) => setVisibleColumns(prev => ({ ...prev, [colKey]: e.target.checked }))}
                      className="accent-[#B8623B] rounded cursor-pointer"
                    />
                    <span className="capitalize">{colKey.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Main Table Card Header */}
          <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#EEEEEE]">
              
              {/* Title */}
              <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
                <Package className="w-5 h-5 text-[#B8623B]" />
                <span>All Stock</span>
              </h2>

            </div>

            {/* Table Action Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
              
              {/* Left Action Buttons */}
              <div className="flex items-center flex-wrap gap-1.5 text-xs font-bold">
                
                {/* Show N rows selector */}
                <select
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none cursor-pointer"
                >
                  <option value={10}>Show 10 rows</option>
                  <option value={25}>Show 25 rows</option>
                  <option value={50}>Show 50 rows</option>
                  <option value={100}>Show 100 rows</option>
                </select>

                {/* Show/Hide Columns pill */}
                <button
                  onClick={() => setIsColumnModalOpen(!isColumnModalOpen)}
                  className="px-3 py-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] rounded text-xs font-bold transition-all cursor-pointer"
                >
                  Show/Hide Columns
                </button>

                {/* Copy */}
                <button
                  onClick={handleCopyTable}
                  className="px-3 py-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </button>

                {/* CSV */}
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <FileSpreadsheet className="w-3 h-3" />
                  <span>CSV</span>
                </button>

                {/* Excel */}
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  <span>Excel</span>
                </button>

                {/* PDF */}
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3 h-3" />
                  <span>PDF</span>
                </button>

                {/* Print */}
                <button
                  onClick={handlePrint}
                  className="px-3 py-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                >
                  <Printer className="w-3 h-3" />
                  <span>Print</span>
                </button>
              </div>

              {/* Right Search Input */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#8F8F8F]">Search:</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search product, SKU, barcode..."
                  className="px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none w-48 sm:w-64"
                />
              </div>

            </div>

            {/* DATA TABLE (Standard Brand Layout) */}
            <div className="overflow-x-auto border border-[#E2D9D2] rounded shadow-2xs bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#B8623B] text-white text-[11px] font-extrabold uppercase tracking-wider sticky top-0 z-10 select-none">
                    {visibleColumns.index && <th className="p-3 w-12 text-center border-b border-[#B8623B]">#</th>}
                    {visibleColumns.title && <th className="p-3 border-b border-[#B8623B]">Title</th>}
                    {visibleColumns.brand && <th className="p-3 border-b border-[#B8623B]">Brand</th>}
                    {visibleColumns.category && <th className="p-3 border-b border-[#B8623B]">Categories</th>}
                    {visibleColumns.sku && <th className="p-3 font-mono border-b border-[#B8623B]">Sku</th>}
                    {visibleColumns.barcode && <th className="p-3 font-mono border-b border-[#B8623B]">Barcode</th>}
                    {visibleColumns.purchaseRate && <th className="p-3 text-right border-b border-[#B8623B]">Purchase Rate (BDT)</th>}
                    {visibleColumns.qty && <th className="p-3 text-center border-b border-[#B8623B]">Qty</th>}
                    {visibleColumns.subtotal && <th className="p-3 text-right border-b border-[#B8623B]">Subtotal (BDT)</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#545454] bg-white">
                  {paginatedStockItems.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-[#8F8F8F] font-bold">
                        No stock records match the selected filters.
                      </td>
                    </tr>
                  ) : (
                    paginatedStockItems.map((item, idx) => {
                      const rowNum = (currentPage - 1) * rowsPerPage + idx + 1;
                      const subtotal = item.purchaseRate !== null ? item.purchaseRate * item.qty : null;

                      return (
                        <tr 
                          key={item.id} 
                          className="hover:bg-[#F7F4F1]/40 transition-colors"
                        >
                          {visibleColumns.index && (
                            <td className="p-3 text-center font-bold text-[#8F8F8F]">
                              {rowNum}
                            </td>
                          )}

                          {visibleColumns.title && (
                            <td className="p-3 font-bold text-[#0E0E0E]">
                              {item.title}
                            </td>
                          )}

                          {visibleColumns.brand && (
                            <td className="p-3 text-[#545454] font-medium">
                              {item.brand}
                            </td>
                          )}

                          {visibleColumns.category && (
                            <td className="p-3 text-[#545454] text-[11px] font-medium">
                              {item.category}
                            </td>
                          )}

                          {visibleColumns.sku && (
                            <td className="p-3 font-mono text-[#545454] text-[11px]">
                              {item.sku}
                            </td>
                          )}

                          {visibleColumns.barcode && (
                            <td className="p-3 font-mono text-[#545454] text-[11px]">
                              {item.barcode}
                            </td>
                          )}

                          {visibleColumns.purchaseRate && (
                            <td className="p-3 text-right font-mono font-bold text-[#0E0E0E]">
                              {item.purchaseRate !== null ? (
                                `TK ${item.purchaseRate.toFixed(2)}`
                              ) : (
                                <span className="text-[#8F8F8F] font-sans font-normal">N/A</span>
                              )}
                            </td>
                          )}

                          {visibleColumns.qty && (
                            <td className="p-3 text-center">
                              <span
                                className={`inline-block px-2.5 py-0.5 rounded font-extrabold text-xs ${
                                  item.qty > 0
                                    ? 'bg-[#ECFFE8] text-[#008F2F]'
                                    : item.qty < 0
                                    ? 'bg-red-50 text-[#FF0000] border border-red-200'
                                    : 'bg-slate-100 text-slate-600 font-bold'
                                }`}
                              >
                                {item.qty}
                              </span>
                            </td>
                          )}

                          {visibleColumns.subtotal && (
                            <td className="p-3 text-right font-mono font-bold text-[#008F2F]">
                              {subtotal !== null ? (
                                `TK ${subtotal.toFixed(2)}`
                              ) : (
                                <span className="text-[#8F8F8F] font-sans font-normal">N/A</span>
                              )}
                            </td>
                          )}
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="p-4 border-t border-[#EEEEEE] bg-[#F7F4F1]/20 rounded-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bold text-[#8F8F8F]">
              <div>
                Showing {paginatedStockItems.length > 0 ? (currentPage - 1) * rowsPerPage + 1 : 0} to {Math.min(currentPage * rowsPerPage, displayTotal)} of {displayTotal.toLocaleString()} entries
              </div>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="px-3 py-1.5 border border-[#E2D9D2] bg-[#F7F4F1] rounded text-[#B8623B] hover:bg-[#B8623B] hover:text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>

                {[1, 2, 3, 4, 5].map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded flex items-center justify-center font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-[#B8623B] text-white shadow-2xs'
                        : 'border border-[#E2D9D2] bg-[#F7F4F1] text-[#B8623B] hover:bg-[#B8623B] hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <span className="px-1 text-[#8F8F8F]">...</span>

                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-2.5 h-7 rounded border border-[#E2D9D2] bg-[#F7F4F1] text-[#B8623B] hover:bg-[#B8623B] hover:text-white font-bold transition-all cursor-pointer ${
                    currentPage === totalPages ? 'bg-[#B8623B] text-white' : ''
                  }`}
                >
                  {totalPages}
                </button>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="px-3 py-1.5 border border-[#E2D9D2] bg-[#F7F4F1] rounded text-[#B8623B] hover:bg-[#B8623B] hover:text-white font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. VIEW: ALL BARCODE (MATCHING THEME DESIGN SYSTEM)       */}
      {/* ========================================================= */}
      {currentTab === 'ALL_BARCODE' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 shadow-2xs space-y-6">
            
            {/* Top Search & Select Input */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#0E0E0E] uppercase tracking-wider">
                Search & Select Products to print barcode
              </label>

              <div className="relative">
                <div 
                  onClick={() => setIsBarcodeDropdownOpen(!isBarcodeDropdownOpen)}
                  className="w-full px-4 py-2.5 bg-white border border-[#EEEEEE] rounded text-xs flex items-center justify-between cursor-pointer hover:border-[#B8623B] focus:border-[#008F2F] transition-all shadow-2xs"
                >
                  <span className="text-gray-400 font-medium">
                    Select Product
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                </div>

                {/* Dropdown Menu */}
                {isBarcodeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2D9D2] rounded-lg shadow-xl z-30 max-h-72 overflow-y-auto">
                    <div className="p-2 border-b border-[#EEEEEE] sticky top-0 bg-white">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 text-[#8F8F8F] absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={barcodeDropdownSearch}
                          onChange={(e) => setBarcodeDropdownSearch(e.target.value)}
                          placeholder="Type product name, SKU, or Barcode..."
                          className="w-full pl-8 pr-3 py-1.5 bg-[#F7F4F1]/30 border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                          autoFocus
                        />
                      </div>
                    </div>
                    <div className="py-1">
                      {barcodeProductOptions.length === 0 ? (
                        <div className="p-4 text-center text-xs text-[#8F8F8F] font-bold">
                          No matching products found.
                        </div>
                      ) : (
                        barcodeProductOptions.map(product => (
                          <div
                            key={product.id}
                            onClick={() => handleAddProductToBarcode(product)}
                            className="px-4 py-2.5 hover:bg-[#F7F4F1]/60 cursor-pointer flex items-center justify-between text-xs border-b border-[#EEEEEE] last:border-0"
                          >
                            <div>
                              <div className="font-bold text-[#0E0E0E]">{product.title}</div>
                              <div className="text-[11px] text-[#545454] font-mono">
                                Barcode: <span className="font-bold text-[#0E0E0E]">{product.barcode}</span> | SKU: {product.sku} | Stock: {product.qty}
                              </div>
                            </div>
                            <span className="px-2 py-1 bg-[#F7F4F1] text-[#B8623B] font-mono font-bold rounded text-[11px] border border-[#E2D9D2]">
                              TK {product.mrp}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* BARCODE TABLE (Exact Replica of Uploaded Screenshot: #, Title, Brand, Sku, Barcode, MRP(BDT), Purchase Rate(BDT), Qty, Action) */}
            <div className="overflow-x-auto border border-[#E2D9D2] rounded shadow-2xs bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#B8623B] text-white text-[11px] font-extrabold uppercase tracking-wider sticky top-0 z-10 select-none">
                    <th className="p-3 w-12 text-center border-b border-[#B8623B]">#</th>
                    <th className="p-3 border-b border-[#B8623B]">Title</th>
                    <th className="p-3 border-b border-[#B8623B]">Brand</th>
                    <th className="p-3 font-mono border-b border-[#B8623B]">Sku</th>
                    <th className="p-3 font-mono border-b border-[#B8623B]">Barcode</th>
                    <th className="p-3 text-right font-mono border-b border-[#B8623B]">MRP(BDT)</th>
                    <th className="p-3 text-right font-mono border-b border-[#B8623B]">Purchase Rate(BDT)</th>
                    <th className="p-3 text-center w-28 border-b border-[#B8623B]">Qty</th>
                    <th className="p-3 text-center w-24 border-b border-[#B8623B]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#545454] bg-white">
                  {barcodeSelectedProducts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-12 text-center text-[#8F8F8F] font-bold">
                        No product selected. Please select a product from above to print barcodes.
                      </td>
                    </tr>
                  ) : (
                    barcodeSelectedProducts.map((p, idx) => (
                      <tr key={p.id} className="hover:bg-[#F7F4F1]/40 transition-colors">
                        
                        {/* # */}
                        <td className="p-3 text-center font-bold text-[#8F8F8F]">
                          {idx + 1}
                        </td>

                        {/* Title */}
                        <td className="p-3 font-bold text-[#0E0E0E]">
                          {p.item.title}
                        </td>

                        {/* Brand */}
                        <td className="p-3 text-[#545454]">
                          {p.item.brand}
                        </td>

                        {/* Sku */}
                        <td className="p-3 font-mono text-[#545454] text-[11px]">
                          {p.item.sku}
                        </td>

                        {/* Barcode */}
                        <td className="p-3 font-mono text-[#545454] text-[11px]">
                          <input
                            type="text"
                            value={p.customBarcode ?? p.item.barcode}
                            onChange={(e) => handleUpdateCustomBarcode(p.id, e.target.value)}
                            className="px-2 py-0.5 bg-white border border-[#EEEEEE] rounded text-[11px] font-mono font-bold text-[#0E0E0E] w-24 focus:outline-none focus:border-[#008F2F]"
                            title="Click to edit barcode"
                          />
                        </td>

                        {/* MRP(BDT) */}
                        <td className="p-3 text-right font-mono font-bold text-[#0E0E0E]">
                          {p.item.mrp}
                        </td>

                        {/* Purchase Rate(BDT) */}
                        <td className="p-3 text-right font-mono font-bold text-[#0E0E0E]">
                          {p.item.purchaseRate !== null ? p.item.purchaseRate : 'N/A'}
                        </td>

                        {/* Qty */}
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            value={p.quantity}
                            onChange={(e) => handleUpdateBarcodeQuantity(p.id, Number(e.target.value))}
                            min={1}
                            className="w-20 px-2.5 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] text-center"
                          />
                        </td>

                        {/* Action: Tick Mark & X Buttons */}
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Tick / Check Button */}
                            <button
                              type="button"
                              onClick={() => handleToggleCheckBarcodeProduct(p.id)}
                              title={p.checked !== false ? "Checked / Active" : "Click to Check"}
                              className={`w-7 h-7 flex items-center justify-center rounded transition-all cursor-pointer shadow-2xs border ${
                                p.checked !== false
                                  ? 'bg-[#ECFFE8] text-[#008F2F] border-[#008F2F]/40 hover:bg-[#008F2F] hover:text-white'
                                  : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200 hover:text-gray-600'
                              }`}
                            >
                              <Check className="w-4 h-4 stroke-[2.5]" />
                            </button>

                            {/* X / Remove Button */}
                            <button
                              type="button"
                              onClick={() => handleRemoveBarcodeProduct(p.id)}
                              title="Remove item"
                              className="w-7 h-7 flex items-center justify-center rounded bg-red-50 hover:bg-[#FF0000] text-[#FF0000] hover:text-white border border-red-200 transition-all cursor-pointer shadow-2xs"
                            >
                              <X className="w-4 h-4 stroke-[2.5]" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Right CTA Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <div className="text-xs font-semibold text-[#8F8F8F]">
                Total Products: <span className="font-bold text-[#0E0E0E]">{barcodeSelectedProducts.length}</span> | Total Labels to Print: <span className="font-bold text-[#008F2F]">{barcodeSelectedProducts.reduce((sum, p) => sum + p.quantity, 0)}</span>
              </div>

              <button
                onClick={handleGenerateBarcode}
                className="px-6 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white font-semibold text-xs rounded-full uppercase transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <BarcodeIcon className="w-4 h-4" />
                <span>Generate Barcode</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. VIEW: STOCK ADJUSTMENT (MATCHING THEME DESIGN SYSTEM)   */}
      {/* ========================================================= */}
      {currentTab === 'STOCK_ADJUSTMENT' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 shadow-2xs space-y-4">
            
            {/* Title & Header with Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EEEEEE]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTabSwitch('ALL_STOCK')}
                  className="p-2 rounded border border-[#E2D9D2] bg-[#F7F4F1] text-[#B8623B] hover:bg-[#B8623B] hover:text-white transition-all cursor-pointer"
                  title="Back to All Stock"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
                    Stock Adjustment
                  </h2>
                  <p className="text-xs text-[#8F8F8F] font-medium">
                    Audit count corrections, damage reporting, or quick manual inventory count sync
                  </p>
                </div>
              </div>

              {/* Reason Selector & Save Button */}
              <div className="flex items-center gap-2 flex-wrap">
                <select
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F]"
                >
                  <option value="Physical Audit Count Rebalance">Physical Audit Count Rebalance</option>
                  <option value="Damaged Goods Discard">Damaged Goods Discard</option>
                  <option value="Supplier Return">Supplier Return</option>
                  <option value="Inventory Transfer Intake">Inventory Transfer Intake</option>
                  <option value="POS Discrepancy Correction">POS Discrepancy Correction</option>
                </select>

                <button
                  onClick={handleSaveAdjustments}
                  className="px-4 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Adjustments</span>
                </button>
              </div>
            </div>

            {/* Top Search Input */}
            <div className="w-full">
              <input
                type="text"
                value={adjustmentSearch}
                onChange={(e) => setAdjustmentSearch(e.target.value)}
                placeholder="Search Title, Brand, SKU or Barcode..."
                className="w-full px-4 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
              />
            </div>

            {/* Adjustment Table */}
            <div className="overflow-x-auto border border-[#E2D9D2] rounded shadow-2xs bg-white">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#B8623B] text-white text-[11px] font-extrabold uppercase tracking-wider sticky top-0 z-10 select-none">
                    <th className="p-3 w-12 text-center border-b border-[#B8623B]">#</th>
                    <th className="p-3 border-b border-[#B8623B]">Title</th>
                    <th className="p-3 border-b border-[#B8623B]">Brand</th>
                    <th className="p-3 font-mono border-b border-[#B8623B]">Sku</th>
                    <th className="p-3 font-mono border-b border-[#B8623B]">Barcode</th>
                    <th className="p-3 text-right font-mono border-b border-[#B8623B]">MRP (BDT)</th>
                    <th className="p-3 text-right font-mono border-b border-[#B8623B]">Purchase Rate (BDT)</th>
                    <th className="p-3 text-center w-36 border-b border-[#B8623B]">Qty</th>
                    <th className="p-3 text-center w-24 border-b border-[#B8623B]">Check</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#545454] bg-white">
                  {adjustmentFilteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-[#8F8F8F] font-bold">
                        No products match "{adjustmentSearch}".
                      </td>
                    </tr>
                  ) : (
                    adjustmentFilteredItems.map((item, idx) => {
                      const isChecked = adjustmentRows[item.id]?.checked ?? false;
                      const adjQty = adjustmentRows[item.id]?.qty ?? 0;

                      return (
                        <tr 
                          key={item.id}
                          className={`transition-colors ${isChecked ? 'bg-[#F7F4F1]/40 hover:bg-[#F7F4F1]/70' : 'hover:bg-slate-50'}`}
                        >
                          <td className="p-3 text-center font-bold text-[#8F8F8F]">
                            {idx + 1}
                          </td>

                          <td className="p-3 font-bold text-[#0E0E0E]">
                            {item.title}
                          </td>

                          <td className="p-3 text-[#545454]">
                            {item.brand}
                          </td>

                          <td className="p-3 font-mono text-[#545454] text-[11px]">
                            {item.sku}
                          </td>

                          <td className="p-3 font-mono text-[#545454] text-[11px]">
                            {item.barcode}
                          </td>

                          <td className="p-3 text-right font-mono font-bold text-[#0E0E0E]">
                            {item.mrp}
                          </td>

                          <td className="p-3 text-right font-mono font-bold text-[#0E0E0E]">
                            {item.purchaseRate !== null ? item.purchaseRate : 'N/A'}
                          </td>

                          {/* Editable Qty Input */}
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleUpdateAdjQty(item.id, Math.max(0, adjQty - 1))}
                                className="w-6 h-6 rounded bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] flex items-center justify-center font-black transition-all cursor-pointer"
                              >
                                -
                              </button>
                              <input
                                type="number"
                                value={adjQty}
                                onChange={(e) => handleUpdateAdjQty(item.id, Number(e.target.value))}
                                className="w-16 px-2 py-1 bg-white border border-[#EEEEEE] rounded text-center text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F]"
                              />
                              <button
                                type="button"
                                onClick={() => handleUpdateAdjQty(item.id, adjQty + 1)}
                                className="w-6 h-6 rounded bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] flex items-center justify-center font-black transition-all cursor-pointer"
                              >
                                +
                              </button>
                            </div>
                          </td>

                          {/* Check Indicator */}
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleToggleCheck(item.id)}
                              className="p-1 rounded-full hover:bg-[#F7F4F1] transition-transform active:scale-95 cursor-pointer"
                            >
                              {isChecked ? (
                                <div className="w-6 h-6 rounded-full bg-[#008F2F] text-white flex items-center justify-center shadow-xs">
                                  <Check className="w-4 h-4 stroke-[3]" />
                                </div>
                              ) : (
                                <div className="w-6 h-6 rounded-full bg-white border-2 border-[#CBD5E1]" />
                              )}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Commit Bar */}
            <div className="p-4 bg-[#F7F4F1] border border-[#E2D9D2] rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs font-bold text-[#0E0E0E]">
                Target Outlet: <span className="text-[#B8623B]">{selectedOutlet}</span> • Items ready to commit: <span className="text-[#008F2F]">{(Object.values(adjustmentRows) as { qty: number; checked: boolean }[]).filter(r => r.checked).length}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleTabSwitch('ALL_STOCK')}
                  className="px-4 py-2 bg-white border border-[#E2D9D2] text-[#B8623B] hover:bg-[#F7F4F1] font-bold text-xs rounded transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveAdjustments}
                  className="px-5 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Apply & Update Stock Counts</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* BARCODE GENERATOR PRINT PREVIEW MODAL                                     */}
      {/* ========================================================================= */}
      {isBarcodeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 space-y-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#4EA8DE] text-white flex items-center justify-center">
                  <BarcodeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#0E0E0E]">
                    Printable Barcode Labels
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Standard Code-128 & EAN-13 thermal sticker sheet preview
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-[#008F2F] hover:bg-[#007527] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Labels</span>
                </button>
                <button
                  onClick={() => setIsBarcodeModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Layout Options */}
            <div className="flex items-center gap-4 text-xs font-bold bg-slate-50 p-3 rounded-lg flex-wrap">
              <span className="text-slate-600">Layout Format:</span>
              {(['sheet-24', 'sheet-40', 'single'] as const).map(fmt => (
                <button
                  key={fmt}
                  onClick={() => setBarcodeLayout(fmt)}
                  className={`px-3 py-1.5 rounded transition-all ${
                    barcodeLayout === fmt ? 'bg-[#0E0E0E] text-white' : 'bg-white border border-slate-200 text-slate-700'
                  }`}
                >
                  {fmt === 'sheet-24' ? 'A4 Sheet (24 Stickers)' : fmt === 'sheet-40' ? 'A4 Sheet (40 Stickers)' : 'Thermal Roll (50x25mm)'}
                </button>
              ))}

              <label className="flex items-center gap-1.5 cursor-pointer ml-auto text-slate-700">
                <input
                  type="checkbox"
                  checked={showPriceOnBarcode}
                  onChange={(e) => setShowPriceOnBarcode(e.target.checked)}
                  className="accent-[#008F2F] rounded"
                />
                <span>Include MRP (BDT)</span>
              </label>
            </div>

            {/* Sticker Preview Grid */}
            <div className="p-6 bg-slate-100 rounded-xl max-h-[460px] overflow-y-auto border border-slate-200">
              <div className={`grid gap-3 ${
                barcodeLayout === 'sheet-24' ? 'grid-cols-2 sm:grid-cols-3' :
                barcodeLayout === 'sheet-40' ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 max-w-lg mx-auto'
              }`}>
                {barcodeSelectedProducts.flatMap(item => 
                  Array.from({ length: item.quantity }).map((_, qIdx) => (
                    <div 
                      key={`${item.id}-${qIdx}`}
                      className="bg-white border border-slate-300 p-3 rounded-md flex flex-col items-center justify-between text-center shadow-xs text-[#0E0E0E] font-sans"
                    >
                      <div className="text-[10px] font-black uppercase tracking-wider text-slate-800 truncate w-full">
                        {selectedOutlet.split(' ')[0]} Store BD
                      </div>
                      <div className="text-[11px] font-bold text-[#0E0E0E] line-clamp-1 w-full mt-0.5">
                        {item.item.title}
                      </div>

                      {/* Barcode Vector Graphic Simulation */}
                      <div className="my-2 flex flex-col items-center">
                        <div className="flex items-end justify-center gap-[2px] h-10 px-2 py-1">
                          {[3,1,2,1,4,2,1,3,1,2,3,1,1,4,2,1,2,3,1,2,4,1,3,2,1,3,1,2,1,4,2].map((w, bIdx) => (
                            <div
                              key={bIdx}
                              style={{ width: `${w}px`, height: bIdx % 5 === 0 ? '100%' : '85%' }}
                              className="bg-black"
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[11px] font-bold tracking-widest text-[#0E0E0E]">
                          *{item.customBarcode ?? item.item.barcode}*
                        </span>
                      </div>

                      {showPriceOnBarcode && (
                        <div className="text-[11px] font-black text-[#008F2F]">
                          MRP: TK {item.item.mrp}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-500">
                Ready for thermal POS or A4 label paper printing
              </span>
              <button
                onClick={() => setIsBarcodeModalOpen(false)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs rounded-lg"
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
