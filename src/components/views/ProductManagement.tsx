import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Tag, 
  Layers, 
  Plus, 
  Search, 
  Edit3, 
  Printer,
  Copy,
  Eye,
  Trash2, 
  CheckCircle2, 
  X, 
  UploadCloud, 
  FileSpreadsheet, 
  Sliders, 
  List, 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  ListOrdered, 
  List as ListIcon, 
  Link as LinkIcon, 
  Image as ImageIcon, 
  Table as TableIcon, 
  Quote, 
  Code,
  Calendar,
  RotateCcw,
  Check,
  ChevronDown
} from 'lucide-react';
import { Product, ProductSubTab } from '../../types';

interface ProductManagementProps {
  products?: Product[];
  activeSubTab?: ProductSubTab;
  onSubTabChange?: (tab: ProductSubTab) => void;
}

interface BrandItem {
  id: string;
  name: string;
  slug: string;
  parentBrand?: string;
  parentCategory?: string;
  description: string;
  productCount: number;
  status: 'Active' | 'Inactive';
  logoUrl?: string;
  bannerUrl?: string;
}

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  description: string;
  productCount: number;
  status: 'Active' | 'Inactive';
  logoUrl?: string;
  mainMenuIconUrl?: string;
  bannerUrl?: string;
}

interface VariationItem {
  id: string;
  type: 'Color' | 'Size' | 'Weight';
  name: string;
  code: string; // e.g. hex #FF0000 or XL or 500g
  status: 'Active' | 'Inactive';
}

interface LedgerItem {
  sl: number;
  date: string;
  product: string;
  barcode: string;
  trnxType: 'debit' | 'credit';
  quantity: string;
  reference: string;
  note: string;
  stock: string;
  updatedBy: string;
}

