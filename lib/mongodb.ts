import { MongoClient } from 'mongodb';
import { Project, Client, Testimonial } from './types';

// MongoDB connection configuration
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'guidolldev';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the connection
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new client
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function getDatabase() {
  const client = await clientPromise;
  return client.db(dbName);
}

// Projects functions
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const db = await getDatabase();
    const projects = await db
      .collection<Project>('projects')
      .find({ featured: true })
      .sort({ order: 1 })
      .limit(3)
      .toArray();
    
    return projects;
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    // Return fallback data in case of database error
    return getMockProjects();
  }
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    const db = await getDatabase();
    const projects = await db
      .collection<Project>('projects')
      .find({})
      .sort({ order: 1 })
      .toArray();
    
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return getMockProjects();
  }
}

// Clients functions
export async function getFeaturedClients(): Promise<Client[]> {
  try {
    const db = await getDatabase();
    const clients = await db
      .collection<Client>('clients')
      .find({ featured: true })
      .sort({ order: 1 })
      .toArray();
    
    return clients;
  } catch (error) {
    console.error('Error fetching featured clients:', error);
    return getMockClients();
  }
}

// Testimonials functions
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const db = await getDatabase();
    const testimonials = await db
      .collection<Testimonial>('testimonials')
      .find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(3)
      .toArray();
    
    return testimonials;
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return getMockTestimonials();
  }
}

// Mock data for development/fallback
function getMockProjects(): Project[] {
  return [
    {
      _id: '1',
      title: {
        es: 'Plataforma E-commerce Premium',
        ca: 'Plataforma E-commerce Premium',
        en: 'Premium E-commerce Platform'
      },
      description: {
        es: 'Desarrollo completo de tienda online con integración de pagos y gestión avanzada',
        ca: 'Desenvolupament complet de botiga online amb integració de pagaments i gestió avançada',
        en: 'Complete online store development with payment integration and advanced management'
      },
      image: '/projects/ecommerce.jpg',
      technologies: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
      liveUrl: 'https://example-ecommerce.com',
      featured: true,
      order: 1,
      createdAt: new Date()
    },
    {
      _id: '2',
      title: {
        es: 'App Corporativa SaaS',
        ca: 'App Corporativa SaaS',
        en: 'Corporate SaaS App'
      },
      description: {
        es: 'Aplicación web empresarial con dashboard avanzado y analytics en tiempo real',
        ca: 'Aplicació web empresarial amb dashboard avançat i analytics en temps real',
        en: 'Enterprise web application with advanced dashboard and real-time analytics'
      },
      image: '/projects/saas.jpg',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      liveUrl: 'https://example-saas.com',
      featured: true,
      order: 2,
      createdAt: new Date()
    },
    {
      _id: '3',
      title: {
        es: 'Portfolio Interactivo',
        ca: 'Portfolio Interactiu',
        en: 'Interactive Portfolio'
      },
      description: {
        es: 'Sitio web personal con animaciones avanzadas y experiencia de usuario excepcional',
        ca: 'Lloc web personal amb animacions avançades i experiència d\'usuari excepcional',
        en: 'Personal website with advanced animations and exceptional user experience'
      },
      image: '/projects/portfolio.jpg',
      technologies: ['Next.js', 'Framer Motion', 'TailwindCSS'],
      liveUrl: 'https://example-portfolio.com',
      featured: true,
      order: 3,
      createdAt: new Date()
    }
  ];
}

function getMockClients(): Client[] {
  return [
    {
      _id: '1',
      name: 'TechCorp Barcelona',
      logo: '/clients/techcorp.svg',
      website: 'https://techcorp.com',
      featured: true,
      order: 1
    },
    {
      _id: '2',
      name: 'StartupHub',
      logo: '/clients/startuphub.svg',
      website: 'https://startuphub.com',
      featured: true,
      order: 2
    },
    {
      _id: '3',
      name: 'Digital Ventures',
      logo: '/clients/digitalventures.svg',
      website: 'https://digitalventures.com',
      featured: true,
      order: 3
    },
    {
      _id: '4',
      name: 'InnovaCorp',
      logo: '/clients/innovacorp.svg',
      website: 'https://innovacorp.com',
      featured: true,
      order: 4
    }
  ];
}

function getMockTestimonials(): Testimonial[] {
  return [
    {
      _id: '1',
      clientName: 'María García',
      clientCompany: 'TechCorp Barcelona',
      content: {
        es: 'Excepcional trabajo y atención al detalle. Guidoll superó nuestras expectativas.',
        ca: 'Feina excepcional i atenció al detall. Guidoll va superar les nostres expectatives.',
        en: 'Exceptional work and attention to detail. Guidoll exceeded our expectations.'
      },
      rating: 5,
      featured: true,
      createdAt: new Date()
    }
  ];
}