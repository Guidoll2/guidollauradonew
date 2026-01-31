import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET() {
  try {
    console.log('🧪 Iniciando test de email...');
    console.log('📧 SMTP_HOST:', process.env.SMTP_HOST);
    console.log('📧 SMTP_PORT:', process.env.SMTP_PORT);
    console.log('📧 SMTP_USER:', process.env.SMTP_USER);
    console.log('📧 ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailersend.net',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: true, // Habilitar debug
      logger: true, // Habilitar logger
    });

    console.log('🔍 Verificando conexión...');
    await transporter.verify();
    console.log('✅ Conexión verificada exitosamente');

    const mailOptions = {
      from: `"Test Asistente IA" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'guido.llaurado@gmail.com',
      subject: '🧪 Email de Prueba - Asistente IA',
      html: `
        <h1>🧪 Test de Email</h1>
        <p>Este es un email de prueba del Asistente IA.</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleString('es-ES')}</p>
        <p><strong>Servidor:</strong> ${process.env.SMTP_HOST}</p>
        <p>Si recibes este email, la configuración está correcta. ✅</p>
      `,
    };

    console.log('📤 Enviando email de prueba...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);

    return NextResponse.json({
      success: true,
      message: 'Email enviado correctamente',
      messageId: info.messageId,
      response: info.response,
    });
  } catch (error) {
    console.error('❌ Error en test de email:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido',
      details: error instanceof Error ? error.stack : undefined,
    }, { status: 500 });
  }
}
