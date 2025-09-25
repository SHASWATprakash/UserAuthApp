import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import AuthContext from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupScreen({ navigation }: Props) {
    const eye = require('../../assets/eye.png');
const noViewEye = require('../../assets/noViewEye.png');
  const { signup } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function onSignup() {
    setError('');
    if (!name || !email || !password) {
      setError('Please fill all fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await signup({ name, email, password });
    } catch (e: any) {
      if (e.code === 'USER_EXISTS') setError('An account with that email already exists.');
      else setError(e.message || 'Signup failed.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />

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
          placeholder="Password (min 6 chars)"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={styles.eyeBtn}>
          <Image
              source={showPassword ? noViewEye : eye}
              style={styles.eyeImage}
            />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={onSignup} style={styles.btn}>
        <Text style={styles.btnText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.link}>
        <Text>Already have an account? Log in</Text>
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
    eyeBtn: { padding: 8, justifyContent: 'center', alignItems: 'center' },
  eyeImage: { width: 24, height: 24, resizeMode: 'contain' },
  btn: {
    marginTop: 16,
    width: 300,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28a745',
  },
  btnText: { color: '#fff', fontWeight: '600' },
  link: { marginTop: 12 },
  error: { color: 'red', marginTop: 8 },
});
