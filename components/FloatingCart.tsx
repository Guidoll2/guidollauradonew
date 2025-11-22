'use client';

import { useCart } from '@/lib/cart-context';

export default function FloatingCart() {
  const { totalItems, setIsCheckoutOpen, isCheckoutOpen } = useCart();

  return (
    <button
      onClick={() => setIsCheckoutOpen(true)}
      className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-[#67e2f0] to-[#ffbba8] text-white rounded-full shadow-2xl flex items-center justify-center text-2xl font-bold hover:shadow-[0_0_30px_rgba(103,226,240,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 z-40"
      title="Carrito de compras"
    >
      {totalItems > 0 ? (
        <div className="relative">
          <span>🛒</span>
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        </div>
      ) : (
        <span>🛒</span>
      )}
    </button>
  );
}
