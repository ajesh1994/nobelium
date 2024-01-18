import { StyleSheet, View, Text, Pressable, Button, Image, SafeAreaView, Dimensions } from "react-native";
import { useSharedValue, useAnimatedStyle, interpolate, withTiming, combineTransition } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "../../mocks/user1";
import { FlatList, GestureHandlerRootView, ScrollView, TapGestureHandler } from "react-native-gesture-handler";
import Modal from "react-native-modal";

import Swiper from "react-native-deck-swiper";

export const LoadProfileCards = ({ recommendedProfiles } : { recommendedProfiles:any[] }) => {

  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const setSwipable =  (bool:boolean) => {
    setSwipeEnabled(bool);
    console.log('setSwipable called with ' + bool);
  };

  const [isFrontOfCardToolTipVisible, setIsFrontOfCardToolTipVisible] = useState(true);
  const [isBackOfCardToolTipVisible, setIsBackOfCardToolTipVisible] = useState(false);
  const [firstTimeViewingBackOfCard, setFirstTimeViewingBackOfCard] = useState(true);
  
  const setBackOfCardToolTipVisibility = () => {
    if (firstTimeViewingBackOfCard){
      setFirstTimeViewingBackOfCard(false);
      console.log('set firstTimeViewingBackOfCard to false: ' + firstTimeViewingBackOfCard);
      setIsBackOfCardToolTipVisible(false); // NEED TO CHANGE TO TRUE AFTER FIX
    }
  }

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  const cardList: any[] = []
  recommendedProfiles.map(profile => cardList.push(profile))

  const useSwiper:any = useRef();
  // const handleOnSwipedTop = () => useSwiper.swipeTop();

  return(
    <View>
    <Modal isVisible={isFrontOfCardToolTipVisible}>
      <View style={{ height: 300, display: "flex", backgroundColor: "#D8BFD8", justifyContent: "space-around"}}>
        <Text style={{ fontWeight: "bold", alignSelf: "center"}}>
          Prompt Swiping
        </Text>
        <Text style={{ padding: 10 }}>
          This version works by swiping up and down (a bit like tiktok), and tapping the card to show details about the profile with more photos.
          Once a card is flipped you can then scroll to view more details.
        </Text>
        <Text style={{ alignSelf: "center"}}>
          Swipe up for LIKE
        </Text>
        <Text style={{ alignSelf: "center", color: "red" }}>
          Swipe down for DISLIKE
        </Text>
        <Text style={{ alignSelf: "center", color: "lightgreen" }}>
          Double tap to SUPERLIKE
        </Text>
        <View style={{ width: 300, alignSelf: "center"}}>
          <Button title="OK" onPress={() => setIsFrontOfCardToolTipVisible(false)} />
        </View>
      </View>
    </Modal>
    <Modal isVisible={isBackOfCardToolTipVisible}>
      <View style={{ height: 300, display: "flex", backgroundColor: "#D8BFD8", justifyContent: "space-around"}}>
        <Text style={{ fontWeight: "bold", alignSelf: "center"}}>
          Prompt Swiping
        </Text>
        <Text style={{ padding: 10 }}>
          The back of the card contains profile details, up can scroll up and down on this page.
        </Text>
        <Text style={{ padding: 10 }}>
          You cannot swipe up for LIKE or down for DISLIKE, have a think about whether you would also prefer to have a swipping mechanism for LIKE and DISLIKE from the back of the card.
        </Text>
        <Text style={{ alignSelf: "center", color: "lightgreen" }}>
          You can still double tap to SUPERLIKE
        </Text>
        <View style={{ width: 300, alignSelf: "center"}}>
          <Button title="OK" onPress={() => setIsBackOfCardToolTipVisible(false)} />
        </View>
      </View>
    </Modal>
    <Swiper
          ref={useSwiper}
          cards={cardList}
          renderCard={(card) => {
              return (
                <LoadProfileCard profile={card} setEnableSwipeFunc={setSwipable} swiperFunc={useSwiper} setIsBackOfCardToolTipVisibleFunc={setBackOfCardToolTipVisibility}/>
              )
          }}
          onSwiped={(cardIndex) => {console.log('Current card index: ' + cardIndex)}}
          onSwipedAll={() => {console.log('All cards swiped')}}
          cardIndex={0}
          stackSize= {3}
          stackScale={10}
          stackSeparation={40}
          outputRotationRange={["-10deg", "0deg", "10deg"]}
          backgroundColor="transparent"
          horizontalSwipe = {false}
          horizontalThreshold={screenWidth/2}
          verticalSwipe = {swipeEnabled}
          verticalThreshold={screenHeight/8}
          animateOverlayLabelsOpacity = {true}
          outputOverlayLabelsOpacityRangeY = {[-0.3,0,0.3]}
          animateCardOpacity={true}
        />
        </View>
  )
}

