// src/lib/i18n.ts
import { es, enUS, ca, Locale  } from 'date-fns/locale';

export type AppLanguage = "es" | "en" | "ca";

interface Translations {
  // Calendar Component specific
  previousMonth: string;
  nextMonth: string;
  weekDays: string[];
  selectDate: string;
  today: string;
  noAppointmentsAvailable: string;
  enableAppointmentsForDay: string;
  blocked: string;
  reserved: string;
  available: string;
  past: string; // <-- ¡AÑADIDO! Para el estado "pasado" en los turnos
  of: string; // <-- ¡AÑADIDO! Para "d de MMMM"

  // Appointment related alerts
  mustLoginToReserve: string;
  confirmReservation: (date: string, timeSlot: string) => string;
  appointmentReservedSuccess: string;
  errorReservingAppointment: string;
  internalServerErrorReserve: string;
  appointmentsEnabled: string;
  errorEnablingAppointments: string;
  internalServerErrorEnable: string;
  slotNotAvailable: string; // <-- ¡AÑADIDO! Para el mensaje si el slot no está disponible

  // Toaster messages for loading states (¡NUEVAS CLAVES!)
  loadingRole: string;
  loadingAppointments: string;
  reservingAppointment: string;
  enablingSlots: string;
  errorLoadingRole: string;
  errorLoadingAppointments: string;


  // Email content (for user confirmation)
  emailSubjectUser: string;
  emailGreeting: (firstName: string) => string;
  emailConfirmedMessage: string;
  emailBookingDetails: string;
  emailWaiting: string;
  emailDate: string; // <-- ¡AÑADIDO!
  emailTime: string; // <-- ¡AÑADIDO!

  // Email content (for professional notification)
  emailSubjectProfessional: string;
  emailNewBookingMessage: string;
  emailBookingDetailsProfessional: string;
  emailReservantInfo: string;
  emailName: string;
  emailEmail: string;
  emailClerkId: string;

  // Date-fns locale object
  dateLocale: Locale;
}

