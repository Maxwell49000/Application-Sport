import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Calendar } from "react-native-calendars";

const AjouterActivite = ({ navigation }) => {
    const [nomActivite, setNomActivite] = useState("");
    const [duree, setDuree] = useState("");
    const [date, setDate] = useState(new Date()); // Initialise la date avec l'heure actuelle
    const [commentaire, setCommentaire] = useState("");
    const [selectedCategorie, setSelectedCategorie] = useState("");
    const [categories, setCategories] = useState([]);
    const [showCalendar, setShowCalendar] = useState(false); // Contrôle l'affichage du calendrier

    // Charger les catégories depuis l'API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch("https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite");
                const data = await response.json();

                // Filtrer les doublons
                const uniqueCategories = data.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.id_categorie === value.id_categorie
                    ))
                );

                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Erreur de chargement des catégories :", error);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async () => {
        if (!nomActivite || !duree || !date) {
            Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires (*)");
            return;
        }

        try {
            const response = await fetch("https://cefii-developpements.fr/axel1424/API_Suivi_Sportif/public/activite/addActivity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nom_activite: nomActivite,
                    duree: parseInt(duree),
                    date_activite: date.toISOString().split('T')[0], // Convertir la date au format "AAAA-MM-JJ"
                    commentaire: commentaire,
                    id_categorie: selectedCategorie || null,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Succès", "Activité ajoutée !");
                navigation.goBack();
            } else {
                Alert.alert("Erreur", data.message || "Impossible d'ajouter l'activité");
            }
        } catch (error) {
            console.error("Erreur lors de l'ajout :", error);
            Alert.alert("Erreur", "Une erreur est survenue lors de l'ajout de l'activité");
        }
    };

    const handleDateSelect = (day) => {
        setDate(new Date(day.dateString)); // Met à jour la date sélectionnée
        setShowCalendar(false); // Ferme le calendrier après la sélection
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter une Activité</Text>

            <TextInput
                style={styles.input}
                placeholder="Nom de l'activité *"
                value={nomActivite}
                onChangeText={setNomActivite}
            />

            <TextInput
                style={styles.input}
                placeholder="Durée en minutes *"
                keyboardType="numeric"
                value={duree}
                onChangeText={setDuree}
            />

            <Text style={styles.label}>Date (AAAA-MM-JJ) * :</Text>
            {/* Bouton pour afficher le calendrier */}
            <Button title="Choisir une date" onPress={() => setShowCalendar(!showCalendar)} />

            {/* Affichage du calendrier si showCalendar est true */}
            {showCalendar && (
                <Calendar
                    onDayPress={handleDateSelect}
                    markedDates={{
                        [date.toISOString().split("T")[0]]: {
                            selected: true,
                            selectedColor: "#28a745",
                        },
                    }}
                    monthFormat={"yyyy MM"}
                />
            )}

            {/* Espacement entre les champs */}
            <View style={styles.spacer} />

            <TextInput
                style={styles.input}
                placeholder="Commentaire (optionnel)"
                value={commentaire}
                onChangeText={setCommentaire}
                multiline
            />

            {/* Sélecteur de catégorie */}
            <Text style={styles.label}>Catégorie :</Text>
            <Picker
                selectedValue={selectedCategorie}
                onValueChange={(itemValue) => setSelectedCategorie(itemValue)}
                style={styles.picker}
            >
                <Picker.Item label="Aucune catégorie" value="" />
                {categories.map((categorie) => (
                    <Picker.Item key={categorie.id_categorie} label={categorie.nom_categorie} value={categorie.id_categorie} />
                ))}
            </Picker>

            <Button title="Ajouter" onPress={handleSubmit} color="#28a745" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "#f4f4f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    picker: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    spacer: {
        height: 20, // Espacement entre les champs
    },
});

export default AjouterActivite;
