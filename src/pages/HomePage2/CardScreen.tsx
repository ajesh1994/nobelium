import { View, Image, StyleSheet, Text, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, interpolate, withTiming } from "react-native-reanimated";

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
        <Animated.View style={[style.container, {position:'absolute', height:'100%', width:'100%', borderWidth:1}, backStyle]}>
        </Animated.View>
      </Pressable>
    </Animated.View>

      
    
  );
}



const style = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    width:'99%',
    height:'75%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
    overflow: 'hidden'
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
