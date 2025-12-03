import React from 'react';
import { Mail, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b-4 border-christmas-red">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-christmas-red text-white p-2 rounded-lg">
            <Mail size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 leading-tight">
              Papai Noel dos <span className="text-christmas-red">Correios</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">
              PARCERIA HCPA & AADMCLIN
            </p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-sm font-semibold text-gray-600">
          <span className="flex items-center gap-1">
            <Heart size={16} className="text-christmas-red fill-current" />
            +100 Cartinhas Adotadas
          </span>
          <a href="#como-funciona" className="hover:text-christmas-red transition-colors">
            Como funciona
          </a>
          <a href="#contato" className="hover:text-christmas-red transition-colors">
            Contato
          </a>
        </div>
      </div>
    </header>
  );
};