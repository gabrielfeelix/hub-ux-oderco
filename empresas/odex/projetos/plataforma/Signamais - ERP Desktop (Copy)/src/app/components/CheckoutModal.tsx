import React, { useState, useEffect } from 'react';
import { X, CreditCard, Barcode, QrCode, Check, Loader2, ShieldCheck, Lock, Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: string;
    period: 'monthly' | 'annual';
    credits: number;
  } | null;
  onSuccess: () => void;
}

type PaymentMethod = 'credit_card' | 'boleto' | 'pix';
type CheckoutStep = 'payment' | 'processing' | 'success';

export function CheckoutModal({ isOpen, onClose, plan, onSuccess }: CheckoutModalProps) {
  const [step, setStep] = useState<CheckoutStep>('payment');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit_card');
  const [useSavedCard, setUseSavedCard] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('payment');
      setIsLoading(false);
      setUseSavedCard(true); // Default to saved card
    }
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const handleConfirm = () => {
    setStep('processing');
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 2500);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
  };

  const today = new Date();
  const nextMonth = new Date(today);
  nextMonth.setDate(today.getDate() + 30);
  const formattedNextDate = nextMonth.toLocaleDateString('pt-BR');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white font-['Lufga',sans-serif]">
            {step === 'payment' && `Confirmar upgrade para ${plan.name}`}
            {step === 'processing' && 'Processando pagamento'}
            {step === 'success' && 'Upgrade realizado!'}
          </h3>
          {step !== 'processing' && (
            <button 
              onClick={onClose} 
              className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          
          {step === 'payment' && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-900/30">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-[#8925e2] text-lg">{plan.name} {plan.period === 'monthly' ? 'Mensal' : 'Anual'}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Créditos incluídos: <span className="font-bold">{plan.credits}/mês</span></p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xl text-gray-900 dark:text-white">R$ {plan.price}</p>
                    <p className="text-xs text-gray-500">/{plan.period === 'monthly' ? 'mês' : 'ano'}</p>
                  </div>
                </div>
                <div className="h-[1px] bg-purple-200 dark:bg-purple-800/50 my-3" />
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Total hoje:</span>
                  <span className="font-bold text-gray-900 dark:text-white">R$ {plan.price}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-600 dark:text-gray-400">Próxima cobrança:</span>
                  <span className="text-gray-900 dark:text-white">{formattedNextDate}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Forma de pagamento</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('credit_card')}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                      paymentMethod === 'credit_card' 
                        ? "border-[#8925e2] bg-purple-50/50 text-[#8925e2]" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500"
                    )}
                  >
                    <CreditCard size={24} />
                    <span className="text-xs font-bold">Cartão</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('boleto')}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                      paymentMethod === 'boleto' 
                        ? "border-[#8925e2] bg-purple-50/50 text-[#8925e2]" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500"
                    )}
                  >
                    <Barcode size={24} />
                    <span className="text-xs font-bold">Boleto</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('pix')}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                      paymentMethod === 'pix' 
                        ? "border-[#8925e2] bg-purple-50/50 text-[#8925e2]" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500"
                    )}
                  >
                    <QrCode size={24} />
                    <span className="text-xs font-bold">PIX</span>
                  </button>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4 animate-in slide-in-from-top-2 duration-300">
                  
                  {/* Saved Card Selector */}
                  <div className="space-y-2">
                     <button
                        onClick={() => setUseSavedCard(true)}
                        className={cn(
                           "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left",
                           useSavedCard 
                              ? "border-[#8925e2] bg-purple-50/30" 
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        )}
                     >
                        <div className="flex items-center gap-3">
                           <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", useSavedCard ? "border-[#8925e2] bg-[#8925e2]" : "border-gray-300")}>
                              {useSavedCard && <Check size={12} className="text-white" />}
                           </div>
                           <div className="flex items-center gap-2">
                              <CreditCard size={20} className="text-gray-500" />
                              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Mastercard •••• 1234</span>
                           </div>
                        </div>
                     </button>
                     
                     <button
                        onClick={() => setUseSavedCard(false)}
                        className={cn(
                           "w-full flex items-center justify-between p-3 rounded-xl border-2 transition-all text-left",
                           !useSavedCard 
                              ? "border-[#8925e2] bg-purple-50/30" 
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
                        )}
                     >
                        <div className="flex items-center gap-3">
                           <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center", !useSavedCard ? "border-[#8925e2] bg-[#8925e2]" : "border-gray-300")}>
                              {!useSavedCard && <Check size={12} className="text-white" />}
                           </div>
                           <div className="flex items-center gap-2">
                              <Plus size={20} className="text-gray-500" />
                              <span className="text-sm font-bold text-gray-700 dark:text-gray-200">Usar outro cartão</span>
                           </div>
                        </div>
                     </button>
                  </div>

                  {/* New Card Fields */}
                  {!useSavedCard && (
                     <div className="space-y-4 pt-2 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Número do cartão</label>
                           <div className="relative">
                              <input 
                              type="text" 
                              placeholder="0000 0000 0000 0000" 
                              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none transition-all"
                              />
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                           </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Validade</label>
                              <input 
                              type="text" 
                              placeholder="MM/AA" 
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none transition-all"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">CVV</label>
                              <div className="relative">
                              <input 
                                 type="text" 
                                 placeholder="123" 
                                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none transition-all"
                              />
                              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                              </div>
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome no cartão</label>
                           <input 
                              type="text" 
                              placeholder="COMO ESTÁ NO CARTÃO" 
                              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none transition-all"
                           />
                        </div>

                        <label className="flex items-center gap-2 cursor-pointer mt-2">
                           <input type="checkbox" className="rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2]" defaultChecked />
                           <span className="text-sm text-gray-600 dark:text-gray-400">Salvar cartão para próximas cobranças</span>
                        </label>
                     </div>
                  )}
                </div>
              )}

              {/* Boleto Info */}
              {paymentMethod === 'boleto' && (
                 <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400 text-center animate-in slide-in-from-top-2">
                    <p>O boleto será gerado na próxima tela.</p>
                    <p className="mt-1">A compensação pode levar até 3 dias úteis.</p>
                 </div>
              )}

              {/* PIX Info */}
              {paymentMethod === 'pix' && (
                 <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl text-sm text-gray-600 dark:text-gray-400 text-center animate-in slide-in-from-top-2">
                    <p>O código PIX será gerado na próxima tela.</p>
                    <p className="mt-1">Liberação imediata após o pagamento.</p>
                 </div>
              )}
            </div>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in duration-500">
               <div className="relative mb-6">
                 <div className="w-20 h-20 border-4 border-gray-100 rounded-full"></div>
                 <div className="w-20 h-20 border-4 border-[#8925e2] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                 <ShieldCheck className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8925e2]" size={32} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Processando pagamento...</h3>
               <p className="text-gray-500">Estamos validando seus dados de forma segura.</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-500">
               <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 mb-6">
                 <Check size={40} strokeWidth={4} />
               </div>
               <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Upgrade realizado com sucesso!</h3>
               <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xs">
                 Bem-vindo ao plano <span className="font-bold text-[#8925e2]">{plan.name}</span>! Seus {plan.credits} créditos mensais já estão disponíveis.
               </p>
               <button 
                 onClick={handleFinish}
                 className="w-full bg-[#8925e2] text-white font-bold py-3.5 rounded-xl hover:bg-[#7a1fd0] transition-all shadow-lg shadow-purple-500/20"
               >
                 Começar a usar
               </button>
            </div>
          )}
        </div>

        {/* Footer Actions (Only for Payment Step) */}
        {step === 'payment' && (
          <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-900/50">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 font-bold text-sm transition-colors"
            >
              Cancelar
            </button>
            <button 
              onClick={handleConfirm}
              className="px-8 py-2.5 bg-[#8925e2] text-white rounded-xl font-bold text-sm hover:bg-[#7a1fd0] transition-all shadow-lg shadow-purple-500/20 active:scale-95 transform flex items-center gap-2"
            >
              <Lock size={16} />
              Confirmar Upgrade
            </button>
          </div>
        )}

      </div>
    </div>
  );
}