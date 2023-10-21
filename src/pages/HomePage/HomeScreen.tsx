import { StyleSheet, View, Text, Pressable, Button, Image, SafeAreaView } from "react-native";
import { useSharedValue, useAnimatedStyle, interpolate, withTiming, combineTransition } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "../../mocks/user";
import { FlatList, ScrollView } from "react-native-gesture-handler";

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
                  <Animated.View style={[StyleSheet.compose(Styles.cardCommon, StylesFrontCard.front), frontStyle]}>
                    <Image source={user.pictures[0]} style={StyleSheet.compose(Styles.cardCommon, StylesFrontCard.profilePhoto)} />
                    <View style={StylesFrontCard.profileSection}>
                      <Text style={StylesFrontCard.profileName}>
                        {user.firstName}, {user.age}
                      </Text>
                      <Text style={StylesFrontCard.profileCareer}>
                        {user.career}
                      </Text>
                    </View>
                  </Animated.View>
                </Pressable>
                  
                <Animated.View style={[StyleSheet.compose(Styles.cardCommon, StylesBackCard.back), backStyle]}>
                  <ScrollView>
                    <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)}>
                      <Text>{user.aboutme}</Text>
                    </Pressable>
                  </ScrollView>
                </Animated.View>
                
                <Button onPress={logout} title="LOGOUT" />
            </View>
        </View>
      )
}


const Styles = StyleSheet.create({
  cardCommon: {
    height: 400,
    width: 250,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
  },
  front: {
    backgroundColor: "#D8D9CF",
    position: "absolute",
  },
  back: {
    backgroundColor: "#FF8787",
  },
  profilePhoto: {
    height: '100%',
    width: '100%',
  },
  profileSection: {
    // fontFamily: 'Courier',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    // flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    // flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  profileName: {
    // fontFamily: 'Courier',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    // flex: 1,
    // flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  profileCareer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  scrollView: {
    backgroundColor: 'pink',
    // marginHorizontal: 20,
    borderRadius: 16,
  },
});



const StylesFrontCard = StyleSheet.create({
  front: {
    backgroundColor: "#D8D9CF",
    position: "absolute",
  },
  profilePhoto: {
    height: '100%',
    width: '100%',
  },
  profileSection: {
    // fontFamily: 'Courier',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    // flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    // flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  profileName: {
    // fontFamily: 'Courier',
    fontWeight: 'bold',
    fontSize: 40,
    color: 'white',
    // flex: 1,
    // flexDirection: 'column',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
  profileCareer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    alignSelf: 'flex-start',
    marginTop: 'auto',
  },
});



const StylesBackCard = StyleSheet.create({
  back: {
    backgroundColor: "#FF8787",
  },
  scrollView: {
    backgroundColor: 'pink',
    // marginHorizontal: 20,
    borderRadius: 16,
  },
});
