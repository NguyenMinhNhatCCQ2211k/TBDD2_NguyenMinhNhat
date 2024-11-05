import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Đối tượng ánh xạ giữa danh mục và hình ảnh
const categoryImages: Record<string, any> = {
  electronics: require('../assets/images/OIP (6).jpg'),
  jewelery: require('../assets/images/OIP (11).jpg'),
  "men's clothing": require('../assets/images/th.jpg'),
  "women's clothing": require('../assets/images/OIP (12).jpg'),
};

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

const Categories: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Lấy danh mục từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Lỗi khi lấy danh mục:', error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Lấy sản phẩm theo danh mục được chọn
  const fetchProductsByCategory = async (category: string) => {
    setLoadingProducts(true);
    setSelectedCategory(category);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Lỗi khi lấy sản phẩm theo danh mục:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  if (loadingCategories) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() => {
        navigation.navigate('ProductDetail', { id: item.id });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>Giá: ${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Danh sách danh mục */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => fetchProductsByCategory(item)}
          >
            <View style={[styles.categoryImageContainer, selectedCategory === item && styles.selectedImageContainer]}>
              <Image 
                source={categoryImages[item] || require('../assets/images/R.jpg')} 
                style={styles.categoryImage} 
              />
            </View>
            <Text style={[
              styles.categoryName,
              selectedCategory === item && styles.selectedCategoryName,
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
     
      {/* Hiển thị sản phẩm theo danh mục đã chọn */}
      {selectedCategory && (
        <View style={styles.productsContainer}>
          <Text style={styles.header}>Products by category</Text>
          {loadingProducts ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderProductItem}
              horizontal
              showsHorizontalScrollIndicator={true}
              contentContainerStyle={styles.flatListContainer}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 10,
  },
  categoryImageContainer: {
    borderWidth: 2,
    borderColor: 'transparent', // Mặc định không có viền
    borderRadius: 10, // Để bo góc
  },
  selectedImageContainer: {
    borderColor: 'gray', // Viền màu xám khi được chọn
  },
  categoryImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  categoryName: {
    textAlign: 'center',
    marginTop: 5,
    color: '#000',
  },
  selectedCategoryName: {
    textDecorationLine: 'underline', // Gạch chân tên danh mục
  },
  productsContainer: {
    marginTop: 20,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  productContainer: {
    width: 150,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
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
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Categories;
