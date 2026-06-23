import React, { useState } from 'react';
import { X, Filter, RotateCcw, Check, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export interface DocumentFilterCriteria {
  status: string[]; // Multi-select possible
  startDate: string;
  endDate: string;
  search: string;
}

interface DocumentFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (criteria: DocumentFilterCriteria) => void;
  onClear: () => void;
  initialCriteria: DocumentFilterCriteria;
}

const STATUS_OPTIONS = [
  { id: 'Enviado', label: 'Enviado', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'Assinado', label: 'Assinado', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'Expira em Breve', label: 'Expira em Breve', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'Expirado', label: 'Expirado', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'Cancelado', label: 'Cancelado', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

export function DocumentFilterModal({ isOpen, onClose, onApply, onClear, initialCriteria }: DocumentFilterModalProps) {
  const [criteria, setCriteria] = useState<DocumentFilterCriteria>(initialCriteria);

  if (!isOpen) return null;

  const handleApply = () => {
    onApply(criteria);
    onClose();
  };

  const handleClear = () => {
    const cleared: DocumentFilterCriteria = {
      status: [],
      startDate: '',
      endDate: '',
      search: ''
    };
    setCriteria(cleared);
    onClear();
    onClose();
  };

  const toggleStatus = (status: string) => {
    if (criteria.status.includes(status)) {
      setCriteria({ ...criteria, status: criteria.status.filter(s => s !== status) });
    } else {
      setCriteria({ ...criteria, status: [...criteria.status, status] });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 pb-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-[#212529] dark:text-white font-[Lufga,sans-serif] leading-tight flex items-center gap-2">
              <Filter className="text-[#8925e2]" size={24} />
              Filtrar Documentos
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Refine a lista de documentos usando os filtros abaixo.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#212529] dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 py-6 overflow-y-auto custom-scrollbar flex flex-col gap-6">
          
          {/* Status Section */}
          <section>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 block">
              Status do Documento
            </label>
            <div className="flex flex-wrap gap-3">
              {STATUS_OPTIONS.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleStatus(option.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl border text-sm font-bold transition-all flex items-center gap-2",
                    criteria.status.includes(option.id)
                      ? "bg-[#8925e2] text-white border-[#8925e2]"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  {option.label}
                  {criteria.status.includes(option.id) && <Check size={14} />}
                </button>
              ))}
            </div>
          </section>

          {/* Date Range Section */}
          <section>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3 block">
              Período de Envio
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                   <Calendar size={16} />
                </span>
                <input
                  type="date"
                  value={criteria.startDate}
                  onChange={(e) => setCriteria({ ...criteria, startDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f5f4f7] dark:bg-gray-900 border border-transparent focus:border-[#8925e2] focus:bg-white dark:focus:bg-gray-800 rounded-xl outline-none transition-all dark:text-white text-sm"
                />
              </div>
              <span className="text-gray-400 font-medium">-</span>
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                   <Calendar size={16} />
                </span>
                <input
                  type="date"
                  value={criteria.endDate}
                  onChange={(e) => setCriteria({ ...criteria, endDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f5f4f7] dark:bg-gray-900 border border-transparent focus:border-[#8925e2] focus:bg-white dark:focus:bg-gray-800 rounded-xl outline-none transition-all dark:text-white text-sm"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-8 pt-6 flex justify-between gap-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={handleClear}
            className="px-4 py-3.5 rounded-2xl text-gray-500 font-bold font-[Lufga,sans-serif] hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 transition-colors flex items-center gap-2"
          >
            <RotateCcw size={18} />
            Limpar
          </button>
          
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-6 py-3.5 rounded-2xl border-2 border-[#abafb2] text-[#6d7379] font-bold font-[Lufga,sans-serif] hover:border-gray-400 hover:text-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleApply}
              className="px-6 py-3.5 rounded-2xl bg-[#8925e2] hover:bg-[#701db0] text-white font-bold font-[Lufga,sans-serif] transition-all shadow-lg flex items-center gap-2"
            >
              Aplicar Filtros
              <Check size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}