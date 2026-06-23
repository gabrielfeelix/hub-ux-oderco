import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Download, Calendar, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

const DATA_SETS = {
  'month': {
    comparison: [
      { name: 'Sem 1', current: 12, previous: 10 },
      { name: 'Sem 2', current: 14, previous: 11 },
      { name: 'Sem 3', current: 18, previous: 15 },
      { name: 'Sem 4', current: 22, previous: 18 },
      { name: 'Sem 5', current: 25, previous: 20 },
    ],
    detailed: [
      { week: 'Semana 1', enviados: 12, concluidos: 11, taxa: '92%' },
      { week: 'Semana 2', enviados: 14, concluidos: 12, taxa: '86%' },
      { week: 'Semana 3', enviados: 18, concluidos: 16, taxa: '89%' },
      { week: 'Semana 4', enviados: 22, concluidos: 20, taxa: '91%' },
    ],
    stats: { current: { env: 91, conc: 79, time: '2.3d', rate: '89%' }, prev: { env: 74, conc: 62, time: '2.7d', rate: '83%' } }
  },
  '30days': {
    comparison: [
      { name: 'Dia 1-5', current: 8, previous: 6 },
      { name: 'Dia 6-10', current: 12, previous: 9 },
      { name: 'Dia 11-15', current: 15, previous: 12 },
      { name: 'Dia 16-20', current: 10, previous: 8 },
      { name: 'Dia 21-25', current: 20, previous: 15 },
      { name: 'Dia 26-30', current: 25, previous: 18 },
    ],
    detailed: [
      { week: '01-07 Fev', enviados: 20, concluidos: 18, taxa: '90%' },
      { week: '25-31 Jan', enviados: 25, concluidos: 22, taxa: '88%' },
      { week: '18-24 Jan', enviados: 22, concluidos: 20, taxa: '91%' },
      { week: '11-17 Jan', enviados: 23, concluidos: 21, taxa: '91%' },
    ],
    stats: { current: { env: 90, conc: 81, time: '2.1d', rate: '90%' }, prev: { env: 68, conc: 55, time: '2.9d', rate: '81%' } }
  },
  '7days': {
    comparison: [
      { name: 'Seg', current: 5, previous: 3 },
      { name: 'Ter', current: 7, previous: 4 },
      { name: 'Qua', current: 4, previous: 5 },
      { name: 'Qui', current: 8, previous: 6 },
      { name: 'Sex', current: 6, previous: 4 },
      { name: 'Sab', current: 2, previous: 1 },
      { name: 'Dom', current: 1, previous: 0 },
    ],
    detailed: [
      { week: 'Hoje', enviados: 5, concluidos: 2, taxa: '40%' },
      { week: 'Ontem', enviados: 7, concluidos: 6, taxa: '85%' },
      { week: '04 Fev', enviados: 4, concluidos: 4, taxa: '100%' },
      { week: '03 Fev', enviados: 8, concluidos: 7, taxa: '87%' },
    ],
    stats: { current: { env: 33, conc: 24, time: '1.5d', rate: '72%' }, prev: { env: 23, conc: 18, time: '1.9d', rate: '78%' } }
  }
};

