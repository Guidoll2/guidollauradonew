'use client';

import { Check } from 'lucide-react';
import { useTheme } from '@/lib/theme-context';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  customizationText: string;
  buttonText: string;
  features: string[];
  includesLabel: string;
  noCommitmentText: string;
  isRecommended?: boolean;
  badgeText?: string;
  onButtonClick?: () => void;
}

export function PricingCard({
  title,
  description,
  price,
  customizationText,
  buttonText,
  features,
  includesLabel,
  noCommitmentText,
  isRecommended = true,
  badgeText = 'PAQUETE RECOMENDADO',
  onButtonClick,
}: PricingCardProps) {
  const { isLightMode } = useTheme();
  
  return (
    <div className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 ${
      isLightMode
        ? 'bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 hover:shadow-2xl hover:shadow-cyan-500/10'
        : 'bg-gradient-to-b from-white to-slate-50 border border-slate-200 hover:shadow-2xl hover:shadow-blue-500/10'
    }`}>
      {/* Badge Premium */}
      {isRecommended && (
        <div className="bg-gradient-to-r from-[#ffbba8] to-[#67e2f0] px-4 py-2 text-center">
          <span className="text-slate-900 font-bold text-sm">{badgeText}</span>
        </div>
      )}

      {/* Contenido de la Tarjeta */}
      <div className="p-8">
        {/* Título del Plan */}
        <h3 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${
          isLightMode ? 'text-white' : 'text-slate-900'
        }`}>
          {title}
        </h3>

        {/* Descripción */}
        <p className={`text-sm mb-8 transition-colors duration-500 ${
          isLightMode ? 'text-gray-300' : 'text-slate-600'
        }`}>
          {description}
        </p>

        {/* Precio */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffbba8] to-[#67e2f0]">
              {price}
            </span>
          </div>
          <p className={`text-xs mt-2 transition-colors duration-500 ${
            isLightMode ? 'text-gray-500' : 'text-slate-400'
          }`}>
            {customizationText}
          </p>
        </div>

        {/* Botón CTA */}
        <button 
          onClick={onButtonClick}
          className={`w-full bg-gradient-to-r from-[#ffbba8] to-[#67e2f0] font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mb-8 ${
          isLightMode
            ? 'hover:shadow-lg hover:shadow-cyan-400/30 text-slate-900'
            : 'hover:shadow-lg hover:shadow-blue-400/30 text-slate-900'
        }`}>
          {buttonText}
        </button>

        {/* Separador */}
        <div className={`border-t mb-8 transition-colors duration-500 ${
          isLightMode ? 'border-slate-700' : 'border-slate-200'
        }`}></div>

        {/* Lista de Inclusiones */}
        <div className="space-y-4">
          <p className={`text-sm font-semibold mb-4 transition-colors duration-500 ${
            isLightMode ? 'text-gray-300' : 'text-slate-700'
          }`}>
            {includesLabel}
          </p>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 transition-colors duration-500 ${
                isLightMode ? 'text-[#67e2f0]' : 'text-blue-600'
              }`} />
              <span className={`text-sm transition-colors duration-500 ${
                isLightMode ? 'text-gray-300' : 'text-slate-600'
              }`}>{feature}</span>
            </div>
          ))}
        </div>

        {/* Nota Final */}
        <p className={`text-xs text-center mt-8 transition-colors duration-500 ${
          isLightMode ? 'text-gray-500' : 'text-slate-400'
        }`}>
          {noCommitmentText}
        </p>
      </div>
    </div>
  );
}
