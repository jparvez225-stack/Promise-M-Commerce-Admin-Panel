import React, { useState } from 'react';
import { 
  Store, 
  Eye, 
  Smartphone, 
  Monitor, 
  Save, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  DollarSign, 
  CreditCard, 
  Star, 
  ShoppingBag,
  ExternalLink,
  RotateCcw,
  Globe,
  Search,
  Share2,
  Code,
  Tag,
  BarChart2,
  Edit,
  Copy,
  ArrowLeft,
  Filter,
  FileText,
  MousePointerClick,
  TrendingUp,
  X,
  Download,
  HelpCircle,
  Calendar,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { StorefrontConfig, Order } from '../../types';

export interface LandingPageItem {
  id: string;
  title: string;
  slug: string;
  status: 'Published' | 'Draft' | 'Archived';
  views: number;
  conversions: number;
  revenue: number;
  createdAt: string;
  config: StorefrontConfig;
}

interface DynamicStorefrontProps {
  config: StorefrontConfig;
  onUpdateConfig: (newConfig: StorefrontConfig) => void;
  onPlaceTestOrder: (order: Order) => void;
}

export const DynamicStorefront: React.FC<DynamicStorefrontProps> = ({
  config,
  onUpdateConfig,
  onPlaceTestOrder
}) => {
  // Navigation View: 'list' (All Pages Table) or 'builder' (Editor)
  const [currentView, setCurrentView] = useState<'list' | 'builder'>('list');

  // Multi-Landing Pages List State
  const [landingPages, setLandingPages] = useState<LandingPageItem[]>([
    {
      id: 'lp-1',
      title: 'Aura Pro Studio ANC Headphones',
      slug: 'aura-pro-anc',
      status: 'Published',
      views: 18450,
      conversions: 1420,
      revenue: 3479000,
      createdAt: '2026-07-10',
      config: config
    },
    {
      id: 'lp-2',
      title: 'Smart Watch Series X Ultra',
      slug: 'smart-watch-x',
      status: 'Published',
      views: 12100,
      conversions: 890,
      revenue: 2225000,
      createdAt: '2026-07-15',
      config: {
        ...config,
        productTitle: 'Smart Watch Series X Ultra',
        productSubTitle: '1.96" AMOLED & Bluetooth Calling',
        productDescription: 'Zinc-alloy smartwatch with 1.96-inch HD AMOLED display, 24/7 heart rate monitoring, IP68 waterproofing, and 100+ sports modes.',
        basePrice: 2500,
        originalPrice: 3500,
        deliveryInsideDhaka: 60,
        deliverySubDhaka: 80,
        deliveryOutsideDhaka: 120,
        features: [
          'HD AMOLED Always-On Display',
          'Bluetooth HD Phone Calling',
          'IP68 Waterproofing Rating',
          '7-Day Long Battery Backup'
        ]
      }
    },
    {
      id: 'lp-3',
      title: 'Ergonomic RGB Wireless Gaming Mouse',
      slug: 'rgb-gaming-mouse',
      status: 'Published',
      views: 8320,
      conversions: 610,
      revenue: 915000,
      createdAt: '2026-07-20',
      config: {
        ...config,
        productTitle: 'Ergonomic RGB Wireless Gaming Mouse',
        productSubTitle: '16,000 DPI Optical Sensor',
        productDescription: 'Ultra-fast 2.4GHz wireless esports mouse with customizable RGB lighting, 8 macro buttons, and 70-hour continuous battery life.',
        basePrice: 1500,
        originalPrice: 2200,
        deliveryInsideDhaka: 60,
        deliverySubDhaka: 80,
        deliveryOutsideDhaka: 130
      }
    },
    {
      id: 'lp-4',
      title: 'Genuine Leather Wallet & Belt Gift Set',
      slug: 'leather-gift-set',
      status: 'Draft',
      views: 3200,
      conversions: 190,
      revenue: 380000,
      createdAt: '2026-07-24',
      config: {
        ...config,
        productTitle: 'Genuine Leather Wallet & Belt Gift Set',
        productSubTitle: '100% Full Grain Leather',
        productDescription: 'Handcrafted premium leather gift box containing RFID-blocking bifold wallet and reversible formal leather belt.',
        basePrice: 2000,
        originalPrice: 2800
      }
    }
  ]);

  // Selected Page ID being edited in builder
  const [selectedPageId, setSelectedPageId] = useState<string>('lp-1');

  // Currently active page object
  const activePage = landingPages.find(p => p.id === selectedPageId) || landingPages[0];

  // Current config for active page
  const currentActiveConfig = activePage ? activePage.config : config;

  // Search & Filter state for List View
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  // Create New Page Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageCategory, setNewPageCategory] = useState('Electronics');

  // Builder Editing States
  const [activeBuilderTab, setActiveBuilderTab] = useState<'content' | 'pricing' | 'payments' | 'reviews' | 'seo'>('content');
  const [previewMode, setPreviewMode] = useState<'split' | 'desktop' | 'mobile'>('split');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // SEO Meta Data default fallback and helper
  const defaultSeo = {
    metaTitle: currentActiveConfig.productTitle ? `${currentActiveConfig.productTitle} - Special Offer` : 'Landing Page - Special Offer',
    metaDescription: currentActiveConfig.productDescription || 'Buy high quality products online in Bangladesh with Cash On Delivery & Fast Shipping.',
    metaKeywords: 'online shop, ecommerce bd, special deal, fast delivery',
    canonicalUrl: `https://promisemart.com/landing/${activePage?.slug || 'page'}`,
    ogTitle: currentActiveConfig.productTitle || 'Promisemart Special Offer',
    ogDescription: currentActiveConfig.productDescription || 'Shop high quality products with 100% warranty & fast shipping in BD.',
    ogImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Product' as const,
    allowIndexing: true,
    googleAnalyticsId: 'G-789234110',
    fbPixelId: 'PIXEL-901823712'
  };

  const currentSeo = currentActiveConfig.seo || defaultSeo;

  // Handler to update config of active selected page
  const handleUpdateActiveConfig = (updatedConfig: StorefrontConfig) => {
    setLandingPages(prev =>
      prev.map(p => (p.id === selectedPageId ? { ...p, config: updatedConfig } : p))
    );
    onUpdateConfig(updatedConfig);
  };

  const updateSeo = (updatedFields: Partial<typeof defaultSeo>) => {
    handleUpdateActiveConfig({
      ...currentActiveConfig,
      seo: { ...currentSeo, ...updatedFields }
    });
  };

  // Switch to page for editing
  const handleEditPage = (pageId: string) => {
    const pageToEdit = landingPages.find(p => p.id === pageId);
    if (pageToEdit) {
      setSelectedPageId(pageId);
      onUpdateConfig(pageToEdit.config);
      setCurrentView('builder');
    }
  };

  // Create New Landing Page Handler
  const handleCreateNewPageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPageTitle.trim()) return;

    const generatedSlug = newPageSlug.trim() 
      ? newPageSlug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')
      : newPageTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const newPage: LandingPageItem = {
      id: `lp-${Date.now()}`,
      title: newPageTitle,
      slug: generatedSlug,
      status: 'Published',
      views: 0,
      conversions: 0,
      revenue: 0,
      createdAt: new Date().toISOString().substring(0, 10),
      config: {
        ...config,
        productTitle: newPageTitle,
        productSubTitle: `${newPageCategory} - Premium Edition`,
        productDescription: `Discover high-performance ${newPageTitle} with exclusive discounts, fast home delivery across Bangladesh, and cash on delivery guarantee.`,
        basePrice: 1990,
        originalPrice: 2990
      }
    };

    setLandingPages([newPage, ...landingPages]);
    setSelectedPageId(newPage.id);
    onUpdateConfig(newPage.config);
    setIsCreateModalOpen(false);
    setNewPageTitle('');
    setNewPageSlug('');
    setCurrentView('builder');
  };

  // Duplicate Landing Page Handler
  const handleDuplicatePage = (page: LandingPageItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const duplicatedPage: LandingPageItem = {
      ...page,
      id: `lp-${Date.now()}`,
      title: `${page.title} (Copy)`,
      slug: `${page.slug}-copy`,
      status: 'Draft',
      views: 0,
      conversions: 0,
      revenue: 0,
      createdAt: new Date().toISOString().substring(0, 10),
      config: {
        ...page.config,
        productTitle: `${page.config.productTitle} (Copy)`
      }
    };
    setLandingPages([duplicatedPage, ...landingPages]);
  };

  // Delete Landing Page Handler
  const handleDeletePage = (pageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (landingPages.length <= 1) {
      alert('You must keep at least one landing page.');
      return;
    }
    if (confirm('Are you sure you want to delete this landing page?')) {
      const remaining = landingPages.filter(p => p.id !== pageId);
      setLandingPages(remaining);
      if (selectedPageId === pageId) {
        setSelectedPageId(remaining[0].id);
        onUpdateConfig(remaining[0].config);
      }
    }
  };

  // Test checkout form state for live preview interactive order placement
  const [testFormName, setTestFormName] = useState('Tanvir Rahman');
  const [testFormPhone, setTestFormPhone] = useState('01712345678');
  const [testFormAddress, setTestFormAddress] = useState('House #24, Road #12, Block #B, Dhanmondi, Dhaka');
  const [testFormZone, setTestFormZone] = useState<'Inside Dhaka' | 'Outside Dhaka' | 'Remote Area'>('Inside Dhaka');
  const [testFormColor, setTestFormColor] = useState('Midnight Black');
  const [testFormPayment, setTestFormPayment] = useState<'Cash On Delivery' | 'bKash/Merchant' | 'Card/Bank'>('Cash On Delivery');
  const [testOrderPlaced, setTestOrderPlaced] = useState(false);

  const shippingCost = testFormZone === 'Inside Dhaka' ? currentActiveConfig.deliveryInsideDhaka : testFormZone === 'Outside Dhaka' ? currentActiveConfig.deliverySubDhaka : currentActiveConfig.deliveryOutsideDhaka;
  const testTotal = currentActiveConfig.basePrice + shippingCost;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleTestOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `#ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: testFormName || 'Valued Customer',
      customerPhone: testFormPhone || '01700000000',
      customerAddress: testFormAddress || 'Dhaka, Bangladesh',
      cityZone: testFormZone === 'Inside Dhaka' ? 'Inside Dhaka (৳60)' : testFormZone === 'Outside Dhaka' ? 'Outside Dhaka (৳80)' : 'Remote Area (৳130)',
      shippingCost: shippingCost,
      items: [
        {
          id: `item-${Date.now()}`,
          name: currentActiveConfig.productTitle,
          variant: testFormColor,
          price: currentActiveConfig.basePrice,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
        }
      ],
      totalAmount: testTotal,
      paymentMethod: testFormPayment,
      status: 'Pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      expectedDelivery: 'Tuesday, Jul 28, 2026',
      notes: `Test order from Landing Page: ${activePage?.title}`
    };

    onPlaceTestOrder(newOrder);
    setTestOrderPlaced(true);
    setTimeout(() => setTestOrderPlaced(false), 3000);
  };

  // Filtered pages for List View
  const filteredPages = landingPages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchQuery.toLowerCase()) || page.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Totals for header KPI
  const totalViewsSum = landingPages.reduce((acc, p) => acc + p.views, 0);
  const totalConversionsSum = landingPages.reduce((acc, p) => acc + p.conversions, 0);
  const totalRevenueSum = landingPages.reduce((acc, p) => acc + p.revenue, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* ========================================================================= */}
      {/* VIEW 1: LANDING PAGES LIST VIEW (সকল ল্যান্ডিং পেজ তালিকা) */}
      {/* ========================================================================= */}
      {currentView === 'list' && (
        <div className="space-y-5">
          {/* Top Control & Search Header Box (Exact Design System from Screenshot) */}
          <div className="border border-[#EEAB59] rounded bg-white p-4 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-black bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 rounded uppercase tracking-wider inline-block mb-1">
                  SYSTEM READY
                </span>
                <h2 className="text-xl font-bold text-[#0E0E0E] uppercase tracking-tight">
                  LANDING PAGES & RECOVERY MANAGEMENT
                </h2>
                <p className="text-xs font-medium text-[#545454] mt-0.5">
                  Operational lead salvage, product sales conversion & live page editing
                </p>
              </div>

              {/* Action Buttons & Quick Search */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[#8F8F8F] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by title, slug or product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1.5 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none w-56 placeholder:text-[#8F8F8F]"
                  />
                </div>

                <button
                  onClick={() => alert('Exporting landing page performance metrics to CSV...')}
                  className="px-3 py-1.5 border border-[#EEAB59] text-[#E67E00] hover:bg-[#FCF1E5] font-bold text-xs rounded-full transition-all flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>EXPORT CSV</span>
                </button>

                <button
                  onClick={() => alert('Opening tutorial guide for Landing Page Builder...')}
                  className="px-3 py-1.5 border border-[#EEAB59] text-[#E67E00] hover:bg-[#FCF1E5] font-bold text-xs rounded-full transition-all flex items-center gap-1.5 shrink-0"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>TUTORIAL</span>
                </button>

                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-2xs shrink-0 uppercase tracking-wider"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>NEW PAGE</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Stats Overview KPI Cards (Exact rounded & border style from screenshot) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white border border-[#EEAB59] p-4 rounded shadow-2xs">
              <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-wide block mb-1">Total Landing Pages</span>
              <div className="text-2xl font-bold text-[#0E0E0E]">{landingPages.length} Pages</div>
              <span className="text-[10px] text-[#008F2F] font-bold mt-1 inline-block">100% Active & Operational</span>
            </div>

            <div className="bg-white border border-[#EEAB59] p-4 rounded shadow-2xs">
              <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-wide block mb-1">Total Page Traffic</span>
              <div className="text-2xl font-bold text-[#0E0E0E]">{totalViewsSum.toLocaleString()} Views</div>
              <span className="text-[10px] text-[#E67E00] font-bold mt-1 inline-block">+18.4% conversion velocity</span>
            </div>

            <div className="bg-white border border-[#EEAB59] p-4 rounded shadow-2xs">
              <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-wide block mb-1">Orders Converted</span>
              <div className="text-2xl font-bold text-[#0E0E0E]">{totalConversionsSum.toLocaleString()} Orders</div>
              <span className="text-[10px] text-[#008F2F] font-bold mt-1 inline-block">
                Avg. CR: {((totalConversionsSum / (totalViewsSum || 1)) * 100).toFixed(1)}%
              </span>
            </div>

            <div className="bg-white border border-[#EEAB59] p-4 rounded shadow-2xs">
              <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-wide block mb-1">Generated Revenue</span>
              <div className="text-2xl font-bold text-[#E67E00]">৳ {totalRevenueSum.toLocaleString()}</div>
              <span className="text-[10px] text-[#008F2F] font-bold mt-1 inline-block">Direct Checkout Revenue</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setStatusFilter('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-2xs ${
                statusFilter === 'All'
                  ? 'bg-[#E67E00] text-white'
                  : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
              }`}
            >
              LANDING PAGES LIST ({landingPages.length})
            </button>

            <button
              onClick={() => setStatusFilter('Published')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-2xs ${
                statusFilter === 'Published'
                  ? 'bg-[#E67E00] text-white'
                  : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
              }`}
            >
              HOT PAGES / PUBLISHED ({landingPages.filter(p => p.status === 'Published').length})
            </button>

            <button
              onClick={() => setStatusFilter('Draft')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap shadow-2xs ${
                statusFilter === 'Draft'
                  ? 'bg-[#E67E00] text-white'
                  : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
              }`}
            >
              DRAFTS / ARCHIVED ({landingPages.filter(p => p.status === 'Draft').length})
            </button>
          </div>

          {/* Landing Pages Table (Matching Screenshot Transaction Ledger Exactly) */}
          <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs">
            {/* Table Header Bar */}
            <div className="p-4 border-b border-[#EEEEEE] bg-[#FCF1E5] flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">
                LANDING PAGES LEDGER
              </h3>
              <span className="text-xs font-semibold text-[#545454]">
                Showing {filteredPages.length} entries
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold tracking-wider text-[11px] uppercase">
                    <th className="py-3 px-4 w-12 text-center">SL#</th>
                    <th className="py-3 px-4">CUSTOMER / PAGE INFORMATIONS</th>
                    <th className="py-3 px-4">ITEMS & OFFER DETAILS</th>
                    <th className="py-3 px-4">TIMESTAMP & ACTIVITY</th>
                    <th className="py-3 px-4 text-center">STATUS</th>
                    <th className="py-3 px-4 text-center">OPERATIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
                  {filteredPages.map((page, index) => {
                    const cr = page.views > 0 ? ((page.conversions / page.views) * 100).toFixed(1) : '0.0';
                    const isCurrentlySelected = page.id === selectedPageId;

                    return (
                      <tr 
                        key={page.id} 
                        className={`hover:bg-[#FCF1E5]/40 transition-colors ${
                          isCurrentlySelected ? 'bg-[#FCF1E5]/60' : ''
                        }`}
                      >
                        {/* SL# */}
                        <td className="py-3.5 px-4 text-center font-bold text-[#8F8F8F]">
                          {index + 1}
                        </td>

                        {/* Customer / Page Info */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#FCF1E5] border border-[#EEAB59] flex items-center justify-center shrink-0">
                              <ShoppingBag className="w-4 h-4 text-[#E67E00]" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-[#0E0E0E]">{page.title}</span>
                                {isCurrentlySelected && (
                                  <span className="px-1.5 py-0.5 text-[8px] font-extrabold bg-[#E67E00] text-white rounded uppercase">
                                    ACTIVE EDITOR
                                  </span>
                                )}
                              </div>
                              <span className="font-mono text-[11px] text-[#545454] block mt-0.5">
                                Slug: <strong className="text-[#0E0E0E]">{page.slug}</strong>
                              </span>
                              <span className="text-[10px] text-[#8F8F8F]">
                                Views: {page.views.toLocaleString()} | Orders: {page.conversions.toLocaleString()} ({cr}% CR)
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Items & Offer Details */}
                        <td className="py-3.5 px-4 font-bold text-[#0E0E0E]">
                          <div className="text-xs font-bold text-[#0E0E0E]">
                            {page.config.productTitle || page.title} x 1
                          </div>
                          <div className="text-[11px] text-[#E67E00] font-bold mt-0.5">
                            Offer Price: ৳{page.config.basePrice.toLocaleString()}
                            {page.config.originalPrice && (
                              <span className="text-[10px] text-[#8F8F8F] line-through ml-1.5 font-normal">
                                ৳{page.config.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[#545454] font-medium">
                            Revenue: ৳{page.revenue.toLocaleString()}
                          </div>
                        </td>

                        {/* Timestamp & Activity */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#545454]">
                            <Calendar className="w-3.5 h-3.5 text-[#E67E00]" />
                            <span>Created: {page.createdAt || 'Just now'}</span>
                          </div>
                          <button 
                            onClick={() => handleEditPage(page.id)}
                            className="flex items-center gap-1 text-[11px] font-bold text-[#E67E00] hover:underline mt-1"
                          >
                            <MessageSquare className="w-3 h-3 text-[#EEAB59]" />
                            <span>Click to customize config</span>
                          </button>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              page.status === 'Published'
                                ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30'
                                : 'bg-[#FFF8EC] text-[#E67E00] border border-[#EEAB59]'
                            }`}
                          >
                            {page.status === 'Published' ? 'APPROVED' : 'PENDING'}
                          </span>
                        </td>

                        {/* Operations Button */}
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleEditPage(page.id)}
                              className="px-3 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded-full flex items-center gap-1 transition-all shadow-2xs uppercase tracking-wider"
                              title="Edit in Landing Page Builder"
                            >
                              <span>PROMOTE TO EDIT</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={(e) => handleDuplicatePage(page, e)}
                              className="p-1.5 hover:bg-[#FCF1E5] text-[#545454] hover:text-[#E67E00] rounded-full transition-all border border-[#EEAB59]/50"
                              title="Duplicate Page"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={(e) => handleDeletePage(page.id, e)}
                              className="p-1.5 hover:bg-red-50 text-[#545454] hover:text-[#FF0000] rounded-full transition-all border border-[#EEEEEE]"
                              title="Delete Page"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {filteredPages.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-[#545454] font-semibold">
                        No landing pages found matching your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: LANDING PAGE BUILDER EDITOR (পেজ বিল্ডার এডিটর) */}
      {/* ========================================================================= */}
      {currentView === 'builder' && (
        <div className="space-y-4">
          {/* Builder Editor Controls Sub-Header (Exact Screenshot Bar) */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3 md:p-3.5 border border-[#EEAB59] rounded shadow-2xs">
            {/* Left Page Selector & Back Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('list')}
                className="p-1.5 bg-white hover:bg-[#FCF1E5] border border-[#EEAB59] rounded-full transition-all text-[#0E0E0E]"
                title="Back to Landing Pages List"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold text-[#8F8F8F] uppercase tracking-wider">
                  EDITING LANDING PAGE:
                </span>
                <select
                  value={selectedPageId}
                  onChange={(e) => {
                    setSelectedPageId(e.target.value);
                    const targetP = landingPages.find(p => p.id === e.target.value);
                    if (targetP) onUpdateConfig(targetP.config);
                  }}
                  className="px-3 py-1 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                >
                  {landingPages.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.status})
                    </option>
                  ))}
                </select>

                <span className="font-mono text-xs text-[#545454] hidden sm:inline font-medium">
                  /landing/{activePage?.slug}
                </span>
              </div>
            </div>

            {/* Right Controls: View Mode Toggle & Save Button */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center p-0.5 bg-[#FAFAFA] border border-[#EEAB59] rounded-full text-xs font-bold">
                <button
                  id="preview-mode-split"
                  onClick={() => setPreviewMode('split')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    previewMode === 'split' ? 'bg-[#FCF1E5] text-[#E67E00] shadow-2xs' : 'text-[#545454] hover:text-[#0E0E0E]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>Split View</span>
                </button>
                <button
                  id="preview-mode-desktop"
                  onClick={() => setPreviewMode('desktop')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    previewMode === 'desktop' ? 'bg-[#FCF1E5] text-[#E67E00] shadow-2xs' : 'text-[#545454] hover:text-[#0E0E0E]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Full Preview</span>
                </button>
                <button
                  id="preview-mode-mobile"
                  onClick={() => setPreviewMode('mobile')}
                  className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                    previewMode === 'mobile' ? 'bg-[#FCF1E5] text-[#E67E00] shadow-2xs' : 'text-[#545454] hover:text-[#0E0E0E]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Mobile</span>
                </button>
              </div>

              <button
                id="storefront-save-btn"
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full shadow-2xs transition-all uppercase tracking-wider"
              >
                {savedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                    <span>Saved Live!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main Grid: Builder Panel (LARGER: 8 cols) + Live Storefront Preview (SMALLER: 4 cols) */}
          <div className={`grid gap-4 ${previewMode === 'desktop' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
            {/* BUILDER EDITING PANEL (Left 8 Cols in Split Mode) */}
            {previewMode !== 'desktop' && (
              <div className={`${previewMode === 'split' ? 'lg:col-span-7 xl:col-span-8' : 'lg:col-span-8'} bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-4 h-fit`}>
                {/* Navigation Tabs */}
                <div className="flex border-b border-[#EEEEEE] pb-1 text-xs font-bold gap-3 overflow-x-auto">
                  <button
                    id="builder-tab-content"
                    onClick={() => setActiveBuilderTab('content')}
                    className={`pb-2 px-1 transition-all whitespace-nowrap ${
                      activeBuilderTab === 'content'
                        ? 'border-b-2 border-[#E67E00] text-[#E67E00] font-extrabold'
                        : 'text-[#545454] hover:text-[#0E0E0E]'
                    }`}
                  >
                    Page Content & Copy
                  </button>
                  <button
                    id="builder-tab-pricing"
                    onClick={() => setActiveBuilderTab('pricing')}
                    className={`pb-2 px-1 transition-all whitespace-nowrap ${
                      activeBuilderTab === 'pricing'
                        ? 'border-b-2 border-[#E67E00] text-[#E67E00] font-extrabold'
                        : 'text-[#545454] hover:text-[#0E0E0E]'
                    }`}
                  >
                    Pricing & Delivery Rates
                  </button>
                  <button
                    id="builder-tab-payments"
                    onClick={() => setActiveBuilderTab('payments')}
                    className={`pb-2 px-1 transition-all whitespace-nowrap ${
                      activeBuilderTab === 'payments'
                        ? 'border-b-2 border-[#E67E00] text-[#E67E00] font-extrabold'
                        : 'text-[#545454] hover:text-[#0E0E0E]'
                    }`}
                  >
                    Payment Gateways
                  </button>
                  <button
                    id="builder-tab-reviews"
                    onClick={() => setActiveBuilderTab('reviews')}
                    className={`pb-2 px-1 transition-all whitespace-nowrap ${
                      activeBuilderTab === 'reviews'
                        ? 'border-b-2 border-[#E67E00] text-[#E67E00] font-extrabold'
                        : 'text-[#545454] hover:text-[#0E0E0E]'
                    }`}
                  >
                    Reviews ({currentActiveConfig.reviews.length})
                  </button>
                  <button
                    id="builder-tab-seo"
                    onClick={() => setActiveBuilderTab('seo')}
                    className={`pb-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeBuilderTab === 'seo'
                        ? 'border-b-2 border-[#E67E00] text-[#E67E00] font-extrabold'
                        : 'text-[#545454] hover:text-[#0E0E0E]'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>SEO Meta & Pixels</span>
                  </button>
                </div>

                {/* TAB CONTENT: PAGE CONTENT */}
                {activeBuilderTab === 'content' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Top Announcement Bar Text
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.announcementText}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, announcementText: e.target.value })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Hero Badge Text
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.heroBadge}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, heroBadge: e.target.value })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Product Title
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.productTitle}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, productTitle: e.target.value })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Subtitle / Model Tag
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.productSubTitle}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, productSubTitle: e.target.value })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Product Hero Description
                      </label>
                      <textarea
                        rows={3}
                        value={currentActiveConfig.productDescription}
                        onChange={(e) =>
                          handleUpdateActiveConfig({ ...currentActiveConfig, productDescription: e.target.value })
                        }
                        className="w-full p-3 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                      />
                    </div>

                    {/* Features List Editing */}
                    <div className="pt-3 border-t border-[#EEEEEE]">
                      <span className="font-extrabold text-[#0E0E0E] block text-xs mb-2">
                        Key Feature Bullet Points
                      </span>
                      <div className="space-y-2">
                        {currentActiveConfig.features.map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const newFeats = [...currentActiveConfig.features];
                                newFeats[idx] = e.target.value;
                                handleUpdateActiveConfig({ ...currentActiveConfig, features: newFeats });
                              }}
                              className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                            />
                            <button
                              onClick={() => {
                                const newFeats = currentActiveConfig.features.filter((_, i) => i !== idx);
                                handleUpdateActiveConfig({ ...currentActiveConfig, features: newFeats });
                              }}
                              className="p-1.5 text-[#545454] hover:text-[#FF0000] rounded-full border border-[#EEEEEE]"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            handleUpdateActiveConfig({
                              ...currentActiveConfig,
                              features: [...currentActiveConfig.features, 'New Product Feature Point']
                            });
                          }}
                          className="px-3 py-1.5 bg-[#FCF1E5] text-[#E67E00] font-extrabold text-xs rounded-full flex items-center gap-1.5 mt-2"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add Feature Point</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: PRICING & SHIPPING */}
                {activeBuilderTab === 'pricing' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Sale Price (৳ BDT)
                        </label>
                        <input
                          type="number"
                          value={currentActiveConfig.basePrice}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, basePrice: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-black text-[#E67E00] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Regular Price (৳)
                        </label>
                        <input
                          type="number"
                          value={currentActiveConfig.originalPrice}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, originalPrice: Number(e.target.value) })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EEEEEE] space-y-3">
                      <span className="font-black text-[#0E0E0E] block uppercase text-[10px]">
                        Delivery Shipping Charges (BDT)
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#545454] mb-1">
                            Inside Dhaka Rate (৳)
                          </label>
                          <input
                            type="number"
                            value={currentActiveConfig.deliveryInsideDhaka}
                            onChange={(e) =>
                              handleUpdateActiveConfig({ ...currentActiveConfig, deliveryInsideDhaka: Number(e.target.value) })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#545454] mb-1">
                            Outside Dhaka Rate (৳)
                          </label>
                          <input
                            type="number"
                            value={currentActiveConfig.deliverySubDhaka}
                            onChange={(e) =>
                              handleUpdateActiveConfig({ ...currentActiveConfig, deliverySubDhaka: Number(e.target.value) })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#545454] mb-1">
                            Remote Area Rate (৳)
                          </label>
                          <input
                            type="number"
                            value={currentActiveConfig.deliveryOutsideDhaka}
                            onChange={(e) =>
                              handleUpdateActiveConfig({ ...currentActiveConfig, deliveryOutsideDhaka: Number(e.target.value) })
                            }
                            className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: PAYMENT GATEWAYS */}
                {activeBuilderTab === 'payments' && (
                  <div className="space-y-3 text-xs">
                    <span className="font-bold text-[#0E0E0E] block">
                      Active Payment Gateways at Checkout:
                    </span>

                    <label className="flex items-center justify-between p-3 bg-white border border-[#EEEEEE] rounded-lg cursor-pointer hover:border-[#EEAB59] transition-all">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#E67E00]" />
                        <span className="font-bold text-[#0E0E0E]">Cash On Delivery (COD)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentActiveConfig.paymentMethods.cod}
                        onChange={(e) =>
                          handleUpdateActiveConfig({
                            ...currentActiveConfig,
                            paymentMethods: { ...currentActiveConfig.paymentMethods, cod: e.target.checked }
                          })
                        }
                        className="w-4 h-4 accent-[#E67E00]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white border border-[#EEEEEE] rounded-lg cursor-pointer hover:border-[#EEAB59] transition-all">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#E67E00]" />
                        <span className="font-bold text-[#0E0E0E]">bKash / Nagad Mobile Banking</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentActiveConfig.paymentMethods.bkash}
                        onChange={(e) =>
                          handleUpdateActiveConfig({
                            ...currentActiveConfig,
                            paymentMethods: { ...currentActiveConfig.paymentMethods, bkash: e.target.checked }
                          })
                        }
                        className="w-4 h-4 accent-[#E67E00]"
                      />
                    </label>

                    <label className="flex items-center justify-between p-3 bg-white border border-[#EEEEEE] rounded-lg cursor-pointer hover:border-[#EEAB59] transition-all">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#E67E00]" />
                        <span className="font-bold text-[#0E0E0E]">Debit/Credit Card (SSLCommerz)</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={currentActiveConfig.paymentMethods.card}
                        onChange={(e) =>
                          handleUpdateActiveConfig({
                            ...currentActiveConfig,
                            paymentMethods: { ...currentActiveConfig.paymentMethods, card: e.target.checked }
                          })
                        }
                        className="w-4 h-4 accent-[#E67E00]"
                      />
                    </label>
                  </div>
                )}

                {/* TAB CONTENT: REVIEWS */}
                {activeBuilderTab === 'reviews' && (
                  <div className="space-y-3 text-xs">
                    <span className="font-bold text-[#0E0E0E] block">
                      Customer Testimonials ({currentActiveConfig.reviews.length})
                    </span>
                    {currentActiveConfig.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-white border border-[#EEEEEE] rounded-lg space-y-1">
                        <div className="flex items-center justify-between font-bold text-[#0E0E0E]">
                          <span>{rev.author}</span>
                          <span className="text-[#E67E00]">★ {rev.rating}</span>
                        </div>
                        <p className="text-[11px] text-[#545454] line-clamp-2">{rev.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* TAB CONTENT: SEO & PIXELS */}
                {activeBuilderTab === 'seo' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3.5 bg-[#FCF1E5]/30 border border-[#EEAB59] rounded-lg flex items-start gap-2.5">
                      <Globe className="w-4 h-4 text-[#E67E00] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-[#0E0E0E] text-xs">SEO & Social Meta Configuration</h4>
                        <p className="text-[11px] text-[#545454] font-medium leading-relaxed mt-0.5">
                          Configure title tags, search snippets, Open Graph social share cards, and tracking pixels for maximum search ranking.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-1">
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#0E0E0E] uppercase tracking-wider">
                        <Search className="w-3.5 h-3.5 text-[#E67E00]" />
                        <span>Search Engine Meta Tags</span>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-bold text-[#0E0E0E]">
                            Meta Title <span className="text-[#FF0000]">*</span>
                          </label>
                          <span className={`text-[10px] font-bold ${
                            currentSeo.metaTitle.length > 60 ? 'text-[#FF0000]' : 'text-[#8F8F8F]'
                          }`}>
                            {currentSeo.metaTitle.length}/60 chars
                          </span>
                        </div>
                        <input
                          type="text"
                          value={currentSeo.metaTitle}
                          onChange={(e) => updateSeo({ metaTitle: e.target.value })}
                          placeholder="Meta title for Google search..."
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="font-bold text-[#0E0E0E]">
                            Meta Description <span className="text-[#FF0000]">*</span>
                          </label>
                          <span className={`text-[10px] font-bold ${
                            currentSeo.metaDescription.length > 160 ? 'text-[#FF0000]' : 'text-[#8F8F8F]'
                          }`}>
                            {currentSeo.metaDescription.length}/160 chars
                          </span>
                        </div>
                        <textarea
                          rows={2}
                          value={currentSeo.metaDescription}
                          onChange={(e) => updateSeo({ metaDescription: e.target.value })}
                          placeholder="Search snippet description..."
                          className="w-full p-3 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* LIVE STOREFRONT INTERACTIVE PREVIEW PANEL (Right 4 Cols in Split Mode - SMALLER PREVIEW) */}
            <div
              className={`${
                previewMode === 'desktop'
                  ? 'col-span-1'
                  : previewMode === 'split'
                  ? 'lg:col-span-5 xl:col-span-4 sticky top-4'
                  : 'lg:col-span-5 xl:col-span-4 sticky top-4'
              } bg-[#0E0E0E] p-2 sm:p-3 rounded-2xl shadow-2xl border border-[#0E0E0E] flex justify-center max-h-[85vh]`}
            >
              {/* Device Frame with Scrollable Area */}
              <div
                className={`bg-white text-[#0E0E0E] w-full transition-all duration-300 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col ${
                  previewMode === 'mobile'
                    ? 'max-w-md my-1 border-4 border-[#1A1A1A] rounded-2xl max-h-[78vh]'
                    : 'max-w-full rounded-xl max-h-[80vh]'
                }`}
              >
                {/* Top Announcement Bar */}
                {currentActiveConfig.announcementText && (
                  <div className="bg-[#E67E00] text-white text-center py-1.5 px-3 text-[11px] font-black uppercase tracking-wider sticky top-0 z-10 shadow-xs">
                    {currentActiveConfig.announcementText}
                  </div>
                )}

                {/* Storefront Navigation Header */}
                <div className="border-b border-[#EEEEEE] p-3 flex items-center justify-between bg-white shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#E67E00] text-white font-black text-xs flex items-center justify-center">
                      P
                    </div>
                    <div>
                      <span className="font-black text-xs tracking-tight text-[#0E0E0E]">Promise Mart</span>
                      <span className="text-[9px] block text-[#8F8F8F]">Official Store</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 bg-[#ECFFE8] text-[#008F2F] font-bold text-[9px] rounded-full uppercase border border-[#008F2F]/30">
                    In Stock
                  </span>
                </div>

                {/* Main Scrollable Landing Page Content */}
                <div className="p-4 bg-gradient-to-b from-[#FCF1E5]/20 to-white text-center space-y-3 flex-1">
                  <span className="inline-block px-2.5 py-0.5 bg-[#FCF1E5] text-[#E67E00] font-extrabold text-[10px] rounded-full border border-[#EEAB59]">
                    {currentActiveConfig.heroBadge}
                  </span>
                  <h2 className="text-lg font-black text-[#0E0E0E] tracking-tight leading-tight">
                    {currentActiveConfig.productTitle}
                  </h2>
                  <p className="text-[11px] text-[#545454] max-w-xs mx-auto font-medium leading-relaxed">
                    {currentActiveConfig.productDescription}
                  </p>

                  <div className="py-2">
                    <img
                      src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
                      alt="Product Preview"
                      className="w-44 h-44 object-contain mx-auto drop-shadow-md rounded-lg"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-3 py-1">
                    <div>
                      <span className="text-2xl font-black text-[#E67E00]">
                        ৳{currentActiveConfig.basePrice.toLocaleString()}
                      </span>
                      {currentActiveConfig.originalPrice && (
                        <span className="text-xs font-bold text-[#8F8F8F] line-through ml-2">
                          ৳{currentActiveConfig.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Key Feature Bullet Points in Preview */}
                  {currentActiveConfig.features && currentActiveConfig.features.length > 0 && (
                    <div className="text-left bg-white p-3 rounded-lg border border-[#EEAB59]/40 space-y-1.5 my-3">
                      <span className="text-[10px] font-black text-[#E67E00] uppercase tracking-wider block mb-1">
                        ★ Key Product Features:
                      </span>
                      {currentActiveConfig.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#0E0E0E] font-medium">
                          <span className="text-[#008F2F] font-bold">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Delivery & Guarantee Info */}
                  <div className="grid grid-cols-2 gap-2 text-left my-2">
                    <div className="p-2 bg-[#FCF1E5]/40 rounded border border-[#EEAB59]/50 text-[10px]">
                      <span className="font-bold text-[#0E0E0E] block">🚚 Delivery:</span>
                      <span className="text-[#545454]">{currentActiveConfig.deliveryInfoText || 'Fast Home Delivery Nationwide'}</span>
                    </div>
                    <div className="p-2 bg-[#ECFFE8]/50 rounded border border-[#008F2F]/30 text-[10px]">
                      <span className="font-bold text-[#008F2F] block">🛡️ Guarantee:</span>
                      <span className="text-[#545454]">{currentActiveConfig.guaranteeBadgeText || '7 Days Replacement Warranty'}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Interactive Order Form in Preview */}
                <div className="p-4 bg-[#FAFAFA] border-t border-[#EEEEEE] space-y-3">
                  <div className="flex items-center gap-1.5 font-black text-xs text-[#0E0E0E]">
                    <ShoppingBag className="w-3.5 h-3.5 text-[#E67E00]" />
                    <span>Quick Order Form</span>
                  </div>

                  {testOrderPlaced ? (
                    <div className="p-3 bg-[#ECFFE8] border border-[#008F2F] rounded-lg text-center space-y-1">
                      <CheckCircle2 className="w-5 h-5 text-[#008F2F] mx-auto" />
                      <div className="font-black text-xs text-[#008F2F]">Test Order Placed!</div>
                      <div className="text-[10px] text-[#545454]">Added to Orders List</div>
                    </div>
                  ) : (
                    <form onSubmit={handleTestOrderSubmit} className="space-y-2 text-xs">
                      <input
                        type="text"
                        value={testFormName}
                        onChange={(e) => setTestFormName(e.target.value)}
                        placeholder="Your Full Name"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold"
                        required
                      />
                      <input
                        type="text"
                        value={testFormPhone}
                        onChange={(e) => setTestFormPhone(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full px-2.5 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold"
                        required
                      />
                      <select
                        value={testFormZone}
                        onChange={(e) => setTestFormZone(e.target.value as any)}
                        className="w-full px-2.5 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold"
                      >
                        <option value="Inside Dhaka">Inside Dhaka (৳{currentActiveConfig.deliveryInsideDhaka})</option>
                        <option value="Outside Dhaka">Outside Dhaka (৳{currentActiveConfig.deliverySubDhaka})</option>
                        <option value="Remote Area">Remote Area (৳{currentActiveConfig.deliveryOutsideDhaka})</option>
                      </select>

                      <button
                        type="submit"
                        className="w-full py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full shadow-md transition-all uppercase tracking-wider"
                      >
                        Order Now - ৳{testTotal.toLocaleString()}
                      </button>
                    </form>
                  )}
                </div>

                {/* Customer Reviews Section in Preview */}
                {currentActiveConfig.reviews && currentActiveConfig.reviews.length > 0 && (
                  <div className="p-4 bg-white border-t border-[#EEEEEE] space-y-2 text-left">
                    <span className="text-xs font-black text-[#0E0E0E] block uppercase tracking-wider">
                      Customer Reviews ({currentActiveConfig.reviews.length})
                    </span>
                    <div className="space-y-2">
                      {currentActiveConfig.reviews.map((rev) => (
                        <div key={rev.id} className="p-2.5 bg-[#FAFAFA] rounded border border-[#EEEEEE] text-[11px] space-y-1">
                          <div className="flex items-center justify-between font-bold text-[#0E0E0E]">
                            <span>{rev.author}</span>
                            <span className="text-[#E67E00]">{'★'.repeat(rev.rating)}</span>
                          </div>
                          <p className="text-[#545454] leading-tight">{rev.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer in Preview */}
                <div className="p-3 bg-[#0E0E0E] text-white text-center text-[10px] space-y-1">
                  <div className="font-bold">Promise Mart • Official E-Commerce Store</div>
                  <div className="text-[#8F8F8F]">100% Cash on Delivery & Express Shipping</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: CREATE NEW LANDING PAGE */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded border border-[#EEAB59] max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#FCF1E5] text-[#E67E00] flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">Create New Landing Page</h3>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 text-[#545454] hover:text-[#0E0E0E] rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewPageSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1">
                  Landing Page Title / Product Name <span className="text-[#FF0000]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newPageTitle}
                  onChange={(e) => {
                    setNewPageTitle(e.target.value);
                    if (!newPageSlug) {
                      setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }
                  }}
                  placeholder="e.g. Wireless Noise Cancelling Earbuds"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EEEEEE] rounded-lg text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1">
                  Custom Page URL Slug
                </label>
                <div className="flex items-center">
                  <span className="px-2.5 py-2.5 bg-[#FAFAFA] border border-r-0 border-[#EEEEEE] rounded-l-lg text-[11px] text-[#545454] font-mono">
                    promisemart.com/landing/
                  </span>
                  <input
                    type="text"
                    value={newPageSlug}
                    onChange={(e) => setNewPageSlug(e.target.value)}
                    placeholder="my-product-deal"
                    className="w-full px-3 py-2.5 bg-white border border-[#EEEEEE] rounded-r-lg text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1">
                  Category Template
                </label>
                <select
                  value={newPageCategory}
                  onChange={(e) => setNewPageCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EEEEEE] rounded-lg text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                >
                  <option value="Electronics">Electronics & Gadgets</option>
                  <option value="Fashion">Fashion & Accessories</option>
                  <option value="Beauty">Health & Beauty</option>
                  <option value="Home">Home & Kitchen</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#EEEEEE]">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 border border-[#EEEEEE] text-[#545454] font-bold text-xs rounded-full hover:bg-[#FAFAFA]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded-full shadow-md flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create & Open Builder</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
