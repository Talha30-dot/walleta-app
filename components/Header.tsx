import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { usePersistentUser } from '@/context/PersistentUserContext';

export function Header() {
  const { user } = usePersistentUser();
  const firstLetter = user?.name?.[0]?.toUpperCase() ?? 'W';

  return (
    <View className="bg-walleta-deep" style={styles.container}>
      <View style={styles.userRow}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{firstLetter}</Text>
        </View>
        <View>
          <Text style={styles.greeting}>Hello {user?.name || 'Walleta'}!</Text>
          <Text style={styles.subtitle}>Welcome back</Text>
        </View>
      </View>

      <View style={styles.bellWrapper}>
        <Feather name="bell" size={26} color="#FFFFFF" />
        <View style={styles.notificationDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 210,
    backgroundColor: '#28145F',
    paddingTop: 58,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE4EE',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.35)'
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#28145F'
  },
  greeting: {
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: '800'
  },
  subtitle: {
    color: '#C6BCE8',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600'
  },
  bellWrapper: {
    marginTop: 12,
    position: 'relative'
  },
  notificationDot: {
    position: 'absolute',
    right: -2,
    top: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FF5A5F',
    borderWidth: 2,
    borderColor: '#FFFFFF'
  }
});
