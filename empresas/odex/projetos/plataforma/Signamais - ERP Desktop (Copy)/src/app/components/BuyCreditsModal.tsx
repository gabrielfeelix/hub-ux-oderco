import React, { useState } from 'react';
import { X, Check, CreditCard, Ticket, Clock, AlertTriangle, ShieldCheck, ChevronRight, CheckCircle, Smartphone, FileText, Star, ArrowRight, User, Calendar, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface BuyCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (credits: number) => void;
}

const PACKAGES = [
  { id: 1, credits: 10, price: 25, label: 'Básico', popular: false },
  { id: 2, credits: 25, price: 60, label: 'Econômico', popular: false },
  { id: 3, credits: 50, price: 110, label: 'Popular', popular: true },
  { id: 4, credits: 100, price: 200, label: 'Profissional', popular: false },
];

export function BuyCreditsModal({ isOpen, onClose, onSuccess }: BuyCreditsModalProps) {
  const [step, setStep] = useState<'selection' | 'processing' | 'success'>('selection');
  const [selectedPackageId, setSelectedPackageId] = useState<number>(4); // Default to 100 credits
  const [customAmount, setCustomAmount] = useState<number>(50);
  const [useCustomAmount, setUseCustomAmount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix' | 'boleto'>('card');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditingCard, setIsEditingCard] = useState(false);

  // Card details state
  const [cardDetails, setCardDetails] = useState({
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  });

  const [savedCard, setSavedCard] = useState({
    last4: '1234',
    brand: 'Visa'
  });

  if (!isOpen) return null;

  const selectedPkg = PACKAGES.find(p => p.id === selectedPackageId) || PACKAGES[3];
  
  const currentCredits = useCustomAmount ? customAmount : selectedPkg.credits;
  // Simple logic for custom price (approx 2.2 per credit if custom)
  const currentPrice = useCustomAmount ? customAmount * 2.2 : selectedPkg.price; 
  const unitPrice = currentPrice / currentCredits;

  const handleBuy = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      onSuccess(currentCredits);
    }, 2000);
  };

  const handleSaveCard = () => {
    if (cardDetails.number.length > 4) {
       setSavedCard({
          last4: cardDetails.number.slice(-4),
          brand: 'Mastercard' // Mock detection
       });
    }
    setIsEditingCard(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0 z-10">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Ticket className="text-[#8925e2]" />
            Adicionar Envelopes Extras
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-6 space-y-8">
          {step === 'selection' && (
            <>
              {/* Info Box */}
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-900/30 rounded-xl p-4 flex gap-3">
                <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg shrink-0 h-fit">
                  <Clock size={20} className="text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h4 className="font-bold text-purple-900 dark:text-purple-100 text-sm mb-1">Envelopes extras não expiram</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                    Eles ficam guardados na sua conta e são utilizados automaticamente apenas quando seus envelopes mensais do plano acabarem.
                  </p>
                </div>
              </div>

              {/* Package Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Escolha um pacote:</label>
                  <button 
                    onClick={() => setUseCustomAmount(!useCustomAmount)}
                    className="text-xs font-bold text-[#8925e2] hover:underline"
                  >
                    {useCustomAmount ? "Voltar para pacotes" : "Digitar quantidade manual"}
                  </button>
                </div>

                {useCustomAmount ? (
                  <div className="flex items-center justify-center gap-4 py-8 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 border-dashed">
                     <button 
                        onClick={() => setCustomAmount(Math.max(10, customAmount - 10))}
                        className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50"
                     >
                        -
                     </button>
                     <div className="text-center">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white block">{customAmount}</span>
                        <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Envelopes</span>
                     </div>
                     <button 
                        onClick={() => setCustomAmount(customAmount + 10)}
                        className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50"
                     >
                        +
                     </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PACKAGES.map((pkg) => (
                      <div 
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={cn(
                          "relative cursor-pointer border-2 rounded-xl p-4 transition-all duration-200 flex flex-col items-center justify-center text-center gap-1 group",
                          selectedPackageId === pkg.id 
                            ? "border-[#8925e2] bg-purple-50/50 dark:bg-purple-900/10" 
                            : "border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-purple-200 dark:hover:border-purple-800"
                        )}
                      >
                        {pkg.popular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap z-10">
                            Mais popular
                          </span>
                        )}
                        <div className={cn(
                          "w-4 h-4 rounded-full border mb-2 flex items-center justify-center",
                          selectedPackageId === pkg.id ? "border-[#8925e2]" : "border-gray-300 dark:border-gray-600"
                        )}>
                           {selectedPackageId === pkg.id && <div className="w-2 h-2 rounded-full bg-[#8925e2]" />}
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{pkg.credits}</span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{pkg.label}</span>
                        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 w-full">
                           <p className="font-bold text-[#8925e2]">R$ {pkg.price}</p>
                           <p className="text-[10px] text-gray-400">R$ {(pkg.price / pkg.credits).toFixed(2)}/un</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Resumo da compra</h4>
                <div className="flex items-center justify-between text-sm">
                   <span>
                      <span className="font-bold text-gray-900 dark:text-white">{currentCredits} envelopes extras</span>
                      <span className="text-gray-500"> × R$ {unitPrice.toFixed(2)}</span>
                   </span>
                   <span className="font-bold text-lg text-[#8925e2]">R$ {currentPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                 <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Forma de pagamento:</h4>
                 <div className="space-y-3">
                    {/* Card */}
                    <div className={cn(
                       "flex flex-col gap-3 p-3 rounded-xl border transition-all",
                       paymentMethod === 'card' 
                          ? "border-[#8925e2] bg-purple-50/30 dark:bg-purple-900/10" 
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}>
                       <label className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                          <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0", paymentMethod === 'card' ? "border-[#8925e2]" : "border-gray-300")}>
                             {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-[#8925e2]" />}
                          </div>
                          <div className="flex-1">
                             <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                   <CreditCard size={18} className="text-gray-600 dark:text-gray-400" />
                                   <span className="font-bold text-gray-900 dark:text-white text-sm">Cartão Principal</span>
                                </div>
                                {!isEditingCard && paymentMethod === 'card' && (
                                   <button 
                                     onClick={(e) => {
                                        e.preventDefault();
                                        setIsEditingCard(true);
                                     }} 
                                     className="text-xs font-bold text-[#8925e2] hover:underline"
                                   >
                                      Alterar
                                   </button>
                                )}
                             </div>
                             {!isEditingCard && (
                                <p className="text-xs text-gray-500 ml-7 mt-0.5">•••• {savedCard.last4} ({savedCard.brand})</p>
                             )}
                          </div>
                       </label>

                       {/* Card Edit Form */}
                       {isEditingCard && paymentMethod === 'card' && (
                          <div className="mt-3 ml-7 bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm animate-in slide-in-from-top-2">
                             <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-1">
                                   <label className="text-xs font-medium text-gray-500">Número do Cartão</label>
                                   <div className="relative">
                                      <input 
                                        type="text" 
                                        placeholder="0000 0000 0000 0000" 
                                        value={cardDetails.number}
                                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8925e2]/20 focus:border-[#8925e2]"
                                      />
                                      <CreditCard size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                   </div>
                                </div>
                                
                                <div className="space-y-1">
                                   <label className="text-xs font-medium text-gray-500">Nome no Cartão</label>
                                   <div className="relative">
                                      <input 
                                        type="text" 
                                        placeholder="NOME COMO NO CARTAO" 
                                        value={cardDetails.holder}
                                        onChange={(e) => setCardDetails({...cardDetails, holder: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8925e2]/20 focus:border-[#8925e2]"
                                      />
                                      <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                   </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                   <div className="space-y-1">
                                      <label className="text-xs font-medium text-gray-500">Validade</label>
                                      <div className="relative">
                                         <input 
                                           type="text" 
                                           placeholder="MM/AA" 
                                           value={cardDetails.expiry}
                                           onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                                           className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8925e2]/20 focus:border-[#8925e2]"
                                         />
                                         <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                      </div>
                                   </div>
                                   <div className="space-y-1">
                                      <label className="text-xs font-medium text-gray-500">CVV</label>
                                      <div className="relative">
                                         <input 
                                           type="text" 
                                           placeholder="123" 
                                           maxLength={4}
                                           value={cardDetails.cvv}
                                           onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                                           className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#8925e2]/20 focus:border-[#8925e2]"
                                         />
                                         <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                      </div>
                                   </div>
                                </div>

                                <div className="flex gap-2 pt-2">
                                   <button 
                                     onClick={() => setIsEditingCard(false)}
                                     className="flex-1 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                                   >
                                      Cancelar
                                   </button>
                                   <button 
                                     onClick={handleSaveCard}
                                     className="flex-1 py-2 text-xs font-bold text-white bg-[#8925e2] hover:bg-[#7a1fd0] rounded-lg transition-colors"
                                   >
                                      Salvar Cartão
                                   </button>
                                </div>
                             </div>
                          </div>
                       )}
                    </div>

                    {/* Pix */}
                    <label className={cn(
                       "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                       paymentMethod === 'pix' 
                          ? "border-[#8925e2] bg-purple-50/30 dark:bg-purple-900/10" 
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}>
                       <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} />
                       <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0", paymentMethod === 'pix' ? "border-[#8925e2]" : "border-gray-300")}>
                          {paymentMethod === 'pix' && <div className="w-2.5 h-2.5 rounded-full bg-[#8925e2]" />}
                       </div>
                       <div className="flex items-center gap-2">
                          <Smartphone size={18} className="text-gray-600 dark:text-gray-400" />
                          <span className="font-bold text-gray-900 dark:text-white text-sm">PIX</span>
                       </div>
                    </label>

                    {/* Boleto */}
                    <label className={cn(
                       "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                       paymentMethod === 'boleto' 
                          ? "border-[#8925e2] bg-purple-50/30 dark:bg-purple-900/10" 
                          : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}>
                       <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'boleto'} onChange={() => setPaymentMethod('boleto')} />
                       <div className={cn("w-5 h-5 rounded-full border flex items-center justify-center shrink-0", paymentMethod === 'boleto' ? "border-[#8925e2]" : "border-gray-300")}>
                          {paymentMethod === 'boleto' && <div className="w-2.5 h-2.5 rounded-full bg-[#8925e2]" />}
                       </div>
                       <div className="flex items-center gap-2">
                          <FileText size={18} className="text-gray-600 dark:text-gray-400" />
                          <span className="font-bold text-gray-900 dark:text-white text-sm">Boleto Bancário</span>
                       </div>
                    </label>
                 </div>
              </div>

              {/* Checkbox Favorite */}
              <label className="flex items-center gap-2 cursor-pointer group">
                 <div className={cn(
                    "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                    isFavorite ? "bg-[#8925e2] border-[#8925e2] text-white" : "border-gray-300 dark:border-gray-600 group-hover:border-[#8925e2]"
                 )}>
                    {isFavorite && <Check size={14} />}
                 </div>
                 <input type="checkbox" checked={isFavorite} onChange={() => setIsFavorite(!isFavorite)} className="hidden" />
                 <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">Salvar este pacote como favorito</span>
              </label>

              {/* Info about Pix/Boleto specific Steps (Mock) */}
              {paymentMethod === 'pix' && (
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-xs text-blue-700 dark:text-blue-300 flex gap-2">
                    <AlertTriangle size={16} />
                    <span>Ao continuar, será gerado um QR Code válido por 30 minutos.</span>
                 </div>
              )}
            </>
          )}

          {step === 'processing' && (
             <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 border-4 border-[#8925e2]/30 border-t-[#8925e2] rounded-full animate-spin mb-6" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Processando pagamento...</h3>
                <p className="text-gray-500 mt-2">Por favor, não feche esta janela.</p>
             </div>
          )}

          {step === 'success' && (
             <div className="flex flex-col items-center justify-center py-8 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-6">
                   <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Compra realizada com sucesso!</h3>
                <p className="text-gray-500 text-center max-w-sm mb-8">
                   <strong className="text-gray-900 dark:text-white">{currentCredits} envelopes extras</strong> foram adicionados à sua conta e já estão disponíveis para uso.
                </p>

                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl w-full max-w-sm border border-gray-200 dark:border-gray-700 mb-8">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">Seu novo saldo</p>
                   <div className="space-y-3">
                      <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                         <span className="text-sm text-gray-600 dark:text-gray-400">Envelopes Mensais</span>
                         <span className="font-bold text-gray-900 dark:text-white">5/10</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-sm text-gray-600 dark:text-gray-400">Envelopes Extras</span>
                         <span className="font-bold text-[#8925e2] flex items-center gap-1">
                            +{15 + currentCredits}
                            <Star size={12} fill="currentColor" />
                         </span>
                      </div>
                   </div>
                </div>

                <div className="flex gap-3 w-full">
                   <button 
                     onClick={onClose}
                     className="flex-1 py-3 border border-gray-300 dark:border-gray-600 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                   >
                      Fechar
                   </button>
                   <button className="flex-1 py-3 bg-[#8925e2] text-white rounded-xl font-bold hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20">
                      Ver Recibo
                   </button>
                </div>
             </div>
          )}
        </div>

        {/* Footer Actions */}
        {step === 'selection' && (
           <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 flex justify-end gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-3 font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-200/50 dark:hover:bg-gray-800 rounded-xl transition-colors"
              >
                 Cancelar
              </button>
              <button 
                onClick={handleBuy}
                className="px-8 py-3 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
              >
                 {paymentMethod === 'boleto' ? 'Gerar Boleto' : paymentMethod === 'pix' ? 'Gerar PIX' : 'Comprar Agora'} 
                 <ArrowRight size={18} />
                 <span className="bg-white/20 px-2 py-0.5 rounded text-xs">R$ {currentPrice.toFixed(2)}</span>
              </button>
           </div>
        )}
      </div>
    </div>
  );
}