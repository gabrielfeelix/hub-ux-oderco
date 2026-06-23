import React, { useState } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { Download, ChevronUp, ChevronDown, Filter, X, Calendar } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ExportReportModal } from './ExportReportModal';
import { toast } from 'sonner';
import { AdvancedFilter } from '../common/AdvancedFilter';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const dataTimeline7Days = [
  { name: 'Seg', enviados: 2, concluidos: 1, cancelados: 0 },
  { name: 'Ter', enviados: 4, concluidos: 3, cancelados: 0 },
  { name: 'Qua', enviados: 3, concluidos: 2, cancelados: 1 },
  { name: 'Qui', enviados: 8, concluidos: 6, cancelados: 0 },
  { name: 'Sex', enviados: 12, concluidos: 10, cancelados: 1 },
  { name: 'Sáb', enviados: 5, concluidos: 4, cancelados: 0 },
  { name: 'Dom', enviados: 2, concluidos: 1, cancelados: 0 },
];

const dataTimeline30Days = [
  { name: 'Sem 1', enviados: 10, concluidos: 8, cancelados: 1 },
  { name: 'Sem 2', enviados: 15, concluidos: 10, cancelados: 2 },
  { name: 'Sem 3', enviados: 25, concluidos: 18, cancelados: 3 },
  { name: 'Sem 4', enviados: 47, concluidos: 42, cancelados: 4 },
];

const dataTimelineMonth = [
  { name: '01-05', enviados: 8, concluidos: 6, cancelados: 1 },
  { name: '06-10', enviados: 12, concluidos: 9, cancelados: 2 },
  { name: '11-15', enviados: 20, concluidos: 15, cancelados: 1 },
  { name: '16-20', enviados: 18, concluidos: 16, cancelados: 0 },
  { name: '21-25', enviados: 24, concluidos: 20, cancelados: 3 },
  { name: '26-31', enviados: 15, concluidos: 12, cancelados: 1 },
];

const dataStatus = [
  { name: 'Concluídos', value: 47, color: '#22c55e' },
  { name: 'Aguardando', value: 32, color: '#3b82f6' },
  { name: 'Cancelados', value: 21, color: '#ef4444' },
];

const dataTopDocs = [
  { name: 'Locação', qtd: 25 },
  { name: 'Venda', qtd: 18 },
  { name: 'Aditivo', qtd: 12 },
  { name: 'Rescisão', qtd: 10 },
  { name: 'Proposta', qtd: 8 },
];

