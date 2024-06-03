import React, { useEffect, useState } from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import Header from './Components/HomeScreen/Header';
import Slider from './Components/HomeScreen/Slider';
import Categories from './Components/HomeScreen/Categories';
import LatestItemList from './Components/HomeScreen/LatestItemList';
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore';
import { app } from '../../firebaseConfig';

export default function HomeScreen() {
  const db = getFirestore(app);
  const [sliderList, setSliderList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [latestItemList, setLatestItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await Promise.all([getSliders(), getCategoryList(), getLatestItemList()]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const getSliders = async () => {
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    const sliders = [];
    querySnapshot.forEach((doc) => {
      sliders.push(doc.data());
    });
    setSliderList(sliders);
  };

  const getCategoryList = async () => {
    const querySnapshot = await getDocs(collection(db, 'Category'));
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push(doc.data());
    });
    setCategoryList(categories);
  };

  const getLatestItemList = async () => {
    const querySnapshot = await getDocs(collection(db, 'UserPost'), orderBy('createdAt', 'desc'));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    setLatestItemList(items);
  };

  return (
    <ScrollView className="p-9 px-6 bg-white flex-1">
      <Header />
      <Slider sliderList={sliderList} />
      <Categories categoryList={categoryList} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <LatestItemList latestItemList={latestItemList} heading={'Latest Items'} />
      )}
    </ScrollView>
  );
}
