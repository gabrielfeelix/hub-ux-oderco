import React, { useState, useEffect } from 'react';
import { X, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface FilterOption {
  value: string;
  label: string;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  statusOptions?: FilterOption[];
  currentFilters?: any;
}

export function FilterModal({ isOpen, onClose, onApply, statusOptions = [], currentFilters = {} }: FilterModalProps) {
  const [filters, setFilters] = useState({
    status: [] as string[],
    dateStart: '',
    dateEnd: '',
    ...currentFilters
  });

  useEffect(() => {
    if (isOpen) {
      setFilters({
        status: [] as string[],
        dateStart: '',
        dateEnd: '',
        ...currentFilters
      });
    }
  }, [isOpen, currentFilters]);

  if (!isOpen) return null;

  const toggleStatus = (value: string) => {
    setFilters((prev: any) => {
      const current = prev.status || [];
      if (current.includes(value)) {
        return { ...prev, status: current.filter((s: string) => s !== value) };
      } else {
        return { ...prev, status: [...current, value] };
      }
    });
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 z-50 animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg dark:text-white uppercase tracking-wider text-sm text-gray-500">Filtrar</h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <X size={20} />
        </button>
      </div>

      <div className="space-y-6">
        
        {/* Status Section */}
        {statusOptions.length > 0 && (
          <div className="space-y-3">
             <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Status</label>
             <div className="flex flex-col gap-2">
               {statusOptions.map(option => (
                 <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                   <div className={cn(
                     "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                     filters.status?.includes(option.value)
                       ? "bg-[#8925e2] border-[#8925e2]"
                       : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-[#8925e2]"
                   )}>
                     {filters.status?.includes(option.value) && (
                       <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                       </svg>
                     )}
                   </div>
                   <input 
                     type="checkbox" 
                     className="hidden" 
                     checked={filters.status?.includes(option.value)}
                     onChange={() => toggleStatus(option.value)}
                   />
                   <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-[#8925e2] transition-colors">
                     {option.label}
                   </span>
                 </label>
               ))}
             </div>
          </div>
        )}

        {/* Date Section */}
        <div className="space-y-3">
           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Data</label>
           <div className="grid grid-cols-2 gap-3">
             <div className="relative">
               <input 
                 type="text" 
                 placeholder="dd/mm/aaaa"
                 className="w-full bg-[#f5f4f7] dark:bg-gray-700/50 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-[#8925e2] focus:bg-white dark:focus:bg-gray-800 transition-all text-gray-700 dark:text-gray-200"
                 value={filters.dateStart}
                 onChange={(e) => setFilters({...filters, dateStart: e.target.value})}
               />
             </div>
             <div className="relative">
                <input 
                 type="text" 
                 placeholder="dd/mm/aaaa"
                 className="w-full bg-[#f5f4f7] dark:bg-gray-700/50 rounded-xl px-3 py-2.5 text-sm outline-none border border-transparent focus:border-[#8925e2] focus:bg-white dark:focus:bg-gray-800 transition-all text-gray-700 dark:text-gray-200"
                 value={filters.dateEnd}
                 onChange={(e) => setFilters({...filters, dateEnd: e.target.value})}
               />
             </div>
           </div>
        </div>

      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
        <button 
          onClick={() => {
            setFilters({ status: [], dateStart: '', dateEnd: '' });
            onApply({ status: [], dateStart: '', dateEnd: '' });
          }}
          className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Limpar
        </button>
        <button 
          onClick={() => {
            onApply(filters);
            onClose();
          }}
          className="px-6 py-2 bg-[#8925e2] text-white rounded-xl text-sm font-bold hover:bg-[#701db0] transition-colors shadow-lg shadow-purple-500/20"
        >
          Aplicar
        </button>
      </div>

    </div>
  );
}