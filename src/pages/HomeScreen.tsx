import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import { user } from "../mocks/user";
export const HomeScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <Image source={user.pictures[0]} style={styles.tinyLogo} />
      <Text>Home Screen</Text>
      <Text>
        {user.firstName} {user.lastName} is logged in!
      </Text>
      <Text>Birthday: {user.dateOfBirth.toDateString()}</Text>
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
  tinyLogo: {
    width: 55,
    height: 55,
  },
});
