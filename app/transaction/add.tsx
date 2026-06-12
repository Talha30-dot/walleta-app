import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAddTransaction } from '@/hooks/useAddTransaction';
import { TransactionType } from '@/types/transaction';

const categories = ['subscription', 'salary', 'store', 'top-up', 'food', 'transfer', 'other'];

export default function AddTransactionScreen() {
  const addMutation = useAddTransaction();
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('subscription');

  async function handleSave() {
    const parsedAmount = Number(amount.replace(',', '.'));

    if (!title.trim() || !subtitle.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Eksik bilgi', 'Başlık, açıklama ve geçerli tutar girmen gerekiyor.');
      return;
    }

    await addMutation.mutateAsync({
      title,
      subtitle,
      amount: parsedAmount,
      type,
      category
    });

    router.back();
  }

  return (
    <ScrollView className="bg-white" style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Yeni Transaction</Text>
      <Text style={styles.description}>Gelir veya gider bilgisini kaydet. Firebase config boşsa local AsyncStorage kullanılır.</Text>

      <Text style={styles.label}>Başlık</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="Youtube" placeholderTextColor="#9CA3B4" style={styles.input} />

      <Text style={styles.label}>Alt açıklama</Text>
      <TextInput
        value={subtitle}
        onChangeText={setSubtitle}
        placeholder="Subscription Payment"
        placeholderTextColor="#9CA3B4"
        style={styles.input}
      />

      <Text style={styles.label}>Tutar</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="15"
        placeholderTextColor="#9CA3B4"
        style={styles.input}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tip</Text>
      <View style={styles.typeRow}>
        <Pressable style={[styles.typeButton, type === 'income' && styles.typeButtonActive]} onPress={() => setType('income')}>
          <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>Income</Text>
        </Pressable>
        <Pressable style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]} onPress={() => setType('expense')}>
          <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>Expense</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.categoryWrap}>
        {categories.map((item) => (
          <Pressable key={item} style={[styles.categoryChip, category === item && styles.categoryChipActive]} onPress={() => setCategory(item)}>
            <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <Pressable style={[styles.saveButton, addMutation.isPending && styles.disabled]} onPress={handleSave} disabled={addMutation.isPending}>
        <Text style={styles.saveButtonText}>{addMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  content: {
    padding: 22,
    paddingBottom: 44
  },
  title: {
    color: '#252633',
    fontSize: 30,
    fontWeight: '900'
  },
  description: {
    color: '#8C91A1',
    lineHeight: 22,
    marginTop: 8,
    marginBottom: 24
  },
  label: {
    color: '#252633',
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 8,
    marginTop: 14
  },
  input: {
    backgroundColor: '#F7F7FB',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#EEEFF5',
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: '#252633'
  },
  typeRow: {
    flexDirection: 'row',
    gap: 12
  },
  typeButton: {
    flex: 1,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEFF5',
    backgroundColor: '#F7F7FB'
  },
  typeButtonActive: {
    backgroundColor: '#8B4CF6',
    borderColor: '#8B4CF6'
  },
  typeButtonText: {
    color: '#8C91A1',
    fontWeight: '900'
  },
  typeButtonTextActive: {
    color: '#FFFFFF'
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F7F7FB',
    borderWidth: 1,
    borderColor: '#EEEFF5'
  },
  categoryChipActive: {
    backgroundColor: '#F1EAFE',
    borderColor: '#8B4CF6'
  },
  categoryText: {
    color: '#8C91A1',
    fontWeight: '800'
  },
  categoryTextActive: {
    color: '#6D35D9'
  },
  saveButton: {
    backgroundColor: '#8B4CF6',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 30
  },
  disabled: {
    opacity: 0.6
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900'
  }
});
