import React from 'react';
import { View, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import { router } from 'expo-router';

const Header = () => {
  const navigation = useNavigation(); // Lấy đối tượng navigation
  
  return (
    <ImageBackground 
      source={require('../../assets/images/1.jpg')} // Sử dụng ảnh làm nền
      style={styles.container}
      resizeMode="cover" // Đảm bảo ảnh phủ kín
    >
      <Image source={require('../../assets/images/OIP (1).jpg')} style={styles.logo} />

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm sản phẩm..."
        placeholderTextColor="#fff" // Màu chữ placeholder
      />
    
      <TouchableOpacity onPress={() => router.push("./screens/Cart")}>
        <Image source={require('../../assets/images/download.jpg')} style={styles.cartIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    width: '102%', // Đảm bảo chiều rộng bằng 100%
    height: 150, // Tăng chiều cao của header
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50, // Đặt bán kính viền để tạo hình tròn
    marginLeft: 10,
  },
  searchInput: {
    flex: 1,
    marginHorizontal: 10,
    padding: 5,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Nền nhập liệu mờ để dễ nhìn
  },
  cartIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
});

export default Header;
