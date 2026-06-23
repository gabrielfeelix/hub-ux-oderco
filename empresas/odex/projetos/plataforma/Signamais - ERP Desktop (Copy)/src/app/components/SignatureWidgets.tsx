import React from 'react';
import { ChevronDown, Copy, RotateCw, X } from 'lucide-react';
import { motion } from 'motion/react';

interface SignatorySelectorProps {
  x: number;
  y: number;
  signatories: Array<{ id: string; name: string }>;
  onSelect: (signatory: { id: string; name: string }) => void;
  onClose: () => void;
}

export function SignatorySelector({ x, y, signatories, onSelect, onClose }: SignatorySelectorProps) {
  // Simple state to track selection, defaulting to first or null
  const [selectedId, setSelectedId] = React.useState(signatories[0]?.id || '');

  const handleInsert = () => {
    const signatory = signatories.find(s => s.id === selectedId);
    if (signatory) {
      onSelect(signatory);
    }
  };

  return (
    <div 
      className="absolute z-40 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-[0px_0px_36px_0px_rgba(225,227,235,0.4)] flex flex-col gap-4 w-[280px] animate-in zoom-in-95 duration-200"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm text-[#42494f] dark:text-gray-400 font-normal">Signatário</label>
        <div className="relative">
          <select 
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full bg-[#f5f4f7] dark:bg-gray-700 text-[#42494f] dark:text-white h-10 px-3 pr-8 rounded-lg appearance-none outline-none focus:ring-2 ring-[#8925e2]/20 border-none cursor-pointer"
          >
            {signatories.map(s => (
              <option key={s.id} value={s.id}>{s.name || 'Sem nome'}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-[#42494f] pointer-events-none" size={20} />
        </div>
      </div>
      
      <div className="flex justify-end">
         <button 
           onClick={handleInsert}
           disabled={!selectedId}
           className="bg-[#8925e2] text-white px-4 py-2 rounded-lg font-bold font-[Lufga,sans-serif] text-sm hover:bg-[#701db0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
         >
           Inserir
         </button>
      </div>
    </div>
  );
}

interface SignaturePlaceholderProps {
  x: number;
  y: number;
  signatoryName: string;
  onDelete: () => void;
  onDuplicate: () => void;
  onPositionChange: (x: number, y: number) => void;
}

export function SignaturePlaceholder({ x, y, signatoryName, onDelete, onDuplicate, onPositionChange }: SignaturePlaceholderProps) {
  // We use key={x+y} trick or similar to force re-render if needed, but motion usually handles it if we reset style.
  // Actually, standard draggable implementation often uses transform for dragging, then commits to left/top.
  
  return (
    <motion.div 
      drag
      dragMomentum={false}
      onDragEnd={(_, info) => {
        // Update parent state with new position
        // We add the drag offset to the original position
        onPositionChange(x + info.offset.x, y + info.offset.y);
      }}
      // Reset transform when the component re-renders with new x/y to avoid double offset
      style={{ left: x, top: y, x: 0, y: 0 }}
      className="absolute z-30 group"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Controls Toolbar */}
      <div className="absolute -top-12 left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center p-2 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button 
          onClick={(e) => {
             e.stopPropagation();
             onDuplicate();
          }}
          className="text-[#1c1b1f] dark:text-gray-200 hover:text-[#8925e2] transition-colors p-1"
          title="Duplicar"
        >
          <Copy size={20} />
        </button>
        <div className="w-[1px] h-5 bg-[#edeeee] dark:bg-gray-700" />
        <button className="text-[#1c1b1f] dark:text-gray-200 hover:text-[#8925e2] transition-colors p-1" title="Girar">
          <RotateCw size={20} />
        </button>
        <button 
          onClick={(e) => {
             e.stopPropagation();
             onDelete();
          }}
          className="text-[#C8303F] hover:text-red-700 transition-colors p-1 ml-1"
          title="Excluir"
        >
          <X size={20} />
        </button>
      </div>

      {/* Visual Placeholder */}
      <div className="bg-[rgba(93,158,254,0.2)] border-2 border-[#0c64e6] border-dashed rounded-lg p-6 min-w-[212px] h-[90px] flex flex-col items-center justify-center gap-1 cursor-move backdrop-blur-[2px]">
        <p className="font-['Miss_Fajardose',cursive] text-[40px] leading-none text-[#34393e] dark:text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis max-w-full pb-1 pointer-events-none select-none">
          {signatoryName}
        </p>
        <div className="w-full h-[2px] bg-[#6d7379] opacity-50" />
      </div>
    </motion.div>
  );
}