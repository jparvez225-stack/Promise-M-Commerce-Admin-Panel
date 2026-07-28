import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  RefreshCw, 
  Download, 
  User, 
  Plus, 
  Clock, 
  Sun, 
  Moon, 
  Bell, 
  ChevronDown, 
  Printer, 
  Copy, 
  Eye, 
  Edit3, 
  CheckCircle2, 
  X,
  ArrowRight,
  HelpCircle,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  Phone,
  Package,
  Minus,
  Trash2,
  ShoppingBag,
  Truck,
  CheckSquare,
  Layers,
  Send
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderManagementProps {
  orders?: Order[];
  onSelectOrder?: (order: Order) => void;
  onUpdateOrderStatus?: (orderId: string, newStatus: OrderStatus) => void;
  onQuickCreateOrder?: () => void;
  filterStatus?: OrderStatus | 'All';
}

interface DetailedOrderRecord {
  id: string;
  dateStr: string;
  customerName: string;
  customerPhone: string;
  packageItem: string;
  price: number;
  reliability: string;
  logistics: 'Steadfast' | 'RedX' | 'Paperfly' | 'Pathao';
  logisticsStatus: 'Pending' | 'In Transit' | 'Delivered' | 'Returned';
  status: 'Pending' | 'Confirmed' | 'Shipment Ready' | 'In Transit' | 'Delivered' | 'On Hold' | 'Cancelled' | 'Returned' | 'Follow-up';
}

interface AbandonedOrderRecord {
  id: string;
  customerName: string;
  phone: string;
  address?: string;
  ip: string;
  itemTitle: string;
  itemWeight: string;
  timestamp: string;
  status: 'PENDING' | 'RECOVERED' | 'DISCARDED';
  isHotLead?: boolean;
  notes?: string[];
}

const INITIAL_ORDERS_LIST: DetailedOrderRecord[] = [
  { id: '#WEB-252326', dateStr: '7/26/2026, 1:50:52 PM', customerName: 'Connor Joseph', customerPhone: '+1 (398) 792-4441', packageItem: 'Standard Item (1 pcs)', price: 560, reliability: 'Risky 0%', logistics: 'Steadfast', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-983556', dateStr: '7/17/2026, 8:19:43 PM', customerName: 'Alex Mercer', customerPhone: '01727533109', packageItem: 'Premium Ajwa Dates (1 pcs)', price: 1330, reliability: 'Risky 0%', logistics: 'Steadfast', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-493754', dateStr: 'Just now', customerName: 'Alex Mercer', customerPhone: '01727533109', packageItem: 'Cinnamon Super Grade (1 pcs)', price: 210, reliability: 'Risky 0%', logistics: 'Steadfast', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-3422', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0161761251', packageItem: 'New Website Order', price: 5371, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-4042', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0195117474', packageItem: 'New Website Order', price: 2550, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-3158', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0150895447', packageItem: 'New Website Order', price: 5045, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-7890', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0152618936', packageItem: 'New Website Order', price: 4532, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-4239', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0129685567', packageItem: 'New Website Order', price: 2920, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-1760', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0186097064', packageItem: 'New Website Order', price: 4050, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-9023', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0186053300', packageItem: 'New Website Order', price: 2136, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-4865', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '011319120', packageItem: 'New Website Order', price: 5185, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-7279', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0145367331', packageItem: 'New Website Order', price: 1535, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-1374', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0115463816', packageItem: 'New Website Order', price: 4070, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-2567', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0136490773', packageItem: 'New Website Order', price: 1322, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-7256', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0182238801', packageItem: 'New Website Order', price: 3644, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-7872', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0173523788', packageItem: 'New Website Order', price: 5216, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-3143', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0120138887', packageItem: 'New Website Order', price: 1033, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-2361', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0145709658', packageItem: 'New Website Order', price: 3678, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-4480', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0156453132', packageItem: 'New Website Order', price: 2575, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-7231', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0191440973', packageItem: 'New Website Order', price: 5348, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-5624', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0137026555', packageItem: 'New Website Order', price: 4731, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-3521', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0148186335', packageItem: 'New Website Order', price: 1398, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-6862', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0198618259', packageItem: 'New Website Order', price: 890, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-9214', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0166985047', packageItem: 'New Website Order', price: 3277, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-4173', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0180363287', packageItem: 'New Website Order', price: 4914, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-9105', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0179097008', packageItem: 'New Website Order', price: 2861, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-5195', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0139175408', packageItem: 'New Website Order', price: 2285, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' },
  { id: '#WEB-4804', dateStr: 'Just now', customerName: 'Online Customer', customerPhone: '0129767734', packageItem: 'New Website Order', price: 1949, reliability: 'Risky 0%', logistics: 'RedX', logisticsStatus: 'Pending', status: 'Pending' }
];

