import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./src/context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./src/pages/LoginScreen";
import { RegistrationScreen } from "./src/pages/RegistrationScreen";
import { OnboardingScreen } from "./src/pages/OnboardingScreen";
import { NavigationWrapperButtonV } from "./src/pages/HomeScreenSelector/NavigationWrapper";
import { HomeScreen } from "./src/pages/HomeScreen";
import CardFlipScreen from "./src/pages/HomePage";
import { HomeScreen as homeScreen2 } from "./src/pages/HomePage2/HomeScreen";
import { HomeScreenButtonVersion } from "./src/pages/HomeScreenButtonVersion";
import {
  SwipeDownPage,
  SwipeDownPage as homeScreen4,
} from "./src/pages/SwipeDownPage/index";

import { LandingScreen } from "./src/pages/LandingScreen";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import { RegistrationNameScreen } from "./src/pages/RegistrationNameScreen";
import { RegistrationDobScreen } from "./src/pages/RegistrationDobScreen";
import { RegistrationPictureUploadScreen } from "./src/pages/RegistrationPictureUploadScreen";

import { RegistrationScreen as RegistrationScreen2 } from "./src/pages/Registration/RegistrationPage";
import { HomeScreenPromptVersion } from "./src/pages/HomeScreenPromptVersion";

export const Root = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [checking, setIsChecking] = useState(true);
  const { getItem } = useAsyncStorage("@token");

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
          <>
            <Stack.Screen
              name="Home Screen Selector"
              component={NavigationWrapperButtonV}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="HomeScreen6" component={SwipeDownPage} />
          </>
        ) : (
          <>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="Register" component={RegistrationScreen} />
            <Stack.Screen name="Register2" component={RegistrationScreen2} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen
              name="RegistrationName"
              component={RegistrationNameScreen}
            />
            <Stack.Screen
              name="RegistrationDob"
              component={RegistrationDobScreen}
            />
            <Stack.Screen
              name="RegistrationPictureUpload"
              component={RegistrationPictureUploadScreen}
            />
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
