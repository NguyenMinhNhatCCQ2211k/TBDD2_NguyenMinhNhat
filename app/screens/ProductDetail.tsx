import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const ProductDetailScreen = () => {
  const [quantity, setQuantity] = useState(1); // State để theo dõi số lượng

  const product = {
    name: 'Sản phẩm mẫu',
    version: 'Phiên bản 1.0',
    image: require('../../assets/images/OIP (8).jpg'),
    dimensions: '15 x 7 x 0.8 cm',
    weight: '150 g',
    material: 'Nhựa',
    connectivity: 'USB, Bluetooth, 3.5mm',
    batteryLife: '10 giờ',
    specialFeatures: 'Chống nước, Âm thanh chất lượng cao',
    audioTechnology: 'Chống ồn',
    softwareFeatures: 'Ứng dụng điều khiển, tính năng tùy chỉnh',
    colors: ['#000000', '#00BFFF', '#FF0000'],
    price: '1.500.000 VNĐ',
    warranty: '12 tháng',
    additionalInfo: 'Nơi sản xuất: Việt Nam, Mã sản phẩm: 12345',
  };

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <ScrollView style={styles.container}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productVersion}>{product.version}</Text>

      <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
      <View style={styles.specsContainer}>
        <Text style={styles.specsItem}>
          Kích thước và trọng lượng: {product.dimensions} ({product.weight})
        </Text>
        <Text style={styles.specsItem}>Chất liệu: {product.material}</Text>
        <Text style={styles.specsItem}>Kết nối: {product.connectivity}</Text>
        <Text style={styles.specsItem}>Thời gian sử dụng pin: {product.batteryLife}</Text>
      </View>

      <Text style={styles.sectionTitle}>Chức năng và tính năng</Text>
      <View style={styles.featuresContainer}>
        <Text style={styles.featuresItem}>Chức năng đặc biệt: {product.specialFeatures}</Text>
        <Text style={styles.featuresItem}>Công nghệ âm thanh: {product.audioTechnology}</Text>
        <Text style={styles.softwareFeatures}>{product.softwareFeatures}</Text>
      </View>



      <Text style={styles.sectionTitle}>Màu sắc</Text>
      <View style={styles.colorContainer}>
        {product.colors.map((color, index) => (
          <View key={index} style={[styles.colorBox, { backgroundColor: color }]} />
        ))}
      </View>

      <Text style={styles.price}>Giá: {product.price}</Text>

      {/* Thanh tăng giảm số lượng */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Nút mua ngay */}
      <TouchableOpacity style={styles.buyNowButton}>
        <Text style={styles.buyNowButtonText}>Mua ngay</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Bảo hành 12 tháng</Text>

      <Text style={styles.sectionTitle}>Thông tin thêm</Text>
      <Text style={styles.additionalInfo}>{product.additionalInfo}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productVersion: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specsContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  specsItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  featuresContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  featuresItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  softwareFeatures: {
    fontSize: 16,
    marginBottom: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 5,
    marginRight: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buyNowButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buyNowButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  additionalInfo: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
  },
});

export default ProductDetailScreen;
