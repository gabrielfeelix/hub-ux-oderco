import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  Mail, 
  ChevronLeft, 
  ChevronRight,
  Share2, 
  Star, 
  Plus, 
  LayoutGrid, 
  Database, 
  Calendar, 
  Send,
  Moon,
  Sun,
  Settings,
  Menu,
  X,
  Check,
  Inbox,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileEdit,
  Trash2,
  Clock,
  Timer,
  AlertTriangle,
  Layers,
  Users,
  XCircle,
  BarChart2,
  UserPlus,
  FileText,
  File,
  Folder,
  Building2,
  PieChart,
  CreditCard,
  Download,
  Shield,
  ClipboardList,
  Link,
  LogOut,
  HelpCircle,
  FileText as FileTextIcon,
  Lock,
  User,
  Search as SearchIcon,
  BookOpen,
  MessageCircle,
  Globe,
  RefreshCw,
  CheckSquare,
  AlertOctagon,
  PenTool,
  Award
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Logo } from '@/app/components/Logo';
import { ClientManagement } from '@/app/components/ClientManagement';
import { Admin } from '@/app/components/Admin';
import { HelpCenter } from '@/app/components/HelpCenter';
import { UserProfile } from '@/app/components/UserProfile';
import { AccountSettings } from '@/app/components/AccountSettings';
import { Templates } from '@/app/components/Templates';
import { Reports } from '@/app/components/reports/Reports';
import { Dashboard } from '@/app/components/Dashboard';
import { Plans } from '@/app/components/Plans';
import { LegalModal } from '@/app/components/LegalModal';
import { LogoutModal } from '@/app/components/LogoutModal';
import { TasksSidebar } from '@/app/components/TasksSidebar';
import { NotificationsSidebar } from '@/app/components/NotificationsSidebar';
import { NewsSidebar } from '@/app/components/NewsSidebar';
import { TemplateSelectorModal } from '@/app/components/templates/TemplateSelectorModal';
import { CreateViewModal } from '@/app/components/CreateViewModal';
import { PlansModal } from '@/app/components/PlansModal';
import { SystemAlert } from '@/app/components/SystemAlert';

import { OnboardingTour } from '@/app/components/OnboardingTour';

import { BuyCreditsModal } from '@/app/components/BuyCreditsModal';

import { Toaster, toast } from 'sonner';

// Helper for classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Define the structure of a View (matching App.tsx)
interface DashboardView {
  id: string;
  name: string;
  widgets: string[];
}

interface LayoutProps {
  children: React.ReactNode;
  activeFolder?: string;
  onFolderChange?: (folder: string) => void;
  onLogout?: () => void;
  // Custom Views
  customViews?: DashboardView[];
  activeViewId?: string;
  activeViewWidgets?: string[];
  onViewSelect?: (id: string) => void;
  onAddView?: (name: string, widgets: string[]) => void;
  onEditView?: (viewId: string, name: string, widgets: string[]) => void;
  onDeleteView?: (viewId: string) => void;
  startOnboarding?: boolean;
  onStartOnboarding?: () => void;
  onOnboardingComplete?: () => void;
  // Navigation Control
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  initialAdminAction?: string;
  initialTriggerNewEnvelope?: boolean;
}

