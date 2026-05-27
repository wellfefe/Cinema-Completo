import { Ticket } from '../types/ticket';
import { db } from './database';

type TicketRow = {
  payload: string;
};

const webStorageKey = 'cinema-mobile:tickets';

function readWebTickets(): Ticket[] {
  const raw = globalThis.localStorage?.getItem(webStorageKey);
  return raw ? JSON.parse(raw) : [];
}

function writeWebTickets(tickets: Ticket[]) {
  globalThis.localStorage?.setItem(webStorageKey, JSON.stringify(tickets));
}

export const ticketRepository = {
  save(ticket: Ticket) {
    if (!db) {
      const tickets = readWebTickets();
      const nextTickets = [
        ticket,
        ...tickets.filter(savedTicket => savedTicket.localId !== ticket.localId),
      ];
      writeWebTickets(nextTickets);
      return;
    }

    db.runSync(
      `INSERT OR REPLACE INTO tickets
       (localId, serverId, userId, payload, syncStatus, purchasedAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        ticket.localId,
        ticket.id ?? null,
        ticket.userId,
        JSON.stringify(ticket),
        ticket.syncStatus,
        ticket.purchasedAt,
      ],
    );
  },

  findByUserId(userId: string): Ticket[] {
    if (!db) {
      return readWebTickets()
        .filter(ticket => ticket.userId === userId)
        .sort((a, b) => b.purchasedAt.localeCompare(a.purchasedAt));
    }

    const rows = db.getAllSync<TicketRow>(
      'SELECT payload FROM tickets WHERE userId = ? ORDER BY purchasedAt DESC',
      [userId],
    );

    return rows.map(row => JSON.parse(row.payload));
  },

  findPendingSync(): Ticket[] {
    if (!db) {
      return readWebTickets().filter(ticket => ticket.syncStatus === 'pending_sync');
    }

    const rows = db.getAllSync<TicketRow>(
      "SELECT payload FROM tickets WHERE syncStatus = 'pending_sync'",
    );

    return rows.map(row => JSON.parse(row.payload));
  },

  markAsSynced(localId: string, serverId: string) {
    if (!db) {
      const tickets = readWebTickets().map(ticket =>
        ticket.localId === localId
          ? { ...ticket, id: serverId, syncStatus: 'synced' as const }
          : ticket,
      );
      writeWebTickets(tickets);
      return;
    }

    const row = db.getFirstSync<TicketRow>(
      'SELECT payload FROM tickets WHERE localId = ?',
      [localId],
    );

    if (!row) return;

    const ticket = JSON.parse(row.payload) as Ticket;
    const syncedTicket: Ticket = {
      ...ticket,
      id: serverId,
      syncStatus: 'synced',
    };

    db.runSync(
      `UPDATE tickets
       SET serverId = ?, payload = ?, syncStatus = 'synced'
       WHERE localId = ?`,
      [serverId, JSON.stringify(syncedTicket), localId],
    );
  },

  markAsSyncError(localId: string) {
    if (!db) {
      const tickets = readWebTickets().map(ticket =>
        ticket.localId === localId
          ? { ...ticket, syncStatus: 'sync_error' as const }
          : ticket,
      );
      writeWebTickets(tickets);
      return;
    }

    const row = db.getFirstSync<TicketRow>(
      'SELECT payload FROM tickets WHERE localId = ?',
      [localId],
    );

    if (!row) return;

    const ticket = JSON.parse(row.payload) as Ticket;
    const failedTicket: Ticket = {
      ...ticket,
      syncStatus: 'sync_error',
    };

    db.runSync(
      `UPDATE tickets
       SET payload = ?, syncStatus = 'sync_error'
       WHERE localId = ?`,
      [JSON.stringify(failedTicket), localId],
    );
  },
};
