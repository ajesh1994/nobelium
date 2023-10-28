import { View, StyleSheet, Dimensions, Image } from "react-native";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { user as user1 } from "../../mocks/user1";
import { user as user2 } from "../../mocks/user2";
import { user as user3 } from "../../mocks/user3";
import { user as user4 } from "../../mocks/user4";
import { user as user5 } from "../../mocks/user5";
import { Card } from "./CardScreen";

import Swiper from "react-native-deck-swiper";

import { OverlayLabel } from "./OverlayLabel";



export const HomeScreen = () => {
  
  const { setIsLoggedIn } = useContext(AuthContext);
  const logout = async () => {
    await AsyncStorage.removeItem("@token");
    setIsLoggedIn(false);
  };

  const recommendedProfiles = [user1, user2, user3, user4, user5]
  // const recommendedProfiles = [user1]

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;


  return (
    <View style={style.container}>
      {/* <Card profile={recommendedProfiles[0]}/> */}
      <Swiper
        cards={recommendedProfiles}
        renderCard={(card) => {
            return (
              <Card profile={card}/>
            )
        }}
        onSwiped={(cardIndex) => {console.log(cardIndex)}}
        onSwipedAll={() => {console.log('onSwipedAll')}}
        cardIndex={0}
        stackSize= {5}
        stackScale={10}
        stackSeparation={40}
        horizontalThreshold={screenWidth}
        verticalThreshold={screenHeight/8}
        outputRotationRange={["-10deg", "0deg", "10deg"]}
        backgroundColor="transparent"
        horizontalSwipe = {false}
        animateOverlayLabelsOpacity = {true}
        inputOverlayLabelsOpacityRangeY = {[-screenHeight/4,0,screenHeight/4]}
        outputOverlayLabelsOpacityRangeY = {[-0.3,0,0.3]}
        animateCardOpacity={true}
        overlayLabels={{
          bottom: {
            title: 'NOPE',
            element: <OverlayLabel label="NOPE" color="#E5566D" imageSource={require("../../assets/icons/Dislike.jpeg")}/>,
            style: {
              wrapper: {
                justifyContent:'center',
                alignItems: 'center',
              }
            },
          },
          top: {
            title: 'LIKE',
            element: <OverlayLabel label="LIKE" color="#4CCC93" imageSource={require("../../assets/icons/Like.jpeg")} />,
            style: {
              wrapper: {
                justifyContent:'center',
                alignItems: 'center',
              }
            },
          },
        }}
      />
    </View>
  );
}



const style = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  }
});

const styleCard = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    flex: 1,
  },
});

