import { StyleSheet, View, Text, Pressable, Button } from "react-native";
import { useSharedValue, useAnimatedStyle, interpolate, withTiming } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const HomeScreen = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setIsLoggedIn(false);
  };
    const spin = useSharedValue<number>(0); // shared value that represents 0 if the card is facing the front of the card, and 1 if the card is showing the back of the card

    const frontStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
        return {
          transform: [
            {
              rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
            },
          ],
        };
      }, []);

      const backStyle = useAnimatedStyle(() => {
        const spinVal = interpolate(spin.value, [0, 1], [180, 360]);
        return {
          transform: [
            {
              rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
            },
          ],
        };
      }, []);

      return (
        <View>
            <View>
                <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)}>
                  <Animated.View style={[Styles.front, frontStyle]}>
                    <Text>Front View</Text>
                  </Animated.View>
                  <Animated.View style={[Styles.back, backStyle]}>
                      <Text>Back</Text>
                  </Animated.View>
                  <Button onPress={logout} title="LOGOUT" />
                </Pressable>
            </View>
            
        </View>
      )
}

const Styles = StyleSheet.create({
  front: {
    height: 400,
    width: 250,
    backgroundColor: "#D8D9CF",
    borderRadius: 20,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  back: {
    height: 400,
    width: 250,
    backgroundColor: "#FF8787",
    borderRadius: 16,
    backfaceVisibility: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
});
