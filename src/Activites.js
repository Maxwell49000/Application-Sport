import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';  // Correct import
import './App.css';  // Ou './Activites.css' selon ton fichier (pour le style Web)

const Activites = ({ navigation }) => {
    const [activites, setActivites] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(""); // Catégorie sélectionnée

    // Fonction pour récupérer les activités
    const fetchActivites = async () => {
        let url = "https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/getAllActivities";

        // Si une catégorie est sélectionnée, on utilise l'endpoint de filtrage
        if (selectedCategory) {
            url = `https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/getActivitesByCategory?activite=${encodeURIComponent(selectedCategory)}`;
        }

        try {
            console.log("Requête envoyée à :", url); // DEBUG
            const response = await fetch(url);
            const data = await response.json();
            setActivites(data);
        } catch (error) {
            console.error('Erreur de récupération des activités:', error);
        }
    };

    // Récupérer les activités lors du premier rendu de la page
    useEffect(() => {
        fetchActivites();
    }, [selectedCategory]);  // Relancer la récupération des activités lorsque la catégorie change

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

            {/* Picker pour filtrer les activités par catégorie */}
            <Picker
                selectedValue={selectedCategory}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
            >
                <Picker.Item label="Toutes les catégories" value="" />
                <Picker.Item label="Course à pied" value="Course à pied" />
                <Picker.Item label="Vélo" value="Vélo" />
                <Picker.Item label="Natation" value="Natation" />
                <Picker.Item label="Marche" value="Marche" />
                {/* Ajouter d'autres catégories selon ton modèle de données */}
            </Picker>

            {/* Bouton pour ajouter une activité avec TouchableOpacity */}
            <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate("AjouterActivite")}
            >
                <Text style={styles.addButtonText}>Ajouter une activité</Text>
            </TouchableOpacity>

            {/* Affichage de la liste d'activités */}
            <FlatList
                data={activites}
                keyExtractor={(item) => item.id_activite.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemTitle}>{item.nom_activite}</Text>
                        <Text style={styles.itemText}>Durée : {item.duree} minutes</Text>
                        <Text style={styles.itemText}>Catégorie : {item.nom_categorie}</Text>
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
    picker: {
        height: 50,
        width: "100%",
        marginBottom: 20,
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
    addButton: { // Style pour le bouton
        marginTop: 20, // Espacement entre le picker et le bouton
        marginBottom: 30, // Espacement avant la liste des activités
        paddingVertical: 10,
        backgroundColor: "#007BFF",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    addButtonText: { // Style pour le texte du bouton
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default Activites;
