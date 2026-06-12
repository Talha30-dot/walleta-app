import { Feather } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

function TabIcon({ name, color }: { name: keyof typeof Feather.glyphMap; color: string }) {
  return <Feather name={name} size={22} color={color} />;
}

function AddButton() {
  return (
    <Pressable style={styles.addButtonWrapper} onPress={() => router.push('/transaction/add')}>
      <View style={styles.addButton}>
        <Feather name="maximize" size={28} color="#FFFFFF" />
      </View>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6D35D9',
        tabBarInactiveTintColor: '#A2A2AF',
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: 'Card',
          tabBarIcon: ({ color }) => <TabIcon name="credit-card" color={color} />
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarLabel: () => <Text style={styles.hiddenLabel}> </Text>,
          tabBarButton: () => <AddButton />
        }}
      />
      <Tabs.Screen
        name="stat"
        options={{
          title: 'Stat',
          tabBarIcon: ({ color }) => <TabIcon name="bar-chart-2" color={color} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabIcon name="user" color={color} />
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 78,
    paddingTop: 10,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 0,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: -5 },
    elevation: 12
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '700'
  },
  hiddenLabel: {
    fontSize: 1
  },
  addButtonWrapper: {
    top: -26,
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#8B4CF6',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 7 },
    elevation: 10
  }
});
