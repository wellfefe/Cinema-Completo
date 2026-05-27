import { api } from './client';
import { mockSnacks } from '../data/mockData';
import { SnackCombo } from '../types/snack';

type BackendSnack = {
  id: number;
  nome: string;
  valorUnitario: number;
};

export async function getSnacksApi(): Promise<SnackCombo[]> {
  try {
    const { data } = await api.get<BackendSnack[]>('/lanche-combo');
    if (data.length === 0) {
      return mockSnacks;
    }

    return data.map(item => ({
      id: String(item.id),
      name: item.nome,
      description: 'Combo disponivel no cinema.',
      price: item.valorUnitario,
    }));
  } catch {
    return mockSnacks;
  }
}
