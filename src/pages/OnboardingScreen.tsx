import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { View, Text, Button, StyleSheet } from "react-native";

export const OnboardingScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setItem } = useAsyncStorage("@token");
  const logInUser = async () => {
    setIsLoggedIn(true);
    await setItem("DUMMY TOKEN");
  };

  return (
    <View style={styles.container}>
      <Text>Onboarding Screen</Text>
      <Button onPress={logInUser} title="FINISH" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
