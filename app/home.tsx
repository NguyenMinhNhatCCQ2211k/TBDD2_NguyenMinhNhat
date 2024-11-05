import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import AccountScreen from './screens/AccountScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import Header from './screens/Header'; // Import Header
import { Ionicons } from '@expo/vector-icons';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart'; // Import màn hình Cart
import FlashMessage from 'react-native-flash-message'; 
import { createStackNavigator } from '@react-navigation/stack';
import AllProducts from './screens/AllProduct'; 


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack cho màn hình Home và ProductDetail
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ header: () => <Header /> }} 
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetail} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AllProducts" 
        component={AllProducts} 
        options={{ title: '' }} 
      />
      <Stack.Screen 
        name="Cart"  // Thêm màn hình Cart vào Stack
        component={Cart} 
        options={{ title: 'Cart' }} 
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Account') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Announcement') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Favourite') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else if (route.name === 'Cart') { // Thêm icon cho Giỏ hàng
              iconName = focused ? 'cart' : 'cart-outline';
            } else {
              iconName = 'home';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#14a2d7',
          tabBarInactiveTintColor: '#76c6e4',
        })}
      >
        {/* Sử dụng HomeStack thay vì HomeScreen */}
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Favourite" component={FavoritesScreen} />
        <Tab.Screen name="Announcement" component={NotificationsScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
        
      </Tab.Navigator>

      <FlashMessage position="top" style={{ backgroundColor: '#00CCCC' }} />
    </View>
  );
}
