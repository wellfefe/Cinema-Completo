import { SnackSelection } from '../types/snack';

type PurchaseTotalInput = {
  seatCount: number;
  ticketPrice: number;
  snacks: SnackSelection[];
};

export function calculatePurchaseTotal({
  seatCount,
  ticketPrice,
  snacks,
}: PurchaseTotalInput) {
  const ticketsTotal = seatCount * ticketPrice;
  const snacksTotal = snacks.reduce(
    (total, snack) => total + snack.price * snack.quantity,
    0,
  );

  return ticketsTotal + snacksTotal;
}
