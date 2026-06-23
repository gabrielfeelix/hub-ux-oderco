import React, { useState } from 'react';
import { X, FileText, Table, FileSpreadsheet, Download, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: string, type: string) => void;
}

export function ExportReportModal({ isOpen, onClose, onExport }: ExportReportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
  const [exportType, setExportType] = useState<'full' | 'custom'>('full');

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(selectedFormat, exportType);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-gray-100 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
             <h2 className="text-xl font-bold text-gray-900 dark:text-white">Exportar Relatório</h2>
             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Selecione o formato e os dados que deseja exportar.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Formato */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Formato do Arquivo</h3>
            <div className="grid grid-cols-3 gap-3">
               <FormatOption 
                 id="pdf" 
                 label="PDF" 
                 icon={<FileText size={20} />} 
                 isSelected={selectedFormat === 'pdf'} 
                 onSelect={() => setSelectedFormat('pdf')} 
               />
               <FormatOption 
                 id="excel" 
                 label="Excel" 
                 icon={<FileSpreadsheet size={20} />} 
                 isSelected={selectedFormat === 'excel'} 
                 onSelect={() => setSelectedFormat('excel')} 
               />
               <FormatOption 
                 id="csv" 
                 label="CSV" 
                 icon={<Table size={20} />} 
                 isSelected={selectedFormat === 'csv'} 
                 onSelect={() => setSelectedFormat('csv')} 
               />
            </div>
          </div>

          {/* Tipo de Exportação */}
          <div>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-3">Tipo de Exportação</h3>
            <div className="space-y-3">
              <label 
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                  exportType === 'full' 
                    ? "border-[#8925e2] bg-purple-50/50 dark:bg-purple-900/10" 
                    : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                )}
                onClick={() => setExportType('full')}
              >
                 <div className={cn(
                   "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                   exportType === 'full' ? "border-[#8925e2] bg-[#8925e2]" : "border-gray-300 dark:border-gray-600"
                 )}>
                    {exportType === 'full' && <div className="w-2 h-2 bg-white rounded-full" />}
                 </div>
                 <div>
                    <span className="block font-bold text-sm text-gray-900 dark:text-white mb-1">Exportação Completa</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">Todos os dados e colunas disponíveis serão incluídos.</span>
                 </div>
              </label>

              <label 
                className={cn(
                  "flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all",
                  exportType === 'custom' 
                    ? "border-[#8925e2] bg-purple-50/50 dark:bg-purple-900/10" 
                    : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600"
                )}
                onClick={() => setExportType('custom')}
              >
                 <div className={cn(
                   "w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5",
                   exportType === 'custom' ? "border-[#8925e2] bg-[#8925e2]" : "border-gray-300 dark:border-gray-600"
                 )}>
                    {exportType === 'custom' && <div className="w-2 h-2 bg-white rounded-full" />}
                 </div>
                 <div>
                    <span className="block font-bold text-sm text-gray-900 dark:text-white mb-1">Personalizar Campos</span>
                    <span className="block text-xs text-gray-500 dark:text-gray-400">Escolha quais colunas você deseja exportar.</span>
                 </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
           <button 
             onClick={onClose}
             className="px-6 py-2.5 font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors text-sm border border-gray-300 dark:border-gray-600"
           >
             Cancelar
           </button>
           <button 
             onClick={handleExport}
             className="px-6 py-2.5 bg-[#8925e2] hover:bg-[#7a1fd0] text-white font-bold rounded-xl flex items-center gap-2 transition-colors shadow-lg shadow-purple-500/20 text-sm"
           >
             Exportar <Download size={16} />
           </button>
        </div>
      </div>
    </div>
  );
}

function FormatOption({ id, label, icon, isSelected, onSelect }: any) {
  return (
    <div 
      onClick={onSelect}
      className={cn(
        "relative flex flex-col items-center justify-center p-4 rounded-xl border-2 cursor-pointer transition-all h-24",
        isSelected 
          ? "border-[#8925e2] bg-purple-50/50 dark:bg-purple-900/10 text-[#8925e2]" 
          : "border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 text-gray-500 dark:text-gray-400"
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 text-[#8925e2]">
          <CheckCircle size={14} fill="currentColor" className="text-white" />
        </div>
      )}
      <div className={cn("mb-2", isSelected ? "text-[#8925e2]" : "text-gray-400")}>
        {icon}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}