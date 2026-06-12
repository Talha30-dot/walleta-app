import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

export function FinancialInsight() {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Feather name="edit-3" size={24} color="#8B4CF6" />
      </View>
      <Text style={styles.text}>
        Let's check your <Text style={styles.bold}>Financial Insight</Text> for the month of June!
      </Text>
      <Feather name="chevron-right" size={28} color="#878898" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 22,
    marginTop: 30,
    borderRadius: 18,
    backgroundColor: '#F1EAFE',
    paddingVertical: 18,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  },
  iconWrapper: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E6D3FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    flex: 1,
    color: '#252633',
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '500'
  },
  bold: {
    fontWeight: '900'
  }
});
