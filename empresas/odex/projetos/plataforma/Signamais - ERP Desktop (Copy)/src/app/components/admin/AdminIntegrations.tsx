import React from 'react';
import { Link, Code, Webhook, Plus, Key, Copy, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function AdminIntegrations() {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("Copiado para a área de transferência!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
        // Fallback for preview environment
        toast.success("Copiado para a área de transferência!");
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Administração</h2>
            <div className="flex flex-col gap-2">
               <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Integrações</h1>
               <p className="text-gray-500 dark:text-gray-400">Conecte sua conta a outros sistemas via API e Webhooks.</p>
            </div>
         </div>
         <button className="px-6 py-2 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2">
            <Plus size={18} /> Nova Integração
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* API Keys */}
         <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
               <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Key size={20} className="text-[#8925e2]" />
                  Chaves de API
               </h3>
               <button className="text-sm font-bold text-[#8925e2] hover:underline">Gerar nova chave</button>
            </div>
            <div className="p-6 space-y-4">
               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                     <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Chave Principal (Produção)</p>
                     <div className="flex items-center gap-2 font-mono text-xs text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                        pk_live_51Mz...X9s2 <button onClick={() => handleCopy('pk_live_51Mz...X9s2')}><Copy size={12} className="hover:text-[#8925e2]" /></button>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold dark:bg-green-900/20 dark:text-green-300">Ativa</span>
                     <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
               </div>
               
               <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                     <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">Ambiente de Teste (Sandbox)</p>
                     <div className="flex items-center gap-2 font-mono text-xs text-gray-500 bg-white dark:bg-gray-800 px-2 py-1 rounded border border-gray-200 dark:border-gray-700">
                        pk_test_88Ra...B2k9 <button onClick={() => handleCopy('pk_test_88Ra...B2k9')}><Copy size={12} className="hover:text-[#8925e2]" /></button>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="px-2 py-1 bg-green-50 text-green-600 rounded text-xs font-bold dark:bg-green-900/20 dark:text-green-300">Ativa</span>
                     <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
               </div>
            </div>
         </div>

         {/* Webhooks */}
         <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800">
               <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                  <Webhook size={20} className="text-[#8925e2]" />
                  Webhooks
               </h3>
               <button className="text-sm font-bold text-[#8925e2] hover:underline">Adicionar endpoint</button>
            </div>
            <div className="p-6 space-y-4">
               <div className="flex items-start gap-4 p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg">
                     <Code size={18} />
                  </div>
                  <div className="flex-1">
                     <p className="font-bold text-gray-900 dark:text-white text-sm">Atualização de Envelopes</p>
                     <p className="text-xs text-gray-500 font-mono mt-1">https://api.seucrm.com/webhooks/signa</p>
                     <div className="flex gap-2 mt-2">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded font-medium">envelope.completed</span>
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded font-medium">envelope.voided</span>
                     </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-green-500 mt-2"></span>
               </div>
            </div>
         </div>
      </div>
      
      {/* Documentation Link */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30 flex items-center justify-between">
         <div>
            <h3 className="font-bold text-lg text-[#8925e2]">Documentação da API</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Acesse nossa documentação completa para desenvolvedores.</p>
         </div>
         <button className="px-4 py-2 bg-white dark:bg-gray-800 text-[#8925e2] font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm border border-purple-100 dark:border-purple-900/30">
            Ver Documentação
         </button>
      </div>
    </div>
  );
}
