import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { user } from "../mocks/user1";
import DateTimePicker from "@react-native-community/datetimepicker";

export const RegistrationDobScreen = ({ navigation }: any) => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(user.dateOfBirth);

  const onChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => setShow(true);
  return (
    <View style={styles.container}>
      <Text>Input your date of birth</Text>
      <Text>{date.toString()}</Text>

      <Button onPress={showDatepicker} title="Select DoB" />
      {show && <DateTimePicker mode="date" value={date} onChange={onChange} />}
      <Button
        onPress={() => navigation.navigate("RegistrationPictureUpload")}
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
