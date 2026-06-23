import React, { useState } from 'react';
import { 
  Check, 
  X as XIcon, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CreditCard, 
  Calendar, 
  FileText,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CheckoutModal } from './CheckoutModal';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Plans() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [activeView, setActiveView] = useState<'plans' | 'management'>('plans');
  
  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const plans = [
    {
      id: 'free',
      name: 'Gratuito',
      price: '0',
      periodPrice: '0',
      description: 'Ideal para experimentar',
      features: [
        '3 envelopes por mês',
        'Marca d\'água nos documentos',
        '1 usuário',
        'Suporte por email'
      ],
      buttonText: 'Plano Atual',
      buttonStyle: 'secondary',
      disabled: true,
      credits: 3
    },
    {
      id: 'standard',
      name: 'Standard',
      price: billingPeriod === 'monthly' ? '105' : '1.260',
      periodPrice: billingPeriod === 'monthly' ? '1.260' : '105', 
      isRecommended: true,
      description: 'Para profissionais e pequenas equipes',
      features: [
        '100 envelopes por mês',
        'Sem marca d\'água',
        '5 usuários',
        'Modelos de documentos',
        'Relatórios básicos',
        'Suporte prioritário'
      ],
      buttonText: 'Fazer upgrade',
      buttonStyle: 'primary',
      credits: 100
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingPeriod === 'monthly' ? '250' : '3.000',
      periodPrice: billingPeriod === 'monthly' ? '3.000' : '250',
      description: 'Para empresas em crescimento',
      features: [
        'Envelopes Ilimitados',
        'Sem marca d\'água',
        'Usuários Ilimitados',
        'Tudo do Standard +',
        'Prioridade no suporte',
        'Gerente de conta dedicado',
        'API e Webhooks'
      ],
      buttonText: 'Contratar',
      buttonStyle: 'outline',
      credits: 9999
    }
  ];

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan({ ...plan, period: billingPeriod });
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    // Switch to management view to show "active" status simulation
    setActiveView('management');
  };

  if (activeView === 'management') {
    return (
      <div className="max-w-5xl mx-auto p-6 pb-20 animate-in fade-in slide-in-from-right-4 duration-500">
         <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white">Minha Assinatura</h1>
            <button 
              onClick={() => setActiveView('plans')}
              className="text-[#8925e2] font-bold hover:underline"
            >
               Ver outros planos
            </button>
         </div>

         <div className="space-y-8">
            {/* Current Plan Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                  <Star size={150} />
               </div>
               
               <div className="relative z-10 flex flex-col md:flex-row justify-between md:items-center gap-6">
                  <div>
                     <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Standard Mensal</h2>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-green-200">Ativo</span>
                     </div>
                     <p className="text-gray-500 dark:text-gray-400">Próxima renovação em 04/03/2026</p>
                     <p className="text-xl font-bold text-[#8925e2] mt-2">R$ 105,00<span className="text-sm font-medium text-gray-500">/mês</span></p>
                  </div>
                  <div className="flex gap-3">
                     <button 
                        onClick={() => setActiveView('plans')}
                        className="px-6 py-2.5 bg-[#8925e2] text-white rounded-xl font-bold hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20"
                     >
                        Alterar plano
                     </button>
                     <button className="px-6 py-2.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-red-500 rounded-xl font-bold hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 transition-colors">
                        Cancelar assinatura
                     </button>
                  </div>
               </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
               <h3 className="text-lg font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white mb-6">Forma de pagamento</h3>
               <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 shadow-sm">
                        <CreditCard size={24} />
                     </div>
                     <div>
                        <p className="font-bold text-gray-900 dark:text-white">Mastercard terminando em 1234</p>
                        <p className="text-sm text-gray-500">Expira em 12/2027</p>
                     </div>
                  </div>
                  <button className="text-sm font-bold text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg transition-colors">
                     Alterar cartão
                  </button>
               </div>
            </div>

            {/* Billing History */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm">
               <h3 className="text-lg font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white mb-6">Histórico de cobranças</h3>
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead className="border-b border-gray-100 dark:border-gray-700">
                        <tr>
                           <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                           <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Valor</th>
                           <th className="text-left py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                           <th className="text-right py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Nota Fiscal</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {[
                           { date: '04/02/2026', amount: 'R$ 105,00', status: 'Pago' },
                           { date: '04/01/2026', amount: 'R$ 105,00', status: 'Pago' },
                           { date: '04/12/2025', amount: 'R$ 105,00', status: 'Pago' },
                        ].map((invoice, i) => (
                           <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                              <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{invoice.date}</td>
                              <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-300">{invoice.amount}</td>
                              <td className="py-4 px-4">
                                 <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                    <Check size={10} strokeWidth={4} /> {invoice.status}
                                 </span>
                              </td>
                              <td className="py-4 px-4 text-right">
                                 <button className="text-xs font-bold text-gray-500 hover:text-[#8925e2] flex items-center justify-end gap-1 ml-auto group">
                                    <FileText size={14} className="group-hover:scale-110 transition-transform" /> Nota fiscal
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20 animate-in fade-in duration-500">
       
       <CheckoutModal 
         isOpen={isCheckoutOpen} 
         onClose={() => setIsCheckoutOpen(false)} 
         plan={selectedPlan}
         onSuccess={handleCheckoutSuccess}
       />

       {/* Header */}
       <div className="text-center mb-12 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white tracking-tight">
             Escolha o melhor plano para você
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
             Assine hoje e garanta acesso completo às ferramentas de assinatura digital mais avançadas do mercado.
          </p>

          {/* Toggle */}
          <div className="flex justify-center items-center gap-4 mt-8">
             <span className={cn("text-sm font-bold transition-colors", billingPeriod === 'annual' ? "text-gray-400" : "text-gray-900 dark:text-white")}>Mensal</span>
             <button 
               onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'annual' : 'monthly')}
               className="w-16 h-8 bg-[#8925e2] rounded-full relative p-1 transition-colors shadow-inner"
             >
                <div className={cn(
                   "w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out transform",
                   billingPeriod === 'annual' ? "translate-x-8" : "translate-x-0"
                )} />
             </button>
             <span className={cn("text-sm font-bold transition-colors flex items-center gap-2", billingPeriod === 'monthly' ? "text-gray-400" : "text-gray-900 dark:text-white")}>
                Anual 
                <span className="bg-green-100 text-green-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider border border-green-200 shadow-sm animate-pulse">
                   Poupe até 44%
                </span>
             </span>
          </div>
       </div>

       {/* Pricing Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-6xl mx-auto">
          {plans.map((plan) => (
             <div 
               key={plan.id}
               className={cn(
                  "rounded-3xl p-8 border transition-all duration-300 flex flex-col relative",
                  plan.isRecommended 
                     ? "bg-white dark:bg-gray-800 border-[#8925e2] shadow-xl shadow-purple-500/10 scale-105 z-10" 
                     : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900/50 hover:shadow-lg"
               )}
             >
                {plan.isRecommended && (
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#8925e2] text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg uppercase tracking-wide">
                      Recomendado
                   </div>
                )}

                <div className="mb-6">
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white font-['Lufga',sans-serif]">{plan.name}</h3>
                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                   <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">R$ {plan.price}</span>
                      <span className="text-gray-500">/{billingPeriod === 'monthly' ? 'mês' : 'ano'}</span>
                   </div>
                   {billingPeriod === 'annual' && plan.price !== '0' && (
                      <p className="text-xs text-gray-400 mt-2 font-medium">faturado anual</p>
                   )}
                   {billingPeriod === 'monthly' && plan.price !== '0' && (
                      <p className="text-xs text-gray-400 mt-2 font-medium">R$ {plan.periodPrice} / ano</p>
                   )}
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                   {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                         <div className={cn("p-0.5 rounded-full mt-0.5", plan.isRecommended ? "bg-purple-100 text-[#8925e2]" : "bg-gray-100 text-gray-500")}>
                            <Check size={12} strokeWidth={3} />
                         </div>
                         {feature}
                      </li>
                   ))}
                </ul>

                <button 
                  onClick={() => !plan.disabled && handlePlanSelect(plan)}
                  disabled={plan.disabled}
                  className={cn(
                     "w-full py-3.5 rounded-xl font-bold transition-all shadow-sm active:scale-95",
                     plan.buttonStyle === 'primary' 
                        ? "bg-[#8925e2] text-white hover:bg-[#7a1fd0] shadow-purple-500/20 shadow-lg" 
                        : plan.buttonStyle === 'secondary'
                           ? "bg-gray-100 text-gray-500 cursor-default"
                           : "bg-white border-2 border-[#8925e2] text-[#8925e2] hover:bg-purple-50"
                  )}
                >
                   {plan.buttonText}
                </button>
             </div>
          ))}
       </div>

       {/* Comparison Table Toggle */}
       <div className="text-center mb-8">
          <button 
            onClick={() => setIsComparisonOpen(!isComparisonOpen)}
            className="inline-flex items-center gap-2 text-[#8925e2] font-bold hover:bg-purple-50 px-4 py-2 rounded-full transition-colors"
          >
             {isComparisonOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
             Ver comparação completa
          </button>
       </div>

       {/* Comparison Table */}
       <div className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out max-w-5xl mx-auto",
          isComparisonOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
       )}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
             <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50">
                   <tr>
                      <th className="text-left py-4 px-6 font-bold text-gray-900 dark:text-white">Recurso</th>
                      <th className="text-center py-4 px-6 font-bold text-gray-900 dark:text-white">Gratuito</th>
                      <th className="text-center py-4 px-6 font-bold text-[#8925e2]">Standard</th>
                      <th className="text-center py-4 px-6 font-bold text-gray-900 dark:text-white">Premium</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                   {[
                      { name: 'Envelopes por mês', free: '3', std: '100', prem: 'Ilimitado' },
                      { name: 'Usuários', free: '1', std: '5', prem: 'Ilimitado' },
                      { name: 'Modelos', free: false, std: true, prem: true },
                      { name: 'Pastas de organização', free: false, std: true, prem: true },
                      { name: 'Relatórios básicos', free: false, std: true, prem: true },
                      { name: 'Relatórios avançados', free: false, std: false, prem: true },
                      { name: 'API e Webhooks', free: false, std: false, prem: true },
                      { name: 'Sem marca d\'água', free: false, std: true, prem: true }, // Logic inverted in display
                      { name: 'Suporte', free: 'Email', std: 'Prioritário', prem: 'Dedicado' },
                      { name: 'Gerente de conta', free: false, std: false, prem: true },
                   ].map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                         <td className="py-4 px-6 text-sm font-medium text-gray-700 dark:text-gray-300">{row.name}</td>
                         <td className="py-4 px-6 text-center">
                            {renderCell(row.free)}
                         </td>
                         <td className="py-4 px-6 text-center bg-purple-50/30 dark:bg-purple-900/10">
                            {renderCell(row.std)}
                         </td>
                         <td className="py-4 px-6 text-center">
                            {renderCell(row.prem)}
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
       </div>

       {/* FAQ or Footer Info */}
       <div className="mt-20 text-center text-sm text-gray-500 max-w-2xl mx-auto">
          <p>
             Precisa de um plano personalizado para grandes volumes? 
             <a href="#" className="text-[#8925e2] font-bold hover:underline ml-1">Entre em contato com nossa equipe de vendas.</a>
          </p>
       </div>

    </div>
  );
}

function renderCell(value: string | boolean) {
   if (value === true) return <Check size={20} className="text-green-500 mx-auto" strokeWidth={3} />;
   if (value === false) return <XIcon size={20} className="text-gray-300 mx-auto" strokeWidth={3} />;
   return <span className="text-sm font-bold text-gray-600 dark:text-gray-300">{value}</span>;
}