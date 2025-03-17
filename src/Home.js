import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function Home() {
    return (
        <View style={styles.container}>
            {/* Image d'en-tête */}
            <Image
                source={require('../assets/Sport.png')} // Assurez-vous que l'image est bien placée
                style={styles.logo}
            />

            {/* Titre */}
            <Text style={styles.title}>Bienvenue sur Suivi Sportif</Text>

            {/* Description ou texte d'introduction */}
            <Text style={styles.subtitle}>Suivez vos séances sportives et atteignez vos objectifs !</Text>

            {/* Boutons d'action */}
            <TouchableOpacity style={styles.button} onPress={() => alert('Go to Activity')}>
                <Text style={styles.buttonText}>Commencer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonOutline} onPress={() => alert('Go to Settings')}>
                <Text style={styles.buttonOutlineText}>Paramètres</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        padding: 5,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 10,
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
        padding: 15,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonOutline: {
        borderWidth: 2,
        borderColor: '#3498db',
        padding: 15,
        width: '80%',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonOutlineText: {
        color: '#3498db',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
