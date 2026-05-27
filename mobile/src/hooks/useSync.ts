import { useEffect } from 'react';
import { startSyncListener, syncPendingTickets } from '../database/syncService';

export function useSync() {
  useEffect(() => {
    syncPendingTickets();
    const unsubscribe = startSyncListener();
    return unsubscribe;
  }, []);
}
