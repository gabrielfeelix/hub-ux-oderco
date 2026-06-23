import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Lock, 
  Eye, 
  EyeOff, 
  Check,
  User,
  ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { OTPInput, OTPInputContext } from 'input-otp';
import { Logo } from '@/app/components/Logo';

// Import SVG Components
import FillOutBro from '@/imports/FillOutBro1';
import MailSentCuate from '@/imports/MailSentCuate1';
import LawFirmAmico from '@/imports/LawFirmAmico1';

// Helper
function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface LoginScreenProps {
  onLogin: () => void;
  onStartOnboarding?: () => void;
  onSignupComplete?: () => void;
}

// Custom OTP Slot Component
const Slot = (props: { char: string | null; isActive: boolean; hasFakeCaret: boolean }) => {
  return (
    <div
      className={cn(
        "relative w-10 h-14 lg:w-12 lg:h-16 text-[28px] lg:text-[32px] font-bold flex items-center justify-center transition-all duration-300",
      )}
    >
      {props.char !== null ? (
        <div className="text-white">{props.char}</div>
      ) : (
        <div className="text-white/20 select-none">0</div>
      )}
      
      {/* Bottom Line */}
      <div 
        className={cn(
          "absolute bottom-2 left-1 right-1 h-[3px] rounded-full transition-all duration-300",
          props.isActive 
            ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)] scale-x-100" 
            : props.char !== null 
              ? "bg-white/50 scale-x-100" 
              : "bg-white/20 scale-x-75"
        )}
      />
      
      {/* Fake Caret */}
      {props.hasFakeCaret && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse pointer-events-none">
          <div className="w-[2px] h-8 bg-white" />
        </div>
      )}
    </div>
  )
}

const slides = [
  {
    id: 1,
    title: "Controle de Documentos",
    description: "Transforme o processo de assinatura de documentos em uma experiência simples e moderna. Centralize contratos, acompanhe status em tempo real e garanta validade jurídica em cada envio.",
    component: <FillOutBro />,
  },
  {
    id: 2,
    title: "Envio de Envelopes",
    description: "Envie contratos para assinatura em poucos cliques. Acompanhe o progresso de cada documento e receba alertas automáticos de conclusão.",
    component: <MailSentCuate />,
  },
  {
    id: 3,
    title: "Segurança e Validade Jurídica",
    description: "Tenha tranquilidade em cada assinatura. O SignaMais garante autenticação segura e validade jurídica reconhecida em todo o território nacional.",
    component: <LawFirmAmico />,
  }
];

type ViewState = 'login' | 'signup' | 'success' | 'forgot-password';

