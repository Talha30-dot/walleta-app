import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '@/services/transactionService';

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
    }
  });
}
