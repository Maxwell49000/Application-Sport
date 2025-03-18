import React from "react";
import { Image } from 'react-native';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/Sport.png')} style={styles.logo} />

            <Text style={styles.title}>Bienvenue sur l'application de suivi sportif</Text>
            <Text style={styles.subtitle}>Suivez vos activités et améliorez vos performances.</Text>

            {/* Bouton personnalisé avec TouchableOpacity */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Activites")}
            >
                <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 5,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 60,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 100,
    },
    subtitle: {
        fontSize: 18,
        color: '#7f8c8d',
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 40,
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 20,
        paddingHorizontal: 40,
        width: '80%', // Prend 80% de la largeur de l'écran
        alignItems: 'center',
        borderRadius: 15,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Home;
