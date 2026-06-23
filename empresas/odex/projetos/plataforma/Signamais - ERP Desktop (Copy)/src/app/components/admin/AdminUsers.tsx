import React, { useState } from 'react';
import { Search, Plus, MoreVertical, Shield, Mail, User, CheckCircle, XCircle, ShoppingBag, CreditCard, Trash2, Edit, Ban, AlertTriangle, X } from 'lucide-react';
import { toast } from 'sonner';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Gestor' | 'Corretor' | 'Atendente';
  status: 'Ativo' | 'Inativo';
}

const MOCK_USERS: UserData[] = [
  { id: '1', name: 'Maria Silva', email: 'maria@imob.com', role: 'Admin', status: 'Ativo' },
  { id: '2', name: 'João Pedro', email: 'joao@imob.com', role: 'Corretor', status: 'Ativo' },
  { id: '3', name: 'Ana Costa', email: 'ana@imob.com', role: 'Atendente', status: 'Ativo' },
  { id: '4', name: 'Carlos', email: 'carlos@imob.com', role: 'Corretor', status: 'Inativo' },
];

interface AdminUsersProps {
  initialAction?: 'add-user';
}

export function AdminUsers({ initialAction }: AdminUsersProps) {
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [userLimit, setUserLimit] = useState(5);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // Edit/Add State
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Corretor' });

  // Handle Initial Action
  React.useEffect(() => {
    if (initialAction === 'add-user') {
       handleOpenAdd();
    }
    // No else here to avoid closing if it was manually opened, 
    // but maybe we should reset if initialAction becomes undefined? 
    // Usually initialAction is a one-time trigger from parent.
  }, [initialAction]);
  
  // Buy Modal State
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const PRICE_PER_USER = 49.00;

  // Confirmation Modal State
  const [confirmationModal, setConfirmationModal] = useState<{
    isOpen: boolean;
    type: 'delete' | 'toggle-status';
    user: UserData | null;
  }>({
    isOpen: false,
    type: 'delete',
    user: null
  });

  const handleOpenAdd = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Corretor' });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (user: UserData) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsAddModalOpen(true);
    setOpenMenuId(null);
  };

  const handleSaveUser = () => {
    if (!formData.name || !formData.email) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    if (editingUser) {
      // Update existing
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData, role: formData.role as any } : u));
      toast.success("Usuário atualizado com sucesso");
    } else {
      // Add new
      if (users.length >= userLimit) {
        toast.error("Limite de usuários atingido");
        return;
      }
      const newUser: UserData = {
        id: Math.random().toString(),
        name: formData.name,
        email: formData.email,
        role: formData.role as any,
        status: 'Ativo'
      };
      setUsers([...users, newUser]);
      toast.success("Usuário adicionado com sucesso");
    }
    setIsAddModalOpen(false);
  };

  const handleDeleteUser = (user: UserData) => {
    setConfirmationModal({
      isOpen: true,
      type: 'delete',
      user: user
    });
    setOpenMenuId(null);
  };

  const handleToggleStatus = (user: UserData) => {
    setConfirmationModal({
      isOpen: true,
      type: 'toggle-status',
      user: user
    });
    setOpenMenuId(null);
  };

  const confirmAction = () => {
    if (!confirmationModal.user) return;
    
    if (confirmationModal.type === 'delete') {
      setUsers(users.filter(u => u.id !== confirmationModal.user!.id));
      toast.success("Usuário removido");
    } else {
      setUsers(users.map(u => u.id === confirmationModal.user!.id ? { ...u, status: u.status === 'Ativo' ? 'Inativo' : 'Ativo' } : u));
      toast.success(`Usuário ${confirmationModal.user.status === 'Ativo' ? 'inativado' : 'ativado'} com sucesso`);
    }
    
    setConfirmationModal({ isOpen: false, type: 'delete', user: null });
  };

  const handleBuyUsers = () => {
    if (!termsAccepted) return;
    setUserLimit(prev => prev + buyQuantity);
    setIsBuyModalOpen(false);
    setBuyQuantity(1);
    setTermsAccepted(false);
    toast.success(`${buyQuantity} licença(s) adicionada(s) com sucesso!`);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usagePercentage = (users.length / userLimit) * 100;
  const isLimitReached = users.length >= userLimit;

  return (
    <div className="space-y-6" onClick={() => setOpenMenuId(null)}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
           <h2 className="text-[#8925e2] font-bold uppercase text-sm tracking-wider">Administração</h2>
           <div className="flex flex-col gap-2">
              <h1 className="text-[32px] font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif] leading-none tracking-tight">Usuários</h1>
              <p className="text-gray-500 dark:text-gray-400">Gerencie o acesso e as funções da sua equipe.</p>
           </div>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Usage Indicator */}
           <div className="flex flex-col items-end mr-2">
              <span className="text-xs font-bold text-gray-500 mb-1">
                 {users.length} de {userLimit} usuários utilizados
              </span>
              <div className="w-32 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                 <div 
                   className={`h-full rounded-full transition-all duration-500 ${isLimitReached ? 'bg-red-500' : 'bg-[#8925e2]'}`} 
                   style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                 />
              </div>
           </div>

           {isLimitReached ? (
             <button 
               onClick={() => setIsBuyModalOpen(true)}
               className="px-4 py-2 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 flex items-center gap-2 animate-in pulse"
             >
               <ShoppingBag size={18} /> Comprar Usuário Extra
             </button>
           ) : (
             <button 
               onClick={handleOpenAdd}
               className="px-4 py-2 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
             >
               <Plus size={18} /> Adicionar Usuário
             </button>
           )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-center gap-4">
         <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
               type="text" 
               placeholder="Buscar por nome ou email..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full bg-gray-50 dark:bg-gray-700 pl-10 pr-4 py-2 rounded-lg border-none outline-none focus:ring-2 focus:ring-[#8925e2]/50 transition-all text-sm"
            />
         </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-visible">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 font-medium">Nome</th>
              <th className="px-6 py-3 font-medium">Email</th>
              <th className="px-6 py-3 font-medium">Função</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-xs uppercase">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                   </div>
                   <span className="font-bold text-gray-900 dark:text-white">{user.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                <td className="px-6 py-4">
                   <span className={`px-2 py-1 rounded-lg text-xs font-bold border ${
                      user.role === 'Admin' ? 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-900/30' :
                      user.role === 'Gestor' ? 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30' :
                      'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-700/50 dark:text-gray-300 dark:border-gray-600'
                   }`}>
                      {user.role}
                   </span>
                </td>
                <td className="px-6 py-4">
                   <span className={`flex items-center gap-1.5 text-xs font-bold ${
                      user.status === 'Ativo' ? 'text-green-600' : 'text-gray-400'
                   }`}>
                      {user.status === 'Ativo' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                      {user.status}
                   </span>
                </td>
                <td className="px-6 py-4 text-right relative">
                   <button 
                     onClick={(e) => {
                       e.stopPropagation();
                       setOpenMenuId(openMenuId === user.id ? null : user.id);
                     }}
                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                   >
                      <MoreVertical size={16} />
                   </button>

                   {/* Dropdown Menu */}
                   {openMenuId === user.id && (
                     <div className="absolute right-10 top-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-10 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleOpenEdit(user); }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                        >
                           <Edit size={16} /> Editar
                        </button>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleToggleStatus(user); }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 text-gray-700 dark:text-gray-200"
                        >
                           <Ban size={16} /> {user.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                        </button>
                        <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleDeleteUser(user); }}
                          className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 text-red-600 dark:text-red-400"
                        >
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

      {/* Add/Edit User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                  {editingUser ? 'Editar Usuário' : 'Adicionar Usuário'}
                </h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
             </div>
             <div className="p-6 space-y-4">
                <div className="space-y-1.5">
                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Nome completo *</label>
                   <input 
                      type="text" 
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                      placeholder="Ex: Maria Silva"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email *</label>
                   <input 
                      type="email" 
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                      placeholder="Ex: maria@imob.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                   />
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Função *</label>
                   <select 
                      className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all appearance-none"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                   >
                      <option value="Admin">Admin (acesso total)</option>
                      <option value="Gestor">Gestor (relatórios + usuários)</option>
                      <option value="Corretor">Corretor (enviar + modelos)</option>
                      <option value="Atendente">Atendente (apenas enviar)</option>
                   </select>
                </div>
                {!editingUser && (
                  <label className="flex items-center gap-2 p-3 border border-gray-100 dark:border-gray-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                     <input type="checkbox" defaultChecked className="accent-[#8925e2] w-4 h-4" />
                     <span className="text-sm text-gray-600 dark:text-gray-300">Enviar email de convite</span>
                  </label>
                )}
             </div>
             <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-800/50">
                <button 
                   onClick={() => setIsAddModalOpen(false)}
                   className="px-4 py-2 text-gray-500 font-bold hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                   Cancelar
                </button>
                <button 
                   onClick={handleSaveUser}
                   className="px-6 py-2 bg-[#8925e2] text-white font-bold rounded-lg hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20"
                >
                   {editingUser ? 'Salvar Alterações' : 'Adicionar'}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Buy User Modal */}
      {isBuyModalOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
               <div className="p-6 text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 text-[#8925e2] rounded-full flex items-center justify-center mx-auto mb-4">
                     <ShoppingBag size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Comprar Licenças Extras</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                     Você atingiu o limite do seu plano. Adicione mais licenças para continuar crescendo sua equipe.
                  </p>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 mb-6">
                     <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300">Quantidade de licenças</span>
                        <div className="flex items-center gap-3">
                           <button 
                             onClick={() => setBuyQuantity(Math.max(1, buyQuantity - 1))}
                             className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50"
                           >
                              -
                           </button>
                           <span className="font-bold w-4 text-center">{buyQuantity}</span>
                           <button 
                             onClick={() => setBuyQuantity(buyQuantity + 1)}
                             className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-50"
                           >
                              +
                           </button>
                        </div>
                     </div>
                     <div className="h-[1px] bg-gray-200 dark:bg-gray-700 mb-4" />
                     <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Valor mensal adicional</span>
                        <span className="text-xl font-bold text-[#8925e2]">
                           {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(buyQuantity * PRICE_PER_USER)}
                           <span className="text-xs text-gray-400 font-normal ml-1">/mês</span>
                        </span>
                     </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="mb-6 flex items-start gap-2 text-left">
                     <input 
                        type="checkbox" 
                        id="terms" 
                        className="mt-1 accent-[#8925e2] w-4 h-4 cursor-pointer"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                     />
                     <label htmlFor="terms" className="text-xs text-gray-500 dark:text-gray-400 cursor-pointer">
                        Declaro que li e concordo com os <span className="text-[#8925e2] hover:underline">Termos de Uso</span> e autorizo a cobrança mensal recorrente no cartão cadastrado.
                     </label>
                  </div>

                  <div className="flex gap-3">
                     <button 
                        onClick={() => setIsBuyModalOpen(false)}
                        className="flex-1 py-3 text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                     >
                        Cancelar
                     </button>
                     <button 
                        onClick={handleBuyUsers}
                        disabled={!termsAccepted}
                        className={`flex-1 py-3 font-bold rounded-xl transition-all shadow-lg ${
                           termsAccepted 
                             ? 'bg-[#8925e2] text-white hover:bg-[#7a1fd0] shadow-purple-500/20' 
                             : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none dark:bg-gray-700 dark:text-gray-500'
                        }`}
                     >
                        Confirmar Compra
                     </button>
                  </div>
               </div>
            </div>
         </div>
      )}
      {/* Confirmation Modal */}
      {confirmationModal.isOpen && confirmationModal.user && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
           <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-6 text-center">
                 <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    confirmationModal.type === 'delete' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                 }`}>
                    <AlertTriangle size={28} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {confirmationModal.type === 'delete' ? 'Excluir Usuário?' : confirmationModal.user.status === 'Ativo' ? 'Inativar Usuário?' : 'Ativar Usuário?'}
                 </h3>
                 <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                    {confirmationModal.type === 'delete' 
                       ? `Tem certeza que deseja remover ${confirmationModal.user.name}? Esta ação não pode ser desfeita.`
                       : `Deseja realmente alterar o status de ${confirmationModal.user.name}?`
                    }
                 </p>
                 
                 <div className="flex gap-3">
                    <button 
                       onClick={() => setConfirmationModal({ isOpen: false, type: 'delete', user: null })}
                       className="flex-1 py-2.5 text-gray-700 font-bold hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                       Cancelar
                    </button>
                    <button 
                       onClick={confirmAction}
                       className={`flex-1 py-2.5 text-white font-bold rounded-xl transition-colors shadow-lg ${
                          confirmationModal.type === 'delete' 
                             ? 'bg-red-600 hover:bg-red-700 shadow-red-500/20' 
                             : 'bg-[#8925e2] hover:bg-[#7a1fd0] shadow-purple-500/20'
                       }`}
                    >
                       Confirmar
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
