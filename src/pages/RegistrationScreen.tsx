import { View, Text, Button, StyleSheet } from "react-native";

export const RegistrationScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Text>Registration screen</Text>
      <Button
        onPress={() => navigation.navigate("RegistrationName")}
        title="Start Registration"
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
