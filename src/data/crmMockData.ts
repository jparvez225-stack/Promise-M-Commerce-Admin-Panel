export interface CRMActivity {
  id: string;
  title: string;
  desc: string;
  timestamp: string;
  type: 'call' | 'whatsapp' | 'email' | 'note' | 'status' | 'order' | 'payment';
}

export interface CRMNote {
  id: string;
  text: string;
  author: string;
  timestamp: string;
}

export interface CRMOrderHistory {
  id: string;
  date: string;
  amount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: string;
}

export interface CRMPaymentHistory {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: 'Paid' | 'Partial' | 'Due';
}

export interface CRMCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  avatar?: string;
  leadSource: 'Facebook Ad' | 'Google Search' | 'Website Checkout' | 'Direct Call' | 'Instagram DM' | 'WhatsApp Inquiry';
  leadScore: number; // 1-100
  priority: 'High' | 'Medium' | 'Low';
  assignedSales: 'Rahat Chowdhury' | 'Tanvir Ahmed' | 'Nusrat Jahan' | 'Sabrina Khan' | 'Unassigned';
  status: 'New' | 'Contacted' | 'Follow-up' | 'Negotiation' | 'Pending' | 'Ordered' | 'Delivered' | 'Cancelled' | 'Lost' | 'Discount' | 'Repeat Customer';
  product: string;
  orderValue: number;
  lastContact: string;
  nextFollowUp: string; // YYYY-MM-DD or readable
  nextFollowUpStatus: 'Today' | 'Overdue' | 'Upcoming' | 'None';
  lastPurchase: string;
  daysSinceLastPurchase: number; // e.g. 12, 35, 65, 92
  purchaseFrequency: string;
  repeatProbability: number; // %
  tags: string[];
  orderInfo: {
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalPurchase: number;
  };
  paymentInfo: {
    paidAmount: number;
    dueAmount: number;
    paymentStatus: 'Paid' | 'Partial Due' | 'Pending Payment' | 'Overdue Payment';
  };
  repeatSales: {
    crossSellProduct: string;
    upsellProduct: string;
  };
  aiSuggestions: {
    bestTimeToContact: string;
    chanceToPurchase: number;
    recommendedDiscount: number;
    recommendedProduct: string;
    crossSellSuggestion: string;
    upsellSuggestion: string;
  };
  orderHistory: CRMOrderHistory[];
  paymentHistory: CRMPaymentHistory[];
  notes: CRMNote[];
  activityTimeline: CRMActivity[];
}

