import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
}

const Notifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hàm giả lập để lấy thông báo
    const fetchNotifications = async () => {
      // Giả lập dữ liệu thông báo
      const data: Notification[] = [
        { id: 1, title: 'Big Promotion!', message: '20% discount on next order.', date: '2024-11-01' },
        { id: 2, title: 'Delivery Notice', message: 'Your order has been delivered successfully!', date: '2024-10-30' },
        { id: 3, title: 'Whats New', message: 'New product is available in stores!', date: '2024-10-29' },
        // Thêm nhiều thông báo khác nếu cần
      ];
      setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
      <Text style={styles.notificationDate}>{item.date}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/BG.jpg')} // Đường dẫn tới hình ảnh nền
      style={styles.background}
    >
      <View style={styles.container}>
      
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id.toString()}
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
  notificationContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.62,
    elevation: 4,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationMessage: {
    fontSize: 14,
    marginVertical: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#777',
  },
  flatListContainer: {
    paddingBottom: 10,
  },
});

export default Notifications;
