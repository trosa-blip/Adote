import React, { useState } from 'react';
import { Letter } from '../types';
import { X, User, Gift, CheckCircle, AlertCircle, Mail } from 'lucide-react';

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

MEUS DADOS (PADRINHO