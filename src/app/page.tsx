"use client";

import Flechaup from "./components/flechaup";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaShoppingCart, FaUserShield, FaPlug, FaRocket, FaLock, FaHandsHelping } from "react-icons/fa";
import Icons from "./components/icons";
import { FaHome, FaMobileAlt, FaGlobe, FaImages, FaShieldAlt, FaEnvelopeOpenText } from "react-icons/fa";
// ...existing code...

export default function Home() {
  const [hover, setHover] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isOpen, setIsOpen] = useState(false);

   const exampleSrc = `/api/screenshot?url=${encodeURIComponent(
    "https://www.emplearg.com"
  )}`;


 const title = language === "EN" ? "Premium Websites" : "Sitios Premium";
  const subtitle =
    language === "EN"
      ? "Transform your online presence with tailor-made solutions designed to grow your business and captivate your audience."
      : "Transforma tu presencia en línea con soluciones a medida diseñadas para impulsar tu negocio y cautivar a tu audiencia.";
  const startingPrice =
    language === "EN"
      ? "Prices starting at $700 USD"
      : "Precios desde 700 USD";

       const startingPrice2 =
    language === "EN"
      ? "Prices starting at $300 USD"
      : "Precios desde 300 USD";

  const services = [
  {
    key: "ecom",
    title: language === "EN" ? "Custom E-commerce" : "Comercio Electrónico",
    descEN: "Secure, scalable online stores with payment gateway integration and inventory management.",
    descES: "Tiendas online seguras y escalables con pasarelas de pago y gestión de inventario.",
    icon: <FaShoppingCart className="text-3xl text-orange-500 mb-4" />,
  },
  {
    key: "portal",
    title: language === "EN" ? "User & Admin Portals" : "Portales de Usuario y Admin",
    descEN: "Custom dashboards for clients or team members to manage content, data, and reports.",
    descES: "Dashboards personalizados para clientes o equipo, con gestión de contenido, datos e informes.",
    icon: <FaUserShield className="text-3xl text-blue-500 mb-4" />,
  },
  {
    key: "api",
    title: language === "EN" ? "API & Third-Party Integrations" : "Integraciones API y Terceros",
    descEN: "Connect your site to CRMs, marketing tools, or any external services for seamless workflows.",
    descES: "Conecta tu sitio a CRMs, herramientas de marketing o servicios externos para flujos de trabajo integrados.",
    icon: <FaPlug className="text-3xl text-green-500 mb-4" />,
  },
  {
    key: "perf",
    title: language === "EN" ? "Performance Optimization" : "Optimización de Rendimiento",
    descEN: "Fast load times, code splitting and caching strategies to keep users engaged.",
    descES: "Velocidad de carga, code splitting y caching para mantener a tus usuarios comprometidos.",
    icon: <FaRocket className="text-3xl text-pink-500 mb-4" />,
  },
  {
    key: "seo",
    title: language === "EN" ? "SEO & Security" : "SEO y Seguridad",
    descEN: "On-page SEO, metadata setup and SSL encryption for higher rankings and trust.",
    descES: "SEO on-page, configuración de metadatos y cifrado SSL para mejor posicionamiento y confianza.",
    icon: <FaLock className="text-3xl text-yellow-500 mb-4" />,
  },
  {
    key: "support",
    title: language === "EN" ? "Ongoing Support" : "Soporte Continuo",
    descEN: "Maintenance plans, updates and performance monitoring to keep your site running smoothly.",
    descES: "Planes de mantenimiento, actualizaciones y monitoreo para que tu sitio siempre funcione a la perfección.",
    icon: <FaHandsHelping className="text-3xl text-purple-500 mb-4" />,
  },
];
const basicServices = [
  {
    key: "home",
    title: language === "EN" ? "Home + 3 Sections" : "Página Principal + 3 Secciones",
    descEN: "Engaging homepage with up to 3 custom content sections (About, Services, Contact, etc.).",
    descES: "Página de inicio atractiva con hasta 3 secciones personalizadas (Quién soy, Servicios, Contacto, etc.).",
    icon: <FaHome className="text-3xl text-blue-500 mb-4" />,
  },
  {
    key: "responsive",
    title: language === "EN" ? "Responsive Design" : "Diseño Responsivo",
    descEN: "Automatically adapts to all device sizes for a flawless user experience.",
    descES: "Se adapta automáticamente a todas las pantallas para una experiencia perfecta.",
    icon: <FaMobileAlt className="text-3xl text-orange-500 mb-4" />,
  },
  {
    key: "hosting",
    title: language === "EN" ? "Hosting & Domain" : "Hosting y Dominio",
    descEN: "Secure hosting and a custom domain included so you can get online immediately.",
    descES: "Hosting seguro y dominio personalizado incluidos para que estés en línea de inmediato.",
    icon: <FaGlobe className="text-3xl text-green-500 mb-4" />,
  },
  {
    key: "media",
    title: language === "EN" ? "Media Showcase" : "Exhibición de Medios",
    descEN: "Effortlessly display images, videos and galleries in a sleek, organized layout.",
    descES: "Muestra imágenes, videos y galerías de forma elegante y organizada.",
    icon: <FaImages className="text-3xl text-pink-500 mb-4" />,
  },
  {
    key: "seo",
    title: language === "EN" ? "Basic SEO & SSL" : "SEO Básico y SSL",
    descEN: "On‑page SEO setup and SSL security to help your site rank and build trust.",
    descES: "Configuración SEO básica y seguridad SSL para mejorar tu posicionamiento y confianza.",
    icon: <FaShieldAlt className="text-3xl text-yellow-500 mb-4" />,
  },
  {
    key: "contact",
    title: language === "EN" ? "Contact Form Integration" : "Integración de Formulario",
    descEN: "Easy-to-use contact form with spam protection so you never miss a lead.",
    descES: "Formulario de contacto fácil de usar con protección anti-spam para no perder ningún cliente potencial.",
    icon: <FaEnvelopeOpenText className="text-3xl text-purple-500 mb-4" />,
  },
];
  useEffect(() => {
    const savedLanguage = Cookies.get("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update cookie when language changes
  const handleLanguageChange = () => {
    const newLanguage = language === "ES" ? "EN" : "ES";
    setLanguage(newLanguage);
    Cookies.set("language", newLanguage, { expires: 365 }); // Guardar por 1 año
  };

  const divRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const [isVisible, setIsVisible] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      const newVisibility = divRefs.map((ref) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        return rect.top <= windowHeight * 1 && rect.bottom >= 0;
      });
      setIsVisible(newVisibility);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    animationFrameId = requestAnimationFrame(handleScroll); // Check initial visibility

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const iconsRef = useRef<HTMLDivElement>(null);
  const [isIconsVisible, setIsIconsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIconsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (iconsRef.current) {
      observer.observe(iconsRef.current);
    }

    return () => {
      if (iconsRef.current) {
        observer.unobserve(iconsRef.current);
      }
    };
  }, []);

  

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow bg-gradient-to-b from-orange-100 to-pink-100 z-10">
        <Flechaup />

        <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-300 bg-opacity-95 backdrop-blur-sm shadow-md z-50">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
            <a href="#" className="text-white text-xl font-bold">
              GL
            </a>

            {/* Desktop menu */}
            <ul className="hidden md:flex space-x-8">
              <li>
                <a
                  href="#services"
                  className="text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
                >
                  {language === "EN" ? "Services" : "Servicios"}
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
                >
                  {language === "EN" ? "Portfolio" : "Portfolio"}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
                >
                  {language === "EN" ? "Contact" : "Contacto"}
                </a>
              </li>
            </ul>

            {/* Controls */}
            <div className="flex items-center space-x-4 relative">
              <button
                className="text-white text-sm font-medium bg-blue-500 p-2 rounded-lg hover:bg-orange-100 hover:text-gray-700 ease-in-out duration-700 shadow-lg"
                onClick={handleLanguageChange}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                EN | ES
              </button>

              {hover && (
                <span className="absolute w-36 top-10 -right-8 text-xs font-semibold text-gray-600 bg-blue-200 p-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform">
                  Change to {language === "EN" ? "Spanish" : "English"} site
                </span>
              )}

              {/* Hamburger toggle for mobile */}
              <button
                aria-label="Toggle menu"
                className="md:hidden text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu panel */}
          <div
            className={`md:hidden overflow-hidden transform transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-60" : "max-h-0"
            } bg-gradient-to-r from-blue-600 to-blue-300 bg-opacity-95 backdrop-blur-sm shadow-md`}
          >
            <ul className="flex flex-col space-y-4 px-6 pb-4 pt-2">
              <li>
                <a
                  href="#services"
                  className="block text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {language === "EN" ? "Services" : "Servicios"}
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="block text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {language === "EN" ? "Portfolio" : "Portfolio"}
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="block text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {language === "EN" ? "Contact" : "Contacto"}
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div
          id="nav"
          className="flex flex-col md:flex-cols-2 w-screen gap-4 z-10 mb-24 md:mb-0"
        >
          <Image
            className="-z-[10] order-2  md:-translate-y-60 rounded-r-full shadow-2xl md:w-1/3 opacity-70"
            src={"/profesionest.jpg"}
            alt=""
            width={1000}
            height={1000}
          ></Image>

          <div className="flex flex-col p-2 md:-translate-y-24 items-start bg-gray-200 opacity-90 mt-24 md:mt-48">
            <h1 className="text-4xl md:text-6xl text-start font-normal text-gray-700">
              {language === "EN" ? "Custom" : "Sitios Web"}{" "}
              <span className="text-4xl md:text-6xl text-start font-normal text-transparent bg-clip-text bg-gradient-to-l from-blue-700 to-blue-400">
                {language === "EN" ? "Websites" : "Personalizados"}{" "}
              </span>{" "}
              {language === "EN" ? "for unique visions" : ""}
            </h1>
            <div className="fade-in-up">
              <p className="text-xl md:text-4xl ml-1 text-gray-600">
                {language === "EN"
                  ? "functional, elegant "
                  : "funcionales, elegantes"}
                <span className="text-xl md:text-4xl font- bg-gradient-to-l from-blue-700 to-blue-400 text-transparent bg-clip-text">
                  {language === "EN" ? "and results-driven." : " y efectivos."}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div
          ref={iconsRef}
          className={`transition-opacity duration-1000 ease-in-out ${
            isIconsVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Icons language={language} />
        </div>
        <div
          ref={iconsRef}
          className={`py-32 px-4 md:px-8 lg:px-16 transition-all duration-1000 ease-out mb-12 h-full ${
            isIconsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl md:text-5xl font-normal text-center bg-clip-text text-transparent bg-gradient-to-l from-blue-700 to-blue-400 leading-tight">
            {language === "EN"
              ? "From a simple landing page to an App web application,"
              : "Ya sea una simple landing page o una App web compleja,"}
            <br className=""/>
            {language === "EN"
              ? "I bring your vision to life to meet your needs."
              : "Puedo transformar tu idea en el sitio que necesitas."}
          </h1>
        </div>


<div
  ref={divRefs[3]}
  id="services"
  className={`flex flex-col items-center w-full justify-center bg-gradient-to-br from-blue-400 via-blue-300 to-orange-100 transition-all duration-1000 ease-in-out ${
    isVisible[3]
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-10"
  }`}
>
  <section className="py-20 px-4 w-full">
    {/* Encabezado */}
    <div className="max-w-3xl mx-auto text-center mb-12">
      <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
        {language === "EN"
          ? "Premium Web Development"
          : "Desarrollo Web Premium"}
      </h2>
      <p className="mt-4 text-xl md:text-2xl text-gray-700 font-medium">
        {language === "EN"
          ? "Launch your next big idea with a custom, scalable, and high-impact website."
          : "Lanza tu próxima gran idea con un sitio web a medida, escalable y de alto impacto."}
      </p>
      <span className="inline-block mt-8 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-700 text-white text-lg font-bold rounded-full shadow-xl tracking-wide animate-pulse">
        {startingPrice}
      </span>
    </div>

 
    {/* Beneficios Premium */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {services.map((svc) => (
    <div
      key={svc.key}
      className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-start hover:scale-105 transition-transform duration-300 hover:bg-orange-50 border-t-4 border-orange-400"
    >
      {svc.icon}
      <h3 className="text-2xl font-bold text-blue-700 mb-2">
        {svc.title}
      </h3>
      <p className="text-gray-700 text-base">
        {language === "EN" ? svc.descEN : svc.descES}
      </p>
    </div>
  ))}
</div>
       {/* Ejemplo Premium destacado */}
   
   z <div className="max-w-5xl mx-auto mb-16 mt-16">
      <div className="p-4 mb-8">
        <p className="text-2xl md:text-5xl">{
            language === "EN"
              ? "Do you want to see an example of a premium website?"
              : "Te muestro un ejemplo de app web premium"
          }</p>
      </div>
      <div className="relative group rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
        <Image
          src={"/image.png"}
          alt={
            language === "EN"
              ? "Screenshot of emplearg.com"
              : "Captura de emplearg.com"
          }
          width={1280}
          height={800}
          quality={90}
          className="w-full h-80 object-cover"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute bottom-8 left-8">
          <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">
            {language === "EN"
              ? "Featured Project: Social Media Startup"
              : "Proyecto Destacado: Startup de Red Social"}
          </h4>
          <Link
            href="https://www.emplearg.com/"
            target="_blank"
            className="inline-block mt-2 px-5 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-orange-500 transition"
          >
            emplearg.com &rarr;
          </Link>
        </div>
      </div>
      <p className="mt-6 text-center text-lg text-gray-700 max-w-2xl mx-auto">
        {language === "EN"
          ? "A robust new social media built from scratch: user accounts, admin dashboard, real-time notifications, and seamless UX. This is what a premium web solution looks like."
          : "Una nueva red social de empleos, desarrollada desde cero: cuentas de usuario, panel de administración, notificaciones en tiempo real y una experiencia de usuario impecable. Así luce una solución web premium."}
      </p>
    </div>


    {/* CTA */}
    <div className="mt-16 text-center">
      <Link
        href="#cta"
        className="inline-block px-10 py-4 bg-gradient-to-r from-blue-300 to-orange-100 text-gray-700 text-xl font-bold rounded-full shadow-lg hover:scale-105 transition"
      >
        {language === "EN"
          ? "Get Your Premium Website"
          : "Solicita tu Sitio Premium"}
      </Link>
    </div>
  </section>
</div>


  <div id="basic" className="bg-orange-100 py-20 px-4 md:px-16">
  {/* Encabezado y descripción */}
  <div className="max-w-3xl mx-auto text-center mb-12">
    <h2 className="text-4xl font-bold text-gray-800">
      {language === "EN" ? "Basic Websites" : "Sitios Web Básicos"}
    </h2>
    <p className="mt-4 text-lg text-gray-600">
      {language === "EN"
        ? "Perfect for startups and personal brands that need a clean, modern online presence."
        : "Perfecto para startups y marcas personales que necesitan una presencia online limpia y moderna."}
    </p>
     <span className="inline-block mt-8 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-bold rounded-full shadow-xl tracking-wide animate-pulse">
        {startingPrice2}
      </span>
  </div>
  

  {/* Grid de características */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {basicServices.map((svc) => (
      <div
        key={svc.key}
        className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-start hover:scale-105 transition-transform duration-300 hover:bg-blue-50 border-t-4 border-blue-400"
      >
        {svc.icon}
        <h3 className="text-2xl font-bold text-blue-700 mb-2">
          {svc.title}
        </h3>
        <p className="text-gray-700 text-base">
          {language === "EN" ? svc.descEN : svc.descES}
        </p>
      </div>
    ))}
  </div>
</div>
        <div
          id="cta"
          className="relative bg-gradient-to-r from-orange-50 to-blue-100 py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
        >
          {/* Decoración sutil de fondo */}
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 200 C200 100 600 300 800 150 L800 400 L0 400 Z"
                fill="currentColor"
                className="text-blue-200"
              />
            </svg>
          </div>

          {/* Contenido principal */}
          <div
            id="contact"
            className="relative max-w-2xl mx-auto text-center space-y-6 py-12"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
              {language === "EN" ? "Ready to Start?" : "¿Listo para empezar?"}
            </h2>

            <p className="text-lg text-gray-700">
              {language === "EN"
                ? "Let’s talk through your project and turn ideas into reality."
                : "Hablemos de tu proyecto y hagamos tus ideas realidad."}
            </p>

            <Link
              href="https://calendly.com/guido-llaurado/appointment-for-landinpage"
              target="_blank"
            >
              <button className="inline-flex items-center px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-500 transform hover:scale-105 transition mt-4">
                {language === "EN" ? "Schedule Now" : "Agenda una cita"}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </Link>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mt-6">
              <a
                href="mailto:guido.llaurado@gmail.com"
                className="text-gray-700 hover:text-gray-900 transition-transform transform hover:scale-110"
                aria-label="Email"
              >
                <CiMail className="w-8 h-8" />
              </a>
              <a
                href="https://wa.me/+5492226524466"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-transform transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-8 h-8" />
              </a>
              <a
                href="https://www.linkedin.com/in/guido-llaurado-381316118/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-gray-900 transition-transform transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-8 h-8" />
              </a>
            </div>
          </div>
          <p className="text-md text-center md:text-lg text-gray-700">
            {language === "EN"
              ? "Or keep scrolling to see my "
              : "O sigue scrolleando para ver mi "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-300 to-orange-400 font-semibold">
              {language === "EN" ? "work." : "trabajo."}
            </span>
          </p>
        </div>

     <section
  id="portfolio"
  className="py-20 bg-gradient-to-b from-orange-100"
>
  <div className="max-w-6xl mx-auto px-4">
    <h2 className="text-6xl font-extrabold text-center text-gray-900 mb-16">
      Portfolio
    </h2>

    {/* Basic Websites */}
    <div className="mb-16">
      <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        {language === "EN" ? "Basic Websites" : "Sitios Web Básicos"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {/* Card Example */}
        <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 border-t-4 border-blue-400 group">
          <div className="relative">
            <Image
              src="/cmm3.png"
              alt="Services provider"
              width={1000}
              height={1000}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="http://www.alarmascmm.com"
                target="_blank"
                className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full shadow hover:bg-orange-500 transition"
              >
                alarmascmm.com
              </a>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-bold text-blue-700 mb-2">
              {language === "EN" ? "Services Provider" : "Proveedor de Servicios"}
            </h4>
            <p className="text-gray-700 text-base flex-1">
              {language === "EN"
                ? "A modern site for a security services company."
                : "Sitio moderno para empresa de servicios de seguridad."}
            </p>
          </div>
        </div>
        {/* Repite el mismo patrón para los otros proyectos */}
        <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 border-t-4 border-blue-400 group">
          <div className="relative">
            <Image
              src="/soporte.png"
              alt="IT Company"
              width={1000}
              height={1000}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="http://www.pidosoporte.com"
                target="_blank"
                className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full shadow hover:bg-orange-500 transition"
              >
                pidosoporte.com
              </a>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-bold text-blue-700 mb-2">
              {language === "EN" ? "IT Company" : "Empresa de Tecnología"}
            </h4>
            <p className="text-gray-700 text-base flex-1">
              {language === "EN"
                ? "Landing page for an IT support business."
                : "Landing page para empresa de soporte IT."}
            </p>
          </div>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 border-t-4 border-blue-400 group">
          <div className="relative">
            <Image
              src="/customs.png"
              alt="International Trader Company"
              width={1000}
              height={1000}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="http://www.bscustoms.com.ar"
                target="_blank"
                className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full shadow hover:bg-orange-500 transition"
              >
                bscustoms.com.ar
              </a>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-bold text-blue-700 mb-2">
              {language === "EN"
                ? "International Trader Company"
                : "Empresa de Comercio Internacional"}
            </h4>
            <p className="text-gray-700 text-base flex-1">
              {language === "EN"
                ? "Corporate website for an international trade firm."
                : "Sitio corporativo para empresa de comercio exterior."}
            </p>
          </div>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 border-t-4 border-blue-400 group">
          <div className="relative">
            <Image
              src="/lau.png"
              alt="University Professional"
              width={1000}
              height={1000}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="https://laureanogh.vercel.app/"
                target="_blank"
                className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full shadow hover:bg-orange-500 transition"
              >
                laureanogh.vercel.app
              </a>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-bold text-blue-700 mb-2">
              {language === "EN"
                ? "University Professional"
                : "Profesional Universitario"}
            </h4>
            <p className="text-gray-700 text-base flex-1">
              {language === "EN"
                ? "Personal portfolio for a university graduate."
                : "Portfolio personal para profesional universitario."}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Premium Websites */}
    <div>
      <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
        {language === "EN" ? "Premium Websites" : "Sitios Web Premium"}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col hover:scale-105 transition-transform duration-300 border-t-4 border-orange-400 group">
          <div className="relative">
            <Image
              src="/emplearg.png"
              alt="Social Media Startup"
              width={1000}
              height={1000}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <a
                href="http://www.emplearg.com/"
                target="_blank"
                className="inline-block px-4 py-1 bg-orange-600 text-white text-sm font-semibold rounded-full shadow hover:bg-blue-500 transition"
              >
                emplearg.com
              </a>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col">
            <h4 className="text-xl font-bold text-orange-700 mb-2">
              {language === "EN"
                ? "Social Media Startup"
                : "Startup de Red Social"}
            </h4>
            <p className="text-gray-700 text-base flex-1">
              {language === "EN"
                ? "A robust social media with real-time notifications, admin dashboard, and seamless UX."
                : "Nueva red social de empleos con notificaciones en tiempo real, panel de administración y UX impecable."}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        <div
          id="about"
          className="bg-gradient-to-tr from-blue-50 to-blue-100 py-20 px-4 md:px-16"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-l from-blue-700 to-blue-400">
              {language === "EN" ? "About Me" : "Sobre mí"}
            </h2>
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
              {language === "EN"
                ? "I'm a passionate full‑stack developer from Argentina with over 3 years of professional experience. Combining strong technical skills with a background in customer service, I ensure that every project is not only robust and scalable but also delivered with clear, friendly communication."
                : "Soy un desarrollador full‑stack de Argentina con más de 3 años de experiencia profesional. Combino sólidas habilidades técnicas con una formación en atención al cliente para asegurar que cada proyecto sea robusto y escalable, entregado siempre con comunicación clara y cercana."}
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <li className="flex items-start">
                <span className="mr-3 text-2xl">💡</span>
                <span>
                  {language === "EN"
                    ? "Innovative solutions tailored to your needs."
                    : "Soluciones innovadoras diseñadas para tus necesidades."}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">⚙️</span>
                <span>
                  {language === "EN"
                    ? "End‑to‑end development: front‑end, back‑end & deployment."
                    : "Desarrollo integral: front‑end, back‑end y despliegue."}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">🤝</span>
                <span>
                  {language === "EN"
                    ? "Clear communication & ongoing support."
                    : "Comunicación transparente y soporte continuo."}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <footer id="contact" className="bg-gray-900 text-gray-300 py-12 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Branding */}
            <div className="flex flex-col items-center md:items-start">
              <h3 className="text-2xl font-bold text-white">Guido Llaurado</h3>
              <p className="mt-2 text-sm">
                {language === "EN"
                  ? "Design & Development"
                  : "Diseño y Desarrollo"}
              </p>
            </div>

            {/* Call to Action & Socials */}
            <div className="flex flex-col items-center">
              <p className="text-center text-sm mb-4">
                {language === "EN"
                  ? "Open to new opportunities. Let’s build something great together."
                  : "Abierto a nuevas oportunidades laborales. Construyamos algo genial juntos."}
              </p>
              <div className="flex space-x-6">
                <a
                  href="mailto:guido.llaurado@gmail.com"
                  className="hover:text-white transition"
                >
                  <CiMail className="w-12 h-8" />
                </a>
                <a
                  href="https://wa.me/+5492226524466"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <FaWhatsapp className="w-12 h-8" />
                </a>
                <a
                  href="https://www.linkedin.com/in/guido-llaurado-381316118/"
                  target="_blank"
                  className="hover:text-white transition"
                >
                  <FaLinkedin className="w-12 h-8" />
                </a>
              </div>
            </div>

            {/* Legal & Credits */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-2">
              <p className="text-xs">
                {language === "EN"
                  ? "All rights reserved."
                  : "Todos los derechos reservados."}
              </p>
              <p className="text-xs">
                {language === "EN"
                  ? "Built with Tailwind CSS"
                  : "Construido con Tailwind CSS"}
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
