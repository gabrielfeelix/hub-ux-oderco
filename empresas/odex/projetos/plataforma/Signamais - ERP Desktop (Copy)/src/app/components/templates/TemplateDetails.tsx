import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Star, 
  Copy, 
  MoreVertical, 
  FileText, 
  User, 
  Folder, 
  Mail, 
  Eye, 
  Clock, 
  Settings, 
  CheckCircle, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Edit,
  Trash2,
  Share2,
  History,
  ArrowRightLeft,
  Smartphone,
  Shield,
  Bell,
  PenTool,
  Hash,
  CreditCard,
  Plus,
  Info,
  ZoomIn,
  ZoomOut,
  Maximize,
  X,
  Link,
  Calendar,
  Save,
  Layout,
  MousePointer2,
  Type,
  CheckSquare,
  List,
  AlignLeft,
  Move,
  AlertTriangle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Template } from '../Templates';
import { toast } from 'sonner'; // Assuming sonner is available or we use a mock

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface TemplateDetailsProps {
  template: Template;
  onBack: () => void;
  onUse: () => void;
  onEdit?: () => void;
}

// Mock Data for Tag Suggestions
const TAG_SUGGESTIONS = ['Locação', 'Venda', 'Aditivo', 'Urgente', 'Residencial', 'Comercial', 'RH', 'Financeiro'];

