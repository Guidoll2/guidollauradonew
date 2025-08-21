// components/portfolioSection.tsx
import Link from 'next/link';
import { FaExternalLinkAlt, FaTools, FaCode, FaPaintBrush, FaCalendarAlt, FaRobot, FaUsers, FaChartLine, FaBell, FaDatabase, FaWarehouse, FaUserMd, FaComments } from 'react-icons/fa'; // Importa nuevos iconos

// Definición de tipos para los proyectos
interface Project {
  id: string;
  category: 'basic' | 'advanced' | 'custom';
  title: { en: string; es: string };
  description: { en: string; es: string };
  imageUrl: string;
  projectUrl: string;
  domainName: string;
  skills: ('responsive' | 'ux-ui' | 'ai-images' | 'custom-calendar' | 'nextjs' | 'typescript' | 'tailwind' | 'api-integration' | 'user-auth' | 'admin-panel' | 'real-time-notifications' | 'data-analytics' | 'inventory-management' | 'medical-portal' | 'forum-system')[];
}

// Datos de tus proyectos
const projects: Project[] = [
  // --- Proyectos Básicos ---
  {
    id: 'cmm-security',
    category: 'basic',
    title: { en: 'Services Provider', es: 'Proveedor de Servicios' },
    description: { en: 'A modern and fully responsive site for a security services company, emphasizing clear UX and aesthetic UI.', es: 'Sitio moderno y totalmente responsivo para una empresa de servicios de seguridad, enfatizando una UX clara y una UI estética.' },
    imageUrl: '/cmm3.png',
    projectUrl: 'http://www.alarmascmm.com',
    domainName: 'alarmascmm.com',
    skills: ['responsive', 'ux-ui', 'tailwind'],
  },
  {
    id: 'it-company',
    category: 'basic',
    title: { en: 'IT Company', es: 'Empresa de Tecnología' },
    description: { en: 'Intuitive landing page for an IT support business, designed for optimal user experience.', es: 'Landing page intuitiva para empresa de soporte IT, diseñada para una experiencia de usuario óptima.' },
    imageUrl: '/soporte.png',
    projectUrl: 'http://www.pidosoporte.com',
    domainName: 'pidosoporte.com',
    skills: ['responsive', 'ux-ui', 'nextjs'],
  },
  {
    id: 'customs-trader',
    category: 'basic',
    title: { en: 'International Trader Company', es: 'Empresa de Comercio Internacional' },
    description: { en: 'Corporate website for an international trade firm, showcasing robust design and clear information architecture.', es: 'Sitio corporativo para empresa de comercio exterior, mostrando un diseño robusto y arquitectura de información clara.' },
    imageUrl: '/customs.png',
    projectUrl: 'http://www.bscustoms.com.ar',
    domainName: 'bscustoms.com.ar',
    skills: ['responsive', 'ux-ui', 'typescript'],
  },
  {
    id: 'university-prof',
    category: 'basic',
    title: { en: 'University Professional Portfolio', es: 'Portafolio Profesional Universitario' },
    description: { en: 'Personal portfolio highlighting academic and professional achievements.', es: 'Portafolio personal que destaca logros académicos y profesionales.' },
    imageUrl: '/lau.png',
    projectUrl: 'https://laureanogh.vercel.app/',
    domainName: 'laureanogh.vercel.app',
    skills: ['responsive', 'nextjs', 'tailwind'],
  },


  {
    id: 'emplearg',
    category: 'advanced', 
    title: { en: 'Job Social Network App', es: 'App de Red Social de Empleos' },
    description: {
      en: 'A robust social media platform for job seekers, featuring user profiles, admin dashboards, real-time notifications, and advanced filtering for an intuitive job search experience.',
      es: 'Una robusta plataforma de red social para buscadores de empleo, que incluye perfiles de usuario, paneles de administración, notificaciones en tiempo real y filtrado avanzado para una experiencia de búsqueda de empleo intuitiva.'
    },
    imageUrl: '/img.png', 
    projectUrl: 'https://www.emplearg.com/',
    domainName: 'emplearg.com',
    skills: ['responsive', 'ux-ui', 'nextjs', 'typescript', 'tailwind', 'api-integration', 'user-auth', 'admin-panel', 'real-time-notifications'], 
  },

  {
    id: 'cuatro-granos',
    category: 'advanced',
    title: { en: 'Cuatro Granos - Agricultural Industry', es: 'Cuatro Granos - Industria Agropecuaria' },
    description: {
      en: 'Professional website for Cuatro Granos agricultural company featuring modern design, service showcase, product catalog, and comprehensive business information for optimized agricultural operations.',
      es: 'Sitio web profesional para la empresa agropecuaria Cuatro Granos con diseño moderno, muestra de servicios, catálogo de productos e información empresarial integral para operaciones agrícolas optimizadas.'
    },
    imageUrl: '/screenshot web cg.png',
    projectUrl: 'http://cuatrogranos.com/',
    domainName: 'cuatrogranos.com',
    skills: ['responsive', 'ux-ui', 'nextjs', 'typescript', 'tailwind', 'api-integration', 'admin-panel', 'data-analytics', 'inventory-management'],
  },

  {
    id: 'dra-gherardi',
    category: 'advanced',
    title: { en: 'Dra. Gherardi - Medical Practice', es: 'Dra. Gherardi - Consultorio Médico' },
    description: {
      en: 'Professional medical website for Dr. Gherardi featuring appointment booking system, patient portal, medical services information, and comprehensive practice management tools for enhanced patient care.',
      es: 'Sitio web médico profesional para la Dra. Gherardi con sistema de reserva de citas, portal de pacientes, información de servicios médicos y herramientas integrales de gestión de consultorios para atención médica mejorada.'
    },
    imageUrl: '/screenshot web.png',
    projectUrl: 'https://dragherardi.vercel.app/',
    domainName: 'dragherardi.vercel.app',
    skills: ['responsive', 'ux-ui', 'nextjs', 'typescript', 'tailwind', 'custom-calendar', 'user-auth', 'api-integration', 'medical-portal', 'forum-system'],
  },
];


