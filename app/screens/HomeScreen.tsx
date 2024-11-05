import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ProductHot from '../../components/ProductHot';
import ProductSale from '../../components/ProductSale';
import Categories from '../../components/categories';

const banners = [
  require('../../assets/images/R.jpg'),
  require('../../assets/images/R2.jpg'),
  require('../../assets/images/R1.jpg'),
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [currentBanner, setCurrentBanner] = useState(0);
  const backgroundImage = require('../../assets/images/BG.jpg');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image source={banners[currentBanner]} style={styles.banner} />
        </View>

        {/* Danh mục */}
        <Text style={styles.header}>Category</Text>
        <Categories />

        {/* Sản phẩm giảm giá */}
        <Text style={styles.header}>Discounted Products</Text>
        <ProductSale />

        {/* Sản phẩm mới */}
        <Text style={styles.header}>New Product</Text>
        <ProductHot />

        {/* Nút Xem thêm */}
        <TouchableOpacity
          style={styles.moreButton}
          onPress={() => navigation.navigate('AllProducts')} // Đảm bảo 'AllProducts' là một route hợp lệ
        >
          <Text style={styles.moreButtonText}>Show more</Text>
        </TouchableOpacity>

        {/* Nút Giỏ hàng */}
    
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bannerContainer: {
    marginBottom: 20,
  },
  banner: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  moreButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: '#6699FF',
  },
  moreButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default HomeScreen;
