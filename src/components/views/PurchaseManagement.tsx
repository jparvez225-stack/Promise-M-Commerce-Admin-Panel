import React, { useState, useMemo } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Eye, 
  Printer,
  Copy,
  Edit3,
  Calendar, 
  Paperclip, 
  Trash2, 
  CheckCircle2, 
  UserPlus, 
  Send, 
  FileText,
  DollarSign,
  Truck,
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';
import { PurchaseSubTab } from '../../types';

interface PurchaseManagementProps {
  activeSubTab: PurchaseSubTab;
  onSubTabChange: (subTab: PurchaseSubTab) => void;
}

export interface PurchaseItem {
  id: string;
  sl: number;
  date: string;
  poNo: string;
  lotNo: string;
  refNo: string;
  supplier: string;
  supplierEmail: string;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
  status: 'Received' | 'Pending' | 'Ordered';
}

export interface ProductLineItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  discountFlat: number;
  shippingCharge: number;
  profitMargin: number; // e.g., 20%
}

const INITIAL_PURCHASES: PurchaseItem[] = [
  {
    id: 'pur-1',
    sl: 1,
    date: '23/07/2026 - 12:00 AM',
    poNo: 'PO#2474',
    lotNo: '461501120213951',
    refNo: '646',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 176200.00,
    paidAmount: 176200.00,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-2',
    sl: 2,
    date: '20/07/2026 - 12:00 AM',
    poNo: 'PO#2473',
    lotNo: '71340559519215463',
    refNo: '645',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 31000.00,
    paidAmount: 31000.00,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-3',
    sl: 3,
    date: '20/07/2026 - 12:00 AM',
    poNo: 'PO#2472',
    lotNo: '191955192123416',
    refNo: '644',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 8888.64,
    paidAmount: 8888.64,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-4',
    sl: 4,
    date: '19/07/2026 - 12:00 AM',
    poNo: 'PO#2471',
    lotNo: '339418421146363',
    refNo: '643',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 4608.00,
    paidAmount: 4608.00,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-5',
    sl: 5,
    date: '19/07/2026 - 12:00 AM',
    poNo: 'PO#2470',
    lotNo: '829641657372435',
    refNo: '642',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 3700.12,
    paidAmount: 3700.12,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-6',
    sl: 6,
    date: '19/07/2026 - 12:00 AM',
    poNo: 'PO#2469',
    lotNo: '186588572772425',
    refNo: '641',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 32904.00,
    paidAmount: 32904.00,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-7',
    sl: 7,
    date: '16/07/2026 - 12:00 AM',
    poNo: 'PO#2468',
    lotNo: '583360865580051',
    refNo: '640',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 165000.00,
    paidAmount: 165000.00,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-8',
    sl: 8,
    date: '16/07/2026 - 12:00 AM',
    poNo: 'PO#2467',
    lotNo: '654540208214392',
    refNo: '639',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 9250.08,
    paidAmount: 9250.08,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-9',
    sl: 9,
    date: '16/07/2026 - 12:00 AM',
    poNo: 'PO#2466',
    lotNo: '981462271794054',
    refNo: '638',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 7800.00,
    paidAmount: 7800.00,
    dueAmount: 0.00,
    status: 'Received',
  },
  {
    id: 'pur-10',
    sl: 10,
    date: '16/07/2026 - 12:00 AM',
    poNo: 'PO#2465',
    lotNo: '422929670575925',
    refNo: '637',
    supplier: 'Outlet Paid',
    supplierEmail: 'zaber3145@gmail.com',
    totalAmount: 3300.00,
    paidAmount: 3300.00,
    dueAmount: 0.00,
    status: 'Received',
  },
];

const AVAILABLE_SAMPLE_PRODUCTS = [
  { id: 'prod-1', name: 'Cotton Casual T-Shirt (Navy Blue / L)', defaultCost: 350 },
  { id: 'prod-2', name: 'Slim Fit Denim Jeans (Dark Indigo / 32)', defaultCost: 850 },
  { id: 'prod-3', name: 'Leather Formal Shoes (Brown / 42)', defaultCost: 2100 },
  { id: 'prod-4', name: 'Wireless Ergonomic Mouse', defaultCost: 650 },
  { id: 'prod-5', name: 'Smart Fitness Tracker Watch', defaultCost: 1800 },
];

