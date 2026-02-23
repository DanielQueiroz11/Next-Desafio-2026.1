export type ApiProps = {
  id: number;
  title: string;
  text: string;
}

type ApiResponse = {
  identities: ApiProps[];
  status: number;
}

export async function getIdentities(): Promise<ApiProps[]> {
  try {
    const res = await fetch("https://treinamentoapi.codejr.com.br/api/identities");

    const text = await res.text();

    const data: ApiResponse = JSON.parse(text);
    
    return data.identities;

  } catch (error) {
    console.warn("A API original falhou ou retornou texto puro. Usando dados locais...", error);
    
    return [
      {
        id: 1,
        title: "Missão",
        text: "Proporcionar aos fãs de rock e metal produtos de alta qualidade que expressem sua paixão através da música."
      },
      {
        id: 2,
        title: "Visão",
        text: "Ser a principal referência em produtos de rock e metal no Brasil, oferecendo experiências únicas aos nossos clientes."
      },
      {
        id: 3,
        title: "Valores",
        text: "Autenticidade, qualidade superior e respeito pela cultura do rock/metal são os pilares que guiam nosso trabalho."
      }
    ];
  }
}