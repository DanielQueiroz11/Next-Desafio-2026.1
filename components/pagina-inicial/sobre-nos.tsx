import { ApiProps } from "../../src/lib/api/get-mvv";

type SobreNosProps = {
  identities?: ApiProps[];
};

export default function SobreNos({ identities = [] }: SobreNosProps) {
  
  // DEFESA: Filtra a lista para garantir que não haja títulos duplicados
  const identidadesUnicas = identities.filter(
    (item, index, self) => 
      index === self.findIndex((t) => t.title.toLowerCase() === item.title.toLowerCase())
  );

  const renderIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes("miss")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    }
    
    if (titleLower.includes("vis")) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    }

    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    );
  };

  return (
    <section className="w-full py-16 px-4 bg-[#111] relative">
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`
           }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-[32px] md:text-[38px] font-bold text-center mb-12 text-white">
          Sobre Nós
        </h2>

        {identidadesUnicas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Agora fazemos o map em 'identidadesUnicas' em vez de 'identities' */}
            {identidadesUnicas.map((item) => (
              <div 
                key={item.id} 
                className="bg-rock-red p-8 rounded-lg flex flex-col items-center text-center h-full hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-bold text-white mb-6 font-mono">
                  {item.title}
                </h3>
                <p className="text-white text-sm md:text-base leading-relaxed mb-8 flex-grow">
                  {item.text}
                </p>
                {renderIcon(item.title)}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 py-8">
            <p>Carregando informações da Caverna do Rock...</p>
          </div>
        )}
      </div>
    </section>
  );
}