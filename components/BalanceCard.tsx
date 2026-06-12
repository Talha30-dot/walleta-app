import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { formatCurrency } from '@/utils/formatters';
import { QuickAction } from './QuickAction';

type BalanceCardProps = {
  balance: number;
};

export function BalanceCard({ balance }: BalanceCardProps) {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View className="bg-white" style={styles.card}>
      <Text style={styles.label}>YOUR BALANCE</Text>
      <View style={styles.balanceRow}>
        <Text style={styles.balance}>{isVisible ? formatCurrency(balance) : '••••••••'}</Text>
        <Pressable onPress={() => setIsVisible((current) => !current)} hitSlop={10}>
          <Feather name={isVisible ? 'eye' : 'eye-off'} size={22} color="#C1C5D0" />
        </Pressable>
      </View>

      <View style={styles.actions}>
        <QuickAction icon="arrow-up" label="Transfer" />
        <QuickAction icon="arrow-down" label="Withdraw" />
        <QuickAction icon="dollar-sign" label="Invest" />
        <QuickAction icon="credit-card" label="Top up" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 22,
    marginTop: -78,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 25,
    paddingBottom: 24,
    shadowColor: '#000000',
    shadowOpacity: 0.14,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7
  },
  label: {
    color: '#9CA3B4',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 20
  },
  balance: {
    color: '#252633',
    fontSize: 34,
    fontWeight: '900'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 34
  }
});
