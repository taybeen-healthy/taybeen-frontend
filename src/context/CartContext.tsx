"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, CartItem } from "@/types";
import { getWeightInGrams } from "@/lib/utils";
import { OrderLimitModal, AttemptedOrderInfo } from "@/components/user/cart/OrderLimitModal";

const MAX_ORDER_WEIGHT_GRAMS = 2000;

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  isOrderLimitModalOpen: boolean;
  setIsOrderLimitModalOpen: (isOpen: boolean) => void;
  addToCart: (product: Product, weight: string, quantity: number) => boolean;
  removeFromCart: (productId: string, weight: string) => void;
  updateQuantity: (productId: string, weight: string, quantity: number) => boolean;
  clearCart: () => void;
  cartCount: number;
  totalWeightGrams: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderLimitModalOpen, setIsOrderLimitModalOpen] = useState(false);
  const [attemptedOrderInfo, setAttemptedOrderInfo] = useState<AttemptedOrderInfo | undefined>(undefined);
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

  const calculateTotalWeightGrams = (items: CartItem[]): number => {
    return items.reduce((acc, item) => {
      const itemWeight = getWeightInGrams(item.selectedWeight || item.product.weight);
      return acc + itemWeight * item.quantity;
    }, 0);
  };

  const totalWeightGrams = calculateTotalWeightGrams(cartItems);

  const getPriceForWeight = (option: string, baseWeight: string, basePrice: number) => {
    const optionWeight = getWeightInGrams(option);
    const baseWeightInGrams = getWeightInGrams(baseWeight);
    if (optionWeight === 0 || baseWeightInGrams === 0) return basePrice;

    const ratio = optionWeight / baseWeightInGrams;
    return Math.round(basePrice * ratio);
  };

  const addToCart = (product: Product, weight: string, quantity: number): boolean => {
    const itemWeightInGrams = getWeightInGrams(weight || product.weight);
    const additionalWeight = itemWeightInGrams * quantity;
    const currentTotalWeight = calculateTotalWeightGrams(cartItems);

    if (currentTotalWeight + additionalWeight > MAX_ORDER_WEIGHT_GRAMS) {
      setAttemptedOrderInfo({
        cartItems: cartItems,
        attemptedProduct: product,
        attemptedWeight: weight,
        attemptedQuantity: quantity,
      });
      setIsOrderLimitModalOpen(true);
      return false;
    }

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

    return true;
  };

  const removeFromCart = (productId: string, weight: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.product.id === productId && item.selectedWeight === weight))
    );
  };

  const updateQuantity = (productId: string, weight: string, quantity: number): boolean => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return true;
    }

    const existingItem = cartItems.find(
      (item) => item.product.id === productId && item.selectedWeight === weight
    );

    if (existingItem && quantity > existingItem.quantity) {
      const itemWeightInGrams = getWeightInGrams(weight || existingItem.product.weight);
      const diffQuantity = quantity - existingItem.quantity;
      const additionalWeight = itemWeightInGrams * diffQuantity;
      const currentTotalWeight = calculateTotalWeightGrams(cartItems);

      if (currentTotalWeight + additionalWeight > MAX_ORDER_WEIGHT_GRAMS) {
        setAttemptedOrderInfo({
          cartItems: cartItems,
          attemptedProduct: existingItem.product,
          attemptedWeight: weight,
          attemptedQuantity: quantity,
        });
        setIsOrderLimitModalOpen(true);
        return false;
      }
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId && item.selectedWeight === weight
          ? { ...item, quantity }
          : item
      )
    );

    return true;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        isOrderLimitModalOpen,
        setIsOrderLimitModalOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        totalWeightGrams,
      }}
    >
      {children}
      <OrderLimitModal
        isOpen={isOrderLimitModalOpen}
        onClose={() => setIsOrderLimitModalOpen(false)}
        attemptedInfo={attemptedOrderInfo}
      />
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

