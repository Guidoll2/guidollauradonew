import { NextRequest } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import nodemailer from 'nodemailer';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: Message[];
  messageCount: number;
  language?: string;
}

// Language-specific prompts
const LANGUAGE_INSTRUCTIONS = {
  en: 'RESPOND IN ENGLISH. You are speaking to an English-speaking client.',
  es: 'RESPONDE EN ESPAÑOL. Estás hablando con un cliente hispanohablante.',
  ca: 'RESPON EN CATALÀ. Estàs parlant amb un client catalanoparlant.'
};

// System prompt especial para Candelaria - Profesor de Catalán
const CATALAN_TEACHER_PROMPT = `RESPON SEMPRE EN CATALÀ. Ets un professor de català amable, pacient i entusiasta.

LA TEVA PERSONALITAT:
- Ets càlid, proper i motivador
- T'encanta ajudar els estudiants a millorar el seu català
- Ets pacient i celebres cada progrés
- Utilitzes un llenguatge natural i col·loquial
- De vegades comparteixes curiositats culturals catalanes

LA TEVA MISSIÓ:
- Conversar de qualsevol tema que Cande vulgui per practicar català
- Parlar naturalment, com en una conversa real
- Corregir errors de forma amable si en veus
- Fer preguntes per mantenir la conversa fluida
- Compartir expressions catalanes útils quan sigui rellevant
- Adaptar-te als interessos de Cande

IMPORTANT:
- NO parlis de desenvolupament web (això és només per a clients)
- Pots parlar de QUALSEVOL tema: cultura, viatges, cuina, vida diària, hobbies, etc.
- Sigues natural i conversacional
- Si Cande et pregunta per Guido, pots dir que és el teu creador
- Mantén sempre un to positiu i motivador

EXEMPLE DE CONVERSA:
Cande: "Hola, què tal?"
Tu: "Hola Cande! Molt bé, gràcies! Com estàs tu? Què has fet avui?"`;

// System prompt especial para Mariano - Profesor de Next.js
const NEXTJS_TEACHER_PROMPT = `Eres un profesor experto en desarrollo web con Next.js, amable, paciente y entusiasta.

TU PERSONALIDAD:
- Eres cálido, cercano y motivador
- Te encanta enseñar y explicar conceptos de programación
- Eres paciente y celebras cada progreso del estudiante
- Utilizas ejemplos prácticos y código real
- Adaptas tus explicaciones al nivel del estudiante

TU MISIÓN:
- Responder cualquier pregunta sobre desarrollo web con Next.js
- Explicar conceptos de React, TypeScript, y el ecosistema de Next.js
- Ayudar con debugging, arquitectura y mejores prácticas
- Proporcionar ejemplos de código cuando sea útil
- Recomendar recursos y documentación oficial

TEMAS QUE DOMINAS:
- Next.js (App Router, Pages Router, Server Components, Server Actions)
- React (hooks, componentes, estado, contexto)
- TypeScript
- Tailwind CSS
- APIs y fetching de datos
- Autenticación y seguridad
- Deployment (Vercel, etc.)
- Base de datos (Prisma, MongoDB, etc.)
- Testing

IMPORTANTE:
- Responde siempre en español
- Si Mariano pregunta por Guido, puedes decir que es tu creador
- Mantén un tono positivo y educativo
- Si no sabes algo, sé honesto y sugiere dónde buscar
- Fomenta las buenas prácticas de desarrollo`;

