export type ProductSubTab = 
  | 'MY_PRODUCTS' 
  | 'ADD_PRODUCT' 
  | 'BRANDS' 
  | 'ADD_BRAND' 
  | 'CATEGORIES' 
  | 'ADD_CATEGORY' 
  | 'VARIATIONS' 
  | 'ADD_VARIATION' 
  | 'PRODUCT_LEDGER';

export type FinanceSubTab = 
  | 'BALANCE_TRANSFER' 
  | 'TRANSACTIONS' 
  | 'POS_SETTINGS';

export type PurchaseSubTab = 
  | 'ADD_PURCHASE' 
  | 'MANAGE_PURCHASE';

export type NavigationTab = 
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'finance'
  | 'purchases'
  | 'reports'
  | 'storefront'
  | 'customers'
  | 'fraudCheck'
  | 'settings';

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';

export type PaymentMethod = 'Cash On Delivery' | 'bKash/Merchant' | 'Card/Bank' | 'Nagad/Rocket';

export interface OrderItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string; // e.g. #ORD-479697
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  cityZone: 'Inside Dhaka (৳60)' | 'Outside Dhaka (৳80)' | 'Remote Area (৳130)';
  shippingCost: number;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  expectedDelivery: string;
  notes?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  sourceProduct: string;
  productPrice: number;
  status: 'Abandoned Cart' | 'Contacted' | 'Converted' | 'Lost';
  abandonedStep: 'Product Page' | 'Shipping Info' | 'Payment Select';
  cartValue: number;
  lastActive: string;
  score: number; // 1 - 100
  notes?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  colors: { name: string; hex: string }[];
  inStock: boolean;
  salesCount: number;
  rating: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  content: string;
}

export interface SeoMetaData {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: 'Product' | 'Offer' | 'LocalBusiness' | 'WebPage';
  allowIndexing: boolean;
  googleAnalyticsId: string;
  fbPixelId: string;
}

export interface StorefrontConfig {
  announcementText: string;
  announcementEnabled: boolean;
  heroBadge: string;
  productTitle: string;
  productSubTitle: string;
  productDescription: string;
  basePrice: number;
  originalPrice: number;
  discountPercentage: number;
  inStock: boolean;
  features: string[];
  colors: { id: string; name: string; hex: string }[];
  deliveryInsideDhaka: number;
  deliverySubDhaka: number;
  deliveryOutsideDhaka: number;
  paymentMethods: {
    cod: boolean;
    bkash: boolean;
    card: boolean;
  };
  customFields: {
    requirePhone: boolean;
    requireFullAddress: boolean;
    allowNotes: boolean;
  };
  reviews: CustomerReview[];
  seo?: SeoMetaData;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  unread: boolean;
  type: 'order' | 'lead' | 'stock' | 'system';
}

export type DateFilter = 'Today' | 'Yesterday' | '7D' | '30D' | 'All' | 'Custom';