export function Layout({ 
  children, 
  activeFolder = "Caixa de entrada", 
  onFolderChange, 
  onLogout,
  customViews,
  activeViewId,
  activeViewWidgets,
  onViewSelect,
  onAddView,
  onEditView,
  onDeleteView,
  startOnboarding,
  onStartOnboarding,
  onOnboardingComplete,
  activeTab: propActiveTab,
  onTabChange,
  initialAdminAction,
  initialTriggerNewEnvelope
}: LayoutProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [internalActiveTab, setInternalActiveTab] = useState("Início");
  
  const activeTab = propActiveTab !== undefined ? propActiveTab : internalActiveTab;
  const setActiveTab = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDocsSubMenuOpen, setIsDocsSubMenuOpen] = useState(true); // Default open to see sub items
  
  // Credit State
  const [extraCredits, setExtraCredits] = useState(15);
  const [isBuyCreditsModalOpen, setIsBuyCreditsModalOpen] = useState(false);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Tasks State
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [isNotificationsSidebarOpen, setIsNotificationsSidebarOpen] = useState(false);
  const [isNewsSidebarOpen, setIsNewsSidebarOpen] = useState(false);
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [isCreateViewModalOpen, setIsCreateViewModalOpen] = useState(false);
  const [isPlansModalOpen, setIsPlansModalOpen] = useState(false);
  const [editingView, setEditingView] = useState<DashboardView | null>(null);
  
  const [targetDocumentId, setTargetDocumentId] = useState<string | null>(null);
  const [targetTemplateId, setTargetTemplateId] = useState<string | null>(null);
  const [initialTemplateAction, setInitialTemplateAction] = useState<'view' | 'use'>('view');

  // Template Sidebar State
  const [templateSection, setTemplateSection] = useState('my-templates');
  const [expandedFolders, setExpandedFolders] = useState<string[]>(['folders']);
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false);

  // Reports Sidebar State
  const [reportSection, setReportSection] = useState('overview');

  // Profile Sidebar State
  const [profileSection, setProfileSection] = useState('profile');

  // Admin Sidebar State
  const [adminSection, setAdminSection] = useState('general');

  // Handle initial admin action
  useEffect(() => {
    if (initialAdminAction === 'add-user') {
      setAdminSection('users');
    }
  }, [initialAdminAction]);
  
  // New Envelope Trigger State
  const [triggerNewEnvelope, setTriggerNewEnvelope] = useState(false);

  useEffect(() => {
    if (initialTriggerNewEnvelope) {
       setTriggerNewEnvelope(true);
    }
  }, [initialTriggerNewEnvelope]);

  // System Error State
  const [isSystemErrorOpen, setIsSystemErrorOpen] = useState(false);

  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy'>('terms');
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock Data for Search
  const allDocuments = [
    { id: 1, title: "Proposta de Compra - Imóvel Centro", type: "PDF", date: "Há 2 dias" },
    { id: 2, title: "Proposta Comercial #4421", type: "DOCX", date: "Há 1 semana" },
    { id: 3, title: "Contrato de Locação - Apto 304", type: "PDF", date: "Há 3 dias" },
    { id: 4, title: "Aditivo Contratual", type: "PDF", date: "Há 1 mês" },
    { id: 5, title: "Proposta de Parceria", type: "PDF", date: "Há 3 semanas" },
  ];

  const allTemplates = [
    { id: 1, title: "Contrato de Prestação de Serviços", type: "Modelo", date: "Criado em 10/02" },
    { id: 2, title: "NDA - Padrão", type: "Modelo", date: "Criado em 05/01" },
    { id: 3, title: "Termo de Aceite", type: "Modelo", date: "Criado em 15/12" },
  ];

  const allPeople = [
    { id: 1, name: "João Silva", role: "Cliente", email: "joao.silva@email.com" },
    { id: 2, name: "Maria Santos", role: "Signatário", email: "maria.santos@email.com" },
    { id: 3, name: "Carlos Oliveira", role: "Advogado", email: "carlos.o@legal.com" },
    { id: 4, name: "Ana Pereira", role: "Corretora", email: "ana.p@imob.com" },
  ];

  const filteredDocuments = allDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredTemplates = allTemplates.filter(template => 
    template.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPeople = allPeople.filter(person => 
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Toggle theme
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Toggle sidebar
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset states when changing tabs
  useEffect(() => {
    if (activeTab !== "Documentos") {
      setTriggerNewEnvelope(false);
    }
  }, [activeTab]);

  const handleFolderClick = (folder: string) => {
    if (onFolderChange) {
      onFolderChange(folder);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      setIsSearchOpen(true);
    } else {
      setIsSearchOpen(false);
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) ? prev.filter(id => id !== folderId) : [...prev, folderId]
    );
  };

  // Helper for Navigation from Dashboard
  const handleNavigate = (tab: string, folder?: string) => {
    if (tab === 'Tasks') {
       setIsTasksOpen(true);
       return;
    }
    if (tab === 'Help') {
       setActiveTab('Central de Ajuda');
       return;
    }
    setActiveTab(tab);
    if (folder && onFolderChange) {
      onFolderChange(folder);
    }
  };

  // Helper for New Envelope Flow from Dashboard
  const handleNewEnvelope = () => {
    setActiveTab("Documentos");
    setTriggerNewEnvelope(true);
  };

  const handleUseTemplate = () => {
    setIsTemplateSelectorOpen(true);
  };

  const handleTemplateSelectedFromModal = (templateId: string) => {
    setIsTemplateSelectorOpen(false);
    setActiveTab("Modelos");
    setTargetTemplateId(templateId);
    setInitialTemplateAction('use');
  };

  const handleUseFavoriteTemplate = (templateId: string) => {
    setActiveTab("Modelos");
    setTargetTemplateId(templateId);
    setInitialTemplateAction('use');
  };

  const renderSidebarContent = () => {
    switch (activeTab) {
      case "Início":
        return (
          <>
            {customViews ? (
              <>
                <div id="tour-custom-views" className="flex items-center justify-between px-2 mb-1">
                   {isSidebarExpanded && <span className="text-xs font-bold text-gray-400 uppercase px-2">Visão Geral</span>}
                   {isSidebarExpanded && (
                     <button 
                       onClick={() => setIsCreateViewModalOpen(true)}
                       className="text-[#8925e2] hover:bg-purple-50 p-1 rounded-full"
                       title="Adicionar nova visão"
                     >
                       <Plus size={14} />
                     </button>
                   )}
                </div>
                {customViews.map((view) => (
                  <SidebarIcon 
                    key={view.id}
                    icon={<LayoutGrid size={20} />} 
                    label={view.name} 
                    active={activeViewId === view.id} 
                    isDarkMode={isDarkMode} 
                    expanded={isSidebarExpanded}
                    onClick={() => onViewSelect && onViewSelect(view.id)}
                    onEdit={view.id !== 'overview' && onEditView ? () => {
                      setEditingView(view);
                      setIsCreateViewModalOpen(true);
                    } : undefined}
                  />
                ))}
              </>
            ) : (
              // Fallback if customViews not provided
              <SidebarIcon 
                icon={<LayoutGrid size={20} />} 
                label="Visão Geral" 
                active 
                isDarkMode={isDarkMode} 
                expanded={isSidebarExpanded}
              />
            )}
            
            {/* Keeping standard items if desired, or remove them if they are now widgets? 
                The prompt said "se ela criar essa nova visão e salvar, vai ficar salva na sidebar". 
                "Recentes" and "Favoritos" were previously sidebar items but also sections. 
                Let's keep them as quick access links for now or remove if they are redundant with widgets. 
                The user said "tire as seções da esquerda" (in dashboard), but didn't explicitly say remove sidebar links.
                But since "Recentes" and "Favoritos" are now WIDGETS inside the views, having them as sidebar links might be confusing or duplicate.
                However, usually "Recentes" in sidebar filters a list.
                I'll leave them for now as they might lead to specific filtered lists.
            */}
          </>
        );
      case "Gestão de Clientes":
        return (
          <>
            <SidebarIcon icon={<Users size={20} />} label="Todos os Clientes" active isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<CheckCircle size={20} />} label="Ativos" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<XCircle size={20} />} label="Inativos" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<Star size={20} />} label="Favoritos" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<BarChart2 size={20} />} label="Maior Uso" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<AlertTriangle size={20} />} label="Créditos Baixos" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<UserPlus size={20} />} label="Últimos Cadastrados" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
          </>
        );
      case "Modelos":
        return (
          <div className="flex flex-col gap-2 w-full animate-in fade-in duration-300">
             <SidebarIcon 
               icon={<FileText size={20} />} 
               label="Os meus modelos" 
               active={templateSection === 'my-templates'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setTemplateSection('my-templates')}
             />
             <SidebarIcon 
               icon={<Users size={20} />} 
               label="Partilhado comigo" 
               active={templateSection === 'shared'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setTemplateSection('shared')}
             />
             <SidebarIcon 
               icon={<Star size={20} />} 
               label="Favoritos" 
               active={templateSection === 'favorites'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setTemplateSection('favorites')}
             />

             <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1 mx-3" />

             <SidebarIcon 
               icon={<LayoutGrid size={20} />} 
               label="Todos os modelos" 
               active={templateSection === 'all'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setTemplateSection('all')}
             />
             <SidebarIcon 
               icon={<Trash2 size={20} />} 
               label="Eliminado" 
               active={templateSection === 'deleted'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setTemplateSection('deleted')}
             />

             <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1 mx-3" />

             {/* Folders */}
             <button 
               onClick={() => isSidebarExpanded ? toggleFolder('folders') : setIsSidebarExpanded(true)}
               className={cn(
                 "p-3 rounded-xl transition-all duration-200 relative group flex items-center w-full hover:bg-gray-100 dark:hover:bg-gray-700",
                 isSidebarExpanded ? "justify-start gap-3 px-4" : "justify-center"
               )}
             >
                <div className={cn("shrink-0 transition-colors", expandedFolders.includes('folders') ? "text-gray-600 dark:text-gray-300" : "text-gray-400")}>
                  <Folder size={20} />
                </div>
                {isSidebarExpanded && (
                  <div className="flex items-center justify-between flex-1">
                     <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Pastas</span>
                     {expandedFolders.includes('folders') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                )}
             </button>
             
             {isSidebarExpanded && expandedFolders.includes('folders') && (
               <div className="flex flex-col gap-1 pl-4 animate-in slide-in-from-top-2 duration-200">
                  <SidebarIcon 
                    icon={<Folder size={16} />} 
                    label="Contratos" 
                    isDarkMode={isDarkMode} 
                    expanded={isSidebarExpanded} 
                    isSubItem 
                    active={templateSection === 'folder:Contratos'}
                    onClick={() => setTemplateSection('folder:Contratos')}
                  />
                  <SidebarIcon 
                    icon={<Folder size={16} />} 
                    label="Jurídico" 
                    isDarkMode={isDarkMode} 
                    expanded={isSidebarExpanded} 
                    isSubItem 
                    active={templateSection === 'folder:Jurídico'}
                    onClick={() => setTemplateSection('folder:Jurídico')}
                  />
                  <button className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-colors text-left ml-7">
                     <Plus size={16} /> Nova pasta
                  </button>
               </div>
             )}

             <button 
               onClick={() => isSidebarExpanded ? toggleFolder('shared-folders') : setIsSidebarExpanded(true)}
               className={cn(
                 "p-3 rounded-xl transition-all duration-200 relative group flex items-center w-full hover:bg-gray-100 dark:hover:bg-gray-700",
                 isSidebarExpanded ? "justify-start gap-3 px-4" : "justify-center"
               )}
             >
                <div className={cn("shrink-0 transition-colors", expandedFolders.includes('shared-folders') ? "text-gray-600 dark:text-gray-300" : "text-gray-400")}>
                  <Folder size={20} />
                </div>
                {isSidebarExpanded && (
                  <div className="flex items-center justify-between flex-1">
                     <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Pastas Partilhadas</span>
                     {expandedFolders.includes('shared-folders') ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                )}
             </button>

             {/* Promo Box */}
             {isSidebarExpanded && (
               <div className="mt-4 px-2">
                 <div className="bg-purple-50 dark:bg-purple-900/10 p-3 rounded-xl border border-purple-100 dark:border-purple-900/30 flex items-start gap-3">
                    <RefreshCw size={16} className="text-[#8925e2] mt-0.5 shrink-0" />
                    <div>
                       <p className="text-xs font-bold text-[#8925e2] mb-1">Modelos de fluxo</p>
                       <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">Automatize processos complexos com múltiplos modelos.</p>
                    </div>
                 </div>
               </div>
             )}
          </div>
        );
      case "Relatórios":
        return (
          <>
            <SidebarIcon 
              icon={<LayoutGrid size={20} />} 
              label="Visão Geral" 
              active={reportSection === 'overview'} 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
              onClick={() => setReportSection('overview')}
            />
            <SidebarIcon 
              icon={<Calendar size={20} />} 
              label="Por Período" 
              active={reportSection === 'period'}
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
              onClick={() => setReportSection('period')}
            />
            <SidebarIcon 
              icon={<Users size={20} />} 
              label="Por Usuário" 
              active={reportSection === 'user'}
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
              onClick={() => setReportSection('user')}
            />
            <SidebarIcon 
              icon={<FileText size={20} />} 
              label="Por Tipo de Doc" 
              active={reportSection === 'doctype'}
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
              onClick={() => setReportSection('doctype')}
            />
            <SidebarIcon 
              icon={<CreditCard size={20} />} 
              label="Consumo de Créditos" 
              active={reportSection === 'credits'}
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
              onClick={() => setReportSection('credits')}
            />
          </>
        );
      case "Adm":
        return (
          <>
            <SidebarIcon 
               icon={<Building2 size={20} />} 
               label="Geral" 
               active={adminSection === 'general'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setAdminSection('general')}
            />
            <SidebarIcon 
               icon={<Users size={20} />} 
               label="Usuários" 
               active={adminSection === 'users'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setAdminSection('users')}
            />
            <SidebarIcon 
               icon={<Shield size={20} />} 
               label="Permissões" 
               active={adminSection === 'permissions'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setAdminSection('permissions')}
            />
            <SidebarIcon 
               icon={<Settings size={20} />} 
               label="Preferências" 
               active={adminSection === 'preferences'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setAdminSection('preferences')}
            />
            <SidebarIcon 
               icon={<ClipboardList size={20} />} 
               label="Auditoria" 
               active={adminSection === 'audit'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setAdminSection('audit')}
            />
            <SidebarIcon 
               icon={<CreditCard size={20} />} 
               label="Envelopes e Cobrança" 
               active={adminSection === 'billing'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setAdminSection('billing')}
            />
            <SidebarIcon 
               icon={<Link size={20} />} 
               label="Integrações" 
               active={adminSection === 'integrations'}
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setAdminSection('integrations')}
            />
          </>
        );
      case "Central de Ajuda":
        return (
          <>
            <SidebarIcon icon={<HelpCircle size={20} />} label="Início" active isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon 
              icon={<BookOpen size={20} />} 
              label={
                <span className="flex items-center gap-2">
                  Tutoriais 
                  <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Em breve</span>
                </span>
              } 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
            />
            <SidebarIcon 
              icon={<FileText size={20} />} 
              label={
                <span className="flex items-center gap-2">
                  Artigos 
                  <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Em breve</span>
                </span>
              } 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
            />
            <SidebarIcon 
              icon={<MessageCircle size={20} />} 
              label={
                <span className="flex items-center gap-2">
                  Fale Conosco 
                  <span className="text-[10px] bg-gray-100 dark:bg-gray-700 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Em breve</span>
                </span>
              } 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded} 
            />
          </>
        );
      case "Meu Perfil":
        return (
          <div className="flex flex-col gap-1 w-full animate-in fade-in duration-300">
             {/* CONTA */}
             {isSidebarExpanded && <h3 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Conta</h3>}
             <SidebarIcon 
               icon={<User size={20} />} 
               label="O meu perfil" 
               active={profileSection === 'profile'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setProfileSection('profile')}
             />
             <SidebarIcon 
               icon={<Shield size={20} />} 
               label="Privacidade e segurança" 
               active={profileSection === 'security'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setProfileSection('security')}
             />
             
             {/* ASSINATURA */}
             {isSidebarExpanded && <h3 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Assinatura</h3>}
             <SidebarIcon 
               icon={<PenTool size={20} />} 
               label="Assinaturas" 
               active={profileSection === 'signatures'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setProfileSection('signatures')}
             />
             <SidebarIcon 
               icon={<CreditCard size={20} />} 
               label="Carteira Digital" 
               active={profileSection === 'wallet'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setProfileSection('wallet')}
             />
             <SidebarIcon 
               icon={<Award size={20} />} 
               label="Meus Selos" 
               active={profileSection === 'badges'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setProfileSection('badges')}
             />
             
             {/* SISTEMA */}
             {isSidebarExpanded && <h3 className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mt-2">Sistema</h3>}
             <SidebarIcon 
               icon={<LayoutGrid size={20} />} 
               label="Aplicações ligadas" 
               active={profileSection === 'apps'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setProfileSection('apps')}
             />
             <SidebarIcon 
               icon={<Globe size={20} />} 
               label="Idioma e região" 
               active={profileSection === 'language'} 
               isDarkMode={isDarkMode} 
               expanded={isSidebarExpanded} 
               onClick={() => setProfileSection('language')}
             />
          </div>
        );
      case "Planos":
      case "Configurações da Conta":
        return (
          <>
            <SidebarIcon icon={<Bell size={20} />} label="Notificações" active isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<FileTextIcon size={20} />} label="Preferências" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<Globe size={20} />} label="Idioma e Região" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<Moon size={20} />} label="Aparência" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
            <SidebarIcon icon={<Shield size={20} />} label="Privacidade" isDarkMode={isDarkMode} expanded={isSidebarExpanded} />
          </>
        );
      case "Documentos":
      default:
        return (
          <div id="tour-sidebar-filters">
            <SidebarIcon 
              icon={<Inbox size={20} />} 
              label="Caixa de entrada" 
              active={activeFolder === "Caixa de entrada"} 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded}
              onClick={() => handleFolderClick("Caixa de entrada")}
            />
            <SidebarIcon 
              icon={<Send size={20} />} 
              label="Enviados" 
              active={activeFolder === "Enviados"} 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded}
              onClick={() => handleFolderClick("Enviados")}
            />
            <SidebarIcon 
              icon={<CheckCircle size={20} />} 
              label="Assinados" 
              active={activeFolder === "Assinados"} 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded}
              onClick={() => handleFolderClick("Assinados")}
            />
            <SidebarIcon 
              icon={<AlertCircle size={20} />} 
              label="Ação necessária" 
              active={activeFolder === "Ação necessária"} 
              isDarkMode={isDarkMode} 
              expanded={isSidebarExpanded}
              onClick={() => handleFolderClick("Ação necessária")}
            />
            
            {/* Dropdown Section */}
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => {
                  if (!isSidebarExpanded) {
                     setIsSidebarExpanded(true);
                     setTimeout(() => setIsDocsSubMenuOpen(true), 100);
                  } else {
                     setIsDocsSubMenuOpen(!isDocsSubMenuOpen);
                  }
                }}
                className={cn(
                  "p-3 rounded-xl transition-all duration-200 relative group flex items-center w-full hover:bg-gray-100 dark:hover:bg-gray-700",
                  isSidebarExpanded ? "justify-start gap-3 px-4" : "justify-center"
                )}
              >
                 <span className="shrink-0 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300">
                    {isDocsSubMenuOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                 </span>
                 {isSidebarExpanded && (
                   <span className="text-sm font-medium text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200">
                     Mostrar mais
                   </span>
                 )}
              </button>

              {/* Submenu Items */}
              {(isDocsSubMenuOpen || !isSidebarExpanded) && (
                <div className={cn(
                  "flex flex-col gap-1 overflow-hidden transition-all duration-300",
                  isDocsSubMenuOpen ? "max-h-[500px] mt-1" : "max-h-0",
                  !isSidebarExpanded && "hidden"
                )}>
                  <SidebarIcon 
                    icon={<Trash2 size={18} />} 
                    label="Cancelados" 
                    isDarkMode={isDarkMode} 
                    expanded={isSidebarExpanded} 
                    isSubItem 
                    active={activeFolder === "Cancelados"}
                    onClick={() => handleFolderClick("Cancelados")}
                  />
                  <SidebarIcon 
                    icon={<AlertOctagon size={18} />} 
                    label="Expirados" 
                    isDarkMode={isDarkMode} 
                    expanded={isSidebarExpanded} 
                    isSubItem 
                    active={activeFolder === "Expirados"}
                    onClick={() => handleFolderClick("Expirados")}
                  />
                  <SidebarIcon 
                    icon={<Timer size={18} />} 
                    label="Expira em breve" 
                    isDarkMode={isDarkMode} 
                    expanded={isSidebarExpanded} 
                    isSubItem 
                    active={activeFolder === "Expira em breve"}
                    onClick={() => handleFolderClick("Expira em breve")}
                  />
                  <SidebarIcon 
                    icon={<AlertTriangle size={18} />} 
                    label="Falha na com." 
                    isDarkMode={isDarkMode} 
                    expanded={isSidebarExpanded} 
                    isSubItem 
                    active={activeFolder === "Falha na com."}
                    onClick={() => handleFolderClick("Falha na com.")}
                  />
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("min-h-screen flex bg-[#f0f2f5] font-sans transition-colors duration-300", isDarkMode ? "dark bg-gray-900 text-white" : "")}>
      
      {/* Sidebar - Retracted/Expanded */}
      <aside className={cn(
        "flex flex-col items-center py-6 border-r transition-all duration-300 z-20 sticky top-0 h-screen scrollbar-hide overflow-y-auto overflow-x-hidden",
        isSidebarExpanded ? "w-64" : "w-[70px]",
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      )}>
        <div className="flex flex-col gap-6 w-full px-3 flex-1">
          {/* Header Section of Sidebar: Logo + Toggle */}
          <div className={cn("flex items-center w-full transition-all duration-300", isSidebarExpanded ? "justify-between px-2" : "justify-center")}>
            {isSidebarExpanded && (
               <div className={cn("flex items-center overflow-hidden animate-in fade-in slide-in-from-left-2 duration-300", isDarkMode ? "text-white" : "text-[#8925E2]")}>
                  <Logo className="w-28 h-auto" />
               </div>
            )}
            <button
              id="tour-sidebar-toggle"
              onClick={toggleSidebar}
              className={cn(
                "p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0",
                isDarkMode ? "hover:bg-gray-700 text-gray-400" : "text-gray-500"
              )}
            >
               {isSidebarExpanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
          
          <div className="w-full h-[1px] bg-gray-200 my-2 opacity-50" />

          {/* Navigation Icons - Dynamic based on activeTab */}
          <div className="flex flex-col gap-2 w-full">
            {renderSidebarContent()}
          </div>
          
          {/* Sidebar Footer */}
          <div className="mt-auto flex flex-col gap-4 w-full">
             <div className={cn("flex items-center", isSidebarExpanded ? "justify-start px-2 gap-3" : "justify-center")}>
               <button 
                  onClick={toggleTheme}
                  className={cn(
                    "p-3 rounded-full transition-all duration-300 relative", 
                    isDarkMode ? "bg-yellow-400/20 text-yellow-400" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  )}
               >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>
               {isSidebarExpanded && (
                  <span className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                    {isDarkMode ? "Modo Claro" : "Modo Escuro"}
                  </span>
               )}
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className={cn(
          "h-20 flex items-center justify-between px-8 transition-colors sticky top-0 z-40",
          isDarkMode ? "bg-gray-900" : "bg-[#f0f2f5]"
        )}>
          <div className="flex items-center gap-12">
            
            {/* Navigation Tabs (Pill Style) */}
            <nav className="hidden md:flex items-center gap-2">
              {["Início", "Documentos", "Modelos", "Relatórios", "Adm"].map((tab) => (
                <button
                  key={tab}
                  id={`tour-tab-${tab}`}
                  onClick={() => {
                     if (tab === "Documentos") {
                        setTriggerNewEnvelope(false);
                        setTargetDocumentId(null);
                     }
                     setActiveTab(tab);
                  }}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                    activeTab === tab
                      ? (isDarkMode ? "bg-[#8925E2] text-white shadow-md" : "bg-[#f5eafe] text-[#8925E2] font-bold shadow-sm")
                      : (isDarkMode ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-[#8925E2] hover:bg-[#f5eafe]/50")
                  )}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 relative">
            <div className="relative hidden lg:block" ref={searchRef} id="tour-search">
              <div className={cn(
                "relative rounded-full px-4 py-2.5 flex items-center gap-2 w-64 transition-colors", 
                isDarkMode ? "bg-gray-800" : "bg-white shadow-sm"
              )}>
                <SearchIcon size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => {
                    if(searchQuery.length > 0) setIsSearchOpen(true);
                  }}
                  className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-400"
                />
              </div>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div className={cn(
                  "absolute top-full left-0 right-0 mt-2 w-96 -translate-x-16 rounded-xl shadow-xl border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 max-h-[500px] overflow-y-auto",
                  isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"
                )}>
                  {filteredDocuments.length === 0 && filteredTemplates.length === 0 && filteredPeople.length === 0 ? (
                     <div className="p-4 text-center text-gray-500 dark:text-gray-400 text-sm">
                        Nenhum resultado encontrado.
                     </div>
                  ) : (
                    <>
                      {/* Documents Section */}
                      {filteredDocuments.length > 0 && (
                        <div className="p-2">
                           <h3 className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                              Documentos
                           </h3>
                           {filteredDocuments.map(doc => (
                             <div 
                               key={doc.id} 
                               onClick={() => {
                                 setActiveTab("Documentos");
                                 setTargetDocumentId(doc.id.toString());
                                 setIsSearchOpen(false);
                                 setSearchQuery("");
                               }}
                               className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer flex items-center gap-3"
                             >
                                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg dark:bg-purple-900/30 dark:text-purple-300">
                                   <FileText size={16} />
                                </div>
                                <div>
                                   <p className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>{doc.title}</p>
                                   <p className="text-xs text-gray-400">{doc.type} • {doc.date}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}

                      {(filteredDocuments.length > 0 && (filteredTemplates.length > 0 || filteredPeople.length > 0)) && (
                         <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mx-2" />
                      )}

                      {/* Templates Section */}
                      {filteredTemplates.length > 0 && (
                        <div className="p-2">
                           <h3 className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                              Modelos
                           </h3>
                           {filteredTemplates.map(template => (
                             <div 
                               key={template.id} 
                               onClick={() => {
                                 setActiveTab("Modelos");
                                 setTargetTemplateId(template.id.toString());
                                 setIsSearchOpen(false);
                                 setSearchQuery("");
                               }}
                               className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer flex items-center gap-3"
                             >
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg dark:bg-indigo-900/30 dark:text-indigo-300">
                                   <Layers size={16} />
                                </div>
                                <div>
                                   <p className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>{template.title}</p>
                                   <p className="text-xs text-gray-400">{template.type} • {template.date}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}

                      {(filteredTemplates.length > 0 && filteredPeople.length > 0) && (
                         <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mx-2" />
                      )}

                      {/* People Section */}
                      {filteredPeople.length > 0 && (
                        <div className="p-2">
                           <h3 className="px-3 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                              Pessoas
                           </h3>
                           {filteredPeople.map(person => (
                             <div 
                               key={person.id} 
                               onClick={() => {
                                 setActiveTab("Gestão de Clientes");
                                 setIsSearchOpen(false);
                                 setSearchQuery("");
                               }}
                               className="px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer flex items-center gap-3"
                             >
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-900/30 dark:text-blue-300">
                                   <User size={16} />
                                </div>
                                <div>
                                   <p className={cn("text-sm font-medium", isDarkMode ? "text-white" : "text-gray-900")}>{person.name}</p>
                                   <p className="text-xs text-gray-400">{person.role} • {person.email}</p>
                                </div>
                             </div>
                           ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
            
            {/* Plans Button */}
             <button 
               onClick={() => setIsPlansModalOpen(true)}
               className={cn(
                 "px-4 py-2 rounded-full font-bold text-sm transition-colors shadow-sm", 
                 isDarkMode ? "bg-purple-900/30 text-purple-300 hover:bg-purple-900/50" : "bg-purple-50 text-[#8925e2] hover:bg-purple-100"
               )}
             >
               Ver planos
            </button>

            {/* Tasks Button */}
            <button 
               id="tour-tasks"
               onClick={() => setIsTasksOpen(true)}
               className={cn("p-2.5 rounded-full hover:bg-gray-200/50 transition-colors bg-white shadow-sm", isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "")}
            >
               <CheckSquare size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
            </button>
            
            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button 
                id="tour-notifications"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={cn(
                  "p-2.5 rounded-full hover:bg-gray-200/50 transition-colors bg-white shadow-sm relative", 
                  isDarkMode ? "bg-gray-800 hover:bg-gray-700 text-white" : "",
                  isNotificationsOpen ? "ring-2 ring-purple-500" : ""
                )}
              >
                 <Bell size={20} className={isDarkMode ? "text-gray-300" : "text-gray-600"} />
                 <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
              </button>

              {/* Notification Dropdown */}
              {isNotificationsOpen && (
                <div className={cn(
                  "absolute right-0 top-full mt-4 w-80 rounded-2xl shadow-xl border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right",
                  isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-100"
                )}>
                  <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-bold">Notificações</h3>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full font-bold dark:bg-purple-900/30 dark:text-purple-300">3 Novas</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {[
                      { title: "Contrato Assinado", desc: "João Silva assinou o contrato #1234", time: "2 min atrás", icon: <Check size={16} />, color: "bg-green-100 text-green-600" },
                      { title: "Novo Documento", desc: "Você recebeu um novo documento", time: "1 hora atrás", icon: <Mail size={16} />, color: "bg-blue-100 text-blue-600" },
                      { title: "Aviso de Expiração", desc: "O contrato #5678 expira amanhã", time: "5 horas atrás", icon: <Calendar size={16} />, color: "bg-yellow-100 text-yellow-600" },
                    ].map((notif, i) => (
                      <div key={i} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-start gap-3 transition-colors cursor-pointer">
                        <div className={cn("p-2 rounded-full shrink-0 mt-0.5", notif.color)}>
                          {notif.icon}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{notif.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">{notif.desc}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100 dark:border-gray-700">
                    <button 
                      onClick={() => {
                        setIsNotificationsSidebarOpen(true);
                        setIsNotificationsOpen(false);
                      }}
                      className="text-sm font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                    >
                      Ver todas
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <div className="relative" ref={profileRef} id="tour-profile">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 overflow-hidden border-2 border-white shadow-sm cursor-pointer hover:ring-2 ring-purple-500 transition-all"
              >
                 <img src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MDIxMjYxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="User" className="w-full h-full object-cover" />
              </div>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                 <div className={cn(
                    "absolute right-0 top-full mt-4 w-72 rounded-2xl shadow-xl border overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right",
                    isDarkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-100"
                 )}>
                    {/* Header: User Info */}
                    <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50">
                       <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 overflow-hidden border-2 border-white shadow-sm">
                             <img src="https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MDIxMjYxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="User" className="w-full h-full object-cover" />
                          </div>
                          <div>
                             <h4 className="font-bold text-sm">Gabriel Barbosa</h4>
                             <p className="text-xs text-purple-600 font-bold mb-0.5">Diretor Comercial</p>
                             <p className="text-xs text-gray-500 dark:text-gray-400">gab.feelix@gmail.com</p>
                          </div>
                       </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="p-2">
                       <button 
                          onClick={() => {
                             setActiveTab("Meu Perfil");
                             setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-sm transition-colors text-gray-700 dark:text-gray-200"
                       >
                          <User size={16} className="text-gray-400" />
                          Meu Perfil
                       </button>
                       <div className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-start gap-3 text-sm transition-colors text-gray-700 dark:text-gray-200 cursor-default">
                          <FileText size={16} className="text-gray-400 mt-0.5" />
                          <div className="flex-1">
                             <div className="flex items-center justify-between mb-0.5">
                                <span className="font-medium">Disponíveis</span>
                                <span className="text-xs font-bold text-gray-900 dark:text-white">5/10</span>
                             </div>
                             <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                   +{extraCredits} extras
                                   <span className="text-[10px] text-gray-400">(não expiram)</span>
                                </span>
                                <button 
                                  onClick={(e) => {
                                     e.stopPropagation();
                                     setIsBuyCreditsModalOpen(true);
                                     setIsProfileOpen(false);
                                  }}
                                  className="w-5 h-5 bg-[#8925e2] hover:bg-[#7a1fd0] text-white rounded-full flex items-center justify-center transition-colors shadow-sm"
                                  title="Adicionar envelopes extras"
                                >
                                   <Plus size={12} />
                                </button>
                             </div>
                          </div>
                       </div>
                    </div>
                    
                    <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mx-2" />
                    
                    {/* Theme Toggle in Dropdown */}
                    <div className="p-2">
                       <div className="w-full px-4 py-2.5 flex items-center justify-between text-sm text-gray-700 dark:text-gray-200">
                          <div className="flex items-center gap-3">
                             {isDarkMode ? <Moon size={16} className="text-purple-400" /> : <Sun size={16} className="text-yellow-500" />}
                             Modo Escuro
                          </div>
                          <button 
                             onClick={toggleTheme}
                             className={cn(
                                "w-10 h-5 rounded-full relative transition-colors duration-300",
                                isDarkMode ? "bg-purple-600" : "bg-gray-300"
                             )}
                          >
                             <div className={cn(
                                "absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-transform duration-300 shadow-sm",
                                isDarkMode ? "translate-x-5" : "translate-x-0"
                             )} />
                          </button>
                       </div>
                    </div>

                    <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mx-2" />

                    <div className="p-2">
                       <button 
                          onClick={() => {
                             setIsNewsSidebarOpen(true);
                             setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-sm transition-colors text-gray-700 dark:text-gray-200"
                       >
                          <Star size={16} className="text-gray-400" />
                          Novidades
                       </button>
                       <button 
                          onClick={() => {
                             setActiveTab("Central de Ajuda");
                             setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-sm transition-colors text-gray-700 dark:text-gray-200"
                       >
                          <HelpCircle size={16} className="text-gray-400" />
                          Central de Ajuda
                       </button>
                       <button 
                          onClick={() => {
                             setLegalModalType('terms');
                             setIsLegalModalOpen(true);
                             setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-sm transition-colors text-gray-700 dark:text-gray-200"
                       >
                          <FileTextIcon size={16} className="text-gray-400" />
                          Termos de Uso
                       </button>
                       <button 
                          onClick={() => {
                             setLegalModalType('privacy');
                             setIsLegalModalOpen(true);
                             setIsProfileOpen(false);
                          }}
                          className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center gap-3 text-sm transition-colors text-gray-700 dark:text-gray-200"
                       >
                          <Lock size={16} className="text-gray-400" />
                          Política de Privacidade
                       </button>
                    </div>

                    <div className="h-[1px] bg-gray-100 dark:bg-gray-700 mx-2" />

                    <div className="p-2">
                       <button 
                         onClick={() => {
                            setIsLogoutModalOpen(true);
                            setIsProfileOpen(false);
                         }}
                         className="w-full text-left px-4 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 text-sm transition-colors text-red-600 dark:text-red-400"
                       >
                          <LogOut size={16} />
                          Sair
                       </button>
                    </div>
                 </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-8 relative">
           {activeTab === "Início" ? (
             <Dashboard 
               onNavigate={handleNavigate}
               onNewEnvelope={handleNewEnvelope}
               onUseTemplate={handleUseTemplate}
               onUseFavoriteTemplate={handleUseFavoriteTemplate}
               onBuyCredits={() => setIsBuyCreditsModalOpen(true)}
               activeViewWidgets={activeViewWidgets}
               onStartOnboarding={onStartOnboarding}
               onOpenPlansModal={() => setIsPlansModalOpen(true)}
               onSimulateError={() => setIsSystemErrorOpen(true)}
             />
           ) : activeTab === "Gestão de Clientes" ? (
             <ClientManagement />
           ) : activeTab === "Modelos" ? (
             <div id="tour-models-content">
               <Templates 
                 activeView={templateSection} 
                 isCreateOpen={isCreateTemplateOpen}
                 onCloseCreate={() => setIsCreateTemplateOpen(false)}
                 onCreateOpen={() => setIsCreateTemplateOpen(true)}
                 externalTemplateId={targetTemplateId}
                 initialAction={initialTemplateAction}
               />
             </div>
           ) : activeTab === "Adm" ? (
             <Admin activeSection={adminSection} initialAction={initialAdminAction} />
           ) : activeTab === "Relatórios" ? (
             <div id="tour-reports-content">
               <Reports activeView={reportSection} />
             </div>
           ) : activeTab === "Central de Ajuda" ? (
             <HelpCenter />
           ) : activeTab === "Meu Perfil" ? (
             <UserProfile 
               activeTab={profileSection}
               onTabChange={setProfileSection}
             />
           ) : activeTab === "Configurações da Conta" ? (
             <AccountSettings />
           ) : activeTab === "Planos" ? (
             <Plans />
           ) : (
             // Documentos, Adm (defaults to Dashboard for now)
             React.cloneElement(children as React.ReactElement, { 
               activeFolder,
               triggerNewEnvelope,
               onNewEnvelopeClosed: () => setTriggerNewEnvelope(false),
               onNewEnvelopeOpen: () => setTriggerNewEnvelope(true),
               externalDocumentId: targetDocumentId
             })
           )}
        </main>
      </div>
      {/* Modals */}
      <SystemAlert 
        isOpen={isSystemErrorOpen}
        onClose={() => setIsSystemErrorOpen(false)}
        onRetry={() => {
           // Simulate retry loading then close
           const toastId = toast.loading('Reconectando...');
           setTimeout(() => {
             toast.dismiss(toastId);
             setIsSystemErrorOpen(false);
             toast.success('Conexão restabelecida!');
           }, 1500);
        }}
      />
      <PlansModal 
        isOpen={isPlansModalOpen}
        onClose={() => setIsPlansModalOpen(false)}
      />
      <CreateViewModal 
        isOpen={isCreateViewModalOpen}
        onClose={() => {
          setIsCreateViewModalOpen(false);
          setEditingView(null);
        }}
        onSave={(name, widgets) => {
          if (editingView && onEditView) {
            onEditView(editingView.id, name, widgets);
          } else if (onAddView) {
            onAddView(name, widgets);
          }
          setEditingView(null);
        }}
        initialData={editingView ? { name: editingView.name, widgets: editingView.widgets } : undefined}
        onDelete={editingView && onDeleteView ? () => onDeleteView(editingView.id) : undefined}
      />

      <LegalModal 
        isOpen={isLegalModalOpen} 
        onClose={() => setIsLegalModalOpen(false)} 
        type={legalModalType} 
      />
      
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={() => {
           setIsLogoutModalOpen(false);
           if (onLogout) onLogout();
        }}
      />
      
      <TasksSidebar 
        isOpen={isTasksOpen} 
        onClose={() => setIsTasksOpen(false)} 
        onNavigateToDocument={(docId) => {
          setActiveTab("Documentos");
          if (docId) setTargetDocumentId(docId);
          setIsTasksOpen(false);
        }}
      />

      <NotificationsSidebar 
        isOpen={isNotificationsSidebarOpen} 
        onClose={() => setIsNotificationsSidebarOpen(false)} 
      />

      <NewsSidebar 
        isOpen={isNewsSidebarOpen} 
        onClose={() => setIsNewsSidebarOpen(false)} 
      />

      <TemplateSelectorModal
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        onSelect={handleTemplateSelectedFromModal}
      />

      <BuyCreditsModal 
        isOpen={isBuyCreditsModalOpen}
        onClose={() => setIsBuyCreditsModalOpen(false)}
        onSuccess={(credits) => setExtraCredits(prev => prev + credits)}
      />
      <Toaster position="top-center" richColors />
      
      <OnboardingTour 
        run={!!startOnboarding}
        onFinish={() => onOnboardingComplete && onOnboardingComplete()}
        activeTab={activeTab}
        isSidebarExpanded={isSidebarExpanded}
        isNewEnvelopeOpen={triggerNewEnvelope}
      />
    </div>
  );
}

function SidebarIcon({ 
  icon, 
  label, 
  active, 
  isDarkMode, 
  expanded, 
  isSubItem,
  onClick,
  onEdit
}: { 
  icon: React.ReactNode, 
  label?: React.ReactNode, 
  active?: boolean, 
  isDarkMode: boolean, 
  expanded: boolean, 
  isSubItem?: boolean,
  onClick?: () => void,
  onEdit?: () => void
}) {
  return (
    <div className="relative group/item w-full">
      <button 
        onClick={onClick}
        className={cn(
          "p-3 rounded-xl transition-all duration-200 relative group flex items-center w-full",
          active 
            ? (isDarkMode ? "bg-gray-700 text-white shadow-md" : "bg-white text-purple-600 shadow-md border border-gray-100") 
            : "text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
          expanded ? "justify-start gap-3 px-4" : "justify-center",
          isSubItem && expanded ? "pl-8 text-sm" : "" // Indent sub items
        )}
      >
        <span className={cn("shrink-0", isSubItem ? "scale-90" : "")}>{icon}</span>
        {expanded && (
          <span className={cn(
            "text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-left-2",
            active ? "font-bold" : "",
            isSubItem ? "text-gray-500 font-normal" : ""
          )}>
            {label}
          </span>
        )}
        
        {active && !expanded && !isSubItem && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-full -ml-[14px]" />
        )}
        
        {active && expanded && !onEdit && (
           <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-500" />
        )}
      </button>

      {/* Edit Button for Custom Views */}
      {expanded && active && onEdit && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 dark:text-gray-500 dark:hover:text-purple-300 transition-colors opacity-0 group-hover/item:opacity-100"
          title="Editar visão"
        >
          <Settings size={14} />
        </button>
      )}
    </div>
  );
}