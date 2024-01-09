import { useState } from "react";
import {
  TabsNavBotom,
  TabsNavTop,
  TabsNavDrawer,
} from "./HomeScreenButtonVersion";
import Modal from "react-native-modal";
import { View, Text, Button } from "react-native";

export const NavigationWrapperButtonV = () => {
  const [navigationType, setNavigationType] = useState("bottom");
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
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
            Button Swiping
          </Text>
          <Text style={{ padding: 10 }}>
            This version works by simply tapping the red or green icons below to
            say whether you dislike or like that person. Double tapping the
            image will display their profile information.
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
      {navigationType === "bottom" ? (
        <TabsNavBotom
          navigationType={navigationType}
          setNavigationType={setNavigationType}
        />
      ) : navigationType === "top" ? (
        <TabsNavTop
          navigationType={navigationType}
          setNavigationType={setNavigationType}
        />
      ) : (
        <TabsNavDrawer
          navigationType={navigationType}
          setNavigationType={setNavigationType}
        />
      )}
    </>
  );
};
