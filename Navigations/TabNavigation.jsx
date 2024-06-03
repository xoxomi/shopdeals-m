import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Apps/Screens/HomeScreen';
import ExploreScreen from '../Apps/Screens/ExploreScreen';
import AddPostScreen from '../Apps/Screens/AddPostScreen';
import ProfileScreen from '../Apps/Screens/ProfileScreen';
import { Ionicons,AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreStackScreenNav from './ExploreStackScreenNav';
import ProfileScreenStackNav from './ProfileScreenStackNav';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
   <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name='home-nav' component={HomeScreenStackNav} options={{tabBarLabel:({color})=>(<Text style={{color:color, fontSize:12,marginBottom:3}}>Home</Text>), tabBarIcon:({color,size}) => (
        <Ionicons name="home" size={size} color={color} />
      )}} />
      <Tab.Screen name='explore' component={ExploreStackScreenNav} options={{tabBarLabel:({color})=>(<Text style={{color:color, fontSize:12,marginBottom:3}}>Explore</Text>), tabBarIcon:({color,size}) => (
        <AntDesign name="search1" size={size} color={color} />
      )}} />
      <Tab.Screen name='addpost' component={AddPostScreen} options={{tabBarLabel:({color})=>(<Text style={{color:color, fontSize:12,marginBottom:3}}>Create</Text>), tabBarIcon:({color,size}) => (
        <Ionicons name="add-circle" size={size} color={color} />
      )}} />
      <Tab.Screen name='profile' component={ProfileScreenStackNav} options={{tabBarLabel:({color})=>(<Text style={{color:color, fontSize:12,marginBottom:3}}>Profile</Text>), tabBarIcon:({color,size}) => (
        <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
      )}} />
    
   </Tab.Navigator>
  )
}
