import React from 'react';
import { AppRegistry } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigation from './Navigations/TabNavigation';
import AuthStack from './Navigations/AuthStack';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_Y29uY3JldGUtbWFydGVuLTIuY2xlcmsuYWNjb3VudHMuZGV2JA'>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <SignedIn>
            <TabNavigation />
          </SignedIn>
          <SignedOut>
            <AuthStack />
          </SignedOut>
        </NavigationContainer>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// Register the main component with AppRegistry
AppRegistry.registerComponent('main', () => App);
