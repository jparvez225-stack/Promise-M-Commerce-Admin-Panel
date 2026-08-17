import React, { useState } from 'react';
import { Send, CheckCircle2, X, MessageSquare, Tag, Zap, Phone, Mail } from 'lucide-react';
import { Lead } from '../types';

interface LeadRecoveryModalProps {
  lead: Lead | null;
  onClose: () => void;
  onSendRecovery: (leadId: string, offerCode: string, customMsg: string) => void;
}

export const LeadRecoveryModal: React.FC<LeadRecoveryModalProps> = ({
  lead,
  onClose,
  onSendRecovery
}) => {
  if (!lead) return null;

  const [offerCode, setOfferCode] = useState('SPECIAL10');
  const [discountValue, setDiscountValue] = useState('10% OFF + FREE Delivery');
  const [message, setMessage] = useState(
    `Hello ${lead.name}! We noticed you left your order for ${lead.sourceProduct} (৳${lead.cartValue}). Use code ${offerCode} to get ${discountValue} right now!`
  );
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendRecovery(lead.id, offerCode, message);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white border border-neutral-200 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#B8623B] to-[#C87B57] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">
                Instant Lead Cart Recovery
              </h3>
              <p className="text-xs text-orange-100">
                Direct WhatsApp & SMS trigger to convert lead
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/20 transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {sentSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-neutral-900">
              Recovery Offer Sent!
            </h4>
            <p className="text-xs text-neutral-500">
              WhatsApp and SMS notification dispatched to <strong>{lead.phone}</strong>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Lead Summary Info */}
            <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-3.5 space-y-1.5 text-xs">
              <div className="flex items-center justify-between font-bold text-neutral-900">
                <span>{lead.name}</span>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-[#EFE8E2] text-[#944923] rounded-full">
                  Score: {lead.score}/100
                </span>
              </div>
              <div className="flex items-center gap-4 text-neutral-500">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#B8623B]" />
                  {lead.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-neutral-400" />
                  {lead.email}
                </span>
              </div>
              <div className="pt-1.5 border-t border-neutral-200 flex justify-between font-medium text-neutral-700">
                <span>Product: <strong>{lead.sourceProduct}</strong></span>
                <span className="font-extrabold text-[#B8623B]">৳{lead.cartValue}</span>
              </div>
            </div>

            {/* Offer Code & Discount Selection */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  value={offerCode}
                  onChange={(e) => setOfferCode(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-[#B8623B]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Offer Value
                </label>
                <input
                  type="text"
                  value={discountValue}
                  onChange={(e) => setDiscountValue(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-100 border border-neutral-200 rounded-xl text-xs font-bold text-neutral-900 focus:outline-none focus:border-[#B8623B]"
                />
              </div>
            </div>

            {/* Custom Message */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Message Body
              </label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#B8623B]"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold text-xs rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 bg-[#B8623B] hover:bg-[#944923] text-white font-bold text-xs rounded-xl shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Dispatch Recovery Offer
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
