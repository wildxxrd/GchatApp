import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";
import SignUpScreenMain from "./Screens/SignUpScreen/SignUp/SignUpScreenMain";
import SignInMainScreen from "./Screens/SignInScreen/SignInMainScreen";
import UserPosts from "./Screens/MainScreen/UserPosts";
import MainScreen from "./Screens/MainScreen/MainScreen";

const Stack = createStackNavigator();

function MyStack() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  //handle user stateChange
  function onAuthChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Sign Up" component={SignUpScreenMain} />
        <Stack.Screen name="Sign In" component={SignInMainScreen} />

      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="My Posts" component={UserPosts} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },
});
