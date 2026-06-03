export interface Filme {
  id: number;
  titulo: string;
  sinopse: string;
  classificacao: string;
  duracao: number;
  elenco: string;
  genero: string;
  posterUrl?: string;
  dataInicioExibicao: string;
  dataFinalExibicao: string;
  cinemaId: number;
}
