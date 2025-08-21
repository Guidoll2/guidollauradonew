# Configuración de Emails y Sistema de Reservas

## Sistema de Horarios Automáticos

El sistema ahora **automáticamente habilita** los horarios de reserva:
- **Días**: Martes y Jueves
- **Horarios**: 10:00 AM - 13:00 PM (3 turnos de 1 hora)
- **Slots**: 10:00-11:00, 11:00-12:00, 12:00-13:00
- **Frecuencia**: Se auto-habilitan al cargar la página principal
- **Cobertura**: 8 semanas hacia adelante

## Para que los emails funcionen correctamente, necesitas configurar las siguientes variables de entorno:

### 1. Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Configuración de Email para Gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASSWORD=tu-contraseña-de-aplicacion-de-gmail
EMAIL_FROM=tu-email@gmail.com
```

### 2. Configuración de Gmail:

1. **Habilita la autenticación de dos factores** en tu cuenta de Gmail
2. **Genera una contraseña de aplicación**:
   - Ve a tu cuenta de Google → Seguridad
   - En "Acceso a Google", selecciona "Contraseñas de aplicaciones"
   - Genera una nueva contraseña para "Correo"
   - Usa esta contraseña en `EMAIL_PASSWORD`

### 3. Alternative: Usar otros proveedores de email

#### Para Outlook/Hotmail:
```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@outlook.com
EMAIL_PASSWORD=tu-contraseña
```

#### Para servicios como SendGrid, Mailgun, etc.:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASSWORD=tu-api-key
```

## Prueba la configuración:

Una vez configurado, intenta hacer una reserva y verifica:
1. Que aparezcan los toasters de carga
2. Que se confirme la reserva exitosamente
3. Que lleguen los emails tanto al profesional como al usuario

## Troubleshooting:

Si los emails no se envían, revisa:
1. Las credenciales en `.env.local`
2. Los logs en la consola del servidor
3. Que el puerto 587 no esté bloqueado por tu firewall/antivirus
