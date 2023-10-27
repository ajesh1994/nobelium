import { StyleSheet, View, Text, Pressable, Button, Image } from "react-native";
import { useSharedValue, useAnimatedStyle, interpolate, withTiming, combineTransition } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { LoadProfileCards } from "./ProfileCardLoader";

import { user as user1 } from "../../mocks/user1";
import { user as user2 } from "../../mocks/user2";
import { user as user3 } from "../../mocks/user3";
import { user as user4 } from "../../mocks/user4";
import { user as user5 } from "../../mocks/user5";

export const HomeScreen = ({ profile } : { profile:any }) => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setIsLoggedIn(false);
  };

  // const recommendedProfiles = [user1, user2, user3, user4, user5]
  const recommendedProfiles = [user1]
  return (
    <View>
      <LoadProfileCards recommendedProfiles={recommendedProfiles}/>
      <Button onPress={logout} title="LOGOUT" />
    </View>
  );
}
