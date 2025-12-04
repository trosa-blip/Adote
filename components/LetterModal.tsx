import React, { useState } from 'react';
import { Letter } from '../types';
import { X, User, Gift, CheckCircle, AlertCircle, Mail, MessageCircle } from 'lucide-react';

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
    
    // Construct the email body
    const subject = `Adoção de Cartinha - Cód: ${letter.letterCode} (${letter.name})`;
    const body = `Olá, gostaria de confirmar a adoção da seguinte cartinha:

DADOS DA CARTINHA:
Código: ${letter.letterCode}
Criança: ${letter.name}
Idade: ${letter.age} anos
Pedido: ${letter.requestSummary}

MEUS DADOS (PADRINHO):
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}

Comprometo-me a entregar o presente conforme as instruções.`;

    // Create mailto link with CC to the user
    // Changed recipient to aadmclin@gmail.com
    const mailtoLink = `mailto:aadmclin@gmail.com?cc=${encodeURIComponent(formData.email)}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open email client
    window.location.href = mailtoLink;

    // Move to success step and trigger app adoption logic
    onAdopt(letter.id);
    setStep('success');
  };

  const handleWhatsApp = () => {
    // Basic phone cleaning (remove non-digits)
    const cleanPhone = formData.phone.replace(/\D/g, '');
    
    // If number seems to be just DDD+Number (10 or 11 digits), prepend Brazil country code (55)
    const finalPhone = (cleanPhone.length >= 10 && cleanPhone.length <= 11) ? `55${cleanPhone}` : cleanPhone;

    const message = `Olá ${formData.name}! 🎄\n\n` +
      `Aqui estão os dados da cartinha que você adotou:\n\n` +
      `*Criança:* ${letter.name}\n` +
      `*Código:* ${letter.letterCode}\n` +
      `*Pedido:* ${letter.requestSummary}\n\n` +
      `📅 *Entrega:* Até 20/12\n` +
      `📍 *Locais:* HCPA (Bloco A) ou AADMCLIN.\n\n` +
      `Obrigado por fazer o Natal mais feliz! ✨`;

    const whatsappUrl = `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-christmas-red p-4 flex justify-between items-center text-white flex-shrink-0">
          <h3 className="font-bold text-lg">
            {step === 'details' && 'Detalhes da Cartinha'}
            {step === 'form' && 'Confirmar Adoção'}
            {step === 'success' && 'Adoção Registrada!'}
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === 'details' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <img 
                  src={imageUrl} 
                  alt={letter.name} 
                  className="w-24 h-32 object-cover rounded-lg shadow-md bg-gray-100"
                />
                <div>
                  <h2 className="text-2xl font-display text-gray-800">{letter.name}</h2>
                  <div className="text-sm text-gray-500 mb-2">
                    {letter.age} anos • {letter.schoolYear}
                  </div>
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                    Cód: {letter.letterCode}
                  </span>
                </div>
              </div>

              <div className="bg-christmas-cream p-4 rounded-xl border border-amber-100">
                <div className="flex items-center gap-2 mb-2 text-amber-600 font-bold text-sm uppercase tracking-wide">
                  <Gift size={16} />
                  Pedido da Criança
                </div>
                <p className="text-gray-800 font-medium text-lg leading-relaxed">
                  "{letter.fullTranscription}"
                </p>
              </div>

              <button 
                onClick={handleAdoptClick}
                className="w-full bg-christmas-red hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Gift size={20} />
                Quero Adotar esta Cartinha
              </button>
            </div>
          )}

          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg flex gap-3 text-sm text-blue-700 mb-6">
                <AlertCircle className="flex-shrink-0" size={20} />
                <p>
                  Ao clicar em confirmar, seu cliente de e-mail padrão será aberto com uma mensagem pronta para <strong>aadmclin@gmail.com</strong>.
                  <br/><br/>
                  Basta enviar para concluir. <strong>Você receberá uma cópia (Cc) deste e-mail como comprovante.</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="text" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-christmas-red focus:border-transparent"
                    placeholder="Como gostaria de ser chamado"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="email" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-christmas-red focus:border-transparent"
                    placeholder="Para receber a confirmação"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Seu Telefone / WhatsApp</label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    required
                    type="tel" 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-christmas-red focus:border-transparent"
                    placeholder="(51) 99999-9999"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">Usaremos este número para enviar os dados via WhatsApp se desejar.</p>
              </div>

              <div className="pt-4 flex gap-3">
                <button 
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
                >
                  Voltar
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-christmas-green hover:bg-emerald-800 text-white font-bold py-3 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  Confirmar Adoção
                </button>
              </div>
            </form>
          )}

          {step === 'success' && (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-display text-gray-800 mb-2">Obrigado!</h3>
              <p className="text-gray-600 mb-6">
                Você acaba de fazer o Natal de uma criança mais feliz.
              </p>
              
              <button 
                onClick={handleWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-xl shadow-sm hover:shadow-md transition-all mb-6 flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Receber dados no meu WhatsApp
              </button>

              <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2 mb-6 text-left border border-gray-200">
                <p><strong>1. Compre o presente</strong> com carinho.</p>
                <p><strong>2. Embrulhe</strong> e cole a etiqueta com o código <strong>#{letter.letterCode}</strong>.</p>
                <p><strong>3. Entregue</strong> até dia 20/12 nos pontos de coleta (HCPA ou AADMCLIN).</p>
              </div>

              <button 
                onClick={onClose}
                className="bg-christmas-red text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform"
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