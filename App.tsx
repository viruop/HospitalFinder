import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Modal from "./components/Modal";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: "#fd907e" }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="login"
          component={Login}
        />
        <Stack.Screen
          options={{ title: "Near by hospitals" }}
          name="dashboard"
          component={Dashboard}
        />
        <Stack.Group screenOptions={{ presentation: "modal" }}>
          <Stack.Screen name="modal" component={Modal} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
