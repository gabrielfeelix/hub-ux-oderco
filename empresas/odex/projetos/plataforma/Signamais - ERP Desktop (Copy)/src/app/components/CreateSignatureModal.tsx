import React, { useState, useRef } from 'react';
import { X, PenTool, Upload, Type, Eraser, RotateCcw, Check, MousePointer2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface CreateSignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export function CreateSignatureModal({ isOpen, onClose, onSave }: CreateSignatureModalProps) {
  const [activeTab, setActiveTab] = useState<'draw' | 'upload' | 'type'>('draw');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [typedName, setTypedName] = useState('');
  const [signatureName, setSignatureName] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  // Drawing Logic
  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div 
        className="bg-white dark:bg-gray-800 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-white dark:bg-gray-800 z-10">
          <div>
            <h3 className="font-bold text-xl text-gray-900 dark:text-white font-['Lufga',sans-serif]">Criar Nova Assinatura</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Escolha como deseja criar sua assinatura digital.</p>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Tabs */}
          <div className="bg-gray-100 dark:bg-gray-700/50 p-1.5 rounded-2xl flex gap-1">
            <button 
              onClick={() => setActiveTab('draw')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200",
                activeTab === 'draw' 
                  ? "bg-white dark:bg-gray-800 text-[#8925e2] shadow-sm ring-1 ring-black/5" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
              )}
            >
              <PenTool size={18} className={activeTab === 'draw' ? "stroke-2" : ""} /> 
              Desenhar
            </button>
            <button 
              onClick={() => setActiveTab('upload')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200",
                activeTab === 'upload' 
                  ? "bg-white dark:bg-gray-800 text-[#8925e2] shadow-sm ring-1 ring-black/5" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
              )}
            >
              <Upload size={18} className={activeTab === 'upload' ? "stroke-2" : ""} /> 
              Upload
            </button>
            <button 
              onClick={() => setActiveTab('type')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200",
                activeTab === 'type' 
                  ? "bg-white dark:bg-gray-800 text-[#8925e2] shadow-sm ring-1 ring-black/5" 
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-200/50 dark:hover:bg-gray-600/50"
              )}
            >
              <Type size={18} className={activeTab === 'type' ? "stroke-2" : ""} /> 
              Digitar
            </button>
          </div>

          {/* Canvas Area */}
          <div className="relative group">
            <div className={cn(
              "h-64 border-2 border-dashed rounded-2xl flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 overflow-hidden transition-colors",
              isDrawing ? "border-[#8925e2] bg-purple-50/10" : "border-gray-200 dark:border-gray-700"
            )}>
              
              {activeTab === 'draw' && (
                <>
                  <canvas 
                    ref={canvasRef}
                    width={800}
                    height={300}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-full cursor-crosshair touch-none active:cursor-crosshair"
                  />
                  
                  {/* Floating Tools */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button 
                      onClick={clearCanvas} 
                      className="p-2 bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 rounded-lg text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors tooltip"
                      title="Limpar tudo"
                    >
                      <Eraser size={16} />
                    </button>
                    <button 
                      className="p-2 bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 rounded-lg text-gray-500 hover:text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                      title="Desfazer"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>

                  {!isDrawing && (
                    <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 animate-in fade-in duration-500">
                       <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
                          <MousePointer2 size={24} className="text-gray-300 dark:text-gray-500" />
                       </div>
                       <span className="text-sm font-medium">Desenhe sua assinatura aqui</span>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'upload' && (
                <div className="text-center p-8 animate-in fade-in zoom-in-95 duration-300">
                   <div className="w-20 h-20 bg-purple-50 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-[#8925e2] ring-8 ring-purple-50/50 dark:ring-purple-900/10">
                      <Upload size={32} />
                   </div>
                   <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-2">Upload de Imagem</h4>
                   <p className="text-sm text-gray-500 max-w-xs mx-auto mb-6">Arraste e solte sua assinatura aqui ou clique para selecionar um arquivo (JPG, PNG).</p>
                   <button className="px-6 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm">
                      Selecionar do Computador
                   </button>
                </div>
              )}

              {activeTab === 'type' && (
                <div className="w-full p-12 flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
                   <input 
                     type="text" 
                     value={typedName}
                     onChange={(e) => setTypedName(e.target.value)}
                     placeholder="Seu nome" 
                     className="w-full text-center text-5xl font-[Dancing_Script] border-b-2 border-transparent focus:border-[#8925e2] bg-transparent outline-none py-4 text-gray-800 dark:text-white placeholder-gray-300 transition-colors"
                     autoFocus
                   />
                   <p className="mt-4 text-sm text-gray-400">Digite seu nome para gerar uma assinatura</p>
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
               <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Nome da Assinatura</label>
               <input 
                  type="text" 
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Ex: Assinatura Principal" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-[#8925e2] focus:border-transparent outline-none transition-all text-sm font-medium"
               />
            </div>
            
            <div className="flex items-end pb-3">
               <label className="flex items-center gap-3 cursor-pointer group select-none">
                  <div className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200",
                    isDefault ? "bg-[#8925e2] border-[#8925e2]" : "border-gray-300 dark:border-gray-600 group-hover:border-[#8925e2]"
                  )}>
                     {isDefault && <Check size={14} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={isDefault}
                    onChange={() => setIsDefault(!isDefault)}
                  />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-[#8925e2] transition-colors">Definir como padrão</span>
                     <span className="text-xs text-gray-400">Esta será usada automaticamente</span>
                  </div>
               </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 font-bold text-sm transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => onSave({ activeTab, typedName, signatureName, isDefault })}
            className="px-8 py-2.5 bg-[#8925e2] text-white rounded-xl font-bold text-sm hover:bg-[#7a1fd0] transition-all shadow-lg shadow-purple-500/20 active:scale-95 transform"
          >
            Salvar Assinatura
          </button>
        </div>

      </div>
    </div>
  );
}