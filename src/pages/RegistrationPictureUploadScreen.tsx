import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { user } from "../mocks/user";
import { launchImageLibraryAsync, MediaTypeOptions } from "expo-image-picker";

export const RegistrationPictureUploadScreen = ({ navigation }: any) => {
  const [image, setImage] = useState<string | null>(null);

  const uploadImage = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Upload your first image!" onPress={uploadImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        onPress={() => navigation.navigate("Onboarding")}
        title="Continue"
      />
    </View>
  );
};
