import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signup: (payload: { name: string; email: string; password: string }) => Promise<User>;
  login: (payload: { email: string; password: string }) => Promise<User>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    restoreUser();
  }, []);

  async function restoreUser() {
    try {
      const json = await AsyncStorage.getItem('currentUser');
      if (json) setUser(JSON.parse(json));
    } finally {
      setLoading(false);
    }
  }

  async function signup({ name, email, password }: { name: string; email: string; password: string }): Promise<User> {
    const usersJson = await AsyncStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    if (users.find((u: any) => u.email === email.toLowerCase())) {
      const err = new Error('User exists');
      (err as any).code = 'USER_EXISTS';
      throw err;
    }
    const newUser = { id: Date.now().toString(), name, email: email.toLowerCase(), password };
    users.push(newUser);
    await AsyncStorage.setItem('users', JSON.stringify(users));
    const shortUser: User = { id: newUser.id, name: newUser.name, email: newUser.email };
    await AsyncStorage.setItem('currentUser', JSON.stringify(shortUser));
    setUser(shortUser);
    return shortUser;
  }

  async function login({ email, password }: { email: string; password: string }): Promise<User> {
    const usersJson = await AsyncStorage.getItem('users');
    const users = usersJson ? JSON.parse(usersJson) : [];
    const found = users.find((u: any) => u.email === email.toLowerCase() && u.password === password);
    if (!found) {
      const err = new Error('Invalid credentials');
      (err as any).code = 'INVALID_CREDENTIALS';
      throw err;
    }
    const shortUser: User = { id: found.id, name: found.name, email: found.email };
    await AsyncStorage.setItem('currentUser', JSON.stringify(shortUser));
    setUser(shortUser);
    return shortUser;
  }

  async function logout(): Promise<void> {
    await AsyncStorage.removeItem('currentUser');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
