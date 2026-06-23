import React, { useState, useEffect } from 'react';
import { X, Check, CreditCard, Landmark, QrCode, Lock, Loader2, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: {
    name: string;
    price: number;
    billing: 'monthly' | 'annual';
    credits: string;
  } | null;
  onConfirm: () => void;
}

export function UpgradeModal({ isOpen, onClose, plan, onConfirm }: UpgradeModalProps) {
  const [step, setStep] = useState<'confirm' | 'processing' | 'success'>('confirm');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'boleto' | 'pix'>('credit_card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(true);

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setStep('confirm');
      setPaymentMethod('credit_card');
    }
  }, [isOpen]);

  if (!isOpen || !plan) return null;

  const handleConfirm = () => {
    setStep('processing');
    // Simulate API call
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    onClose();
    // Optional: reset step after closing animation
    setTimeout(() => setStep('confirm'), 300);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div 
        className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-900/50">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
            {step === 'success' ? (
              <span className="text-green-600 flex items-center gap-2"><Check size={20} /> Upgrade Realizado</span>
            ) : (
              `Confirmar upgrade para ${plan.name}`
            )}
          </h3>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === 'confirm' && (
            <div className="space-y-6">
              {/* Plan Summary */}
              <div className="bg-purple-50 dark:bg-purple-900/10 p-4 rounded-xl border border-purple-100 dark:border-purple-900/30">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="text-sm text-purple-600 dark:text-purple-300 font-bold uppercase tracking-wider">Plano Selecionado</p>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name} {plan.billing === 'monthly' ? 'Mensal' : 'Anual'}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#8925e2]">{formatCurrency(plan.price)}<span className="text-sm font-normal text-gray-500">/{plan.billing === 'monthly' ? 'mês' : 'ano'}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mt-2 pt-2 border-t border-purple-100 dark:border-purple-900/30">
                  <Check size={14} className="text-purple-500" />
                  <span>Créditos incluídos: <strong>{plan.credits}</strong></span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Forma de pagamento</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setPaymentMethod('credit_card')}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all",
                      paymentMethod === 'credit_card' 
                        ? "border-[#8925e2] bg-purple-50 dark:bg-purple-900/20 text-[#8925e2]" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500"
                    )}
                  >
                    <CreditCard size={20} />
                    <span className="text-xs font-medium">Cartão</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('boleto')}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all",
                      paymentMethod === 'boleto' 
                        ? "border-[#8925e2] bg-purple-50 dark:bg-purple-900/20 text-[#8925e2]" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500"
                    )}
                  >
                    <QrCode size={20} />
                    <span className="text-xs font-medium">Boleto</span>
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('pix')}
                    className={cn(
                      "flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all",
                      paymentMethod === 'pix' 
                        ? "border-[#8925e2] bg-purple-50 dark:bg-purple-900/20 text-[#8925e2]" 
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 text-gray-500"
                    )}
                  >
                    <Landmark size={20} />
                    <span className="text-xs font-medium">PIX</span>
                  </button>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'credit_card' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Número do Cartão</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="0000 0000 0000 0000" 
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none"
                      />
                      <CreditCard size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">Validade</label>
                      <input 
                        type="text" 
                        placeholder="MM/AA" 
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">CVV</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="123" 
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none"
                        />
                        <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase">Nome no Cartão</label>
                    <input 
                      type="text" 
                      placeholder="Como aparece no cartão" 
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={saveCard}
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2]" 
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Salvar cartão para próximas cobranças</span>
                  </label>
                </div>
              )}

              {/* Boleto Info */}
              {paymentMethod === 'boleto' && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center animate-in fade-in">
                  <p className="text-sm text-gray-600 dark:text-gray-300">O boleto será gerado na próxima etapa e enviado para seu e-mail.</p>
                  <p className="text-xs text-gray-400 mt-2">Compensação em até 3 dias úteis.</p>
                </div>
              )}

              {/* PIX Info */}
              {paymentMethod === 'pix' && (
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl text-center animate-in fade-in">
                  <p className="text-sm text-gray-600 dark:text-gray-300">O código QR Code será gerado após confirmar.</p>
                  <p className="text-xs text-green-600 font-bold mt-2">Aprovação imediata!</p>
                </div>
              )}

              {/* Summary Footer */}
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Total hoje</span>
                  <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(plan.price)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Próxima cobrança</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(new Date().setMonth(new Date().getMonth() + (plan.billing === 'monthly' ? 1 : 12))).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 'processing' && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-100 border-t-[#8925e2] rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CreditCard size={20} className="text-[#8925e2]" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">Processando pagamento...</h4>
                <p className="text-sm text-gray-500">Por favor, não feche esta janela.</p>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center text-green-600 shadow-sm mb-2">
                <Check size={40} strokeWidth={3} />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-2xl text-gray-900 dark:text-white">Upgrade realizado!</h4>
                <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto">
                  Bem-vindo ao plano <strong>{plan.name}</strong>! Seus créditos já estão disponíveis para uso imediato.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl w-full max-w-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-500">Plano</span>
                  <span className="font-bold text-gray-900 dark:text-white">{plan.name}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Transação</span>
                  <span className="font-mono text-gray-900 dark:text-white">#TRX-{Math.floor(Math.random() * 100000)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
          {step === 'confirm' && (
            <>
              <button 
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 font-bold text-sm transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleConfirm}
                className="px-8 py-2.5 bg-[#8925e2] text-white rounded-xl font-bold text-sm hover:bg-[#7a1fd0] transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2"
              >
                <Lock size={16} /> Confirmar Upgrade
              </button>
            </>
          )}

          {step === 'success' && (
            <button 
              onClick={() => {
                onClose();
                onConfirm();
              }}
              className="w-full px-8 py-3 bg-[#8925e2] text-white rounded-xl font-bold text-base hover:bg-[#7a1fd0] transition-all shadow-lg shadow-purple-500/20"
            >
              Começar a usar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}