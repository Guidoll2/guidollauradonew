import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getContactEmailTemplate } from '@/lib/email-template';

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormRequest = await request.json();

    // Validar campos requeridos
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: 'Todos los campos son requeridos' },
        { status: 400 }
      );
    }

    // Configurar transporter de nodemailer con MailerSend
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailersend.net',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Generar el HTML del email con el template
    const emailHTML = getContactEmailTemplate({
      name: body.name,
      email: body.email,
      message: body.message,
    });

    // Configurar el email
    const mailOptions = {
      from: `"Contacto Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.ADMIN_EMAIL || 'guido.llaurado@gmail.com',
      subject: `Nuevo mensaje de ${body.name}`,
      html: emailHTML,
      replyTo: body.email,
    };

    // Enviar el email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ 
      success: true, 
      message: 'Email enviado correctamente' 
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { success: false, error: 'Error sending emails' },
      { status: 500 }
    );
  }
}
