import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, Alert, ScrollView } from "react-native";

const ActiviteDetails = ({ route, navigation }) => {
    const { activiteId } = route.params; // Récupère l'id de l'activité passé dans la navigation
    const [activite, setActivite] = useState(null);

    useEffect(() => {
        const fetchActiviteDetails = async () => {
            try {
                const response = await fetch(`https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/getActivityById/${activiteId}`);
                const data = await response.json();
                setActivite(data);
            } catch (error) {
                console.error('Erreur de récupération des détails de l\'activité:', error);
            }
        };

        fetchActiviteDetails();
    }, [activiteId]);

    if (!activite) {
        return (
            <View style={styles.container}>
                <Text style={styles.loading}>Chargement...</Text>
            </View>
        );
    }

    const handleModify = () => {
        // Navigation vers la page de modification, avec les données de l'activité
        navigation.navigate('ModifyActivity', {
            activiteId: activite.id_activite,
            nom_activite: activite.nom_activite,
            duree: activite.duree,
            date_activite: activite.date_activite,
            commentaire: activite.commentaire,
        });
    };
    const handleDelete = () => {
        Alert.alert(
            "Supprimer l'activité",
            "Êtes-vous sûr de vouloir supprimer cette activité ?",
            [
                {
                    text: "Annuler",
                    style: "cancel",
                },
                {
                    text: "Supprimer",
                    onPress: async () => {
                        try {
                            const response = await fetch(`https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/deleteActivity/${activiteId}`, {
                                method: 'DELETE',
                            });

                            if (response.ok) {
                                Alert.alert("Succès", "L'activité a été supprimée avec succès.");
                                // Passer une indication pour actualiser la liste à la page précédente
                                navigation.navigate('Activites', { refresh: true });
                            } else {
                                Alert.alert("Erreur", "Impossible de supprimer l'activité.");
                            }
                        } catch (error) {
                            console.error("Erreur de suppression de l'activité:", error);
                            Alert.alert("Erreur", "Impossible de supprimer l'activité.");
                        }
                    },
                },
            ]
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>{activite.nom_activite}</Text>
            <Text style={styles.details}>Durée: {activite.duree} min</Text>
            <Text style={styles.details}>Date: {new Date(activite.date_activite).toLocaleDateString()}</Text>
            <Text style={styles.details}>Commentaire: {activite.commentaire}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Modifier" onPress={handleModify} color="#4CAF50" />
                <View style={styles.spacer} />
                <Button title="Supprimer" onPress={handleDelete} color="#F44336" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#f4f4f9',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    details: {
        fontSize: 18,
        color: '#666',
        marginTop: 10,
        textAlign: 'center',
    },
    loading: {
        fontSize: 18,
        color: '#999',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 30,
        width: '100%',
        justifyContent: 'space-between',
    },
    spacer: {
        marginVertical: 10,
    },
});

export default ActiviteDetails;
