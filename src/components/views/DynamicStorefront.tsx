import React, { useState } from 'react';
import { 
  Store, 
  Eye, 
  Smartphone, 
  Monitor, 
  Save, 
  Plus, 
  Trash2, 
  Check,
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
  ChevronRight,
  Palette,
  Printer,
  Edit3,
  Video,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { StorefrontConfig, Order, ThemeColors, CustomerReview, SeoMetaData, ComparisonItem } from '../../types';

export interface ThemePreset {
  id: string;
  name: string;
  categoryName: string;
  primaryButtonBg: string;
  primaryButtonText: string;
  headingTextColor: string;
  accentBadgeBg: string;
  accentBadgeText: string;
  presetBadge: string;
  description: string;
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'preset-green',
    name: '🌿 Natural Product (Organic Green)',
    categoryName: 'Natural & Organic',
    primaryButtonBg: '#008F2F',
    primaryButtonText: '#FFFFFF',
    headingTextColor: '#064E3B',
    accentBadgeBg: '#ECFFE8',
    accentBadgeText: '#008F2F',
    presetBadge: 'Natural Green',
    description: 'Green button & fresh organic theme for herbal, honey, oils & natural health items'
  },
  {
    id: 'preset-food',
    name: '🍔 Food & Snacks (Delicious Red / Amber)',
    categoryName: 'Food & Dining',
    primaryButtonBg: '#DC2626',
    primaryButtonText: '#FFFFFF',
    headingTextColor: '#7F1D1D',
    accentBadgeBg: '#FEF2F2',
    accentBadgeText: '#DC2626',
    presetBadge: 'Food Red',
    description: 'Eye-catching red/amber button for snacks, pickles, restaurant meals & bakery'
  },
  {
    id: 'preset-orange',
    name: '⚡ Classic E-Commerce (E-Com Orange)',
    categoryName: 'Gadgets & General',
    primaryButtonBg: '#E67E00',
    primaryButtonText: '#FFFFFF',
    headingTextColor: '#0E0E0E',
    accentBadgeBg: '#FCF1E5',
    accentBadgeText: '#E67E00',
    presetBadge: 'Classic Orange',
    description: 'High-converting standard orange style for tech gadgets, tools & online shop'
  },
  {
    id: 'preset-blue',
    name: '🎧 Tech & Electronics (Royal Blue)',
    categoryName: 'Electronics',
    primaryButtonBg: '#2563EB',
    primaryButtonText: '#FFFFFF',
    headingTextColor: '#1E3A8A',
    accentBadgeBg: '#EFF6FF',
    accentBadgeText: '#2563EB',
    presetBadge: 'Tech Blue',
    description: 'Professional royal blue tone for smartwatches, headphones, gaming & devices'
  },
  {
    id: 'preset-beauty',
    name: '💖 Beauty & Skincare (Rose Pink)',
    categoryName: 'Beauty & Fashion',
    primaryButtonBg: '#E11D48',
    primaryButtonText: '#FFFFFF',
    headingTextColor: '#881337',
    accentBadgeBg: '#FFF1F2',
    accentBadgeText: '#E11D48',
    presetBadge: 'Rose Pink',
    description: 'Elegant pink/rose theme for cosmetics, skincare, fashion dresses & accessories'
  },
  {
    id: 'preset-gold',
    name: '👑 Luxury Gold & Dark Elegance',
    categoryName: 'Luxury Gifts',
    primaryButtonBg: '#D97706',
    primaryButtonText: '#FFFFFF',
    headingTextColor: '#451A03',
    accentBadgeBg: '#FEF3C7',
    accentBadgeText: '#B45309',
    presetBadge: 'Luxury Gold',
    description: 'Exclusive gold styling for handcrafted leather, luxury watches & gift boxes'
  }
];

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
  // Navigation View: 'list' (All Pages Table), 'builder' (Editor), or 'create' (New Page Suite)
  const [currentView, setCurrentView] = useState<'list' | 'builder' | 'create'>('list');

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
      config: {
        ...config,
        themeColors: {
          primaryButtonBg: '#E67E00',
          primaryButtonText: '#FFFFFF',
          headingTextColor: '#0E0E0E',
          accentBadgeBg: '#FCF1E5',
          accentBadgeText: '#E67E00',
          themePresetName: 'Classic Orange'
        }
      }
    },
    {
      id: 'lp-2',
      title: '🌿 ১০০% খাঁটি সুন্দরবনের প্রাকৃতিক মধু (Organic Raw Honey)',
      slug: 'pure-organic-honey',
      status: 'Published',
      views: 14200,
      conversions: 1150,
      revenue: 1725000,
      createdAt: '2026-07-14',
      config: {
        ...config,
        productTitle: '১০০% র সুন্দরবনের খাঁটি প্রাকৃতিক মধু (Raw Organic Honey)',
        productSubTitle: 'Natural Product • Unfiltered & 100% Pure',
        productDescription: 'সুন্দরবনের প্রাকৃতিক চাক থেকে সংগৃহীত খাঁটি কেমিক্যালমুক্ত কাঁচা মধু। সম্পূর্ণ প্রাকৃতিক স্বাস্থ্যকর গুণাগুণ সমৃদ্ধ।',
        heroBadge: '🌿 ১০০% ন্যাচারাল অরগানিক প্রডাক্ট — ক্যাশ অন ডেলিভারি',
        basePrice: 1500,
        originalPrice: 2000,
        features: [
          'সুন্দরবনের গভীর জঙ্গল থেকে সরাসরি সংগৃহীত',
          'কোন প্রকার কৃত্রিম ফ্লেভার বা প্রিজারভেটিভ মুক্ত',
          'রোগ প্রতিরোধ ক্ষমতা ও এনার্জি বৃদ্ধি করে',
          '১০০% ক্যাশ অন ডেলিভারি & ল্যাব টেস্টের গ্যারান্টি'
        ],
        themeColors: {
          primaryButtonBg: '#008F2F',
          primaryButtonText: '#FFFFFF',
          headingTextColor: '#064E3B',
          accentBadgeBg: '#ECFFE8',
          accentBadgeText: '#008F2F',
          themePresetName: 'Natural Organic'
        }
      }
    },
    {
      id: 'lp-3',
      title: '🍔 স্পেশাল হোমমেড খাঁটি আমের আচার (Homemade Spicy Mango Pickle)',
      slug: 'spicy-mango-pickle',
      status: 'Published',
      views: 9800,
      conversions: 820,
      revenue: 656000,
      createdAt: '2026-07-18',
      config: {
        ...config,
        productTitle: 'স্পেশাল ঘরোয়া স্বাদের সরিষার তেলের আমের আচার (1 KG Jar)',
        productSubTitle: 'Food Product • 100% Homemade Food',
        productDescription: 'খাঁটি কাঠের ঘানির সরিষার তেল ও বাছাইকৃত মশলায় তৈরি জাদুকরী স্বাদের আম ও রসুনের ঘরোয়া আচার।',
        heroBadge: '🔥 মুখরোচক স্পেশাল খাবারের ডিল — হোম ডেলিভারি',
        basePrice: 800,
        originalPrice: 1100,
        features: [
          '১০০% ঘরোয়া উপায়ে স্বাস্থ্যসম্মতভাবে তৈরি',
          'কাঠের ঘানির খাঁটি সরিষার তেল ব্যবহৃত',
          'কোন প্রকার ক্ষতিকারক প্রিজারভেটিভ নেই',
          'খাওয়ার পর পুরো টাকা ফেরত গ্যারান্টি'
        ],
        themeColors: {
          primaryButtonBg: '#DC2626',
          primaryButtonText: '#FFFFFF',
          headingTextColor: '#7F1D1D',
          accentBadgeBg: '#FEF2F2',
          accentBadgeText: '#DC2626',
          themePresetName: 'Food & Restaurant'
        }
      }
    },
    {
      id: 'lp-4',
      title: 'Smart Watch Series X Ultra',
      slug: 'smart-watch-x',
      status: 'Published',
      views: 12100,
      conversions: 890,
      revenue: 2225000,
      createdAt: '2026-07-20',
      config: {
        ...config,
        productTitle: 'Smart Watch Series X Ultra',
        productSubTitle: '1.96" AMOLED & Bluetooth Calling',
        productDescription: 'Zinc-alloy smartwatch with 1.96-inch HD AMOLED display, 24/7 heart rate monitoring, IP68 waterproofing.',
        basePrice: 2500,
        originalPrice: 3500,
        features: [
          'HD AMOLED Always-On Display',
          'Bluetooth HD Phone Calling',
          'IP68 Waterproofing Rating'
        ],
        themeColors: {
          primaryButtonBg: '#2563EB',
          primaryButtonText: '#FFFFFF',
          headingTextColor: '#1E3A8A',
          accentBadgeBg: '#EFF6FF',
          accentBadgeText: '#2563EB',
          themePresetName: 'Tech & Gadgets'
        }
      }
    }
  ]);

  // Selected Page ID being edited in builder
  const [selectedPageId, setSelectedPageId] = useState<string>('lp-1');

  // Currently active page object
  const activePage = landingPages.find(p => p.id === selectedPageId) || landingPages[0];

  // Current config for active page
  const currentActiveConfig = activePage ? activePage.config : config;

  // Active theme helper with standard fallbacks
  const activeThemeColors: ThemeColors = currentActiveConfig.themeColors || {
    primaryButtonBg: '#E67E00',
    primaryButtonText: '#FFFFFF',
    headingTextColor: '#0E0E0E',
    accentBadgeBg: '#FCF1E5',
    accentBadgeText: '#E67E00',
    themePresetName: 'Classic Orange'
  };

  // Search & Filter state for List View
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft'>('All');

  // Builder Editing States
  const [activeBuilderTab, setActiveBuilderTab] = useState<'content' | 'theme' | 'pricing' | 'payments' | 'reviews' | 'seo'>('content');
  const [previewMode, setPreviewMode] = useState<'editor' | 'split' | 'desktop' | 'mobile'>('editor');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isQuickPreviewOpen, setIsQuickPreviewOpen] = useState(false);

  // Dedicated Landing Page Creator States (Spacious & User-Friendly Form)
  const [newPageTitle, setNewPageTitle] = useState('');
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageCategory, setNewPageCategory] = useState<'Natural Product' | 'Food Product' | 'Electronics' | 'Beauty' | 'Fashion'>('Natural Product');
  const [newPageBasePrice, setNewPageBasePrice] = useState<number>(1990);
  const [newPageOriginalPrice, setNewPageOriginalPrice] = useState<number>(2990);
  const [newPageHeroBadge, setNewPageHeroBadge] = useState('🌿 100% Authentic Organic Product — Cash on Delivery');
  const [newPageSubTitle, setNewPageSubTitle] = useState('Special Offer • Express Fast Shipping Nationwide');
  const [newPageDescription, setNewPageDescription] = useState('Highlight your product key benefits, warranty details, and special discount offers with fast Cash on Delivery.');
  const [newPageImageUrl, setNewPageImageUrl] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
  const [newPageVideoUrl, setNewPageVideoUrl] = useState('');
  const [newPageFeatures, setNewPageFeatures] = useState<string[]>([
    '100% Authentic & Premium Quality Guaranteed',
    'Fast Express Home Delivery Nationwide with Cash on Delivery',
    'Inspect product upon delivery before making payment'
  ]);

  // 3-Column Comparison Table States for Landing Page Creator (VS Section)
  const [newPageCmpTitle, setNewPageCmpTitle] = useState('Aura Pro Studio VS Others Headphone');
  const [newPageCmpSubtitle, setNewPageCmpSubtitle] = useState('কেন সাধারণ হেডফোনের চেয়ে Aura Pro Studio সেরা জেনে নিন');
  const [newPageCmpCol1, setNewPageCmpCol1] = useState('বৈশিষ্ট্য');
  const [newPageCmpCol2, setNewPageCmpCol2] = useState('আমাদের Aura Pro');
  const [newPageCmpCol3, setNewPageCmpCol3] = useState('সাধারণ হেডফোন');
  const [newPageCmpItems, setNewPageCmpItems] = useState<ComparisonItem[]>([
    { id: 'cmp-1', feature: 'অ্যাক্টিভ নয়েজ ক্যানসেলেশন', ourProduct: '-42dB হাইব্রিড ANC', otherProduct: 'কোনো ক্যানসেলেশন নেই' },
    { id: 'cmp-2', feature: 'ব্যাটারি ব্যাকআপ', ourProduct: '৪০ ঘণ্টা প্লে-টাইম ও টাইপ-সি ফাস্ট চার্জিং', otherProduct: 'মাত্র ৩-৪ ঘণ্টা ব্যাকআপ' },
    { id: 'cmp-3', feature: 'সাউন্ড কোয়ালিটি', ourProduct: '৪০মিমি স্টুдио ড্রাইভার ও 3D ডিপ বাস', otherProduct: 'ফ্ল্যাট ও সস্তা সাউন্ড' },
    { id: 'cmp-4', feature: 'কলিং মাইক্রোফোন', ourProduct: '৪টি এইচডি ENC মাইক (নয়েজলেস কলিং)', otherProduct: 'প্রচুর ব্যাকগ্রাউন্ড নয়েজ' },
    { id: 'cmp-5', feature: 'ওয়ারেন্টি সাপোর্ট', ourProduct: '১ বছর রিপ্লেসমেন্ট ওয়ারেন্টি', otherProduct: 'কোনো ওয়ারেন্টি নেই' }
  ]);
  const [newPageDeliveryDhaka, setNewPageDeliveryDhaka] = useState<number>(60);
  const [newPageDeliveryOutside, setNewPageDeliveryOutside] = useState<number>(120);
  const [newPageOrderBtnText, setNewPageOrderBtnText] = useState('Fill Out Form Below to Place Order');

  // Theme presets modal & creation states
  const [modalThemePreset, setModalThemePreset] = useState('preset-green');
  const [modalBtnBg, setModalBtnBg] = useState('#008F2F');
  const [modalBtnText, setModalBtnText] = useState('#FFFFFF');
  const [modalHeadingColor, setModalHeadingColor] = useState('#064E3B');
  const [modalBadgeBg, setModalBadgeBg] = useState('#ECFFE8');
  const [modalBadgeText, setModalBadgeText] = useState('#008F2F');

  // Review creation form states
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [newReviewDate, setNewReviewDate] = useState('2 days ago');
  const [newReviewLocation, setNewReviewLocation] = useState('Dhaka, Bangladesh');
  const [newReviewImageUrl, setNewReviewImageUrl] = useState('');
  const [previewReviewImage, setPreviewReviewImage] = useState<string | null>(null);

  // Dedicated Creator State for Reviews & SEO
  const [creatorReviews, setCreatorReviews] = useState<CustomerReview[]>([
    {
      id: 'rev-init-1',
      author: 'Mohammed Abdullah',
      location: 'Dhaka, Bangladesh',
      rating: 5,
      content: 'Product quality is excellent! Received cash on delivery within 2 days. Highly recommended!',
      date: '1 day ago',
      imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
      screenshotUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80'
    }
  ]);
  const [creatorReviewAuthor, setCreatorReviewAuthor] = useState('');
  const [creatorReviewRating, setCreatorReviewRating] = useState<number>(5);
  const [creatorReviewContent, setCreatorReviewContent] = useState('');
  const [creatorReviewLocation, setCreatorReviewLocation] = useState('Dhaka, Bangladesh');
  const [creatorReviewTime, setCreatorReviewTime] = useState('Just now');
  const [creatorReviewImageUrl, setCreatorReviewImageUrl] = useState('');

  const [creatorMetaTitle, setCreatorMetaTitle] = useState('');
  const [creatorMetaDescription, setCreatorMetaDescription] = useState('');
  const [creatorMetaKeywords, setCreatorMetaKeywords] = useState('online shop, ecommerce, promo offer, fast delivery');
  const [creatorOgImage, setCreatorOgImage] = useState('');
  const [creatorFbPixel, setCreatorFbPixel] = useState('PIXEL-901823712');
  const [creatorGaId, setCreatorGaId] = useState('G-789234110');

  // Helper boolean checking if user is in New Page Creator mode
  const isCreatingPage = currentView === 'create';

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

  const handleUpdateActiveTitle = (title: string) => {
    setLandingPages(prev =>
      prev.map(p => (p.id === selectedPageId ? { ...p, title } : p))
    );
    handleUpdateActiveConfig({
      ...currentActiveConfig,
      productTitle: title
    });
  };

  const handleUpdateActiveSlug = (rawSlug: string) => {
    const formattedSlug = rawSlug.toLowerCase().replace(/[^a-z0-9-]+/g, '');
    setLandingPages(prev =>
      prev.map(p => (p.id === selectedPageId ? { ...p, slug: formattedSlug } : p))
    );
    handleUpdateActiveConfig({
      ...currentActiveConfig,
      seo: {
        ...currentSeo,
        canonicalUrl: `https://promisemart.com/landing/${formattedSlug}`
      }
    });
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

  // Open Dedicated New Landing Page Creator Suite (Spacious Form View)
  const handleCreateNewPageDirect = () => {
    const defaultNum = landingPages.length + 1;
    const initialTitle = `Special Offer Landing Page #${defaultNum}`;
    const initialDesc = 'Highlight key product features, warranty benefits, and special promotional prices with nationwide Cash on Delivery.';
    
    setNewPageTitle(initialTitle);
    setNewPageSlug(`special-offer-${defaultNum}`);
    setNewPageCategory('Natural Product');
    setNewPageBasePrice(1990);
    setNewPageOriginalPrice(2990);
    setNewPageHeroBadge('🌿 100% Authentic Organic Product — Cash on Delivery');
    setNewPageSubTitle('Special Offer • Express Fast Shipping Nationwide');
    setNewPageDescription(initialDesc);
    setNewPageImageUrl('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
    setNewPageVideoUrl('');
    setNewPageFeatures([
      '100% Authentic & Premium Quality Guaranteed',
      'Fast Express Home Delivery Nationwide with Cash on Delivery',
      'Inspect product upon delivery before making payment'
    ]);
    setNewPageDeliveryDhaka(60);
    setNewPageDeliveryOutside(120);
    setNewPageOrderBtnText('Fill Out Form Below to Place Order');
    setModalThemePreset('preset-green');
    setModalBtnBg('#008F2F');
    setModalBtnText('#FFFFFF');
    setModalHeadingColor('#064E3B');
    setModalBadgeBg('#ECFFE8');
    setModalBadgeText('#008F2F');

    // Initialize Creator Reviews & SEO
    setCreatorReviews([
      {
        id: 'rev-init-1',
        author: 'Mohammed Abdullah',
        location: 'Dhaka, Bangladesh',
        rating: 5,
        content: 'Product quality is excellent! Received cash on delivery within 2 days. Thank you!',
        date: '1 day ago',
        imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
        screenshotUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80'
      }
    ]);
    setCreatorMetaTitle(`${initialTitle} - Official Store Offer`);
    setCreatorMetaDescription(initialDesc);
    setCreatorMetaKeywords('online shop, ecommerce bd, special deal, fast delivery, promo offer');
    setCreatorOgImage('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');
    setCreatorFbPixel('PIXEL-901823712');
    setCreatorGaId('G-789234110');

    setCurrentView('create');
  };

  // Dedicated Creator Form Submit Handler
  const handleCreateFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitle = newPageTitle.trim() || 'New Landing Page';
    const finalSlug = newPageSlug.trim() ? newPageSlug.toLowerCase().replace(/[^a-z0-9-]+/g, '-') : `page-${Date.now()}`;
    const newPageId = `lp-${Date.now()}`;

    const newPageConfig: StorefrontConfig = {
      ...config,
      productTitle: finalTitle,
      productSubTitle: newPageSubTitle || 'Special Offer • Fast Shipping Nationwide',
      productDescription: newPageDescription || 'High quality authentic products with fast Cash on Delivery.',
      heroBadge: newPageHeroBadge || '🌿 Special Offer — Cash on Delivery',
      basePrice: Number(newPageBasePrice) || 1990,
      originalPrice: Number(newPageOriginalPrice) || 2990,
      deliveryInsideDhaka: Number(newPageDeliveryDhaka) || 60,
      deliverySubDhaka: 80,
      deliveryOutsideDhaka: Number(newPageDeliveryOutside) || 120,
      videoEmbedUrl: newPageVideoUrl || '',
      themeColors: {
        primaryButtonBg: modalBtnBg || '#008F2F',
        primaryButtonText: modalBtnText || '#FFFFFF',
        headingTextColor: modalHeadingColor || '#064E3B',
        accentBadgeBg: modalBadgeBg || '#ECFFE8',
        accentBadgeText: modalBadgeText || '#008F2F',
        themePresetName: modalThemePreset || 'Natural Green'
      },
      features: newPageFeatures.filter(f => f.trim().length > 0),
      comparisonTableTitle: newPageCmpTitle,
      comparisonTableSubtitle: newPageCmpSubtitle,
      comparisonCol1Header: newPageCmpCol1,
      comparisonCol2Header: newPageCmpCol2,
      comparisonCol3Header: newPageCmpCol3,
      comparisonItems: newPageCmpItems,
      paymentMethods: {
        cod: true,
        bkash: true,
        card: true
      },
      reviews: creatorReviews.length > 0 ? creatorReviews : [
        {
          id: 'rev-1',
          author: 'Mohammed Abdullah',
          location: 'Dhaka, Bangladesh',
          rating: 5,
          content: 'Product quality is excellent! Received cash on delivery within 2 days.',
          date: '1 day ago',
          imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80',
          screenshotUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80'
        }
      ],
      seo: {
        metaTitle: creatorMetaTitle.trim() || `${finalTitle} - Official Store Offer`,
        metaDescription: creatorMetaDescription.trim() || newPageDescription || 'Shop high quality products online with 100% Cash On Delivery & Fast Shipping.',
        metaKeywords: creatorMetaKeywords.trim() || 'online store, e-commerce, special deal, express delivery',
        canonicalUrl: `https://promisemart.com/landing/${finalSlug}`,
        ogTitle: `${finalTitle} | Special Discount`,
        ogDescription: creatorMetaDescription.trim() || newPageDescription || 'Get exclusive discount offers with Cash on Delivery nationwide.',
        ogImage: creatorOgImage.trim() || newPageImageUrl || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        schemaType: 'Product',
        allowIndexing: true,
        googleAnalyticsId: creatorGaId.trim() || 'G-789234110',
        fbPixelId: creatorFbPixel.trim() || 'PIXEL-901823712'
      }
    };

    const newPage: LandingPageItem = {
      id: newPageId,
      title: finalTitle,
      slug: finalSlug,
      status: 'Published',
      views: 0,
      conversions: 0,
      revenue: 0,
      createdAt: new Date().toISOString().substring(0, 10),
      config: newPageConfig
    };

    setLandingPages([newPage, ...landingPages]);
    setSelectedPageId(newPageId);
    onUpdateConfig(newPageConfig);
    setCurrentView('builder');
    setPreviewMode('editor');
    setActiveBuilderTab('content');
  };

  const handleAddFeature = () => {
    setNewPageFeatures([...newPageFeatures, 'New Key Product Feature or Benefit']);
  };

  const handleUpdateFeature = (index: number, val: string) => {
    const updated = [...newPageFeatures];
    updated[index] = val;
    setNewPageFeatures(updated);
  };

  const handleRemoveFeature = (index: number) => {
    setNewPageFeatures(newPageFeatures.filter((_, i) => i !== index));
  };

  // Creator Review Handlers
  const handleCreatorReviewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCreatorReviewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCreatorReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creatorReviewAuthor.trim() || !creatorReviewContent.trim()) return;
    const newRev: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: creatorReviewAuthor.trim(),
      location: creatorReviewLocation.trim() || 'Dhaka, BD',
      rating: creatorReviewRating,
      content: creatorReviewContent.trim(),
      date: creatorReviewTime || 'Just now',
      imageUrl: creatorReviewImageUrl.trim() || undefined,
      screenshotUrl: creatorReviewImageUrl.trim() || undefined
    };
    setCreatorReviews([newRev, ...creatorReviews]);
    setCreatorReviewAuthor('');
    setCreatorReviewContent('');
    setCreatorReviewImageUrl('');
  };

  const handleRemoveCreatorReview = (id: string) => {
    setCreatorReviews(creatorReviews.filter(r => r.id !== id));
  };

  // Builder Review Image File Upload Handler
  const handleBuilderReviewFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewReviewImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Review Handler inside Builder & Creator
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) return;
    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      location: newReviewLocation.trim() || 'Dhaka, BD',
      rating: newReviewRating,
      content: newReviewContent.trim(),
      date: newReviewDate || 'Just now',
      imageUrl: newReviewImageUrl.trim() || undefined,
      screenshotUrl: newReviewImageUrl.trim() || undefined
    };
    const updatedReviews = [newRev, ...(currentActiveConfig.reviews || [])];
    handleUpdateActiveConfig({
      ...currentActiveConfig,
      reviews: updatedReviews
    });
    setNewReviewAuthor('');
    setNewReviewContent('');
    setNewReviewImageUrl('');
  };

  const handleDeleteReview = (reviewId: string) => {
    const updatedReviews = (currentActiveConfig.reviews || []).filter(r => r.id !== reviewId);
    handleUpdateActiveConfig({
      ...currentActiveConfig,
      reviews: updatedReviews
    });
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
  const handleDeletePage = (pageId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
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

              {/* Action Buttons: ONLY NEW PAGE BUTTON */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCreateNewPageDirect()}
                  className="px-4 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-2xs shrink-0 uppercase tracking-wider cursor-pointer"
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
            {/* Table Header Bar with Integrated Search */}
            <div className="p-3.5 border-b border-[#EEEEEE] bg-[#FCF1E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">
                  LANDING PAGES LEDGER
                </h3>
                <span className="text-xs font-semibold text-[#545454]">
                  ({filteredPages.length} entries)
                </span>
              </div>

              {/* Search Option inside Table Header */}
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-[#8F8F8F] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search by title, slug or product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-white border border-[#EEAB59] rounded-full text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none w-full placeholder:text-[#8F8F8F] shadow-2xs"
                />
              </div>
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
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => window.open(`/landing/${page.slug}`, '_blank')}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                              title="Print / Live View Storefront"
                            >
                              <Printer className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={(e) => handleDuplicatePage(page, e)}
                              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors border border-slate-200 bg-white"
                              title="Duplicate Page"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleEditPage(page.id)}
                              className="p-1.5 text-amber-600 hover:text-amber-800 hover:bg-amber-50 rounded-md transition-colors border border-amber-200 bg-white"
                              title="Customize Landing Page Builder"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeletePage(page.id)}
                              className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-md transition-colors border border-rose-200 bg-white"
                              title="Delete Page"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      {/* ========================================================================= */}
      {/* VIEW 3: NEW LANDING PAGE CREATOR SUITE (DESIGN SYSTEM COMPLIANT) */}
      {/* ========================================================================= */}
      {currentView === 'create' && (
        <div className="space-y-5">
          {/* Top Control Bar (Matching Design System Header) */}
          <div className="border border-[#EEAB59] rounded bg-white p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCurrentView('list')}
                className="p-2 bg-[#FCF1E5] hover:bg-[#EEAB59]/30 border border-[#EEAB59] text-[#E67E00] rounded-full transition-all cursor-pointer"
                title="Back to Landing Pages Ledger"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <span className="px-2.5 py-0.5 text-[10px] font-black bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 rounded uppercase tracking-wider inline-block mb-1">
                  NEW LANDING PAGE CREATOR
                </span>
                <h2 className="text-xl font-bold text-[#0E0E0E] uppercase tracking-tight">
                  CREATE NEW LANDING PAGE
                </h2>
                <p className="text-xs font-medium text-[#545454] mt-0.5">
                  Configure page title, URL slug, pricing, media assets, theme styling, customer reviews, and SEO meta tags.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentView('list')}
                className="px-3.5 py-1.5 border border-[#EEAB59] text-[#E67E00] hover:bg-[#FCF1E5] font-bold text-xs rounded-full transition-all cursor-pointer shrink-0 uppercase tracking-wider"
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={() => {
                  const form = document.getElementById('new-page-creator-form') as HTMLFormElement;
                  if (form) form.requestSubmit();
                }}
                className="px-4 py-1.5 bg-[#008F2F] hover:bg-[#007727] text-white font-extrabold text-xs rounded-full transition-all flex items-center gap-1.5 shadow-2xs shrink-0 uppercase tracking-wider cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>SAVE & PUBLISH PAGE</span>
              </button>
            </div>
          </div>

          {/* Main Form Container (Full Width) */}
          <div className="w-full">
            <form id="new-page-creator-form" onSubmit={handleCreateFormSubmit} className="space-y-5">
                
                {/* SECTION 1: BASIC PAGE INFO */}
                <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs space-y-4 p-4 md:p-5">
                  <div className="p-3 bg-[#FCF1E5] border-b border-[#EEEEEE] -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-4 bg-[#E67E00] rounded"></div>
                      <h3 className="font-bold text-xs text-[#0E0E0E] uppercase tracking-wider">
                        SECTION 1: TITLE & CUSTOM URL SLUG
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#E67E00] bg-white px-2 py-0.5 rounded border border-[#EEAB59]">
                      PAGE METADATA
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Landing Page Title / Product Name <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={newPageTitle}
                        onChange={(e) => {
                          const title = e.target.value;
                          setNewPageTitle(title);
                          if (!newPageSlug || newPageSlug.startsWith('special-offer-')) {
                            setNewPageSlug(title.toLowerCase().replace(/[^a-z0-9-]+/g, '-'));
                          }
                        }}
                        placeholder="e.g. Aura Pro Studio Wireless ANC Headphones"
                        className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none placeholder:text-[#8F8F8F]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Custom Page URL Slug <span className="text-[#FF0000]">*</span>
                      </label>
                      <div className="flex items-center">
                        <span className="px-3 py-2 bg-[#FCF1E5] border border-r-0 border-[#EEAB59] rounded-l text-[11px] text-[#E67E00] font-mono font-bold shrink-0">
                          /landing/
                        </span>
                        <input
                          type="text"
                          required
                          value={newPageSlug}
                          onChange={(e) => setNewPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, ''))}
                          placeholder="special-offer-deal"
                          className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded-r text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none font-mono placeholder:text-[#8F8F8F]"
                        />
                      </div>
                      {newPageSlug && (
                        <p className="text-[10px] text-[#008F2F] font-mono mt-1 font-bold truncate">
                          ✓ Live URL: promisemart.com/landing/<strong className="font-extrabold">{newPageSlug}</strong>
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Product Category & Preset Style
                      </label>
                      <select
                        value={newPageCategory}
                        onChange={(e) => {
                          const cat = e.target.value as any;
                          setNewPageCategory(cat);
                          if (cat === 'Natural Product') {
                            setModalThemePreset('preset-green');
                            setModalBtnBg('#008F2F');
                            setModalBtnText('#FFFFFF');
                            setModalHeadingColor('#064E3B');
                            setModalBadgeBg('#ECFFE8');
                            setModalBadgeText('#008F2F');
                            setNewPageHeroBadge('🌿 100% Authentic Organic Product — Cash on Delivery');
                          } else if (cat === 'Food Product') {
                            setModalThemePreset('preset-food');
                            setModalBtnBg('#DC2626');
                            setModalBtnText('#FFFFFF');
                            setModalHeadingColor('#7F1D1D');
                            setModalBadgeBg('#FEF2F2');
                            setModalBadgeText('#DC2626');
                            setNewPageHeroBadge('🍔 Gourmet Special Food Deal — Express Shipping');
                          } else if (cat === 'Electronics') {
                            setModalThemePreset('preset-blue');
                            setModalBtnBg('#2563EB');
                            setModalBtnText('#FFFFFF');
                            setModalHeadingColor('#1E3A8A');
                            setModalBadgeBg('#EFF6FF');
                            setModalBadgeText('#2563EB');
                            setNewPageHeroBadge('⚡ Guaranteed Premium Gadget — Limited Deal');
                          } else if (cat === 'Beauty') {
                            setModalThemePreset('preset-beauty');
                            setModalBtnBg('#E11D48');
                            setModalBtnText('#FFFFFF');
                            setModalHeadingColor('#881337');
                            setModalBadgeBg('#FFF1F2');
                            setModalBadgeText('#E11D48');
                            setNewPageHeroBadge('💖 100% Authentic Skincare — Cash on Delivery');
                          } else if (cat === 'Fashion') {
                            setModalThemePreset('preset-gold');
                            setModalBtnBg('#D97706');
                            setModalBtnText('#FFFFFF');
                            setModalHeadingColor('#451A03');
                            setModalBadgeBg('#FEF3C7');
                            setModalBadgeText('#B45309');
                            setNewPageHeroBadge('👑 Royal Fashion Collection — Exclusive Discount');
                          }
                        }}
                        className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none cursor-pointer"
                      >
                        <option value="Natural Product">🌿 Natural & Organic Product (Green Theme)</option>
                        <option value="Food Product">🍔 Food, Snacks & Bakery (Red Theme)</option>
                        <option value="Electronics">🎧 Electronics & Gadgets (Royal Blue Theme)</option>
                        <option value="Beauty">💖 Health & Beauty (Rose Pink Theme)</option>
                        <option value="Fashion">👑 Fashion & Accessories (Luxury Gold Theme)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: PRICING & DELIVERY */}
                <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs space-y-4 p-4 md:p-5">
                  <div className="p-3 bg-[#FCF1E5] border-b border-[#EEEEEE] -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-4 bg-[#E67E00] rounded"></div>
                      <h3 className="font-bold text-xs text-[#0E0E0E] uppercase tracking-wider">
                        SECTION 2: OFFER PRICING & SHIPPING CHARGES
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#008F2F] bg-[#ECFFE8] px-2 py-0.5 rounded border border-[#008F2F]/30">
                      FINANCIAL RATES
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Offer Selling Price (BDT) <span className="text-[#FF0000]">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2 font-bold text-[#E67E00] text-xs">৳</span>
                        <input
                          type="number"
                          required
                          value={newPageBasePrice}
                          onChange={(e) => setNewPageBasePrice(Number(e.target.value))}
                          placeholder="1990"
                          className="w-full pl-8 pr-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-extrabold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Original Regular Price (BDT)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2 font-bold text-[#8F8F8F] text-xs">৳</span>
                        <input
                          type="number"
                          value={newPageOriginalPrice}
                          onChange={(e) => setNewPageOriginalPrice(Number(e.target.value))}
                          placeholder="2990"
                          className="w-full pl-8 pr-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Inside Dhaka Delivery Rate (BDT)
                      </label>
                      <input
                        type="number"
                        value={newPageDeliveryDhaka}
                        onChange={(e) => setNewPageDeliveryDhaka(Number(e.target.value))}
                        className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Outside Dhaka Delivery Rate (BDT)
                      </label>
                      <input
                        type="number"
                        value={newPageDeliveryOutside}
                        onChange={(e) => setNewPageDeliveryOutside(Number(e.target.value))}
                        className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 3: MEDIA & DESCRIPTION */}
                <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs space-y-4 p-4 md:p-5">
                  <div className="p-3 bg-[#FCF1E5] border-b border-[#EEEEEE] -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-4 bg-[#E67E00] rounded"></div>
                      <h3 className="font-bold text-xs text-[#0E0E0E] uppercase tracking-wider">
                        SECTION 3: MEDIA, VIDEO & PRODUCT COPY
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#E67E00] bg-white px-2 py-0.5 rounded border border-[#EEAB59]">
                      ASSET MEDIA
                    </span>
                  </div>

                  <div className="space-y-3.5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Hero Product Image URL
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative w-full">
                          <ImageIcon className="w-4 h-4 text-[#8F8F8F] absolute left-3 top-2.5" />
                          <input
                            type="url"
                            value={newPageImageUrl}
                            onChange={(e) => setNewPageImageUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full pl-9 pr-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-mono font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                          />
                        </div>
                        {newPageImageUrl && (
                          <img
                            src={newPageImageUrl}
                            alt="Product Preview"
                            className="w-9 h-9 rounded object-cover border border-[#EEAB59] shrink-0 shadow-2xs"
                          />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1 flex items-center gap-1.5">
                        <Video className="w-3.5 h-3.5 text-[#E67E00]" />
                        <span>YouTube / Vimeo Video Embed Link</span>
                      </label>
                      <input
                        type="text"
                        value={newPageVideoUrl}
                        onChange={(e) => setNewPageVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/embed/..."
                        className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-mono font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Detailed Product Offer Description
                      </label>
                      <textarea
                        rows={3}
                        value={newPageDescription}
                        onChange={(e) => setNewPageDescription(e.target.value)}
                        placeholder="Describe key benefits, usage instructions, and quality guarantees..."
                        className="w-full p-3 bg-white border border-[#EEAB59] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                      />
                    </div>

                    {/* 3-COLUMN PRODUCT COMPARISON TABLE (VS SECTION) */}
                    <div className="space-y-4 pt-3 border-t border-[#EEAB59]/30">
                      <div className="p-3 bg-[#FCF1E5] rounded-xl border border-[#EEAB59] flex items-center justify-between">
                        <div>
                          <label className="text-xs font-black text-[#0E0E0E] uppercase tracking-wider block">
                            KEY HIGHLIGHTS & 3-COLUMN PRODUCT COMPARISON TABLE (VS SECTION):
                          </label>
                          <span className="text-[11px] text-[#545454] font-medium">
                            রেফারেন্স ইমেজ অনুযায়ী ৩টি কলামে পণ্যের তুলনা তালিকা তৈরি করুন (Title, Subtitle & 3 Columns)
                          </span>
                        </div>
                        <span className="text-[11px] font-black text-[#E67E00] bg-white px-3 py-1 rounded-full border border-[#EEAB59] shrink-0 shadow-2xs">
                          {newPageCmpItems.length} Rows
                        </span>
                      </div>

                      {/* Header Title & Subtitle Inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FCF1E5]/40 border border-[#EEAB59] rounded-xl">
                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            Comparison Title (টেবিলের শিরোনাম):
                          </label>
                          <input
                            type="text"
                            value={newPageCmpTitle}
                            onChange={(e) => setNewPageCmpTitle(e.target.value)}
                            placeholder="Aura Pro Studio VS Others Headphone"
                            className="w-full px-3 py-2 bg-white border border-[#EEAB59] rounded-lg text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            Comparison Subtitle (সাবটাইটেল/বিবরণ):
                          </label>
                          <input
                            type="text"
                            value={newPageCmpSubtitle}
                            onChange={(e) => setNewPageCmpSubtitle(e.target.value)}
                            placeholder="কেন সাধারণ হেডফোনের চেয়ে Aura Pro Studio সেরা জেনে নিন"
                            className="w-full px-3 py-2 bg-white border border-[#EEAB59] rounded-lg text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* 3-Column Product Comparison Table Form */}
                      <div className="border border-[#EEAB59] rounded-xl overflow-hidden shadow-2xs bg-white space-y-0">
                        {/* Table Header Controls */}
                        <div className="bg-gradient-to-r from-[#E67E00] via-[#008F2F] to-[#D9381E] text-white font-extrabold text-xs grid grid-cols-12 gap-2 p-2.5 items-center">
                          <div className="col-span-4">
                            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-black uppercase block mb-1 tracking-wider">
                              COL 1 (FEATURE ASPECT)
                            </span>
                            <input
                              type="text"
                              value={newPageCmpCol1}
                              onChange={(e) => setNewPageCmpCol1(e.target.value)}
                              placeholder="বৈশিষ্ট্য"
                              className="w-full px-2.5 py-1.5 bg-white text-[#0E0E0E] border border-white/60 rounded-md text-xs font-black focus:outline-none shadow-2xs"
                            />
                          </div>
                          <div className="col-span-4">
                            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-black uppercase block mb-1 tracking-wider">
                              COL 2 (OUR PRODUCT)
                            </span>
                            <input
                              type="text"
                              value={newPageCmpCol2}
                              onChange={(e) => setNewPageCmpCol2(e.target.value)}
                              placeholder="আমাদের Aura Pro"
                              className="w-full px-2.5 py-1.5 bg-emerald-50 text-emerald-950 border border-emerald-300 rounded-md text-xs font-black focus:outline-none shadow-2xs"
                            />
                          </div>
                          <div className="col-span-3">
                            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-black uppercase block mb-1 tracking-wider">
                              COL 3 (ORDINARY PRODUCT)
                            </span>
                            <input
                              type="text"
                              value={newPageCmpCol3}
                              onChange={(e) => setNewPageCmpCol3(e.target.value)}
                              placeholder="সাধারণ হেডফোন"
                              className="w-full px-2.5 py-1.5 bg-white text-[#0E0E0E] border border-white/60 rounded-md text-xs font-black focus:outline-none shadow-2xs"
                            />
                          </div>
                          <div className="col-span-1 text-center text-[10px] font-black uppercase tracking-wider">
                            DEL
                          </div>
                        </div>

                        {/* Table Body Input Rows */}
                        <div className="divide-y divide-[#EEEEEE] text-xs">
                          {newPageCmpItems.map((item, idx) => (
                            <div key={item.id || idx} className="grid grid-cols-12 gap-2 p-2.5 items-center bg-white hover:bg-[#FCF1E5]/20 transition-colors">
                              <div className="col-span-4">
                                <input
                                  type="text"
                                  value={item.feature}
                                  onChange={(e) => {
                                    const updated = [...newPageCmpItems];
                                    updated[idx].feature = e.target.value;
                                    setNewPageCmpItems(updated);
                                  }}
                                  placeholder={`Row #${idx + 1} Feature Aspect`}
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EEEEEE] rounded-md text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                                />
                              </div>
                              <div className="col-span-4">
                                <input
                                  type="text"
                                  value={item.ourProduct}
                                  onChange={(e) => {
                                    const updated = [...newPageCmpItems];
                                    updated[idx].ourProduct = e.target.value;
                                    setNewPageCmpItems(updated);
                                  }}
                                  placeholder="Our Product Feature"
                                  className="w-full px-3 py-2 bg-[#ECFFE8] border border-[#008F2F]/40 rounded-md text-xs font-extrabold text-[#006B22] focus:border-[#008F2F] focus:outline-none"
                                />
                              </div>
                              <div className="col-span-3">
                                <input
                                  type="text"
                                  value={item.otherProduct}
                                  onChange={(e) => {
                                    const updated = [...newPageCmpItems];
                                    updated[idx].otherProduct = e.target.value;
                                    setNewPageCmpItems(updated);
                                  }}
                                  placeholder="Ordinary Product"
                                  className="w-full px-3 py-2 bg-[#FFF0F0] border border-[#D9381E]/30 rounded-md text-xs font-semibold text-[#801010] focus:border-[#D9381E] focus:outline-none"
                                />
                              </div>
                              <div className="col-span-1 flex justify-center">
                                {newPageCmpItems.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => setNewPageCmpItems(newPageCmpItems.filter((_, i) => i !== idx))}
                                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Remove Row"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Row Bar */}
                        <div className="p-3 bg-[#FCF1E5] border-t border-[#EEAB59] flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0E0E0E]">
                            টেবিলে মোট {newPageCmpItems.length} টি তুলনামূলক রো আছে
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setNewPageCmpItems([
                                ...newPageCmpItems,
                                {
                                  id: `cmp-${Date.now()}`,
                                  feature: 'নতুন বৈশিষ্ট্য',
                                  ourProduct: 'আমাদের সেরা কোয়ালিটি',
                                  otherProduct: 'সাধারণ কোয়ালিটি'
                                }
                              ]);
                            }}
                            className="px-3.5 py-1.5 bg-[#008F2F] hover:bg-[#007325] text-white font-extrabold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs uppercase tracking-wider"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Row (+১টি রো)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: CUSTOMER REVIEWS & SOCIAL PROOF */}
                <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs space-y-4 p-4 md:p-5">
                  <div className="p-3 bg-[#FCF1E5] border-b border-[#EEEEEE] -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-4 bg-[#008F2F] rounded"></div>
                      <h3 className="font-bold text-xs text-[#0E0E0E] uppercase tracking-wider">
                        SECTION 4: CUSTOMER REVIEWS & CHAT SCREENSHOTS
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#008F2F] bg-[#ECFFE8] px-2 py-0.5 rounded border border-[#008F2F]/30">
                      {creatorReviews.length} REVIEWS ADDED
                    </span>
                  </div>

                  {/* Add Review Box */}
                  <div className="p-3.5 bg-[#FCF1E5]/40 border border-[#EEAB59] rounded space-y-3 text-xs">
                    <span className="font-bold text-[#0E0E0E] block text-xs">
                      ➕ কাস্টমার রিভিউ অথবা হোয়াটসঅ্যাপ/মেসেঞ্জার স্ক্রিনশট যোগ করুন:
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">Customer Name</label>
                        <input
                          type="text"
                          value={creatorReviewAuthor}
                          onChange={(e) => setCreatorReviewAuthor(e.target.value)}
                          placeholder="মোহাম্মদ আব্দুল্লাহ"
                          className="w-full px-3 py-1.5 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">Star Rating</label>
                        <select
                          value={creatorReviewRating}
                          onChange={(e) => setCreatorReviewRating(Number(e.target.value))}
                          className="w-full px-3 py-1.5 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#E67E00] focus:border-[#008F2F] focus:outline-none cursor-pointer"
                        >
                          <option value={5}>★★★★★ (5 Stars)</option>
                          <option value={4}>★★★★☆ (4 Stars)</option>
                          <option value={3}>★★★☆☆ (3 Stars)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">Location / Time</label>
                        <input
                          type="text"
                          value={creatorReviewTime}
                          onChange={(e) => setCreatorReviewTime(e.target.value)}
                          placeholder="Dhaka • 1 day ago"
                          className="w-full px-3 py-1.5 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">Customer Comment</label>
                      <textarea
                        rows={2}
                        value={creatorReviewContent}
                        onChange={(e) => setCreatorReviewContent(e.target.value)}
                        placeholder="পণ্যটি পেয়ে খুব ভালো লাগলো, একদম অরিজিনাল কোয়ালিটি..."
                        className="w-full p-2.5 bg-white border border-[#EEAB59] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                      />
                    </div>

                    {/* Image URL & File Upload */}
                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Review Photo or Chat Screenshot
                      </label>
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <input
                          type="url"
                          value={creatorReviewImageUrl}
                          onChange={(e) => setCreatorReviewImageUrl(e.target.value)}
                          placeholder="https://images.unsplash.com/photo-..."
                          className="w-full px-3 py-1.5 bg-white border border-[#EEAB59] rounded text-xs font-mono font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                        <label className="px-3.5 py-1.5 bg-white border border-[#EEAB59] text-[#E67E00] hover:bg-[#FCF1E5] font-extrabold text-xs rounded cursor-pointer shrink-0 transition-all flex items-center gap-1.5 shadow-2xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload File</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleCreatorReviewFileUpload}
                            className="hidden"
                          />
                        </label>
                      </div>
                      {creatorReviewImageUrl && (
                        <div className="mt-2 flex items-center gap-2">
                          <img
                            src={creatorReviewImageUrl}
                            alt="Review Preview"
                            className="w-12 h-12 object-cover rounded border border-[#EEAB59]"
                          />
                          <span className="text-[10px] text-[#008F2F] font-bold">Photo attached successfully!</span>
                        </div>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={handleAddCreatorReview}
                      className="px-4 py-1.5 bg-[#008F2F] hover:bg-[#007727] text-white font-extrabold text-xs rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>+ Add Customer Review</span>
                    </button>
                  </div>

                  {/* List of Added Creator Reviews */}
                  <div className="space-y-2 pt-1">
                    {creatorReviews.map((rev) => (
                      <div key={rev.id} className="p-3 bg-white border border-[#EEEEEE] rounded flex items-start justify-between gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 font-bold text-[#0E0E0E]">
                            <span>{rev.author}</span>
                            <span className="text-[#E67E00]">{'★'.repeat(rev.rating)}</span>
                            <span className="text-[10px] text-[#8F8F8F] font-normal">({rev.date})</span>
                          </div>
                          <p className="text-[11px] text-[#545454] leading-relaxed">{rev.content}</p>
                          {(rev.imageUrl || rev.screenshotUrl) && (
                            <img
                              src={rev.imageUrl || rev.screenshotUrl}
                              alt="Customer Review Screenshot"
                              className="w-16 h-16 object-cover rounded border border-[#EEAB59] mt-1"
                            />
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCreatorReview(rev.id)}
                          className="p-1.5 text-[#8F8F8F] hover:text-red-600 rounded cursor-pointer shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 5: SEO & META DATA */}
                <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs space-y-4 p-4 md:p-5">
                  <div className="p-3 bg-[#FCF1E5] border-b border-[#EEEEEE] -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-4 bg-[#008F2F] rounded"></div>
                      <h3 className="font-bold text-xs text-[#0E0E0E] uppercase tracking-wider flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-[#008F2F]" />
                        <span>SECTION 5: SEO, META DATA & PIXEL TRACKING</span>
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#008F2F] bg-[#ECFFE8] px-2 py-0.5 rounded border border-[#008F2F]/30">
                      SEARCH OPTIMIZATION
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs pt-1">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-[#0E0E0E]">Meta Title (Google Search Title)</label>
                        <span className={`text-[10px] font-bold ${creatorMetaTitle.length > 60 ? 'text-red-600' : 'text-[#8F8F8F]'}`}>
                          {creatorMetaTitle.length}/60 chars
                        </span>
                      </div>
                      <input
                        type="text"
                        value={creatorMetaTitle}
                        onChange={(e) => setCreatorMetaTitle(e.target.value)}
                        placeholder="e.g. 100% Authentic Organic Honey - Special Offer BD"
                        className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="font-bold text-[#0E0E0E]">Meta Description (Search Snippet)</label>
                        <span className={`text-[10px] font-bold ${creatorMetaDescription.length > 160 ? 'text-red-600' : 'text-[#8F8F8F]'}`}>
                          {creatorMetaDescription.length}/160 chars
                        </span>
                      </div>
                      <textarea
                        rows={2}
                        value={creatorMetaDescription}
                        onChange={(e) => setCreatorMetaDescription(e.target.value)}
                        placeholder="Write a clear search summary for Google results..."
                        className="w-full p-2.5 bg-white border border-[#EEAB59] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-bold text-[#0E0E0E] mb-1">Meta Keywords</label>
                        <input
                          type="text"
                          value={creatorMetaKeywords}
                          onChange={(e) => setCreatorMetaKeywords(e.target.value)}
                          placeholder="organic honey, sundarban honey, deal"
                          className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0E0E0E] mb-1">Social OG Share Image URL</label>
                        <input
                          type="url"
                          value={creatorOgImage}
                          onChange={(e) => setCreatorOgImage(e.target.value)}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-mono font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Facebook Pixel & Google Analytics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2 border-t border-[#EEEEEE]">
                      <div>
                        <label className="block font-bold text-[#0E0E0E] mb-1 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span>Facebook Pixel ID</span>
                        </label>
                        <input
                          type="text"
                          value={creatorFbPixel}
                          onChange={(e) => setCreatorFbPixel(e.target.value)}
                          placeholder="e.g. 8912839128391"
                          className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-mono font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-[#0E0E0E] mb-1 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                          <span>Google Analytics (GA4) ID</span>
                        </label>
                        <input
                          type="text"
                          value={creatorGaId}
                          onChange={(e) => setCreatorGaId(e.target.value)}
                          placeholder="e.g. G-789234110"
                          className="w-full px-3.5 py-2 bg-white border border-[#EEAB59] rounded text-xs font-mono font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Google Search Live Preview */}
                    <div className="p-3 bg-[#FCF1E5]/40 border border-[#EEAB59] rounded space-y-1">
                      <span className="text-[10px] font-bold text-[#E67E00] uppercase tracking-wider block">
                        🔍 Google Search Snippet Preview:
                      </span>
                      <div className="text-blue-700 font-bold text-xs leading-snug hover:underline cursor-pointer line-clamp-1">
                        {creatorMetaTitle || newPageTitle || 'Landing Page Title'}
                      </div>
                      <div className="text-[#008F2F] font-mono text-[11px]">
                        https://promisemart.com/landing/{newPageSlug || 'page'}
                      </div>
                      <div className="text-[#545454] text-[11px] leading-relaxed line-clamp-2">
                        {creatorMetaDescription || newPageDescription || 'Landing page short description...'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 6: THEME COLORS & SUBMIT */}
                <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs space-y-4 p-4 md:p-5">
                  <div className="p-3 bg-[#FCF1E5] border-b border-[#EEEEEE] -mx-4 -mt-4 md:-mx-5 md:-mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-4 bg-[#E67E00] rounded"></div>
                      <h3 className="font-bold text-xs text-[#0E0E0E] uppercase tracking-wider">
                        SECTION 6: BUTTON & THEME COLOR STYLE
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#E67E00] bg-white px-2 py-0.5 rounded border border-[#EEAB59]">
                      BRAND PRESETS
                    </span>
                  </div>

                  {/* Quick Presets */}
                  <div className="space-y-2 pt-1">
                    <label className="block font-bold text-xs text-[#545454]">
                      🎨 Select Brand Color Preset:
                    </label>
                    <div className="flex items-center gap-2 flex-wrap">
                      {THEME_PRESETS.map((preset) => {
                        const isSelected = modalBtnBg.toLowerCase() === preset.primaryButtonBg.toLowerCase();
                        return (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => {
                              setModalThemePreset(preset.id);
                              setModalBtnBg(preset.primaryButtonBg);
                              setModalBtnText(preset.primaryButtonText);
                              setModalHeadingColor(preset.headingTextColor);
                              setModalBadgeBg(preset.accentBadgeBg);
                              setModalBadgeText(preset.accentBadgeText);
                            }}
                            className={`px-3 py-1.5 text-xs font-bold rounded border transition-all flex items-center gap-2 cursor-pointer ${
                              isSelected
                                ? 'border-[#008F2F] bg-[#ECFFE8] text-[#008F2F] font-extrabold'
                                : 'border-[#EEAB59] bg-white text-[#545454] hover:bg-[#FCF1E5]'
                            }`}
                          >
                            <span className="w-3 h-3 rounded shrink-0" style={{ backgroundColor: preset.primaryButtonBg }} />
                            <span>{preset.presetBadge}</span>
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#008F2F]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form Submit Footer */}
                  <div className="pt-4 border-t border-[#EEEEEE] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentView('list')}
                      className="px-4 py-2 border border-[#EEAB59] text-[#E67E00] hover:bg-[#FCF1E5] font-bold text-xs rounded-full transition-all cursor-pointer uppercase tracking-wider"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#008F2F] hover:bg-[#007727] text-white font-extrabold text-xs rounded-full shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer uppercase tracking-wider"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>CREATE & PUBLISH PAGE</span>
                    </button>
                  </div>
                </div>

              </form>
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

            {/* Right Controls: Save Changes */}
            <div className="flex items-center gap-2.5">
              <button
                id="storefront-save-btn"
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full shadow-2xs transition-all uppercase tracking-wider cursor-pointer"
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

          {/* Main Container: Full Width Builder Form */}
          <div className="w-full">
            {/* BUILDER EDITING PANEL (Full Width 100%) */}
            <div className="w-full bg-white border border-[#EEAB59] rounded-2xl p-4 md:p-6 shadow-2xs space-y-5 h-fit">
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
                    id="builder-tab-theme"
                    onClick={() => setActiveBuilderTab('theme')}
                    className={`pb-2 px-1 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                      activeBuilderTab === 'theme'
                        ? 'border-b-2 border-[#E67E00] text-[#E67E00] font-extrabold'
                        : 'text-[#545454] hover:text-[#0E0E0E]'
                    }`}
                  >
                    <Palette className="w-3.5 h-3.5" />
                    <span>🎨 Button & Theme Colors</span>
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
                    {/* Basic Info: Title & Slug */}
                    <div className="p-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#EEEEEE]">
                        <span className="font-extrabold text-[#0E0E0E] text-xs uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#E67E00]"></span>
                          <span>পেজের শিরোনাম ও কাস্টম লিংক (Title & Custom URL Slug)</span>
                        </span>
                        <span className="text-[10px] text-[#008F2F] font-bold bg-[#ECFFE8] px-2 py-0.5 rounded border border-[#008F2F]/20">
                          Live Active Page
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            Landing Page Title / Product Name <span className="text-[#FF0000]">*</span>
                          </label>
                          <input
                            type="text"
                            value={currentActiveConfig.productTitle}
                            onChange={(e) => handleUpdateActiveTitle(e.target.value)}
                            placeholder="e.g. Aura Pro ANC Headphones"
                            className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            Custom Page URL Slug <span className="text-[#FF0000]">*</span>
                          </label>
                          <div className="relative flex items-center">
                            <span className="absolute left-3 text-[10px] font-mono font-bold text-[#8F8F8F] select-none">
                              /landing/
                            </span>
                            <input
                              type="text"
                              value={activePage?.slug || ''}
                              onChange={(e) => handleUpdateActiveSlug(e.target.value)}
                              placeholder="aura-pro-anc"
                              className="w-full pl-18 pr-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-mono font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                            />
                          </div>
                          <span className="text-[10px] font-mono text-[#008F2F] font-semibold block mt-1">
                            Live URL: https://promisemart.com/landing/{activePage?.slug || 'page'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Announcement Bar & Hero Badge */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Top Announcement Bar Text
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.announcementText || ''}
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
                          value={currentActiveConfig.heroBadge || ''}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, heroBadge: e.target.value })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Subtitle & Hero Description */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Subtitle / Tagline
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.productSubTitle || ''}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, productSubTitle: e.target.value })
                          }
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Product Hero Description
                        </label>
                        <textarea
                          rows={3}
                          value={currentActiveConfig.productDescription || ''}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, productDescription: e.target.value })
                          }
                          className="w-full p-3 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Media: Image URL & Video Embed */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          Main Product Image URL
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.seo?.ogImage || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'}
                          onChange={(e) =>
                            handleUpdateActiveConfig({
                              ...currentActiveConfig,
                              seo: { ...currentSeo, ogImage: e.target.value }
                            })
                          }
                          placeholder="https://images.unsplash.com/..."
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          YouTube Video Embed URL (Optional)
                        </label>
                        <input
                          type="text"
                          value={currentActiveConfig.videoEmbedUrl || ''}
                          onChange={(e) =>
                            handleUpdateActiveConfig({ ...currentActiveConfig, videoEmbedUrl: e.target.value })
                          }
                          placeholder="https://www.youtube.com/embed/..."
                          className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 3-Column Product Comparison Table (VS Section) Editing */}
                    <div className="pt-3 border-t border-[#EEEEEE] space-y-3">
                      <div className="p-3 bg-[#FCF1E5] rounded-xl border border-[#EEAB59] flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-[#0E0E0E] block text-xs uppercase tracking-wider">
                            KEY HIGHLIGHTS & 3-COLUMN PRODUCT COMPARISON TABLE (VS SECTION):
                          </span>
                          <span className="text-[11px] text-[#545454]">
                            রেফারেন্স ইমেজ অনুযায়ী ৩টি কলামে পণ্যের তুলনা তালিকা তৈরি করুন (Title, Subtitle & 3 Columns)
                          </span>
                        </div>
                        <span className="text-[11px] font-black text-[#E67E00] bg-white px-3 py-1 rounded-full border border-[#EEAB59] shrink-0 shadow-2xs">
                          {(currentActiveConfig.comparisonItems || []).length || 5} Rows
                        </span>
                      </div>

                      {/* Title & Subtitle Settings */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-[#FCF1E5]/40 border border-[#EEAB59] rounded-xl">
                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            Comparison Title (টেবিলের শিরোনাম):
                          </label>
                          <input
                            type="text"
                            value={currentActiveConfig.comparisonTableTitle ?? 'Aura Pro Studio VS Others Headphone'}
                            onChange={(e) =>
                              handleUpdateActiveConfig({
                                ...currentActiveConfig,
                                comparisonTableTitle: e.target.value
                              })
                            }
                            className="w-full px-3 py-2 bg-white border border-[#EEAB59] rounded-lg text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            Comparison Subtitle (সাবটাইটেল/বিবরণ):
                          </label>
                          <input
                            type="text"
                            value={currentActiveConfig.comparisonTableSubtitle ?? 'কেন সাধারণ হেডফোনের চেয়ে Aura Pro Studio সেরা জেনে নিন'}
                            onChange={(e) =>
                              handleUpdateActiveConfig({
                                ...currentActiveConfig,
                                comparisonTableSubtitle: e.target.value
                              })
                            }
                            className="w-full px-3 py-2 bg-white border border-[#EEAB59] rounded-lg text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                          />
                        </div>
                      </div>

                      {/* 3-Column Product Comparison Table Editor */}
                      <div className="border border-[#EEAB59] rounded-xl overflow-hidden shadow-2xs bg-white space-y-0">
                        {/* Table Header Controls */}
                        <div className="bg-gradient-to-r from-[#E67E00] via-[#008F2F] to-[#D9381E] text-white font-extrabold text-xs grid grid-cols-12 gap-2 p-2.5 items-center">
                          <div className="col-span-4">
                            <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded font-black uppercase block mb-1 tracking-wider">
                              COL 1 (FEATURE ASPECT)
                            </span>
                            <input
                              type="text"
                              value={currentActiveConfig.comparisonCol1Header ?? 'বৈশিষ্ট্য'}
                              onChange={(e) =>
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  comparisonCol1Header: e.target.value
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-white text-[#0E0E0E] border border-white/60 rounded-md text-xs font-black focus:outline-none shadow-2xs"
                            />
                          </div>
                          <div className="col-span-4">
                            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-black uppercase block mb-1 tracking-wider">
                              COL 2 (OUR PRODUCT)
                            </span>
                            <input
                              type="text"
                              value={currentActiveConfig.comparisonCol2Header ?? 'আমাদের Aura Pro'}
                              onChange={(e) =>
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  comparisonCol2Header: e.target.value
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-emerald-50 text-emerald-950 border border-emerald-300 rounded-md text-xs font-black focus:outline-none shadow-2xs"
                            />
                          </div>
                          <div className="col-span-3">
                            <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded font-black uppercase block mb-1 tracking-wider">
                              COL 3 (ORDINARY PRODUCT)
                            </span>
                            <input
                              type="text"
                              value={currentActiveConfig.comparisonCol3Header ?? 'সাধারণ হেডফোন'}
                              onChange={(e) =>
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  comparisonCol3Header: e.target.value
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-white text-[#0E0E0E] border border-white/60 rounded-md text-xs font-black focus:outline-none shadow-2xs"
                            />
                          </div>
                          <div className="col-span-1 text-center text-[10px] font-black uppercase tracking-wider">
                            DEL
                          </div>
                        </div>

                        {/* Table Body Rows */}
                        <div className="divide-y divide-[#EEEEEE] text-xs">
                          {((currentActiveConfig.comparisonItems && currentActiveConfig.comparisonItems.length > 0)
                            ? currentActiveConfig.comparisonItems
                            : [
                                { id: 'cmp-1', feature: 'অ্যাক্টিভ নয়েজ ক্যানসেলেশন', ourProduct: '-42dB হাইব্রিড ANC', otherProduct: 'কোনো ক্যানসেলেশন নেই' },
                                { id: 'cmp-2', feature: 'ব্যাটারি ব্যাকআপ', ourProduct: '৪০ ঘণ্টা প্লে-টাইম ও টাইপ-সি ফাস্ট চার্জিং', otherProduct: 'মাত্র ৩-৪ ঘণ্টা ব্যাকআপ' },
                                { id: 'cmp-3', feature: 'সাউন্ড কোয়ালিটি', ourProduct: '৪০মিমি স্টুдио ড্রাইভার ও 3D ডিপ বাস', otherProduct: 'ফ্ল্যাট ও সস্তা সাউন্ড' },
                                { id: 'cmp-4', feature: 'কলিং মাইক্রোফোন', ourProduct: '৪টি এইচডি ENC মাইক (নয়েজলেস কলিং)', otherProduct: 'প্রচুর ব্যাকগ্রাউন্ড নয়েজ' },
                                { id: 'cmp-5', feature: 'ওয়ারেন্টি সাপোর্ট', ourProduct: '১ বছর রিপ্লেসমেন্ট ওয়ারেন্টি', otherProduct: 'কোনো ওয়ারেন্টি নেই' }
                              ]
                          ).map((item, idx, arr) => (
                            <div key={item.id || idx} className="grid grid-cols-12 gap-2 p-2.5 items-center bg-white hover:bg-[#FCF1E5]/20 transition-colors">
                              <div className="col-span-4">
                                <input
                                  type="text"
                                  value={item.feature}
                                  onChange={(e) => {
                                    const updated = [...arr];
                                    updated[idx] = { ...updated[idx], feature: e.target.value };
                                    handleUpdateActiveConfig({ ...currentActiveConfig, comparisonItems: updated });
                                  }}
                                  placeholder={`Row #${idx + 1}`}
                                  className="w-full px-3 py-2 bg-[#FAFAFA] border border-[#EEEEEE] rounded-md text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none"
                                />
                              </div>
                              <div className="col-span-4">
                                <input
                                  type="text"
                                  value={item.ourProduct}
                                  onChange={(e) => {
                                    const updated = [...arr];
                                    updated[idx] = { ...updated[idx], ourProduct: e.target.value };
                                    handleUpdateActiveConfig({ ...currentActiveConfig, comparisonItems: updated });
                                  }}
                                  placeholder="Our Product"
                                  className="w-full px-3 py-2 bg-[#ECFFE8] border border-[#008F2F]/40 rounded-md text-xs font-extrabold text-[#006B22] focus:border-[#008F2F] focus:outline-none"
                                />
                              </div>
                              <div className="col-span-3">
                                <input
                                  type="text"
                                  value={item.otherProduct}
                                  onChange={(e) => {
                                    const updated = [...arr];
                                    updated[idx] = { ...updated[idx], otherProduct: e.target.value };
                                    handleUpdateActiveConfig({ ...currentActiveConfig, comparisonItems: updated });
                                  }}
                                  placeholder="Ordinary"
                                  className="w-full px-3 py-2 bg-[#FFF0F0] border border-[#D9381E]/30 rounded-md text-xs font-semibold text-[#801010] focus:border-[#D9381E] focus:outline-none"
                                />
                              </div>
                              <div className="col-span-1 flex justify-center">
                                {arr.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const filtered = arr.filter((_, i) => i !== idx);
                                      handleUpdateActiveConfig({
                                        ...currentActiveConfig,
                                        comparisonItems: filtered
                                      });
                                    }}
                                    className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Remove Row"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Add Row Button Bar */}
                        <div className="p-3 bg-[#FCF1E5] border-t border-[#EEAB59] flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0E0E0E]">
                            টেবিলে মোট {(currentActiveConfig.comparisonItems || []).length || 5} টি তুলনামূলক রো আছে
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              const existing = currentActiveConfig.comparisonItems || [
                                { id: 'cmp-1', feature: 'অ্যাক্টিভ নয়েজ ক্যানসেলেশন', ourProduct: '-42dB হাইব্রিড ANC', otherProduct: 'কোনো ক্যানসেলেশন নেই' },
                                { id: 'cmp-2', feature: 'ব্যাটারি ব্যাকআপ', ourProduct: '৪০ ঘণ্টা প্লে-টাইম ও টাইপ-সি ফাস্ট চার্জিং', otherProduct: 'মাত্র ৩-৪ ঘণ্টা ব্যাকআপ' },
                                { id: 'cmp-3', feature: 'সাউন্ড কোয়ালিটি', ourProduct: '৪০মিমি স্টুдио ড্রাইভার ও 3D ডিপ বাস', otherProduct: 'ফ্ল্যাট ও সস্তা সাউন্ড' },
                                { id: 'cmp-4', feature: 'কলিং মাইক্রোফোন', ourProduct: '৪টি এইচডি ENC মাইক (নয়েজলেস কলিং)', otherProduct: 'প্রচুর ব্যাকগ্রাউন্ড নয়েজ' },
                                { id: 'cmp-5', feature: 'ওয়ারেন্টি সাপোর্ট', ourProduct: '১ বছর রিপ্লেসমেন্ট ওয়ারেন্টি', otherProduct: 'কোনো ওয়ারেন্টি নেই' }
                              ];
                              handleUpdateActiveConfig({
                                ...currentActiveConfig,
                                comparisonItems: [
                                  ...existing,
                                  { id: `cmp-${Date.now()}`, feature: 'নতুন বৈশিষ্ট্য', ourProduct: 'আমাদের সেরা সুবিধা', otherProduct: 'সাধারণ সুবিধা' }
                                ]
                              });
                            }}
                            className="px-3.5 py-1.5 bg-[#008F2F] hover:bg-[#007325] text-white font-extrabold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs uppercase tracking-wider"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Row (+১টি রো)</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: THEME & COLOR CUSTOMIZATION */}
                {activeBuilderTab === 'theme' && (
                  <div className="space-y-5 text-xs">
                    {/* Header Banner */}
                    <div className="p-3.5 bg-gradient-to-r from-[#ECFFE8] via-[#FCF1E5] to-[#EFF6FF] border border-[#EEAB59]/40 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <h4 className="font-extrabold text-[#0E0E0E] text-xs flex items-center gap-1.5">
                          <Palette className="w-4 h-4 text-[#008F2F]" />
                          <span>Landing Page Theme & Button Colors (বাটন ও টেক্সট কালার)</span>
                        </h4>
                        <p className="text-[11px] text-[#545454]">
                          Select product themes (e.g. Organic Green for Natural products, Red for Food) or set custom HEX button & text colors.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-white text-[#008F2F] font-black text-[10px] rounded-full border border-[#008F2F]/30 uppercase tracking-wider shadow-2xs w-fit">
                        {activeThemeColors.themePresetName || 'Active Theme'}
                      </span>
                    </div>

                    {/* Section 1: Quick Preset Themes */}
                    <div className="space-y-2">
                      <label className="block text-xs font-extrabold text-[#0E0E0E] uppercase tracking-wider">
                        1. Select Theme Preset (ইন্ডাস্ট্রি অনুযায়ী প্রস্তুতকৃত কালার থিম)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                        {THEME_PRESETS.map((preset) => {
                          const isSelected = activeThemeColors.primaryButtonBg.toLowerCase() === preset.primaryButtonBg.toLowerCase();
                          return (
                            <button
                              key={preset.id}
                              type="button"
                              onClick={() => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    primaryButtonBg: preset.primaryButtonBg,
                                    primaryButtonText: preset.primaryButtonText,
                                    headingTextColor: preset.headingTextColor,
                                    accentBadgeBg: preset.accentBadgeBg,
                                    accentBadgeText: preset.accentBadgeText,
                                    themePresetName: preset.presetBadge
                                  }
                                });
                              }}
                              className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                                isSelected
                                  ? 'border-[#008F2F] bg-[#ECFFE8]/30 shadow-md ring-2 ring-[#008F2F]/30'
                                  : 'border-[#EEEEEE] bg-white hover:border-[#EEAB59] hover:bg-[#FAFAFA]'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="font-extrabold text-xs text-[#0E0E0E] flex items-center gap-1.5">
                                  {preset.name}
                                </span>
                                {isSelected && (
                                  <span className="w-2.5 h-2.5 rounded-full bg-[#008F2F] shrink-0"></span>
                                )}
                              </div>
                              <p className="text-[10px] text-[#545454] line-clamp-2 mb-2 leading-snug">
                                {preset.description}
                              </p>
                              
                              {/* Swatch Pill Preview */}
                              <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#EEEEEE]/80">
                                <span
                                  className="px-2.5 py-1 text-[10px] font-bold rounded-full shadow-2xs"
                                  style={{ backgroundColor: preset.primaryButtonBg, color: preset.primaryButtonText }}
                                >
                                  Order Button
                                </span>
                                <span
                                  className="px-2 py-0.5 text-[9px] font-bold rounded"
                                  style={{ backgroundColor: preset.accentBadgeBg, color: preset.accentBadgeText }}
                                >
                                  Badge
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Section 2: Custom Color Controls */}
                    <div className="p-4 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl space-y-4">
                      <h5 className="font-extrabold text-xs text-[#0E0E0E] uppercase tracking-wider">
                        2. Customize Colors Manually (নিজের পছন্দমতো কাস্টম কালার সেট করুন)
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Primary Button Background Color */}
                        <div className="space-y-1.5 bg-white p-3 rounded-lg border border-[#EEEEEE]">
                          <label className="block font-bold text-[#0E0E0E] text-[11px]">
                            Primary CTA Button Color (অর্ডার বাটন কালার)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeThemeColors.primaryButtonBg}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    primaryButtonBg: e.target.value
                                  }
                                });
                              }}
                              className="w-9 h-9 rounded cursor-pointer border border-[#EEEEEE] p-0.5 shrink-0"
                            />
                            <input
                              type="text"
                              value={activeThemeColors.primaryButtonBg}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    primaryButtonBg: e.target.value
                                  }
                                });
                              }}
                              placeholder="#008F2F"
                              className="w-28 px-3 py-1.5 bg-white border border-[#EEEEEE] rounded font-mono text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                            />
                          </div>
                          
                          {/* Quick Swatch Palette Dots */}
                          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                            <span className="text-[10px] font-medium text-[#8F8F8F]">Presets:</span>
                            {[
                              { label: 'Green', color: '#008F2F' },
                              { label: 'Emerald', color: '#047857' },
                              { label: 'Food Red', color: '#DC2626' },
                              { label: 'Orange', color: '#E67E00' },
                              { label: 'Royal Blue', color: '#2563EB' },
                              { label: 'Pink', color: '#E11D48' },
                              { label: 'Gold', color: '#D97706' },
                              { label: 'Dark', color: '#18181B' }
                            ].map((item) => (
                              <button
                                key={item.color}
                                type="button"
                                title={item.label}
                                onClick={() => {
                                  handleUpdateActiveConfig({
                                    ...currentActiveConfig,
                                    themeColors: {
                                      ...activeThemeColors,
                                      primaryButtonBg: item.color
                                    }
                                  });
                                }}
                                className="w-5 h-5 rounded-full border border-black/10 hover:scale-110 transition-all shadow-2xs"
                                style={{ backgroundColor: item.color }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Button Text Color */}
                        <div className="space-y-1.5 bg-white p-3 rounded-lg border border-[#EEEEEE]">
                          <label className="block font-bold text-[#0E0E0E] text-[11px]">
                            Button Text Color (বাটন টেক্সটের রঙ)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeThemeColors.primaryButtonText}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    primaryButtonText: e.target.value
                                  }
                                });
                              }}
                              className="w-9 h-9 rounded cursor-pointer border border-[#EEEEEE] p-0.5 shrink-0"
                            />
                            <input
                              type="text"
                              value={activeThemeColors.primaryButtonText}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    primaryButtonText: e.target.value
                                  }
                                });
                              }}
                              placeholder="#FFFFFF"
                              className="w-28 px-3 py-1.5 bg-white border border-[#EEEEEE] rounded font-mono text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                            />
                          </div>

                          <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                            <span className="text-[10px] font-medium text-[#8F8F8F]">Quick:</span>
                            {[
                              { label: 'Pure White', color: '#FFFFFF' },
                              { label: 'Soft Cream', color: '#FEF3C7' },
                              { label: 'Bright Yellow', color: '#FDE047' },
                              { label: 'Dark Charcoal', color: '#0E0E0E' }
                            ].map((item) => (
                              <button
                                key={item.color}
                                type="button"
                                title={item.label}
                                onClick={() => {
                                  handleUpdateActiveConfig({
                                    ...currentActiveConfig,
                                    themeColors: {
                                      ...activeThemeColors,
                                      primaryButtonText: item.color
                                    }
                                  });
                                }}
                                className="w-5 h-5 rounded-full border border-black/20 hover:scale-110 transition-all shadow-2xs"
                                style={{ backgroundColor: item.color }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Title & Heading Text Color */}
                        <div className="space-y-1.5 bg-white p-3 rounded-lg border border-[#EEEEEE]">
                          <label className="block font-bold text-[#0E0E0E] text-[11px]">
                            Product Title & Heading Color (শিরোনামের রঙ)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeThemeColors.headingTextColor}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    headingTextColor: e.target.value
                                  }
                                });
                              }}
                              className="w-9 h-9 rounded cursor-pointer border border-[#EEEEEE] p-0.5 shrink-0"
                            />
                            <input
                              type="text"
                              value={activeThemeColors.headingTextColor}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    headingTextColor: e.target.value
                                  }
                                });
                              }}
                              placeholder="#0E0E0E"
                              className="w-28 px-3 py-1.5 bg-white border border-[#EEEEEE] rounded font-mono text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                            />
                          </div>
                        </div>

                        {/* Accent Badge Color */}
                        <div className="space-y-1.5 bg-white p-3 rounded-lg border border-[#EEEEEE]">
                          <label className="block font-bold text-[#0E0E0E] text-[11px]">
                            Hero Badge Background (ব্যাজ ব্যাকগ্রাউন্ড)
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={activeThemeColors.accentBadgeBg}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    accentBadgeBg: e.target.value
                                  }
                                });
                              }}
                              className="w-9 h-9 rounded cursor-pointer border border-[#EEEEEE] p-0.5 shrink-0"
                            />
                            <input
                              type="text"
                              value={activeThemeColors.accentBadgeBg}
                              onChange={(e) => {
                                handleUpdateActiveConfig({
                                  ...currentActiveConfig,
                                  themeColors: {
                                    ...activeThemeColors,
                                    accentBadgeBg: e.target.value
                                  }
                                });
                              }}
                              placeholder="#ECFFE8"
                              className="w-28 px-3 py-1.5 bg-white border border-[#EEEEEE] rounded font-mono text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Live Button Sample Box */}
                    <div className="p-4 bg-white border border-[#EEEEEE] rounded-xl space-y-2">
                      <span className="text-xs font-extrabold text-[#0E0E0E] uppercase tracking-wider block">
                        3. Live Button Visual Preview (লাইভ বাটন প্রিভিউ)
                      </span>
                      <div className="p-6 bg-[#FAFAFA] border border-dashed border-[#EEAB59] rounded-xl flex flex-col items-center justify-center space-y-3 text-center">
                        <button
                          type="button"
                          style={{
                            backgroundColor: activeThemeColors.primaryButtonBg,
                            color: activeThemeColors.primaryButtonText
                          }}
                          className="px-8 py-3.5 font-black text-sm rounded-full shadow-lg hover:opacity-90 transition-all uppercase tracking-wider flex items-center gap-2"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>অর্ডার করতে এখানে ক্লিক করুন — ৳{currentActiveConfig.basePrice.toLocaleString()}</span>
                        </button>
                        <p className="text-[11px] text-[#545454]">
                          This exact button color will render live on your storefront!
                        </p>
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
                  <div className="space-y-4 text-xs">
                    {/* Add New Review Form */}
                    <form onSubmit={handleAddReview} className="p-3.5 bg-[#FAFAFA] border border-[#EEEEEE] rounded-xl space-y-3">
                      <span className="font-extrabold text-[#0E0E0E] text-xs uppercase tracking-wider block border-b border-[#EEEEEE] pb-2">
                        ➕ নতুন কাস্টমার রিভিউ যুক্ত করুন (Add Customer Review)
                      </span>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            ক্রেতার নাম (Customer Name) <span className="text-[#FF0000]">*</span>
                          </label>
                          <input
                            type="text"
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            placeholder="যেমন: মোহাম্মদ আব্দুল্লাহ"
                            className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            রেটিং (Star Rating)
                          </label>
                          <select
                            value={newReviewRating}
                            onChange={(e) => setNewReviewRating(Number(e.target.value))}
                            className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#E67E00] focus:border-[#E67E00] focus:outline-none"
                          >
                            <option value={5}>★★★★★ (5 Stars)</option>
                            <option value={4}>★★★★☆ (4 Stars)</option>
                            <option value={3}>★★★☆☆ (3 Stars)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                            Time / Location
                          </label>
                          <input
                            type="text"
                            value={newReviewDate}
                            onChange={(e) => setNewReviewDate(e.target.value)}
                            placeholder="e.g. Dhaka • 2 days ago"
                            className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          রিভিউয়ের বক্তব্য (Customer Comment) <span className="text-[#FF0000]">*</span>
                        </label>
                        <textarea
                          rows={2}
                          value={newReviewContent}
                          onChange={(e) => setNewReviewContent(e.target.value)}
                          placeholder="প্রোডাক্টটি পেয়ে খুব ভালো লাগলো, প্যাকেজিং সুন্দর ছিল..."
                          className="w-full p-2.5 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                          রিভিউ ছবি বা হোয়াটসঅ্যাপ/মেসেঞ্জার চ্যাটের স্ক্রিনশট (Review Photo / Chat Screenshot)
                        </label>
                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <input
                            type="url"
                            value={newReviewImageUrl}
                            onChange={(e) => setNewReviewImageUrl(e.target.value)}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full px-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-mono font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                          />
                          <label className="px-3.5 py-1.5 bg-white border border-[#EEAB59] text-[#E67E00] hover:bg-[#FCF1E5] font-extrabold text-xs rounded cursor-pointer shrink-0 transition-all flex items-center gap-1.5 shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleBuilderReviewFileUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        {newReviewImageUrl && (
                          <div className="mt-2 flex items-center gap-2">
                            <img
                              src={newReviewImageUrl}
                              alt="Review Screenshot"
                              className="w-12 h-12 object-cover rounded border border-slate-200"
                            />
                            <span className="text-[10px] text-emerald-600 font-bold">Review Photo Attached!</span>
                          </div>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-[#008F2F] hover:bg-[#007727] text-white font-extrabold text-xs rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Review</span>
                      </button>
                    </form>

                    {/* Existing Reviews List */}
                    <div className="space-y-2">
                      <span className="font-bold text-[#0E0E0E] block text-xs">
                        বিদ্যমান কাস্টমার টেস্টিমোনিয়াল ({currentActiveConfig.reviews.length})
                      </span>
                      {currentActiveConfig.reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-white border border-[#EEEEEE] rounded-lg flex items-start justify-between gap-3">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 font-bold text-[#0E0E0E]">
                              <span>{rev.author}</span>
                              <span className="text-[#E67E00]">{'★'.repeat(rev.rating)}</span>
                              <span className="text-[10px] text-[#8F8F8F] font-normal">({rev.date})</span>
                            </div>
                            <p className="text-[11px] text-[#545454] leading-relaxed">{rev.content}</p>
                            {(rev.imageUrl || rev.screenshotUrl) && (
                              <div className="pt-1">
                                <img
                                  src={rev.imageUrl || rev.screenshotUrl}
                                  alt="Customer Review Screenshot"
                                  className="w-20 h-20 object-cover rounded border border-slate-200 shadow-2xs"
                                />
                              </div>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(rev.id)}
                            className="p-1.5 text-[#8F8F8F] hover:text-[#FF0000] hover:bg-[#FFF5F5] rounded transition-all cursor-pointer shrink-0"
                            title="Delete Review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB CONTENT: SEO & PIXELS */}
                {activeBuilderTab === 'seo' && (
                  <div className="space-y-4 text-xs">
                    <div className="p-3.5 bg-[#FCF1E5]/30 border border-[#EEAB59] rounded-lg flex items-start gap-2.5">
                      <Globe className="w-4 h-4 text-[#E67E00] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-black text-[#0E0E0E] text-xs">SEO, Social Meta & Analytics Pixels</h4>
                        <p className="text-[11px] text-[#545454] font-medium leading-relaxed mt-0.5">
                          Configure search engine title tags, description snippets, OpenGraph social share cards, Facebook Pixel ID, and Google Analytics.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3.5 pt-1">
                      <div className="flex items-center gap-1.5 text-xs font-black text-[#0E0E0E] uppercase tracking-wider">
                        <Search className="w-3.5 h-3.5 text-[#E67E00]" />
                        <span>1. Search Engine Meta Tags</span>
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

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        <div>
                          <label className="block font-bold text-[#0E0E0E] mb-1">
                            Meta Keywords
                          </label>
                          <input
                            type="text"
                            value={currentSeo.metaKeywords || ''}
                            onChange={(e) => updateSeo({ metaKeywords: e.target.value })}
                            placeholder="organic honey, deal, fast shipping"
                            className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:outline-none"
                          />
                        </div>
                      </div>


                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      {/* End Builder */}
    </div>
  );
};

export default DynamicStorefront;
