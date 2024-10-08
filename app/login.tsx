import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // Thông báo lỗi

  const handleLogin = () => {
    const fixedEmail = 'nhat'; // Email cố định
    const fixedPassword = '123456'; // Mật khẩu cố định

    if (email === fixedEmail && password === fixedPassword) {
      console.log('Đăng nhập thành công');
      router.push('/home');
    } else {
      setErrorMessage('Email hoặc mật khẩu không đúng');

      // Đặt timeout để xóa thông báo sau 3 giây
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Nhập mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Hiển thị thông báo lỗi nếu có */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Đăng nhập</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}> Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#344885',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#EA4C4C',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#344885',
    textAlign: 'center',
    marginBottom: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#344885',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default LoginScreen;
