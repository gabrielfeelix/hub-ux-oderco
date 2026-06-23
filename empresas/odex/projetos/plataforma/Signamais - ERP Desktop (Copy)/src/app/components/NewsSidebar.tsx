import React, { useState } from 'react';
import { 
  X, 
  Menu, 
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ExternalLink,
  ArrowLeft,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface NewsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

type ReactionType = 'clap' | 'love' | 'sad';

interface NewsItem {
  id: string;
  title: string;
  category: string;
  time: string;
  content: string;
  image: string;
  reactions: Record<ReactionType, number>;
  userReactions: ReactionType[];
  isExpanded: boolean;
  isRead: boolean;
}

const MOCK_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Seu Signamais móvel: elegante, confortável e envolvente',
    category: 'Colaboração',
    time: '14 horas atrás',
    content: 'Projete seu espaço de trabalho com estilo e conforto! Escolha seu tema e plano de fundo preferidos, personalize o menu inferior com apenas as seções que você precisa e ajuste a frequência das notificações. A nova interface móvel traz uma experiência fluida para assinar documentos em qualquer lugar, com suporte completo a modo escuro e gestos nativos.',
    image: 'https://images.unsplash.com/photo-1547027072-332f09bd6bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBmZWF0dXJlcyUyMHVpfGVufDF8fHx8MTc3MDIzMDgxMXww&ixlib=rb-4.1.0&q=80&w=1080',
    reactions: { clap: 5, love: 12, sad: 21 },
    userReactions: ['sad'],
    isExpanded: false,
    isRead: false
  },
  {
    id: '2',
    title: 'E-mail no aplicativo móvel',
    category: 'Produtividade',
    time: '1 mês atrás',
    content: 'Gerencie seu e-mail corporativo pelo aplicativo móvel do Signamais com a mesma potência do seu computador. Integração total com Gmail e Outlook, permitindo transformar emails em tarefas ou documentos para assinatura com um único clique.',
    image: '',
    reactions: { clap: 8, love: 4, sad: 2 },
    userReactions: [],
    isExpanded: false,
    isRead: true
  }
];

