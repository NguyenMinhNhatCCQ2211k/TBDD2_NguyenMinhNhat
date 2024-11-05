import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccountScreen = () => {
  const [userInfo, setUserInfo] = useState<any>(null); 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId'); // Lấy ID người dùng từ AsyncStorage
        if (userId) {
          const response = await fetch(`https://fakestoreapi.com/users/${userId}`);
          const data = await response.json();
          setUserInfo(data);
        }
      } catch (error) {
        console.error('Error retrieving user information:', error);
      }
    };

    fetchUserInfo();
  }, []);

  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    Alert.alert('Notifications', 'Are you sure you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Log out',
        onPress: () => {
          console.log('Logged out successfully ...');
          router.push('../login');
        },
      },
    ]);
  };

  if (!userInfo) {
    return <Text>Loading user information...</Text>; // Hiển thị thông báo khi đang tải thông tin
  }

  return (
    <ImageBackground
      source={require('../../assets/images/BG.jpg')} // Đường dẫn tới hình ảnh nền
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        {/* Nút thay đổi thông tin */}
        <TouchableOpacity
          style={styles.changeInfoButton}
          onPress={() => console.log('Thay đổi thông tin')} // Chức năng thay đổi thông tin
        >
          <Text style={styles.changeInfoButtonText}>Change of information</Text>
        </TouchableOpacity>

        {/* Hiển thị ảnh đại diện */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../assets/images/avatar.jpg')} 
            style={styles.avatar}
          />
        </View>

        {/* Hiển thị thông tin cá nhân */}
        <View style={styles.infoContainer}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{`${userInfo.name.firstname} ${userInfo.name.lastname}`}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userInfo.email}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Phone number:</Text>
          <Text style={styles.value}>{userInfo.phone}</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {`${userInfo.address.number} ${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.zipcode}`}
          </Text>
        </View>

        {/* Nút đăng xuất */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Nền trắng trong suốt để nội dung dễ đọc hơn
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#6699FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  changeInfoButton: {
    position: 'absolute',
    top: 10, 
    right: 0.5, 
    backgroundColor: '#007bff', 
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  changeInfoButtonText: {
    color: '#fff', 
    fontSize: 12, 
    fontWeight: 'bold',
  },
});

export default AccountScreen;
