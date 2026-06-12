import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { usePersistentUser } from '@/context/PersistentUserContext';

export default function ProfileScreen() {
  const { user, theme, toggleTheme, logout } = usePersistentUser();

  async function handleLogout() {
    await logout();
    router.replace('/login');
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() ?? 'W'}</Text>
        </View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Stored theme</Text>
          <Text style={styles.infoValue}>{theme}</Text>
        </View>

        <Pressable style={styles.secondaryButton} onPress={toggleTheme}>
          <Text style={styles.secondaryButtonText}>Tema Değiştir</Text>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7FB',
    justifyContent: 'center',
    padding: 22
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    padding: 26,
    alignItems: 'center'
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: '#F1EAFE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: '#8B4CF6',
    fontSize: 34,
    fontWeight: '900'
  },
  name: {
    color: '#252633',
    fontSize: 26,
    fontWeight: '900',
    marginTop: 18
  },
  email: {
    color: '#8C91A1',
    fontSize: 15,
    marginTop: 5,
    marginBottom: 24
  },
  infoBox: {
    width: '100%',
    backgroundColor: '#F7F7FB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  infoLabel: {
    color: '#8C91A1',
    fontWeight: '700'
  },
  infoValue: {
    color: '#252633',
    fontWeight: '900'
  },
  secondaryButton: {
    width: '100%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#8B4CF6',
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 12
  },
  secondaryButtonText: {
    color: '#8B4CF6',
    fontWeight: '900'
  },
  logoutButton: {
    width: '100%',
    borderRadius: 16,
    backgroundColor: '#EF4444',
    paddingVertical: 15,
    alignItems: 'center'
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontWeight: '900'
  }
});
