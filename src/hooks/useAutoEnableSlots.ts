// src/hooks/useAutoEnableSlots.ts
import { useEffect, useState } from 'react';

interface AutoEnableResult {
  isLoading: boolean;
  isEnabled: boolean;
  error: string | null;
  slotsCreated: number;
}

export const useAutoEnableSlots = (enabled: boolean = true): AutoEnableResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slotsCreated, setSlotsCreated] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const autoEnableSlots = async () => {
      // Solo ejecutar una vez por sesión
      const hasRunToday = sessionStorage.getItem('autoEnableRun');
      const today = new Date().toDateString();
      
      if (hasRunToday === today) {
        setIsEnabled(true);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/appointments/auto-enable', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ weeksAhead: 8 })
        });

        const data = await response.json();

        if (response.ok) {
          setIsEnabled(true);
          setSlotsCreated(data.createdSlots || 0);
          sessionStorage.setItem('autoEnableRun', today);
          console.log(`Auto-enable: ${data.message}`);
        } else {
          setError(data.error || 'Error desconocido');
          console.error('Error auto-enabling slots:', data.error);
        }
      } catch (err) {
        setError('Error de conexión');
        console.error('Error auto-enabling slots:', err);
      } finally {
        setIsLoading(false);
      }
    };

    // Ejecutar después de un pequeño delay para no bloquear la carga inicial
    const timer = setTimeout(autoEnableSlots, 2000);

    return () => clearTimeout(timer);
  }, [enabled]);

  return { isLoading, isEnabled, error, slotsCreated };
};
