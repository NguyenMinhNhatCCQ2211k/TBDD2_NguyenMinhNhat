import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Samsung Galaxy S23',
      image: require('../../assets/images/OIP (8).jpg'),
      price: 500000,
      quantity: 1,
    },
    {
      id: 2,
      name: 'iPhone 14',
      image: require('../../assets/images/OIP (9).jpg'),
      price: 700000,
      quantity: 2,
    },
  ]);

  const shippingFee = 30000; // Phí vận chuyển cố định

  const increaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalWithShipping = () => {
    return getTotalPrice() + shippingFee;
  };

  const handleCheckout = () => {
    Alert.alert('Thanh toán', 'Bạn đã nhấn thanh toán thành công!');
  };

  return (
    <ScrollView style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống</Text>
      ) : (
        cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price.toLocaleString()} VNĐ</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() => decreaseQuantity(item.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => increaseQuantity(item.id)}
                  style={styles.quantityButton}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng tiền sản phẩm: {getTotalPrice().toLocaleString()} VNĐ</Text>
        <Text style={styles.totalText}>Phí vận chuyển: {shippingFee.toLocaleString()} VNĐ</Text>
        <Text style={styles.totalAmount}>
          Tổng tiền cần thanh toán: {getTotalWithShipping().toLocaleString()} VNĐ
        </Text>
      </View>

      {/* Button Thanh toán */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#777',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 15,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
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
  removeButton: {
    marginTop: 10,
    backgroundColor: '#ff4d4f',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  totalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#000',
  },
  checkoutContainer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: '#EA4C4C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
