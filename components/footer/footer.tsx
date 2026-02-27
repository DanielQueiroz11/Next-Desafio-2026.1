import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-rock-dark text-white py-5 border-t border-white/10">
      <div className="w-full max-w-[1400px] 2xl:max-w-[1600px] mx-auto px-6 md:px-10 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-8 min-[1920px]:gap-20 items-center text-center md:text-left">
        {/* logo */}
        <div className="flex justify-center md:order-2 pb-2">
          <Link
            href="/"
            className="cursor-pointer transition-all duration-300 hover:scale-105 will-change-transform"
          >
            <Image
              src="/imagens/logo.png"
              alt="Logo Caverna do Rock"
              width={275}
              height={150}
              className="object-contain w-[200px] md:w-[150px] lg:w-[275px] min-[1920px]:w-[320px]"
            />
          </Link>
        </div>

        {/* redes sociais */}
        <div className="flex flex-col items-center md:items-start gap-4 md:order-1">
          <Link
            href="https://linktr.ee/codejr"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <h3 className="font-bold text-lg md:text-base lg:text-lg min-[1920px]:text-xl tracking-wider hover:text-rock-red transition-colors cursor-pointer">
              Redes Sociais
            </h3>
          </Link>
          <div className="flex gap-4 md:gap-3 lg:gap-4 min-[1920px]:gap-6">
            <Link
              href="https://www.instagram.com/codejr"
              className="hover:text-rock-red transition-colors md:scale-90 lg:scale-100 min-[1920px]:scale-125"
            >
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
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </Link>
            <a
              href="https://www.codejr.com.br/"
              className="hover:text-rock-red transition-colors md:scale-90 lg:scale-100 min-[1920px]:scale-125"
            >
              <span className="sr-only">WhatsApp</span>
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
            </a>
            <Link
              href="https://www.facebook.com/codeempresajunior"
              className="hover:text-rock-red transition-colors md:scale-90 lg:scale-100 min-[1920px]:scale-125"
            >
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
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </Link>
            <Link
              href="https://www.linkedin.com/company/codejr"
              className="hover:text-rock-red transition-colors md:scale-90 lg:scale-100 min-[1920px]:scale-125"
            >
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
            </Link>
          </div>

          {/* copyright PC */}
          <div className="hidden md:flex flex-col text-xs md:text-[10px] lg:text-xs min-[1920px]:text-sm text-gray-400 mt-4 min-[1920px]:mt-6 font-mono text-left">
            <p>© 2026 Caverna do Rock. Todos os direitos reservados.</p>
            <div className="flex gap-3 mt-1">
              <Link
                href="https://help.instagram.com/581066165581870/?locale=pt_BR"
                className="hover:text-white transition-colors"
              >
                Termos de Uso
              </Link>
              <span>|</span>
              <Link
                href="https://help.instagram.com/155833707900388"
                className="hover:text-white transition-colors"
              >
                Política de Dados
              </Link>
            </div>
          </div>
        </div>

        {/* contato */}
        <div className="flex flex-col items-center md:items-end gap-4 md:order-3">
          <Link href="/contato" className="w-full text-center md:text-right">
            <h3 className="font-bold text-lg md:text-base lg:text-lg min-[1920px]:text-xl tracking-wider hover:text-rock-red transition-colors cursor-pointer">
              Contato
            </h3>
          </Link>

          <div className="flex flex-col gap-3 min-[1920px]:gap-4 text-sm md:text-xs lg:text-sm min-[1920px]:text-base text-center md:text-right w-full">
            <div className="flex items-center justify-center md:justify-end gap-2 min-[1920px]:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 min-[1920px]:w-5 min-[1920px]:h-5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>(32) 98893-2957</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 min-[1920px]:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 min-[1920px]:w-5 min-[1920px]:h-5"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span>(32) 93988-7592</span>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 min-[1920px]:gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4 min-[1920px]:w-5 min-[1920px]:h-5"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <span>cavernadorock@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* copyright mobile */}
      <div className="md:hidden max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-white/5">
        <div className="flex flex-col items-center text-xs text-gray-500 font-mono text-center">
          <p>© 2026 Caverna do Rock. Todos os direitos reservados.</p>
          <div className="flex gap-2 mt-2">
            <Link href="#" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
