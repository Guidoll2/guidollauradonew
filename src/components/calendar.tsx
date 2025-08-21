'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isPast,
  getDay,
  addMonths,
  subMonths,
} from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useAuth } from '@clerk/nextjs';
import useTranslations from './useTranslations';
import { toast } from 'sonner';
import ConfirmationModal from './confirmationModal';
import ReservationFormModal from '../components/ReservationFormModal';
import AdminCalendarControls from './AdminCalendarControls';

interface Appointment {
  _id: string;
  date: string;
  timeSlot: string;
  userId: string | null;
  userName: string | null;
  userLastName: string | null;
  userEmail: string | null;
  userWhatsapp: string | null;
  isBlocked: boolean;
  professionalId: string;
}

interface CalendarComponentProps {
  language: string;
}

export default function CalendarComponent({ language }: CalendarComponentProps) {
  const t = useTranslations(language);
  const { userId } = useAuth();

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlotsToEnable, setSelectedSlotsToEnable] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Initially true

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmModalMessage, setConfirmModalMessage] = useState('');
  const [slotToReserve, setSlotToReserve] = useState<string | null>(null);

  const [showReservationFormModal, setShowReservationFormModal] = useState(false);
  const [reservationFormSlot, setReservationFormSlot] = useState<string | null>(null);

  const dateFnsLocale = useMemo(() => {
    return language === 'es' ? es : enUS;
  }, [language]);

  const fetchAppointments = async () => {
    try {
      const r = await fetch("/api/appointments", { credentials: "include" });
      const data = await r.json();
      setAppointments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(t('messages.error_loading_appointments'));
    } finally {
      setIsLoading(false); // Set to false after fetching
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true); // Start loading

      if (userId) {
        try {
          const res = await fetch(`/api/role?clerkUserId=${userId}`);
          const data = await res.json();
          setIsAdmin(data.role === "admin");
        } catch (err) {
          console.error("Error fetching user role:", err);
          toast.error(t('messages.error_loading_user_role'));
        }
      }

      await fetchAppointments(); // Fetch appointments
    };

    fetchInitialData();
  }, [userId]);

  const daysInMonth = useMemo(() => {
    return eachDayOfInterval({
      start: startOfMonth(currentMonth),
      end: endOfMonth(currentMonth),
    });
  }, [currentMonth]);

  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  const startPadding = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);

  const weekDays = useMemo(() => {
    return [
      t('calendar.monday').substring(0, 3),
      t('calendar.tuesday').substring(0, 3),
      t('calendar.wednesday').substring(0, 3),
      t('calendar.thursday').substring(0, 3),
      t('calendar.friday').substring(0, 3),
      t('calendar.saturday').substring(0, 3),
      t('calendar.sunday').substring(0, 3),
    ];
  }, [language, t]);

  const allPossibleTimeSlots = useMemo(() => {
    const slots = [];
    for (let i = 10; i <= 14; i++) {
      slots.push(`${i}:00 - ${i + 1}:00`);
    }
    return slots;
  }, []);

  const selectedDayAppointments = useMemo(() => {
    if (!selectedDay) return [];
    return appointments.filter(a =>
      format(new Date(a.date), 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd')
    );
  }, [selectedDay, appointments]);

  const getSlotStatus = (timeSlot: string) => {
    const appt = selectedDayAppointments.find(a => a.timeSlot === timeSlot);
    if (!appt) return 'unavailable';
    if (appt.isBlocked) return 'blocked';
    if (appt.userId || appt.userEmail || appt.userName) return 'reserved';
    return 'available';
  };

  const handleDayClick = (day: Date) => {
    setSelectedDay(day);
    setSelectedSlotsToEnable([]);
  };

  const handleToggleSlotForEnable = (slot: string) => {
    setSelectedSlotsToEnable(prev =>
      prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]
    );
  };

  const handleEnableSlots = async () => {
    if (!isAdmin) {
      toast.error(t('messages.not_authorized'));
      return;
    }
    if (!selectedDay || selectedSlotsToEnable.length === 0) {
      toast.error(t('messages.incomplete_data'));
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading(t('messages.enabling_slots_loading'));

    try {
      const res = await fetch("/api/appointments/enable", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDay.toISOString(),
          timeSlots: selectedSlotsToEnable
        }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success(t('messages.enable_success'), { id: loadingToastId });
        await fetchAppointments();
        setSelectedSlotsToEnable([]);
      } else {
        toast.error(t('messages.enable_error', { error: data.error || 'unknown' }), { id: loadingToastId });
      }
    } catch (err) {
      console.error("Error in handleEnableSlots:", err);
      toast.error(t('messages.enable_error', { error: 'Internal server error' }), { id: loadingToastId });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReserveAppointment = (slotTime: string) => {
    if (isAdmin) {
      toast.info(t('messages.admin_cannot_reserve'));
      return;
    }
    if (!selectedDay) {
      toast.error(t('messages.select_date_first'));
      return;
    }
    setReservationFormSlot(slotTime);
    setShowReservationFormModal(true);
  };

  const executeReservationWithDetails = async (name: string, lastName: string, email: string, whatsapp: string) => {
    if (!selectedDay || !reservationFormSlot) return;

    setShowReservationFormModal(false);
    const reserveLoadingToastId = toast.loading('Procesando tu reserva y enviando confirmaciones...', {
      description: 'Esto puede tomar unos segundos'
    });

    try {
      const res = await fetch("/api/appointments/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDay.toISOString(),
          timeSlot: reservationFormSlot,
          userName: name,
          userLastName: lastName,
          userEmail: email,
          userWhatsapp: whatsapp,
          language: language,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        // Mensaje de éxito principal
        let successMessage = t('messages.reservation_success');
        
        // Verificar el estado de los emails
        if (data.emailStatus) {
          const { professionalEmailSent, userEmailSent, errors } = data.emailStatus;
          
          if (professionalEmailSent && userEmailSent) {
            successMessage += ' Se enviaron emails de confirmación a ambas partes.';
          } else if (professionalEmailSent) {
            successMessage += ' Se envió email de notificación al profesional.';
            if (errors.length > 0) {
              toast.warning('No se pudo enviar el email de confirmación a tu correo.', { 
                duration: 6000,
                description: 'Tu cita está confirmada, pero no recibiste email de confirmación.'
              });
            }
          } else if (userEmailSent) {
            successMessage += ' Se envió email de confirmación.';
            if (errors.length > 0) {
              toast.warning('No se pudo notificar al profesional por email.', { 
                duration: 6000,
                description: 'Tu cita está confirmada.'
              });
            }
          } else if (errors.length > 0) {
            toast.warning('Cita confirmada pero hubo problemas con los emails.', { 
              duration: 8000,
              description: 'Tu cita está guardada correctamente. Contacta al profesional directamente para confirmar.'
            });
          }
        }
        
        toast.success(successMessage, { 
          id: reserveLoadingToastId,
          duration: 5000
        });
        await fetchAppointments();
      } else {
        toast.error(t('messages.reservation_error', { error: data.error || 'unknown' }), { id: reserveLoadingToastId });
      }
    } catch (err) {
      console.error("Error in executeReservationWithDetails:", err);
      toast.error(t('messages.reservation_error', { error: 'Internal server error' }), { id: reserveLoadingToastId });
    } finally {
      setReservationFormSlot(null);
    }
  };

  const visibleTimeSlots = useMemo(() => {
    if (isAdmin) {
      return allPossibleTimeSlots;
    } else {
      return selectedDayAppointments
        .filter(appt => !appt.isBlocked && !appt.userId && !appt.userEmail && !appt.userName)
        .map(appt => appt.timeSlot);
    }
  }, [isAdmin, allPossibleTimeSlots, selectedDayAppointments]);

  return (
    <div className="w-full px-4 md:px-8 py-6">
      {/* Panel de Administración - Solo visible para admins */}
      {isAdmin && (
        <AdminCalendarControls 
          onRefreshCalendar={fetchAppointments}
          language={language}
        />
      )}
      
      {/* Calendario Principal */}
      <div className="flex flex-col md:flex-row gap-8 w-full bg-white rounded-2xl shadow-xl border border-gray-100 mx-auto">
        {/* Columna Izquierda: Calendario */}
        <div className="flex-1 min-w-[300px] p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            aria-label="Previous month"
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-3 rounded-full bg-white text-blue-700 shadow-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
          >
            <FaChevronLeft className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-600">
            {format(currentMonth, "MMMM", { locale: dateFnsLocale })
              .replace(/^\w/, c => c.toUpperCase())}
          </h2>
          <button
            aria-label="Next month"
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-3 rounded-full bg-white text-blue-700 shadow-md hover:bg-gray-100 transition-all duration-200 flex items-center justify-center"
          >
            <FaChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Encabezados de días de la semana */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekDays.map((day) => (
            <div key={day} className="text-center text-sm font-light text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Cuadrícula de días del mes */}
        <div className="grid grid-cols-7 gap-2">
          {isLoading ? (
            <div className="col-span-7 flex justify-center items-center h-48">
              <p>{t('calendar.loading_appointments')}</p>
            </div>
          ) : (
            daysInMonth.map((day) => {
              const hasSlots = appointments.some(
                (a) => format(new Date(a.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
              );
              const isDayToday = isToday(day);
              const isDaySelected = selectedDay && format(day, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd');
              const isPastDay = isPast(day) && !isDayToday;

              return (
                <button
                  key={day.toISOString()}
                  onClick={() => handleDayClick(day)}
                  disabled={!isAdmin && (isPastDay || !hasSlots)}
                  className={`flex flex-col items-center justify-center h-16 w-full rounded-lg transition-all duration-200
                    ${isDaySelected
                      ? "bg-blue-600 text-white shadow-lg transform scale-105"
                      : isDayToday
                        ? "bg-blue-200 text-blue-800 font-bold"
                        : hasSlots
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                          : "bg-white text-gray-700 hover:bg-gray-50"}
                    ${(!isAdmin && (isPastDay || !hasSlots)) || (isAdmin && isPastDay) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                    ${isAdmin ? "border border-dashed border-gray-300" : ""}
                  `}
                >
                  <span className="text-lg font-medium">{format(day, "d")}</span>
                  {hasSlots && !isDaySelected && (
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></span>
                  )}
                  {isDayToday && (
                    <span className="text-[0.6rem] font-semibold text-blue-600">
                      {t('calendar.today')}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Columna Derecha: Detalles del Día y Horarios */}
      <div className="flex-1 p-4 bg-gray-50 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {selectedDay
            ? format(selectedDay, 'PPPP', { locale: dateFnsLocale }).replace(/^\w/, c => c.toUpperCase())
            : t('calendar.select_date')}
        </h3>

        <div className="space-y-4">
          {selectedDay ? (
            visibleTimeSlots.length > 0 ? (
              visibleTimeSlots.map((slotTime) => {
                const status = getSlotStatus(slotTime);
                const isSlotPast = isPast(
                  new Date(`${format(selectedDay, 'yyyy-MM-dd')}T${slotTime.split(' - ')[0]}:00`)
                ) && !isToday(selectedDay);

                if (!isAdmin && (status === 'unavailable' || status === 'blocked' || status === 'reserved' || isSlotPast)) {
                  return null;
                }

                const isBookable = status === 'available' && !isSlotPast;
                const isSelectedForEnable = selectedSlotsToEnable.includes(slotTime);

                return (
                  <div key={slotTime} className={`w-full p-4 rounded-lg text-lg font-semibold shadow-md transition-all duration-200 flex items-center justify-between
                      ${status === 'blocked'
                        ? "bg-red-100 text-red-700 cursor-not-allowed opacity-70"
                        : status === 'reserved' || isSlotPast
                          ? "bg-yellow-100 text-yellow-700 cursor-not-allowed opacity-70"
                          : "bg-green-100 text-green-700 hover:bg-green-200 hover:shadow-lg transform hover:scale-[1.01]"}
                      ${isAdmin && isBookable && 'border-2 border-blue-400'}
                      ${isAdmin && isSelectedForEnable && 'bg-blue-200 !text-blue-800'}
                    `}>
                    <span>{slotTime}</span>

                    {isAdmin ? (
                      <input
                        type="checkbox"
                        checked={isSelectedForEnable}
                        onChange={() => handleToggleSlotForEnable(slotTime)}
                        disabled={
                          status === 'reserved' ||
                          status === 'blocked' ||
                          isSlotPast ||
                          isLoading
                        }
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                    ) : (
                      <button
                        onClick={() => handleReserveAppointment(slotTime)}
                        disabled={!isBookable}
                        className={`py-2 px-4 rounded-md text-white font-medium
                          ${isBookable ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}
                        `}
                      >
                        {status === 'blocked'
                          ? t('calendar.blocked')
                          : status === 'reserved'
                            ? t('calendar.reserved')
                            : isSlotPast
                              ? t('calendar.past')
                              : t('calendar.available')}
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 text-lg py-8">
                {isAdmin ? t('calendar.no_slots_to_enable') : t('calendar.no_appointments')}
              </p>
            )
          ) : (
            <p className="text-center text-gray-500 text-lg py-8">
              {t('calendar.select_date')}
            </p>
          )}
        </div>

        {isAdmin && selectedDay && (
          <button
            onClick={handleEnableSlots}
            disabled={selectedSlotsToEnable.length === 0 || isLoading}
            className="mt-6 w-full p-4 rounded-lg text-lg font-medium bg-purple-600 text-white shadow-md hover:bg-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {t('calendar.enable_slots')}
          </button>
        )}
      </div>

      <ConfirmationModal
        show={showConfirmModal}
        message={confirmModalMessage}
        onCancel={() => setShowConfirmModal(false)}
        onConfirm={executeReservationWithDetails}
        confirmText={t('calendar.confirm_button')}
        cancelText={t('calendar.cancel_button')}
      />

      <ReservationFormModal
        show={showReservationFormModal}
        onClose={() => setShowReservationFormModal(false)}
        onConfirm={executeReservationWithDetails}
        slotTime={reservationFormSlot || ''}
        selectedDay={selectedDay}
        language={language}
      />
      </div>
    </div>
  );
}