const INITIAL_ABANDONED_LIST: AbandonedOrderRecord[] = [
  { id: 'ABN-1001', customerName: 'Online Customer', phone: '0161761251', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1002', customerName: 'Online Customer', phone: '0195117474', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1003', customerName: 'Online Customer', phone: '0150895447', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1004', customerName: 'Online Customer', phone: '0152618936', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1005', customerName: 'Online Customer', phone: '0129685567', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1006', customerName: 'Online Customer', phone: '0186097064', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1007', customerName: 'Online Customer', phone: '0186053300', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1008', customerName: 'Online Customer', phone: '011319120', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1009', customerName: 'Online Customer', phone: '0145367331', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1010', customerName: 'Online Customer', phone: '0115463816', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1011', customerName: 'Online Customer', phone: '0136490773', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING', isHotLead: true },
  { id: 'ABN-1012', customerName: 'Online Customer', phone: '0182238801', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1013', customerName: 'Online Customer', phone: '0173523788', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1014', customerName: 'Online Customer', phone: '0120138887', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1015', customerName: 'Online Customer', phone: '0145709658', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1016', customerName: 'Online Customer', phone: '0156453132', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1017', customerName: 'Online Customer', phone: '0191440973', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1018', customerName: 'Online Customer', phone: '0137026555', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1019', customerName: 'Online Customer', phone: '0148186335', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1020', customerName: 'Online Customer', phone: '0198618259', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1021', customerName: 'Online Customer', phone: '0166985047', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1022', customerName: 'Online Customer', phone: '0180363287', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1023', customerName: 'Online Customer', phone: '0179097008', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1024', customerName: 'Online Customer', phone: '0139175408', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1025', customerName: 'Online Customer', phone: '0129767734', ip: '103.111.225.9', itemTitle: 'New Website Order x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: 'Just now', status: 'PENDING' },
  { id: 'ABN-1026', customerName: 'Alex Mercer', phone: '01727533109', address: 'Main Street, Central City', ip: '103.111.225.9', itemTitle: 'Cinnamon Super Grade (1 pcs) x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: '4/18/2026, 10:41:33 PM', status: 'PENDING' },
  { id: 'ABN-1027', customerName: 'Alex Mercer', phone: '01727533109', address: 'Main Street, Central City', ip: '103.111.225.9', itemTitle: 'Premium Ajwa Dates (1 pcs) x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: '7/17/2026, 8:19:43 PM', status: 'PENDING' },
  { id: 'ABN-1028', customerName: 'Connor Joseph', phone: '+1 (398) 792-4441', address: '123 Main Street', ip: '103.111.225.9', itemTitle: 'Standard Item (1 pcs) x 1', itemWeight: 'Weight : Cinnamon (500g)', timestamp: '7/26/2026, 1:50:52 PM', status: 'PENDING' }
];

export const OrderManagement: React.FC<OrderManagementProps> = ({
  onSelectOrder,
  onQuickCreateOrder
}) => {
  // State
  const [orderRecords, setOrderRecords] = useState<DetailedOrderRecord[]>(INITIAL_ORDERS_LIST);
  const [abandonedRecords, setAbandonedRecords] = useState<AbandonedOrderRecord[]>(INITIAL_ABANDONED_LIST);
  const [topTab, setTopTab] = useState<'ORDERS' | 'RECOVERY'>('RECOVERY');
  const [recoverySubTab, setRecoverySubTab] = useState<'ALL' | 'HOT'>('ALL');
  
  const [selectedTimeframe, setSelectedTimeframe] = useState<'TODAY' | 'YESTERDAY' | '7D' | '30D' | 'ALL' | 'CUSTOM'>('TODAY');
  const [statusFilter, setStatusFilter] = useState<string>('Pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pagination & Bulk Action States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPageAbandoned, setCurrentPageAbandoned] = useState<number>(1);
  const pageSizeAbandoned = 15;
  const [isBulkPrintModalOpen, setIsBulkPrintModalOpen] = useState(false);
  const [selectedBulkStatus, setSelectedBulkStatus] = useState<string>('');
  const [selectedBulkLogistics, setSelectedBulkLogistics] = useState<string>('');

  // Note Modal State
  const [noteModalTarget, setNoteModalTarget] = useState<AbandonedOrderRecord | null>(null);
  const [noteInputText, setNoteInputText] = useState('');

  // Modal State for Order View / Edit / Create
  const [activeModalOrder, setActiveModalOrder] = useState<DetailedOrderRecord | null>(null);
  const [orderComments, setOrderComments] = useState<Record<string, string[]>>({});
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCourierDropdownOpen, setIsCourierDropdownOpen] = useState(false);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Order Form States
  const [createCustomerName, setCreateCustomerName] = useState('');
  const [createCustomerPhone, setCreateCustomerPhone] = useState('');
  const [createOrderStatus, setCreateOrderStatus] = useState<string>('Pending');
  const [createAddress, setCreateAddress] = useState('');
  const [createDeliveryZone, setCreateDeliveryZone] = useState('Inside Dhaka');
  const [createCourier, setCreateCourier] = useState('Steadfast');
  const [createOrderNote, setCreateOrderNote] = useState('');
  
  // Product selection state
  const [productSearch, setProductSearch] = useState('');
  const [selectedProductItems, setSelectedProductItems] = useState<
    Array<{ id: string; name: string; sku: string; price: number; qty: number }>
  >([]);
  const [createDeliveryFee, setCreateDeliveryFee] = useState<number>(100);
  const [createDiscount, setCreateDiscount] = useState<number>(0);

  const catalogProducts = [
    { id: 'p1', name: 'Cinnamon (দারুচিনি)', sku: '1774441089704', stock: 100, price: 500 },
    { id: 'p2', name: 'Khejur (খেজুর)', sku: '1774263104510', stock: 1000, price: 1200 },
    { id: 'p3', name: 'Premium Ajwa Khejur (প্রিমিয়াম আজওয়া খেজুর)', sku: '1', stock: 38, price: 1250 },
    { id: 'p4', name: 'Housekeeper Water Purifier Filter', sku: '1234fltr', stock: 12, price: 850 },
    { id: 'p5', name: 'Pure Organic Mustard Oil 1L', sku: '984122340', stock: 250, price: 340 },
  ];

  const filteredCatalog = useMemo(() => {
    if (!productSearch.trim()) return catalogProducts;
    const q = productSearch.toLowerCase();
    return catalogProducts.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  }, [productSearch]);

  const handleAddProductToOrder = (prod: typeof catalogProducts[0]) => {
    setSelectedProductItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === prod.id);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].qty += 1;
        return updated;
      }
      return [...prev, { id: prod.id, name: prod.name, sku: prod.sku, price: prod.price, qty: 1 }];
    });
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setSelectedProductItems(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : null;
        }
        return item;
      }).filter(Boolean) as Array<{ id: string; name: string; sku: string; price: number; qty: number }>;
    });
  };

  const handleRemoveProductItem = (id: string) => {
    setSelectedProductItems(prev => prev.filter(i => i.id !== id));
  };

  const itemsSubtotal = selectedProductItems.reduce((acc, curr) => acc + (curr.price * curr.qty), 0);
  const grandTotal = Math.max(0, itemsSubtotal + Number(createDeliveryFee || 0) - Number(createDiscount || 0));

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status List Pills
  const statusPills = [
    { label: 'Pending', count: orderRecords.filter(o => o.status === 'Pending').length },
    { label: 'Confirmed', count: orderRecords.filter(o => o.status === 'Confirmed').length },
    { label: 'Shipment Ready', count: orderRecords.filter(o => o.status === 'Shipment Ready').length },
    { label: 'In Transit', count: orderRecords.filter(o => o.status === 'In Transit').length },
    { label: 'Delivered', count: orderRecords.filter(o => o.status === 'Delivered').length },
    { label: 'On Hold', count: orderRecords.filter(o => o.status === 'On Hold').length },
    { label: 'Cancelled', count: orderRecords.filter(o => o.status === 'Cancelled').length },
    { label: 'Returned', count: orderRecords.filter(o => o.status === 'Returned').length },
    { label: 'Follow-up', count: orderRecords.filter(o => o.status === 'Follow-up').length }
  ];

  // Filtered Orders
  const filteredRecords = useMemo(() => {
    return orderRecords.filter((rec) => {
      const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        !searchQuery ||
        rec.id.toLowerCase().includes(q) ||
        rec.customerName.toLowerCase().includes(q) ||
        rec.customerPhone.includes(q) ||
        rec.packageItem.toLowerCase().includes(q);

      return matchesStatus && matchesSearch;
    });
  }, [orderRecords, statusFilter, searchQuery]);

  // Filtered Abandoned Orders
  const filteredAbandoned = useMemo(() => {
    return abandonedRecords.filter((abn) => {
      if (recoverySubTab === 'HOT' && !abn.isHotLead) return false;
      const q = searchQuery.toLowerCase();
      if (!q) return true;
      return (
        abn.customerName.toLowerCase().includes(q) ||
        abn.phone.includes(q) ||
        abn.ip.includes(q) ||
        abn.itemTitle.toLowerCase().includes(q) ||
        (abn.address && abn.address.toLowerCase().includes(q))
      );
    });
  }, [abandonedRecords, recoverySubTab, searchQuery]);

  // Pagination Computations
  const totalPagesAbandoned = useMemo(() => Math.max(1, Math.ceil(filteredAbandoned.length / pageSizeAbandoned)), [filteredAbandoned]);

  const paginatedAbandoned = useMemo(() => {
    const start = (currentPageAbandoned - 1) * pageSizeAbandoned;
    return filteredAbandoned.slice(start, start + pageSizeAbandoned);
  }, [filteredAbandoned, currentPageAbandoned]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredRecords.length / pageSize)), [filteredRecords, pageSize]);

  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  // Handlers for status filter & search reset
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
    setSelectedRowIds([]);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  // Checkbox Selection
  const isPageFullySelected = paginatedRecords.length > 0 && paginatedRecords.every(r => selectedRowIds.includes(r.id));

  const handleSelectAllPaginated = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const pageIds = paginatedRecords.map(r => r.id);
      setSelectedRowIds(prev => Array.from(new Set([...prev, ...pageIds])));
    } else {
      const pageIds = new Set(paginatedRecords.map(r => r.id));
      setSelectedRowIds(prev => prev.filter(id => !pageIds.has(id)));
    }
  };

  const handleSelectAllFiltered = () => {
    setSelectedRowIds(filteredRecords.map(r => r.id));
  };

  const handleDeselectAll = () => {
    setSelectedRowIds([]);
  };

  const handleToggleRow = (id: string) => {
    setSelectedRowIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Bulk Actions
  const handleBulkStatusChange = (newStatus: string) => {
    if (!newStatus || selectedRowIds.length === 0) return;
    setOrderRecords(prev => prev.map(rec => selectedRowIds.includes(rec.id) ? { ...rec, status: newStatus as any } : rec));
    triggerToast(`Successfully updated status to "${newStatus}" for ${selectedRowIds.length} orders!`);
    setSelectedRowIds([]);
    setSelectedBulkStatus('');
  };

  const handleBulkLogisticsChange = (newCourier: 'Steadfast' | 'RedX' | 'Paperfly' | 'Pathao') => {
    if (!newCourier || selectedRowIds.length === 0) return;
    setOrderRecords(prev => prev.map(rec => selectedRowIds.includes(rec.id) ? { ...rec, logistics: newCourier, logisticsStatus: 'In Transit' } : rec));
    triggerToast(`Dispatched ${selectedRowIds.length} orders to courier (${newCourier})!`);
    setSelectedRowIds([]);
    setSelectedBulkLogistics('');
  };

  const handleBulkPrint = () => {
    if (selectedRowIds.length === 0) return;
    setIsBulkPrintModalOpen(true);
  };

  // Handle Copy ID
  const handleCopyId = (id: string) => {
    navigator.clipboard?.writeText(id);
    triggerToast(`Order ID ${id} copied to clipboard!`);
  };

  // Promote Abandoned Order to Main Order
  const handlePromoteToOrder = (abn: AbandonedOrderRecord) => {
    const newOrderId = `#WEB-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdOrder: DetailedOrderRecord = {
      id: newOrderId,
      dateStr: 'Just now',
      customerName: abn.customerName,
      customerPhone: abn.phone,
      packageItem: abn.itemTitle,
      price: 1500,
      reliability: 'Risky 0%',
      logistics: 'Steadfast',
      logisticsStatus: 'Pending',
      status: 'Confirmed'
    };

    setOrderRecords(prev => [createdOrder, ...prev]);
    setAbandonedRecords(prev => prev.filter(item => item.id !== abn.id));
    triggerToast(`Abandoned cart promoted to confirmed order ${newOrderId}!`);
  };

  // Add Note Handler
  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteModalTarget || !noteInputText.trim()) return;

    setAbandonedRecords(prev => prev.map(rec => {
      if (rec.id === noteModalTarget.id) {
        return {
          ...rec,
          notes: [...(rec.notes || []), noteInputText.trim()]
        };
      }
      return rec;
    }));

    triggerToast(`Note added to abandoned record!`);
    setNoteModalTarget(null);
    setNoteInputText('');
  };

  // Create Order Handler
  const handleCreateNewOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!createCustomerName.trim() || !createCustomerPhone.trim()) {
      triggerToast("Please fill in customer name and phone number.");
      return;
    }

    const itemTitles = selectedProductItems.length > 0 
      ? selectedProductItems.map(i => `${i.name} (${i.qty} pcs)`).join(', ')
      : 'Custom Order Package';

    const newOrder: DetailedOrderRecord = {
      id: `#WEB-${Math.floor(100000 + Math.random() * 900000)}`,
      dateStr: 'Just now',
      customerName: createCustomerName.trim(),
      customerPhone: createCustomerPhone.trim(),
      packageItem: itemTitles,
      price: grandTotal,
      reliability: 'Risky 0%',
      logistics: (createCourier as any) || 'Steadfast',
      logisticsStatus: 'Pending',
      status: (createOrderStatus as any) || 'Pending'
    };

    setOrderRecords(prev => [newOrder, ...prev]);
    setIsCreateModalOpen(false);
    
    // Reset Form
    setCreateCustomerName('');
    setCreateCustomerPhone('');
    setCreateOrderStatus('Pending');
    setCreateAddress('');
    setCreateDeliveryZone('Inside Dhaka');
    setCreateCourier('Steadfast');
    setCreateOrderNote('');
    setSelectedProductItems([]);
    setCreateDeliveryFee(100);
    setCreateDiscount(0);

    triggerToast(`New Order ${newOrder.id} created successfully!`);
  };

  return (
    <div className="w-full space-y-4 font-sans">
      
      {/* Toast Floating Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-bold border border-slate-700 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 2. MAIN SUB-HEADER NAVIGATION TABS */}
      <div className="bg-white border border-[#EEAB59] rounded px-2 flex items-center justify-start border-b">
        <button
          onClick={() => setTopTab('ORDERS')}
          className={`py-3 px-6 text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
            topTab === 'ORDERS'
              ? 'border-[#E67E00] text-[#E67E00] bg-[#FCF1E5]'
              : 'border-transparent text-[#545454] hover:text-[#0E0E0E]'
          }`}
        >
          <span>ALL ORDERS</span>
        </button>

        <button
          onClick={() => setTopTab('RECOVERY')}
          className={`py-3 px-6 text-xs font-bold tracking-wider uppercase border-b-2 transition-all flex items-center gap-2 ${
            topTab === 'RECOVERY'
              ? 'border-[#E67E00] text-[#E67E00] bg-[#FCF1E5]'
              : 'border-transparent text-[#545454] hover:text-[#0E0E0E]'
          }`}
        >
          <span>RECOVERY CENTER</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* RECOVERY CENTER VIEW */}
      {/* ------------------------------------------------------------- */}
      {topTab === 'RECOVERY' && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* Header Action Row */}
          <div className="bg-white border border-[#EEAB59] rounded p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Left Title Info */}
            <div className="space-y-1">
              <span className="inline-block px-2.5 py-0.5 bg-[#ECFFE8] text-[#008F2F] text-[9px] font-bold uppercase rounded-full tracking-wider">
                SYSTEM READY
              </span>
              <h2 className="text-lg font-bold text-[#0E0E0E] uppercase tracking-tight">
                ABANDONED ORDERS RECOVERY
              </h2>
              <p className="text-xs font-medium text-[#545454]">
                Operational lead salvage & customer re-engagement
              </p>
            </div>

            {/* Right Search & Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[240px] sm:min-w-[300px]">
                <Search className="w-3.5 h-3.5 text-[#8F8F8F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Q SEARCH BY NAME, PHONE OR IP..."
                  className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] uppercase placeholder:text-[#8F8F8F] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                />
              </div>

              <button 
                onClick={() => triggerToast('CSV exported for Abandoned Carts!')}
                className="px-4 py-1.5 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] text-[11px] font-semibold uppercase rounded-full flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>EXPORT CSV</span>
              </button>

              <button 
                onClick={() => triggerToast('Tutorial: How to convert abandoned carts into orders')}
                className="px-4 py-1.5 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] text-[11px] font-semibold uppercase rounded-full flex items-center gap-1.5 transition-colors"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>TUTORIAL</span>
              </button>

              <button 
                onClick={() => triggerToast('Live data synchronized!')}
                className="px-4 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white text-[11px] font-semibold uppercase rounded-full flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>SYNC LIVE DATA</span>
              </button>
            </div>

          </div>

          {/* Sub-Tabs: ABANDONED ORDERS LIST vs HOT LEADS */}
          <div className="flex items-center gap-2 border-b border-[#EEEEEE] pb-2">
            <button
              onClick={() => setRecoverySubTab('ALL')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                recoverySubTab === 'ALL'
                  ? 'bg-[#E67E00] text-white'
                  : 'border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5]'
              }`}
            >
              ABANDONED ORDERS LIST ({abandonedRecords.length})
            </button>

            <button
              onClick={() => setRecoverySubTab('HOT')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                recoverySubTab === 'HOT'
                  ? 'bg-[#E67E00] text-white'
                  : 'border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5]'
              }`}
            >
              HOT LEADS / CART ABANDONED ({abandonedRecords.filter(a => a.isHotLead).length})
            </button>
          </div>

          {/* ABANDONED ORDERS TABLE */}
          <div className="bg-white border border-[#EEAB59] rounded overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-4">CUSTOMER INFORMATIONS</th>
                    <th className="py-3 px-4">ABANDONED ITEMS & DETAILS</th>
                    <th className="py-3 px-4">TIMESTAMP & ACTIVITY</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-center">OPERATIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
                  {paginatedAbandoned.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-[#8F8F8F] font-bold">
                        No abandoned carts found in this view.
                      </td>
                    </tr>
                  ) : (
                    paginatedAbandoned.map((abn) => (
                      <tr 
                        key={abn.id}
                        className="hover:bg-[#FCF1E5]/50 transition-colors group"
                      >
                        {/* CUSTOMER INFORMATIONS */}
                        <td className="py-3 px-4 max-w-xs">
                          <div className="space-y-0.5">
                            <div className="text-[10px] font-bold uppercase text-[#8F8F8F]">
                              NAME: <span className="text-[#0E0E0E] font-bold">{abn.customerName}</span>
                            </div>
                            <div className="text-[10px] font-bold uppercase text-[#8F8F8F]">
                              PHONE: <span className="text-[#0E0E0E] font-bold">{abn.phone}</span>
                            </div>
                            {abn.address && (
                              <div className="text-[10px] font-bold uppercase text-[#8F8F8F]">
                                ADDR: <span className="text-[#545454] font-medium">{abn.address}</span>
                              </div>
                            )}
                            <div className="text-[10px] font-bold uppercase text-[#8F8F8F]">
                              IP: <span className="text-[#545454] font-medium">{abn.ip}</span>
                            </div>
                          </div>
                        </td>

                        {/* ABANDONED ITEMS & DETAILS */}
                        <td className="py-3 px-4 max-w-xs">
                          <div className="font-bold text-[#0E0E0E] text-xs">
                            {abn.itemTitle}
                          </div>
                          <div className="text-[10px] text-[#545454] font-medium mt-0.5">
                            {abn.itemWeight}
                          </div>
                        </td>

                        {/* TIMESTAMP & ACTIVITY */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 text-[10px] font-medium text-[#545454]">
                            <span>📅</span>
                            <span>{abn.timestamp}</span>
                          </div>
                          <button
                            onClick={() => setNoteModalTarget(abn)}
                            className="mt-1 flex items-center gap-1 text-[11px] font-bold text-[#E67E00] hover:underline"
                          >
                            <span>💬 Click to add note</span>
                            {abn.notes && abn.notes.length > 0 && (
                              <span className="px-1.5 bg-[#ECFFE8] text-[#008F2F] rounded-full text-[9px]">
                                {abn.notes.length}
                              </span>
                            )}
                          </button>
                        </td>

                        {/* STATUS */}
                        <td className="py-3 px-4">
                          <span className="px-2.5 py-1 bg-[#FCF1E5] text-[#E67E00] rounded-full text-[10px] font-bold tracking-wider uppercase">
                            {abn.status}
                          </span>
                        </td>

                        {/* OPERATIONS */}
                        <td className="py-3 px-4 text-center">
                          <button
                            type="button"
                            title="Promote to Confirmed Order (অর্ডারে রুপান্তর করুন)"
                            onClick={() => handlePromoteToOrder(abn)}
                            className="px-3.5 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white text-[10px] font-black uppercase rounded-full tracking-wider inline-flex items-center gap-1.5 shadow-2xs hover:shadow-md transition-all cursor-pointer group/promote"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-white transition-transform group-hover/promote:scale-110 shrink-0" />
                            <span>Promote to Order</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white/90 transition-transform group-hover/promote:translate-x-0.5 shrink-0" />
                          </button>
                        </td>

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* ABANDONED CARTS PAGINATION FOOTER */}
            {filteredAbandoned.length > 0 && (
              <div className="bg-white border-t border-[#EEEEEE] p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 font-semibold">
                  Showing {filteredAbandoned.length > 0 ? (currentPageAbandoned - 1) * pageSizeAbandoned + 1 : 0} to {Math.min(currentPageAbandoned * pageSizeAbandoned, filteredAbandoned.length)} of {filteredAbandoned.length} abandoned carts
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPageAbandoned === 1}
                    onClick={() => setCurrentPageAbandoned(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 border border-[#EEEEEE] rounded font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FCF1E5] transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPagesAbandoned }, (_, idx) => idx + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setCurrentPageAbandoned(p)}
                        className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                          currentPageAbandoned === p
                            ? 'bg-[#E67E00] text-white shadow-2xs'
                            : 'bg-white border border-[#EEEEEE] hover:border-[#EEAB59] text-slate-700'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>

                  <button
                    disabled={currentPageAbandoned === totalPagesAbandoned}
                    onClick={() => setCurrentPageAbandoned(prev => Math.min(totalPagesAbandoned, prev + 1))}
                    className="px-3 py-1.5 border border-[#EEEEEE] rounded font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FCF1E5] transition-colors flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* ALL ORDERS VIEW */}
      {/* ------------------------------------------------------------- */}
      {topTab === 'ORDERS' && (
        <div className="space-y-4 animate-fadeIn">
          
          {/* SEARCH & ACTION CONTROL BAR */}
          <div className="bg-white border border-[#EEAB59] rounded p-3 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              {/* Search Input */}
              <div className="relative flex-1 max-w-xl">
                <Search className="w-4 h-4 text-[#8F8F8F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Order ID, name or phone number..."
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] placeholder:text-[#8F8F8F] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8] transition-all"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentPage(1);
                    triggerToast('Data refreshed!');
                  }}
                  className="p-2 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] rounded-full transition-colors"
                  title="Refresh Data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => triggerToast('Orders exported to CSV/Excel!')}
                  className="p-2 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] rounded-full transition-colors"
                  title="Export Orders"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => handleStatusFilterChange('All')}
                  className="px-4 py-2 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] text-xs font-semibold rounded-full transition-colors flex items-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>All Orders</span>
                </button>

                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="px-4 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded-full transition-all flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ New Order</span>
                </button>
              </div>

            </div>

            {/* STATUS FILTER CATEGORY PILLS BAR */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#EEEEEE] scrollbar-none">
              <button
                onClick={() => handleStatusFilterChange('All')}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  statusFilter === 'All'
                    ? 'bg-[#E67E00] text-white'
                    : 'bg-white border border-[#EEEEEE] hover:border-[#EEAB59] text-[#545454]'
                }`}
              >
                <span>All Status</span>
                <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                  statusFilter === 'All' ? 'bg-white text-[#E67E00]' : 'bg-[#ECFFE8] text-[#008F2F]'
                }`}>
                  {orderRecords.length}
                </span>
              </button>

              {statusPills.map((pill) => {
                const isActive = statusFilter === pill.label;
                return (
                  <button
                    key={pill.label}
                    onClick={() => handleStatusFilterChange(pill.label)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#E67E00] text-white'
                        : 'bg-white border border-[#EEEEEE] hover:border-[#EEAB59] text-[#545454]'
                    }`}
                  >
                    <span>{pill.label}</span>
                    {pill.count > 0 && (
                      <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                        isActive ? 'bg-white text-[#E67E00]' : 'bg-[#ECFFE8] text-[#008F2F]'
                      }`}>
                        {pill.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BULK ACTIONS FLOATING TOOLBAR */}
          {selectedRowIds.length > 0 && (
            <div className="bg-[#FCF1E5] border-2 border-[#E67E00] rounded-xl p-3 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#E67E00] text-white font-black text-xs flex items-center justify-center shrink-0">
                  {selectedRowIds.length}
                </span>
                <div>
                  <span className="text-xs font-bold text-[#0E0E0E]">
                    {selectedRowIds.length} Order{selectedRowIds.length > 1 ? 's' : ''} Selected
                  </span>
                  <div className="flex items-center gap-2 text-[10px] text-[#545454] font-semibold mt-0.5">
                    <button 
                      onClick={handleSelectAllFiltered}
                      className="text-[#E67E00] underline font-bold hover:text-[#CC7000]"
                    >
                      Select all {filteredRecords.length} matching
                    </button>
                    <span>•</span>
                    <button 
                      onClick={handleDeselectAll}
                      className="text-slate-500 underline font-semibold hover:text-slate-700"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Bulk Status Dropdown */}
                <div className="flex items-center gap-1.5 bg-white border border-[#EEAB59] rounded-lg px-2.5 py-1">
                  <CheckSquare className="w-3.5 h-3.5 text-[#E67E00]" />
                  <select
                    value={selectedBulkStatus}
                    onChange={(e) => {
                      setSelectedBulkStatus(e.target.value);
                      handleBulkStatusChange(e.target.value);
                    }}
                    className="bg-transparent text-xs font-bold text-[#0E0E0E] focus:outline-none cursor-pointer"
                  >
                    <option value="">Bulk Status Change...</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipment Ready">Shipment Ready</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Returned">Returned</option>
                    <option value="Follow-up">Follow-up</option>
                  </select>
                </div>

                {/* Bulk Logistics Action Dropdown */}
                <div className="flex items-center gap-1.5 bg-white border border-[#EEAB59] rounded-lg px-2.5 py-1">
                  <Truck className="w-3.5 h-3.5 text-[#E67E00]" />
                  <select
                    value={selectedBulkLogistics}
                    onChange={(e) => {
                      setSelectedBulkLogistics(e.target.value);
                      handleBulkLogisticsChange(e.target.value as any);
                    }}
                    className="bg-transparent text-xs font-bold text-[#0E0E0E] focus:outline-none cursor-pointer"
                  >
                    <option value="">Courier Dispatch...</option>
                    <option value="Steadfast">Dispatch via Steadfast</option>
                    <option value="Pathao">Dispatch via Pathao</option>
                    <option value="RedX">Dispatch via RedX</option>
                    <option value="Paperfly">Dispatch via Paperfly</option>
                  </select>
                </div>

                {/* Bulk Print Button */}
                <button
                  onClick={handleBulkPrint}
                  className="px-3.5 py-1.5 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Bulk Print ({selectedRowIds.length})</span>
                </button>
              </div>
            </div>
          )}

          {/* Record Counter Info */}
          <div className="px-1 flex items-center justify-between text-xs font-medium text-[#545454]">
            <span>
              Showing {filteredRecords.length > 0 ? (currentPage - 1) * pageSize + 1 : 0} to {Math.min(currentPage * pageSize, filteredRecords.length)} of {filteredRecords.length} total orders
            </span>
            <div className="flex items-center gap-1.5 text-slate-500 font-semibold">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="bg-white border border-slate-200 rounded px-2 py-0.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#E67E00]"
              >
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>

          {/* DATA TABLE */}
          <div className="bg-white border border-[#EEAB59] rounded overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#E67E00] text-white font-bold text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-3 w-10">
                      <input
                        type="checkbox"
                        checked={isPageFullySelected}
                        onChange={handleSelectAllPaginated}
                        className="rounded border-[#EEEEEE] text-[#E67E00] focus:ring-[#E67E00] cursor-pointer"
                        title={isPageFullySelected ? "Deselect page" : "Select page"}
                      />
                    </th>
                    <th className="py-3 px-4">ORDER ID</th>
                    <th className="py-3 px-4">CUSTOMER</th>
                    <th className="py-3 px-4">PACKAGE ITEM</th>
                    <th className="py-3 px-4">RELIABILITY</th>
                    <th className="py-3 px-4">LOGISTICS</th>
                    <th className="py-3 px-4">STATUS</th>
                    <th className="py-3 px-4 text-center">MANAGE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EEEEEE] bg-white text-[#545454] font-medium">
                  {paginatedRecords.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-[#8F8F8F] font-bold">
                        No orders found matching this filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedRecords.map((row) => {
                      const isChecked = selectedRowIds.includes(row.id);
                      const firstLetter = row.customerName.charAt(0).toUpperCase();

                      return (
                        <tr 
                          key={row.id}
                          className={`hover:bg-[#FCF1E5]/50 transition-colors group ${
                            isChecked ? 'bg-[#FCF1E5]/30' : ''
                          }`}
                        >
                          <td className="py-3 px-3">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleRow(row.id)}
                              className="rounded border-[#EEEEEE] text-[#E67E00] focus:ring-[#E67E00] cursor-pointer"
                            />
                          </td>

                          <td className="py-3 px-4">
                            <div 
                              onClick={() => setActiveModalOrder(row)}
                              className="font-bold text-[#E67E00] hover:underline cursor-pointer"
                            >
                              {row.id}
                            </div>
                            <div className="text-[10px] text-[#8F8F8F] font-medium mt-0.5">
                              {row.dateStr}
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-[#FCF1E5] text-[#E67E00] font-bold text-[10px] flex items-center justify-center border border-[#EEAB59] shrink-0">
                                {firstLetter}
                              </div>
                              <div>
                                <div className="font-bold text-[#0E0E0E]">{row.customerName}</div>
                                <div className="text-[10px] text-[#545454] font-semibold">{row.customerPhone}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4 max-w-xs">
                            <div className="text-[#0E0E0E] font-semibold truncate" title={row.packageItem}>
                              {row.packageItem}
                            </div>
                            <div className="font-bold text-[#E67E00] text-xs mt-0.5">
                              ৳{row.price.toLocaleString()}
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 bg-[#ECFFE8] text-[#008F2F] font-bold text-[10px] rounded-full">
                              {row.reliability}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-[#EEEEEE] rounded text-xs font-semibold text-[#0E0E0E]">
                              <span>{row.logistics}</span>
                              <ChevronDown className="w-3 h-3 text-[#8F8F8F] ml-0.5" />
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#ECFFE8] text-[#008F2F] rounded-full text-[11px] font-bold">
                              <span>⏳</span>
                              <span>{row.status}</span>
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => triggerToast(`Invoice generated for ${row.id}`)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                title="Print Invoice"
                              >
                                <Printer className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleCopyId(row.id)}
                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                                title="Copy Order ID"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setActiveModalOrder(row)}
                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                title="View Order Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => setActiveModalOrder(row)}
                                className="p-1.5 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
                                title="Edit Order"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* TABLE PAGINATION FOOTER */}
            {filteredRecords.length > 0 && (
              <div className="bg-white border-t border-[#EEEEEE] p-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="text-slate-500 font-semibold">
                  Page <span className="font-bold text-[#0E0E0E]">{currentPage}</span> of <span className="font-bold text-[#0E0E0E]">{totalPages}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-3 py-1.5 border border-[#EEEEEE] rounded font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FCF1E5] transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                      .map((p, i, arr) => {
                        const prevVal = arr[i - 1];
                        const showEllipsis = prevVal && p - prevVal > 1;
                        return (
                          <React.Fragment key={p}>
                            {showEllipsis && <span className="px-1 text-slate-400 font-bold">...</span>}
                            <button
                              onClick={() => setCurrentPage(p)}
                              className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                                currentPage === p
                                  ? 'bg-[#E67E00] text-white shadow-2xs'
                                  : 'bg-white border border-[#EEEEEE] hover:border-[#EEAB59] text-slate-700'
                              }`}
                            >
                              {p}
                            </button>
                          </React.Fragment>
                        );
                      })}
                  </div>

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="px-3 py-1.5 border border-[#EEEEEE] rounded font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FCF1E5] transition-colors flex items-center gap-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* NOTE MODAL FOR ABANDONED ORDER */}
      {noteModalTarget && (
        <div className="fixed inset-0 z-50 bg-[#0E0E0E]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <form 
            onSubmit={handleAddNoteSubmit}
            className="bg-white border border-[#EEAB59] rounded p-6 max-w-md w-full shadow-lg space-y-4 animate-fadeIn"
          >
            <div className="flex items-center justify-between border-b border-[#EEEEEE] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#E67E00] tracking-wider block">Customer Note</span>
                <h3 className="font-bold text-base text-[#0E0E0E]">{noteModalTarget.customerName} ({noteModalTarget.phone})</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setNoteModalTarget(null)}
                className="p-1 text-[#8F8F8F] hover:text-[#0E0E0E]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {noteModalTarget.notes && noteModalTarget.notes.length > 0 && (
                <div className="space-y-1.5 max-h-36 overflow-y-auto p-2 bg-[#FCF1E5] rounded border border-[#EEAB59] text-xs">
                  {noteModalTarget.notes.map((n, i) => (
                    <div key={i} className="p-2 bg-white rounded border border-[#EEEEEE] text-[#545454] font-medium">
                      💬 {n}
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-[#0E0E0E] block mb-1">Add internal follow-up note</label>
                <textarea
                  required
                  rows={3}
                  value={noteInputText}
                  onChange={(e) => setNoteInputText(e.target.value)}
                  placeholder="e.g. Called customer, promised discount code for completion..."
                  className="w-full p-2.5 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] placeholder:text-[#8F8F8F] focus:outline-none focus:border-[#008F2F] focus:bg-[#ECFFE8]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#EEEEEE]">
              <button
                type="button"
                onClick={() => setNoteModalTarget(null)}
                className="px-4 py-2 border-[1.5px] border-[#E67E00] text-[#E67E00] bg-transparent hover:bg-[#FCF1E5] font-bold text-xs rounded-full"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded-full"
              >
                Save Note
              </button>
            </div>
          </form>
        </div>
      )}

      {/* VIEW / EDIT ORDER DETAIL MODAL */}
      {activeModalOrder && (
        <div className="fixed inset-0 z-50 bg-[#F8F9FA] overflow-y-auto p-4 md:p-6 text-[#0E0E0E] animate-fadeIn">
          <div className="max-w-7xl mx-auto space-y-4">
            {/* TOP BREADCRUMB AND HEADER ACTIONS */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#EEEEEE] pb-3">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[#8F8F8F] font-semibold mb-1">
                  <button 
                    onClick={() => setActiveModalOrder(null)} 
                    className="hover:text-[#E67E00] uppercase tracking-wider font-bold transition-colors"
                  >
                    ORDERS
                  </button>
                  <span>&gt;</span>
                  <span className="text-[#0E0E0E] uppercase tracking-wider font-bold">VIEW</span>
                </div>
                <h1 className="text-xl md:text-2xl font-black text-[#0E0E0E] tracking-tight">
                  View Order #{activeModalOrder.id}
                </h1>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Print */}
                <button
                  onClick={() => triggerToast(`Printing invoice for ${activeModalOrder.id}`)}
                  className="p-2 bg-white border border-[#EEEEEE] rounded hover:bg-[#FCF1E5] text-[#545454] transition-all"
                  title="Print Invoice"
                >
                  <Printer className="w-4 h-4" />
                </button>

                {/* Export / Document */}
                <button
                  onClick={() => triggerToast(`PDF document generated for ${activeModalOrder.id}`)}
                  className="p-2 bg-white border border-[#EEEEEE] rounded hover:bg-[#FCF1E5] text-[#545454] transition-all"
                  title="Download Summary"
                >
                  <FileText className="w-4 h-4" />
                </button>

                {/* Cyan Button IH */}
                <button
                  onClick={() => triggerToast(`Integration Hub synced for ${activeModalOrder.id}`)}
                  className="px-2.5 py-1.5 bg-[#00BCD4] hover:bg-[#00ACC1] text-white rounded text-xs font-bold tracking-wider transition-all"
                >
                  IH
                </button>

                {/* Select Courier Button */}
                <div className="relative">
                  <button
                    onClick={() => setIsCourierDropdownOpen(!isCourierDropdownOpen)}
                    className="px-4 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>SELECT COURIER</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  {isCourierDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-44 bg-white border border-[#EEAB59] rounded shadow-lg z-20 py-1 text-xs">
                      {['Steadfast', 'RedX', 'Paperfly', 'Pathao'].map((c) => (
                        <button
                          key={c}
                          onClick={() => {
                            setOrderRecords(prev => prev.map(o => o.id === activeModalOrder.id ? { ...o, logistics: c as any } : o));
                            setActiveModalOrder(prev => prev ? { ...prev, logistics: c as any } : null);
                            setIsCourierDropdownOpen(false);
                            triggerToast(`Courier updated to ${c}`);
                          }}
                          className={`w-full text-left px-3 py-2 font-medium hover:bg-[#FCF1E5] ${activeModalOrder.logistics === c ? 'text-[#E67E00] font-bold bg-[#FCF1E5]' : 'text-[#0E0E0E]'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="relative">
                  <button
                    onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                    className="px-3 py-1.5 bg-[#FFF8E1] border border-[#FFE082] text-[#B78103] rounded font-bold text-xs flex items-center gap-1.5 shadow-xs hover:bg-[#FFF3C4] transition-all"
                  >
                    <span>⏳</span>
                    <span>{activeModalOrder.status}</span>
                    <ChevronDown className="w-3 h-3 text-[#B78103]" />
                  </button>
                  {isStatusDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-40 bg-white border border-[#EEAB59] rounded shadow-lg z-20 py-1 text-xs">
                      {['Pending', 'Confirmed', 'Shipment Ready', 'In Transit', 'Delivered', 'On Hold', 'Cancelled', 'Returned', 'Follow-up'].map((st) => (
                        <button
                          key={st}
                          onClick={() => {
                            setOrderRecords(prev => prev.map(o => o.id === activeModalOrder.id ? { ...o, status: st as any } : o));
                            setActiveModalOrder(prev => prev ? { ...prev, status: st as any } : null);
                            setIsStatusDropdownOpen(false);
                            triggerToast(`Order status set to ${st}`);
                          }}
                          className={`w-full text-left px-3 py-2 font-medium hover:bg-[#FCF1E5] ${activeModalOrder.status === st ? 'text-[#E67E00] font-bold bg-[#FCF1E5]' : 'text-[#0E0E0E]'}`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => triggerToast(`Edit mode activated for ${activeModalOrder.id}`)}
                  className="px-4 py-2 bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold text-xs rounded transition-all"
                >
                  Edit
                </button>

                {/* New Order Button */}
                <button
                  onClick={() => {
                    setIsCreateModalOpen(true);
                  }}
                  className="px-4 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white font-bold text-xs rounded transition-all"
                >
                  New Order
                </button>

                {/* Exit / Close View Button */}
                <button
                  onClick={() => setActiveModalOrder(null)}
                  className="p-2 bg-white border border-[#EEEEEE] rounded hover:bg-[#FCF1E5] text-[#545454] transition-all ml-2"
                  title="Close View"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TWO COLUMN GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* LEFT COLUMN (3/4 width) */}
              <div className="lg:col-span-3 space-y-4">

                {/* ORDER SUMMARY CARD */}
                <div className="bg-white border border-[#EEEEEE] rounded shadow-xs overflow-hidden">
                  <div className="flex items-center justify-between bg-white px-4 py-3 border-b border-[#EEEEEE]">
                    <h2 className="font-extrabold text-xs text-[#0E0E0E] uppercase tracking-wider">
                      ORDER SUMMARY
                    </h2>
                    <button 
                      onClick={() => triggerToast("Edit Order Summary")}
                      className="p-1 bg-[#00BCD4] hover:bg-[#00ACC1] text-white rounded transition-colors"
                      title="Edit Order Summary"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* FINANCIAL TABLE */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#FAFAFA] border-b border-[#EEEEEE] text-[10px] font-extrabold text-[#545454] uppercase tracking-wider">
                          <th className="py-2.5 px-4">ORDER NUMBER</th>
                          <th className="py-2.5 px-4">CREATED AT</th>
                          <th className="py-2.5 px-4">DISCOUNT</th>
                          <th className="py-2.5 px-4">COUPON</th>
                          <th className="py-2.5 px-4">DELIVERY FEE</th>
                          <th className="py-2.5 px-4">GRAND TOTAL</th>
                          <th className="py-2.5 px-4">PAID</th>
                          <th className="py-2.5 px-4">DUE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-[#EEEEEE] text-xs font-bold text-[#0E0E0E]">
                          <td className="py-3 px-4">{activeModalOrder.id}</td>
                          <td className="py-3 px-4 font-medium text-[#545454]">{activeModalOrder.dateStr}</td>
                          <td className="py-3 px-4">0 TK</td>
                          <td className="py-3 px-4">0 TK</td>
                          <td className="py-3 px-4">0 TK</td>
                          <td className="py-3 px-4 font-black">{activeModalOrder.price} TK</td>
                          <td className="py-3 px-4">0 TK</td>
                          <td className="py-3 px-4 font-black text-[#0E0E0E]">{activeModalOrder.price} TK</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* PRODUCT ITEMS TABLE */}
                  <div className="overflow-x-auto border-t border-[#EEEEEE]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#FAFAFA] border-b border-[#EEEEEE] text-[10px] font-extrabold text-[#545454] uppercase tracking-wider">
                          <th className="py-2.5 px-4">PRODUCT NAME</th>
                          <th className="py-2.5 px-4">VARIANTS</th>
                          <th className="py-2.5 px-4">OPTION</th>
                          <th className="py-2.5 px-4">PRICE</th>
                          <th className="py-2.5 px-4">DISCOUNT</th>
                          <th className="py-2.5 px-4">QUANTITY</th>
                          <th className="py-2.5 px-4">TOTAL</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-xs font-medium text-[#0E0E0E]">
                          <td className="py-3 px-4 font-bold text-[#00BCD4] hover:underline cursor-pointer">
                            {activeModalOrder.packageItem}
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-1.5 py-0.5 bg-[#FFF3C4] text-[#B78103] rounded text-[10px] font-bold">N/A</span>
                          </td>
                          <td className="py-3 px-4 text-[#8F8F8F]">-</td>
                          <td className="py-3 px-4">{activeModalOrder.price}</td>
                          <td className="py-3 px-4">0</td>
                          <td className="py-3 px-4 font-bold">1</td>
                          <td className="py-3 px-4 font-extrabold">{activeModalOrder.price}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* CUSTOMER INTELLIGENCE / COURIER RATINGS CARD */}
                <div className="bg-white border border-[#EEEEEE] rounded shadow-xs p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-[#0E0E0E]">
                      {activeModalOrder.customerName}
                    </h3>
                    <span className="bg-[#3B82F6] text-white text-[10px] font-black px-1.5 py-0.5 rounded uppercase">NEW</span>
                  </div>

                  <div className="text-xs font-semibold text-[#545454] flex flex-wrap gap-4">
                    <span>Total Orders: <strong className="text-[#0E0E0E]">1</strong></span>
                    <span>Confirmed: <strong className="text-[#0E0E0E]">0</strong></span>
                    <span>Cancelled: <strong className="text-[#0E0E0E]">0</strong></span>
                    <span>Pending: <strong className="text-[#0E0E0E]">1</strong></span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#545454]">Success Rate:</span>
                    <div className="w-full h-2 bg-[#EEEEEE] rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 w-12 rounded-full"></div>
                    </div>
                  </div>

                  {/* THREE COURIER CARDS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                    {/* STEADFAST */}
                    <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-1.5">
                      <span className="font-extrabold text-xs text-[#0E0E0E] uppercase block">STEADFAST</span>
                      <div className="text-[10px] font-bold text-[#545454] flex justify-between">
                        <span>Confirmed: 0</span>
                        <span>Cancelled: 0</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-[#8F8F8F]">Success Rate:</span>
                        <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                          <div className="h-full bg-slate-300 w-0"></div>
                        </div>
                      </div>
                    </div>

                    {/* PATHAO */}
                    <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-1.5">
                      <span className="font-extrabold text-xs text-[#0E0E0E] uppercase block">PATHAO</span>
                      <div className="text-[10px] font-bold text-[#545454] flex justify-between">
                        <span>Confirmed: 0</span>
                        <span>Cancelled: 0</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-[#8F8F8F]">Success Rate:</span>
                        <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                          <div className="h-full bg-slate-300 w-0"></div>
                        </div>
                      </div>
                    </div>

                    {/* REDX */}
                    <div className="p-3 bg-[#FAFAFA] border border-[#EEEEEE] rounded space-y-1.5">
                      <span className="font-extrabold text-xs text-[#0E0E0E] uppercase block">REDX</span>
                      <div className="text-[10px] font-bold text-[#545454] flex justify-between">
                        <span>Confirmed: 0</span>
                        <span>Cancelled: 0</span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[9px] font-bold text-[#8F8F8F]">Success Rate:</span>
                        <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                          <div className="h-full bg-slate-300 w-0"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SYSTEM SUMMARY BOX */}
                  <div className="p-3 bg-white border border-[#EEEEEE] rounded space-y-2">
                    <span className="font-extrabold text-xs text-[#0E0E0E] uppercase block">SYSTEM SUMMARY</span>
                    <div className="text-xs font-medium text-[#545454] flex flex-wrap gap-4">
                      <span>Total Orders: <strong className="text-[#0E0E0E]">40</strong></span>
                      <span>Confirmed: <strong className="text-[#0E0E0E]">0</strong></span>
                      <span>Cancelled: <strong className="text-[#0E0E0E]">0</strong></span>
                    </div>
                    <div className="w-full h-1.5 bg-[#E0E0E0] rounded-full overflow-hidden">
                      <div className="h-full bg-slate-300 w-0"></div>
                    </div>
                  </div>
                </div>

                {/* SUMMARY TABLE CARD */}
                <div className="bg-white border border-[#EEEEEE] rounded shadow-xs overflow-hidden">
                  <div className="px-4 py-3 bg-white border-b border-[#EEEEEE]">
                    <h2 className="font-extrabold text-xs text-[#0E0E0E] uppercase tracking-wider">
                      SUMMARY
                    </h2>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-[#FAFAFA] border-b border-[#EEEEEE] text-[10px] font-extrabold text-[#545454] uppercase tracking-wider">
                          <th className="py-2.5 px-4">ORDER NUMBER</th>
                          <th className="py-2.5 px-4">NAME</th>
                          <th className="py-2.5 px-4">SOURCE</th>
                          <th className="py-2.5 px-4">STATUS</th>
                          <th className="py-2.5 px-4">TOTAL</th>
                          <th className="py-2.5 px-4">ORDER DATE</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="text-xs font-medium text-[#0E0E0E]">
                          <td className="py-3 px-4 font-bold">{activeModalOrder.id}</td>
                          <td className="py-3 px-4">{activeModalOrder.customerName}</td>
                          <td className="py-3 px-4 text-[#545454]">Website</td>
                          <td className="py-3 px-4 lowercase text-[#0E0E0E] font-medium">{activeModalOrder.status}</td>
                          <td className="py-3 px-4 font-bold">{activeModalOrder.price}</td>
                          <td className="py-3 px-4 text-[#545454]">{activeModalOrder.dateStr}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN (1/4 width) */}
              <div className="lg:col-span-1 space-y-4">

                {/* CUSTOMER INFORMATION CARD */}
                <div className="bg-white border border-[#EEEEEE] rounded shadow-xs overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#EEEEEE]">
                    <h2 className="font-extrabold text-xs text-[#0E0E0E] uppercase tracking-wider">
                      CUSTOMER INFORMATION
                    </h2>
                    <button 
                      onClick={() => triggerToast("Edit Customer Info")}
                      className="p-1 bg-[#00BCD4] hover:bg-[#00ACC1] text-white rounded transition-colors"
                      title="Edit Customer Information"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="p-4 space-y-3.5 text-xs">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#8F8F8F] uppercase block mb-0.5">NAME</span>
                      <p className="font-bold text-sm text-[#0E0E0E]">{activeModalOrder.customerName}</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold text-[#8F8F8F] uppercase block mb-0.5">PHONE</span>
                      <a 
                        href={`tel:${activeModalOrder.customerPhone}`}
                        className="font-bold text-xs text-[#00BCD4] hover:underline flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>{activeModalOrder.customerPhone}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </a>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold text-[#8F8F8F] uppercase block mb-0.5">EMAIL</span>
                      <p className="font-bold text-xs text-[#8F8F8F]">—</p>
                    </div>

                    <div>
                      <span className="text-[10px] font-extrabold text-[#8F8F8F] uppercase block mb-0.5">ADDRESS</span>
                      <p className="font-semibold text-xs text-[#0E0E0E]">123 Main Street, Central City</p>
                    </div>
                  </div>
                </div>

                {/* COMMENTS CARD */}
                <div className="bg-white border border-[#EEEEEE] rounded shadow-xs overflow-hidden min-h-[220px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#EEEEEE]">
                      <h2 className="font-extrabold text-xs text-[#0E0E0E] uppercase tracking-wider">
                        COMMENTS
                      </h2>
                      <button 
                        onClick={() => setIsAddingComment(!isAddingComment)}
                        className="px-2.5 py-1 bg-[#E67E00] hover:bg-[#CC7000] text-white font-extrabold text-[10px] rounded uppercase tracking-wider transition-all"
                      >
                        + ADD COMMENT
                      </button>
                    </div>

                    {/* Comments Input Form */}
                    {isAddingComment && (
                      <div className="p-3 border-b border-[#EEEEEE] bg-[#FAFAFA] space-y-2">
                        <textarea
                          rows={2}
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          placeholder="Type order comment..."
                          className="w-full p-2 border border-[#EEEEEE] rounded text-xs text-[#0E0E0E] focus:outline-none focus:border-[#E67E00] bg-white"
                        />
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => setIsAddingComment(false)}
                            className="px-2.5 py-1 text-[11px] font-bold text-[#8F8F8F] hover:text-[#0E0E0E]"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              if (!newCommentText.trim()) return;
                              setOrderComments(prev => ({
                                ...prev,
                                [activeModalOrder.id]: [...(prev[activeModalOrder.id] || []), newCommentText.trim()]
                              }));
                              setNewCommentText('');
                              setIsAddingComment(false);
                              triggerToast("Comment added!");
                            }}
                            className="px-3 py-1 bg-[#E67E00] text-white text-[11px] font-bold rounded"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Comments List / Empty State */}
                    <div className="p-4">
                      {(orderComments[activeModalOrder.id] && orderComments[activeModalOrder.id].length > 0) ? (
                        <div className="space-y-2">
                          {orderComments[activeModalOrder.id].map((cm, idx) => (
                            <div key={idx} className="p-2 bg-[#FAFAFA] border border-[#EEEEEE] rounded text-xs text-[#0E0E0E]">
                              <p>{cm}</p>
                              <span className="text-[9px] text-[#8F8F8F] block text-right mt-1">Just now</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center text-[#8F8F8F] space-y-2">
                          <div className="w-8 h-8 rounded-full border border-[#EEEEEE] flex items-center justify-center text-[#8F8F8F]">
                            <X className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-semibold">No comments</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW ORDER MODAL (+ New Order) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0E0E0E]/50 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          <div className="bg-white border border-[#EEAB59] rounded-xl max-w-4xl w-full shadow-2xl overflow-hidden animate-fadeIn my-auto flex flex-col max-h-[92vh]">
            {/* Modal Header - Centered like Add Category form */}
            <div className="p-6 pb-3 text-center relative border-b border-[#EEEEEE] shrink-0">
              <button 
                type="button" 
                onClick={() => setIsCreateModalOpen(false)}
                className="absolute right-4 top-4 p-1.5 text-[#8F8F8F] hover:text-[#0E0E0E] rounded-full hover:bg-[#F3F4F6] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-[#0E0E0E] tracking-tight">
                Add Order
              </h2>
              <p className="text-xs font-bold text-[#FF0000] mt-1">
                (Please fill in required customer and product details)
              </p>
            </div>

            {/* Modal Body / Form */}
            <form 
              onSubmit={handleCreateNewOrderSubmit}
              className="p-6 space-y-6 overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT COLUMN: Customer Information */}
                <div className="space-y-4">
                  <div className="border-b border-[#EEEEEE] pb-2">
                    <h3 className="font-bold text-sm text-[#0E0E0E] flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#E67E00] rounded-full inline-block"></span>
                      Customer Information
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                      Customer Name<span className="text-[#FF0000]">*</span>:
                    </label>
                    <input
                      type="text"
                      required
                      value={createCustomerName}
                      onChange={(e) => setCreateCustomerName(e.target.value)}
                      placeholder="Customer Name"
                      className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                      Mobile Number<span className="text-[#FF0000]">*</span>:
                    </label>
                    <input
                      type="text"
                      required
                      value={createCustomerPhone}
                      onChange={(e) => setCreateCustomerPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Status:
                      </label>
                      <select
                        value={createOrderStatus}
                        onChange={(e) => setCreateOrderStatus(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipment Ready">Shipment Ready</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                        Delivery Zone:
                      </label>
                      <select
                        value={createDeliveryZone}
                        onChange={(e) => {
                          const zone = e.target.value;
                          setCreateDeliveryZone(zone);
                          if (zone === 'Inside Dhaka') setCreateDeliveryFee(60);
                          else if (zone === 'Outside Dhaka') setCreateDeliveryFee(100);
                          else setCreateDeliveryFee(130);
                        }}
                        className="w-full px-3 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                      >
                        <option value="Inside Dhaka">Inside Dhaka (৳60)</option>
                        <option value="Outside Dhaka">Outside Dhaka (৳100)</option>
                        <option value="Remote Area">Remote Area (৳130)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                      Courier Service:
                    </label>
                    <select
                      value={createCourier}
                      onChange={(e) => setCreateCourier(e.target.value)}
                      className="w-full px-3.5 py-2 bg-white border border-[#EEEEEE] rounded text-xs font-bold text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                    >
                      <option value="Steadfast">Steadfast</option>
                      <option value="RedX">RedX</option>
                      <option value="Pathao">Pathao</option>
                      <option value="Paperfly">Paperfly</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                      Delivery Address:
                    </label>
                    <textarea
                      rows={2}
                      value={createAddress}
                      onChange={(e) => setCreateAddress(e.target.value)}
                      placeholder="Enter full delivery address..."
                      className="w-full p-3 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0E0E0E] mb-1">
                      Order Note:
                    </label>
                    <textarea
                      rows={2}
                      value={createOrderNote}
                      onChange={(e) => setCreateOrderNote(e.target.value)}
                      placeholder="Enter any special instruction..."
                      className="w-full p-3 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] focus:border-[#E67E00] focus:bg-[#FCF1E5]/20 focus:outline-none"
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN: Product Selection & Calculations */}
                <div className="space-y-4">
                  <div className="border-b border-[#EEEEEE] pb-2">
                    <h3 className="font-bold text-sm text-[#0E0E0E] flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-[#E67E00] rounded-full inline-block"></span>
                      Products & Summary
                    </h3>
                  </div>

                  {/* Products Selection Box */}
                  <div className="border border-[#EEAB59] bg-[#FCF1E5]/15 rounded-lg p-3.5 space-y-3">
                    <label className="block text-xs font-bold text-[#0E0E0E]">
                      Select Products<span className="text-[#FF0000]">*</span>:
                    </label>

                    {/* Search Bar */}
                    <div className="relative">
                      <Search className="w-4 h-4 text-[#8F8F8F] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Search products by name or SKU..."
                        className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#EEEEEE] rounded text-xs font-medium text-[#0E0E0E] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#E67E00]"
                      />
                    </div>

                    {/* Product Catalog Table */}
                    <div className="bg-white border border-[#EEEEEE] rounded max-h-36 overflow-y-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="bg-[#FAFAFA] border-b border-[#EEEEEE] text-[10px] font-extrabold text-[#545454] uppercase tracking-wider sticky top-0 z-10">
                            <th className="py-1.5 px-2.5">PRODUCT</th>
                            <th className="py-1.5 px-2.5 text-center">STOCK</th>
                            <th className="py-1.5 px-2.5">PRICE</th>
                            <th className="py-1.5 px-2.5 text-right">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCatalog.map((prod) => (
                            <tr key={prod.id} className="border-b border-[#EEEEEE] hover:bg-[#FAFAFA] transition-colors">
                              <td className="py-1.5 px-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="p-1 bg-[#FAFAFA] border border-[#EEEEEE] rounded">
                                    <Package className="w-3 h-3 text-[#545454]" />
                                  </div>
                                  <div>
                                    <p className="font-bold text-[#0E0E0E] text-[11px]">{prod.name}</p>
                                    <span className="text-[9px] text-[#8F8F8F] block">SKU: {prod.sku}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-1.5 px-2.5 text-center">
                                <span className="px-2 py-0.5 bg-[#F3F4F6] text-[#545454] rounded-full text-[9px] font-bold">
                                  {prod.stock}
                                </span>
                              </td>
                              <td className="py-1.5 px-2.5 font-extrabold text-[#0E0E0E] text-[11px]">
                                ৳{prod.price}
                              </td>
                              <td className="py-1.5 px-2.5 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleAddProductToOrder(prod)}
                                  className="px-2 py-0.5 bg-[#FCF1E5] text-[#E67E00] hover:bg-[#E67E00] hover:text-white text-[11px] font-bold rounded inline-flex items-center gap-1 transition-all"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>Add</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Selected Items */}
                    <div>
                      <span className="text-xs font-bold text-[#0E0E0E] block mb-1.5">
                        Selected Items ({selectedProductItems.length}):
                      </span>

                      {selectedProductItems.length === 0 ? (
                        <div className="p-2.5 text-center text-xs text-[#8F8F8F] border border-dashed border-[#EEAB59]/50 rounded bg-white">
                          No items added yet. Search and add products above.
                        </div>
                      ) : (
                        <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                          {selectedProductItems.map((item) => (
                            <div 
                              key={item.id} 
                              className="p-2 bg-white border border-[#EEEEEE] rounded flex items-center justify-between gap-2 text-xs"
                            >
                              <div className="flex-1 min-w-0">
                                <p className="font-bold text-[#0E0E0E] truncate text-[11px]">{item.name}</p>
                                <span className="text-[10px] text-[#8F8F8F]">৳{item.price} x {item.qty}</span>
                              </div>

                              <div className="flex items-center gap-1 bg-white border border-[#EEEEEE] rounded p-0.5">
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQty(item.id, -1)}
                                  className="p-0.5 text-[#545454] hover:text-[#0E0E0E] hover:bg-[#F3F4F6] rounded"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-5 text-center font-bold text-xs">{item.qty}</span>
                                <button
                                  type="button"
                                  onClick={() => handleUpdateQty(item.id, 1)}
                                  className="p-0.5 text-[#545454] hover:text-[#0E0E0E] hover:bg-[#F3F4F6] rounded"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-extrabold text-[#0E0E0E] w-14 text-right text-[11px]">
                                ৳{item.price * item.qty}
                              </span>

                              <button
                                type="button"
                                onClick={() => handleRemoveProductItem(item.id)}
                                className="p-1 text-[#EF4444] hover:bg-[#FEE2E2] rounded transition-colors"
                                title="Remove Item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Calculations Bar */}
                  <div className="grid grid-cols-3 gap-3 bg-[#FCF1E5]/30 border border-[#EEAB59] p-3 rounded-lg text-center items-center">
                    <div>
                      <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Delivery Fee:</label>
                      <input
                        type="number"
                        value={createDeliveryFee}
                        onChange={(e) => setCreateDeliveryFee(Number(e.target.value))}
                        className="w-full px-2 py-1 bg-white border border-[#EEEEEE] rounded font-bold text-xs text-[#0E0E0E] text-center focus:outline-none focus:border-[#E67E00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Discount:</label>
                      <input
                        type="number"
                        value={createDiscount}
                        onChange={(e) => setCreateDiscount(Number(e.target.value))}
                        className="w-full px-2 py-1 bg-white border border-[#EEEEEE] rounded font-bold text-xs text-[#0E0E0E] text-center focus:outline-none focus:border-[#E67E00]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#0E0E0E] mb-1">Grand Total:</label>
                      <span className="text-xl font-black text-[#E67E00] block">৳{grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Centered Action Buttons (matching Category Add Form) */}
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-[#EEEEEE]">
                <button 
                  type="button" 
                  onClick={() => setIsCreateModalOpen(false)} 
                  className="px-6 py-2 bg-transparent border-1.5 border-[#E67E00] text-[#E67E00] hover:bg-[#FCF1E5] text-xs font-semibold rounded-full transition-all"
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-semibold uppercase rounded-full shadow-md transition-all"
                >
                  ADD ORDER
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK PRINT INVOICES MODAL */}
      {isBulkPrintModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0E0E0E]/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-[#E67E00] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl animate-fadeIn space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEEEEE]">
              <div className="flex items-center gap-2">
                <Printer className="w-5 h-5 text-[#E67E00]" />
                <h3 className="font-bold text-base text-[#0E0E0E]">
                  Bulk Print Invoices ({selectedRowIds.length} Orders)
                </h3>
              </div>
              <button 
                onClick={() => setIsBulkPrintModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {orderRecords
                .filter(rec => selectedRowIds.includes(rec.id))
                .map((order, idx) => (
                  <div 
                    key={order.id} 
                    className="border border-[#EEAB59] rounded-lg p-3 bg-[#FCF1E5]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#E67E00]">{order.id}</span>
                        <span className="text-[10px] bg-[#ECFFE8] text-[#008F2F] font-bold px-2 py-0.2 rounded-full">{order.status}</span>
                      </div>
                      <div className="text-xs font-bold text-[#0E0E0E] mt-0.5">{order.customerName} ({order.customerPhone})</div>
                      <div className="text-[11px] text-slate-600 truncate max-w-sm">{order.packageItem}</div>
                    </div>
                    <div className="text-right sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EEEEEE]">
                      <div className="text-sm font-black text-[#E67E00]">৳{order.price.toLocaleString()}</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{order.logistics}</div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#EEEEEE]">
              <div className="text-xs text-slate-500 font-semibold">
                Ready to generate batch invoices for <span className="font-bold text-[#0E0E0E]">{selectedRowIds.length}</span> order(s)
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBulkPrintModalOpen(false)}
                  className="px-4 py-2 border border-[#E67E00] text-[#E67E00] hover:bg-[#FCF1E5] text-xs font-bold rounded-full transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    window.print();
                    triggerToast(`Printing ${selectedRowIds.length} invoices...`);
                    setIsBulkPrintModalOpen(false);
                    setSelectedRowIds([]);
                  }}
                  className="px-6 py-2 bg-[#E67E00] hover:bg-[#CC7000] text-white text-xs font-bold rounded-full shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print All Invoices</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
