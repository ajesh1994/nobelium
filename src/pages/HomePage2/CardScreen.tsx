import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from "react-native-reanimated";
import { FlatList, ScrollView } from "react-native-gesture-handler";

export const Card = ({ profile } : { profile:any }) => {
  const spin = useSharedValue<number>(0); // shared value that represents 0 if the card is facing the front of the card, and 1 if the card is showing the back of the card

  const frontStyle = useAnimatedStyle(() => {
      const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
      console.log(spinVal);
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
      console.log(spinVal);
      return {
        transform: [
          {
            rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
          },
        ],
      };
    }, []);
        
  return (
    <Animated.View style={[style.container, {borderWidth:0}]}>
      <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)} style={[style.container, {position:'absolute', height:'100%', width:'100%', borderWidth:0}]}>
        <Animated.View style={[style.container, {position:'absolute', height:'100%', width:'100%', borderWidth:1},frontStyle]}>
          <Image source={profile.pictures[0]} style={styleFrontFace.image} />
          <View style={styleFrontFace.textSection}>
            <Text style={styleFrontFace.name}>{profile.firstName}, {profile.age}</Text>
            <Text style={styleFrontFace.career}>{profile.career}</Text>
          </View>
        </Animated.View>
      </Pressable>

      <Pressable onPress={() => (spin.value = spin.value ? 0 : 1)} style={[style.container, {position:'absolute', height:'100%', width:'100%', borderWidth:0}]}>
        <Animated.View style={[style.container, {position:'absolute', height:'100%', width:'100%', borderWidth:1}, styleBackFace.container, backStyle]}>
          <ScrollView contentContainerStyle={[style.container, {height:'100%', width:'100%'}]}>
              <View style={{flexDirection: 'row'}}>
                <View style={styleBackFace.boxSummary}>
                  <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Height:{"\n  "}{profile.height}</Text>
                  <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Education:{"\n  "}{profile.education}</Text>
                  <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Career:{"\n  "}{profile.career}</Text>
                </View>
                <View style={styleBackFace.boxSummary}>
                  <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Religion:{"\n  "}{profile.religion}</Text>
                  <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Community:{"\n  "}{profile.community}</Text>
                  <Text style={{margin: 5, fontSize: 20, fontWeight: 'bold'}}>Raised:{"\n  "}{profile.raisedIn}</Text>
                </View>
              </View>
              <View style={styleBackFace.box}>
                <Text style={styleBackFace.text}>{profile.aboutme[0]}</Text>
              </View>
              {/* <View>
                <Image source={profile.pictures[1]} style={styleBackFace.image} />
              </View> */}
              <View style={styleBackFace.box}>
                <Text style={styleBackFace.text}>{profile.aboutme[1]}</Text>
              </View>
              <View style={styleBackFace.box}>
                <Text style={styleBackFace.text}>{profile.aboutme[2]}</Text>
              </View>
              <View style={styleBackFace.box}>
                <Text style={styleBackFace.text}>{profile.aboutme[2]}</Text>
              </View>
              <View style={styleBackFace.box}>
                <Text style={styleBackFace.text}>{profile.aboutme[2]}</Text>
              </View>
              {/* <View>
                <Image source={profile.pictures[2]} style={styleBackFace.image} />
              </View> */}
          </ScrollView>
        </Animated.View>
      </Pressable>
    </Animated.View>

      
    
  );
}



const style = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 385,
    height: 600,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden',
    backfaceVisibility: "hidden",
  },
});

const styleFrontFace = StyleSheet.create({
  image:{
    height: '100%',
    width: '100%',
  },
  textSection:{
    width: '90%',
    position: 'absolute',
    bottom: 20,
  },
  name:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  career:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

const styleBackFace = StyleSheet.create({
  container:{
    backgroundColor: 'pink',
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
  },
  textSection:{
    width: '90%',
    position: 'absolute',
    bottom: 20,
  },
  name:{
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  career:{
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  }
});