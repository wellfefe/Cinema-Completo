export interface LancheCombo {
  id: number;
  nome: string;
  valorUnitario: number;
  qtdUnidade: number;
  subtotal: number;
  pedidoId?: number | null;
}