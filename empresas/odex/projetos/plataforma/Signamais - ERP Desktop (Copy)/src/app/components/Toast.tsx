import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ToastProps {
  message: string;
  onClose: () => void;
  visible: boolean;
}

export function Toast({ message, onClose, visible }: ToastProps) {
  if (!visible) return null;

  return (
    <div className="fixed top-8 right-8 z-50 animate-in fade-in slide-in-from-top-5 duration-300">
      <div className="bg-[#e8f3ee] border-2 border-[#95c8b0] rounded-[16px] p-6 shadow-lg flex items-center gap-4 min-w-[400px]">
        <div className="shrink-0 text-[#177B4C]">
          <CheckCircle size={24} fill="#e8f3ee" className="text-[#177B4C]" />
        </div>
        <p className="flex-1 font-bold text-[#177b4c] text-base font-sans">
          {message}
        </p>
        <button 
          onClick={onClose}
          className="shrink-0 text-[#212529] hover:opacity-70 transition-opacity"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
