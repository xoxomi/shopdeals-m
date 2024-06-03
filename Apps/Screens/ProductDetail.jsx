import { View, Text, Image, TouchableOpacity, Linking, Share, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@clerk/clerk-expo';
import { collection, deleteDoc, doc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { app } from '../../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function ProductDetail({navigation}) {

    const {params}=useRoute();
    const [product,setProduct]=useState([]);
    const { user }=useUser();
    const db=getFirestore(app);
    const nav=useNavigation();
    

    useEffect(()=>{
        //console.log(params)
        params&&setProduct(params.product);
        shareButton();
    },[params,navigation])


    const shareButton=()=>{
      navigation.setOptions({
        headerRight:()=> (
            <Ionicons name="share-social-sharp" size={24} 
            onPress={()=>shareProduct()}
              color="white"
              style={{marginRight:15}} />
        ),
      });
    }

    const shareProduct=()=>{
      //console.log("Share Click")
      const content={
        message:product?.title+"\n"+product?.desc,
      }
      Share.share(content).then(resp=>{
        console.log(resp);
      },(error)=>{
        console.log(error);
      })
    }

    const sendEmailMessage=()=>{
        const subject='Regarding '+product.title;
        const body="Hi "+product.userName+"\n"+"I am interested in this product";
        Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body)
    }

    const deleteUserPost=()=>{
      console.log("User Post Delete Click")
      Alert.alert('Do you want to Delete?',"Are you sure you want to delete this product?",[
        {
          text:'Yes',
          onPress:()=>deleteFromFirestore()
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        }
      ])
    }
    const deleteFromFirestore = async () => {
      console.log('Deleted');
      const q = query(collection(db, 'UserPost'), where('title', '==', product.title));
      const snapshot = await getDocs(q);
      snapshot.forEach(async (doc) => {
          try {
              await deleteDoc(doc.ref);
              console.log("Deleted successfully");
              nav.goBack();
          } catch (error) {
              console.error("Error deleting document: ", error);
          }
      });
  }

  const addToCart = () => {
    // Handle adding product to cart logic here
    console.log('Added to cart:', product);
    console.log(params); // Make sure product is included in the params object
  //  navigation.navigate('CartScreen', { product: productData });

    //navigation.navigate('CartScreen', { product: product });
  };

  return (
    <ScrollView className="bg-white">
      <Image source={{uri:product.image}} className="h-[320px] w-full" />

      <View className="p-3">
        <Text className="text-[25px] font-bold">{product?.title}</Text>
        <Text className="items-baseline">
            <Text className="bg-blue-200 
            p-1 mt-2 px-2 
            rounded-full
            text-blue-500">
            {product.category}
            </Text>
        </Text>
        <Text className="mt-3 font-bold text-[20px]">Description</Text>
        <Text className="text-[17px] text-gray-500">{product?.desc}</Text>
      </View>

      <View className="p-3 flex flex-row items-center gap-3 bg-blue-100 border-gray-400">
        <Image source={{uri:product.userImage}} 
        className="w-12 h-12 rounded-full"
        />
        <View >
            <Text className="font-bold text-[18px]">{product.userName}</Text>
            <Text className="text-gray-500">{product.userEmail}</Text>
        </View>
      </View>

      {user?.primaryEmailAddress.emailAddress==product.userEmail?
      <TouchableOpacity 
      onPress={()=>deleteUserPost()}
      className=" z-40 bg-red-500 rounded-full p-4 m-2">
        <Text className="text-center text-white">Delete Product</Text>
      </TouchableOpacity>
      :
      <>
      <TouchableOpacity 
      onPress={()=>sendEmailMessage()}
      className=" z-40 bg-blue-500 rounded-full p-4 m-2">
        <Text className="text-center text-white">Send Message</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={()=>addToCart()}
      className=" z-40 bg-green-500 rounded-full p-4 m-2">
        <Text className="text-center text-white">Add to Cart</Text>
      </TouchableOpacity>
      </>
      }
      
    </ScrollView>
  )
}