export function NewsSidebar({ isOpen, onClose }: NewsSidebarProps) {
  const [news, setNews] = useState<NewsItem[]>(MOCK_NEWS);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [feedbackOpenId, setFeedbackOpenId] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState('');

  const categories = [
    "Todas as categorias",
    "Assinatura Digital",
    "Gestão de Documentos",
    "Automação",
    "Jurídico",
    "Financeiro",
    "RH",
    "Vendas",
    "Segurança",
    "Integrações"
  ];

  const toggleExpand = (id: string) => {
    setNews(prev => prev.map(item => 
      item.id === id ? { ...item, isExpanded: !item.isExpanded } : item
    ));
  };

  const handleReaction = (id: string, type: ReactionType) => {
    setNews(prev => prev.map(item => {
      if (item.id !== id) return item;
      
      const hasReacted = item.userReactions.includes(type);
      const currentCount = item.reactions[type] || 0;
      return {
        ...item,
        reactions: {
          ...item.reactions,
          [type]: hasReacted ? Math.max(0, currentCount - 1) : currentCount + 1
        },
        userReactions: hasReacted 
          ? item.userReactions.filter(r => r !== type)
          : [...item.userReactions, type]
      };
    }));
  };

  const handleFeedback = () => {
    toast("Obrigado pelo seu feedback!", {
      description: "Sua opinião é muito importante para nós."
    });
  };

  const handleLearnMore = () => {
    toast("Redirecionando...", {
      description: "Abrindo artigo completo na Central de Ajuda."
    });
  };

  const handleFeedbackSubmit = (id: string) => {
    if (!feedbackText.trim()) return;
    
    toast("Obrigado pelo seu feedback!", {
      description: "Sua opinião foi enviada para nossa equipe."
    });
    setFeedbackOpenId(null);
    setFeedbackText('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[60]"
        />
      )}
      {isOpen && (
        <motion.div 
          key="sidebar"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 bottom-0 w-full max-w-[560px] bg-[#edeef0] dark:bg-gray-900 shadow-2xl z-[70] flex flex-col border-l border-gray-100 dark:border-gray-700"
        >
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between bg-[#edeef0] dark:bg-gray-900 sticky top-0 z-10 shrink-0">
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsCategoriesOpen(true)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                   <Menu size={20} />
                </button>
                <h2 className="text-xl font-medium text-gray-800 dark:text-white">Novos recursos do Signamais</h2>
             </div>
             <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                <X size={20} />
             </button>
          </div>

          {/* Categories Overlay */}
          <AnimatePresence>
            {isCategoriesOpen && (
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute inset-y-0 left-0 w-full max-w-[300px] bg-white/95 dark:bg-gray-800/95 backdrop-blur-md z-20 shadow-xl border-r border-gray-100 dark:border-gray-700 flex flex-col"
              >
                <div className="h-16 px-6 flex items-center justify-between border-b border-gray-100 dark:border-gray-700 shrink-0">
                   <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setIsCategoriesOpen(false)} 
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                      >
                         <ArrowLeft size={20} />
                      </button>
                      <h3 className="font-bold text-gray-800 dark:text-white">Categorias</h3>
                   </div>
                   <button onClick={() => setIsCategoriesOpen(false)} className="text-gray-400 hover:text-gray-600">
                      <X size={18} />
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-1">
                  {categories.map((cat, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        toast(`Filtrando por: ${cat}`);
                        setIsCategoriesOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 transition-colors",
                        i === 0 
                          ? "bg-purple-50 text-purple-700 font-bold dark:bg-purple-900/20 dark:text-purple-300" 
                          : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        i === 0 ? "bg-purple-500" : "bg-blue-400"
                      )} />
                      {cat}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Content Scrollable */}
          <div className="flex-1 overflow-y-auto px-4 pb-10 scrollbar-hide">
             
             {/* News Loop */}
             {news.map((item, index) => (
               <div key={item.id} className="flex flex-col">
                  {/* Separator if needed (example logic: first item is new, others are old) */}
                  {index === 1 && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-cyan-100 dark:border-cyan-900/30 flex items-center justify-center text-cyan-500 mb-4 shadow-sm relative z-10">
                          <div className="absolute inset-0 m-1 border border-cyan-200 rounded-full" />
                          <StarIcon />
                        </div>
                        <div className="flex items-center w-full gap-4 mb-2">
                          <div className="h-[1px] bg-gray-300 dark:bg-gray-700 w-full opacity-30" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-500 dark:text-gray-400 text-center">Isso é tudo que temos para hoje.</h3>
                        <p className="text-center text-sm text-gray-400 dark:text-gray-500 max-w-xs mt-2">
                          Dê uma olhada nos recursos que lançamos anteriormente. Com certeza, você vai encontrar algo interessante para o seu Signamais.
                        </p>
                        <div className="mt-4 text-gray-300">
                          <ChevronDown size={32} strokeWidth={1.5} />
                        </div>
                    </div>
                  )}

                  <div className={cn(
                    "bg-white dark:bg-gray-800 rounded-xl p-6 mb-6 shadow-sm transition-all duration-500",
                    item.isRead ? "opacity-90 hover:opacity-100" : "animate-in slide-in-from-bottom-4"
                  )}>
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-2">
                            {item.title}
                        </h3>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-cyan-100 text-cyan-600 text-[10px] font-bold uppercase rounded-full tracking-wide">
                              {item.category}
                            </span>
                            <span className="text-xs text-gray-400">{item.time}</span>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed space-y-3 mb-5">
                        <p className={cn(!item.isExpanded && "line-clamp-3")}>
                            {item.content}
                        </p>
                        <button 
                          onClick={() => toggleExpand(item.id)}
                          className="text-blue-500 hover:underline font-medium flex items-center gap-1"
                        >
                          {item.isExpanded ? "Menos" : "Mais"}
                          {item.isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                      </div>

                      {item.image && (
                        <div className="rounded-lg overflow-hidden mb-6 bg-gray-900">
                            <img 
                              src={item.image} 
                              alt="Feature" 
                              className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                            />
                        </div>
                      )}

                      <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-4">
                            <ReactionButton 
                              emoji="👏" 
                              count={item.reactions.clap || 0} 
                              isActive={item.userReactions.includes('clap')}
                              onClick={() => handleReaction(item.id, 'clap')}
                            />
                            <ReactionButton 
                              emoji="❤️" 
                              count={item.reactions.love || 0} 
                              isActive={item.userReactions.includes('love')}
                              onClick={() => handleReaction(item.id, 'love')}
                            />
                            <ReactionButton 
                              emoji="😢" 
                              count={item.reactions.sad || 0} 
                              isActive={item.userReactions.includes('sad')}
                              onClick={() => handleReaction(item.id, 'sad')}
                            />
                            
                            <div className="h-4 w-[1px] bg-gray-300 dark:bg-gray-600 mx-2" />
                            
                            <button 
                              onClick={() => setFeedbackOpenId(feedbackOpenId === item.id ? null : item.id)}
                              className={cn(
                                "text-xs flex items-center gap-1.5 transition-colors",
                                feedbackOpenId === item.id ? "text-purple-600 font-bold" : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                              )}
                            >
                              <MessageSquare size={14} />
                              Feedback
                            </button>
                        </div>
                        
                        <button 
                          onClick={handleLearnMore}
                          className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 whitespace-nowrap"
                        >
                            Saiba mais
                            <ExternalLink size={12} />
                        </button>
                      </div>

                      {/* Feedback Form */}
                      <AnimatePresence>
                        {feedbackOpenId === item.id && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700">
                               <textarea
                                 value={feedbackText}
                                 onChange={(e) => setFeedbackText(e.target.value)}
                                 placeholder="O que você achou dessa novidade?"
                                 className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 min-h-[80px] resize-none mb-3"
                               />
                               <div className="flex justify-end gap-2">
                                  <button 
                                    onClick={() => setFeedbackOpenId(null)}
                                    className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 dark:text-gray-400 transition-colors"
                                  >
                                    Cancelar
                                  </button>
                                  <button 
                                    onClick={() => handleFeedbackSubmit(item.id)}
                                    className="px-4 py-1.5 bg-[#8925e2] text-white text-xs font-bold rounded-lg hover:bg-[#7a1fd0] transition-colors flex items-center gap-2"
                                  >
                                    <Send size={12} />
                                    Enviar Feedback
                                  </button>
                               </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                  </div>
               </div>
             ))}

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ReactionButton({ emoji, count, isActive, onClick }: { emoji: string, count: number, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex items-center gap-1.5 px-2 py-1 rounded-full transition-all hover:scale-105 active:scale-95",
        isActive ? "bg-purple-100 dark:bg-purple-900/30 ring-1 ring-purple-500/50" : "hover:bg-gray-100 dark:hover:bg-gray-700"
      )}
    >
      <span className="text-lg leading-none">{emoji}</span>
      <span className={cn(
        "text-xs font-bold",
        isActive ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400"
      )}>
        {count}
      </span>
    </button>
  );
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 17.77V2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}