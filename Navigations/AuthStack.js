import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../Apps/Screens/LoginScreen';
import Login from '../Apps/Screens/Components/Login';
import HomeScreen from '../Apps/Screens/HomeScreen';
import RegisterScreen from '../Apps/Screens/Components/Register';

const Stack = createStackNavigator();

export default function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
    );
}