const getSkillIcon = (skill: Project['skills'][number]) => {
  switch (skill) {
    case 'responsive': return <FaCode className="inline-block mr-1 text-blue-500" />;
    case 'ux-ui': return <FaPaintBrush className="inline-block mr-1 text-purple-500" />;
    case 'ai-images': return <FaRobot className="inline-block mr-1 text-green-500" />;
    case 'custom-calendar': return <FaCalendarAlt className="inline-block mr-1 text-red-500" />;
    case 'nextjs': return <span className="mr-1 font-bold">Next.js</span>;
    case 'typescript': return <span className="mr-1 font-bold">TS</span>;
    case 'tailwind': return <span className="mr-1 font-bold">Tailwind</span>;
    case 'api-integration': return <FaTools className="inline-block mr-1 text-yellow-500" />;
    case 'user-auth': return <FaUsers className="inline-block mr-1 text-teal-500" />; 
    case 'admin-panel': return <FaChartLine className="inline-block mr-1 text-indigo-500" />;
    case 'real-time-notifications': return <FaBell className="inline-block mr-1 text-pink-500" />;
    case 'data-analytics': return <FaDatabase className="inline-block mr-1 text-emerald-500" />;
    case 'inventory-management': return <FaWarehouse className="inline-block mr-1 text-orange-500" />;
    case 'medical-portal': return <FaUserMd className="inline-block mr-1 text-cyan-500" />;
    case 'forum-system': return <FaComments className="inline-block mr-1 text-violet-500" />;
    default: return null;
  }
};

