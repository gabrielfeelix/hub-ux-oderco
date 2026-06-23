import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  FileText, 
  MoreVertical, 
  CheckCircle, 
  Send, 
  Clock, 
  AlertTriangle, 
  XCircle,
  Eye,
  Plus,
  Edit,
  History,
  Power,
  Trash2,
  AlertCircle,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AddCreditsModal } from './AddCreditsModal';
import { ConfirmModal } from './ConfirmModal';
import { ExportModal } from './ExportModal';
import { Toast } from './Toast';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Mock Data
const INITIAL_CLIENTS = [
  {
    id: 12,
    name: "TechSolutions Ltda",
    credits: 120,
    document: "12.345.678/0001-90",
    envelopes: 15,
    lastConsult: "10 jan, 2024 - 09:15",
    status: "active"
  },
  {
    id: 13,
    name: "Imobiliária Futura",
    credits: 45,
    document: "98.765.432/0001-10",
    envelopes: 8,
    lastConsult: "12 fev, 2024 - 14:30",
    status: "active"
  },
  {
    id: 14,
    name: "Construtora Horizonte",
    credits: 300,
    document: "11.222.333/0001-44",
    envelopes: 42,
    lastConsult: "05 mar, 2024 - 11:00",
    status: "active"
  },
  {
    id: 15,
    name: "Advocacia Silva & Associados",
    credits: 80,
    document: "44.555.666/0001-77",
    envelopes: 25,
    lastConsult: "20 abr, 2024 - 16:45",
    status: "active"
  },
  {
    id: 16,
    name: "Consultoria Financeira Elite",
    credits: 15,
    document: "77.888.999/0001-22",
    envelopes: 3,
    lastConsult: "15 mai, 2024 - 10:20",
    status: "active"
  },
  {
    id: 17,
    name: "StartUp Inovação",
    credits: 200,
    document: "55.444.333/0001-88",
    envelopes: 60,
    lastConsult: "01 jun, 2024 - 13:10",
    status: "active"
  }
];

interface Client {
  id: number;
  name: string;
  credits: number;
  document: string;
  envelopes: number;
  lastConsult: string;
  status: string;
}

