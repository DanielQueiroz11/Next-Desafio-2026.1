export default function PaginaContato() {
  return (
    <main className="min-h-screen bg-rock-dark text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-[40px] font-extrabold text-center mb-12 text-white">
          Contato
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna da esquerda: formulário */}
          <div className="border border-white/10 rounded-lg p-8 bg-[#121212]">
            <h2 className="text-xl font-bold text-center mb-8">
              Envie uma mensagem
            </h2>

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
                className="w-full bg-rock-red hover:bg-red-700 text-white font-bold py-3 rounded-full mt-2 transition-all duration-300 hover:scale-103"
              >
                Enviar mensagem
              </button>
            </form>
          </div>

          {/* Coluna da direita*/}
          <div className="flex flex-col gap-8">
            {/* 1° bloco: informações de contato */}
            <div className="border border-white/10 rounded-lg p-8 bg-[#121212] flex-1">
              <h2 className="text-xl font-bold text-center mb-8">
                Informações de contato
              </h2>

              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">E-mail</h3>
                    <p className="text-sm text-gray-300">
                      cavernadorock@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Telefone</h3>
                    <p className="text-sm text-gray-300">(32) 98893-2957</p>
                    <p className="text-sm text-gray-300">(32) 3428-6098</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-geo-alt-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Endereço</h3>
                    <p className="text-sm text-gray-300">
                      Rua Barão de Cataguases, 4789 - Santa Helena
                    </p>
                    <p className="text-sm text-gray-300">
                      Juiz de Fora - MG, 36015-370
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 2° bloco: redes sociais */}
            <div className="border border-white/10 rounded-lg p-8 bg-[#121212] flex-1">
              <h2 className="text-xl font-bold text-center mb-4">
                Redes sociais
              </h2>
              <p className="text-sm text-gray-300 mb-8">
                Siga-nos nas redes sociais para ficar por dentro das{" "}
                <span className="text-rock-red font-bold">
                  novidades e promoções
                </span>
                .
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  <span className="font-bold text-sm">Instagram</span>
                </div>

                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="font-bold text-sm">Facebook</span>
                </div>

                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-whatsapp"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                  </svg>
                  <span className="font-bold text-sm">Whatsapp</span>
                </div>

                <div className="flex items-center gap-3 cursor-pointer hover:text-rock-red transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-tiktok"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3V0Z" />
                  </svg>
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
