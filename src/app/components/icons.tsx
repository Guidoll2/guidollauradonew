import Image from "next/image";
import Link from "next/link";

interface IconsProps {
  language: string;
}

export default function Icons({ language }: IconsProps) {
  const items = [
    {
      src: "/diseño.png",
      label: language === "EN" ? "Design" : "Diseño",
    },
    {
      src: "/tool.png",
      label: language === "EN" ? "Development" : "Desarrollo",
    },
    {
      src: "/SEO.png",
      label: language === "EN" ? "SEO Optimization" : "Optimización SEO",
    },
    {
      src: "/nube.png",
      label: language === "EN" ? "Hosting & Domain" : "Hosting y dominio",
    },
  ];

  return (
    <section className="w-full py-12 px-4 bg-gradient-to-tl from-blue-50 to-blue-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {items.map(({ src, label }) => (
          <div
            key={label}
            className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src={src}
              alt={label}
              width={64}
              height={64}
              className="mb-4"
            />
            <h2 className="text-sm md:text-lg font-medium text-gray-800">
              {label}
            </h2>
          </div>
        ))}

        <div className="col-span-1 md:col-span-1 flex flex-col items-center p-6 bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl shadow-lg">
          <p className="text-center font-semibold text-gray-800 text-base md:text-xl mb-4">
            {language === "EN" ? "Book an Appointment!" : "¡Reserva una cita!"}
          </p>
          <Link
            href="https://calendly.com/guido-llaurado/appointment-for-landinpage"
            target="_blank"
          >
            <button className="px-4 py-2 text-sm md:text-lg font-semibold bg-white rounded-lg shadow hover:bg-gray-100 transition-colors duration-200">
              {language === "EN" ? "Schedule Now" : "Agenda Ahora"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