export const INITIAL_CRM_CUSTOMERS: CRMCustomer[] = [
  {
    id: 'CRM-101',
    name: 'Sajid Hossain',
    phone: '01819202122',
    email: 'sajid.hossain@gmail.com',
    address: 'House 42, Road 11, Banani, Dhaka',
    leadSource: 'Website Checkout',
    leadScore: 92,
    priority: 'High',
    assignedSales: 'Rahat Chowdhury',
    status: 'Follow-up',
    product: 'Aura Pro Studio Wireless ANC Headphones',
    orderValue: 5050,
    lastContact: '10 mins ago',
    nextFollowUp: 'Today (03:30 PM)',
    nextFollowUpStatus: 'Today',
    lastPurchase: '2026-06-15',
    daysSinceLastPurchase: 41,
    purchaseFrequency: '1.8 orders/mo',
    repeatProbability: 88,
    tags: ['High Value', 'Follow-up Today', 'Overdue Follow-up', 'Need Discount'],
    orderInfo: {
      totalOrders: 3,
      pendingOrders: 1,
      completedOrders: 2,
      cancelledOrders: 0,
      totalPurchase: 15150
    },
    paymentInfo: {
      paidAmount: 10100,
      dueAmount: 5050,
      paymentStatus: 'Partial Due'
    },
    repeatSales: {
      crossSellProduct: 'Headphone Carrying Leather Case',
      upsellProduct: 'Sony WH-1000XM6 Flagship ANC'
    },
    aiSuggestions: {
      bestTimeToContact: '03:30 PM - 05:00 PM',
      chanceToPurchase: 88,
      recommendedDiscount: 10,
      recommendedProduct: 'Aura Pro Studio Wireless ANC',
      crossSellSuggestion: 'Offer 15% OFF Carrying Case bundle',
      upsellSuggestion: 'Upgrade to XM6 with ৳1000 cashback'
    },
    orderHistory: [
      { id: '#ORD-479697', date: '2026-07-26', amount: 5050, status: 'Pending', items: 'Aura Pro Studio ANC' },
      { id: '#ORD-420112', date: '2026-06-15', amount: 5050, status: 'Delivered', items: 'Aura Pro Studio ANC' },
      { id: '#ORD-388210', date: '2026-05-02', amount: 5050, status: 'Delivered', items: 'HAVIT HIV69 Gaming Headset' }
    ],
    paymentHistory: [
      { id: 'PAY-901', date: '2026-06-15', amount: 5050, method: 'bKash Merchant', status: 'Paid' },
      { id: 'PAY-812', date: '2026-05-02', amount: 5050, method: 'Cash On Delivery', status: 'Paid' }
    ],
    notes: [
      { id: 'N-1', text: 'Customer requested delivery after 3 PM due to office hours.', author: 'Rahat Chowdhury', timestamp: 'Today 10:30 AM' },
      { id: 'N-2', text: 'Offered 10% special retention discount on next purchase.', author: 'Rahat Chowdhury', timestamp: 'Yesterday' }
    ],
    activityTimeline: [
      { id: 'A-1', title: 'Follow-up Reminder Set', desc: 'Call scheduled for Today 03:30 PM', timestamp: 'Today 10:30 AM', type: 'call' },
      { id: 'A-2', title: 'WhatsApp Template Sent', desc: 'Sent discount voucher link via WhatsApp', timestamp: 'Yesterday 04:12 PM', type: 'whatsapp' },
      { id: 'A-3', title: 'Checkout Drop-off Logged', desc: 'Left cart at payment gateway step', timestamp: '2 days ago', type: 'order' }
    ]
  },
  {
    id: 'CRM-102',
    name: 'Farzana Akhtar',
    phone: '01733445522',
    email: 'farzana.akhtar@yahoo.com',
    address: 'Flat 6B, Concord Tower, Gulshan-2, Dhaka',
    leadSource: 'Facebook Ad',
    leadScore: 95,
    priority: 'High',
    assignedSales: 'Tanvir Ahmed',
    status: 'Negotiation',
    product: 'Aura Pro Studio Wireless ANC Headphones',
    orderValue: 5050,
    lastContact: '35 mins ago',
    nextFollowUp: 'Overdue (Yesterday)',
    nextFollowUpStatus: 'Overdue',
    lastPurchase: '2026-04-10',
    daysSinceLastPurchase: 107,
    purchaseFrequency: '0.8 orders/mo',
    repeatProbability: 75,
    tags: ['High Value', 'Overdue Follow-up', 'Need Discount', 'No Purchase >90d'],
    orderInfo: {
      totalOrders: 2,
      pendingOrders: 1,
      completedOrders: 1,
      cancelledOrders: 0,
      totalPurchase: 10100
    },
    paymentInfo: {
      paidAmount: 5050,
      dueAmount: 5050,
      paymentStatus: 'Pending Payment'
    },
    repeatSales: {
      crossSellProduct: 'Custom Memory Foam Ear Cushions',
      upsellProduct: 'Sony WH-1000XM6'
    },
    aiSuggestions: {
      bestTimeToContact: '11:00 AM - 01:00 PM',
      chanceToPurchase: 82,
      recommendedDiscount: 12,
      recommendedProduct: 'Aura Pro Studio ANC',
      crossSellSuggestion: 'Offer free delivery + free velvet pouch',
      upsellSuggestion: 'Pro Bluetooth Adapter Bundle'
    },
    orderHistory: [
      { id: '#ORD-479696', date: '2026-07-26', amount: 5050, status: 'Processing', items: 'Aura Pro Studio ANC' },
      { id: '#ORD-310029', date: '2026-04-10', amount: 5050, status: 'Delivered', items: 'Aura Pro Studio ANC' }
    ],
    paymentHistory: [
      { id: 'PAY-771', date: '2026-04-10', amount: 5050, method: 'bKash Merchant', status: 'Paid' }
    ],
    notes: [
      { id: 'N-101', text: 'Asked for ৳300 price discount for bKash payment.', author: 'Tanvir Ahmed', timestamp: '35 mins ago' }
    ],
    activityTimeline: [
      { id: 'A-101', title: 'Inbound Call Received', desc: 'Discussed bKash instant cash-back coupon', timestamp: '35 mins ago', type: 'call' },
      { id: 'A-102', title: 'Overdue Alert', desc: 'Follow-up missed yesterday afternoon', timestamp: 'Yesterday', type: 'status' }
    ]
  },
  {
    id: 'CRM-103',
    name: 'Rafiqul Islam',
    phone: '01655443322',
    email: 'rafiq.islam@agrabads.com',
    address: 'Station Road, Agrabad, Chittagong',
    leadSource: 'Google Search',
    leadScore: 98,
    priority: 'High',
    assignedSales: 'Nusrat Jahan',
    status: 'Repeat Customer',
    product: 'Sony WH-1000XM6',
    orderValue: 22080,
    lastContact: '1 hour ago',
    nextFollowUp: '2026-07-29',
    nextFollowUpStatus: 'Upcoming',
    lastPurchase: '2026-07-26',
    daysSinceLastPurchase: 0,
    purchaseFrequency: '3.2 orders/mo',
    repeatProbability: 96,
    tags: ['VIP', 'Repeat Buyer', 'High Value'],
    orderInfo: {
      totalOrders: 6,
      pendingOrders: 0,
      completedOrders: 5,
      cancelledOrders: 1,
      totalPurchase: 89000
    },
    paymentInfo: {
      paidAmount: 89000,
      dueAmount: 0,
      paymentStatus: 'Paid'
    },
    repeatSales: {
      crossSellProduct: 'Headphone Amplifier DAC',
      upsellProduct: 'Studio Monitor Speakers'
    },
    aiSuggestions: {
      bestTimeToContact: '02:00 PM - 04:00 PM',
      chanceToPurchase: 95,
      recommendedDiscount: 5,
      recommendedProduct: 'Sony WH-1000XM6',
      crossSellSuggestion: 'Recommend DAC amplifier bundle',
      upsellSuggestion: 'Extend 2-Year Warranty plan'
    },
    orderHistory: [
      { id: '#ORD-479695', date: '2026-07-26', amount: 22080, status: 'Shipped', items: 'Sony WH-1000XM6' },
      { id: '#ORD-410091', date: '2026-06-01', amount: 22000, status: 'Delivered', items: 'Sony WH-1000XM6' },
      { id: '#ORD-350122', date: '2026-04-18', amount: 4990, status: 'Delivered', items: 'Aura Pro Studio ANC' }
    ],
    paymentHistory: [
      { id: 'PAY-992', date: '2026-07-26', amount: 22080, method: 'Card/Bank', status: 'Paid' },
      { id: 'PAY-801', date: '2026-06-01', amount: 22000, method: 'Card/Bank', status: 'Paid' }
    ],
    notes: [
      { id: 'N-201', text: 'VIP Client. Always pays via credit card instantly.', author: 'Nusrat Jahan', timestamp: '1 hour ago' }
    ],
    activityTimeline: [
      { id: 'A-201', title: 'Order Shipped via Courier', desc: 'Tracking REDX-99812 assigned', timestamp: '1 hour ago', type: 'order' },
      { id: 'A-202', title: 'Payment Confirmed', desc: 'Card payment of ৳22,080 received', timestamp: '3 hours ago', type: 'payment' }
    ]
  },
  {
    id: 'CRM-104',
    name: 'Ayesha Siddiqua',
    phone: '01911223344',
    email: 'ayesha.siddiqua@gmail.com',
    address: 'House 5, Road 3, Sector 7, Uttara, Dhaka',
    leadSource: 'Instagram DM',
    leadScore: 88,
    priority: 'Medium',
    assignedSales: 'Sabrina Khan',
    status: 'Delivered',
    product: 'Aura Pro Studio Wireless ANC Headphones (x2)',
    orderValue: 10040,
    lastContact: 'Yesterday',
    nextFollowUp: '2026-08-05',
    nextFollowUpStatus: 'Upcoming',
    lastPurchase: '2026-07-25',
    daysSinceLastPurchase: 1,
    purchaseFrequency: '2.0 orders/mo',
    repeatProbability: 84,
    tags: ['Repeat Buyer', 'High Value'],
    orderInfo: {
      totalOrders: 4,
      pendingOrders: 0,
      completedOrders: 4,
      cancelledOrders: 0,
      totalPurchase: 28500
    },
    paymentInfo: {
      paidAmount: 28500,
      dueAmount: 0,
      paymentStatus: 'Paid'
    },
    repeatSales: {
      crossSellProduct: 'Aura Earbuds Lite',
      upsellProduct: 'Sony WH-1000XM6'
    },
    aiSuggestions: {
      bestTimeToContact: '06:00 PM - 08:00 PM',
      chanceToPurchase: 80,
      recommendedDiscount: 15,
      recommendedProduct: 'Aura Earbuds Lite',
      crossSellSuggestion: 'Offer 15% discount on Earbuds Lite for family',
      upsellSuggestion: 'Recommend XM6 upgrade'
    },
    orderHistory: [
      { id: '#ORD-479694', date: '2026-07-25', amount: 10040, status: 'Delivered', items: 'Aura Pro Studio ANC (x2)' },
      { id: '#ORD-399001', date: '2026-05-10', amount: 4990, status: 'Delivered', items: 'Aura Pro Studio ANC' }
    ],
    paymentHistory: [
      { id: 'PAY-881', date: '2026-07-25', amount: 10040, method: 'Cash On Delivery', status: 'Paid' }
    ],
    notes: [
      { id: 'N-301', text: 'Delivered via Steadfast. Very pleased with build quality.', author: 'Sabrina Khan', timestamp: 'Yesterday' }
    ],
    activityTimeline: [
      { id: 'A-301', title: 'Order Delivered', desc: 'Steadfast confirmed delivery receipt', timestamp: 'Yesterday', type: 'order' }
    ]
  },
  {
    id: 'CRM-105',
    name: 'Mahmud Hasan',
    phone: '01700112233',
    email: 'mahmud.h@sylhetcorp.bd',
    address: 'College Road, Sylhet Sadar, Sylhet',
    leadSource: 'Direct Call',
    leadScore: 40,
    priority: 'Low',
    assignedSales: 'Rahat Chowdhury',
    status: 'Cancelled',
    product: 'HAVIT HIV69 Gaming Headset',
    orderValue: 2080,
    lastContact: '2 days ago',
    nextFollowUp: 'None',
    nextFollowUpStatus: 'None',
    lastPurchase: 'No purchase',
    daysSinceLastPurchase: 999,
    purchaseFrequency: '0 orders',
    repeatProbability: 15,
    tags: ['At Risk', 'Cancelled Order'],
    orderInfo: {
      totalOrders: 1,
      pendingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 1,
      totalPurchase: 0
    },
    paymentInfo: {
      paidAmount: 0,
      dueAmount: 0,
      paymentStatus: 'Paid'
    },
    repeatSales: {
      crossSellProduct: 'EKSA E900 Pro 7.1',
      upsellProduct: 'Aura Pro Studio ANC'
    },
    aiSuggestions: {
      bestTimeToContact: '10:00 AM - 12:00 PM',
      chanceToPurchase: 25,
      recommendedDiscount: 20,
      recommendedProduct: 'EKSA E900 Pro 7.1',
      crossSellSuggestion: 'Offer 20% discount coupon to win back customer',
      upsellSuggestion: 'Recommend ANC wireless alternative'
    },
    orderHistory: [
      { id: '#ORD-479693', date: '2026-07-25', amount: 2080, status: 'Cancelled', items: 'HAVIT HIV69 Gaming Headset' }
    ],
    paymentHistory: [],
    notes: [
      { id: 'N-401', text: 'Cancelled order during call verification - changed mind.', author: 'Rahat Chowdhury', timestamp: '2 days ago' }
    ],
    activityTimeline: [
      { id: 'A-401', title: 'Order Cancelled', desc: 'Status changed to Cancelled', timestamp: '2 days ago', type: 'status' }
    ]
  },
  {
    id: 'CRM-106',
    name: 'Kamrul Zaman',
    phone: '01677889900',
    email: 'kamrul.zaman@outlook.com',
    address: 'Road 4, Sector 1, Uttara, Dhaka',
    leadSource: 'WhatsApp Inquiry',
    leadScore: 78,
    priority: 'Medium',
    assignedSales: 'Tanvir Ahmed',
    status: 'Contacted',
    product: 'Sony WH-1000XM6',
    orderValue: 22000,
    lastContact: '2 hours ago',
    nextFollowUp: 'Today (05:00 PM)',
    nextFollowUpStatus: 'Today',
    lastPurchase: '2026-05-20',
    daysSinceLastPurchase: 67,
    purchaseFrequency: '1.2 orders/mo',
    repeatProbability: 70,
    tags: ['Follow-up Today', 'Need Discount', 'No Purchase >60d'],
    orderInfo: {
      totalOrders: 2,
      pendingOrders: 0,
      completedOrders: 1,
      cancelledOrders: 1,
      totalPurchase: 4990
    },
    paymentInfo: {
      paidAmount: 4990,
      dueAmount: 0,
      paymentStatus: 'Paid'
    },
    repeatSales: {
      crossSellProduct: 'Headphone Stand',
      upsellProduct: 'Sony XM6'
    },
    aiSuggestions: {
      bestTimeToContact: '05:00 PM - 07:00 PM',
      chanceToPurchase: 68,
      recommendedDiscount: 8,
      recommendedProduct: 'Sony WH-1000XM6',
      crossSellSuggestion: 'Offer 8% special WhatsApp discount coupon',
      upsellSuggestion: 'Pro Warranty bundle'
    },
    orderHistory: [
      { id: '#ORD-360121', date: '2026-05-20', amount: 4990, status: 'Delivered', items: 'Aura Pro Studio ANC' }
    ],
    paymentHistory: [
      { id: 'PAY-622', date: '2026-05-20', amount: 4990, method: 'bKash Merchant', status: 'Paid' }
    ],
    notes: [
      { id: 'N-501', text: 'Inquired about Sony XM6 warranty duration.', author: 'Tanvir Ahmed', timestamp: '2 hours ago' }
    ],
    activityTimeline: [
      { id: 'A-501', title: 'WhatsApp Chat', desc: 'Sent product specs sheet and pricing', timestamp: '2 hours ago', type: 'whatsapp' }
    ]
  },
  {
    id: 'CRM-107',
    name: 'Tamim Iqbal',
    phone: '01988776655',
    email: 'tamim.sports@gmail.com',
    address: 'Halishahar, Chittagong',
    leadSource: 'Facebook Ad',
    leadScore: 100,
    priority: 'High',
    assignedSales: 'Nusrat Jahan',
    status: 'Ordered',
    product: 'HAVIT HIV69 Gaming Headset',
    orderValue: 2080,
    lastContact: 'Yesterday',
    nextFollowUp: '2026-07-28',
    nextFollowUpStatus: 'Upcoming',
    lastPurchase: '2026-07-26',
    daysSinceLastPurchase: 0,
    purchaseFrequency: '2.5 orders/mo',
    repeatProbability: 92,
    tags: ['New', 'Ordered'],
    orderInfo: {
      totalOrders: 3,
      pendingOrders: 1,
      completedOrders: 2,
      cancelledOrders: 0,
      totalPurchase: 8150
    },
    paymentInfo: {
      paidAmount: 6070,
      dueAmount: 2080,
      paymentStatus: 'Pending Payment'
    },
    repeatSales: {
      crossSellProduct: 'Gaming Mouse Pad',
      upsellProduct: 'EKSA E900 Pro'
    },
    aiSuggestions: {
      bestTimeToContact: '01:00 PM - 03:00 PM',
      chanceToPurchase: 90,
      recommendedDiscount: 5,
      recommendedProduct: 'HAVIT HIV69 Gaming Headset',
      crossSellSuggestion: 'Cross-sell RGB Mousepad',
      upsellSuggestion: 'EKSA 7.1 Surround Upgrade'
    },
    orderHistory: [
      { id: '#ORD-479690', date: '2026-07-26', amount: 2080, status: 'Processing', items: 'HAVIT HIV69 Gaming Headset' }
    ],
    paymentHistory: [],
    notes: [
      { id: 'N-601', text: 'Converted from lead via phone call.', author: 'Nusrat Jahan', timestamp: 'Yesterday' }
    ],
    activityTimeline: [
      { id: 'A-601', title: 'Lead Converted to Order', desc: 'Created Order #ORD-479690', timestamp: 'Yesterday', type: 'order' }
    ]
  },
  {
    id: 'CRM-108',
    name: 'Mehedi Hasan',
    phone: '01511223344',
    email: 'mehedi.dev@gmail.com',
    address: 'Mirpur 10, Dhaka',
    leadSource: 'Website Checkout',
    leadScore: 80,
    priority: 'Medium',
    assignedSales: 'Sabrina Khan',
    status: 'New',
    product: 'EKSA E900 Pro 7.1',
    orderValue: 2580,
    lastContact: '4 hours ago',
    nextFollowUp: 'Today (06:00 PM)',
    nextFollowUpStatus: 'Today',
    lastPurchase: '2026-06-01',
    daysSinceLastPurchase: 55,
    purchaseFrequency: '1.0 orders/mo',
    repeatProbability: 65,
    tags: ['New', 'Follow-up Today', 'Need Discount'],
    orderInfo: {
      totalOrders: 1,
      pendingOrders: 0,
      completedOrders: 1,
      cancelledOrders: 0,
      totalPurchase: 2500
    },
    paymentInfo: {
      paidAmount: 2500,
      dueAmount: 0,
      paymentStatus: 'Paid'
    },
    repeatSales: {
      crossSellProduct: 'Headphone Stand Holder',
      upsellProduct: 'Aura Pro Studio ANC'
    },
    aiSuggestions: {
      bestTimeToContact: '06:00 PM - 08:00 PM',
      chanceToPurchase: 75,
      recommendedDiscount: 10,
      recommendedProduct: 'EKSA E900 Pro 7.1',
      crossSellSuggestion: 'Offer 10% discount to convert cart',
      upsellSuggestion: 'Pro Studio ANC Wireless upgrade'
    },
    orderHistory: [
      { id: '#ORD-381012', date: '2026-06-01', amount: 2500, status: 'Delivered', items: 'EKSA E900 Pro 7.1' }
    ],
    paymentHistory: [
      { id: 'PAY-501', date: '2026-06-01', amount: 2500, method: 'Cash On Delivery', status: 'Paid' }
    ],
    notes: [
      { id: 'N-701', text: 'Cart drop-off at shipping step.', author: 'Sabrina Khan', timestamp: '4 hours ago' }
    ],
    activityTimeline: [
      { id: 'A-701', title: 'New Lead Generated', desc: 'Cart abandoned on mobile web', timestamp: '4 hours ago', type: 'status' }
    ]
  },
  {
    id: 'CRM-109',
    name: 'Kazi Farhan',
    phone: '01533445566',
    email: 'kazi.farhan@mymensingh.bd',
    address: 'Zilla School Road, Mymensingh',
    leadSource: 'Facebook Ad',
    leadScore: 82,
    priority: 'Medium',
    assignedSales: 'Rahat Chowdhury',
    status: 'Pending',
    product: 'EKSA E900 Pro 7.1',
    orderValue: 2630,
    lastContact: '2 days ago',
    nextFollowUp: 'Overdue (3 days ago)',
    nextFollowUpStatus: 'Overdue',
    lastPurchase: '2026-07-24',
    daysSinceLastPurchase: 2,
    purchaseFrequency: '1.5 orders/mo',
    repeatProbability: 72,
    tags: ['Pending', 'Overdue Follow-up'],
    orderInfo: {
      totalOrders: 2,
      pendingOrders: 1,
      completedOrders: 1,
      cancelledOrders: 0,
      totalPurchase: 5260
    },
    paymentInfo: {
      paidAmount: 2630,
      dueAmount: 2630,
      paymentStatus: 'Pending Payment'
    },
    repeatSales: {
      crossSellProduct: 'Headphone Cable Replacement',
      upsellProduct: 'HAVIT HIV69'
    },
    aiSuggestions: {
      bestTimeToContact: '02:00 PM - 04:00 PM',
      chanceToPurchase: 80,
      recommendedDiscount: 5,
      recommendedProduct: 'EKSA E900 Pro 7.1',
      crossSellSuggestion: 'Offer free delivery voucher',
      upsellSuggestion: 'Gaming Headset Bundle'
    },
    orderHistory: [
      { id: '#ORD-479692', date: '2026-07-24', amount: 2630, status: 'Delivered', items: 'EKSA E900 Pro 7.1' }
    ],
    paymentHistory: [
      { id: 'PAY-412', date: '2026-07-24', amount: 2630, method: 'bKash Merchant', status: 'Paid' }
    ],
    notes: [],
    activityTimeline: []
  },
  {
    id: 'CRM-110',
    name: 'Nusrat Jahan Riya',
    phone: '01898765432',
    email: 'riya.nusrat@gmail.com',
    address: 'Banani C/A, Dhaka',
    leadSource: 'Website Checkout',
    leadScore: 91,
    priority: 'High',
    assignedSales: 'Nusrat Jahan',
    status: 'Discount',
    product: 'Aura Pro Studio Wireless ANC Headphones',
    orderValue: 4490,
    lastContact: '5 hours ago',
    nextFollowUp: 'Today (07:00 PM)',
    nextFollowUpStatus: 'Today',
    lastPurchase: '2026-06-20',
    daysSinceLastPurchase: 36,
    purchaseFrequency: '2.1 orders/mo',
    repeatProbability: 89,
    tags: ['Discount', 'Follow-up Today', 'No Purchase >30d'],
    orderInfo: {
      totalOrders: 3,
      pendingOrders: 1,
      completedOrders: 2,
      cancelledOrders: 0,
      totalPurchase: 14470
    },
    paymentInfo: {
      paidAmount: 9980,
      dueAmount: 4490,
      paymentStatus: 'Pending Payment'
    },
    repeatSales: {
      crossSellProduct: 'Carrying Leather Case',
      upsellProduct: 'Sony XM6'
    },
    aiSuggestions: {
      bestTimeToContact: '07:00 PM - 09:00 PM',
      chanceToPurchase: 89,
      recommendedDiscount: 10,
      recommendedProduct: 'Aura Pro Studio ANC',
      crossSellSuggestion: 'Apply ৳500 OFF special code',
      upsellSuggestion: 'Flagship XM6 Upgrade'
    },
    orderHistory: [
      { id: '#ORD-410099', date: '2026-06-20', amount: 4990, status: 'Delivered', items: 'Aura Pro Studio ANC' }
    ],
    paymentHistory: [
      { id: 'PAY-301', date: '2026-06-20', amount: 4990, method: 'bKash Merchant', status: 'Paid' }
    ],
    notes: [
      { id: 'N-801', text: 'Sent 10% coupon code via SMS.', author: 'Nusrat Jahan', timestamp: '5 hours ago' }
    ],
    activityTimeline: [
      { id: 'A-801', title: 'Coupon Code Applied', desc: 'Special discount ৳500 code sent', timestamp: '5 hours ago', type: 'email' }
    ]
  },
  {
    id: 'CRM-111',
    name: 'Shahriar Kabir',
    phone: '01711002288',
    email: 'shahriar.kabir@dhanmondi.net',
    address: 'Road 27, Dhanmondi, Dhaka',
    leadSource: 'Google Search',
    leadScore: 30,
    priority: 'Low',
    assignedSales: 'Tanvir Ahmed',
    status: 'Lost',
    product: 'Sony WH-1000XM6',
    orderValue: 22000,
    lastContact: '5 days ago',
    nextFollowUp: 'None',
    nextFollowUpStatus: 'None',
    lastPurchase: 'No purchase',
    daysSinceLastPurchase: 999,
    purchaseFrequency: '0 orders',
    repeatProbability: 10,
    tags: ['Lost', 'At Risk'],
    orderInfo: {
      totalOrders: 1,
      pendingOrders: 0,
      completedOrders: 0,
      cancelledOrders: 1,
      totalPurchase: 0
    },
    paymentInfo: {
      paidAmount: 0,
      dueAmount: 0,
      paymentStatus: 'Paid'
    },
    repeatSales: {
      crossSellProduct: 'Aura Pro Studio ANC',
      upsellProduct: 'None'
    },
    aiSuggestions: {
      bestTimeToContact: '11:00 AM - 01:00 PM',
      chanceToPurchase: 15,
      recommendedDiscount: 15,
      recommendedProduct: 'Aura Pro Studio ANC',
      crossSellSuggestion: 'Offer lower budget alternative',
      upsellSuggestion: 'N/A'
    },
    orderHistory: [],
    paymentHistory: [],
    notes: [
      { id: 'N-901', text: 'Bought competitor product from physical market.', author: 'Tanvir Ahmed', timestamp: '5 days ago' }
    ],
    activityTimeline: [
      { id: 'A-901', title: 'Marked as Lost', desc: 'Customer purchased elsewhere', timestamp: '5 days ago', type: 'status' }
    ]
  }
];