const LoadProfileCard = ({ profile, setEnableSwipeFunc, swiperFunc, setIsBackOfCardToolTipVisibleFunc } : { profile:any, setEnableSwipeFunc:any, swiperFunc:any, setIsBackOfCardToolTipVisibleFunc:any }) => {
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
      
      const [lastTap, setLastTap] = useState(0);
      const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;

        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
          alert('SUPER LIKED');
          swiperFunc.current.swipeTop()
        } else {
          setLastTap(now);
        }
      }
      


    // const position = React.useRef(new Animated.ValueXY()).current;
    // const panResponder = React.useRef(
    //   PanResponder.create({
    //     // Ask to be the responder:
    //     onStartShouldSetPanResponder: (evt, gestureState) => true,
    //     onPanResponderMove: (evt, gestureState) => {
    //       // The most recent move distance is gestureState.move{X,Y}
    //       // The accumulated gesture distance since becoming responder is
    //       // gestureState.d{x,y}
    //       position.setValue({x: gestureState.dx, y: gestureState.dy});
          
    //     },
    //     onPanResponderRelease: (evt, gestureState) => {
    //       // The user has released all touches while this view is the
    //       // responder. This typically means a gesture has succeeded
    //       // position.extractOffset();
    //     },
    //   }),
    // ).current;
      
    return (
      <Animated.View>
        <Pressable onPress={() => {spin.value = spin.value ? 0 : 1}}>
          <Animated.View style={[Styles.cardCommon, StylesFrontCard.front, frontStyle]}>
            <Image source={profile.pictures[0]} style={[Styles.cardCommon, StylesFrontCard.profilePhoto]} />
            <View style={StylesFrontCard.profileSection}>
              <Text style={StylesFrontCard.profileName}>
                {profile.firstName}, {profile.age}
              </Text>
              <Text style={StylesFrontCard.profileCareer}>
                {profile.career}
              </Text>
            </View>
          </Animated.View>
        </Pressable>
          
        
        <Pressable onPress={() => {spin.value = spin.value ? 0 : 1}}>
          <Animated.View style={[Styles.cardCommon, StylesBackCard.back, backStyle]}>
            <ScrollView style={Styles.cardCommon}>
              {/* A second pressable is required inside the scrollview otherwise 
              the scroll section is not pressable and only the section outside 
              the scroll section is pressable */}
              <Pressable onPress={() => 
                {spin.value = spin.value ? 0 : 1;
                setEnableSwipeFunc(spin.value===1);
                handleDoubleTap();
                setIsBackOfCardToolTipVisibleFunc();
              }
              }>
                <View style={{flexDirection: 'row'}}>
                  <View style={StylesBackCard.boxSummary}>
                    <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Height:{"\n  "}{profile.height}</Text>
                    <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Education:{"\n  "}{profile.education}</Text>
                    <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Career:{"\n  "}{profile.career}</Text>
                  </View>
                  <View style={StylesBackCard.boxSummary}>
                    <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Religion:{"\n  "}{profile.religion}</Text>
                    <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Community:{"\n  "}{profile.community}</Text>
                    <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Raised:{"\n  "}{profile.raisedIn}</Text>
                  </View>
                </View>
                <View style={StylesBackCard.box}>
                  <Text style={StylesBackCard.text}>{profile.aboutme[0]}</Text>
                </View>
                <View>
                  <Image source={profile.pictures[1]} style={StylesBackCard.image} />
                </View>
                <View style={StylesBackCard.box}>
                  <Text style={StylesBackCard.text}>{profile.aboutme[1]}</Text>
                </View>
                <View style={StylesBackCard.box}>
                  <Text style={StylesBackCard.text}>{profile.aboutme[2]}</Text>
                </View>
                <View>
                  <Image source={profile.pictures[2]} style={StylesBackCard.image} />
                </View>
              </Pressable>
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Animated.View>
    )
}


const Styles = StyleSheet.create({
  cardCommon: {
    height: 700,
    width: 400,
    borderRadius: 20,
    // alignItems: "center",
    // justifyContent: "center",
    backfaceVisibility: "hidden",
  },
});



const StylesFrontCard = StyleSheet.create({
  front: {
    // backgroundColor: "#D8D9CF",
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