export const PurchaseManagement: React.FC<PurchaseManagementProps> = ({
  activeSubTab,
  onSubTabChange
}) => {
  // Purchases List State
  const [purchases, setPurchases] = useState<PurchaseItem[]>(INITIAL_PURCHASES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPurchaseDetails, setSelectedPurchaseDetails] = useState<PurchaseItem | null>(null);

  // Pagination State
  const [purchasePage, setPurchasePage] = useState<number>(1);
  const pageSize = 15;

  // Add Purchase Form State
  const [supplier, setSupplier] = useState<string>('Outlet Paid');
  const [refNo, setRefNo] = useState<string>('EX: AF982GF');
  const [lotNo, setLotNo] = useState<string>('571987161219809');
  const [purchaseDate, setPurchaseDate] = useState<string>('2026-07-27');
  const [purchaseStatus, setPurchaseStatus] = useState<'Received' | 'Pending' | 'Ordered'>('Pending');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);

  // Line Items in Form
  const [lineItems, setLineItems] = useState<ProductLineItem[]>([
    {
      id: 'item-1',
      productId: 'prod-1',
      productName: 'Cotton Casual T-Shirt (Navy Blue / L)',
      quantity: 50,
      unitCost: 350,
      discountFlat: 10,
      shippingCharge: 5,
      profitMargin: 25,
    }
  ]);

  const [productSearchInput, setProductSearchInput] = useState<string>('');

  // Shipping & Payment Form State
  const [shippingDetails, setShippingDetails] = useState<string>('');
  const [shippingCharge, setShippingCharge] = useState<number>(0);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentDate, setPaymentDate] = useState<string>('2026-07-27');
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');

  // Supplier Modal state
  const [showSupplierModal, setShowSupplierModal] = useState<boolean>(false);
  const [newSupplierName, setNewSupplierName] = useState<string>('');
  const [newSupplierEmail, setNewSupplierEmail] = useState<string>('');

  const [formSuccessMsg, setFormSuccessMsg] = useState<string>('');

  // Add product to table
  const handleAddProductToTable = (product: typeof AVAILABLE_SAMPLE_PRODUCTS[0]) => {
    const existingIndex = lineItems.findIndex(i => i.productId === product.id);
    if (existingIndex > -1) {
      const updated = [...lineItems];
      updated[existingIndex].quantity += 1;
      setLineItems(updated);
    } else {
      setLineItems([
        ...lineItems,
        {
          id: `line-${Date.now()}`,
          productId: product.id,
          productName: product.name,
          quantity: 1,
          unitCost: product.defaultCost,
          discountFlat: 0,
          shippingCharge: 0,
          profitMargin: 20,
        }
      ]);
    }
    setProductSearchInput('');
  };

  const handleUpdateLineItem = (id: string, field: keyof ProductLineItem, val: number) => {
    setLineItems(lineItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: val };
      }
      return item;
    }));
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  // Calculations
  const calculateNetUnitCost = (item: ProductLineItem) => {
    return item.unitCost - item.discountFlat + item.shippingCharge;
  };

  const calculateSubtotal = (item: ProductLineItem) => {
    return calculateNetUnitCost(item) * item.quantity;
  };

  const calculateUnitSellingPrice = (item: ProductLineItem) => {
    const netCost = calculateNetUnitCost(item);
    return netCost + (netCost * (item.profitMargin / 100));
  };

  const totalQuantity = lineItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = lineItems.reduce((acc, item) => acc + calculateSubtotal(item), 0) + (shippingCharge || 0);

  // Submit Add Purchase Form
  const handleSubmitPurchase = (e: React.FormEvent) => {
    e.preventDefault();

    if (lineItems.length === 0) {
      alert('Please add at least one product to the purchase order.');
      return;
    }

    const newPoNo = `PO#${Math.floor(2475 + Math.random() * 500)}`;
    const newPurchase: PurchaseItem = {
      id: `pur-${Date.now()}`,
      sl: purchases.length + 1,
      date: `${purchaseDate.split('-').reverse().join('/')} - 12:00 AM`,
      poNo: newPoNo,
      lotNo: lotNo || Math.floor(100000000000000 + Math.random() * 900000000000000).toString(),
      refNo: refNo.replace('EX: ', '') || `${Math.floor(650 + Math.random() * 200)}`,
      supplier: supplier,
      supplierEmail: 'supplier@company.com',
      totalAmount: totalAmount,
      paidAmount: paymentAmount > 0 ? paymentAmount : totalAmount,
      dueAmount: totalAmount - (paymentAmount > 0 ? paymentAmount : totalAmount),
      status: purchaseStatus,
    };

    setPurchases([newPurchase, ...purchases]);
    setFormSuccessMsg(`Purchase Order ${newPoNo} created successfully!`);
    
    setTimeout(() => {
      setFormSuccessMsg('');
      onSubTabChange('MANAGE_PURCHASE');
    }, 1500);
  };

  // Filter purchases for list view
  const filteredPurchases = purchases.filter(p => {
    const q = searchQuery.toLowerCase();
    return (
      p.poNo.toLowerCase().includes(q) ||
      p.supplier.toLowerCase().includes(q) ||
      p.refNo.toLowerCase().includes(q) ||
      p.lotNo.toLowerCase().includes(q)
    );
  });

  const totalPurchasePages = Math.ceil(filteredPurchases.length / pageSize) || 1;
  const paginatedPurchases = useMemo(() => {
    const start = (purchasePage - 1) * pageSize;
    return filteredPurchases.slice(start, start + pageSize);
  }, [filteredPurchases, purchasePage]);

  return (
    <div className="space-y-6">
      
      {/* ========================================================================= */}
      {/* 1. MANAGE PURCHASES VIEW */}
      {/* ========================================================================= */}
      {activeSubTab === 'MANAGE_PURCHASE' && (
        selectedPurchaseDetails ? (
          /* FULL PURCHASE DETAILS PAGE VIEW (INLINE, NOT A POP-UP MODAL) */
          (() => {
            const getPurchaseDetailsData = (p: PurchaseItem) => {
              let products = [];
              if (p.poNo === 'PO#2474' || p.totalAmount === 176200) {
                products = [
                  {
                    sl: 1,
                    name: 'Promise Mart Frameless Smart Tv 55 inch 123tv55',
                    quantity: 2,
                    unitCost: 38800.00,
                    discountFlat: 0.00,
                    shippingCharge: 0.00,
                    netUnitCost: 38800.0,
                    subtotal: 77600.00,
                    profitMargin: 11200.00,
                    unitSellingPrice: 50000.00,
                  },
                  {
                    sl: 2,
                    name: 'Promise Mart Frameless Smart Tv 50 inch 123tv50',
                    quantity: 2,
                    unitCost: 28800.00,
                    discountFlat: 0.00,
                    shippingCharge: 0.00,
                    netUnitCost: 28800.0,
                    subtotal: 57600.00,
                    profitMargin: 11200.00,
                    unitSellingPrice: 40000.00,
                  },
                  {
                    sl: 3,
                    name: 'Promise Mart Frameless Smart Tv 43 inch 123tv43',
                    quantity: 2,
                    unitCost: 20500.00,
                    discountFlat: 0.00,
                    shippingCharge: 0.00,
                    netUnitCost: 20500.0,
                    subtotal: 41000.00,
                    profitMargin: 9500.00,
                    unitSellingPrice: 30000.00,
                  }
                ];
              } else {
                const half = p.totalAmount / 2;
                products = [
                  {
                    sl: 1,
                    name: `Promise Wholesale Stock Lot (${p.poNo})`,
                    quantity: 2,
                    unitCost: half / 2,
                    discountFlat: 0.00,
                    shippingCharge: 0.00,
                    netUnitCost: half / 2,
                    subtotal: half,
                    profitMargin: (half / 2) * 0.25,
                    unitSellingPrice: (half / 2) * 1.25,
                  },
                  {
                    sl: 2,
                    name: `Mart Consumer Electronics Pack (${p.poNo})`,
                    quantity: 2,
                    unitCost: half / 2,
                    discountFlat: 0.00,
                    shippingCharge: 0.00,
                    netUnitCost: half / 2,
                    subtotal: half,
                    profitMargin: (half / 2) * 0.20,
                    unitSellingPrice: (half / 2) * 1.20,
                  }
                ];
              }

              const purchaseTotal = products.reduce((acc, item) => acc + (item.unitCost * item.quantity), 0);
              const totalAmountVal = products.reduce((acc, item) => acc + item.subtotal, 0);

              return {
                products,
                purchaseTotal,
                totalAmountVal,
                shippingCharge: 0.00,
                shippingDetails: 'paid',
                paymentHistory: [
                  {
                    sl: 1,
                    paidAmount: p.paidAmount,
                    paymentDate: p.date.split('-')[0].trim(),
                    paymentMethod: 'Cash',
                    bankName: '',
                    bankAccountNo: '',
                    bankChequeNo: ''
                  }
                ]
              };
            };

            const detailsData = getPurchaseDetailsData(selectedPurchaseDetails);

            return (
              <div className="space-y-6 animate-fadeIn">
                
                {/* Details Page Header Bar */}
                <div className="bg-white p-5 rounded-2xl border border-[#E2D9D2] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedPurchaseDetails(null)}
                      className="p-2.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white border border-[#E2D9D2] rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold text-xs shadow-2xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Back to All Purchase</span>
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-lg font-black text-[#0E0E0E]">Purchase Order Details</h1>
                        <span className="px-2.5 py-0.5 bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 text-[10px] font-extrabold uppercase rounded-full">
                          {selectedPurchaseDetails.status}
                        </span>
                      </div>
                      <p className="text-xs text-[#8F8F8F] font-mono mt-0.5">
                        PO Reference: <span className="font-bold text-[#B8623B]">{selectedPurchaseDetails.poNo}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => alert(`Printing Invoice for ${selectedPurchaseDetails.poNo}`)}
                      className="px-4 py-2 bg-white hover:bg-[#F7F4F1] text-[#0E0E0E] border border-[#E2D9D2] rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-[#B8623B]" />
                      <span>Print Invoice</span>
                    </button>
                  </div>
                </div>

                {/* 1. TOP 2 COLUMNS: Basic Information & Purchase Order Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Basic Information */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <div className="w-1.5 h-4 bg-[#B8623B] rounded-full"></div>
                      <h3 className="font-bold text-sm text-[#0E0E0E]">Basic Information</h3>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div className="grid grid-cols-3">
                        <span className="text-[#8F8F8F] font-semibold">Supplier</span>
                        <span className="col-span-2 font-bold text-[#0E0E0E]">: {selectedPurchaseDetails.supplier}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-[#8F8F8F] font-semibold">PO No.</span>
                        <span className="col-span-2 font-bold text-[#0E0E0E]">: {selectedPurchaseDetails.poNo}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-[#8F8F8F] font-semibold">Ref No.</span>
                        <span className="col-span-2 font-bold text-[#0E0E0E]">: {selectedPurchaseDetails.refNo}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-[#8F8F8F] font-semibold">Lot No.</span>
                        <span className="col-span-2 font-mono font-bold text-[#0E0E0E]">: {selectedPurchaseDetails.lotNo}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-[#8F8F8F] font-semibold">Date</span>
                        <span className="col-span-2 font-bold text-[#0E0E0E]">: {selectedPurchaseDetails.date}</span>
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-[#8F8F8F] font-semibold">Status</span>
                        <div className="col-span-2 flex items-center gap-1">
                          <span className="font-bold text-[#0E0E0E]">: </span>
                          <span className="px-2.5 py-0.5 bg-[#ECFFE8] text-[#008F2F] text-[10px] font-extrabold uppercase rounded">
                            {selectedPurchaseDetails.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Order Summary */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                      <div className="w-1.5 h-4 bg-[#B8623B] rounded-full"></div>
                      <h3 className="font-bold text-sm text-[#0E0E0E]">Purchase Order Summary</h3>
                    </div>

                    <div className="space-y-3.5 text-xs">
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-[#8F8F8F] font-semibold">Total Amount</span>
                        <span className="col-span-2 font-black text-sm text-[#0E0E0E]">: ৳{selectedPurchaseDetails.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-[#8F8F8F] font-semibold">Total Paid Amount</span>
                        <span className="col-span-2 font-black text-sm text-[#008F2F]">: ৳{selectedPurchaseDetails.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-[#8F8F8F] font-semibold">Balance</span>
                        <span className="col-span-2 font-black text-sm text-[#0E0E0E]">: ৳{selectedPurchaseDetails.dueAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 2. PRODUCTS TABLE */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-1.5 h-4 bg-[#B8623B] rounded-full"></div>
                    <h3 className="font-bold text-sm text-[#0E0E0E]">Products</h3>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                          <th className="py-3 px-3 text-center border-r border-slate-200">SL</th>
                          <th className="py-3 px-3 border-r border-slate-200 min-w-[220px]">Product Name</th>
                          <th className="py-3 px-3 text-center border-r border-slate-200">Quantity</th>
                          <th className="py-3 px-3 text-right border-r border-slate-200">Unit Cost</th>
                          <th className="py-3 px-3 text-right border-r border-slate-200">Discount (Flat)</th>
                          <th className="py-3 px-3 text-right border-r border-slate-200">Shipping Charge</th>
                          <th className="py-3 px-3 text-right border-r border-slate-200">Net Unit Cost</th>
                          <th className="py-3 px-3 text-right border-r border-slate-200">Subtotal</th>
                          <th className="py-3 px-3 text-right border-r border-slate-200">Profit Margin</th>
                          <th className="py-3 px-3 text-right">Unit Selling Price</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                        {detailsData.products.map((prod) => (
                          <tr key={prod.sl} className="hover:bg-slate-50/80">
                            <td className="py-3 px-3 text-center font-bold text-slate-400 border-r border-slate-200">{prod.sl}</td>
                            <td className="py-3 px-3 font-semibold text-[#0E0E0E] border-r border-slate-200">{prod.name}</td>
                            <td className="py-3 px-3 text-center font-bold text-[#0E0E0E] border-r border-slate-200">{prod.quantity}</td>
                            <td className="py-3 px-3 text-right border-r border-slate-200">৳{prod.unitCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3 px-3 text-right border-r border-slate-200">{prod.discountFlat.toFixed(2)}</td>
                            <td className="py-3 px-3 text-right border-r border-slate-200">{prod.shippingCharge.toFixed(2)}</td>
                            <td className="py-3 px-3 text-right border-r border-slate-200 font-semibold">৳{prod.netUnitCost.toLocaleString('en-US', { minimumFractionDigits: 1 })}</td>
                            <td className="py-3 px-3 text-right border-r border-slate-200 font-bold text-[#0E0E0E]">৳{prod.subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3 px-3 text-right border-r border-slate-200 font-semibold text-emerald-600">৳{prod.profitMargin.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3 px-3 text-right font-bold text-[#B8623B]">৳{prod.unitSellingPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-slate-50 border-t-2 border-slate-200 font-bold text-xs text-[#0E0E0E]">
                          <td colSpan={2} className="py-3 px-3 text-right border-r border-slate-200 uppercase text-[11px] font-extrabold text-slate-500">
                            Purchase Total
                          </td>
                          <td className="py-3 px-3 text-center border-r border-slate-200 font-black text-slate-800">
                            {detailsData.products.reduce((a, b) => a + b.quantity, 0)}
                          </td>
                          <td colSpan={4} className="py-3 px-3 text-right border-r border-slate-200 font-extrabold text-slate-500 uppercase text-[11px]">
                            Total Amount
                          </td>
                          <td className="py-3 px-3 text-right border-r border-slate-200 font-black text-[#008F2F] text-sm">
                            ৳{detailsData.totalAmountVal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </td>
                          <td colSpan={2}></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* 3. ATTACHMENTS & SHIPPING INFORMATION */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Attachments */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs min-h-[120px] flex flex-col">
                    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
                      <div className="w-1.5 h-4 bg-[#B8623B] rounded-full"></div>
                      <h3 className="font-bold text-sm text-[#0E0E0E]">Attachments</h3>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
                      <span className="text-xs text-slate-400 font-medium">No attachments uploaded</span>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2 mb-1 pb-2 border-b border-slate-100">
                      <div className="w-1.5 h-4 bg-[#B8623B] rounded-full"></div>
                      <h3 className="font-bold text-sm text-[#0E0E0E]">Shipping Information</h3>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div className="grid grid-cols-3">
                        <span className="text-[#8F8F8F] font-semibold">Shipping Charge</span>
                        <span className="col-span-2 font-bold text-[#0E0E0E]">: ৳{detailsData.shippingCharge.toFixed(2)}</span>
                      </div>
                      <div className="grid grid-cols-3">
                        <span className="text-[#8F8F8F] font-semibold">Shipping Details</span>
                        <span className="col-span-2 font-bold text-[#0E0E0E]">: {detailsData.shippingDetails}</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 4. PAYMENT HISTORY */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <div className="w-1.5 h-4 bg-[#B8623B] rounded-full"></div>
                    <h3 className="font-bold text-sm text-[#0E0E0E]">Payment History</h3>
                  </div>

                  <div className="overflow-x-auto rounded-xl border border-slate-200">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                          <th className="py-3 px-3 text-center border-r border-slate-200">SL</th>
                          <th className="py-3 px-3 border-r border-slate-200">Paid Amount</th>
                          <th className="py-3 px-3 border-r border-slate-200">Payment Date</th>
                          <th className="py-3 px-3 border-r border-slate-200">Payment Method</th>
                          <th className="py-3 px-3 border-r border-slate-200">Bank Name</th>
                          <th className="py-3 px-3 border-r border-slate-200">Bank Account No.</th>
                          <th className="py-3 px-3">Bank Cheque No.</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 text-slate-700 font-medium">
                        {detailsData.paymentHistory.map((pm) => (
                          <tr key={pm.sl} className="hover:bg-slate-50/80">
                            <td className="py-3 px-3 text-center font-bold text-slate-400 border-r border-slate-200">{pm.sl}</td>
                            <td className="py-3 px-3 font-bold text-[#008F2F] border-r border-slate-200">৳{pm.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                            <td className="py-3 px-3 font-semibold text-[#0E0E0E] border-r border-slate-200">{pm.paymentDate}</td>
                            <td className="py-3 px-3 border-r border-slate-200">{pm.paymentMethod}</td>
                            <td className="py-3 px-3 border-r border-slate-200 text-slate-400">{pm.bankName}</td>
                            <td className="py-3 px-3 border-r border-slate-200 text-slate-400">{pm.bankAccountNo}</td>
                            <td className="py-3 px-3 text-slate-400">{pm.bankChequeNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bottom Back Action Bar */}
                <div className="flex justify-start pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedPurchaseDetails(null)}
                    className="px-6 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white font-bold text-xs rounded-full uppercase transition-all shadow-2xs flex items-center gap-2 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to All Purchase</span>
                  </button>
                </div>

              </div>
            );
          })()
        ) : (
          /* ALL PURCHASES LIST TABLE */
          <div className="space-y-6">
            
            {/* Header Bar with Search & CTA */}
            <div className="bg-white p-5 rounded border border-[#E2D9D2] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#B8623B]" />
                  <span>All Purchase</span>
                </h1>
                <p className="text-xs text-[#545454] font-medium mt-0.5">
                  View, track and manage vendor stock purchases and procurement orders
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Search Bar */}
                <div className="relative flex-1 md:w-64">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Products..."
                    className="w-full pl-3 pr-20 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                  />
                  <button 
                    type="button"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#B8623B] hover:bg-[#944923] text-white font-bold text-xs rounded transition-all"
                  >
                    Search
                  </button>
                </div>

                {/* Add New Purchase CTA */}
                <button
                  onClick={() => onSubTabChange('ADD_PURCHASE')}
                  className="px-4 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add new purchase</span>
                </button>
              </div>
            </div>

            {/* Purchases Table */}
            <div className="bg-white rounded border border-[#E2D9D2] overflow-hidden">
              <div className="p-4 border-b border-[#EEEEEE] bg-[#F7F4F1]/30 flex items-center justify-between">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider">
                  Purchase List
                </h3>
                <span className="text-xs font-bold text-[#8F8F8F]">
                  Showing {filteredPurchases.length} purchases
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#B8623B] text-white uppercase font-bold tracking-wider text-[11px]">
                      <th className="py-3 px-3 w-10 text-center">SL</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">PO No</th>
                      <th className="py-3 px-3">Lot No</th>
                      <th className="py-3 px-3">Ref No</th>
                      <th className="py-3 px-3">Supplier</th>
                      <th className="py-3 px-3 text-right">Total Amount</th>
                      <th className="py-3 px-3 text-right">Paid Amount</th>
                      <th className="py-3 px-3 text-right">Due Amount</th>
                      <th className="py-3 px-3 text-center">Status</th>
                      <th className="py-3 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#545454]">
                    {paginatedPurchases.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F7F4F1]/40 transition-colors">
                        <td className="py-3 px-3 font-bold text-[#8F8F8F] text-center">{p.sl}</td>
                        <td className="py-3 px-3 font-medium text-[#545454] whitespace-nowrap">{p.date}</td>
                        <td className="py-3 px-3 font-bold text-[#0E0E0E]">{p.poNo}</td>
                        <td className="py-3 px-3 font-mono text-[#8F8F8F] text-[11px]">{p.lotNo}</td>
                        <td className="py-3 px-3 font-mono text-[#545454]">{p.refNo}</td>
                        <td className="py-3 px-3">
                          <div className="font-bold text-[#0E0E0E]">{p.supplier}</div>
                          <div className="text-[10px] text-[#8F8F8F] font-mono">{p.supplierEmail}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-[#0E0E0E]">
                          ৳{p.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-[#008F2F]">
                          ৳{p.paidAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-right font-bold text-[#FF0000]">
                          ৳{p.dueAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                            p.status === 'Received' ? 'bg-[#ECFFE8] text-[#008F2F]' : 'bg-[#F7F4F1] text-[#B8623B] border border-[#E2D9D2]'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <div className="flex items-center justify-center">
                            <button 
                              onClick={() => setSelectedPurchaseDetails(p)}
                              className="p-2 text-slate-600 hover:text-[#B8623B] hover:bg-[#F7F4F1] rounded-lg transition-all border border-slate-200 bg-white cursor-pointer shadow-2xs hover:border-[#E2D9D2]"
                              title="View Purchase Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Controls */}
              <div className="p-4 border-t border-[#EEEEEE] bg-[#F7F4F1]/20 flex items-center justify-between text-xs font-bold text-[#8F8F8F]">
                <span>
                  Showing {filteredPurchases.length > 0 ? (purchasePage - 1) * pageSize + 1 : 0} to {Math.min(purchasePage * pageSize, filteredPurchases.length)} of {filteredPurchases.length} results
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    disabled={purchasePage === 1}
                    onClick={() => setPurchasePage(p => Math.max(1, p - 1))}
                    className="w-7 h-7 flex items-center justify-center border border-[#E2D9D2] bg-[#F7F4F1] rounded text-[#B8623B] font-bold disabled:opacity-40"
                  >
                    &lsaquo;
                  </button>
                  {Array.from({ length: totalPurchasePages }, (_, i) => i + 1).map(p => (
                    <button 
                      key={p}
                      onClick={() => setPurchasePage(p)}
                      className={`w-7 h-7 flex items-center justify-center rounded font-bold ${purchasePage === p ? 'bg-[#B8623B] text-white' : 'bg-[#F7F4F1]/50 text-[#0E0E0E]'}`}
                    >
                      {p}
                    </button>
                  ))}
                  <button 
                    disabled={purchasePage === totalPurchasePages}
                    onClick={() => setPurchasePage(p => Math.min(totalPurchasePages, p + 1))}
                    className="w-7 h-7 flex items-center justify-center border border-[#E2D9D2] bg-[#F7F4F1] rounded text-[#B8623B] font-bold disabled:opacity-40"
                  >
                    &rsaquo;
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* ========================================================================= */}
      {/* 2. ADD NEW PURCHASE FORM VIEW */}
      {/* ========================================================================= */}
      {(activeSubTab === 'ADD_PURCHASE') && (
        <div className="space-y-6">
          
          {/* Header Bar */}
          <div className="bg-white p-5 rounded border border-[#E2D9D2] flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#B8623B]" />
                <span>Add New Purchase</span>
              </h1>
              <p className="text-xs text-[#545454] font-medium mt-0.5">
                Create a new vendor procurement record and update inventory stock
              </p>
            </div>

            <button
              onClick={() => onSubTabChange('MANAGE_PURCHASE')}
              className="px-4 py-2 border-1.5 border-[#B8623B] text-[#B8623B] hover:bg-[#F7F4F1] font-semibold text-xs rounded-full transition-all"
            >
              Back to List
            </button>
          </div>

          {formSuccessMsg && (
            <div className="p-4 bg-[#ECFFE8] border border-[#008F2F] text-[#008F2F] text-xs font-bold rounded flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#008F2F] shrink-0" />
              <span>{formSuccessMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmitPurchase} className="space-y-6">

            {/* SECTION 1: Basic Information */}
            <div className="bg-white rounded border border-[#E2D9D2] p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider border-b border-[#EEEEEE] pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8623B]"></span>
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Supplier */}
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Supplier <span className="text-[#FF0000]">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <select
                      value={supplier}
                      onChange={(e) => setSupplier(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                      required
                    >
                      <option value="Outlet Paid">Outlet Paid (zaber3145@gmail.com)</option>
                      <option value="Apex Wholesale Corp">Apex Wholesale Corp</option>
                      <option value="Global Tex Fabrics Ltd">Global Tex Fabrics Ltd</option>
                    </select>

                    <button
                      type="button"
                      onClick={() => setShowSupplierModal(true)}
                      className="px-3.5 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold rounded-full flex items-center gap-1 shrink-0 transition-all uppercase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Supplier</span>
                    </button>
                  </div>
                </div>

                {/* Reference No */}
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Reference No <span className="text-[#FF0000]">*</span>
                  </label>
                  <input 
                    type="text"
                    value={refNo}
                    onChange={(e) => setRefNo(e.target.value)}
                    placeholder="EX: AF982GF"
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                    required
                  />
                </div>

                {/* Lot No */}
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Lot No <span className="text-[#FF0000]">*</span>
                  </label>
                  <input 
                    type="text"
                    value={lotNo}
                    onChange={(e) => setLotNo(e.target.value)}
                    placeholder="571987161219809"
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                    required
                  />
                </div>

                {/* Purchase Date */}
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Purchase Date <span className="text-[#FF0000]">*</span>
                  </label>
                  <input 
                    type="date"
                    value={purchaseDate}
                    onChange={(e) => setPurchaseDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                    required
                  />
                </div>

                {/* Purchase Status */}
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Purchase Status <span className="text-[#FF0000]">*</span>
                  </label>
                  <select
                    value={purchaseStatus}
                    onChange={(e) => setPurchaseStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Received">Received</option>
                    <option value="Ordered">Ordered</option>
                  </select>
                </div>

                {/* Attach Documents */}
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Attach Documents
                  </label>
                  <div className="flex items-center gap-2">
                    <input 
                      type="file"
                      onChange={(e) => setAttachedFile(e.target.files ? e.target.files[0] : null)}
                      className="w-full text-xs text-[#545454] file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#F7F4F1] file:text-[#B8623B] hover:file:bg-[#E2D9D2]"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION 2: Products Line Items */}
            <div className="bg-white rounded border border-[#E2D9D2] p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider border-b border-[#EEEEEE] pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B8623B]"></span>
                  <span>Products</span>
                </div>
              </h3>

              {/* Product Search Input Bar */}
              <div className="relative">
                <input 
                  type="text"
                  value={productSearchInput}
                  onChange={(e) => setProductSearchInput(e.target.value)}
                  placeholder="Enter Product name / SKU / Scan bar code"
                  className="w-full px-4 py-2.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                />

                {/* Auto Suggestions dropdown */}
                {productSearchInput.trim().length > 0 && (
                  <div className="absolute left-0 right-0 top-12 bg-white border border-[#E2D9D2] rounded shadow-lg z-20 overflow-hidden divide-y divide-[#EEEEEE]">
                    {AVAILABLE_SAMPLE_PRODUCTS.filter(p => p.name.toLowerCase().includes(productSearchInput.toLowerCase())).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => handleAddProductToTable(p)}
                        className="w-full px-4 py-2.5 text-left text-xs font-bold text-[#0E0E0E] hover:bg-[#F7F4F1] flex items-center justify-between"
                      >
                        <span>{p.name}</span>
                        <span className="text-[#8F8F8F] font-normal">৳{p.defaultCost}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Products Table */}
              <div className="overflow-x-auto border border-[#E2D9D2] rounded">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#B8623B] text-white uppercase font-bold text-[10px] tracking-wider">
                      <th className="py-2.5 px-3 w-8 text-center">SL</th>
                      <th className="py-2.5 px-3 min-w-[200px]">Product Name</th>
                      <th className="py-2.5 px-3 w-20">Quantity</th>
                      <th className="py-2.5 px-3 w-24">Unit Cost</th>
                      <th className="py-2.5 px-3 w-24">Discount (Flat)</th>
                      <th className="py-2.5 px-3 w-24">Shipping Charge</th>
                      <th className="py-2.5 px-3 w-24 text-right">Net Unit Cost</th>
                      <th className="py-2.5 px-3 w-24 text-right">Subtotal</th>
                      <th className="py-2.5 px-3 w-24">Profit Margin (%)</th>
                      <th className="py-2.5 px-3 w-28 text-right">Unit Selling Price</th>
                      <th className="py-2.5 px-3 w-10 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                    {lineItems.length === 0 ? (
                      <tr>
                        <td colSpan={11} className="text-center py-8 text-[#8F8F8F] font-bold">
                          No products added yet. Use the search bar above to add products.
                        </td>
                      </tr>
                    ) : (
                      lineItems.map((item, idx) => {
                        const netUnitCost = calculateNetUnitCost(item);
                        const subtotal = calculateSubtotal(item);
                        const sellingPrice = calculateUnitSellingPrice(item);

                        return (
                          <tr key={item.id} className="hover:bg-[#F7F4F1]/40">
                            <td className="py-2.5 px-3 font-bold text-[#8F8F8F] text-center">{idx + 1}</td>
                            <td className="py-2.5 px-3 font-bold text-[#0E0E0E]">{item.productName}</td>
                            
                            {/* Quantity Input */}
                            <td className="py-2.5 px-3">
                              <input 
                                type="number" 
                                value={item.quantity} 
                                onChange={(e) => handleUpdateLineItem(item.id, 'quantity', Number(e.target.value))}
                                className="w-16 px-2 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-center focus:border-[#008F2F]"
                                min={1}
                              />
                            </td>

                            {/* Unit Cost */}
                            <td className="py-2.5 px-3">
                              <input 
                                type="number" 
                                value={item.unitCost} 
                                onChange={(e) => handleUpdateLineItem(item.id, 'unitCost', Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold focus:border-[#008F2F]"
                              />
                            </td>

                            {/* Discount Flat */}
                            <td className="py-2.5 px-3">
                              <input 
                                type="number" 
                                value={item.discountFlat} 
                                onChange={(e) => handleUpdateLineItem(item.id, 'discountFlat', Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold focus:border-[#008F2F]"
                              />
                            </td>

                            {/* Shipping Charge */}
                            <td className="py-2.5 px-3">
                              <input 
                                type="number" 
                                value={item.shippingCharge} 
                                onChange={(e) => handleUpdateLineItem(item.id, 'shippingCharge', Number(e.target.value))}
                                className="w-20 px-2 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold focus:border-[#008F2F]"
                              />
                            </td>

                            {/* Net Unit Cost */}
                            <td className="py-2.5 px-3 text-right font-bold text-[#0E0E0E]">
                              ৳{netUnitCost.toFixed(2)}
                            </td>

                            {/* Subtotal */}
                            <td className="py-2.5 px-3 text-right font-bold text-[#B8623B]">
                              ৳{subtotal.toFixed(2)}
                            </td>

                            {/* Profit Margin % */}
                            <td className="py-2.5 px-3">
                              <input 
                                type="number" 
                                value={item.profitMargin} 
                                onChange={(e) => handleUpdateLineItem(item.id, 'profitMargin', Number(e.target.value))}
                                className="w-16 px-2 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold focus:border-[#008F2F]"
                              />
                            </td>

                            {/* Unit Selling Price */}
                            <td className="py-2.5 px-3 text-right font-bold text-[#008F2F]">
                              ৳{sellingPrice.toFixed(2)}
                            </td>

                            {/* Action Delete */}
                            <td className="py-2.5 px-3 text-center">
                              <button 
                                type="button"
                                onClick={() => handleRemoveLineItem(item.id)}
                                className="p-1 text-[#FF0000] hover:bg-[#FFF0F0] rounded transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Summary Footer */}
              <div className="flex items-center justify-end gap-6 text-xs font-bold text-[#0E0E0E] pt-2 border-t border-[#EEEEEE]">
                <div>Total Quantity: <span className="text-[#B8623B]">{totalQuantity}</span></div>
                <div>Total Amount : <span className="text-[#008F2F]">৳ {totalAmount.toFixed(2)}</span></div>
              </div>
            </div>

            {/* SECTION 3: Shipping Information */}
            <div className="bg-white rounded border border-[#E2D9D2] p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider border-b border-[#EEEEEE] pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8623B]"></span>
                Shipping Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Shipping Details:
                  </label>
                  <textarea
                    rows={2}
                    value={shippingDetails}
                    onChange={(e) => setShippingDetails(e.target.value)}
                    placeholder="Enter transport provider or courier instructions..."
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Shipping Charge:
                  </label>
                  <input 
                    type="number"
                    value={shippingCharge}
                    onChange={(e) => setShippingCharge(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                  />
                </div>
              </div>
            </div>

            {/* SECTION 4: Payment Details */}
            <div className="bg-white rounded border border-[#E2D9D2] p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wider border-b border-[#EEEEEE] pb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8623B]"></span>
                Payment Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Amount: <span className="text-[#FF0000]">*</span>
                  </label>
                  <input 
                    type="number"
                    value={paymentAmount || totalAmount}
                    onChange={(e) => setPaymentAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Payment Date: <span className="text-[#FF0000]">*</span>
                  </label>
                  <input 
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0E0E0E] block mb-1">
                    Payment Method: <span className="text-[#FF0000]">*</span>
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                  >
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="Cheque">Cheque</option>
                    <option value="bKash Merchant">bKash Merchant</option>
                  </select>
                </div>
              </div>

              {/* Submit CTA Button */}
              <div className="pt-4 flex justify-center">
                <button
                  type="submit"
                  className="px-12 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white font-semibold text-xs uppercase tracking-wider rounded-full transition-all"
                >
                  Submit
                </button>
              </div>
            </div>

          </form>
        </div>
      )}

      {/* NEW SUPPLIER MODAL */}
      {showSupplierModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded border border-[#E2D9D2] max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-[#0E0E0E] tracking-tight">Add New Supplier</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#0E0E0E] block mb-1">Supplier Company/Name</label>
                <input 
                  type="text"
                  value={newSupplierName}
                  onChange={(e) => setNewSupplierName(e.target.value)}
                  placeholder="e.g. Apex Wholesale"
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#0E0E0E] block mb-1">Email Address</label>
                <input 
                  type="email"
                  value={newSupplierEmail}
                  onChange={(e) => setNewSupplierEmail(e.target.value)}
                  placeholder="supplier@company.com"
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSupplierModal(false)}
                className="px-4 py-2 border-1.5 border-[#B8623B] text-[#B8623B] hover:bg-[#F7F4F1] font-semibold text-xs rounded-full transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (newSupplierName.trim()) {
                    setSupplier(newSupplierName);
                    setShowSupplierModal(false);
                    setNewSupplierName('');
                    setNewSupplierEmail('');
                  }
                }}
                className="px-4 py-2 bg-[#B8623B] hover:bg-[#944923] text-white font-semibold text-xs rounded-full transition-all uppercase"
              >
                Save Supplier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
