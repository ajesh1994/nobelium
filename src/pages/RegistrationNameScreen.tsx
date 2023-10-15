import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { user } from "../mocks/user";
export const RegistrationNameScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  return (
    <View style={styles.container}>
      <Text>Input your date of birth</Text>
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
        style={styles.input}
        placeholder="First Name"
      />
      <TextInput
        editable
        maxLength={40}
        onChangeText={(text) => setLastName(text)}
        value={lastName}
        style={styles.input}
        placeholder="Last Name"
      />
      <Button
        onPress={() => navigation.navigate("RegistrationDob")}
        title="Continue"
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
  input: {
    borderColor: "gray",
    width: 200,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});
