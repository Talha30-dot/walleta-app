import { Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Transaction } from '@/types/transaction';
import { formatCurrency, formatTransactionDate } from '@/utils/formatters';

const categoryColors: Record<string, string> = {
  subscription: '#FFECEE',
  salary: '#E9F9EF',
  store: '#EEF4FF',
  'top-up': '#FFF5DF',
  food: '#FFF0E8',
  transfer: '#EBF7FF',
  other: '#F1EAFE'
};

type TransactionItemProps = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income';
  const amountText = `${isIncome ? '+ ' : '- '}${formatCurrency(transaction.amount)}`;
  const firstLetter = transaction.title[0]?.toUpperCase() ?? '?';

  return (
    <Link href={`/transaction/${transaction.id}`} asChild>
      <Pressable style={styles.container}>
        <View style={[styles.categoryIcon, { backgroundColor: categoryColors[transaction.category] ?? '#F1EAFE' }]}>
          <Text style={styles.categoryLetter}>{firstLetter}</Text>
        </View>

        <View style={styles.middle}>
          <Text style={styles.title}>{transaction.title}</Text>
          <Text style={styles.subtitle}>{transaction.subtitle}</Text>
        </View>

        <View style={styles.rightSide}>
          <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>{amountText}</Text>
          <Text style={styles.date}>{formatTransactionDate(transaction.date)}</Text>
        </View>

        <Feather name="chevron-right" size={18} color="#D1D5E0" />
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F1F6',
    gap: 13
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryLetter: {
    color: '#6D35D9',
    fontSize: 18,
    fontWeight: '900'
  },
  middle: {
    flex: 1
  },
  title: {
    color: '#252633',
    fontSize: 16,
    fontWeight: '800'
  },
  subtitle: {
    color: '#9AA0AF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4
  },
  rightSide: {
    alignItems: 'flex-end'
  },
  amount: {
    fontSize: 15,
    fontWeight: '900'
  },
  income: {
    color: '#23B26D'
  },
  expense: {
    color: '#252633'
  },
  date: {
    color: '#A6AAB6',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '600'
  }
});