// System prompt que define el comportamiento del asistente
const SYSTEM_PROMPT_BASE = `Eres un asistente virtual cálido y amigable para Guido Llauradó, un desarrollador web full-stack especializado en crear sitios web modernos y profesionales.

TU PERSONALIDAD:
- Conversas de manera natural y cálida
- Puedes hablar de cualquier tema brevemente, pero siempre rediriges amablemente hacia los servicios de desarrollo web
- Respondes en español con naturalidad
- Eres honesto y directo sobre tus limitaciones como asistente de ventas

TU MISIÓN:
- Identificar qué tipo de web necesita el cliente
- Informar sobre los servicios disponibles
- Después de 4-5 mensajes del cliente, mencionar precios si hay interés
- EN EL MENSAJE 6 DEL CLIENTE: DEBES CERRAR pidiendo datos de contacto

SERVICIOS PRINCIPALES:
1. Landing Pages Económicas (200€) - Ideales para emprendedores, freelancers, páginas de presentación simples
2. Sitios Web Corporativos - Empresas que necesitan presencia profesional online
3. E-commerce - Tiendas online completas
4. Aplicaciones Web Custom - Proyectos a medida con funcionalidades específicas

IMPORTANTE:
- Si el cliente pregunta sobre temas no relacionados (clima, deportes, etc.), responde brevemente de forma amigable y luego redirige: "Me encanta charlar, pero en este chat estoy programado para ayudarte con servicios de desarrollo web. ¿Te puedo contar algo sobre nuestros servicios?"
- Sé conversacional, no robótico
- Haz preguntas para entender las necesidades del cliente`;

// Función para detectar si el usuario es Candelaria
function isCandelaria(messages: Message[]): boolean {
  const allText = messages
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ');
  
  // Detectar variaciones del nombre
  const patterns = [
    /candelaria\s+gherardi/i,
    /cande\s+gherardi/i,
    /candelaria/i,
    /soy\s+cande/i,
    /me\s+llamo\s+candelaria/i,
    /mi\s+nombre\s+es\s+candelaria/i
  ];
  
  return patterns.some(pattern => pattern.test(allText));
}

// Función para detectar si el usuario es Mariano
function isMariano(messages: Message[]): boolean {
  const allText = messages
    .filter(m => m.role === 'user')
    .map(m => m.content.toLowerCase())
    .join(' ');
  
  // Detectar variaciones del nombre
  const patterns = [
    /mariano\s+fernandez/i,
    /mariano\s+fern[aá]ndez/i,
    /soy\s+mariano/i,
    /soy\s+marian\b/i,
    /me\s+llamo\s+mariano/i,
    /me\s+llamo\s+marian\b/i,
    /mi\s+nombre\s+es\s+mariano/i,
    /mi\s+nombre\s+es\s+marian\b/i,
    /\bmarian\b/i,
    /\bmariano\b/i
  ];
  
  return patterns.some(pattern => pattern.test(allText));
}

const getSystemPrompt = (messageCount: number, language: string = 'es', isCande: boolean = false, isMarian: boolean = false) => {
  // Si es Candelaria, usar el prompt del profesor de catalán
  if (isCande) {
    return CATALAN_TEACHER_PROMPT;
  }
  
  // Si es Mariano, usar el prompt del profesor de Next.js
  if (isMarian) {
    return NEXTJS_TEACHER_PROMPT;
  }
  
  const languageInstruction = LANGUAGE_INSTRUCTIONS[language as keyof typeof LANGUAGE_INSTRUCTIONS] || LANGUAGE_INSTRUCTIONS.es;
  
  if (messageCount >= 5) {
    return `${languageInstruction}

${SYSTEM_PROMPT_BASE}

🚨 INSTRUCCIÓN CRÍTICA - MENSAJE #${messageCount}:
Ya has conversado suficiente con el cliente. Es momento de CERRAR la conversación:

1. Resume brevemente lo que entendiste que necesita (1-2 líneas)
2. Dile que Guido se pondrá en contacto personalmente
3. Pídele SU EMAIL o WHATSAPP para que Guido lo contacte
4. Usa un tono amigable pero directo, sin dar más vueltas

Ejemplo: "Perfecto, entiendo que necesitas una landing page económica. Guido se va a poner en contacto contigo personalmente para coordinar los detalles. ¿Me pasas tu email o WhatsApp para que te contacte?"`;
  }
  
  if (messageCount >= 3) {
    return `${languageInstruction}

${SYSTEM_PROMPT_BASE}

⚠️ IMPORTANTE: Ya estás en el mensaje #${messageCount}. Si el cliente ya mostró interés claro en un proyecto:
- Menciona el precio correspondiente
- Prepárate para cerrar en los próximos 1-2 mensajes
- Si detectas que está listo, pídele sus datos de contacto directamente`;
  }
  
  return `${languageInstruction}

${SYSTEM_PROMPT_BASE}`;
};

