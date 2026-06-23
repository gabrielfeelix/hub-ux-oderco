import React from 'react';
import { 
  FileText, 
  Users, 
  Star, 
  Trash2,
  Plus
} from 'lucide-react';
import { TemplateView } from '../Templates';

interface TemplateEmptyStateProps {
  view: TemplateView;
  onCreate: () => void;
}

export function TemplateEmptyState({ view, onCreate }: TemplateEmptyStateProps) {
  if (view === 'shared') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center mb-6">
           <Users size={48} className="text-blue-500 dark:text-blue-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Reenviar os mesmos envelopes?</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Guarde documentos, marcadores de posição de destinatários e campos como um modelo para poupar tempo.
        </p>
        <button 
          onClick={onCreate}
          className="px-6 py-3 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
        >
          <Plus size={20} /> Criar um modelo
        </button>
      </div>
    );
  }

  if (view === 'favorites') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-yellow-50 dark:bg-yellow-900/10 rounded-full flex items-center justify-center mb-6">
           <Star size={48} className="text-yellow-500 dark:text-yellow-400" fill="#EAB308" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mantenha os seus modelos favoritos por perto</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Quando adiciona modelos existentes aos favoritos, pode aceder aos mesmos mais facilmente.
        </p>
        <button className="px-6 py-3 border border-[#8925e2] text-[#8925e2] font-bold rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
          Explorar modelos
        </button>
      </div>
    );
  }

  if (view === 'deleted') {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center max-w-md mx-auto">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
           <Trash2 size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">A pasta Eliminados está vazia</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Os modelos eliminados irão desaparecer da pasta Eliminados dentro do período da política de retenção.
        </p>
      </div>
    );
  }

  // Default empty state (My Templates / All)
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center max-w-md mx-auto">
      <div className="w-24 h-24 bg-purple-50 dark:bg-purple-900/10 rounded-full flex items-center justify-center mb-6">
          <FileText size={48} className="text-[#8925e2]" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Comece a usar modelos</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Crie modelos para documentos que você envia frequentemente para economizar tempo.
      </p>
      <button 
        onClick={onCreate}
        className="px-6 py-3 bg-[#8925e2] text-white font-bold rounded-xl hover:bg-[#7a1fd0] transition-colors shadow-lg shadow-purple-500/20 flex items-center gap-2"
      >
        <Plus size={20} /> Criar um modelo
      </button>
    </div>
  );
}
