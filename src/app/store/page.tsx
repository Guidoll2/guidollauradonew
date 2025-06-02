// app/store/page.tsx
import React from 'react';
import { services, Service } from '../../components/services'; // Asegúrate de la ruta correcta
import ServiceCard from '@/components/ServiceCard'; // Asumiendo que crearás este componente

const StorePage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Mis Servicios Profesionales</h1>
      <p className="text-lg text-center mb-8">
        Aquí puedes encontrar los servicios que ofrezco para llevar tus proyectos al siguiente nivel.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service: Service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default StorePage;