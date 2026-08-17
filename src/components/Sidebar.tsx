import React, { useState } from 'react';
import { 
  BarChart2, 
  ShoppingBag, 
  Package,
  Users, 
  ShieldAlert, 
  ShoppingCart, 
  Settings,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  Tag,
  Layers,
  Sliders,
  FileSpreadsheet,
  FileText,
  Plus,
  List,
  DollarSign,
  ArrowRightLeft,
  Receipt,
  SlidersHorizontal
} from 'lucide-react';
import { NavigationTab, ProductSubTab, FinanceSubTab, PurchaseSubTab, StockSubTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  productSubTab?: ProductSubTab;
  onProductSubTabChange?: (subTab: ProductSubTab) => void;
  stockSubTab?: StockSubTab;
  onStockSubTabChange?: (subTab: StockSubTab) => void;
  financeSubTab?: FinanceSubTab;
  onFinanceSubTabChange?: (subTab: FinanceSubTab) => void;
  purchaseSubTab?: PurchaseSubTab;
  onPurchaseSubTabChange?: (subTab: PurchaseSubTab) => void;
  unreadOrderCount: number;
  unreadLeadCount: number;
  themeMode: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenStorefrontPreview: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  productSubTab = 'MY_PRODUCTS',
  onProductSubTabChange,
  stockSubTab = 'ALL_STOCK',
  onStockSubTabChange,
  financeSubTab = 'BALANCE_TRANSFER',
  onFinanceSubTabChange,
  purchaseSubTab = 'MANAGE_PURCHASE',
  onPurchaseSubTabChange,
  unreadOrderCount,
  unreadLeadCount,
  onOpenStorefrontPreview
}) => {
  // Accordion state for PRODUCTS, STOCK, FINANCE & PURCHASES dropdowns
  const [productsModuleOpen, setProductsModuleOpen] = useState(true);
  const [stockModuleOpen, setStockModuleOpen] = useState(true);
  const [financeModuleOpen, setFinanceModuleOpen] = useState(true);
  const [purchasesModuleOpen, setPurchasesModuleOpen] = useState(true);

  const handleSubTabClick = (sub: ProductSubTab) => {
    if (onProductSubTabChange) {
      onProductSubTabChange(sub);
    }
    if (activeTab !== 'products') {
      onTabChange('products');
    }
  };

  const handleStockSubTabClick = (sub: StockSubTab) => {
    if (onStockSubTabChange) {
      onStockSubTabChange(sub);
    }
    if (activeTab !== 'stock') {
      onTabChange('stock');
    }
  };

  const handleFinanceSubTabClick = (sub: FinanceSubTab) => {
    if (onFinanceSubTabChange) {
      onFinanceSubTabChange(sub);
    }
    if (activeTab !== 'finance') {
      onTabChange('finance');
    }
  };

  const handlePurchaseSubTabClick = (sub: PurchaseSubTab) => {
    if (onPurchaseSubTabChange) {
      onPurchaseSubTabChange(sub);
    }
    if (activeTab !== 'purchases') {
      onTabChange('purchases');
    }
  };

  return (
    <aside
      id="left_sidebar"
      className="w-64 h-screen sticky top-0 bg-[#0E0E0E] text-slate-200 border-r border-slate-800 shrink-0 flex flex-col justify-between select-none z-30 font-sans overflow-y-auto"
    >
      <div>
        {/* Sidebar Header with Brand Logo */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-[#080808]">
          <div className="flex items-center gap-2.5">
            <svg className="w-8 h-8 shrink-0" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Blue Bracket Outer Frame */}
              <path
                d="M 25 15 H 65 C 76 15 85 24 85 35 V 65 C 85 76 76 85 65 85 H 50"
                stroke="#0072CE"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M 35 15 H 25 C 14 15 5 24 5 35 V 50"
                stroke="#0072CE"
                strokeWidth="14"
                strokeLinecap="round"
              />
              {/* Dual-Tone Orange Navigation Arrow */}
              <path
                d="M 58 28 L 38 88 L 46 58 Z"
                fill="#D84315"
              />
              <path
                d="M 58 28 L 46 58 L 82 42 Z"
                fill="#FF6D00"
              />
            </svg>
            <div className="flex flex-col">
              <span className="text-xs font-black tracking-wider text-white leading-none">
                PROMISE <span className="text-[#B8623B]">MART</span>
              </span>
              <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase mt-1">
                ADMIN PANEL
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu List */}
        <nav className="p-2 space-y-1 mt-1">
          
          {/* 1. DASHBOARD */}
          <button
            onClick={() => onTabChange('dashboard')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#B8623B] text-white shadow-2xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BarChart2 className={`w-4 h-4 ${activeTab === 'dashboard' ? 'text-white' : 'text-[#B8623B]'}`} />
              <span>DASHBOARD</span>
            </div>
          </button>

          {/* 2. ORDERS */}
          <button
            onClick={() => onTabChange('orders')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'orders'
                ? 'bg-[#B8623B] text-white shadow-2xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className={`w-4 h-4 ${activeTab === 'orders' ? 'text-white' : 'text-[#B8623B]'}`} />
              <span>ORDERS</span>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-black rounded-full border border-red-500 text-red-400 bg-red-950/50">
              28
            </span>
          </button>

          {/* 3. PRODUCT MODULE WITH CLEAN DROPDOWN SUB-ITEMS */}
          <div>
            <button
              onClick={() => {
                onTabChange('products');
                setProductsModuleOpen(!productsModuleOpen);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'products'
                  ? 'bg-[#B8623B] text-white shadow-2xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className={`w-4 h-4 ${activeTab === 'products' ? 'text-white' : 'text-[#B8623B]'}`} />
                <span>PRODUCT</span>
              </div>
              {productsModuleOpen ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-70" />
              )}
            </button>

            {/* DROPDOWN OPTIONS */}
            {productsModuleOpen && (
              <div className="pl-6 pr-1 py-1 mt-1 space-y-1 text-[11px] font-bold">
                
                {/* 1. Category */}
                <button
                  onClick={() => handleSubTabClick('CATEGORIES')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'products' && (productSubTab === 'CATEGORIES' || productSubTab === 'ADD_CATEGORY')
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Category</span>
                </button>

                {/* 2. Brand */}
                <button
                  onClick={() => handleSubTabClick('BRANDS')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'products' && (productSubTab === 'BRANDS' || productSubTab === 'ADD_BRAND')
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Brand</span>
                </button>

                {/* 3. Product */}
                <button
                  onClick={() => handleSubTabClick('MY_PRODUCTS')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'products' && (productSubTab === 'MY_PRODUCTS' || productSubTab === 'ADD_PRODUCT')
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Product</span>
                </button>

                {/* 4. Variation */}
                <button
                  onClick={() => handleSubTabClick('VARIATIONS')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'products' && (productSubTab === 'VARIATIONS' || productSubTab === 'ADD_VARIATION')
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Variation</span>
                </button>

                {/* 5. Product Ledger */}
                <button
                  onClick={() => handleSubTabClick('PRODUCT_LEDGER')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'products' && productSubTab === 'PRODUCT_LEDGER'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Product Ledger</span>
                </button>

              </div>
            )}
          </div>

          {/* 4. STOCK MANAGEMENT MODULE WITH DROPDOWN SUB-ITEMS */}
          <div>
            <button
              onClick={() => {
                onTabChange('stock');
                setStockModuleOpen(!stockModuleOpen);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'stock'
                  ? 'bg-[#B8623B] text-white shadow-2xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className={`w-4 h-4 ${activeTab === 'stock' ? 'text-white' : 'text-[#B8623B]'}`} />
                <span>STOCK MANAGEMENT</span>
              </div>
              {stockModuleOpen ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-70" />
              )}
            </button>

            {/* DROPDOWN OPTIONS: All Stock, All Barcode */}
            {stockModuleOpen && (
              <div className="pl-6 pr-1 py-1 mt-1 space-y-1 text-[11px] font-bold">
                
                {/* 1. All Stock */}
                <button
                  onClick={() => handleStockSubTabClick('ALL_STOCK')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'stock' && stockSubTab === 'ALL_STOCK'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>All Stock</span>
                </button>

                {/* 2. All Barcode */}
                <button
                  onClick={() => handleStockSubTabClick('ALL_BARCODE')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'stock' && stockSubTab === 'ALL_BARCODE'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>All Barcode</span>
                </button>

              </div>
            )}
          </div>

          {/* 5. FINANCE MODULE WITH DROPDOWN SUB-ITEMS */}
          <div>
            <button
              onClick={() => {
                onTabChange('finance');
                setFinanceModuleOpen(!financeModuleOpen);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'finance'
                  ? 'bg-[#B8623B] text-white shadow-2xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <DollarSign className={`w-4 h-4 ${activeTab === 'finance' ? 'text-white' : 'text-[#B8623B]'}`} />
                <span>FINANCE</span>
              </div>
              {financeModuleOpen ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-70" />
              )}
            </button>

            {/* DROPDOWN OPTIONS */}
            {financeModuleOpen && (
              <div className="pl-6 pr-1 py-1 mt-1 space-y-1 text-[11px] font-bold">
                
                {/* 1. Balance Transfer */}
                <button
                  onClick={() => handleFinanceSubTabClick('BALANCE_TRANSFER')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'finance' && financeSubTab === 'BALANCE_TRANSFER'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Balance Transfer</span>
                </button>

                {/* 2. Transactions */}
                <button
                  onClick={() => handleFinanceSubTabClick('TRANSACTIONS')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'finance' && financeSubTab === 'TRANSACTIONS'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Transactions</span>
                </button>

                {/* 3. POS Settings */}
                <button
                  onClick={() => handleFinanceSubTabClick('POS_SETTINGS')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'finance' && financeSubTab === 'POS_SETTINGS'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>POS Settings</span>
                </button>

              </div>
            )}
          </div>

          {/* 5. PURCHASES MODULE WITH DROPDOWN SUB-ITEMS */}
          <div>
            <button
              onClick={() => {
                onTabChange('purchases');
                setPurchasesModuleOpen(!purchasesModuleOpen);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                activeTab === 'purchases'
                  ? 'bg-[#B8623B] text-white shadow-2xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className={`w-4 h-4 ${activeTab === 'purchases' ? 'text-white' : 'text-[#B8623B]'}`} />
                <span>PURCHASES</span>
              </div>
              {purchasesModuleOpen ? (
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 opacity-70" />
              )}
            </button>

            {/* DROPDOWN OPTIONS */}
            {purchasesModuleOpen && (
              <div className="pl-6 pr-1 py-1 mt-1 space-y-1 text-[11px] font-bold">
                
                {/* 1. Add New Purchase */}
                <button
                  onClick={() => handlePurchaseSubTabClick('ADD_PURCHASE')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'purchases' && purchaseSubTab === 'ADD_PURCHASE'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Add New Purchase</span>
                </button>

                {/* 2. Manage Purchase */}
                <button
                  onClick={() => handlePurchaseSubTabClick('MANAGE_PURCHASE')}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-full transition-all ${
                    activeTab === 'purchases' && purchaseSubTab === 'MANAGE_PURCHASE'
                      ? 'bg-[#ECFFE8] text-[#008F2F] font-extrabold border border-[#008F2F]'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>Manage Purchase</span>
                </button>

              </div>
            )}
          </div>

          {/* 6. CUSTOMERS */}
          <button
            onClick={() => onTabChange('customers')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'customers'
                ? 'bg-[#B8623B] text-white shadow-2xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className={`w-4 h-4 ${activeTab === 'customers' ? 'text-white' : 'text-[#B8623B]'}`} />
              <span>CUSTOMERS</span>
            </div>
          </button>

          {/* 5. FRAUD CHECK */}
          <button
            onClick={() => onTabChange('fraudCheck')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'fraudCheck'
                ? 'bg-[#B8623B] text-white shadow-2xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShieldAlert className={`w-4 h-4 ${activeTab === 'fraudCheck' ? 'text-white' : 'text-[#B8623B]'}`} />
              <span>FRAUD CHECK</span>
            </div>
          </button>

          {/* 6. LANDING PAGE BUILDER */}
          <button
            onClick={() => onTabChange('storefront')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'storefront'
                ? 'bg-[#B8623B] text-white shadow-2xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ShoppingCart className={`w-4 h-4 ${activeTab === 'storefront' ? 'text-white' : 'text-[#B8623B]'}`} />
              <span>LANDING PAGE BUILDER</span>
            </div>
          </button>

          {/* 7. CONTROL CENTER */}
          <button
            onClick={() => onTabChange('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all ${
              activeTab === 'settings'
                ? 'bg-[#B8623B] text-white shadow-2xs'
                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className={`w-4 h-4 ${activeTab === 'settings' ? 'text-white' : 'text-[#B8623B]'}`} />
              <span>CONTROL CENTER</span>
            </div>
          </button>

        </nav>
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-slate-800 text-[11px] font-bold text-slate-400 flex items-center justify-between">
        <span>Shop Owner</span>
        <button
          onClick={onOpenStorefrontPreview}
          className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-200 transition-colors flex items-center gap-1 text-[10px] uppercase font-black"
        >
          <span>Store</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};

