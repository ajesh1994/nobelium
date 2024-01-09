import { useState } from "react";
import {
  TabsNavBotom,
  TabsNavTop,
  TabsNavDrawer,
} from "./HomeScreenPromptVersion";
import Modal from "react-native-modal";
import { View, Text, Button } from "react-native";

export const NavigationWrapperPromptV = () => {
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
            Prompt Swiping
          </Text>
          <Text style={{ padding: 10 }}>
            This version works by answering prompt (pretty much like hinge). In
            this particular version you can tap on the image or their prompt and
            write something to send to them which will represent a like. If you
            dislike, you can tap the red icon below.
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
