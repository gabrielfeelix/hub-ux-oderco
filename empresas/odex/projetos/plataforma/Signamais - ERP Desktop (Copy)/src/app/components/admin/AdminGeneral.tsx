import React, { useState } from 'react';
import { Building, Mail, Globe, Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

export function AdminGeneral() {
  const [formData, setFormData] = useState({
    companyName: 'Imobiliária Signa',
    cnpj: '12.345.678/0001-90',
    email: 'contato@imob.com',
    website: 'www.imobiliariasigna.com.br',
    timezone: 'America/Sao_Paulo'
  });

  const handleSave = () => {
    toast.success("Configurações gerais salvas com sucesso!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Administração</h2>
            <div className="flex flex-col gap-2">
               <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Configurações Gerais</h1>
               <p className="text-gray-500 dark:text-gray-400">Gerencie as informações principais da sua organização.</p>
            </div>
         </div>
         <button 
           onClick={handleSave}
           className="px-6 py-2 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
        >
           <Save size={18} /> Salvar Alterações
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Company Info */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                 <Building size={20} className="text-[#8925e2]" />
                 Informações da Empresa
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nome da Organização</label>
                    <input 
                       type="text" 
                       value={formData.companyName}
                       onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                       className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">CNPJ</label>
                    <input 
                       type="text" 
                       value={formData.cnpj}
                       onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                       className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                    />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email de Contato</label>
                    <div className="relative">
                       <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                       />
                    </div>
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Website</label>
                    <div className="relative">
                       <Globe size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                       <input 
                          type="text" 
                          value={formData.website}
                          onChange={(e) => setFormData({...formData, website: e.target.value})}
                          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                       />
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Localização e Fuso Horário</h3>
              <div className="space-y-1.5">
                 <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Fuso Horário Padrão</label>
                 <select 
                    value={formData.timezone}
                    onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                 >
                    <option value="America/Sao_Paulo">Horário de Brasília (GMT-03:00)</option>
                    <option value="America/Manaus">Horário do Amazonas (GMT-04:00)</option>
                    <option value="America/Noronha">Fernando de Noronha (GMT-02:00)</option>
                 </select>
              </div>
           </div>
        </div>

        {/* Branding */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm space-y-4">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">Identidade Visual</h3>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Logotipo</label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                       <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-[#8925e2] group-hover:scale-110 transition-transform">
                          <Upload size={20} />
                       </div>
                       <p className="text-sm text-gray-500 font-medium">Clique para fazer upload</p>
                       <p className="text-xs text-gray-400">PNG, JPG até 2MB</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
