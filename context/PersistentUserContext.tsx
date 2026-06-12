import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

const USER_KEY = '@walleta_user';
const THEME_KEY = '@walleta_theme';

type User = {
  name: string;
  email: string;
  token: string;
};

type ThemeMode = 'light' | 'dark';

type PersistentUserContextValue = {
  user: User | null;
  theme: ThemeMode;
  isLoading: boolean;
  login: (payload: { name: string; email: string }) => Promise<void>;
  logout: () => Promise<void>;
  toggleTheme: () => Promise<void>;
};

const PersistentUserContext = createContext<PersistentUserContextValue | null>(null);

export function PersistentUserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      try {
        const [storedUser, storedTheme] = await Promise.all([
          AsyncStorage.getItem(USER_KEY),
          AsyncStorage.getItem(THEME_KEY)
        ]);

        if (storedUser) {
          setUser(JSON.parse(storedUser) as User);
        }

        if (storedTheme === 'light' || storedTheme === 'dark') {
          setTheme(storedTheme);
        }
      } finally {
        setIsLoading(false);
      }
    }

    bootstrap();
  }, []);

  async function login(payload: { name: string; email: string }) {
    const nextUser: User = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      token: `fake-${Date.now()}`
    };

    await AsyncStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
  }

  async function logout() {
    await AsyncStorage.removeItem(USER_KEY);
    setUser(null);
  }

  async function toggleTheme() {
    const nextTheme: ThemeMode = theme === 'light' ? 'dark' : 'light';
    await AsyncStorage.setItem(THEME_KEY, nextTheme);
    setTheme(nextTheme);
  }

  const value = useMemo(
    () => ({ user, theme, isLoading, login, logout, toggleTheme }),
    [user, theme, isLoading]
  );

  return <PersistentUserContext.Provider value={value}>{children}</PersistentUserContext.Provider>;
}

export function usePersistentUser() {
  const context = useContext(PersistentUserContext);
  if (!context) {
    throw new Error('usePersistentUser must be used inside PersistentUserProvider');
  }
  return context;
}
