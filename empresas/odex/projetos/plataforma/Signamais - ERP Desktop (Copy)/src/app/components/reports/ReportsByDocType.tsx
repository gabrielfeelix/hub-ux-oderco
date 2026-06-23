import React, { useState } from 'react';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { FileText, Clock, Zap, CheckCircle, Calendar } from 'lucide-react';

const DOCS_DATA = {
  '30days': [
    { name: 'Contrato de Locação', qtd: 25, taxa: '92%', tempo: '2.1 dias', creditos: 25, color: '#8925e2' },
    { name: 'Contrato de Venda', qtd: 18, taxa: '85%', tempo: '3.2 dias', creditos: 18, color: '#ec4899' },
    { name: 'Aditivo Contratual', qtd: 12, taxa: '90%', tempo: '1.8 dias', creditos: 12, color: '#3b82f6' },
    { name: 'Termo de Rescisão', qtd: 10, taxa: '88%', tempo: '2.4 dias', creditos: 10, color: '#f59e0b' },
    { name: 'Proposta Comercial', qtd: 8, taxa: '75%', tempo: '4.1 dias', creditos: 8, color: '#10b981' },
  ],
  '7days': [
    { name: 'Contrato de Locação', qtd: 5, taxa: '95%', tempo: '1.1 dias', creditos: 5, color: '#8925e2' },
    { name: 'Contrato de Venda', qtd: 2, taxa: '50%', tempo: '4.2 dias', creditos: 2, color: '#ec4899' },
    { name: 'Aditivo Contratual', qtd: 4, taxa: '100%', tempo: '1.2 dias', creditos: 4, color: '#3b82f6' },
    { name: 'Termo de Rescisão', qtd: 1, taxa: '100%', tempo: '0.4 dias', creditos: 1, color: '#f59e0b' },
    { name: 'Proposta Comercial', qtd: 3, taxa: '66%', tempo: '2.1 dias', creditos: 3, color: '#10b981' },
  ]
};

export function ReportsByDocType() {
  const [activeTab, setActiveTab] = useState<'30days' | '7days'>('30days');
  
  const currentData = DOCS_DATA[activeTab];
  const total = currentData.reduce((acc, curr) => acc + curr.qtd, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Relatórios</h2>
        <div className="flex flex-col gap-2">
           <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Por Tipo de Doc</h1>
           <p className="text-gray-500 dark:text-gray-400">Entenda quais documentos têm melhor performance.</p>
        </div>
      </div>
      
      {/* Date Filter */}
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-lg w-fit border border-gray-100 dark:border-gray-700">
         <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-2">
            <Calendar size={16} />
            <span className="text-sm font-medium">Período:</span>
         </div>
         <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            <button 
              onClick={() => setActiveTab('7days')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all ${activeTab === '7days' ? 'bg-white text-[#8925e2] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              7 dias
            </button>
            <button 
              onClick={() => setActiveTab('30days')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all ${activeTab === '30days' ? 'bg-white text-[#8925e2] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              30 dias
            </button>
         </div>
      </div>
      
      {/* Insights Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-purple-700 dark:text-purple-300 font-bold text-sm">
               <FileText size={16} />
               Tipo Mais Usado
            </div>
            <p className="text-gray-900 dark:text-white font-bold">Contrato de Locação</p>
            <p className="text-xs text-gray-500">{Math.round((currentData[0].qtd / total) * 100)}% do total</p>
         </div>
         <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 font-bold text-sm">
               <Zap size={16} />
               Mais Rápido
            </div>
            <p className="text-gray-900 dark:text-white font-bold">{activeTab === '30days' ? 'Aditivo Contratual' : 'Termo de Rescisão'}</p>
            <p className="text-xs text-gray-500">{activeTab === '30days' ? '1.8' : '0.4'} dias para assinar</p>
         </div>
         <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-orange-700 dark:text-orange-300 font-bold text-sm">
               <Clock size={16} />
               Mais Demorado
            </div>
            <p className="text-gray-900 dark:text-white font-bold">{activeTab === '30days' ? 'Proposta Comercial' : 'Contrato de Venda'}</p>
            <p className="text-xs text-gray-500">{activeTab === '30days' ? '4.1' : '4.2'} dias em média</p>
         </div>
         <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-800 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-green-700 dark:text-green-300 font-bold text-sm">
               <CheckCircle size={16} />
               Maior Sucesso
            </div>
            <p className="text-gray-900 dark:text-white font-bold">{activeTab === '30days' ? 'Contrato de Locação' : 'Aditivo Contratual'}</p>
            <p className="text-xs text-gray-500">{activeTab === '30days' ? '92' : '100'}% de conversão</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Detailed Table */}
         <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Performance por Tipo</h3>
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                     <tr>
                        <th className="px-6 py-3 rounded-l-lg">Tipo de Documento</th>
                        <th className="px-6 py-3">Qtd</th>
                        <th className="px-6 py-3">Taxa</th>
                        <th className="px-6 py-3">Tempo Médio</th>
                        <th className="px-6 py-3 rounded-r-lg">Envelopes</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                     {currentData.map((row, i) => (
                        <tr key={i} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                           <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: row.color }} />
                              {row.name}
                           </td>
                           <td className="px-6 py-4">{row.qtd}</td>
                           <td className="px-6 py-4 font-bold text-gray-700 dark:text-gray-300">{row.taxa}</td>
                           <td className="px-6 py-4 text-gray-500">{row.tempo}</td>
                           <td className="px-6 py-4 text-gray-500">{row.creditos}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Distribution Chart */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 self-start">Distribuição</h3>
            <div className="h-[250px] w-full relative">
               <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                 <PieChart>
                    <Pie
                      data={currentData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="qtd"
                    >
                      {currentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                 </PieChart>
               </ResponsiveContainer>
               {/* Center Text */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-8">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{total}</span>
                  <span className="text-xs text-gray-500">Total</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
