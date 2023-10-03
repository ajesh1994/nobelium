import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./src/pages/LoginScreen";
import { RegistrationScreen } from "./src/pages/RegistrationScreen";
import { OnboardingScreen } from "./src/pages/OnboardingScreen";
import { HomeScreen } from "./src/pages/HomeScreen";
import { LandingScreen } from "./src/pages/LandingScreen";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ActivityIndicator } from "react-native";

export const Root = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [checking, setIsChecking] = useState(true);
  const { getItem } = useAsyncStorage("@token");
  console.log(isLoggedIn);

  const Stack = createStackNavigator();

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const item = await getItem();

      // user is logged in
      if (item !== null) {
        setIsLoggedIn(true);
      }

      setIsChecking(false);
    };

    checkIfUserIsLoggedIn();
  }, []);

  if (checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
