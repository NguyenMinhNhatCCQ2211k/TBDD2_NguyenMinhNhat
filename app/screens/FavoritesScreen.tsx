import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image, ImageBackground, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
  FeaturedProducts: undefined;
  ProductDetail: { id: number };
};

type FeaturedProductsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FeaturedProducts'>;

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

const facebookLinks = [
  'https://www.youtube.com/watch?v=7A1IJqGgaAY',
  'https://www.youtube.com/watch?v=YNfSzWyWGVg',
  'https://www.youtube.com/watch?v=hqBjda_bf3I',
  'https://www.youtube.com/watch?v=rtzebRfn0_I',
];

const FeaturedProducts: React.FC = () => {
  const navigation = useNavigation<FeaturedProductsScreenNavigationProp>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await response.json();
        setProducts(data);
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

  const featuredProducts = products.filter(product => 
    product.rating.rate > 4 && product.rating.count > 300
  );

  const renderProductItem = ({ item, index }: { item: Product, index: number }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity
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
      <TouchableOpacity
        style={styles.facebookButton}
        onPress={() => Linking.openURL(facebookLinks[index])}
      >
        <Text style={styles.buttonText}>See Review</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/BG.jpg')} // Đường dẫn tới hình ảnh nền
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Hot Products</Text>

        <FlatList
          data={featuredProducts}
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
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
  facebookButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#3b5998', 
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FeaturedProducts;
