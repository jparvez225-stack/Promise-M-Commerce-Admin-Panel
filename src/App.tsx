import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardOverview } from './components/views/DashboardOverview';
import { OrderManagement } from './components/views/OrderManagement';
import { ProductManagement } from './components/views/ProductManagement';
import { FinanceManagement } from './components/views/FinanceManagement';
import { PurchaseManagement } from './components/views/PurchaseManagement';
import { DynamicStorefront } from './components/views/DynamicStorefront';
import { CustomersLeads } from './components/views/CustomersLeads';
import { FraudCheck } from './components/views/FraudCheck';
import { SettingsControlCenter } from './components/views/SettingsControlCenter';
import { ReportsAnalytics } from './components/views/ReportsAnalytics';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { OrderInvoiceModal } from './components/OrderInvoiceModal';
import { LeadRecoveryModal } from './components/LeadRecoveryModal';

import { 
  NavigationTab, 
  ProductSubTab,
  FinanceSubTab,
  PurchaseSubTab,
  Order, 
  Lead, 
  OrderStatus, 
  DateFilter, 
  StorefrontConfig, 
  NotificationItem,
  UserProfile
} from './types';
import { 
  INITIAL_ORDERS, 
  INITIAL_LEADS, 
  INITIAL_PRODUCTS, 
  INITIAL_STOREFRONT_CONFIG, 
  INITIAL_NOTIFICATIONS, 
  PIPELINE_DATA, 
  REVENUE_TIMELINE 
} from './data/mockData';