interface PortfolioSectionProps {
  language: 'en' | 'es';
}

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ language }) => {
  const basicWebsites = projects.filter(project => project.category === 'basic');
  const advancedProjects = projects.filter(project => project.category === 'advanced'); // Filtrar proyectos avanzados

  return (
    <section
      id="portfolio"
      className="py-20 bg-gradient-to-b from-orange-100 to-blue-200"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <h2 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-12 md:mb-16 leading-tight">
          {language === "en" ? "My Portfolio" : "Mi Portafolio"}
        </h2>
        <p className="text-xl text-center text-gray-700 mb-12 max-w-3xl mx-auto">
          {language === "en" ? "A showcase of my recent work, highlighting responsive design, impeccable UX/UI, and advanced technical implementations." : "Una muestra de mi trabajo reciente, destacando el diseño responsivo, una UX/UI impecable e implementaciones técnicas avanzadas."}
        </p>

        {/* Sección de Proyectos Avanzados */}
        {advancedProjects.length > 0 && ( // Solo muestra la sección si hay proyectos avanzados
          <div className="mb-20">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center relative">
              {language === "en" ? "Web Apps & Custom Solutions" : "Aplicaciones Web y Soluciones a Medida"}
              <span className="block w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></span> {/* Línea decorativa distintiva */}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {advancedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 border-b-4 border-orange-500 group" // Border de color distinto
                >
                  <div className="relative">
                    <img
                      src={project.imageUrl}
                      alt={project.title[language]}
                      width={1000}
                      height={700}
                      className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
                      <Link
                        href={project.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-orange-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-500 transition-all duration-300 transform hover:scale-105" // Botón con colores invertidos
                      >
                        {language === "en" ? "View Project" : "Ver Proyecto"} <FaExternalLinkAlt className="ml-2 text-sm" />
                      </Link>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">
                      {project.title[language]}
                    </h4>
                    <Link
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-blue-500 text-sm font-semibold mb-4 inline-flex items-center transition-colors duration-200"
                    >
                      {project.domainName} <FaExternalLinkAlt className="ml-1 text-xs" />
                    </Link>
                    <p className="text-gray-700 text-base flex-1 mb-4">
                      {project.description[language]}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <p className="text-sm font-semibold text-gray-600 mb-2">
                        {language === "en" ? "Key Skills:" : "Habilidades Clave:"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map(skill => (
                          <span
                            key={skill}
                            className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center" // Skills con colores distintivos
                          >
                            {getSkillIcon(skill)}
                            {skill.charAt(0).toUpperCase() + skill.slice(1).replace(/-(.)/g, (match, p1) => ' ' + p1.toUpperCase())}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        ---

        {/* Sección de Sitios Web Básicos (ya existente) */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center relative">
            {language === "en" ? "Websites & Landing Pages" : "Sitios Web y Landing Pages"}
            <span className="block w-24 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {basicWebsites.map((project) => (
              <div
                key={project.id}
                className="bg-white/90 rounded-2xl shadow-xl overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 border-b-4 border-blue-500 group"
              >
                <div className="relative">
                  <img
                    src={project.imageUrl}
                    alt={project.title[language]}
                    width={1000}
                    height={700}
                    className="w-full h-64 object-cover transition-opacity duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
                    <Link
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-500 transition-all duration-300 transform hover:scale-105"
                    >
                      {language === "en" ? "View Project" : "Ver Proyecto"} <FaExternalLinkAlt className="ml-2 text-sm" />
                    </Link>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">
                    {project.title[language]}
                  </h4>
                  <Link
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-orange-500 text-sm font-semibold mb-4 inline-flex items-center transition-colors duration-200"
                  >
                    {project.domainName} <FaExternalLinkAlt className="ml-1 text-xs" />
                  </Link>
                  <p className="text-gray-700 text-base flex-1 mb-4">
                    {project.description[language]}
                  </p>
                  <div className="mt-auto pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      {language === "en" ? "Key Skills:" : "Habilidades Clave:"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map(skill => (
                        <span
                          key={skill}
                          className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center"
                        >
                          {getSkillIcon(skill)}
                          {skill.charAt(0).toUpperCase() + skill.slice(1).replace(/-(.)/g, (match, p1) => ' ' + p1.toUpperCase())}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;