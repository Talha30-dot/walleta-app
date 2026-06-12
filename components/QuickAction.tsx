import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

type QuickActionProps = {
  label: string;
  icon: keyof typeof Feather.glyphMap;
};

export function QuickAction({ label, icon }: QuickActionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name={icon} size={24} color="#FFFFFF" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    minWidth: 70
  },
  iconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8B4CF6'
  },
  label: {
    color: '#687083',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 12
  }
});
