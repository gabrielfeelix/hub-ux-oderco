import React, { useState } from 'react';
import { 
  ChevronRight, 
  HelpCircle, 
  CheckCircle, 
  Send, 
  X, 
  Copy, 
  Check, 
  Mail, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  User, 
  MoreVertical 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ConfirmModal } from './ConfirmModal';
import { Toast } from './Toast';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface EnvelopeDetailsProps {
  envelopeId: string;
  onBack: () => void;
}

export function EnvelopeDetails({ envelopeId, onBack }: EnvelopeDetailsProps) {
  const [copied, setCopied] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isResendLoading, setIsResendLoading] = useState(false);
  
  // Cancel Modal State
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://signamais.com.br/gcf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
  };

  const handleConfirmResend = () => {
    setIsResendLoading(true);
    setTimeout(() => {
      setIsResendLoading(false);
      setIsResendModalOpen(false);
      setToastMessage("Envelope reenviado com sucesso!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1500);
  };

  const handleConfirmCancel = () => {
    setIsCancelLoading(true);
    setTimeout(() => {
      setIsCancelLoading(false);
      setIsCancelModalOpen(false);
      setToastMessage("Assinatura cancelada com sucesso!");
      setShowToast(true);
      
      // Navigate back after showing toast briefly
      setTimeout(() => {
        setShowToast(false);
        onBack();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-500 pb-24 max-w-[1600px] mx-auto w-full relative">
      
       <Toast 
         visible={showToast} 
         message={toastMessage} 
         onClose={() => setShowToast(false)} 
       />

       {/* Resend Modal */}
       <ConfirmModal 
         isOpen={isResendModalOpen}
         type="resend"
         isLoading={isResendLoading}
         onClose={() => setIsResendModalOpen(false)}
         onConfirm={handleConfirmResend}
         credits={0}
       />

       {/* Cancel Modal */}
       <ConfirmModal 
         isOpen={isCancelModalOpen}
         type="cancel"
         isLoading={isCancelLoading}
         onClose={() => setIsCancelModalOpen(false)}
         onConfirm={handleConfirmCancel}
         credits={0}
       />

       {/* Header Row */}
       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
         {/* Left: Breadcrumb & Title */}
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
               <button 
                onClick={onBack} 
                className="text-[#cf9dfc] hover:text-[#8925e2] transition-colors font-medium flex items-center gap-1"
               >
                 Documentos
               </button>
               <ChevronRight size={14} className="text-[#8925e2]" />
               <span className="font-bold text-[#8925e2]">#{envelopeId}</span>
            </div>
            <div className="flex items-center gap-2">
               <h1 className="text-4xl font-bold font-[Lufga,sans-serif] text-gray-900 dark:text-white">Detalhes do Envelope</h1>
               <HelpCircle size={24} className="text-gray-400 cursor-help hover:text-gray-600 transition-colors" />
            </div>
         </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-6 w-full">
         
         {/* Top Status Bar & Actions */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <span className="text-2xl text-gray-500 dark:text-gray-400">
                 ID Envelope: <span className="text-gray-900 dark:text-white font-bold">#{envelopeId}</span>
               </span>
               <div className="bg-[#e8f3ee] dark:bg-green-900/20 px-3 py-1.5 rounded-full flex items-center gap-2 text-[#177b4c] dark:text-green-400">
                  <CheckCircle size={16} fill="currentColor" className="text-[#177b4c] dark:text-green-400" />
                  <span className="font-bold font-[Lufga,sans-serif]">Assinado</span>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <button 
                 onClick={() => setIsResendModalOpen(true)}
                 className="bg-[#8925e2] text-white px-6 py-3 rounded-2xl font-bold font-[Lufga,sans-serif] flex items-center gap-2 hover:bg-[#701db0] transition-colors shadow-lg shadow-purple-200 dark:shadow-none"
               >
                  Reenviar Notificação
                  <Send size={18} />
               </button>
               <button 
                 onClick={() => setIsCancelModalOpen(true)}
                 className="text-[#6d7379] dark:text-gray-400 px-6 py-3 rounded-2xl font-bold font-[Lufga,sans-serif] flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
               >
                  Cancelar Envelope
                  <X size={18} />
               </button>
            </div>
         </div>

         {/* Info Card */}
         <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <div className="bg-[#f8f9fa] dark:bg-gray-900/50 rounded-xl p-4 flex items-center justify-between gap-4 mb-6 border border-gray-100 dark:border-gray-700/50">
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden flex-1">
                 <span className="text-gray-500 font-bold whitespace-nowrap">Link para assinatura:</span>
                 <span className="text-blue-500 truncate text-sm flex-1">
                   https://signamais.com.br/gcf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e
                 </span>
               </div>
               <div className="flex items-center gap-2">
                 {copied && (
                    <span className="text-[#177B4C] text-sm font-bold animate-in fade-in slide-in-from-right-2 duration-300">
                      Link copiado!
                    </span>
                 )}
                 <button 
                   onClick={handleCopyLink}
                   className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors text-blue-500 relative"
                 >
                   {copied ? <Check size={20} /> : <Copy size={20} />}
                 </button>
               </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
               <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                 <Mail size={18} />
                 <span>Enviado em: <span className="font-bold text-gray-900 dark:text-white">15/11/2024 - 17:27:58</span></span>
               </div>
               <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                 <Clock size={18} />
                 <span>Expira em: <span className="font-bold text-gray-900 dark:text-white">20/11/2024 (5 dias)</span></span>
               </div>
               <div className="flex items-center gap-2 text-green-600 dark:text-green-400 bg-[#e8f3ee] dark:bg-green-900/20 px-3 py-1 rounded-full">
                 <CheckCircle size={16} />
                 <span>Assinado em: <span className="font-bold">15/11/2024 - 17:27:58</span></span>
               </div>
            </div>
         </div>

         {/* Accordions */}
         <div className="flex flex-col gap-4">
            <Accordion 
               title="Signatários" 
               defaultOpen={true}
               customHeaderRight={
                  <div className="flex items-center gap-4 text-sm">
                     <span className="text-gray-500">Assinaturas: <span className="font-bold text-gray-900 dark:text-white">1/2</span></span>
                     <div className="w-[100px] h-[17px] bg-[#e7f1ff] dark:bg-blue-900/20 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-[#ffcd39] rounded-full" />
                     </div>
                  </div>
               }
            >
               <div className="flex flex-col gap-4">
                  <SignatoryRow 
                     index={1} 
                     name="Peter Pan" 
                     email="peter.pan@gmail.com" 
                     progress={1} 
                     total={2} 
                     color="bg-yellow-400"
                  />
                  <SignatoryRow 
                     index={2} 
                     name="Peter Pan" 
                     email="peter.pan@gmail.com" 
                     progress={2} 
                     total={2} 
                     color="bg-blue-500"
                  />
               </div>
            </Accordion>

            <Accordion title="Documento(s) enviado(s)" defaultOpen={false}>
               <div className="overflow-x-auto">
                 <table className="w-full text-sm">
                   <thead>
                     <tr className="bg-purple-50/50 dark:bg-purple-900/10 text-left">
                       <th className="p-3 font-bold text-gray-700 dark:text-gray-300 rounded-l-lg">Documento</th>
                       <th className="p-3 font-bold text-gray-700 dark:text-gray-300">Data de Assinatura</th>
                       <th className="p-3 font-bold text-gray-700 dark:text-gray-300 rounded-r-lg">Status</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                     <DocumentRow name="ContratoAluguel.pdf" date="15/12/2024 - 15:45" status="Pendente" />
                     <DocumentRow name="ContratoAluguel.pdf" date="15/12/2024 - 15:45" status="Assinado" />
                   </tbody>
                 </table>
               </div>
            </Accordion>

            <Accordion title="Histórico do Envelope" defaultOpen={false}>
               <div className="flex flex-col gap-6 pl-4 border-l-2 border-gray-100 dark:border-gray-700 ml-4 py-2">
                  <HistoryItem 
                    date="12 de Nov, 2024 - 14:21:57"
                    name="Arthur Tracz Truculo"
                    action="assinou o documento."
                    email="michael.jackson@gmail.com"
                    code="089edf48-292a-4dac-8b7c-d31b2ef58536"
                  />
                  <HistoryItem 
                    date="12 de Nov, 2024 - 14:21:57"
                    name="Arthur Tracz Truculo"
                    action="assinou o documento."
                    email="michael.jackson@gmail.com"
                    code="089edf48-292a-4dac-8b7c-d31b2ef58536"
                  />
               </div>
            </Accordion>
         </div>

      </div>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false, customHeaderRight }: { title: string, children: React.ReactNode, defaultOpen?: boolean, customHeaderRight?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <h3 className="text-lg font-bold text-[#3f1168] dark:text-[#a855f7] font-[Lufga,sans-serif]">{title}</h3>
        <div className="flex items-center gap-4">
           {customHeaderRight}
           {isOpen ? <ChevronUp size={24} className="text-[#3f1168] dark:text-[#a855f7]" /> : <ChevronDown size={24} className="text-[#3f1168] dark:text-[#a855f7]" />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-700">
              <div className="pt-6">
                {children}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SignatoryRow({ index, name, email, progress, total, color }: { index: number, name: string, email: string, progress: number, total: number, color: string }) {
  return (
    <div className="bg-white border border-gray-100 dark:border-gray-700 dark:bg-gray-900/50 rounded-xl p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
         <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-500">
           <Mail size={20} />
         </div>
         <div>
            <span className="text-xs text-gray-400 block mb-0.5">Signatário {index}</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
                <User size={14} className="text-gray-400" />
                {name}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} className="text-gray-400" />
                {email}
              </div>
            </div>
         </div>
      </div>
      
      <div className="flex items-center gap-4">
         <div className="text-sm text-gray-500">
            Assinaturas: <span className="font-bold text-gray-900 dark:text-white">{progress}/{total}</span>
         </div>
         <div className="w-24 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className={cn("h-full rounded-full", color)} 
              style={{ width: `${(progress/total) * 100}%` }}
            />
         </div>
      </div>
    </div>
  );
}

function DocumentRow({ name, date, status }: { name: string, date: string, status: 'Pendente' | 'Assinado' }) {
  return (
    <tr>
      <td className="p-4 text-gray-600 dark:text-gray-300">{name}</td>
      <td className="p-4 text-gray-500 text-sm">{date}</td>
      <td className="p-4">
        <span className={cn(
          "font-bold text-sm",
          status === 'Assinado' ? "text-green-600 dark:text-green-400" : "text-yellow-600 dark:text-yellow-400"
        )}>
          {status}
        </span>
      </td>
      <td className="p-4 text-right">
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical size={16} />
        </button>
      </td>
    </tr>
  );
}

function HistoryItem({ date, name, action, email, code }: { date: string, name: string, action: string, email: string, code: string }) {
  return (
    <div className="relative">
      <div className="absolute -left-[25px] top-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full border-2 border-green-500 flex items-center justify-center">
        <Check size={12} className="text-green-500" />
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-xs text-gray-400">{date}</span>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <span className="font-bold">{name}</span> {action}
        </p>
        <p className="text-xs text-gray-500">Email: {email}</p>
        <p className="text-xs text-gray-500">Código: {code}</p>
      </div>
    </div>
  );
}
