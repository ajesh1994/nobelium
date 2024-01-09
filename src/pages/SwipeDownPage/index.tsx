
import { user as user1 } from "../../mocks/user1"
import { user as user2 } from "../../mocks/user2"
import { user as user3 } from "../../mocks/user3"
import { user as user4 } from "../../mocks/user4"
import { user as user5 } from "../../mocks/user5"

  import React, { useState } from 'react';
  import { View, StyleSheet } from 'react-native';
  import ImageCarousel from "./ImageCarousel"
  
  export const SwipeDownPage = () => {
    return (
      <View style={styles.container}>
        <ImageCarousel
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
