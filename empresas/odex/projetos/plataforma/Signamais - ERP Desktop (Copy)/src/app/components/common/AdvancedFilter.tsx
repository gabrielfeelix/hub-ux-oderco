import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Calendar, Check, X, RotateCcw } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface FilterOption {
  id: string;
  label: string;
}

interface AdvancedFilterProps {
  options: {
    status: FilterOption[];
    users?: FilterOption[];
    docTypes?: FilterOption[];
  };
  onApply: (filters: any) => void;
  label?: string;
}

export function AdvancedFilter({ options, onApply, label = "Filtros Avançados" }: AdvancedFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>([]);
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleStatus = (id: string) => {
    setSelectedStatus(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleUser = (id: string) => {
    setSelectedUsers(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const toggleDocType = (id: string) => {
    setSelectedDocTypes(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const handleApply = () => {
    onApply({
      status: selectedStatus,
      users: selectedUsers,
      docTypes: selectedDocTypes,
      dateRange: { start: dateStart, end: dateEnd }
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedStatus([]);
    setSelectedUsers([]);
    setSelectedDocTypes([]);
    setDateStart('');
    setDateEnd('');
  };

  const activeCount = selectedStatus.length + selectedUsers.length + selectedDocTypes.length + (dateStart || dateEnd ? 1 : 0);

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 border-2 rounded-2xl text-sm font-medium transition-colors shadow-sm",
          isOpen || activeCount > 0 
            ? "border-[#8925e2]/30 text-[#8925e2]" 
            : "border-transparent text-gray-700 dark:text-gray-200 hover:border-[#8925e2]/20 hover:bg-gray-50"
        )}
      >
        {label}
        {activeCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 bg-[#8925e2] text-white text-[10px] rounded-full font-bold">
            {activeCount}
          </span>
        )}
        <ChevronDown size={16} className={cn("transition-transform", isOpen ? "rotate-180" : "")} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-[320px] bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 p-5 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Status Section */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Status</h4>
            <div className="flex flex-wrap gap-2">
              {options.status.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleStatus(option.id)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                    selectedStatus.includes(option.id)
                      ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Doc Types Section */}
          {options.docTypes && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tipo de Documento</h4>
              <div className="flex flex-wrap gap-2">
                {options.docTypes.map(option => (
                  <button
                    key={option.id}
                    onClick={() => toggleDocType(option.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                      selectedDocTypes.includes(option.id)
                        ? "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                        : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-800"
                    )}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Users Section */}
          {options.users && (
            <div className="mb-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Usuários</h4>
              <div className="space-y-1 max-h-[120px] overflow-y-auto pr-1">
                {options.users.map(option => (
                  <label 
                    key={option.id} 
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors group"
                  >
                    <div className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                      selectedUsers.includes(option.id) 
                        ? "bg-[#8925e2] border-[#8925e2]" 
                        : "border-gray-300 dark:border-gray-600 group-hover:border-[#8925e2]"
                    )}>
                      {selectedUsers.includes(option.id) && <Check size={10} className="text-white" />}
                    </div>
                    <span className={cn(
                      "text-xs font-medium transition-colors",
                      selectedUsers.includes(option.id) ? "text-[#8925e2]" : "text-gray-700 dark:text-gray-200"
                    )}>
                      {option.label}
                    </span>
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={selectedUsers.includes(option.id)}
                      onChange={() => toggleUser(option.id)}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Date Section */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Data</h4>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="dd/mm/aaaa"
                  value={dateStart}
                  onChange={(e) => setDateStart(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-[#8925e2] focus:ring-1 focus:ring-[#8925e2] transition-all"
                />
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="dd/mm/aaaa"
                  value={dateEnd}
                  onChange={(e) => setDateEnd(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:border-[#8925e2] focus:ring-1 focus:ring-[#8925e2] transition-all"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
             <button 
               onClick={handleClear}
               className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
             >
               <RotateCcw size={12} />
               Limpar
             </button>
             <button 
               onClick={handleApply}
               className="bg-[#8925e2] hover:bg-[#7a1fd0] text-white text-sm font-bold px-6 py-2 rounded-xl shadow-lg shadow-purple-500/20 transition-colors"
             >
               Aplicar
             </button>
          </div>
        </div>
      )}
    </div>
  );
}