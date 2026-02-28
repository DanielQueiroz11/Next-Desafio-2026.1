"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Produto = {
  id: number;
  title: string;
  price: number;
  description: string;
  fullDescription: string | null;
  image: string | null;
  ordem: number;
};

export default function ModalDuplicarProduto({
  produto,
  onClose,
}: {
  produto: Produto;
  onClose: () => void;
}) {
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleDuplicar = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/produtos/duplicar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          produtoId: produto.id,
          quantidade: quantidade,
        }),
      });

      if (response.ok) {
        router.refresh(); 
        onClose();
      } else {
        alert("Erro ao duplicar produto.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro na requisição.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#2A2A2A] rounded-2xl w-full max-w-md p-6 shadow-2xl border border-white/10 relative">
        <h2 className="text-2xl font-black text-white mb-2 uppercase">
          Duplicar Produto
        </h2>
        <p className="text-gray-300 mb-6 text-sm">
          Quantas cópias de <span className="font-bold text-rock-red">{produto.title}</span> você deseja criar?
        </p>

        <div className="mb-8">
          <label className="block text-white font-bold mb-2 text-sm">
            Quantidade de cópias
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-full bg-[#1A1A1A] text-white border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-rock-red focus:ring-1 focus:ring-rock-red"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg font-bold text-white bg-transparent hover:bg-white/10 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleDuplicar}
            disabled={isLoading || quantidade < 1}
            className="px-5 py-2.5 rounded-lg font-bold text-white bg-rock-red hover:bg-red-700 transition-colors shadow-lg disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? "Duplicando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
}