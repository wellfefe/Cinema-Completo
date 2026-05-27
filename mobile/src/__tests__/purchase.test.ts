import { describe, expect, it } from 'vitest';
import { toggleSeatSelection } from '../services/seatService';
import { calculatePurchaseTotal } from '../services/ticketService';
import { buildTicket } from '../services/ticketFactory';
import { validateRegisterForm } from '../services/validationService';
import { mockMovie, mockSession } from '../data/mockData';

describe('purchase rules', () => {
  it('blocks occupied seats and toggles free seats', () => {
    expect(toggleSeatSelection([], 'A1', ['A1'])).toEqual([]);
    expect(toggleSeatSelection([], 'A2', ['A1'])).toEqual(['A2']);
    expect(toggleSeatSelection(['A2'], 'A2', ['A1'])).toEqual([]);
  });

  it('calculates ticket and snack total', () => {
    const total = calculatePurchaseTotal({
      seatCount: 2,
      ticketPrice: 28,
      snacks: [
        { id: 'combo-1', name: 'Combo casal', description: 'Pipoca e bebidas', price: 35, quantity: 1 },
        { id: 'refri', name: 'Refrigerante', description: '500ml', price: 9, quantity: 2 },
      ],
    });

    expect(total).toBe(109);
  });

  it('builds an offline pending ticket when not connected', () => {
    const ticket = buildTicket({
      userId: 'user-1',
      userName: 'Aluno Teste',
      movie: mockMovie,
      session: mockSession,
      seats: ['B1', 'B2'],
      snacks: [],
      paymentMethod: 'pix',
      total: 56,
      isConnected: false,
      now: new Date('2026-05-27T12:00:00.000Z'),
    });

    expect(ticket.syncStatus).toBe('pending_sync');
    expect(ticket.purchaseCode).toContain('COMPRA-');
    expect(ticket.validationCode).toContain('VALIDA-');
  });

  it('validates register form fields', () => {
    const result = validateRegisterForm({
      name: '',
      email: 'email-invalido',
      password: '123',
      confirmPassword: '456',
      phone: '',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.errors.name).toBe('Nome obrigatorio.');
      expect(result.errors.email).toBe('E-mail invalido.');
      expect(result.errors.password).toBe('A senha deve ter pelo menos 6 caracteres.');
      expect(result.errors.confirmPassword).toBe('As senhas nao conferem.');
    }
  });
});
