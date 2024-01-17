import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  StatusBar,
} from "react-native";
import { HomeScreen } from "../HomeScreen";
import Modal from "react-native-modal";
import { useState } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import CardFlipScreen from "../HomePage";
import { HomeScreenPromptVersion } from "../HomeScreenPromptVersion";
import { HomeScreenButtonVersion } from "../HomeScreenButtonVersion";
import { HomeScreen as homeScreen2 } from "../HomePage2/HomeScreen";

const TabBottom = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
const TabDrawer = createDrawerNavigator();

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

const HomeSelectorStack = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreenSelectorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen1"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen2"
          component={CardFlipScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen3"
          component={homeScreen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen4"
          component={HomeScreenButtonVersion}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeScreen5"
          component={HomeScreenPromptVersion}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export const TabsNavBotom = ({
  setNavigationType,
  navigationType,
}: {
  setNavigationType: (type: string) => void;
  navigationType: string;
}) => {
  return (
    <TabBottom.Navigator>
      <TabBottom.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color="black" />
          ),
        }}
        component={HomeSelectorStack}
      />
      <TabBottom.Screen
        name="Chat"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox" size={24} color="black" />
          ),
        }}
        component={Chat}
      />
      <TabDrawer.Screen
        name="Settings"
        options={{
          drawerIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      >
        {() => (
          <Settings
            setNavigationType={setNavigationType}
            navigationType={navigationType}
          />
        )}
      </TabDrawer.Screen>
    </TabBottom.Navigator>
  );
};
export const TabsNavTop = ({
  setNavigationType,
  navigationType,
}: {
  setNavigationType: (type: string) => void;
  navigationType: string;
}) => {
  return (
    <TabTop.Navigator>
      <TabTop.Screen
        name="Home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color="black" />
          ),
        }}
        component={HomeSelectorStack}
      />
      <TabTop.Screen
        name="Chat"
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbox" size={24} color="black" />
          ),
        }}
        component={Chat}
      />
      <TabDrawer.Screen
        name="Settings"
        options={{
          drawerIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      >
        {() => (
          <Settings
            setNavigationType={setNavigationType}
            navigationType={navigationType}
          />
        )}
      </TabDrawer.Screen>
    </TabTop.Navigator>
  );
};

export const TabsNavDrawer = ({
  setNavigationType,
  navigationType,
}: {
  setNavigationType: (type: string) => void;
  navigationType: string;
}) => {
  return (
    <TabDrawer.Navigator>
      <TabDrawer.Screen
        name="Home"
        component={HomeSelectorStack}
        options={{
          drawerIcon: () => <Ionicons name="home" size={24} color="black" />,
        }}
      />
      <TabDrawer.Screen
        name="Chat"
        component={Chat}
        options={{
          drawerIcon: () => <Ionicons name="chatbox" size={24} color="black" />,
        }}
      />

      <TabDrawer.Screen
        name="Settings"
        options={{
          drawerIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      >
        {() => (
          <Settings
            setNavigationType={setNavigationType}
            navigationType={navigationType}
          />
        )}
      </TabDrawer.Screen>
    </TabDrawer.Navigator>
  );
};

function Settings({
  setNavigationType,
  navigationType,
}: {
  setNavigationType: (type: string) => void;
  navigationType: string;
}) {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View style={{ marginTop: 100 }}>
        <Text>Choose navigation type</Text>
        <Picker
          selectedValue={navigationType}
          onValueChange={(itemValue, itemIndex) => setNavigationType(itemValue)}
        >
          <Picker.Item label="Bottom Navigation" value="bottom" />
          <Picker.Item label="Top Navigation" value="top" />
          <Picker.Item label="Side Navigation" value="side" />
        </Picker>
      </View>
    </View>
  );
}

function Chat() {
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    ></View>
  );
}
