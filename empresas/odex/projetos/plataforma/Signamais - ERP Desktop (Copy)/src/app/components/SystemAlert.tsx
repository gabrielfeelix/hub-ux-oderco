import React, { useEffect, useState } from 'react';
import { X, RefreshCw, WifiOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SystemAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export function SystemAlert({ isOpen, onClose, onRetry }: SystemAlertProps) {
  const [requestId, setRequestId] = useState('ef84a0dc-092e-457e-8943-a1e4c5ef635e');

  useEffect(() => {
    if (isOpen) {
      // Generate a semi-random ID for realism each time it opens
      const randomSegment = Math.random().toString(16).substring(2, 6);
      setRequestId(`ef84a0dc-092e-457e-${randomSegment}-a1e4c5ef635e`);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -50, x: '-50%' }}
          className="fixed top-6 left-1/2 z-[100] w-full max-w-xl"
        >
          <div className="bg-[#FFF5F5] border border-red-100 rounded-2xl p-4 shadow-xl flex items-start justify-between gap-4 mx-4 relative overflow-hidden">
             {/* Decorative loading bar at top */}
             <motion.div 
               className="absolute top-0 left-0 h-1 bg-red-400"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: 60, ease: "linear" }}
             />

             <div className="space-y-1">
                <h3 className="text-[#C62828] font-bold text-sm flex items-center gap-2">
                   <WifiOff size={16} />
                   Não foi possível conectar ao servidor, tente novamente
                </h3>
                <p className="text-[#E57373] text-[10px] font-mono select-all">
                   Request ID: {requestId}
                </p>
             </div>
             <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={onRetry}
                  className="bg-white hover:bg-red-50 text-gray-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-red-100 shadow-sm transition-colors flex items-center gap-1"
                >
                  <RefreshCw size={12} /> Tentar novamente
                </button>
                <button 
                  onClick={onClose}
                  className="text-[#E57373] hover:text-[#C62828] p-1.5 rounded-full hover:bg-red-100/50 transition-colors"
                >
                  <X size={16} />
                </button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}