import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import AuthContext from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }: Props) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  async function onLogin() {
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }
    try {
      await login({ email, password });
    } catch (e: any) {
      if (e.code === 'INVALID_CREDENTIALS') setError('Incorrect email or password.');
      else setError(e.message || 'Login failed.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome back</Text>

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <View style={styles.passwordRow}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={styles.eyeBtn}>
          <Text>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={onLogin} style={styles.btn}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.link}>
        <Text>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    width: 300,
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  passwordRow: { flexDirection: 'row', alignItems: 'center', width: 300 },
  eyeBtn: { padding: 8 },
  btn: {
    marginTop: 16,
    width: 300,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
  },
  btnText: { color: '#fff', fontWeight: '600' },
  link: { marginTop: 12 },
  error: { color: 'red', marginTop: 8 },
});
