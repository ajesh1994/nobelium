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
  TouchableHighlight,
  Button,
  TextInput,
} from "react-native";
import Animated, { Extrapolation } from "react-native-reanimated";
import Modal from "react-native-modal";

import CardsSwipe from "react-native-cards-swipe";
import { user as user1 } from "../mocks/user1";
import { user as user2 } from "../mocks/user2";
import { user as user3 } from "../mocks/user3";
import { user as user4 } from "../mocks/user4";

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

export function HomeScreenPromptVersion() {
  const swiper = useRef<any>(null);
  Animated.Extrapolate = Extrapolation;
  const [isVisible, setIsVisible] = useState(true);
  const [clickedItem, setClickedItem] = useState("photo");
  const [isPromptVisible, setIsPromptVisible] = useState(false);

  const [picText, setPicText] = useState("");

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
      <View style={styles.pressableContainer}>
        <TouchableOpacity
          style={styles.pressableContainer}
          onPress={() => {
            setIsPromptVisible(true);
            setClickedItem("photo");
          }}
        >
          <CardsSwipe
            ref={swiper}
            loop={false}
            cardContainerStyle={styles.cardContainer}
            cards={cardsData}
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
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        onPress={() => {
          setIsPromptVisible(true);
          setClickedItem("prompt");
        }}
      >
        <View>
          <Text style={{ fontSize: 30 }}>
            {"A shower thought I recently had"}
          </Text>
          <Text>
            {"When you say forward or back, your lips move in those directions"}
          </Text>
        </View>
      </TouchableHighlight>
      <View style={styles.controlRow}>
        <TouchableOpacity
          onPress={() => {
            if (swiper.current) swiper.current.swipeLeft();
          }}
          style={[styles.button, styles.leftBtn]}
        >
          <Image
            source={require("../assets/dislike.png")}
            style={styles.dislikeIcon}
          />
        </TouchableOpacity>
      </View>
      <Modal isVisible={isPromptVisible}>
        <View
          style={{
            padding: 20,
            height: 300,
            display: "flex",
            backgroundColor: "#D8BFD8",
          }}
        >
          <Text>Like what you see?!</Text>
          {clickedItem === "photo" ? (
            <Text>Add something extra about the photo you liked</Text>
          ) : (
            <Text>Add some text about the prompt you reacted to</Text>
          )}

          <TextInput
            editable
            onChangeText={(text) => setPicText(text)}
            value={picText}
            placeholder="Add Text"
            multiline
            style={{ backgroundColor: "white", height: 50 }}
          />
          <Button title="Cancel" onPress={() => setIsPromptVisible(false)} />
          <Button
            title="Send"
            onPress={() => {
              setIsPromptVisible(false);
              if (swiper.current) swiper.current.swipeRight();
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
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
