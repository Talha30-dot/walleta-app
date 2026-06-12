import '@/global.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { PersistentUserProvider, usePersistentUser } from '@/context/PersistentUserContext';

function RootNavigator() {
  const { user, isLoading } = usePersistentUser();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const currentRoot = segments[0];
    const isLoginScreen = currentRoot === 'login';

    if (!user && !isLoginScreen) {
      router.replace('/login');
      return;
    }

    if (user && isLoginScreen) {
      router.replace('/(tabs)');
    }
  }, [user, isLoading, segments]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4CF6" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="transaction/add"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'Add Transaction',
            headerTitleStyle: { fontWeight: '800' },
            headerTintColor: '#28145F'
          }}
        />
        <Stack.Screen
          name="transaction/[id]"
          options={{
            headerShown: true,
            title: 'Transaction Detail',
            headerTitleStyle: { fontWeight: '800' },
            headerTintColor: '#28145F'
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PersistentUserProvider>
        <RootNavigator />
      </PersistentUserProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  }
});
