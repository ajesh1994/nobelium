import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { View, Text, Button, StyleSheet } from "react-native";

export const LandingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Landing screen</Text>
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Navigate to register screen"
      />
      <Button
        onPress={() => navigation.navigate("Register2")}
        title="Navigate to register screen 2"
      />
      <Button
        onPress={() => navigation.navigate("Login")}
        title="Navigate to login screen"
      />
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
