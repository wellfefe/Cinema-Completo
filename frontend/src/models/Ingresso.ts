export interface Ingresso {
  id: number;
  valorInteira: number;
  valorMeia: number;
  sessaoId: number;
  pedidoId?: number | null;
  sessao?: {
    id: number;
    horarioExibicao: string;
    cinemaId: number;
    filmeId: number;
    salaId: number;
    filme?: {
      id: number;
      titulo: string;
    };
    sala?: {
      id: number;
      numero: number;
    };
  };
}