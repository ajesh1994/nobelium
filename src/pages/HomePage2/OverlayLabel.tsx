import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { string } from 'prop-types'

export const OverlayLabel = ({ label, color, imageSource } : {label:string, color:string, imageSource:any}) => (
  <View style={[styles.overlayLabel]}>
    <Image source={imageSource} style={styles.overlayImage} />
    {/* <Text style={[styles.overlayLabelText, { color }]}>{label}</Text> */}
  </View>
)

OverlayLabel.propTypes = {
  label: string.isRequired,
  color: string.isRequired,
}

const styles = StyleSheet.create({
    overlayLabel: {
      justifyContent: 'center',
      alignItems: 'center',
    //   borderWidth: 2,
      overflow:'hidden',
    },
    overlayImage: {
        justifyContent: 'center',
        alignItems: 'center',
        height:200,
        width:200,
        resizeMode:'contain',
      },
    overlayLabelText: {
      fontSize: 25,
      fontFamily: 'Avenir',
      textAlign: 'center',
    },
  })
