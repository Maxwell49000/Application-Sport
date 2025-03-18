import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import './App.css';  // Ou './Activites.css' selon ton fichier (pour le style Web)

const Activites = ({ navigation }) => {
    const [activites, setActivites] = useState([]);

    // Fonction pour récupérer les activités
    const fetchActivites = async () => {
        try {
            const response = await fetch("https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/getAllActivities");
            const data = await response.json();
            setActivites(data);
        } catch (error) {
            console.error('Erreur de récupération des activités:', error);
        }
    };

    // Récupérer les activités lors du premier rendu de la page
    useEffect(() => {
        fetchActivites();
    }, []);

    // Rafraîchir la liste des activités lorsqu'on revient sur la page
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchActivites();
        });

        return unsubscribe; // Clean-up pour éviter les fuites de mémoire
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Liste des Activités</Text>

            {/* Bouton pour ajouter une activité */}
            <Button
                title="Ajouter une activité"
                onPress={() => navigation.navigate("AjouterActivite")}
                color="#007BFF"
            />

            {/* Affichage de la liste d'activités */}
            <FlatList
                data={activites}
                keyExtractor={(item) => item.id_activite.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item.nom_activite}</Text>
                        <Text style={styles.itemText}>Durée : {item.duree} minutes</Text>
                        <Text style={styles.itemText}>{item.nom_categorie}</Text>
                        <Button
                            title="Voir les détails"
                            onPress={() => navigation.navigate('ActiviteDetails', { activiteId: item.id_activite })}
                        />
                    </View>
                )}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#f4f4f9',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: 'center',
    },
    itemContainer: {
        backgroundColor: "#f9f9f9",
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },
    itemText: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
    },
    flatListContent: {
        paddingBottom: 20,
    },
});

export default Activites;
