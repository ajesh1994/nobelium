import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, StyleSheet } from "react-native";

export const HomeScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text>User is logged in!</Text>
      <Button onPress={logout} title="LOGOUT" />
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
