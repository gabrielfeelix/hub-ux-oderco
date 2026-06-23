import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Clock, 
  AlertTriangle, 
  Send, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  MoreVertical,
  Star,
  X,
  Lightbulb,
  ArrowRight,
  ShieldAlert,
  Lock,
  CheckSquare,
  Calendar,
  Download,
  Trash2,
  Eye,
  BarChart2,
  AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Helper for classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type PlanStatus = 'active' | 'trial' | 'expired';

interface DashboardProps {
  onNavigate?: (tab: string, folder?: string) => void;
  onNewEnvelope?: () => void;
  onUseTemplate?: () => void;
  onUseFavoriteTemplate?: (templateId: string) => void;
  onFolderChange?: (folder: string) => void;
  onBuyCredits?: () => void;
  activeViewWidgets?: string[];
  onStartOnboarding?: () => void;
  onOpenPlansModal?: () => void;
  onSimulateError?: () => void;
}

export function Dashboard({ 
  onNavigate, 
  onFolderChange, 
  onNewEnvelope, 
  onUseTemplate, 
  onUseFavoriteTemplate, 
  onBuyCredits,
  activeViewWidgets = ['recent', 'favorites'], // Default to only bottom sections
  onStartOnboarding,
  onOpenPlansModal,
  onSimulateError
}: DashboardProps) {
  const [status, setStatus] = useState<PlanStatus>('active');
  const [showTip, setShowTip] = useState(true);
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);
  const [isFreePlan, setIsFreePlan] = useState(false);

  // Widget Flags
  const showPriority = activeViewWidgets.includes('priority');
  const showTasks = activeViewWidgets.includes('tasks');
  const showRecent = activeViewWidgets.includes('recent');
  const showFavorites = activeViewWidgets.includes('favorites');
  const showResults = activeViewWidgets.includes('results');

  // Date Formatting
  const currentDate = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' });
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  // Mock Data
  const recentEnvelopes = [
    { id: 1, name: 'Contrato-Locacao.pdf', status: 'Assinado', date: 'Há 2 horas', statusColor: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
    { id: 2, name: 'Proposta-Comercial.pdf', status: 'Enviado', date: 'Há 5 horas', statusColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
    { id: 3, name: 'Aditivo-Contrato.pdf', status: 'Pendente', date: 'Ontem', statusColor: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' },
    { id: 4, name: 'Termo-Rescisão.pdf', status: 'Expira 2d', date: 'Há 3 dias', statusColor: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  ];

  const favoriteTemplates = [
    { id: 1, name: 'Contrato Locação', icon: <FileText size={20} className="text-purple-600" /> },
    { id: 2, name: 'Proposta Comercial', icon: <FileText size={20} className="text-blue-600" /> },
    { id: 3, name: 'Aditivo Contrato', icon: <FileText size={20} className="text-orange-600" /> },
  ];

  const chartData = [
    { name: 'Seg', envelopes: 4, assinados: 2 },
    { name: 'Ter', envelopes: 3, assinados: 1 },
    { name: 'Qua', envelopes: 2, assinados: 2 },
    { name: 'Qui', envelopes: 6, assinados: 4 },
    { name: 'Sex', envelopes: 8, assinados: 5 },
    { name: 'Sab', envelopes: 1, assinados: 0 },
    { name: 'Dom', envelopes: 0, assinados: 0 },
  ];

  const handleNavigate = (tab: string, folder?: string) => {
    if (tab === 'Tasks') {
       if (onNavigate) onNavigate('Tasks');
       return;
    }
    if (tab === 'Help') {
       if (onNavigate) onNavigate('Help');
       return;
    }
    if (onNavigate) onNavigate(tab, folder);
    if (onFolderChange && folder) onFolderChange(folder);
  };

  const toggleActionMenu = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  const handleAction = (e: React.MouseEvent, action: string) => {
    e.stopPropagation();
    toast.success(`Ação "${action}" executada com sucesso`);
    setOpenActionMenuId(null);
  };

  return (
    <div id="tour-dashboard-content" className="relative min-h-full" onClick={() => setOpenActionMenuId(null)}>
      {/* Scenario C: Trial Banner */}
      {status === 'trial' && !isFreePlan && (
        <div className="bg-orange-50 dark:bg-orange-900/20 border-b border-orange-100 dark:border-orange-800 px-6 py-3 flex items-center justify-between animate-in slide-in-from-top-5">
           <div className="flex items-center gap-3">
              <Clock size={18} className="text-orange-600 dark:text-orange-400" />
              <p className="text-sm font-medium text-orange-800 dark:text-orange-200">
                <span className="font-bold">7 dias restantes</span> no seu período de teste. Aproveite todos os recursos gratuitamente!
              </p>
           </div>
           <div className="flex items-center gap-3">
              <button 
                onClick={() => onOpenPlansModal ? onOpenPlansModal() : handleNavigate('Planos')}
                className="text-sm font-bold text-orange-700 dark:text-orange-300 hover:underline"
              >
                Ver planos
              </button>
              <button className="text-orange-500 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-200">
                 <X size={16} />
              </button>
           </div>
        </div>
      )}

      {/* Free Plan Alert */}
      {isFreePlan && status !== 'expired' && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-800 px-6 py-3 flex items-center justify-between animate-in slide-in-from-top-5">
           <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-1.5 rounded-full dark:bg-blue-900/40">
                <AlertCircle size={16} className="text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Você está no <span className="font-bold">Plano Gratuito</span>. Selecione um plano para desbloquear mais recursos.
              </p>
           </div>
           <div className="flex items-center gap-3">
              <button 
                onClick={() => onOpenPlansModal ? onOpenPlansModal() : handleNavigate('Planos')}
                className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Selecionar Plano
              </button>
           </div>
        </div>
      )}

      {/* Main Content (Blurred if Expired) */}
      <div className={cn("p-8 space-y-8 transition-all duration-300", status === 'expired' ? "blur-sm pointer-events-none select-none overflow-hidden h-[calc(100vh-100px)]" : "")}>
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
           <div>
              <p className="text-sm font-bold text-[#8925e2] uppercase tracking-wide mb-1">{formattedDate}</p>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif]">Olá, Gabriel Barbosa 👋</h1>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Você tem <strong className="text-gray-900 dark:text-white">4 tarefas pendentes</strong> e 3 documentos prioritários.</p>
           </div>
           <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 pl-2 pr-2.5 py-1.5 bg-gray-50 dark:bg-gray-800 rounded-full border border-gray-100 dark:border-gray-700 mr-2 shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                    <FileText size={12} className="text-gray-500 dark:text-gray-400" />
                 </div>
                 <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Disponíveis: <span className="font-bold text-[#8925e2] dark:text-[#a855f7]">125/200</span>
                 </span>
                 <button 
                   onClick={onBuyCredits}
                   className="w-5 h-5 bg-[#8925e2] hover:bg-[#7a1fd0] text-white rounded-full flex items-center justify-center transition-colors shadow-sm ml-1"
                   title="Adicionar envelopes extras"
                 >
                    <Plus size={12} />
                 </button>
              </div>

              <button 
                onClick={onUseTemplate}
                className="px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors shadow-sm"
              >
                 <FileText size={18} />
                 Usar Modelo
              </button>
              <button 
                onClick={onNewEnvelope}
                className="px-5 py-2.5 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] flex items-center gap-2 transition-colors shadow-lg shadow-purple-500/20"
              >
                 <Plus size={18} />
                 Novo Envelope
              </button>
           </div>
        </div>

        {/* Section 1: Priority & Tasks Grid */}
        {(showPriority || showTasks) && (
          <div>
             <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle size={14} className="text-orange-500" />
                {showPriority && showTasks ? 'Prioridade e Tarefas' : showPriority ? 'Prioridade Alta' : 'Tarefas do Dia'}
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {showPriority && (
                  <>
                    {/* Card 1 */}
                    <div 
                      onClick={() => handleNavigate('Documentos', 'Expira em breve')}
                      className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-[#8925e2]/30 transition-all group cursor-pointer relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />
                       
                       <div className="flex items-start justify-between mb-4 relative">
                          <div className="p-2.5 bg-red-100 text-red-600 rounded-xl dark:bg-red-900/30 dark:text-red-400">
                             <Clock size={20} />
                          </div>
                          <span className="text-[10px] font-bold bg-red-50 text-red-600 px-2.5 py-1 rounded-full dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30">URGENTE</span>
                       </div>
                       <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">3 Documentos</h4>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">expiram em menos de 48h</p>
                       <button className="text-sm font-bold text-red-600 dark:text-red-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Resolver agora <ArrowRight size={14} />
                       </button>
                    </div>

                    {/* Card 2 */}
                    <div 
                      onClick={() => handleNavigate('Documentos', 'Ação necessária')}
                      className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-[#8925e2]/30 transition-all group cursor-pointer relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />

                       <div className="flex items-start justify-between mb-4 relative">
                          <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl dark:bg-blue-900/30 dark:text-blue-400">
                             <Send size={20} />
                          </div>
                       </div>
                       <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">5 Aguardando</h4>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">assinatura de clientes</p>
                       <button className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Ver lista <ArrowRight size={14} />
                       </button>
                    </div>

                    {/* Card 3 */}
                    <div 
                      onClick={() => handleNavigate('Documentos', 'Falha na com.')}
                      className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-[#8925e2]/30 transition-all group cursor-pointer relative overflow-hidden"
                    >
                       <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />

                       <div className="flex items-start justify-between mb-4 relative">
                          <div className="p-2.5 bg-orange-100 text-orange-600 rounded-xl dark:bg-orange-900/30 dark:text-orange-400">
                             <AlertTriangle size={20} />
                          </div>
                          <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full dark:bg-orange-900/20 dark:text-orange-400 border border-orange-100 dark:border-orange-900/30">CRÍTICO</span>
                       </div>
                       <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">2 com Erro</h4>
                       <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">falha no envio do email</p>
                       <button className="text-sm font-bold text-orange-600 dark:text-orange-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                          Corrigir <ArrowRight size={14} />
                       </button>
                    </div>
                  </>
                )}

                {showTasks && (
                  /* Card 4 - Tasks */
                  <div 
                    onClick={() => handleNavigate('Tasks')}
                    className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md hover:border-[#8925e2]/30 transition-all group cursor-pointer relative overflow-hidden"
                  >
                     <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150" />

                     <div className="flex items-start justify-between mb-4 relative">
                        <div className="p-2.5 bg-purple-100 text-[#8925e2] rounded-xl dark:bg-purple-900/30 dark:text-purple-400">
                           <CheckSquare size={20} />
                        </div>
                        <span className="text-[10px] font-bold bg-purple-50 text-[#8925e2] px-2.5 py-1 rounded-full dark:bg-purple-900/20 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30">HOJE</span>
                     </div>
                     <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4 Tarefas</h4>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">precisam de atenção hoje</p>
                     <button className="text-sm font-bold text-[#8925e2] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                        Ver tarefas <ArrowRight size={14} />
                     </button>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* Section: Results Widget (New) */}
        {showResults && (
           <div className="animate-in fade-in slide-in-from-bottom-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <BarChart2 size={14} className="text-green-500" />
                  Resultados da Semana
              </h3>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm h-[300px]">
                 <div className="flex items-center gap-4 mb-6">
                    <div>
                       <p className="text-sm text-gray-500 dark:text-gray-400">Envelopes Enviados</p>
                       <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                    </div>
                    <div className="h-8 w-[1px] bg-gray-100 dark:bg-gray-700" />
                    <div>
                       <p className="text-sm text-gray-500 dark:text-gray-400">Taxa de Assinatura</p>
                       <p className="text-2xl font-bold text-green-500">68%</p>
                    </div>
                 </div>
                 <div className="h-[180px] w-full">
                    <ResponsiveContainer width="99%" height="100%" minWidth={100} minHeight={100}>
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorEnv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8925e2" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#8925e2" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.5} />
                          <XAxis 
                             dataKey="name" 
                             axisLine={false} 
                             tickLine={false} 
                             tick={{fontSize: 12, fill: '#9CA3AF'}} 
                             dy={10}
                          />
                          <Tooltip 
                             contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          />
                          <Area type="monotone" dataKey="envelopes" stroke="#8925e2" strokeWidth={3} fillOpacity={1} fill="url(#colorEnv)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>
        )}

        {/* Section 3 & 4: Recent Envelopes & Templates */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           {/* Recent Envelopes */}
           {showRecent && (
             <div className={cn("space-y-4", showFavorites ? "lg:col-span-2" : "lg:col-span-3")}>
                <div className="flex items-center justify-between">
                   <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Últimos envelopes enviados</h3>
                   <button 
                     onClick={() => handleNavigate('Documentos')}
                     className="text-sm font-bold text-[#8925e2] hover:underline"
                   >
                     Ver todos
                   </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden min-h-[300px]">
                   <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 uppercase text-xs">
                         <tr>
                            <th className="px-6 py-3 font-medium">Documento</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Enviado em</th>
                            <th className="px-6 py-3 font-medium text-right">Ações</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                         {recentEnvelopes.map((env) => (
                            <tr 
                              key={env.id} 
                              onClick={() => handleNavigate('Documentos')}
                              className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer"
                            >
                               <td className="px-6 py-4 font-medium text-gray-900 dark:text-white flex items-center gap-2">
                                  <FileText size={16} className="text-gray-400" />
                                  {env.name}
                               </td>
                               <td className="px-6 py-4">
                                  <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold", env.statusColor)}>
                                     {env.status}
                                  </span>
                               </td>
                               <td className="px-6 py-4 text-gray-500">{env.date}</td>
                               <td className="px-6 py-4 text-right relative">
                                  <button 
                                    onClick={(e) => toggleActionMenu(e, env.id)}
                                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                  >
                                     <MoreVertical size={16} />
                                  </button>
                                  
                                  {openActionMenuId === env.id && (
                                    <div className="absolute right-10 top-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                                       <button onClick={(e) => handleAction(e, 'Visualizar')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                                          <Eye size={16} /> Visualizar
                                       </button>
                                       <button onClick={(e) => handleAction(e, 'Download')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200">
                                          <Download size={16} /> Download PDF
                                       </button>
                                       <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                                       <button onClick={(e) => handleAction(e, 'Excluir')} className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 dark:text-red-400">
                                          <Trash2 size={16} /> Excluir
                                       </button>
                                    </div>
                                  )}
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>
           )}

           {/* Favorite Templates */}
           {showFavorites && (
             <div className={cn("space-y-4", showRecent ? "" : "lg:col-span-3")}>
                <div className="flex items-center justify-between">
                   <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Modelos favoritos</h3>
                   <button 
                     onClick={() => handleNavigate('Modelos')}
                     className="text-sm font-bold text-[#8925e2] hover:underline"
                   >
                     Ver todos
                   </button>
                </div>
                
                <div className="flex flex-col gap-3">
                   {favoriteTemplates.map((template) => (
                      <div 
                        key={template.id} 
                        onClick={() => {
                          if (onUseFavoriteTemplate) {
                            onUseFavoriteTemplate(template.id.toString());
                          } else {
                            handleNavigate('Modelos');
                          }
                        }}
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center justify-between"
                      >
                         <div className="flex items-center gap-3">
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                               {template.icon}
                            </div>
                            <div>
                               <p className="font-bold text-gray-900 dark:text-white text-sm">{template.name}</p>
                               <div className="flex items-center gap-1 text-xs text-yellow-500">
                                  <Star size={10} fill="currentColor" />
                                  <span className="text-gray-400">Favorito</span>
                               </div>
                            </div>
                         </div>
                         <button 
                           onClick={(e) => {
                             e.stopPropagation();
                             if (onUseFavoriteTemplate) {
                               onUseFavoriteTemplate(template.id.toString());
                             } else {
                               handleNavigate('Modelos');
                             }
                           }}
                           className="text-xs font-bold text-[#8925e2] bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-100"
                         >
                            Utilizar
                         </button>
                      </div>
                   ))}
                   
                   <button 
                     onClick={() => handleNavigate('Modelos')}
                     className="w-full py-3 border border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                   >
                      <Plus size={16} />
                      Adicionar novo favorito
                   </button>
                </div>
             </div>
           )}
        </div>

        {/* Section 5: Tip/Tour */}
        {showTip && (
           <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-4">
              <div className="absolute top-0 right-0 p-4">
                 <button onClick={() => setShowTip(false)} className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors">
                    <X size={16} />
                 </button>
              </div>
              <div className="flex items-start gap-4 relative z-10">
                 <div className="bg-white/20 p-3 rounded-full shrink-0 backdrop-blur-sm">
                    <Lightbulb size={24} className="text-yellow-300" />
                 </div>
                 <div>
                    <h4 className="font-bold text-lg mb-1">Dica Pro: Assinaturas em Lote</h4>
                    <p className="text-indigo-100 text-sm max-w-xl mb-4">
                       Sabia que você pode enviar o mesmo documento para até 50 pessoas de uma vez? 
                       Ideal para termos de uso ou atualizações de política interna.
                    </p>
                    <button 
                      onClick={() => handleNavigate('Help')}
                      className="bg-white text-purple-600 font-bold px-4 py-2 rounded-lg text-sm hover:bg-indigo-50 transition-colors"
                    >
                       Saiba mais
                    </button>
                 </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute top-10 right-20 w-20 h-20 bg-purple-400/20 rounded-full blur-xl" />
           </div>
        )}
      </div>

      {/* Scenario B: Expired Overlay */}
      {status === 'expired' && (
         <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30 dark:bg-black/40 animate-in fade-in duration-500">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-gray-200 dark:border-gray-700 relative overflow-hidden m-4">
               <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
               
               <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 dark:bg-red-900/30">
                  <ShieldAlert size={32} />
               </div>
               
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Período de avaliação expirou</h2>
               <p className="text-gray-500 dark:text-gray-400 mb-8">
                  O seu período de avaliação terminou. Escolha um plano para continuar a poupar tempo com assinaturas ilimitadas.
               </p>
               
               <div className="space-y-3">
                  <button 
                    onClick={() => onOpenPlansModal ? onOpenPlansModal() : handleNavigate('Planos')}
                    className="w-full bg-[#8925e2] hover:bg-[#7a1fd0] text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-lg shadow-purple-500/20"
                  >
                     Ver planos disponíveis
                  </button>
                  
                  <div className="relative py-2">
                     <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-gray-200 dark:border-gray-700" />
                     </div>
                     <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">Ou</span>
                     </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl text-left mb-3 border border-gray-100 dark:border-gray-700">
                     <p className="font-bold text-sm text-gray-900 dark:text-white mb-2">Plano Gratuito inclui:</p>
                     <ul className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> 3 envelopes por mês</li>
                        <li className="flex items-center gap-2"><CheckCircle size={12} className="text-green-500" /> Marca d'água "Powered by Signamais"</li>
                     </ul>
                  </div>

                  <button 
                    onClick={() => {
                       setStatus('active');
                       setIsFreePlan(true);
                       toast.info("Você agora está no plano gratuito.");
                    }}
                    className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold py-3 px-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                     Continuar grátis
                  </button>
               </div>
            </div>
         </div>
      )}

      {/* Dev Controls - Fixed at bottom right */}
      <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white p-2 rounded-lg backdrop-blur text-xs flex gap-2 items-center opacity-50 hover:opacity-100 transition-opacity">
         <span className="font-bold text-gray-400 uppercase">Cenário:</span>
         <button onClick={() => setStatus('active')} className={cn("px-2 py-1 rounded", status === 'active' ? "bg-green-600" : "hover:bg-white/20")}>Ativo</button>
         <button onClick={() => setStatus('trial')} className={cn("px-2 py-1 rounded", status === 'trial' ? "bg-orange-600" : "hover:bg-white/20")}>Teste</button>
         <button onClick={() => setStatus('expired')} className={cn("px-2 py-1 rounded", status === 'expired' ? "bg-red-600" : "hover:bg-white/20")}>Expirado</button>
         {onStartOnboarding && (
            <button onClick={onStartOnboarding} className="px-2 py-1 rounded hover:bg-white/20 bg-purple-600/50 hover:bg-purple-600">Demo</button>
         )}
         {onSimulateError && (
            <button onClick={onSimulateError} className="px-2 py-1 rounded hover:bg-white/20 bg-red-500/50 hover:bg-red-600" title="Simular Queda de Servidor">Erro 500</button>
         )}
      </div>
    </div>
  );
}