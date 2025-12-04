import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="contato" className="bg-gray-800 text-white py-12 mt-12 border-t-8 border-christmas-gold">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl mb-4 text-christmas-gold">Papai Noel dos Correios</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Uma iniciativa para levar alegria a crianças em situação de vulnerabilidade social. 
              Em parceria com o Hospital de Clínicas de Porto Alegre e AADMCLIN (Associação dos Administradores do HCPA).
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Pontos de Entrega</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-christmas-red">•</span>
                <span>HCPA - Bloco A - Central de Chaves/Armários e Correspondências <br/></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-christmas-red">•</span>
                <span>AADMCLIN - Sede Administrativa<br/> </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Fale Conosco</h4>
            <p className="text-gray-400 text-sm mb-2">Dúvidas sobre a adoção?</p>
            <p className="text-christmas-gold font-bold text-lg">aadmclin@gmail.com</p>
            <p className="text-gray-400 text-sm mt-2">(51) 3359-8252 Whats (51) 99449-2656</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} HCPA & AADMCLIN. Todos os direitos reservados.</p>
          <p className="mt-2">Desenvolvido com ❤️ para o Natal.</p>
        </div>
      </div>
    </footer>
  );
};