import React, { useState } from 'react';
import { X, FileText, FileSpreadsheet, Table, Check, Loader2, Download } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'pdf' | 'csv' | 'excel', type: 'complete' | 'custom', fields?: string[]) => void;
  isLoading: boolean;
}

const AVAILABLE_FIELDS = [
  { id: 'id', label: 'ID do Cliente' },
  { id: 'name', label: 'Nome da Empresa' },
  { id: 'credits', label: 'Créditos Disponíveis' },
  { id: 'document', label: 'Documento (CNPJ/CPF)' },
  { id: 'envelopes', label: 'Quantidade de Envelopes' },
  { id: 'lastConsult', label: 'Última Consulta' },
  { id: 'status', label: 'Status' },
];

export function ExportModal({ isOpen, onClose, onExport, isLoading }: ExportModalProps) {
  const [format, setFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf');
  const [type, setType] = useState<'complete' | 'custom'>('complete');
  const [selectedFields, setSelectedFields] = useState<string[]>(AVAILABLE_FIELDS.map(f => f.id));

  if (!isOpen) return null;

  const handleFieldToggle = (fieldId: string) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter(f => f !== fieldId));
    } else {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  const handleConfirm = () => {
    onExport(format, type, type === 'custom' ? selectedFields : undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-[600px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-8 pb-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-[#212529] dark:text-white font-[Lufga,sans-serif] leading-tight">
              Exportar Relatório
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
              Selecione o formato e os dados que deseja exportar.
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
        <div className="p-8 py-6 overflow-y-auto custom-scrollbar">
          
          {/* Format Selection */}
          <section className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Formato do Arquivo</h3>
            <div className="grid grid-cols-3 gap-4">
              <FormatOption 
                selected={format === 'pdf'} 
                onClick={() => setFormat('pdf')}
                icon={<FileText size={24} />}
                label="PDF"
                color="text-red-500"
                bgColor="bg-red-50 dark:bg-red-900/20"
                borderColor="peer-checked:border-red-500"
              />
              <FormatOption 
                selected={format === 'excel'} 
                onClick={() => setFormat('excel')}
                icon={<FileSpreadsheet size={24} />}
                label="Excel"
                color="text-green-600"
                bgColor="bg-green-50 dark:bg-green-900/20"
                borderColor="peer-checked:border-green-600"
              />
              <FormatOption 
                selected={format === 'csv'} 
                onClick={() => setFormat('csv')}
                icon={<Table size={24} />}
                label="CSV"
                color="text-blue-500"
                bgColor="bg-blue-50 dark:bg-blue-900/20"
                borderColor="peer-checked:border-blue-500"
              />
            </div>
          </section>

          {/* Type Selection */}
          <section className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Tipo de Exportação</h3>
            <div className="flex flex-col gap-3">
              <label className={cn(
                "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                type === 'complete' 
                  ? "border-[#8925e2] bg-purple-50/50 dark:bg-purple-900/20" 
                  : "border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              )}>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  type === 'complete' ? "border-[#8925e2]" : "border-gray-300 dark:border-gray-500"
                )}>
                  {type === 'complete' && <div className="w-2.5 h-2.5 rounded-full bg-[#8925e2]" />}
                </div>
                <input type="radio" name="exportType" className="hidden" checked={type === 'complete'} onChange={() => setType('complete')} />
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white">Exportação Completa</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Todos os dados e colunas disponíveis serão incluídos.</span>
                </div>
              </label>

              <label className={cn(
                "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                type === 'custom' 
                  ? "border-[#8925e2] bg-purple-50/50 dark:bg-purple-900/20" 
                  : "border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
              )}>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  type === 'custom' ? "border-[#8925e2]" : "border-gray-300 dark:border-gray-500"
                )}>
                  {type === 'custom' && <div className="w-2.5 h-2.5 rounded-full bg-[#8925e2]" />}
                </div>
                <input type="radio" name="exportType" className="hidden" checked={type === 'custom'} onChange={() => setType('custom')} />
                <div>
                  <span className="block font-bold text-gray-900 dark:text-white">Personalizar Campos</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Escolha quais colunas você deseja exportar.</span>
                </div>
              </label>
            </div>
          </section>

          {/* Custom Fields Selection */}
          {type === 'custom' && (
             <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
               <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Selecione os campos:</h4>
               <div className="grid grid-cols-2 gap-3">
                 {AVAILABLE_FIELDS.map((field) => (
                   <label key={field.id} className="flex items-center gap-3 cursor-pointer group">
                     <div className={cn(
                       "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                       selectedFields.includes(field.id) 
                         ? "bg-[#8925e2] border-[#8925e2]" 
                         : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 group-hover:border-[#8925e2]"
                     )}>
                       {selectedFields.includes(field.id) && <Check size={14} className="text-white" />}
                     </div>
                     <input 
                       type="checkbox" 
                       className="hidden" 
                       checked={selectedFields.includes(field.id)}
                       onChange={() => handleFieldToggle(field.id)}
                     />
                     <span className="text-sm text-gray-700 dark:text-gray-300">{field.label}</span>
                   </label>
                 ))}
               </div>
             </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-8 pt-6 flex justify-end gap-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3.5 rounded-2xl border-2 border-[#abafb2] text-[#6d7379] font-bold font-[Lufga,sans-serif] hover:border-gray-400 hover:text-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          
          <button 
            onClick={handleConfirm}
            disabled={isLoading || (type === 'custom' && selectedFields.length === 0)}
            className={cn(
              "px-6 py-3.5 rounded-2xl flex items-center gap-2 font-bold font-[Lufga,sans-serif] text-white transition-all shadow-lg min-w-[140px] justify-center",
              isLoading || (type === 'custom' && selectedFields.length === 0)
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-[#8925e2] hover:bg-[#701db0]"
            )}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                Exportar <Download size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function FormatOption({ selected, onClick, icon, label, color, bgColor, borderColor }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all relative overflow-hidden group",
        selected 
          ? `border-current ${color} bg-white dark:bg-gray-800 ring-1 ring-current`
          : "border-gray-100 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
      )}
    >
      {selected && (
        <div className={cn("absolute inset-0 opacity-10", bgColor)} />
      )}
      <div className={cn(
        "p-3 rounded-full transition-colors",
        selected ? bgColor : "bg-gray-100 dark:bg-gray-700"
      )}>
        {icon}
      </div>
      <span className="font-bold text-sm">{label}</span>
      
      {selected && (
        <div className={cn(
          "absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center",
          color,
          bgColor
        )}>
          <Check size={12} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}
