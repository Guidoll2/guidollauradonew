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
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isCheckoutOpen) return null;

  const totalPrice = items.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          adminEmail: 'guido.llaurado@gmail.com'
        })
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl scrollbar-hide">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-sky-400 to-blue-500 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="text-2xl hover:scale-110 transition-transform"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          {success ? (
            <div className="text-center space-y-4 py-12">
              <div className="text-6xl">✓</div>
              <h3 className="text-2xl font-bold text-green-600">¡Pedido enviado!</h3>
              <p className="text-gray-600">Revisa tu email para más detalles</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Items Summary */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 max-h-48 overflow-y-auto">
                <h3 className="font-semibold text-gray-900">Resumen del pedido:</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-700">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold text-gray-900">
                      {(item.priceNumber * item.quantity).toFixed(2)}€
                    </span>
                  </div>
                ))}
                <div className="border-t pt-3 flex justify-between font-bold text-gray-900">
                  <span>Total:</span>
                  <span className="text-lg text-salmon">{totalPrice.toFixed(2)}€</span>
                </div>
              </div>

              {/* Form Fields */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-400 placeholder-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-400 placeholder-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Apellido
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-400 placeholder-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 123 456 789"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-400 placeholder-gray-700"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !formData.email}
                className="w-full py-3 px-6 bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-500 hover:to-blue-600 text-white font-semibold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:shadow-blue-500/50 active:scale-95"
              >
                {loading ? 'Procesando...' : 'Confirmar pedido'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
