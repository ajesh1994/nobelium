import { StyleSheet, View } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HomeScreen } from "./HomeScreen"
import { user } from "../../mocks/user1";

const CardFlip = () => {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View>
          <HomeScreen profile={user} />
        </View>
      </GestureHandlerRootView>
    );
  };
  
  export default CardFlip;
  

