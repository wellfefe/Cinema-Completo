export interface Sessao {
  id: number;
  horarioExibicao: string;
  cinemaId: number;
  filmeId: number;
  salaId: number;
  cinema?: {
    id: number;
    nome: string;
    endereco: string;
  };
  filme?: {
    id: number;
    titulo: string;
    sinopse: string;
    classificacao: string;
    duracao: number;
    elenco: string;
    genero: string;
    dataInicioExibicao: string;
    dataFinalExibicao: string;
    cinemaId: number;
  };
  sala?: {
    id: number;
    numero: number;
    capacidade: number;
    cinemaId: number;
  };
}