const INITIAL_BRANDS: BrandItem[] = [
  { id: 'b-1', name: 'Aura Studio', slug: 'aura-studio', description: 'Premium Wireless Audio & Headsets', productCount: 14, status: 'Active', parentCategory: 'Audio & Sound', logoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
  { id: 'b-2', name: 'Sony', slug: 'sony', description: 'World-class Audio & Consumer Electronics', productCount: 28, status: 'Active', parentCategory: 'Consumer Electronics', logoUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&q=80' },
  { id: 'b-3', name: 'HAVIT', slug: 'havit', description: 'Affordable High Performance Gaming Peripherals', productCount: 35, status: 'Active', parentCategory: 'Gaming Gear', logoUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80' },
  { id: 'b-4', name: 'EKSA', slug: 'eksa', description: 'Professional Pro-Gaming Sound Tech', productCount: 19, status: 'Active', parentCategory: 'Gaming Gear', logoUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&q=80' },
  { id: 'b-5', name: 'Anker Soundcore', slug: 'anker-soundcore', description: 'Innovative TWS Earbuds & Bluetooth Speakers', productCount: 42, status: 'Active', parentCategory: 'Audio Accessories', logoUrl: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=100&q=80' }
];

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'c-1', name: 'Wireless Headphones', slug: 'wireless-headphones', parentCategory: 'Audio & Sound', description: 'Over-ear and On-ear ANC Bluetooth Headphones', productCount: 24, status: 'Active', logoUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80' },
  { id: 'c-2', name: 'Gaming Headsets', slug: 'gaming-headsets', parentCategory: 'Gaming Gear', description: '7.1 Surround Sound Wired & Wireless Headsets', productCount: 38, status: 'Active', logoUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80' },
  { id: 'c-3', name: 'TWS Earbuds', slug: 'tws-earbuds', parentCategory: 'Audio & Sound', description: 'True Wireless Stereo Earbuds & In-Ear Monitors', productCount: 52, status: 'Active', logoUrl: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=100&q=80' },
  { id: 'c-4', name: 'Smart Watches & Bands', slug: 'smart-watches', parentCategory: 'Wearables', description: 'AMOLED Smartwatches & Fitness Trackers', productCount: 18, status: 'Active', logoUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80' },
  { id: 'c-5', name: 'Audio Accessories', slug: 'audio-accessories', parentCategory: 'Accessories', description: 'Replacement Earpads, Cables, Chargers & Adapters', productCount: 12, status: 'Active', logoUrl: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=100&q=80' }
];

const INITIAL_VARIATIONS: VariationItem[] = [
  { id: 'v-1', type: 'Color', name: 'Midnight Black', code: '#18181b', status: 'Active' },
  { id: 'v-2', type: 'Color', name: 'Crimson Red', code: '#dc2626', status: 'Active' },
  { id: 'v-3', type: 'Color', name: 'Silver White', code: '#f8fafc', status: 'Active' },
  { id: 'v-4', type: 'Size', name: 'Standard / Universal', code: 'STD', status: 'Active' },
  { id: 'v-5', type: 'Size', name: 'Extra Large (XL)', code: 'XL', status: 'Active' },
  { id: 'v-6', type: 'Weight', name: '250 grams', code: '250g', status: 'Active' },
  { id: 'v-7', type: 'Weight', name: '500 grams', code: '500g', status: 'Active' }
];

const INITIAL_LEDGER_DATA: LedgerItem[] = [
  { sl: 1, date: '22 July, 2026 | 08:12 PM', product: 'Apple AirPods Pro 2nd Gen (Dubai Version)', barcode: '194253397168', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068663', note: 'exclude for sell', stock: '7 PCS', updatedBy: 'newUserOutlet' },
  { sl: 2, date: '22 July, 2026 | 07:19 PM', product: 'Short Brief business introduction Promise Mart', barcode: '123pm', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068652', note: 'exclude for sell', stock: '277 PCS', updatedBy: 'newUserOutlet' },
  { sl: 3, date: '22 July, 2026 | 07:18 PM', product: 'Short Brief business introduction Promise Mart', barcode: '123pm', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068651', note: 'exclude for sell', stock: '278 PCS', updatedBy: 'newUserOutlet' },
  { sl: 4, date: '22 July, 2026 | 07:13 PM', product: 'Housekeeper 360° Rotating Filter Tap Head Nozzle Activated Carbon Water Purifier', barcode: '1234fltr', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068649', note: 'exclude for sell', stock: '9 PCS', updatedBy: 'newUserOutlet' },
  { sl: 5, date: '22 July, 2026 | 07:13 PM', product: 'Volt Remote Battery AAA', barcode: '95180', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068649', note: 'exclude for sell', stock: '77 PCS', updatedBy: 'newUserOutlet' },
  { sl: 6, date: '22 July, 2026 | 07:12 PM', product: 'Plastic Water Bottle 300ml', barcode: '123bot12', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068646', note: 'exclude for sell', stock: '15 PCS', updatedBy: 'newUserOutlet' },
  { sl: 7, date: '22 July, 2026 | 07:11 PM', product: 'Plastic Water Bottle 300ml', barcode: '123bot12', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068645', note: 'exclude for sell', stock: '16 PCS', updatedBy: 'newUserOutlet' },
  { sl: 8, date: '22 July, 2026 | 06:42 PM', product: 'Housekeeper 360° Rotating Filter Tap Head Nozzle Activated Carbon Water Purifier', barcode: '123fltr', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068632', note: 'exclude for sell', stock: '10 PCS', updatedBy: 'newUserOutlet' },
  { sl: 9, date: '22 July, 2026 | 06:41 PM', product: 'Fogg Pocket Perfume Warm Silk 17ml', barcode: '94776', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068631', note: 'exclude for sell', stock: '15 PCS', updatedBy: 'newUserOutlet' },
  { sl: 10, date: '22 July, 2026 | 05:25 PM', product: 'Fogg Pocket Perfume Warm Silk 17ml', barcode: '94776', trnxType: 'debit', quantity: '1 PCS', reference: 'REG25068609', note: 'exclude for sell', stock: '16 PCS', updatedBy: 'newUserOutlet' }
];

// Helper: Rich Text Editor Toolbar (matching PDF design)
const RichTextToolbar: React.FC = () => (
  <div className="bg-[#F7F4F1] border border-[#E2D9D2] rounded-t p-1.5 flex flex-wrap items-center gap-1 text-[#545454] text-xs select-none">
    <select className="bg-white border border-[#EEEEEE] rounded px-2 py-1 text-[11px] font-bold text-[#0E0E0E]">
      <option>Sans Serif</option>
      <option>Serif</option>
      <option>Monospace</option>
    </select>
    <select className="bg-white border border-[#EEEEEE] rounded px-2 py-1 text-[11px] font-bold text-[#0E0E0E]">
      <option>Normal</option>
      <option>Heading 1</option>
      <option>Heading 2</option>
    </select>
    <div className="h-4 w-px bg-[#E2D9D2] mx-1" />
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Bold className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Italic className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Underline className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Strikethrough className="w-3.5 h-3.5" /></button>
    <div className="h-4 w-px bg-[#E2D9D2] mx-1" />
    <span className="p-1 hover:bg-white rounded font-black text-xs">A</span>
    <span className="p-1 hover:bg-white rounded bg-[#F7F4F1] font-black text-xs">A</span>
    <span className="p-1 hover:bg-white rounded text-[10px]">x₂</span>
    <span className="p-1 hover:bg-white rounded text-[10px]">x²</span>
    <div className="h-4 w-px bg-[#E2D9D2] mx-1" />
    <button type="button" className="p-1 hover:bg-white rounded"><AlignLeft className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><AlignCenter className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><AlignRight className="w-3.5 h-3.5" /></button>
    <div className="h-4 w-px bg-[#E2D9D2] mx-1" />
    <button type="button" className="p-1 hover:bg-white rounded"><ListIcon className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><ListOrdered className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><Quote className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><Code className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><LinkIcon className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><ImageIcon className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><TableIcon className="w-3.5 h-3.5" /></button>
  </div>
);

// Helper: Upload Dropzone Box
const FileDropzone: React.FC<{ label?: string }> = ({ label }) => (
  <div className="border-2 border-dashed border-[#E2D9D2] hover:border-[#B8623B] bg-[#F7F4F1]/30 hover:bg-[#F7F4F1]/60 transition-all rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2">
    <UploadCloud className="w-8 h-8 text-[#B8623B]" />
    <span className="text-xs text-[#545454] font-semibold">
      Drag and drop a file here or click
    </span>
  </div>
);

export const ProductManagement: React.FC<ProductManagementProps> = ({
  products = [],
  activeSubTab = 'MY_PRODUCTS',
  onSubTabChange
}) => {
  const [currentTab, setCurrentTab] = useState<ProductSubTab>(activeSubTab);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state if prop changes
  React.useEffect(() => {
    setCurrentTab(activeSubTab);
  }, [activeSubTab]);

  const changeSubTab = (tab: ProductSubTab) => {
    setCurrentTab(tab);
    if (onSubTabChange) onSubTabChange(tab);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // State for Lists & Forms
  const [brands, setBrands] = useState<BrandItem[]>(INITIAL_BRANDS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [variations, setVariations] = useState<VariationItem[]>(INITIAL_VARIATIONS);
  const [ledgerData, setLedgerData] = useState<LedgerItem[]>(INITIAL_LEDGER_DATA);
  const [productList, setProductList] = useState<Product[]>(products);

  // Sync internal product list if props change
  React.useEffect(() => {
    setProductList(products);
  }, [products]);

  // Bulk Selection & Filtering State
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Out of Stock'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [vendorFilter, setVendorFilter] = useState<string>('All');

  // Search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerSkuSearch, setLedgerSkuSearch] = useState('');
  const [ledgerDateFrom, setLedgerDateFrom] = useState('');
  const [ledgerDateTo, setLedgerDateTo] = useState('');

  // Pagination States (15 per page)
  const [productPage, setProductPage] = useState(1);
  const [ledgerPage, setLedgerPage] = useState(1);
  const pageSize = 15;

  // Filtered Ledger Data
  const filteredLedger = useMemo(() => {
    return ledgerData.filter((item) => {
      const matchQuery = ledgerSkuSearch
        ? item.product.toLowerCase().includes(ledgerSkuSearch.toLowerCase()) ||
          item.barcode.includes(ledgerSkuSearch) ||
          item.reference.toLowerCase().includes(ledgerSkuSearch.toLowerCase())
        : true;
      return matchQuery;
    });
  }, [ledgerData, ledgerSkuSearch]);

  const totalLedgerPages = Math.ceil(filteredLedger.length / pageSize) || 1;
  const paginatedLedger = useMemo(() => {
    const start = (ledgerPage - 1) * pageSize;
    return filteredLedger.slice(start, start + pageSize);
  }, [filteredLedger, ledgerPage]);

  const filteredProducts = useMemo(() => {
    return productList.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.vendor && p.vendor.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));

      const matchStatus =
        statusFilter === 'All' ? true :
        statusFilter === 'Active' ? p.inStock || p.status === 'Active' :
        !p.inStock || p.status === 'Out of Stock';

      const matchCategory = categoryFilter === 'All' || p.category === categoryFilter;
      const matchVendor = vendorFilter === 'All' || p.vendor === vendorFilter;

      return matchSearch && matchStatus && matchCategory && matchVendor;
    });
  }, [productList, searchQuery, statusFilter, categoryFilter, vendorFilter]);

  const totalProductPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedProducts = useMemo(() => {
    const start = (productPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, productPage]);

  // Bulk Selection Helpers
  const handleSelectAllProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedProductIds(filteredProducts.map((p) => p.id));
    } else {
      setSelectedProductIds([]);
    }
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProductIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    filteredProducts.length > 0 &&
    selectedProductIds.length === filteredProducts.length;

  const handleBulkDelete = () => {
    if (
      confirm(
        `Are you sure you want to delete ${selectedProductIds.length} selected product(s)?`
      )
    ) {
      setProductList((prev) =>
        prev.filter((p) => !selectedProductIds.includes(p.id))
      );
      showToast(`Deleted ${selectedProductIds.length} product(s) successfully!`);
      setSelectedProductIds([]);
    }
  };

  const handleBulkStatusChange = (newStatus: 'Active' | 'Out of Stock') => {
    setProductList((prev) =>
      prev.map((p) =>
        selectedProductIds.includes(p.id)
          ? {
              ...p,
              status: newStatus,
              inStock: newStatus === 'Active',
            }
          : p
      )
    );
    showToast(
      `Updated status for ${selectedProductIds.length} product(s) to ${newStatus}`
    );
    setSelectedProductIds([]);
  };

  return (
    <div className="w-full space-y-4 font-sans text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-bold border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. FORM VIEW: ADD NEW PRODUCT (MATCHING PDF 1) */}
      {/* ========================================================================= */}
      {currentTab === 'ADD_PRODUCT' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-6">
          <div className="border-b border-[#EEEEEE] pb-3">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              Add New Product
            </h2>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Product added successfully!');
              changeSubTab('MY_PRODUCTS');
            }} 
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* LEFT MAIN COLUMN (2 Cols) */}
            <div className="lg:col-span-2 space-y-5">
              
              {/* Product Name */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Product Name <span className="text-[#FF0000]">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Realme 5i Smartphone" 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Keywords <span className="text-[#FF0000]">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter keyword..." 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Short Description (Max: 250 words) <span className="text-[#FF0000]">*</span>
                </label>
                <div className="rounded overflow-hidden border border-[#EEEEEE]">
                  <RichTextToolbar />
                  <textarea 
                    rows={3} 
                    placeholder="Enter description..." 
                    className="w-full p-3 text-xs bg-white text-[#0E0E0E] font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Full Description (Max: 1500 words) <span className="text-[#FF0000]">*</span>
                </label>
                <div className="rounded overflow-hidden border border-[#EEEEEE]">
                  <RichTextToolbar />
                  <textarea 
                    rows={5} 
                    placeholder="Enter description..." 
                    className="w-full p-3 text-xs bg-white text-[#0E0E0E] font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Categories & Brand Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                    Categories <span className="text-[#FF0000]">*</span>
                  </label>
                  <select className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                    <option value="">Select at least one...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                    Brand <span className="text-[#FF0000]">*</span>
                  </label>
                  <select className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                    <option value="">Select at least one...</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Purchases Rate & MRP Rate */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                    Purchases Rate <span className="text-[#FF0000]">*</span>
                  </label>
                  <input 
                    type="number" 
                    required
                    placeholder="0.00" 
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                    MRP Rate <span className="text-[#FF0000]">*</span>
                  </label>
                  <input 
                    type="number" 
                    required
                    placeholder="0.00" 
                    className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                  />
                </div>
              </div>

              {/* Product Type */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Product Type
                </label>
                <input 
                  type="text" 
                  value="Single" 
                  readOnly 
                  className="w-full px-3.5 py-2 bg-[#F7F4F1]/40 border border-[#E2D9D2] rounded text-xs font-bold text-[#0E0E0E]"
                />
              </div>

              {/* Single Product Details Box */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide">
                  Single Product
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#545454] mb-1">
                      Model <span className="text-[#FF0000]">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Model name" 
                      className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#545454] mb-1">
                      Barcode <span className="text-[#FF0000]">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Barcode number" 
                      className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#545454] mb-1">
                      Sku (auto generated)
                    </label>
                    <input 
                      type="text" 
                      defaultValue="6a670a8aac3f6" 
                      readOnly 
                      className="w-full px-3 py-1.5 bg-[#F7F4F1] border border-[#E2D9D2] rounded text-xs font-mono font-bold text-[#0E0E0E]"
                    />
                  </div>
                </div>
              </div>

              {/* Product Specifications */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Product Specifications <span className="text-[#FF0000]">*</span>
                </label>
                <div className="rounded overflow-hidden border border-[#EEEEEE]">
                  <RichTextToolbar />
                  <textarea 
                    rows={3} 
                    placeholder="Enter description..." 
                    className="w-full p-3 text-xs bg-white text-[#0E0E0E] font-medium focus:outline-none"
                  />
                </div>
              </div>

              {/* Thumbnail Upload Box */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Thumbnail
                </label>
                <FileDropzone />
              </div>

              {/* Product Gallery Upload Box */}
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Product Gallery
                </label>
                <FileDropzone />
              </div>

              {/* Bottom Submit Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => changeSubTab('MY_PRODUCTS')} 
                  className="px-6 py-2.5 bg-transparent border-1.5 border-[#B8623B] text-[#B8623B] hover:bg-[#F7F4F1] text-xs font-semibold rounded-full transition-all"
                >
                  Back Now
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all"
                >
                  Save & Submit
                </button>
              </div>

            </div>

            {/* RIGHT SIDEBAR COLUMN (1 Col) */}
            <div className="space-y-5">
              
              {/* Configuration */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#E2D9D2]/50 pb-2">
                  Configuration
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#0E0E0E] block mb-1">Delivery Charge</span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer text-[#545454] font-medium">
                        <input type="radio" name="delivery" defaultChecked className="accent-[#B8623B]" />
                        <span>Free</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[#545454] font-medium">
                        <input type="radio" name="delivery" className="accent-[#B8623B]" />
                        <span>Yes</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#545454] font-medium">
                      <input type="checkbox" defaultChecked className="rounded accent-[#B8623B]" />
                      <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[#545454] font-medium">
                      <input type="checkbox" className="rounded accent-[#B8623B]" />
                      <span>Return Policy</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[#545454] font-medium">
                      <input type="checkbox" className="rounded accent-[#B8623B]" />
                      <span>Warranty</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#E2D9D2]/50 pb-2">
                  Quantity
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Max Quantity</label>
                    <input type="number" defaultValue={1} className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                    <p className="text-[10px] text-[#B8623B] italic mt-0.5">* If this value is null then no purchase limit for this product.</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Min Quantity</label>
                    <input type="number" defaultValue={1} className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                    <p className="text-[10px] text-[#B8623B] italic mt-0.5">* If this value is null then no purchase limit for this product.</p>
                  </div>
                </div>
              </div>

              {/* Product Video */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#E2D9D2]/50 pb-2">
                  Product Video
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Video Platform</label>
                    <select className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]">
                      <option>Select Video Platform</option>
                      <option>YouTube</option>
                      <option>Vimeo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Video Link</label>
                    <input type="text" placeholder="Enter video link" className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                    <p className="text-[10px] text-[#8F8F8F] mt-0.5">Please dont use any short link here</p>
                  </div>
                </div>
              </div>

              {/* Offer and Discount */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#E2D9D2]/50 pb-2">
                  Offer and Discount
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Discount Type</label>
                    <select className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]">
                      <option>Select</option>
                      <option>Percentage (%)</option>
                      <option>Flat Amount (TK)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Discount Number</label>
                    <input type="text" placeholder="Discount number" className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                    <p className="text-[10px] text-[#8F8F8F] mt-0.5">Percentage will automatically convert in number(TK).</p>
                  </div>
                </div>
              </div>

              {/* Earning Limit Multiplier */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-2">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide">
                  Earning Limit Multiplier
                </h3>
                <input type="number" defaultValue={5} className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                <p className="text-[10px] text-[#B8623B]">Enter the amount to multiply with the price to set user earning limit</p>
              </div>

              {/* Affiliate Commission */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#E2D9D2]/50 pb-2">
                  Affiliate Commission
                </h3>
                <div className="flex items-center gap-4 text-xs font-medium text-[#545454]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="affiliate" defaultChecked className="accent-[#B8623B]" />
                    <span>Auto Affiliate</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="affiliate" className="accent-[#B8623B]" />
                    <span>Manually Affiliate</span>
                  </label>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-0.5">L1 Commission(%)</label>
                    <input type="number" defaultValue={0} className="w-full px-3 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-0.5">L2 Commission(%)</label>
                    <input type="number" defaultValue={0} className="w-full px-3 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-0.5">L3 Commission(%)</label>
                    <input type="number" defaultValue={0} className="w-full px-3 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-[#0E0E0E]">Total product Commission</span>
                    <p className="text-[10px] text-[#8F8F8F]">Percentage will automatically convert in number(TK).</p>
                  </div>
                </div>
              </div>

              {/* SEO */}
              <div className="bg-[#F7F4F1]/30 border border-[#E2D9D2] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#E2D9D2]/50 pb-2">
                  SEO
                </h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Product Title</label>
                    <input type="text" placeholder="Enter Product Title" className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Description</label>
                    <textarea placeholder="Enter Product Description..." rows={3} className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Thumbnail</label>
                    <FileDropzone />
                  </div>
                </div>
              </div>

            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. FORM VIEW: ADD BRAND (MATCHING PDF 2) */}
      {/* ========================================================================= */}
      {currentTab === 'ADD_BRAND' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#0E0E0E] tracking-tight">
              Add Brand
            </h2>
            <p className="text-xs font-bold text-[#FF0000]">
              (Please add Logo and Banner for every brand)
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Brand added successfully!');
              changeSubTab('BRANDS');
            }} 
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Brand Name<span className="text-[#FF0000]">*</span>:
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Brand Name" 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Parent Brand:
                </label>
                <select className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                  <option value="">Select Parent Brand (optional)</option>
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Slug:
                </label>
                <input 
                  type="text" 
                  placeholder="Brand Slug" 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Status:
                </label>
                <select className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                  <option value="Inactive">Inactive</option>
                  <option value="Active">Active</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                Description:
              </label>
              <textarea 
                rows={4} 
                placeholder="Enter description..." 
                className="w-full p-3.5 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Logo<span className="text-[#FF0000]">*</span>:
                </label>
                <FileDropzone />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Banner:
                </label>
                <FileDropzone />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => changeSubTab('BRANDS')} 
                className="px-6 py-2.5 bg-transparent border-1.5 border-[#B8623B] text-[#B8623B] hover:bg-[#F7F4F1] text-xs font-semibold rounded-full transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all"
              >
                Add Brand
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FORM VIEW: ADD CATEGORY (MATCHING PDF 3) */}
      {/* ========================================================================= */}
      {currentTab === 'ADD_CATEGORY' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#0E0E0E] tracking-tight">
              Add Category
            </h2>
            <p className="text-xs font-bold text-[#FF0000]">
              (Please add Logo and Banner for every category)
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Category added successfully!');
              changeSubTab('CATEGORIES');
            }} 
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Category Name<span className="text-[#FF0000]">*</span>:
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="Category Name" 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Parent Category:
                </label>
                <select className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                  <option value="">Select Parent Category(Optional)</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Slug:
                </label>
                <input 
                  type="text" 
                  placeholder="Slug Category" 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Status:
                </label>
                <select className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                  <option value="Inactive">Inactive</option>
                  <option value="Active">Active</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                Description:
              </label>
              <textarea 
                rows={4} 
                placeholder="Enter description..." 
                className="w-full p-3.5 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Logo<span className="text-[#FF0000]">*</span>:
                </label>
                <FileDropzone />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Mani Menu Category Icon:
                </label>
                <FileDropzone />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Banner:
                </label>
                <FileDropzone />
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => changeSubTab('CATEGORIES')} 
                className="px-6 py-2.5 bg-transparent border-1.5 border-[#B8623B] text-[#B8623B] hover:bg-[#F7F4F1] text-xs font-semibold rounded-full transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all"
              >
                Add Category
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. FORM VIEW: ADD VARIATION (COLOR, SIZE, WEIGHT) */}
      {/* ========================================================================= */}
      {currentTab === 'ADD_VARIATION' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#0E0E0E] tracking-tight">
              Add Variation
            </h2>
            <p className="text-xs font-bold text-[#B8623B]">
              (Configure Color, Size, and Weight product attributes)
            </p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              showToast('Variation added successfully!');
              changeSubTab('VARIATIONS');
            }} 
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Variation Type<span className="text-[#FF0000]">*</span>:
                </label>
                <select required className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                  <option value="Color">Color</option>
                  <option value="Size">Size</option>
                  <option value="Weight">Weight</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Variation Name<span className="text-[#FF0000]">*</span>:
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Midnight Black, XL, 500g" 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Attribute Code / Hex Value:
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. #18181b or XL or 500g" 
                  className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                  Status:
                </label>
                <select className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:bg-[#ECFFE8] focus:outline-none">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => changeSubTab('VARIATIONS')} 
                className="px-6 py-2.5 bg-transparent border-1.5 border-[#B8623B] text-[#B8623B] hover:bg-[#F7F4F1] text-xs font-semibold rounded-full transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all"
              >
                Add Variation
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. VIEW: PRODUCT LEDGER (MATCHING PDF 4) */}
      {/* ========================================================================= */}
      {currentTab === 'PRODUCT_LEDGER' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-6">
          
          <div className="border-b border-[#EEEEEE] pb-2">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              Product Ledger
            </h2>
          </div>

          {/* Ledger Search & Date Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-[#F7F4F1]/30 p-4 rounded border border-[#E2D9D2]">
            <div>
              <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">
                Search by Product Title / SKU
              </label>
              <input 
                type="text" 
                value={ledgerSkuSearch}
                onChange={(e) => setLedgerSkuSearch(e.target.value)}
                placeholder="Product Title / SKU" 
                className="w-full px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">
                Search by Date (From)
              </label>
              <input 
                type="date" 
                value={ledgerDateFrom}
                onChange={(e) => setLedgerDateFrom(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">
                Search by Date (To)
              </label>
              <input 
                type="date" 
                value={ledgerDateTo}
                onChange={(e) => setLedgerDateTo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => showToast('Search filters applied')}
                className="flex-1 py-2 bg-[#B8623B] hover:bg-[#944923] text-white font-bold text-xs uppercase rounded-full transition-all flex items-center justify-center gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Search</span>
              </button>
              <button 
                onClick={() => {
                  setLedgerSkuSearch('');
                  setLedgerDateFrom('');
                  setLedgerDateTo('');
                  showToast('Filters reset');
                }}
                className="px-4 py-2 bg-transparent border-1.5 border-[#B8623B] text-[#B8623B] hover:bg-[#F7F4F1] font-bold text-xs uppercase rounded-full transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Product Ledger Table */}
          <div className="overflow-x-auto border border-[#E2D9D2] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#B8623B] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 w-12 text-center">SL#</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Barcode</th>
                  <th className="p-3">TRNX Type</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Note</th>
                  <th className="p-3">Stock</th>
                  <th className="p-3">Updated By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {paginatedLedger.map((row) => (
                  <tr key={row.sl} className="hover:bg-[#F7F4F1]/40 transition-colors">
                    <td className="p-3 text-center font-bold text-[#8F8F8F]">{row.sl}</td>
                    <td className="p-3 text-[11px] font-semibold text-[#545454] whitespace-nowrap">{row.date}</td>
                    <td className="p-3 font-bold text-[#0E0E0E] max-w-xs">{row.product}</td>
                    <td className="p-3 whitespace-nowrap">
                      <div className="flex flex-col items-start gap-0.5">
                        <div className="font-mono text-[10px] font-bold text-[#0E0E0E]">{row.barcode}</div>
                        {/* Barcode Graphics SVG representation */}
                        <div className="flex items-center gap-[1.5px] h-3 bg-[#0E0E0E] px-1 py-0.5 rounded-2xs">
                          <span className="w-[1px] h-full bg-white" />
                          <span className="w-[2px] h-full bg-white" />
                          <span className="w-[1px] h-full bg-white" />
                          <span className="w-[3px] h-full bg-white" />
                          <span className="w-[1px] h-full bg-white" />
                          <span className="w-[2px] h-full bg-white" />
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        row.trnxType === 'debit' ? 'bg-[#F7F4F1] text-[#B8623B] border border-[#E2D9D2]' : 'bg-[#ECFFE8] text-[#008F2F]'
                      }`}>
                        {row.trnxType}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{row.quantity}</td>
                    <td className="p-3 font-mono font-bold text-[#B8623B] hover:underline cursor-pointer">{row.reference}</td>
                    <td className="p-3 text-[11px] text-[#8F8F8F] italic">{row.note}</td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{row.stock}</td>
                    <td className="p-3 text-[11px] font-semibold text-[#545454]">{row.updatedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-[#8F8F8F] pt-2">
            <span>Showing {filteredLedger.length > 0 ? (ledgerPage - 1) * pageSize + 1 : 0} to {Math.min(ledgerPage * pageSize, filteredLedger.length)} of {filteredLedger.length} results</span>
            <div className="flex items-center gap-1">
              <button 
                disabled={ledgerPage === 1}
                onClick={() => setLedgerPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 bg-[#F7F4F1] border border-[#E2D9D2] rounded text-[#B8623B] font-bold disabled:opacity-40"
              >&lt;</button>
              {Array.from({ length: totalLedgerPages }, (_, i) => i + 1).map(p => (
                <button 
                  key={p}
                  onClick={() => setLedgerPage(p)}
                  className={`px-2.5 py-1 rounded font-bold ${ledgerPage === p ? 'bg-[#B8623B] text-white' : 'bg-[#F7F4F1]/50 text-[#0E0E0E]'}`}
                >
                  {p}
                </button>
              ))}
              <button 
                disabled={ledgerPage === totalLedgerPages}
                onClick={() => setLedgerPage(p => Math.min(totalLedgerPages, p + 1))}
                className="px-2.5 py-1 bg-[#F7F4F1] border border-[#E2D9D2] rounded text-[#B8623B] font-bold disabled:opacity-40"
              >&gt;</button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. VIEW: MY PRODUCTS (CATALOG TABLE WITH BULK SELECT & EXTENDED COLUMNS) */}
      {/* ========================================================================= */}
      {currentTab === 'MY_PRODUCTS' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-4">
          
          {/* Header & Main Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-[#EEEEEE]">
            <div>
              <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
                <span>Product Catalog</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F7F4F1] text-[#B8623B] text-xs font-extrabold border border-[#E2D9D2]">
                  {filteredProducts.length} Items
                </span>
              </h2>
              <p className="text-xs text-[#8F8F8F] font-medium mt-0.5">
                Manage product inventory, vendor outlets, prices, and delivery configuration
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => changeSubTab('ADD_PRODUCT')}
                className="px-4 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#F7F4F1]/30 p-3.5 rounded-lg border border-[#E2D9D2]">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8F8F8F]" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setProductPage(1);
                }}
                placeholder="Search Title, SKU, Vendor..." 
                className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
              />
            </div>

            {/* Status Filter */}
            <div>
              <select 
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as any);
                  setProductPage(1);
                }}
                className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active / In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select 
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setProductPage(1);
                }}
                className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Vendor Filter */}
            <div>
              <select 
                value={vendorFilter}
                onChange={(e) => {
                  setVendorFilter(e.target.value);
                  setProductPage(1);
                }}
                className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
              >
                <option value="All">All Vendors</option>
                <option value="Aura Global Ltd">Aura Global Ltd</option>
                <option value="Sony BD Official Importer">Sony BD Official Importer</option>
                <option value="HAVIT BD Distributor">HAVIT BD Distributor</option>
                <option value="EKSA Gaming Tech">EKSA Gaming Tech</option>
                <option value="Anker BD Official">Anker BD Official</option>
              </select>
            </div>
          </div>

          {/* Bulk Actions Banner (Visible when items selected) */}
          {selectedProductIds.length > 0 && (
            <div className="bg-[#B8623B] text-white p-3 rounded-lg shadow-md flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-extrabold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>{selectedProductIds.length} Product(s) Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleBulkStatusChange('Active')}
                  className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-bold transition-all"
                >
                  Mark Active
                </button>
                <button
                  type="button"
                  onClick={() => handleBulkStatusChange('Out of Stock')}
                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold transition-all"
                >
                  Mark Out of Stock
                </button>
                <button
                  type="button"
                  onClick={handleBulkDelete}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs font-bold transition-all flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Selected</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedProductIds([])}
                  className="px-2.5 py-1 bg-white/20 hover:bg-white/30 text-white rounded text-xs font-bold"
                >
                  Clear Selection
                </button>
              </div>
            </div>
          )}

          {/* Table Container */}
          <div className="overflow-x-auto border border-[#E2D9D2] rounded-lg shadow-2xs bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#B8623B] text-white text-[11px] font-extrabold uppercase tracking-wider sticky top-0 z-10 select-none">
                <tr>
                  {/* 1. Bulk Select */}
                  <th className="p-3 text-center w-10 border-b border-[#B8623B]">
                    <input 
                      type="checkbox" 
                      checked={isAllSelected}
                      onChange={handleSelectAllProducts}
                      className="w-4 h-4 rounded border-[#E2D9D2] accent-white cursor-pointer"
                      title="Select All"
                    />
                  </th>
                  {/* 2. SI (Serial Index) */}
                  <th className="p-3 text-center w-12 border-b border-[#B8623B]">SI</th>
                  {/* 3. Image */}
                  <th className="p-3 w-16 border-b border-[#B8623B]">Image</th>
                  {/* 4. Product Name */}
                  <th className="p-3 min-w-[180px] border-b border-[#B8623B]">Product Name</th>
                  {/* 5. Status */}
                  <th className="p-3 min-w-[110px] border-b border-[#B8623B]">Status</th>
                  {/* 6. Product Details */}
                  <th className="p-3 min-w-[180px] border-b border-[#B8623B]">Product Details</th>
                  {/* 7. Price */}
                  <th className="p-3 min-w-[120px] border-b border-[#B8623B]">Price</th>
                  {/* 8. Creation */}
                  <th className="p-3 min-w-[140px] border-b border-[#B8623B]">Creation</th>
                  {/* 9. Vendor */}
                  <th className="p-3 min-w-[130px] border-b border-[#B8623B]">Vendor</th>
                  {/* 10. Outlets */}
                  <th className="p-3 min-w-[150px] border-b border-[#B8623B]">Outlets</th>
                  {/* 11. Delivery */}
                  <th className="p-3 min-w-[140px] border-b border-[#B8623B]">Delivery</th>
                  {/* 12. Other Info */}
                  <th className="p-3 min-w-[150px] border-b border-[#B8623B]">Other Info</th>
                  {/* 13. Actions */}
                  <th className="p-3 min-w-[150px] text-center border-b border-[#B8623B]">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {paginatedProducts.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="p-8 text-center text-slate-400 font-bold">
                      No products match the selected filters.
                    </td>
                  </tr>
                ) : (
                  paginatedProducts.map((p, idx) => {
                    const isSelected = selectedProductIds.includes(p.id);
                    const serialNo = (productPage - 1) * pageSize + idx + 1;
                    return (
                      <tr 
                        key={p.id} 
                        className={`hover:bg-[#F7F4F1]/40 transition-colors ${
                          isSelected ? 'bg-[#F7F4F1]/70' : ''
                        }`}
                      >
                        {/* 1. Bulk Select Checkbox */}
                        <td className="p-3 text-center">
                          <input 
                            type="checkbox" 
                            checked={isSelected}
                            onChange={() => handleSelectProduct(p.id)}
                            className="w-4 h-4 rounded border-[#E2D9D2] accent-[#B8623B] cursor-pointer"
                          />
                        </td>

                        {/* 2. SI (Serial) */}
                        <td className="p-3 text-center font-bold text-slate-400 border-r border-[#EEEEEE]/80">
                          {serialNo}
                        </td>

                        {/* 3. Image */}
                        <td className="p-3">
                          <div className="w-12 h-12 rounded-lg border border-[#E2D9D2]/50 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs group relative">
                            <img 
                              src={p.image} 
                              alt={p.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                        </td>

                        {/* 4. Product Name */}
                        <td className="p-3">
                          <div className="flex flex-col gap-1 max-w-[220px]">
                            <span 
                              className="font-bold text-[#0E0E0E] text-xs leading-snug line-clamp-2 hover:text-[#B8623B] cursor-pointer" 
                              title={p.title}
                              onClick={() => changeSubTab('ADD_PRODUCT')}
                            >
                              {p.title}
                            </span>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <span className="px-1.5 py-0.5 bg-[#F7F4F1] text-[#B8623B] border border-[#E2D9D2]/60 font-mono text-[10px] font-bold rounded">
                                SKU: {p.sku || `PRD-${p.id}`}
                              </span>
                              {p.barcode && (
                                <span className="text-[10px] text-slate-400 font-mono">
                                  #{p.barcode}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 5. Status */}
                        <td className="p-3">
                          <div className="flex flex-col items-start gap-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                              (p.status === 'Active' || p.inStock) 
                                ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/20' 
                                : 'bg-[#FFF0F0] text-[#FF0000] border border-[#FF0000]/30'
                            }`}>
                              {p.status || (p.inStock ? 'Active' : 'Out of Stock')}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setProductList(prev => prev.map(item => item.id === p.id ? { ...item, inStock: !item.inStock, status: !item.inStock ? 'Active' : 'Out of Stock' } : item));
                                showToast(`Toggled stock status for ${p.title}`);
                              }}
                              className="text-[10px] font-semibold text-[#B8623B] hover:underline cursor-pointer"
                            >
                              Toggle Status
                            </button>
                          </div>
                        </td>

                        {/* 6. Product Details */}
                        <td className="p-3">
                          <div className="flex flex-col gap-1 max-w-[200px] text-[11px]">
                            <div className="flex items-center gap-1 font-semibold text-[#0E0E0E]">
                              <Tag className="w-3 h-3 text-[#B8623B] shrink-0" />
                              <span className="truncate">{p.category || 'General'}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[#545454]">
                              <Layers className="w-3 h-3 text-slate-400 shrink-0" />
                              <span className="truncate">Brand: {p.brand || 'Generic'}</span>
                            </div>
                            <p className="text-[10px] text-[#8F8F8F] line-clamp-1 italic">
                              {p.description}
                            </p>
                          </div>
                        </td>

                        {/* 7. Price */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex flex-col">
                            <span className="font-bold text-[#0E0E0E] text-xs">
                              ৳{p.price.toLocaleString()}
                            </span>
                            {p.originalPrice && p.originalPrice > p.price && (
                              <div className="flex items-center gap-1">
                                <span className="text-[10px] text-slate-400 line-through">
                                  ৳{p.originalPrice.toLocaleString()}
                                </span>
                                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">
                                  -{Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)}%
                                </span>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* 8. Creation */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex flex-col text-[11px]">
                            <div className="flex items-center gap-1 text-[#0E0E0E] font-medium">
                              <Calendar className="w-3 h-3 text-[#B8623B] shrink-0" />
                              <span>{p.createdAt || '22 Jul 2026'}</span>
                            </div>
                            <span className="text-[10px] text-[#8F8F8F]">
                              By: {p.createdBy || 'Store Admin'}
                            </span>
                          </div>
                        </td>

                        {/* 9. Vendor */}
                        <td className="p-3 whitespace-nowrap">
                          <div className="flex items-center gap-1.5">
                            <Package className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="font-semibold text-xs text-[#0E0E0E]">
                              {p.vendor || 'Aura Official'}
                            </span>
                          </div>
                        </td>

                        {/* 10. Outlets */}
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {(p.outlets || ['Main Outlet (Dhaka)', 'Banani Hub']).map((out, oIdx) => (
                              <span key={oIdx} className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-medium rounded whitespace-nowrap">
                                {out}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* 11. Delivery */}
                        <td className="p-3">
                          <div className="flex flex-col gap-0.5 text-[10px]">
                            <span className="font-semibold text-[#0E0E0E]">
                              {p.deliveryInfo || 'Inside ৳60 | Outside ৳120'}
                            </span>
                            <div className="flex items-center gap-1">
                              {p.codAvailable !== false && (
                                <span className="px-1 py-0.2 bg-[#F7F4F1] text-[#B8623B] font-bold rounded text-[9px]">
                                  COD Available
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* 12. Other Info */}
                        <td className="p-3">
                          <div className="flex flex-col gap-1 text-[10px]">
                            <div className="flex items-center gap-1 font-bold text-[#B8623B]">
                              <span>★ {p.rating}</span>
                              <span className="text-[#545454] font-normal">({p.salesCount} sold)</span>
                            </div>
                            <div className="text-[#0E0E0E] font-semibold">
                              Stock: <span className="text-[#008F2F] font-bold">{p.stockQty || 50} PCS</span>
                            </div>
                            <span className="text-[9px] text-[#8F8F8F] line-clamp-1 bg-slate-50 px-1 py-0.5 rounded border border-slate-200 inline-block w-fit">
                              {p.warranty || 'Official Warranty'}
                            </span>
                          </div>
                        </td>

                        {/* 13. Actions */}
                        <td className="p-3 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button 
                              onClick={() => showToast(`Printed spec sheet for ${p.title}`)}
                              className="p-1.5 text-slate-600 hover:text-[#B8623B] hover:bg-[#F7F4F1] rounded-md transition-colors border border-slate-200 bg-white cursor-pointer"
                              title="Print Product Sheet"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(p.title);
                                showToast('Copied product title!');
                              }}
                              className="p-1.5 text-slate-600 hover:text-[#B8623B] hover:bg-[#F7F4F1] rounded-md transition-colors border border-slate-200 bg-white cursor-pointer"
                              title="Copy Product Title"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => changeSubTab('ADD_PRODUCT')}
                              className="p-1.5 text-slate-600 hover:text-[#B8623B] hover:bg-[#F7F4F1] rounded-md transition-colors border border-slate-200 bg-white cursor-pointer"
                              title="View Details"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => changeSubTab('ADD_PRODUCT')}
                              className="p-1.5 text-slate-600 hover:text-[#B8623B] hover:bg-[#F7F4F1] rounded-md transition-colors border border-slate-200 bg-white cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm(`Delete product "${p.title}"?`)) {
                                  setProductList(prev => prev.filter(item => item.id !== p.id));
                                  showToast('Product deleted');
                                }
                              }}
                              className="p-1.5 text-red-500 hover:text-white hover:bg-red-500 rounded-md transition-colors border border-red-200 bg-red-50 cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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
          <div className="flex items-center justify-between text-xs font-bold text-[#8F8F8F] pt-2">
            <span>
              Showing {filteredProducts.length > 0 ? (productPage - 1) * pageSize + 1 : 0} to {Math.min(productPage * pageSize, filteredProducts.length)} of {filteredProducts.length} products
            </span>
            <div className="flex items-center gap-1">
              <button 
                disabled={productPage === 1}
                onClick={() => setProductPage(p => Math.max(1, p - 1))}
                className="px-2.5 py-1 bg-[#F7F4F1] border border-[#E2D9D2] rounded text-[#B8623B] font-bold disabled:opacity-40 cursor-pointer"
              >&lt;</button>
              {Array.from({ length: totalProductPages }, (_, i) => i + 1).map(p => (
                <button 
                  key={p}
                  onClick={() => setProductPage(p)}
                  className={`px-2.5 py-1 rounded font-bold cursor-pointer ${productPage === p ? 'bg-[#B8623B] text-white' : 'bg-[#F7F4F1]/50 text-[#0E0E0E]'}`}
                >
                  {p}
                </button>
              ))}
              <button 
                disabled={productPage === totalProductPages}
                onClick={() => setProductPage(p => Math.min(totalProductPages, p + 1))}
                className="px-2.5 py-1 bg-[#F7F4F1] border border-[#E2D9D2] rounded text-[#B8623B] font-bold disabled:opacity-40 cursor-pointer"
              >&gt;</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. VIEW: BRANDS TABLE */}
      {/* ========================================================================= */}
      {currentTab === 'BRANDS' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              Manage Brands ({brands.length})
            </h2>
            <button 
              onClick={() => changeSubTab('ADD_BRAND')}
              className="px-4 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Brand</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E2D9D2] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#B8623B] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 text-center w-12">SL</th>
                  <th className="p-3 w-16">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Parent Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {brands.map((b, idx) => (
                  <tr key={b.id} className="hover:bg-[#F7F4F1]/40 transition-colors">
                    <td className="p-3 text-center font-bold text-slate-400 border-r border-[#EEEEEE]/80">{idx + 1}</td>
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                        {b.logoUrl ? (
                          <img src={b.logoUrl} alt={b.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <Tag className="w-5 h-5 text-[#B8623B]" />
                        )}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0E0E0E] text-xs">{b.name}</span>
                        <span className="font-mono text-[10px] text-[#8F8F8F]">{b.slug}</span>
                      </div>
                    </td>
                    <td className="p-3 text-[#545454] font-semibold text-xs">
                      {b.parentCategory || b.parentBrand || 'Main Brand'}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        b.status === 'Active' 
                          ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/20' 
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => changeSubTab('ADD_BRAND')}
                          className="p-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white rounded transition-colors cursor-pointer"
                          title="Edit Brand"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete brand "${b.name}"?`)) {
                              setBrands(brands.filter(item => item.id !== b.id));
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded transition-colors cursor-pointer"
                          title="Delete Brand"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. VIEW: CATEGORIES TABLE */}
      {/* ========================================================================= */}
      {currentTab === 'CATEGORIES' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              All Categories ({categories.length})
            </h2>
            <button 
              onClick={() => changeSubTab('ADD_CATEGORY')}
              className="px-4 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E2D9D2] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#B8623B] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3 text-center w-12">SL</th>
                  <th className="p-3 w-16">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Parent Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {categories.map((c, idx) => (
                  <tr key={c.id} className="hover:bg-[#F7F4F1]/40 transition-colors">
                    <td className="p-3 text-center font-bold text-slate-400 border-r border-[#EEEEEE]/80">{idx + 1}</td>
                    <td className="p-3">
                      <div className="w-10 h-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden shrink-0 shadow-2xs">
                        {c.logoUrl || c.mainMenuIconUrl ? (
                          <img src={c.logoUrl || c.mainMenuIconUrl} alt={c.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          <Layers className="w-5 h-5 text-[#B8623B]" />
                        )}
                      </div>
                    </td>
                    <td className="p-3 font-bold text-[#0E0E0E]">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0E0E0E] text-xs">{c.name}</span>
                        <span className="font-mono text-[10px] text-[#8F8F8F]">{c.slug}</span>
                      </div>
                    </td>
                    <td className="p-3 text-[#545454] font-semibold text-xs">
                      {c.parentCategory || 'Main Category'}
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        c.status === 'Active' 
                          ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/20' 
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => changeSubTab('ADD_CATEGORY')}
                          className="p-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white rounded transition-colors cursor-pointer"
                          title="Edit Category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete category "${c.name}"?`)) {
                              setCategories(categories.filter(item => item.id !== c.id));
                            }
                          }}
                          className="p-1.5 bg-red-50 hover:bg-red-500 text-red-500 hover:text-white rounded transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. VIEW: VARIATIONS TABLE (COLOR, SIZE, WEIGHT) */}
      {/* ========================================================================= */}
      {currentTab === 'VARIATIONS' && (
        <div className="bg-white border border-[#E2D9D2] rounded p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              Product Variations (Color, Size, Weight) ({variations.length})
            </h2>
            <button 
              onClick={() => changeSubTab('ADD_VARIATION')}
              className="px-4 py-2 bg-[#B8623B] hover:bg-[#944923] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Variation</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#E2D9D2] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#B8623B] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Variation Name</th>
                  <th className="p-3">Attribute Code / Preview</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {variations.map((v) => (
                  <tr key={v.id} className="hover:bg-[#F7F4F1]/40 transition-colors">
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#F7F4F1] text-[#B8623B] border border-[#E2D9D2]">
                        {v.type}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{v.name}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {v.type === 'Color' && (
                          <span className="w-4 h-4 rounded-full border border-[#E2D9D2] shrink-0" style={{ backgroundColor: v.code }} />
                        )}
                        <span className="font-mono text-xs font-bold text-[#545454]">{v.code}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#ECFFE8] text-[#008F2F] uppercase">
                        {v.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => changeSubTab('ADD_VARIATION')}
                        className="p-1.5 bg-[#F7F4F1] hover:bg-[#B8623B] text-[#B8623B] hover:text-white rounded transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
