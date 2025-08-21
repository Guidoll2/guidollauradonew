// src/app/api/test-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import sendEmail from "../../lib/utils/sendEmail";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    // Verificar que el usuario esté autenticado y sea admin
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "No autenticado." }, { status: 401 });
    }

    const { testEmail } = await req.json();
    
    if (!testEmail) {
      return NextResponse.json(
        { error: "Email de prueba requerido." },
        { status: 400 }
      );
    }

    // Enviar email de prueba
    await sendEmail({
      to: testEmail,
      subject: "Email de Prueba - Sistema de Reservas",
      text: `¡Hola!\n\nEste es un email de prueba del sistema de reservas.\n\nSi recibes este mensaje, la configuración de email está funcionando correctamente.\n\nFecha y hora de prueba: ${new Date().toLocaleString()}\n\n¡Saludos!`,
      html: `
        <h2>🎉 Email de Prueba - Sistema de Reservas</h2>
        <p>¡Hola!</p>
        <p>Este es un email de prueba del sistema de reservas.</p>
        <p><strong>Si recibes este mensaje, la configuración de email está funcionando correctamente.</strong></p>
        <p><small>Fecha y hora de prueba: ${new Date().toLocaleString()}</small></p>
        <p>¡Saludos!</p>
      `,
    });

    return NextResponse.json({ 
      success: true, 
      message: `Email de prueba enviado exitosamente a ${testEmail}` 
    });

  } catch (error) {
    console.error("Error enviando email de prueba:", error);
    return NextResponse.json(
      { 
        error: "Error enviando email de prueba", 
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
