import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc
} from 'firebase/firestore';
import { mockTransactions } from '@/data/mockTransactions';
import { db } from '@/utils/firebaseConfig';
import { Transaction, TransactionInput } from '@/types/transaction';

const LOCAL_TRANSACTIONS_KEY = '@walleta_transactions';
const COLLECTION_NAME = 'transactions';

async function readLocalTransactions(): Promise<Transaction[]> {
  const stored = await AsyncStorage.getItem(LOCAL_TRANSACTIONS_KEY);
  if (!stored) {
    await AsyncStorage.setItem(LOCAL_TRANSACTIONS_KEY, JSON.stringify(mockTransactions));
    return mockTransactions;
  }

  return JSON.parse(stored) as Transaction[];
}

async function writeLocalTransactions(transactions: Transaction[]) {
  await AsyncStorage.setItem(LOCAL_TRANSACTIONS_KEY, JSON.stringify(transactions));
}

function mapFirestoreDoc(snapshot: any): Transaction {
  const data = snapshot.data();
  const rawDate = data.date;

  return {
    id: snapshot.id,
    title: data.title ?? 'Untitled',
    subtitle: data.subtitle ?? '',
    amount: Number(data.amount ?? 0),
    type: data.type === 'income' ? 'income' : 'expense',
    category: data.category ?? 'other',
    date: rawDate?.toDate ? rawDate.toDate().toISOString() : new Date().toISOString()
  };
}

export async function getTransactions(): Promise<Transaction[]> {
  if (!db) {
    return readLocalTransactions();
  }

  try {
    const transactionsQuery = query(collection(db, COLLECTION_NAME), orderBy('date', 'desc'));
    const snapshot = await getDocs(transactionsQuery);
    return snapshot.docs.map(mapFirestoreDoc);
  } catch (error) {
    console.warn('Firestore list failed. Local fallback is used.', error);
    return readLocalTransactions();
  }
}

export async function getTransaction(id: string): Promise<Transaction | null> {
  if (!db) {
    const transactions = await readLocalTransactions();
    return transactions.find((transaction) => transaction.id === id) ?? null;
  }

  try {
    const snapshot = await getDoc(doc(db, COLLECTION_NAME, id));
    if (!snapshot.exists()) return null;
    return mapFirestoreDoc(snapshot);
  } catch (error) {
    console.warn('Firestore detail failed. Local fallback is used.', error);
    const transactions = await readLocalTransactions();
    return transactions.find((transaction) => transaction.id === id) ?? null;
  }
}

export async function addTransaction(input: TransactionInput): Promise<Transaction> {
  const payload = {
    title: input.title.trim(),
    subtitle: input.subtitle.trim(),
    amount: Number(input.amount),
    type: input.type,
    category: input.category
  };

  if (!db) {
    const transactions = await readLocalTransactions();
    const nextTransaction: Transaction = {
      id: `local-${Date.now()}`,
      ...payload,
      date: new Date().toISOString()
    };
    await writeLocalTransactions([nextTransaction, ...transactions]);
    return nextTransaction;
  }

  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...payload,
    date: serverTimestamp()
  });

  return {
    id: docRef.id,
    ...payload,
    date: new Date().toISOString()
  };
}

export async function updateTransaction(id: string, input: TransactionInput): Promise<void> {
  const payload = {
    title: input.title.trim(),
    subtitle: input.subtitle.trim(),
    amount: Number(input.amount),
    type: input.type,
    category: input.category
  };

  if (!db) {
    const transactions = await readLocalTransactions();
    const nextTransactions = transactions.map((transaction) =>
      transaction.id === id ? { ...transaction, ...payload } : transaction
    );
    await writeLocalTransactions(nextTransactions);
    return;
  }

  await updateDoc(doc(db, COLLECTION_NAME, id), payload);
}

export async function deleteTransaction(id: string): Promise<void> {
  if (!db) {
    const transactions = await readLocalTransactions();
    await writeLocalTransactions(transactions.filter((transaction) => transaction.id !== id));
    return;
  }

  await deleteDoc(doc(db, COLLECTION_NAME, id));
}
