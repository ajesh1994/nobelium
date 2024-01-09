import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { View, Text, Button, StyleSheet } from "react-native";

export const LandingScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {/* <Button
        onPress={() => navigation.navigate("Register")}
        title="Navigate to register screen"
      /> */}
        <Button
          onPress={() => navigation.navigate("Register2")}
          title="Navigate to Registeration Screen"
        />
        <Button
          onPress={() => navigation.navigate("Login")}
          title="Navigate to Login Screen"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    height: 300,
  },
});
