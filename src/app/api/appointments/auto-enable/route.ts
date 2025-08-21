// src/app/api/appointments/auto-enable/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../mongoDB/db";
import Appointment from "../../../mongoDB/models/appointment";
import { format, addDays, startOfMonth, endOfMonth, getDay, startOfWeek, addWeeks } from "date-fns";

const DEFAULT_PROFESSIONAL_ID = process.env.DEFAULT_PROFESSIONAL_ID || "default-professional";

export async function POST(req: NextRequest) {
  try {
    await db();

    const { weeksAhead = 8 } = await req.json(); // Por defecto habilita 8 semanas hacia adelante

    const createdSlots = [];
    const timeSlots = ["10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00"];
    
    const today = new Date();
    const startDate = startOfWeek(today, { weekStartsOn: 1 }); // Comenzar desde el lunes de esta semana
    
    // Iterar por las próximas semanas
    for (let weekOffset = 0; weekOffset < weeksAhead; weekOffset++) {
      const currentWeekStart = addWeeks(startDate, weekOffset);
      
      // Martes (día 2 de la semana, donde lunes es 1)
      const tuesday = addDays(currentWeekStart, 1); // Lunes + 1 = Martes
      // Jueves (día 4 de la semana)
      const thursday = addDays(currentWeekStart, 3); // Lunes + 3 = Jueves
      
      const daysToProcess = [tuesday, thursday];
      
      for (const day of daysToProcess) {
        // Solo procesar días futuros
        if (day > today) {
          for (const slot of timeSlots) {
            // Verificar si ya existe el slot
            const exists = await Appointment.findOne({
              date: day,
              timeSlot: slot,
              professionalId: DEFAULT_PROFESSIONAL_ID,
            });
            
            if (!exists) {
              const newAppt = await Appointment.create({
                date: new Date(day),
                timeSlot: slot,
                professionalId: DEFAULT_PROFESSIONAL_ID,
                isBlocked: false,
              });
              createdSlots.push(newAppt);
            }
          }
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Se habilitaron ${createdSlots.length} slots automáticamente para martes y jueves de 10-13h`,
      createdSlots: createdSlots.length,
      timeSlots: timeSlots,
      weeksProcessed: weeksAhead
    });
    
  } catch (err) {
    console.error("Error al habilitar slots automáticamente:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
