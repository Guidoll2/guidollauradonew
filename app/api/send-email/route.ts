import { NextRequest, NextResponse } from 'next/server';

const MAILERSEND_TOKEN = 'mlsn.3dea209dc65e22c010abfcd95bcc7bb9d7c93b8f9eda1096b2908d102d950d21';
const MAILERSEND_API = 'https://api.mailersend.com/v1/email';

interface EmailItem {
  id: string;
  name: string;
  price: string;
  priceNumber: number;
  quantity: number;
  source: 'landing' | 'professional' | 'webapp';
}

interface EmailRequest {
  customerEmail: string;
  customerName: string;
  customerLastname?: string;
  customerPhone?: string;
  items: EmailItem[];
  totalPrice: number;
  adminEmail: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequest = await request.json();

    const itemsHTML = body.items
      .map(
        item =>
          `<tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 12px; text-align: left;">${item.name}</td>
            <td style="padding: 12px; text-align: center;">x${item.quantity}</td>
            <td style="padding: 12px; text-align: right;">${(item.priceNumber * item.quantity).toFixed(2)}€</td>
          </tr>`
      )
      .join('');

    // Email to customer
    const customerEmailData = {
      from: {
        email: 'noreply@guidoll.dev',
        name: 'Guidoll.dev'
      },
      to: [
        {
          email: body.customerEmail,
          name: body.customerName
        }
      ],
      subject: 'Confirmación de tu pedido - Guidoll.dev',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
              .header { background: linear-gradient(135deg, #3b82f6 0%, #0ea5e9 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .content { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .summary-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .total-row { font-weight: bold; background: #f0f0f0; }
              .total-price { color: #ff9999; font-size: 18px; }
              .cta-button { display: inline-block; background: linear-gradient(135deg, #ffbba8 0%, #ff9999 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin-top: 20px; font-weight: bold; }
              .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Gracias por tu pedido!</h1>
                <p>Hola ${body.customerName}${body.customerLastname ? ' ' + body.customerLastname : ''}</p>
              </div>
              
              <div class="content">
                <p>Tu pedido ha sido recibido correctamente. Aquí te mostramos un resumen:</p>
                
                <table class="summary-table">
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 12px; text-align: left;">Servicio</th>
                      <th style="padding: 12px; text-align: center;">Cantidad</th>
                      <th style="padding: 12px; text-align: right;">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                    <tr class="total-row">
                      <td colspan="2" style="padding: 12px; text-align: right;"><strong>Total:</strong></td>
                      <td style="padding: 12px; text-align: right;"><span class="total-price">${body.totalPrice.toFixed(2)}€</span></td>
                    </tr>
                  </tbody>
                </table>
                
                <p><strong>Datos de contacto:</strong></p>
                <ul>
                  <li>Email: ${body.customerEmail}</li>
                  ${body.customerPhone ? `<li>Teléfono: ${body.customerPhone}</li>` : ''}
                </ul>
                
                <p>Nos pondremos en contacto contigo pronto para confirmar los detalles del proyecto.</p>
                
                <a href="https://wa.me/34675497068?text=Hola%20Guidoll,%20tengo%20una%20pregunta%20sobre%20mi%20pedido" class="cta-button">Contactar por WhatsApp</a>
              </div>
              
              <div class="footer">
                <p>© 2025 Guidoll.dev - Desarrollo web premium en Barcelona</p>
                <p>Si tienes alguna pregunta, responde a este email o contáctanos por WhatsApp</p>
              </div>
            </div>
          </body>
        </html>
      `
    };

    // Email to admin
    const adminEmailData = {
      from: {
        email: 'noreply@guidoll.dev',
        name: 'Guidoll.dev'
      },
      to: [
        {
          email: body.adminEmail,
          name: 'Guido'
        }
      ],
      subject: `Nuevo pedido de ${body.customerName} - ${body.totalPrice.toFixed(2)}€`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 8px; }
              .header { background: linear-gradient(135deg, #ff6b6b 0%, #ff9999 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .content { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
              .summary-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .total-row { font-weight: bold; background: #f0f0f0; }
              .total-price { color: #ff6b6b; font-size: 18px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 Nuevo Pedido Recibido</h1>
              </div>
              
              <div class="content">
                <h2>Información del cliente:</h2>
                <ul>
                  <li><strong>Nombre:</strong> ${body.customerName}${body.customerLastname ? ' ' + body.customerLastname : ''}</li>
                  <li><strong>Email:</strong> ${body.customerEmail}</li>
                  ${body.customerPhone ? `<li><strong>Teléfono:</strong> ${body.customerPhone}</li>` : ''}
                </ul>
                
                <h2>Detalles del pedido:</h2>
                <table class="summary-table">
                  <thead>
                    <tr style="background: #f0f0f0;">
                      <th style="padding: 12px; text-align: left;">Servicio</th>
                      <th style="padding: 12px; text-align: center;">Cantidad</th>
                      <th style="padding: 12px; text-align: right;">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHTML}
                    <tr class="total-row">
                      <td colspan="2" style="padding: 12px; text-align: right;"><strong>Total:</strong></td>
                      <td style="padding: 12px; text-align: right;"><span class="total-price">${body.totalPrice.toFixed(2)}€</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </body>
        </html>
      `
    };

    // Send customer email
    const customerResponse = await fetch(MAILERSEND_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Mailersend-Key': MAILERSEND_TOKEN
      },
      body: JSON.stringify(customerEmailData)
    });

    if (!customerResponse.ok) {
      throw new Error(`MailerSend API error: ${await customerResponse.text()}`);
    }

    // Send admin email
    const adminResponse = await fetch(MAILERSEND_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Mailersend-Key': MAILERSEND_TOKEN
      },
      body: JSON.stringify(adminEmailData)
    });

    if (!adminResponse.ok) {
      throw new Error(`MailerSend API error: ${await adminResponse.text()}`);
    }

    return NextResponse.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending emails:', error);
    return NextResponse.json(
      { success: false, error: 'Error sending emails' },
      { status: 500 }
    );
  }
}
