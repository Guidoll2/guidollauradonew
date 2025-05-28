// components/ReservationFormModal.tsx
import React, { useState } from 'react';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import useTranslations from './useTranslations'; // Asegúrate de que la ruta sea correcta

interface ReservationFormModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (name: string, lastName: string, email: string) => void;
  slotTime: string;
  selectedDay: Date | null;
  language: string;
}

export default function ReservationFormModal({
  show,
  onClose,
  onConfirm,
  slotTime,
  selectedDay,
  language,
}: ReservationFormModalProps) {
  if (!show) return null;

  const t = useTranslations(language);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const dateFnsLocale = language === 'es' ? es : enUS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && lastName && email) {
      onConfirm(name, lastName, email);
      setName('');
      setLastName('');
      setEmail('');
    } else {
      // Puedes añadir un toast o mensaje de error aquí
      console.error("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          {t('reservationForm.title')}
        </h3>
        <p className="text-gray-600 mb-6">
          {t('reservationForm.confirm_details', {
            date: selectedDay ? format(selectedDay, `d MMMM`, { locale: dateFnsLocale }) : '',
            time: slotTime,
          })}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {t('reservationForm.name_label')}
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              {t('reservationForm.lastName_label')}
            </label>
            <input
              type="text"
              id="lastName"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('reservationForm.email_label')}
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
            >
              {t('reservationForm.cancel_button')}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {t('reservationForm.confirm_button')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}