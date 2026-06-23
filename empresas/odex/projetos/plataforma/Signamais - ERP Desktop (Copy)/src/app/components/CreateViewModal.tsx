import React, { useState } from 'react';
import { X, Check, LayoutGrid, Clock, Star, AlertTriangle, CheckSquare, BarChart2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CreateViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, widgets: string[]) => void;
  onDelete?: () => void;
  initialData?: { name: string; widgets: string[] };
}

const AVAILABLE_WIDGETS = [
  { id: 'priority', label: 'Prioridade Alta', icon: <AlertTriangle size={18} className="text-orange-500" /> },
  { id: 'tasks', label: 'Tarefas', icon: <CheckSquare size={18} className="text-purple-500" /> },
  { id: 'recent', label: 'Últimos Envelopes', icon: <Clock size={18} className="text-blue-500" /> },
  { id: 'favorites', label: 'Modelos Favoritos', icon: <Star size={18} className="text-yellow-500" /> },
  { id: 'results', label: 'Dashboard de Resultados', icon: <BarChart2 size={18} className="text-green-500" /> },
];

export function CreateViewModal({ isOpen, onClose, onSave, onDelete, initialData }: CreateViewModalProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>(initialData?.widgets || []);

  // Update state when initialData changes
  React.useEffect(() => {
    if (isOpen) {
      setName(initialData?.name || '');
      setSelectedWidgets(initialData?.widgets || []);
    }
  }, [isOpen, initialData]);

  const toggleWidget = (id: string) => {
    setSelectedWidgets(prev => 
      prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name, selectedWidgets);
    onClose();
    if (!initialData) {
      setName('');
      setSelectedWidgets([]);
    }
  };

  const isEditing = !!initialData;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-[101] pointer-events-none"
          >
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-2xl shadow-2xl pointer-events-auto border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div>
                   <h2 className="text-xl font-bold text-gray-900 dark:text-white">{isEditing ? 'Editar Visão' : 'Nova Visão'}</h2>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Personalize seu dashboard</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nome da Visão</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Minha Visão Diária"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 outline-none focus:ring-2 focus:ring-[#8925e2]/20 focus:border-[#8925e2] transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Widgets Disponíveis</label>
                  <div className="grid grid-cols-1 gap-3">
                    {AVAILABLE_WIDGETS.map((widget) => (
                      <button
                        key={widget.id}
                        onClick={() => toggleWidget(widget.id)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl border transition-all",
                          selectedWidgets.includes(widget.id)
                            ? "bg-purple-50 dark:bg-purple-900/20 border-[#8925e2] ring-1 ring-[#8925e2]"
                            : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "p-2 rounded-lg", 
                            selectedWidgets.includes(widget.id) ? "bg-white dark:bg-gray-800" : "bg-gray-100 dark:bg-gray-700"
                          )}>
                            {widget.icon}
                          </div>
                          <span className={cn(
                            "font-medium",
                            selectedWidgets.includes(widget.id) ? "text-[#8925e2] dark:text-purple-300" : "text-gray-600 dark:text-gray-400"
                          )}>
                            {widget.label}
                          </span>
                        </div>
                        {selectedWidgets.includes(widget.id) && (
                          <div className="w-6 h-6 bg-[#8925e2] rounded-full flex items-center justify-center text-white">
                            <Check size={14} strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-between">
                <div>
                  {isEditing && onDelete && (
                    <button 
                      onClick={() => {
                        if (window.confirm('Tem certeza que deseja excluir esta visão?')) {
                          onDelete();
                          onClose();
                        }
                      }}
                      className="px-4 py-2.5 text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      Excluir
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    onClick={onClose}
                    className="px-4 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={!name.trim()}
                    className="px-6 py-2.5 bg-[#8925e2] text-white text-sm font-bold rounded-xl hover:bg-[#7a1fd0] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
                  >
                    {isEditing ? 'Salvar Alterações' : 'Criar Visão'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}