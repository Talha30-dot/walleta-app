import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDeleteTransaction } from '@/hooks/useDeleteTransaction';
import { useTransaction } from '@/hooks/useTransaction';
import { useUpdateTransaction } from '@/hooks/useUpdateTransaction';
import { TransactionType } from '@/types/transaction';
import { formatCurrency, formatTransactionDate } from '@/utils/formatters';

const categories = ['subscription', 'salary', 'store', 'top-up', 'food', 'transfer', 'other'];

export default function TransactionDetailScreen() {
  const params = useLocalSearchParams<{ id: string }>();
  const id = useMemo(() => (Array.isArray(params.id) ? params.id[0] : params.id) ?? '', [params.id]);
  const { data: transaction, isLoading } = useTransaction(id);
  const updateMutation = useUpdateTransaction();
  const deleteMutation = useDeleteTransaction();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState('other');

  useEffect(() => {
    if (!transaction) return;
    setTitle(transaction.title);
    setSubtitle(transaction.subtitle);
    setAmount(String(transaction.amount));
    setType(transaction.type);
    setCategory(transaction.category);
  }, [transaction]);

  async function handleUpdate() {
    const parsedAmount = Number(amount.replace(',', '.'));

    if (!title.trim() || !subtitle.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Eksik bilgi', 'Başlık, açıklama ve geçerli tutar girmen gerekiyor.');
      return;
    }

    await updateMutation.mutateAsync({
      id,
      input: {
        title,
        subtitle,
        amount: parsedAmount,
        type,
        category
      }
    });
    setIsEditing(false);
  }

  function handleDelete() {
    const runDelete = async () => {
      await deleteMutation.mutateAsync(id);
      router.back();
    };

    if (Platform.OS === 'web') {
      const confirmed = (globalThis as any).confirm?.('Bu transaction silinsin mi?') ?? true;
      if (confirmed) runDelete();
      return;
    }

    Alert.alert('Silme Onayı', 'Bu transaction silinsin mi?', [
      { text: 'Vazgeç', style: 'cancel' },
      { text: 'Sil', style: 'destructive', onPress: runDelete }
    ]);
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.centerText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (!transaction) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.centerText}>Transaction bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-white" style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.summaryCard}>
        <Text style={styles.summaryLabel}>{transaction.type === 'income' ? 'Income' : 'Expense'}</Text>
        <Text style={styles.summaryAmount}>{formatCurrency(transaction.amount)}</Text>
        <Text style={styles.summaryDate}>{formatTransactionDate(transaction.date)}</Text>
      </View>

      <Text style={styles.label}>Başlık</Text>
      <TextInput value={title} onChangeText={setTitle} editable={isEditing} style={[styles.input, !isEditing && styles.inputDisabled]} />

      <Text style={styles.label}>Alt açıklama</Text>
      <TextInput value={subtitle} onChangeText={setSubtitle} editable={isEditing} style={[styles.input, !isEditing && styles.inputDisabled]} />

      <Text style={styles.label}>Tutar</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        editable={isEditing}
        keyboardType="numeric"
        style={[styles.input, !isEditing && styles.inputDisabled]}
      />

      <Text style={styles.label}>Tip</Text>
      <View style={styles.typeRow}>
        <Pressable disabled={!isEditing} style={[styles.typeButton, type === 'income' && styles.typeButtonActive]} onPress={() => setType('income')}>
          <Text style={[styles.typeButtonText, type === 'income' && styles.typeButtonTextActive]}>Income</Text>
        </Pressable>
        <Pressable disabled={!isEditing} style={[styles.typeButton, type === 'expense' && styles.typeButtonActive]} onPress={() => setType('expense')}>
          <Text style={[styles.typeButtonText, type === 'expense' && styles.typeButtonTextActive]}>Expense</Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Kategori</Text>
      <View style={styles.categoryWrap}>
        {categories.map((item) => (
          <Pressable disabled={!isEditing} key={item} style={[styles.categoryChip, category === item && styles.categoryChipActive]} onPress={() => setCategory(item)}>
            <Text style={[styles.categoryText, category === item && styles.categoryTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>

      {isEditing ? (
        <Pressable style={styles.saveButton} onPress={handleUpdate} disabled={updateMutation.isPending}>
          <Text style={styles.saveButtonText}>{updateMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
          <Text style={styles.editButtonText}>Düzenle</Text>
        </Pressable>
      )}

      <Pressable style={styles.deleteButton} onPress={handleDelete} disabled={deleteMutation.isPending}>
        <Text style={styles.deleteButtonText}>{deleteMutation.isPending ? 'Siliniyor...' : 'Sil'}</Text>
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
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  centerText: {
    color: '#8C91A1',
    fontWeight: '800'
  },
  summaryCard: {
    borderRadius: 24,
    backgroundColor: '#28145F',
    padding: 24,
    marginBottom: 22
  },
  summaryLabel: {
    color: '#CFC4F3',
    fontWeight: '800',
    textTransform: 'uppercase'
  },
  summaryAmount: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: '900',
    marginTop: 10
  },
  summaryDate: {
    color: '#D8D1F2',
    marginTop: 8,
    fontWeight: '700'
  },
  label: {
    color: '#252633',
    fontWeight: '900',
    marginTop: 14,
    marginBottom: 8
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
  inputDisabled: {
    color: '#6B7280'
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
  editButton: {
    backgroundColor: '#8B4CF6',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 30
  },
  editButtonText: {
    color: '#FFFFFF',
    fontWeight: '900'
  },
  saveButton: {
    backgroundColor: '#23B26D',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 30
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '900'
  },
  deleteButton: {
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#EF4444'
  },
  deleteButtonText: {
    color: '#EF4444',
    fontWeight: '900'
  }
});
