import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { usePersistentUser } from '@/context/PersistentUserContext';

export default function LoginScreen() {
  const { login } = usePersistentUser();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Eksik bilgi', 'Lütfen isim ve email alanlarını doldur.');
      return;
    }

    try {
      setIsSubmitting(true);
      await login({ name, email });
      router.replace('/(tabs)');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>W</Text>
        </View>
        <Text style={styles.title}>Walleta</Text>
        <Text style={styles.description}>Finansal cüzdanına devam etmek için giriş yap.</Text>

        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="İsim"
          placeholderTextColor="#9CA3B4"
          style={styles.input}
          autoCapitalize="words"
        />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          placeholderTextColor="#9CA3B4"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Pressable style={[styles.button, isSubmitting && styles.buttonDisabled]} onPress={handleLogin} disabled={isSubmitting}>
          <Text style={styles.buttonText}>{isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#28145F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22
  },
  card: {
    width: '100%',
    maxWidth: 430,
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 },
    elevation: 10
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#F1EAFE',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  logoText: {
    color: '#8B4CF6',
    fontSize: 32,
    fontWeight: '900'
  },
  title: {
    color: '#252633',
    fontSize: 34,
    fontWeight: '900',
    textAlign: 'center',
    marginTop: 18
  },
  description: {
    color: '#8C91A1',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 26
  },
  input: {
    backgroundColor: '#F7F7FB',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EEEFF5',
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 14,
    color: '#252633'
  },
  button: {
    backgroundColor: '#8B4CF6',
    borderRadius: 16,
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8
  },
  buttonDisabled: {
    opacity: 0.6
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900'
  }
});
