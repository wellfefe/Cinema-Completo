export function toggleSeatSelection(
  selectedSeats: string[],
  seat: string,
  occupiedSeats: string[],
) {
  if (occupiedSeats.includes(seat)) {
    return selectedSeats;
  }

  if (selectedSeats.includes(seat)) {
    return selectedSeats.filter(selectedSeat => selectedSeat !== seat);
  }

  return [...selectedSeats, seat];
}
