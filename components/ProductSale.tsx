import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Định nghĩa kiểu dữ liệu cho RootParamList
type RootParamList = {
  ProductDetail: { id: number }; 
};

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductSale: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootParamList>>(); 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const json = await response.json();
        
        const filteredProducts = json.filter((product: Product) => product.rating.count > 300);
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Lỗi khi lấy sản phẩm:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />; 
  }

  const renderItem = ({ item }: { item: Product }) => {
    const discountedPrice = (item.price * 0.8).toFixed(2); 

    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() => navigation.navigate('ProductDetail', { id: item.id })} 
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <Text style={styles.productTitle}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <View style={styles.oldPriceContainer}>
            <Text style={styles.productPriceOld}>Price: ${item.price.toFixed(2)}</Text>
            <View style={styles.discountBox}>
              <Image 
                source={require('../assets/images/sale.jpg')} 
                style={styles.discountImage} 
                resizeMode="contain" 
              />
            </View>
          </View>
          <Text style={styles.productPriceNew}>New price: ${discountedPrice}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal 
        showsHorizontalScrollIndicator={true} 
        contentContainerStyle={styles.flatListContainer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  productContainer: {
    width: 150, // Đặt chiều rộng cố định cho sản phẩm
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10, // Khoảng cách giữa các sản phẩm
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 150, // Chiều cao có thể điều chỉnh
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  priceContainer: {
    flexDirection: 'column', // Bố trí dọc
    marginTop: 5,
  },
  oldPriceContainer: {
    flexDirection: 'row', // Bố trí ngang cho giá cũ và hình ảnh giảm giá
    alignItems: 'center', // Căn giữa
  },
  productPriceOld: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through', // Gạch ngang cho giá cũ
    marginRight: 5, // Khoảng cách giữa giá cũ và hình ảnh giảm giá
  },
  productPriceNew: {
    fontSize: 14,
    color: '#ff3d00',
    marginTop: 5, // Đặt giá mới xuống hàng
  },
  discountBox: {
    marginRight: 5, // Khoảng cách giữa nhãn và giá mới
  },
  discountImage: {
    width: 50, // Đặt chiều rộng cho hình ảnh giảm giá
    height: 20, // Đặt chiều cao cho hình ảnh giảm giá
  },
});

export default ProductSale;
