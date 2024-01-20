import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const AnimatedBtn = Animated.createAnimatedComponent(TouchableOpacity);

const AnimatedLoginSignUpBtn = () => {
  const navigation = useNavigation();

  const [isExpanded, setExpanded] = useState(false);

  const animatedWidth = useSharedValue(responsiveWidth(10));
  const animatedHeight = useSharedValue(responsiveHeight(6));
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
      height: animatedHeight.value,
    };
  });

  const navigationHandle = () => {
    const timeOut = setTimeout(() => {
      navigation.navigate('SearchData');
    }, 100);

    return () => clearInterval(timeOut);
  };

  const toggleButton = () => {
    if (!isExpanded) {
      animatedWidth.value = withTiming(responsiveWidth(10), {duration: 100});
      navigationHandle();
    } else {
      animatedWidth.value = withTiming(responsiveWidth(15), {duration: 100});
      navigationHandle();
    }
    setExpanded(!isExpanded);
  };

  return (
    <View>
      <AnimatedBtn
        style={[styles.animatedUi, animatedStyle]}
        onPress={toggleButton}>
        <Ionicons
          name={'search-circle'}
          size={responsiveFontSize(5)}
          color={'white'}
        />
      </AnimatedBtn>
    </View>
  );
};

export default AnimatedLoginSignUpBtn;

const styles = StyleSheet.create({
  animatedUi: {
    width: responsiveWidth(10),
    height: responsiveHeight(6),
    backgroundColor: '#616DBC',
    borderTopLeftRadius: responsiveWidth(20),
    borderBottomLeftRadius: responsiveWidth(20),
    justifyContent: 'center',
  },
});
