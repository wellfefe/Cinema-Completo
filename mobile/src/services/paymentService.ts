import { PaymentMethod } from '../types/ticket';

export async function simulatePayment(total: number, method: PaymentMethod) {
  await new Promise(resolve => setTimeout(resolve, 900));

  if (total <= 0) {
    return {
      approved: false,
      method,
      message: 'Valor invalido para pagamento.',
    };
  }

  return {
    approved: true,
    method,
    message: 'Pagamento aprovado.',
  };
}
