import { View, Text, Button, StyleSheet } from "react-native";
import { HomeScreen } from "./HomeScreen";
import Modal from "react-native-modal";
import { useState } from "react";

export const HomeScreenSelectorScreen = ({ navigation }: any) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Modal isVisible={isVisible}>
        <View
          style={{
            height: 300,
            display: "flex",
            backgroundColor: "#D8BFD8",
            justifyContent: "space-around",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            Select the type of swiping
          </Text>
          <Text style={{ padding: 10 }}>
            Each button below takes you to a mock version of the different ways
            you can potentially swipe. Think more about which mechanism feels
            best and not how it looks because we have done the bare minimum just
            for testing purposes.
          </Text>

          <View
            style={{
              width: 300,
              alignSelf: "center",
            }}
          >
            <Button title="OK" onPress={() => setIsVisible(false)} />
          </View>
        </View>
      </Modal>
      <HomeScreen />
      <View style={styles.container}>
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
          title="Home Screen Button Swipe"
        />
        <Button
          onPress={() => navigation.navigate("HomeScreen5")}
          title="Home Screen Prompt Swipe"
        />
        <Button
          onPress={() => navigation.navigate("HomeScreen6")}
          title="Home Screen Swipe Down"
        />
      </View>
      <Text style={{ padding: 10 }}>ADD A GOOGLE POLL?</Text>
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
