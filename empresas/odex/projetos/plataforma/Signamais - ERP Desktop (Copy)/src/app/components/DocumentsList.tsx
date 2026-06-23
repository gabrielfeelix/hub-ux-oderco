import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  CheckCircle, 
  Send,
  Clock,
  AlertTriangle,
  X,
  XCircle,
  AlertOctagon,
  Calendar,
  Check,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Archive,
  Trash2,
  Eye,
  Download,
  Copy,
  History,
  Ban,
  Repeat
} from 'lucide-react';
import { NewEnvelope } from './NewEnvelope';
import { EnvelopeDetails } from './EnvelopeDetails';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface DocumentsListProps {
  activeFolder: string;
  triggerNewEnvelope?: boolean;
  onNewEnvelopeClosed?: () => void;
  onNewEnvelopeOpen?: () => void;
}

// Mock Data
const ALL_DOCUMENTS = [
  { 
    id: 1, 
    title: 'Contrato-Locação.pdf', 
    recipients: 'Santos Dumont / Deolane Bezerra ...', 
    sentDate: '15 out, 2024',
    sentTime: '15:48',
    concludedDate: '15 out, 2024',
    concludedTime: '15:48',
    status: 'Enviado', 
    signedCount: 1, 
    totalSigners: 2 
  },
  { 
    id: 2, 
    title: 'Proposta-Comercial-442.pdf', 
    recipients: 'Empresa X / João Silva', 
    sentDate: '14 out, 2024',
    sentTime: '10:00',
    concludedDate: '14 out, 2024',
    concludedTime: '14:30',
    status: 'Assinado', 
    signedCount: 2, 
    totalSigners: 2 
  },
  { 
    id: 3, 
    title: 'Aditivo-Contrato-Apto304.pdf', 
    recipients: 'Maria Oliveira / Imobiliária Y', 
    sentDate: '13 out, 2024',
    sentTime: '09:15',
    concludedDate: '-',
    concludedTime: '-',
    status: 'Expira em Breve', 
    signedCount: 1, 
    totalSigners: 2 
  },
  { 
    id: 4, 
    title: 'Termo-Aceite-Servicos.pdf', 
    recipients: 'Carlos Pereira', 
    sentDate: '12 out, 2024',
    sentTime: '16:20',
    concludedDate: '12 out, 2024',
    concludedTime: '16:25',
    status: 'Assinado', 
    signedCount: 1, 
    totalSigners: 1 
  },
  { 
    id: 5, 
    title: 'Renovacao-Seguro.pdf', 
    recipients: 'Seguradora Z', 
    sentDate: '10 out, 2024',
    sentTime: '11:00',
    concludedDate: '-',
    concludedTime: '-',
    status: 'Cancelado', 
    signedCount: 0, 
    totalSigners: 1 
  },
  { 
    id: 6, 
    title: 'Contrato-Prestacao-Servicos-TI.pdf', 
    recipients: 'Tech Solutions / Cliente A', 
    sentDate: '01 out, 2024',
    sentTime: '08:00',
    concludedDate: '-',
    concludedTime: '-',
    status: 'Expirado', 
    signedCount: 0, 
    totalSigners: 2 
  },
  { 
    id: 7, 
    title: 'NDA-Projeto-Secret.pdf', 
    recipients: 'Freelancer B', 
    sentDate: '28 set, 2024',
    sentTime: '14:00',
    concludedDate: '28 set, 2024',
    concludedTime: '14:05',
    status: 'Assinado', 
    signedCount: 1, 
    totalSigners: 1 
  },
  { 
    id: 8, 
    title: 'Contrato-Locacao-SalaComercial.pdf', 
    recipients: 'Dr. Fernando', 
    sentDate: '25 set, 2024',
    sentTime: '17:30',
    concludedDate: '-',
    concludedTime: '-',
    status: 'Enviado', 
    signedCount: 0, 
    totalSigners: 1 
  },
  { 
    id: 9, 
    title: 'Distrato-Parceria.pdf', 
    recipients: 'Socio A / Socio B', 
    sentDate: '20 set, 2024',
    sentTime: '10:00',
    concludedDate: '21 set, 2024',
    concludedTime: '09:00',
    status: 'Assinado', 
    signedCount: 2, 
    totalSigners: 2 
  },
  { 
    id: 10, 
    title: 'Proposta-Compra-Imovel.pdf', 
    recipients: 'Comprador X / Vendedor Y', 
    sentDate: '15 set, 2024',
    sentTime: '15:00',
    concludedDate: '-',
    concludedTime: '-',
    status: 'Expira em Breve', 
    signedCount: 1, 
    totalSigners: 2 
  },
  { 
    id: 11, 
    title: 'Autorizacao-Viagem.pdf', 
    recipients: 'Pai / Mãe', 
    sentDate: '10 set, 2024',
    sentTime: '08:00',
    concludedDate: '10 set, 2024',
    concludedTime: '18:00',
    status: 'Assinado', 
    signedCount: 2, 
    totalSigners: 2 
  },
  { 
    id: 12, 
    title: 'Termo-Entrega-Chaves.pdf', 
    recipients: 'Inquilino', 
    sentDate: '05 set, 2024',
    sentTime: '11:00',
    concludedDate: '-',
    concludedTime: '-',
    status: 'Falha na com.', 
    signedCount: 0, 
    totalSigners: 1 
  },
];

