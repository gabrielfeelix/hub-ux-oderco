import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Search, User, ChevronRight, Trophy, Clock, FileText } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const DATA_SETS = {
  'month': [
    { id: 1, name: 'Maria Silva', role: 'Corretora', enviados: 18, concluidos: 16, taxa: '89%', tempo: '1.8 dias', medal: 'gold' },
    { id: 2, name: 'João Pedro', role: 'Atendente', enviados: 15, concluidos: 14, taxa: '93%', tempo: '2.1 dias', medal: 'silver' },
    { id: 3, name: 'Ana Costa', role: 'Corretora', enviados: 10, concluidos: 8, taxa: '80%', tempo: '3.5 dias', medal: 'bronze' },
    { id: 4, name: 'Carlos Santos', role: 'Gerente', enviados: 4, concluidos: 4, taxa: '100%', tempo: '1.2 dias', medal: null },
  ],
  'year': [
    { id: 1, name: 'Maria Silva', role: 'Corretora', enviados: 210, concluidos: 195, taxa: '92%', tempo: '1.7 dias', medal: 'gold' },
    { id: 2, name: 'João Pedro', role: 'Atendente', enviados: 180, concluidos: 165, taxa: '91%', tempo: '2.0 dias', medal: 'silver' },
    { id: 3, name: 'Ana Costa', role: 'Corretora', enviados: 150, concluidos: 120, taxa: '80%', tempo: '3.2 dias', medal: 'bronze' },
    { id: 4, name: 'Carlos Santos', role: 'Gerente', enviados: 45, concluidos: 44, taxa: '98%', tempo: '1.1 dias', medal: null },
  ]
};

export function ReportsByUser() {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [filter, setFilter] = useState<'month' | 'year'>('month');
  const [searchTerm, setSearchTerm] = useState('');

  const currentData = DATA_SETS[filter].filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Relatórios</h2>
        <div className="flex flex-col gap-2">
           <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Por Usuário</h1>
           <p className="text-gray-500 dark:text-gray-400">Analise a produtividade individual da equipe.</p>
        </div>
      </div>

      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="bg-white dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center">
           <button 
             onClick={() => setFilter('month')}
             className={cn(
               "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
               filter === 'month' ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
             )}
           >
             Este mês
           </button>
           <button 
             onClick={() => setFilter('year')}
             className={cn(
               "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
               filter === 'year' ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
             )}
           >
             Ano
           </button>
        </div>
        
        <div className="relative">
           <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
           <input 
             type="text" 
             placeholder="Buscar usuário..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
           />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* User List / Ranking */}
         <div className="lg:col-span-2 flex flex-col gap-4">
            {currentData.map((user, index) => (
              <div 
                key={user.id}
                onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                className={cn(
                  "bg-white dark:bg-gray-800 rounded-2xl p-4 border transition-all cursor-pointer shadow-sm hover:shadow-md",
                  selectedUser === user.id ? "border-purple-500 ring-1 ring-purple-500" : "border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900"
                )}
              >
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 overflow-hidden">
                             <User size={24} />
                             {/* Mock Avatar Image could go here */}
                          </div>
                          {user.medal && (
                             <div className="absolute -top-1 -right-1 bg-white dark:bg-gray-800 rounded-full p-0.5 shadow-sm">
                                <Trophy size={16} className={
                                   user.medal === 'gold' ? "text-yellow-400 fill-yellow-400" : 
                                   user.medal === 'silver' ? "text-gray-400 fill-gray-400" : 
                                   "text-amber-600 fill-amber-600"
                                } />
                             </div>
                          )}
                       </div>
                       <div>
                          <h4 className="font-bold text-gray-900 dark:text-white">{user.name}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-6 md:gap-12">
                       <div className="text-center">
                          <p className="text-xs text-gray-500 uppercase">Enviados</p>
                          <p className="font-bold text-lg">{user.enviados}</p>
                       </div>
                       <div className="text-center hidden sm:block">
                          <p className="text-xs text-gray-500 uppercase">Taxa</p>
                          <p className="font-bold text-lg text-green-600">{user.taxa}</p>
                       </div>
                       <ChevronRight size={20} className={cn("text-gray-400 transition-transform", selectedUser === user.id ? "rotate-90" : "")} />
                    </div>
                 </div>

                 {/* Expanded Details */}
                 {selectedUser === user.id && (
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 animate-in slide-in-from-top-2">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl flex items-center gap-3">
                             <div className="bg-purple-100 text-purple-600 p-2 rounded-lg dark:bg-purple-900/30 dark:text-purple-300">
                                <FileText size={18} />
                             </div>
                             <div>
                                <p className="text-xs text-gray-500">Doc Mais Enviado</p>
                                <p className="font-bold text-sm">Contrato de Locação</p>
                             </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700/30 p-3 rounded-xl flex items-center gap-3">
                             <div className="bg-blue-100 text-blue-600 p-2 rounded-lg dark:bg-blue-900/30 dark:text-blue-300">
                                <Clock size={18} />
                             </div>
                             <div>
                                <p className="text-xs text-gray-500">Tempo Médio</p>
                                <p className="font-bold text-sm">{user.tempo}</p>
                             </div>
                          </div>
                       </div>
                       <button className="w-full py-2 text-sm font-bold text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                          Ver histórico completo de {user.name}
                       </button>
                    </div>
                 )}
              </div>
            ))}
         </div>

         {/* Comparative Chart */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-fit sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Comparativo de Volume ({filter === 'month' ? 'Mês' : 'Ano'})</h3>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                  <BarChart data={currentData} layout="vertical" margin={{ left: 20 }}>
                     <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={80} tick={{fill: '#6B7280', fontSize: 10}} tickLine={false} axisLine={false} />
                     <Tooltip cursor={{fill: 'transparent'}} />
                     <Bar dataKey="enviados" radius={[0, 4, 4, 0]} barSize={20}>
                        {currentData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={index === 0 ? '#fbbf24' : index === 1 ? '#9ca3af' : index === 2 ? '#d97706' : '#8925e2'} />
                        ))}
                     </Bar>
                  </BarChart>
               </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 text-center mt-2">Volume total de envelopes enviados no período.</p>
         </div>
      </div>
    </div>
  );
}
