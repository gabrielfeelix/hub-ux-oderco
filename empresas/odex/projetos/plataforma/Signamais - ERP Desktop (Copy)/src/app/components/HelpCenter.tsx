import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  FileText, 
  Users, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone,
  ChevronRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { toast } from 'sonner';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// Data
const categories = [
  {
    id: 'start',
    title: "Primeiros Passos",
    icon: <BookOpen />, 
    description: "Tudo o que você precisa saber para começar a usar a plataforma.",
    colorClass: "text-purple-600",
    bgClass: "bg-purple-50 dark:bg-purple-900/20",
    hoverBorder: "hover:border-purple-200 dark:hover:border-purple-900/50",
    articles: [
      { id: 'start-1', title: "Como criar meu primeiro envelope", content: "Conteúdo do artigo..." },
      { id: 'start-2', title: "Como adicionar signatários", content: "Conteúdo do artigo..." },
      { id: 'start-3', title: "Como posicionar assinaturas", content: "Conteúdo do artigo..." }
    ]
  },
  {
    id: 'docs',
    title: "Gerenciando Documentos",
    icon: <FileText />,
    description: "Aprenda a enviar, gerenciar e organizar seus documentos.",
    colorClass: "text-blue-600",
    bgClass: "bg-blue-50 dark:bg-blue-900/20",
    hoverBorder: "hover:border-blue-200 dark:hover:border-blue-900/50",
    articles: [
      { id: 'docs-1', title: "Como enviar um documento", content: "Conteúdo do artigo..." },
      { id: 'docs-2', title: "Como cancelar um envelope", content: "Conteúdo do artigo..." },
      { id: 'docs-3', title: "Como reenviar notificação", content: "Conteúdo do artigo..." },
      { id: 'docs-4', title: "O que fazer quando um documento expira", content: "Conteúdo do artigo..." }
    ]
  },
  {
    id: 'clients',
    title: "Gestão de Clientes",
    icon: <Users />,
    description: "Gerencie sua base de clientes e contatos.",
    colorClass: "text-green-600",
    bgClass: "bg-green-50 dark:bg-green-900/20",
    hoverBorder: "hover:border-green-200 dark:hover:border-green-900/50",
    articles: [
      { id: 'clients-1', title: "Como adicionar um novo cliente", content: "Conteúdo do artigo..." },
      { id: 'clients-2', title: "Como adicionar créditos", content: "Conteúdo do artigo..." },
      { id: 'clients-3', title: "Como desativar um cliente", content: "Conteúdo do artigo..." }
    ]
  },
  {
    id: 'templates',
    title: "Modelos",
    icon: <FileText />,
    description: "Crie e utilize modelos para agilizar seus envios.",
    colorClass: "text-orange-600",
    bgClass: "bg-orange-50 dark:bg-orange-900/20",
    hoverBorder: "hover:border-orange-200 dark:hover:border-orange-900/50",
    articles: [
      { id: 'tmpl-1', title: "Como criar um modelo", content: "Conteúdo do artigo..." },
      { id: 'tmpl-2', title: "Como usar um modelo", content: "Conteúdo do artigo..." },
      { id: 'tmpl-3', title: "Como compartilhar modelos", content: "Conteúdo do artigo..." }
    ]
  },
  {
    id: 'billing',
    title: "Créditos e Pagamentos",
    icon: <CreditCard />,
    description: "Entenda como funciona o sistema de créditos e pagamentos.",
    colorClass: "text-red-600",
    bgClass: "bg-red-50 dark:bg-red-900/20",
    hoverBorder: "hover:border-red-200 dark:hover:border-red-900/50",
    articles: [
      { id: 'bill-1', title: "Como funcionam os créditos", content: "Conteúdo do artigo..." },
      { id: 'bill-2', title: "Como comprar créditos", content: "Conteúdo do artigo..." },
      { id: 'bill-3', title: "Quanto custa cada envelope", content: "Conteúdo do artigo..." }
    ]
  },
  {
    id: 'settings',
    title: "Configurações",
    icon: <Settings />,
    description: "Configure sua conta e preferências.",
    colorClass: "text-gray-600",
    bgClass: "bg-gray-50 dark:bg-gray-900/20",
    hoverBorder: "hover:border-gray-200 dark:hover:border-gray-900/50",
    articles: [
      { id: 'set-1', title: "Como alterar minha senha", content: "Conteúdo do artigo..." },
      { id: 'set-2', title: "Como configurar notificações", content: "Conteúdo do artigo..." },
      { id: 'set-3', title: "Como adicionar minha assinatura digital", content: "Conteúdo do artigo..." }
    ]
  }
];

