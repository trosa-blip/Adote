import React, { useState } from 'react';
import { Letter } from '../types';
import { X, User, Gift, CheckCircle, AlertCircle } from 'lucide-react';

interface LetterModalProps {
  letter: Letter | null;
  onClose: () => void;
  onAdopt: (id: string) => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ letter, onClose, onAdopt }) => {
  const [step, setStep] = useState<'details' | 'form' | 'success'>('details');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  if (!letter) return null;

  // Placeholder image
  const imageUrl = `https://placehold.co/600x800/F6F4F2/333333?text=Carta+de+${encodeURIComponent(letter.name.split(' ')[0])}`;

  const handleAdoptClick = () => setStep('form');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      onAdopt(letter.id);
      setStep('success');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col md:flex-row">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-white/80 hover:bg-white p-2 rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm"
        >
          <X size={20} />
        </button>

        {/* Left Side: Image */}
        <div className="w-full md:w-1/2 bg-gray-100 h-64 md:h-auto relative">
          <img 
            src={imageUrl} 
            alt="Carta original" 
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-md">
            Imagem Ilustrativa (Placeholder)
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
          
          {step === 'details' && (
            <>
              <div className="mb-6">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded mb-2">
                  Cód: {letter.letterCode}
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-1">{letter.name}</h2>
                <p className="text-gray-500 text-lg flex items-center gap-2">
                  {letter.age} anos • {letter.schoolYear}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 mb-6">
                <div className="flex items-center gap-2 text-amber-800 font-bold mb-3">
                  <Gift size={20} />
                  <h3>O Pedido</h3>
                </div>
                <p className="text-gray-700 italic leading-relaxed text-sm md:text-base">
                  "{letter.fullTranscription}"
                </p>
              </div>

              <div className="mt-auto">
                <button
                  onClick={handleAdoptClick}
                  className="w-full bg-christmas-red hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <HeartFilledIcon />
                  Adotar esta Cartinha
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Ao adotar, você se compromete a entregar o presente no ponto de coleta.
                </p>
              </div>
            </>
          )}

          {step === 'form' && (
            <div className="flex flex-col h-full justify-center animate-fadeIn">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirme sua Adoção</h3>
              <p className="text-gray-500 mb-6 text-sm">
                Preencha seus dados para receber as instruções de entrega do presente para 
                <span className="font-bold text-gray-800"> {letter.name}</span>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome Completo</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      required
                      type="text" 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-christmas-green focus:border-transparent"
                      placeholder="Ex: Maria Silva"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seu Email</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-christmas-green focus:border-transparent"
                    placeholder="Ex: maria@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp</label>
                  <input 
                    required
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-christmas-green focus:border-transparent"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setStep('details')}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50"
                  >
                    Voltar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-3 bg-christmas-green hover:bg-emerald-700 text-white font-bold rounded-lg shadow transition-colors"
                  >
                    Confirmar
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col h-full justify-center items-center text-center animate-fadeIn">
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <CheckCircle className="text-green-600 w-16 h-16" />
              </div>
              <h3 className="text-3xl font-display font-bold text-gray-800 mb-4">
                Obrigado, {formData.name.split(' ')[0]}!
              </h3>
              <p className="text-gray-600 mb-8 max-w-sm">
                Você acaba de fazer o Natal de <strong>{letter.name}</strong> mais feliz. 
                Enviamos um email para <strong>{formData.email}</strong> com os detalhes do local de entrega e etiqueta para o presente.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg text-amber-800 text-sm mb-8 flex items-start gap-2 text-left">
                <AlertCircle className="flex-shrink-0 mt-0.5" size={16} />
                <span>
                  <strong>Importante:</strong> O presente deve ser entregue até dia 10/12 na recepção do HCPA.
                </span>
              </div>
              <button 
                onClick={onClose}
                className="bg-gray-800 text-white font-bold py-3 px-8 rounded-full hover:bg-gray-900 transition-colors"
              >
                Voltar para a lista
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

const HeartFilledIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" />
  </svg>
);
