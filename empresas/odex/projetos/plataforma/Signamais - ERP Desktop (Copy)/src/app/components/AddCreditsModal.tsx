import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface AddCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  count?: number; // Number of clients selected for bulk action
}

export function AddCreditsModal({ isOpen, onClose, onConfirm, count = 1 }: AddCreditsModalProps) {
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAdd = async () => {
    if (!amount || isNaN(Number(amount))) return;
    
    setIsLoading(true);
    // Simulate API call/loading state
    setTimeout(() => {
      setIsLoading(false);
      onConfirm(Number(amount));
      setAmount("");
    }, 2000);
  };

  const isBulk = count > 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="bg-white dark:bg-gray-800 rounded-[16px] w-full max-w-[600px] shadow-2xl relative z-10 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-8 border-b border-[#edeeee] dark:border-gray-700">
          <h2 className="text-[#212529] dark:text-white text-[20px] font-bold font-sans">
            {isBulk ? `Adicionar Créditos em Lote` : `Adicionar Crédito(s)`}
          </h2>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="text-[#212529] dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 flex flex-col gap-6">
          {isBulk && (
             <div className="bg-purple-50 dark:bg-purple-900/20 text-[#8925e2] dark:text-purple-300 p-4 rounded-xl flex items-center gap-3">
                <div className="bg-[#8925e2] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {count}
                </div>
                <p className="text-sm font-medium">
                  Você está adicionando créditos para <span className="font-bold">{count} clientes</span> selecionados.
                </p>
             </div>
          )}

          {/* Info Box - Only show for single client or aggregated info if needed, hiding for bulk to avoid confusion unless we have aggregate data */}
          {!isBulk && (
            <div className="border-2 border-[#edeeee] dark:border-gray-700 rounded-[16px] p-4 flex items-center justify-center bg-white dark:bg-gray-800">
              <p className="text-[#495057] dark:text-gray-300 text-[16px]">
                <span className="font-normal font-sans">Créditos disponíveis: </span>
                <span className="font-bold text-[#282c30] dark:text-white font-sans">50 Créditos</span>
              </p>
            </div>
          )}

          {/* Input */}
          <div className="flex flex-col gap-2">
            <label className="text-[#42494f] dark:text-gray-300 text-[16px] font-normal font-sans">
              Quantidade de Créditos {isBulk && "(por cliente)"}
            </label>
            <div className="bg-[#f5f4f7] dark:bg-gray-900 rounded-[16px] h-[56px] flex items-center px-4 transition-ring focus-within:ring-2 ring-purple-500/20 border border-transparent dark:border-gray-700">
              <input 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="000"
                className="bg-transparent border-none outline-none w-full text-[#42494f] dark:text-white text-[16px] placeholder:text-[#abafb2] dark:placeholder:text-gray-600"
                disabled={isLoading}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 flex justify-end gap-2 bg-white dark:bg-gray-800">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="h-[56px] px-6 rounded-[16px] border-2 border-[#abafb2] text-[#6d7379] dark:border-gray-600 dark:text-gray-400 font-bold text-[16px] hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors disabled:opacity-50"
          >
            Fechar
          </button>
          
          <button 
            onClick={handleAdd}
            disabled={isLoading || !amount}
            className={cn(
              "h-[56px] px-6 rounded-[16px] bg-[#8925e2] text-white font-bold text-[16px] flex items-center gap-2 hover:bg-[#7a1fd0] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px] justify-center",
              isLoading ? "bg-[#b970fa]" : ""
            )}
          >
            {isLoading ? (
               <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Adicionar
                <Check size={20} strokeWidth={3} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
