# 🤖 Asistente Virtual con IA - OpenAI

## 📋 Descripción

Asistente virtual inteligente que aparece como un orbe flotante estilo Siri en tu sitio web. Diseñado con una interfaz Apple-like con glassmorphism y colores suaves.

## ✨ Características Principales

### 🎨 Diseño
- **Orbe flotante animado** estilo Siri con efectos de resplandor
- **Interfaz glassmorphism** con backdrop blur y transparencias
- **Animaciones suaves** y transiciones profesionales
- **Responsive** y adaptado al tema dark/light
- **Aparece después del scroll** (300px) para no ser intrusivo

### 🧠 Inteligencia
- **Conversación natural** usando GPT-4o-mini de OpenAI
- **Streaming de respuestas** en tiempo real (mensaje por mensaje)
- **Personalidad cálida** pero enfocada en ventas
- **Redirección inteligente** de temas off-topic
- **Identificación automática** del tipo de proyecto del cliente

### 📊 Análisis y Seguimiento
- **Después de 6 mensajes** analiza la conversación automáticamente
- **Extrae insights** del cliente:
  - Tipo de proyecto identificado
  - Nivel de preparación para contratar
  - Presupuesto mencionado
  - Información de contacto
  - Puntos clave de la conversación
  - Acción recomendada
- **Envía email automático** con el resumen completo y transcripción

### 💰 Estrategia de Ventas
- Después de **5 mensajes**, si identifica interés en landing page, menciona el precio de **200€**
- Hace preguntas para calificar al lead
- Identifica necesidades del cliente
- Proporciona información clara sobre servicios

## 🛠️ Componentes Creados

### 1. API Route - `/app/api/openai-assistant/route.ts`
- Endpoint para comunicación con OpenAI
- Manejo de streaming de respuestas
- Análisis automático de conversaciones
- Integración con el sistema de emails existente

### 2. Componente UI - `/components/FloatingAssistant.tsx`
- Orbe flotante animado
- Chat modal expandible
- Interfaz de mensajes con scroll automático
- Indicador de escritura animado
- Manejo de estados de carga

### 3. Integración - `/app/page.tsx`
- Componente agregado a la página principal
- Visible después del scroll

## 🚀 Instalación y Configuración

### Requisitos Previos
El paquete `openai` ya está instalado en el proyecto (v6.17.0)

### Variables de Entorno
Ya configuradas en `.env.local`:
```env
OPENAI_API_KEY=tu_api_key_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # (en producción usa tu dominio)
```

### Iniciar el Servidor
```bash
npm run dev
```

## 📝 Prompt del Sistema

El asistente está configurado con un prompt específico que define:

1. **Personalidad**: Cálido, amigable, conversacional
2. **Misión**: Identificar necesidades y calificar leads
3. **Servicios**: Landing Pages (200€), Corporativos, E-commerce, Custom
4. **Comportamiento**: Responde brevemente a temas off-topic y redirige amablemente

## 🎯 Flujo de Conversación

```
Usuario visita el sitio
    ↓
Hace scroll > 300px
    ↓
Aparece orbe flotante animado
    ↓
Click en orbe → Abre chat
    ↓
Mensaje de bienvenida automático
    ↓
Conversación natural con streaming
    ↓
Mensaje 5: Menciona precios si detecta interés en landing
    ↓
Mensaje 6: Análisis automático + Email al admin
```

## 📧 Email de Análisis

Después del mensaje 6, recibirás un email con:
- 📊 Análisis automático del cliente
- 🎯 Tipo de proyecto identificado
- 💰 Presupuesto mencionado
- 🔥 Nivel de preparación (alto/medio/bajo)
- 📝 Puntos clave de la conversación
- 💡 Acción recomendada
- 📜 Transcripción completa

## 🎨 Personalización

### Cambiar el Modelo de IA
En `/app/api/openai-assistant/route.ts`:
```typescript
model: 'gpt-4o-mini',  // Rápido y económico
// Cambia a 'gpt-4o' para mejor calidad (más costoso)
```

### Ajustar la Creatividad
```typescript
temperature: 0.8,  // 0.0 = Más determinista, 1.0 = Más creativo
```

### Modificar Precios y Servicios
Edita el `SYSTEM_PROMPT` en la misma ruta para cambiar:
- Precios de servicios
- Tipos de proyectos
- Estrategia de ventas
- Tono de conversación

### Cambiar Cuándo Aparece
En `/components/FloatingAssistant.tsx`:
```typescript
if (window.scrollY > 300) {  // Cambia este valor
```

### Cambiar Número de Mensajes para Análisis
En `/app/api/openai-assistant/route.ts`:
```typescript
if (messageCount >= 6) {  // Cambia este valor
```

## 💡 Casos de Uso

### Ejemplo 1: Cliente Pregunta sobre Clima
```
Cliente: "¿Qué pensás del clima?"
Asistente: "Me gustan mucho los días despejados de sol. ☀️ 
Perdona que no siga con la charla del clima, pero en este 
chat estoy programado para explicarte los servicios de 
desarrollo web. ¿Te puedo contar algo sobre nuestros servicios?"
```

### Ejemplo 2: Cliente Busca Landing Page
```
Cliente: "Necesito una página web simple"
Asistente: "¡Perfecto! Una página web simple puede ser ideal 
para ti. Cuéntame un poco más: ¿es para mostrar tu negocio, 
para captar leads, o para vender algo?"

[... conversación continúa ...]

Asistente [mensaje 5]: "Genial, por lo que me contás, una 
landing page profesional sería perfecta para tu proyecto. 
Tenemos un paquete económico de landing pages desde 200€ 
que incluye diseño moderno, responsive y optimizado. 
¿Te gustaría saber más detalles?"
```

## 🔒 Seguridad

- ✅ API key de OpenAI en variables de entorno
- ✅ Validación de requests en el servidor
- ✅ No se exponen datos sensibles al cliente
- ✅ Límite de tokens para evitar abusos (max_tokens: 500)

## 📊 Costos Estimados

Con GPT-4o-mini:
- **Input**: ~$0.15 por millón de tokens
- **Output**: ~$0.60 por millón de tokens
- **Promedio por conversación**: $0.01 - $0.03
- **100 conversaciones/día**: ~$1-3 USD/día

💡 **Tip**: Para producción con alto volumen, considera GPT-3.5-turbo (más económico pero menos natural)

## 🐛 Troubleshooting

### El orbe no aparece
- Verifica que hayas hecho scroll > 300px
- Revisa la consola del navegador por errores

### Las respuestas no llegan
- Verifica que `OPENAI_API_KEY` esté configurada
- Verifica que la API key sea válida
- Revisa los logs del servidor

### El email no se envía
- Verifica que `NEXT_PUBLIC_SITE_URL` esté configurada
- Verifica las credenciales de SMTP (MailerSend)
- Revisa los logs del servidor

### Errores de CORS
- El componente usa rutas del mismo dominio
- No debería haber problemas de CORS

## 🚀 Próximas Mejoras Sugeridas

1. **Persistencia de conversaciones** en MongoDB
2. **Panel de admin** para ver todas las conversaciones
3. **Metrics y analytics** de conversiones
4. **A/B testing** de diferentes prompts
5. **Soporte multiidioma** automático
6. **Integración con CRM** (HubSpot, Salesforce, etc.)
7. **Webhook notifications** a Slack/Discord
8. **Voice input** con Web Speech API

## 📞 Soporte

Para modificaciones o dudas sobre el asistente, contacta a Guido Llauradó.

---

**Creado con ❤️ usando Next.js 16, OpenAI GPT-4o-mini, y Tailwind CSS**
