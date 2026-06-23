import React, { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface AddPaymentMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cardData: any) => void;
}

export function AddPaymentMethodModal({ isOpen, onClose, onSave }: AddPaymentMethodModalProps) {
  const [formData, setFormData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Adicionar Cartão</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Adicione um novo método de pagamento seguro.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome no Cartão</label>
            <input 
              type="text" 
              placeholder="COMO ESTA NO CARTAO"
              className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all uppercase"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Número do Cartão</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="0000 0000 0000 0000"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                value={formData.number}
                onChange={e => setFormData({...formData, number: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="space-y-1 flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Validade</label>
              <input 
                type="text" 
                placeholder="MM/AA"
                className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                value={formData.expiry}
                onChange={e => setFormData({...formData, expiry: e.target.value})}
                required
              />
            </div>
            <div className="space-y-1 flex-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CVC</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input 
                  type="text" 
                  placeholder="123"
                  className="w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                  value={formData.cvc}
                  onChange={e => setFormData({...formData, cvc: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-[#8925e2] text-white font-bold py-3 rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              <Lock size={16} />
              Adicionar Cartão Seguro
            </button>
            <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
              <Lock size={10} />
              Seus dados são criptografados e seguros via Stripe.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}