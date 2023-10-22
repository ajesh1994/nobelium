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
                  <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)}>
                    <ScrollView style={StylesBackCard.scrollView}>
                      {/* A second pressable is required inside the scrollview otherwise 
                      the scroll section is not pressable and only the section outside 
                      the scroll section is pressable */}
                      <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={StylesBackCard.boxSummary}>
                            <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Height:{"\n  "}{user.height}</Text>
                            <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Education:{"\n  "}{user.education}</Text>
                            <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Career:{"\n  "}{user.career}</Text>
                          </View>
                          <View style={StylesBackCard.boxSummary}>
                            <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Religion:{"\n  "}{user.religion}</Text>
                            <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Community:{"\n  "}{user.community}</Text>
                            <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Raised:{"\n  "}{user.raisedIn}</Text>
                          </View>
                        </View>
                        <View style={StylesBackCard.box}>
                          <Text style={StylesBackCard.text}>{user.aboutme[0]}</Text>
                        </View>
                        <View>
                          <Image source={user.pictures[1]} style={StylesBackCard.image} />
                        </View>
                        <View style={StylesBackCard.box}>
                          <Text style={StylesBackCard.text}>{user.aboutme[1]}</Text>
                        </View>
                        <View style={StylesBackCard.box}>
                          <Text style={StylesBackCard.text}>{user.aboutme[2]}</Text>
                        </View>
                        <View>
                          <Image source={user.pictures[2]} style={StylesBackCard.image} />
                        </View>
                      </Pressable>
                    </ScrollView>
                  </Pressable>
                </Animated.View>
                
                <Button onPress={logout} title="LOGOUT" />
            </View>
        </View>
      )
}


const Styles = StyleSheet.create({
  cardCommon: {
    height: 700,
    width: 400,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backfaceVisibility: "hidden",
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
    backgroundColor: "pink",
  },
  scrollView: {
    borderRadius: 15,
  },
  box: {
    opacity: 0.5,
    width: '95%',
    minHeight: 40,
    backgroundColor: "white",
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
    margin: 10,
  },
  boxSummary: {
    opacity: 0.5,
    width: '45%',
    height: 180,
    minHeight: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "space-between",
    margin: 10,
    overflow: 'hidden'
  },
  text: {
    margin: 5,
    fontSize: 18,
  },
  image:{
    width: '100%',
    height: 700,
    alignSelf: "center",
    resizeMode: 'cover', 
    backgroundColor: 'blue',
    marginVertical: 10,
  }
});
