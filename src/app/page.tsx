// app/page.tsx (o pages/index.tsx si usas Pages Router)
'use client';

import Flechaup from "../components/flechaup";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { FaShoppingCart, FaUserShield, FaPlug, FaRocket, FaLock, FaHandsHelping } from "react-icons/fa";
import Icons from "../components/icons"; 
import { FaHome, FaMobileAlt, FaGlobe, FaImages, FaShieldAlt, FaEnvelopeOpenText } from "react-icons/fa";
import CalendarComponent from "../components/calendar"; 
import PortfolioSection from "@/components/portfolioSection";
import Footer from "@/components/footer";
import { useAutoEnableSlots } from "../hooks/useAutoEnableSlots";

type Language = 'en' | 'es' | 'ca';

export default function Home() {
  const [hover, setHover] = useState(false);
  const [language, setLanguage] = useState<Language>("en"); 
  const [isOpen, setIsOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // Auto-habilitar slots de martes y jueves de 10-13h
  const { isLoading: autoEnabling, isEnabled: autoEnabled, slotsCreated } = useAutoEnableSlots(true);

  const title = language === "en" ? "Premium Websites" : language === "ca" ? "Llocs Web Premium" : "Sitios Premium";
  const subtitle =
    language === "en"
      ? "Transform your online presence with tailor-made solutions designed to grow your business and captivate your audience."
      : language === "ca"
      ? "Transforma la teva presència en línia amb solucions a mida dissenyades per impulsar el teu negoci i captivar la teva audiència."
      : "Transforma tu presencia en línea con soluciones a medida diseñadas para impulsar tu negocio y cautivar a tu audiencia.";
  const startingPrice =
    language === "en"
      ? "Prices starting at $500 USD"
      : language === "ca"
      ? "Preus des de 500 USD"
      : "Precios desde 500 USD";

  const startingPrice2 =
    language === "en"
      ? "Prices starting at $250 USD"
      : language === "ca"
      ? "Preus des de 250 USD"
      : "Precios desde 250 USD";

  const services = [
    {
      key: "ecom",
      title: language === "en" ? "Custom E-commerce" : language === "ca" ? "Comerç Electrònic Personalitzat" : "Comercio Electrónico",
      descEN: "Secure, scalable online stores with payment gateway integration and inventory management.",
      descES: "Tiendas online seguras y escalables con pasarelas de pago y gestión de inventario.",
      descCA: "Botigues en línia segures i escalables amb integració de passarel·les de pagament i gestió d'inventari.",
      icon: <FaShoppingCart className="text-3xl text-orange-500 mb-4" />,
    },
    {
      key: "portal",
      title: language === "en" ? "User & Admin Portals" : language === "ca" ? "Portals d'Usuari i Admin" : "Portales de Usuario y Admin",
      descEN: "Custom dashboards for clients or team members to manage content, data, and reports.",
      descES: "Dashboards personalizados para clientes o equipo, con gestión de contenido, datos e informes.",
      descCA: "Panells personalitzats per a clients o membres de l'equip per gestionar contingut, dades i informes.",
      icon: <FaUserShield className="text-3xl text-blue-500 mb-4" />,
    },
    {
      key: "api",
      title: language === "en" ? "API & Third-Party Integrations" : language === "ca" ? "Integracions d'API i Tercers" : "Integraciones API y Terceros",
      descEN: "Connect your site to CRMs, marketing tools, or any external services for seamless workflows.",
      descES: "Conecta tu sitio a CRMs, herramientas de marketing o servicios externos para flujos de trabajo integrados.",
      descCA: "Connecta el teu lloc a CRMs, eines de màrqueting o qualsevol servei extern per a fluxos de treball integrats.",
      icon: <FaPlug className="text-3xl text-green-500 mb-4" />,
    },
    {
      key: "perf",
      title: language === "en" ? "Performance Optimization" : language === "ca" ? "Optimització de Rendiment" : "Optimización de Rendimiento",
      descEN: "Fast load times, code splitting and caching strategies to keep users engaged.",
      descES: "Velocidad de carga, code splitting y caching para mantener a tus usuarios comprometidos.",
      descCA: "Velocitat de càrrega, divisió de codi i estratègies de caché per mantenir els usuaris compromesos.",
      icon: <FaRocket className="text-3xl text-pink-500 mb-4" />,
    },
    {
      key: "seo",
      title: language === "en" ? "SEO & Security" : language === "ca" ? "SEO i Seguretat" : "SEO y Seguridad",
      descEN: "On-page SEO, metadata setup and SSL encryption for higher rankings and trust.",
      descES: "SEO on-page, configuración de metadatos y cifrado SSL para mejor posicionamiento y confianza.",
      descCA: "SEO a la pàgina, configuració de metadades i xifratge SSL per a millor posicionament i confiança.",
      icon: <FaLock className="text-3xl text-yellow-500 mb-4" />,
    },
    {
      key: "support",
      title: language === "en" ? "Ongoing Support" : language === "ca" ? "Suport Continu" : "Soporte Continuo",
      descEN: "Maintenance plans, updates and performance monitoring to keep your site running smoothly.",
      descES: "Planes de mantenimiento, actualizaciones y monitoreo para que tu sitio siempre funcione a la perfección.",
      descCA: "Plans de manteniment, actualitzacions i monitoratge de rendiment per mantenir el teu lloc funcionant perfectament.",
      icon: <FaHandsHelping className="text-3xl text-purple-500 mb-4" />,
    },
  ];
  const basicServices = [
    {
      key: "home",
      title: language === "en" ? "Home + 3 Sections" : language === "ca" ? "Pàgina Principal + 3 Seccions" : "Página Principal + 3 Secciones",
      descEN: "Engaging homepage with up to 3 custom content sections (About, Services, Contact, etc.).",
      descES: "Página de inicio atractiva con hasta 3 secciones personalizadas (Quién soy, Servicios, Contacto, etc.).",
      descCA: "Pàgina principal atractiva amb fins a 3 seccions de contingut personalitzat (Sobre nosaltres, Serveis, Contacte, etc.).",
      icon: <FaHome className="text-3xl text-blue-500 mb-4" />,
    },
    {
      key: "responsive",
      title: language === "en" ? "Responsive Design" : language === "ca" ? "Disseny Responsiu" : "Diseño Responsivo",
      descEN: "Automatically adapts to all device sizes for a flawless user experience.",
      descES: "Se adapta automáticamente a todas las pantallas para una experiencia perfecta.",
      descCA: "S'adapta automàticament a totes les pantalles per a una experiència perfecta.",
      icon: <FaMobileAlt className="text-3xl text-orange-500 mb-4" />,
    },
    {
      key: "hosting",
      title: language === "en" ? "Hosting & Domain" : language === "ca" ? "Hosting i Domini" : "Hosting y Dominio",
      descEN: "Secure hosting and a custom domain included so you can get online immediately.",
      descES: "Hosting seguro y dominio personalizado incluidos para que estés en línea de inmediato.",
      descCA: "Hosting segur i domini personalitzat inclosos perquè estiguis en línia de seguida.",
      icon: <FaGlobe className="text-3xl text-green-500 mb-4" />,
    },
    {
      key: "media",
      title: language === "en" ? "Media Showcase" : language === "ca" ? "Exhibició de Mitjans" : "Exhibición de Medios",
      descEN: "Effortlessly display images, videos and galleries in a sleek, organized layout.",
      descES: "Muestra imágenes, videos y galerías de forma elegante y organizada.",
      descCA: "Mostra imatges, vídeos i galeries de forma elegant i organitzada.",
      icon: <FaImages className="text-3xl text-pink-500 mb-4" />,
    },
    {
      key: "seo",
      title: language === "en" ? "Basic SEO & SSL" : language === "ca" ? "SEO Bàsic i SSL" : "SEO Básico y SSL",
      descEN: "On‑page SEO setup and SSL security to help your site rank and build trust.",
      descES: "Configuración SEO básica y seguridad SSL para mejorar tu posicionamiento y confianza.",
      descCA: "Configuració SEO bàsica i seguretat SSL per millorar el teu posicionament i confiança.",
      icon: <FaShieldAlt className="text-3xl text-yellow-500 mb-4" />,
    },
    {
      key: "contact",
      title: language === "en" ? "Contact Form Integration" : language === "ca" ? "Integració de Formulari" : "Integración de Formulario",
      descEN: "Easy-to-use contact form with spam protection so you never miss a lead.",
      descES: "Formulario de contacto fácil de usar con protección anti-spam para no perder ningún cliente potencial.",
      descCA: "Formulari de contacte fàcil d'usar amb protecció anti-spam per no perdre cap client potencial.",
      icon: <FaEnvelopeOpenText className="text-3xl text-purple-500 mb-4" />,
    },
  ];

  useEffect(() => {
    const savedLanguage = Cookies.get("language");
    if (savedLanguage) {
   
      setLanguage(savedLanguage as Language);
    }
  }, []);


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
    let lastScrollTime = 0;
    const throttleDelay = 16; // ~60fps

    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < throttleDelay) {
        animationFrameId = requestAnimationFrame(handleScroll);
        return;
      }
      lastScrollTime = now;

      const newVisibility = divRefs.map((ref) => {
        if (!ref.current) return false;
        const rect = ref.current.getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        // Activar animación cuando el elemento está al 80% de la vista en móviles, 70% en desktop
        const isMobile = window.innerWidth <= 768;
        const triggerPoint = isMobile ? 0.9 : 0.8;
        return rect.top <= windowHeight * triggerPoint && rect.bottom >= 0;
      });
      setIsVisible(newVisibility);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    // Ejecutar inmediatamente para elementos ya visibles al cargar
    handleScroll();
    
    // También escuchar eventos de scroll para actualizaciones
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const iconsRef = useRef<HTMLDivElement>(null);
  const [isIconsVisible, setIsIconsVisible] = useState(false);

  useEffect(() => {
    // Configuración más sensible para móviles
    const isMobile = window.innerWidth <= 768;
    const observerOptions = {
      threshold: isMobile ? 0.01 : 0.05, // Muy bajo threshold para activación temprana
      rootMargin: isMobile ? '0px 0px -20% 0px' : '0px 0px -10% 0px' // Márgenes optimizados
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIconsVisible(true);
            observer.disconnect();
          }
        });
      },
      observerOptions
    );

    if (iconsRef.current) {
      observer.observe(iconsRef.current);
    }

    // Verificación adicional para elementos ya visibles al cargar la página
    const checkInitialVisibility = () => {
      if (iconsRef.current) {
        const rect = iconsRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const triggerPoint = isMobile ? 0.95 : 0.85;
        
        if (rect.top <= windowHeight * triggerPoint && rect.bottom >= 0) {
          setIsIconsVisible(true);
          observer.disconnect();
        }
      }
    };

    // Ejecutar verificación inicial después de un pequeño delay
    setTimeout(checkInitialVisibility, 100);

    return () => {
      if (iconsRef.current) {
        observer.unobserve(iconsRef.current);
      }
    };
  }, []);

  // 2. Función para mostrar el calendario
  const handleBookAppointment = () => {
    setShowCalendar(true);
    // Opcional: hacer scroll suave hacia el calendario si este aparece en la parte inferior
    // window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Función para cerrar el calendario
  const handleCloseCalendar = () => {
    setShowCalendar(false);
  };

    const handleLanguageChange = () => {
    const newLanguage: Language = language === "es" ? "ca" : language === "ca" ? "en" : "es";
    setLanguage(newLanguage);
    Cookies.set("language", newLanguage, { expires: 365 });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <main className="flex-grow bg-gradient-to-b from-orange-100 to-pink-100 z-10">
        <Flechaup />

<nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-blue-300 bg-opacity-95 backdrop-blur-sm shadow-md z-50">
  <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
    <a href="#" className="text-white text-xl font-bold">
      GL
    </a>

    {/* Desktop menu alineado a la derecha */}
    <ul className="hidden md:flex space-x-8 ml-auto">
      <li>
        <a
          href="#services"
          className="text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
        >
          {language === "en" ? "Services" : language === "ca" ? "Serveis" : "Servicios"}
        </a>
      </li>
      <li>
        <a
          href="#portfolio"
          className="text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
        >
          {language === "en" ? "Portfolio" : "Portfolio"}
        </a>
      </li>
      <li>
        <a
          href="#contact"
          className="text-white text-base font-medium hover:underline hover:text-gray-100 transition-colors"
        >
          {language === "en" ? "Contact" : language === "ca" ? "Contacte" : "Contacto"}
        </a>
      </li>
    </ul>

    {/* Controls alineados a la derecha */}
    <div className="flex items-center space-x-4 relative ml-0 md:ml-4">
      <button
        className="text-white text-sm font-medium bg-blue-500 p-2 rounded-lg hover:bg-orange-100 hover:text-gray-700 ease-in-out duration-700 shadow-lg"
        onClick={handleLanguageChange}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        EN | ES | CA
      </button>

      {hover && (
        <span className="absolute w-36 top-10 -right-8 text-xs font-semibold text-gray-600 bg-blue-200 p-2 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform">
          Change to {language === "en" ? "Español" : language === "es" ? "Català" : "English"} site
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
  {/* ...resto del código... */}
</nav>

        <div
          id="nav"
          className="flex flex-col md:flex-cols-2 w-screen gap-4 z-10 mb-24 md:mb-0"
        >
          <img
            className="-z-[10] order-2 rounded-r-full shadow-2xl opacity-80 md:-translate-y-24"
            src={"/Sora1.png"}
            alt=""
            width={1000}
            height={1000}
          ></img>

          <div className="flex flex-col p-2 md:-translate-y-24 items-start bg-gray-200 opacity-90 mt-24 md:mt-48">
            <h1 className="text-4xl md:text-6xl text-start font-normal text-gray-700">
              {language === "en" ? "Custom" : language === "ca" ? "Llocs Web" : "Sitios Web"}{" "}
              <span className="text-4xl md:text-6xl text-start font-normal text-transparent bg-clip-text bg-gradient-to-l from-blue-700 to-blue-400">
                {language === "en" ? "Websites" : language === "ca" ? "Personalitzats" : "Personalizados"}{" "}
              </span>{" "}
          
            </h1>
            <div className="fade-in-up">
              <p className="text-xl md:text-4xl ml-1 text-gray-600">
                {language === "en"
                  ? "Your online presence, built with strategy and precision. "
                  : "Tu presencia online, diseñada con estrategia y detalle."}
           
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
          {/* 3. Pasa el prop 'onBookAppointment' al componente Icons */}
          <Icons language={language} onBookAppointment={handleBookAppointment} />
        </div>

        {/* 4. Renderiza el CalendarComponent condicionalmente */}
 <div
          className={`
            py-12 px-4 bg-gradient-to-tl from-blue-50 to-blue-100
            transition-all duration-700 ease-out transform
            ${showCalendar ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none absolute w-full'}
            ${!showCalendar && 'h-0 overflow-hidden'} /* Oculta la altura cuando no está visible */
          `}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-8">
            {language === 'es' ? 'Agenda tu Cita' : 'Schedule Your Appointment'}
          </h2>
          <CalendarComponent language={language} />
          <div className="text-center mt-8">
            <button
              onClick={handleCloseCalendar}
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
            >
              {language === 'es' ? 'Cerrar Calendario' : 'Close Calendar'}
            </button>
          </div>
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
            {language === "en"
              ? "From a simple landing page to an App web application,"
              : "Ya sea una simple landing page o una App web compleja,"}
            <br className=""/>
            {language === "en"
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
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                {language === "en"
                  ? "Premium Web Development"
                  : "Desarrollo Web Premium"}
              </h2>
              <p className="mt-4 text-xl md:text-2xl text-gray-700 font-medium">
                {language === "en"
                  ? "Launch your next big idea with a custom, scalable, and high-impact website."
                  : "Lanza tu próxima gran idea con un sitio web a medida, escalable y de alto impacto."}
              </p>
              <span className="inline-block mt-8 px-6 py-2 bg-gradient-to-r from-orange-100 to-orange-200 text-gray-800 text-lg font-bold rounded-full shadow-xl tracking-wide hover:from-green-100 hover:to-green-200 ease-in-out duration-700 hover:scale-110">
                {startingPrice}
              </span>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((svc) => (
                <div
                  key={svc.key}
                  className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-start hover:scale-105 transition-transform duration-300 hover:bg-orange-50 border-t-4 border-orange-100"
                >
                  {svc.icon}
                  <h3 className="text-2xl font-bold text-blue-700 mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-gray-700 text-base">
                    {language === "en" ? svc.descEN : language === "ca" ? svc.descCA : svc.descES}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="max-w-5xl mx-auto mb-16 mt-16">
              <div className="p-4 mb-8">
                <p className="text-2xl md:text-5xl">{
                    language === "en"
                      ? "Do you want to see an example of a premium website?"
                      : "Te muestro un ejemplo de app web premium"
                  }</p>
              </div>
              <div className="relative group rounded-3xl shadow-2xl overflow-hidden transition-transform duration-500 hover:scale-105">
                <img
                  src={"/empleC.jpg"}
                  alt={
                    language === "en"
                      ? "Screenshot of emplearg.com"
                      : "Captura de emplearg.com"
                  }
                  width={1280}
                  height={800}
                className="w-full h-80 object-cover"
                loading="lazy"
                  
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-8 left-8">
                  <h4 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-2">
                    {language === "en"
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
                {language === "en"
                  ? "A robust new social media built from scratch: user accounts, admin dashboard, real-time notifications, and seamless UX. This is what a premium web solution looks like."
                  : "Una nueva red social de empleos, desarrollada desde cero: cuentas de usuario, panel de administración, notificaciones en tiempo real y una experiencia de usuario impecable. Así luce una solución web premium."}
              </p>
            </div>

            <div className="mt-16 text-center">
              <Link
                href="#cta"
                className="inline-block px-10 py-4 bg-gradient-to-r from-blue-300 to-orange-100 text-gray-700 text-xl font-bold rounded-full shadow-lg hover:scale-105 transition"
              >
                {language === "en"
                  ? "Get Your Premium Website"
                  : "Solicita tu Sitio Premium"}
              </Link>
            </div>
          </section>
        </div>


        <div id="basic" className="bg-orange-100 py-20 px-4 md:px-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800">
              {language === "en" ? "Basic Websites" : language === "ca" ? "Llocs Web Bàsics" : "Sitios Web Básicos"}
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              {language === "en"
                ? "Perfect for startups and personal brands that need a clean, modern online presence."
                : "Perfecto para startups y marcas personales que necesitan una presencia online limpia y moderna."}
            </p>
            <span className="inline-block mt-8 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white text-lg font-bold rounded-full shadow-xl tracking-wide animate-pulse">
              {startingPrice2}
            </span>
          </div>
          

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
                  {language === "en" ? svc.descEN : language === "ca" ? svc.descCA : svc.descES}
                </p>
              </div>
            ))}
          </div>
        </div>
       
       
       <div
  id="cta"
  className="relative bg-gradient-to-br from-orange-100 via-blue-200 to-blue-200 py-24 px-4 md:px-8 lg:px-16 overflow-hidden flex items-center justify-center min-h-[60vh]"
>


  <div
    id="contact"
    className="relative z-10 max-w-3xl mx-auto text-center space-y-8 p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white border-opacity-30 transform hover:scale-[1.02] transition-all duration-500 ease-in-out"
  >
    <h2
      className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
    >
      {language === "en" ? "Ready to Elevate Your Ideas?" : "¿Listo para llevar tus ideas al siguiente nivel?"}
    </h2>

    <p className="text-xl text-gray-700 max-w-prose mx-auto">
      {language === "en"
        ? "Let’s connect and transform your vision into a stunning digital reality. Whether it’s a captivating app or a powerful website, I'm here to build something amazing together."
        : "Conectemos y transformemos tu visión en una impresionante realidad digital. Ya sea una app cautivadora o un sitio web potente, estoy aquí para construir algo asombroso juntos."}
    </p>

    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mt-8">
      <a
        href="mailto:guido.llaurado@gmail.com"
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-semibold text-gray-800 bg-gradient-to-r from-orange-100 to-orange-200 rounded-full shadow-lg overflow-hidden transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 animate-pulse-once"
        aria-label="Email"
      >
        <span
          className="absolute inset-0 w-full h-full border-2 border-orange-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></span>
        <CiMail className="w-6 h-6 mr-3 text-gray-800" />
        {language === "en" ? "Send an Email" : "Enviar un Email"}
      </a>

      <div className="flex space-x-4">
        <a
          href="https://wa.me/+5492226524466"
          target="_blank"
          rel="noopener noreferrer"
          className="relative text-gray-700 bg-white p-3 rounded-full shadow-md hover:text-green-500 transition-all duration-300 transform hover:scale-125 hover:shadow-lg tooltip"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="w-7 h-7" />
          <span
            className="tooltip-text absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            >WhatsApp</span>
        </a>
        <a
          href="https://www.linkedin.com/in/guido-llaurado-381316118/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative text-gray-700 bg-white p-3 rounded-full shadow-md hover:text-blue-700 transition-all duration-300 transform hover:scale-125 hover:shadow-lg tooltip"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-7 h-7" />
          <span
            className="tooltip-text absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
            >LinkedIn</span>
          
        </a>
      </div>
    </div>

    <p className="text-lg md:text-xl text-gray-600 pt-8">
      {language === "en"
        ? "Or, if you prefer to explore first, keep scrolling to discover my"
        : "O, si preferis explorar primero, sigue scrolleando para descubrir mi"}
      <a
        href="#portfolio"
        className="ml-2 text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-950 font-extrabold border-b-2 border-blue-500 hover:border-purple-600 transition-colors duration-300"
      >
        {language === "en" ? "Work." : "Trabajo."}
      </a>
    </p>
  </div>
</div>
      <PortfolioSection language={language} />
      </main>
        <Footer language={language} /> 
    </div>
  );
}