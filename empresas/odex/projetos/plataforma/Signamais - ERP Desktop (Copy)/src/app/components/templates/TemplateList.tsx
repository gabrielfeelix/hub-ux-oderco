import React, { useState } from 'react';
import { 
  MoreVertical, 
  Star, 
  FolderInput, 
  Share2, 
  Copy, 
  Trash2, 
  UserPlus, 
  ArrowRightLeft,
  History,
  Download,
  Edit,
  Archive,
  FileText
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Template, TemplateView } from '../Templates';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

interface TemplateListProps {
  templates: Template[];
  activeView: TemplateView;
  viewMode: 'list' | 'grid';
  setTemplates: React.Dispatch<React.SetStateAction<Template[]>>;
  onSelectTemplate?: (id: string) => void;
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
}

export function TemplateList({ templates, activeView, viewMode, setTemplates, onSelectTemplate, selectedIds, onSelectionChange }: TemplateListProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleSelect = (id: string) => {
    onSelectionChange(
      selectedIds.includes(id) 
        ? selectedIds.filter(item => item !== id) 
        : [...selectedIds, id]
    );
  };

  const toggleSelectAll = () => {
    // Check if all *visible* templates are selected
    const allVisibleSelected = templates.length > 0 && templates.every(t => selectedIds.includes(t.id));
    
    if (allVisibleSelected) {
      // Unselect all visible
      const visibleIds = templates.map(t => t.id);
      onSelectionChange(selectedIds.filter(id => !visibleIds.includes(id)));
    } else {
      // Select all visible (preserving other selections if any, though usually we might just replace)
      // Actually, standard "select all" usually selects everything in the current view.
      // If we want to support "select all pages", we might need a distinct action, but for now, 
      // since 'templates' contains all filtered results (client-side filtering), this selects EVERYTHING.
      const visibleIds = templates.map(t => t.id);
      const newSelection = Array.from(new Set([...selectedIds, ...visibleIds]));
      onSelectionChange(newSelection);
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, isFavorite: !t.isFavorite } : t
    ));
  };

  // Actions
  const handleDelete = (id: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, isDeleted: true } : t
    ));
    setOpenMenuId(null);
  };

  const handleRestore = (id: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === id ? { ...t, isDeleted: false } : t
    ));
    setOpenMenuId(null);
  };

  const handlePermanentDelete = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    setOpenMenuId(null);
  };

  const isAllSelected = templates.length > 0 && templates.every(t => selectedIds.includes(t.id));

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
        {templates.map(template => {
          const isSelected = selectedIds.includes(template.id);
          return (
            <div 
              key={template.id}
              className={cn(
                "group relative bg-white dark:bg-gray-800 rounded-2xl border transition-all duration-200 hover:shadow-lg flex flex-col overflow-hidden",
                isSelected ? "border-purple-500 ring-1 ring-purple-500" : "border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-900"
              )}
            >
              {/* Selection Overlay for Grid */}
              <div className="absolute top-3 left-3 z-10">
                 <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => toggleSelect(template.id)}
                    className={cn(
                      "rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2] w-5 h-5 cursor-pointer transition-opacity",
                      isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100 bg-white"
                    )}
                  />
              </div>

              {/* Actions Overlay */}
              <div className="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => toggleFavorite(template.id, e)}
                    className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Star size={16} fill={template.isFavorite ? "#EAB308" : "none"} className={template.isFavorite ? "text-yellow-400" : ""} />
                  </button>
                  <div className="relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === template.id ? null : template.id);
                      }}
                      className="p-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm text-gray-500 hover:text-gray-700 dark:text-gray-400"
                    >
                      <MoreVertical size={16} />
                    </button>
                     {openMenuId === template.id && (
                        <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden text-left">
                            <div className="p-1 flex flex-col">
                              <MenuItem icon={<Edit size={14} />} label="Editar" onClick={() => { onSelectTemplate?.(template.id); setOpenMenuId(null); }} />
                              <MenuItem icon={<Copy size={14} />} label="Duplicar" />
                              <MenuItem icon={<Trash2 size={14} />} label="Excluir" className="text-red-600" onClick={() => handleDelete(template.id)} />
                            </div>
                        </div>
                     )}
                  </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col cursor-pointer" onClick={() => onSelectTemplate && onSelectTemplate(template.id)}>
                 {/* Icon/Thumbnail Placeholder */}
                 <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-[#8925e2] flex items-center justify-center mb-4">
                    <FileText size={24} />
                 </div>
                 
                 <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">{template.name}</h3>
                 <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Editado {template.updatedAt}</p>
                 
                 <div className="mt-auto flex items-center justify-between">
                    {template.folders.length > 0 ? (
                        <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-[10px] text-gray-600 dark:text-gray-300 font-medium">
                            <FolderInput size={10} /> {template.folders[0]}
                        </span>
                    ) : <span />}
                    
                    <button className="text-xs font-bold text-[#8925e2] hover:underline">
                      Utilizar
                    </button>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-visible min-h-[400px]">
      <table className="w-full">
        <thead className="bg-gray-50/50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-sm">
          <tr>
            <th className="p-4 w-12 text-center">
              <input 
                type="checkbox" 
                checked={isAllSelected}
                onChange={toggleSelectAll}
                className="rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2] w-4 h-4 cursor-pointer" 
              />
            </th>
            <th className="p-4 w-12 text-center text-gray-400"><Star size={16} /></th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Nome</th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Proprietário</th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Data de criação</th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Última alteração</th>
            <th className="p-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">Pastas</th>
            <th className="p-4 w-40"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {templates.map(template => {
            const isSelected = selectedIds.includes(template.id);
            return (
              <tr 
                key={template.id} 
                className={cn(
                  "group transition-colors",
                  isSelected ? "bg-purple-50/50 dark:bg-purple-900/10 hover:bg-purple-50 dark:hover:bg-purple-900/20" : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                )}
              >
                <td className="p-4 text-center">
                  <input 
                    type="checkbox" 
                    checked={isSelected}
                    onChange={() => toggleSelect(template.id)}
                    className="rounded border-gray-300 text-[#8925e2] focus:ring-[#8925e2] w-4 h-4 cursor-pointer" 
                  />
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={(e) => toggleFavorite(template.id, e)}
                    className="text-gray-300 hover:text-yellow-400 transition-colors focus:outline-none"
                  >
                    <Star size={18} fill={template.isFavorite ? "#EAB308" : "none"} className={template.isFavorite ? "text-yellow-400" : ""} />
                  </button>
                </td>
                <td className="p-4 font-medium text-gray-900 dark:text-gray-200">
                   <button 
                     onClick={() => onSelectTemplate && onSelectTemplate(template.id)}
                     className="hover:text-[#8925e2] hover:underline text-left font-semibold transition-colors"
                   >
                     {template.name}
                   </button>
                </td>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{template.owner}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{template.createdAt}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">{template.updatedAt}</td>
                <td className="p-4 text-gray-500 dark:text-gray-400 text-sm">
                   {template.folders.length > 0 ? (
                      <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs">
                         <FolderInput size={12} /> {template.folders[0]}
                      </span>
                   ) : '-'}
                </td>
                <td className="p-4">
                  <div className={cn(
                    "flex items-center justify-end gap-2 transition-opacity",
                    openMenuId === template.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  )}>
                    {activeView !== 'deleted' ? (
                      <>
                        <button className="px-3 py-1.5 bg-[#8925e2] text-white text-xs font-bold rounded-lg hover:bg-[#7a1fd0] transition-colors shadow-sm">
                          Utilizar
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setOpenMenuId(openMenuId === template.id ? null : template.id)}
                            className={cn(
                              "p-1.5 rounded-lg transition-colors",
                              openMenuId === template.id ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                            )}
                          >
                            <MoreVertical size={18} />
                          </button>
                          
                          {openMenuId === template.id && (
                            <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                               <div className="p-1 flex flex-col">
                                  <MenuItem icon={<Edit size={14} />} label="Editar" />
                                  <MenuItem icon={<FolderInput size={14} />} label="Mover" />
                                  <MenuItem icon={<Share2 size={14} />} label="Partilhar com Pastas" />
                                  <MenuItem icon={<Copy size={14} />} label="Copiar" />
                                  <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                                  <MenuItem icon={<Archive size={14} />} label="Arquivar" />
                                  <MenuItem icon={<Download size={14} />} label="Transferir" />
                                  <MenuItem icon={<History size={14} />} label="Histórico" />
                                  <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                                  <MenuItem icon={<UserPlus size={14} />} label="Partilhar com utilizadores" />
                                  <MenuItem icon={<ArrowRightLeft size={14} />} label="Transferir propriedade" />
                                  <div className="h-[1px] bg-gray-100 dark:bg-gray-700 my-1" />
                                  <MenuItem 
                                    icon={<Trash2 size={14} />} 
                                    label="Eliminar" 
                                    className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:text-red-400"
                                    onClick={() => handleDelete(template.id)}
                                  />
                               </div>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleRestore(template.id)}
                          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
                        >
                          Restaurar
                        </button>
                        <button 
                           onClick={() => handlePermanentDelete(template.id)}
                           className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function MenuItem({ icon, label, className, onClick }: { icon: React.ReactNode, label: string, className?: string, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full text-left px-3 py-2 text-sm flex items-center gap-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors",
        className
      )}
    >
      {icon}
      {label}
    </button>
  );
}