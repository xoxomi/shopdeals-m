import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function Header()  {
    const {user}=useUser();
  return (
    <View>
       { /*user info section*/}
        <View className="flex flex-row items-center gap-2">
        <Image source={{uri:user?.imageUrl}} 
            className="rounded-full w-12 h-12"
        />

        <View>
            <Text className="text-[16px]">Welcome to StudentDeals!</Text>
            <Text className="text-[20px]  font-bold">{user?.fullName}</Text>
        </View>
        </View>
        { /*sa search bar*/}
        <View className="p-[5px] px-5
        flex flex-row items-center 
        gap-1 bg-blue-50 mt-5 rounded-full border-[5px] border-blue-300">
        <Ionicons name="search" size={24} color="gray" />
            <TextInput placeholder='Search' className="mr-2 text-[18px]"
            onChange={(value)=>console.log(value)}
            />
        </View>
    </View>
     
  )
}

