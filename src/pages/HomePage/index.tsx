import { StyleSheet, View } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { HomeScreen } from "./HomeScreen"

const CardFlip = () => {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <HomeScreen />
        </View>
      </GestureHandlerRootView>
    );
  };
  
  export default CardFlip;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 30,
    },
  });
