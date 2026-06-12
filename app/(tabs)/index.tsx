import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { BalanceCard } from '@/components/BalanceCard';
import { FinancialInsight } from '@/components/FinancialInsight';
import { Header } from '@/components/Header';
import { TransactionItem } from '@/components/TransactionItem';
import { useTransactions } from '@/hooks/useTransactions';

export default function HomeScreen() {
  const { data: transactions = [], isLoading, isRefetching, refetch } = useTransactions();

  const balance = transactions.reduce(
    (acc, transaction) => acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount),
    0
  );

  return (
    <View className="flex-1 bg-white" style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#8B4CF6" />}
        ListHeaderComponent={
          <>
            <Header />
            <BalanceCard balance={balance} />
            <FinancialInsight />
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Transactions</Text>
            </View>
            {isLoading ? <ActivityIndicator size="large" color="#8B4CF6" style={styles.loader} /> : null}
          </>
        }
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        contentContainerStyle={styles.content}
        ListEmptyComponent={!isLoading ? <Text style={styles.emptyText}>Henüz transaction yok.</Text> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    paddingBottom: 120
  },
  sectionHeader: {
    marginTop: 32,
    paddingHorizontal: 22,
    marginBottom: 8
  },
  sectionTitle: {
    color: '#252633',
    fontSize: 30,
    fontWeight: '900'
  },
  loader: {
    marginVertical: 20
  },
  emptyText: {
    color: '#9AA0AF',
    textAlign: 'center',
    marginTop: 30,
    fontWeight: '700'
  }
});