async function analyzeConversationAndSendEmail(messages: Message[]) {
  try {
    // Analizar la conversación para extraer insights
    const analysisPrompt = `Analiza esta conversación con un cliente potencial y extrae la siguiente información en formato JSON estricto (sin markdown, solo JSON puro):
{
  "clientInterest": "descripción concisa del interés del cliente",
  "projectType": "tipo de proyecto identificado (landing page, corporativo, ecommerce, custom, o indefinido)",
  "budget": "presupuesto mencionado o estimado",
  "timeline": "timeline si fue mencionado",
  "contactInfo": "email, whatsapp o datos de contacto si fueron compartidos (IMPORTANTE: extraer si están en el chat)",
  "readinessLevel": "alto/medio/bajo - qué tan listo está para contratar",
  "keyPoints": ["punto clave 1", "punto clave 2"],
  "recommendedAction": "acción recomendada para el seguimiento",
  "clientProvidedContact": true/false
}

Conversación:
${messages.map(m => `${m.role}: ${m.content}`).join('\n')}`;

    const result = await model.generateContent(analysisPrompt);
    const response = result.response;
    const text = response.text();

    let analysisResult;
    try {
      // Limpiar posibles caracteres de markdown
      const cleanContent = text.replace(/```json\n?|```\n?/g, '').trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (e) {
      console.error('Error parsing analysis:', e);
      analysisResult = {};
    }

    // Enviar email con el resumen al administrador usando nodemailer directamente
    try {
      console.log('🔧 Configurando transporter...');
      console.log('📧 Email destino:', process.env.ADMIN_EMAIL);
      console.log('📤 Email origen:', process.env.SMTP_USER);
      console.log('🔑 SMTP_HOST:', process.env.SMTP_HOST);
      console.log('🔑 SMTP_PORT:', process.env.SMTP_PORT);
      console.log('🔑 SMTP_USER exists:', !!process.env.SMTP_USER);
      console.log('🔑 SMTP_PASS exists:', !!process.env.SMTP_PASS);
      
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('❌ Variables de entorno SMTP no configuradas correctamente');
      }
      
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: {
          rejectUnauthorized: false
        },
        debug: true, // Habilitar debug de SMTP
        logger: true // Habilitar logging detallado
      });

      // Verificar la conexión SMTP
      console.log('🔍 Verificando conexión SMTP...');
      await transporter.verify();
      console.log('✅ Conexión SMTP verificada exitosamente');

      const mailOptions = {
        from: `"Asistente IA - GuidoDev" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_EMAIL || 'guido.llaurado@gmail.com',
        replyTo: process.env.SMTP_USER, // Reply-to para que puedas responder
        subject: `🤖 ¡NUEVO LEAD del Asistente IA! - ${analysisResult.projectType || 'Proyecto'}`,
        text: `
🤖 ¡NUEVO LEAD DEL ASISTENTE IA!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 RESUMEN DEL CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ Interés del Cliente:
${analysisResult.clientInterest || 'No identificado'}

🎯 Tipo de Proyecto:
${analysisResult.projectType || 'Indefinido'}

💰 Presupuesto:
${analysisResult.budget || 'No mencionado'}

⏰ Timeline:
${analysisResult.timeline || 'No especificado'}

📱 DATOS DE CONTACTO:
${analysisResult.contactInfo || '⚠️ NO PROPORCIONÓ CONTACTO'}
${analysisResult.clientProvidedContact ? '✅ Cliente proporcionó sus datos' : '❌ Cliente NO dejó datos de contacto'}

🔥 Nivel de Preparación:
${analysisResult.readinessLevel || 'No determinado'}

📝 Puntos Clave:
${analysisResult.keyPoints?.map((p: string, i: number) => `${i + 1}. ${p}`).join('\n') || 'Ninguno'}

💡 Acción Recomendada:
${analysisResult.recommendedAction || 'Seguimiento general'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📜 TRANSCRIPCIÓN COMPLETA DE LA CONVERSACIÓN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${messages
  .filter(m => m.role !== 'system')
  .map(m => `\n${m.role === 'user' ? '👤 Cliente' : '🤖 Asistente'}: ${m.content}`)
  .join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕐 Fecha: ${new Date().toLocaleString('es-ES')}
💻 Generado automáticamente por el Asistente IA
        `.trim(),
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 24px; }
    .section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #667eea; }
    .section h2 { margin-top: 0; color: #667eea; font-size: 18px; }
    .info-row { display: flex; margin: 10px 0; padding: 10px; background: white; border-radius: 5px; }
    .info-label { font-weight: bold; min-width: 150px; color: #555; }
    .info-value { color: #333; }
    .contact-highlight { background: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin: 15px 0; }
    .contact-yes { background: #d4edda; border-color: #28a745; }
    .contact-no { background: #f8d7da; border-color: #dc3545; }
    .transcript { background: white; padding: 20px; border-radius: 8px; margin-top: 20px; }
    .message { padding: 15px; margin: 10px 0; border-radius: 8px; }
    .user-message { background: #e3f2fd; border-left: 4px solid #2196f3; }
    .assistant-message { background: #f3e5f5; border-left: 4px solid #9c27b0; }
    .footer { text-align: center; color: #888; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
  </style>
</head>
<body>
  <div class="header">
    <h1>🤖 ¡NUEVO LEAD DEL ASISTENTE IA!</h1>
    <p style="margin: 5px 0 0 0; opacity: 0.9;">Un cliente potencial ha interactuado con el asistente</p>
  </div>

  <div class="section">
    <h2>📊 Resumen del Cliente</h2>
    <div class="info-row">
      <div class="info-label">✅ Interés:</div>
      <div class="info-value">${analysisResult.clientInterest || 'No identificado'}</div>
    </div>
    <div class="info-row">
      <div class="info-label">🎯 Tipo de Proyecto:</div>
      <div class="info-value"><strong>${analysisResult.projectType || 'Indefinido'}</strong></div>
    </div>
    <div class="info-row">
      <div class="info-label">💰 Presupuesto:</div>
      <div class="info-value">${analysisResult.budget || 'No mencionado'}</div>
    </div>
    <div class="info-row">
      <div class="info-label">⏰ Timeline:</div>
      <div class="info-value">${analysisResult.timeline || 'No especificado'}</div>
    </div>
    <div class="info-row">
      <div class="info-label">🔥 Preparación:</div>
      <div class="info-value">${analysisResult.readinessLevel || 'No determinado'}</div>
    </div>
  </div>

  <div class="contact-highlight ${analysisResult.clientProvidedContact ? 'contact-yes' : 'contact-no'}">
    <h2 style="margin-top: 0;">📱 Datos de Contacto</h2>
    <p style="font-size: 16px; margin: 10px 0;"><strong>${analysisResult.contactInfo || '⚠️ NO PROPORCIONÓ CONTACTO'}</strong></p>
    <p style="margin: 5px 0;">${analysisResult.clientProvidedContact ? '✅ Cliente proporcionó sus datos' : '❌ Cliente NO dejó datos de contacto'}</p>
  </div>

  ${analysisResult.keyPoints && analysisResult.keyPoints.length > 0 ? `
  <div class="section">
    <h2>📝 Puntos Clave</h2>
    <ul>
      ${analysisResult.keyPoints.map((p: string) => `<li>${p}</li>`).join('')}
    </ul>
  </div>
  ` : ''}

  <div class="section">
    <h2>💡 Acción Recomendada</h2>
    <p>${analysisResult.recommendedAction || 'Seguimiento general'}</p>
  </div>

  <div class="transcript">
    <h2 style="color: #667eea;">📜 Transcripción Completa</h2>
    ${messages
      .filter(m => m.role !== 'system')
      .map(m => `
        <div class="message ${m.role === 'user' ? 'user-message' : 'assistant-message'}">
          <strong>${m.role === 'user' ? '👤 Cliente' : '🤖 Asistente'}:</strong>
          <p style="margin: 5px 0 0 0;">${m.content.replace(/\n/g, '<br>')}</p>
        </div>
      `).join('')}
  </div>

  <div class="footer">
    <p>🕐 ${new Date().toLocaleString('es-ES')}</p>
    <p>💻 Generado automáticamente por el Asistente IA</p>
  </div>
</body>
</html>
        `.trim(),
      };

      console.log('📤 Enviando email...');
      console.log('📧 Destinatario final:', process.env.ADMIN_EMAIL);
      const info = await transporter.sendMail(mailOptions);
      console.log('✅ Email enviado correctamente');
      console.log('📬 Message ID:', info.messageId);
      console.log('📨 Response:', info.response);
      console.log('📮 Accepted:', info.accepted);
      console.log('🚫 Rejected:', info.rejected);
      
      return { success: true, messageId: info.messageId };
    } catch (emailError) {
      console.error('❌ ERROR CRÍTICO enviando email:', emailError);
      if (emailError instanceof Error) {
        console.error('❌ Error message:', emailError.message);
        console.error('❌ Error name:', emailError.name);
        console.error('❌ Error stack:', emailError.stack);
      }
      // No lanzar el error, solo loguear para que no interrumpa el flujo
      return { success: false, error: emailError };
    }

    return analysisResult;
  } catch (error) {
    console.error('❌ ERROR CRÍTICO en análisis de conversación:', error);
    if (error instanceof Error) {
      console.error('❌ Error completo:', {
        message: error.message,
        name: error.name,
        stack: error.stack
      });
    }
    return null;
  }
}

