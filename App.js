import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./src/Home";
import Activites from "./src/Activites"; // Page des activités
import ActiviteDetails from "./src/ActiviteDetails"; // Nouvelle page pour les détails des activités
import ModifyActivity from "./src/ModifyActivity"; // Ajouter l'import de ModifyActivity
import AjouterActivite from "./src/AjouterActivite"; // Ajouter l'import de AjouterActivite

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Chaque enfant ici doit être une 'Screen' */}
        <Stack.Screen name="Home" component={Home} options={{ title: "Accueil" }} />
        <Stack.Screen name="Activites" component={Activites} options={{ title: "Activités" }} />
        <Stack.Screen name="ActiviteDetails" component={ActiviteDetails} options={{ title: "Détails de l'activité" }} />
        <Stack.Screen name="ModifyActivity" component={ModifyActivity} options={{ title: "Modifier l'activité" }} />
        <Stack.Screen name="AjouterActivite" component={AjouterActivite} options={{ title: "Ajouter une activité" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
