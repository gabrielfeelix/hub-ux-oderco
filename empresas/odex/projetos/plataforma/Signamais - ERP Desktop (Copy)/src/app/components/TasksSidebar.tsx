import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  CheckSquare, 
  Plus, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  ChevronRight, 
  Trash2,
  Check,
  MoreHorizontal,
  FileText,
  Sparkles,
  ArrowRight,
  Search,
  Save,
  Flag,
  Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface TasksSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToDocument: (docId?: string) => void;
}

type Task = {
  id: string;
  title: string;
  dueDate?: string; // YYYY-MM-DD
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  type: 'manual' | 'system';
  relatedDoc?: {
    id: string;
    title: string;
  };
};

// Mock data for document search with more realistic IDs
const AVAILABLE_DOCS = [
  { id: '4421', title: 'Contrato-Locação.pdf' },
  { id: '4422', title: 'Proposta-Comercial.pdf' },
  { id: '4425', title: 'Aditivo-Contrato-Apto304.pdf' },
  { id: '4430', title: 'Termo-Aceite-Servicos.pdf' },
  { id: '4438', title: 'NDA-Projeto-Secret.pdf' },
  { id: '4440', title: 'Distrato-Parceria.pdf' },
  { id: '4442', title: 'Autorizacao-Viagem.pdf' },
];

