import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { LetterCard } from './components/LetterCard';
import { LetterModal } from './components/LetterModal';
import { Footer } from './components/Footer';
import { LETTERS_DATA } from './constants';
import { FilterState, Letter } from './types';

function App() {
  // State
  const [letters, setLetters] = useState<Letter[]>(LETTERS_DATA);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    ageRange: ''
  });
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(null);

  // Filter Logic
  const filteredLetters = useMemo(() => {
    return letters.filter(letter => {
      // Status check (only show available or show all? usually only available)
      if (letter.status !== 'available') return false;

      // Search (Name, ID, or Request)
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        letter.name.toLowerCase().includes(searchLower) ||
        letter.letterCode.includes(searchLower) ||
        letter.requestSummary.toLowerCase().includes(searchLower);

      // Category
      const matchesCategory = filters.category 
        ? letter.categories.includes(filters.category as any)
        : true;

      // Age Range
      let matchesAge = true;
      if (filters.ageRange) {
        const age = letter.age;
        switch (filters.ageRange) {
          case '0-5': matchesAge = age >= 0 && age <= 5; break;
          case '6-10': matchesAge = age >= 6 && age <= 10; break;
          case '11-14': matchesAge = age >= 11 && age <= 14; break;
          case '15+': matchesAge = age >= 15; break;
        }
      }

      return matchesSearch && matchesCategory && matchesAge;
    });
  }, [letters, filters]);

  // Actions
  const handleAdopt = (id: string) => {
    // Optimistic update
    setLetters(prev => prev.map(l => 
      l.id === id ? { ...l, status: 'adopted' } : l
    ));
    // Note: The modal handles the success message, 
    // waiting a bit before closing is handled by user interaction in modal
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        <FilterBar filters={filters} setFilters={setFilters} />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-baseline gap-2">
            <h2 className="text-2xl font-bold text-gray-800">Cartinhas Disponíveis</h2>
            <span className="text-gray-500 text-sm font-medium">
              ({filteredLetters.length} encontradas)
            </span>
          </div>

          {filteredLetters.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLetters.map(letter => (
                <LetterCard 
                  key={letter.id} 
                  letter={letter} 
                  onClick={setSelectedLetter} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
              <div className="text-4xl mb-4">🎅</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">Nenhuma cartinha encontrada</h3>
              <p className="text-gray-500">Tente ajustar seus filtros para ver mais pedidos.</p>
              <button 
                onClick={() => setFilters({ search: '', category: '', ageRange: '' })}
                className="mt-4 text-christmas-red hover:underline font-medium"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {selectedLetter && (
        <LetterModal 
          letter={selectedLetter} 
          onClose={() => setSelectedLetter(null)} 
          onAdopt={handleAdopt}
        />
      )}
    </div>
  );
}

export default App;