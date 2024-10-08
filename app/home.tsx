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
import Cart from './screens/Cart';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack cho màn hình Home và ProductDetail
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Cart" component={Cart} options={{ title: 'Giỏ hàng' }} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* Header component */}
      <Header />
      
      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === 'Trang chủ') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Tài khoản') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Thông báo') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else if (route.name === 'Quan tâm') {
              iconName = focused ? 'heart' : 'heart-outline';
            } else {
              iconName = 'home'; // Biểu tượng mặc định
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {/* Sử dụng HomeStack thay vì HomeScreen */}
        <Tab.Screen name="Trang chủ" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Quan tâm" component={FavoritesScreen} />
        <Tab.Screen name="Thông báo" component={NotificationsScreen} />
        <Tab.Screen name="Tài khoản" component={AccountScreen} />
      </Tab.Navigator>
    </View>
  );
}
