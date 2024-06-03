import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';

const CartScreen = () => {
  const route = useRoute();
  const { product } = route.params ?? {};

  // Check if product is defined before accessing its properties
  const title = product ? product.title : 'No Product Title';
  const description = product ? product.description : 'No Product Description';

  return (
    <View style={styles.container}>
      <Text style={styles.title}></Text>
      {product ? (
        <View style={styles.productContainer}>
          <Text style={styles.productText}>Product Title: {title}</Text>
          <Text style={styles.productText}>Product Description: {description}</Text>
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Image source={require('./../../assets/images/empty-cart.png')} style={styles.emptyCartImage} />
          <Text style={styles.noProductText}>Your cart is empty</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  productText: {
    fontSize: 16,
    marginBottom: 10,
  },
  emptyCartContainer: {
    alignItems: 'center',
  },
  emptyCartImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  noProductText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
});

export default CartScreen;