const STATUS_OPTIONS = [
  { id: 'Enviado', label: 'Enviado' },
  { id: 'Assinado', label: 'Assinado' },
  { id: 'Expira em Breve', label: 'Expira em Breve' },
  { id: 'Expirado', label: 'Expirado' },
  { id: 'Cancelado', label: 'Cancelado' },
  { id: 'Falha na com.', label: 'Falha na com.' },
];

export function DocumentsList({ activeFolder, triggerNewEnvelope, onNewEnvelopeClosed, onNewEnvelopeOpen, externalDocumentId }: DocumentsListProps & { externalDocumentId?: string | null }) {
  const [view, setView] = useState<'list' | 'new-envelope' | 'details'>('list');
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState<string | null>(null);
  
  // Effect to handle external navigation (e.g. from Tasks)
  useEffect(() => {
    if (externalDocumentId) {
      setSelectedEnvelopeId(externalDocumentId);
      setView('details');
    }
  }, [externalDocumentId]);
  const [selectedDocs, setSelectedDocs] = useState<number[]>([]);
  
  // Filter State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    status: [] as string[],
    startDate: '',
    endDate: '',
    search: ''
  });

  // Sorting State
  const [sortConfig, setSortConfig] = useState<{ key: string | null; direction: 'asc' | 'desc' }>({
    key: null,
    direction: 'asc',
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    if (triggerNewEnvelope) {
      setView('new-envelope');
    }
  }, [triggerNewEnvelope]);

  const handleBackToList = () => {
    setView('list');
    if (onNewEnvelopeClosed) onNewEnvelopeClosed();
  };

  const [actionMenuOpenId, setActionMenuOpenId] = useState<number | null>(null);

  // Close menus on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionMenuOpenId !== null && !(event.target as Element).closest('.action-menu-trigger')) {
        setActionMenuOpenId(null);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionMenuOpenId]);

  // Filter Logic
  const filteredDocs = ALL_DOCUMENTS.filter(doc => {
    // Search
    if (filterCriteria.search && !doc.title.toLowerCase().includes(filterCriteria.search.toLowerCase())) return false;
    
    // Folder Logic
    if (activeFolder === 'Assinados' && doc.status !== 'Assinado') return false;
    if (activeFolder === 'Enviados' && doc.status !== 'Enviado') return false;
    if (activeFolder === 'Ação necessária' && doc.status !== 'Expira em Breve' && doc.status !== 'Enviado') return false;
    if (activeFolder === 'Expira em breve' && doc.status !== 'Expira em Breve') return false;
    if (activeFolder === 'Cancelados' && doc.status !== 'Cancelado') return false;
    if (activeFolder === 'Expirados' && doc.status !== 'Expirado') return false;
    if (activeFolder === 'Falha na com.' && doc.status !== 'Falha na com.') return false;

    // Explicit Filter
    if (filterCriteria.status.length > 0 && !filterCriteria.status.includes(doc.status)) return false;
    // Date Logic would go here (simplified for mock strings)
    
    return true;
  });

  // Sorting Logic
  const sortedDocs = React.useMemo(() => {
    let sortableItems = [...filteredDocs];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        // @ts-ignore
        let aValue = a[sortConfig.key];
        // @ts-ignore
        let bValue = b[sortConfig.key];

        // Handle string comparison case-insensitive
        if (typeof aValue === 'string') {
           aValue = aValue.toLowerCase();
           bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredDocs, sortConfig]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedDocs.length / itemsPerPage);
  const paginatedDocs = sortedDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (name: string) => {
    if (sortConfig.key !== name) {
      return <div className="flex flex-col"><ArrowUp size={10} className="text-gray-300" /><ArrowDown size={10} className="text-gray-300" /></div>;
    }
    return sortConfig.direction === 'asc' 
       ? <ArrowUp size={14} className="text-[#8925e2]" /> 
       : <ArrowDown size={14} className="text-[#8925e2]" />;
  };

  const activeFiltersCount = (filterCriteria.status.length > 0 ? 1 : 0) + (filterCriteria.startDate ? 1 : 0);

  const toggleSelectAll = () => {
    if (selectedDocs.length === paginatedDocs.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(paginatedDocs.map(d => d.id));
    }
  };

  const toggleSelectDoc = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click
    if (selectedDocs.includes(id)) {
      setSelectedDocs(selectedDocs.filter(d => d !== id));
    } else {
      setSelectedDocs([...selectedDocs, id]);
    }
  };

  const handleRowClick = (id: number) => {
    setSelectedEnvelopeId(id.toString());
    setView('details');
  };

  const toggleFilterStatus = (status: string) => {
    setFilterCriteria(prev => {
      const newStatus = prev.status.includes(status) 
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status];
      return { ...prev, status: newStatus };
    });
  };

  const clearFilters = () => {
    setFilterCriteria({
      status: [],
      startDate: '',
      endDate: '',
      search: ''
    });
    setIsFilterOpen(false);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Assinado': 
        return { 
          bg: 'bg-[#e8f3ee]', 
          text: 'text-[#177B4C]', 
          icon: <CheckCircle className="fill-[#177B4C] text-[#e8f3ee]" size={14} />,
          barColor: 'bg-[#0d6efd]'
        };
      case 'Enviado': 
        return { 
          bg: 'bg-[#e7f1ff]', 
          text: 'text-[#0C64E6]', 
          icon: <Send className="fill-[#0C64E6] text-[#e7f1ff]" size={14} />,
          barColor: 'bg-[#ffcd39]'
        };
      case 'Expira em Breve': 
        return { 
          bg: 'bg-[#fffaeb]', 
          text: 'text-[#E8BB34]', 
          icon: <Clock className="fill-[#E8BB34] text-[#fffaeb]" size={14} />,
          barColor: 'bg-[#ffcd39]'
        };
      case 'Cancelado': 
        return { 
          bg: 'bg-[#edeeee]', 
          text: 'text-[#42494F]', 
          icon: <X className="fill-[#42494F] text-[#edeeee]" size={14} />,
          barColor: 'bg-gray-200' 
        };
      case 'Expirado': 
        return { 
          bg: 'bg-[#fcebec]', 
          text: 'text-[#C8303F]', 
          icon: <AlertOctagon className="fill-[#C8303F] text-[#fcebec]" size={14} />,
          barColor: 'bg-[#0d6efd]'
        };
      case 'Falha na com.':
        return {
           bg: 'bg-orange-50',
           text: 'text-orange-600',
           icon: <AlertTriangle className="fill-orange-600 text-orange-50" size={14} />,
           barColor: 'bg-orange-500'
        };
      default: 
        return { 
          bg: 'bg-gray-100', 
          text: 'text-gray-600', 
          icon: <FileText size={14} />,
          barColor: 'bg-gray-300'
        };
    }
  };

  const handleBulkArchive = () => {
    toast.success(`${selectedDocs.length} documentos arquivados com sucesso.`);
    setSelectedDocs([]);
  };

  const handleBulkDelete = () => {
    toast.success(`${selectedDocs.length} documentos movidos para a lixeira.`);
    setSelectedDocs([]);
  };

  const handleBulkSend = () => {
    toast.success(`${selectedDocs.length} documentos reenviados com sucesso.`);
    setSelectedDocs([]);
  };

  if (view === 'new-envelope') {
    return <NewEnvelope onBack={handleBackToList} />;
  }

  if (view === 'details' && selectedEnvelopeId) {
    return <EnvelopeDetails envelopeId={selectedEnvelopeId} onBack={handleBackToList} />;
  }

  return (
    <div className="flex flex-col gap-8 pb-10">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
           <h1 className="text-[32px] font-['Lufga',sans-serif] font-bold text-gray-900 leading-none tracking-tight">Documentos</h1>
           <p className="text-gray-500 text-sm font-normal font-['Inter',sans-serif]">
             Acompanhe abaixo os documentos de assinatura:
           </p>
        </div>
        
        {/* Credits Pill */}
        <div className="bg-[#f5f4f7] dark:bg-gray-800 rounded-full pl-2 pr-4 py-1.5 flex items-center gap-3 border border-gray-100 dark:border-gray-700">
           <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
             <FileText size={14} className="text-gray-600 dark:text-gray-300" />
           </div>
           <span className="text-sm text-gray-500 dark:text-gray-400">
             Disponíveis: <span className="font-bold text-[#8925e2] dark:text-[#a855f7]">125/200</span>
           </span>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
         {/* Assinados */}
         <div className="bg-white rounded-xl border border-[#edeeee] p-5 flex items-center gap-4 hover:border-green-200 transition-colors cursor-default shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#e8f3ee] flex items-center justify-center shrink-0">
               <CheckCircle className="text-[#177B4C] fill-[#177B4C] text-white" size={20} />
            </div>
            <div className="flex flex-col">
               <span className="text-gray-500 text-sm font-['Inter',sans-serif]">Assinados</span>
               <span className="text-gray-900 text-2xl font-bold font-['Lufga',sans-serif] leading-tight">475</span>
            </div>
         </div>

         {/* Enviados */}
         <div className="bg-white rounded-xl border border-[#edeeee] p-5 flex items-center gap-4 hover:border-blue-200 transition-colors cursor-default shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#e7f1ff] flex items-center justify-center shrink-0">
               <Send className="text-[#0C64E6] fill-[#0C64E6] text-white" size={20} />
            </div>
            <div className="flex flex-col">
               <span className="text-gray-500 text-sm font-['Inter',sans-serif]">Enviados</span>
               <span className="text-gray-900 text-2xl font-bold font-['Lufga',sans-serif] leading-tight">36</span>
            </div>
         </div>

         {/* Expira em Breve */}
         <div className="bg-white rounded-xl border border-[#edeeee] p-5 flex items-center gap-4 hover:border-yellow-200 transition-colors cursor-default shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#fffaeb] flex items-center justify-center shrink-0">
               <Clock className="text-[#E8BB34] fill-[#E8BB34] text-white" size={20} />
            </div>
            <div className="flex flex-col">
               <span className="text-gray-500 text-sm font-['Inter',sans-serif] whitespace-nowrap">Expira em Breve</span>
               <span className="text-gray-900 text-2xl font-bold font-['Lufga',sans-serif] leading-tight">31</span>
            </div>
         </div>

         {/* Expirados */}
         <div className="bg-white rounded-xl border border-[#edeeee] p-5 flex items-center gap-4 hover:border-red-200 transition-colors cursor-default shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#fcebec] flex items-center justify-center shrink-0">
               <AlertTriangle className="text-[#C8303F] fill-[#C8303F] text-white" size={20} />
            </div>
            <div className="flex flex-col">
               <span className="text-gray-500 text-sm font-['Inter',sans-serif]">Expirados</span>
               <span className="text-gray-900 text-2xl font-bold font-['Lufga',sans-serif] leading-tight">98</span>
            </div>
         </div>

         {/* Cancelados */}
         <div className="bg-white rounded-xl border border-[#edeeee] p-5 flex items-center gap-4 hover:border-gray-300 transition-colors cursor-default shadow-sm">
            <div className="w-10 h-10 rounded-full bg-[#edeeee] flex items-center justify-center shrink-0">
               <X className="text-[#42494F] fill-[#42494F] text-white" size={20} />
            </div>
            <div className="flex flex-col">
               <span className="text-gray-500 text-sm font-['Inter',sans-serif]">Cancelados</span>
               <span className="text-gray-900 text-2xl font-bold font-['Lufga',sans-serif] leading-tight">8</span>
            </div>
         </div>
      </div>

      {/* Controls Row */}
      <div className="flex items-center gap-3 mt-4 relative z-20">
         {/* Search */}
         <div className="bg-[#f5f4f7] rounded-xl h-[48px] flex items-center px-4 gap-2 w-[320px] transition-all focus-within:ring-2 focus-within:ring-[#8925e2]/20">
            <Search size={18} className="text-[#6D7379]" />
            <input 
               type="text" 
               placeholder="Pesquisar" 
               className="bg-transparent border-none outline-none text-[#495057] text-sm font-['Inter',sans-serif] w-full placeholder-[#abafb2]"
               value={filterCriteria.search}
               onChange={(e) => setFilterCriteria({...filterCriteria, search: e.target.value})}
            />
         </div>

         {/* Filter Button Container */}
         <div className="relative" ref={filterRef}>
            <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={cn(
                 "h-[48px] w-[48px] rounded-xl border flex items-center justify-center transition-colors relative",
                 isFilterOpen
                    ? "bg-[#f5eafe] border-[#8925e2] text-[#8925e2]" 
                    : "border-gray-200 text-gray-500 hover:bg-gray-50"
               )}
            >
               <Filter size={20} strokeWidth={2} />
               {activeFiltersCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                     {activeFiltersCount}
                  </span>
               )}
            </button>

            {/* Filter Popover */}
            {isFilterOpen && (
               <div className="absolute top-full left-0 mt-2 w-[320px] bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                  <div className="p-5 flex flex-col gap-6">
                     <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3 font-['Inter',sans-serif]">STATUS</span>
                        <div className="flex flex-col gap-1">
                           {STATUS_OPTIONS.map(option => (
                              <button
                                 key={option.id}
                                 onClick={() => toggleFilterStatus(option.id)}
                                 className={cn(
                                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors font-['Inter',sans-serif]",
                                    filterCriteria.status.includes(option.id)
                                       ? "bg-[#f5eafe] text-[#8925e2]"
                                       : "text-gray-600 hover:bg-gray-50"
                                 )}
                              >
                                 {option.label}
                                 {filterCriteria.status.includes(option.id) && <Check size={16} />}
                              </button>
                           ))}
                        </div>
                     </div>

                     <div>
                        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest block mb-3 font-['Inter',sans-serif]">DATA</span>
                        <div className="grid grid-cols-2 gap-2">
                           <div className="relative">
                              <input 
                                 type="text" 
                                 placeholder="dd/mm/aaaa"
                                 onFocus={(e) => e.target.type = 'date'}
                                 onBlur={(e) => e.target.type = 'text'}
                                 value={filterCriteria.startDate}
                                 onChange={(e) => setFilterCriteria({...filterCriteria, startDate: e.target.value})}
                                 className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#8925e2] focus:ring-1 focus:ring-[#8925e2] transition-all"
                              />
                           </div>
                           <div className="relative">
                              <input 
                                 type="text" 
                                 placeholder="dd/mm/aaaa"
                                 onFocus={(e) => e.target.type = 'date'}
                                 onBlur={(e) => e.target.type = 'text'}
                                 value={filterCriteria.endDate}
                                 onChange={(e) => setFilterCriteria({...filterCriteria, endDate: e.target.value})}
                                 className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-600 focus:outline-none focus:border-[#8925e2] focus:ring-1 focus:ring-[#8925e2] transition-all"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 items-center">
                        <button 
                           onClick={clearFilters}
                           className="text-xs font-bold text-gray-500 hover:text-gray-700 flex items-center gap-1.5 px-2 py-1"
                        >
                           <RotateCcw size={12} />
                           Limpar
                        </button>
                        <button 
                           onClick={() => setIsFilterOpen(false)}
                           className="px-6 py-2 text-sm font-bold text-white bg-[#8925e2] hover:bg-[#7a1fd0] rounded-lg transition-colors shadow-lg shadow-purple-500/20"
                        >
                           Aplicar
                        </button>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Add Button (secondary) */}
         <button 
           id="tour-new-envelope-btn"
           onClick={() => {
              setView('new-envelope');
              if (onNewEnvelopeOpen) onNewEnvelopeOpen();
           }}
           className="bg-[#8925e2] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#7a1fd0] transition-colors flex items-center gap-2 shadow-lg shadow-purple-500/20"
         >
            <Plus size={20} />
            Novo Envelope
         </button>
      </div>

      {/* Table */}
      <div id="tour-documents-list" className="w-full bg-white rounded-xl border border-[#edeeee] overflow-hidden flex flex-col">
         {/* Table Header */}
         <div className="bg-[#f5eafe] h-[48px] flex items-center px-4 border-b border-[#edeeee]">
            <div className="w-[40px] flex justify-center">
               <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2] transition-colors relative cursor-pointer"
                  checked={selectedDocs.length === paginatedDocs.length && paginatedDocs.length > 0}
                  onChange={toggleSelectAll}
               />
            </div>
            <div className="w-[40px] px-2 text-gray-500 font-medium text-xs text-center">#</div>
            
            <HeaderCell 
               label="Documento(s) do Envelope" 
               sortKey="title" 
               width="flex-1" 
               currentSort={sortConfig} 
               onSort={requestSort} 
            />
            <HeaderCell 
               label="Destinatários" 
               sortKey="recipients" 
               width="w-[180px]" 
               currentSort={sortConfig} 
               onSort={requestSort} 
            />
            <HeaderCell 
               label="Dt. Envio" 
               sortKey="sentDate" 
               width="w-[140px]" 
               align="center"
               currentSort={sortConfig} 
               onSort={requestSort} 
            />
            <HeaderCell 
               label="Dt. Conclusão" 
               sortKey="concludedDate" 
               width="w-[140px]" 
               align="center"
               currentSort={sortConfig} 
               onSort={requestSort} 
            />
            <HeaderCell 
               label="Status" 
               sortKey="status" 
               width="w-[140px]" 
               align="center"
               currentSort={sortConfig} 
               onSort={requestSort} 
            />
            <div className="w-[140px] px-4 text-gray-600 font-semibold text-xs uppercase tracking-wider text-center">Progresso</div>
            <div className="w-[50px]"></div>
         </div>

         {/* Table Body */}
         <div className="flex flex-col min-h-[400px]">
            {paginatedDocs.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8">
                <FileText size={48} className="mb-2 opacity-20" />
                <p>Nenhum documento encontrado</p>
              </div>
            ) : (
               paginatedDocs.map((doc, index) => {
                  const statusConfig = getStatusConfig(doc.status);
                  return (
                     <div 
                        key={doc.id} 
                        onClick={() => handleRowClick(doc.id)}
                        className="bg-white hover:bg-gray-50 min-h-[72px] flex items-center px-4 transition-colors border-b border-[#edeeee] last:border-0 group cursor-pointer"
                     >
                        <div className="w-[40px] flex justify-center" onClick={(e) => e.stopPropagation()}>
                           <input 
                              type="checkbox" 
                              className="w-4 h-4 rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2] transition-colors cursor-pointer"
                              checked={selectedDocs.includes(doc.id)}
                              onChange={(e) => toggleSelectDoc(doc.id, e)}
                           />
                        </div>
                        <div className="w-[40px] px-2 text-gray-400 font-medium text-sm text-center font-['Poppins',sans-serif]">
                           {doc.id}
                        </div>
                        <div className="flex-1 px-4">
                           <span className="text-gray-900 text-sm font-medium font-['Inter',sans-serif] hover:text-[#8925e2] transition-colors">{doc.title}</span>
                        </div>
                        <div className="w-[180px] px-4">
                           <div className="text-gray-500 font-normal text-sm truncate pr-4" title={doc.recipients}>
                              {doc.recipients}
                           </div>
                        </div>
                        <div className="w-[140px] px-4 text-center flex flex-col justify-center">
                           <span className="text-gray-600 text-sm font-['Inter',sans-serif]">{doc.sentDate}</span>
                           <span className="text-gray-400 text-xs font-['Inter',sans-serif] mt-0.5">{doc.sentTime}</span>
                        </div>
                        <div className="w-[140px] px-4 text-center flex flex-col justify-center">
                           <span className="text-gray-600 text-sm font-['Inter',sans-serif]">{doc.concludedDate}</span>
                           <span className="text-gray-400 text-xs font-['Inter',sans-serif] mt-0.5">{doc.concludedTime}</span>
                        </div>
                        <div className="w-[140px] px-4 flex justify-center">
                           <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-opacity-50">
                              <div className={cn("p-0.5 rounded-full", statusConfig.bg)}>
                                 {statusConfig.icon}
                              </div>
                              <span className={cn("font-bold text-xs", statusConfig.text)}>
                                 {doc.status}
                              </span>
                           </div>
                        </div>
                        <div className="w-[140px] px-4 flex items-center justify-center gap-3">
                           <span className="text-gray-500 text-xs font-['Inter',sans-serif]">{doc.signedCount}/{doc.totalSigners}</span>
                           <div className="bg-[#e7f1ff] w-[80px] h-[6px] rounded-full overflow-hidden">
                              <div 
                                 className={cn("h-full rounded-full", statusConfig.barColor)} 
                                 style={{ width: `${(doc.signedCount / doc.totalSigners) * 100}%` }}
                              />
                           </div>
                        </div>
                        <div className="w-[50px] flex justify-center relative action-menu-trigger" onClick={(e) => e.stopPropagation()}>
                           <button 
                             onClick={() => setActionMenuOpenId(actionMenuOpenId === doc.id ? null : doc.id)}
                             className={cn(
                               "text-gray-400 hover:text-[#8925e2] transition-colors p-1.5 rounded-lg hover:bg-[#f5eafe]",
                               actionMenuOpenId === doc.id ? "opacity-100 bg-[#f5eafe] text-[#8925e2]" : "opacity-0 group-hover:opacity-100"
                             )}
                           >
                              <MoreVertical size={18} />
                           </button>

                           {/* Action Menu */}
                           {actionMenuOpenId === doc.id && (
                             <div className="absolute right-8 top-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                               <div className="p-1">
                                 <button 
                                   onClick={() => {
                                      toast.info(`Visualizando documento: ${doc.title}`);
                                      handleRowClick(doc.id);
                                   }}
                                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                                 >
                                    <Eye size={16} className="text-gray-400" /> Visualizar
                                 </button>
                                 <button 
                                   onClick={() => toast.success('Download iniciado')}
                                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                                 >
                                    <Download size={16} className="text-gray-400" /> Baixar original
                                 </button>
                                 <button 
                                   onClick={() => toast.success('Histórico aberto')}
                                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                                 >
                                    <History size={16} className="text-gray-400" /> Histórico
                                 </button>
                                 <button 
                                   onClick={() => toast.success('Envelope duplicado')}
                                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                                 >
                                    <Copy size={16} className="text-gray-400" /> Duplicar
                                 </button>
                               </div>
                               
                               <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mx-1" />
                               
                               <div className="p-1">
                                 <button 
                                   onClick={() => toast.success('Notificação reenviada')}
                                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 transition-colors"
                                 >
                                    <Repeat size={16} className="text-gray-400" /> Reenviar notificação
                                 </button>
                                 <button 
                                   onClick={() => toast.error('Envelope cancelado')}
                                   className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-sm text-red-600 dark:text-red-400 transition-colors"
                                 >
                                    <Ban size={16} /> Cancelar envelope
                                 </button>
                               </div>
                             </div>
                           )}
                        </div>
                     </div>
                  );
               })
            )}
         </div>

         {/* Pagination Footer */}
         <div className="bg-gray-50 h-[56px] border-t border-[#edeeee] px-6 flex items-center justify-between">
            <div className="text-xs text-gray-500 font-medium">
               Mostrando <span className="font-bold text-gray-700">{Math.min(paginatedDocs.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0, filteredDocs.length)}</span> até <span className="font-bold text-gray-700">{Math.min(currentPage * itemsPerPage, filteredDocs.length)}</span> de <span className="font-bold text-gray-700">{filteredDocs.length}</span> resultados
            </div>
            
            <div className="flex items-center gap-2">
               <button 
                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                 disabled={currentPage === 1}
                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  <ChevronLeft size={16} />
               </button>
               
               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                     key={page}
                     onClick={() => setCurrentPage(page)}
                     className={cn(
                        "w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-colors",
                        currentPage === page
                           ? "bg-[#8925e2] text-white shadow-md shadow-purple-500/20"
                           : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                     )}
                  >
                     {page}
                  </button>
               ))}

               <button 
                 onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                 disabled={currentPage === totalPages || totalPages === 0}
                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
               >
                  <ChevronRight size={16} />
               </button>
            </div>
         </div>
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedDocs.length > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
           <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl shadow-2xl p-2 pl-6 flex items-center gap-6 border border-gray-800 dark:border-gray-200">
              <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded bg-[#8925e2] flex items-center justify-center text-white font-bold text-xs">
                    {selectedDocs.length}
                 </div>
                 <span className="font-bold text-sm">Selecionados</span>
              </div>

              <div className="h-6 w-[1px] bg-gray-700 dark:bg-gray-200" />

              <div className="flex items-center gap-1">
                 <button 
                   onClick={handleBulkArchive}
                   className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium"
                 >
                    <Archive size={16} /> Arquivar
                 </button>
                 <button 
                   onClick={handleBulkDelete}
                   className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium text-red-400 dark:text-red-600 hover:text-red-300 dark:hover:text-red-700"
                 >
                    <Trash2 size={16} /> Excluir
                 </button>
                 <button 
                   onClick={handleBulkSend}
                   className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl transition-colors text-sm font-medium"
                 >
                    <Send size={16} /> Reenviar
                 </button>
              </div>

              <div className="pl-2">
                 <button 
                   onClick={() => setSelectedDocs([])}
                   className="p-2 hover:bg-gray-800 dark:hover:bg-gray-100 rounded-full transition-colors"
                 >
                    <X size={16} />
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function HeaderCell({ 
   label, 
   sortKey, 
   width, 
   align = 'left', 
   currentSort, 
   onSort 
}: { 
   label: string, 
   sortKey: string, 
   width: string, 
   align?: 'left' | 'center' | 'right',
   currentSort: { key: string | null, direction: 'asc' | 'desc' },
   onSort: (key: string) => void
}) {
   const isActive = currentSort.key === sortKey;
   
   return (
      <div 
         className={cn(
            width, 
            "px-4 text-gray-600 font-semibold text-xs uppercase tracking-wider cursor-pointer hover:bg-[#eaddfc] transition-colors h-full flex items-center select-none group",
            align === 'center' && "justify-center",
            align === 'right' && "justify-end"
         )}
         onClick={() => onSort(sortKey)}
      >
         <div className="flex items-center gap-2">
            {label}
            <div className="flex flex-col gap-0.5">
               <ArrowUp size={8} className={cn(isActive && currentSort.direction === 'asc' ? "text-[#8925e2]" : "text-gray-300 group-hover:text-gray-400")} />
               <ArrowDown size={8} className={cn(isActive && currentSort.direction === 'desc' ? "text-[#8925e2]" : "text-gray-300 group-hover:text-gray-400")} />
            </div>
         </div>
      </div>
   );
}