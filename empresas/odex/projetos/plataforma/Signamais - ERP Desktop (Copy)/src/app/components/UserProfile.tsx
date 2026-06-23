import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Grid, 
  CreditCard, 
  PenTool, 
  Award, 
  Globe, 
  Camera, 
  Key, 
  Smartphone, 
  Mail, 
  ChevronDown,
  Trash2,
  Edit2,
  Download,
  Plus,
  Check,
  Search,
  Zap,
  Slack,
  HardDrive,
  FileBadge,
  AlertTriangle,
  Clock,
  LogOut,
  Fingerprint,
  MapPin,
  Calendar,
  Briefcase
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CreateSignatureModal } from './CreateSignatureModal';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type ProfileTab = 'profile' | 'security' | 'apps' | 'wallet' | 'signatures' | 'badges' | 'language';

export interface UserProfileProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function UserProfile({ activeTab: externalActiveTab, onTabChange }: UserProfileProps) {
  const [internalActiveTab, setInternalActiveTab] = useState<string>('profile');
  
  const activeTab = externalActiveTab || internalActiveTab;
  
  const handleTabChange = (tab: string) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };
  
  const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);

  // Mock Data
  const [signatures, setSignatures] = useState([
    { 
      id: '1', 
      name: 'Gabriel Barbosa', 
      initials: 'GB', 
      code: 'da0a95f4-d3da-42...', 
      isDefault: true, 
      date: '04/02/2026' 
    }
  ]);

  const apps = [
    { id: 'google', name: 'Google Drive', icon: <HardDrive size={24} className="text-blue-500" />, connected: true, email: 'gab.feelix@gmail.com' },
    { id: 'dropbox', name: 'Dropbox', icon: <HardDrive size={24} className="text-blue-700" />, connected: false },
    { id: 'slack', name: 'Slack', icon: <Slack size={24} className="text-purple-500" />, connected: true, email: 'gabriel.work' },
    { id: 'zapier', name: 'Zapier', icon: <Zap size={24} className="text-orange-500" />, connected: false },
  ];

  const certificates = [
    { id: '1', name: 'ICP-Brasil A1', issuer: 'Soluti', validUntil: '12/2026', type: 'Cloud', status: 'active' },
    { id: '2', name: 'eIDAS Qualified', issuer: 'DocuSign', validUntil: '05/2025', type: 'Cloud', status: 'expiring' },
  ];

  const badges = [
    { id: '1', name: 'Identidade Verificada', icon: <Fingerprint size={24} />, color: 'bg-green-100 text-green-600', date: 'Jan 2024' },
    { id: '2', name: 'Email Confirmado', icon: <Mail size={24} />, color: 'bg-blue-100 text-blue-600', date: 'Dez 2023' },
    { id: '3', name: '2FA Ativado', icon: <Shield size={24} />, color: 'bg-purple-100 text-purple-600', date: 'Fev 2024' },
    { id: '4', name: 'Power User', icon: <Zap size={24} />, color: 'bg-yellow-100 text-yellow-600', date: 'Em breve' },
  ];

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    signatureId: string | null;
  }>({
    isOpen: false,
    signatureId: null
  });

  const handleDeleteSignature = (id: string) => {
    setDeleteConfirmation({
      isOpen: true,
      signatureId: id
    });
    setOpenActionMenuId(null);
  };

  const confirmDeleteSignature = () => {
    if (deleteConfirmation.signatureId) {
      setSignatures(signatures.filter(sig => sig.id !== deleteConfirmation.signatureId));
      toast.success("Assinatura excluída com sucesso");
    }
    setDeleteConfirmation({ isOpen: false, signatureId: null });
  };

  const toggleActionMenu = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  React.useEffect(() => {
    const handleClick = () => setOpenActionMenuId(null);
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-500 max-w-[1600px] mx-auto w-full pb-20 p-6">
       
       <CreateSignatureModal 
         isOpen={isSignatureModalOpen} 
         onClose={() => setIsSignatureModalOpen(false)} 
         onSave={(data) => {
            setSignatures([...signatures, { 
              id: Date.now().toString(), 
              name: data.typedName || 'Assinatura Nova', 
              initials: 'AN', 
              code: 'new-code-' + Date.now(), 
              isDefault: data.isDefault, 
              date: new Date().toLocaleDateString() 
            }]);
            setIsSignatureModalOpen(false);
         }}
       />

       {/* Header */}
       <div className="flex flex-col gap-2 border-b border-gray-100 dark:border-gray-800 pb-6">
         <h1 className="text-4xl font-bold font-[Lufga,sans-serif] text-gray-900 dark:text-white tracking-tight">Meu Perfil</h1>
         <p className="text-gray-500 dark:text-gray-400 text-lg">Gerencie suas informações pessoais, segurança e preferências.</p>
       </div>

       {/* Delete Confirmation Modal */}
       {deleteConfirmation.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
             <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 text-center">
                   <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                      <Trash2 size={28} />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Excluir Assinatura?</h3>
                   <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                      Tem certeza que deseja remover esta assinatura? Esta ação não pode ser desfeita.
                   </p>
                   
                   <div className="flex gap-3">
                      <button 
                         onClick={() => setDeleteConfirmation({ isOpen: false, signatureId: null })}
                         className="flex-1 py-2.5 text-gray-700 font-bold hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 rounded-xl transition-colors"
                      >
                         Cancelar
                      </button>
                      <button 
                         onClick={confirmDeleteSignature}
                         className="flex-1 py-2.5 text-white font-bold rounded-xl transition-colors shadow-lg bg-red-600 hover:bg-red-700 shadow-red-500/20"
                      >
                         Excluir
                      </button>
                   </div>
                </div>
             </div>
          </div>
       )}

       {/* Content Area */}
       <div className="flex-1 min-w-0 w-full space-y-8">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                   {/* Avatar Section */}
                   <SectionCard title="Imagem de perfil" action="ATUALIZAR">
                      <div className="flex items-center gap-6 py-2">
                         <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-3xl font-bold text-[#8925e2] border-4 border-white dark:border-gray-700 shadow-md overflow-hidden font-['Lufga',sans-serif]">
                               GB
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-[1px]">
                               <Camera className="text-white drop-shadow-md" size={24} />
                            </div>
                         </div>
                         <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Esta imagem será visível para todos os usuários.</p>
                            <div className="flex gap-3 mt-1">
                               <button className="text-xs text-[#8925e2] font-bold hover:underline">Alterar foto</button>
                               <button className="text-xs text-red-500 font-bold hover:underline">Remover</button>
                            </div>
                         </div>
                      </div>
                   </SectionCard>

                   {/* Personal Info Group */}
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SectionCard title="Nome" action="ATUALIZAR">
                          <FancyInput 
                             label="Nome Completo" 
                             value="Gabriel Barbosa" 
                             icon={<User size={18} />} 
                          />
                      </SectionCard>

                      <SectionCard title="Email" action="ATUALIZAR">
                          <FancyInput 
                             label="Endereço de correio eletrónico" 
                             value="gab.feelix@gmail.com" 
                             icon={<Mail size={18} />} 
                             disabled
                          />
                      </SectionCard>
                   </div>

                   {/* Contact Info Section */}
                   <SectionCard title="Informações de contacto" action="ATUALIZAR">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 py-2">
                         <FancyInput label="Empresa" value="Imobiliária Viktor Krum" icon={<Briefcase size={18} />} />
                         <FancyInput label="Cargo" value="Corretor" icon={<Award size={18} />} />
                         <FancyInput label="Morada" value="Rua X, 123" icon={<MapPin size={18} />} />
                         <FancyInput label="Telefone" value="(44) 99999-9999" icon={<Smartphone size={18} />} />
                      </div>
                   </SectionCard>
                </div>
             )}

             {/* SECURITY TAB */}
             {activeTab === 'security' && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                   <SectionCard title="Segurança da Conta">
                      <div className="flex flex-col gap-6">
                         <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700/50">
                            <div className="flex flex-col gap-1">
                               <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">E-mail de Login</span>
                               <span className="font-bold text-gray-900 dark:text-white text-lg">gab.feelix@gmail.com</span>
                            </div>
                            <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">Verificado</span>
                         </div>
                         
                         <div className="h-[1px] bg-gray-100 dark:bg-gray-700" />
                         
                         <div className="flex items-center justify-between group">
                            <div className="flex items-start gap-4">
                               <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-[#8925e2]">
                                  <Key size={20} />
                               </div>
                               <div>
                                  <h4 className="font-bold text-gray-900 dark:text-white">Palavra-passe</h4>
                                  <p className="text-sm text-gray-500">Última alteração há 3 meses</p>
                               </div>
                            </div>
                            <button className="text-xs font-bold text-[#8925e2] bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 px-4 py-2 rounded-lg transition-colors uppercase tracking-wide">
                              ALTERAR
                            </button>
                         </div>
                         
                         <div className="h-[1px] bg-gray-100 dark:bg-gray-700" />
                         
                         <div className="flex items-center justify-between">
                            <div className="flex items-start gap-4">
                               <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                  <Shield size={20} />
                               </div>
                               <div>
                                  <h4 className="font-bold text-gray-900 dark:text-white">Códigos de Recuperação</h4>
                                  <p className="text-sm text-gray-500">Códigos para acesso de emergência</p>
                               </div>
                            </div>
                             <button className="text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors uppercase tracking-wide">
                               MOSTRAR
                             </button>
                         </div>
                      </div>
                   </SectionCard>

                   <SectionCard title="Início de sessão sem palavra-passe" action="CONFIGURAR">
                      <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50/50 to-transparent dark:from-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-900/20">
                         <div className="relative inline-flex items-center cursor-pointer mt-1">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#8925e2]"></div>
                         </div>
                         <div className="flex flex-col">
                            <span className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                               Passkeys (Recomendado) <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                            </span>
                            <span className="text-sm text-gray-500 mt-1 max-w-lg">Faça login instantaneamente usando FaceID, TouchID ou o bloqueio de tela do seu dispositivo. Muito mais seguro que senhas.</span>
                         </div>
                      </div>
                   </SectionCard>

                   <SectionCard title="Métodos de Verificação (2FA)">
                      <div className="flex flex-col gap-4">
                         <VerificationMethod icon={<Smartphone size={20} />} label="Número de telefone" value="(44) •••••-9999" action="ALTERAR" />
                         <VerificationMethod icon={<Mail size={20} />} label="E-mail secundário" value="Não configurado" action="ADICIONAR" />
                         <VerificationMethod icon={<Key size={20} />} label="Chave de segurança física" value="0 chaves" action="ADICIONAR" />
                      </div>
                   </SectionCard>
                </div>
             )}

             {/* SIGNATURES TAB */}
             {activeTab === 'signatures' && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                   <div className="flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl shadow-lg text-white">
                      <div>
                        <h2 className="text-2xl font-bold font-['Lufga',sans-serif] mb-1">Minhas Assinaturas</h2>
                        <p className="text-purple-100 text-sm">Gerencie suas assinaturas e rubricas digitais.</p>
                      </div>
                      <button 
                        onClick={() => setIsSignatureModalOpen(true)}
                        className="bg-white text-[#8925e2] hover:bg-purple-50 px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg transition-all transform hover:scale-105"
                      >
                         <Plus size={18} />
                         NOVA ASSINATURA
                      </button>
                   </div>

                   <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-visible shadow-sm">
                      <table className="w-full">
                         <thead className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700">
                            <tr>
                               <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tl-2xl">Assinatura</th>
                               <th className="text-left py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Rubricar</th>
                               <th className="text-right py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider rounded-tr-2xl">Ações</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {signatures.map(sig => (
                               <tr key={sig.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group">
                                  <td className="py-6 px-6 align-top">
                                     <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 mb-2">
                                           <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Assinado por:</span>
                                           {sig.isDefault && (
                                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-[#8925e2]/10 text-[#8925e2] uppercase tracking-wide border border-[#8925e2]/20">
                                                 <Check size={10} strokeWidth={4} /> Padrão
                                              </span>
                                           )}
                                        </div>
                                        <span className="font-['Dancing_Script',cursive] text-4xl text-gray-900 dark:text-white leading-relaxed">{sig.name}</span>
                                        <span className="text-xs text-gray-400 font-mono mt-1 flex items-center gap-1">
                                           <Fingerprint size={12} /> {sig.code}
                                        </span>
                                     </div>
                                  </td>
                                  <td className="py-6 px-6 align-top">
                                     <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900/50 rounded-xl flex items-center justify-center border border-gray-100 dark:border-gray-700 group-hover:border-gray-300 transition-colors">
                                        <span className="font-['Dancing_Script',cursive] text-3xl text-gray-600 dark:text-gray-300">{sig.initials}</span>
                                     </div>
                                  </td>
                                  <td className="py-6 px-6 text-right align-top relative">
                                     <button 
                                       onClick={(e) => toggleActionMenu(sig.id, e)}
                                       className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-[#8925e2] bg-gray-100 hover:bg-purple-50 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wide"
                                     >
                                        AÇÕES <ChevronDown size={12} />
                                     </button>

                                     {openActionMenuId === sig.id && (
                                       <div className="absolute right-6 top-16 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-100 flex flex-col text-left">
                                           <button className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                                              <Edit2 size={14} /> Editar
                                           </button>
                                           <button className="px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
                                              <Download size={14} /> Download PNG
                                           </button>
                                           <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1"></div>
                                           <button 
                                             onClick={() => handleDeleteSignature(sig.id)}
                                             className="px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                                           >
                                              <Trash2 size={14} /> Excluir
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

             {/* APPS TAB */}
             {activeTab === 'apps' && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                   <SectionCard title="Aplicações Conectadas" action="VER MAIS">
                      <div className="grid grid-cols-1 gap-4">
                         {apps.map(app => (
                            <div key={app.id} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-700 rounded-xl hover:border-gray-300 dark:hover:border-gray-600 transition-colors bg-white dark:bg-gray-800">
                               <div className="flex items-center gap-4">
                                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-lg flex items-center justify-center">
                                     {app.icon}
                                  </div>
                                  <div>
                                     <h3 className="font-bold text-gray-900 dark:text-white">{app.name}</h3>
                                     <p className="text-sm text-gray-500">
                                       {app.connected ? `Conectado como ${app.email}` : "Não conectado"}
                                     </p>
                                  </div>
                               </div>
                               <div>
                                  {app.connected ? (
                                     <button className="text-sm font-medium text-red-500 border border-red-200 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors">
                                        Desconectar
                                     </button>
                                  ) : (
                                     <button className="text-sm font-medium text-[#8925e2] border border-[#8925e2] hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors">
                                        Conectar
                                     </button>
                                  )}
                               </div>
                            </div>
                         ))}
                      </div>
                   </SectionCard>
                   
                   <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-4 flex gap-3">
                      <AlertTriangle className="text-blue-500 shrink-0" size={20} />
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                         Conectar aplicativos permite que você salve documentos assinados automaticamente em suas pastas na nuvem.
                      </p>
                   </div>
                </div>
             )}

             {/* WALLET TAB */}
             {activeTab === 'wallet' && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                   <SectionCard title="Carteira de Identidade Digital" action="ADICIONAR CERTIFICADO">
                      <div className="grid grid-cols-1 gap-4">
                         {certificates.map(cert => (
                            <div key={cert.id} className="relative overflow-hidden p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm group hover:shadow-md transition-all">
                               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                  <FileBadge size={100} />
                               </div>
                               <div className="flex justify-between items-start relative z-10">
                                  <div className="flex flex-col gap-1">
                                     <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{cert.name}</h3>
                                        {cert.status === 'active' && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Ativo</span>}
                                        {cert.status === 'expiring' && <span className="text-[10px] font-bold bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Expira em breve</span>}
                                     </div>
                                     <p className="text-sm text-gray-500">Emissor: {cert.issuer} • Tipo: {cert.type}</p>
                                  </div>
                                  <div className="text-right">
                                     <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Válido até</p>
                                     <p className="font-mono font-medium text-gray-700 dark:text-gray-300">{cert.validUntil}</p>
                                  </div>
                               </div>
                               <div className="mt-6 flex gap-3 relative z-10">
                                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                                     Detalhes
                                  </button>
                                  <button className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                                     Renovar
                                  </button>
                               </div>
                            </div>
                         ))}
                      </div>
                   </SectionCard>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                         <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center text-[#8925e2] group-hover:scale-110 transition-transform">
                            <CreditCard size={32} />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">Certificado A1 (Arquivo)</h4>
                            <p className="text-sm text-gray-500 mt-1">Faça upload do seu certificado .pfx ou .p12</p>
                         </div>
                      </div>
                      <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                         <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <HardDrive size={32} />
                         </div>
                         <div>
                            <h4 className="font-bold text-gray-900 dark:text-white">Certificado em Nuvem</h4>
                            <p className="text-sm text-gray-500 mt-1">Conecte BirdID, Vidaas, SafeID, etc.</p>
                         </div>
                      </div>
                   </div>
                </div>
             )}

             {/* BADGES TAB */}
             {activeTab === 'badges' && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                   <SectionCard title="Meus Selos e Conquistas">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         {badges.map(badge => (
                            <div key={badge.id} className="flex flex-col items-center text-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
                               <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mb-2", badge.color)}>
                                  {badge.icon}
                               </div>
                               <div>
                                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{badge.name}</h4>
                                  <p className="text-xs text-gray-500 mt-1">{badge.date}</p>
                               </div>
                            </div>
                         ))}
                      </div>
                   </SectionCard>
                </div>
             )}

             {/* LANGUAGE TAB */}
             {activeTab === 'language' && (
                <div className="flex flex-col gap-6 animate-in slide-in-from-right-4 duration-300">
                   <SectionCard title="Idioma" action="ATUALIZAR">
                      <div className="flex flex-col gap-4 py-2">
                         <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                               <Globe size={20} className="text-gray-400" />
                               <span className="text-gray-500 font-medium">Definições de Envio</span>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm">Português (Portugal)</span>
                         </div>
                         <div className="h-[1px] bg-gray-50 dark:bg-gray-700" />
                         <div className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                               <PenTool size={20} className="text-gray-400" />
                               <span className="text-gray-500 font-medium">Idioma de Assinatura</span>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-md text-sm">Português (Portugal)</span>
                         </div>
                      </div>
                   </SectionCard>

                   <div className="h-[1px] bg-gray-200 dark:bg-gray-700" />

                   <SectionCard title="Definições regionais" action="ATUALIZAR">
                      <div className="flex flex-col gap-4 py-2">
                         <FancyInput label="Região" value="Portugal" icon={<MapPin size={16} />} readOnly />
                         <FancyInput label="Fuso horário" value="(UTC-08:00) Hora do Pacífico" icon={<Clock size={16} />} readOnly />
                         <FancyInput label="Formato de data/hora" value="04/02/2026 | 11:18" icon={<Calendar size={16} />} readOnly />
                      </div>
                   </SectionCard>
                </div>
             )}

          </div>
       </div>
  );
}

// Sub-components
function SectionCard({ title, action, children }: { title: string, action?: string, children: React.ReactNode }) {
   return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-8 shadow-sm transition-all hover:shadow-md">
         <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50 dark:border-gray-700/50">
            <h2 className="text-xl font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white flex items-center gap-2">
               {title}
            </h2>
            {action && (
               <button className="text-xs font-bold text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 px-4 py-2 rounded-lg transition-colors uppercase tracking-wide border border-transparent hover:border-purple-100">
                  {action}
               </button>
            )}
         </div>
         {children}
      </div>
   );
}

function FancyInput({ label, value, icon, disabled, readOnly }: { label: string, value: string, icon?: React.ReactNode, disabled?: boolean, readOnly?: boolean }) {
   return (
      <div className="group">
         <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-focus-within:text-[#8925e2] transition-colors">{label}</label>
         <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8925e2] transition-colors">
               {icon}
            </div>
            <input 
               type="text" 
               defaultValue={value} 
               disabled={disabled}
               readOnly={readOnly}
               className={cn(
                  "w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900 focus:bg-white dark:focus:bg-gray-900 focus:ring-2 focus:ring-[#8925e2]/20 focus:border-[#8925e2] outline-none transition-all font-medium text-gray-900 dark:text-white",
                  disabled && "opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800",
                  readOnly && "cursor-default focus:border-gray-200 focus:ring-0"
               )}
            />
         </div>
      </div>
   );
}

function VerificationMethod({ icon, label, value, action }: { icon: React.ReactNode, label: string, value?: string, action: string }) {
   return (
      <div className="flex items-center justify-between group p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-all border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
         <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm">
               {icon}
            </div>
            <div className="flex flex-col">
               <span className="font-bold text-gray-700 dark:text-gray-200 text-sm">{label}</span>
               {value && <span className="text-xs text-gray-400 font-mono mt-0.5">{value}</span>}
            </div>
         </div>
         <button className="text-xs font-bold text-[#8925e2] bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wide opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-200">
            {action}
         </button>
      </div>
   );
}