import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { StackNavigationProp } from '@react-navigation/stack';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  AllProducts: undefined;
  ProductDetail: { id: number };
};

type AllProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AllProducts'>;

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

const AllProducts: React.FC = () => {
  const navigation = useNavigation<AllProductsScreenNavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState(100);
  const [rating, setRating] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categories, setCategories] = useState<string[]>(['all']);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await response.json();
        setProducts(data);
        
        const uniqueCategories = ['all', ...new Set(data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === 'all' || product.category === selectedCategory) &&
      product.price <= maxPrice &&
      product.rating.rate >= rating
    );
  });

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>Giá: ${item.price.toFixed(2)}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.productRating}>{item.rating.rate.toFixed(1)}</Text>
        <Icon name="star" size={14} color="#FFFF00" />
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/BG.jpg')} // Đường dẫn tới hình ảnh nền
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Tất cả sản phẩm</Text>
        
        <View style={styles.filterContainer}>
          <View style={styles.filterItem}>
            <Text>Chọn danh mục:</Text>
            <Picker
              selectedValue={selectedCategory}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
              {categories.map((category) => (
                <Picker.Item label={category} value={category} key={category} />
              ))}
            </Picker>
          </View>

          <View style={styles.filterItem}>
            <Text>Khoảng giá: ${maxPrice}</Text>
            <Slider
              style={{ width: '100%' }}
              minimumValue={0}
              maximumValue={1000}
              step={1}
              value={maxPrice}
              onValueChange={(value) => setMaxPrice(value)}
            />
          </View>

          <View style={styles.filterItem}>
            <Text>Đánh giá: {rating.toFixed(1)}</Text>
            
            <Slider
              style={{ width: '100%' }}
              minimumValue={0}
              maximumValue={5}
              step={0.1}
              value={rating}
              onValueChange={(value) => setRating(value)}
            />
          </View>
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
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
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Nền trắng trong suốt để nội dung dễ đọc hơn
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  filterItem: {
    flex: 1,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 10,
  },
  productContainer: {
    flex: 1,
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 14,
    color: '#ff3d00',
  },
  productRating: {
    fontSize: 12,
    color: '#777',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flatListContainer: {
    paddingBottom: 10,
  },
});

export default AllProducts;