const faqs = [
  {
    question: "Onde meus documentos são armazenados?",
    answer: "Seus documentos são armazenados em servidores seguros com criptografia de ponta a ponta, garantindo total confidencialidade e integridade."
  },
  {
    question: "As assinaturas têm validade jurídica?",
    answer: "Sim, todas as assinaturas realizadas na plataforma possuem plena validade jurídica conforme a MP 2.200-2/2001 e legislações vigentes."
  },
  {
    question: "Posso cancelar minha conta a qualquer momento?",
    answer: "Sim, você pode cancelar sua assinatura ou conta a qualquer momento através do painel de configurações, sem multas ou fidelidade."
  }
];

export function HelpCenter() {
  const [view, setView] = useState<'home' | 'category' | 'article'>('home');
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[0] | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<{ id: string, title: string, content: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'success'>('idle');

  const handleCategoryClick = (category: typeof categories[0]) => {
    setSelectedCategory(category);
    setView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (article: { id: string, title: string, content: string }, category?: typeof categories[0]) => {
    setSelectedArticle(article);
    if (category) setSelectedCategory(category);
    setFeedbackState('idle'); // Reset feedback when opening new article
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (view === 'article' && selectedCategory) {
      setView('category');
    } else {
      setView('home');
      setSelectedCategory(null);
    }
  };

  const handleFeedback = (type: 'yes' | 'no') => {
    setFeedbackState('success');
    toast.success("Obrigado pelo seu feedback!");
  };

  const filteredCategories = categories.map(cat => ({
    ...cat,
    articles: cat.articles.filter(art => 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      cat.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.articles.length > 0);

  // Article View Component
  const ArticleView = () => {
    if (!selectedArticle) return null;
    return (
      <div className="w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#8925e2] mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Voltar para {selectedCategory?.title || 'Início'}
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 text-sm font-medium mb-4">
             <span className={cn("px-3 py-1 rounded-full", selectedCategory ? selectedCategory.bgClass : "bg-purple-50 dark:bg-purple-900/20", selectedCategory ? selectedCategory.colorClass : "text-purple-600")}>
                {selectedCategory?.title}
             </span>
             <span className="text-gray-400">•</span>
             <span className="text-gray-500 dark:text-gray-400">Leitura de 5 min</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8 font-[Lufga,sans-serif]">
            {selectedArticle.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3>Passo 1: Preparação</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className={cn("p-6 rounded-xl border-l-4 my-8", selectedCategory ? selectedCategory.bgClass.replace('bg-opacity-20', 'bg-opacity-10') : "bg-purple-50 dark:bg-purple-900/20", selectedCategory ? selectedCategory.colorClass.replace('text-', 'border-') : "border-[#8925e2]")}>
               <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-0 mb-2">Dica Importante</h4>
               <p className="mb-0 text-sm">
                  Certifique-se de que todos os signatários possuem um endereço de e-mail válido antes de enviar o envelope.
               </p>
            </div>
            <h3>Passo 2: Envio</h3>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <ul>
               <li>Verifique os documentos anexados</li>
               <li>Confirme os dados dos destinatários</li>
               <li>Defina a ordem de assinatura se necessário</li>
            </ul>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
             <h4 className="font-bold text-gray-900 dark:text-white mb-4">Este artigo foi útil?</h4>
             {feedbackState === 'idle' ? (
               <div className="flex gap-4">
                  <button 
                    onClick={() => handleFeedback('yes')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-green-50 hover:border-green-200 hover:text-green-600 transition-all font-medium text-gray-600 dark:text-gray-300"
                  >
                     <ThumbsUp size={18} /> Sim
                  </button>
                  <button 
                    onClick={() => handleFeedback('no')}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all font-medium text-gray-600 dark:text-gray-300"
                  >
                     <ThumbsDown size={18} /> Não
                  </button>
               </div>
             ) : (
               <div className="animate-in fade-in slide-in-from-left-2 duration-300 text-green-600 font-bold text-lg">
                  Obrigado pelo seu feedback!
               </div>
             )}
          </div>
        </div>
      </div>
    );
  };

  // Category View Component
  const CategoryView = () => {
    if (!selectedCategory) return null;
    return (
      <div className="w-full max-w-[1200px] mx-auto animate-in fade-in slide-in-from-right-4 duration-300">
         <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-500 hover:text-[#8925e2] mb-6 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Voltar para Início
        </button>

        <div className="flex flex-col md:flex-row gap-8 items-start">
           {/* Sidebar Info */}
           <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 sticky top-24">
              <div className={cn("p-4 rounded-2xl w-fit mb-4", selectedCategory.bgClass)}>
                 {React.cloneElement(selectedCategory.icon as React.ReactElement, { className: cn("w-8 h-8", selectedCategory.colorClass) })}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 font-[Lufga,sans-serif]">
                 {selectedCategory.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                 {selectedCategory.description}
              </p>
              <div className="text-sm text-gray-400">
                 {selectedCategory.articles.length} artigos nesta coleção
              </div>
           </div>

           {/* Articles List */}
           <div className="w-full md:w-2/3 space-y-4">
              {selectedCategory.articles.map((article, i) => (
                 <div 
                   key={i}
                   onClick={() => handleArticleClick(article)}
                   className={cn(
                     "bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer group",
                     selectedCategory.hoverBorder
                   )}
                 >
                    <h3 className={cn("text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors group-hover:text-[inherit]", selectedCategory.colorClass.replace('text-', 'group-hover:text-'))}>
                       {article.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2">
                       Aprenda passo a passo como realizar esta ação na plataforma SignaMais de forma simples e rápida.
                    </p>
                 </div>
              ))}
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1200px] mx-auto pb-24">
      
      {view === 'home' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           {/* Header Banner */}
           <div className="bg-gradient-to-r from-[#8925e2] to-[#b06bf7] rounded-3xl p-12 text-white text-center mb-12 shadow-xl relative">
             <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             </div>
             <h1 className="text-4xl font-bold mb-4 relative z-10 font-[Lufga,sans-serif]">Central de Ajuda</h1>
             <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto relative z-10">
               Encontre respostas, tutoriais e tudo que você precisa para aproveitar ao máximo nossa plataforma.
             </p>
             
             <div className="relative max-w-2xl mx-auto z-20">
               <div className="bg-white rounded-2xl p-2 flex items-center shadow-lg transition-transform focus-within:scale-105 duration-300 relative z-20">
                 <Search className="text-gray-400 ml-4 w-6 h-6" />
                 <input 
                   type="text" 
                   placeholder="Pesquisar na central de ajuda..." 
                   value={searchQuery}
                   onChange={(e) => setSearchQuery(e.target.value)}
                   className="w-full px-4 py-3 text-gray-700 outline-none text-lg placeholder:text-gray-400"
                 />
                 {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="mr-4 text-gray-400 hover:text-gray-600"
                    >
                       <X size={20} />
                    </button>
                 )}
               </div>

               {/* Dropdown Results */}
               {searchQuery && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden max-h-[400px] overflow-y-auto z-50 text-left animate-in fade-in slide-in-from-top-2 duration-200">
                      {(() => {
                        // Flatten all matching articles into a single list
                        const allMatchingArticles = categories.flatMap(cat => 
                           cat.articles
                              .filter(art => art.title.toLowerCase().includes(searchQuery.toLowerCase()))
                              .map(art => ({ ...art, category: cat })) // Keep category reference for styling
                        );

                        if (allMatchingArticles.length === 0) {
                           return (
                              <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-3">
                                 <Search size={32} className="text-gray-300 mb-1" />
                                 <p className="font-medium">Nenhum resultado encontrado para "{searchQuery}"</p>
                                 <p className="text-sm text-gray-400">Tente buscar por palavras-chave diferentes.</p>
                              </div>
                           );
                        }

                        return (
                           <div className="divide-y divide-gray-50 dark:divide-gray-700/50">
                              {allMatchingArticles.map((article, index) => (
                                 <button
                                    key={`${article.category.id}-${article.id}-${index}`}
                                    onClick={() => handleArticleClick(article, article.category)}
                                    className="w-full text-left px-5 py-4 hover:bg-purple-50 dark:hover:bg-purple-900/10 flex items-start gap-3 transition-colors group"
                                 >
                                    <div className={cn("p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-500 shrink-0 mt-0.5 group-hover:bg-white group-hover:shadow-sm transition-all", article.category.colorClass)}>
                                       <FileText size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                       <p className="font-bold text-gray-900 dark:text-white text-sm group-hover:text-[#8925e2] mb-0.5 truncate">{article.title}</p>
                                       <div className="flex items-center gap-2 text-xs text-gray-400">
                                          <span className={cn("font-medium", article.category.colorClass)}>{article.category.title}</span>
                                          <span>•</span>
                                          <span className="group-hover:text-gray-500">Clique para ler o artigo completo</span>
                                       </div>
                                    </div>
                                    <ChevronRight size={16} className="ml-auto text-gray-300 group-hover:text-[#8925e2] self-center transition-colors shrink-0" />
                                 </button>
                              ))}
                           </div>
                        );
                      })()}
                  </div>
               )}
             </div>
           </div>

           {/* Categories Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
             {categories.map((category, idx) => {
               // Always show top 3 articles, ignoring search query for the grid
               const displayArticles = category.articles.slice(0, 3);
               
               return (
                 <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group flex flex-col h-full">
                   <div className="flex items-center gap-4 mb-6">
                     <div className={cn("p-3 rounded-xl group-hover:scale-110 transition-transform duration-300", category.bgClass)}>
                       {React.cloneElement(category.icon as React.ReactElement, { className: cn("w-6 h-6", category.colorClass) })}
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif]">{category.title}</h3>
                   </div>
                   <ul className="space-y-3 mb-6 flex-1">
                     {displayArticles.map((article, i) => (
                       <li key={i}>
                         <button 
                           onClick={() => handleArticleClick(article, category)}
                           className={cn("flex items-center gap-2 text-gray-600 dark:text-gray-300 transition-colors text-left w-full group/link", category.colorClass.replace('text-', 'hover:text-'))}
                         >
                           <span className={cn("w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 transition-colors shrink-0 group-hover/link:bg-current")}></span>
                           <span className="line-clamp-1">{article.title}</span>
                         </button>
                       </li>
                     ))}
                   </ul>
                   <button 
                     onClick={() => handleCategoryClick(category)}
                     className={cn("mt-auto font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all w-fit", category.colorClass)}
                   >
                     Ver todos os artigos <ChevronRight size={16} />
                   </button>
                 </div>
               );
             })}
           </div>

           {/* FAQ Section */}
           <div className="mb-16">
             <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center font-[Lufga,sans-serif]">Perguntas Frequentes</h2>
             <div className="max-w-3xl mx-auto space-y-4">
               {faqs.map((faq, index) => (
                 <div 
                   key={index} 
                   className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                 >
                   <button 
                     onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                     className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                   >
                     <span className="font-bold text-lg text-gray-800 dark:text-white">{faq.question}</span>
                     {expandedFaq === index ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                   </button>
                   
                   <div className={cn(
                     "overflow-hidden transition-all duration-300 ease-in-out",
                     expandedFaq === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                   )}>
                     <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-50 dark:border-gray-700/50">
                       {faq.answer}
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Contact Support Banner */}
           <div className="bg-[#212529] dark:bg-black rounded-3xl p-12 text-center relative overflow-hidden">
             <div className="relative z-10 flex flex-col items-center">
               <div className="w-16 h-16 bg-[#8925e2] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-purple-900/50">
                 <MessageCircle className="text-white w-8 h-8" />
               </div>
               <h2 className="text-3xl font-bold text-white mb-4 font-[Lufga,sans-serif]">Ainda precisa de ajuda?</h2>
               <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                 Nossa equipe de suporte está disponível de segunda a sexta, das 9h às 18h para ajudar você.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-2xl">
                 <a href="mailto:suporte@signamais.com.br" className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex items-center justify-center gap-3 text-white transition-all group">
                   <Mail className="text-[#8925e2] group-hover:scale-110 transition-transform" />
                   <span className="font-medium">suporte@signamais.com.br</span>
                 </a>
                 <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 p-4 rounded-xl flex items-center justify-center gap-3 text-white transition-all group">
                   <Phone className="text-[#8925e2] group-hover:scale-110 transition-transform" />
                   <span className="font-medium">WhatsApp: (11) 99999-9999</span>
                 </a>
               </div>
             </div>
             
             {/* Background Elements */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#8925e2] rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-10 -translate-x-1/2 translate-y-1/2"></div>
           </div>
        </div>
      )}

      {view === 'category' && <CategoryView />}
      {view === 'article' && <ArticleView />}
    </div>
  );
}