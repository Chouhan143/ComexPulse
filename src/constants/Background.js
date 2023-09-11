import React from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const Background = ({children}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/theme.png')}
        style={styles.image}>
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2', // Background color for the container (can be any color)
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black', // Shadow color
    shadowOffset: {width: 0, height: 5}, // Shadow offset (x, y)
    shadowOpacity: 0.3, // Shadow opacity (0 to 1)
    shadowRadius: 2, // Shadow radius
    elevation: 5, // Android shadow elevation
  },
  image: {
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    resizeMode: 'cover',
  },
});

export default Background;
