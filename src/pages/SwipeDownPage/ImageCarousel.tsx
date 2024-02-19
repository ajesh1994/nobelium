import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { user as user1 } from "../../mocks/user1"
import { user as user2 } from "../../mocks/user2"
import { user as user3 } from "../../mocks/user3"

// A mock data array of user profiles
const profiles = [
  {
    id: 1,
    name: 'Alice',
    age: 25,
    occupation: 'Software Engineer',
    image: user1.pictures[0],
  },
  {
    id: 2,
    name: 'Bob',
    age: 28,
    occupation: 'Graphic Designer',
    image: user2.pictures[0],
  },
  {
    id: 3,
    name: 'Charlie',
    age: 23,
    occupation: 'Teacher',
    image: user3.pictures[0],
  },
];

// A custom component that renders a user profile card
const ProfileCard = ({ profile, onDoubleTap, onSwipeDown }) => {
  return (
    <Swipeable
      onSwipeableOpen={onSwipeDown}
      overshootFriction={8}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onDoubleTap}
      >
        <View style={styles.card}>
          <Image source={{ uri: profile.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.age}>{profile.age}</Text>
            <Text style={styles.occupation}>{profile.occupation}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

// A custom component that renders a list of user profiles
const ProfileList = () => {
  // A state variable that tracks the current profile index
  const [index, setIndex] = useState(0);

  // A function that increments the index by one
  const nextProfile = () => {
    setIndex((index + 1) % profiles.length);
  };

  // A function that renders the current profile card
  const renderProfile = () => {
    const profile = profiles[index];
    return (
      <ProfileCard
        profile={profile}
        onDoubleTap={nextProfile}
        onSwipeDown={nextProfile}
      />
    );
  };

  return <View style={styles.container}>{renderProfile()}</View>;
};

// A style sheet for the custom components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: 300,
    height: 400,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 10,
    overflow: 'hidden',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  info: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  age: {
    fontSize: 18,
    color: '#666666',
  },
  occupation: {
    fontSize: 16,
    color: '#999999',
  },
});

export default ProfileList;