export const messages: Record<AppLanguage, Translations> = {
  es: {
    // Calendar Component specific
    previousMonth: "Mes anterior",
    nextMonth: "Siguiente mes",
    weekDays: ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
    selectDate: "Selecciona una fecha",
    today: "HOY",
    noAppointmentsAvailable: "No hay horarios disponibles para este día.",
    enableAppointmentsForDay: "Habilitar Horarios para este día",
    blocked: "Bloqueado",
    reserved: "Reservado",
    available: "Disponible",
    past: "Pasado", // ¡AÑADIDO!
    of: "de", // ¡AÑADIDO!

    // Appointment related alerts
    mustLoginToReserve: "Debes iniciar sesión para reservar un turno.",
    confirmReservation: (date: string, timeSlot: string) => `¿Deseas reservar el turno del ${date} a las ${timeSlot}?`,
    appointmentReservedSuccess: "Reunión reservada con éxito. Revisa tu email para los detalles.", // ¡MODIFICADO!
    errorReservingAppointment: "Error al reservar la reunión.",
    internalServerErrorReserve: "Error interno del servidor al reservar la reunión.",
    appointmentsEnabled: "Turnos habilitados para el día.", // ¡MODIFICADO!
    errorEnablingAppointments: "Error habilitando turnos.",
    internalServerErrorEnable: "Error interno del servidor al habilitar turnos.",
    slotNotAvailable: "El turno no está disponible, ya fue reservado o bloqueado.", // ¡AÑADIDO!

    // Toaster messages for loading states (¡NUEVAS TRADUCCIONES!)
    loadingRole: "Cargando rol de usuario...",
    loadingAppointments: "Cargando turnos disponibles...",
    reservingAppointment: "Reservando turno...",
    enablingSlots: "Habilitando horarios...",
    errorLoadingRole: "Error al cargar el rol de usuario.",
    errorLoadingAppointments: "Error al cargar los turnos.",

    // Email content (for user confirmation)
    emailSubjectUser: "Confirmación de tu turno",
    emailGreeting: (firstName: string) => `¡Hola ${firstName}!\n\n`,
    emailConfirmedMessage: "Tu turno ha sido confirmado con éxito.",
    emailBookingDetails: "Detalles de tu reserva:",
    emailWaiting: "¡Te esperamos!",
    emailDate: "Fecha", // ¡AÑADIDO!
    emailTime: "Hora", // ¡AÑADIDO!

    // Email content (for professional notification)
    emailSubjectProfessional: "Nuevo turno reservado",
    emailNewBookingMessage: "Se ha reservado un nuevo turno.",
    emailBookingDetailsProfessional: "Detalles del turno:",
    emailReservantInfo: "Información del reservante:",
    emailName: "Nombre:",
    emailEmail: "Email:",
    emailClerkId: "Clerk ID:",

    // Date-fns locale object
    dateLocale: es,
  },
  en: {
    // Calendar Component specific
    previousMonth: "Previous month",
    nextMonth: "Next month",
    weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    selectDate: "Select a date",
    today: "TODAY",
    noAppointmentsAvailable: "No appointments available for this day.",
    enableAppointmentsForDay: "Enable Appointments for this day",
    blocked: "Blocked",
    reserved: "Booked",
    available: "Available",
    past: "Past", // ¡AÑADIDO!
    of: "of", // ¡AÑADIDO!

    // Appointment related alerts
    mustLoginToReserve: "You must be logged in to reserve an appointment.",
    confirmReservation: (date: string, timeSlot: string) => `Do you want to reserve the appointment on ${date} at ${timeSlot}?`,
    appointmentReservedSuccess: "Appointment successfully reserved! Check your email for details.", // ¡MODIFICADO!
    errorReservingAppointment: "Error reserving appointment.",
    internalServerErrorReserve: "Internal server error reserving appointment.",
    appointmentsEnabled: "Appointments enabled for the day.", // ¡MODIFICADO!
    errorEnablingAppointments: "Error enabling appointments.",
    internalServerErrorEnable: "Internal server error enabling appointments.",
    slotNotAvailable: "The slot is not available, already reserved, or blocked.", // ¡AÑADIDO!

    // Toaster messages for loading states (¡NUEVAS TRADUCCIONES!)
    loadingRole: "Loading user role...",
    loadingAppointments: "Loading available appointments...",
    reservingAppointment: "Reserving appointment...",
    enablingSlots: "Enabling slots...",
    errorLoadingRole: "Error loading user role.",
    errorLoadingAppointments: "Error loading appointments.",

    // Email content (for user confirmation)
    emailSubjectUser: "Appointment Confirmation",
    emailGreeting: (firstName: string) => `Hello ${firstName}!\n\n`,
    emailConfirmedMessage: "Your appointment has been successfully confirmed.",
    emailBookingDetails: "Details of your booking:",
    emailWaiting: "We look forward to seeing you!",
    emailDate: "Date", // ¡AÑADIDO!
    emailTime: "Time", // ¡AÑADIDO!

    // Email content (for professional notification)
    emailSubjectProfessional: "New appointment reserved",
    emailNewBookingMessage: "A new appointment has been reserved.",
    emailBookingDetailsProfessional: "Appointment details:",
    emailReservantInfo: "Reservant information:",
    emailName: "Name:",
    emailEmail: "Email:",
    emailClerkId: "Clerk ID:",

    // Date-fns locale object
    dateLocale: enUS,
  },
  ca: {
    // Calendar Component specific
    previousMonth: "Mes anterior",
    nextMonth: "Següent mes",
    weekDays: ["Dil", "Dim", "Dic", "Dij", "Div", "Dis", "Diu"],
    selectDate: "Selecciona una data",
    today: "AVUI",
    noAppointmentsAvailable: "No hi ha horaris disponibles per aquest dia.",
    enableAppointmentsForDay: "Habilitar Horaris per aquest dia",
    blocked: "Bloquejat",
    reserved: "Reservat",
    available: "Disponible",
    past: "Passat",
    of: "de",

    // Appointment related alerts
    mustLoginToReserve: "Has d'iniciar sessió per reservar una cita.",
    confirmReservation: (date: string, timeSlot: string) => `Vols reservar la cita del ${date} a les ${timeSlot}?`,
    appointmentReservedSuccess: "Reunió reservada amb èxit. Revisa el teu email per als detalls.",
    errorReservingAppointment: "Error al reservar la reunió.",
    internalServerErrorReserve: "Error intern del servidor al reservar la reunió.",
    appointmentsEnabled: "Cites habilitades per al dia.",
    errorEnablingAppointments: "Error habilitant cites.",
    internalServerErrorEnable: "Error intern del servidor al habilitar cites.",
    slotNotAvailable: "La cita no està disponible, ja va ser reservada o bloquejada.",

    // Toaster messages for loading states
    loadingRole: "Carregant rol d'usuari...",
    loadingAppointments: "Carregant cites disponibles...",
    reservingAppointment: "Reservant cita...",
    enablingSlots: "Habilitant horaris...",
    errorLoadingRole: "Error al carregar el rol d'usuari.",
    errorLoadingAppointments: "Error al carregar les cites.",

    // Email content (for user confirmation)
    emailSubjectUser: "Confirmació de la teva cita",
    emailGreeting: (firstName: string) => `Hola ${firstName}!\n\n`,
    emailConfirmedMessage: "La teva cita ha estat confirmada amb èxit.",
    emailBookingDetails: "Detalls de la teva reserva:",
    emailWaiting: "T'esperem!",
    emailDate: "Data",
    emailTime: "Hora",

    // Email content (for professional notification)
    emailSubjectProfessional: "Nova cita reservada",
    emailNewBookingMessage: "S'ha reservat una nova cita.",
    emailBookingDetailsProfessional: "Detalls de la cita:",
    emailReservantInfo: "Informació del reservant:",
    emailName: "Nom:",
    emailEmail: "Email:",
    emailClerkId: "Clerk ID:",

    // Date-fns locale object
    dateLocale: ca,
  },
};

export const getTranslations = (lang: AppLanguage): Translations => {
  return messages[lang];
};
