import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";


const ModifyActivity = ({ route, navigation }) => {
    const { activiteId } = route.params; // Récupère l'id de l'activité passée en paramètre
    const [nom_activite, setNomActivite] = useState('');
    const [duree, setDuree] = useState('');
    const [date_activite, setDateActivite] = useState('');
    const [commentaire, setCommentaire] = useState('');

    useEffect(() => {
        const fetchActiviteDetails = async () => {
            try {
                const response = await fetch(`https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/getActivityById/${activiteId}`);
                const data = await response.json();
                setNomActivite(data.nom_activite);
                setDuree(data.duree);
                setDateActivite(data.date_activite);
                setCommentaire(data.commentaire);
            } catch (error) {
                console.error('Erreur de récupération des détails de l\'activité:', error);
            }
        };

        fetchActiviteDetails();
    }, [activiteId]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/updateActivity/${activiteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nom_activite,
                    duree,
                    date_activite,
                    commentaire,
                    id_categorie: selectedCategorie,
                }),
            });

            if (response.ok) {
                Alert.alert("Succès", "L'activité a été mise à jour.");
                navigation.goBack();  // Retourne à l'écran précédent après la modification
            } else {
                Alert.alert("Erreur", "Impossible de mettre à jour l'activité.");
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            Alert.alert("Erreur", "Impossible de mettre à jour l'activité.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Modifier l'activité</Text>
            <TextInput
                style={styles.input}
                placeholder="Nom de l'activité"
                value={nom_activite}
                onChangeText={setNomActivite}
            />
            <TextInput
                style={styles.input}
                placeholder="Durée"
                value={duree}
                keyboardType="numeric"
                onChangeText={setDuree}
            />
            <TextInput
                style={styles.input}
                placeholder="Date"
                value={date_activite}
                onChangeText={setDateActivite}
            />
            <TextInput
                style={styles.input}
                placeholder="Commentaire"
                value={commentaire}
                onChangeText={setCommentaire}
            />
            <Button title="Sauvegarder" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default ModifyActivity;
