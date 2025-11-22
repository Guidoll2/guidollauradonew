'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { useLanguage } from '@/lib/language-context';

export default function CheckoutModal() {
  const { items, isCheckoutOpen, setIsCheckoutOpen, clearCart } = useCart();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastname: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const totalPrice = items.reduce(
    (sum, item) => sum + item.priceNumber * item.quantity,
    0
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerEmail: formData.email,
          customerName: formData.name || 'Cliente',
          customerLastname: formData.lastname,
          customerPhone: formData.phone,
          items: items,
          totalPrice: totalPrice,
          adminEmail: 'guido.llaurado@gmail.com',
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setIsCheckoutOpen(false);
          setSuccess(false);
          clearCart();
          setFormData({ email: '', name: '', lastname: '', phone: '' });
        }, 2000);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Error al enviar el pedido. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-[0_24px_80px_rgba(15,23,42,0.25)]">
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/40 bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 px-6 py-4 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] opacity-80">
              Resumen y contacto
            </p>
            <h2 className="text-xl font-semibold leading-tight">
              Finaliza tu solicitud
            </h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur hover:bg-white/20 transition"
            aria-label="Cerrar checkout"
          >
            ✕
          </button>
        </div>

        <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-64px)] scrollbar-hide">
          {success ? (
            <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                <span className="text-3xl text-emerald-600">✓</span>
              </div>
              <h3 className="text-2xl font-semibold text-slate-900">
                ¡Pedido enviado!
              </h3>
              <p className="max-w-md text-sm text-slate-600">
                He recibido tu solicitud. En breve me pondré en contacto contigo
                para coordinar los próximos pasos.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid gap-8 md:grid-cols-[minmax(0,1.05fr)_minmax(0,1.25fr)]"
            >
              {/* Columna izquierda: Resumen */}
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-50/90 p-5 ring-1 ring-slate-100">
                  <div className="mb-4 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      Resumen del pedido
                    </h3>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500 ring-1 ring-slate-200">
                      {items.length} {items.length === 1 ? 'servicio' : 'servicios'}
                    </span>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1 text-sm">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-slate-700"
                      >
                        <span className="truncate">
                          {item.name} <span className="text-slate-400">x{item.quantity}</span>
                        </span>
                        <span className="font-semibold text-slate-900">
                          {(item.priceNumber * item.quantity).toFixed(2)}€
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-slate-200 pt-3">
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>Total estimado</span>
                      <span className="text-lg text-salmon">
                        {totalPrice.toFixed(2)}€
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-slate-500">
                      Este importe corresponde al paquete seleccionado. Podrás
                      ajustar detalles y alcances del proyecto antes de confirmar
                      el presupuesto final.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-sky-50 via-cyan-50 to-emerald-50 p-4 text-xs text-slate-600 ring-1 ring-sky-100/60">
                  <p className="font-medium text-slate-800 mb-1">
                    ¿Qué ocurre después?
                  </p>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>Recibirás un email con el resumen de tu solicitud.</li>
                    <li>Te contactaré personalmente para agendar una breve llamada.</li>
                    <li>No se realiza ningún cargo automático en esta etapa.</li>
                  </ul>
                </div>
              </div>

              {/* Columna derecha: Formulario */}
              <div className="space-y-5">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Datos de contacto
                  </h3>
                  <p className="text-xs text-slate-500">
                    Completa tus datos para que pueda enviarte la propuesta y
                    coordinar el inicio del proyecto.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="tu@email.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm shadow-slate-100 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-800">
                        Nombre
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm shadow-slate-100 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-800">
                        Apellido
                      </label>
                      <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Tu apellido"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm shadow-slate-100 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-slate-800">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+34 123 456 789"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm shadow-slate-100 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
                    />
                    <p className="mt-1 text-xs text-slate-500">
                      Solo lo utilizaré para coordinar detalles de tu proyecto.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={loading || !formData.email}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-400 to-cyan-400 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition-all duration-200 hover:from-sky-500 hover:via-sky-500 hover:to-cyan-500 hover:shadow-xl hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="text-base">🔒</span>
                    <span>{loading ? 'Procesando...' : 'Confirmar solicitud'}</span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center">
                    Al enviar este formulario aceptas que me ponga en contacto contigo
                    por email o teléfono para avanzar con la propuesta de trabajo.
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
