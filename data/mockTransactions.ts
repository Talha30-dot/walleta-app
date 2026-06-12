import { Transaction } from '@/types/transaction';

export const mockTransactions: Transaction[] = [
  {
    id: 'mock-youtube',
    title: 'Youtube',
    subtitle: 'Subscription Payment',
    amount: 15,
    type: 'expense',
    category: 'subscription',
    date: '2026-05-16T10:15:00.000Z'
  },
  {
    id: 'mock-stripe',
    title: 'Stripe',
    subtitle: 'Salary Deposit',
    amount: 3689,
    type: 'income',
    category: 'salary',
    date: '2026-05-15T09:00:00.000Z'
  },
  {
    id: 'mock-google-play',
    title: 'Google Play',
    subtitle: 'App Purchase',
    amount: 35,
    type: 'expense',
    category: 'store',
    date: '2026-05-14T12:30:00.000Z'
  },
  {
    id: 'mock-ovo',
    title: 'OVO',
    subtitle: 'Wallet Top Up',
    amount: 500,
    type: 'income',
    category: 'top-up',
    date: '2026-05-12T18:20:00.000Z'
  }
];
