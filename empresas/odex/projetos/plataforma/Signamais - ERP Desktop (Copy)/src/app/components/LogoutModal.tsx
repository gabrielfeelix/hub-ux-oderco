import React from 'react';
import { X, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ isOpen, onClose, onConfirm }: LogoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-[400px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
            <LogOut className="text-red-600 dark:text-red-400 w-8 h-8 ml-1" />
          </div>
          
          <h2 className="text-2xl font-bold text-[#212529] dark:text-white font-[Lufga,sans-serif] mb-2">
            Deseja realmente sair?
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Você precisará fazer login novamente para acessar sua conta.
          </p>
        </div>

        <div className="p-6 pt-0 flex gap-3 justify-center">
          <button 
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            Cancelar
          </button>
          
          <button 
            onClick={onConfirm}
            className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
          >
            Sim, sair
          </button>
        </div>
      </div>
    </div>
  );
}
