import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type PlaceholderScreenProps = {
  title: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
};

export function PlaceholderScreen({ title, description, icon }: PlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name={icon} size={34} color="#8B4CF6" />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#F1EAFE',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    color: '#252633',
    fontSize: 28,
    fontWeight: '900',
    marginTop: 20
  },
  description: {
    color: '#8C91A1',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginTop: 10
  }
});
