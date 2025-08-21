// components/Icons.tsx
'use client'; // Asegúrate de que esto esté al principio si usas App Router y el componente es interactivo

import { useState } from "react";

// import Link from "next/link"; // ¡Eliminamos este import!
import { useMediaQuery } from "./useMediaQuery";

interface IconsProps {
  language: string;
  onBookAppointment: () => void; // Nuevo prop: una función para manejar el clic en la reserva
}

export default function Icons({ language, onBookAppointment }: IconsProps) {
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      src: "/diseño.png",
      label: language === "en" ? "Design" : "Diseño",
      description: language === "en"
        ? "Creating appealing and user-friendly interfaces."
        : "Creación de interfaces atractivas y fáciles de usar.",
    },
    {
      src: "/tool.png",
      label: language === "en" ? "Development" : "Desarrollo",
      description: language === "en"
        ? "Building robust and scalable functionality."
        : "Implementación de funcionalidades robustas y escalables.",
    },
    {
      src: "/SEO.png",
      label: language === "en" ? "SEO Optimization" : "Optimización SEO",
      description: language === "en"
        ? "Improving search engine visibility through content and technical optimization."
        : "Mejora de la visibilidad en buscadores mediante optimización técnica y de contenido.",
    },
    {
      src: "/nube.png",
      label: language === "en" ? "Hosting & Domain" : "Hosting y dominio",
      description: language === "en"
        ? "Secure hosting and domain configuration for your web project."
        : "Configuración segura de hosting y dominio para tu proyecto web.",
    },
  ];

  const bookingLabel =
    language === "en" ? "Book an Appointment!" : "¡Reserva una cita!";
  const bookingButton = language === "en" ? "Schedule Now" : "Agenda Ahora";

  const colorA = "from-orange-100 to-orange-200";
  const colorB = "from-gray-100 to-gray-200";

  const handleClick = (index: number) =>
    setOpenIndex(openIndex === index ? null : index);

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-tl from-blue-50 to-blue-100">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">
          {language === "en"
            ? "I take care of everything for you"
            : "Me encargo de todo por vos"}
        </h2>
        <p className="text-lg text-gray-700">
          {language === "en"
            ? "From design to launch, I handle every aspect of your website so you can focus on your business. No technical worries, just results."
            : "Desde el diseño hasta la publicación, me ocupo de cada detalle de tu web para que no tengas que preocuparte por nada técnico. Solo resultados."}
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          const colorClass = i % 2 === 0 ? colorA : colorB;
          return (
            <div
              key={item.label}
              onClick={() => handleClick(i)}
              className={`relative flex flex-col items-center p-4 rounded-2xl shadow-lg cursor-pointer bg-gradient-to-br ${colorClass} transition-all duration-300`}
            >
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-white text-gray-800 text-xs flex items-center justify-center shadow-sm">
                {isOpen ? "-" : "+"}
              </div>

              <img
                src={item.src}
                alt={item.label}
                width={64}
                height={64}
                className="mb-2"
              />
              <h2 className="text-sm md:text-lg font-semibold text-gray-700">
                {item.label}
              </h2>

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-xs text-gray-700 text-center px-2">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}

        {/* Cita - Modificado para mostrar el calendario */}
        <div className="col-span-1 md:col-span-1 flex flex-col items-center p-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl shadow-lg">
          <p className="text-center font-semibold text-gray-800 text-base md:text-xl mb-4">
            {bookingLabel}
          </p>
          {/* El botón ahora llama a la función pasada por prop */}
          <button
            onClick={onBookAppointment} // ¡Aquí está el cambio clave!
            className="px-4 py-2 text-sm md:text-lg font-semibold bg-white rounded-lg shadow hover:bg-gray-100 transition"
          >
            {bookingButton}
          </button>
        </div>
      </div>
    </section>
  );
}