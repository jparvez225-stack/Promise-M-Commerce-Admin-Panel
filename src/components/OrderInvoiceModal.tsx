import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Download, 
  Printer, 
  X, 
  Phone, 
  MapPin, 
  CreditCard, 
  Calendar,
  Image as ImageIcon,
  Upload,
  Building2,
  ShieldCheck,
  Truck,
  Sparkles,
  Trash2
} from 'lucide-react';
import { Order } from '../types';

interface OrderInvoiceModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus?: (orderId: string, status: Order['status']) => void;
}

export const OrderInvoiceModal: React.FC<OrderInvoiceModalProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

  // Custom Logo State with localStorage persistence
  const [headerLogo, setHeaderLogo] = useState<string>(() => {
    return localStorage.getItem('aura_invoice_header_logo') || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80';
  });

  const [footerLogo, setFooterLogo] = useState<string>(() => {
    return localStorage.getItem('aura_invoice_footer_logo') || '';
  });

  const [showLogoUploader, setShowLogoUploader] = useState(false);

  useEffect(() => {
    if (headerLogo) localStorage.setItem('aura_invoice_header_logo', headerLogo);
    else localStorage.removeItem('aura_invoice_header_logo');
  }, [headerLogo]);

  useEffect(() => {
    if (footerLogo) localStorage.setItem('aura_invoice_footer_logo', footerLogo);
    else localStorage.removeItem('aura_invoice_footer_logo');
  }, [footerLogo]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'header' | 'footer') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (target === 'header') setHeaderLogo(reader.result);
          else setFooterLogo(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Stylesheet overlay for pristine physical A4/Thermal printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white !important;
            color: #0E0E0E !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 bg-[#0E0E0E]/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div className="bg-white border border-[#E2D9D2] rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden my-6 relative text-[#0E0E0E]">
          
          {/* Aura Pro Modal Top Bar */}
          <div className="bg-[#B8623B] text-white p-5 relative no-print border-b border-[#E2D9D2]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#B8623B] flex items-center justify-center font-black shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-black tracking-wider uppercase">
                      Order Invoice Receipt
                    </h2>
                    <span className="px-2 py-0.5 bg-white/20 text-white rounded text-[10px] font-bold uppercase tracking-wider">
                      AURA PRO SYSTEM
                    </span>
                  </div>
                  <p className="text-xs text-white/90 mt-0.5">
                    Order <strong className="text-white">{order.id}</strong> • Confirmed for <strong className="text-white">{order.customerName}</strong>
                  </p>
                </div>
              </div>

              {/* Branding Image Toggle */}
              <button
                onClick={() => setShowLogoUploader(!showLogoUploader)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-[11px] font-bold flex items-center gap-1.5 border border-white/30 transition-all shrink-0"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>{showLogoUploader ? 'Close Logo Options' : 'Custom Branding'}</span>
              </button>
            </div>
          </div>

          {/* Logo / Footer Banner Upload Panel */}
          {showLogoUploader && (
            <div className="p-4 bg-[#F7F4F1] border-b border-[#E2D9D2] no-print space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#E2D9D2]/50 pb-2">
                <span className="font-bold text-[#B8623B] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Invoice Custom Business Logos & Banners</span>
                </span>
                <span className="text-[10px] text-[#545454]">Auto-saved for all future invoices</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Header Logo Upload */}
                <div className="bg-white p-3 rounded border border-[#E2D9D2]/60 space-y-2">
                  <span className="font-bold text-[#0E0E0E] block text-[11px]">Invoice Header Logo / Banner</span>
                  {headerLogo && (
                    <div className="h-10 bg-[#FAFAFA] border border-[#EEEEEE] rounded p-1 flex items-center justify-between">
                      <img src={headerLogo} alt="Header Preview" className="h-full object-contain" />
                      <button onClick={() => setHeaderLogo('')} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Header image URL..."
                      value={headerLogo}
                      onChange={(e) => setHeaderLogo(e.target.value)}
                      className="flex-1 p-1.5 border border-[#EEEEEE] rounded text-[10px] font-mono"
                    />
                    <label className="px-2.5 py-1.5 bg-[#B8623B] text-white font-bold rounded cursor-pointer hover:bg-[#944923] text-[10px] shrink-0 flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'header')} className="hidden" />
                    </label>
                  </div>
                </div>

                {/* Footer Business Logo Upload */}
                <div className="bg-white p-3 rounded border border-[#E2D9D2]/60 space-y-2">
                  <span className="font-bold text-[#0E0E0E] block text-[11px]">Invoice Footer Business Logo / Stamp</span>
                  {footerLogo && (
                    <div className="h-10 bg-[#FAFAFA] border border-[#EEEEEE] rounded p-1 flex items-center justify-between">
                      <img src={footerLogo} alt="Footer Preview" className="h-full object-contain" />
                      <button onClick={() => setFooterLogo('')} className="p-1 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Footer logo image URL..."
                      value={footerLogo}
                      onChange={(e) => setFooterLogo(e.target.value)}
                      className="flex-1 p-1.5 border border-[#EEEEEE] rounded text-[10px] font-mono"
                    />
                    <label className="px-2.5 py-1.5 bg-[#B8623B] text-white font-bold rounded cursor-pointer hover:bg-[#944923] text-[10px] shrink-0 flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      <span>Upload</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'footer')} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRINTABLE INVOICE CONTENT AREA */}
          <div id="printable-invoice" className="p-6 space-y-5 bg-white">
            
            {/* Header Brand Banner */}
            {headerLogo && (
              <div className="text-center pb-3 border-b border-[#EEEEEE]">
                <img
                  src={headerLogo}
                  alt="Business Brand Header"
                  className="max-h-16 max-w-full mx-auto object-contain"
                />
              </div>
            )}

            {/* Store & Customer Header Grid */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 border-b border-[#EEEEEE] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#B8623B]" />
                  <h3 className="font-black text-sm uppercase tracking-wider text-[#0E0E0E]">
                    PROMISE MART LTD
                  </h3>
                </div>
                <p className="text-xs text-[#545454] mt-1 font-medium leading-tight">
                  Khaja Super Market, Mirpur Road, Dhaka-1207<br />
                  Hotline: <strong>09647 444 444</strong> • BIN: 981240192412
                </p>
              </div>

              <div className="text-left sm:text-right bg-[#F7F4F1]/40 border border-[#E2D9D2] p-3 rounded-lg sm:min-w-[180px]">
                <span className="text-[10px] font-black uppercase text-[#B8623B] tracking-wider block">
                  INVOICE NUMBER
                </span>
                <div className="text-base font-black text-[#0E0E0E]">
                  INV-{order.id.replace('#', '')}
                </div>
                <span className="text-[10px] text-[#545454] font-bold block mt-1">
                  DATE: {order.date || '2026-07-27'}
                </span>
              </div>
            </div>

            {/* Customer & Shipping Summary Card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-[#FAFAFA] rounded-xl border border-[#EEEEEE] text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#B8623B] block">
                  CUSTOMER DETAILS
                </span>
                <div className="font-extrabold text-[#0E0E0E] text-sm">{order.customerName}</div>
                <div className="flex items-center gap-1 text-[#545454] font-bold">
                  <Phone className="w-3.5 h-3.5 text-[#B8623B]" />
                  <span>{order.customerPhone}</span>
                </div>
                <div className="flex items-start gap-1 text-[#545454] font-medium pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#545454] shrink-0 mt-0.5" />
                  <span>{order.customerAddress} ({order.cityZone})</span>
                </div>
              </div>

              <div className="space-y-1 sm:text-right border-t sm:border-t-0 sm:border-l border-[#EEEEEE] pt-2 sm:pt-0 sm:pl-3">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#B8623B] block">
                  FULFILLMENT & PAYMENT
                </span>
                <div className="flex items-center gap-1 sm:justify-end">
                  <span className="font-bold text-[#0E0E0E]">Method:</span>
                  <span className="font-extrabold px-2 py-0.5 bg-[#F7F4F1] text-[#B8623B] border border-[#E2D9D2] rounded text-[11px] uppercase">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:justify-end pt-1">
                  <span className="font-bold text-[#0E0E0E]">Status:</span>
                  <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-full uppercase ${
                    order.status === 'Delivered'
                      ? 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30'
                      : 'bg-[#F7F4F1] text-[#B8623B] border border-[#E2D9D2]'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="text-[11px] font-bold text-[#545454] pt-1">
                  Est. Delivery: <strong className="text-[#0E0E0E]">{order.expectedDelivery}</strong>
                </div>
              </div>
            </div>

            {/* Itemized Order Table */}
            <div className="border border-[#E2D9D2] rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#B8623B] text-white font-black uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">ITEM DESCRIPTION</th>
                    <th className="py-2.5 px-3 text-center">QTY</th>
                    <th className="py-2.5 px-3 text-right">PRICE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] font-medium text-[#0E0E0E]">
                  {order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-[#F7F4F1]/20 transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-[10px] text-[#545454]">Variant: {item.variant}</div>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-[#B8623B]">
                        {item.quantity}x
                      </td>
                      <td className="py-2.5 px-3 text-right font-extrabold">
                        ৳{order.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Payable Summary Box */}
            <div className="bg-[#F7F4F1]/50 border border-[#E2D9D2] p-3.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-[#545454] block uppercase tracking-wider">
                  TOTAL AMOUNT PAYABLE (COD)
                </span>
                <span className="text-[10px] text-[#008F2F] font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#008F2F]" />
                  Includes standard home delivery charge
                </span>
              </div>
              <div className="text-2xl font-black text-[#B8623B]">
                ৳{order.totalAmount.toLocaleString()}
              </div>
            </div>

            {/* Custom Footer Business Logo / Stamp & Signature Area */}
            <div className="pt-4 border-t border-[#EEEEEE] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              {footerLogo ? (
                <div className="flex items-center gap-3">
                  <img
                    src={footerLogo}
                    alt="Footer Business Logo"
                    className="max-h-12 max-w-[160px] object-contain rounded"
                  />
                  <div className="text-[10px] text-[#545454]">
                    <div className="font-bold text-[#0E0E0E]">Verified Official Merchant</div>
                    <div>Promise Mart E-Commerce Network</div>
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-[#545454]">
                  <div className="font-bold text-[#0E0E0E]">Promise Mart Ltd • Official Invoice</div>
                  <div>Thank you for shopping with us! Returns accepted within 7 days.</div>
                </div>
              )}

              <div className="border-t border-dashed border-[#8F8F8F] pt-1 px-4 text-center shrink-0">
                <span className="text-[10px] font-bold text-[#0E0E0E] block">AUTHORIZED SIGNATURE</span>
                <span className="text-[9px] text-[#545454]">Promise Mart Dispatch Team</span>
              </div>
            </div>

          </div>

          {/* Admin Override & Modal Action Buttons */}
          <div className="p-5 bg-[#FAFAFA] border-t border-[#EEEEEE] space-y-4 no-print">
            {/* Status Override */}
            {onUpdateStatus && (
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-[#545454] uppercase tracking-wider block">
                  ADMIN ORDER STATUS OVERRIDE:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(['Pending', 'Processing', 'Shipped', 'Delivered', 'Canceled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => onUpdateStatus(order.id, st)}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-all uppercase tracking-wider ${
                        order.status === st
                          ? 'bg-[#B8623B] text-white shadow-xs'
                          : 'bg-white hover:bg-[#F7F4F1] text-[#545454] border border-[#EEEEEE]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                id="download-invoice-btn"
                onClick={handlePrint}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white font-extrabold text-xs rounded-full shadow-md transition-all uppercase tracking-wider"
              >
                <Printer className="w-4 h-4" />
                <span>Print / Save PDF</span>
              </button>
              <button
                id="continue-shopping-btn"
                onClick={onClose}
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-[#F7F4F1] text-[#0E0E0E] border border-[#E2D9D2] font-bold text-xs rounded-full transition-all uppercase tracking-wider"
              >
                <span>Close Window</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

