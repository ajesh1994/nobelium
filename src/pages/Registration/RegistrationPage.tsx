import { StyleSheet, View, Text, Pressable, Button, Image, TouchableOpacity, TextInput, Dimensions, Animated } from "react-native";
import { useSharedValue, useAnimatedStyle, interpolate, withTiming, combineTransition } from "react-native-reanimated";
import { useContext, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

import {Picker} from '@react-native-picker/picker';

import {careers} from '../../assets/Careers'
import {locations} from '../../assets/Locations'
const emptyStringArray : string[]=[];

const towns = Array.from(new Set(locations.map(location => location.town)));

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const minimumAge = 18;
const minimumDOB = new Date()
// const minimumDOB = moment(todayDate).subtract(minimumAge, 'year').format;
minimumDOB.setFullYear(minimumDOB.getFullYear() - minimumAge);

export const RegistrationScreen = ({ navigation }: any) => {
    const [pageNo, setPageNo] = useState(1)

    // page 1
    const [name, setName] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState(minimumDOB)
    const [height, setHeight] = useState('')

    // page 2
    const [career, setCareer] = useState('')
    const [matchingCareer, setMatchingCareer] = useState(emptyStringArray)
    const [locationInputText, setLocationInputText] = useState('')
    const [matchingLocation, setMatchingLocation] = useState(emptyStringArray)
    const [locationSelect, setLocationSelect] = useState('')
    
    const fadeInOpacity = useSharedValue(0);

    const opacity = useState(new Animated.Value(1))[0]

    const fadeOut = () => { 
        return Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        })
    };

    const fadeIn = () => { 
        return Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        })
    };

    const goBack = async () => { 
        fadeOut().start(() => {goToBackPage()})
    };

    const goNext = async () => { 
        if (pageNo === 1)
        {
            if (name!='')
            {
                fadeOut().start(() => {goToNextPage()});
            }
            else
            {
                alert('Name must be specified');
            }
        }
        else if (pageNo === 2)
        {
            if (career ==='')
            {
                alert('Career must be specified');
            }
            else if (locationSelect ==='')
            {
                alert('Location must be specified');
            }
            else
            {
                fadeOut().start(() => {goToNextPage()});
                
            }
        }
        
    };

    const goToBackPage = () => {
        if (pageNo===1)
        {
            return navigation.goBack();
        }
        else
        {
            setPageNo(pageNo-1);
            fadeIn().start()
        }
    };

    const goToNextPage = () => {
        setPageNo(pageNo+1);
        fadeIn().start()
    };

    const chooseDate = (_event: any, selectedDate: any) => {
        // setShow(false);
        setDateOfBirth(selectedDate);
    };

    const updateCareerField = (text:string) => {
        setCareer(text);
        let filtered = emptyStringArray;
        if (text !== '')
        {
            filtered = careers.filter(career => career.toUpperCase().includes(text.toUpperCase()));
        }
        
        setMatchingCareer(filtered);
    }

    const updateLocationField = (text:string) => {
        setLocationInputText(text);
        let filtered = emptyStringArray;
        if (text === '' || towns.some(item => item.toUpperCase() === text.toUpperCase()))
        {
            setLocationSelect(text);
        }
        else
        {
            setLocationSelect('');
            filtered = towns.filter(town => town.toUpperCase().includes(text.toUpperCase()));
        }
        setMatchingLocation(filtered);
    }

    if (pageNo===1)
    {
        return (
            <View style={[styles.container]}>
                
                {/* PAGE 1 */}
                <Animated.View style={[styles.container, {opacity}]}>
                    <TextInput
                        style={[styles.textField,{position:'absolute', top:40, borderWidth: (name === '' ? 0 : 2), borderColor: 'green'}]}
                        onChangeText={setName}
                        value={name}
                        placeholder="Name..."
                    />
                    
                    <DateTimePicker mode="date" maximumDate={minimumDOB} value={minimumDOB} onChange={chooseDate} />
    
                    {/* Button */}
                    <View style={{flexDirection:'row', position: 'absolute', bottom:40}}>
                        <TouchableOpacity onPress={() => {goBack()}}>
                            <View style={[styles.leftHalfNextButton]}>
                                <Text>BACK</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.separator]} />
                        <TouchableOpacity onPress={() => {goNext()}}>
                            <View style={[styles.rightHalfNextButton]}>
                                <Text>NEXT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        );
    }
    else if (pageNo===2)
    {
        return (
            <View style={[styles.container]}>
                {/* PAGE 2 */}
                <Animated.View style={[styles.container, { justifyContent:'flex-start'}, {opacity}]}>
                    <View style={[stylesCareer.container, {marginBottom:100}]}>
                        <TextInput
                            onFocus={() => {updateCareerField(career)}}
                            onSubmitEditing={() => {setCareer(career);setMatchingCareer(emptyStringArray)}}
                            // onBlur={() => {setCareer(career);setMatchingCareer(emptyStringArray)}}
                            style={[stylesCareer.textField, {borderWidth: (career === '' ? 0 : 2), borderColor: 'green'}]}
                            onChangeText={(text) => updateCareerField(text)}
                            value={career}
                            placeholder="Career..."
                        />
                        <ScrollView style={stylesCareer.filter}>
                            {matchingCareer.map((matchingCareerItem, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => {setCareer(matchingCareerItem);setMatchingCareer(emptyStringArray)}}>
                                        <View style={{backgroundColor:'white', opacity:0.5, borderRadius:1, marginVertical:1}}>
                                            <Text style={{fontSize:20, padding:10}} numberOfLines={1}>{matchingCareerItem}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <View style={[stylesCareer.container]}>
                        <TextInput
                            onFocus={() => {updateLocationField(locationInputText)}}
                            style={[stylesCareer.textField, {borderWidth: (locationSelect === '' ? 0 : 2), borderColor:'green'}]}
                            onChangeText={(text) => updateLocationField(text)}
                            value={locationInputText}
                            placeholder="Location..."
                        />
                        <ScrollView style={stylesCareer.filter}>
                            {matchingLocation.map((matchingLocationItem, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => {setLocationSelect(matchingLocationItem);setLocationInputText(matchingLocationItem);setMatchingLocation(emptyStringArray)}}>
                                        <View style={{backgroundColor:'white', opacity:0.5, borderRadius:1, marginVertical:1}}>
                                            <Text style={{fontSize:20, padding:10}} numberOfLines={1}>{matchingLocationItem}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>
                    
    
                    {/* Button */}
                    <View style={{flexDirection:'row', position: 'absolute', bottom:40}}>
                        <TouchableOpacity onPress={() => {goBack()}}>
                            <View style={[styles.leftHalfNextButton]}>
                                <Text>BACK</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={[styles.separator]} />
                        <TouchableOpacity onPress={() => {goNext()}}>
                            <View style={[styles.rightHalfNextButton]}>
                                <Text>NEXT</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        );
    }
    
    }

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'tomato',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textField: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 200,
        maxWidth: screenWidth-20,
        height: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10,
        fontSize: 30,
        textAlign: 'center',
    },
    nextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 100,
        backgroundColor: 'pink',
        borderRadius: 50,
    },
    leftHalfNextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: 'pink',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
    },
    rightHalfNextButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        backgroundColor: 'pink',
        borderTopRightRadius: 50,
        borderBottomRightRadius: 50,
    },
    separator: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 5,
        height: 100,
        backgroundColor: 'darksalmon',
    },
    });

    const stylesPicker = StyleSheet.create({
        container: {
          flex: 1,
          position: 'absolute',
          backgroundColor: 'yellow',
          alignItems: 'center',
          justifyContent: 'center',
          height: 400,
          width: 300,
        },
        pickerStyles:{
          width:'70%',
          backgroundColor:'gray',
          opacity: 0.7,
          color:'white'
        },
    });


    const stylesCareer = StyleSheet.create({
        container: {
            // position: 'absolute',
            top: 40,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            maxHeight: 300,
            width: 300,
        },
        textField: {
            justifyContent: 'center',
            alignItems: 'center',
            width: 300,
            height: 100,
            backgroundColor: 'white',
            borderRadius: 5,
            fontSize: 30,
            textAlign: 'center',
        },
        filter: {
            width: 300,
            borderRadius: 5,
        },
    })

      
    