// context/CartContext.tsx (Ejemplo con Context API)
'use client'; // Esto es importante para Context API en el App Router

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Service } from '../components/services'; // Tu tipo de servicio

interface CartItem extends Service {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (service: Service) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: (currency: 'USD' | 'ARS') => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (service: Service) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === service.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...service, quantity: 1 }];
    });
  };

  const removeFromCart = (serviceId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== serviceId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = (currency: 'USD' | 'ARS') => {
    return cartItems.reduce((total, item) => {
      return total + item.quantity * (currency === 'USD' ? item.priceUSD : item.priceARS);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};