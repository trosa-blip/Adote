import React from 'react';
import { Search, Filter, X } from 'lucide-react';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, setFilters }) => {
  const handleReset = () => {
    setFilters({ search: '', category: '', ageRange: '' });
  };

  const hasActiveFilters = filters.search || filters.category || filters.ageRange;

  return (
    <div id="cartinhas" className="sticky top-[72px] z-40 bg-gray-50/95 backdrop-blur-sm border-b border-gray-200 py-4 px-4 transition-all">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar por nome, número ou pedido..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-christmas-red focus:border-transparent outline-none shadow-sm"
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter size={20} className="text-gray-500 mr-2 flex-shrink-0" />
          
          <select
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm focus:outline-none focus:border-christmas-red cursor-pointer hover:bg-gray-50"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
          >
            <option value="">Todas as Categorias</option>
            <option value="Brinquedo">Brinquedos</option>
            <option value="Roupa">Roupas</option>
            <option value="Calçado">Calçados</option>
            <option value="Material Escolar">Material Escolar</option>
          </select>

          <select
            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-full text-sm focus:outline-none focus:border-christmas-red cursor-pointer hover:bg-gray-50"
            value={filters.ageRange}
            onChange={(e) => setFilters(prev => ({ ...prev, ageRange: e.target.value }))}
          >
            <option value="">Todas as Idades</option>
            <option value="0-5">0 a 5 anos</option>
            <option value="6-10">6 a 10 anos</option>
            <option value="11-14">11 a 14 anos</option>
            <option value="15+">15+ anos</option>
          </select>

          {hasActiveFilters && (
            <button 
              onClick={handleReset}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800 font-medium ml-2 px-3 py-1 bg-red-50 rounded-full transition-colors"
            >
              <X size={14} />
              Limpar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};