export function ClientManagement() {
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState<{
    status: string[];
    creditsMin: string;
    creditsMax: string;
    envelopesMin: string;
    envelopesMax: string;
  }>({
    status: [],
    creditsMin: '',
    creditsMax: '',
    envelopesMin: '',
    envelopesMax: ''
  });
  
  // Temp filter state for the popover (applied only on "Apply")
  const [tempFilters, setTempFilters] = useState(filterCriteria);

  // Sync temp filters when opening
  useEffect(() => {
    if (isFilterOpen) {
      setTempFilters(filterCriteria);
    }
  }, [isFilterOpen, filterCriteria]);

  // Target client for single actions (Add Credits, etc.)
  const [targetClient, setTargetClient] = useState<Client | null>(null);

  const [isAddCreditsOpen, setIsAddCreditsOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  // Action Modal State
  const [actionModal, setActionModal] = useState<{ 
    type: 'delete-client' | 'deactivate-client' | null, 
    client: Client | null, // If null, it's a bulk action on selectedClients
    isBulk: boolean 
  }>({ type: null, client: null, isBulk: false });
  
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuIndex(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter Logic
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      // Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = client.name.toLowerCase().includes(query);
        const matchesDoc = client.document.includes(query);
        const matchesId = client.id.toString().includes(query);
        if (!matchesName && !matchesDoc && !matchesId) return false;
      }

      // Filter Criteria
      if (filterCriteria.status.length > 0 && !filterCriteria.status.includes(client.status)) return false;
      
      if (filterCriteria.creditsMin && client.credits < Number(filterCriteria.creditsMin)) return false;
      if (filterCriteria.creditsMax && client.credits > Number(filterCriteria.creditsMax)) return false;
      
      if (filterCriteria.envelopesMin && client.envelopes < Number(filterCriteria.envelopesMin)) return false;
      if (filterCriteria.envelopesMax && client.envelopes > Number(filterCriteria.envelopesMax)) return false;

      return true;
    });
  }, [clients, searchQuery, filterCriteria]);

  const hasActiveFilters = useMemo(() => {
    return (
      filterCriteria.status.length > 0 ||
      filterCriteria.creditsMin !== '' ||
      filterCriteria.creditsMax !== '' ||
      filterCriteria.envelopesMin !== '' ||
      filterCriteria.envelopesMax !== ''
    );
  }, [filterCriteria]);

  const handleAddCredits = (amount: number) => {
    setIsAddCreditsOpen(false);
    
    // Determine if bulk or single
    const isBulk = !targetClient && selectedClients.length > 0;
    const count = isBulk ? selectedClients.length : 1;
    const targetName = targetClient ? targetClient.name : `${count} clientes`;

    // Update state (simulation)
    if (isBulk) {
       // We need to map selected INDEXES (from the filtered view if we wanted to be strict, but usually selection is global or index based)
       // Here selectedClients stores INDEXES of the DISPLAYED list (filteredClients) or IDs?
       // Currently the code uses indexes of the rendered list. 
       // CRITICAL FIX: The current toggle logic uses INDEX of the map.
       // Since we are filtering, indexes change. We should switch to using IDs for robust selection.
       // Let's assume for this mock we update the toggle logic first to use IDs if possible, 
       // BUT to minimize refactoring risk in this specific turn, let's just apply to the clients that matched the selection indexes
       // WAIT: If I filter, the indexes 0, 1, 2 refer to different clients.
       // I MUST refactor selection to use IDs to be correct when filtering.
       
       // For now, let's keep it simple: If filtering is active, bulk actions might act on the wrong items if using indexes.
       // I will switch selection to use IDs below in the JSX map.
    } else if (targetClient) {
       setClients(prev => prev.map(c => c.id === targetClient.id ? { ...c, credits: c.credits + amount } : c));
    }

    // Since I'm not doing full ID refactor in this block logic without changing the JSX first, 
    // I will do the ID refactor in the JSX return part and update handlers accordingly.
    
    // Let's implement the state update assuming I switched to IDs:
    if (isBulk) {
      setClients(prev => prev.map(c => 
        selectedClients.includes(c.id) ? { ...c, credits: c.credits + amount } : c
      ));
      setSelectedClients([]);
    }

    setToastMessage(`${amount} créditos foram adicionados para ${targetName} com sucesso!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setTargetClient(null);
  };

  const handleActionClick = (type: 'delete-client' | 'deactivate-client', client: Client) => {
    setActionModal({ type, client, isBulk: false });
    setOpenMenuIndex(null);
  };

  const handleBulkActionClick = (type: 'delete-client' | 'deactivate-client') => {
    setActionModal({ type, client: null, isBulk: true });
  };

  const confirmAction = () => {
    if (!actionModal.type) return;

    setIsActionLoading(true);

    setTimeout(() => {
      if (actionModal.isBulk) {
        // Bulk Action Logic (Using IDs now)
        if (actionModal.type === 'delete-client') {
          setClients(prev => prev.filter(c => !selectedClients.includes(c.id)));
          setToastMessage(`${selectedClients.length} clientes excluídos com sucesso!`);
        } else if (actionModal.type === 'deactivate-client') {
          setClients(prev => prev.map(c => 
            selectedClients.includes(c.id) ? { ...c, status: 'inactive' } : c
          ));
          setToastMessage(`${selectedClients.length} clientes desativados com sucesso!`);
        }
        setSelectedClients([]); // Clear selection
      } else if (actionModal.client) {
        // Single Action Logic
        if (actionModal.type === 'delete-client') {
          setClients(prev => prev.filter(c => c.id !== actionModal.client!.id));
          setToastMessage(`Cliente ${actionModal.client!.name} excluído com sucesso!`);
        } else if (actionModal.type === 'deactivate-client') {
          setClients(prev => prev.map(c => 
            c.id === actionModal.client!.id 
              ? { ...c, status: 'inactive' } 
              : c
          ));
          setToastMessage(`Cliente ${actionModal.client!.name} desativado com sucesso!`);
        }
      }

      setIsActionLoading(false);
      setActionModal({ type: null, client: null, isBulk: false });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const handleExport = (format: 'pdf' | 'csv' | 'excel', type: 'complete' | 'custom', fields?: string[]) => {
    setIsExportLoading(true);
    setTimeout(() => {
      setIsExportLoading(false);
      setIsExportOpen(false);
      const formatLabel = format.toUpperCase();
      const typeLabel = type === 'complete' ? 'Completo' : 'Personalizado';
      setToastMessage(`Relatório ${formatLabel} (${typeLabel}) exportado com sucesso!`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 2000);
  };

  // Switch to ID based selection for safety with filters
  const toggleSelectAll = () => {
    // If all currently visible filtered clients are selected, deselect all (visible)
    // Actually, "Select All" usually selects all visible items.
    const allVisibleIds = filteredClients.map(c => c.id);
    const allVisibleSelected = allVisibleIds.every(id => selectedClients.includes(id));
    
    if (allVisibleSelected) {
      // Deselect visible
      setSelectedClients(prev => prev.filter(id => !allVisibleIds.includes(id)));
    } else {
      // Select all visible (union)
      const newSelection = new Set([...selectedClients, ...allVisibleIds]);
      setSelectedClients(Array.from(newSelection));
    }
  };

  const toggleSelect = (id: number) => {
    if (selectedClients.includes(id)) {
      setSelectedClients(selectedClients.filter(i => i !== id));
    } else {
      setSelectedClients([...selectedClients, id]);
    }
  };

  // Helper to check if row is selected
  const isSelected = (id: number) => selectedClients.includes(id);

  // Helper for "Select All" checkbox state
  const isAllVisibleSelected = filteredClients.length > 0 && filteredClients.every(c => selectedClients.includes(c.id));
  const isSomeVisibleSelected = filteredClients.some(c => selectedClients.includes(c.id));

  // KPI Data matching Dashboard style
  const kpiData = [
    { label: 'Assinados', value: 475, icon: <CheckCircle className="w-6 h-6" />, iconBg: 'bg-[#e8f3ee]', iconColor: 'text-[#177B4C]' },
    { label: 'Enviados', value: 36, icon: <Send className="w-6 h-6" />, iconBg: 'bg-[#e7f1ff]', iconColor: 'text-[#0C64E6]' },
    { label: 'Expira em Breve', value: 31, icon: <Clock className="w-6 h-6" />, iconBg: 'bg-[#fffaeb]', iconColor: 'text-[#E8BB34]' },
    { label: 'Expirados', value: 98, icon: <AlertCircle className="w-6 h-6" />, iconBg: 'bg-[#fcebec]', iconColor: 'text-[#C8303F]' },
    { label: 'Cancelados', value: 8, icon: <XCircle className="w-6 h-6" />, iconBg: 'bg-[#edeeee]', iconColor: 'text-[#42494F]' },
  ];

  return (
    <div className="flex flex-col gap-8 w-full max-w-[1600px] mx-auto animate-in fade-in duration-500 pb-24 relative">
      
      {/* Page Header - Matched Dashboard */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-gray-900 font-[Lufga,sans-serif] dark:text-white">Gestão de Clientes</h1>
        <p className="text-gray-500 dark:text-gray-400">Acompanhe abaixo os clientes e seus créditos:</p>
      </div>

      {/* Stats Cards Row - Matched Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpiData.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4 transition-transform hover:-translate-y-1">
             <div className={cn("p-3 rounded-full shrink-0", stat.iconBg, stat.iconColor)}>
               {stat.icon}
             </div>
             <div className="flex flex-col">
               <span className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</span>
               <span className="text-2xl font-bold text-gray-900 font-[Lufga,sans-serif] dark:text-white">{stat.value}</span>
             </div>
          </div>
        ))}
      </div>

      {/* Controls Row - Matched Dashboard */}
      <div className="flex items-center gap-4">
        <div className="bg-[#f5f4f7] dark:bg-gray-800 rounded-2xl flex items-center px-4 py-3 flex-1 max-w-sm">
           <Search className="text-gray-400 w-5 h-5 mr-3" />
           <input 
             type="text" 
             placeholder="Pesquisar" 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="bg-transparent border-none outline-none text-gray-600 w-full placeholder-gray-400 dark:text-gray-200"
           />
           {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                <X size={16} />
              </button>
           )}
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "p-4 rounded-2xl border-2 transition-colors flex items-center justify-center relative",
              isFilterOpen || hasActiveFilters 
                ? "border-[#8925e2] bg-purple-50 text-[#8925e2] dark:bg-purple-900/20"
                : "border-[#8925e2] text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/30"
            )}
          >
             <Filter className="w-5 h-5" />
             {hasActiveFilters && (
               <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-900">
                 !
               </div>
             )}
          </button>
          
          {/* Filter Popover */}
          {isFilterOpen && (
             <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg dark:text-white">Filtrar Clientes</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-4">
                   {/* Status */}
                   <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                      <div className="flex flex-col gap-2">
                        {[
                          { value: 'active', label: 'Ativo' }, 
                          { value: 'inactive', label: 'Inativo' }
                        ].map(status => (
                          <label key={status.value} className="flex items-center gap-2 cursor-pointer group">
                             <div className={cn(
                                "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                tempFilters.status.includes(status.value) 
                                  ? "bg-[#8925e2] border-[#8925e2]" 
                                  : "border-gray-300 bg-white group-hover:border-[#8925e2]"
                             )}>
                                {tempFilters.status.includes(status.value) && <Check size={12} className="text-white" />}
                             </div>
                             <input 
                               type="checkbox" 
                               className="hidden"
                               checked={tempFilters.status.includes(status.value)}
                               onChange={() => {
                                 if (tempFilters.status.includes(status.value)) {
                                   setTempFilters({...tempFilters, status: tempFilters.status.filter(s => s !== status.value)});
                                 } else {
                                   setTempFilters({...tempFilters, status: [...tempFilters.status, status.value]});
                                 }
                               }}
                             />
                             <span className="text-sm text-gray-600 dark:text-gray-400">{status.label}</span>
                          </label>
                        ))}
                      </div>
                   </div>

                   {/* Credits */}
                   <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Créditos</label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="Min"
                          value={tempFilters.creditsMin}
                          onChange={(e) => setTempFilters({...tempFilters, creditsMin: e.target.value})}
                          className="bg-[#f5f4f7] dark:bg-gray-700 rounded-xl px-3 py-2.5 w-full text-xs outline-none text-gray-700 dark:text-gray-200"
                        />
                        <span className="text-gray-400 self-center">-</span>
                         <input 
                          type="number" 
                          placeholder="Max"
                          value={tempFilters.creditsMax}
                          onChange={(e) => setTempFilters({...tempFilters, creditsMax: e.target.value})}
                          className="bg-[#f5f4f7] dark:bg-gray-700 rounded-xl px-3 py-2.5 w-full text-xs outline-none text-gray-700 dark:text-gray-200"
                        />
                      </div>
                   </div>

                   {/* Envelopes */}
                   <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Envelopes</label>
                      <div className="flex gap-2">
                        <input 
                          type="number" 
                          placeholder="Min"
                          value={tempFilters.envelopesMin}
                          onChange={(e) => setTempFilters({...tempFilters, envelopesMin: e.target.value})}
                          className="bg-[#f5f4f7] dark:bg-gray-700 rounded-xl px-3 py-2.5 w-full text-xs outline-none text-gray-700 dark:text-gray-200"
                        />
                        <span className="text-gray-400 self-center">-</span>
                         <input 
                          type="number" 
                          placeholder="Max"
                          value={tempFilters.envelopesMax}
                          onChange={(e) => setTempFilters({...tempFilters, envelopesMax: e.target.value})}
                          className="bg-[#f5f4f7] dark:bg-gray-700 rounded-xl px-3 py-2.5 w-full text-xs outline-none text-gray-700 dark:text-gray-200"
                        />
                      </div>
                   </div>

                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-2">
                   <button 
                     onClick={() => {
                        const cleared = { status: [], creditsMin: '', creditsMax: '', envelopesMin: '', envelopesMax: '' };
                        setTempFilters(cleared);
                        setFilterCriteria(cleared);
                     }}
                     className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                   >
                     Limpar
                   </button>
                   <button 
                     onClick={() => {
                       setFilterCriteria(tempFilters);
                       setIsFilterOpen(false);
                     }}
                     className="px-4 py-2 bg-[#8925e2] text-white rounded-xl text-sm font-bold hover:bg-[#701db0] transition-colors"
                   >
                     Aplicar Filtros
                   </button>
                </div>
             </div>
          )}
        </div>
        
        <button 
          onClick={() => setIsExportOpen(true)}
          className="p-4 rounded-2xl border-2 border-[#8925e2] bg-white text-[#8925e2] hover:bg-purple-50 transition-colors dark:bg-gray-800 dark:hover:bg-purple-900/30"
        >
           <FileText className="w-5 h-5" />
        </button>
      </div>

      {/* Table - Matched Dashboard */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-visible border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-[#f5eafe] dark:bg-purple-900/20">
              <tr className="text-left">
                <th className="p-4 w-12 text-center">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer w-4 h-4"
                    checked={isAllVisibleSelected}
                    ref={input => {
                      if (input) input.indeterminate = isSomeVisibleSelected && !isAllVisibleSelected;
                    }}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4 text-gray-500 font-normal dark:text-gray-400">#</th>
                <th className="p-4 text-gray-700 font-bold font-[Lufga,sans-serif] dark:text-gray-200">Nome</th>
                <th className="p-4 text-gray-700 font-bold font-[Lufga,sans-serif] dark:text-gray-200">Créditos Disponíveis</th>
                <th className="p-4 text-gray-700 font-bold font-[Lufga,sans-serif] dark:text-gray-200">Documento</th>
                <th className="p-4 text-gray-700 font-bold font-[Lufga,sans-serif] dark:text-gray-200">Qtdd. Envelopes</th>
                <th className="p-4 text-gray-700 font-bold font-[Lufga,sans-serif] dark:text-gray-200">Última Consulta</th>
                <th className="p-4 text-gray-700 font-bold font-[Lufga,sans-serif] dark:text-gray-200">Status</th>
                <th className="p-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500 dark:text-gray-400">
                    Nenhum cliente encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredClients.map((client, index) => (
                  <tr 
                    key={client.id} 
                    className={cn(
                      "transition-colors group relative",
                      client.status === 'inactive' ? "bg-gray-50/50 dark:bg-gray-800/50" : "hover:bg-gray-50 dark:hover:bg-gray-700/50",
                      isSelected(client.id) && "bg-purple-50/30 dark:bg-purple-900/10"
                    )}
                  >
                    <td className="p-4 text-center">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer w-4 h-4"
                        checked={isSelected(client.id)}
                        onChange={() => toggleSelect(client.id)}
                      />
                    </td>
                    <td className="p-4 text-gray-500 dark:text-gray-400">{client.id}</td>
                    <td className="p-4 text-gray-700 dark:text-gray-200 font-bold flex items-center gap-2">
                      {client.name}
                      {client.status === 'inactive' && (
                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-400">Inativo</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-500 text-sm dark:text-gray-400">{client.credits}</td>
                    <td className="p-4 text-gray-500 text-sm dark:text-gray-400 font-mono">{client.document}</td>
                    <td className="p-4 text-gray-500 text-sm dark:text-gray-400">{client.envelopes}</td>
                    <td className="p-4 text-gray-500 text-sm dark:text-gray-400">{client.lastConsult}</td>
                    <td className="p-4">
                      {client.status === 'active' ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-full w-fit text-xs font-bold uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            Ativo
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full w-fit text-xs font-bold uppercase tracking-wide">
                            <span className="w-2 h-2 rounded-full bg-gray-400" />
                            Inativo
                        </div>
                      )}
                    </td>
                    <td className="p-4 relative text-center">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuIndex(openMenuIndex === index ? null : index);
                        }}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {/* Actions Dropdown */}
                      {openMenuIndex === index && (
                        <div 
                          ref={menuRef}
                          className="absolute right-8 top-8 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right text-left"
                        >
                          <div className="p-1.5 flex flex-col gap-0.5">
                            <DropdownItem icon={<Eye size={16} />} label="Ver detalhes" />
                            <DropdownItem 
                                icon={<Plus size={16} />} 
                                label="Adicionar créditos" 
                                onClick={() => {
                                  setTargetClient(client);
                                  setIsAddCreditsOpen(true);
                                  setOpenMenuIndex(null);
                                }}
                            />
                            <DropdownItem icon={<Edit size={16} />} label="Editar cliente" />
                            <DropdownItem icon={<History size={16} />} label="Ver histórico completo" />
                            <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                            
                            {client.status === 'active' ? (
                              <DropdownItem 
                                icon={<Power size={16} />} 
                                label="Desativar cliente" 
                                className="text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20" 
                                onClick={() => handleActionClick('deactivate-client', client)}
                              />
                            ) : (
                              <DropdownItem 
                                icon={<CheckCircle size={16} />} 
                                label="Reativar cliente" 
                                className="text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20" 
                                onClick={() => {
                                    // Simplified toggle back to active
                                    setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: 'active' } : c));
                                    setOpenMenuIndex(null);
                                    setToastMessage(`Cliente ${client.name} reativado com sucesso!`);
                                    setShowToast(true);
                                    setTimeout(() => setShowToast(false), 3000);
                                }}
                              />
                            )}
                            
                            <DropdownItem 
                              icon={<Trash2 size={16} />} 
                              label="Excluir cliente" 
                              className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" 
                              onClick={() => handleActionClick('delete-client', client)}
                            />
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedClients.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#212529] dark:bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-10 fade-in duration-300 z-40 border border-gray-700">
          <div className="flex items-center gap-3 pr-6 border-r border-gray-600">
            <span className="bg-[#8925e2] w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
              {selectedClients.length}
            </span>
            <span className="font-medium text-sm">selecionados</span>
          </div>
          
          <div className="flex items-center gap-2">
             <button 
               onClick={() => {
                 setTargetClient(null); // Ensure no single client is targeted
                 setIsAddCreditsOpen(true);
               }}
               className="flex items-center gap-2 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
             >
               <Plus size={16} />
               Add Créditos
             </button>
             
             <button 
               onClick={() => handleBulkActionClick('deactivate-client')}
               className="flex items-center gap-2 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium text-orange-400"
             >
               <Power size={16} />
               Desativar
             </button>
             
             <button 
               onClick={() => handleBulkActionClick('delete-client')}
               className="flex items-center gap-2 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium text-red-400"
             >
               <Trash2 size={16} />
               Excluir
             </button>
          </div>

          <button 
            onClick={() => setSelectedClients([])}
            className="ml-2 hover:bg-gray-700 p-1 rounded-full transition-colors"
          >
            <X size={16} className="text-gray-400" />
          </button>
        </div>
      )}

      {/* Modals and Toasts */}
      <AddCreditsModal 
        isOpen={isAddCreditsOpen}
        onClose={() => setIsAddCreditsOpen(false)}
        onConfirm={handleAddCredits}
        count={targetClient ? 1 : selectedClients.length}
      />
      
      <ConfirmModal 
        isOpen={!!actionModal.type}
        type={actionModal.type as any}
        isLoading={isActionLoading}
        onClose={() => setActionModal({ type: null, client: null, isBulk: false })}
        onConfirm={confirmAction}
        credits={0}
        count={actionModal.isBulk ? selectedClients.length : 1}
      />

      <ExportModal
        isOpen={isExportOpen}
        isLoading={isExportLoading}
        onClose={() => setIsExportOpen(false)}
        onExport={handleExport}
      />
      
      <Toast 
        visible={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

function DropdownItem({ icon, label, className, onClick }: { icon: React.ReactNode, label: string, className?: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200 transition-colors text-left",
        className
      )}
    >
      <span className="opacity-70">{icon}</span>
      {label}
    </button>
  );
}
