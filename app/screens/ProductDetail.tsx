import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import Slider from '@react-native-community/slider';
import { useNavigation, RouteProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showMessage } from 'react-native-flash-message';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootParamList = {
  ProductDetail: { id: number };
  Cart: undefined;  
};

// Định nghĩa kiểu route và navigation
type ProductDetailRouteProp = RouteProp<RootParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = StackNavigationProp<RootParamList, 'ProductDetail'>;


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

// Định nghĩa kiểu dữ liệu CartItem
interface CartItem {
  productId: number;
  title: string;
  price: number;
  quantity: number;
  selectedColor: string;
  image:string
}

interface Props {
  route: ProductDetailRouteProp;
  navigation: ProductDetailNavigationProp;
}

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string>('black');


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Text>Loading...</Text>;
  }

  const handleAddToCart = async () => {
    // Kiểm tra nếu product chưa được tải
    if (!product) {
      console.error('Product not available');
      return;
    }

    // Hiển thị thông báo khi thêm sản phẩm vào giỏ hàng
    showMessage({
      message: `Đã thêm ${quantity} sản phẩm vào giỏ hàng!`,
      type: 'success',
      duration: 3000,
      position: 'top',
    });

    const cartItem: CartItem = {
      productId: product.id,
      title: product.title,
      price: product.price,
      quantity,
      image:product.image,
      selectedColor,
    };

    console.log('Cart Item:', cartItem);

    try {
      const existingCart = await AsyncStorage.getItem('cartItems');
      const cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
      
      const existingItemIndex = cartItems.findIndex((item: CartItem) => 
        item.productId === product.id && item.selectedColor === selectedColor
      );
      
      if (existingItemIndex >= 0) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Nếu không, thêm sản phẩm mới vào giỏ hàng
        cartItems.push(cartItem);
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart items:', error);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/BG.jpg')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header với nút quay lại và giỏ hàng */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Product Details</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartButton}>
            <Icon name="cart-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <Image source={{ uri: product.image }} style={styles.productImage} />

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.category}>Category: {product.category}</Text>
        <Text style={styles.price}>Price: ${product.price.toFixed(2)}</Text>

        {/* Hiển thị đánh giá với biểu tượng sao */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>Rating: {product.rating.rate}</Text>
          <AntDesign name="star" size={20} color="gold" />
          <Text style={styles.reviewCount}> ({product.rating.count} reviews)</Text>
        </View>

        {/* Mô tả sản phẩm */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{product.description}</Text>
        </View>

        {/* Chọn màu sắc */}
        <View style={styles.colorContainer}>
          <Text style={styles.label}>Select Color:</Text>
          <View style={styles.colors}>
            {['black', 'red', 'blue', 'white'].map(color => (
              <TouchableOpacity
                key={color}
                onPress={() => setSelectedColor(color)}
                style={[styles.colorOption, { backgroundColor: color }, selectedColor === color && styles.selectedColor]}
              />
            ))}
          </View>
        </View>

        {/* Chọn số lượng */}
        <View style={styles.quantityContainer}>
          <Text style={styles.label}>Quantity: {quantity}</Text>
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            value={quantity}
            onValueChange={setQuantity}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#000000"
          />
        </View>

        {/* Nút Thêm vào giỏ hàng */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

// Styles cho component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartButton: {
    padding: 10,
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#ff3d00',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rating: {
    fontSize: 16,
    marginRight: 5,
  },
  reviewCount: {
    fontSize: 16,
    color: 'gray',
  },
  descriptionContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
  colorContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  colors: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: 'gray',
  },
  quantityContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#1EB1FC',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProductDetail;
