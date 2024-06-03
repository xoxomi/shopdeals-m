import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, orderBy, query } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import LatestItemList from './Components/HomeScreen/LatestItemList'

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(doc => doc.data());
      setProductList(products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>An error occurred: {error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="p-5 py-8">
      <Text className="text-[30px] font-bold">Explore More</Text>
      <LatestItemList latestItemList={productList} />
    </ScrollView>
  );
}
