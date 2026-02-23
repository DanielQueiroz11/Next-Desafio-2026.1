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
  const res = await fetch("https://treinamentoapi.codejr.com.br/api/identities");

  if(!res.ok){
    throw new Error(`Erro ao fetch data, status: ${res.status}`);
  }

  const data: ApiResponse = await res.json();

  return data.identities;
}