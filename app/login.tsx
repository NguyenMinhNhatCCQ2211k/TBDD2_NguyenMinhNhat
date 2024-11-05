import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: any;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // Thông báo lỗi

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage('Vui lòng nhập tên người dùng và mật khẩu.');
      return; // Dừng hàm nếu không đủ thông tin
    }

    try {
      const response = await fetch('https://fakestoreapi.com/users');
      const data = await response.json(); 
      const user = data.find((user: any) => user.username === username && user.password === password);

      if (user) {
        console.log('Đăng nhập thành công');

        // Lưu ID người dùng vào AsyncStorage
        await AsyncStorage.setItem('userId', user.id.toString());

        // Gửi ID người dùng về màn hình Home
        router.push(`/home?userId=${user.id}`); 
      } else {
        setErrorMessage('Tên người dùng hoặc mật khẩu không đúng');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      }
    } catch (error) {
      console.error('Lỗi:', error);
      setErrorMessage('Đã xảy ra lỗi, vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/OIP (1).jpg')}
        style={styles.logo}
      />

      <Text style={styles.title}>LOG IN</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter a username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.registerText}> Register now</Text>
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
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 10,
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
