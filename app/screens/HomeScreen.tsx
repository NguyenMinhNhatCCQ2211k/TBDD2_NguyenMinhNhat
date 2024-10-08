import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface Product {
  id: string;
  name: string;
  image: any;
  oldPrice?: number;
  newPrice?: number;
  price?: number;
}

const categories = [
  { id: '1', name: 'Điện thoại', image: require('../../assets/images/OIP.jpg') },
  { id: '2', name: 'Máy tính', image: require('../../assets/images/OIP (4).jpg') }, // Sửa tên file hợp lệ
  { id: '3', name: 'Tai nghe', image: require('../../assets/images/OIP (5).jpg') }, // Sửa tên file hợp lệ
  { id: '4', name: 'Chuột', image: require('../../assets/images/OIP (6).jpg') }, // Sửa tên file hợp lệ
  { id: '5', name: 'Bàn phím', image: require('../../assets/images/2.jpg') },
];

const discountedProducts: Product[] = [
  { id: '1', name: 'Samsung Galaxy S23', image: require('../../assets/images/OIP (7).jpg'), oldPrice: 1000000, newPrice: 700000 },
  { id: '2', name: 'iPhone 14', image: require('../../assets/images/OIP (8).jpg'), oldPrice: 1500000, newPrice: 1200000 },
  { id: '3', name: 'Google Pixel 7', image: require('../../assets/images/OIP (9).jpg'), oldPrice: 2000000, newPrice: 1800000 },
];

const newProducts: Product[] = [
  { id: '1', name: 'Dell XPS 13', image: require('../../assets/images/OIP.jpg'), price: 900000 },
  { id: '2', name: 'MacBook Air M2', image: require('../../assets/images/OIP.jpg'), price: 1200000 },
  { id: '3', name: 'HP Spectre x360', image: require('../../assets/images/OIP.jpg'), price: 1500000 },
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      {item.oldPrice ? (
        <>
          <Text style={styles.oldPrice}>{item.oldPrice} VNĐ</Text>
          <Text style={styles.newPrice}>{item.newPrice} VNĐ</Text>
        </>
      ) : (
        <Text style={styles.price}>{item.price} VNĐ</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ProductDetail')}
      >
        <Text style={styles.buttonText}>Xem sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image source={require('../../assets/images/R.jpg')} style={styles.banner} />
      </View>

      {/* Danh mục */}
      <View style={styles.categoryContainer}>
        <Text style={styles.header}>Danh mục</Text>
        <FlatList
          data={categories}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.categoryItem}>
              <Image source={item.image} style={styles.categoryImage} />
              <Text style={styles.categoryName}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      {/* Sản phẩm giảm giá */}
      <View style={styles.productContainer}>
        <Text style={styles.header}>Sản phẩm giảm giá</Text>
        <FlatList
          data={discountedProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>

      {/* Sản phẩm mới */}
      <View style={styles.productContainer}>
        <Text style={styles.header}>Sản phẩm mới</Text>
        <FlatList
          data={newProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          horizontal
        />
      </View>
    </ScrollView>
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
  categoryContainer: {
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryName: {
    textAlign: 'center',
    marginTop: 5,
  },
  productContainer: {
    marginBottom: 20,
  },
  productItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    width: 150,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  productName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: 'red',
  },
  newPrice: {
    fontWeight: 'bold',
    color: 'green',
  },
  price: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
