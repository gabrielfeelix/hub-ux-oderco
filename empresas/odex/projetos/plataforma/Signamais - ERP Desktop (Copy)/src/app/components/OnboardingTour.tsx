import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rocket, ArrowRight, Check, Plus, ChevronLeft, Map } from 'lucide-react';
import { createPortal } from 'react-dom';

interface OnboardingTourProps {
  run: boolean;
  onFinish: () => void;
  activeTab: string;
  isSidebarExpanded: boolean;
  isNewEnvelopeOpen: boolean;
}

interface TourStep {
  target: string;
  title: string;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  actionRequired?: boolean; // If true, user must interact with target to proceed
  scrollPosition?: ScrollLogicalPosition;
}

export function OnboardingTour({ 
  run, 
  onFinish,
  activeTab,
  isSidebarExpanded,
  isNewEnvelopeOpen
}: OnboardingTourProps) {
  const [showWelcome, setShowWelcome] = useState(false);
  const [runTour, setRunTour] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Initialize
  useEffect(() => {
    if (run) {
      setShowWelcome(true);
      setRunTour(false);
      setCurrentStep(0);
    } else {
      setShowWelcome(false);
      setRunTour(false);
      setCurrentStep(0);
    }
  }, [run]);

  const handleStartTour = () => {
    setShowWelcome(false);
    setRunTour(true);
    setCurrentStep(0);
  };

  const handleSkip = () => {
    setShowWelcome(false);
    setRunTour(false);
    onFinish();
  };

  const steps: TourStep[] = [
    {
      target: '#tour-dashboard-content',
      title: 'Painel Inicial',
      content: 'Esta é a tela de início, onde você encontra ações rápidas e as informações mais importantes do dia a dia.',
      placement: 'center',
      scrollPosition: 'start',
    },
    {
      target: '#tour-sidebar-toggle',
      title: 'Navegação',
      content: 'Clique na seta para expandir o menu lateral e ver mais opções.',
      placement: 'right',
      actionRequired: true,
    },
    {
      target: '#tour-custom-views',
      title: 'Visões Personalizadas',
      content: (
        <span>
          Aqui você pode alternar entre diferentes visões ou criar uma nova clicando no botão{' '}
          <span className="inline-flex items-center justify-center w-5 h-5 bg-purple-100 text-[#8925e2] rounded align-middle mx-0.5">
            <Plus size={14} />
          </span>
          .
        </span>
      ),
      placement: 'right',
    },
    {
      target: '#tour-search',
      title: 'Busca Universal',
      content: 'Pesquise por documentos, modelos ou contatos de qualquer lugar da plataforma.',
      placement: 'bottom',
    },
    {
      target: '#tour-tab-Documentos',
      title: 'Documentos',
      content: 'Clique na aba Documentos para gerenciar seus envelopes.',
      placement: 'bottom',
      actionRequired: true,
    },
    {
      target: '#tour-documents-list',
      title: 'Gestão de Envelopes',
      content: 'Acompanhe o status de todos os seus documentos, veja quem já assinou e o que está pendente.',
      placement: 'center',
    },
    {
      target: '#tour-sidebar-filters',
      title: 'Filtros Rápidos',
      content: 'Use a barra lateral para filtrar rapidamente por status: Caixa de Entrada, Enviados, Concluídos, etc.',
      placement: 'right',
    },
    {
      target: '#tour-new-envelope-btn',
      title: 'Novo Envelope',
      content: 'Clique aqui para iniciar o processo de envio de um novo documento.',
      placement: 'left',
      actionRequired: true,
    },
    {
      target: '#tour-new-envelope-form',
      title: 'Criação de Envelope',
      content: 'Aqui você faz o upload do arquivo, define os signatários e posiciona as assinaturas. É tudo muito simples e guiado.',
      placement: 'center',
    },
    {
      target: '#tour-tab-Modelos',
      title: 'Modelos',
      content: 'Clique em Modelos para acessar seus templates.',
      placement: 'bottom',
      actionRequired: true,
    },
    {
      target: '#tour-models-content',
      title: 'Gestão de Modelos',
      content: 'Crie modelos para documentos recorrentes ou utilize os modelos padrão do sistema.',
      placement: 'center',
    },
    {
      target: '#tour-tab-Relatórios',
      title: 'Relatórios',
      content: 'Clique para ver métricas detalhadas.',
      placement: 'bottom',
      actionRequired: true,
    },
    {
      target: '#tour-reports-content',
      title: 'Inteligência de Dados',
      content: 'Visualize o desempenho da sua conta, consumo de envelopes e tempo médio de assinatura.',
      placement: 'center',
    },
    {
      target: '#tour-notifications',
      title: 'Notificações',
      content: 'Fique por dentro de tudo o que acontece com seus documentos aqui.',
      placement: 'bottom',
    },
    {
      target: '#tour-tasks',
      title: 'Tarefas',
      content: 'Gerencie pendências e prazos na sua lista de tarefas integrada.',
      placement: 'left',
    },
    {
      target: '#tour-profile',
      title: 'Perfil e Configurações',
      content: 'Acesse suas configurações de conta, plano e central de ajuda aqui.',
      placement: 'left',
    }
  ];

  // Auto-advance logic
  useEffect(() => {
    if (!runTour) return;

    const step = steps[currentStep];
    
    // Step 1 -> 2: Sidebar Toggle (index 1)
    if (currentStep === 1 && isSidebarExpanded) {
      setTimeout(() => setCurrentStep(2), 300);
    }

    // Step 4 -> 5: Click Docs Tab (index 4)
    if (currentStep === 4 && activeTab === 'Documentos') {
       setTimeout(() => setCurrentStep(5), 500);
    }

    // Step 7 -> 8: Click New Envelope (index 7)
    if (currentStep === 7 && isNewEnvelopeOpen) {
       setTimeout(() => setCurrentStep(8), 500);
    }

    // Step 9 -> 10: Click Models Tab (index 9)
    if (currentStep === 9 && activeTab === 'Modelos') {
       setTimeout(() => setCurrentStep(10), 500);
    }

    // Step 11 -> 12: Click Reports Tab (index 11)
    if (currentStep === 11 && activeTab === 'Relatórios') {
       setTimeout(() => setCurrentStep(12), 500);
    }

  }, [runTour, currentStep, isSidebarExpanded, activeTab, isNewEnvelopeOpen]);

  // Scroll to target when step changes
  useEffect(() => {
    if (!runTour) return;
    const step = steps[currentStep];
    if (step) {
      const el = document.querySelector(step.target);
      if (el) {
        el.scrollIntoView({ 
          behavior: 'smooth', 
          block: step.scrollPosition || 'center' 
        });
      }
    }
  }, [currentStep, runTour]);

  // Update target rect
  useEffect(() => {
    if (!runTour) return;
    
    const updateRect = () => {
      const step = steps[currentStep];
      if (step) {
        const el = document.querySelector(step.target);
        if (el) {
          setTargetRect(el.getBoundingClientRect());
        } else {
          setTargetRect(null);
        }
      }
    };

    updateRect();
    window.addEventListener('resize', updateRect);
    window.addEventListener('scroll', updateRect);
    
    // Interval to check for element appearance
    const interval = setInterval(updateRect, 100);

    return () => {
      window.removeEventListener('resize', updateRect);
      window.removeEventListener('scroll', updateRect);
      clearInterval(interval);
    };
  }, [runTour, currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setRunTour(false);
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!run && !showWelcome) return null;

  return (
    <>
      <AnimatePresence>
        {showWelcome && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                 <Rocket className="text-[#8925e2] fill-[#8925e2]" size={32} />
              </div>
              
              <h2 className="text-3xl font-bold text-center font-[Lufga,sans-serif] mb-4 text-gray-900">
                Boas-vindas ao SignaMais!
              </h2>
              
              <p className="text-gray-600 text-center mb-8 leading-relaxed">
                Preparamos um tour rápido para te mostrar como nossa plataforma pode transformar sua gestão de documentos.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleStartTour}
                  className="w-full bg-[#8925e2] text-white font-bold py-4 rounded-xl hover:bg-[#7a1fd0] transition-colors flex items-center justify-center gap-2"
                >
                  <Map size={18} fill="currentColor" />
                  Começar Tour
                </button>
                <button 
                  onClick={handleSkip}
                  className="w-full text-gray-500 font-bold py-3 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  Pular introdução
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {runTour && steps[currentStep] && (
        createPortal(
          <div className="fixed inset-0 z-[10000] pointer-events-none">
            {/* Dark Overlay with "Hole" using box-shadow trick */}
            {targetRect && (
              <motion.div
                initial={false}
                animate={{
                  top: targetRect.top - 10,
                  left: targetRect.left - 10,
                  width: targetRect.width + 20,
                  height: targetRect.height + 20,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="absolute rounded-xl"
                style={{
                  boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.75)',
                  pointerEvents: 'none' // Allow clicks to pass through the hole
                }}
              />
            )}

            {/* Tooltip */}
            {targetRect && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  top: steps[currentStep].placement === 'bottom' ? targetRect.bottom + 24 : 
                       steps[currentStep].placement === 'top' ? targetRect.top - 200 : // adjust logic as needed
                       targetRect.top, // Default roughly near top
                  left: steps[currentStep].placement === 'right' ? targetRect.right + 24 :
                        steps[currentStep].placement === 'left' ? targetRect.left - 340 :
                        // Smart positioning for top/bottom: prevent right overflow
                        (targetRect.left + 320 > window.innerWidth - 20) 
                          ? Math.max(20, targetRect.right - 320) 
                          : targetRect.left
                }}
                className="absolute pointer-events-auto"
                style={{
                  // Simple positioning logic override for better placement
                  ...(steps[currentStep].placement === 'center' ? {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                  } : {}),
                  // Fallback for edge cases
                  maxWidth: '320px'
                }}
              >
                 <div className="bg-white p-6 rounded-2xl shadow-2xl relative">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold text-lg text-gray-900">{steps[currentStep].title}</h3>
                       <button onClick={handleSkip} className="text-gray-400 hover:text-gray-600">
                         <X size={16} />
                       </button>
                    </div>
                    <div className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {steps[currentStep].content}
                    </div>
                    
                    <div className="flex items-center justify-between">
                       <span className="text-xs font-bold text-gray-400">
                         {currentStep + 1} de {steps.length}
                       </span>
                       
                       <div className="flex items-center gap-3">
                         {currentStep > 0 && (
                           <button 
                             onClick={handlePrev}
                             className="text-gray-500 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                             title="Voltar"
                           >
                             <ChevronLeft size={16} />
                           </button>
                         )}

                         <button 
                           onClick={handleSkip}
                           className="text-gray-500 text-sm font-bold hover:text-gray-700 transition-colors"
                         >
                           Pular
                         </button>

                         {!steps[currentStep].actionRequired && (
                           <button 
                             onClick={handleNext}
                             className="bg-[#8925e2] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#7a1fd0] transition-colors"
                           >
                             {currentStep === steps.length - 1 ? 'Concluir' : 'Próximo'}
                             {currentStep === steps.length - 1 ? <Check size={14} /> : <ArrowRight size={14} />}
                           </button>
                         )}
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
          </div>,
          document.body
        )
      )}
    </>
  );
}