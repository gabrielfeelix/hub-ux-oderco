import React, { useState } from 'react';
import { 
  CheckCircle, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Clock, 
  Calendar, 
  User, 
  ArrowRight,
  Download,
  MoreVertical,
  Check,
  ChevronRight,
  HelpCircle,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface SuccessScreenProps {
  onNewEnvelope: () => void;
  onGoToDocuments: () => void;
}

export function SuccessScreen({ onNewEnvelope, onGoToDocuments }: SuccessScreenProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://signamais.com.br/gcf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e")
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        // Fallback or just ignore if it fails in preview
        setCopied(true); // Pretend it worked for UI feedback in preview
        setTimeout(() => setCopied(false), 2000);
      });
  };

  return (
    <div className="flex flex-col gap-8 h-full animate-in fade-in duration-500 relative pb-24">
      
       {/* Header Row - Matches NewEnvelope Layout */}
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         {/* Left: Breadcrumb & Title */}
         <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
               <button 
                onClick={onGoToDocuments} 
                className="text-[#cf9dfc] hover:text-[#8925e2] transition-colors font-medium flex items-center gap-1"
               >
                 Documentos
               </button>
               <ChevronRight size={14} className="text-[#8925e2]" />
               <span className="font-bold text-[#8925e2]">Novo Envelope</span>
            </div>
            <div className="flex items-center gap-2">
               <h1 className="text-4xl font-bold font-[Lufga,sans-serif] text-gray-900 dark:text-white">Novo Envelope</h1>
               <HelpCircle size={24} className="text-gray-400 cursor-help hover:text-gray-600 transition-colors" />
            </div>
         </div>

         {/* Right: Credits Pill */}
         <div className="flex flex-wrap items-center gap-4">
            <div className="bg-[#f5f4f7] dark:bg-gray-800 rounded-full pl-2 pr-4 py-1.5 flex items-center gap-3 border border-gray-100 dark:border-gray-700">
               <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                 <DollarSign size={14} className="text-gray-600 dark:text-gray-300 font-bold" />
               </div>
               <span className="text-sm text-gray-500 dark:text-gray-400">
                 Créditos: <span className="font-bold text-[#6b1db0] dark:text-[#a855f7]">25</span>
               </span>
            </div>
         </div>
      </div>

      {/* Main Content Centered */}
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto relative">
          
          {/* Success Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center gap-4 mb-12 relative z-10"
          >
            <div className="relative mb-4">
              <div className="w-48 h-32 bg-purple-50 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                  <div className="relative">
                    <Mail size={80} className="text-[#5d9efe]" strokeWidth={1} />
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 border-4 border-white dark:border-gray-900"
                    >
                      <Check size={24} className="text-white" strokeWidth={4} />
                    </motion.div>
                  </div>
              </motion.div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 dark:text-white font-[Lufga,sans-serif]">
              Envelope enviado com sucesso! 😎🚀
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl">
              Agora é só aguardar as partes assinarem, se precisar, você pode copiar o link de assinatura do documento abaixo e enviar diretamente.
            </p>
          </motion.div>

          {/* Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 mb-8 relative z-10"
          >
            <div className="mb-4">
              <span className="text-gray-400 text-sm font-medium">ID Envelope: </span>
              <span className="text-gray-900 dark:text-white font-bold text-lg">#26364</span>
            </div>

            <div className="bg-[#f8f9fa] dark:bg-gray-900/50 rounded-xl p-4 flex items-center justify-between gap-4 mb-6 border border-gray-100 dark:border-gray-700/50">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden">
                <span className="text-gray-500 font-bold whitespace-nowrap">Link para assinatura:</span>
                <span className="text-blue-500 truncate text-sm">
                  https://signamais.com.br/gcf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e
                </span>
              </div>
              <button 
                onClick={handleCopyLink}
                className="p-2 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors text-blue-500 relative"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
                {copied && (
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">Copiado!</span>
                )}
              </button>
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
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                <CheckCircle size={16} />
                <span>Assinado em: <span className="font-bold">15/11/2024 - 17:27:58</span></span>
              </div>
            </div>
          </motion.div>

          {/* Accordions */}
          <div className="w-full flex flex-col gap-4 relative z-10">
            <Accordion title="Signatários" defaultOpen={false}>
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

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={onNewEnvelope}
          className="bg-white dark:bg-gray-800 text-[#8925e2] font-bold py-3 px-6 rounded-full shadow-lg border-2 border-[#8925e2] hover:bg-purple-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2 group"
        >
          Novo Envelope
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function Accordion({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
      >
        <h3 className="text-lg font-bold text-[#8925e2] font-[Lufga,sans-serif]">{title}</h3>
        {isOpen ? <ChevronUp size={20} className="text-[#8925e2]" /> : <ChevronDown size={20} className="text-[#8925e2]" />}
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
