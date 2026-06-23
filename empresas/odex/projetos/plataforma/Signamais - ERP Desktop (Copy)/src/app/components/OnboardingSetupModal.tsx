import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, ChevronRight, ChevronLeft, Upload, User, Building, Phone, CreditCard, Lock, Calendar, AlignLeft, Type, PenTool } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DatePicker } from './DatePicker';

// Helper for classes
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface OnboardingSetupModalProps {
  isOpen: boolean;
  onComplete: (data?: { action: string }) => void;
}

export function OnboardingSetupModal({ isOpen, onComplete }: OnboardingSetupModalProps) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [fontFamily, setFontFamily] = useState('font-handwriting-1');
  const fonts = ['font-handwriting-1', 'font-handwriting-2', 'font-handwriting-3', 'cursive'];

  const toggleFont = () => {
    const currentIndex = fonts.indexOf(fontFamily);
    const nextIndex = (currentIndex + 1) % fonts.length;
    setFontFamily(fonts[nextIndex]);
  };
  
  // Step 1 State
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    password: '',
    signatureType: 'draw' as 'draw' | 'type',
    typedSignature: '',
    fontFamily: 'font-handwriting-1', // Mock font class
    
    // Step 2 State (PJ Only)
    accountType: 'pj' as 'pf' | 'pj', // Hardcoded to PJ
    phone: '',
    docVolume: '',
    reason: '',
    companyName: '',
    companySize: '',
    sector: '',
    
    // Step 3 State (Removed/Unused but keeping for type compatibility if needed internally)
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVC: ''
  });

  // Signature Canvas Logic
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    if (step === 1 && formData.signatureType === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = '#000000';
      }
    }
  }, [step, formData.signatureType]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setStep(3); // Go to Success Screen
        toast.success("Cadastro finalizado com sucesso!");
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 3) {
      setStep(step - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header with Stepper */}
        {step < 3 && (
          <div className="bg-gray-50 border-b border-gray-100 p-6">
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold font-[Lufga,sans-serif] text-gray-900">Vamos começar!</h2>
                <div className="text-sm text-gray-500 font-medium">
                   Passo <span className="text-[#8925e2] font-bold">{step}</span> de 2
                </div>
             </div>

             {/* Stepper */}
             <div className="flex items-center gap-2">
                <div className={cn("h-1.5 rounded-full flex-1 transition-colors duration-300", step >= 1 ? "bg-[#8925e2]" : "bg-gray-200")} />
                <div className={cn("h-1.5 rounded-full flex-1 transition-colors duration-300", step >= 2 ? "bg-[#8925e2]" : "bg-gray-200")} />
             </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
           <AnimatePresence mode="wait">
             {step === 1 && (
               <motion.div 
                 key="step1"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700">Nome Completo</label>
                       <input 
                         type="text" 
                         value={formData.fullName}
                         onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                         className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                         placeholder="Seu nome completo"
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700">CPF</label>
                       <input 
                         type="text" 
                         value={formData.cpf}
                         onChange={(e) => {
                           let value = e.target.value.replace(/\D/g, '');
                           if (value.length > 11) value = value.slice(0, 11);
                           
                           if (value.length > 9) {
                             value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
                           } else if (value.length > 6) {
                             value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
                           } else if (value.length > 3) {
                             value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
                           }
                           
                           setFormData({...formData, cpf: value});
                         }}
                         maxLength={14}
                         className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                         placeholder="000.000.000-00"
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700">Data de Nascimento</label>
                       <DatePicker 
                         date={formData.birthDate ? new Date(formData.birthDate + 'T12:00:00') : undefined}
                         setDate={(date) => {
                           if (date) {
                             setFormData({...formData, birthDate: format(date, 'yyyy-MM-dd')});
                           } else {
                             setFormData({...formData, birthDate: ''});
                           }
                         }}
                         placeholder="Selecione uma data"
                       />
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-sm font-bold text-gray-700">Senha da conta</label>
                       <input 
                         type="password" 
                         value={formData.password}
                         onChange={(e) => setFormData({...formData, password: e.target.value})}
                         className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                         placeholder="******"
                       />
                    </div>
                 </div>

                 <div className="space-y-3">
                    <label className="text-sm font-bold text-gray-700 flex items-center justify-between">
                       Sua Assinatura
                       <div className="flex bg-gray-100 p-1 rounded-lg">
                          <button 
                             onClick={() => setFormData({...formData, signatureType: 'draw'})}
                             className={cn("px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1", formData.signatureType === 'draw' ? "bg-white shadow-sm text-[#8925e2]" : "text-gray-500")}
                          >
                             <PenTool size={12} /> Desenhar
                          </button>
                          <button 
                             onClick={() => setFormData({...formData, signatureType: 'type'})}
                             className={cn("px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1", formData.signatureType === 'type' ? "bg-white shadow-sm text-[#8925e2]" : "text-gray-500")}
                          >
                             <Type size={12} /> Digitar
                          </button>
                       </div>
                    </label>
                    
                    <div className="border border-gray-200 rounded-xl overflow-hidden h-40 bg-gray-50 relative group">
                       {formData.signatureType === 'draw' ? (
                          <>
                             <canvas 
                                ref={canvasRef}
                                width={800}
                                height={300}
                                className="w-full h-full cursor-crosshair touch-none"
                                onMouseDown={startDrawing}
                                onMouseMove={draw}
                                onMouseUp={stopDrawing}
                                onMouseLeave={stopDrawing}
                                onTouchStart={startDrawing}
                                onTouchMove={draw}
                                onTouchEnd={stopDrawing}
                             />
                             <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                                <p className="text-xs text-gray-400">Desenhe sua assinatura na área acima</p>
                             </div>
                             <button 
                                onClick={clearSignature}
                                className="absolute top-3 right-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200 text-gray-500 hover:text-red-500 transition-colors"
                                title="Limpar"
                             >
                                <X size={16} />
                             </button>
                          </>
                       ) : (
                          <div className="w-full h-full flex items-center justify-center relative">
                             <input 
                                type="text"
                                value={formData.typedSignature || formData.fullName}
                                onChange={(e) => setFormData({...formData, typedSignature: e.target.value})}
                                className="w-full h-full bg-transparent text-center text-4xl outline-none text-gray-800"
                                style={{ 
                                  fontFamily: fontFamily === 'cursive' ? 'cursive' : 
                                             fontFamily === 'font-handwriting-1' ? '"Dancing Script", cursive' : 
                                             fontFamily === 'font-handwriting-2' ? '"Caveat", cursive' : 
                                             '"Pacifico", cursive' 
                                }} 
                                placeholder="Seu nome"
                             />
                             <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
                                <p className="text-xs text-gray-400">Não precisa ser idêntica ao RG</p>
                             </div>
                             <button 
                               onClick={toggleFont}
                               className="absolute bottom-3 right-3 text-xs text-[#8925e2] font-bold hover:underline z-10"
                             >
                                Trocar fonte
                             </button>
                          </div>
                       )}
                    </div>
                 </div>
               </motion.div>
             )}

             {step === 2 && (
               <motion.div 
                 key="step2"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 {/* Only PJ Form - Toggle Removed */}
                 <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-top-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       <div className="md:col-span-2 space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">Nome da empresa</label>
                          <input 
                            type="text" 
                            value={formData.companyName}
                            onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                            placeholder="Digite o nome da empresa"
                          />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">Porte da empresa</label>
                          <select 
                            value={formData.companySize}
                            onChange={(e) => setFormData({...formData, companySize: e.target.value})}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                          >
                             <option value="">Selecione...</option>
                             <option value="1-10">1-10 colaboradores</option>
                             <option value="11-50">11-50 colaboradores</option>
                             <option value="50+">Acima de 50 colaboradores</option>
                          </select>
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-sm font-bold text-gray-700">Setor de atuação</label>
                          <select 
                            value={formData.sector}
                            onChange={(e) => setFormData({...formData, sector: e.target.value})}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                          >
                             <option value="">Selecione...</option>
                             <option value="imobiliario">Imobiliário</option>
                             <option value="juridico">Jurídico</option>
                             <option value="tecnologia">Tecnologia</option>
                             <option value="financeiro">Financeiro</option>
                             <option value="educacao">Educação</option>
                             <option value="saude">Saúde</option>
                             <option value="varejo">Varejo</option>
                          </select>
                       </div>
                       
                       <div className="space-y-1.5 md:col-span-2">
                          <label className="text-sm font-bold text-gray-700">Telefone</label>
                          <input 
                            type="text" 
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                            placeholder="+55 11 90000-0000"
                          />
                       </div>

                       <div className="space-y-1.5 md:col-span-1">
                          <label className="text-sm font-bold text-gray-700">Volume mensal</label>
                          <select 
                            value={formData.docVolume}
                            onChange={(e) => setFormData({...formData, docVolume: e.target.value})}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                          >
                             <option value="">Selecione...</option>
                             <option value="0-20">Até 20 envios/mês</option>
                             <option value="21-50">21 a 50 envios/mês</option>
                             <option value="50+">Mais de 50 envios/mês</option>
                          </select>
                       </div>

                       <div className="space-y-1.5 md:col-span-1">
                          <label className="text-sm font-bold text-gray-700">Motivo</label>
                          <select 
                            value={formData.reason}
                            onChange={(e) => setFormData({...formData, reason: e.target.value})}
                            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-[#8925e2] outline-none transition-all"
                          >
                             <option value="">Selecione...</option>
                             <option value="business">Estou avaliando para minha empresa</option>
                             <option value="personal">Estou avaliando para uso pessoal</option>
                             <option value="developer">Desenvolvedor</option>
                             <option value="contract">Quero contratar</option>
                          </select>
                       </div>
                    </div>
                 </div>
               </motion.div>
             )}

             {step === 3 && (
               <motion.div 
                 key="step3"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="space-y-6"
               >
                 <div className="flex flex-col items-center text-center gap-3 py-4">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                       <Check size={32} strokeWidth={3} />
                    </div>
                    <h2 className="text-2xl font-bold font-[Lufga,sans-serif] text-gray-900">Sua conta foi criada com sucesso!</h2>
                    <p className="text-gray-500">Tudo pronto para você começar a usar o SignaMais.</p>
                 </div>

                 {/* Trial Banner */}
                 <div className="bg-gradient-to-r from-purple-50 to-white border border-purple-100 p-4 rounded-xl flex gap-3 items-start">
                    <div className="bg-[#8925e2] text-white p-2 rounded-lg shrink-0 mt-0.5">
                       <Calendar size={20} />
                    </div>
                    <div>
                       <h3 className="font-bold text-[#8925e2]">Período de Teste Gratuito Iniciado</h3>
                       <p className="text-sm text-gray-600 mt-1">
                          Você tem <span className="font-bold">7 dias totalmente grátis</span> para testar todas as funcionalidades premium.
                       </p>
                    </div>
                 </div>

                 {/* Summary Data */}
                 <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 space-y-3">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-2">Resumo do Cadastro</h3>
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-xs text-gray-500 font-medium">Nome</p>
                          <p className="font-bold text-gray-800">{formData.fullName || 'Não informado'}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500 font-medium">Tipo de Conta</p>
                          <p className="font-bold text-gray-800">
                             {formData.accountType === 'pj' ? 'Pessoa Jurídica' : 'Pessoa Física'}
                          </p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500 font-medium">Setor</p>
                          <p className="font-bold text-gray-800 capitalize">{formData.sector || 'Não informado'}</p>
                       </div>
                       <div>
                          <p className="text-xs text-gray-500 font-medium">Volume Estimado</p>
                          <p className="font-bold text-gray-800">{formData.docVolume || 'Não informado'}</p>
                       </div>
                    </div>
                 </div>

                 {/* What to do now */}
                 <div className="space-y-3">
                    <h3 className="font-bold text-gray-900">O que você pode fazer agora:</h3>
                    <div className="grid gap-2">
                       <button 
                         onClick={() => onComplete({ action: 'new-envelope' })}
                         className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-purple-100 hover:bg-purple-50/50 transition-colors w-full text-left group"
                       >
                          <div className="bg-purple-100 p-2 rounded-lg text-[#8925e2] group-hover:bg-[#8925e2] group-hover:text-white transition-colors">
                             <Upload size={18} />
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-[#8925e2] transition-colors">Enviar seu primeiro documento</span>
                          <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-[#8925e2] transition-colors" />
                       </button>
                       <button 
                         onClick={() => onComplete({ action: 'setup-team' })}
                         className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-purple-100 hover:bg-purple-50/50 transition-colors w-full text-left group"
                       >
                          <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                             <User size={18} />
                          </div>
                          <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">Configurar sua equipe</span>
                          <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-blue-600 transition-colors" />
                       </button>
                    </div>
                 </div>

                 <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <button 
                      onClick={() => onComplete()}
                      className="px-6 py-2.5 rounded-xl bg-[#8925e2] text-white font-bold hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
                    >
                       Acessar Plataforma <ChevronRight size={18} />
                    </button>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>

        {/* Footer Actions - Only show if not success step */}
        {step < 3 && (
          <div className="bg-white border-t border-gray-100 p-6 flex justify-between items-center">
             {step > 1 ? (
                <button 
                  onClick={handleBack}
                  className="px-6 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                   <ChevronLeft size={18} /> Voltar
                </button>
             ) : (
                <div /> // Spacer
             )}

             <button 
               onClick={handleNext}
               disabled={isLoading}
               className="px-8 py-3 rounded-xl bg-[#8925e2] text-white font-bold hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2 disabled:opacity-70"
             >
                {isLoading ? 'Processando...' : step === 2 ? 'Confirmar cadastro' : 'Continuar'}
                {!isLoading && <ChevronRight size={18} />}
             </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}