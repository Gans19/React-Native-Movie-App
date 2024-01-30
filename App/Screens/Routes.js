import { View, Text } from "react-native";
import React from "react";

import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";
import { createStackNavigator } from "@react-navigation/stack";
import SigninScreen from "./SigninScreen";
import HomePage from "./HomePage";
// import { NavigationContainer } from "@react-navigation/native";

const Routes = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Home"
        component={SigninScreen}
      />
      <Stack.Screen name="HomeStack" component={HomePage}/>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default Routes;
