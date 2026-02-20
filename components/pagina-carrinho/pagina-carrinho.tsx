"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const initialCart = [
  {
    id: 1,
    name: "Camisa Linkin Park",
    price: 64.90,
    quantity: 1,
    image: "/imagens/produto-1.jpg",
  },
  {
    id: 2,
    name: "Moletom Metallica",
    price: 139.90,
    quantity: 1,
    image: "/imagens/produto-2.jpg",
  },
];

export default function PaginaCarrinho() {
  const [cartItems, setCartItems] = useState(initialCart);


  const handleIncrease = (id: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleDecrease = (id: number) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  const handleRemove = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const frete = cartItems.length > 0 ? 12.99 : 0;
  const total = subtotal + frete;

  return (
    <main className="min-h-[75vh] bg-rock-dark pt-12 pb-20 px-4">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* título */}
        <h1 className="text-3xl md:text-4xl font-black text-white tracking-wider mb-8">
          Seu Carrinho
        </h1>

        {cartItems.length === 0 ? (
          // carrinho vazio
          <div className="flex flex-col items-center justify-center bg-[#1A1A1A] rounded-2xl p-12 text-center border border-white/5 shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500 mb-6"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            <h2 className="text-2xl font-bold text-white mb-4">Seu carrinho está vazio!</h2>
            <p className="text-gray-400 mb-8 max-w-md">Parece que você ainda não adicionou nenhum item da Caverna do Rock ao seu carrinho.</p>
            <Link href="/" className="bg-rock-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
              Continuar Comprando
            </Link>
          </div>
        ) : (
          // grid: itens // resumo
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* lista de produtos (esquerda) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-[#1A1A1A] p-4 sm:p-6 rounded-2xl border border-white/5 shadow-lg gap-6">
                  
                  {/* foto e infos*/}
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="relative w-24 h-24 bg-white rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-white font-extrabold text-[18px]">{item.name}</h3>
                      <p className="text-rock-red font-black text-[20px] mt-1">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>

                  {/* Controles de Quantidade e Excluir */}
                  <div className="flex items-center justify-between w-full sm:w-auto gap-8">
                    
                    {/* Botões +/- */}
                    <div className="flex items-center bg-zinc-900 rounded-lg border border-zinc-800 p-1">
                      <button 
                        onClick={() => handleDecrease(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-white font-bold">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleIncrease(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-white hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* Lixeira */}
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-500 hover:text-rock-red transition-colors p-2 cursor-pointer"
                      title="Remover produto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* Resumo do Pedido (Direita) */}
            <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl h-fit sticky top-28">
              <h2 className="text-2xl font-black text-white mb-6">Resumo do Pedido</h2>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex justify-between text-gray-300 font-medium text-[16px]">
                  <span>Subtotal</span>
                  <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                </div>
                <div className="flex justify-between text-gray-300 font-medium text-[16px]">
                  <span>Frete</span>
                  <span>R$ {frete.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>

              <div className="w-full h-[1px] bg-white/10 mb-6"></div>

              <div className="flex justify-between text-white font-black text-[22px] mb-8">
                <span>Total</span>
                <span className="text-rock-red">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>

              <button className="w-full bg-rock-red hover:bg-red-700 text-white font-extrabold text-[18px] py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-rock-red/20 uppercase tracking-wide cursor-pointer">
                Finalizar Compra
              </button>
              
              <Link href="/" className="block text-center mt-6 text-[16px] text-gray-400 hover:text-white underline transition-colors">
                Continuar comprando
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}