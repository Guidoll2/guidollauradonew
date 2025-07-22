// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'; // Iconos para redes sociales

interface FooterProps {
  language: 'en' | 'es';
}

const Footer: React.FC<FooterProps> = ({ language }) => {
  const currentYear = new Date().getFullYear();

  const footerText = {
    en: {
      rights: `© ${currentYear} Guido Llaurado. All rights reserved.`,
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact Me',
      follow: 'Follow me on:',
      emailSubject: 'Inquiry from your website',
      designedBy: 'Designed and Developed by Me!', // Puedes personalizar esto
    },
    es: {
      rights: `© ${currentYear} Guido Llaurado. Todos los derechos reservados.`,
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      contact: 'Contáctame',
      follow: 'Sígueme en:',
      emailSubject: 'Consulta desde tu sitio web',
      designedBy: 'Diseñado y Desarrollado por Mi!'
    },
  };

const text = footerText[language] || footerText['en'];

  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Columna 1: Derechos de autor y branding */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link href="/" className="text-2xl font-bold text-white mb-4 hover:text-orange-300 transition-colors duration-300">
            {language === "en" ? "Guido Ll" : "Guido Ll"} {/* Reemplaza con tu logo o nombre */}
          </Link>
          <p className="text-sm">
            {text.rights}
          </p>
          <p className="text-xs mt-2">
            {text.designedBy}
          </p>
        </div>

        {/* Columna 2: Enlaces de navegación */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-4">
            {language === "en" ? "Quick Links" : "Enlaces Rápidos"}
          </h4>
          <ul className="space-y-2">
            <li>
              <Link href="#about" className="hover:text-blue-400 transition-colors duration-300">
                {language === "en" ? "About Me" : "Sobre Mí"}
              </Link>
            </li>
            <li>
              <Link href="#services" className="hover:text-blue-400 transition-colors duration-300">
                {language === "en" ? "Services" : "Servicios"}
              </Link>
            </li>
            <li>
              <Link href="#portfolio" className="hover:text-blue-400 transition-colors duration-300">
                {language === "en" ? "Work" : "Trabajo"}
              </Link>
            </li>
            <li>
              <Link href="#contact" className="hover:text-blue-400 transition-colors duration-300">
                {language === "en" ? "Contact" : "Contacto"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto y Redes Sociales */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h4 className="text-lg font-semibold text-white mb-4">
            {text.contact}
          </h4>
          <p className="mb-4">
            {language === "en" ? "Ready to start your project?" : "¿Listo para iniciar tu proyecto?"} <br />
            {language === "en" ? "Let's connect!" : "¡Conectemos!"}
          </p>
          <a
            href={`mailto:guido.llaurado@gmail.com?subject=${encodeURIComponent(text.emailSubject)}`} // Reemplaza con tu email
            className="inline-flex items-center bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-orange-500 transition-colors duration-300 shadow-md"
          >
            <FaEnvelope className="mr-2" /> guido.llaurado@gmail.com {/* Reemplaza con tu email */}
          </a>

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-white mb-4">
              {text.follow}
            </h4>
            <div className="flex space-x-6">
              <a href="https://www.linkedin.com/in/guido-llaurado-381316118/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                <FaLinkedin size={28} />
              </a>
              <a href="https://github.com/Guidoll2" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-400 transition-colors duration-300">
                <FaGithub size={28} />
              </a>
              {/* Puedes añadir más iconos de redes sociales aquí */}
            </div>
          </div>
        </div>
      </div>
      
      {/* Línea divisoria y texto de políticas (opcional) */}
      <div className="border-t border-gray-700 mt-10 pt-8 text-center text-sm">
        <ul className="flex justify-center space-x-4 mb-2">
          <li>
            <Link href="/privacy-policy" className="hover:text-blue-400 transition-colors duration-300">
              {text.privacy}
            </Link>
          </li>
          <li>|</li>
          <li>
            <Link href="/terms-of-service" className="hover:text-blue-400 transition-colors duration-300">
              {text.terms}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;