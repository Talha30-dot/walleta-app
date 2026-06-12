export type TransactionType = 'income' | 'expense';

export type Transaction = {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
};

export type TransactionInput = {
  title: string;
  subtitle: string;
  amount: number;
  type: TransactionType;
  category: string;
};
