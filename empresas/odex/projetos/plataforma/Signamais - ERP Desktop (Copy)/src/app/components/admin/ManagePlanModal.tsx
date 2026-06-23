import React from 'react';
import { X, Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ManagePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: string) => void;
}

export function ManagePlanModal({ isOpen, onClose, onUpgrade }: ManagePlanModalProps) {
  if (!isOpen) return null;

  const plans = [
    {
      id: 'basic',
      name: 'Básico',
      price: 'R$ 29,90',
      period: '/mês',
      features: ['5 Envelopes por mês', '1 Usuário', 'Suporte por e-mail'],
      current: false,
    },
    {
      id: 'pro',
      name: 'Profissional',
      price: 'R$ 89,90',
      period: '/mês',
      features: ['50 Envelopes por mês', '5 Usuários', 'Suporte prioritário', 'API Access'],
      current: true,
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Sob consulta',
      period: '',
      features: ['Envelopes ilimitados', 'Usuários ilimitados', 'Gerente de conta', 'SLA Garantido'],
      current: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Gerenciar Plano</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Escolha o plano ideal para sua empresa.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={cn(
                  "rounded-2xl border p-6 flex flex-col relative transition-all duration-200",
                  plan.current 
                    ? "border-purple-500 bg-purple-50/50 dark:bg-purple-900/10 ring-1 ring-purple-500" 
                    : "border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900/50 bg-white dark:bg-gray-800"
                )}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Mais Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{plan.period}</span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <Check size={16} className="text-purple-600 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  disabled={plan.current}
                  onClick={() => onUpgrade(plan.id)}
                  className={cn(
                    "w-full py-2.5 rounded-xl font-bold text-sm transition-all",
                    plan.current
                      ? "bg-purple-100 text-purple-700 cursor-default dark:bg-purple-900/30 dark:text-purple-300"
                      : "bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                  )}
                >
                  {plan.current ? 'Plano Atual' : 'Selecionar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}