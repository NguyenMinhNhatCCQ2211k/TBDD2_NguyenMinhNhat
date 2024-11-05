import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

export type RootStackParamList = {
  CartScreen: { productId: number; selectedColor: string; quantity: number };
  AllProducts: undefined;
};

type CartScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<RootStackParamList, 'CartScreen'>,
  StackNavigationProp<RootStackParamList>
>;

type CartScreenProps = {
  route: RouteProp<RootStackParamList, 'CartScreen'>;
  navigation: CartScreenNavigationProp;
};

const CartScreen: React.FC<CartScreenProps> = ({ route, navigation }) => {
  const { productId, selectedColor, quantity: initialQuantity } = route.params || { productId: 0, selectedColor: 'defaultColor', quantity: 1 };

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const shippingFee = 5;

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const savedCartItems = await AsyncStorage.getItem('cartItems');
        if (savedCartItems) {
          setCartItems(JSON.parse(savedCartItems));
        }
      } catch (error) {
        console.error('Error loading cart items:', error);
      }
    };

    loadCartItems();
  }, []);

  useEffect(() => {
    const saveCartItems = async () => {
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart items:', error);
      }
    };

    saveCartItems();
  }, [cartItems]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return; // Early return if productId is not valid

      try {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product: Product = await response.json();
        console.log('Product fetched from API:', product);
        const updatedProduct: Product = { ...product, color: selectedColor, quantity: initialQuantity };

        setCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => item.id === productId && item.color === selectedColor);
          if (existingItemIndex >= 0) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += initialQuantity; 
            return updatedItems;
          } else {
            return [...prevItems, updatedProduct]; 
          }
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId, selectedColor, initialQuantity]);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  };

  const getTotalWithShipping = () => {
    return getTotalPrice() + shippingFee;
  };

  const handleCheckout = () => {
    Alert.alert('Payment', 'You have successfully pressed the payment!');
  };

  const updateQuantity = (itemId: number, selectedColor: string, increment: boolean) => {
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId && item.color === selectedColor) { // Thêm điều kiện kiểm tra màu sắc
          const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };
  
  const removeItem = (itemId: number, selectedColor: string) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => !(item.id === itemId && item.color === selectedColor)); // Thêm điều kiện kiểm tra màu sắc
    });
  };
  
  return (
    <ImageBackground source={require('../../assets/images/BG.jpg')} style={styles.background}>
      <ScrollView style={styles.container}>
        {cartItems.length === 0 ? (
          <>
            <Text style={styles.emptyCartText}>Your shopping cart is empty</Text>
            <TouchableOpacity style={styles.goToProductsButton} onPress={() => navigation.navigate('AllProducts')}>
              <Text style={styles.goToProductsButtonText}>Buy now</Text>
            </TouchableOpacity>
          </>
        ) : (
          cartItems.map((item: Product) => (
            <View key={`${item.id}-${item.color}`} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productDetails}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>${(item.price || 0).toFixed(2)}</Text>
                <Text style={styles.productColor}>Color: {item.color}</Text>
                <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, item.color, false)} style={styles.quantityButton}>
  <Text style={styles.quantityButtonText}>-</Text>
</TouchableOpacity>
<Text style={styles.quantityText}>{item.quantity}</Text>

<TouchableOpacity onPress={() => updateQuantity(item.id, item.color, true)} style={styles.quantityButton}>
  <Text style={styles.quantityButtonText}>+</Text>
</TouchableOpacity>

<TouchableOpacity onPress={() => removeItem(item.id, item.color)} style={styles.removeButton}>
  <Ionicons name="trash" size={24} color="red" />
</TouchableOpacity>


                </View>
              </View>
            </View>
          ))
        )}

        {cartItems.length > 0 && (
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total product price: ${(getTotalPrice()).toFixed(2)}</Text>
            <Text style={styles.totalText}>Shipping Fee: ${shippingFee.toFixed(2)}</Text>
            <Text style={styles.totalAmount}>
              Total amount: ${(getTotalWithShipping()).toFixed(2)}
            </Text>
            <View style={styles.checkoutContainer}>
              <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                <Text style={styles.checkoutButtonText}>Payment</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
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
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
  },
  goToProductsButton: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  goToProductsButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
  },
  productColor: {
    fontSize: 14,
    color: '#555',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  quantityText: {
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 10,
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  totalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  checkoutContainer: {
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CartScreen;
