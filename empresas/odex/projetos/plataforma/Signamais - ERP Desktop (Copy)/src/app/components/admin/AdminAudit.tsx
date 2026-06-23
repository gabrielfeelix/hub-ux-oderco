import React, { useState } from 'react';
import { Download, Search, Filter, Calendar, User, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface Log {
  id: string;
  date: string;
  user: string;
  action: string;
  details: string;
  type: 'info' | 'warning' | 'error';
}

const MOCK_LOGS: Log[] = [
  { id: '1', date: '04/02/2026 14:32', user: 'Maria Silva', action: 'Enviou envelope', details: 'Contrato_Prestacao.pdf', type: 'info' },
  { id: '2', date: '04/02/2026 13:15', user: 'João Pedro', action: 'Criou modelo', details: 'Proposta Comercial 2026', type: 'info' },
  { id: '3', date: '04/02/2026 11:08', user: 'Maria Silva', action: 'Adicionou usuário', details: 'Ana Costa (Atendente)', type: 'warning' },
  { id: '4', date: '03/02/2026 16:45', user: 'Carlos', action: 'Cancelou envelope', details: 'ID: #88219 (Erro no preenchimento)', type: 'error' },
  { id: '5', date: '03/02/2026 10:22', user: 'Maria Silva', action: 'Alterou permissões', details: 'Grupo: Corretor (Acesso a relatórios)', type: 'warning' },
];

export function AdminAudit() {
  const [logs] = useState<Log[]>(MOCK_LOGS);

  const handleExport = () => {
    toast.success("Logs exportados com sucesso (CSV)!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
           <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Administração</h2>
           <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Auditoria</h1>
              <p className="text-gray-500 dark:text-gray-400">Rastreie todas as ações realizadas na conta para segurança.</p>
           </div>
        </div>
        <button 
          onClick={handleExport}
          className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <Download size={18} /> Exportar Logs
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-wrap items-center gap-4">
         <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <Calendar size={16} className="text-gray-500" />
            <select className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
               <option>Últimos 30 dias</option>
               <option>Hoje</option>
               <option>Esta semana</option>
               <option>Este ano</option>
            </select>
         </div>
         
         <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <User size={16} className="text-gray-500" />
            <select className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
               <option>Todos os usuários</option>
               <option>Maria Silva</option>
               <option>João Pedro</option>
            </select>
         </div>

         <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <Activity size={16} className="text-gray-500" />
            <select className="bg-transparent border-none outline-none text-sm font-medium text-gray-700 dark:text-gray-200 cursor-pointer">
               <option>Todas as ações</option>
               <option>Envelopes</option>
               <option>Usuários</option>
               <option>Configurações</option>
            </select>
         </div>

         <button className="ml-auto px-4 py-2 bg-[#8925e2] text-white font-bold rounded-lg hover:bg-[#7a1fd0] transition-colors text-sm">
            Aplicar Filtros
         </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 font-medium">Data/Hora</th>
              <th className="px-6 py-3 font-medium">Usuário</th>
              <th className="px-6 py-3 font-medium">Ação</th>
              <th className="px-6 py-3 font-medium">Detalhes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400 font-mono text-xs">{log.date}</td>
                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{log.user}</td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded text-xs font-bold ${
                      log.type === 'info' ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300' :
                      log.type === 'warning' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-300' :
                      'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-300'
                   }`}>
                      {log.action}
                   </span>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{log.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
