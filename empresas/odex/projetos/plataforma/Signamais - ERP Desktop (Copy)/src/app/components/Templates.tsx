import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Users, 
  Star, 
  Trash2, 
  Layout,
  Search,
  ChevronDown,
  Grid,
  List as ListIcon,
  Archive,
  Send,
  X,
  Plus
} from 'lucide-react';
import { TemplateList } from './templates/TemplateList';
import { TemplateEmptyState } from './templates/EmptyStates';
import { CreateTemplate } from './templates/CreateTemplate';
import { TemplateDetails } from './templates/TemplateDetails';
import { NewEnvelope } from './NewEnvelope';
import { toast } from 'sonner';
import { AdvancedFilter } from './common/AdvancedFilter';

// Types
export type TemplateView = 'my-templates' | 'shared' | 'favorites' | 'all' | 'deleted' | string;

export interface Template {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
  folders: string[];
  isFavorite: boolean;
  isShared: boolean;
  isDeleted: boolean;
  isArchived?: boolean;
}

// Mock Data
const MOCK_TEMPLATES: Template[] = [
  { id: '1', name: 'Contrato de Prestação de Serviços', owner: 'Eu', createdAt: '10/02/2025', updatedAt: 'Hoje', folders: ['Contratos'], isFavorite: true, isShared: false, isDeleted: false },
  { id: '2', name: 'NDA - Padrão', owner: 'Eu', createdAt: '05/01/2025', updatedAt: 'Ontem', folders: ['Jurídico'], isFavorite: false, isShared: false, isDeleted: false },
  { id: '3', name: 'Termo de Aceite', owner: 'Maria Silva', createdAt: '15/12/2024', updatedAt: '20/01/2025', folders: [], isFavorite: false, isShared: true, isDeleted: false },
  { id: '4', name: 'Modelo Antigo 2023', owner: 'Eu', createdAt: '01/01/2023', updatedAt: '01/01/2023', folders: [], isFavorite: false, isShared: false, isDeleted: true },
  { id: '5', name: 'Proposta Comercial - Enterprise', owner: 'Eu', createdAt: '20/02/2025', updatedAt: 'Hoje', folders: ['Vendas'], isFavorite: true, isShared: false, isDeleted: false },
  { id: '6', name: 'Aditivo Contratual v2', owner: 'Eu', createdAt: '18/02/2025', updatedAt: 'Ontem', folders: ['Contratos'], isFavorite: false, isShared: false, isDeleted: false },
  { id: '7', name: 'Termo de Confidencialidade (Simples)', owner: 'João Pedro', createdAt: '10/01/2025', updatedAt: '12/02/2025', folders: ['Jurídico'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '8', name: 'Contrato de Locação Residencial', owner: 'Eu', createdAt: '05/11/2024', updatedAt: '15/01/2025', folders: ['Imobiliário'], isFavorite: true, isShared: false, isDeleted: false },
  { id: '9', name: 'Recibo de Pagamento - Autônomo', owner: 'Financeiro', createdAt: '01/03/2024', updatedAt: '10/01/2025', folders: ['Financeiro'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '10', name: 'Autorização de Imagem', owner: 'Marketing', createdAt: '10/10/2024', updatedAt: '05/01/2025', folders: ['Marketing'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '11', name: 'Contrato Social - Draft', owner: 'Eu', createdAt: '02/02/2025', updatedAt: '03/02/2025', folders: ['Corporativo'], isFavorite: false, isShared: false, isDeleted: false },
  { id: '12', name: 'Proposta de Parceria', owner: 'Eu', createdAt: '15/02/2025', updatedAt: '18/02/2025', folders: ['Vendas'], isFavorite: false, isShared: false, isDeleted: false },
  { id: '13', name: 'Checklist de Onboarding', owner: 'RH', createdAt: '01/02/2025', updatedAt: '05/02/2025', folders: ['RH'], isFavorite: true, isShared: true, isDeleted: false },
  { id: '14', name: 'Memorando de Entendimento (MoU)', owner: 'Eu', createdAt: '20/01/2025', updatedAt: '25/01/2025', folders: ['Jurídico'], isFavorite: false, isShared: false, isDeleted: false },
  { id: '15', name: 'Termo de Entrega de Equipamento', owner: 'TI', createdAt: '10/01/2025', updatedAt: '12/01/2025', folders: ['TI', 'RH'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '16', name: 'Notificação Extrajudicial', owner: 'Eu', createdAt: '05/12/2024', updatedAt: '05/12/2024', folders: [], isFavorite: false, isShared: false, isDeleted: true },
  { id: '17', name: 'Minuta Padrão - Fornecedores', owner: 'Compras', createdAt: '15/11/2024', updatedAt: '20/12/2024', folders: ['Compras'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '18', name: 'Formulário de Feedback', owner: 'RH', createdAt: '01/11/2024', updatedAt: '01/11/2024', folders: ['RH'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '19', name: 'Política de Privacidade Interna', owner: 'Jurídico', createdAt: '10/10/2024', updatedAt: '15/10/2024', folders: ['Compliance'], isFavorite: true, isShared: true, isDeleted: false },
  { id: '20', name: 'Apresentação Institucional (PDF)', owner: 'Marketing', createdAt: '01/10/2024', updatedAt: '01/10/2024', folders: ['Marketing'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '21', name: 'Contrato de Consultoria', owner: 'Eu', createdAt: '15/09/2024', updatedAt: '15/09/2024', folders: ['Consultoria'], isFavorite: false, isShared: false, isDeleted: true },
  { id: '22', name: 'Briefing de Projeto', owner: 'Projetos', createdAt: '01/09/2024', updatedAt: '05/09/2024', folders: ['Projetos'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '23', name: 'Relatório de Visita Técnica', owner: 'Engenharia', createdAt: '20/08/2024', updatedAt: '22/08/2024', folders: ['Técnico'], isFavorite: false, isShared: true, isDeleted: false },
  { id: '24', name: 'Orçamento Padrão 2024', owner: 'Vendas', createdAt: '10/01/2024', updatedAt: '10/01/2024', folders: ['Vendas'], isFavorite: true, isShared: true, isDeleted: false },
];

interface TemplatesProps {
  activeView: TemplateView;
  isCreateOpen?: boolean;
  onCloseCreate?: () => void;
  onCreateOpen?: () => void; // Fallback if called from empty state
  externalTemplateId?: string | null;
  initialAction?: 'view' | 'use';
}

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Templates({ activeView, isCreateOpen = false, onCloseCreate, onCreateOpen, externalTemplateId, initialAction = 'view' }: TemplatesProps) {
  const [templates, setTemplates] = useState<Template[]>(MOCK_TEMPLATES);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  useEffect(() => {
    if (externalTemplateId) {
       if (initialAction === 'use') {
         const tmpl = templates.find(t => t.id === externalTemplateId);
         if (tmpl) setUsingTemplate(tmpl);
       } else {
         setSelectedTemplateId(externalTemplateId);
       }
    }
  }, [externalTemplateId, initialAction]);

  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [usingTemplate, setUsingTemplate] = useState<Template | null>(null);

  const handleCreateTemplate = (newTemplate: any) => {
    if (editingTemplate) {
        // Update existing logic
        setTemplates(templates.map(t => t.id === editingTemplate.id ? { ...t, name: newTemplate.name, updatedAt: 'Agora' } : t));
        setEditingTemplate(null);
    } else {
        // Create new logic
        const template: Template = {
          id: Math.random().toString(),
          name: newTemplate.name,
          owner: 'Eu',
          createdAt: new Date().toLocaleDateString(),
          updatedAt: 'Agora',
          folders: [],
          isFavorite: false,
          isShared: false,
          isDeleted: false
        };
        setTemplates([template, ...templates]);
    }
    
    if (onCloseCreate) onCloseCreate();
  };

  const filteredTemplates = templates.filter(t => {
    if (activeView === 'deleted') return t.isDeleted;
    if (t.isDeleted) return false;

    switch (activeView) {
      case 'my-templates': return t.owner === 'Eu';
      case 'shared': return t.isShared;
      case 'favorites': return t.isFavorite;
      case 'all': return true;
      // Pasta específica (assumindo que activeView pode ser o nome da pasta ou ID)
      default: 
        if (activeView.startsWith('folder:')) {
           const folderName = activeView.replace('folder:', '');
           return t.folders.includes(folderName);
        }
        return true;
    }
  });

  const getTitle = () => {
    // Note: The user requested a static title "Modelos de Envelopes" for the page header, 
    // but the functionality of filtering remains.
    // If we want to keep the dynamic filtering but static title, we just return the static string here
    // or handle it in the render.
    // However, usually the title reflects the view. The user said: "o Titulo é: Modelos de Envelopes, ele nao muda".
    // So I will change this function to return "Modelos de Envelopes" always, OR I will just use the string directly in the render.
    // But let's keep the logic if we need subtitles. 
    // Actually, I will just hardcode the title in the render and remove this usage or update it.
    return 'Modelos de Envelopes';
  };

  const handleBulkArchive = () => {
    setTemplates(prev => prev.map(t => selectedIds.includes(t.id) ? { ...t, isArchived: true } : t));
    toast.success(`${selectedIds.length} modelos arquivados com sucesso.`);
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setTemplates(prev => prev.map(t => selectedIds.includes(t.id) ? { ...t, isDeleted: true } : t));
    toast.success(`${selectedIds.length} modelos movidos para a lixeira.`);
    setSelectedIds([]);
  };

  const handleBulkSend = () => {
    toast.success(`${selectedIds.length} modelos preparados para envio.`);
    setSelectedIds([]);
  };

  if (isCreateOpen || editingTemplate) {
    return (
      <CreateTemplate 
        onBack={() => {
           if (onCloseCreate) onCloseCreate();
           setEditingTemplate(null);
        }} 
        onSave={handleCreateTemplate}
        initialData={editingTemplate}
        isEditing={!!editingTemplate}
      />
    );
  }

  if (usingTemplate) {
    return (
      <NewEnvelope 
        onBack={() => setUsingTemplate(null)}
        initialData={usingTemplate}
      />
    );
  }

  // Render Template Details if selected
  if (selectedTemplateId) {
    const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
    if (selectedTemplate) {
       return (
         <TemplateDetails 
           template={selectedTemplate} 
           onBack={() => setSelectedTemplateId(null)}
           onUse={() => setUsingTemplate(selectedTemplate)}
           onEdit={() => setEditingTemplate(selectedTemplate)}
         />
       );
    }
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 w-full max-w-[1600px] mx-auto gap-8 relative pb-20">
      
        {/* Page Header (Matching Dashboard Style) */}
        <div className="flex flex-col gap-2">
          <h1 className="text-[32px] font-bold text-gray-900 font-[Lufga,sans-serif] dark:text-white leading-none tracking-tight">
            {getTitle()}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Gerencie seus modelos de documentos e envelopes.</p>
        </div>

        {/* Filters & Controls */}
        <div className="flex items-center gap-4">
            <div className="bg-[#f5f4f7] dark:bg-gray-800 rounded-2xl flex items-center px-4 py-3 flex-1 max-w-sm">
               <Search className="text-gray-400 w-5 h-5 mr-3" />
               <input 
                 type="text" 
                 placeholder={`Pesquisar em ${getTitle()}...`}
                 className="bg-transparent border-none outline-none text-gray-600 w-full placeholder-gray-400 dark:text-gray-200"
               />
            </div>

            <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 border-transparent hover:border-[#8925e2]/20 rounded-2xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 transition-colors shadow-sm">
                  Data <ChevronDown size={16} className="text-gray-400" />
                </button>
                
                <AdvancedFilter 
                  options={{
                    status: [
                      { id: 'active', label: 'Ativo' },
                      { id: 'draft', label: 'Rascunho' },
                      { id: 'archived', label: 'Arquivado' },
                      { id: 'shared', label: 'Compartilhado' }
                    ]
                  }}
                  onApply={(filters) => {
                    console.log('Filters applied:', filters);
                    toast.success('Filtros aplicados com sucesso');
                  }}
                  label="Pesquisa avançada"
                />
            </div>

            <button 
              onClick={onCreateOpen}
              className="bg-[#8925e2] text-white font-bold py-3 px-4 rounded-xl hover:bg-[#7a1fd0] transition-colors flex items-center gap-2 shadow-lg shadow-purple-500/20 ml-2"
            >
              <Plus size={20} />
              Criar modelo
            </button>

             <div className="flex items-center gap-2 ml-auto">
              <button 
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-3 rounded-xl transition-colors shadow-sm border",
                  viewMode === 'list' 
                    ? "bg-white dark:bg-gray-800 text-purple-600 border-gray-100 dark:border-gray-700" 
                    : "text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                )}
              >
                 <ListIcon size={20} />
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-3 rounded-xl transition-colors shadow-sm border",
                  viewMode === 'grid' 
                    ? "bg-white dark:bg-gray-800 text-purple-600 border-gray-100 dark:border-gray-700" 
                    : "text-gray-400 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                )}
              >
                 <Grid size={20} />
              </button>
            </div>
        </div>

        {/* Content Body */}
        <div className="flex-1">
          {filteredTemplates.length > 0 ? (
            <TemplateList 
              templates={filteredTemplates} 
              activeView={activeView as any}
              viewMode={viewMode}
              setTemplates={setTemplates} 
              onSelectTemplate={setSelectedTemplateId}
              selectedIds={selectedIds}
              onSelectionChange={setSelectedIds}
            />
          ) : (
            <TemplateEmptyState view={activeView as any} onCreate={onCreateOpen || (() => {})} />
          )}
        </div>

    </div>
  );
}