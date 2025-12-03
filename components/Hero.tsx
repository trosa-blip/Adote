import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-christmas-green to-emerald-800 text-white py-16 px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-9xl transform -rotate-12">🎁</div>
        <div className="absolute bottom-10 right-10 text-9xl transform rotate-12">🎄</div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="font-display text-5xl md:text-6xl mb-6 text-christmas-gold drop-shadow-md">
          Adote uma Cartinha
        </h2>
        <p className="text-lg md:text-xl text-christmas-cream mb-8 max-w-2xl mx-auto leading-relaxed">
          Neste Natal, você pode transformar o sonho de uma criança em realidade. 
          Escolha uma das cartinhas abaixo, apadrinhe um pedido e faça a magia acontecer.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#cartinhas"
            className="bg-christmas-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            Escolher uma Cartinha
          </a>
          <button className="bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold py-3 px-8 rounded-full transition-colors">
            Saiba mais sobre a campanha
          </button>
        </div>
      </div>
    </div>
  );
};