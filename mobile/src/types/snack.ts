export type SnackCombo = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
};

export type SnackSelection = SnackCombo & {
  quantity: number;
};
