import React, { useState } from 'react';
import { Check, X, AlertTriangle, Save } from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  id: string;
  name: string;
}

interface RolePermissions {
  [role: string]: {
    [permissionId: string]: 'allow' | 'deny' | 'restricted';
  };
}

const PERMISSIONS: Permission[] = [
  { id: 'send_envelope', name: 'Enviar envelopes' },
  { id: 'use_template', name: 'Usar modelos' },
  { id: 'create_template', name: 'Criar modelos' },
  { id: 'edit_template', name: 'Editar modelos' },
  { id: 'view_reports', name: 'Ver relatórios' },
  { id: 'manage_users', name: 'Gerenciar usuários' },
  { id: 'change_settings', name: 'Alterar configurações' },
  { id: 'view_credits', name: 'Ver consumo de créditos' },
  { id: 'cancel_envelope', name: 'Cancelar envelopes' },
];

const ROLES = ['Admin', 'Gestor', 'Corretor', 'Atendente'];

const INITIAL_STATE: RolePermissions = {
  Admin: {
    send_envelope: 'allow', use_template: 'allow', create_template: 'allow', edit_template: 'allow',
    view_reports: 'allow', manage_users: 'allow', change_settings: 'allow', view_credits: 'allow', cancel_envelope: 'allow'
  },
  Gestor: {
    send_envelope: 'allow', use_template: 'allow', create_template: 'allow', edit_template: 'allow',
    view_reports: 'allow', manage_users: 'allow', change_settings: 'deny', view_credits: 'allow', cancel_envelope: 'allow'
  },
  Corretor: {
    send_envelope: 'allow', use_template: 'allow', create_template: 'allow', edit_template: 'allow',
    view_reports: 'restricted', manage_users: 'deny', change_settings: 'deny', view_credits: 'deny', cancel_envelope: 'restricted'
  },
  Atendente: {
    send_envelope: 'allow', use_template: 'allow', create_template: 'deny', edit_template: 'deny',
    view_reports: 'deny', manage_users: 'deny', change_settings: 'deny', view_credits: 'deny', cancel_envelope: 'restricted'
  }
};

export function AdminPermissions() {
  const [permissions, setPermissions] = useState<RolePermissions>(INITIAL_STATE);
  const [hasChanges, setHasChanges] = useState(false);

  const togglePermission = (role: string, permissionId: string) => {
    setPermissions(prev => {
      const current = prev[role][permissionId];
      let next: 'allow' | 'deny' | 'restricted';
      
      if (current === 'allow') next = 'restricted';
      else if (current === 'restricted') next = 'deny';
      else next = 'allow';
      
      return {
        ...prev,
        [role]: {
          ...prev[role],
          [permissionId]: next
        }
      };
    });
    setHasChanges(true);
  };

  const handleSave = () => {
    toast.success("Permissões atualizadas com sucesso!");
    setHasChanges(false);
  };

  const renderIcon = (status: 'allow' | 'deny' | 'restricted') => {
    if (status === 'allow') return <Check size={20} className="text-green-500 mx-auto" />;
    if (status === 'deny') return <X size={20} className="text-red-500 mx-auto" />;
    return <AlertTriangle size={20} className="text-yellow-500 mx-auto" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
         <div className="flex flex-col gap-1">
            <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Administração</h2>
            <div className="flex flex-col gap-2">
               <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Permissões</h1>
               <p className="text-gray-500 dark:text-gray-400">Defina o que cada função pode fazer no sistema.</p>
            </div>
         </div>
         {hasChanges && (
            <button 
               onClick={handleSave}
               className="px-6 py-2 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2 animate-in fade-in"
            >
               <Save size={18} /> Salvar Alterações
            </button>
         )}
      </div>

      {/* Matrix Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
         <table className="w-full text-center">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 uppercase text-xs">
               <tr>
                  <th className="px-6 py-4 font-bold text-left text-gray-900 dark:text-white bg-gray-100/50 dark:bg-gray-800">Permissão</th>
                  {ROLES.map(role => (
                     <th key={role} className="px-4 py-4 font-bold">{role}</th>
                  ))}
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
               {PERMISSIONS.map(perm => (
                  <tr key={perm.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                     <td className="px-6 py-4 text-left font-medium text-gray-700 dark:text-gray-300">{perm.name}</td>
                     {ROLES.map(role => (
                        <td 
                           key={`${role}-${perm.id}`} 
                           className="px-4 py-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors"
                           onClick={() => togglePermission(role, perm.id)}
                           title="Clique para alternar (Permitido > Restrito > Negado)"
                        >
                           {renderIcon(permissions[role][perm.id])}
                        </td>
                     ))}
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 justify-center bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Check size={16} className="text-green-500" />
            <span>Permitido</span>
         </div>
         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <X size={16} className="text-red-500" />
            <span>Negado</span>
         </div>
         <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <AlertTriangle size={16} className="text-yellow-500" />
            <span>Restrito (só os próprios)</span>
         </div>
      </div>
    </div>
  );
}
