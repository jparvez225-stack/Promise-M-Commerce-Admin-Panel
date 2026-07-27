import React, { useState, useEffect } from 'react';
import { Search, X, ShoppingBag, Users, Store, ArrowRight, Package } from 'lucide-react';
import { Order, Lead, Product, NavigationTab } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  leads: Lead[];
  products: Product[];
  onSelectOrder: (order: Order) => void;
  onSelectLead: (lead: Lead) => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  orders,
  leads,
  products,
  onSelectOrder,
  onSelectLead,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredOrders = trimmed
    ? orders.filter(
        (o) =>
          o.id.toLowerCase().includes(trimmed) ||
          o.customerName.toLowerCase().includes(trimmed) ||
          o.customerPhone.includes(trimmed) ||
          o.items.some((i) => i.name.toLowerCase().includes(trimmed))
      )
    : orders.slice(0, 3);

  const filteredLeads = trimmed
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(trimmed) ||
          l.phone.includes(trimmed) ||
          l.email.toLowerCase().includes(trimmed)
      )
    : leads.slice(0, 3);

  const filteredProducts = trimmed
    ? products.filter((p) => p.title.toLowerCase().includes(trimmed))
    : products.slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4 animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3 bg-neutral-50/50">
          <Search className="w-5 h-5 text-orange-500 shrink-0" />
          <input
            id="global-search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by order ID (#ORD-479697), phone (0171...), customer name, or product..."
            className="w-full bg-transparent text-neutral-900 text-sm font-semibold placeholder-neutral-400 focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-bold text-neutral-400 hover:text-neutral-700 px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 overflow-y-auto space-y-6">
          {/* Orders Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 text-orange-600">
                <ShoppingBag className="w-3.5 h-3.5" />
                Orders ({filteredOrders.length})
              </span>
              <button
                onClick={() => {
                  onNavigateTab('orders');
                  onClose();
                }}
                className="text-[11px] text-neutral-500 hover:text-orange-600 flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {filteredOrders.length === 0 ? (
              <p className="text-xs text-neutral-400 italic py-2">No matching orders found</p>
            ) : (
              <div className="space-y-1.5">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => {
                      onSelectOrder(order);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 bg-white hover:bg-orange-50/60 border border-neutral-200 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-neutral-900 group-hover:text-orange-600">
                          {order.id}
                        </span>
                        <span className="text-xs text-neutral-600 font-medium">
                          {order.customerName}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
                          {order.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        {order.items[0]?.name} • {order.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-extrabold text-xs text-neutral-900">
                        ৳{order.totalAmount.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {order.createdAt}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Customers & Leads Section */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">
              <span className="flex items-center gap-1.5 text-amber-600">
                <Users className="w-3.5 h-3.5" />
                Leads & Contacts ({filteredLeads.length})
              </span>
              <button
                onClick={() => {
                  onNavigateTab('customers');
                  onClose();
                }}
                className="text-[11px] text-neutral-500 hover:text-orange-600 flex items-center gap-1"
              >
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {filteredLeads.length === 0 ? (
              <p className="text-xs text-neutral-400 italic py-2">No matching leads found</p>
            ) : (
              <div className="space-y-1.5">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => {
                      onSelectLead(lead);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 bg-white hover:bg-amber-50/60 border border-neutral-200 rounded-xl cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-neutral-900 group-hover:text-amber-700">
                          {lead.name}
                        </span>
                        <span className="text-xs text-neutral-500">
                          ({lead.phone})
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                          Score: {lead.score}
                        </span>
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">
                        Cart Value: ৳{lead.cartValue} • Step: {lead.abandonedStep}
                      </div>
                    </div>
                    <span className="text-xs font-bold text-orange-600">
                      Recover
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Storefront Products Quick Shortcut */}
          <div>
            <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5 text-neutral-700">
              <Package className="w-3.5 h-3.5 text-neutral-600" />
              Storefront Products
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    onNavigateTab('storefront');
                    onClose();
                  }}
                  className="flex items-center gap-3 p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 rounded-xl cursor-pointer"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-10 h-10 rounded-lg object-cover bg-white"
                  />
                  <div className="truncate">
                    <div className="font-bold text-xs text-neutral-900 truncate">
                      {p.title}
                    </div>
                    <div className="text-[11px] font-extrabold text-orange-600">
                      ৳{p.price.toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Shortcut Bar */}
        <div className="p-3 bg-neutral-100 border-t border-neutral-200 text-center text-xs text-neutral-500 flex items-center justify-between px-4">
          <span>Press <strong>ESC</strong> to close</span>
          <span>Tip: Type order code like <strong>#ORD-479697</strong> directly</span>
        </div>
      </div>
    </div>
  );
};
