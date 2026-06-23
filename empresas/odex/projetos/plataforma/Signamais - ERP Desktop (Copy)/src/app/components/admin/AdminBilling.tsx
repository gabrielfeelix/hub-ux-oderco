import React, { useState } from 'react';
import { CreditCard, Zap, Shield, ChevronRight, Check } from 'lucide-react';
import { ManagePlanModal } from './ManagePlanModal';
import { BuyCreditsModal } from '../BuyCreditsModal';
import { AddPaymentMethodModal } from './PaymentMethodModal';

export function AdminBilling() {
  const [isManagePlanOpen, setIsManagePlanOpen] = useState(false);
  const [isBuyCreditsOpen, setIsBuyCreditsOpen] = useState(false);
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <ManagePlanModal 
        isOpen={isManagePlanOpen}
        onClose={() => setIsManagePlanOpen(false)}
        onUpgrade={(planId) => {
          setIsManagePlanOpen(false);
          // Toast or logic handled by modal usually, but here for demo:
        }}
      />
      <BuyCreditsModal 
        isOpen={isBuyCreditsOpen}
        onClose={() => setIsBuyCreditsOpen(false)}
        onSuccess={() => {}}
      />
      <AddPaymentMethodModal 
        isOpen={isAddCardOpen}
        onClose={() => setIsAddCardOpen(false)}
        onSave={() => {
           setIsAddCardOpen(false);
        }}
      />
      
      {/* Header */}
      <div className="flex flex-col gap-1">
         <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Administração</h2>
         <div className="flex flex-col gap-2">
            <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Envelopes e Cobrança</h1>
            <p className="text-gray-500 dark:text-gray-400">Gerencie seu plano, métodos de pagamento e créditos.</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={120} className="text-[#8925e2]" />
           </div>
           
           <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                 <div className="p-2 bg-purple-100 text-[#8925e2] rounded-lg dark:bg-purple-900/30 dark:text-purple-300">
                    <Zap size={20} />
                 </div>
                 <span className="font-bold text-gray-500 dark:text-gray-400 text-sm uppercase tracking-wider">Plano Atual</span>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">Profissional</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Renova em 15/03/2026</p>
              
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                 <button 
                   onClick={() => setIsManagePlanOpen(true)}
                   className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                 >
                    Gerenciar Plano
                 </button>
              </div>
           </div>
        </div>

        {/* Credits Usage */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
           <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white">Consumo de Envelopes</h3>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full dark:bg-green-900/30 dark:text-green-400">Ativo</span>
           </div>

           <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-end justify-between mb-2">
                 <span className="text-4xl font-bold text-gray-900 dark:text-white">42<span className="text-lg text-gray-400 font-normal">/50</span></span>
                 <span className="text-sm font-bold text-[#8925e2]">84% usado</span>
              </div>
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                 <div className="h-full bg-[#8925e2] rounded-full w-[84%]" />
              </div>
              <p className="text-xs text-gray-500 mt-3">Sua cota mensal reseta em 12 dias.</p>
           </div>
           
           <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setIsBuyCreditsOpen(true)}
                className="w-full py-2.5 border-2 border-dashed border-[#8925e2]/30 text-[#8925e2] font-bold rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors flex items-center justify-center gap-2"
              >
                 Comprar extras
              </button>
           </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
           <div className="flex items-center gap-2 mb-6">
              <Shield size={20} className="text-gray-400" />
              <h3 className="font-bold text-gray-900 dark:text-white">Método de Pagamento</h3>
           </div>

           <div className="flex-1">
              <div className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                 <div className="w-10 h-6 bg-gray-800 rounded flex items-center justify-center text-white text-[8px] font-bold">VISA</div>
                 <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">•••• 4242</p>
                    <p className="text-xs text-gray-500">Expira em 12/28</p>
                 </div>
                 <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
           </div>

           <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
              <button 
                onClick={() => setIsAddCardOpen(true)}
                className="w-full py-2.5 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
              >
                 <CreditCard size={16} />
                 Adicionar cartão
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}