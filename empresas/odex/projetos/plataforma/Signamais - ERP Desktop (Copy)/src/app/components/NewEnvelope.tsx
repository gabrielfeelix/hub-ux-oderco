import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronRight, 
  HelpCircle, 
  Check, 
  Upload, 
  Plus, 
  Info,
  FileText,
  Loader2,
  Trash2,
  PenLine,
  Mail,
  User,
  RotateCw
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { DocumentPreview } from './DocumentPreview';
import { ConfirmModal } from './ConfirmModal';
import { SignatorySelector, SignaturePlaceholder } from './SignatureWidgets';
import { SuccessScreen } from './SuccessScreen';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface NewEnvelopeProps {
  onBack: () => void;
  initialData?: any;
}

interface Signatory {
  id: string;
  name: string;
  email: string;
  saved: boolean;
}

interface Signature {
  id: string;
  x: number;
  y: number;
  signatoryId: string;
  signatoryName: string;
}

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
  clickX: number; // Click position relative to document container
  clickY: number;
}

interface ModalState {
  isOpen: boolean;
  type: 'standard' | 'no-position';
  isLoading: boolean;
}

export function NewEnvelope({ onBack, initialData }: NewEnvelopeProps) {
  const [status, setStatus] = useState<'upload' | 'loading' | 'loaded' | 'success'>(initialData ? 'loaded' : 'upload');
  const [signatories, setSignatories] = useState<Signatory[]>(
    initialData?.recipients 
      ? initialData.recipients.map((r: any) => ({ ...r, saved: false })) 
      : [{ id: '1', name: '', email: '', saved: false }]
  );
  // If template provided, assume signatures are part of it (mocked here as empty array as mapping positions is complex)
  const [signatures, setSignatures] = useState<Signature[]>([]); 
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ visible: false, x: 0, y: 0, clickX: 0, clickY: 0 });
  const [modal, setModal] = useState<ModalState>({ isOpen: false, type: 'standard', isLoading: false });

  const docContainerRef = useRef<HTMLDivElement>(null);

  // Close context menu on global click
  useEffect(() => {
    const handleClick = () => setContextMenu(prev => ({ ...prev, visible: false }));
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Handle file upload simulation
  const handleUpload = () => {
    setStatus('loading');
    setTimeout(() => {
      setStatus('loaded');
    }, 2000); 
  };

  const handleReset = () => {
    setStatus('upload');
    setSignatories([{ id: '1', name: '', email: '', saved: false }]);
    setSignatures([]);
    setModal({ isOpen: false, type: 'standard', isLoading: false });
  };

  // Signatory Management
  const addSignatory = () => {
    const newId = (signatories.length + 1).toString();
    setSignatories([...signatories, { id: newId, name: '', email: '', saved: false }]);
  };

  const updateSignatory = (id: string, field: 'name' | 'email', value: string) => {
    setSignatories(signatories.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const saveSignatory = (id: string) => {
    if (!signatories.find(s => s.id === id)?.name || !signatories.find(s => s.id === id)?.email) return;
    setSignatories(signatories.map(s => 
      s.id === id ? { ...s, saved: true } : s
    ));
  };

  const editSignatory = (id: string) => {
    setSignatories(signatories.map(s => 
      s.id === id ? { ...s, saved: false } : s
    ));
  };

  const deleteSignatory = (id: string) => {
    setSignatories(signatories.filter(s => s.id !== id));
    // Also remove signatures associated with this signatory
    setSignatures(signatures.filter(s => s.signatoryId !== id));
  };

  // Document Interaction
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'loaded') return;

    if (docContainerRef.current) {
      const rect = docContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Only allow adding if there are saved signatories
      const hasSavedSignatories = signatories.some(s => s.saved);
      if (hasSavedSignatories) {
         setContextMenu({
           visible: true,
           x: x, // Position relative to container for rendering
           y: y,
           clickX: x,
           clickY: y
         });
      }
    }
  };

  const handleInsertSignature = (signatory: { id: string; name: string }) => {
    const newSignature: Signature = {
      id: Math.random().toString(36).substr(2, 9),
      x: contextMenu.clickX,
      y: contextMenu.clickY,
      signatoryId: signatory.id,
      signatoryName: signatory.name
    };
    setSignatures([...signatures, newSignature]);
    setContextMenu(prev => ({ ...prev, visible: false }));
  };

  const handleDuplicateSignature = (id: string) => {
    const signatureToDuplicate = signatures.find(s => s.id === id);
    if (signatureToDuplicate) {
      const newSignature: Signature = {
        ...signatureToDuplicate,
        id: Math.random().toString(36).substr(2, 9),
        x: signatureToDuplicate.x + 20,
        y: signatureToDuplicate.y + 20
      };
      setSignatures([...signatures, newSignature]);
    }
  };

  const handleUpdateSignaturePosition = (id: string, x: number, y: number) => {
    setSignatures(signatures.map(s => 
      s.id === id ? { ...s, x, y } : s
    ));
  };

  const handleDeleteSignature = (id: string) => {
    setSignatures(signatures.filter(s => s.id !== id));
  };

  // Modal Handling
  const openModal = (type: 'standard' | 'no-position') => {
    setModal({ isOpen: true, type, isLoading: false });
  };

  const handleConfirmSend = () => {
    setModal(prev => ({ ...prev, isLoading: true }));
    // Simulate API call
    setTimeout(() => {
      setModal(prev => ({ ...prev, isLoading: false, isOpen: false }));
      setStatus('success'); // Show success screen
    }, 2000);
  };

  if (status === 'success') {
    return <SuccessScreen onNewEnvelope={handleReset} onGoToDocuments={onBack} />;
  }

  const savedSignatories = signatories.filter(s => s.saved);
  const hasSavedSignatories = savedSignatories.length > 0;
  const hasSignatures = signatures.length > 0;
  
  // Check if the last signatory is saved to show the "Add New" button
  const isLastSignatorySaved = signatories.length > 0 && signatories[signatories.length - 1].saved;
  // Also show if there are no signatories (initial state handled by empty check, but if user deletes all)
  const canAddSignatory = isLastSignatorySaved || signatories.length === 0;

  return (
    <div id="tour-new-envelope-form" className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Modals */}
      <ConfirmModal 
        isOpen={modal.isOpen}
        type={modal.type}
        isLoading={modal.isLoading}
        onClose={() => setModal({ ...modal, isOpen: false })}
        onConfirm={handleConfirmSend}
        credits={10}
      />

      {/* Header Row */}
      <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
         {/* Left: Breadcrumb & Title */}
         <div className="flex flex-col gap-2 flex-1 min-w-0 pr-4">
            <div className="flex items-center gap-2 text-sm">
               <button 
                onClick={onBack} 
                className="text-[#cf9dfc] hover:text-[#8925e2] transition-colors font-medium flex items-center gap-1"
               >
                 Documentos
               </button>
               <ChevronRight size={14} className="text-[#8925e2]" />
               <span className="font-bold text-[#8925e2]">Novo Envelope</span>
            </div>
            <div className="flex items-start gap-2">
               <h1 className="text-4xl font-bold font-[Lufga,sans-serif] text-gray-900 dark:text-white leading-tight break-words">
                 {initialData ? `Novo Envelope: ${initialData.name}` : 'Novo Envelope'}
               </h1>
               <HelpCircle size={24} className="text-gray-400 cursor-help hover:text-gray-600 transition-colors shrink-0 mt-2" />
            </div>
         </div>

         {/* Right: Actions */}
         <div className="flex flex-wrap items-center gap-4 shrink-0 justify-end">
            {/* Credits Pill */}
            <div className="bg-[#f5f4f7] dark:bg-gray-800 rounded-full pl-2 pr-4 py-1.5 flex items-center gap-3 border border-gray-100 dark:border-gray-700">
               <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                 <FileText size={14} className="text-gray-600 dark:text-gray-300" />
               </div>
               <span className="text-sm text-gray-500 dark:text-gray-400">
                 Disponíveis: <span className="font-bold text-[#8925e2] dark:text-[#a855f7]">125/200</span>
               </span>
            </div>
            
            {status === 'loaded' ? (
               <button 
                onClick={handleUpload}
                className="px-6 py-3 rounded-2xl border-2 border-[#abafb2] text-[#6d7379] font-bold flex items-center gap-2 hover:border-gray-400 hover:text-gray-800 transition-colors whitespace-nowrap dark:border-gray-600 dark:text-gray-400 dark:hover:text-gray-200"
               >
                  Substituir Documento
                  <RotateCw size={20} />
               </button>
            ) : null}
            
            <button 
              onClick={() => openModal('no-position')}
              disabled={!hasSavedSignatories}
              className={cn(
                "px-6 py-3 rounded-2xl border-2 font-bold flex items-center gap-2 transition-colors whitespace-nowrap",
                hasSavedSignatories 
                  ? "border-[#8925e2] text-[#8925e2] hover:bg-purple-50 dark:hover:bg-purple-900/20" 
                  : "border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-700 dark:text-gray-600"
              )}
            >
               Enviar sem posicionar
               <Check size={20} />
            </button>
            
            <button 
              onClick={() => openModal('standard')}
              disabled={!hasSignatures}
              className={cn(
                "px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-colors shadow-lg whitespace-nowrap",
                hasSignatures
                  ? "bg-[#8925e2] text-white hover:bg-[#701db0] shadow-purple-200 dark:shadow-purple-900/20"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none dark:bg-gray-800 dark:text-gray-600"
              )}
            >
               Enviar
               <Check size={20} className={hasSignatures ? "text-white" : "text-gray-400 dark:text-gray-600"} />
            </button>
         </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 min-h-[600px]">
         {/* Left: Upload Area / Document Preview */}
         <div 
            ref={docContainerRef}
            onContextMenu={handleContextMenu}
            className="bg-[#f6f8fa] dark:bg-gray-800/50 rounded-2xl flex items-center justify-center p-8 md:p-12 lg:p-24 border border-gray-100 dark:border-gray-700/50 overflow-auto min-h-[800px] relative"
         >
            {/* Signatory Selector Widget */}
            {contextMenu.visible && (
              <SignatorySelector 
                x={contextMenu.x}
                y={contextMenu.y}
                signatories={savedSignatories}
                onSelect={handleInsertSignature}
                onClose={() => setContextMenu(prev => ({ ...prev, visible: false }))}
              />
            )}

            {/* Placed Signatures */}
            {signatures.map(sig => (
              <SignaturePlaceholder 
                key={sig.id}
                x={sig.x}
                y={sig.y}
                signatoryName={sig.signatoryName}
                onDelete={() => handleDeleteSignature(sig.id)}
                onDuplicate={() => handleDuplicateSignature(sig.id)}
                onPositionChange={(x, y) => handleUpdateSignaturePosition(sig.id, x, y)}
              />
            ))}

            {status === 'upload' && (
               <div 
                  onClick={handleUpload}
                  className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-dashed border-[#cf9dfc] dark:border-purple-700 p-12 flex flex-col items-center gap-6 w-full max-w-[451px] cursor-pointer hover:border-[#8925e2] dark:hover:border-purple-500 transition-colors group animate-in zoom-in-95 duration-300"
               >
                  <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full border-2 border-[#9729f8] flex items-center justify-center text-[#8925e2] font-bold text-sm bg-transparent">1</div>
                     <span className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-[#8925e2] transition-colors">Selecione um documento</span>
                  </div>
                  
                  <div className="w-[72px] h-[72px] bg-[#f5eafe] dark:bg-purple-900/30 rounded-full flex items-center justify-center text-[#8925e2]">
                     <Upload size={32} />
                  </div>
                  
                  <div className="text-center text-[#6d7379] dark:text-gray-400 text-sm">
                     <p>Tamanho máximo: <span className="font-bold font-[Lufga,sans-serif]">25mb</span></p>
                     <p>Formatos suportados: .pdf e .doc</p>
                  </div>
               </div>
            )}

            {status === 'loading' && (
               <div className="flex flex-col items-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full border-4 border-[#f5eafe] border-t-[#8925e2] animate-spin"></div>
                  <p className="text-[#8925e2] font-bold text-lg animate-pulse">Carregando documento...</p>
               </div>
            )}

            {status === 'loaded' && (
               <div className="w-full h-full animate-in fade-in slide-in-from-bottom-8 duration-500 pointer-events-none">
                  {/* Document Content is not clickable to allow context menu on container */}
                  <div className="pointer-events-none">
                     <DocumentPreview />
                  </div>
               </div>
            )}
         </div>

         {/* Right: Sidebar */}
         <div className="flex flex-col gap-8 p-6 bg-white dark:bg-gray-800 rounded-2xl sticky top-6 h-fit border border-gray-100 dark:border-gray-700 shadow-sm">
            {/* Signatories Section */}
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-[#9729f8] flex items-center justify-center text-[#8925e2] font-bold text-sm">2</div>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white font-[Lufga,sans-serif]">Signatários</h2>
               </div>
               
               <div className="flex flex-col gap-4">
                  {signatories.map((signatory, index) => (
                    <div key={signatory.id} className="flex flex-col gap-4 animate-in slide-in-from-right-4 duration-300 fill-mode-backwards" style={{ animationDelay: `${index * 100}ms` }}>
                       <div className="flex items-center justify-between">
                          <h3 className="text-[#858a8e] font-bold font-[Lufga,sans-serif]">
                            {index + 1}º Signatário
                          </h3>
                       </div>

                       {signatory.saved ? (
                         // Saved State (Card View)
                         <div className="bg-white dark:bg-gray-800 rounded-2xl border border-[#edeeee] dark:border-gray-700 p-4 flex items-center justify-between shadow-sm group hover:border-[#8925e2] transition-colors">
                            <div className="flex flex-col gap-2 overflow-hidden">
                               <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                                  <User size={16} className="text-gray-400 shrink-0" />
                                  <span className="truncate">{signatory.name || 'Sem nome'}</span>
                               </div>
                               <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                                  <Mail size={16} className="text-gray-400 shrink-0" />
                                  <span className="truncate">{signatory.email || 'Sem e-mail'}</span>
                               </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                               <button 
                                 onClick={() => editSignatory(signatory.id)}
                                 className="p-2 text-gray-400 hover:text-[#8925e2] hover:bg-[#f5eafe] rounded-lg transition-colors"
                               >
                                  <PenLine size={18} />
                               </button>
                               <button 
                                 onClick={() => deleteSignatory(signatory.id)}
                                 className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                               >
                                  <Trash2 size={18} />
                               </button>
                            </div>
                         </div>
                       ) : (
                         // Edit State (Form Inputs)
                         <>
                            <div className="flex flex-col gap-2">
                               <label className="text-[#42494f] dark:text-gray-400 font-normal">Nome</label>
                               <div className="bg-[#f5f4f7] dark:bg-gray-700/50 rounded-2xl px-4 py-3.5 focus-within:ring-2 ring-[#8925e2]/20 transition-all border border-transparent focus-within:border-[#8925e2]/50">
                                  <input 
                                    type="text" 
                                    placeholder="Insira um nome" 
                                    value={signatory.name}
                                    onChange={(e) => updateSignatory(signatory.id, 'name', e.target.value)}
                                    className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
                                  />
                               </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 relative">
                               <label className="text-[#42494f] dark:text-gray-400 font-normal">E-mail</label>
                               <div className="flex gap-2">
                                  <div className="bg-[#f5f4f7] dark:bg-gray-700/50 rounded-2xl px-4 py-3.5 focus-within:ring-2 ring-[#8925e2]/20 transition-all border border-transparent focus-within:border-[#8925e2]/50 flex-1">
                                     <input 
                                       type="email" 
                                       placeholder="email@mail.com" 
                                       value={signatory.email}
                                       onChange={(e) => updateSignatory(signatory.id, 'email', e.target.value)}
                                       className="w-full bg-transparent outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400"
                                     />
                                  </div>
                                  <button 
                                    onClick={() => deleteSignatory(signatory.id)}
                                    className="p-3.5 rounded-2xl border-2 border-transparent hover:bg-red-50 hover:text-red-500 text-gray-400 transition-colors"
                                    title="Excluir signatário"
                                  >
                                     <Trash2 size={20} />
                                  </button>
                               </div>
                            </div>
                            
                            <div className="flex gap-4 mt-2">
                               <button 
                                 onClick={() => saveSignatory(signatory.id)}
                                 className="flex-1 py-3.5 rounded-2xl border-2 border-[#8925e2] bg-white dark:bg-gray-800 text-[#8925e2] font-bold flex items-center justify-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-[Lufga,sans-serif]"
                               >
                                  Salvar
                                  <Check size={20} />
                               </button>
                            </div>
                         </>
                       )}
                    </div>
                  ))}
                  
                  {canAddSignatory && (
                    <button 
                       onClick={addSignatory}
                       className="w-full py-3.5 rounded-2xl border-2 border-[#8925e2] text-[#8925e2] border-dashed font-bold flex items-center justify-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors font-[Lufga,sans-serif]"
                     >
                        Adicionar {signatories.length > 0 ? (signatories.length + 1) + 'º' : '1º'} Signatário
                        <Plus size={20} />
                     </button>
                  )}
               </div>
            </div>

            {/* Signatures Section */}
            <div className="flex flex-col gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-[#9729f8] flex items-center justify-center text-[#8925e2] font-bold text-sm">3</div>
                  <h2 className="font-bold text-xl text-gray-900 dark:text-white font-[Lufga,sans-serif]">Assinaturas</h2>
               </div>
               
               <div className="bg-[#e7f1ff] dark:bg-blue-900/20 rounded-lg p-4 flex items-center gap-2 text-[#0c64e6] dark:text-blue-400">
                  <span className="font-bold font-[Lufga,sans-serif]">{signatures.length}</span>
                  <span className="font-normal text-[#6d7379] dark:text-blue-200">Assinaturas adicionadas</span>
               </div>
               
               <div className="flex gap-3 text-base text-[#42494f] dark:text-gray-400">
                  <Info size={24} className="shrink-0 text-[#42494f] dark:text-gray-400" />
                  <p className="leading-relaxed">
                    Para adicionar um local de assinatura, <span className="font-bold font-[Lufga,sans-serif]">clique com o botão direito</span> em alguma parte do documento a esquerda.
                  </p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