export default function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    name: 'Shop Owner',
    email: 'admin@shopowner.com',
    storeName: 'Aura Premium Store BD',
    role: 'Shop Owner'
  });

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [productSubTab, setProductSubTab] = useState<ProductSubTab>('MY_PRODUCTS');
  const [financeSubTab, setFinanceSubTab] = useState<FinanceSubTab>('BALANCE_TRANSFER');
  const [purchaseSubTab, setPurchaseSubTab] = useState<PurchaseSubTab>('MANAGE_PURCHASE');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');
  const [dateFilter, setDateFilter] = useState<DateFilter>('30D');
  const [orderFilterStatus, setOrderFilterStatus] = useState<OrderStatus | 'All'>('All');

  // Core Data State
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [storefrontConfig, setStorefrontConfig] = useState<StorefrontConfig>(INITIAL_STOREFRONT_CONFIG);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Modals & Drawers
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);
  const [selectedRecoveryLead, setSelectedRecoveryLead] = useState<Lead | null>(null);

  // Unread badge counts
  const unreadOrdersCount = orders.filter((o) => o.status === 'Pending').length;
  const unreadLeadsCount = leads.filter((l) => l.status === 'Abandoned Cart').length;

  // Handler: Update Order Status
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedInvoiceOrder && selectedInvoiceOrder.id === orderId) {
      setSelectedInvoiceOrder((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Handler: Place Test Order from Live Storefront Preview
  const handlePlaceTestOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Push new notification
    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: `New Storefront Order ${newOrder.id}`,
      description: `${newOrder.customerName} ordered ${newOrder.items[0]?.name} (৳${newOrder.totalAmount.toLocaleString()})`,
      timestamp: 'Just now',
      unread: true,
      type: 'order'
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Handler: Send Lead Recovery
  const handleSendRecovery = (leadId: string, offerCode: string, customMsg: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: 'Contacted', notes: `Offer sent: ${offerCode}` } : l))
    );
  };

  // Handler: Quick Create Order
  const handleQuickCreateOrder = () => {
    const freshOrder: Order = {
      id: `#ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: 'Kazi Farhan',
      customerPhone: '01711223344',
      customerAddress: 'House 12, Road 5, Sector 4, Uttara, Dhaka',
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
      createdAt: 'Just now',
      expectedDelivery: 'Tuesday, Jul 28, 2026',
      notes: 'Manual order created by Admin'
    };
    setOrders((prev) => [freshOrder, ...prev]);
    setSelectedInvoiceOrder(freshOrder);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans flex antialiased selection:bg-orange-500 selection:text-white">
      {/* Fixed Left Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'orders') setOrderFilterStatus('All');
        }}
        productSubTab={productSubTab}
        onProductSubTabChange={(sub) => {
          setProductSubTab(sub);
          setActiveTab('products');
        }}
        financeSubTab={financeSubTab}
        onFinanceSubTabChange={(sub) => {
          setFinanceSubTab(sub);
          setActiveTab('finance');
        }}
        purchaseSubTab={purchaseSubTab}
        onPurchaseSubTabChange={(sub) => {
          setPurchaseSubTab(sub);
          setActiveTab('purchases');
        }}
        unreadOrderCount={unreadOrdersCount}
        unreadLeadCount={unreadLeadsCount}
        themeMode={themeMode}
        onToggleTheme={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
        onOpenStorefrontPreview={() => setActiveTab('storefront')}
      />

      {/* Main Content Area Container */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Header */}
        <TopHeader
          activeTab={activeTab}
          dateFilter={dateFilter}
          onDateFilterChange={setDateFilter}
          themeMode={themeMode}
          onToggleTheme={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          onOpenGlobalSearch={() => setIsSearchOpen(true)}
          notifications={notifications}
          onMarkNotificationRead={handleMarkNotificationRead}
          onOpenStorefrontPreview={() => setActiveTab('storefront')}
          onQuickCreateOrder={handleQuickCreateOrder}
          currentUser={currentUser}
          onLogout={() => {
            setActiveTab('dashboard');
          }}
        />

        {/* Scrollable View Content */}
        <main className="flex-1 p-2 sm:p-3 md:p-4 w-full max-w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardOverview
              orders={orders}
              leads={leads}
              products={products}
              revenueTimeline={REVENUE_TIMELINE}
              pipelineData={PIPELINE_DATA}
              onSelectOrder={(order) => setSelectedInvoiceOrder(order)}
              onSelectStage={(stage) => {
                setOrderFilterStatus(stage);
                setActiveTab('orders');
              }}
              onNavigateToTab={(tab) => setActiveTab(tab)}
              onQuickRecoverLead={(lead) => setSelectedRecoveryLead(lead)}
            />
          )}

          {activeTab === 'orders' && (
            <OrderManagement
              orders={orders}
              onSelectOrder={(order) => setSelectedInvoiceOrder(order)}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onQuickCreateOrder={handleQuickCreateOrder}
              filterStatus={orderFilterStatus}
            />
          )}

          {activeTab === 'products' && (
            <ProductManagement
              products={products}
              activeSubTab={productSubTab}
              onSubTabChange={setProductSubTab}
            />
          )}

          {activeTab === 'finance' && (
            <FinanceManagement
              activeSubTab={financeSubTab}
              onSubTabChange={setFinanceSubTab}
            />
          )}

          {activeTab === 'purchases' && (
            <PurchaseManagement
              activeSubTab={purchaseSubTab}
              onSubTabChange={setPurchaseSubTab}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsAnalytics
              orders={orders}
              leads={leads}
              products={products}
            />
          )}

          {activeTab === 'storefront' && (
            <DynamicStorefront
              config={storefrontConfig}
              onUpdateConfig={setStorefrontConfig}
              onPlaceTestOrder={handlePlaceTestOrder}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersLeads
              leads={leads}
              onOpenRecoveryModal={(lead) => setSelectedRecoveryLead(lead)}
            />
          )}

          {activeTab === 'fraudCheck' && (
            <FraudCheck
              dateFilter={dateFilter}
              onDateFilterChange={setDateFilter}
            />
          )}

          {activeTab === 'settings' && <SettingsControlCenter />}
        </main>
      </div>

      {/* Global Search Modal (⌘K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        orders={orders}
        leads={leads}
        products={products}
        onSelectOrder={(order) => setSelectedInvoiceOrder(order)}
        onSelectLead={(lead) => setSelectedRecoveryLead(lead)}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Order Confirmation & Printable Invoice Modal */}
      <OrderInvoiceModal
        order={selectedInvoiceOrder}
        onClose={() => setSelectedInvoiceOrder(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      {/* Lead Recovery Action Drawer/Modal */}
      <LeadRecoveryModal
        lead={selectedRecoveryLead}
        onClose={() => setSelectedRecoveryLead(null)}
        onSendRecovery={handleSendRecovery}
      />
    </div>
  );
}
