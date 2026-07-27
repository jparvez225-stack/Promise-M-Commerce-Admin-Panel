import { Order, Lead, Product, StorefrontConfig, NotificationItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    title: 'Aura Pro Studio Wireless ANC Headphones',
    price: 4990,
    originalPrice: 6650,
    description: '-42dB Hybrid ANC, 40-Hour Battery, 40mm Titanium Studio Drivers, ANC Noise Cancelling & Bluetooth 5.3',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    colors: [
      { name: 'Midnight Black', hex: '#18181b' },
      { name: 'Royal Blue', hex: '#1d4ed8' },
      { name: 'Sky Gray', hex: '#94a3b8' },
      { name: 'Deep Purple', hex: '#7e22ce' }
    ],
    inStock: true,
    salesCount: 1240,
    rating: 4.9
  },
  {
    id: 'prod-2',
    title: 'Sony WH-1000XM6',
    price: 22000,
    originalPrice: 25000,
    description: '50mm diameter driver for stereo surround sound, ensuring accurate sound localization',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    colors: [{ name: 'Matte Black', hex: '#000000' }],
    inStock: true,
    salesCount: 420,
    rating: 4.8
  },
  {
    id: 'prod-3',
    title: 'HAVIT HIV69 Gaming Headset',
    price: 2000,
    originalPrice: 2800,
    description: 'Wired monitor headphones HAVIT HV-H2178d offers high quality sound. 7.1 Surround',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80',
    colors: [{ name: 'Ice White', hex: '#f8fafc' }],
    inStock: true,
    salesCount: 890,
    rating: 4.6
  },
  {
    id: 'prod-4',
    title: 'EKSA E900 Pro 7.1',
    price: 2500,
    originalPrice: 3500,
    description: 'Pro Noise Cancelling 7.1 Surround Gaming Headset with detachable noise-canceling microphone',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    colors: [{ name: 'Crimson Red', hex: '#dc2626' }],
    inStock: true,
    salesCount: 650,
    rating: 4.7
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: '#ORD-479697',
    customerName: 'Tanvir Rahman',
    customerPhone: '01712345678',
    customerAddress: 'House #24, Road #12, Block #B, Dhanmondi, Dhaka',
    cityZone: 'Inside Dhaka (৳60)',
    shippingCost: 60,
    items: [
      {
        id: 'item-1',
        name: 'Aura Pro Studio Wireless ANC Headphones',
        variant: 'Midnight Black',
        price: 4990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 5050,
    paymentMethod: 'Cash On Delivery',
    status: 'Pending',
    createdAt: '2026-07-26 21:45',
    expectedDelivery: 'Tuesday, Jul 28, 2026',
    notes: 'Please call before delivery'
  },
  {
    id: '#ORD-479696',
    customerName: 'Nusrat Jahan',
    customerPhone: '01898765432',
    customerAddress: 'Flat 4B, Concord Tower, Banani, Dhaka',
    cityZone: 'Inside Dhaka (৳60)',
    shippingCost: 60,
    items: [
      {
        id: 'item-1',
        name: 'Aura Pro Studio Wireless ANC Headphones',
        variant: 'Royal Blue',
        price: 4990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 5050,
    paymentMethod: 'bKash/Merchant',
    status: 'Processing',
    createdAt: '2026-07-26 20:10',
    expectedDelivery: 'Tuesday, Jul 28, 2026',
    notes: 'bKash TrxID: 9X7A2B1M8'
  },
  {
    id: '#ORD-479695',
    customerName: 'Rafiqul Islam',
    customerPhone: '01655443322',
    customerAddress: 'Holding 14, Station Road, Agrabad, Chittagong',
    cityZone: 'Outside Dhaka (৳80)',
    shippingCost: 80,
    items: [
      {
        id: 'item-2',
        name: 'Sony WH-1000XM6',
        variant: 'Matte Black',
        price: 22000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 22080,
    paymentMethod: 'Card/Bank',
    status: 'Shipped',
    createdAt: '2026-07-26 18:30',
    expectedDelivery: 'Wednesday, Jul 29, 2026',
    notes: 'Courier tracking code: REDX-99812'
  },
  {
    id: '#ORD-479694',
    customerName: 'Ayesha Siddiqua',
    customerPhone: '01911223344',
    customerAddress: 'House 5, Road 3, Sector 7, Uttara, Dhaka',
    cityZone: 'Inside Dhaka (৳60)',
    shippingCost: 60,
    items: [
      {
        id: 'item-1',
        name: 'Aura Pro Studio Wireless ANC Headphones',
        variant: 'Sky Gray',
        price: 4990,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 10040,
    paymentMethod: 'Cash On Delivery',
    status: 'Delivered',
    createdAt: '2026-07-25 14:20',
    expectedDelivery: 'Monday, Jul 27, 2026',
    notes: 'Delivered successfully via Steadfast'
  },
  {
    id: '#ORD-479693',
    customerName: 'Mahmud Hasan',
    customerPhone: '01700112233',
    customerAddress: 'College Road, Sylhet Sadar, Sylhet',
    cityZone: 'Outside Dhaka (৳80)',
    shippingCost: 80,
    items: [
      {
        id: 'item-3',
        name: 'HAVIT HIV69 Gaming Headset',
        variant: 'Ice White',
        price: 2000,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 2080,
    paymentMethod: 'Cash On Delivery',
    status: 'Canceled',
    createdAt: '2026-07-25 11:05',
    expectedDelivery: 'N/A',
    notes: 'Customer canceled - changed mind'
  },
  {
    id: '#ORD-479692',
    customerName: 'Kazi Farhan',
    customerPhone: '01533445566',
    customerAddress: 'Zilla School Road, Mymensingh',
    cityZone: 'Remote Area (৳130)',
    shippingCost: 130,
    items: [
      {
        id: 'item-4',
        name: 'EKSA E900 Pro 7.1',
        variant: 'Crimson Red',
        price: 2500,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
      }
    ],
    totalAmount: 2630,
    paymentMethod: 'bKash/Merchant',
    status: 'Delivered',
    createdAt: '2026-07-24 16:50',
    expectedDelivery: 'Sunday, Jul 26, 2026'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'LEAD-101',
    name: 'Sajid Hossain',
    phone: '01819202122',
    email: 'sajid.h@gmail.com',
    sourceProduct: 'Aura Pro Studio Wireless ANC Headphones',
    productPrice: 4990,
    status: 'Abandoned Cart',
    abandonedStep: 'Shipping Info',
    cartValue: 5050,
    lastActive: '12 mins ago',
    score: 88,
    notes: 'Entered name and mobile number, left at address field.'
  },
  {
    id: 'LEAD-102',
    name: 'Farzana Akhtar',
    phone: '01733445522',
    email: 'farzana.akhtar@yahoo.com',
    sourceProduct: 'Aura Pro Studio Wireless ANC Headphones',
    productPrice: 4990,
    status: 'Abandoned Cart',
    abandonedStep: 'Payment Select',
    cartValue: 5050,
    lastActive: '34 mins ago',
    score: 94,
    notes: 'Selected bKash option but closed tab before confirming.'
  },
  {
    id: 'LEAD-103',
    name: 'Kamrul Zaman',
    phone: '01677889900',
    email: 'kamrul.z@outlook.com',
    sourceProduct: 'Sony WH-1000XM6',
    productPrice: 22000,
    status: 'Contacted',
    abandonedStep: 'Product Page',
    cartValue: 22080,
    lastActive: '2 hours ago',
    score: 72,
    notes: 'Sent WhatsApp discount coupon for ৳500 OFF.'
  },
  {
    id: 'LEAD-104',
    name: 'Tamim Iqbal',
    phone: '01988776655',
    email: 'tamim.sports@gmail.com',
    sourceProduct: 'HAVIT HIV69 Gaming Headset',
    productPrice: 2000,
    status: 'Converted',
    abandonedStep: 'Payment Select',
    cartValue: 2080,
    lastActive: 'Yesterday',
    score: 100,
    notes: 'Completed order via phone call follow-up.'
  },
  {
    id: 'LEAD-105',
    name: 'Mehedi Hasan',
    phone: '01511223344',
    email: 'mehedi.dev@gmail.com',
    sourceProduct: 'EKSA E900 Pro 7.1',
    productPrice: 2500,
    status: 'Abandoned Cart',
    abandonedStep: 'Shipping Info',
    cartValue: 2580,
    lastActive: '4 hours ago',
    score: 80,
    notes: 'Clicked 25% discount banner, paused at checkout.'
  }
];

export const INITIAL_STOREFRONT_CONFIG: StorefrontConfig = {
  announcementText: '৪টি প্রডাক্ট অর্ডার করলে ২৫% ডিসকাউন্ট',
  announcementEnabled: true,
  heroBadge: '২৫% বিশেষ ছাড় — সীমিত সময়ের স্টক',
  productTitle: 'Aura Pro Studio Wireless ANC Headphones',
  productSubTitle: 'Model: AP-ANC-2026 • High Fidelity Audio',
  productDescription: '-42dB অ্যাক্টিভ নয়েজ ক্যানসেলেশন, ৪০ ঘণ্টার ব্যাটারি ও প্রিমিয়াম স্টুডিও সাউন্ডড্রাইভার সহ Aura Pro Studio Headphones.',
  basePrice: 4990,
  originalPrice: 6650,
  discountPercentage: 25,
  inStock: true,
  features: [
    'Hybrid Active Noise Cancellation (-42dB dual mic array)',
    'Studio Lossless Hi-Fi Sound (Custom 40mm titanium drivers)',
    '40-Hour All-Week Battery (10-min USB-C quick charge = 5 hrs)',
    'All-Day Cloud Comfort (Breathable memory foam cushions)',
    'Dual Multipoint Connectivity (Phone & Laptop simultaneously)',
    '১ বছরের ওয়ারেন্টি & ৭ দিনের ফ্রি রিপ্লেসমেন্ট'
  ],
  colors: [
    { id: 'c1', name: 'Midnight Black', hex: '#18181b' },
    { id: 'c2', name: 'Royal Blue', hex: '#1d4ed8' },
    { id: 'c3', name: 'Sky Gray', hex: '#94a3b8' },
    { id: 'c4', name: 'Deep Purple', hex: '#7e22ce' }
  ],
  deliveryInsideDhaka: 60,
  deliverySubDhaka: 80,
  deliveryOutsideDhaka: 130,
  paymentMethods: {
    cod: true,
    bkash: true,
    card: true
  },
  customFields: {
    requirePhone: true,
    requireFullAddress: true,
    allowNotes: true
  },
  reviews: [
    {
      id: 'r1',
      author: 'Michael Evans',
      location: 'Dhaka, Bangladesh',
      date: '2 days ago',
      rating: 5,
      content: 'The Noise Cancellation on this is insane! I use it during my daily Dhaka commute on metro/bus and it silences everything completely. Battery easily lasts 4-5 days of heavy use.'
    },
    {
      id: 'r2',
      author: 'Tanvir Hossain',
      location: 'Chittagong, Bangladesh',
      date: '3 days ago',
      rating: 5,
      content: 'Sound quality is extremely rich with deep bass. The memory foam pads are soft and do not hurt ears even after 6 hours of work calls.'
    },
    {
      id: 'r3',
      author: 'Afsana Mimi',
      location: 'Sylhet, Bangladesh',
      date: '1 week ago',
      rating: 5,
      content: 'Super fast delivery within 2 days. Cash on delivery made it completely risk-free. Highly recommended!'
    }
  ],
  seo: {
    metaTitle: 'Aura Pro Studio ANC Headphones - 25% OFF Limited Deal',
    metaDescription: 'Buy Aura Pro Studio Wireless ANC Headphones online in Bangladesh. -42dB Active Noise Cancellation, 40-hour battery life & 1 Year Warranty.',
    metaKeywords: 'headphones, bluetooth headphone, aura pro, wireless headset, noise cancellation, electronics bd',
    canonicalUrl: 'https://promisemart.com/landing/aura-pro-anc',
    ogTitle: 'Aura Pro Studio Headphones | 25% Special Discount',
    ogDescription: 'Experience studio quality lossless hi-fi audio with 40-hour battery life and 1-year replacement warranty in BD.',
    ogImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    schemaType: 'Product',
    allowIndexing: true,
    googleAnalyticsId: 'G-789234110',
    fbPixelId: 'PIXEL-901823712'
  }
};

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New High Value Order #ORD-479697',
    description: 'Tanvir Rahman placed an order for Aura Pro ANC Headphone (৳5,050)',
    timestamp: '5m ago',
    unread: true,
    type: 'order'
  },
  {
    id: 'n2',
    title: 'Abandoned Cart Alert',
    description: 'Farzana Akhtar abandoned cart at payment step (৳5,050 value)',
    timestamp: '34m ago',
    unread: true,
    type: 'lead'
  },
  {
    id: 'n3',
    title: 'Stock Warning',
    description: 'Sony WH-1000XM6 stock down to 4 units in primary warehouse',
    timestamp: '2h ago',
    unread: false,
    type: 'stock'
  },
  {
    id: 'n4',
    title: 'Daily Conversion Target Reached',
    description: 'Conversion rate hit 3.85% today (+0.8% above monthly baseline)',
    timestamp: '4h ago',
    unread: false,
    type: 'system'
  }
];

export const PIPELINE_DATA = [
  { stage: 'Pending', count: 124, revenue: 620000, color: '#f97316' }, // Orange
  { stage: 'Processing', count: 86, revenue: 430000, color: '#fb923c' },
  { stage: 'Shipped', count: 210, revenue: 1050000, color: '#27272a' }, // Dark zinc
  { stage: 'Delivered', count: 1062, revenue: 5310000, color: '#18181b' },
  { stage: 'Canceled', count: 18, revenue: 90000, color: '#ef4444' }
];

export const REVENUE_TIMELINE = [
  { day: 'Mon', revenue: 210000, orders: 42, leads: 12 },
  { day: 'Tue', revenue: 290000, orders: 58, leads: 18 },
  { day: 'Wed', revenue: 340000, orders: 68, leads: 22 },
  { day: 'Thu', revenue: 410000, orders: 82, leads: 29 },
  { day: 'Fri', revenue: 520000, orders: 104, leads: 35 },
  { day: 'Sat', revenue: 680000, orders: 136, leads: 48 },
  { day: 'Sun', revenue: 740000, orders: 148, leads: 52 }
];

export const BEST_SELLING_LOCATIONS = [
  { id: 'loc-1', name: 'Dhaka City (North & South)', ordersCount: 842, revenue: 4210000, percentage: 62, courier: 'Pathao / Steadfast' },
  { id: 'loc-2', name: 'Chittagong Metro', ordersCount: 215, revenue: 1075000, percentage: 16, courier: 'Steadfast Express' },
  { id: 'loc-3', name: 'Sylhet Division', ordersCount: 142, revenue: 710000, percentage: 10, courier: 'Paperfly / Steadfast' },
  { id: 'loc-4', name: 'Gazipur & Savar Suburbs', ordersCount: 98, revenue: 490000, percentage: 7, courier: 'RedX Express' },
  { id: 'loc-5', name: 'Narayanganj & Comilla', ordersCount: 67, revenue: 335000, percentage: 5, courier: 'Sundarban Courier' }
];

export interface InventoryItem {
  id: string;
  sku: string;
  title: string;
  warehouse: string;
  currentStock: number;
  minThreshold: number;
  unitPrice: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export const INITIAL_INVENTORY_STOCK: InventoryItem[] = [
  { id: 'inv-1', sku: 'AUR-ANC-01', title: 'Aura Pro Studio Wireless ANC Headphones', warehouse: 'Central Uttara Hub', currentStock: 84, minThreshold: 25, unitPrice: 4990, status: 'In Stock' },
  { id: 'inv-2', sku: 'SNY-XM6-BLK', title: 'Sony WH-1000XM6 ANC Wireless', warehouse: 'Banani Vault Warehouse', currentStock: 4, minThreshold: 10, unitPrice: 22000, status: 'Low Stock' },
  { id: 'inv-3', sku: 'HVT-H2178D', title: 'HAVIT HIV69 7.1 Gaming Headset', warehouse: 'Mirpur Express Depot', currentStock: 48, minThreshold: 15, unitPrice: 2000, status: 'In Stock' },
  { id: 'inv-4', sku: 'EKS-E900P', title: 'EKSA E900 Pro 7.1 Surround Headset', warehouse: 'Chittagong Regional Hub', currentStock: 2, minThreshold: 8, unitPrice: 2500, status: 'Low Stock' },
  { id: 'inv-5', sku: 'AUR-EAR-LITE', title: 'Aura Studio Earbuds Lite Edition', warehouse: 'Central Uttara Hub', currentStock: 0, minThreshold: 20, unitPrice: 1850, status: 'Out of Stock' }
];
