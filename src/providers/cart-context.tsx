"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
};

// estado inicial (mock :) )
const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Camisa Linkin Park",
    price: 64.90,
    quantity: 1,
    size: "M",
    image: "/imagens/produto-1.jpg",
  },
  {
    id: 2,
    name: "Moletom Metallica",
    price: 139.90,
    quantity: 1,
    size: "GG",
    image: "/imagens/produto-2.jpg",
  },
];

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void; 
  cartCount: number; 
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// gerencia o estado do carrinho e distribui as funções para os filhos
export function CartProvider({ children }: { children: ReactNode }) {
  // armazena a lista de produtos no carrinho do usuário
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCart);

  // adicionar novos produtos ou somar a quantidade se já existirem no carrinho
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      // verifica se o produto (mesmo id) já foi adicionado antes
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        // se existir, atualiza apenas a quantidade daquele item, mantendo os outros inalterados
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      // se não existir, adiciona o objeto do item novo no final do array do carrinho
      return [...prev, item];
    });
  };

  // remover um item específico do carrinho filtrando-o para fora da lista através do id
  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // incrementar a quantidade de um item diretamente na tela do carrinho
  const increaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // decrementar a quantidade, impedindo via condição que o valor fique menor que 1
  const decreaseQuantity = (id: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // esvaziar completamente o carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // cálculo da quantidade total de itens para exibir na bolinha da navbar
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}