export function LoginScreen({ onLogin, onStartOnboarding, onSignupComplete }: LoginScreenProps) {
  const [view, setView] = useState<ViewState>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Login Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Signup Form State
  const [signupEmail, setSignupEmail] = useState('');
  const [signupCode, setSignupCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password State
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotCode, setForgotCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState(1); // 1: Email, 2: Code, 3: New Password, 4: Success
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLogin();
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCodeSent) {
       // Simulate sending code
       setIsLoading(true);
       setTimeout(() => {
          setIsLoading(false);
          setIsCodeSent(true);
       }, 1500);
    } else {
       // Validate code
       setIsLoading(true);
       setTimeout(() => {
          setIsLoading(false);
          if (onSignupComplete) {
             onSignupComplete();
          } else {
             // Fallback
             setView('success');
          }
       }, 1500);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotStep === 1) {
       setIsLoading(true);
       setTimeout(() => {
          setIsLoading(false);
          setForgotStep(2);
       }, 1500);
    } else if (forgotStep === 2) {
       setIsLoading(true);
       setTimeout(() => {
          setIsLoading(false);
          setForgotStep(3);
       }, 1500);
    } else if (forgotStep === 3) {
       if (newPassword !== confirmPassword) {
          // In a real app we would show an error
          return;
       }
       setIsLoading(true);
       setTimeout(() => {
          setIsLoading(false);
          setForgotStep(4);
       }, 1500);
    }
  };

  const isPasswordValid = newPassword.length >= 6 && /[A-Z]/.test(newPassword) && /[0-9]/.test(newPassword);

  return (
    <div className="relative w-full min-h-screen font-sans bg-[#1a0b2e] overflow-hidden flex">
      
      {/* Background Gradient & Grid */}
      <div className="absolute inset-0 bg-[#1a0b2e]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#3f1168_0%,_#1a0b2e_60%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.08]" 
             style={{ 
               backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', 
               backgroundSize: '60px 60px' 
             }} 
        />
      </div>

      <div className="w-full max-w-[1800px] mx-auto relative z-10 flex flex-col lg:flex-row h-screen">
        
        {/* Left Side - Content */}
        <div className="w-full lg:w-[50%] h-full flex flex-col px-8 py-8 lg:pl-24 lg:pr-12 relative">
            
            {/* Top Bar - Button */}
            <div className="flex items-center mb-12 lg:mb-0 lg:absolute lg:top-12 lg:left-24">
               {view === 'login' ? (
                 <button className="px-5 py-2 rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 transition-colors text-sm font-bold tracking-wide">
                   Voltar
                 </button>
               ) : (
                 <button 
                   onClick={() => setView('login')}
                   className="px-5 py-2 rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10 transition-colors text-sm font-bold tracking-wide flex items-center gap-2"
                 >
                   <ArrowLeft size={16} />
                   Voltar para login
                 </button>
               )}
            </div>

            {/* Main Form Content Container */}
            <div className="flex-1 flex flex-col justify-center max-w-[480px] w-full mx-auto lg:mr-0 lg:ml-auto lg:translate-x-12 relative">
               
               {/* Logo */}
               <div className="absolute top-0 lg:top-4 left-0 right-0 flex justify-center">
                  <Logo className="text-white w-40 h-auto" />
               </div>

               <AnimatePresence mode="wait">
                 {view === 'login' && (
                   <motion.div 
                     key="login"
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     transition={{ duration: 0.3 }}
                     className="flex flex-col gap-8"
                   >
                     {/* Header Section */}
                     <div className="flex flex-col gap-6 items-center text-center">
                       <div className="flex flex-col gap-3">
                          <h1 className="text-4xl lg:text-5xl font-extrabold text-white font-[Lufga,sans-serif] tracking-tight">
                            Boas-vindas de volta!
                          </h1>
                          <p className="text-gray-300 text-lg">
                            Ainda não tem uma conta? <button onClick={() => setView('signup')} className="text-white font-bold hover:underline">Teste grátis</button>
                          </p>
                       </div>
                     </div>

                     <form onSubmit={handleLoginSubmit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                          <label className="text-gray-200 text-base">E-mail</label>
                          <div className="bg-white rounded-2xl h-[56px] flex items-center px-4 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                            <div className="flex items-center gap-3 w-full">
                               <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                 <User className="text-gray-500" size={14} />
                               </div>
                               <input 
                                 type="email" 
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="exemplo@email.com"
                                 className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
                               />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-gray-200 text-base">Senha</label>
                          <div className="bg-white rounded-2xl h-[56px] flex items-center px-4 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                             <div className="flex items-center gap-3 w-full">
                               <div className="shrink-0">
                                 <Lock className="text-gray-400" size={20} />
                               </div>
                               <input 
                                 type={showPassword ? "text" : "password"} 
                                 value={password}
                                 onChange={(e) => setPassword(e.target.value)}
                                 placeholder="******"
                                 className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base tracking-widest"
                               />
                               <button 
                                 type="button"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                               >
                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                               </button>
                             </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-1">
                          <label 
                            className="flex items-center gap-2 cursor-pointer text-white select-none group"
                            onClick={() => setRememberMe(!rememberMe)}
                          >
                            <div className={cn(
                              "w-5 h-5 rounded border-2 flex items-center justify-center transition-all bg-transparent",
                              rememberMe 
                                ? "border-white bg-white/20" 
                                : "border-white/60 group-hover:border-white"
                            )}>
                              {rememberMe && (
                                <Check size={14} className="text-white" strokeWidth={3} />
                              )}
                            </div>
                            <span className="font-semibold text-base">Lembrar</span>
                          </label>
                          <a 
                             href="#" 
                             onClick={(e) => {
                               e.preventDefault();
                               setView('forgot-password');
                             }}
                             className="text-white font-bold hover:underline text-base"
                          >
                             Esqueceu a senha?
                          </a>
                        </div>

                        <button 
                          type="submit"
                          className="w-full bg-gradient-to-r from-[#3f1168] to-[#6514ae] hover:from-[#4c157d] hover:to-[#7317c7] text-white font-bold h-[56px] rounded-2xl transition-all shadow-lg shadow-purple-900/40 mt-4 border border-[#b970fa]/30 text-lg tracking-wide"
                        >
                          Entrar
                        </button>
                     </form>
                   </motion.div>
                 )}

                 {view === 'forgot-password' && (
                   <motion.div 
                     key="forgot"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3 }}
                     className="flex flex-col gap-8"
                   >
                     {/* Header Section */}
                     <div className="flex flex-col gap-6 items-center text-center">
                       <div className="flex flex-col gap-3">
                          <h1 className="text-4xl lg:text-5xl font-extrabold text-white font-[Lufga,sans-serif] tracking-tight">
                            {forgotStep === 4 ? 'Senha Alterada!' : 'Recuperar Senha'}
                          </h1>
                          <p className="text-gray-300 text-lg">
                            {forgotStep === 1 && "Informe seu e-mail para receber o código."}
                            {forgotStep === 2 && "Informe o código enviado para seu e-mail."}
                            {forgotStep === 3 && "Crie sua nova senha de acesso."}
                            {forgotStep === 4 && "Sua senha foi redefinida com sucesso."}
                          </p>
                       </div>
                     </div>

                     {forgotStep === 4 ? (
                        <div className="flex flex-col items-center gap-6">
                           <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-2 shadow-2xl shadow-green-500/30">
                              <Check size={48} className="text-white" strokeWidth={4} />
                           </div>
                           <button 
                             onClick={() => onLogin()}
                             className="w-full bg-white text-[#3f1168] hover:bg-gray-100 font-bold h-[56px] rounded-2xl transition-all shadow-lg mt-6 text-lg tracking-wide border border-transparent hover:border-gray-200"
                           >
                             Entrar na plataforma
                           </button>
                        </div>
                     ) : (
                       <form onSubmit={handleForgotSubmit} className="flex flex-col gap-6">
                          {forgotStep === 1 && (
                             <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-right-4">
                                <label className="text-gray-200 text-base">E-mail</label>
                                <div className="bg-white rounded-2xl h-[56px] flex items-center px-4 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                                  <div className="flex items-center gap-3 w-full">
                                     <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                       <User className="text-gray-500" size={14} />
                                     </div>
                                     <input 
                                       type="email" 
                                       required
                                       value={forgotEmail}
                                       onChange={(e) => setForgotEmail(e.target.value)}
                                       placeholder="seu@email.com"
                                       className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
                                     />
                                  </div>
                                </div>
                             </div>
                          )}

                          {forgotStep === 2 && (
                             <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4">
                                <div className="flex flex-col gap-1">
                                   <label className="text-gray-200 text-base font-bold">Código de verificação</label>
                                   <p className="text-gray-400 text-sm">Enviamos um código para <span className="text-white">{forgotEmail}</span></p>
                                </div>
                                
                                <div className="flex justify-center py-2">
                                   <OTPInput
                                     maxLength={6}
                                     value={forgotCode}
                                     onChange={setForgotCode}
                                     containerClassName="group flex items-center justify-center gap-3 has-[:disabled]:opacity-30"
                                     render={({ slots }) => (
                                       <>
                                         {slots.map((slot, idx) => (
                                           <Slot key={idx} {...slot} />
                                         ))}
                                       </>
                                     )}
                                   />
                                </div>
                             </div>
                          )}

                          {forgotStep === 3 && (
                             <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4">
                                <div className="flex flex-col gap-2">
                                  <label className="text-gray-200 text-base">Nova Senha</label>
                                  <div className="bg-white rounded-2xl h-[56px] flex items-center px-4 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                                     <div className="flex items-center gap-3 w-full">
                                       <div className="shrink-0">
                                         <Lock className="text-gray-400" size={20} />
                                       </div>
                                       <input 
                                         type={showNewPassword ? "text" : "password"} 
                                         value={newPassword}
                                         onChange={(e) => setNewPassword(e.target.value)}
                                         placeholder="Nova senha"
                                         className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base tracking-widest"
                                       />
                                       <button 
                                         type="button"
                                         onClick={() => setShowNewPassword(!showNewPassword)}
                                         className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                       >
                                         {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                       </button>
                                     </div>
                                  </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                  <label className="text-gray-200 text-base">Confirmar Senha</label>
                                  <div className="bg-white rounded-2xl h-[56px] flex items-center px-4 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                                     <div className="flex items-center gap-3 w-full">
                                       <div className="shrink-0">
                                         <Lock className="text-gray-400" size={20} />
                                       </div>
                                       <input 
                                         type={showConfirmPassword ? "text" : "password"} 
                                         value={confirmPassword}
                                         onChange={(e) => setConfirmPassword(e.target.value)}
                                         placeholder="Repita a senha"
                                         className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base tracking-widest"
                                       />
                                       <button 
                                         type="button"
                                         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                         className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                                       >
                                         {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                       </button>
                                     </div>
                                  </div>
                                </div>

                                <div className="bg-white/10 rounded-xl p-3 flex flex-col gap-2">
                                   <div className="flex items-center gap-2 text-sm text-gray-300">
                                      <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center transition-colors", newPassword.length >= 6 ? "bg-green-500 border-green-500" : "border-gray-500")}>
                                         <Check size={10} className="text-white" />
                                      </div>
                                      Mínimo 6 caracteres
                                   </div>
                                   <div className="flex items-center gap-2 text-sm text-gray-300">
                                      <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center transition-colors", /[A-Z]/.test(newPassword) ? "bg-green-500 border-green-500" : "border-gray-500")}>
                                         <Check size={10} className="text-white" />
                                      </div>
                                      1 Letra maiúscula
                                   </div>
                                   <div className="flex items-center gap-2 text-sm text-gray-300">
                                      <div className={cn("w-4 h-4 rounded-full border flex items-center justify-center transition-colors", /[0-9]/.test(newPassword) ? "bg-green-500 border-green-500" : "border-gray-500")}>
                                         <Check size={10} className="text-white" />
                                      </div>
                                      1 Número
                                   </div>
                                </div>
                             </div>
                          )}

                          <button 
                            type="submit"
                            disabled={isLoading || (forgotStep === 3 && (!isPasswordValid || newPassword !== confirmPassword))}
                            className="w-full bg-gradient-to-r from-[#3f1168] to-[#6514ae] hover:from-[#4c157d] hover:to-[#7317c7] text-white font-bold h-[56px] rounded-2xl transition-all shadow-lg shadow-purple-900/40 mt-4 border border-[#b970fa]/30 text-lg tracking-wide disabled:opacity-70 flex items-center justify-center gap-2"
                          >
                             {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                             ) : (
                                forgotStep === 1 ? 'Enviar Código' : 
                                forgotStep === 2 ? 'Verificar' : 
                                'Alterar Senha'
                             )}
                          </button>
                          
                          {forgotStep < 4 && (
                             <button 
                                type="button"
                                onClick={() => {
                                  if(forgotStep > 1) setForgotStep(forgotStep - 1);
                                  else setView('login');
                                }}
                                className="text-gray-400 text-sm hover:text-white transition-colors"
                             >
                                Voltar
                             </button>
                          )}
                       </form>
                     )}
                   </motion.div>
                 )}

                 {view === 'signup' && (
                   <motion.div 
                     key="signup"
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.3 }}
                     className="flex flex-col gap-8"
                   >
                     {/* Header Section */}
                     <div className="flex flex-col gap-6 items-center text-center">
                       <div className="flex flex-col gap-3">
                          <h1 className="text-4xl lg:text-5xl font-extrabold text-white font-[Lufga,sans-serif] tracking-tight">
                            Teste grátis
                          </h1>
                          <p className="text-gray-300 text-lg">
                            Informe seu e-mail para criar sua conta gratuita.
                          </p>
                       </div>
                     </div>

                     <form onSubmit={handleSignupSubmit} className="flex flex-col gap-6">
                        {!isCodeSent ? (
                           <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-right-4">
                              <label className="text-gray-200 text-base">Qual é o seu e-mail?</label>
                              <div className="bg-white rounded-2xl h-[56px] flex items-center px-4 shadow-lg focus-within:ring-2 focus-within:ring-purple-500 transition-all">
                                <div className="flex items-center gap-3 w-full">
                                   <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                                     <User className="text-gray-500" size={14} />
                                   </div>
                                   <input 
                                     type="email" 
                                     required
                                     value={signupEmail}
                                     onChange={(e) => setSignupEmail(e.target.value)}
                                     placeholder="seu@email.com"
                                     className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-base"
                                   />
                                </div>
                              </div>
                           </div>
                        ) : (
                           <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4">
                              <div className="flex flex-col gap-1">
                                 <label className="text-gray-200 text-base font-bold">Código de verificação</label>
                                 <p className="text-gray-400 text-sm">Enviamos um código para <span className="text-white">{signupEmail}</span></p>
                              </div>
                              
                              <div className="flex justify-center py-2">
                                 <OTPInput
                                   maxLength={6}
                                   value={signupCode}
                                   onChange={setSignupCode}
                                   containerClassName="group flex items-center justify-center gap-3 has-[:disabled]:opacity-30"
                                   render={({ slots }) => (
                                     <>
                                       {slots.map((slot, idx) => (
                                         <Slot key={idx} {...slot} />
                                       ))}
                                     </>
                                   )}
                                 />
                              </div>
                           </div>
                        )}

                        <button 
                          type="submit"
                          disabled={isLoading}
                          className="w-full bg-gradient-to-r from-[#3f1168] to-[#6514ae] hover:from-[#4c157d] hover:to-[#7317c7] text-white font-bold h-[56px] rounded-2xl transition-all shadow-lg shadow-purple-900/40 mt-4 border border-[#b970fa]/30 text-lg tracking-wide disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                           {isLoading ? (
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                           ) : (
                              isCodeSent ? 'Validar Código' : 'Continuar'
                           )}
                        </button>
                        
                        {isCodeSent && (
                           <button 
                              type="button"
                              onClick={() => setIsCodeSent(false)}
                              className="text-gray-400 text-sm hover:text-white transition-colors"
                           >
                              Voltar e corrigir e-mail
                           </button>
                        )}
                     </form>
                   </motion.div>
                 )}

                 {view === 'success' && (
                   <motion.div 
                     key="success"
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.4 }}
                     className="flex flex-col gap-8 items-center text-center"
                   >
                      <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-2 shadow-2xl shadow-green-500/30">
                         <Check size={48} className="text-white" strokeWidth={4} />
                      </div>
                      
                      <div className="flex flex-col gap-4">
                         <h1 className="text-4xl font-extrabold text-white font-[Lufga,sans-serif] tracking-tight">
                           Quase lá!
                         </h1>
                         <h2 className="text-2xl font-bold text-white border-b-4 border-green-500 pb-1 w-fit mx-auto">
                           Acesse o seu e-mail.
                         </h2>
                         <p className="text-gray-300 text-lg max-w-sm mx-auto mt-2 leading-relaxed">
                           Finalize o seu cadastro pelo link enviado para o seu e-mail <strong className="text-white">{signupEmail}</strong>.
                         </p>
                      </div>
                      
                      <button 
                        onClick={() => setView('login')}
                        className="w-full bg-white text-[#3f1168] hover:bg-gray-100 font-bold h-[56px] rounded-2xl transition-all shadow-lg mt-6 text-lg tracking-wide border border-transparent hover:border-gray-200"
                      >
                        Voltar para o login
                      </button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
        </div>

        {/* Right Side - Card Container */}
        <div className="hidden lg:flex flex-1 items-center justify-center p-8 h-full pl-20 pointer-events-none">
           <div className="w-[500px] h-[720px] bg-white rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col pointer-events-auto ml-auto mr-16 border-[6px] border-white/10 ring-1 ring-black/5">
              
              {/* Decorative Background Elements */}
              <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-[#f8f5fd] to-transparent pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#8925E2]/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#3f1168]/5 rounded-full blur-3xl pointer-events-none" />

              {/* Card Content */}
              <div className="flex-1 flex flex-col items-center text-center pt-12 pb-8 px-8 relative z-10">
                 <AnimatePresence mode="wait">
                    <motion.div 
                      key={currentSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col items-center gap-6"
                    >
                       <h2 className="text-[32px] font-extrabold text-[#3f1168] font-[Lufga,sans-serif] leading-[1.1] tracking-tight drop-shadow-sm">
                          {slides[currentSlide].title}
                       </h2>
                       <p className="text-gray-600 text-[17px] leading-relaxed max-w-[360px] font-medium">
                          {slides[currentSlide].description}
                       </p>
                    </motion.div>
                 </AnimatePresence>

                 {/* Illustration with Blob Background */}
                 <div className="mt-auto mb-8 relative w-full flex justify-center h-[320px] items-center">
                     {/* Animated Blob Background */}
                     <AnimatePresence mode="wait">
                        <motion.div
                           key={`blob-${currentSlide}`}
                           initial={{ scale: 0.8, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           exit={{ scale: 0.8, opacity: 0 }}
                           transition={{ duration: 0.5 }}
                           className="absolute inset-0 flex items-center justify-center z-0"
                        >
                           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[340px] h-[340px] text-[#8925E2]/10 fill-current transform rotate-12">
                              <path d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-4.9C93.5,9.3,82.2,22.9,71.2,34.3C60.2,45.7,49.5,54.9,37.8,61.9C26.1,68.9,13.4,73.7,-0.4,74.4C-14.2,75.1,-29.3,71.7,-42.1,64.1C-54.9,56.5,-65.4,44.7,-73.2,31.2C-81,17.7,-86.1,2.5,-82.9,-11.2C-79.7,-24.9,-68.2,-37.1,-56.3,-46.3C-44.4,-55.5,-32.1,-61.7,-19.8,-66.1C-7.5,-70.5,4.8,-73.1,17.1,-75.7" transform="translate(100 100)" />
                           </svg>
                        </motion.div>
                     </AnimatePresence>

                     <AnimatePresence mode="wait">
                        <motion.div 
                           key={currentSlide}
                           initial={{ opacity: 0, scale: 0.9, y: 20 }}
                           animate={{ opacity: 1, scale: 1, y: 0 }}
                           exit={{ opacity: 0, scale: 0.9, y: -20 }}
                           transition={{ duration: 0.4, delay: 0.1 }}
                           className="relative z-10 w-[300px] h-[300px] flex items-center justify-center"
                        >
                           {slides[currentSlide].component}
                        </motion.div>
                     </AnimatePresence>
                 </div>

                 {/* Pagination Dots */}
                 <div className="flex gap-2.5 mb-2 bg-gray-100 p-2 rounded-full">
                    {slides.map((_, index) => (
                      <button 
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={cn(
                          "h-2 rounded-full transition-all duration-500 ease-out",
                          currentSlide === index 
                             ? "bg-[#8925E2] w-8 shadow-[0_2px_8px_rgba(137,37,226,0.4)]" 
                             : "bg-gray-300 w-2 hover:bg-gray-400"
                        )}
                      />
                    ))}
                 </div>
              </div>

              {/* Navigation Arrows - Floating on sides */}
              <button 
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#3f1168] bg-white hover:bg-[#f8f5fd] rounded-full shadow-lg border border-gray-100 transition-all hover:-translate-x-1 z-20 group"
              >
                <ChevronLeft size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-[#3f1168] bg-white hover:bg-[#f8f5fd] rounded-full shadow-lg border border-gray-100 transition-all hover:translate-x-1 z-20 group"
              >
                <ChevronRight size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
}