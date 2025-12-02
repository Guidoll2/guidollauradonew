'use client';

import { Check } from 'lucide-react';

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
}: PricingCardProps) {
  return (
    <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transition-shadow duration-500">
      {/* Badge Premium */}
      {isRecommended && (
        <div className="bg-gradient-to-r from-[#ffbba8] to-[#67e2f0] px-4 py-2 text-center">
          <span className="text-slate-900 font-bold text-sm">{badgeText}</span>
        </div>
      )}

      {/* Contenido de la Tarjeta */}
      <div className="p-8">
        {/* Título del Plan */}
        <h3 className="text-2xl font-bold text-white mb-2">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-gray-300 text-sm mb-8">
          {description}
        </p>

        {/* Precio */}
        <div className="mb-8">
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffbba8] to-[#67e2f0]">
              {price}
            </span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {customizationText}
          </p>
        </div>

        {/* Botón CTA */}
        <button className="w-full bg-gradient-to-r from-[#ffbba8] to-[#67e2f0] hover:shadow-lg hover:shadow-cyan-400/30 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 mb-8">
          {buttonText}
        </button>

        {/* Separador */}
        <div className="border-t border-slate-700 mb-8"></div>

        {/* Lista de Inclusiones */}
        <div className="space-y-4">
          <p className="text-sm font-semibold text-gray-300 mb-4">
            {includesLabel}
          </p>
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-[#67e2f0] flex-shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{feature}</span>
            </div>
          ))}
        </div>

        {/* Nota Final */}
        <p className="text-gray-500 text-xs text-center mt-8">
          {noCommitmentText}
        </p>
      </div>
    </div>
  );
}
