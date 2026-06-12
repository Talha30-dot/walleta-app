import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTransaction } from '@/services/transactionService';
import { TransactionInput } from '@/types/transaction';

export function useUpdateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: TransactionInput }) => updateTransaction(id, input),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['transactions', variables.id] });
    }
  });
}
