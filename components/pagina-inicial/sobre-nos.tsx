export default function SobreNos() {
  return (
    <section className="w-full py-16 px-4 bg-[#111] relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
           }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-[35px] font-bold text-center mb-12 text-white">
          Sobre Nós
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-rock-red p-8 rounded-lg flex flex-col items-center text-center h-full hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 font-mono">
              Missão
            </h3>
            <p className="text-white text-sm md:text-base leading-relaxed mb-8 flex-grow">
              Proporcionar aos fãs de rock e metal produtos de alta qualidade
              que expressem sua paixão através da música.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
          </div>

          <div className="bg-rock-red p-8 rounded-lg flex flex-col items-center text-center h-full hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 font-mono">
              Visão
            </h3>
            <p className="text-white text-sm md:text-base leading-relaxed mb-8 flex-grow">
              Ser a principal referência em produtos de rock e metal no Brasil,
              oferecendo experiências únicas aos nossos clientes.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>

          <div className="bg-rock-red p-8 rounded-lg flex flex-col items-center text-center h-full hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 font-mono">
              Valores
            </h3>
            <p className="text-white text-sm md:text-base leading-relaxed mb-8 flex-grow">
              Autenticidade, qualidade superior e respeito pela cultura do
              rock/metal são os pilares que guiam nosso trabalho.
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}