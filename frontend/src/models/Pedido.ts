export interface Pedido {
  id: number;
  qInteira: number;
  qMeia: number;
  valorTotal: number;
  ingressos?: {
    id: number;
    valorInteira: number;
    valorMeia: number;
    sessaoId: number;
    pedidoId?: number | null;
  }[];
  lanches?: {
    id: number;
    nome: string;
    valorUnitario: number;
    qtdUnidade: number;
    subtotal: number;
    pedidoId?: number | null;
  }[];
}