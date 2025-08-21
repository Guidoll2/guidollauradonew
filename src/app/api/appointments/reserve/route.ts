// src/app/api/appointments/reserve/route.ts
import { NextRequest, NextResponse } from "next/server";
import db from "../../../mongoDB/db";
import Appointment from "../../../mongoDB/models/appointment";
import User from "../../../mongoDB/models/users";
import sendEmail from "../../../lib/utils/sendEmail";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { AppLanguage, getTranslations } from "../../../lib/utils/i18n";

const PROFESSIONAL_EMAIL = "guido.llaurado@gmail.com";
const FROM_EMAIL = process.env.EMAIL_FROM || "noreply@yourdomain.com";

export async function POST(req: NextRequest) {
  try {
    await db();

    // Obtener datos del cuerpo de la solicitud
    const { date, timeSlot, userName, userLastName, userEmail, userWhatsapp, language } = await req.json();

    if (!date || !timeSlot || !language || !userName || !userLastName || !userEmail) {
      return NextResponse.json(
        { error: "Datos incompletos." },
        { status: 400 }
      );
    }

    const t = getTranslations(language as AppLanguage);
    const dateFnsLocale = language === 'es' ? es : enUS;

    const appointmentDate = new Date(date);

    // Buscar cita disponible
    const existingAppointment = await Appointment.findOne({
      date: appointmentDate,
      timeSlot: timeSlot,
      $or: [
        { userId: null },
        { userId: { $exists: false } },
        { userName: null },
        { userName: { $exists: false } },
        { userEmail: null },
        { userEmail: { $exists: false } }
      ],
      isBlocked: false,
    });

    if (!existingAppointment) {
      return NextResponse.json(
        { error: t.slotNotAvailable },
        { status: 400 }
      );
    }

    // Intentar obtener información del usuario autenticado (opcional)
    const { userId: clerkUserId } = await auth();
    let reservantUser = null;
    
    if (clerkUserId) {
      reservantUser = await User.findOne({ clerkUserId: clerkUserId });
    }

    // Actualizar la cita con los datos del formulario
    existingAppointment.userId = clerkUserId || undefined;
    existingAppointment.userName = userName;
    existingAppointment.userLastName = userLastName;
    existingAppointment.userEmail = userEmail;
    existingAppointment.userWhatsapp = userWhatsapp;
    await existingAppointment.save();

    const formattedDate = format(new Date(date), "EEEE d 'de' MMMM 'de' yyyy", { locale: dateFnsLocale });
    const formattedTime = timeSlot;

    // Variables para el estado de los emails
    let professionalEmailSent = false;
    let userEmailSent = false;
    let emailErrors: string[] = [];

    // --- Envío de email al profesional ---
    try {
      await sendEmail({
        to: PROFESSIONAL_EMAIL,
        from: FROM_EMAIL,
        subject: t.emailSubjectProfessional,
        text: `${t.emailNewBookingMessage}\n\n` +
              `${t.emailBookingDetailsProfessional}\n` +
              `${t.emailDate}: ${formattedDate}\n` +
              `${t.emailTime}: ${formattedTime}\n\n` +
              `${t.emailReservantInfo}\n` +
              `${t.emailName}: ${userName} ${userLastName}\n` +
              `${t.emailEmail}: ${userEmail}\n` +
              `WhatsApp: ${userWhatsapp || 'No proporcionado'}\n` +
              `${t.emailClerkId}: ${clerkUserId || 'Usuario anónimo'}`,
        html: `<p>${t.emailNewBookingMessage}</p>
               <p><strong>${t.emailBookingDetailsProfessional}</strong></p>
               <ul>
                 <li><strong>${t.emailDate}:</strong> ${formattedDate}</li>
                 <li><strong>${t.emailTime}:</strong> ${formattedTime}</li>
               </ul>
               <p><strong>${t.emailReservantInfo}</strong></p>
               <ul>
                 <li><strong>${t.emailName}:</strong> ${userName} ${userLastName}</li>
                 <li><strong>${t.emailEmail}:</strong> ${userEmail}</li>
                 <li><strong>WhatsApp:</strong> ${userWhatsapp || 'No proporcionado'}</li>
                 <li><strong>${t.emailClerkId}:</strong> ${clerkUserId || 'Usuario anónimo'}</li>
               </ul>`,
      });
      professionalEmailSent = true;
      console.log(`Email de notificación enviado a ${PROFESSIONAL_EMAIL} en idioma ${language}`);
    } catch (emailError) {
      console.error("Error enviando email a la profesional:", emailError);
      emailErrors.push(`Error enviando email al profesional: ${emailError instanceof Error ? emailError.message : 'Error desconocido'}`);
    }

    // --- Email de confirmación al usuario ---
    try {
      await sendEmail({
        to: userEmail,
        from: FROM_EMAIL,
        subject: t.emailSubjectUser,
        text: `${t.emailGreeting(userName)}\n` +
              `${t.emailConfirmedMessage}\n\n` +
              `${t.emailBookingDetails}\n` +
              `${t.emailDate}: ${formattedDate}\n` +
              `${t.emailTime}: ${formattedTime}\n\n` +
              `${t.emailWaiting}`,
        html: `<p>${t.emailGreeting(userName)}</p>
               <p>${t.emailConfirmedMessage}</p>
               <p><strong>${t.emailBookingDetails}</strong></p>
               <ul>
                 <li><strong>${t.emailDate}:</strong> ${formattedDate}</li>
                 <li><strong>${t.emailTime}:</strong> ${formattedTime}</li>
               </ul>
               <p>${t.emailWaiting}</p>`,
      });
      userEmailSent = true;
      console.log(`Email de confirmación enviado a ${userEmail} en idioma ${language}`);
    } catch (emailError) {
      console.error("Error enviando email al usuario:", emailError);
      emailErrors.push(`Error enviando email al usuario: ${emailError instanceof Error ? emailError.message : 'Error desconocido'}`);
    }

    // Preparar respuesta con información del estado de los emails
    const responseMessage = {
      success: true,
      appointment: existingAppointment,
      emailStatus: {
        professionalEmailSent,
        userEmailSent,
        errors: emailErrors
      }
    };

    // Si no se pudo enviar ningún email, incluir advertencia
    if (!professionalEmailSent && !userEmailSent) {
      responseMessage.emailStatus.errors.push('No se pudo enviar ningún email de confirmación. Verifica la configuración del servidor de correo.');
    }

    return NextResponse.json(responseMessage);

  } catch (error) {
    console.error("Error reservando turno:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al reservar el turno." },
      { status: 500 }
    );
  }
}