import React, { useState } from 'react';
import { Bell, Clock, Save, AlertTriangle, Mail } from 'lucide-react';
import { toast } from 'sonner';

export function AdminPreferences() {
  const [preferences, setPreferences] = useState({
    alerts: {
      lowCredits: true,
      expiringPlan: true,
      paymentFailure: true
    },
    reminders: {
      enabled: true,
      frequency: '3'
    }
  });

  const handleSave = () => {
    toast.success("Preferências de notificação salvas!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
           <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Administração</h2>
           <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Preferências e Notificações</h1>
              <p className="text-gray-500 dark:text-gray-400">Configure alertas automáticos e comportamento do sistema.</p>
           </div>
        </div>
        <button 
           onClick={handleSave}
           className="px-6 py-2 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
        >
           <Save size={18} /> Salvar
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800">
           <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
              <AlertTriangle size={20} className="text-orange-500" />
              Alertas Críticos
           </h3>
           <p className="text-sm text-gray-500 mt-1">Receba avisos importantes por email para os administradores.</p>
        </div>
        
        <div className="p-6 space-y-4">
           <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <input 
                 type="checkbox" 
                 checked={preferences.alerts.lowCredits}
                 onChange={(e) => setPreferences({...preferences, alerts: {...preferences.alerts, lowCredits: e.target.checked}})}
                 className="accent-[#8925e2] w-5 h-5" 
              />
              <div className="flex-1">
                 <p className="font-bold text-gray-900 dark:text-white">Créditos/Envelopes baixos</p>
                 <p className="text-sm text-gray-500">Notificar quando restar menos de 20 envelopes</p>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Email para Admins</span>
           </label>

           <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <input 
                 type="checkbox" 
                 checked={preferences.alerts.expiringPlan}
                 onChange={(e) => setPreferences({...preferences, alerts: {...preferences.alerts, expiringPlan: e.target.checked}})}
                 className="accent-[#8925e2] w-5 h-5" 
              />
              <div className="flex-1">
                 <p className="font-bold text-gray-900 dark:text-white">Plano expirando</p>
                 <p className="text-sm text-gray-500">Notificar 3 dias antes da renovação automática</p>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Email para Admins</span>
           </label>

           <label className="flex items-center gap-3 p-4 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
              <input 
                 type="checkbox" 
                 checked={preferences.alerts.paymentFailure}
                 onChange={(e) => setPreferences({...preferences, alerts: {...preferences.alerts, paymentFailure: e.target.checked}})}
                 className="accent-[#8925e2] w-5 h-5" 
              />
              <div className="flex-1">
                 <p className="font-bold text-gray-900 dark:text-white">Falha em pagamento</p>
                 <p className="text-sm text-gray-500">Notificar imediatamente se houver erro na cobrança</p>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">Email para Admins</span>
           </label>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
               <Clock size={20} className="text-[#8925e2]" />
               Lembretes Automáticos
            </h3>
            <p className="text-sm text-gray-500 mt-1">Configuração de cobrança automática para signatários.</p>
         </div>
         <div className="p-6 space-y-6">
            <label className="flex items-center gap-3">
               <input 
                  type="checkbox" 
                  checked={preferences.reminders.enabled}
                  onChange={(e) => setPreferences({...preferences, reminders: {...preferences.reminders, enabled: e.target.checked}})}
                  className="accent-[#8925e2] w-5 h-5" 
               />
               <span className="font-bold text-gray-900 dark:text-white">Enviar lembretes para destinatários pendentes</span>
            </label>

            {preferences.reminders.enabled && (
               <div className="pl-8 animate-in slide-in-from-top-2">
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Frequência de envio</label>
                  <select 
                     value={preferences.reminders.frequency}
                     onChange={(e) => setPreferences({...preferences, reminders: {...preferences.reminders, frequency: e.target.value}})}
                     className="w-full max-w-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none"
                  >
                     <option value="1">Diariamente</option>
                     <option value="3">A cada 3 dias</option>
                     <option value="5">A cada 5 dias</option>
                     <option value="7">Semanalmente</option>
                  </select>
               </div>
            )}
         </div>
      </div>
    </div>
  );
}
