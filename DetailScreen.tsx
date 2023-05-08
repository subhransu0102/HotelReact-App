import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DetailScreenProps {
  route: {
    params: {
      fullName: string;
    };
  };
}

const DetailScreen = ({ route }: DetailScreenProps) => {
  const { fullName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>The hotel name is:</Text>
      <Text style={styles.hotelName}>{fullName}</Text>
      <Text style={styles.description}>This is one of the most visited places.</Text>
      <Text style={styles.description}>Book your room now only on hotels.com.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Add a background color
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  hotelName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default DetailScreen;
