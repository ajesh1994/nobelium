import { View, Text, Button, StyleSheet } from "react-native";

export const HomeScreenSelectorScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Home Screen Selector</Text>
      <Button
        onPress={() => navigation.navigate("HomeScreen1")}
        title="Home Screen 1"
      />
      <Button
        onPress={() => navigation.navigate("HomeScreen2")}
        title="Home Screen 2"
      />
      <Button
        onPress={() => navigation.navigate("HomeScreen3")}
        title="Home Screen 3"
      />
      <Button
        onPress={() => navigation.navigate("HomeScreen4")}
        title="Home Screen 4"
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