export function ReportsByPeriod() {
  const [activeTab, setActiveTab] = useState<'month' | '30days' | '7days'>('month');

  const data = DATA_SETS[activeTab];

  const handleExport = () => {
    toast.success("Relatório exportado com sucesso (CSV)");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Relatórios</h2>
        <div className="flex flex-col gap-2">
           <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Por Período</h1>
           <p className="text-gray-500 dark:text-gray-400">Compare o desempenho entre diferentes períodos.</p>
        </div>
      </div>

      {/* Date Picker Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div className="flex items-center gap-4 flex-wrap">
           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mr-2">
              <Calendar size={20} />
              <span className="font-medium">Período:</span>
           </div>
           
           <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
              <button 
                onClick={() => setActiveTab('7days')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === '7days' ? 'bg-white text-[#8925e2] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                7 dias
              </button>
              <button 
                onClick={() => setActiveTab('30days')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === '30days' ? 'bg-white text-[#8925e2] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                30 dias
              </button>
              <button 
                onClick={() => setActiveTab('month')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'month' ? 'bg-white text-[#8925e2] shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Este mês
              </button>
           </div>
        </div>

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#8925e2] rounded-lg hover:bg-[#7a1fd0] transition-colors shadow-sm shadow-purple-500/20"
        >
           <Download size={16} />
           Exportar
        </button>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Left Card - Current */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-purple-100 dark:border-purple-900/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#8925e2]" />
            <div className="flex justify-between items-start mb-4">
               <h3 className="font-bold text-lg">
                  {activeTab === 'month' ? 'Este Mês' : activeTab === '30days' ? 'Últimos 30 dias' : 'Últimos 7 dias'}
               </h3>
               <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-bold">Atual</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <p className="text-xs text-gray-500">Enviados</p>
                  <p className="text-2xl font-bold">{data.stats.current.env}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Concluídos</p>
                  <p className="text-2xl font-bold text-green-600">{data.stats.current.conc}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Tempo Médio</p>
                  <p className="text-xl font-bold">{data.stats.current.time}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Taxa</p>
                  <p className="text-xl font-bold">{data.stats.current.rate}</p>
               </div>
            </div>
         </div>

         {/* Right Card - Previous */}
         <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="flex justify-between items-start mb-4">
               <h3 className="font-bold text-lg text-gray-600 dark:text-gray-300">Período Anterior</h3>
               <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full font-bold">Anterior</span>
            </div>
            <div className="grid grid-cols-2 gap-4 opacity-80">
               <div>
                  <p className="text-xs text-gray-500">Enviados</p>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{data.stats.prev.env}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Concluídos</p>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{data.stats.prev.conc}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Tempo Médio</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{data.stats.prev.time}</p>
               </div>
               <div>
                  <p className="text-xs text-gray-500">Taxa</p>
                  <p className="text-xl font-bold text-gray-700 dark:text-gray-300">{data.stats.prev.rate}</p>
               </div>
            </div>
         </div>
      </div>

      {/* Summary Text */}
      <div className="flex items-center gap-2 p-3 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 rounded-lg border border-green-100 dark:border-green-900/30 text-sm">
         <ArrowRight size={16} />
         <span className="font-bold">Resumo:</span>
         <span>Variação: <strong>+{Math.round(((data.stats.current.env - data.stats.prev.env)/data.stats.prev.env)*100)}% enviados</strong>, <strong>+{Math.round(((data.stats.current.conc - data.stats.prev.conc)/data.stats.prev.conc)*100)}% concluídos</strong> em relação ao período anterior.</span>
      </div>

      {/* Comparison Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Tendência Comparativa</h3>
         <div className="h-[300px] w-full">
            <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
               <LineChart data={data.comparison}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Legend />
                  <Line type="monotone" dataKey="current" name="Atual" stroke="#8925e2" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="previous" name="Anterior" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Detailed Table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
         <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Detalhamento</h3>
         <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
               <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                  <tr>
                     <th className="px-6 py-3 rounded-l-lg">Período</th>
                     <th className="px-6 py-3">Enviados</th>
                     <th className="px-6 py-3">Concluídos</th>
                     <th className="px-6 py-3 rounded-r-lg">Taxa de Sucesso</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {data.detailed.map((row, i) => (
                     <tr key={i} className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{row.week}</td>
                        <td className="px-6 py-4">{row.enviados}</td>
                        <td className="px-6 py-4 text-green-600 font-bold">{row.concluidos}</td>
                        <td className="px-6 py-4">
                           <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold dark:bg-green-900/30 dark:text-green-400">
                              {row.taxa}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
