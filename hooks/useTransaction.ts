import { useQuery } from '@tanstack/react-query';
import { getTransaction } from '@/services/transactionService';

export function useTransaction(id: string) {
  return useQuery({
    queryKey: ['transactions', id],
    queryFn: () => getTransaction(id),
    enabled: Boolean(id)
  });
}
