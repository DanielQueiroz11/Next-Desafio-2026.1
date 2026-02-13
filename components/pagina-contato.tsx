export default function PaginaContato() {
  return (
    <main className="min-h-screen bg-rock-dark text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-center mb-16 uppercase tracking-wide">
          Contato
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Coluna da esquerda: formulário */}
          <div className="border border-white/10 rounded-lg p-8 bg-[#121212]">
            <h2 className="text-xl font-bold text-center mb-8">Envie uma mensagem</h2>
            
            <form className="flex flex-col gap-6">
              <div>
                <label className="block text-sm font-bold mb-2">Nome</label>
                <input 
                  type="text" 
                  placeholder="Seu nome completo"
                  className="w-full bg-[#1E1E1E] border border-white/5 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-rock-red transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">E-mail</label>
                <input 
                  type="email" 
                  placeholder="seuemail@exemplo.com"
                  className="w-full bg-[#1E1E1E] border border-white/5 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-rock-red transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Assunto</label>
                <input 
                  type="text" 
                  placeholder="Como podemos ajudar?"
                  className="w-full bg-[#1E1E1E] border border-white/5 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-rock-red transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Mensagem</label>
                <textarea 
                  rows={5}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full bg-[#1E1E1E] border border-white/5 rounded p-3 text-sm text-gray-300 focus:outline-none focus:border-rock-red transition-colors resize-none"
                />
              </div>

              <button 
                type="button"
                className="w-full bg-rock-red hover:bg-red-700 text-white font-bold py-3 rounded-full mt-2 transition-colors"
              >
                Enviar mensagem
              </button>
            </form>
          </div>

          {/* Coluna da direita*/}
          <div className="flex flex-col gap-8">
            
            {/* 1° bloco: informações de contato */}
            <div className="border border-white/10 rounded-lg p-8 bg-[#121212] flex-1">
              <h2 className="text-xl font-bold text-center mb-8">Informações de contato</h2>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">E-mail</h3>
                    <p className="text-sm text-gray-300">cavernadorock@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telefone</h3>
                    <p className="text-sm text-gray-300">(32) 98893-2957</p>
                    <p className="text-sm text-gray-300">(32) 3428-6098</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Endereço</h3>
                    <p className="text-sm text-gray-300">Rua Barão de Cataguases, 4789 - Santa Helena</p>
                    <p className="text-sm text-gray-300">Juiz de Fora - MG, 36015-370</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2° bloco: redes sociais */}
            <div className="border border-white/10 rounded-lg p-8 bg-[#121212] flex-1">
              <h2 className="text-xl font-bold text-center mb-4">Redes sociais</h2>
              <p className="text-sm text-gray-300 mb-8">
                Siga-nos nas redes sociais para ficar por dentro das <span className="text-rock-red font-bold">novidades e promoções</span>.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span className="font-bold text-sm">Instagram</span>
                </div>

                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                  <span className="font-bold text-sm">Facebook</span>
                </div>

                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16.5 16.5c-1-1-2.5-1-4 0-1.5 1-2.5 2.5-2.5 4 0 1 .5 2 1.5 2.5"/><path d="M16 8c-2-2-5-2-7 0"/><path d="M12 12c-1.5-1.5-3.5-1.5-5 0"/></svg>
                  <span className="font-bold text-sm">Whatsapp</span>
                </div>

                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                  <span className="font-bold text-sm">TikTok</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}