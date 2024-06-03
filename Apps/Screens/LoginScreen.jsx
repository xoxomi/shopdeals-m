import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    useWarmUpBrowser();
    const navigation = useNavigation();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

    const onPress = React.useCallback(async () => {
        try {
            const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow();

            if (createdSessionId) {
                setActive({ session: createdSessionId });
            } else {
                // Handle signIn or signUp for next steps such as MFA
            }
        } catch (err) {
            console.error("OAuth error", err);
            Alert.alert("OAuth Error", "An error occurred during the OAuth process. Please try again.");
        }
    }, [startOAuthFlow]);

    const handleLoginPress = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('./../../assets/images/loginwelcome1.jpg')}
                style={styles.image}
            />
            <View style={styles.content}>
                <Text style={styles.title}>Your Campus Marketplace</Text>
                <Text style={styles.subtitle}>
                    A place where you save money and mother earth by buying and selling preloved items from your fellow students! StudentDeals is here for you.
                </Text>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.button}
                    accessibilityLabel="Get Started"
                    accessibilityRole="button"
                >
                    <Text style={styles.buttonText}>Let's Get Started</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleLoginPress}
                    style={styles.loginLink}
                    accessibilityLabel="Login"
                    accessibilityRole="button"
                >
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
    },
    content: {
        padding: 16,
        backgroundColor: 'white',
        marginTop: -20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 38,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 18,
        color: '#718096',
        marginTop: 16,
    },
    button: {
        padding: 16,
        backgroundColor: '#6B46C1',
        borderRadius: 24,
        marginTop: 32,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
    },
    loginLink: {
        marginTop: 16,
        alignItems: 'center',
    },
    loginText: {
        color: '#6B46C1',
        fontSize: 18,
        textDecorationLine: 'underline', // Adding underline style
    },
});
