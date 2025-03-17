// src/Home.js
import React from 'react';
import { View, Text } from 'react-native';

const Home = () => {
    return (
        <View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                Bienvenue sur la page d'accueil de mon application !
            </Text>
            <Text style={{ fontSize: 16, marginTop: 10 }}>
                Ceci est la page d'accueil de votre application mobile en React Native.
            </Text>
        </View>
    );
}

export default Home;