export function ReportsOverview() {
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>({ status: [], users: [], docTypes: [], dateRange: { start: '', end: '' } });
  const [selectedPeriod, setSelectedPeriod] = useState<'7days' | '30days' | 'month'>('30days');

  // Dynamic Data based on Period
  const getTimelineData = () => {
    switch(selectedPeriod) {
      case '7days': return dataTimeline7Days;
      case 'month': return dataTimelineMonth;
      default: return dataTimeline30Days;
    }
  };

  const getKPIData = () => {
    switch(selectedPeriod) {
      case '7days':
        return [
          { title: 'Envelopes Enviados', value: '12', trend: '+5%', isPositive: true },
          { title: 'Envelopes Concluídos', value: '10', trend: '+8%', isPositive: true },
          { title: 'Tempo Médio', value: '1.5 dias', trend: '-10%', isPositive: true },
          { title: 'Taxa de Conclusão', value: '92%', trend: '+4%', isPositive: true },
        ];
      case 'month':
        return [
          { title: 'Envelopes Enviados', value: '85', trend: '+15%', isPositive: true },
          { title: 'Envelopes Concluídos', value: '72', trend: '+10%', isPositive: true },
          { title: 'Tempo Médio', value: '2.1 dias', trend: '-5%', isPositive: true },
          { title: 'Taxa de Conclusão', value: '88%', trend: '+1%', isPositive: true },
        ];
      default: // 30days
        return [
          { title: 'Envelopes Enviados', value: '47', trend: '+12%', isPositive: true },
          { title: 'Envelopes Concluídos', value: '42', trend: '+8%', isPositive: true },
          { title: 'Tempo Médio', value: '2.3 dias', trend: '-15%', isPositive: true },
          { title: 'Taxa de Conclusão', value: '89%', trend: '+2%', isPositive: true },
        ];
    }
  };

  const getSummaryData = () => {
    switch(selectedPeriod) {
      case '7days':
        return { total: 12, completed: 10, rate: '92%', time: '1.5 dias', prevTotal: 10, prevRate: '88%', prevTime: '1.8 dias' };
      case 'month':
        return { total: 85, completed: 72, rate: '88%', time: '2.1 dias', prevTotal: 70, prevRate: '85%', prevTime: '2.4 dias' };
      default:
        return { total: 47, completed: 42, rate: '89%', time: '2.3 dias', prevTotal: 42, prevRate: '83%', prevTime: '2.7 dias' };
    }
  };

  const kpis = getKPIData();
  const timelineData = getTimelineData();
  const summary = getSummaryData();

  const handleFilterApply = (filters: any) => {
    setActiveFilters(filters);
    toast.success("Filtros atualizados com sucesso!");
  };

  const removeStatusFilter = (id: string) => {
    setActiveFilters((prev: any) => ({
      ...prev,
      status: prev.status.filter((s: string) => s !== id)
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Relatórios</h2>
        <div className="flex flex-col gap-2">
           <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Visão Geral</h1>
           <p className="text-gray-500 dark:text-gray-400">Acompanhe as principais métricas de desempenho da sua conta.</p>
        </div>
      </div>

      <ExportReportModal 
        isOpen={isExportModalOpen} 
        onClose={() => setIsExportModalOpen(false)} 
        onExport={(format, type) => {
          toast.success(`Relatório exportado em ${format.toUpperCase()} (${type === 'full' ? 'Completo' : 'Personalizado'})`);
        }} 
      />

      {/* Filters & Actions */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 p-2 rounded-lg w-fit border border-gray-100 dark:border-gray-700">
             <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 px-2">
                <Calendar size={16} />
                <span className="text-sm font-medium">Período:</span>
             </div>
             <div className="flex bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
                <button 
                  onClick={() => setSelectedPeriod('7days')}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all",
                    selectedPeriod === '7days' 
                      ? "bg-white text-[#8925e2] shadow-sm dark:bg-gray-600 dark:text-white" 
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  )}
                >
                  7 dias
                </button>
                <button 
                  onClick={() => setSelectedPeriod('30days')}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all",
                    selectedPeriod === '30days' 
                      ? "bg-white text-[#8925e2] shadow-sm dark:bg-gray-600 dark:text-white" 
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  )}
                >
                  30 dias
                </button>
                <button 
                  onClick={() => setSelectedPeriod('month')}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-md transition-all",
                    selectedPeriod === 'month' 
                      ? "bg-white text-[#8925e2] shadow-sm dark:bg-gray-600 dark:text-white" 
                      : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  )}
                >
                  Este Mês
                </button>
             </div>
          </div>
          
          <div className="flex gap-2 items-center">
             <AdvancedFilter 
               options={{
                 status: [
                    { id: 'sent', label: 'Enviado' },
                    { id: 'completed', label: 'Concluído' },
                    { id: 'voided', label: 'Cancelado' },
                    { id: 'expired', label: 'Expirado' }
                 ],
                 users: [
                    { id: '1', label: 'Eu (Admin)' },
                    { id: '2', label: 'João Silva' },
                    { id: '3', label: 'Maria Santos' },
                    { id: '4', label: 'Financeiro' }
                 ],
                 docTypes: [
                    { id: 'contract', label: 'Contratos' },
                    { id: 'proposal', label: 'Propostas' },
                    { id: 'nda', label: 'NDAs' },
                    { id: 'hr', label: 'RH' }
                 ]
               }}
               onApply={handleFilterApply}
               label="Filtros Avançados"
             />
             <button 
               onClick={() => setIsExportModalOpen(true)}
               className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#8925e2] rounded-lg hover:bg-[#7a1fd0] transition-colors shadow-sm shadow-purple-500/20"
             >
                <Download size={16} />
                Exportar
             </button>
          </div>
        </div>

        {/* Active Filters Chips */}
        {(activeFilters.status.length > 0 || activeFilters.users.length > 0 || activeFilters.docTypes.length > 0 || activeFilters.dateRange.start) && (
          <div className="flex flex-wrap gap-2 animate-in slide-in-from-top-2">
             {activeFilters.status.map((status: string) => (
                <div key={status} className="flex items-center gap-1 pl-3 pr-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded-full text-xs font-bold">
                   Status: {status === 'sent' ? 'Enviado' : status === 'completed' ? 'Concluído' : status === 'voided' ? 'Cancelado' : status === 'expired' ? 'Expirado' : status}
                   <button onClick={() => removeStatusFilter(status)} className="p-0.5 hover:bg-purple-200 dark:hover:bg-purple-800 rounded-full transition-colors ml-1">
                      <X size={12} />
                   </button>
                </div>
             ))}
             {/* We can add similar chips for users and docTypes here if needed, but status is a good example */}
             {(activeFilters.users.length > 0 || activeFilters.docTypes.length > 0) && (
                <div className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-700">
                   +{activeFilters.users.length + activeFilters.docTypes.length} outros filtros
                </div>
             )}
             <button 
                onClick={() => setActiveFilters({ status: [], users: [], docTypes: [], dateRange: { start: '', end: '' } })}
                className="text-xs text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white underline ml-2"
             >
                Limpar todos
             </button>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
             <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{kpi.title}</p>
             <div className="flex items-end justify-between mt-2">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{kpi.value}</h3>
                <div className={cn("flex items-center text-xs font-bold px-2 py-1 rounded-full", kpi.isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700")}>
                   {kpi.isPositive ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                   {kpi.trend}
                </div>
             </div>
          </div>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Line Chart */}
         <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Evolução de Envios ({selectedPeriod === '7days' ? 'Últimos 7 dias' : selectedPeriod === 'month' ? 'Este Mês' : 'Últimos 30 dias'})</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorEnviados" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8925e2" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#8925e2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="enviados" stroke="#8925e2" strokeWidth={3} fillOpacity={1} fill="url(#colorEnviados)" />
                  <Area type="monotone" dataKey="concluidos" stroke="#22c55e" strokeWidth={3} fill="none" />
                  <Area type="monotone" dataKey="cancelados" stroke="#ef4444" strokeWidth={3} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
         </div>

         {/* Pie Chart */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Status dos Envelopes</h3>
            <div className="h-[200px] w-full relative">
               <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                 <PieChart>
                    <Pie
                      data={dataStatus}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dataStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
               {/* Center Text */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">100</span>
                  <span className="text-xs text-gray-500">Total</span>
               </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
               {dataStatus.map((status, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                     <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                        <span className="text-gray-600 dark:text-gray-300">{status.name}</span>
                     </div>
                     <span className="font-bold text-gray-900 dark:text-white">{status.value}%</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Top Docs Bar Chart */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm lg:col-span-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top 5 Documentos</h3>
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                  <BarChart layout="vertical" data={dataTopDocs} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                     <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
                     <XAxis type="number" hide />
                     <YAxis dataKey="name" type="category" width={80} tick={{fill: '#6B7280', fontSize: 12}} tickLine={false} axisLine={false} />
                     <Tooltip cursor={{fill: 'transparent'}} />
                     <Bar dataKey="qtd" fill="#8925e2" radius={[0, 4, 4, 0]} barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Summary Table */}
         <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resumo ({selectedPeriod === '7days' ? 'Semanal' : 'Mensal'})</h3>
            <div className="overflow-x-auto">
               <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-500 uppercase bg-gray-50 dark:bg-gray-700/50 dark:text-gray-400">
                     <tr>
                        <th className="px-6 py-3 rounded-l-lg">Métrica</th>
                        <th className="px-6 py-3">Este Período</th>
                        <th className="px-6 py-3">Período Anterior</th>
                        <th className="px-6 py-3 rounded-r-lg">Variação</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                     <tr className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Total Enviados</td>
                        <td className="px-6 py-4">{summary.total}</td>
                        <td className="px-6 py-4 text-gray-500">{summary.prevTotal}</td>
                        <td className="px-6 py-4 text-green-600 font-bold">+12%</td>
                     </tr>
                     <tr className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Taxa de Conclusão</td>
                        <td className="px-6 py-4">{summary.rate}</td>
                        <td className="px-6 py-4 text-gray-500">{summary.prevRate}</td>
                        <td className="px-6 py-4 text-green-600 font-bold">+6%</td>
                     </tr>
                     <tr className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Tempo Médio</td>
                        <td className="px-6 py-4">{summary.time}</td>
                        <td className="px-6 py-4 text-gray-500">{summary.prevTime}</td>
                        <td className="px-6 py-4 text-green-600 font-bold">-15%</td>
                     </tr>
                     <tr className="bg-white dark:bg-gray-800">
                        <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">Créditos Consumidos</td>
                        <td className="px-6 py-4">{summary.total}</td>
                        <td className="px-6 py-4 text-gray-500">{summary.prevTotal}</td>
                        <td className="px-6 py-4 text-red-500 font-bold">+12%</td>
                     </tr>
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
}