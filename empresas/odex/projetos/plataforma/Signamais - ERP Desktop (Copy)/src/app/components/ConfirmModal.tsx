import React from 'react';
import { X, Check, Loader2, AlertTriangle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface ConfirmModalProps {
  isOpen: boolean;
  type: 'standard' | 'no-position' | 'resend' | 'cancel' | 'delete-client' | 'deactivate-client';
  isLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  credits: number;
  count?: number; // Number of items affected
}

export function ConfirmModal({ 
  isOpen, 
  type, 
  isLoading, 
  onClose, 
  onConfirm,
  credits,
  count = 1
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const isBulk = count > 1;

  let title = "Tem certeza que deseja enviar?";
  let body: React.ReactNode = (
    <>
      Serão descontados <span className="font-bold text-[#212529] dark:text-white">{credits} créditos</span> do seu saldo.
    </>
  );
  let confirmText = "Sim";
  let confirmButtonColor = "bg-[#8925e2] hover:bg-[#701db0]";
  let icon = <Check size={20} />;

  if (type === 'no-position') {
    title = "Tem certeza que deseja enviar sem posicionar assinatura(s)?";
    body = "Após enviado não será possível adicionar assinaturas manualmente.";
  } else if (type === 'resend') {
    title = "Tem certeza que deseja reenviar o envelope?";
    body = null; 
    confirmText = "Reenviar";
  } else if (type === 'cancel') {
    title = "Tem certeza que deseja cancelar o envelope?";
    body = "Esta ação é irreversível. Todas as assinaturas concluídas serão perdidas e o documento será invalidado.";
    confirmText = "Sim, cancelar";
    confirmButtonColor = "bg-red-600 hover:bg-red-700";
  } else if (type === 'delete-client') {
    title = isBulk ? `Excluir ${count} Clientes` : "Excluir Cliente";
    body = isBulk 
      ? `Tem certeza que deseja excluir permanentemente os ${count} clientes selecionados? Todos os dados associados serão perdidos. Esta ação não pode ser desfeita.`
      : "Tem certeza que deseja excluir este cliente permanentemente? Todos os dados associados serão perdidos. Esta ação não pode ser desfeita.";
    confirmText = isBulk ? "Sim, excluir todos" : "Sim, excluir";
    confirmButtonColor = "bg-red-600 hover:bg-red-700";
    icon = <X size={20} />;
  } else if (type === 'deactivate-client') {
    title = isBulk ? `Desativar ${count} Clientes` : "Desativar Cliente";
    body = isBulk
      ? `Tem certeza que deseja desativar os ${count} clientes selecionados? Eles perderão o acesso à plataforma, mas seus dados serão mantidos.`
      : "Tem certeza que deseja desativar este cliente? Ele perderá o acesso à plataforma, mas seus dados serão mantidos.";
    confirmText = isBulk ? "Sim, desativar todos" : "Sim, desativar";
    confirmButtonColor = "bg-orange-500 hover:bg-orange-600";
    icon = <AlertTriangle size={20} />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-[500px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
        
        {/* Header */}
        <div className={cn(
          "p-8 flex justify-between items-start",
          body ? "pb-6 border-b border-gray-100 dark:border-gray-700" : "pb-8" 
        )}>
          <h2 className="text-xl font-bold text-[#212529] dark:text-white font-[Segoe_UI,sans-serif] leading-tight pr-4">
            {title}
          </h2>
          <button 
            onClick={onClose}
            className="text-[#212529] dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        {body && (
          <div className="p-8 py-6">
            <p className="text-[#495057] dark:text-gray-300 text-base font-[Segoe_UI,sans-serif] leading-relaxed">
              {body}
            </p>
          </div>
        )}

        {/* Footer */}
        <div className="p-8 pt-6 flex justify-end gap-3 bg-white dark:bg-gray-800">
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-3.5 rounded-2xl border-2 border-[#abafb2] text-[#6d7379] font-bold font-[Lufga,sans-serif] hover:border-gray-400 hover:text-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>
          
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              "px-6 py-3.5 rounded-2xl flex items-center gap-2 font-bold font-[Lufga,sans-serif] text-white transition-all shadow-lg min-w-[100px] justify-center",
              isLoading ? "bg-gray-400 cursor-wait" : confirmButtonColor
            )}
          >
            {isLoading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <>
                {confirmText} {icon}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
