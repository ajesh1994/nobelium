import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import Modal from "react-native-modal";

import {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  combineTransition,
} from "react-native-reanimated";
import { useContext, useRef, useState } from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

import { careers } from "../../assets/Careers";
import { locations } from "../../assets/Locations";
import { AuthContext } from "../../context/AuthContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
const emptyStringArray: string[] = [];

const towns = Array.from(new Set(locations.map((location) => location.town)));

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;
const minimumAge = 18;
const minimumDOB = new Date();
// const minimumDOB = moment(todayDate).subtract(minimumAge, 'year').format;
minimumDOB.setFullYear(minimumDOB.getFullYear() - minimumAge);

export const RegistrationScreen = ({ navigation }: any) => {
  const [pageNo, setPageNo] = useState(1);
  const { setIsLoggedIn } = useContext(AuthContext);

  // page 1
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(minimumDOB);

  const [heightCentimeterString, setHeightCentimeterString] = useState("");
  const [heightCentimeter, setHeightCentimeter] = useState(0);
  const [heightFeetString, setHeightFeetString] = useState("");
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInchesString, setHeightInchesString] = useState("");
  const [heightInches, setHeightInches] = useState(0);
  const [heightViewBorderWidth, setHeightViewBorderWidth] = useState(0);
  const [heightViewBorderColor, setHeightViewBorderColor] = useState("black");
  const [metricButtonColor, setMetricButtonColor] = useState("green");
  const [imperialButtonColor, setImperialButtonColor] = useState("white");
  const [showMetricView, setShowMetricView] = useState(true);

  // page 2
  const [career, setCareer] = useState("");
  const [matchingCareer, setMatchingCareer] = useState(emptyStringArray);
  const [locationInputText, setLocationInputText] = useState("");
  const [matchingLocation, setMatchingLocation] = useState(emptyStringArray);
  const [locationSelect, setLocationSelect] = useState("");

  const fadeInOpacity = useSharedValue(0);

  const opacity = useState(new Animated.Value(1))[0];

  const fadeOut = () => {
    return Animated.timing(opacity, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    });
  };

  const fadeIn = () => {
    return Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
  };

  const goBack = async () => {
    fadeOut().start(() => {
      goToBackPage();
    });
  };

  const goNext = async () => {
    if (pageNo === 1) {
      if (name === "") {
        alert("Name must be specified");
      } else if (heightCentimeter <= 0) {
        alert("Height must be specified");
      } else {
        fadeOut().start(() => {
          goToNextPage();
        });
      }
    } else if (pageNo === 2) {
      if (career === "") {
        alert("Career must be specified");
      } else if (locationSelect === "") {
        alert("Location must be specified");
      } else {
        fadeOut().start(() => {
          goToNextPage();
        });
      }
    }
  };

  const goToBackPage = () => {
    if (pageNo === 1) {
      return navigation.goBack();
    } else {
      setPageNo(pageNo - 1);
      fadeIn().start();
    }
  };

  const { setItem } = useAsyncStorage("@token");

  const goToNextPage = async () => {
    if (pageNo === 2) {
      setIsLoggedIn(true);
      await setItem("DUMMY TOKEN");
    } else {
      setPageNo(pageNo + 1);
      fadeIn().start();
    }
  };

  const updateLocationField = (text: string) => {
    setLocationInputText(text);
    let filtered = emptyStringArray;
    if (
      text === "" ||
      towns.some((item) => item.toUpperCase() === text.toUpperCase())
    ) {
      setLocationSelect(text);
    } else {
      setLocationSelect("");
      filtered = towns.filter((town) =>
        town.toUpperCase().includes(text.toUpperCase())
      );
    }
    setMatchingLocation(filtered);
  };

  const setHeight = (centimeterString: string) => {
    setHeightCentimeterString(centimeterString);
    if (centimeterString === "") {
      setHeightViewBorderWidth(0);
      setHeightViewBorderColor("black");
      setHeightCentimeter(0);
      setHeightFeet(0);
      setHeightInches(0);

      setHeightFeetString("");
      setHeightInchesString("");
      return;
    }

    const centimeter = +centimeterString;
    if (isNaN(centimeter)) {
      setHeightViewBorderWidth(2);
      setHeightViewBorderColor("red");
      setHeightCentimeter(0);
      setHeightFeet(0);
      setHeightInches(0);

      setHeightFeetString("");
      setHeightInchesString("");
    } else {
      const totalInches = centimeter / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;

      setHeightViewBorderWidth(2);
      setHeightViewBorderColor("green");
      setHeightCentimeter(centimeter);
      setHeightFeet(feet);
      setHeightInches(inches);

      setHeightFeetString(feet + "");
      setHeightInchesString(Math.round(inches) + "");
    }
  };

  const setHeightImperial = (feetString: string, inchesString: string) => {
    setHeightFeetString(feetString);
    setHeightInchesString(inchesString);

    if (feetString === "" && inchesString === "") {
      setHeightViewBorderWidth(0);
      setHeightViewBorderColor("black");
      setHeightCentimeter(0);
      setHeightFeet(0);
      setHeightInches(0);

      setHeightCentimeterString("");
      return;
    }

    const feet = +feetString;
    const inches = +inchesString;
    if (isNaN(feet) || isNaN(inches)) {
      setHeightViewBorderWidth(2);
      setHeightViewBorderColor("red");
      setHeightCentimeter(0);
      setHeightFeet(0);
      setHeightInches(0);

      setHeightCentimeterString("");
    } else {
      const totalInches = feet * 12 + inches;
      const centimeter = totalInches * 2.54;

      setHeightViewBorderWidth(2);
      setHeightViewBorderColor("green");
      setHeightCentimeter(centimeter);
      setHeightFeet(feet);
      setHeightInches(inches);

      setHeightCentimeterString(centimeter + "");
    }
  };

  const metricButtonSelected = () => {
    setMetricButtonColor("green");
    setImperialButtonColor("white");
    setShowMetricView(true);
  };

  const imperialButtonSelected = () => {
    setImperialButtonColor("green");
    setMetricButtonColor("white");
    setShowMetricView(false);
  };
  const [isVisible, setIsVisible] = useState(true);
  const [careerSearchIsFocus, setCareerSearchIsFocus] = useState(false);
  const [locationSearchIsFocus, setLocationSearchIsFocus] = useState(false);

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (_event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  if (pageNo === 1) {
    return (
      <View style={[styles.container]}>
        <Modal isVisible={isVisible}>
          <View
            style={{
              height: 300,
              display: "flex",
              backgroundColor: "#D8BFD8",
              justifyContent: "space-around",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              Thanks for testing this out
            </Text>
            <Text style={{ padding: 10 }}>
              What you see here is a very basic registration flow, nothing is
              saved so don't worry. When you get past this you can select a
              swiping mechanism to test. Each version also has a navigation bar,
              you can change the way it is displayed by clicking "Settings" when
              you are on a swipe screen. Play around and see which one feels
              more natural.
            </Text>

            <View
              style={{
                width: 300,
                alignSelf: "center",
              }}
            >
              <Button title="OK" onPress={() => setIsVisible(false)} />
            </View>
          </View>
        </Modal>
        {/* PAGE 1 */}
        <Animated.View style={[styles.container, { opacity }]}>
          <TextInput
            style={[
              styles.textField,
              {
                borderWidth: name === "" ? 0 : 2,
                borderColor: "green",
              },
            ]}
            onChangeText={setName}
            value={name}
            placeholder="Name..."
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              height: 100,
              width: 350,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              {showMetricView ? (
                <>
                  <TextInput
                    style={[
                      stylesHeightComponent.textField,
                      {
                        width: 200,
                        borderWidth: heightViewBorderWidth,
                        borderColor: heightViewBorderColor,
                      },
                    ]}
                    onChangeText={(text) => setHeight(text)}
                    value={heightCentimeterString}
                    placeholder="Height..."
                  />
                </>
              ) : (
                <>
                  <TextInput
                    style={[
                      stylesHeightComponent.textField,
                      {
                        width: 95,
                        borderWidth: heightViewBorderWidth,
                        borderColor: heightViewBorderColor,
                        marginRight: 5,
                      },
                    ]}
                    onChangeText={(text) =>
                      setHeightImperial(text, heightInchesString)
                    }
                    value={heightFeetString}
                    placeholder="Feet..."
                  />
                  <TextInput
                    style={[
                      stylesHeightComponent.textField,
                      {
                        width: 95,
                        borderWidth: heightViewBorderWidth,
                        borderColor: heightViewBorderColor,
                        marginLeft: 5,
                      },
                    ]}
                    onChangeText={(text) =>
                      setHeightImperial(heightFeetString, text)
                    }
                    value={heightInchesString}
                    placeholder="Inches..."
                  />
                </>
              )}
            </View>

            <View>
              <TouchableOpacity
                onPress={() => {
                  metricButtonSelected();
                }}
              >
                <View
                  style={[
                    stylesHeightComponent.metric,
                    { backgroundColor: metricButtonColor },
                  ]}
                >
                  <Text>Metric</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  imperialButtonSelected();
                }}
              >
                <View
                  style={[
                    stylesHeightComponent.metric,
                    { backgroundColor: imperialButtonColor },
                  ]}
                >
                  <Text>Imperial</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              Date Of Birth...
            </Text>
            <Text>{date.toDateString()}</Text>

            <Button onPress={() => setShow(true)} title="Select DoB" />
            {show && (
              <DateTimePicker mode="date" value={date} onChange={onChange} />
            )}
          </View>

          {/* Button */}
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}
            >
              <View style={[styles.leftHalfNextButton]}>
                <Text>BACK</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.separator]} />
            <TouchableOpacity
              onPress={() => {
                goNext();
              }}
            >
              <View style={[styles.rightHalfNextButton]}>
                <Text>NEXT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  } else if (pageNo === 2) {
    return (
      <View style={[styles.container]}>
        {/* PAGE 2 */}
        <Animated.View style={[styles.container, { opacity }]}>
          <Dropdown
            style={[
              styles.dropdown,
              styles.textField,
              careerSearchIsFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={careers}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!careerSearchIsFocus ? "Select Career" : "..."}
            searchPlaceholder="Career..."
            value={career}
            onFocus={() => setCareerSearchIsFocus(true)}
            onBlur={() => setCareerSearchIsFocus(false)}
            onChange={(item) => {
              setCareer(item.value);
              setCareerSearchIsFocus(false);
            }}
          />

          <Dropdown
            style={[
              styles.dropdown,
              styles.textField,
              locationSearchIsFocus && { borderColor: "blue" },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={locations}
            search
            maxHeight={300}
            labelField="town"
            valueField="town"
            placeholder={!locationSearchIsFocus ? "Select Location" : "..."}
            searchPlaceholder="Location..."
            value={locationInputText}
            onFocus={() => setLocationSearchIsFocus(true)}
            onBlur={() => setLocationSearchIsFocus(false)}
            onChange={(item) => {
              setLocationInputText(item.town);
              setLocationSearchIsFocus(false);
            }}
          />

          {/* Button */}
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                goBack();
              }}
            >
              <View style={[styles.leftHalfNextButton]}>
                <Text>BACK</Text>
              </View>
            </TouchableOpacity>
            <View style={[styles.separator]} />
            <TouchableOpacity
              onPress={() => {
                goNext();
              }}
            >
              <View style={[styles.rightHalfNextButton]}>
                <Text>NEXT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "tomato",
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  textField: {
    width: 300,
    height: 100,
    backgroundColor: "white",
    padding: 10,
    fontSize: 30,
    textAlign: "center",
  },
  nextButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 100,
    backgroundColor: "pink",
    borderRadius: 50,
  },
  leftHalfNextButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "pink",
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  rightHalfNextButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    backgroundColor: "pink",
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  separator: {
    justifyContent: "center",
    alignItems: "center",
    width: 5,
    height: 100,
    backgroundColor: "darksalmon",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

const stylesHeightComponent = StyleSheet.create({
  textField: {
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 30,
    textAlign: "center",
  },
  metricButtonComponent: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 10,
    backgroundColor: "pink",
    borderRadius: 5,
  },
  metric: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
    backgroundColor: "pink",
    borderRadius: 5,
  },
  separator: {
    justifyContent: "center",
    alignItems: "center",
    width: 5,
    height: 100,
    backgroundColor: "darksalmon",
  },
});

const stylesCareer = StyleSheet.create({
  container: {
    maxHeight: 300,
    width: 300,
  },
  textField: {
    width: 200,
    height: 100,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 10,
    fontSize: 30,
    textAlign: "center",
  },
  filter: {
    width: 300,
    borderRadius: 5,
  },
});
