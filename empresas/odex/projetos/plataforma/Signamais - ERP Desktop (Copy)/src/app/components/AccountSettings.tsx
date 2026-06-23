import React, { useState } from 'react';
import { 
  Bell, 
  FileText, 
  Globe, 
  Moon, 
  Shield, 
  Check, 
  ChevronDown,
  Download,
  Trash2,
  Eye,
  Cookie
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function AccountSettings() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'documents' | 'region' | 'appearance' | 'privacy'>('notifications');

  const tabs = [
    { id: 'notifications', label: 'Notificações', icon: <Bell size={18} /> },
    { id: 'documents', label: 'Preferências de Doc.', icon: <FileText size={18} /> },
    { id: 'region', label: 'Idioma e Região', icon: <Globe size={18} /> },
    { id: 'appearance', label: 'Aparência', icon: <Moon size={18} /> },
    { id: 'privacy', label: 'Privacidade e Dados', icon: <Shield size={18} /> },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-[#8925e2] text-white shadow-md shadow-purple-500/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Content Area */}
      <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 min-h-[600px]">
        
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notificações</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Por E-mail</h3>
                  
                  {[
                    { label: "Documento assinado", desc: "Receba notificação quando um documento for assinado" },
                    { label: "Documento expirado", desc: "Aviso quando documentos expirarem" },
                    { label: "Documento pendente", desc: "Lembretes de documentos aguardando sua assinatura" },
                    { label: "Novo documento recebido", desc: "Notificação de novos documentos" },
                    { label: "Relatórios semanais", desc: "Resumo semanal de atividades" },
                  ].map((item, i) => (
                    <label key={i} className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" defaultChecked={i < 4} className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all checked:border-[#8925e2] checked:bg-[#8925e2] dark:border-gray-600" />
                        <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                          <Check size={12} strokeWidth={4} />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 dark:text-gray-200 group-hover:text-[#8925e2] transition-colors">{item.label}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="h-[1px] bg-gray-100 dark:bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Notificações Push</h3>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-5 h-5 text-[#8925e2] rounded focus:ring-[#8925e2]" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Notificações no navegador</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-5 h-5 text-[#8925e2] rounded focus:ring-[#8925e2]" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">Notificações no app mobile</span>
                  </label>
                </div>

                <div className="h-[1px] bg-gray-100 dark:bg-gray-700" />

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Lembretes Automáticos</h3>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-gray-700 dark:text-gray-300">Enviar lembretes para signatários:</label>
                    <div className="relative w-64">
                       <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                         <option>A cada 3 dias</option>
                         <option>Diariamente</option>
                         <option>Semanalmente</option>
                         <option>Nunca</option>
                       </select>
                       <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                <button className="px-6 py-2 bg-[#8925e2] text-white rounded-lg font-medium hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20">
                   Salvar Preferências
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Document Preferences Tab */}
        {activeTab === 'documents' && (
          <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Preferências de Documento</h2>
            
            <div className="space-y-6 max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Prazo de Expiração Padrão</label>
                  <div className="relative">
                     <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                       <option>30 dias</option>
                       <option>60 dias</option>
                       <option>90 dias</option>
                       <option>Nunca</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Assinatura Padrão</label>
                  <div className="relative">
                     <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                       <option>Assinatura Principal</option>
                       <option>Rubrica</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                 <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-[#8925e2] rounded focus:ring-[#8925e2]" />
                    <span className="text-gray-700 dark:text-gray-200">Sempre solicitar confirmação antes de enviar envelope</span>
                 </label>
                 
                 <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" className="w-5 h-5 text-[#8925e2] rounded focus:ring-[#8925e2]" />
                    <span className="text-gray-700 dark:text-gray-200">Adicionar marca d'água aos documentos assinados</span>
                 </label>
              </div>

              <div className="space-y-2 pt-4">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Idioma dos E-mails Enviados</label>
                <div className="relative">
                   <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                     <option>Português (Brasil)</option>
                     <option>English (US)</option>
                     <option>Español</option>
                   </select>
                   <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button className="px-6 py-2 bg-[#8925e2] text-white rounded-lg font-medium hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20">
                 Salvar Configurações
              </button>
            </div>
          </div>
        )}

        {/* Region Tab */}
        {activeTab === 'region' && (
          <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Idioma e Região</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Idioma da Interface</label>
                  <div className="relative">
                     <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                       <option>Português (Brasil)</option>
                       <option>English (US)</option>
                     </select>
                     <Globe size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Fuso Horário</label>
                  <div className="relative">
                     <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                       <option>(GMT-3) Brasília</option>
                       <option>(GMT-4) Manaus</option>
                       <option>(GMT-0) London</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Formato de Data</label>
                  <div className="relative">
                     <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                       <option>DD/MM/YYYY</option>
                       <option>MM/DD/YYYY</option>
                       <option>YYYY-MM-DD</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Formato de Hora</label>
                  <div className="relative">
                     <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                       <option>24 horas</option>
                       <option>12 horas (AM/PM)</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Moeda</label>
                  <div className="relative">
                     <select className="w-full appearance-none px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pr-10 focus:ring-2 focus:ring-[#8925e2] outline-none">
                       <option>Real (R$)</option>
                       <option>Dólar (USD)</option>
                       <option>Euro (€)</option>
                     </select>
                     <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button className="px-6 py-2 bg-[#8925e2] text-white rounded-lg font-medium hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20">
                 Salvar Configurações
              </button>
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === 'appearance' && (
          <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Aparência</h2>

             <div className="space-y-8 max-w-2xl">
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Tema</h3>
                   <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-transparent hover:border-[#8925e2] transition-all">
                         <input type="radio" name="theme" className="w-5 h-5 text-[#8925e2] focus:ring-[#8925e2]" defaultChecked />
                         <span className="font-medium">Claro</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-transparent hover:border-[#8925e2] transition-all">
                         <input type="radio" name="theme" className="w-5 h-5 text-[#8925e2] focus:ring-[#8925e2]" />
                         <span className="font-medium">Escuro</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl border border-transparent hover:border-[#8925e2] transition-all">
                         <input type="radio" name="theme" className="w-5 h-5 text-[#8925e2] focus:ring-[#8925e2]" />
                         <span className="font-medium">Automático (baseado no sistema)</span>
                      </label>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Densidade da Interface</h3>
                   <div className="flex gap-4">
                      {['Compacto', 'Padrão', 'Confortável'].map((density, i) => (
                         <label key={density} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="density" defaultChecked={i===1} className="w-4 h-4 text-[#8925e2] focus:ring-[#8925e2]" />
                            <span className="text-gray-700 dark:text-gray-300">{density}</span>
                         </label>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Cor de Destaque</h3>
                   <div className="flex gap-4">
                      <button className="w-10 h-10 rounded-full bg-[#8925e2] ring-2 ring-offset-2 ring-[#8925e2]"></button>
                      <button className="w-10 h-10 rounded-full bg-blue-600 hover:scale-110 transition-transform"></button>
                      <button className="w-10 h-10 rounded-full bg-green-600 hover:scale-110 transition-transform"></button>
                      <button className="w-10 h-10 rounded-full bg-red-600 hover:scale-110 transition-transform"></button>
                   </div>
                </div>
             </div>

             <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button className="px-6 py-2 bg-[#8925e2] text-white rounded-lg font-medium hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20">
                 Aplicar Mudanças
              </button>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="p-8 space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
             <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacidade e Dados</h2>

             <div className="space-y-8">
                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Gerenciar Seus Dados</h3>
                   
                   <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <div>
                         <p className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                           <Download size={18} /> Baixar Meus Dados
                         </p>
                         <p className="text-sm text-gray-500 mt-1">Exportar uma cópia de todos os seus dados pessoais e documentos</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                         Baixar
                      </button>
                   </div>

                   <div className="p-4 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-xl flex items-center justify-between">
                      <div>
                         <p className="font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                           <Trash2 size={18} /> Solicitar Exclusão de Conta
                         </p>
                         <p className="text-sm text-red-600/70 dark:text-red-400/70 mt-1">Excluir permanentemente sua conta e todos os dados associados</p>
                      </div>
                      <button className="px-4 py-2 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">
                         Excluir
                      </button>
                   </div>
                </div>

                <div className="h-[1px] bg-gray-100 dark:bg-gray-700" />

                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Cookies e Rastreamento</h3>
                   <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                         <div className="flex items-center gap-3">
                            <Cookie size={18} className="text-gray-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-200">Cookies essenciais (obrigatórios)</span>
                         </div>
                         <input type="checkbox" checked disabled className="w-5 h-5 text-gray-400 rounded" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
                         <div className="flex items-center gap-3">
                            <Cookie size={18} className="text-[#8925e2]" />
                            <span className="font-medium text-gray-700 dark:text-gray-200">Cookies de desempenho</span>
                         </div>
                         <input type="checkbox" defaultChecked className="w-5 h-5 text-[#8925e2] rounded focus:ring-[#8925e2]" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
                         <div className="flex items-center gap-3">
                            <Cookie size={18} className="text-[#8925e2]" />
                            <span className="font-medium text-gray-700 dark:text-gray-200">Cookies de marketing</span>
                         </div>
                         <input type="checkbox" className="w-5 h-5 text-[#8925e2] rounded focus:ring-[#8925e2]" />
                      </label>
                   </div>
                   <button className="text-sm text-[#8925e2] font-medium hover:underline pl-3">Gerenciar Preferências de Cookies</button>
                </div>

                <div className="h-[1px] bg-gray-100 dark:bg-gray-700" />

                <div className="space-y-4">
                   <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Visibilidade do Perfil</h3>
                   <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="w-5 h-5 text-[#8925e2] rounded focus:ring-[#8925e2]" />
                      <span className="text-gray-700 dark:text-gray-200">Permitir que outros usuários vejam meu perfil ao compartilhar docs</span>
                   </label>
                </div>

             </div>

             <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700 flex justify-end">
              <button className="px-6 py-2 bg-[#8925e2] text-white rounded-lg font-medium hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20">
                 Salvar Configurações
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
