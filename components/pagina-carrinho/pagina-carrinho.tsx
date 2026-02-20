"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialCart = [
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

export default function PaginaCarrinho() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [showModal, setShowModal] = useState(false); 
  
  const router = useRouter();

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

  const handleFinalizarCompra = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push("/");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const frete = cartItems.length > 0 ? 12.99 : 0;
  const total = subtotal + frete;

  return (
    <main className="min-h-[75vh] bg-rock-dark pt-12 pb-20 px-4 relative">
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
            <Link href="/produtos" className="bg-rock-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg">
              Continuar Comprando
            </Link>
          </div>
        ) : (
          // grid: itens
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* lista de produtos (esquerda) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between bg-black/40 backdrop-blur-sm p-5 sm:p-6 rounded-2xl border border-white/10 shadow-xl gap-6">
                  
                  {/* foto e infos*/}
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-xl overflow-hidden shrink-0 shadow-inner">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="text-white font-bold text-[20px] tracking-wide">{item.name}</h3>
                      <p className="text-gray-400 text-sm font-medium">Tamanho: <span className="text-white">{item.size}</span></p>
                      <p className="text-rock-red font-black text-2xl mt-1">
                        R$ {item.price.toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-8 border-t border-white/5 sm:border-t-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                    
                    {/* botões +/- */}
                    <div className="flex items-center gap-4 text-xl font-bold">
                      <button 
                        onClick={() => handleDecrease(item.id)}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-rock-red text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-white">{item.quantity}</span>
                      <button 
                        onClick={() => handleIncrease(item.id)}
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-rock-red text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* lixeira */}
                    <button 
                      onClick={() => handleRemove(item.id)}
                      className="text-gray-500 hover:text-white hover:bg-rock-red transition-all p-3 rounded-full bg-white/5 cursor-pointer"
                      title="Remover produto"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {/* resumo do pedido (direita) */}
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

              <button 
                onClick={handleFinalizarCompra}
                className="w-full bg-rock-red hover:bg-red-700 text-white font-extrabold text-[18px] py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-rock-red/20 uppercase tracking-wide cursor-pointer"
              >
                Finalizar Compra
              </button>
              
              <Link href="/produtos" className="block text-center mt-6 text-[16px] text-gray-400 hover:text-white underline transition-colors">
                Continuar comprando
              </Link>
            </div>

          </div>
        )}

      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
          <div className="bg-[#1A1A1A] border border-white/10 p-8 rounded-3xl shadow-2xl max-w-sm w-full flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-rock-red/20 text-rock-red rounded-full flex items-center justify-center mb-6 border border-rock-red/30">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            
            <h3 className="text-3xl font-black text-white mb-3 tracking-wide">Tudo certo!</h3>
            <p className="text-gray-400 text-[16px] mb-8 leading-relaxed">
              Seu pedido foi confirmado. Prepare-se para vestir o som que você ama! 🤘
            </p>
            
            <button 
              onClick={handleCloseModal}
              className="w-full bg-rock-red hover:bg-red-700 text-white font-bold text-[18px] py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg shadow-rock-red/20 cursor-pointer"
            >
              Voltar para a Home
            </button>
          </div>
        </div>
      )}

    </main>
  );
}