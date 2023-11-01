import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import Animated, { Extrapolation } from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";

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

export default function HomeScreenButtonVersion() {
  Animated.Extrapolate = Extrapolation;

  const swiper = useRef<any>(null);
  const [showProfile, setShowProfile] = useState(false);
  console.log(showProfile);

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
