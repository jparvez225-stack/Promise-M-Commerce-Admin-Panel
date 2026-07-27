import React, { useState, useMemo } from 'react';
import { 
  Package, 
  Tag, 
  Layers, 
  Plus, 
  Search, 
  Edit3, 
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
  { id: 'b-1', name: 'Aura Studio', slug: 'aura-studio', description: 'Premium Wireless Audio & Headsets', productCount: 14, status: 'Active' },
  { id: 'b-2', name: 'Sony', slug: 'sony', description: 'World-class Audio & Consumer Electronics', productCount: 28, status: 'Active' },
  { id: 'b-3', name: 'HAVIT', slug: 'havit', description: 'Affordable High Performance Gaming Peripherals', productCount: 35, status: 'Active' },
  { id: 'b-4', name: 'EKSA', slug: 'eksa', description: 'Professional Pro-Gaming Sound Tech', productCount: 19, status: 'Active' },
  { id: 'b-5', name: 'Anker Soundcore', slug: 'anker-soundcore', description: 'Innovative TWS Earbuds & Bluetooth Speakers', productCount: 42, status: 'Active' }
];

const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'c-1', name: 'Wireless Headphones', slug: 'wireless-headphones', parentCategory: 'Audio & Sound', description: 'Over-ear and On-ear ANC Bluetooth Headphones', productCount: 24, status: 'Active' },
  { id: 'c-2', name: 'Gaming Headsets', slug: 'gaming-headsets', parentCategory: 'Gaming Gear', description: '7.1 Surround Sound Wired & Wireless Headsets', productCount: 38, status: 'Active' },
  { id: 'c-3', name: 'TWS Earbuds', slug: 'tws-earbuds', parentCategory: 'Audio & Sound', description: 'True Wireless Stereo Earbuds & In-Ear Monitors', productCount: 52, status: 'Active' },
  { id: 'c-4', name: 'Smart Watches & Bands', slug: 'smart-watches', parentCategory: 'Wearables', description: 'AMOLED Smartwatches & Fitness Trackers', productCount: 18, status: 'Active' },
  { id: 'c-5', name: 'Audio Accessories', slug: 'audio-accessories', parentCategory: 'Accessories', description: 'Replacement Earpads, Cables, Chargers & Adapters', productCount: 12, status: 'Active' }
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
  <div className="bg-[#FCF1E5] border border-[#EEAB59] rounded-t p-1.5 flex flex-wrap items-center gap-1 text-[#545454] text-xs select-none">
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
    <div className="h-4 w-px bg-[#EEAB59] mx-1" />
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Bold className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Italic className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Underline className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded font-black"><Strikethrough className="w-3.5 h-3.5" /></button>
    <div className="h-4 w-px bg-[#EEAB59] mx-1" />
    <span className="p-1 hover:bg-white rounded font-black text-xs">A</span>
    <span className="p-1 hover:bg-white rounded bg-[#FCF1E5] font-black text-xs">A</span>
    <span className="p-1 hover:bg-white rounded text-[10px]">x₂</span>
    <span className="p-1 hover:bg-white rounded text-[10px]">x²</span>
    <div className="h-4 w-px bg-[#EEAB59] mx-1" />
    <button type="button" className="p-1 hover:bg-white rounded"><AlignLeft className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><AlignCenter className="w-3.5 h-3.5" /></button>
    <button type="button" className="p-1 hover:bg-white rounded"><AlignRight className="w-3.5 h-3.5" /></button>
    <div className="h-4 w-px bg-[#EEAB59] mx-1" />
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
  <div className="border-2 border-dashed border-[#EEAB59] hover:border-[#E67E00] bg-[#FCF1E5]/30 hover:bg-[#FCF1E5]/60 transition-all rounded p-6 text-center cursor-pointer flex flex-col items-center justify-center gap-2">
    <UploadCloud className="w-8 h-8 text-[#E67E00]" />
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

  // Search filters
  const [searchQuery, setSearchQuery] = useState('');
  const [ledgerSkuSearch, setLedgerSkuSearch] = useState('');
  const [ledgerDateFrom, setLedgerDateFrom] = useState('');
  const [ledgerDateTo, setLedgerDateTo] = useState('');

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
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-6">
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
                  className="w-full px-3.5 py-2 bg-[#FCF1E5]/40 border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E]"
                />
              </div>

              {/* Single Product Details Box */}
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-3">
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
                      className="w-full px-3 py-1.5 bg-[#FCF1E5] border border-[#EEAB59] rounded text-xs font-mono font-bold text-[#0E0E0E]"
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
                  className="px-6 py-2.5 bg-transparent border-1.5 border-[#E67E00] text-[#E67E00] hover:bg-[#FCF1E5] text-xs font-semibold rounded-full transition-all"
                >
                  Back Now
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all"
                >
                  Save & Submit
                </button>
              </div>

            </div>

            {/* RIGHT SIDEBAR COLUMN (1 Col) */}
            <div className="space-y-5">
              
              {/* Configuration */}
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#EEAB59]/50 pb-2">
                  Configuration
                </h3>
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-[#0E0E0E] block mb-1">Delivery Charge</span>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-1.5 cursor-pointer text-[#545454] font-medium">
                        <input type="radio" name="delivery" defaultChecked className="accent-[#E67E00]" />
                        <span>Free</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer text-[#545454] font-medium">
                        <input type="radio" name="delivery" className="accent-[#E67E00]" />
                        <span>Yes</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-[#545454] font-medium">
                      <input type="checkbox" defaultChecked className="rounded accent-[#E67E00]" />
                      <span>Cash on Delivery</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[#545454] font-medium">
                      <input type="checkbox" className="rounded accent-[#E67E00]" />
                      <span>Return Policy</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-[#545454] font-medium">
                      <input type="checkbox" className="rounded accent-[#E67E00]" />
                      <span>Warranty</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#EEAB59]/50 pb-2">
                  Quantity
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Max Quantity</label>
                    <input type="number" defaultValue={1} className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                    <p className="text-[10px] text-[#E67E00] italic mt-0.5">* If this value is null then no purchase limit for this product.</p>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Min Quantity</label>
                    <input type="number" defaultValue={1} className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                    <p className="text-[10px] text-[#E67E00] italic mt-0.5">* If this value is null then no purchase limit for this product.</p>
                  </div>
                </div>
              </div>

              {/* Product Video */}
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#EEAB59]/50 pb-2">
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
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#EEAB59]/50 pb-2">
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
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-2">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide">
                  Earning Limit Multiplier
                </h3>
                <input type="number" defaultValue={5} className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E]" />
                <p className="text-[10px] text-[#E67E00]">Enter the amount to multiply with the price to set user earning limit</p>
              </div>

              {/* Affiliate Commission */}
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#EEAB59]/50 pb-2">
                  Affiliate Commission
                </h3>
                <div className="flex items-center gap-4 text-xs font-medium text-[#545454]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="affiliate" defaultChecked className="accent-[#E67E00]" />
                    <span>Auto Affiliate</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="affiliate" className="accent-[#E67E00]" />
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
              <div className="bg-[#FCF1E5]/30 border border-[#EEAB59] rounded p-4 space-y-3">
                <h3 className="text-xs font-bold text-[#0E0E0E] uppercase tracking-wide border-b border-[#EEAB59]/50 pb-2">
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
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
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
                className="px-6 py-2.5 bg-transparent border-1.5 border-[#E67E00] text-[#E67E00] hover:bg-[#FCF1E5] text-xs font-semibold rounded-full transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all"
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
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
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
                className="px-6 py-2.5 bg-transparent border-1.5 border-[#E67E00] text-[#E67E00] hover:bg-[#FCF1E5] text-xs font-semibold rounded-full transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all"
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
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-6 max-w-3xl mx-auto">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-[#0E0E0E] tracking-tight">
              Add Variation
            </h2>
            <p className="text-xs font-bold text-[#E67E00]">
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
                className="px-6 py-2.5 bg-transparent border-1.5 border-[#E67E00] text-[#E67E00] hover:bg-[#FCF1E5] text-xs font-semibold rounded-full transition-all"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-6 py-2.5 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all"
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
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-6">
          
          <div className="border-b border-[#EEEEEE] pb-2">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              Product Ledger
            </h2>
          </div>

          {/* Ledger Search & Date Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end bg-[#FCF1E5]/30 p-4 rounded border border-[#EEAB59]">
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
                className="flex-1 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs uppercase rounded-full transition-all flex items-center justify-center gap-1"
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
                className="px-4 py-2 bg-transparent border-1.5 border-[#E67E00] text-[#E67E00] hover:bg-[#FCF1E5] font-bold text-xs uppercase rounded-full transition-all flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Product Ledger Table */}
          <div className="overflow-x-auto border border-[#EEAB59] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E67E00] text-white text-[11px] font-bold uppercase tracking-wider">
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
                {filteredLedger.map((row) => (
                  <tr key={row.sl} className="hover:bg-[#FCF1E5]/40 transition-colors">
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
                        row.trnxType === 'debit' ? 'bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59]' : 'bg-[#ECFFE8] text-[#008F2F]'
                      }`}>
                        {row.trnxType}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{row.quantity}</td>
                    <td className="p-3 font-mono font-bold text-[#E67E00] hover:underline cursor-pointer">{row.reference}</td>
                    <td className="p-3 text-[11px] text-[#8F8F8F] italic">{row.note}</td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{row.stock}</td>
                    <td className="p-3 text-[11px] font-semibold text-[#545454]">{row.updatedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-[#8F8F8F] pt-2">
            <span>Showing 1 to {filteredLedger.length} of 128389 results</span>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 bg-[#FCF1E5] border border-[#EEAB59] rounded text-[#E67E00] font-bold">&lt;</button>
              <button className="px-2.5 py-1 bg-[#E67E00] text-white rounded font-bold">1</button>
              <button className="px-2.5 py-1 bg-[#FCF1E5]/50 hover:bg-[#FCF1E5] rounded text-[#0E0E0E]">2</button>
              <button className="px-2.5 py-1 bg-[#FCF1E5]/50 hover:bg-[#FCF1E5] rounded text-[#0E0E0E]">3</button>
              <button className="px-2.5 py-1 bg-[#FCF1E5] border border-[#EEAB59] rounded text-[#E67E00] font-bold">&gt;</button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. VIEW: MY PRODUCTS (CATALOG TABLE) */}
      {/* ========================================================================= */}
      {currentTab === 'MY_PRODUCTS' && (
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              All Products Catalog ({products.length})
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative max-w-xs w-full">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8F8F8F]" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..." 
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F]"
                />
              </div>
              <button 
                onClick={() => changeSubTab('ADD_PRODUCT')}
                className="px-4 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-[#EEAB59] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E67E00] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock Status</th>
                  <th className="p-3">Sales</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {products
                  .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-[#FCF1E5]/40 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img src={p.image} alt={p.title} className="w-10 h-10 object-cover rounded border border-[#EEAB59] shrink-0" />
                        <div>
                          <div className="font-bold text-[#0E0E0E] line-clamp-1">{p.title}</div>
                          <div className="text-[10px] text-[#8F8F8F] font-medium">{p.description}</div>
                        </div>
                      </td>
                      <td className="p-3 font-bold text-[#0E0E0E]">৳{p.price.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          p.inStock ? 'bg-[#ECFFE8] text-[#008F2F]' : 'bg-[#FFF0F0] text-[#FF0000] border border-[#FF0000]'
                        }`}>
                          {p.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-[#545454]">{p.salesCount} sold</td>
                      <td className="p-3 font-bold text-[#E67E00]">★ {p.rating}</td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => changeSubTab('ADD_PRODUCT')}
                          className="p-1.5 bg-[#FCF1E5] hover:bg-[#E67E00] text-[#E67E00] hover:text-white rounded transition-colors mr-1"
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

      {/* ========================================================================= */}
      {/* 7. VIEW: BRANDS TABLE */}
      {/* ========================================================================= */}
      {currentTab === 'BRANDS' && (
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              Manage Brands ({brands.length})
            </h2>
            <button 
              onClick={() => changeSubTab('ADD_BRAND')}
              className="px-4 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Brand</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#EEAB59] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E67E00] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Brand Name</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Products</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {brands.map((b) => (
                  <tr key={b.id} className="hover:bg-[#FCF1E5]/40 transition-colors">
                    <td className="p-3 font-bold text-[#0E0E0E] flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#E67E00]" />
                      <span>{b.name}</span>
                    </td>
                    <td className="p-3 font-mono text-[#8F8F8F] text-[11px]">{b.slug}</td>
                    <td className="p-3 text-[#545454] max-w-xs">{b.description}</td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{b.productCount} items</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#ECFFE8] text-[#008F2F] uppercase">
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => changeSubTab('ADD_BRAND')}
                        className="p-1.5 bg-[#FCF1E5] hover:bg-[#E67E00] text-[#E67E00] hover:text-white rounded transition-colors"
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

      {/* ========================================================================= */}
      {/* 8. VIEW: CATEGORIES TABLE */}
      {/* ========================================================================= */}
      {currentTab === 'CATEGORIES' && (
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              All Categories ({categories.length})
            </h2>
            <button 
              onClick={() => changeSubTab('ADD_CATEGORY')}
              className="px-4 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#EEAB59] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E67E00] text-white text-[11px] font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-3">Category Name</th>
                  <th className="p-3">Parent Category</th>
                  <th className="p-3">Slug</th>
                  <th className="p-3">Products</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white font-medium text-[#545454]">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-[#FCF1E5]/40 transition-colors">
                    <td className="p-3 font-bold text-[#0E0E0E] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#E67E00]" />
                      <span>{c.name}</span>
                    </td>
                    <td className="p-3 text-[#545454] font-semibold">{c.parentCategory}</td>
                    <td className="p-3 font-mono text-[#8F8F8F] text-[11px]">{c.slug}</td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{c.productCount} items</td>
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#ECFFE8] text-[#008F2F] uppercase">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        onClick={() => changeSubTab('ADD_CATEGORY')}
                        className="p-1.5 bg-[#FCF1E5] hover:bg-[#E67E00] text-[#E67E00] hover:text-white rounded transition-colors"
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

      {/* ========================================================================= */}
      {/* 9. VIEW: VARIATIONS TABLE (COLOR, SIZE, WEIGHT) */}
      {/* ========================================================================= */}
      {currentTab === 'VARIATIONS' && (
        <div className="bg-white border border-[#EEAB59] rounded p-4 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0E0E0E] tracking-tight">
              Product Variations (Color, Size, Weight) ({variations.length})
            </h2>
            <button 
              onClick={() => changeSubTab('ADD_VARIATION')}
              className="px-4 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Variation</span>
            </button>
          </div>

          <div className="overflow-x-auto border border-[#EEAB59] rounded">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#E67E00] text-white text-[11px] font-bold uppercase tracking-wider">
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
                  <tr key={v.id} className="hover:bg-[#FCF1E5]/40 transition-colors">
                    <td className="p-3">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59]">
                        {v.type}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-[#0E0E0E]">{v.name}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {v.type === 'Color' && (
                          <span className="w-4 h-4 rounded-full border border-[#EEAB59] shrink-0" style={{ backgroundColor: v.code }} />
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
                        className="p-1.5 bg-[#FCF1E5] hover:bg-[#E67E00] text-[#E67E00] hover:text-white rounded transition-colors"
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
