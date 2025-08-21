// src/app/api/appointments/bulk-enable/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../mongoDB/db";
import Appointment from "../../../mongoDB/models/appointment";
import User from "../../../mongoDB/models/users";
import { auth } from "@clerk/nextjs/server";
import { format, addDays, startOfMonth, endOfMonth, getDay, addMonths } from "date-fns";

const DEFAULT_PROFESSIONAL_ID = process.env.DEFAULT_PROFESSIONAL_ID || "default-professional";

interface BulkEnableRequest {
  action: 'enable' | 'disable';
  dayOfWeek: number; // 0=Domingo, 1=Lunes, 2=Martes, 3=Miércoles, 4=Jueves, 5=Viernes, 6=Sábado
  timeSlots?: string[]; // Si no se especifica, usa todos los slots disponibles
  monthsAhead?: number; // Cuántos meses hacia adelante procesar
  startDate?: string; // Fecha de inicio específica (opcional)
  endDate?: string; // Fecha de fin específica (opcional)
}

export async function POST(req: NextRequest) {
  const { userId: adminClerkId } = await auth();
  if (!adminClerkId) {
    return NextResponse.json({ error: "No autenticado." }, { status: 401 });
  }

  try {
    await db();

    const user = await User.findOne({ clerkUserId: adminClerkId });
    if (!user || user.role?.toLowerCase() !== "admin") {
      return NextResponse.json({ error: "No autorizado." }, { status: 403 });
    }

    const {
      action,
      dayOfWeek,
      timeSlots,
      monthsAhead = 3,
      startDate,
      endDate
    }: BulkEnableRequest = await req.json();

    // Validaciones
    if (action !== 'enable' && action !== 'disable') {
      return NextResponse.json({ error: "Acción debe ser 'enable' o 'disable'" }, { status: 400 });
    }

    if (dayOfWeek < 0 || dayOfWeek > 6) {
      return NextResponse.json({ error: "dayOfWeek debe estar entre 0 y 6" }, { status: 400 });
    }

    // Slots de tiempo por defecto (10:00 - 15:00)
    const defaultTimeSlots = ["10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00"];
    const slotsToProcess = timeSlots && timeSlots.length > 0 ? timeSlots : defaultTimeSlots;

    const today = new Date();
    const start = startDate ? new Date(startDate) : today;
    const end = endDate ? new Date(endDate) : addMonths(today, monthsAhead);

    const processedSlots = [];
    const errors = [];

    // Iterar a través del rango de fechas
    let currentDate = new Date(start);
    
    while (currentDate <= end) {
      const currentDayOfWeek = getDay(currentDate);
      
      // Si es el día de la semana que queremos procesar
      if (currentDayOfWeek === dayOfWeek) {
        // Solo procesar fechas futuras
        if (currentDate > today) {
          for (const slot of slotsToProcess) {
            try {
              if (action === 'enable') {
                // Habilitar slot (crear si no existe)
                const existingAppointment = await Appointment.findOne({
                  date: currentDate,
                  timeSlot: slot,
                  professionalId: DEFAULT_PROFESSIONAL_ID,
                });

                if (!existingAppointment) {
                  const newAppointment = new Appointment({
                    date: currentDate,
                    timeSlot: slot,
                    userId: null,
                    userName: null,
                    userLastName: null,
                    userEmail: null,
                    userWhatsapp: null,
                    isBlocked: false,
                    professionalId: DEFAULT_PROFESSIONAL_ID,
                  });

                  await newAppointment.save();
                  processedSlots.push({
                    date: format(currentDate, 'yyyy-MM-dd'),
                    timeSlot: slot,
                    action: 'created'
                  });
                } else if (existingAppointment.isBlocked) {
                  // Si existe pero está bloqueado, desbloquearlo
                  existingAppointment.isBlocked = false;
                  await existingAppointment.save();
                  processedSlots.push({
                    date: format(currentDate, 'yyyy-MM-dd'),
                    timeSlot: slot,
                    action: 'unblocked'
                  });
                }
              } else if (action === 'disable') {
                // Deshabilitar slot (marcar como bloqueado o eliminar si no está reservado)
                const existingAppointment = await Appointment.findOne({
                  date: currentDate,
                  timeSlot: slot,
                  professionalId: DEFAULT_PROFESSIONAL_ID,
                });

                if (existingAppointment) {
                  if (existingAppointment.userId) {
                    // Si está reservado, solo bloquearlo
                    existingAppointment.isBlocked = true;
                    await existingAppointment.save();
                    processedSlots.push({
                      date: format(currentDate, 'yyyy-MM-dd'),
                      timeSlot: slot,
                      action: 'blocked'
                    });
                  } else {
                    // Si no está reservado, eliminarlo
                    await Appointment.deleteOne({ _id: existingAppointment._id });
                    processedSlots.push({
                      date: format(currentDate, 'yyyy-MM-dd'),
                      timeSlot: slot,
                      action: 'deleted'
                    });
                  }
                }
              }
            } catch (error) {
              errors.push({
                date: format(currentDate, 'yyyy-MM-dd'),
                timeSlot: slot,
                error: error instanceof Error ? error.message : 'Error desconocido'
              });
            }
          }
        }
      }
      
      // Avanzar al siguiente día
      currentDate = addDays(currentDate, 1);
    }

    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const actionText = action === 'enable' ? 'habilitados' : 'deshabilitados';

    return NextResponse.json({
      success: true,
      message: `${processedSlots.length} slots ${actionText} para ${dayNames[dayOfWeek]}`,
      processedSlots,
      errors: errors.length > 0 ? errors : undefined,
      summary: {
        dayOfWeek: dayNames[dayOfWeek],
        action,
        totalProcessed: processedSlots.length,
        errorCount: errors.length,
        dateRange: {
          start: format(start, 'yyyy-MM-dd'),
          end: format(end, 'yyyy-MM-dd')
        }
      }
    });

  } catch (error) {
    console.error("Error en bulk enable/disable:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
