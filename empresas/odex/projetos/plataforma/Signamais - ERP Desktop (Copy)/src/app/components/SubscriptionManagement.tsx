import React from 'react';
import { CreditCard, Calendar, FileText, CheckCircle, AlertCircle, Clock, ChevronRight, Download } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SubscriptionManagementProps {
  onUpgradeClick: () => void;
  onCancelClick: () => void;
}

export function SubscriptionManagement({ onUpgradeClick, onCancelClick }: SubscriptionManagementProps) {
  const transactions = [
    { date: '04/02/2026', amount: 'R$ 105,00', status: 'Pago', id: 'INV-001' },
    { date: '04/01/2026', amount: 'R$ 105,00', status: 'Pago', id: 'INV-002' },
    { date: '04/12/2025', amount: 'R$ 105,00', status: 'Pago', id: 'INV-003' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white">Minha Assinatura</h2>
        <p className="text-gray-500 dark:text-gray-400">Gerencie seu plano atual, métodos de pagamento e faturas.</p>
      </div>

      {/* Current Plan Card */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/10 dark:to-gray-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#8925e2] rounded-xl flex items-center justify-center text-white shadow-lg shadow-purple-200 dark:shadow-none">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Plano Atual</p>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Standard Mensal
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full uppercase tracking-wider font-bold border border-green-200">Ativo</span>
              </h3>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-0.5">Próxima Renovação</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white flex items-center justify-end gap-2">
              <Calendar size={16} className="text-[#8925e2]" /> 04/03/2026
            </p>
          </div>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">R$ 105,00</span>
                <span className="text-gray-500 text-sm font-medium">/mês</span>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" /> 100 envelopes por mês
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500" /> 5 usuários incluídos
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                onClick={onCancelClick}
                className="flex-1 md:flex-none px-6 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/30 dark:text-red-400 dark:hover:bg-red-900/10 rounded-xl font-bold text-sm transition-colors"
              >
                Cancelar assinatura
              </button>
              <button 
                onClick={onUpgradeClick}
                className="flex-1 md:flex-none px-6 py-2.5 bg-[#8925e2] text-white hover:bg-[#7a1fd0] rounded-xl font-bold text-sm transition-all shadow-lg shadow-purple-500/20"
              >
                Alterar plano
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Method */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <CreditCard size={20} className="text-gray-400" /> Forma de pagamento
        </h3>
        
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50/50 dark:bg-gray-900/50">
          <div className="flex items-center gap-4 mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="w-14 h-10 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center">
              {/* Mastercard Icon Mock */}
              <div className="flex -space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500 opacity-80"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-500 opacity-80"></div>
              </div>
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Mastercard terminado em 1234
              </p>
              <p className="text-xs text-gray-500">Expira em 12/2027</p>
            </div>
          </div>
          <button className="text-sm font-bold text-[#8925e2] hover:text-[#7a1fd0] hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto">
            Alterar cartão
          </button>
        </div>
      </section>

      {/* Billing History */}
      <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FileText size={20} className="text-gray-400" /> Histórico de cobranças
          </h3>
          <button className="text-sm font-medium text-[#8925e2] hover:underline">Ver tudo</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Nota Fiscal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{trx.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">{trx.amount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                      <CheckCircle size={10} strokeWidth={3} /> {trx.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#8925e2] bg-gray-100 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wide">
                      <Download size={12} /> Nota fiscal
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Support Info */}
      <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-4 items-start">
        <AlertCircle className="text-blue-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-bold text-blue-900 dark:text-blue-300 text-sm">Dúvidas sobre sua fatura?</h4>
          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
            Entre em contato com nosso suporte financeiro através do e-mail <a href="#" className="underline hover:text-blue-900">financeiro@signamais.com</a> ou acesse nossa central de ajuda.
          </p>
        </div>
      </div>
    </div>
  );
}