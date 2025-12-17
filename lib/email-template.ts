export const getContactEmailTemplate = (data: {
  name: string;
  email: string;
  message: string;
}) => {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; background-color: #f5f5f7;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
          
          <!-- Header con gradiente -->
          <tr>
            <td style="background: linear-gradient(135deg, #ffbba8 0%, #67e2f0 100%); padding: 48px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 600; letter-spacing: -0.5px;">
                Nuevo Mensaje
              </h1>
              <p style="margin: 12px 0 0 0; color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 400;">
                Has recibido un mensaje desde tu portfolio
              </p>
            </td>
          </tr>
          
          <!-- Contenido -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Información del contacto -->
              <div style="background-color: #f9fafb; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom: 16px;">
                      <p style="margin: 0; font-size: 13px; color: #86868b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                        Remitente
                      </p>
                      <p style="margin: 8px 0 0 0; font-size: 18px; color: #1d1d1f; font-weight: 600;">
                        ${data.name}
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 16px; border-top: 1px solid #e5e5e7;">
                      <p style="margin: 0; font-size: 13px; color: #86868b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                        Email
                      </p>
                      <p style="margin: 8px 0 0 0; font-size: 16px; color: #0071e3;">
                        <a href="mailto:${data.email}" style="color: #0071e3; text-decoration: none;">
                          ${data.email}
                        </a>
                      </p>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- Mensaje -->
              <div style="margin-bottom: 32px;">
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #86868b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                  Mensaje
                </p>
                <div style="background-color: #ffffff; border: 1px solid #e5e5e7; border-radius: 12px; padding: 20px;">
                  <p style="margin: 0; font-size: 16px; color: #1d1d1f; line-height: 1.6; white-space: pre-wrap;">
${data.message}
                  </p>
                </div>
              </div>
              
              <!-- Call to action -->
              <div style="text-align: center; margin-top: 40px;">
                <a href="mailto:${data.email}?subject=Re: Mensaje desde guidodev.es" 
                   style="display: inline-block; background: linear-gradient(135deg, #ffbba8 0%, #67e2f0 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 980px; font-size: 16px; font-weight: 600; letter-spacing: -0.2px;">
                  Responder Mensaje
                </a>
              </div>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 32px 40px; border-top: 1px solid #e5e5e7;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0; font-size: 13px; color: #86868b; line-height: 1.6;">
                      Este mensaje fue enviado desde el formulario de contacto de<br>
                      <a href="https://guidodev.es" style="color: #0071e3; text-decoration: none; font-weight: 500;">guidodev.es</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="text-align: center; padding-top: 20px;">
                    <p style="margin: 0; font-size: 11px; color: #a1a1a6;">
                      © ${new Date().getFullYear()} Guidodev. Todos los derechos reservados.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
};
