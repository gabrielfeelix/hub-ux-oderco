import React, { useState, useEffect } from 'react';
import { 
  X, 
  Upload, 
  User, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  GripVertical, 
  Trash2,
  Plus
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CreateTemplateProps {
  onBack: () => void;
  onSave: (data: any) => void;
  initialData?: any;
  isEditing?: boolean;
}

export function CreateTemplate({ onBack, onSave, initialData, isEditing = false }: CreateTemplateProps) {
  const [activeSection, setActiveSection] = useState<'docs' | 'recipients' | 'message'>('docs');
  const [recipients, setRecipients] = useState(initialData?.recipients || [{ id: 1, role: '', name: '', email: '' }]);
  const [templateName, setTemplateName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');

  // Initialize with initial data if provided
  useEffect(() => {
    if (initialData) {
       setTemplateName(initialData.name || '');
       setDescription(initialData.description || '');
       if (initialData.recipients) setRecipients(initialData.recipients);
    }
  }, [initialData]);

  const toggleSection = (section: 'docs' | 'recipients' | 'message') => {
    setActiveSection(activeSection === section ? 'docs' : section); // Fallback to docs or toggle logic
  };

  const addRecipient = () => {
    setRecipients([...recipients, { id: Date.now(), role: '', name: '', email: '' }]);
  };

  const removeRecipient = (id: number) => {
    setRecipients(recipients.filter(r => r.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-gray-900 flex flex-col animate-in fade-in duration-300">
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between shrink-0">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
           {isEditing ? 'Editar Modelo' : 'Crie um modelo'}
        </h2>
        <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
          <X size={24} className="text-gray-500" />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 md:p-12">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Basic Info */}
          <div className="space-y-4 bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nome do modelo</label>
                <input 
                  type="text" 
                  placeholder="Nome do modelo" 
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all font-medium"
                />
             </div>
             <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Descrição do modelo</label>
                <textarea 
                  placeholder="Descrição (opcional)" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all resize-none h-24"
                />
             </div>
          </div>

          <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />

          {/* Section: Documents */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
             <button 
               onClick={() => setActiveSection('docs')}
               className="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
             >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Adicionar documentos</h3>
                {activeSection === 'docs' ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
             </button>
             
             {activeSection === 'docs' && (
                <div className="px-8 pb-8 pt-2 animate-in slide-in-from-top-4 duration-300">
                   <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-[#8925e2] hover:bg-purple-50/10 transition-all cursor-pointer group">
                      <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                         <Upload size={32} className="text-[#8925e2]" />
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white mb-1">Largar os ficheiros aqui ou</p>
                      <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-bold text-[#8925e2] dark:text-purple-400 shadow-sm group-hover:shadow-md transition-all">
                         Carregar
                      </button>
                   </div>
                </div>
             )}
          </div>

          <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />

          {/* Section: Recipients */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
             <button 
               onClick={() => setActiveSection('recipients')}
               className="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
             >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Adicionar destinatários</h3>
                {activeSection === 'recipients' ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
             </button>
             
             {activeSection === 'recipients' && (
                <div className="px-8 pb-8 pt-2 animate-in slide-in-from-top-4 duration-300 space-y-6">
                   <label className="flex items-center gap-2 cursor-pointer w-fit">
                      <input type="checkbox" className="rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2]" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">Definir a ordem de assinatura</span>
                   </label>

                   <div className="space-y-4">
                      {recipients.map((recipient, index) => (
                         <div key={recipient.id} className="flex gap-4 items-start p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/20">
                            <div className="mt-3 text-gray-400 cursor-move"><GripVertical size={20} /></div>
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                               <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Função</label>
                                  <input type="text" className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-sm" placeholder="Ex: Contratante" />
                               </div>
                               <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">Nome</label>
                                  <div className="relative">
                                     <input type="text" className="w-full px-3 py-2 pl-8 rounded-lg border border-gray-200 dark:border-gray-600 text-sm" placeholder="Nome" />
                                     <User size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                  </div>
                               </div>
                               <div className="space-y-1">
                                  <label className="text-xs font-bold text-gray-500 uppercase">E-mail</label>
                                  <div className="relative">
                                     <input type="email" className="w-full px-3 py-2 pl-8 rounded-lg border border-gray-200 dark:border-gray-600 text-sm" placeholder="email@exemplo.com" />
                                     <Mail size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                  </div>
                               </div>
                            </div>
                            <button onClick={() => removeRecipient(recipient.id)} className="mt-3 text-gray-400 hover:text-red-500 transition-colors">
                               <Trash2 size={20} />
                            </button>
                         </div>
                      ))}
                   </div>
                   
                   <button onClick={addRecipient} className="flex items-center gap-2 text-[#8925e2] font-bold hover:underline">
                      <Plus size={18} /> Adicionar destinatário
                   </button>
                </div>
             )}
          </div>

          <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />

          {/* Section: Message */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-12">
             <button 
               onClick={() => setActiveSection('message')}
               className="w-full px-8 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
             >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Adicionar mensagem</h3>
                {activeSection === 'message' ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
             </button>
             
             {activeSection === 'message' && (
                <div className="px-8 pb-8 pt-2 animate-in slide-in-from-top-4 duration-300 space-y-4">
                   <div className="space-y-2">
                      <div className="flex justify-between">
                         <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Assunto</label>
                         <span className="text-xs text-gray-400">0/100</span>
                      </div>
                      <input 
                        type="text" 
                        defaultValue="Conclua com o Signamais"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                      />
                   </div>
                   <div className="space-y-2">
                      <div className="flex justify-between">
                         <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Mensagem</label>
                         <span className="text-xs text-gray-400">0/10000</span>
                      </div>
                      <textarea 
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all h-32 resize-none"
                        placeholder="Introduzir mensagem"
                      />
                   </div>
                </div>
             )}
          </div>

        </div>
      </div>

      {/* Footer Actions */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-8 py-4 flex justify-end gap-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
         <button 
           onClick={() => onSave({ name: templateName || 'Sem nome' })}
           className="px-6 py-2.5 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
         >
           Guardar e fechar
         </button>
         <button 
           className="px-6 py-2.5 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20"
         >
           Seguinte: Adicionar campos
         </button>
      </footer>

    </div>
  );
}