export function TemplateDetails({ template, onBack, onUse, onEdit }: TemplateDetailsProps) {
  // --- States ---
  const [activeTab, setActiveTab] = useState<'details' | 'recipients'>('details');
  const [isFavorite, setIsFavorite] = useState(template.isFavorite);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(false);
  
  // Description Edit State
  const [isEditingDesc, setIsEditingDesc] = useState(false);
  const [descText, setDescText] = useState("Este é um modelo padrão para prestação de serviços, incluindo cláusulas de confidencialidade e prazos de pagamento. Utilize este modelo para novos clientes corporativos.");
  const [tempDescText, setTempDescText] = useState(descText);

  // Email Message Edit State
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [emailSubject, setEmailSubject] = useState("Por favor, assine: Contrato de Prestação de Serviços - Signamais");
  const [emailMessage, setEmailMessage] = useState("Olá, segue o contrato para sua assinatura digital. Qualquer dúvida, estou à disposição.");
  const [tempEmailSubject, setTempEmailSubject] = useState(emailSubject);
  const [tempEmailMessage, setTempEmailMessage] = useState(emailMessage);

  // Settings Edit State
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [settings, setSettings] = useState({
    expiration: '30',
    reminders: '3',
    twoFactor: false,
    mobile: true
  });

  // Tags State
  const [tags, setTags] = useState(['Contratos', 'Comercial']);
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagInputValue, setTagInputValue] = useState("");
  
  // Modals & Overlays State
  const [activeModal, setActiveModal] = useState<null | 'duplicate' | 'move' | 'share' | 'transfer' | 'history' | 'delete'>(null);
  const [isEditingFields, setIsEditingFields] = useState(false);

  // Preview States
  const [previewPage, setPreviewPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);

  // --- Handlers ---

  const handleCopyId = () => {
    navigator.clipboard.writeText(template.id)
      .then(() => {
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
        toast.success("ID copiado para a área de transferência");
      })
      .catch((err) => {
        console.warn('Clipboard access denied', err);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
        // Still show success in UI for preview mode where clipboard might be blocked
        toast.success("ID copiado (simulado)");
      });
  };

  const handleSaveDesc = () => {
    setDescText(tempDescText);
    setIsEditingDesc(false);
    toast.success("Descrição atualizada com sucesso!");
  };

  const handleCancelDesc = () => {
    setTempDescText(descText);
    setIsEditingDesc(false);
  };

  const handleAddTag = (tag: string) => {
    if (tags.length >= 10) {
      toast.error("Limite máximo de 10 tags atingido.");
      return;
    }
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
      toast.success(`Tag '${tag}' adicionada.`);
    }
    setTagInputValue("");
    setShowTagInput(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const previousTags = [...tags];
    setTags(tags.filter(tag => tag !== tagToRemove));
    
    toast("Tag removida", {
      description: `Tag '${tagToRemove}' foi removida.`,
      action: {
        label: "Desfazer",
        onClick: () => setTags(previousTags),
      },
    });
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(prev + 25, 200);
      return Math.max(prev - 25, 50);
    });
  };

  const handleUseTemplate = () => {
    // Simulating the redirect flow
    const toastId = toast.loading("Preparando novo envelope...");
    setTimeout(() => {
        toast.dismiss(toastId);
        onUse(); // Call parent handler which would handle the router push
    }, 1000);
  };

  if (isEditingFields) {
    return <EditFieldsOverlay onClose={() => setIsEditingFields(false)} templateName={template.name} />;
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-300 w-full max-w-6xl mx-auto pb-10 relative">
      
      {/* Top Bar: Back & Status */}
      <div className="flex items-center justify-between mb-6">
         <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
               <ArrowLeft size={20} />
            </button>
            <span className="text-sm font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-3 py-1 rounded-full border border-green-100 dark:border-green-900/30 flex items-center gap-2">
               <CheckCircle size={14} /> Elegível para Correspondência
            </span>
         </div>
      </div>

      {/* Header: Title & Actions */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
         <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif]">{template.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
               <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs">ID: {template.id}</span>
               <button onClick={handleCopyId} className="hover:text-[#8925e2] transition-colors" title="Copiar ID">
                  {copiedId ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
               </button>
            </div>
         </div>

         <div className="flex items-center gap-3">
            <button 
               onClick={() => setIsFavorite(!isFavorite)}
               className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
               title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            >
               <Star size={20} fill={isFavorite ? "#EAB308" : "none"} className={isFavorite ? "text-yellow-400" : "text-gray-400 group-hover:text-yellow-400"} />
            </button>
            
            <button 
               onClick={handleUseTemplate}
               className="px-6 py-3 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
            >
               <PenTool size={18} /> Utilizar modelo
            </button>

            <div className="relative">
               <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
               >
                  <MoreVertical size={20} />
               </button>
               
               {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                     <div className="p-1 flex flex-col">
                        <MenuItem icon={<Edit size={14} />} label="Editar" onClick={() => { if(onEdit) onEdit(); setIsMenuOpen(false); }} />
                        <MenuItem icon={<Copy size={14} />} label="Duplicar" onClick={() => { setActiveModal('duplicate'); setIsMenuOpen(false); }} />
                        <MenuItem icon={<Folder size={14} />} label="Mover para pasta" onClick={() => { setActiveModal('move'); setIsMenuOpen(false); }} />
                        <MenuItem icon={<Share2 size={14} />} label="Compartilhar" onClick={() => { setActiveModal('share'); setIsMenuOpen(false); }} />
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                        <MenuItem icon={<ArrowRightLeft size={14} />} label="Transferir propriedade" onClick={() => { setActiveModal('transfer'); setIsMenuOpen(false); }} />
                        <MenuItem icon={<History size={14} />} label="Histórico" onClick={() => { setActiveModal('history'); setIsMenuOpen(false); }} />
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                        <MenuItem 
                           icon={<Trash2 size={14} />} 
                           label="Eliminar" 
                           className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400"
                           onClick={() => { setActiveModal('delete'); setIsMenuOpen(false); }}
                        />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700 mb-8">
         <button 
            onClick={() => setActiveTab('details')}
            className={cn(
               "pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2",
               activeTab === 'details' 
                  ? "border-[#8925e2] text-[#8925e2]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
         >
            <FileText size={16} /> Detalhes
         </button>
         <button 
            onClick={() => setActiveTab('recipients')}
            className={cn(
               "pb-3 text-sm font-bold border-b-2 transition-colors flex items-center gap-2",
               activeTab === 'recipients' 
                  ? "border-[#8925e2] text-[#8925e2]" 
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            )}
         >
            <User size={16} /> Destinatários (2)
         </button>
      </div>

      {/* Content Area */}
      {activeTab === 'details' ? (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT COLUMN: INFO */}
            <div className="lg:col-span-2 space-y-8">
               
               {/* 0. Key Metrics (Moved to Top for Visibility) */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard 
                     icon={<Mail size={20} />} 
                     value="47" 
                     label="Envelopes criados" 
                     color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300"
                     tooltip="Total de documentos criados com este modelo"
                  />
                  <StatCard 
                     icon={<Clock size={20} />} 
                     value="2 dias" 
                     label="Tempo médio" 
                     color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-300"
                     tooltip="Tempo médio de conclusão"
                  />
                  <StatCard 
                     icon={<CheckCircle size={20} />} 
                     value="98%" 
                     label="Taxa de conclusão" 
                     color="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-300"
                     tooltip="Taxa de sucesso dos envelopes"
                  />
               </div>

               {/* 1. Description */}
               <section>
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Descrição</h3>
                     {!isEditingDesc && (
                        <button 
                          onClick={() => setIsEditingDesc(true)}
                          className="p-1 text-gray-400 hover:text-[#8925e2] transition-colors rounded hover:bg-purple-50 dark:hover:bg-purple-900/20"
                          title="Editar descrição"
                        >
                           <Edit size={12} />
                        </button>
                     )}
                  </div>
                  
                  {isEditingDesc ? (
                    <div className="bg-white dark:bg-gray-800 border border-[#8925e2] rounded-xl p-3 shadow-sm animate-in fade-in duration-200">
                       <textarea
                          value={tempDescText}
                          onChange={(e) => setTempDescText(e.target.value)}
                          maxLength={500}
                          className="w-full text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none outline-none resize-none min-h-[100px]"
                          placeholder="Adicione uma descrição..."
                          autoFocus
                       />
                       <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                          <span className="text-xs text-gray-400">{tempDescText.length}/500</span>
                          <div className="flex gap-2">
                             <button 
                                onClick={handleCancelDesc}
                                className="px-3 py-1 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                             >
                                Cancelar
                             </button>
                             <button 
                                onClick={handleSaveDesc}
                                className="px-3 py-1 text-xs font-bold text-white bg-[#8925e2] hover:bg-[#7a1fd0] rounded-lg transition-colors"
                             >
                                Salvar
                             </button>
                          </div>
                       </div>
                    </div>
                  ) : (
                    <p 
                      className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed cursor-pointer hover:text-gray-700 dark:hover:text-gray-300 transition-colors border border-transparent hover:border-dashed hover:border-gray-300 dark:hover:border-gray-600 rounded p-1 -ml-1"
                      onClick={() => setIsEditingDesc(true)}
                      title="Clique para editar"
                    >
                       {descText || "Nenhuma descrição adicionada."}
                    </p>
                  )}
               </section>

               <div className="h-[1px] bg-gray-100 dark:bg-gray-800" />

               {/* 2. Documents (New Section) */}
               <section>
                   <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-4">Documentos do Modelo</h3>
                   <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 flex items-center justify-between group hover:border-[#8925e2] transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-red-50 text-red-600 rounded-lg dark:bg-red-900/20 dark:text-red-400">
                            <FileText size={24} />
                         </div>
                         <div>
                            <p className="font-bold text-gray-900 dark:text-white group-hover:text-[#8925e2] transition-colors">Contrato_Prestacao_Servicos_vFinal.pdf</p>
                            <p className="text-xs text-gray-500">2.4 MB • Adicionado em 10/02/2025</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-2">
                         <button className="p-2 text-gray-400 hover:text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors" title="Visualizar">
                            <Eye size={18} />
                         </button>
                         <button className="p-2 text-gray-400 hover:text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors" title="Baixar Original">
                            <Download size={18} />
                         </button>
                      </div>
                   </div>
               </section>

               <div className="h-[1px] bg-gray-100 dark:bg-gray-800" />

               {/* 3. Recipients Summary (New Section) */}
               <section>
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Destinatários Definidos</h3>
                      <button 
                         onClick={() => setActiveTab('recipients')}
                         className="text-xs font-bold text-[#8925e2] hover:underline"
                      >
                         Ver detalhes
                      </button>
                   </div>
                   <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-lg">
                         <div className="w-5 h-5 rounded-full bg-blue-200 dark:bg-blue-800 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xs font-bold">1</div>
                         <span className="text-sm font-medium text-blue-900 dark:text-blue-100">Contratante</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 rounded-lg">
                         <div className="w-5 h-5 rounded-full bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-bold">2</div>
                         <span className="text-sm font-medium text-purple-900 dark:text-purple-100">Testemunha</span>
                      </div>
                   </div>
               </section>

               <div className="h-[1px] bg-gray-100 dark:bg-gray-800" />

               {/* 4. Message Info - Editable */}
               <section>
                   <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Mensagem do E-mail</h3>
                      {!isEditingEmail && (
                         <button 
                           onClick={() => {
                             setTempEmailSubject(emailSubject);
                             setTempEmailMessage(emailMessage);
                             setIsEditingEmail(true);
                           }}
                           className="text-xs font-bold text-[#8925e2] hover:underline flex items-center gap-1"
                         >
                            <Edit size={12} /> Editar Mensagem
                         </button>
                      )}
                   </div>

                   {isEditingEmail ? (
                      <div className="bg-white dark:bg-gray-800 border border-[#8925e2] rounded-xl p-4 shadow-sm animate-in fade-in duration-200 space-y-4">
                         <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase">Assunto</label>
                            <input 
                               type="text"
                               value={tempEmailSubject}
                               onChange={(e) => setTempEmailSubject(e.target.value)}
                               className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:border-[#8925e2] outline-none"
                            />
                         </div>
                         <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-500 uppercase">Mensagem</label>
                            <textarea
                               value={tempEmailMessage}
                               onChange={(e) => setTempEmailMessage(e.target.value)}
                               className="w-full p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:border-[#8925e2] outline-none min-h-[100px] resize-none"
                            />
                         </div>
                         <div className="flex justify-end gap-2 pt-2">
                            <button 
                               onClick={() => setIsEditingEmail(false)}
                               className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                            >
                               Cancelar
                            </button>
                            <button 
                               onClick={() => {
                                  setEmailSubject(tempEmailSubject);
                                  setEmailMessage(tempEmailMessage);
                                  setIsEditingEmail(false);
                                  toast.success("Mensagem do e-mail atualizada!");
                               }}
                               className="px-3 py-1.5 text-xs font-bold text-white bg-[#8925e2] hover:bg-[#7a1fd0] rounded-lg transition-colors"
                            >
                               Salvar
                            </button>
                         </div>
                      </div>
                   ) : (
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 space-y-4 border border-gray-100 dark:border-gray-700">
                        <InfoItem 
                           label="Assunto do E-mail" 
                           value={emailSubject} 
                           fullWidth
                        />
                        <div className="space-y-2">
                           <span className="text-xs font-bold text-gray-400 uppercase">Mensagem</span>
                           <p className="text-sm text-gray-600 dark:text-gray-300 italic whitespace-pre-line">
                              "{emailMessage}"
                           </p>
                        </div>
                        <button className="text-sm font-bold text-[#8925e2] flex items-center gap-2 hover:underline mt-2">
                           <Eye size={16} /> Pré-visualizar Email
                        </button>
                      </div>
                   )}
               </section>

               {/* 5. Meta Data Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                  <InfoItem label="Última utilização" value="04/02/2026 | 09:31" />
                  <InfoItem label="Última alteração" value={template.updatedAt} />
                  <InfoItem label="Proprietário" value={template.owner} />
                  <div className="space-y-1">
                     <span className="text-xs font-bold text-gray-400 uppercase">Pastas</span>
                     <button className="flex items-center gap-1 text-sm font-medium text-[#8925e2] hover:underline">
                        <Folder size={14} /> {template.folders[0] || 'Meus modelos'}
                     </button>
                  </div>
               </div>

               <div className="h-[1px] bg-gray-100 dark:bg-gray-800" />

               {/* 6. Fields with Visual Indicators */}
               <section>
                   <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase flex items-center gap-2">
                        Campos Configurados <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">6</span>
                     </h3>
                     <button 
                        onClick={() => setIsEditingFields(true)}
                        className="text-xs font-bold text-[#8925e2] hover:underline flex items-center gap-1"
                     >
                        <PenTool size={12} /> Editar Campos
                     </button>
                   </div>
                   
                   {/* Badges only */}
                   <div className="flex flex-wrap gap-2">
                      <FieldTag type="Assinatura" label="Contratante" required />
                      <FieldTag type="Texto" label="Nome Completo" required />
                      <FieldTag type="Data" label="Data de Nascimento" />
                      <FieldTag type="Numero" label="CPF" />
                      <FieldTag type="Email" label="E-mail" />
                      <FieldTag type="Assinatura" label="Testemunha" />
                   </div>
               </section>
               
               {/* 7. Interactive Tags */}
               <section>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2 items-center">
                     {tags.map((tag, idx) => (
                        <div key={idx} className="group relative animate-in zoom-in-95 duration-200">
                           <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium flex items-center gap-1 pr-7 cursor-default transition-colors group-hover:bg-red-50 dark:group-hover:bg-red-900/10 group-hover:text-red-600 dark:group-hover:text-red-400">
                              <Hash size={12} /> {tag}
                           </span>
                           <button 
                              onClick={() => handleRemoveTag(tag)}
                              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 rounded-md text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-900 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100"
                              title="Remover tag"
                           >
                              <X size={12} />
                           </button>
                        </div>
                     ))}
                     
                     {/* Add Tag Dropdown/Input */}
                     <div className="relative">
                        {!showTagInput ? (
                           <button 
                              onClick={() => setShowTagInput(true)}
                              className="px-3 py-1.5 border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 rounded-lg text-xs font-medium hover:border-[#8925e2] hover:text-[#8925e2] transition-colors flex items-center gap-1"
                           >
                              <Plus size={12} /> Adicionar tag
                           </button>
                        ) : (
                           <div className="absolute top-0 left-0 z-10 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-in fade-in zoom-in-95 duration-150">
                              <div className="p-2 border-b border-gray-100 dark:border-gray-700 flex gap-1">
                                 <input 
                                    type="text" 
                                    className="w-full text-xs p-1 bg-transparent outline-none text-gray-700 dark:text-gray-200"
                                    placeholder="Nova tag..."
                                    autoFocus
                                    value={tagInputValue}
                                    onChange={(e) => setTagInputValue(e.target.value)}
                                    onKeyDown={(e) => {
                                       if (e.key === 'Enter' && tagInputValue.trim()) {
                                          handleAddTag(tagInputValue.trim());
                                       }
                                       if (e.key === 'Escape') setShowTagInput(false);
                                    }}
                                 />
                                 <button 
                                    onClick={() => tagInputValue.trim() && handleAddTag(tagInputValue.trim())}
                                    className="p-1 text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded"
                                 >
                                    <Plus size={14} />
                                 </button>
                              </div>
                              <div className="max-h-32 overflow-y-auto p-1">
                                 <p className="px-2 py-1 text-[10px] text-gray-400 font-bold uppercase">Sugestões</p>
                                 {TAG_SUGGESTIONS.filter(t => !tags.includes(t) && t.toLowerCase().includes(tagInputValue.toLowerCase())).map(suggestion => (
                                    <button
                                       key={suggestion}
                                       onClick={() => handleAddTag(suggestion)}
                                       className="w-full text-left px-2 py-1.5 text-xs text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center gap-2"
                                    >
                                       <span className="w-3 h-3 border border-gray-300 rounded-sm" />
                                       {suggestion}
                                    </button>
                                 ))}
                                 {TAG_SUGGESTIONS.filter(t => !tags.includes(t) && t.toLowerCase().includes(tagInputValue.toLowerCase())).length === 0 && (
                                    <p className="px-2 py-2 text-xs text-gray-400 italic text-center">Nenhuma sugestão</p>
                                 )}
                              </div>
                           </div>
                        )}
                        {showTagInput && (
                           <div className="fixed inset-0 z-0" onClick={() => setShowTagInput(false)} />
                        )}
                     </div>
                  </div>
               </section>

               {/* 6. Advanced Settings (Inline Edit - Option A) */}
               <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-all duration-300">
                  <button 
                     onClick={() => {
                        setShowAdvanced(!showAdvanced);
                        if (!showAdvanced) setIsEditingSettings(false); // Reset edit mode on open
                     }}
                     className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                  >
                     <div className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-200">
                        <Settings size={18} /> Configurações Avançadas
                     </div>
                     {showAdvanced ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  {showAdvanced && (
                     <div className="p-4 bg-white dark:bg-gray-900 space-y-4 animate-in slide-in-from-top-2 duration-200">
                        {!isEditingSettings ? (
                           /* View Mode */
                           <div className="space-y-3">
                              <SettingRow icon={<Clock size={16} />} label="Prazo de expiração" value={`${settings.expiration} dias`} />
                              <SettingRow icon={<Bell size={16} />} label="Lembretes automáticos" value={settings.reminders === '0' ? "Nunca" : settings.reminders === '1' ? "Diariamente" : settings.reminders === '3' ? "A cada 3 dias" : "Semanalmente"} />
                              <SettingRow icon={<Shield size={16} />} label="Autenticação 2FA" value={settings.twoFactor ? "Exigido" : "Não exigido"} />
                              <SettingRow icon={<Smartphone size={16} />} label="Assinatura mobile" value={settings.mobile ? "Permitido" : "Bloqueado"} />
                              
                              <div className="pt-2">
                                 <button 
                                    onClick={() => setIsEditingSettings(true)}
                                    className="text-sm font-bold text-[#8925e2] hover:underline"
                                 >
                                    Editar Configurações
                                 </button>
                              </div>
                           </div>
                        ) : (
                           /* Edit Mode (Inline) */
                           <div className="space-y-4 bg-gray-50/50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 {/* Expiration */}
                                 <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                       <Clock size={14} /> Prazo de expiração
                                    </label>
                                    <div className="relative">
                                       <select 
                                          value={settings.expiration}
                                          onChange={(e) => setSettings({...settings, expiration: e.target.value})}
                                          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#8925e2] focus:outline-none focus:ring-1 focus:ring-[#8925e2] transition-all"
                                       >
                                          <option value="7">7 dias</option>
                                          <option value="15">15 dias</option>
                                          <option value="30">30 dias</option>
                                          <option value="60">60 dias</option>
                                          <option value="90">90 dias</option>
                                       </select>
                                       <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                 </div>

                                 {/* Reminders */}
                                 <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-gray-500 flex items-center gap-2">
                                       <Bell size={14} /> Lembretes automáticos
                                    </label>
                                    <div className="relative">
                                       <select 
                                          value={settings.reminders}
                                          onChange={(e) => setSettings({...settings, reminders: e.target.value})}
                                          className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 text-sm font-medium focus:border-[#8925e2] focus:outline-none focus:ring-1 focus:ring-[#8925e2] transition-all"
                                       >
                                          <option value="0">Nunca</option>
                                          <option value="1">Diariamente</option>
                                          <option value="3">A cada 3 dias</option>
                                          <option value="7">Semanalmente</option>
                                       </select>
                                       <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                    </div>
                                 </div>
                                 
                                 {/* 2FA */}
                                 <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-[#8925e2] transition-colors">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                       <Shield size={16} className="text-gray-400" /> Exigir 2FA
                                    </span>
                                    <input 
                                       type="checkbox" 
                                       checked={settings.twoFactor}
                                       onChange={(e) => setSettings({...settings, twoFactor: e.target.checked})}
                                       className="accent-[#8925e2] w-4 h-4"
                                    />
                                 </label>

                                 {/* Mobile */}
                                 <label className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:border-[#8925e2] transition-colors">
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                       <Smartphone size={16} className="text-gray-400" /> Permitir mobile
                                    </span>
                                    <input 
                                       type="checkbox" 
                                       checked={settings.mobile}
                                       onChange={(e) => setSettings({...settings, mobile: e.target.checked})}
                                       className="accent-[#8925e2] w-4 h-4"
                                    />
                                 </label>
                              </div>

                              <div className="flex justify-end gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                                 <button 
                                    onClick={() => setIsEditingSettings(false)}
                                    className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors"
                                 >
                                    Cancelar
                                 </button>
                                 <button 
                                    onClick={() => {
                                       setIsEditingSettings(false);
                                       toast.success("Configurações atualizadas!");
                                    }}
                                    className="px-4 py-2 bg-[#8925e2] text-white text-sm font-bold rounded-lg hover:bg-[#7a1fd0] transition-colors shadow-sm"
                                 >
                                    Salvar Alterações
                                 </button>
                              </div>
                           </div>
                        )}
                     </div>
                  )}
               </div>

            </div>

            {/* RIGHT COLUMN: PREVIEW */}
            <div className="lg:col-span-1">
               <div className="sticky top-6 space-y-4">
                  
                  {/* Preview Header with Controls */}
                  <div className="flex items-center justify-between">
                     <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase">Pré-visualização</h3>
                     <div className="flex gap-1">
                        <button onClick={() => handleZoom('out')} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500" title="Diminuir Zoom">
                           <ZoomOut size={16} />
                        </button>
                        <span className="text-xs font-mono w-10 text-center py-1">{zoomLevel}%</span>
                        <button onClick={() => handleZoom('in')} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500" title="Aumentar Zoom">
                           <ZoomIn size={16} />
                        </button>
                        <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600 mx-1" />
                        <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded text-gray-500" title="Tela Cheia">
                           <Maximize size={16} />
                        </button>
                     </div>
                  </div>
                  
                  {/* Document Preview Card */}
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm group relative h-[500px] flex flex-col">
                     <div className="flex-1 overflow-auto bg-gray-200/50 dark:bg-black/20 p-4 flex items-center justify-center">
                        {/* Fake PDF Page with Zoom */}
                        <div 
                           className="bg-white dark:bg-gray-900 shadow-xl transition-transform duration-200 origin-top"
                           style={{ 
                              width: `${210 * (zoomLevel/100)}px`, 
                              height: `${297 * (zoomLevel/100)}px`,
                              minWidth: `${210 * (zoomLevel/100)}px`, 
                              minHeight: `${297 * (zoomLevel/100)}px`
                           }}
                        >
                           <div className="p-[10%] h-full flex flex-col gap-[2%] text-[6px] text-gray-300 select-none overflow-hidden relative">
                              {/* Fake Header */}
                              <div className="flex justify-between items-end mb-[5%]">
                                 <div className="w-[30%] h-4 bg-gray-200 dark:bg-gray-800 rounded" />
                                 <div className="w-[15%] h-2 bg-gray-100 dark:bg-gray-800 rounded" />
                              </div>
                              
                              {/* Fake Title */}
                              <div className="w-[60%] h-3 bg-gray-300 dark:bg-gray-700 rounded mb-[5%] mx-auto" />

                              {/* Fake Text Paragraphs */}
                              <div className="space-y-[3%] text-justify">
                                 {Array.from({ length: 12 }).map((_, i) => (
                                   <div key={i} className="flex flex-wrap gap-[2%]">
                                      <div className="w-full h-1 bg-gray-100 dark:bg-gray-800 rounded" />
                                      <div className="w-[90%] h-1 bg-gray-100 dark:bg-gray-800 rounded" />
                                      <div className="w-[95%] h-1 bg-gray-100 dark:bg-gray-800 rounded" />
                                      {i % 3 === 0 && <div className="w-[60%] h-1 bg-gray-100 dark:bg-gray-800 rounded" />}
                                   </div>
                                 ))}
                              </div>

                              <div className="mt-[10%] space-y-[2%]">
                                 <div className="w-full h-[1%] bg-gray-100 dark:bg-gray-800 rounded" />
                                 <div className="w-[80%] h-[1%] bg-gray-100 dark:bg-gray-800 rounded" />
                              </div>
                              
                              {/* Signature Placeholders - Scaled with highlight */}
                              <div className="absolute bottom-[20%] left-[10%] w-[25%] h-[5%] border border-dashed border-blue-400 bg-blue-100/50 dark:bg-blue-900/30 rounded flex flex-col items-center justify-center">
                                 <span className="text-[150%] font-bold text-blue-600">Assinatura</span>
                              </div>
                              <div className="absolute bottom-[20%] right-[10%] w-[25%] h-[5%] border border-dashed border-yellow-400 bg-yellow-100/50 dark:bg-yellow-900/30 rounded flex flex-col items-center justify-center">
                                 <span className="text-[150%] font-bold text-yellow-600">Assinatura</span>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     {/* Preview Controls */}
                     <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between shrink-0">
                        <span className="text-xs font-medium text-gray-500">Página {previewPage} de 3</span>
                        <div className="flex gap-1">
                           <button 
                             onClick={() => setPreviewPage(p => Math.max(1, p - 1))}
                             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                           >
                              <ArrowLeft size={14} />
                           </button>
                           <button 
                             onClick={() => setPreviewPage(p => Math.min(3, p + 1))}
                             className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                           >
                              <ArrowRightLeft size={14} className="rotate-180" />
                           </button>
                        </div>
                     </div>
                  </div>

                  <button 
                     className="w-full py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 group relative"
                     title="Baixe um exemplo preenchido deste modelo para visualizar como ficará o documento final"
                  >
                     <Download size={16} /> Baixar PDF de exemplo
                  </button>

                  {/* Sharing Info */}
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                     <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Compartilhado com</h4>
                     <div className="space-y-3">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold text-xs shrink-0">MS</div>
                           <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">Maria Silva</p>
                              <p className="text-xs text-gray-500">Pode usar</p>
                           </div>
                           <button className="text-xs text-red-500 hover:underline">Remover</button>
                        </div>
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">JP</div>
                           <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">João Pedro</p>
                              <div className="flex items-center gap-1 cursor-pointer hover:text-[#8925e2]">
                                 <p className="text-xs text-gray-500">Pode editar</p>
                                 <ChevronDown size={10} className="text-gray-400" />
                              </div>
                           </div>
                        </div>
                        
                        <button className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-gray-500 hover:text-[#8925e2] border border-dashed border-gray-300 dark:border-gray-700 rounded-lg hover:border-[#8925e2] transition-colors mt-2">
                           <Link size={12} /> Copiar link de compartilhamento
                        </button>
                        
                        <button 
                           onClick={() => setActiveModal('share')}
                           className="w-full text-xs font-bold text-[#8925e2] hover:underline text-left mt-1"
                        >
                           + Compartilhar com mais pessoas
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      ) : (
         /* RECIPIENTS TAB */
         <div className="max-w-3xl">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
               <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Funções dos Destinatários</h3>
                  <button className="text-sm text-[#8925e2] font-bold hover:underline">Editar Funções</button>
               </div>
               <div className="divide-y divide-gray-100 dark:divide-gray-700">
                  <div className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                     <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">1</div>
                     <div>
                        <p className="font-bold text-gray-900 dark:text-white">Contratante</p>
                        <p className="text-sm text-gray-500">Deve assinar</p>
                     </div>
                     <div className="ml-auto">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium text-gray-600 dark:text-gray-300">Obrigatório</span>
                     </div>
                  </div>
                  <div className="p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                     <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">2</div>
                     <div>
                        <p className="font-bold text-gray-900 dark:text-white">Testemunha</p>
                        <p className="text-sm text-gray-500">Deve assinar</p>
                     </div>
                     <div className="ml-auto">
                         <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs font-medium text-gray-600 dark:text-gray-300">Obrigatório</span>
                     </div>
                  </div>
               </div>
               <div className="p-4 bg-gray-50 dark:bg-gray-900/50 text-sm text-gray-500 text-center">
                  Estes são papéis definidos. Ao utilizar o modelo, você atribuirá pessoas reais a estes papéis.
               </div>
            </div>
         </div>
      )}

      {/* MODALS */}
      {activeModal && (
        <ModalWrapper 
           onClose={() => setActiveModal(null)} 
           title={getModalTitle(activeModal)}
        >
           {activeModal === 'duplicate' && <DuplicateContent onClose={() => setActiveModal(null)} templateName={template.name} />}
           {activeModal === 'move' && <MoveContent onClose={() => setActiveModal(null)} currentFolder={template.folders[0]} />}
           {activeModal === 'share' && <ShareContent onClose={() => setActiveModal(null)} />}
           {activeModal === 'transfer' && <TransferContent onClose={() => setActiveModal(null)} />}
           {activeModal === 'history' && <HistoryContent onClose={() => setActiveModal(null)} />}
           {activeModal === 'delete' && <DeleteContent onClose={() => setActiveModal(null)} templateName={template.name} />}
        </ModalWrapper>
      )}

    </div>
  );
}

// --- OVERLAY: Edit Fields Editor ---

function EditFieldsOverlay({ onClose, templateName }: { onClose: () => void, templateName: string }) {
   return (
      <div className="fixed inset-0 bg-gray-100 dark:bg-gray-900 z-[200] flex flex-col animate-in slide-in-from-bottom-10 duration-300">
         {/* Top Bar */}
         <div className="h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 shadow-sm">
            <div className="flex items-center gap-4">
               <span className="text-gray-500">Editando:</span>
               <span className="font-bold text-gray-900 dark:text-white">{templateName}</span>
            </div>
            <div className="flex items-center gap-3">
               <button onClick={onClose} className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                  Cancelar
               </button>
               <button 
                  onClick={() => {
                     onClose();
                     toast.success("Campos atualizados com sucesso!");
                  }}
                  className="px-4 py-2 bg-[#8925e2] text-white text-sm font-bold rounded-lg hover:bg-[#7a1fd0] shadow-lg shadow-purple-500/20"
               >
                  Salvar Alterações
               </button>
            </div>
         </div>

         <div className="flex-1 flex overflow-hidden">
            {/* Left Sidebar: Tools */}
            <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
               <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Campos</h3>
                  <div className="grid grid-cols-2 gap-2">
                     <ToolButton icon={<PenTool size={16} />} label="Assinatura" />
                     <ToolButton icon={<Type size={16} />} label="Texto" />
                     <ToolButton icon={<Calendar size={16} />} label="Data" />
                     <ToolButton icon={<CheckSquare size={16} />} label="Checkbox" />
                     <ToolButton icon={<List size={16} />} label="Dropdown" />
                     <ToolButton icon={<Mail size={16} />} label="Email" />
                  </div>
               </div>
               
               <div className="p-4 flex-1">
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-3">Destinatários</h3>
                  <div className="space-y-2">
                     <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg border border-blue-100 dark:border-blue-900/30 text-sm font-bold cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-xs">1</div>
                        Contratante
                     </div>
                     <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded-lg border border-purple-100 dark:border-purple-900/30 text-sm font-bold cursor-pointer">
                        <div className="w-6 h-6 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center text-xs">2</div>
                        Testemunha
                     </div>
                     <button className="w-full py-2 text-xs font-bold text-gray-500 hover:text-[#8925e2] border border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center gap-1 mt-2">
                        <Plus size={12} /> Adicionar função
                     </button>
                  </div>
               </div>
            </div>

            {/* Center: Canvas */}
            <div className="flex-1 bg-gray-100 dark:bg-gray-900/50 overflow-auto flex items-start justify-center p-8">
               <div className="bg-white shadow-2xl w-[595px] min-h-[842px] relative">
                  {/* Mock content of PDF */}
                  <div className="absolute inset-0 p-12 text-[8px] text-gray-300 space-y-4 select-none pointer-events-none">
                     <div className="w-full h-4 bg-gray-200 mb-8" />
                     {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} className="w-full h-2 bg-gray-100" style={{ width: `${Math.random() * 40 + 60}%` }} />
                     ))}
                  </div>

                  {/* Mock Fields placed on canvas */}
                  <div className="absolute top-[600px] left-[50px] w-[200px] h-[60px] bg-blue-100/80 border-2 border-blue-500 rounded flex items-center justify-center cursor-move group">
                     <span className="text-blue-700 font-bold flex items-center gap-2"><PenTool size={16} /> Assinatura</span>
                     <div className="absolute -top-3 -right-3 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 cursor-pointer shadow-sm">
                        <X size={12} />
                     </div>
                  </div>

                  <div className="absolute top-[600px] right-[50px] w-[200px] h-[60px] bg-gray-100/50 border-2 border-dashed border-gray-400 rounded flex items-center justify-center cursor-move group hover:border-blue-400 hover:bg-blue-50/50">
                     <span className="text-gray-500 font-bold flex items-center gap-2">Nome Completo</span>
                  </div>
               </div>
            </div>

            {/* Right: Properties */}
            <div className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
               <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Propriedades</h3>
               
               <div className="space-y-4">
                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">Tipo de Campo</label>
                     <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 text-sm font-medium flex items-center gap-2">
                        <PenTool size={14} /> Assinatura
                     </div>
                  </div>

                  <div className="space-y-1">
                     <label className="text-xs font-bold text-gray-500">Atribuído a</label>
                     <select className="w-full p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded text-sm focus:border-[#8925e2] outline-none">
                        <option>Contratante</option>
                        <option>Testemunha</option>
                     </select>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                     <label className="flex items-center gap-2 py-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="accent-[#8925e2]" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Obrigatório</span>
                     </label>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">Largura</label>
                        <input type="text" defaultValue="200px" className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded text-sm" />
                     </div>
                     <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500">Altura</label>
                        <input type="text" defaultValue="60px" className="w-full p-2 border border-gray-200 dark:border-gray-600 rounded text-sm" />
                     </div>
                  </div>

                  <button className="w-full py-2 bg-red-50 text-red-600 rounded-lg text-sm font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-2 mt-4">
                     <Trash2 size={16} /> Excluir campo
                  </button>
               </div>
            </div>
         </div>
         
         {/* Bottom Bar: Pager */}
         <div className="h-10 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <button className="hover:text-[#8925e2]"><ArrowLeft size={16} /></button>
            <span>Página 1 de 3</span>
            <button className="hover:text-[#8925e2]"><ArrowRightLeft size={16} className="rotate-180" /></button>
         </div>
      </div>
   );
}

function ToolButton({ icon, label }: { icon: React.ReactNode, label: string }) {
   return (
      <div className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-transparent hover:border-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-grab active:cursor-grabbing transition-colors group">
         <div className="text-gray-500 group-hover:text-[#8925e2]">{icon}</div>
         <span className="text-xs font-medium text-gray-600 dark:text-gray-300 group-hover:text-[#8925e2]">{label}</span>
      </div>
   );
}

// Helper Functions & Sub-Components

function getModalTitle(type: string) {
   switch(type) {
      case 'duplicate': return 'Duplicar Modelo';
      case 'move': return 'Mover para pasta';
      case 'share': return 'Compartilhar Modelo';
      case 'transfer': return 'Transferir Propriedade';
      case 'history': return 'Histórico do Modelo';
      case 'delete': return 'Eliminar Modelo?';
      default: return '';
   }
}

function ModalWrapper({ children, onClose, title }: { children: React.ReactNode, onClose: () => void, title: string }) {
   return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
               <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
               <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-gray-500 transition-colors">
                  <X size={20} />
               </button>
            </div>
            <div className="p-0">
               {children}
            </div>
         </div>
      </div>
   );
}

// Modal Contents

function DuplicateContent({ onClose, templateName }: { onClose: () => void, templateName: string }) {
   return (
      <div className="p-6 space-y-4">
         <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nome do novo modelo</label>
            <input 
               type="text" 
               defaultValue={`${templateName} - Cópia`}
               className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#8925e2] focus:outline-none"
            />
         </div>
         <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
               <input type="checkbox" defaultChecked className="accent-[#8925e2] w-4 h-4" />
               Copiar campos configurados
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
               <input type="checkbox" defaultChecked className="accent-[#8925e2] w-4 h-4" />
               Copiar destinatários
            </label>
            <label className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
               <input type="checkbox" defaultChecked className="accent-[#8925e2] w-4 h-4" />
               Copiar configurações
            </label>
         </div>
         <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Cancelar</button>
            <button onClick={() => { onClose(); toast.success("Modelo duplicado com sucesso!"); }} className="px-4 py-2 bg-[#8925e2] text-white rounded-lg font-bold hover:bg-[#7a1fd0]">Duplicar</button>
         </div>
      </div>
   );
}

function MoveContent({ onClose, currentFolder }: { onClose: () => void, currentFolder?: string }) {
   return (
      <div className="p-6 space-y-4">
         <p className="text-sm text-gray-500">Selecione a pasta de destino:</p>
         <div className="space-y-2">
            {['Contratos', 'Comercial', 'Aditivos'].map(folder => (
               <label key={folder} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-gray-600">
                  <input type="radio" name="folder" defaultChecked={folder === currentFolder} className="accent-[#8925e2] w-4 h-4" />
                  <Folder size={18} className="text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{folder}</span>
               </label>
            ))}
            <label className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 cursor-pointer border border-[#8925e2]/30">
               <input type="radio" name="folder" className="accent-[#8925e2] w-4 h-4" />
               <Plus size={18} className="text-[#8925e2]" />
               <input 
                  type="text" 
                  placeholder="Nome da nova pasta"
                  className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 w-full"
               />
            </label>
         </div>
         <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Cancelar</button>
            <button onClick={() => { onClose(); toast.success("Modelo movido com sucesso!"); }} className="px-4 py-2 bg-[#8925e2] text-white rounded-lg font-bold hover:bg-[#7a1fd0]">Mover</button>
         </div>
      </div>
   );
}

function ShareContent({ onClose }: { onClose: () => void }) {
   return (
      <div className="p-6 space-y-5">
         <div className="flex gap-2">
            <input 
               type="email" 
               placeholder="email@exemplo.com"
               className="flex-1 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#8925e2] focus:outline-none"
            />
            <button className="px-4 bg-[#8925e2] text-white rounded-xl hover:bg-[#7a1fd0]">
               <Plus size={20} />
            </button>
         </div>
         
         <div className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase">Permissões</p>
            <div className="flex gap-4">
               <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input type="radio" name="perm" className="accent-[#8925e2]" /> Visualizar
               </label>
               <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input type="radio" name="perm" defaultChecked className="accent-[#8925e2]" /> Usar
               </label>
               <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer">
                  <input type="radio" name="perm" className="accent-[#8925e2]" /> Editar
               </label>
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 cursor-pointer pt-2">
               <input type="checkbox" defaultChecked className="accent-[#8925e2] rounded" /> Notificar por email
            </label>
         </div>

         <div className="pt-2">
             <p className="text-xs font-bold text-gray-400 uppercase mb-2">Já compartilhado com</p>
             <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                <div className="flex items-center justify-between text-sm">
                   <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                      <div className="w-6 h-6 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-xs font-bold">MS</div>
                      Maria Silva (pode usar)
                   </span>
                   <button className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">JP</div>
                      João Pedro (pode editar)
                   </span>
                   <button className="text-gray-400 hover:text-red-500"><X size={14} /></button>
                </div>
             </div>
         </div>

         <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Cancelar</button>
            <button onClick={() => { onClose(); toast.success("Compartilhado com sucesso!"); }} className="px-4 py-2 bg-[#8925e2] text-white rounded-lg font-bold hover:bg-[#7a1fd0]">Compartilhar</button>
         </div>
      </div>
   );
}

function TransferContent({ onClose }: { onClose: () => void }) {
   return (
      <div className="p-6 space-y-4">
         <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30 flex gap-3">
            <AlertTriangle className="text-yellow-600 dark:text-yellow-500 shrink-0" size={20} />
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
               <strong>Atenção:</strong> Esta ação não pode ser desfeita! Você perderá acesso total a este modelo, a menos que o novo proprietário o compartilhe com você.
            </p>
         </div>
         
         <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Transferir para</label>
            <select className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:border-[#8925e2] focus:outline-none">
               <option>Selecione um usuário...</option>
               <option>Maria Silva</option>
               <option>João Pedro</option>
               <option>Carlos Oliveira</option>
            </select>
         </div>

         <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Cancelar</button>
            <button onClick={() => { onClose(); toast.success("Propriedade transferida!"); }} className="px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 rounded-lg font-bold hover:opacity-90">Transferir</button>
         </div>
      </div>
   );
}

function HistoryContent({ onClose }: { onClose: () => void }) {
   return (
      <div className="p-0">
         <div className="max-h-[400px] overflow-y-auto p-6 space-y-6">
             <TimelineItem 
               date="04/02/2026 às 09:31"
               user="Gabriel Barbosa"
               action="Editou o modelo"
               details="Alterou campo 'Nome Completo' e 'Assinatura'"
               icon={<Edit size={14} />}
               color="bg-blue-100 text-blue-600"
             />
             <TimelineItem 
               date="01/01/2023 às 14:22"
               user="Gabriel Barbosa"
               action="Duplicou o modelo"
               details="Origem: 'Modelo 2022'"
               icon={<Copy size={14} />}
               color="bg-purple-100 text-purple-600"
             />
             <TimelineItem 
               date="15/12/2022 às 10:15"
               user="Maria Silva"
               action="Criou o modelo"
               icon={<Plus size={14} />}
               color="bg-green-100 text-green-600"
             />
         </div>
         <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
            <button onClick={onClose} className="text-sm font-bold text-gray-500 hover:text-gray-700">Fechar</button>
         </div>
      </div>
   );
}

function DeleteContent({ onClose, templateName }: { onClose: () => void, templateName: string }) {
   return (
      <div className="p-6 space-y-4">
         <p className="text-gray-600 dark:text-gray-300">
            Tem certeza que deseja eliminar <strong>"{templateName}"</strong>?
         </p>
         <p className="text-sm text-gray-500">
            O modelo será movido para a lixeira e poderá ser restaurado nos próximos 30 dias.
         </p>
         <div className="flex justify-end gap-3 pt-4">
            <button onClick={onClose} className="px-4 py-2 text-gray-500 hover:text-gray-700 font-medium">Cancelar</button>
            <button onClick={() => { onClose(); toast.success("Modelo movido para a lixeira."); }} className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700">Eliminar</button>
         </div>
      </div>
   );
}

// Small Components

function InfoItem({ label, value, fullWidth = false }: { label: string, value: string, fullWidth?: boolean }) {
   return (
      <div className={cn("space-y-1", fullWidth ? "col-span-2" : "")}>
         <span className="text-xs font-bold text-gray-400 uppercase">{label}</span>
         <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
      </div>
   );
}

function StatCard({ icon, value, label, color, tooltip }: { icon: React.ReactNode, value: string, label: string, color: string, tooltip?: string }) {
   return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center gap-4 relative group cursor-help">
         <div className={cn("p-3 rounded-full", color)}>
            {icon}
         </div>
         <div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
         </div>
         {tooltip && (
            <div className="absolute -top-1 right-2 text-gray-300">
               <Info size={14} />
            </div>
         )}
         {tooltip && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 z-10 text-center shadow-lg">
               {tooltip}
               <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
            </div>
         )}
      </div>
   );
}

function FieldTag({ type, label, required }: { type: 'Assinatura' | 'Texto' | 'Data' | 'Numero' | 'Email', label: string, required?: boolean }) {
   const icons = {
      'Assinatura': <PenTool size={12} className="text-purple-500" />,
      'Texto': <FileText size={12} className="text-blue-500" />,
      'Data': <Calendar size={12} className="text-orange-500" />,
      'Numero': <CreditCard size={12} className="text-green-500" />,
      'Email': <Mail size={12} className="text-red-500" />
   };

   return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
         <span className="text-gray-400">
            {icons[type]}
         </span>
         <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{label}</span>
         {required && <span className="text-[10px] text-red-500 font-bold">*</span>}
      </div>
   );
}

function MenuItem({ icon, label, className, onClick }: { icon: React.ReactNode, label: string, className?: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 text-sm flex items-center gap-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors",
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function SettingRow({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
   return (
      <div className="flex items-center justify-between py-1">
         <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
            {icon}
            <span className="text-sm font-medium">{label}</span>
         </div>
         <span className="text-sm font-bold text-gray-900 dark:text-white">{value}</span>
      </div>
   );
}

function TimelineItem({ date, user, action, details, icon, color }: any) {
   return (
      <div className="flex gap-4">
         <div className="flex flex-col items-center">
            <div className={cn("w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10", color)}>
               {icon}
            </div>
            <div className="w-[1px] bg-gray-100 dark:bg-gray-700 h-full -mb-6" />
         </div>
         <div className="pb-6">
            <p className="text-xs text-gray-400 font-mono mb-1">{date}</p>
            <p className="text-sm text-gray-900 dark:text-white font-bold">{user}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">{action}</p>
            {details && <p className="text-xs text-gray-500 mt-1 bg-gray-50 dark:bg-gray-700 p-2 rounded border border-gray-100 dark:border-gray-600">{details}</p>}
         </div>
      </div>
   );
}
