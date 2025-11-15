'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { Client } from '@/lib/types';

export default function Clients() {
  const { t } = useLanguage();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClients() {
      try {
        const response = await fetch('/api/clients');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Failed to fetch clients');
        }
      } catch (error) {
        console.error('Error loading clients:', error);
      } finally {
        setLoading(false);
      }
    }

    loadClients();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-12"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-300 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t.clientsTitle}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
          {clients.map((client) => (
            <div
              key={client._id}
              className="group p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 w-full h-24 flex items-center justify-center"
            >
              {/* Use actual logos when available, fallback to company names */}
              {client.logo ? (
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-12 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-600 group-hover:text-gray-900 transition-colors">
                    {client.name}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Note about MongoDB integration */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 italic">
            * Los logos de clientes se cargan dinámicamente desde MongoDB
          </p>
        </div>
      </div>
    </section>
  );
}