import React, { useState } from 'react';
import { X, Search, FileText, ChevronRight, Star } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface TemplateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (templateId: string) => void;
}

// Reuse mock templates from Templates.tsx for now or accept as prop
const MOCK_TEMPLATES = [
  { id: '1', name: 'Contrato de Prestação de Serviços', folder: 'Contratos', isFavorite: true },
  { id: '2', name: 'NDA - Padrão', folder: 'Jurídico', isFavorite: false },
  { id: '3', name: 'Termo de Aceite', folder: 'Geral', isFavorite: false },
  { id: '5', name: 'Proposta Comercial - Enterprise', folder: 'Vendas', isFavorite: true },
  { id: '8', name: 'Contrato de Locação Residencial', folder: 'Imobiliário', isFavorite: true },
  { id: '13', name: 'Checklist de Onboarding', folder: 'RH', isFavorite: true },
  { id: '19', name: 'Política de Privacidade Interna', folder: 'Compliance', isFavorite: true },
  { id: '24', name: 'Orçamento Padrão 2024', folder: 'Vendas', isFavorite: true },
];

export function TemplateSelectorModal({ isOpen, onClose, onSelect }: TemplateSelectorModalProps) {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredTemplates = MOCK_TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700 flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif]">Selecionar Modelo</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Escolha um modelo para iniciar um novo envelope.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar modelos..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#8925e2] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-2">
          {filteredTemplates.length > 0 ? (
            <div className="grid gap-2 p-2">
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => onSelect(template.id)}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent hover:border-purple-100 dark:hover:border-purple-900/30 transition-all group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-[#8925e2] group-hover:scale-110 transition-transform">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-[#8925e2] transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full font-medium">
                          {template.folder}
                        </span>
                        {template.isFavorite && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-yellow-500 uppercase tracking-wide">
                            <Star size={10} fill="currentColor" /> Favorito
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-[#8925e2] group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                <Search size={24} />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-1">Nenhum modelo encontrado</h3>
              <p className="text-sm text-gray-500 max-w-xs">Tente buscar por outro termo ou crie um novo modelo.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}