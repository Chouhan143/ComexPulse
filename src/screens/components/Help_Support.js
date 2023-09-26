import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Iconic from 'react-native-vector-icons/Ionicons';
import Material from 'react-native-vector-icons/MaterialIcons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';

const Help_Support = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate('Account');
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <Image
        source={require('../../../assets/images/topBg.jpg')}
        height={responsiveHeight(40)}
        width={responsiveWidth(100)}
        style={{position: 'absolute'}}
        resizeMode="contain"
      />
      <View style={{flex: 1}}>
        <View style={styles.top}>
          <TouchableOpacity onPress={goBack}>
            <Iconic name="arrow-back" size={25} color={'white'} />
          </TouchableOpacity>
          <View style={styles.top_txt_container}>
            <Text style={styles.top_txt}>Help & Support</Text>
          </View>
        </View>
        <View style={styles.bottom_main}>
          <View style={{}}>
            <Image
              source={require('../../../assets/images/help.png')}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                width: responsiveWidth(40),
                height: responsiveHeight(20),
              }}
            />
            <View style={{marginHorizontal: responsiveWidth(4)}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '600',
                }}>
                Name
              </Text>
              <TextInput
                placeholder="Enter Your Name"
                style={{
                  //   backgroundColor: 'green',
                  borderRadius: responsiveWidth(2),
                  padding: responsiveWidth(3.5),
                  marginBottom: responsiveHeight(3),
                  marginTop: responsiveHeight(1),
                  backgroundColor: '#ffe4e1',
                  shadowColor: '#000',
                  elevation: 5,
                  shadowOffset: {
                    width: 1,
                    heightL: 1,
                  },
                }}
              />

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '600',
                }}>
                Email Address
              </Text>
              <TextInput
                placeholder="Enter Your Email Address"
                style={{
                  backgroundColor: 'green',
                  borderRadius: responsiveWidth(2),
                  padding: responsiveWidth(3.5),
                  marginTop: responsiveHeight(1),
                  marginBottom: responsiveHeight(3),
                  backgroundColor: '#ffe4e1',
                  shadowColor: '#000',
                  elevation: 5,
                  shadowOffset: {
                    width: 1,
                    heightL: 1,
                  },
                }}
              />

              <Text
                style={{
                  color: '#000',
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '600',
                }}>
                Message
              </Text>
              <View
                style={{
                  borderRadius: responsiveWidth(2),
                  height: responsiveHeight(15),
                  marginTop: responsiveHeight(1),
                  marginBottom: responsiveHeight(3),
                  backgroundColor: '#ffe4e1',
                  shadowColor: '#000',
                  elevation: 5,
                  shadowOffset: {
                    width: 1,
                    heightL: 1,
                  },
                }}>
                <TextInput
                  multiline={true}
                  style={{
                    padding: 10, // Adjust padding as needed
                  }}
                />
              </View>

              <TouchableOpacity
                style={{
                  position: 'relative', // Position the button at the bottom
                  bottom: responsiveHeight(2), // Adjust the bottom position as needed
                  alignSelf: 'center',
                  marginTop: responsiveHeight(5),
                }}
                onPress={console.log('hello')}>
                <LinearGradient
                  colors={['#7F7FD5', '#91EAE4']}
                  start={{x: 0, y: 1}} // Start point of the gradient
                  end={{x: 1, y: 0}}
                  style={{
                    position: 'relative',
                    width: responsiveWidth(90),
                    height: responsiveHeight(6),
                    borderRadius: responsiveWidth(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={[
                      styles.BoxContent,
                      {
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: responsiveFontSize(2.5),
                      },
                    ]}>
                    Submit
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    padding: responsiveWidth(5),
  },
  top_txt_container: {
    padding: responsiveWidth(2),
    marginLeft: responsiveWidth(3),
  },
  top_txt: {
    color: 'white',
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
  },
  bottom_main: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: responsiveWidth(8),
    borderTopRightRadius: responsiveWidth(8),
    marginTop: responsiveHeight(4),
    padding: responsiveWidth(2),
  },
  bottom_main_top: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: responsiveWidth(3.5),
  },
  bottom_main_top_img: {
    width: responsiveWidth(45),
    height: responsiveWidth(45),
    borderRadius: responsiveWidth(22.5),
    backgroundColor: 'gray',
  },
  bottom_lable: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
  },
  input_view: {
    paddingTop: responsiveWidth(2),
    paddingBottom: responsiveWidth(2),
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(5),
    shadowColor: 'black',
    elevation: 5,
    backgroundColor: 'white',
  },
  input_field: {
    borderRadius: responsiveWidth(2),
    paddingLeft: responsiveWidth(5),
    shadowColor: 'black',
    elevation: 5,
    backgroundColor: 'white',
  },
  button_container: {
    marginTop: responsiveHeight(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: responsiveWidth(95),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveWidth(2),
  },
});

export default Help_Support;