export function TasksSidebar({ isOpen, onClose, onNavigateToDocument }: TasksSidebarProps) {
  const [activeTab, setActiveTab] = useState<'todo' | 'completed'>('todo');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Cobrar assinatura do Sr. João',
      dueDate: '2026-02-04',
      priority: 'high',
      completed: false,
      type: 'manual'
    },
    {
      id: '2',
      title: 'Revisar cláusula 4.2',
      dueDate: '2026-02-05',
      priority: 'high',
      completed: false,
      type: 'system',
      relatedDoc: { id: '4421', title: 'Contrato-Locação.pdf' }
    },
    {
      id: '3',
      title: 'Atualizar dados de faturamento',
      dueDate: '2026-02-06',
      priority: 'medium',
      completed: false,
      type: 'manual'
    }
  ]);

  // Form State
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [isAddingTask, setIsAddingTask] = useState(false);
  
  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formPriority, setFormPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [formDocSearch, setFormDocSearch] = useState('');
  const [formSelectedDoc, setFormSelectedDoc] = useState<{id: string, title: string} | undefined>(undefined);
  const [showDocResults, setShowDocResults] = useState(false);

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setFormTitle(task.title);
    setFormDate(task.dueDate || '');
    setFormPriority(task.priority);
    setFormSelectedDoc(task.relatedDoc);
    setFormDocSearch('');
    setIsAddingTask(false);
  };

  const startAdding = () => {
    setEditingTaskId(null);
    setFormTitle('');
    setFormDate(new Date().toISOString().split('T')[0]); // Default today
    setFormPriority('medium');
    setFormSelectedDoc(undefined);
    setFormDocSearch('');
    setIsAddingTask(true);
  };

  const cancelForm = () => {
    setEditingTaskId(null);
    setIsAddingTask(false);
    setShowDocResults(false);
  };

  const saveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const taskData: Partial<Task> = {
      title: formTitle,
      dueDate: formDate,
      priority: formPriority,
      relatedDoc: formSelectedDoc,
      type: 'manual'
    };

    if (editingTaskId) {
      setTasks(tasks.map(t => t.id === editingTaskId ? { ...t, ...taskData } : t));
    } else {
      setTasks([{
        id: Date.now().toString(),
        completed: false,
        ...taskData
      } as Task, ...tasks]);
    }

    cancelForm();
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
    if (editingTaskId === id) cancelForm();
  };

  // Document Search Logic
  const filteredDocs = AVAILABLE_DOCS.filter(d => 
    d.title.toLowerCase().includes(formDocSearch.toLowerCase()) || 
    d.id.includes(formDocSearch)
  );

  // Stats
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = tasks.length === 0 ? 0 : Math.round((completedCount / tasks.length) * 100);

  // Helper to format date nicely
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Reset times for accurate comparison
    date.setHours(0,0,0,0);
    today.setHours(0,0,0,0);
    tomorrow.setHours(0,0,0,0);

    if (date.getTime() === today.getTime()) return 'Hoje';
    if (date.getTime() === tomorrow.getTime()) return 'Amanhã';
    
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]"
          />

          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col border-l border-gray-100 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-xl text-[#8925e2] dark:text-purple-300">
                    <CheckSquare size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white">Minhas Tarefas</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Organize seu dia de trabalho</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              {/* Progress */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-2 w-full overflow-hidden mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                <span>{completedCount} concluídas</span>
                <span>{progressPercentage}% do objetivo</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
              
              <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
                <button 
                  onClick={() => setActiveTab('todo')}
                  className={cn("flex-1 py-2 text-sm font-bold rounded-lg transition-all", activeTab === 'todo' ? "bg-white dark:bg-gray-700 text-[#8925e2] dark:text-white shadow-sm" : "text-gray-500")}
                >
                  A Fazer ({tasks.filter(t => !t.completed).length})
                </button>
                <button 
                  onClick={() => setActiveTab('completed')}
                  className={cn("flex-1 py-2 text-sm font-bold rounded-lg transition-all", activeTab === 'completed' ? "bg-white dark:bg-gray-700 text-[#8925e2] dark:text-white shadow-sm" : "text-gray-500")}
                >
                  Concluídas
                </button>
              </div>

              {/* Add/Edit Form */}
              {(isAddingTask || editingTaskId) && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-900 shadow-lg p-4 mb-6 relative ring-2 ring-purple-100 dark:ring-purple-900/20"
                >
                  <form onSubmit={saveTask} className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                          {editingTaskId ? 'Editar Tarefa' : 'Nova Tarefa'}
                       </span>
                       <button type="button" onClick={cancelForm} className="text-gray-400 hover:text-gray-600">
                          <X size={16} />
                       </button>
                    </div>

                    <div>
                       <input 
                          autoFocus
                          type="text"
                          placeholder="O que precisa ser feito?"
                          value={formTitle}
                          onChange={e => setFormTitle(e.target.value)}
                          className="w-full text-base font-semibold placeholder-gray-400 bg-transparent border-none focus:ring-0 p-0 text-gray-900 dark:text-white"
                       />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                       {/* Date Picker */}
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Data</label>
                          <div className="relative">
                             <input 
                                type="date" 
                                value={formDate}
                                onChange={e => setFormDate(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-2 py-1.5 text-xs text-gray-700 dark:text-gray-300 focus:border-[#8925e2] outline-none"
                             />
                          </div>
                       </div>

                       {/* Priority Selector */}
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-gray-500 uppercase">Prioridade</label>
                          <div className="flex gap-1">
                             {[
                                { val: 'low', color: 'bg-green-100 text-green-700 border-green-200' },
                                { val: 'medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
                                { val: 'high', color: 'bg-red-100 text-red-700 border-red-200' }
                             ].map((p) => (
                                <button
                                   key={p.val}
                                   type="button"
                                   onClick={() => setFormPriority(p.val as any)}
                                   className={cn(
                                      "flex-1 h-8 rounded-lg border flex items-center justify-center transition-all",
                                      formPriority === p.val 
                                         ? p.color + " ring-1 ring-offset-1 ring-gray-300 dark:ring-gray-700" 
                                         : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-400 grayscale"
                                   )}
                                >
                                   <Flag size={12} fill="currentColor" />
                                </button>
                             ))}
                          </div>
                       </div>
                    </div>

                    {/* Document Linker */}
                    <div className="space-y-1 relative">
                       <label className="text-[10px] font-bold text-gray-500 uppercase">Vincular Documento (Opcional)</label>
                       
                       {formSelectedDoc ? (
                          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg border border-blue-100 dark:border-blue-900/50">
                             <FileText size={14} />
                             <span className="text-xs font-medium truncate flex-1">
                                <span className="font-mono opacity-60 mr-1.5">#{formSelectedDoc.id}</span>
                                {formSelectedDoc.title}
                             </span>
                             <button 
                                type="button" 
                                onClick={() => setFormSelectedDoc(undefined)}
                                className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800 rounded"
                             >
                                <X size={12} />
                             </button>
                          </div>
                       ) : (
                          <div className="relative">
                             <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                             <input 
                                type="text"
                                placeholder="Buscar por nome ou ID..."
                                value={formDocSearch}
                                onChange={e => {
                                   setFormDocSearch(e.target.value);
                                   setShowDocResults(true);
                                }}
                                onFocus={() => setShowDocResults(true)}
                                className="w-full pl-8 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs outline-none focus:border-[#8925e2]"
                             />
                             
                             {/* Autocomplete Dropdown */}
                             {showDocResults && formDocSearch.length > 0 && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-xl z-20 max-h-40 overflow-y-auto">
                                   {filteredDocs.length > 0 ? filteredDocs.map(doc => (
                                      <button
                                         key={doc.id}
                                         type="button"
                                         onClick={() => {
                                            setFormSelectedDoc({ id: doc.id, title: doc.title });
                                            setFormDocSearch('');
                                            setShowDocResults(false);
                                         }}
                                         className="w-full text-left px-3 py-2.5 text-xs hover:bg-purple-50 dark:hover:bg-purple-900/20 text-gray-700 dark:text-gray-300 flex items-center gap-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0"
                                      >
                                         <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-1 rounded">
                                            <FileText size={12} />
                                         </div>
                                         <div className="flex flex-col min-w-0">
                                            <span className="font-medium truncate">{doc.title}</span>
                                            <span className="font-mono text-[10px] text-gray-400">ID: {doc.id}</span>
                                         </div>
                                      </button>
                                   )) : (
                                      <div className="px-3 py-2 text-xs text-gray-400">Nenhum documento encontrado</div>
                                   )}
                                </div>
                             )}
                          </div>
                       )}
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                       <button 
                          type="button" 
                          onClick={cancelForm}
                          className="px-3 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                       >
                          Cancelar
                       </button>
                       <button 
                          type="submit"
                          className="px-4 py-2 text-xs font-bold text-white bg-[#8925e2] hover:bg-[#7a1fd0] rounded-lg shadow-lg shadow-purple-500/20 flex items-center gap-2 transition-colors"
                       >
                          <Save size={14} />
                          Salvar Tarefa
                       </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Task List */}
              <div className="space-y-3">
                 {tasks.filter(t => activeTab === 'todo' ? !t.completed : t.completed).map(task => (
                    <div 
                      key={task.id}
                      className={cn(
                         "group bg-white dark:bg-gray-800 rounded-xl border p-4 transition-all hover:shadow-md relative",
                         task.completed 
                           ? "border-gray-100 dark:border-gray-700 opacity-60" 
                           : "border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900"
                      )}
                    >
                       <div className="flex items-start gap-3">
                          {/* Checkbox */}
                          <button 
                             onClick={(e) => {
                                e.stopPropagation();
                                toggleTask(task.id);
                             }}
                             className={cn(
                                "mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors shrink-0",
                                task.completed 
                                  ? "bg-green-500 border-green-500 text-white" 
                                  : "border-gray-300 dark:border-gray-600 hover:border-[#8925e2] text-transparent"
                             )}
                          >
                             <Check size={14} strokeWidth={3} />
                          </button>
                          
                          {/* Task Content - Click to Edit */}
                          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => !task.completed && startEditing(task)}>
                             <p className={cn(
                                "text-sm font-medium text-gray-900 dark:text-white truncate transition-all group-hover:text-[#8925e2]",
                                task.completed && "line-through text-gray-500 group-hover:text-gray-500"
                             )}>
                                {task.title}
                             </p>
                             
                             <div className="flex items-center gap-3 mt-2 flex-wrap">
                                {task.dueDate && (
                                   <div className={cn(
                                      "flex items-center gap-1 text-xs",
                                      task.dueDate < new Date().toISOString().split('T')[0] && !task.completed ? "text-red-500 font-bold" : "text-gray-500"
                                   )}>
                                      <Calendar size={12} />
                                      {formatDate(task.dueDate)}
                                   </div>
                                )}
                                
                                {task.priority !== 'low' && !task.completed && (
                                   <div className={cn(
                                      "flex items-center gap-1 text-xs font-bold px-1.5 py-0.5 rounded",
                                      task.priority === 'high' ? "text-red-500 bg-red-50 dark:bg-red-900/20" : "text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20"
                                   )}>
                                      <Flag size={10} fill="currentColor" />
                                      {task.priority === 'high' ? 'Alta' : 'Média'}
                                   </div>
                                )}
                             </div>

                             {/* Linked Doc Pill */}
                             {task.relatedDoc && (
                                <button 
                                   onClick={(e) => {
                                      e.stopPropagation(); // Don't trigger edit
                                      if (onNavigateToDocument) {
                                         onNavigateToDocument(task.relatedDoc?.id);
                                         onClose();
                                      }
                                   }}
                                   className="mt-3 text-xs flex items-center gap-1.5 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium hover:bg-blue-100 dark:hover:bg-blue-800 w-fit px-2 py-1 rounded transition-colors"
                                >
                                   <FileText size={12} />
                                   <span className="font-mono opacity-70">#{task.relatedDoc.id}</span>
                                   <span className="truncate max-w-[150px]">{task.relatedDoc.title}</span>
                                   <ArrowRight size={10} className="opacity-50" />
                                </button>
                             )}
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-1">
                             <button 
                                onClick={(e) => { e.stopPropagation(); deleteTask(task.id); }}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-all"
                             >
                                <Trash2 size={14} />
                             </button>
                          </div>
                       </div>
                    </div>
                 ))}
                 
                 {tasks.filter(t => activeTab === 'todo' ? !t.completed : t.completed).length === 0 && (
                    <div className="text-center py-12 opacity-40">
                       <CheckSquare size={48} className="mx-auto mb-3 text-gray-300" />
                       <p className="text-sm font-medium text-gray-500">Nenhuma tarefa aqui.</p>
                    </div>
                 )}
              </div>
            </div>

            {/* Sticky Footer Button */}
            {!isAddingTask && !editingTaskId && activeTab === 'todo' && (
              <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/80 backdrop-blur-sm">
                 <button 
                    onClick={startAdding}
                    className="w-full py-3 rounded-xl bg-[#8925e2] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#7a1fd0] transition-all shadow-lg shadow-purple-500/20 active:scale-95"
                 >
                    <Plus size={18} />
                    Nova Tarefa
                 </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}