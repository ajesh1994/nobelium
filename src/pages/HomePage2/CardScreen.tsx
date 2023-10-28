import { View, Image, StyleSheet, Text, Animated, PanResponder } from "react-native";
import Swiper from "react-native-deck-swiper";

export const Card = ({ profile } : { profile:any }) => {
  
        

  return (
    <View style={style.container}>
      <Image source={profile.pictures[0]} style={styleFrontFace.image} />
      <View style={styleFrontFace.textSection}>
        <Text style={styleFrontFace.name}>{profile.firstName}, {profile.age}</Text>
        <Text style={styleFrontFace.career}>{profile.career}</Text>
      </View>
    </View>

      
    
  );
}



const style = StyleSheet.create({
  container:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
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
