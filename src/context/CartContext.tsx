"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, weight: string, quantity: number) => void;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("taybeen_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from local storage", error);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("taybeen_cart", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Failed to save cart to local storage", error);
      }
    }
  }, [cartItems, isInitialized]);

  const getWeightInGrams = (weightStr: string): number => {
    if (!weightStr) return 0;
    const clean = weightStr.toLowerCase().replace(/\s+/g, "");
    const value = parseFloat(clean);
    if (isNaN(value)) return 0;
    if (clean.includes("kg")) {
      return value * 1000;
    }
    return value;
  };

  const getPriceForWeight = (option: string, baseWeight: string, basePrice: number) => {
    const optionWeight = getWeightInGrams(option);
    const baseWeightInGrams = getWeightInGrams(baseWeight);
    if (optionWeight === 0 || baseWeightInGrams === 0) return basePrice;

    const ratio = optionWeight / baseWeightInGrams;
    return Math.round(basePrice * ratio);
  };

  const addToCart = (product: Product, weight: string, quantity: number) => {
    const priceAtSelection = getPriceForWeight(weight, product.weight, product.price);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight === weight
      );

      if (existingItemIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        return [...prevItems, { product, selectedWeight: weight, quantity, priceAtSelection }];
      }
    });
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.selectedWeight === weight))
    );
  };

  const updateQuantity = (productId: string, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.selectedWeight === weight
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
