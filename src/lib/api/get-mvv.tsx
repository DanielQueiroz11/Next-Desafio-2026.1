export type ApiProps = {
  id: number;
  title: string;
  text: string;
}

type ApiResponse = {
  identities: ApiProps[];
  status: number;
}

// busca os dados na API externa e garante o retorno de um array de apiprops
export async function getIdentities(): Promise<ApiProps[]> {
  try {
    const res = await fetch("https://treinamentoapi.codejr.com.br/api/identities");

    // extrai a resposta como texto puro primeiro
    const text = await res.text();

    const data: ApiResponse = JSON.parse(text);
    
    // retorna apenas o array de identidades (MVV) 
    return data.identities;

  } catch (error) {
    // captura o erro se a API original cair ou retornar formato inválido
    console.warn("A API original falhou ou retornou texto puro. Usando dados locais...", error);
    
    // retorna um array mockado com a mesma estrutura da API para o site não quebrar
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