import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Check, 
  Mail, 
  Calendar, 
  FileText, 
  AlertTriangle, 
  User,
  Filter,
  CheckCircle,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface NotificationsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'document' | 'system' | 'user';
  isRead: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  { 
    id: '1', 
    title: 'Contrato Assinado', 
    description: 'João Silva assinou o contrato #1234. O processo foi concluído com sucesso.', 
    time: '2 min atrás', 
    type: 'success', 
    category: 'document',
    isRead: false 
  },
  { 
    id: '2', 
    title: 'Novo Documento Recebido', 
    description: 'Maria Santos enviou "Proposta Comercial" para sua revisão.', 
    time: '1 hora atrás', 
    type: 'info', 
    category: 'document',
    isRead: false 
  },
  { 
    id: '3', 
    title: 'Aviso de Expiração', 
    description: 'O contrato de locação #5678 expira em 24 horas. Tome uma ação.', 
    time: '5 horas atrás', 
    type: 'warning', 
    category: 'system',
    isRead: false 
  },
  { 
    id: '4', 
    title: 'Manutenção do Sistema', 
    description: 'O sistema passará por manutenção programada neste domingo às 03:00.', 
    time: '1 dia atrás', 
    type: 'info', 
    category: 'system',
    isRead: true 
  },
  { 
    id: '5', 
    title: 'Novo Usuário Adicionado', 
    description: 'Carlos Oliveira foi adicionado à equipe de Vendas.', 
    time: '2 dias atrás', 
    type: 'info', 
    category: 'user',
    isRead: true 
  },
  { 
    id: '6', 
    title: 'Falha no Envio', 
    description: 'Não foi possível entregar o e-mail para contato@empresa.com.', 
    time: '3 dias atrás', 
    type: 'error', 
    category: 'system',
    isRead: true 
  },
];

export function NotificationsSidebar({ isOpen, onClose }: NotificationsSidebarProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread'>('all');
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.isRead;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string, category: string) => {
    if (category === 'document') return <FileText size={18} />;
    if (category === 'user') return <User size={18} />;
    if (type === 'warning') return <AlertTriangle size={18} />;
    if (type === 'error') return <AlertTriangle size={18} />;
    if (category === 'system') return <Bell size={18} />;
    return <Bell size={18} />;
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'warning': return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'error': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]"
          />

          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-[70] flex flex-col border-l border-gray-100 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-xl text-[#8925e2] dark:text-purple-300">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold font-['Lufga',sans-serif] text-gray-900 dark:text-white">Notificações</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fique por dentro das atualizações</p>
                  </div>
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                  <X size={20} />
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2">
                <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg flex-1">
                    <button 
                      onClick={() => setActiveFilter('all')}
                      className={cn(
                        "flex-1 py-1.5 text-xs font-bold rounded-md transition-all", 
                        activeFilter === 'all' ? "bg-white dark:bg-gray-700 text-[#8925e2] dark:text-white shadow-sm" : "text-gray-500"
                      )}
                    >
                      Todas
                    </button>
                    <button 
                      onClick={() => setActiveFilter('unread')}
                      className={cn(
                        "flex-1 py-1.5 text-xs font-bold rounded-md transition-all", 
                        activeFilter === 'unread' ? "bg-white dark:bg-gray-700 text-[#8925e2] dark:text-white shadow-sm" : "text-gray-500"
                      )}
                    >
                      Não lidas
                    </button>
                </div>
                <button 
                  onClick={markAllAsRead}
                  className="p-2 text-gray-500 hover:text-[#8925e2] bg-gray-100 dark:bg-gray-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                  title="Marcar todas como lidas"
                >
                  <CheckCircle size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-0 scrollbar-thin scrollbar-thumb-gray-200">
              {filteredNotifications.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredNotifications.map((notif) => (
                    <div 
                      key={notif.id} 
                      className={cn(
                        "p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group relative",
                        !notif.isRead ? "bg-purple-50/30 dark:bg-purple-900/10" : ""
                      )}
                    >
                      <div className="flex gap-4">
                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", getColor(notif.type))}>
                          {getIcon(notif.type, notif.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={cn("text-sm font-bold", !notif.isRead ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-300")}>
                              {notif.title}
                            </h4>
                            <span className="text-[10px] text-gray-400 shrink-0">{notif.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
                            {notif.description}
                          </p>
                          
                          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                             {!notif.isRead && (
                               <button 
                                 onClick={() => markAsRead(notif.id)}
                                 className="text-xs font-bold text-[#8925e2] hover:underline flex items-center gap-1"
                               >
                                 <Check size={12} /> Marcar como lida
                               </button>
                             )}
                             <button 
                               onClick={() => deleteNotification(notif.id)}
                               className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1"
                             >
                               Excluir
                             </button>
                          </div>
                        </div>
                        
                        {!notif.isRead && (
                          <div className="absolute top-6 right-5 w-2 h-2 rounded-full bg-[#8925e2]" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                    <Bell size={24} />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">Tudo limpo!</h3>
                  <p className="text-sm text-gray-500">Você não tem novas notificações no momento.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}