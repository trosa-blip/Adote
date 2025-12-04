import React from 'react';
import { Letter } from '../types';
import { Gift, Calendar, GraduationCap, Tag } from 'lucide-react';

interface LetterCardProps {
  letter: Letter;
  onClick: (letter: Letter) => void;
}

export const LetterCard: React.FC<LetterCardProps> = ({ letter, onClick }) => {
  // Placeholder image logic since we can't serve local files directly in this environment.
  // In a real app, this would be a URL to the uploaded file.
  // We use a specific seed or text to keep it consistent.
  const imageUrl = `https://placehold.co/600x800/F6F4F2/333333?text=Carta+de+${encodeURIComponent(letter.name.split(' ')[0])}`;

  return (
    <div 
      onClick={() => onClick(letter)}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={imageUrl} 
          alt={`Cartinha de ${letter.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-600 shadow-sm border border-gray-200 flex items-center gap-1">
          <Tag size={12} className="text-christmas-red" />
          #{letter.letterCode}
        </div>
        
        {/* Status Badge */}
        {letter.status === 'adopted' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-christmas-green text-white px-4 py-2 rounded-full font-bold transform -rotate-12 border-2 border-white shadow-lg">
              Adotada! 🎄
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-gray-800 line-clamp-1 group-hover:text-christmas-red transition-colors">
            {letter.name}
          </h3>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <div className="flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full text-blue-700">
              <Calendar size={12} />
              {letter.age} anos
            </div>
            {letter.schoolYear && (
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full text-amber-700">
                <GraduationCap size={12} />
                {letter.schoolYear}
              </div>
            )}
          </div>
        </div>

        <div className="bg-christmas-cream p-3 rounded-lg mt-auto">
          <div className="flex items-start gap-2">
            <Gift className="text-christmas-red mt-0.5 flex-shrink-0" size={16} />
            <p className="text-sm text-gray-700 font-medium line-clamp-2">
              {letter.requestSummary}
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
             <span className="text-xs font-medium text-gray-400">Clique para ler</span>
             <span className="text-christmas-red text-sm font-semibold group-hover:translate-x-1 transition-transform">
               Ver cartinha →
             </span>
        </div>
      </div>
    </div>
  );
};