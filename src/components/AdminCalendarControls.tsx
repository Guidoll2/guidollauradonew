// src/components/AdminCalendarControls.tsx
'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { FaCalendarPlus, FaCalendarTimes, FaCog, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

interface AdminCalendarControlsProps {
  onRefreshCalendar: () => void;
  language: string;
}

const AdminCalendarControls: React.FC<AdminCalendarControlsProps> = ({ 
  onRefreshCalendar, 
  language 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showBulkControls, setShowBulkControls] = useState(false);

  const dayNames = language === 'es' 
    ? ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const timeSlots = [
    "10:00 - 11:00",
    "11:00 - 12:00", 
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00"
  ];

  const handleBulkAction = async (action: 'enable' | 'disable', dayOfWeek: number, customSlots?: string[]) => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/appointments/bulk-enable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action,
          dayOfWeek,
          timeSlots: customSlots,
          monthsAhead: 3
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(
          language === 'es' 
            ? `✅ ${data.message}. Procesados: ${data.summary.totalProcessed} slots.`
            : `✅ ${data.summary.totalProcessed} slots ${action === 'enable' ? 'enabled' : 'disabled'} for ${dayNames[dayOfWeek]}.`,
          { duration: 4000 }
        );
        
        if (data.errors && data.errors.length > 0) {
          toast.warning(
            language === 'es' 
              ? `⚠️ ${data.errors.length} errores durante el proceso.`
              : `⚠️ ${data.errors.length} errors occurred during processing.`,
            { duration: 3000 }
          );
        }
        
        onRefreshCalendar();
      } else {
        throw new Error(data.error || 'Error en la operación');
      }
    } catch (error) {
      console.error('Error en bulk action:', error);
      toast.error(
        language === 'es' 
          ? `❌ Error: ${error instanceof Error ? error.message : 'Error desconocido'}`
          : `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { duration: 4000 }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDefaultSchedule = async () => {
    setIsProcessing(true);
    
    try {
      // Habilitar martes y jueves por defecto
      await handleBulkAction('enable', 2); // Martes
      await handleBulkAction('enable', 4); // Jueves
      
      toast.success(
        language === 'es' 
          ? '🎯 Horarios por defecto habilitados: Martes y Jueves de 10:00-15:00'
          : '🎯 Default schedule enabled: Tuesday and Thursday 10:00-15:00',
        { duration: 5000 }
      );
    } catch (error) {
      toast.error(
        language === 'es' 
          ? '❌ Error configurando horarios por defecto'
          : '❌ Error setting up default schedule',
        { duration: 4000 }
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-500">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center">
          <FaCog className="mr-2 text-blue-500" />
          {language === 'es' ? 'Panel de Administración' : 'Admin Panel'}
        </h3>
        <button
          onClick={() => setShowBulkControls(!showBulkControls)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
          disabled={isProcessing}
        >
          {showBulkControls ? <FaTimes className="mr-2" /> : <FaCog className="mr-2" />}
          {showBulkControls 
            ? (language === 'es' ? 'Ocultar Controles' : 'Hide Controls')
            : (language === 'es' ? 'Mostrar Controles' : 'Show Controls')
          }
        </button>
      </div>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <button
          onClick={handleDefaultSchedule}
          disabled={isProcessing}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
        >
          {isProcessing ? <FaSpinner className="animate-spin mr-2" /> : <FaCalendarPlus className="mr-2" />}
          {language === 'es' ? 'Configurar Horario Estándar' : 'Set Standard Schedule'}
        </button>

        <button
          onClick={() => handleBulkAction('enable', 5)} // Viernes
          disabled={isProcessing}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
        >
          {isProcessing ? <FaSpinner className="animate-spin mr-2" /> : <FaCalendarPlus className="mr-2" />}
          {language === 'es' ? 'Habilitar Todos los Viernes' : 'Enable All Fridays'}
        </button>
      </div>

      {/* Controles avanzados */}
      {showBulkControls && (
        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-3">
            {language === 'es' ? 'Gestión por Día de la Semana' : 'Day of Week Management'}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {dayNames.map((dayName, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <h5 className="font-medium text-gray-800 mb-2">{dayName}</h5>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('enable', index)}
                    disabled={isProcessing}
                    className="flex-1 px-3 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <FaCheck className="mr-1" />
                    {language === 'es' ? 'Habilitar' : 'Enable'}
                  </button>
                  <button
                    onClick={() => handleBulkAction('disable', index)}
                    disabled={isProcessing}
                    className="flex-1 px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                  >
                    <FaTimes className="mr-1" />
                    {language === 'es' ? 'Deshabilitar' : 'Disable'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              {language === 'es' 
                ? '💡 Tip: Los horarios se procesarán de 10:00 a 15:00 para los próximos 3 meses. Los turnos ya reservados se mantendrán pero se bloquearán si deshabilitas un día.'
                : '💡 Tip: Schedules will be processed from 10:00 to 15:00 for the next 3 months. Reserved appointments will be kept but blocked if you disable a day.'
              }
            </p>
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center">
            <FaSpinner className="animate-spin mr-2 text-yellow-600" />
            <span className="text-yellow-800">
              {language === 'es' ? 'Procesando cambios en el calendario...' : 'Processing calendar changes...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalendarControls;
