# 📧 Configuración de Email - Formulario de Contacto

## ✅ Implementación Completada

Se ha configurado exitosamente el sistema de envío de emails para el formulario de contacto con las siguientes características:

### 🎨 Diseño del Email
- **Estética Apple-like**: Email con diseño minimalista y elegante
- **Colores del gradiente**: Utiliza los mismos colores de tu portfolio (#ffbba8 y #67e2f0)
- **Responsive**: Se adapta perfectamente a dispositivos móviles
- **Tipografía**: -apple-system y San Francisco como fuente

### 📦 Archivos Modificados/Creados

1. **`/lib/email-template.ts`** (NUEVO)
   - Template HTML con diseño Apple-like
   - Incluye información del remitente, email y mensaje
   - Botón de respuesta directa integrado

2. **`/app/api/send-email/route.ts`** (MODIFICADO)
   - Configurado con Nodemailer + MailerSend SMTP
   - Validación de campos
   - Manejo de errores mejorado

3. **`/components/ContactModal.tsx`** (MODIFICADO)
   - Conectado a la API real
   - Manejo de estados de éxito/error
   - Feedback visual al usuario

4. **`.env.local`** (ACTUALIZADO)
   - Variables de entorno agregadas

---

## 🚀 Variables de Entorno para Vercel

Para que el formulario funcione en producción, debes agregar las siguientes variables de entorno en tu panel de Vercel:

### Variables a Configurar:

| Variable | Valor |
|----------|-------|
| `SMTP_HOST` | `smtp.mailersend.net` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `MS_o1eHB1@guidodev.es` |
| `SMTP_PASS` | `mssp.JhoKsB9.v69oxl550p2l785k.OKTE13x` |
| `ADMIN_EMAIL` | `guido.llaurado@gmail.com` |

---

## 📝 Pasos para Configurar en Vercel

1. Ve a tu proyecto en Vercel: https://vercel.com/dashboard
2. Selecciona tu proyecto **guidolldev**
3. Ve a **Settings** > **Environment Variables**
4. Agrega cada variable con su valor correspondiente:

```
SMTP_HOST=smtp.mailersend.net
SMTP_PORT=587
SMTP_USER=MS_o1eHB1@guidodev.es
SMTP_PASS=mssp.JhoKsB9.v69oxl550p2l785k.OKTE13x
ADMIN_EMAIL=guido.llaurado@gmail.com
```

5. Guarda los cambios
6. **IMPORTANTE**: Haz un nuevo deployment o redeploy del proyecto para que las variables se apliquen

---

## 🧪 Cómo Probar Localmente

1. Las variables ya están en tu `.env.local`
2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre el modal de contacto en http://localhost:3000
4. Completa el formulario y envíalo
5. Deberías recibir un email en **guido.llaurado@gmail.com**

---

## 📧 Características del Email que Recibirás

✨ **Diseño Apple-like profesional**
- Header con gradiente de colores de tu marca
- Información del remitente destacada en una tarjeta
- Email del cliente como enlace clicable
- Mensaje en un contenedor con borde elegante
- Botón "Responder Mensaje" que abre el cliente de email con respuesta pre-cargada
- Footer con info del portfolio
- Totalmente responsive

---

## 🔒 Seguridad

- Las credenciales están en variables de entorno (no en el código)
- El archivo `.env.local` está en `.gitignore`
- Validación de campos en el backend
- Reply-To configurado para responder directamente al cliente

---

## ⚠️ Notas Importantes

1. **Puerto SMTP**: Estamos usando el puerto 587 (recomendado por MailerSend)
2. **Secure**: Configurado como `false` para el puerto 587
3. **Reply-To**: El email del cliente se configura automáticamente como Reply-To, por lo que al responder el email, irá directamente al cliente

---

## 🎯 Resultado Final

Cuando un cliente llene el formulario de contacto:
1. El cliente ve un mensaje de éxito
2. Tú recibes un email hermoso en **guido.llaurado@gmail.com** con:
   - Nombre del cliente
   - Email del cliente (clicable)
   - Mensaje completo
   - Botón para responder directamente

---

## 🐛 Troubleshooting

Si los emails no llegan:
1. Verifica que todas las variables estén correctamente configuradas en Vercel
2. Revisa los logs en Vercel Dashboard > Project > Deployments > View Function Logs
3. Asegúrate de haber hecho un redeploy después de agregar las variables
4. Verifica que el dominio `guidodev.es` esté verificado en MailerSend
5. Revisa la carpeta de SPAM en Gmail

---

**¡Todo listo! 🎉** Tu formulario de contacto ahora envía emails reales con un diseño profesional tipo Apple.
