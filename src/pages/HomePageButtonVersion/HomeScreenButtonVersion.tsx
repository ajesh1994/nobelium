import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Animated, { Extrapolation } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Ionicons from "@expo/vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

import CardsSwipe from "react-native-cards-swipe";
import { user as user1 } from "../../mocks/user1";
import { user as user2 } from "../../mocks/user2";
import { user as user3 } from "../../mocks/user3";
import { user as user4 } from "../../mocks/user4";

const cardsData = [
  { src: user1.pictures[0] },
  { src: user2.pictures[0] },
  { src: user3.pictures[2] },
  { src: user4.pictures[1] },
  { src: user1.pictures[0] },
  { src: user2.pictures[0] },
  { src: user3.pictures[2] },
  { src: user4.pictures[1] },
  { src: user1.pictures[0] },
  { src: user2.pictures[0] },
  { src: user3.pictures[2] },
  { src: user4.pictures[1] },
  { src: user1.pictures[0] },
  { src: user2.pictures[0] },
  { src: user3.pictures[2] },
  { src: user4.pictures[1] },
];

const TabBottom = createMaterialBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();
const TabDrawer = createDrawerNavigator();

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
        component={HomeScreenButtonVersion}
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
      <TabBottom.Screen
        name="Settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
        component={() => Settings(setNavigationType, navigationType)}
      />
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
        component={HomeScreenButtonVersion}
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
      <TabTop.Screen
        name="Settings"
        options={{
          tabBarLabel: "Settings",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
        component={() => Settings(setNavigationType, navigationType)}
      />
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
        component={HomeScreenButtonVersion}
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
        component={() => Settings(setNavigationType, navigationType)}
        options={{
          drawerIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      />
    </TabDrawer.Navigator>
  );
};

function Settings(
  setNavigationType: (type: string) => void,
  navigationType: string
) {
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

function HomeScreenButtonVersion() {
  Animated.Extrapolate = Extrapolation;

  const swiper = useRef<any>(null);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <View style={styles.container}>
      {showProfile ? (
        <GestureDetector
          gesture={Gesture.Tap()
            .numberOfTaps(2)
            .onStart(() => {
              setShowProfile(false);
            })}
        >
          <View style={styles.pressableContainer}>
            <ScrollView>
              <View>
                <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
                  Height:{"\n  "}2
                </Text>
                <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
                  Education:{"\n  "}2
                </Text>
                <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
                  Career:{"\n  "}2
                </Text>
              </View>
              <View>
                <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
                  Religion:{"\n  "}2
                </Text>
                <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
                  Community:{"\n  "}2
                </Text>
                <Text style={{ margin: 5, fontSize: 20, fontWeight: "bold" }}>
                  Raised:{"\n  "}2
                </Text>
              </View>
            </ScrollView>
          </View>
        </GestureDetector>
      ) : (
        <GestureDetector
          gesture={Gesture.Tap()
            .numberOfTaps(2)
            .onStart(() => {
              setShowProfile(true);
            })}
        >
          <View style={styles.pressableContainer}>
            <CardsSwipe
              ref={swiper}
              loop={false}
              cards={cardsData}
              cardContainerStyle={styles.cardContainer}
              renderCard={(card) => (
                <View style={styles.card}>
                  <Image style={styles.cardImg} source={card.src} />
                </View>
              )}
              renderNoMoreCard={() => (
                <View>
                  <Text>{"No more Cards!"}</Text>
                </View>
              )}
            />
          </View>
        </GestureDetector>
      )}
      <View style={styles.controlRow}>
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeLeft();
          }}
          style={[styles.button, styles.leftBtn]}
        >
          <Image
            source={require("../../assets/dislike.png")}
            style={styles.dislikeIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeRight();
          }}
          style={[styles.button, styles.rightBtn]}
        >
          <Image
            source={require("../../assets/like.png")}
            style={styles.likeIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  pressableContainer: {
    width: "90%",
    height: "70%",
  },
  cardContainer: {
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    height: "100%",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.07,
    shadowRadius: 3.3,
  },
  cardImg: {
    width: "100%",
    height: "100%",
    borderRadius: 13,
  },
  controlRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 22,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    padding: 14,
    borderWidth: 3,
    borderRadius: 35,
  },
  rightBtn: {
    borderColor: "#00D400",
  },
  leftBtn: {
    borderColor: "#E60000",
  },
  likeIcon: {
    width: 40,
    height: 40,
    top: -3,
  },
  dislikeIcon: {
    width: 40,
    height: 40,
    top: 3,
  },
  box: {
    height: 120,
    width: 120,
    backgroundColor: "#b58df1",
    borderRadius: 20,
  },
});
