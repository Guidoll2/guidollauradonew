// src/app/api/appointments/enable-default/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../mongoDB/db";
import Appointment from "../../../mongoDB/models/appointment";
import User from "../../../mongoDB/models/users";
import { auth } from "@clerk/nextjs/server";
import { format, addDays, startOfMonth, endOfMonth, getDay } from "date-fns";

const DEFAULT_PROFESSIONAL_ID = process.env.DEFAULT_PROFESSIONAL_ID || "default-professional";

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

    const { monthsAhead = 2 } = await req.json();

    // Generar horarios por defecto para los próximos meses
    const createdSlots = [];
    const timeSlots = ["10:00 - 11:00", "11:00 - 12:00", "12:00 - 13:00", "13:00 - 14:00", "14:00 - 15:00"];
    
    const today = new Date();
    
    for (let monthOffset = 0; monthOffset <= monthsAhead; monthOffset++) {
      const currentMonth = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
      const startMonth = startOfMonth(currentMonth);
      const endMonth = endOfMonth(currentMonth);
      
      let currentDate = new Date(startMonth);
      
      while (currentDate <= endMonth) {
        const dayOfWeek = getDay(currentDate); // 0 = Domingo, 1 = Lunes, ..., 6 = Sábado
        
        // Martes = 2, Jueves = 4
        if (dayOfWeek === 2 || dayOfWeek === 4) {
          // Solo habilitar fechas futuras
          if (currentDate > today) {
            for (const slot of timeSlots) {
              const exists = await Appointment.findOne({
                date: currentDate,
                timeSlot: slot,
                professionalId: adminClerkId, // Usar el ID del admin
              });
              
              if (!exists) {
                const newAppt = await Appointment.create({
                  date: new Date(currentDate),
                  timeSlot: slot,
                  professionalId: adminClerkId,
                  isBlocked: false,
                });
                createdSlots.push(newAppt);
              }
            }
          }
        }
        currentDate = addDays(currentDate, 1);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Se habilitaron ${createdSlots.length} slots automáticamente`,
      createdSlots: createdSlots.length 
    });
    
  } catch (err) {
    console.error("Error al habilitar slots por defecto:", err);
    return NextResponse.json(
      { error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
