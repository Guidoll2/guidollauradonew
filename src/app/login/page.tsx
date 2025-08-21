'use client';

import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function HomePage() {
  const [isEnablingDefaultSlots, setIsEnablingDefaultSlots] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmail, setTestEmail] = useState('');

  const currentDate = new Date().toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('es-AR', {
    hour: '2-digit', minute: '2-digit'
  });

  const handleEnableDefaultSlots = async () => {
    setIsEnablingDefaultSlots(true);
    const loadingToast = toast.loading('Habilitando horarios por defecto...');
    
    try {
      const response = await fetch('/api/appointments/enable-default', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ monthsAhead: 3 })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`¡Éxito! ${data.message}`, { id: loadingToast });
      } else {
        toast.error(`Error: ${data.error}`, { id: loadingToast });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error de conexión', { id: loadingToast });
    } finally {
      setIsEnablingDefaultSlots(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmail) {
      toast.error('Por favor ingresa un email para la prueba');
      return;
    }
    
    setIsTestingEmail(true);
    const loadingToast = toast.loading('Enviando email de prueba...');
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testEmail })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast.success(`✅ ${data.message}`, { id: loadingToast });
        setTestEmail('');
      } else {
        toast.error(`❌ ${data.error}${data.details ? ': ' + data.details : ''}`, { 
          id: loadingToast,
          duration: 8000 
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('❌ Error de conexión al probar email', { id: loadingToast });
    } finally {
      setIsTestingEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tl from-blue-200 to-orange-200 text-white flex flex-col items-center justify-center p-8">
      {/* Encabezado Personalizado */}
      <header className="text-center mb-12">
        <h1 className="text-6xl font-extrabold mb-4 animate-fade-in-down text-gray-800">
          ¡Bienvenido de nuevo, Guidoti!
        </h1>
        <p className="text-2xl text-blue-950 animate-fade-in-up">
          Tu portal personal al universo de tus proyectos.
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Hoy es <span className="font-semibold">{currentDate}</span> y son las <span className="font-semibold">{currentTime}</span>.
        </p>
      </header>

      {/* Sección de Autenticación de Clerk */}
      <section className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-10 max-w-md w-full border border-orange-500 animate-scale-in">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Gestión de Acceso Privado</h2>

        <SignedIn>
          {/* Contenido si el usuario está logueado */}
          <div className="text-center">
            <p className="text-xl text-green-800 mb-4">
              ¡Has iniciado sesión correctamente!
            </p>
            <div className="flex justify-center items-center gap-4 mb-6">
              <UserButton afterSignOutUrl="/" /> {/* Botón para gestionar el perfil y cerrar sesión */}
              <span className="text-lg text-gray-900">Administra tu cuenta.</span>
            </div>
            <SignOutButton></SignOutButton>
            <p className="text-lg text-blue-800">
              Ahora puedes acceder a tus áreas privadas.
            </p>
            {/* Aquí puedes añadir enlaces a tus paneles de administración, etc. */}
            <Link href="/" className="mt-6 inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              Ir a mi Panel de Control
            </Link>
            
            {/* Botón para habilitar horarios por defecto */}
            <button
              onClick={handleEnableDefaultSlots}
              disabled={isEnablingDefaultSlots}
              className="mt-4 w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {isEnablingDefaultSlots ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Habilitando...
                </span>
              ) : (
                'Habilitar Horarios por Defecto (Mar/Jue 10-13h)'
              )}
            </button>
            
            {/* Sección para probar emails */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Probar Configuración de Email</h3>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Ingresa email para prueba"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                />
                <button
                  onClick={handleTestEmail}
                  disabled={isTestingEmail || !testEmail}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
                >
                  {isTestingEmail ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    '📧 Enviar Email de Prueba'
                  )}
                </button>
              </div>
            </div>
          </div>
        </SignedIn>

        <SignedOut>
          {/* Contenido si el usuario NO está logueado */}
          <div className="text-center">
            <p className="text-xl text-yellow-700 mb-6">
              Inicia sesión o regístrate para acceder a tus herramientas.
            </p>
            <div className="flex flex-col gap-4">
              <SignInButton mode="modal">
                <button className="w-full bg-blue-400 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Iniciar Sesión
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Registrarme (Solo si es la primera vez)
                </button>
              </SignUpButton>
            </div>
            <p className="text-sm text-gray-300 mt-4">
              Recuerda, esta área es solo para ti.
            </p>
          </div>
        </SignedOut>
      </section>

      {/* Estilos para animaciones (puedes moverlos a un archivo CSS global si prefieres) */}
      <style jsx>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-down { animation: fade-in-down 1s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; animation-delay: 0.5s; }
        .animate-scale-in { animation: scale-in 0.8s ease-out forwards; animation-delay: 0.8s; }
      `}</style>
    </div>
  );
}