'use client';


// app/page.tsx (o donde quieras tu página de bienvenida personal)
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Link from 'next/link';

export default function HomePage() {
  const currentDate = new Date().toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('es-AR', {
    hour: '2-digit', minute: '2-digit'
  });

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