// Función para detectar si el último mensaje contiene datos de contacto
function detectContactInfo(lastUserMessage: string): boolean {
  const message = lastUserMessage.toLowerCase();
  
  // Detectar emails (regex simple)
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  if (emailRegex.test(message)) {
    console.log('✅ Email detectado en el mensaje');
    return true;
  }
  
  // Detectar WhatsApp/teléfono con palabras clave y números
  const hasPhoneKeyword = /whatsapp|whats|telefono|tel[eé]fono|celular|m[oó]vil|contacto|llamar|llamame|ll[áa]mame/i.test(message);
  const hasPhoneNumber = /(\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}/.test(message);
  
  if (hasPhoneKeyword && hasPhoneNumber) {
    console.log('✅ WhatsApp/Teléfono detectado en el mensaje');
    return true;
  }
  
  // Detectar solo números de teléfono largos (8+ dígitos)
  const longPhoneRegex = /\d{8,}/;
  if (longPhoneRegex.test(message.replace(/[-.\s]/g, ''))) {
    console.log('✅ Número de teléfono detectado en el mensaje');
    return true;
  }
  
  return false;
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 ===== INICIO DE REQUEST =====');
    console.log('🔑 API Key presente:', !!process.env.GOOGLE_AI_API_KEY);
    console.log('🔑 Primeros 10 chars de API Key:', process.env.GOOGLE_AI_API_KEY?.substring(0, 10));
    
    const body: RequestBody = await request.json();
    const { messages, messageCount, language = 'es' } = body;

    console.log(`📨 Mensaje #${messageCount} del cliente (Idioma: ${language})`);
    console.log('📊 Total mensajes recibidos:', messages.length);

    // Detectar si es Candelaria o Mariano
    const isCande = isCandelaria(messages);
    const isMarian = isMariano(messages);
    console.log('👤 ¿Es Candelaria?:', isCande);
    console.log('👤 ¿Es Mariano?:', isMarian);

    // Si es Candelaria, NO enviar emails ni cerrar conversación
    if (isCande) {
      console.log('🎓 Modo profesor de catalán activado para Cande');
    }
    
    // Si es Mariano, NO enviar emails ni cerrar conversación
    if (isMarian) {
      console.log('💻 Modo profesor de Next.js activado para Mariano');
    }

    // Obtener el último mensaje del usuario
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || '';
    
    // Detectar si proporcionó datos de contacto
    const hasContactInfo = detectContactInfo(lastUserMessage);
    
    // Enviar email si:
    // 1. NO es Candelaria Y NO es Mariano Y
    // 2. (Detectamos datos de contacto O llegamos a 6 mensajes)
    const shouldSendEmail = !isCande && !isMarian && (hasContactInfo || messageCount >= 6);
    
    // Si necesitamos enviar email, hacerlo ANTES de generar la respuesta
    // Esto asegura que en Vercel serverless el email se envíe completamente
    if (shouldSendEmail) {
      const reason = hasContactInfo ? '📱 Cliente proporcionó datos de contacto' : '📊 Límite de 6 mensajes alcanzado';
      console.log(`📧 ENVIANDO EMAIL AHORA (antes de respuesta)... (${reason})`);
      console.log('📝 Total de mensajes:', messages.length);
      
      try {
        const emailResult = await analyzeConversationAndSendEmail(messages);
        console.log('✅✅✅ Email procesado:', JSON.stringify(emailResult, null, 2));
      } catch (emailError) {
        console.error('❌❌❌ Error en email (continuando de todas formas):', emailError);
      }
    }

    console.log('🤖 Preparando chat con Gemini...');
    console.log('📝 Modelo configurado:', 'gemini-pro');
    
    // Preparar el historial de mensajes para Gemini
    const chatHistory = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    console.log('📚 Historial preparado:', chatHistory.length, 'mensajes');

    // Obtener el último mensaje del usuario
    const lastMessage = messages[messages.length - 1].content;
    console.log('💬 Último mensaje del usuario:', lastMessage.substring(0, 50) + '...');

    try {
      console.log('🔧 Creando sesión de chat...');
      // Crear sesión de chat con historial y system prompt
      const chat = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: getSystemPrompt(messageCount, language, isCande, isMarian) }],
          },
          {
            role: 'model',
            parts: [{ text: isCande 
              ? 'Hola Cande! Estic aquí per ajudar-te a practicar català. De què vols parlar avui?' 
              : isMarian 
                ? '¡Hola Mariano! Soy tu profesor de Next.js. Estoy aquí para ayudarte con cualquier pregunta sobre desarrollo web. ¿En qué puedo ayudarte hoy?'
                : 'Entendido. Actuaré como el asistente virtual de Guido siguiendo estas instrucciones.' }],
          },
          ...chatHistory,
        ],
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 500,
        },
      });

      console.log('✅ Sesión de chat creada exitosamente');
      console.log('📤 Enviando mensaje a Gemini...');

      // Generar respuesta con streaming
      const result = await chat.sendMessageStream(lastMessage);
      console.log('✅ Respuesta recibida de Gemini, iniciando streaming...');

      // Crear un ReadableStream para enviar la respuesta en chunks
      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            console.log('🌊 Iniciando stream...');
            for await (const chunk of result.stream) {
              const text = chunk.text();
              if (text) {
                console.log('📦 Chunk recibido:', text.substring(0, 30) + '...');
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
              }
            }
            console.log('✅ Stream completado');
            controller.enqueue(encoder.encode('data: [DONE]\n\n'));
            controller.close();
          } catch (streamError) {
            console.error('❌ ERROR EN STREAMING:', streamError);
            if (streamError instanceof Error) {
              console.error('❌ Error name:', streamError.name);
              console.error('❌ Error message:', streamError.message);
              console.error('❌ Error stack:', streamError.stack);
            }
            controller.error(streamError);
          }
        },
      });

      return new Response(readableStream, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } catch (geminiError) {
      console.error('❌❌❌ ERROR AL LLAMAR A GEMINI:', geminiError);
      if (geminiError instanceof Error) {
        console.error('❌ Error type:', geminiError.constructor.name);
        console.error('❌ Error name:', geminiError.name);
        console.error('❌ Error message:', geminiError.message);
        console.error('❌ Error stack:', geminiError.stack);
        console.error('❌ Error completo:', JSON.stringify(geminiError, Object.getOwnPropertyNames(geminiError), 2));
      }
      throw geminiError;
    }
  } catch (error) {
    console.error('❌❌❌ ERROR GENERAL EN POST:', error);
    if (error instanceof Error) {
      console.error('❌ Error type:', error.constructor.name);
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      console.error('❌ Error stack:', error.stack);
      console.error('❌ Error props:', Object.keys(error));
      
      // Intentar extraer información adicional del error de Google
      const errorObj = error as any;
      if (errorObj.status) console.error('❌ HTTP Status:', errorObj.status);
      if (errorObj.statusText) console.error('❌ Status Text:', errorObj.statusText);
      if (errorObj.errorDetails) console.error('❌ Error Details:', errorObj.errorDetails);
      if (errorObj.response) console.error('❌ Response:', errorObj.response);
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Error processing your request',
        details: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
