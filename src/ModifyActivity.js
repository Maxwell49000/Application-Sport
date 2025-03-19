import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars"; // Utilisation de react-native-calendars

const ModifyActivity = ({ route, navigation }) => {
    const { activiteId } = route.params;
    const [nom_activite, setNomActivite] = useState('');
    const [duree, setDuree] = useState('');
    const [date_activite, setDateActivite] = useState(new Date()); // Initialisation à la date actuelle
    const [commentaire, setCommentaire] = useState('');
    const [selectedCategorie, setSelectedCategorie] = useState('');
    const [categories, setCategories] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false); // Contrôle l'affichage du calendrier

    useEffect(() => {
        const fetchActiviteDetails = async () => {
            try {
                const response = await fetch(`https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/getActivityById/${activiteId}`);
                const data = await response.json();
                setNomActivite(data.nom_activite);
                setDuree(data.duree);
                setDateActivite(new Date(data.date_activite)); // Assurez-vous que la date est bien formatée
                setCommentaire(data.commentaire);
                setSelectedCategorie(data.id_categorie || '');
            } catch (error) {
                console.error("Erreur de récupération des détails de l'activité:", error);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await fetch("https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite");
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error("Erreur de récupération des catégories:", error);
            }
        };

        fetchActiviteDetails();
        fetchCategories();
    }, [activiteId]);

    const handleSubmit = async () => {
        try {
            const response = await fetch(`https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/updateActivity/${activiteId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nom_activite,
                    duree,
                    date_activite: date_activite.toISOString().split('T')[0], // Convertir en format "YYYY-MM-DD"
                    commentaire,
                    id_categorie: selectedCategorie,
                }),
            });

            if (response.ok) {
                Alert.alert("Succès", "L'activité a été mise à jour.");
                navigation.goBack();
            } else {
                Alert.alert("Erreur", "Impossible de mettre à jour l'activité.");
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour:", error);
            Alert.alert("Erreur", "Impossible de mettre à jour l'activité.");
        }
    };

    const handleDateChange = (date) => {
        setDateActivite(date);
        setShowCalendar(false); // Fermer le calendrier après sélection
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

            <View style={styles.datePickerContainer}>
                <Button title="Choisir la date" onPress={() => setShowCalendar(true)} />
                <TextInput
                    style={styles.input}
                    placeholder="Date"
                    value={date_activite.toLocaleDateString()}
                    editable={false}
                />
                {showCalendar && (
                    <Calendar
                        markedDates={{
                            [date_activite.toISOString().split('T')[0]]: { selected: true, selectedColor: 'blue' },
                        }}
                        onDayPress={(day) => handleDateChange(new Date(day.dateString))}
                        theme={{
                            selectedDayBackgroundColor: 'blue',
                            todayTextColor: 'red',
                        }}
                    />
                )}
            </View>

            <TextInput
                style={styles.input}
                placeholder="Commentaire"
                value={commentaire}
                onChangeText={setCommentaire}
            />

            <Picker
                selectedValue={selectedCategorie}
                onValueChange={(itemValue) => setSelectedCategorie(itemValue)}
                style={styles.picker}
            >
                {categories.map((categorie) => (
                    <Picker.Item
                        key={categorie.id_activite} // Utilise un identifiant unique
                        label={categorie.nom_categorie}
                        value={categorie.id_categorie}
                    />
                ))}
            </Picker>

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
    datePickerContainer: {
        width: '100%',
        marginBottom: 15,
    },
    picker: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
});

export default ModifyActivity;
