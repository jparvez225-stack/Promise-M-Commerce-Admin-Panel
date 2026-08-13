import React, { useState } from 'react';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Bell, 
  Database,
  Globe,
  Lock,
  Users,
  Code2,
  FileText,
  Download,
  Upload,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Copy,
  Printer,
  Smartphone,
  Key,
  Image as ImageIcon,
  X,
  Search,
  Share2,
  BarChart2,
  Sparkles,
  Code
} from 'lucide-react';

type SettingsTab = 'GENERAL' | 'TEAM' | 'COURIER' | 'PAYMENTS' | 'SEO' | 'API' | 'INVOICE' | 'DATA';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Store Manager' | 'Fulfillment Agent' | 'Support Agent';
  status: 'Active' | 'Inactive';
}

export const SettingsControlCenter: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SettingsTab>('GENERAL');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // General Admin Panel State
  const [storeName, setStoreName] = useState('Promise Mart Ltd');
  const [currency, setCurrency] = useState('BDT (৳)');
  const [supportPhone, setSupportPhone] = useState('09647 444 444');
  const [supportEmail, setSupportEmail] = useState('support@promisemart.com');
  const [storeAddress, setStoreAddress] = useState('Khaja Super Market, Mirpur Road, Dhaka-1207');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Team & User Management State
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', name: 'Tanvir Rahman', email: 'tanvir@promisemart.com', role: 'Super Admin', status: 'Active' },
    { id: '2', name: 'Anika Chowdhury', email: 'anika@promisemart.com', role: 'Store Manager', status: 'Active' },
    { id: '3', name: 'Hasan Mahmud', email: 'hasan@promisemart.com', role: 'Fulfillment Agent', status: 'Active' },
  ]);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState<TeamMember['role']>('Support Agent');
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);

  // API Settings State
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [steadfastApiKey, setSteadfastApiKey] = useState('sf_live_992148102941294812');
  const [steadfastSecretKey, setSteadfastSecretKey] = useState('sf_secret_x82139102481');
  const [pathaoClientId, setPathaoClientId] = useState('pth_client_881249124');
  const [pathaoClientSecret, setPathaoClientSecret] = useState('pth_secret_881249124_key');
  const [smsApiKey, setSmsApiKey] = useState('sms_bd_live_key_38102491');
  const [smsSenderId, setSmsSenderId] = useState('PromiseMart');
  const [webhookUrl, setWebhookUrl] = useState('https://api.promisemart.com/v1/webhooks/orders');

  // Invoice Settings State
  const [invoicePrefix, setInvoicePrefix] = useState('INV-2026-');
  const [vatTaxNumber, setVatTaxNumber] = useState('BIN-981240192412');
  const [invoiceFooterTerms, setInvoiceFooterTerms] = useState('Thank you for shopping with Promise Mart! Returns accepted within 7 days with original invoice receipt.');
  const [invoicePaperSize, setInvoicePaperSize] = useState<'A4' | 'Thermal 80mm'>('Thermal 80mm');
  const [showLogoOnInvoice, setShowLogoOnInvoice] = useState(true);
  const [headerImageUrl, setHeaderImageUrl] = useState<string>('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80');
  const [footerImageUrl, setFooterImageUrl] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'header' | 'footer') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          if (target === 'header') setHeaderImageUrl(reader.result);
          else setFooterImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Courier & Shipping State
  const [dhakaCharge, setDhakaCharge] = useState('60');
  const [subUrbanCharge, setSubUrbanCharge] = useState('100');
  const [outsideDhakaCharge, setOutsideDhakaCharge] = useState('150');
  const [enableWeightShipping, setEnableWeightShipping] = useState(true);
  const [baseWeightLimit, setBaseWeightLimit] = useState('1.0');
  const [extraKgCharge, setExtraKgCharge] = useState('20');
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('2000');
  const [defaultCourier, setDefaultCourier] = useState('Steadfast Courier');
  const [autoDispatchOnConfirm, setAutoDispatchOnConfirm] = useState(true);

  // Payment Gateways State
  const [bkashMerchant, setBkashMerchant] = useState('01700112233');
  const [nagadMerchant, setNagadMerchant] = useState('01800112233');
  const [rocketMerchant, setRocketMerchant] = useState('01900112233');
  const [sslCommerzStoreId, setSslCommerzStoreId] = useState('promisemart_live');
  const [autoApproveCOD, setAutoApproveCOD] = useState(true);

  // SECTION 5: SEO, Meta Data & Pixel Tracking State
  const [seoMetaTitle, setSeoMetaTitle] = useState('Special Offer Landing Page #5 - Official Store Offer');
  const [seoMetaDescription, setSeoMetaDescription] = useState('Highlight key product features, warranty benefits, and special promotional prices with nationwide Cash on Delivery.');
  const [seoMetaKeywords, setSeoMetaKeywords] = useState('online shop, ecommerce bd, special deal, fast delivery, promo offer');
  const [seoCanonicalUrl, setSeoCanonicalUrl] = useState('https://promisemart.com/landing/special-offer-5');
  const [seoAllowIndexing, setSeoAllowIndexing] = useState(true);
  const [seoSchemaType, setSeoSchemaType] = useState<'Product' | 'Offer' | 'LocalBusiness' | 'Organization' | 'WebPage'>('Organization');

  const [ogTitle, setOgTitle] = useState('Special Offer Landing Page #5 - Official Store Offer');
  const [ogDescription, setOgDescription] = useState('Highlight key product features, warranty benefits, and special promotional prices with nationwide Cash on Delivery.');
  const [ogImageUrl, setOgImageUrl] = useState('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80');

  const [fbPixelId, setFbPixelId] = useState('PIXEL-901823712');
  const [fbAccessToken, setFbAccessToken] = useState('EAAFx9z8321948123...');
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState('G-789234110');
  const [gtmId, setGtmId] = useState('GTM-N8X29KP');
  const [tiktokPixelId, setTiktokPixelId] = useState('C9876543210');

  const [customHeadScript, setCustomHeadScript] = useState('<!-- Custom Header Scripts -->');
  const [customBodyScript, setCustomBodyScript] = useState('<!-- Custom Body Scripts -->');

  const [pixelTestSuccess, setPixelTestSuccess] = useState(false);
  const handleTestPixelEvent = (eventName: string) => {
    setPixelTestSuccess(true);
    setTimeout(() => setPixelTestSuccess(false), 3500);
  };

  const handleOgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setOgImageUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleAddTeamMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName || !newMemberEmail) return;

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      status: 'Active'
    };

    setTeamMembers([...teamMembers, newMember]);
    setNewMemberName('');
    setNewMemberEmail('');
    setShowAddTeamModal(false);
  };

  const handleDeleteTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Control Panel Header Box */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded border border-[#EEAB59] shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#0E0E0E] tracking-tight flex items-center gap-2">
              <Settings className="w-5 h-5 text-[#E67E00]" />
              <span>CONTROL CENTER & SYSTEM SETTINGS</span>
            </h1>
            <span className="px-2.5 py-0.5 text-[10px] font-black bg-[#E67E00] text-white rounded uppercase tracking-wider">
              ENTERPRISE EDITION
            </span>
          </div>
          <p className="text-xs text-[#545454] font-medium mt-0.5">
            Manage admin users, data import/export, API keys, invoice templates, courier partners & payments.
          </p>
        </div>

        <button
          onClick={() => handleSaveAll()}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full shadow-2xs transition-all uppercase tracking-wider self-start md:self-auto shrink-0"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </>
          )}
        </button>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#EEEEEE]">
        <button
          onClick={() => setActiveSubTab('GENERAL')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'GENERAL'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Admin & General</span>
        </button>

        <button
          onClick={() => setActiveSubTab('TEAM')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'TEAM'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Team & Users ({teamMembers.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('COURIER')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'COURIER'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Truck className="w-3.5 h-3.5" />
          <span>Courier & Logistics</span>
        </button>

        <button
          onClick={() => setActiveSubTab('PAYMENTS')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'PAYMENTS'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Payments & Banking</span>
        </button>

        <button
          onClick={() => setActiveSubTab('SEO')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'SEO'
              ? 'bg-[#008F2F] text-white shadow-2xs'
              : 'bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/40 hover:bg-[#ECFFE8]'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-[#008F2F]" />
          <span>PIXEL TRACKING</span>
          <span className="px-1.5 py-0.2 bg-[#008F2F] text-white text-[9px] rounded font-black">NEW</span>
        </button>

        <button
          onClick={() => setActiveSubTab('API')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'API'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>API & SMS Integrations</span>
        </button>

        <button
          onClick={() => setActiveSubTab('INVOICE')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'INVOICE'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Invoice & Receipts</span>
        </button>

        <button
          onClick={() => setActiveSubTab('DATA')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
            activeSubTab === 'DATA'
              ? 'bg-[#E67E00] text-white shadow-2xs'
              : 'bg-white text-[#E67E00] border border-[#EEAB59] hover:bg-[#FCF1E5]'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Import & Export Data</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. GENERAL / ADMIN PANEL TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'GENERAL' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <Globe className="w-4 h-4 text-[#E67E00]" />
              <span>Store & Legal Brand Configuration</span>
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Store Brand Name
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E] focus:outline-none focus:border-[#008F2F]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Default Operating Currency
              </label>
              <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Customer Helpline Phone
              </label>
              <input
                type="text"
                value={supportPhone}
                onChange={(e) => setSupportPhone(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-semibold text-[#0E0E0E]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Support & Inquiries Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-semibold text-[#0E0E0E]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Physical Office & Warehouse Address
              </label>
              <textarea
                value={storeAddress}
                onChange={(e) => setStoreAddress(e.target.value)}
                rows={2}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-semibold text-[#0E0E0E]"
              />
            </div>
          </div>

          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <ShieldCheck className="w-4 h-4 text-[#E67E00]" />
              <span>Admin System Preferences</span>
            </div>

            <label className="flex items-center justify-between p-3 bg-[#FCF1E5]/40 border border-[#EEAB59]/60 rounded cursor-pointer">
              <div>
                <span className="font-bold text-[#0E0E0E] block text-xs">
                  Maintenance Mode
                </span>
                <span className="text-[10px] text-[#545454]">
                  Temporarily pause storefront ordering while updating products.
                </span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="w-4 h-4 accent-[#E67E00]"
              />
            </label>

            <div className="p-3 bg-[#ECFFE8] border border-[#008F2F]/30 rounded space-y-1">
              <span className="text-xs font-bold text-[#008F2F] block uppercase tracking-wider">
                ✓ Cloud Security Status: Protected
              </span>
              <p className="text-[10px] text-[#545454]">
                SSL 256-bit Encryption enabled, real-time Firestore database persistence active.
              </p>
            </div>

            <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-2">
              <span className="text-xs font-bold text-[#0E0E0E] block uppercase tracking-wider">
                System Timezone & Locale
              </span>
              <div className="text-[11px] text-[#545454] font-medium space-y-1">
                <div>• Timezone: <strong className="text-[#0E0E0E]">Asia/Dhaka (GMT+6)</strong></div>
                <div>• Date Format: <strong className="text-[#0E0E0E]">DD-MM-YYYY HH:mm</strong></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TEAM & USER MANAGEMENT TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'TEAM' && (
        <div className="space-y-4">
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">
                TEAM & STAFF MANAGEMENT
              </h2>
              <p className="text-xs text-[#545454] mt-0.5">
                Assign administrative roles and restrict access permissions for store staff.
              </p>
            </div>
            <button
              onClick={() => setShowAddTeamModal(true)}
              className="px-4 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-xs rounded-full flex items-center gap-1.5 transition-all shadow-2xs uppercase tracking-wider"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Staff Member</span>
            </button>
          </div>

          <div className="bg-white rounded border border-[#EEAB59] overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#E67E00] text-white font-bold tracking-wider text-[11px] uppercase">
                  <th className="py-2.5 px-4">STAFF NAME</th>
                  <th className="py-2.5 px-4">EMAIL ADDRESS</th>
                  <th className="py-2.5 px-4">ROLE</th>
                  <th className="py-2.5 px-4">STATUS</th>
                  <th className="py-2.5 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-[#FCF1E5]/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#0E0E0E]">
                      {member.name}
                    </td>
                    <td className="py-3 px-4 text-[#545454]">
                      {member.email}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59]">
                        {member.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 uppercase">
                        ● {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDeleteTeamMember(member.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-all"
                        title="Remove Staff"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. COURIER & LOGISTICS TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'COURIER' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <Truck className="w-4 h-4 text-[#E67E00]" />
              <span>Area-Based Shipping Rates (3 Zones)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Inside Dhaka (৳)
                </label>
                <input
                  type="number"
                  value={dhakaCharge}
                  onChange={(e) => setDhakaCharge(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Sub-Urban Area (৳)
                </label>
                <input
                  type="number"
                  value={subUrbanCharge}
                  onChange={(e) => setSubUrbanCharge(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Outside Dhaka (৳)
                </label>
                <input
                  type="number"
                  value={outsideDhakaCharge}
                  onChange={(e) => setOutsideDhakaCharge(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
                />
              </div>
            </div>

            <div className="pt-2 border-t border-[#EEEEEE] space-y-2">
              <label className="flex items-center justify-between p-2.5 bg-[#FCF1E5]/40 border border-[#EEAB59]/60 rounded cursor-pointer">
                <div>
                  <span className="font-bold text-[#0E0E0E] block text-xs">
                    Weight-Based Extra Shipping Surcharge
                  </span>
                  <span className="text-[10px] text-[#545454]">
                    Add additional per-KG cost for parcels exceeding base weight limit.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={enableWeightShipping}
                  onChange={(e) => setEnableWeightShipping(e.target.checked)}
                  className="w-4 h-4 accent-[#E67E00]"
                />
              </label>

              {enableWeightShipping && (
                <div className="grid grid-cols-2 gap-2 p-2 bg-[#FAFAFA] border border-[#EEEEEE] rounded">
                  <div>
                    <label className="block font-bold text-[#0E0E0E] mb-0.5 text-[10px]">
                      Base Included Weight (KG)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={baseWeightLimit}
                      onChange={(e) => setBaseWeightLimit(e.target.value)}
                      className="w-full p-1.5 bg-white border border-[#EEEEEE] rounded font-bold text-xs text-[#0E0E0E]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0E0E0E] mb-0.5 text-[10px]">
                      Extra Weight Surcharge (৳ / KG)
                    </label>
                    <input
                      type="number"
                      value={extraKgCharge}
                      onChange={(e) => setExtraKgCharge(e.target.value)}
                      className="w-full p-1.5 bg-white border border-[#EEEEEE] rounded font-bold text-xs text-[#0E0E0E]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Free Shipping Order Threshold (৳)
              </label>
              <input
                type="number"
                value={freeShippingThreshold}
                onChange={(e) => setFreeShippingThreshold(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Primary Preferred Courier Partner
              </label>
              <select
                value={defaultCourier}
                onChange={(e) => setDefaultCourier(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
              >
                <option value="Steadfast Courier">Steadfast Courier</option>
                <option value="Pathao Express">Pathao Express</option>
                <option value="RedX Logistics">RedX Logistics</option>
                <option value="Paperfly">Paperfly Delivery</option>
              </select>
            </div>
          </div>

          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <ShieldCheck className="w-4 h-4 text-[#E67E00]" />
              <span>Logistics Automation Rules</span>
            </div>

            <label className="flex items-center justify-between p-3 bg-[#FCF1E5]/40 border border-[#EEAB59]/60 rounded cursor-pointer">
              <div>
                <span className="font-bold text-[#0E0E0E] block text-xs">
                  Auto-Dispatch to Courier API
                </span>
                <span className="text-[10px] text-[#545454]">
                  Automatically push orders to Steadfast/Pathao API when status becomes "Shipped".
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoDispatchOnConfirm}
                onChange={(e) => setAutoDispatchOnConfirm(e.target.checked)}
                className="w-4 h-4 accent-[#E67E00]"
              />
            </label>

            <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0E0E0E] text-xs">Steadfast API Status</span>
                <span className="px-2 py-0.5 text-[9px] font-black bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 rounded">ACTIVE</span>
              </div>
              <p className="text-[10px] text-[#545454]">
                Auto consignment creation & barcode label generation ready.
              </p>
            </div>

            <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0E0E0E] text-xs">Pathao Courier Status</span>
                <span className="px-2 py-0.5 text-[9px] font-black bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 rounded">ACTIVE</span>
              </div>
              <p className="text-[10px] text-[#545454]">
                City delivery hub connected for instant pick-up booking.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. PAYMENTS & BANKING TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'PAYMENTS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <CreditCard className="w-4 h-4 text-[#E67E00]" />
              <span>Mobile Banking Accounts</span>
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                bKash Merchant / Personal Wallet Number
              </label>
              <input
                type="text"
                value={bkashMerchant}
                onChange={(e) => setBkashMerchant(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#E67E00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Nagad Merchant Account Number
              </label>
              <input
                type="text"
                value={nagadMerchant}
                onChange={(e) => setNagadMerchant(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#E67E00] focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Dutch-Bangla Rocket Wallet Number
              </label>
              <input
                type="text"
                value={rocketMerchant}
                onChange={(e) => setRocketMerchant(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E] focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <Globe className="w-4 h-4 text-[#E67E00]" />
              <span>Payment Gateway & COD Rules</span>
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                SSLCommerz Online Payment Store ID
              </label>
              <input
                type="text"
                value={sslCommerzStoreId}
                onChange={(e) => setSslCommerzStoreId(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
              />
            </div>

            <label className="flex items-center justify-between p-3 bg-[#FCF1E5]/40 border border-[#EEAB59]/60 rounded cursor-pointer">
              <div>
                <span className="font-bold text-[#0E0E0E] block text-xs">
                  Auto-Approve Cash On Delivery (COD)
                </span>
                <span className="text-[10px] text-[#545454]">
                  Accept COD orders directly without requiring phone verification first.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoApproveCOD}
                onChange={(e) => setAutoApproveCOD(e.target.checked)}
                className="w-4 h-4 accent-[#E67E00]"
              />
            </label>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 5: SEO, META DATA & PIXEL TRACKING TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'SEO' && (
        <div className="space-y-5 text-xs">
          {/* MAIN SECTION 5 CONTAINER MATCHING USER SCREENSHOT EXACTLY */}
          <div className="p-4 sm:p-5 bg-[#FFFDF9] border border-[#EEAB59] rounded-xl shadow-2xs space-y-4">
            {/* Top Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EEAB59]/30 gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-4 bg-[#008F2F] rounded-full inline-block shrink-0"></span>
                <Globe className="w-4 h-4 text-[#008F2F] shrink-0" />
                <h2 className="font-extrabold text-[#0E0E0E] text-xs sm:text-sm uppercase tracking-wider">
                  PIXEL TRACKING
                </h2>
              </div>

              <button
                type="button"
                className="px-3 py-1 bg-white border border-[#008F2F] text-[#008F2F] font-bold text-[11px] rounded-md uppercase tracking-wider hover:bg-[#ECFFE8] transition-all cursor-pointer shadow-2xs shrink-0"
              >
                SEARCH OPTIMIZATION
              </button>
            </div>

            {/* Field 1: Meta Title (Google Search Title) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-[#0E0E0E] text-xs">
                  Meta Title (Google Search Title)
                </label>
                <span className="text-[11px] font-medium text-[#545454]">
                  {seoMetaTitle.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                value={seoMetaTitle}
                onChange={(e) => setSeoMetaTitle(e.target.value)}
                placeholder="Special Offer Landing Page #5 - Official Store Offer"
                className="w-full px-3.5 py-2.5 bg-white border border-[#EEAB59] rounded-md font-bold text-xs text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
              />
            </div>

            {/* Field 2: Meta Description (Search Snippet) */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-[#0E0E0E] text-xs">
                  Meta Description (Search Snippet)
                </label>
                <span className="text-[11px] font-medium text-[#545454]">
                  {seoMetaDescription.length}/160 chars
                </span>
              </div>
              <textarea
                rows={2}
                value={seoMetaDescription}
                onChange={(e) => setSeoMetaDescription(e.target.value)}
                placeholder="Highlight key product features, warranty benefits, and special promotional prices with nationwide Cash on Delivery."
                className="w-full p-3 bg-white border border-[#EEAB59] rounded-md font-medium text-xs text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs leading-relaxed"
              />
            </div>

            {/* Row 1: Meta Keywords & Social OG Share Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#0E0E0E] text-xs mb-1">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={seoMetaKeywords}
                  onChange={(e) => setSeoMetaKeywords(e.target.value)}
                  placeholder="online shop, ecommerce bd, special deal, fast delivery, promo offer"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EEAB59] rounded-md font-medium text-xs text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] text-xs mb-1">
                  Social OG Share Image URL
                </label>
                <input
                  type="text"
                  value={ogImageUrl}
                  onChange={(e) => setOgImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EEAB59] rounded-md font-mono text-xs font-medium text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                />
              </div>
            </div>

            {/* Row 2: Facebook Pixel ID & Google Analytics (GA4) ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#0E0E0E] text-xs mb-1 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
                  <span>Facebook Pixel ID</span>
                </label>
                <input
                  type="text"
                  value={fbPixelId}
                  onChange={(e) => setFbPixelId(e.target.value)}
                  placeholder="PIXEL-901823712"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EEAB59] rounded-md font-mono text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] text-xs mb-1 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
                  <span>Google Analytics (GA4) ID</span>
                </label>
                <input
                  type="text"
                  value={googleAnalyticsId}
                  onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                  placeholder="G-789234110"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#EEAB59] rounded-md font-mono text-xs font-bold text-[#0E0E0E] focus:border-[#008F2F] focus:outline-none shadow-2xs"
                />
              </div>
            </div>

            {/* Bottom Google Search Snippet Preview Card */}
            <div className="p-3.5 bg-[#FFFBF7] border border-[#EEAB59] rounded-md space-y-1 shadow-2xs">
              <div className="flex items-center gap-1.5 text-[#E67E00] font-black text-[11px] uppercase tracking-wider mb-1">
                <Search className="w-3.5 h-3.5 text-[#E67E00]" />
                <span>GOOGLE SEARCH SNIPPET PREVIEW:</span>
              </div>
              <div className="text-blue-600 font-bold text-sm hover:underline cursor-pointer leading-snug">
                {seoMetaTitle || 'Special Offer Landing Page #5 - Official Store Offer'}
              </div>
              <div className="text-[#008F2F] font-medium text-xs font-mono">
                {seoCanonicalUrl || 'https://promisemart.com/landing/special-offer-5'}
              </div>
              <div className="text-[#545454] text-xs leading-relaxed">
                {seoMetaDescription || 'Highlight key product features, warranty benefits, and special promotional prices with nationwide Cash on Delivery.'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. API & SMS INTEGRATIONS TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'API' && (
        <div className="space-y-4 text-xs">
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">
                API KEYS & INTEGRATION ENDPOINTS
              </h2>
              <p className="text-xs text-[#545454] mt-0.5">
                Manage API credentials for SMS gateways, courier platforms and external webhooks.
              </p>
            </div>

            <button
              onClick={() => setShowApiKeys(!showApiKeys)}
              className="px-3 py-1.5 bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] font-bold text-xs rounded-full flex items-center gap-1.5 transition-all"
            >
              {showApiKeys ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showApiKeys ? 'Hide Keys' : 'Reveal API Keys'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Courier APIs */}
            <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#0E0E0E] block border-b border-[#EEEEEE] pb-2">
                Steadfast & Pathao Logistics API
              </span>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Steadfast API Key
                </label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={steadfastApiKey}
                  onChange={(e) => setSteadfastApiKey(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-mono font-bold text-[#0E0E0E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Steadfast Secret Key
                </label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={steadfastSecretKey}
                  onChange={(e) => setSteadfastSecretKey(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-mono font-bold text-[#0E0E0E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Pathao Client Secret
                </label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={pathaoClientSecret}
                  onChange={(e) => setPathaoClientSecret(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-mono font-bold text-[#0E0E0E]"
                />
              </div>
            </div>

            {/* SMS & Webhooks */}
            <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
              <span className="font-bold text-xs uppercase tracking-wider text-[#0E0E0E] block border-b border-[#EEEEEE] pb-2">
                Automated SMS & Webhook Sync
              </span>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  SMS Gateway API Key (BulkSMS BD)
                </label>
                <input
                  type={showApiKeys ? 'text' : 'password'}
                  value={smsApiKey}
                  onChange={(e) => setSmsApiKey(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-mono font-bold text-[#0E0E0E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Approved SMS Masking Sender ID
                </label>
                <input
                  type="text"
                  value={smsSenderId}
                  onChange={(e) => setSmsSenderId(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                  Order Event Sync Webhook URL
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-mono text-[11px] text-[#0E0E0E]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. INVOICE & RECEIPTS TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'INVOICE' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <Printer className="w-4 h-4 text-[#E67E00]" />
              <span>Invoice Customization & Branding</span>
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Invoice Number Prefix
              </label>
              <input
                type="text"
                value={invoicePrefix}
                onChange={(e) => setInvoicePrefix(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                VAT / Tax BIN Number
              </label>
              <input
                type="text"
                value={vatTaxNumber}
                onChange={(e) => setVatTaxNumber(e.target.value)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Default Print Paper Format
              </label>
              <select
                value={invoicePaperSize}
                onChange={(e) => setInvoicePaperSize(e.target.value as any)}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded font-bold text-[#0E0E0E]"
              >
                <option value="Thermal 80mm">Thermal Receipt (80mm POS Roll)</option>
                <option value="A4">Standard A4 Sheet</option>
              </select>
            </div>

            {/* Header Image Option */}
            <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#0E0E0E] text-[11px] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#E67E00]" />
                  <span>Invoice Header Banner / Logo Image</span>
                </label>
                {headerImageUrl && (
                  <button
                    type="button"
                    onClick={() => setHeaderImageUrl('')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {headerImageUrl && (
                <div className="p-2 bg-white border border-[#EEEEEE] rounded flex items-center justify-between gap-2">
                  <img src={headerImageUrl} alt="Header Banner" className="h-10 max-w-[140px] object-contain rounded" />
                  <span className="text-[10px] text-[#008F2F] font-bold">✓ Header Image Active</span>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste Header Image URL (https://...)"
                  value={headerImageUrl}
                  onChange={(e) => setHeaderImageUrl(e.target.value)}
                  className="flex-1 p-1.5 bg-white border border-[#EEEEEE] rounded text-xs"
                />
                <label className="px-3 py-1.5 bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] font-bold rounded cursor-pointer hover:bg-[#FCF1E5]/80 flex items-center gap-1 text-[11px] shrink-0">
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'header')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Footer Image Option */}
            <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#0E0E0E] text-[11px] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#E67E00]" />
                  <span>Invoice Footer Banner / Signature Image</span>
                </label>
                {footerImageUrl && (
                  <button
                    type="button"
                    onClick={() => setFooterImageUrl('')}
                    className="text-[10px] text-red-600 font-bold hover:underline"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {footerImageUrl && (
                <div className="p-2 bg-white border border-[#EEEEEE] rounded flex items-center justify-between gap-2">
                  <img src={footerImageUrl} alt="Footer Banner" className="h-10 max-w-[140px] object-contain rounded" />
                  <span className="text-[10px] text-[#008F2F] font-bold">✓ Footer Image Active</span>
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Paste Footer Image URL (https://...)"
                  value={footerImageUrl}
                  onChange={(e) => setFooterImageUrl(e.target.value)}
                  className="flex-1 p-1.5 bg-white border border-[#EEEEEE] rounded text-xs"
                />
                <label className="px-3 py-1.5 bg-[#FCF1E5] text-[#E67E00] border border-[#EEAB59] font-bold rounded cursor-pointer hover:bg-[#FCF1E5]/80 flex items-center gap-1 text-[11px] shrink-0">
                  <Upload className="w-3 h-3" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'footer')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#0E0E0E] mb-1 text-[11px]">
                Invoice Terms & Return Policy Text
              </label>
              <textarea
                value={invoiceFooterTerms}
                onChange={(e) => setInvoiceFooterTerms(e.target.value)}
                rows={2}
                className="w-full p-2 bg-white border border-[#EEEEEE] rounded text-[#0E0E0E]"
              />
            </div>
          </div>

          {/* Invoice Live Visual Preview Box */}
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <span className="font-bold text-xs uppercase tracking-wider text-[#0E0E0E] block border-b border-[#EEEEEE] pb-2">
              Invoice Receipt Print Preview ({invoicePaperSize})
            </span>

            <div className="bg-[#FAFAFA] border border-[#EEEEEE] rounded p-4 space-y-3 font-mono text-[11px] text-[#0E0E0E]">
              {/* Header Image in Invoice Preview */}
              {headerImageUrl && (
                <div className="text-center pb-2 border-b border-dashed border-[#8F8F8F]">
                  <img
                    src={headerImageUrl}
                    alt="Invoice Header Banner"
                    className="max-h-16 w-full object-contain mx-auto"
                  />
                </div>
              )}

              <div className="text-center border-b border-dashed border-[#8F8F8F] pb-2">
                <div className="font-extrabold text-sm uppercase">{storeName}</div>
                <div>Hotline: {supportPhone}</div>
                <div>VAT BIN: {vatTaxNumber}</div>
              </div>

              <div className="flex justify-between font-bold pt-1">
                <span>INVOICE: {invoicePrefix}849201</span>
                <span>2026-07-27</span>
              </div>

              <div className="border-b border-dashed border-[#8F8F8F] pb-2 space-y-1 pt-1">
                <div className="flex justify-between">
                  <span>Aura Pro Studio ANC Headphones</span>
                  <span>৳4,990</span>
                </div>
                <div className="flex justify-between text-[#545454]">
                  <span>Delivery Charge (Inside Dhaka)</span>
                  <span>৳60</span>
                </div>
              </div>

              <div className="flex justify-between font-extrabold text-xs pt-1">
                <span>TOTAL PAYABLE (COD)</span>
                <span className="text-[#E67E00]">৳5,050</span>
              </div>

              {/* Footer Terms */}
              <p className="text-[9px] text-[#545454] text-center pt-2 italic border-t border-dashed border-[#EEEEEE]">
                "{invoiceFooterTerms}"
              </p>

              {/* Footer Image in Invoice Preview */}
              {footerImageUrl && (
                <div className="text-center pt-2 border-t border-dashed border-[#8F8F8F]">
                  <img
                    src={footerImageUrl}
                    alt="Invoice Footer Banner"
                    className="max-h-12 w-full object-contain mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. IMPORT & EXPORT DATA TAB */}
      {/* ========================================================================= */}
      {activeSubTab === 'DATA' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Data Export Box */}
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <Download className="w-4 h-4 text-[#E67E00]" />
              <span>Export Store Database Records</span>
            </div>

            <p className="text-[11px] text-[#545454]">
              Download complete CSV or JSON backups for accounting, tax reporting, or offsite backup.
            </p>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => alert('Downloading Orders CSV database export...')}
                className="w-full py-2 bg-[#FCF1E5] hover:bg-[#FCF1E5]/80 text-[#E67E00] border border-[#EEAB59] font-bold text-xs rounded transition-colors flex items-center justify-between px-3 uppercase tracking-wider"
              >
                <span>Export Orders Database (CSV)</span>
                <Download className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => alert('Downloading Customers Leads CSV database export...')}
                className="w-full py-2 bg-[#FCF1E5] hover:bg-[#FCF1E5]/80 text-[#E67E00] border border-[#EEAB59] font-bold text-xs rounded transition-colors flex items-center justify-between px-3 uppercase tracking-wider"
              >
                <span>Export Customer Directory (CSV)</span>
                <Download className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => alert('Downloading Full Store JSON Backup...')}
                className="w-full py-2 bg-[#ECFFE8] text-[#008F2F] border border-[#008F2F]/30 font-bold text-xs rounded transition-colors flex items-center justify-between px-3 uppercase tracking-wider"
              >
                <span>Export Complete System JSON Backup</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Data Import Box */}
          <div className="bg-white border border-[#EEAB59] rounded p-4 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-[#0E0E0E] border-b border-[#EEEEEE] pb-2.5">
              <Upload className="w-4 h-4 text-[#E67E00]" />
              <span>Import Products & Orders CSV</span>
            </div>

            <p className="text-[11px] text-[#545454]">
              Upload CSV file to bulk add catalog items or migrate historic sales orders.
            </p>

            <div className="border-2 border-dashed border-[#EEAB59] bg-[#FCF1E5]/30 rounded p-6 text-center space-y-2 cursor-pointer hover:bg-[#FCF1E5]/60 transition-colors">
              <Upload className="w-6 h-6 text-[#E67E00] mx-auto" />
              <div className="font-bold text-[#0E0E0E]">
                Drag and drop your CSV file here
              </div>
              <p className="text-[10px] text-[#8F8F8F]">
                Supports .CSV, .JSON up to 25MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddTeamModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded border border-[#EEAB59] max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
              <h3 className="text-sm font-bold text-[#0E0E0E] uppercase tracking-wider">
                Add New Staff Member
              </h3>
              <button
                onClick={() => setShowAddTeamModal(false)}
                className="text-[#545454] hover:text-[#0E0E0E] text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTeamMember} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1">Full Name</label>
                <input
                  type="text"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-2 border border-[#EEEEEE] rounded font-bold"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1">Work Email</label>
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="e.g. rahul@promisemart.com"
                  className="w-full p-2 border border-[#EEEEEE] rounded font-medium"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#0E0E0E] mb-1">Assigned Role</label>
                <select
                  value={newMemberRole}
                  onChange={(e) => setNewMemberRole(e.target.value as any)}
                  className="w-full p-2 border border-[#EEEEEE] rounded font-bold"
                >
                  <option value="Super Admin">Super Admin</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Fulfillment Agent">Fulfillment Agent</option>
                  <option value="Support Agent">Support Agent</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTeamModal(false)}
                  className="px-4 py-1.5 border border-[#EEEEEE] rounded font-bold text-[#545454]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold rounded uppercase tracking-wider"
                >
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

