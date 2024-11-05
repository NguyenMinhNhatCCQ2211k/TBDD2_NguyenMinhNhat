import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Image, ImageBackground, TouchableOpacity, FlatList, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Khai báo kiểu cho sản phẩm
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}


type RootStackParamList = {
  ProductDetail: { id: number }; 
  Cart: undefined;
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // Kiểu string cho query
  const [suggestions, setSuggestions] = useState<Product[]>([]); // Danh sách sản phẩm kiểu Product[]
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Sử dụng NavigationProp

  // Hàm tìm kiếm sản phẩm từ API
  const fetchProducts = async (query: string) => {
    try {
      const response = await axios.get<Product[]>('https://fakestoreapi.com/products'); 
      const filteredProducts = response.data.filter((product: Product) =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
      
      if (checkProductsExist(filteredProducts)) { // Kiểm tra sản phẩm có tồn tại hay không
        setSuggestions(filteredProducts); // Cập nhật danh sách gợi ý
      } else {
        setSuggestions([]); // Nếu không có sản phẩm nào, xóa gợi ý
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm kiểm tra xem có sản phẩm nào trong danh sách gợi ý không
  const checkProductsExist = (products: Product[]): boolean => {
    return products.length > 0;
  };

  // Theo dõi sự thay đổi của ô tìm kiếm
  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchProducts(searchQuery); // Gọi API khi có từ khóa
    } else {
      setSuggestions([]); // Xóa gợi ý khi ô tìm kiếm rỗng
    }
  }, [searchQuery]);

  return (
    <ImageBackground 
      source={require('../../assets/images/1.jpg')}
      style={styles.container}
      resizeMode="cover"
    >
      <Image source={require('../../assets/images/OIP (1).jpg')} style={styles.logo} />

      <View style={{ flex: 1 }}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products..."
          placeholderTextColor="#fff"
          value={searchQuery}
          onChangeText={setSearchQuery} 
        />

        {suggestions.length > 0 && (
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()} 
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => { 
                  console.log("Product ID:", item.id);
                  navigation.navigate('ProductDetail', { id: item.id }) 
                }}
              >
                <Text style={styles.suggestionItem}>{item.title}</Text>
              </TouchableOpacity>
            )}
            style={styles.suggestionsContainer}
          />
        )}
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
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
    width: '105%',
    height: 150,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
  },
  searchInput: {
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  cartIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  suggestionsContainer: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
    width: '100%',
    zIndex: 1000,
  },
  suggestionItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default Header;
