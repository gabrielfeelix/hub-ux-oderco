import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Mail, AlertTriangle, ShoppingCart, TrendingUp } from 'lucide-react';

const creditsHistory = [
  { name: 'Ago', consumo: 35 },
  { name: 'Set', consumo: 38 },
  { name: 'Out', consumo: 42 },
  { name: 'Nov', consumo: 40 },
  { name: 'Dez', consumo: 42 },
  { name: 'Jan', consumo: 47 },
];

const creditsTable = [
  { mes: 'Janeiro 2026', inicial: 172, consumo: 47, final: 125 },
  { mes: 'Dezembro 2025', inicial: 214, consumo: 42, final: 172 },
  { mes: 'Novembro 2025', inicial: 254, consumo: 40, final: 214 },
  { mes: 'Outubro 2025', inicial: 296, consumo: 42, final: 254 },
];

export function ReportsCredits() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Relatórios</h2>
        <div className="flex flex-col gap-2">
           <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Consumo de Envelopes</h1>
           <p className="text-gray-500 dark:text-gray-400">Acompanhe o uso do seu plano e envelopes.</p>
        </div>
      </div>
      
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Saldo de Envelopes</p>
               <h3 className="text-3xl font-bold text-[#8925e2]">125</h3>
            </div>
            <div className="bg-purple-100 text-[#8925e2] p-3 rounded-full dark:bg-purple-900/30">
               <Mail size={24} />
            </div>
         </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Consumidos (Mês)</p>
               <h3 className="text-3xl font-bold text-gray-900 dark:text-white">47</h3>
            </div>
            <div className="bg-blue-100 text-blue-600 p-3 rounded-full dark:bg-blue-900/30">
               <TrendingUp size={24} />
            </div>
         </div>
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Média Diária</p>
               <h3 className="text-3xl font-bold text-gray-900 dark:text-white">1.6</h3>
            </div>
            <div className="bg-orange-100 text-orange-600 p-3 rounded-full dark:bg-orange-900/30">
               <AlertTriangle size={24} />
            </div>
         </div>
      </div>

      {/* Projection Alert */}
      <div className="bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl p-4 flex items-center gap-3 text-yellow-800 dark:text-yellow-200">
         <AlertTriangle size={20} className="shrink-0" />
         <p className="text-sm">
            <strong>Projeção:</strong> Com o consumo atual de 1.6 envelopes/dia, seu saldo atual de 125 envelopes durará aproximadamente <strong>78 dias</strong>.
         </p>
      </div>

      {/* Charts & Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         {/* History Chart */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Histórico de Consumo</h3>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                  <BarChart data={creditsHistory}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                     <Tooltip cursor={{fill: 'transparent'}} />
                     <Bar dataKey="consumo" fill="#8925e2" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Detailed Table */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-gray-900 dark:text-white">Extrato Mensal</h3>
               <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-white bg-[#8925e2] rounded-lg hover:bg-[#7a1fd0] transition-colors shadow-sm shadow-purple-500/20">
                  <ShoppingCart size={14} />
                  Comprar envelopes
               </button>
            </div>
            <div className="overflow-x-auto flex-1">
               <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                     <tr>
                        <th className="px-4 py-3 rounded-l-lg">Mês</th>
                        <th className="px-4 py-3 text-right">Inicial</th>
                        <th className="px-4 py-3 text-right">Consumo</th>
                        <th className="px-4 py-3 text-right rounded-r-lg">Restante</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                     {creditsTable.map((row, i) => (
                        <tr key={i} className="bg-white dark:bg-gray-800">
                           <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{row.mes}</td>
                           <td className="px-4 py-3 text-right text-gray-500">{row.inicial}</td>
                           <td className="px-4 py-3 text-right text-red-500 font-bold">-{row.consumo}</td>
                           <td className="px-4 py-3 text-right font-bold text-gray-900 dark:text-white">{row.final}</td>
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
